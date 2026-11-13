/* =========================================================
   Surprise HQ — admin controller
   ========================================================= */
'use strict';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const state = {
  summary: null,
  health: null,
  devices: [],
  deviceLimit: 250,
  photos: [],
  wishes: [],
  quiz: [],
  music: [],
  activity: { rows: [], total: 0, offset: 0, limit: 50 },
  db: { table: 'devices', rows: [], total: 0, columns: [], offset: 0 },
  planner: [],
  broadcasts: [],
  config: {},
  settings: {},
  dirty: false,
  currentTab: 'dashboard'
};

const TAB_TITLES = {
  dashboard: 'Dashboard',
  live: 'Live Control',
  devices: 'Devices',
  wishes: 'Wishes & Quiz',
  activity: 'Activity Log',
  photos: 'Photo Gallery',
  music: 'Music Manager',
  content: 'Content Editor',
  planner: 'Surprise Planner',
  database: 'Database',
  settings: 'Site Settings'
};

const FEED_META = {
  joined: { icon: '🔗', color: '#60a5fa' },
  activity: { icon: '🎯', color: '#ff5bb7' },
  wish: { icon: '💌', color: '#ffd166' },
  photo: { icon: '📸', color: '#34d399' },
  broadcast: { icon: '📡', color: '#a855f7' }
};

/* ================= Utilities ================= */
function esc(value) {
  return String(value === null || value === undefined ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function parseDate(ts) {
  if (!ts) return null;
  if (typeof ts === 'number') return new Date(ts);
  let text = String(ts);
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(text)) text = text.replace(' ', 'T') + 'Z';
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function fmtTime(ts, fallback = '—') {
  const date = parseDate(ts);
  if (!date) return fallback;
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function timeAgo(ts) {
  const date = parseDate(ts);
  if (!date) return '—';
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 45) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
  return date.toLocaleDateString();
}

function fmtBytes(bytes) {
  const n = Number(bytes) || 0;
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  if (n < 1024 * 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + ' MB';
  return (n / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

function fmtUptime(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  if (days) return `${days}d ${hours}h`;
  if (hours) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

async function api(url, options = {}) {
  const response = await fetch(url, options);
  const type = response.headers.get('content-type') || '';
  const payload = type.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = payload && payload.error ? payload.error : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return payload;
}

function toast(message, type = 'success', title = '') {
  const root = $('#toastRoot');
  if (!root) return;
  const node = document.createElement('div');
  node.className = 'toast ' + type;
  if (title) node.innerHTML = `<strong>${esc(title)}</strong>`;
  node.appendChild(document.createTextNode(message));
  root.appendChild(node);
  setTimeout(() => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(6px)';
    node.style.transition = 'opacity .2s, transform .2s';
    setTimeout(() => node.remove(), 220);
  }, 3600);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ================= Socket ================= */
let socket = null;
let refreshTimer = null;

function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => loadSummary(), 1200);
}

function updateOnline(count) {
  const safe = Math.max(0, Number(count) || 0);
  setText('topOnline', safe);
  setText('liveOnline', safe);
  setText('statOnline', safe);
  setText('visitorBadge', safe + ' online');
}

function initSocket() {
  if (typeof io === 'undefined') {
    setConnection(false, 'Socket unavailable');
    return;
  }
  socket = io();
  socket.on('connect', () => {
    setConnection(true, 'Connected live');
    socket.emit('visitor-joined', { role: 'admin', timestamp: Date.now() });
  });
  socket.on('disconnect', () => setConnection(false, 'Reconnecting…'));
  socket.on('visitor-count', updateOnline);
  socket.on('admin-activity', data => {
    addFeedItem(data);
    if (data && data.type === 'wish') loadWishes();
    scheduleRefresh();
  });
  socket.on('admin-device', () => {
    scheduleRefresh();
    if (state.currentTab === 'devices') loadDevices();
  });
  socket.on('admin-photo', () => {
    loadPhotos();
    scheduleRefresh();
  });
}

function setConnection(connected, label) {
  const dot = $('#connDot');
  if (dot) dot.classList.toggle('connected', connected);
  setText('connLabel', label);
}

/* ================= Navigation ================= */
function closeSidebar() {
  $('#sidebar')?.classList.remove('open');
  $('#sidebarOverlay')?.classList.remove('open');
  $('#menuBtn')?.setAttribute('aria-expanded', 'false');
  $('#menuBtn')?.setAttribute('aria-label', 'Open menu');
}

function switchTab(tab) {
  if (!tab) return;
  state.currentTab = tab;
  $$('.nav-item').forEach(btn => {
    const active = btn.dataset.tab === tab;
    btn.classList.toggle('active', active);
    if (active) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
  $$('.tab-content').forEach(section => section.classList.toggle('active', section.id === 'tab-' + tab));
  setText('topbarTitle', TAB_TITLES[tab] || 'Dashboard');
  closeSidebar();
  loadTab(tab);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadTab(tab) {
  if (tab === 'dashboard') { loadSummary(); loadRecentFeed(); }
  else if (tab === 'live') { loadBroadcasts(); updatePreview(); }
  else if (tab === 'devices') loadDevices();
  else if (tab === 'wishes') loadWishes();
  else if (tab === 'activity') loadActivity(true);
  else if (tab === 'photos') loadPhotos();
  else if (tab === 'music') loadMusic();
  else if (tab === 'content') loadConfig();
  else if (tab === 'planner') loadPlanner();
  else if (tab === 'database') loadDbTables();
  else if (tab === 'settings') loadSettings();
}

/* ================= Dashboard ================= */
async function loadSummary() {
  try {
    const [summary, health] = await Promise.all([api('/api/summary'), api('/api/health')]);
    state.summary = summary;
    state.health = health;
    renderSummary(summary, health);
  } catch (error) {
    toast(error.message, 'error', 'Could not load dashboard');
  }
}

function renderSummary(summary, health) {
  const counts = summary.counts || {};
  updateOnline(summary.online || 0);
  setText('statDevices', counts.devices || 0);
  setText('statUnique', counts.uniqueVisitors || 0);
  setText('statWishes', counts.wishes || 0);
  setText('statPhotos', counts.photos || 0);
  setText('statActivity', counts.activity || 0);
  setText('statCountries', (summary.countries || []).length);
  setText('statTasks', `${counts.tasksDone || 0}/${counts.tasksTotal || 0}`);
  setText('statDevicesHint', 'All time');
  setText('statUniqueHint', 'Deduplicated');
  setText('statWishesHint', 'From the heart');
  setText('statPhotosHint', 'Captured & uploaded');
  setText('statActivityHint', `${counts.todayActivity || 0} today`);
  setText('statCountriesHint', 'Around the world');
  setText('statTasksHint', `${counts.tasksTotal || 0} planned`);
  setText('statOnlineHint', summary.online ? 'Connected right now' : 'Listening for visitors');
  setText('navDeviceCount', counts.devices || 0);
  setText('navWishCount', counts.wishes || 0);
  setText('pageCountChip', `${(summary.byPage || []).length} pages`);
  setText('chartTotal', `${counts.activity || 0} total`);

  renderChart(summary.byDay || []);
  renderRankList($('#pageList'), summary.byPage || [], row => row.page || '/', row => row.c, 'No page views yet');
  renderHealth(health);
  renderAudienceMix(summary);
  renderLocationList(summary);
  renderDeviceMix(summary);
}

function renderChart(byDay) {
  const host = $('#visitorChart');
  if (!host) return;
  const map = new Map((byDay || []).map(row => [row.d, Number(row.c) || 0]));
  const days = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = day.getFullYear() + '-' + String(day.getMonth() + 1).padStart(2, '0') + '-' + String(day.getDate()).padStart(2, '0');
    days.push({ key, count: map.get(key) || 0, date: day });
  }
  const max = Math.max(1, ...days.map(day => day.count));
  host.innerHTML = days.map(day => {
    const height = day.count > 0 ? Math.max(5, Math.round((day.count / max) * 100)) : 2;
    const label = day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return `<div class="bar-col" title="${esc(label)}: ${day.count} events">
      <div class="bar-track"><div class="bar" style="height:${height}%"></div></div>
      <span class="bar-label">${esc(day.date.toLocaleDateString(undefined, { day: 'numeric' }))}</span>
    </div>`;
  }).join('');
}

function renderRankList(host, rows, nameFn, valueFn, emptyText) {
  if (!host) return;
  if (!rows || rows.length === 0) {
    host.innerHTML = `<div class="empty">${esc(emptyText)}</div>`;
    return;
  }
  const max = Math.max(1, ...rows.map(row => Number(valueFn(row)) || 0));
  host.innerHTML = rows.map(row => {
    const value = Number(valueFn(row)) || 0;
    return `<div class="rank-row">
      <div class="rank-top"><span class="rank-name">${esc(nameFn(row))}</span><span class="rank-value">${value.toLocaleString()}</span></div>
      <div class="rank-bar"><div class="rank-fill" style="width:${Math.max(3, Math.round((value / max) * 100))}%"></div></div>
    </div>`;
  }).join('');
}

function renderHealth(health) {
  const host = $('#healthGrid');
  if (!host || !health) return;
  const mem = health.memory || {};
  const heapPercent = mem.heapTotal ? Math.round((mem.heapUsed / mem.heapTotal) * 100) : 0;
  const uploads = health.uploads || { count: 0, bytes: 0 };
  host.innerHTML = `
    <div class="health-item"><div class="health-label">Uptime</div><div class="health-value">${esc(fmtUptime(health.uptime))}</div><div class="health-sub">since ${esc(fmtTime(health.startedAt))}</div></div>
    <div class="health-item"><div class="health-label">Database</div><div class="health-value">${esc(fmtBytes(health.dbBytes))}</div><div class="health-sub">birthday.db</div></div>
    <div class="health-item"><div class="health-label">Uploads</div><div class="health-value">${uploads.count.toLocaleString()} files</div><div class="health-sub">${esc(fmtBytes(uploads.bytes))} on disk</div></div>
    <div class="health-item"><div class="health-label">Node.js</div><div class="health-value">${esc(health.node || '—')}</div><div class="health-sub">${esc(health.platform || '')}</div></div>
    <div class="health-item" style="grid-column:span 2"><div class="health-label">Memory</div><div class="health-value">${esc(fmtBytes(mem.rss))}</div><div class="health-sub">${heapPercent}% of allocated heap</div><div class="health-meter"><span style="width:${Math.min(100, heapPercent)}%"></span></div></div>`;
  setText('healthStatus', 'Healthy');
}

function renderAudienceMix(summary) {
  const host = $('#audienceMix');
  if (!host) return;
  const rows = [...(summary.byPlatform || []).slice(0, 4), ...(summary.byBrowser || []).slice(0, 4)];
  if (!rows.length) { host.innerHTML = ''; return; }
  host.innerHTML = rows.map(row => `<span class="chip">${esc(row.label)} · ${row.c}</span>`).join('');
}

function renderLocationList(summary) {
  const host = $('#locationList');
  if (!host) return;
  const cities = (summary && summary.cities) || [];
  const countries = (summary && summary.countries) || [];
  const rows = cities.length
    ? cities.map(row => ({ label: row.city + (row.country ? ', ' + row.country : ''), c: row.c }))
    : countries.map(row => ({ label: row.country, c: row.c }));
  setText('locationChip', `${rows.length} place${rows.length === 1 ? '' : 's'}`);
  renderRankList(host, rows, row => row.label, row => row.c, 'Location permission not granted yet');
}

function renderDeviceMix(summary) {
  const host = $('#deviceMix');
  if (!host) return;
  const platforms = (summary.byPlatform || []).map(row => ({ label: row.label, c: row.c, kind: 'Platform' }));
  const browsers = (summary.byBrowser || []).map(row => ({ label: row.label, c: row.c, kind: 'Browser' }));
  const rows = [...platforms, ...browsers];
  if (!rows.length) { host.innerHTML = '<div class="empty">No devices yet</div>'; return; }
  host.innerHTML = rows.map(row => `<span class="pill"><span>${esc(row.label)}</span><span class="pill-count">${row.c} ${esc(row.kind.toLowerCase())}</span></span>`).join('');
}

/* ================= Live feed ================= */
async function loadRecentFeed() {
  try {
    const data = await api('/api/activity?limit=20');
    const host = $('#activityFeed');
    if (!host) return;
    host.innerHTML = '';
    const rows = data.rows || [];
    if (!rows.length) { host.innerHTML = '<div class="empty">Waiting for visitors…</div>'; return; }
    rows.reverse().forEach(row => addFeedItem({
      type: row.action === 'broadcast' ? 'broadcast' : (row.action === 'page-view' ? 'activity' : 'activity'),
      data: { action: row.action, page: row.page, visitorId: row.visitorId, details: row.details },
      time: parseDate(row.createdAt)?.getTime() || Date.now()
    }, false));
  } catch (error) { /* dashboard can live without the feed */ }
}

function addFeedItem(event, prepend = true) {
  const host = $('#activityFeed');
  if (!host) return;
  const empty = host.querySelector('.empty');
  if (empty) empty.remove();
  const meta = FEED_META[event.type] || FEED_META.activity;
  const data = event.data || {};
  const action = data.action || data.name || data.page || event.type || 'event';
  const detail = data.page && data.page !== action ? ` on ${data.page}` : '';
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `<span class="activity-dot" style="color:${meta.color};background:${meta.color}"></span>
    <div class="activity-copy"><strong>${esc(meta.icon)} ${esc(action)}</strong>${esc(detail)}</div>
    <time class="activity-time">${esc(fmtTime(event.time))}</time>`;
  if (prepend && host.firstChild) host.prepend(item); else host.appendChild(item);
  while (host.children.length > 50) host.lastChild.remove();
}

/* ================= Devices ================= */
async function loadDevices() {
  try {
    state.devices = await api('/api/devices');
    state.deviceLimit = 250;
    populatePlatformFilter();
    renderDevices();
  } catch (error) {
    toast(error.message, 'error', 'Could not load devices');
  }
}

function populatePlatformFilter() {
  const select = $('#devicePlatform');
  if (!select) return;
  const current = select.value;
  const platforms = [...new Set(state.devices.map(device => device.platform).filter(Boolean))].sort();
  select.innerHTML = '<option value="">All platforms</option>' + platforms.map(platform => `<option value="${esc(platform)}">${esc(platform)}</option>`).join('');
  if (platforms.includes(current)) select.value = current;
}

function filteredDevices() {
  const query = ($('#deviceSearch')?.value || '').trim().toLowerCase();
  const platform = $('#devicePlatform')?.value || '';
  const camera = $('#deviceCamera')?.value || '';
  const sort = $('#deviceSort')?.value || 'newest';
  let rows = state.devices.slice();

  if (query) {
    rows = rows.filter(device => [
      device.visitorId, device.ip, device.browser, device.platform, device.screen,
      device.city, device.country, device.language, device.timezone, device.userAgent
    ].some(value => String(value || '').toLowerCase().includes(query)));
  }
  if (platform) rows = rows.filter(device => device.platform === platform);
  if (camera) rows = rows.filter(device => (device.cameraPermission || 'prompt') === camera);

  if (sort === 'oldest') rows.sort((a, b) => a.id - b.id);
  else if (sort === 'browser') rows.sort((a, b) => String(a.browser || '').localeCompare(String(b.browser || '')));
  else if (sort === 'platform') rows.sort((a, b) => String(a.platform || '').localeCompare(String(b.platform || '')));
  else rows.sort((a, b) => b.id - a.id);

  return rows;
}

function renderDevices() {
  const tbody = $('#devicesTable tbody');
  if (!tbody) return;
  const rows = filteredDevices();
  const limit = state.deviceLimit || 250;
  const shown = rows.slice(0, limit);
  tbody.innerHTML = '';
  setText('deviceCount', `${rows.length} of ${state.devices.length} devices`);
  $('#devicesEmpty').hidden = rows.length > 0;
  const moreWrap = $('#deviceMoreWrap');
  if (moreWrap) moreWrap.hidden = rows.length <= limit;
  const moreBtn = $('#deviceMoreBtn');
  if (moreBtn) moreBtn.textContent = `Show ${Math.min(250, Math.max(0, rows.length - limit))} more devices`;

  shown.forEach(device => {
    const camera = device.cameraPermission || 'prompt';
    const mic = device.micPermission || 'prompt';
    const location = [device.city, device.country].filter(Boolean).join(', ') || '—';
    const tr = document.createElement('tr');
    tr.className = 'clickable';
    tr.dataset.visitor = device.visitorId || '';
    tr.innerHTML = `
      <td class="tight">${esc(timeAgo(device.createdAt))}<span class="sub">${esc(fmtTime(device.createdAt))}</span></td>
      <td class="tight"><strong>${esc((device.visitorId || 'anonymous').slice(0, 16))}</strong><span class="sub">${esc(device.timezone || 'unknown timezone')}</span></td>
      <td>${esc(device.ip || '—')}</td>
      <td>${esc(device.browser || '—')}</td>
      <td>${esc(device.platform || '—')}<span class="sub">${esc(device.screen || '')}</span></td>
      <td>${esc(location)}</td>
      <td>${badgeForPermission(camera)}</td>
      <td>${badgeForPermission(mic)}</td>
      <td><button class="row-action" data-dossier="${esc(device.visitorId || '')}" title="Open dossier" aria-label="Open visitor dossier"><svg class="icon icon-sm"><use href="#i-eye"/></svg></button></td>`;
    tbody.appendChild(tr);
  });
}

function badgeForPermission(value) {
  if (value === 'granted') return '<span class="badge badge-green">granted</span>';
  if (value === 'denied') return '<span class="badge badge-red">denied</span>';
  if (value === 'prompt') return '<span class="badge badge-yellow">prompt</span>';
  return `<span class="badge badge-muted">${esc(value || '—')}</span>`;
}

let lastFocusedElement = null;

async function openDossier(visitorId) {
  if (!visitorId) return toast('No visitor id for this device.', 'error');
  lastFocusedElement = document.activeElement;
  try {
    const data = await api('/api/devices/' + encodeURIComponent(visitorId) + '/dossier');
    const device = data.device || {};
    setText('dossierTitle', visitorId);
    const body = $('#dossierBody');
    const activity = data.activity || [];
    const photos = data.photos || [];
    body.innerHTML = `
      <div class="dossier-meta">
        <div class="info-item"><small>Status</small><strong>${data.online ? '🟢 Online now' : '⚪ Offline'}</strong></div>
        <div class="info-item"><small>IP address</small><strong>${esc(device.ip || '—')}</strong></div>
        <div class="info-item"><small>Browser</small><strong>${esc(device.browser || '—')}</strong></div>
        <div class="info-item"><small>Platform</small><strong>${esc(device.platform || '—')}</strong></div>
        <div class="info-item"><small>Screen</small><strong>${esc(device.screen || '—')}</strong></div>
        <div class="info-item"><small>Language</small><strong>${esc(device.language || '—')}</strong></div>
        <div class="info-item"><small>Location</small><strong>${esc([device.city, device.country].filter(Boolean).join(', ') || '—')}</strong></div>
        <div class="info-item"><small>Camera / Mic</small><strong>${esc((device.cameraPermission || 'prompt') + ' / ' + (device.micPermission || 'prompt'))}</strong></div>
        <div class="info-item"><small>First seen</small><strong>${esc(fmtTime(data.firstSeen))}</strong></div>
        <div class="info-item"><small>Last seen</small><strong>${esc(fmtTime(data.lastSeen))}</strong></div>
        <div class="info-item" style="grid-column:span 2"><small>User agent</small><strong style="font-size:.66rem;font-weight:500;word-break:break-word">${esc(device.userAgent || '—')}</strong></div>
      </div>
      <div class="dossier-section">
        <h4>Activity timeline <span class="chip">${activity.length}</span></h4>
        <div class="dossier-timeline" tabindex="0" role="log" aria-label="Visitor activity timeline">${activity.length ? activity.map(event => `
          <div class="dossier-event"><time>${esc(fmtTime(event.createdAt))}</time><div><strong>${esc(event.action)}</strong> ${esc(event.page || '')}<span class="sub">${esc(event.details || '')}</span></div></div>`).join('') : '<div class="empty">No activity recorded.</div>'}</div>
      </div>
      <div class="dossier-section">
        <h4>Captured photos <span class="chip">${photos.length}</span></h4>
        <div class="dossier-photos">${photos.length ? photos.map(photo => `<a href="/uploads/photos/${esc(photo.fileName)}" target="_blank" rel="noopener"><img src="/uploads/photos/${esc(photo.fileName)}" alt="${esc(photo.originalName || 'photo')}" loading="lazy"></a>`).join('') : '<div class="empty">No photos from this visitor.</div>'}</div>
      </div>`;
    const modal = $('#dossierModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('[data-close-modal].icon-btn')?.focus();
  } catch (error) {
    toast(error.message, 'error', 'Could not open dossier');
  }
}

function closeModal() {
  const modal = $('#dossierModal');
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
}

let confirmResolver = null;
let confirmFocus = null;

function askConfirm({ title = 'Are you sure?', message = '', confirmLabel = 'Delete' } = {}) {
  return new Promise(resolve => {
    confirmResolver = resolve;
    confirmFocus = document.activeElement;
    setText('confirmTitle', title);
    setText('confirmMessage', message);
    const ok = $('#confirmOk');
    if (ok) { ok.textContent = confirmLabel; ok.className = 'btn btn-danger'; }
    const modal = $('#confirmModal');
    if (!modal) { resolve(false); return; }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    ok?.focus();
  });
}

function settleConfirm(value) {
  const modal = $('#confirmModal');
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const resolve = confirmResolver;
  confirmResolver = null;
  if (confirmFocus && typeof confirmFocus.focus === 'function') confirmFocus.focus();
  if (resolve) resolve(value);
}

/* ================= Wishes & quiz ================= */
async function loadWishes() {
  try {
    const [wishes, quiz] = await Promise.all([api('/api/wishes'), api('/api/quiz-scores')]);
    state.wishes = wishes || [];
    state.quiz = (quiz || []).slice().sort((a, b) => {
      const accA = a.total ? a.score / a.total : 0;
      const accB = b.total ? b.score / b.total : 0;
      return accB - accA;
    });
    renderWishes();
    renderQuiz();
    setText('navWishCount', state.wishes.length);
  } catch (error) {
    toast(error.message, 'error', 'Could not load wishes');
  }
}

function renderWishes() {
  const host = $('#wishesList');
  if (!host) return;
  setText('wishesChip', `${state.wishes.length} wish${state.wishes.length === 1 ? '' : 'es'}`);
  if (!state.wishes.length) { host.innerHTML = '<div class="empty">No wishes yet</div>'; return; }
  host.innerHTML = state.wishes.map(wish => `
    <article class="wish-card">
      <button class="row-action" data-delete-wish="${wish.id}" title="Delete wish" aria-label="Delete wish"><svg class="icon icon-sm"><use href="#i-trash"/></svg></button>
      <p class="wish-message">“${esc(wish.message)}”</p>
      <div class="wish-meta"><span class="wish-name">${esc(wish.name || 'Anonymous')}</span><span>·</span><span>${esc(fmtTime(wish.createdAt))}</span></div>
    </article>`).join('');
}

function renderQuiz() {
  const tbody = $('#quizTable tbody');
  if (!tbody) return;
  setText('quizChip', `${state.quiz.length} play${state.quiz.length === 1 ? '' : 's'}`);
  tbody.innerHTML = '';
  $('#quizEmpty').hidden = state.quiz.length > 0;
  state.quiz.forEach((row, index) => {
    const accuracy = row.total ? Math.min(100, Math.max(0, Math.round((row.score / row.total) * 100))) : 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="tight">${index + 1}</td><td>${esc(row.quizType || 'quiz')}</td><td class="quiz-score">${row.score}/${row.total}</td><td><span class="accuracy"><span class="accuracy-track"><span class="accuracy-fill" style="width:${accuracy}%"></span></span>${accuracy}%</span></td><td class="tight">${esc(fmtTime(row.createdAt))}</td>`;
    tbody.appendChild(tr);
  });
}

async function deleteWish(id) {
  if (!await askConfirm({ title: 'Delete this wish?', message: 'This message will be removed from the wish wall permanently.', confirmLabel: 'Delete wish' })) return;
  try {
    await api('/api/wishes/' + id, { method: 'DELETE' });
    toast('Wish deleted');
    loadWishes();
    loadSummary();
  } catch (error) { toast(error.message, 'error'); }
}

/* ================= Activity ================= */
async function loadActivity(reset = false) {
  if (reset) state.activity.offset = 0;
  const query = $('#activitySearch')?.value.trim() || '';
  const page = $('#activityPage')?.value || '';
  const action = $('#activityAction')?.value || '';
  const params = new URLSearchParams({ limit: state.activity.limit, offset: state.activity.offset });
  if (query) params.set('q', query);
  if (page) params.set('page', page);
  if (action) params.set('action', action);
  try {
    const data = await api('/api/activity?' + params.toString());
    if (reset) state.activity.rows = [];
    state.activity.rows = state.activity.rows.concat(data.rows || []);
    state.activity.total = data.total || 0;
    state.activity.offset = state.activity.rows.length;
    renderActivity();
    populateActivityFilters(data.rows || []);
  } catch (error) {
    toast(error.message, 'error', 'Could not load activity');
  }
}

function renderActivity() {
  const tbody = $('#activityTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  setText('activityCount', `${state.activity.rows.length} of ${state.activity.total} events`);
  $('#activityEmpty').hidden = state.activity.rows.length > 0;
  const more = $('#loadMoreActivity');
  if (more) more.style.display = state.activity.rows.length < state.activity.total ? '' : 'none';
  state.activity.rows.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="tight">${esc(timeAgo(row.createdAt))}<span class="sub">${esc(fmtTime(row.createdAt))}</span></td>
      <td class="tight">${esc((row.visitorId || 'anonymous').slice(0, 14))}</td>
      <td><span class="badge badge-blue">${esc(row.action || 'event')}</span></td>
      <td>${esc(row.page || '—')}</td>
      <td title="${esc(row.details || '')}">${esc(String(row.details || '').slice(0, 80))}</td>
      <td class="tight">${esc(row.ip || '—')}</td>`;
    tbody.appendChild(tr);
  });
}

function populateActivityFilters(rows) {
  const pageSelect = $('#activityPage');
  const actionSelect = $('#activityAction');
  if (pageSelect) {
    const current = pageSelect.value;
    const pages = [...new Set([...$$('option', pageSelect).map(option => option.value), ...rows.map(row => row.page)].filter(Boolean))].sort();
    pageSelect.innerHTML = '<option value="">All pages</option>' + pages.map(page => `<option value="${esc(page)}">${esc(page)}</option>`).join('');
    pageSelect.value = current;
  }
  if (actionSelect) {
    const current = actionSelect.value;
    const actions = [...new Set([...$$('option', actionSelect).map(option => option.value), ...rows.map(row => row.action)].filter(Boolean))].sort();
    actionSelect.innerHTML = '<option value="">All actions</option>' + actions.map(action => `<option value="${esc(action)}">${esc(action)}</option>`).join('');
    actionSelect.value = current;
  }
}

/* ================= Photos ================= */
async function loadPhotos() {
  try {
    const [captured, legacy] = await Promise.all([api('/api/captured-photos'), api('/api/photos')]);
    state.photos = [
      ...(captured || []).map(photo => ({ ...photo, source: photo.source || 'upload', _kind: 'captured' })),
      ...(legacy || []).map(photo => ({ ...photo, source: 'visitor', _kind: 'legacy' }))
    ];
    renderPhotos();
  } catch (error) {
    toast(error.message, 'error', 'Could not load photos');
  }
}

function renderPhotos() {
  const host = $('#photoGrid');
  if (!host) return;
  const filter = $('#photoSource')?.value || '';
  const photos = filter ? state.photos.filter(photo => photo.source === filter) : state.photos;
  host.innerHTML = '';
  const empty = $('#photosEmpty');
  if (empty) {
    empty.hidden = photos.length > 0;
    empty.textContent = filter ? 'No photos from this source yet.' : 'No photos yet — upload the first memory.';
  }
  photos.forEach(photo => {
    const card = document.createElement('article');
    card.className = 'photo-card';
    const canDelete = photo._kind === 'captured';
    card.innerHTML = `<img src="/uploads/photos/${esc(photo.fileName)}" alt="${esc(photo.originalName || 'photo')}" loading="lazy">
      <div class="photo-info"><strong>${esc(photo.originalName || 'Photo')}</strong>${esc(photo.source)} · ${esc(fmtTime(photo.createdAt))}</div>
      ${canDelete ? `<div class="photo-actions"><button class="row-action" data-delete-photo="${photo.id}" title="Delete photo" aria-label="Delete photo"><svg class="icon icon-sm"><use href="#i-trash"/></svg></button></div>` : ''}`;
    host.appendChild(card);
  });
}

async function deletePhoto(id) {
  if (!await askConfirm({ title: 'Delete this photo?', message: 'The photo will be removed from the gallery and cannot be recovered.', confirmLabel: 'Delete photo' })) return;
  try {
    await api('/api/captured-photos/' + id, { method: 'DELETE' });
    toast('Photo deleted');
    loadPhotos();
    loadSummary();
  } catch (error) { toast(error.message, 'error'); }
}

async function uploadPhotos(files) {
  if (!files || !files.length) return;
  for (const file of files) {
    const form = new FormData();
    form.append('photo', file);
    form.append('source', 'admin');
    try { await api('/api/captured-photos', { method: 'POST', body: form }); }
    catch (error) { toast(error.message, 'error', 'Upload failed'); }
  }
  toast(`${files.length} photo${files.length === 1 ? '' : 's'} uploaded`);
  loadPhotos();
  loadSummary();
}

/* ================= Music ================= */
async function loadMusic() {
  try {
    state.music = await api('/api/music');
    renderMusic();
  } catch (error) { toast(error.message, 'error', 'Could not load music'); }
}

function renderMusic() {
  const host = $('#musicPlaylist');
  if (!host) return;
  setText('musicChip', `${state.music.length} track${state.music.length === 1 ? '' : 's'}`);
  if (!state.music.length) { host.innerHTML = '<div class="empty">No tracks yet</div>'; return; }
  host.innerHTML = state.music.map(track => `
    <div class="music-item">
      <span class="music-art"><svg class="icon"><use href="#i-music"/></svg></span>
      <div class="music-info"><div class="music-title">${esc(track.title)}</div><div class="music-artist">${esc(track.artist || 'Unknown artist')} · <span class="badge badge-blue">${esc(track.source)}</span></div></div>
      <div class="music-actions">
        <button class="row-action" data-play-track="${track.id}" title="Play" aria-label="Play track"><svg class="icon icon-sm"><use href="#i-play"/></svg></button>
        <button class="row-action" data-delete-track="${track.id}" title="Delete" aria-label="Delete track"><svg class="icon icon-sm"><use href="#i-trash"/></svg></button>
      </div>
    </div>`).join('');
}

function playTrack(id) {
  const track = state.music.find(item => Number(item.id) === Number(id));
  if (!track) return;
  if (track.source === 'youtube') {
    window.open('https://www.youtube.com/watch?v=' + encodeURIComponent(track.filePath), '_blank', 'noopener');
    return;
  }
  let player = $('#adminPlayer');
  if (!player) {
    player = document.createElement('audio');
    player.id = 'adminPlayer';
    player.controls = true;
    player.style.cssText = 'width:100%;margin:0 0 12px;border-radius:10px';
    $('#musicPlaylist').prepend(player);
  }
  player.src = track.filePath;
  player.play().catch(() => toast('Tap play in the audio player to start.', 'error'));
}

async function deleteTrack(id) {
  if (!await askConfirm({ title: 'Delete this track?', message: 'The music file will be removed from the playlist.', confirmLabel: 'Delete track' })) return;
  try {
    await api('/api/music/' + id, { method: 'DELETE' });
    toast('Track deleted');
    loadMusic();
    loadSummary();
  } catch (error) { toast(error.message, 'error'); }
}

async function uploadMusicFiles(files) {
  if (!files || !files.length) return;
  const title = $('#musicTitle')?.value.trim() || '';
  const artist = $('#musicArtist')?.value.trim() || '';
  for (const file of files) {
    const form = new FormData();
    form.append('music', file);
    form.append('title', title || file.name.replace(/\.[^.]+$/, ''));
    form.append('artist', artist);
    try { await api('/api/music', { method: 'POST', body: form }); }
    catch (error) { toast(error.message, 'error', 'Upload failed'); }
  }
  if ($('#musicTitle')) $('#musicTitle').value = '';
  if ($('#musicArtist')) $('#musicArtist').value = '';
  toast('Music uploaded');
  loadMusic();
  loadSummary();
}

/* ================= Content ================= */
const CONFIG_FIELDS = [
  'birthdayName', 'senderName', 'age', 'togetherSince', 'hero.title', 'hero.subtitle',
  'loveLetter', 'giftMessage', 'finalHeading', 'finalSubtitle', 'compliments',
  'fortuneCookies', 'secretMessages'
];

async function loadConfig() {
  try {
    state.config = await api('/api/config');
    CONFIG_FIELDS.forEach(key => {
      const field = document.getElementById('cfg-' + key);
      if (field) field.value = state.config[key] || '';
    });
    state.dirty = false;
    updateSaveState();
  } catch (error) { toast(error.message, 'error', 'Could not load content'); }
}

async function saveConfig() {
  const payload = {};
  CONFIG_FIELDS.forEach(key => {
    const field = document.getElementById('cfg-' + key);
    if (field) payload[key] = field.value;
  });
  try {
    await api('/api/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    state.dirty = false;
    updateSaveState();
    toast('Content saved — refresh the site to see it.');
  } catch (error) { toast(error.message, 'error', 'Could not save content'); }
}

function updateSaveState() {
  $$('.sticky-save span').forEach(node => {
    node.textContent = state.dirty ? '● Unsaved changes' : 'Changes apply on the next page load.';
  });
}

/* ================= Planner ================= */
async function loadPlanner() {
  try {
    state.planner = await api('/api/planner');
    renderPlanner();
  } catch (error) { toast(error.message, 'error', 'Could not load planner'); }
}

function renderPlanner() {
  const host = $('#plannerList');
  if (!host) return;
  const done = state.planner.filter(item => item.isDone).length;
  const percent = state.planner.length ? Math.round((done / state.planner.length) * 100) : 0;
  setText('plannerChip', `${percent}% complete`);
  const progress = $('#plannerProgress');
  if (progress) progress.style.width = percent + '%';
  $('#plannerEmpty').hidden = state.planner.length > 0;
  host.innerHTML = '';
  state.planner.forEach(item => {
    const node = document.createElement('div');
    node.className = 'planner-item' + (item.isDone ? ' done' : '');
    node.innerHTML = `
      <div class="planner-check ${item.isDone ? 'checked' : ''}" data-toggle-task="${item.id}" data-done="${item.isDone}">${item.isDone ? '✓' : ''}</div>
      <div class="planner-body">
        <div class="planner-title">${esc(item.title)}</div>
        <div class="planner-meta"><span class="priority-${esc(item.priority)}">${esc((item.priority || '').toUpperCase())}</span><span>·</span><span>${esc(item.category || 'general')}</span>${item.dueDate ? `<span>·</span><span>Due ${esc(item.dueDate)}</span>` : ''}</div>
        ${item.description ? `<div class="planner-desc">${esc(item.description)}</div>` : ''}
      </div>
      <div class="planner-actions"><button class="row-action" data-delete-task="${item.id}" title="Delete task" aria-label="Delete task"><svg class="icon icon-sm"><use href="#i-trash"/></svg></button></div>`;
    host.appendChild(node);
  });
}

async function addTask() {
  const title = $('#plannerTitle')?.value.trim();
  if (!title) return toast('Give the task a title first.', 'error');
  try {
    await api('/api/planner', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description: $('#plannerDesc')?.value || '',
        dueDate: $('#plannerDate')?.value || '',
        priority: $('#plannerPriority')?.value || 'medium',
        category: $('#plannerCategory')?.value || 'general'
      })
    });
    $('#plannerTitle').value = '';
    $('#plannerDesc').value = '';
    toast('Task added');
    loadPlanner();
    loadSummary();
  } catch (error) { toast(error.message, 'error'); }
}

async function toggleTask(id, currentDone) {
  try {
    await api('/api/planner/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isDone: !currentDone }) });
    loadPlanner();
    loadSummary();
  } catch (error) { toast(error.message, 'error'); }
}

async function deleteTask(id) {
  if (!await askConfirm({ title: 'Delete this task?', message: 'This planner item will be removed permanently.', confirmLabel: 'Delete task' })) return;
  try {
    await api('/api/planner/' + id, { method: 'DELETE' });
    toast('Task deleted');
    loadPlanner();
    loadSummary();
  } catch (error) { toast(error.message, 'error'); }
}

/* ================= Database ================= */
async function loadDbTables() {
  try {
    const data = await api('/api/db');
    const host = $('#tableCards');
    const select = $('#dbTableSelect');
    if (!host || !select) return;
    host.innerHTML = (data.tables || []).map(row => `
      <button class="table-card ${row.table === state.db.table ? 'active' : ''}" data-db-table="${esc(row.table)}">
        <span class="tc-name">${esc(row.table)}</span><span class="tc-count">${Number(row.count || 0).toLocaleString()}</span>
      </button>`).join('');
    select.innerHTML = (data.tables || []).map(row => `<option value="${esc(row.table)}">${esc(row.table)}</option>`).join('');
    select.value = state.db.table;
    await loadDbTable();
  } catch (error) { toast(error.message, 'error', 'Could not load database'); }
}

async function loadDbTable(reset = true) {
  const table = $('#dbTableSelect')?.value || state.db.table;
  if (!table) return;
  state.db.table = table;
  if (reset) { state.db.rows = []; state.db.offset = 0; }
  const query = $('#dbSearch')?.value.trim() || '';
  const params = new URLSearchParams({ limit: '200', offset: String(state.db.offset || 0) });
  if (query) params.set('q', query);
  try {
    const data = await api('/api/db/' + encodeURIComponent(table) + '?' + params.toString());
    state.db.rows = state.db.rows.concat(data.rows || []);
    state.db.offset = state.db.rows.length;
    state.db.total = data.total || 0;
    state.db.columns = data.columns || [];
    renderDbTable();
    setText('dbCount', `${state.db.rows.length} of ${state.db.total} rows`);
    const moreWrap = $('#dbMoreWrap');
    if (moreWrap) moreWrap.hidden = state.db.rows.length >= state.db.total;
    $$('.table-card').forEach(card => card.classList.toggle('active', card.dataset.dbTable === table));
  } catch (error) { toast(error.message, 'error', 'Could not load table'); }
}

function renderDbTable() {
  const table = $('#dbTable');
  if (!table) return;
  const thead = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');
  thead.innerHTML = '';
  tbody.innerHTML = '';
  $('#dbEmpty').hidden = state.db.rows.length > 0;
  state.db.columns.forEach(column => {
    const th = document.createElement('th');
    th.textContent = column;
    thead.appendChild(th);
  });
  state.db.rows.forEach(row => {
    const tr = document.createElement('tr');
    state.db.columns.forEach(column => {
      const td = document.createElement('td');
      const value = row[column];
      td.textContent = value === null || value === undefined ? '—' : String(value).slice(0, 120);
      if (String(value || '').length > 60) td.title = String(value);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

/* ================= Settings ================= */
async function loadSettings() {
  try {
    state.settings = await api('/api/settings');
    const data = state.settings;
    if (data.entranceType) $('#set-entranceType').value = data.entranceType;
    if (data.entrancePassword) $('#set-entrancePassword').value = data.entrancePassword;
    if (data.autoPlayMusic !== undefined) $('#set-autoPlayMusic').checked = data.autoPlayMusic === 'true';
    if (data.youtubeId) $('#set-youtubeId').value = data.youtubeId;
    ['enableQuiz', 'enableWheel', 'enableScratch', 'enableCamera', 'enableGift', 'enablePlanner'].forEach(key => {
      const field = document.getElementById('set-' + key);
      if (field && data[key] !== undefined) field.checked = data[key] === 'true';
    });
    renderSettingsInfo();
  } catch (error) { toast(error.message, 'error', 'Could not load settings'); }
}

function renderSettingsInfo() {
  const host = $('#settingsInfo');
  const health = state.health || {};
  if (!host) return;
  const origin = window.location.origin;
  host.innerHTML = `
    <div class="info-item"><small>Site URL</small><strong>${esc(origin)}</strong></div>
    <div class="info-item"><small>Admin URL</small><strong>${esc(origin + '/admin')}</strong></div>
    <div class="info-item"><small>Server uptime</small><strong>${esc(fmtUptime(health.uptime))}</strong></div>
    <div class="info-item"><small>Online now</small><strong>${esc(String(state.summary?.online ?? health.visitors ?? 0))}</strong></div>
    <div class="info-item"><small>Database</small><strong>${esc(fmtBytes(health.dbBytes))}</strong></div>
    <div class="info-item"><small>Node.js</small><strong>${esc(health.node || '—')}</strong></div>`;
}

async function saveSettings() {
  const payload = {
    entranceType: $('#set-entranceType').value,
    entrancePassword: $('#set-entrancePassword').value,
    autoPlayMusic: String($('#set-autoPlayMusic').checked),
    youtubeId: $('#set-youtubeId').value,
    enableQuiz: String($('#set-enableQuiz').checked),
    enableWheel: String($('#set-enableWheel').checked),
    enableScratch: String($('#set-enableScratch').checked),
    enableCamera: String($('#set-enableCamera').checked),
    enableGift: String($('#set-enableGift').checked),
    enablePlanner: String($('#set-enablePlanner').checked)
  };
  try {
    await api('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    toast('Settings saved');
  } catch (error) { toast(error.message, 'error', 'Could not save settings'); }
}

/* ================= Broadcast ================= */
function loadBroadcasts() {
  try {
    const saved = JSON.parse(localStorage.getItem('birthdayBroadcasts') || '[]');
    state.broadcasts = Array.isArray(saved) ? saved.slice(0, 12) : [];
  } catch (_) { state.broadcasts = []; }
  renderBroadcasts();
  updatePreview();
}

function renderBroadcasts() {
  const host = $('#broadcastHistory');
  if (!host) return;
  if (!state.broadcasts.length) { host.innerHTML = '<div class="empty">Nothing sent yet</div>'; return; }
  host.innerHTML = state.broadcasts.map(item => `
    <div class="broadcast-entry">
      <div class="meta"><span>${esc(item.type || 'info')}</span><span>${esc(fmtTime(item.time))}</span></div>
      <div>${esc(item.message || '')}</div>
    </div>`).join('');
}

function updatePreview() {
  const title = $('#broadcastTitle')?.value.trim() || '';
  const message = $('#broadcastMessage')?.value.trim() || '';
  const type = $('#broadcastType')?.value || 'info';
  const preview = $('#broadcastPreview .preview-toast');
  if (!preview) return;
  preview.dataset.type = type;
  setText('previewTitle', title || 'A little surprise…');
  setText('previewMessage', message || 'Your message will appear here.');
}

async function sendBroadcast(title, message, type) {
  if (!message && type !== 'confetti') return toast('Write a message first.', 'error');
  try {
    const data = await api('/api/broadcast', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message, type })
    });
    state.broadcasts.unshift({ title, message, type, time: Date.now() });
    state.broadcasts = state.broadcasts.slice(0, 12);
    localStorage.setItem('birthdayBroadcasts', JSON.stringify(state.broadcasts));
    renderBroadcasts();
    toast(`Delivered to ${data.online || 0} online visitor${data.online === 1 ? '' : 's'}.`, 'success', 'Broadcast sent');
  } catch (error) { toast(error.message, 'error', 'Broadcast failed'); }
}

/* ================= Event wiring ================= */
function wireEvents() {
  $$('.form-group > label').forEach(label => {
    const field = label.parentElement?.querySelector('input, select, textarea');
    if (!field || field.getAttribute('aria-label')) return;
    if (label.htmlFor && field.id === label.htmlFor) return;
    if (field.id) label.htmlFor = field.id;
    else field.setAttribute('aria-label', label.textContent.trim());
  });
  $$('.table-wrap').forEach(wrap => {
    const hint = document.createElement('p');
    hint.className = 'scroll-hint';
    hint.textContent = 'Swipe to see all columns →';
    wrap.insertAdjacentElement('afterend', hint);
  });
  $$('.nav-item').forEach(button => button.addEventListener('click', () => switchTab(button.dataset.tab)));
  $$('[data-goto]').forEach(button => button.addEventListener('click', () => switchTab(button.dataset.goto)));

  $('#menuBtn')?.addEventListener('click', () => {
    const open = !$('#sidebar')?.classList.contains('open');
    $('#sidebar')?.classList.toggle('open', open);
    $('#sidebarOverlay')?.classList.toggle('open', open);
    $('#menuBtn')?.setAttribute('aria-expanded', String(open));
    $('#menuBtn')?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) $('#sidebar .nav-item')?.focus();
  });
  $('#sidebarOverlay')?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && $('#sidebar')?.classList.contains('open')) {
      closeSidebar();
      $('#menuBtn')?.focus();
    }
  });

  $('#refreshBtn')?.addEventListener('click', () => {
    loadTab(state.currentTab);
    loadSummary();
    toast('Refreshed');
  });

  $('#clearFeed')?.addEventListener('click', () => {
    const host = $('#activityFeed');
    if (host) host.innerHTML = '<div class="empty">Feed cleared — new events will appear here.</div>';
  });

  // Live control
  ['#broadcastTitle', '#broadcastMessage', '#broadcastType'].forEach(selector => {
    const field = $(selector);
    field?.addEventListener('input', updatePreview);
    field?.addEventListener('change', updatePreview);
  });
  $('#sendBroadcastBtn')?.addEventListener('click', () => {
    const title = $('#broadcastTitle')?.value.trim() || '';
    const message = $('#broadcastMessage')?.value.trim() || '';
    const type = $('#broadcastType')?.value || 'info';
    sendBroadcast(title, message, type);
  });
  $('#quickConfetti')?.addEventListener('click', () => sendBroadcast('', '', 'confetti'));
  $('#heroConfetti')?.addEventListener('click', () => sendBroadcast('', '', 'confetti'));
  $('#quickToast')?.addEventListener('click', () => sendBroadcast('A little love', 'Someone is thinking of you right now. 💗', 'love'));
  $('#quickAlert')?.addEventListener('click', () => sendBroadcast('Surprise!', 'Look around — something special is waiting for you.', 'alert'));
  $('#clearBroadcasts')?.addEventListener('click', () => {
    state.broadcasts = [];
    localStorage.removeItem('birthdayBroadcasts');
    renderBroadcasts();
    toast('Broadcast history cleared');
  });

  // Devices
  const rerenderDevices = debounce(() => { state.deviceLimit = 250; renderDevices(); }, 150);
  $('#deviceSearch')?.addEventListener('input', rerenderDevices);
  ['#devicePlatform', '#deviceCamera', '#deviceSort'].forEach(selector => {
    $(selector)?.addEventListener('change', () => { state.deviceLimit = 250; renderDevices(); });
  });
  $('#deviceMoreBtn')?.addEventListener('click', () => { state.deviceLimit = (state.deviceLimit || 250) + 250; renderDevices(); });
  $('#refreshDevicesBtn')?.addEventListener('click', loadDevices);
  $('#exportDevicesBtn')?.addEventListener('click', () => { window.location.href = '/api/db/devices/export.csv'; });
  $('#devicesTable')?.addEventListener('click', event => {
    const dossierButton = event.target.closest('[data-dossier]');
    if (dossierButton) {
      event.stopPropagation();
      openDossier(dossierButton.dataset.dossier);
      return;
    }
    const row = event.target.closest('tr[data-visitor]');
    if (row && row.dataset.visitor) openDossier(row.dataset.visitor);
  });
  $$('[data-close-modal]').forEach(node => node.addEventListener('click', closeModal));
  $('#confirmOk')?.addEventListener('click', () => settleConfirm(true));
  $$('[data-confirm-cancel]').forEach(node => node.addEventListener('click', () => settleConfirm(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
  document.addEventListener('keydown', event => {
    const modal = $('#confirmModal');
    if (!modal?.classList.contains('open')) return;
    if (event.key === 'Escape') { event.preventDefault(); settleConfirm(false); return; }
    if (event.key !== 'Tab') return;
    const focusable = $$('#confirmModal button, #confirmModal [href], #confirmModal input, #confirmModal select, #confirmModal textarea, #confirmModal [tabindex]:not([tabindex="-1"])')
      .filter(node => node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !$('#dossierModal')?.classList.contains('open')) return;
    const focusable = $$('#dossierModal button, #dossierModal [href], #dossierModal input, #dossierModal select, #dossierModal textarea, #dossierModal [tabindex]:not([tabindex="-1"])')
      .filter(node => node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  // Wishes
  $('#refreshWishesBtn')?.addEventListener('click', loadWishes);
  $('#wishesList')?.addEventListener('click', event => {
    const button = event.target.closest('[data-delete-wish]');
    if (button) deleteWish(button.dataset.deleteWish);
  });

  // Activity
  const reloadActivity = debounce(() => loadActivity(true), 250);
  $('#activitySearch')?.addEventListener('input', reloadActivity);
  $('#activityPage')?.addEventListener('change', () => loadActivity(true));
  $('#activityAction')?.addEventListener('change', () => loadActivity(true));
  $('#refreshActivityBtn')?.addEventListener('click', () => loadActivity(true));
  $('#loadMoreActivity')?.addEventListener('click', () => loadActivity(false));

  // Photos
  const photoZone = $('#photoUploadZone');
  const photoInput = $('#photoUploadInput');
  photoZone?.addEventListener('click', () => photoInput?.click());
  $('#browsePhotoBtn')?.addEventListener('click', event => { event.stopPropagation(); photoInput?.click(); });
  $('#uploadPhotoBtn')?.addEventListener('click', () => photoInput?.click());
  photoInput?.addEventListener('change', () => { uploadPhotos(photoInput.files); photoInput.value = ''; });
  photoZone?.addEventListener('dragover', event => { event.preventDefault(); photoZone.classList.add('dragover'); });
  photoZone?.addEventListener('dragleave', () => photoZone.classList.remove('dragover'));
  photoZone?.addEventListener('drop', event => {
    event.preventDefault();
    photoZone.classList.remove('dragover');
    uploadPhotos(event.dataTransfer.files);
  });
  $('#photoSource')?.addEventListener('change', renderPhotos);
  $('#photoGrid')?.addEventListener('click', event => {
    const button = event.target.closest('[data-delete-photo]');
    if (button) deletePhoto(button.dataset.deletePhoto);
  });

  // Music
  const musicZone = $('#musicUploadZone');
  const musicInput = $('#musicUploadInput');
  musicZone?.addEventListener('click', () => musicInput?.click());
  $('#browseMusicBtn')?.addEventListener('click', event => { event.stopPropagation(); musicInput?.click(); });
  musicInput?.addEventListener('change', () => { uploadMusicFiles(musicInput.files); musicInput.value = ''; });
  musicZone?.addEventListener('dragover', event => { event.preventDefault(); musicZone.classList.add('dragover'); });
  musicZone?.addEventListener('dragleave', () => musicZone.classList.remove('dragover'));
  musicZone?.addEventListener('drop', event => {
    event.preventDefault();
    musicZone.classList.remove('dragover');
    uploadMusicFiles(event.dataTransfer.files);
  });
  $('#uploadMusicBtn')?.addEventListener('click', () => musicInput?.click());
  $('#addYtBtn')?.addEventListener('click', async () => {
    const url = $('#ytUrl')?.value.trim() || '';
    const title = $('#ytTitle')?.value.trim() || 'YouTube Track';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
    if (!match) return toast('Paste a valid YouTube URL.', 'error');
    try {
      await api('/api/music', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, source: 'youtube', filePath: match[1], thumbnail: `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` })
      });
      $('#ytUrl').value = '';
      $('#ytTitle').value = '';
      toast('YouTube track added');
      loadMusic();
      loadSummary();
    } catch (error) { toast(error.message, 'error'); }
  });
  $('#musicPlaylist')?.addEventListener('click', event => {
    const play = event.target.closest('[data-play-track]');
    if (play) return playTrack(play.dataset.playTrack);
    const remove = event.target.closest('[data-delete-track]');
    if (remove) deleteTrack(remove.dataset.deleteTrack);
  });

  // Content
  $('#saveConfigBtn')?.addEventListener('click', saveConfig);
  $('#saveConfigBtnBottom')?.addEventListener('click', saveConfig);
  CONFIG_FIELDS.forEach(key => {
    document.getElementById('cfg-' + key)?.addEventListener('input', () => { state.dirty = true; updateSaveState(); });
  });
  window.addEventListener('beforeunload', event => {
    if (!state.dirty) return;
    event.preventDefault();
    event.returnValue = '';
  });

  // Planner
  $('#addTaskBtn')?.addEventListener('click', addTask);
  $('#plannerTitle')?.addEventListener('keydown', event => { if (event.key === 'Enter') addTask(); });
  $('#plannerList')?.addEventListener('click', event => {
    const toggle = event.target.closest('[data-toggle-task]');
    if (toggle) return toggleTask(toggle.dataset.toggleTask, toggle.dataset.done === '1');
    const remove = event.target.closest('[data-delete-task]');
    if (remove) deleteTask(remove.dataset.deleteTask);
  });

  // Database
  $('#dbLoadBtn')?.addEventListener('click', () => loadDbTable(true));
  $('#dbTableSelect')?.addEventListener('change', () => loadDbTable(true));
  $('#dbSearch')?.addEventListener('input', debounce(() => loadDbTable(true), 300));
  $('#dbMoreBtn')?.addEventListener('click', () => loadDbTable(false));
  $('#dbExportCsvBtn')?.addEventListener('click', () => { window.location.href = '/api/db/' + encodeURIComponent(state.db.table) + '/export.csv'; });
  $('#dbExportBtn')?.addEventListener('click', async () => {
    try {
      const data = await api('/api/db-export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'birthday-surprise-db-' + new Date().toISOString().slice(0, 10) + '.json';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) { toast(error.message, 'error', 'Export failed'); }
  });
  $('#tableCards')?.addEventListener('click', event => {
    const card = event.target.closest('[data-db-table]');
    if (!card) return;
    state.db.table = card.dataset.dbTable;
    if ($('#dbTableSelect')) $('#dbTableSelect').value = state.db.table;
    loadDbTable(true);
  });

  // Settings
  $('#saveSettingsBtn')?.addEventListener('click', saveSettings);
}

/* ================= Boot ================= */
document.addEventListener('DOMContentLoaded', () => {
  wireEvents();
  $('.nav-item.active')?.setAttribute('aria-current', 'page');
  initSocket();
  loadSummary();
  loadRecentFeed();
  loadBroadcasts();
  updatePreview();

  const params = new URLSearchParams(window.location.search);
  const initialTab = params.get('tab');
  if (initialTab && document.getElementById('tab-' + initialTab)) switchTab(initialTab);
});
