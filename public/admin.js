/* =========================================================
   Admin Panel — Real-time Birthday Surprise Controller
   ========================================================= */

const socket = io();
let activityLog = [];
let musicQueue = [];

// === Socket Connection ===
socket.on('connect', () => {
  document.getElementById('connDot').classList.add('connected');
  document.getElementById('connDot').title = 'Connected';
  socket.emit('visitor-joined', { role: 'admin', timestamp: Date.now() });
});

socket.on('disconnect', () => {
  document.getElementById('connDot').classList.remove('connected');
  document.getElementById('connDot').title = 'Disconnected';
});

socket.on('visitor-count', (count) => {
  document.getElementById('visitorBadge').textContent = count + ' online';
  document.getElementById('statVisitors').textContent = count;
});

socket.on('admin-activity', (data) => {
  addActivity(data);
  if (data.type === 'wish') loadStats();
});

socket.on('admin-device', (data) => {
  loadStats();
});

socket.on('admin-photo', (data) => {
  loadStats();
  loadPhotos();
});

// === Navigation ===
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    // Load data for tab
    const tab = btn.dataset.tab;
    if (tab === 'devices') loadDevices();
    if (tab === 'photos') loadPhotos();
    if (tab === 'music') loadMusic();
    if (tab === 'content') loadConfig();
    if (tab === 'planner') loadPlanner();
    if (tab === 'database') loadDbTable();
    if (tab === 'settings') loadSettings();
    if (tab === 'dashboard') loadStats();
  });
});

// === Activity Feed ===
function addActivity(data) {
  const feed = document.getElementById('activityFeed');
  if (feed.querySelector('.muted')) feed.innerHTML = '';
  const item = document.createElement('div');
  item.className = 'activity-item';
  const time = new Date(data.time).toLocaleTimeString();
  const typeLabels = { joined: '🔗 Joined', activity: '🎯 Activity', wish: '💌 Wish', photo: '📸 Photo' };
  const icon = typeLabels[data.type] || '📌';
  item.innerHTML = `<div class="time">${time}</div><div><span class="action">${icon}</span> ${data.data?.action || data.data?.name || data.data?.page || JSON.stringify(data.data || '').slice(0, 80)}</div>`;
  feed.prepend(item);
  if (feed.children.length > 50) feed.lastChild.remove();
}

// === Load Stats ===
async function loadStats() {
  try {
    const [devices, wishes, photos, music, planner] = await Promise.all([
      fetch('/api/devices').then(r => r.json()),
      fetch('/api/wishes').then(r => r.json()),
      fetch('/api/captured-photos').then(r => r.json()),
      fetch('/api/music').then(r => r.json()),
      fetch('/api/planner').then(r => r.json())
    ]);
    document.getElementById('statDevices').textContent = (devices || []).length;
    document.getElementById('statWishes').textContent = (wishes || []).length;
    document.getElementById('statPhotos').textContent = (photos || []).length;
    document.getElementById('statMusic').textContent = (music || []).length;
    const done = (planner || []).filter(p => p.isDone).length;
    document.getElementById('statTasks').textContent = done + '/' + (planner || []).length;
  } catch (e) { console.error('Stats error:', e); }
}

// === Devices ===
async function loadDevices() {
  const data = await fetch('/api/devices').then(r => r.json());
  const tbody = document.querySelector('#devicesTable tbody');
  tbody.innerHTML = '';
  (data || []).forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${fmtTime(d.createdAt)}</td><td>${d.ip || '—'}</td><td>${d.browser || '—'}</td><td>${d.platform || '—'}</td><td>${d.screen || '—'}</td><td>${d.city ? d.city + ', ' : ''}${d.country || '—'}</td><td><span class="badge badge-${d.cameraPermission === 'granted' ? 'green' : 'yellow'}">${d.cameraPermission}</span></td><td><span class="badge badge-${d.micPermission === 'granted' ? 'green' : 'yellow'}">${d.micPermission}</span></td>`;
    tbody.appendChild(tr);
  });
}

// === Photos ===
async function loadPhotos() {
  const data = await fetch('/api/captured-photos').then(r => r.json());
  const grid = document.getElementById('photoGrid');
  grid.innerHTML = '';
  (data || []).forEach(p => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `<img src="/uploads/photos/${p.fileName}" alt="${p.originalName}" loading="lazy"><div class="photo-info"><span class="source">${p.source}</span> — ${p.originalName}<br><small>${fmtTime(p.createdAt)}</small></div><div class="photo-actions"><button class="btn btn-sm btn-danger" onclick="deletePhoto(${p.id})">🗑️</button></div>`;
    grid.appendChild(card);
  });
  // Also load from legacy photos
  const legacy = await fetch('/api/photos').then(r => r.json());
  (legacy || []).forEach(p => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `<img src="/uploads/photos/${p.fileName}" alt="${p.originalName}" loading="lazy"><div class="photo-info"><span class="source">visitor</span> — ${p.originalName}<br><small>${fmtTime(p.createdAt)}</small></div>`;
    grid.appendChild(card);
  });
}

async function deletePhoto(id) {
  if (!confirm('Delete this photo?')) return;
  await fetch('/api/captured-photos/' + id, { method: 'DELETE' });
  loadPhotos();
  loadStats();
}

// Photo upload
const photoZone = document.getElementById('photoUploadZone');
const photoInput = document.getElementById('photoUploadInput');
if (photoZone) {
  photoZone.addEventListener('dragover', e => { e.preventDefault(); photoZone.classList.add('dragover'); });
  photoZone.addEventListener('dragleave', () => photoZone.classList.remove('dragover'));
  photoZone.addEventListener('drop', e => { e.preventDefault(); photoZone.classList.remove('dragover'); uploadPhotos(e.dataTransfer.files); });
  photoZone.addEventListener('click', () => photoInput.click());
}
if (photoInput) photoInput.addEventListener('change', () => uploadPhotos(photoInput.files));

async function uploadPhotos(files) {
  for (const file of files) {
    const fd = new FormData();
    fd.append('photo', file);
    fd.append('source', 'admin');
    await fetch('/api/captured-photos', { method: 'POST', body: fd });
  }
  loadPhotos();
  loadStats();
}

// === Music ===
async function loadMusic() {
  const data = await fetch('/api/music').then(r => r.json());
  const list = document.getElementById('musicPlaylist');
  list.innerHTML = '';
  musicQueue = data || [];
  (data || []).forEach(t => {
    const item = document.createElement('div');
    item.className = 'music-item';
    item.innerHTML = `<div class="music-info"><div class="music-title">${t.title}</div><div class="music-artist">${t.artist || 'Unknown'} · <span class="badge badge-blue">${t.source}</span></div></div><div class="music-actions">${t.filePath ? `<button class="btn btn-sm" onclick="playTrack('${t.filePath}')">▶️</button>` : ''}<button class="btn btn-sm btn-danger" onclick="deleteTrack(${t.id})">🗑️</button></div>`;
    list.appendChild(item);
  });
}

async function deleteTrack(id) {
  if (!confirm('Delete this track?')) return;
  await fetch('/api/music/' + id, { method: 'DELETE' });
  loadMusic();
  loadStats();
}

function playTrack(path) {
  let player = document.getElementById('adminPlayer');
  if (!player) {
    player = document.createElement('audio');
    player.id = 'adminPlayer';
    player.controls = true;
    player.style.cssText = 'width:100%;margin-top:12px;border-radius:10px';
    document.getElementById('musicPlaylist').prepend(player);
  }
  player.src = path;
  player.play();
}

// Music upload
const musicZone = document.getElementById('musicUploadZone');
const musicInput = document.getElementById('musicUploadInput');
if (musicZone) {
  musicZone.addEventListener('dragover', e => { e.preventDefault(); musicZone.classList.add('dragover'); });
  musicZone.addEventListener('dragleave', () => musicZone.classList.remove('dragover'));
  musicZone.addEventListener('drop', e => { e.preventDefault(); musicZone.classList.remove('dragover'); uploadMusicFiles(e.dataTransfer.files); });
}
if (musicInput) musicInput.addEventListener('change', () => uploadMusicFiles(musicInput.files));

document.getElementById('uploadMusicBtn')?.addEventListener('click', () => musicInput.click());

async function uploadMusicFiles(files) {
  const title = document.getElementById('musicTitle')?.value || '';
  const artist = document.getElementById('musicArtist')?.value || '';
  for (const file of files) {
    const fd = new FormData();
    fd.append('music', file);
    fd.append('title', title || file.name.replace(/\.[^.]+$/, ''));
    fd.append('artist', artist);
    await fetch('/api/music', { method: 'POST', body: fd });
  }
  document.getElementById('musicTitle').value = '';
  document.getElementById('musicArtist').value = '';
  loadMusic();
  loadStats();
}

// YouTube add
document.getElementById('addYtBtn')?.addEventListener('click', async () => {
  const url = document.getElementById('ytUrl')?.value || '';
  const title = document.getElementById('ytTitle')?.value || 'YouTube Track';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (!match) return alert('Invalid YouTube URL');
  await fetch('/api/music', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, source: 'youtube', filePath: match[1], thumbnail: `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` })
  });
  document.getElementById('ytUrl').value = '';
  document.getElementById('ytTitle').value = '';
  loadMusic();
});

// === Content Editor ===
async function loadConfig() {
  const data = await fetch('/api/config').then(r => r.json());
  if (data.birthdayName) document.getElementById('cfg-birthdayName').value = data.birthdayName;
  if (data.senderName) document.getElementById('cfg-senderName').value = data.senderName;
  if (data.age) document.getElementById('cfg-age').value = data.age;
  if (data.togetherSince) document.getElementById('cfg-togetherSince').value = data.togetherSince;
  if (data['hero.title']) document.getElementById('cfg-hero.title').value = data['hero.title'];
  if (data['hero.subtitle']) document.getElementById('cfg-hero.subtitle').value = data['hero.subtitle'];
  if (data.loveLetter) document.getElementById('cfg-loveLetter').value = data.loveLetter;
  if (data.giftMessage) document.getElementById('cfg-giftMessage').value = data.giftMessage;
  if (data.finalHeading) document.getElementById('cfg-finalHeading').value = data.finalHeading;
  if (data.finalSubtitle) document.getElementById('cfg-finalSubtitle').value = data.finalSubtitle;
  if (data.compliments) document.getElementById('cfg-compliments').value = data.compliments;
  if (data.fortuneCookies) document.getElementById('cfg-fortuneCookies').value = data.fortuneCookies;
  if (data.secretMessages) document.getElementById('cfg-secretMessages').value = data.secretMessages;
}

document.getElementById('saveConfigBtn')?.addEventListener('click', async () => {
  const config = {
    birthdayName: document.getElementById('cfg-birthdayName').value,
    senderName: document.getElementById('cfg-senderName').value,
    age: document.getElementById('cfg-age').value,
    togetherSince: document.getElementById('cfg-togetherSince').value,
    'hero.title': document.getElementById('cfg-hero.title').value,
    'hero.subtitle': document.getElementById('cfg-hero.subtitle').value,
    loveLetter: document.getElementById('cfg-loveLetter').value,
    giftMessage: document.getElementById('cfg-giftMessage').value,
    finalHeading: document.getElementById('cfg-finalHeading').value,
    finalSubtitle: document.getElementById('cfg-finalSubtitle').value,
    compliments: document.getElementById('cfg-compliments').value,
    fortuneCookies: document.getElementById('cfg-fortuneCookies').value,
    secretMessages: document.getElementById('cfg-secretMessages').value
  };
  await fetch('/api/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });
  socket.emit('visitor-activity', { action: 'config-updated', page: 'admin', details: Object.keys(config).join(', ') });
  alert('Content saved! Changes will appear on next page load.');
});

// === Planner ===
async function loadPlanner() {
  const data = await fetch('/api/planner').then(r => r.json());
  const list = document.getElementById('plannerList');
  list.innerHTML = '';
  (data || []).forEach(item => {
    const el = document.createElement('div');
    el.className = 'planner-item' + (item.isDone ? ' done' : '');
    el.innerHTML = `<div class="planner-check ${item.isDone ? 'checked' : ''}" onclick="toggleTask(${item.id}, ${item.isDone})">${item.isDone ? '✓' : ''}</div><div class="planner-body"><div class="planner-title">${item.title}</div><div class="planner-meta"><span class="priority-${item.priority}">${item.priority.toUpperCase()}</span> · ${item.category} ${item.dueDate ? '· Due: ' + item.dueDate : ''}</div>${item.description ? `<div class="planner-desc">${item.description}</div>` : ''}</div><div class="planner-actions"><button class="btn btn-sm btn-danger" onclick="deleteTask(${item.id})">🗑️</button></div>`;
    list.appendChild(el);
  });
}

document.getElementById('addTaskBtn')?.addEventListener('click', async () => {
  const title = document.getElementById('plannerTitle')?.value;
  if (!title) return;
  await fetch('/api/planner', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description: document.getElementById('plannerDesc')?.value || '',
      dueDate: document.getElementById('plannerDate')?.value || '',
      priority: document.getElementById('plannerPriority')?.value || 'medium',
      category: document.getElementById('plannerCategory')?.value || 'general'
    })
  });
  document.getElementById('plannerTitle').value = '';
  document.getElementById('plannerDesc').value = '';
  loadPlanner();
});

async function toggleTask(id, currentDone) {
  await fetch('/api/planner/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isDone: !currentDone }) });
  loadPlanner();
  loadStats();
}

async function deleteTask(id) {
  if (!confirm('Delete task?')) return;
  await fetch('/api/planner/' + id, { method: 'DELETE' });
  loadPlanner();
  loadStats();
}

// === Database Viewer ===
document.getElementById('dbLoadBtn')?.addEventListener('click', loadDbTable);

async function loadDbTable() {
  const table = document.getElementById('dbTableSelect')?.value;
  if (!table) return;
  const data = await fetch('/api/db-export').then(r => r.json());
  const rows = data[table] || [];
  const tbl = document.getElementById('dbTable');
  const thead = tbl.querySelector('thead tr');
  const tbody = tbl.querySelector('tbody');
  thead.innerHTML = '';
  tbody.innerHTML = '';
  if (rows.length === 0) { thead.innerHTML = '<th>No data</th>'; return; }
  const cols = Object.keys(rows[0]);
  cols.forEach(c => { const th = document.createElement('th'); th.textContent = c; thead.appendChild(th); });
  rows.forEach(row => {
    const tr = document.createElement('tr');
    cols.forEach(c => { const td = document.createElement('td'); td.textContent = row[c] ?? '—'; tr.appendChild(td); });
    tbody.appendChild(tr);
  });
}

document.getElementById('dbExportBtn')?.addEventListener('click', async () => {
  const data = await fetch('/api/db-export').then(r => r.json());
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'birthday-surprise-db-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
});

// === Settings ===
async function loadSettings() {
  const data = await fetch('/api/settings').then(r => r.json());
  if (data.entranceType) document.getElementById('set-entranceType').value = data.entranceType;
  if (data.entrancePassword) document.getElementById('set-entrancePassword').value = data.entrancePassword;
  if (data.autoPlayMusic) document.getElementById('set-autoPlayMusic').checked = data.autoPlayMusic === 'true';
  if (data.youtubeId) document.getElementById('set-youtubeId').value = data.youtubeId;
  ['enableQuiz', 'enableWheel', 'enableScratch', 'enableCamera', 'enableGift', 'enablePlanner'].forEach(k => {
    const el = document.getElementById('set-' + k);
    if (el && data[k] !== undefined) el.checked = data[k] === 'true';
  });
}

document.getElementById('saveSettingsBtn')?.addEventListener('click', async () => {
  const settings = {
    entranceType: document.getElementById('set-entranceType').value,
    entrancePassword: document.getElementById('set-entrancePassword').value,
    autoPlayMusic: String(document.getElementById('set-autoPlayMusic').checked),
    youtubeId: document.getElementById('set-youtubeId').value,
    enableQuiz: String(document.getElementById('set-enableQuiz').checked),
    enableWheel: String(document.getElementById('set-enableWheel').checked),
    enableScratch: String(document.getElementById('set-enableScratch').checked),
    enableCamera: String(document.getElementById('set-enableCamera').checked),
    enableGift: String(document.getElementById('set-enableGift').checked),
    enablePlanner: String(document.getElementById('set-enablePlanner').checked)
  };
  await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
  alert('Settings saved!');
});

// === Utility ===
function fmtTime(ts) {
  if (!ts) return '—';
  try { return new Date(ts).toLocaleString(); } catch (e) { return ts; }
}

// === Init ===
loadStats();
