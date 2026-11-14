const express = require('express');
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  pingTimeout: 20000,
  pingInterval: 25000
});
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// Security and performance headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=(self)');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

const uploadsDir = path.join(__dirname, 'uploads');
const musicDir = path.join(uploadsDir, 'music');
const photosDir = path.join(uploadsDir, 'photos');
fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(musicDir, { recursive: true });
fs.mkdirSync(photosDir, { recursive: true });

const DB_PATH = path.join(__dirname, 'data', 'birthday.db');
const DB_TABLES = ['visitors', 'photos', 'wishes', 'quiz_scores', 'devices', 'captured_photos', 'music_tracks', 'activity_log', 'site_settings', 'planner_items', 'surprise_config'];

function intParam(value, fallback, min, max) {
  const n = parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

function dirStats(dir) {
  let bytes = 0;
  let count = 0;
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return { count, bytes }; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = dirStats(full);
      bytes += nested.bytes;
      count += nested.count;
    } else {
      try {
        bytes += fs.statSync(full).size;
        count += 1;
      } catch (_) {}
    }
  }
  return { count, bytes };
}

function csvCell(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

function sendCsv(res, filename, columns, rows) {
  const lines = [columns.map(csvCell).join(',')];
  rows.forEach(row => lines.push(columns.map(col => csvCell(row[col])).join(',')));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send('\uFEFF' + lines.join('\r\n'));
}

const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    if (file.fieldname === 'music') cb(null, musicDir);
    else cb(null, photosDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname) || '.dat';
    cb(null, `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// Simple gzip/brotli-free compression for text responses
const zlib = require('zlib');
app.use((req, res, next) => {
  if (req.method === 'HEAD') return next();
  const accept = String(req.headers['accept-encoding'] || '');
  if (!accept.includes('gzip')) return next();
  const _end = res.end;
  const _write = res.write;
  let chunks = [];
  let total = 0;
  const shouldCompress = () => {
    const type = String(res.getHeader('Content-Type') || '');
    return /text|json|javascript|css|svg|xml/i.test(type) && !res.getHeader('Content-Encoding');
  };
  res.write = function (chunk, enc, cb) {
    if (!shouldCompress()) return _write.call(this, chunk, enc, cb);
    if (chunk) { const b = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, enc); chunks.push(b); total += b.length; }
    if (typeof enc === 'function') enc();
    return true;
  };
  res.end = function (chunk, enc, cb) {
    if (!shouldCompress()) return _end.call(this, chunk, enc, cb);
    if (chunk) { const b = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, enc); chunks.push(b); total += b.length; }
    const body = Buffer.concat(chunks, total);
    if (body.length < 1024) { chunks = null; return _end.call(this, body, cb); }
    zlib.gzip(body, (err, gz) => {
      if (err || !gz || gz.length >= body.length) return _end.call(this, body, cb);
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Vary', 'Accept-Encoding');
      res.setHeader('Content-Length', gz.length);
      _end.call(this, gz, cb);
    });
    chunks = null;
    return this;
  };
  next();
});

app.use('/uploads', express.static(uploadsDir, {
  maxAge: '7d',
  etag: true,
  lastModified: true,
  setHeaders: (res) => res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
}));

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    const base = path.basename(filePath);
    if (base === 'sw.js' || base === 'manifest.webmanifest') {
      res.setHeader('Cache-Control', 'no-cache');
      return;
    }
    if (/\.(?:js|css|svg|png|jpg|jpeg|webp|gif|ico|woff2?|mp3|mp4)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    } else if (/\.html$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Track connected visitors
const connectedVisitors = new Map();

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('visitor-joined', (data) => {
    if (data && data.role === 'admin') {
      socket.data.isAdmin = true;
      socket.emit('visitor-count', connectedVisitors.size);
      return;
    }
    connectedVisitors.set(socket.id, { ...data, joinedAt: Date.now() });
    io.emit('visitor-count', connectedVisitors.size);
    io.emit('admin-activity', { type: 'joined', data, time: Date.now() });
  });

  socket.on('visitor-activity', (data) => {
    const visitor = connectedVisitors.get(socket.id);
    const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    db.run('INSERT INTO activity_log (visitorId, action, page, details, ip) VALUES (?, ?, ?, ?, ?)',
      [data.visitorId || socket.id, data.action, data.page || '', data.details || '', ip]);
    io.emit('admin-activity', { type: 'activity', data: { ...data, ip }, time: Date.now() });
  });

  socket.on('device-info', (data) => {
    const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    const { visitorId, userAgent, browser, platform, screen, language, timezone, geo, camera, mic } = data;
    db.run(`INSERT INTO devices (visitorId, ip, userAgent, browser, platform, screen, language, timezone, country, city, latitude, longitude, cameraPermission, micPermission, geoPermission)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [visitorId, ip, userAgent, browser, platform, screen, language, timezone,
       geo?.country || null, geo?.city || null, geo?.lat || null, geo?.lng || null,
       camera || 'prompt', mic || 'prompt', geo ? 'granted' : 'prompt']);
    io.emit('admin-device', { visitorId, ip, ...data, time: Date.now() });
  });

  socket.on('photo-captured', (data) => {
    io.emit('admin-photo', { ...data, time: Date.now() });
  });

  socket.on('admin-broadcast', (data) => {
    const msg = typeof data === 'string' ? { message: data, type: 'info' } : (data || {});
    io.emit('site-broadcast', {
      title: msg.title || '',
      message: msg.message || '',
      type: msg.type || 'info',
      time: Date.now()
    });
    db.run('INSERT INTO activity_log (visitorId, action, page, details, ip) VALUES (?, ?, ?, ?, ?)',
      ['admin', 'broadcast', 'admin', msg.message || '', socket.handshake.headers['x-forwarded-for'] || socket.handshake.address]);
  });

  socket.on('disconnect', () => {
    connectedVisitors.delete(socket.id);
    io.emit('visitor-count', connectedVisitors.size);
  });
});

// === Health ===
app.get('/api/health', (_req, res) => {
  let dbBytes = 0;
  try { dbBytes = fs.statSync(DB_PATH).size; } catch (_) {}
  const uploadStats = dirStats(uploadsDir);
  const mem = process.memoryUsage();
  res.json({
    status: 'ok',
    visitors: connectedVisitors.size,
    uptime: Math.floor(process.uptime()),
    startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString(),
    time: new Date().toISOString(),
    dbBytes,
    uploads: uploadStats,
    memory: { rss: mem.rss, heapUsed: mem.heapUsed, heapTotal: mem.heapTotal },
    node: process.version,
    platform: process.platform
  });
});

// === Visitors ===
app.get('/api/visitors', (_req, res) => {
  db.all('SELECT * FROM visitors ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/visitor', (req, res) => {
  const { name = '', email = '', note = '', userAgent = '', browser = '', platform = '', screen = '', language = '', ip = '', location = {} } = req.body || {};
  const { country = null, city = null, latitude = null, longitude = null } = location || {};
  db.run('INSERT INTO visitors (name, email, note, userAgent, browser, platform, screen, language, ip, country, city, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, note, userAgent, browser, platform, screen, language, ip || req.ip, country, city, latitude, longitude],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID });
    });
});

// === Devices ===
app.get('/api/devices', (_req, res) => {
  db.all('SELECT * FROM devices ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/devices', (req, res) => {
  const { visitorId, ip, userAgent, browser, platform, screen, language, timezone, country, city, latitude, longitude, cameraPermission, micPermission, geoPermission } = req.body || {};
  db.run(`INSERT INTO devices (visitorId, ip, userAgent, browser, platform, screen, language, timezone, country, city, latitude, longitude, cameraPermission, micPermission, geoPermission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [visitorId, ip, userAgent, browser, platform, screen, language, timezone, country, city, latitude, longitude, cameraPermission, micPermission, geoPermission],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID });
    });
});

// === Device dossier (single visitor timeline) ===
app.get('/api/devices/:visitorId/dossier', (req, res) => {
  const visitorId = String(req.params.visitorId || '');
  if (!visitorId) return res.status(400).json({ error: 'visitorId required.' });

  db.all('SELECT * FROM devices WHERE visitorId = ? ORDER BY id DESC', [visitorId], (err, devices) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all('SELECT * FROM activity_log WHERE visitorId = ? ORDER BY id DESC LIMIT 100', [visitorId], (err2, activity) => {
      if (err2) return res.status(500).json({ error: err2.message });
      db.all('SELECT * FROM captured_photos WHERE visitorId = ? ORDER BY id DESC', [visitorId], (err3, photos) => {
        if (err3) return res.status(500).json({ error: err3.message });
        const online = Array.from(connectedVisitors.values()).some(v => v && v.visitorId === visitorId);
        res.json({
          visitorId,
          online,
          device: devices[0] || null,
          devices: devices || [],
          activity: activity || [],
          photos: photos || [],
          firstSeen: devices.length ? devices[devices.length - 1].createdAt : null,
          lastSeen: devices.length ? devices[0].createdAt : null
        });
      });
    });
  });
});

// === Captured Photos ===
app.get('/api/captured-photos', (_req, res) => {
  db.all('SELECT * FROM captured_photos ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/captured-photos', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No photo.' });
  const { visitorId = '', source = 'upload' } = req.body || {};
  db.run('INSERT INTO captured_photos (visitorId, fileName, originalName, mimeType, size, source, ip) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [visitorId, req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, source, req.ip],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID, file: `/uploads/photos/${req.file.filename}` });
    });
});

app.delete('/api/captured-photos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  db.get('SELECT fileName FROM captured_photos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Photo not found.' });
    fs.unlink(path.join(photosDir, row.fileName), () => {});
    db.run('DELETE FROM captured_photos WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    });
  });
});

// === Photos (legacy) ===
app.get('/api/photos', (_req, res) => {
  db.all('SELECT * FROM photos ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/photo', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No photo.' });
  const { latitude = null, longitude = null, deviceInfo = '' } = req.body || {};
  db.run('INSERT INTO photos (fileName, originalName, mimeType, size, ip, latitude, longitude, deviceInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, req.ip, latitude, longitude, deviceInfo],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID, file: `/uploads/photos/${req.file.filename}` });
    });
});

// === Music ===
app.get('/api/music', (_req, res) => {
  db.all('SELECT * FROM music_tracks ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/music', upload.single('music'), (req, res) => {
  const { title = 'Untitled', artist = '', thumbnail = '', source = 'upload' } = req.body || {};
  if (!req.file && source === 'upload') return res.status(400).json({ error: 'No file.' });
  const filePath = req.file ? `/uploads/music/${req.file.filename}` : '';
  const fileName = req.file ? req.file.filename : '';
  db.run('INSERT INTO music_tracks (title, artist, fileName, filePath, thumbnail, source) VALUES (?, ?, ?, ?, ?, ?)',
    [title, artist, fileName, filePath, thumbnail, source],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID, filePath });
    });
});

app.put('/api/music/:id', (req, res) => {
  const { title, artist, isActive } = req.body || {};
  const sets = []; const vals = [];
  if (title !== undefined) { sets.push('title=?'); vals.push(title); }
  if (artist !== undefined) { sets.push('artist=?'); vals.push(artist); }
  if (isActive !== undefined) { sets.push('isActive=?'); vals.push(isActive ? 1 : 0); }
  if (sets.length === 0) return res.json({ success: true });
  vals.push(req.params.id);
  db.run(`UPDATE music_tracks SET ${sets.join(',')} WHERE id=?`, vals, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/music/:id', (req, res) => {
  db.get('SELECT fileName FROM music_tracks WHERE id=?', [req.params.id], (err, row) => {
    if (row && row.fileName) {
      const fp = path.join(musicDir, row.fileName);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
    db.run('DELETE FROM music_tracks WHERE id=?', [req.params.id], function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ success: true });
    });
  });
});

// === Activity Log ===
app.get('/api/activity', (req, res) => {
  const limit = intParam(req.query.limit, 50, 1, 500);
  const offset = intParam(req.query.offset, 0, 0, 1000000);
  const q = String(req.query.q || '').trim();
  const page = String(req.query.page || '').trim();
  const action = String(req.query.action || '').trim();
  const where = [];
  const vals = [];
  if (page) { where.push('page = ?'); vals.push(page); }
  if (action) { where.push('action = ?'); vals.push(action); }
  if (q) {
    where.push('(action LIKE ? OR page LIKE ? OR details LIKE ? OR visitorId LIKE ? OR ip LIKE ?)');
    const like = `%${q}%`;
    vals.push(like, like, like, like, like);
  }
  const clause = where.length ? ` WHERE ${where.join(' AND ')}` : '';
  db.get(`SELECT COUNT(*) c FROM activity_log${clause}`, vals, (err, countRow) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all(`SELECT * FROM activity_log${clause} ORDER BY id DESC LIMIT ? OFFSET ?`, [...vals, limit, offset], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ rows: rows || [], total: countRow ? countRow.c : 0, limit, offset });
    });
  });
});

// === Settings ===
app.get('/api/settings', (_req, res) => {
  db.all('SELECT * FROM site_settings', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const settings = {};
    (rows || []).forEach(r => { settings[r.settingKey] = r.settingValue; });
    res.json(settings);
  });
});

app.put('/api/settings', (req, res) => {
  const entries = Object.entries(req.body || {});
  if (entries.length === 0) return res.json({ success: true });
  let done = 0;
  entries.forEach(([key, value]) => {
    db.run('INSERT OR REPLACE INTO site_settings (settingKey, settingValue, updatedAt) VALUES (?, ?, CURRENT_TIMESTAMP)',
      [key, String(value)], () => { done++; if (done === entries.length) res.json({ success: true }); });
  });
});

// === Wishes ===
app.get('/api/wishes', (_req, res) => {
  db.all('SELECT * FROM wishes ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/wishes', (req, res) => {
  const { name = 'Anonymous', message = '' } = req.body || {};
  if (!message.trim()) return res.status(400).json({ error: 'Message required.' });
  db.run('INSERT INTO wishes (name, message) VALUES (?, ?)', [name, message], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    io.emit('admin-activity', { type: 'wish', data: { name, message }, time: Date.now() });
    res.status(201).json({ success: true, id: this.lastID });
  });
});

app.delete('/api/wishes/:id', (req, res) => {
  db.run('DELETE FROM wishes WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// === Quiz Scores ===
app.get('/api/quiz-scores', (_req, res) => {
  db.all('SELECT * FROM quiz_scores ORDER BY id DESC LIMIT 50', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/quiz-scores', (req, res) => {
  const { quizType = 'unknown', score = 0, total = 0 } = req.body || {};
  db.run('INSERT INTO quiz_scores (quizType, score, total) VALUES (?, ?, ?)', [quizType, score, total], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, id: this.lastID });
  });
});

// === Planner ===
app.get('/api/planner', (_req, res) => {
  db.all('SELECT * FROM planner_items ORDER BY isDone ASC, dueDate ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/planner', (req, res) => {
  const { title, description = '', dueDate = '', priority = 'medium', category = 'general' } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Title required.' });
  db.run('INSERT INTO planner_items (title, description, dueDate, priority, category) VALUES (?, ?, ?, ?, ?)',
    [title, description, dueDate, priority, category], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID });
    });
});

app.put('/api/planner/:id', (req, res) => {
  const { title, description, dueDate, priority, isDone, category } = req.body || {};
  const sets = []; const vals = [];
  if (title !== undefined) { sets.push('title=?'); vals.push(title); }
  if (description !== undefined) { sets.push('description=?'); vals.push(description); }
  if (dueDate !== undefined) { sets.push('dueDate=?'); vals.push(dueDate); }
  if (priority !== undefined) { sets.push('priority=?'); vals.push(priority); }
  if (isDone !== undefined) { sets.push('isDone=?'); vals.push(isDone ? 1 : 0); }
  if (category !== undefined) { sets.push('category=?'); vals.push(category); }
  if (sets.length === 0) return res.json({ success: true });
  vals.push(req.params.id);
  db.run(`UPDATE planner_items SET ${sets.join(',')} WHERE id=?`, vals, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/planner/:id', (req, res) => {
  db.run('DELETE FROM planner_items WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// === Surprise Config (editable CONFIG from admin) ===
app.get('/api/config', (_req, res) => {
  db.all('SELECT * FROM surprise_config', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const config = {};
    (rows || []).forEach(r => { config[r.configKey] = r.configValue; });
    res.json(config);
  });
});

app.put('/api/config', (req, res) => {
  const entries = Object.entries(req.body || {});
  let done = 0;
  if (entries.length === 0) return res.json({ success: true });
  entries.forEach(([key, value]) => {
    db.run('INSERT OR REPLACE INTO surprise_config (configKey, configValue, updatedAt) VALUES (?, ?, CURRENT_TIMESTAMP)',
      [key, typeof value === 'string' ? value : JSON.stringify(value)], () => { done++; if (done === entries.length) res.json({ success: true }); });
  });
});

// === Summary (dashboard stats + charts) ===
app.get('/api/summary', async (_req, res) => {
  const get = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
  });
  const all = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

  try {
    const [
      visitors, devices, uniqueVisitors, wishes, photos, legacyPhotos, music,
      activity, quiz, tasksDone, tasksTotal, byPage, byDay, byPlatform, byBrowser,
      todayActivity, countries, cities
    ] = await Promise.all([
      get('SELECT COUNT(*) c FROM visitors'),
      get('SELECT COUNT(*) c FROM devices'),
      get('SELECT COUNT(DISTINCT visitorId) c FROM devices WHERE visitorId IS NOT NULL'),
      get('SELECT COUNT(*) c FROM wishes'),
      get('SELECT COUNT(*) c FROM captured_photos'),
      get('SELECT COUNT(*) c FROM photos'),
      get('SELECT COUNT(*) c FROM music_tracks'),
      get('SELECT COUNT(*) c FROM activity_log'),
      get('SELECT COUNT(*) c FROM quiz_scores'),
      get('SELECT COUNT(*) c FROM planner_items WHERE isDone=1'),
      get('SELECT COUNT(*) c FROM planner_items'),
      all('SELECT page, COUNT(*) c FROM activity_log WHERE page IS NOT NULL AND page != "" GROUP BY page ORDER BY c DESC LIMIT 8'),
      all('SELECT date(createdAt) d, COUNT(*) c FROM activity_log GROUP BY d ORDER BY d DESC LIMIT 14'),
      all('SELECT COALESCE(NULLIF(platform, ""), "Unknown") label, COUNT(*) c FROM devices GROUP BY label ORDER BY c DESC LIMIT 6'),
      all('SELECT COALESCE(NULLIF(browser, ""), "Unknown") label, COUNT(*) c FROM devices GROUP BY label ORDER BY c DESC LIMIT 6'),
      get('SELECT COUNT(*) c FROM activity_log WHERE date(createdAt) = date("now", "localtime")'),
      all('SELECT country, COUNT(*) c FROM devices WHERE country IS NOT NULL AND country != "" GROUP BY country ORDER BY c DESC LIMIT 6'),
      all('SELECT city, country, COUNT(*) c FROM devices WHERE city IS NOT NULL AND city != "" GROUP BY city, country ORDER BY c DESC LIMIT 6')
    ]);

    res.json({
      counts: {
        visitors: visitors ? visitors.c : 0,
        devices: devices ? devices.c : 0,
        uniqueVisitors: uniqueVisitors ? uniqueVisitors.c : 0,
        wishes: wishes ? wishes.c : 0,
        photos: (photos ? photos.c : 0) + (legacyPhotos ? legacyPhotos.c : 0),
        music: music ? music.c : 0,
        activity: activity ? activity.c : 0,
        quiz: quiz ? quiz.c : 0,
        tasksDone: tasksDone ? tasksDone.c : 0,
        tasksTotal: tasksTotal ? tasksTotal.c : 0,
        todayActivity: todayActivity ? todayActivity.c : 0
      },
      online: connectedVisitors.size,
      byPage: byPage || [],
      byDay: (byDay || []).reverse(),
      byPlatform: byPlatform || [],
      byBrowser: byBrowser || [],
      countries: countries || [],
      cities: cities || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === Database explorer ===
app.get('/api/db', async (_req, res) => {
  try {
    const tables = await Promise.all(DB_TABLES.map(table => new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) c FROM ${table}`, (err, row) => {
        if (err) return reject(err);
        resolve({ table, count: row ? row.c : 0 });
      });
    })));
    res.json({ tables });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/db/:table', (req, res) => {
  const table = String(req.params.table || '');
  if (!DB_TABLES.includes(table)) return res.status(404).json({ error: 'Unknown table.' });
  const limit = intParam(req.query.limit, 50, 1, 500);
  const offset = intParam(req.query.offset, 0, 0, 1000000);
  const q = String(req.query.q || '').trim();

  db.all(`PRAGMA table_info(${table})`, (err, cols) => {
    if (err) return res.status(500).json({ error: err.message });
    const columns = (cols || []).map(col => col.name);
    let where = '';
    let vals = [];
    if (q) {
      where = ' WHERE ' + columns.map(col => `CAST("${col}" AS TEXT) LIKE ?`).join(' OR ');
      vals = columns.map(() => `%${q}%`);
    }
    db.get(`SELECT COUNT(*) c FROM ${table}${where}`, vals, (err2, countRow) => {
      if (err2) return res.status(500).json({ error: err2.message });
      db.all(`SELECT * FROM ${table}${where} ORDER BY id DESC LIMIT ? OFFSET ?`, [...vals, limit, offset], (err3, rows) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ table, columns, rows: rows || [], total: countRow ? countRow.c : 0, limit, offset });
      });
    });
  });
});

app.get('/api/db/:table/export.csv', (req, res) => {
  const table = String(req.params.table || '');
  if (!DB_TABLES.includes(table)) return res.status(404).json({ error: 'Unknown table.' });
  db.all(`PRAGMA table_info(${table})`, (err, cols) => {
    if (err) return res.status(500).json({ error: err.message });
    const columns = (cols || []).map(col => col.name);
    db.all(`SELECT * FROM ${table} ORDER BY id DESC`, (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      sendCsv(res, `${table}-${new Date().toISOString().slice(0, 10)}.csv`, columns, rows || []);
    });
  });
});

// === Broadcast (HTTP fallback for admin panel) ===
app.post('/api/broadcast', (req, res) => {
  const { title = '', message = '', type = 'info' } = req.body || {};
  if (!message && type !== 'confetti') return res.status(400).json({ error: 'Message required.' });
  const payload = { title, message, type, time: Date.now() };
  io.emit('site-broadcast', payload);
  db.run('INSERT INTO activity_log (visitorId, action, page, details, ip) VALUES (?, ?, ?, ?, ?)',
    ['admin', 'broadcast', 'admin', message || type, req.ip]);
  res.json({ success: true, broadcast: payload, online: connectedVisitors.size });
});

// === Database export ===
app.get('/api/db-export', (_req, res) => {
  const tables = ['visitors', 'photos', 'wishes', 'quiz_scores', 'devices', 'captured_photos', 'music_tracks', 'activity_log', 'site_settings', 'planner_items', 'surprise_config'];
  const result = {};
  let pending = tables.length;
  tables.forEach(t => {
    db.all(`SELECT * FROM ${t}`, (err, rows) => {
      result[t] = rows || [];
      pending--;
      if (pending === 0) res.json(result);
    });
  });
});

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error('Server error:', err && err.stack ? err.stack : err);
  if (res.headersSent) return;
  res.status(err && err.status ? err.status : 500).json({ error: 'Internal server error.' });
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

function shutdown(signal) {
  console.log(`Shutting down (${signal})...`);
  server.close(() => {
    try { db.close && db.close(() => process.exit(0)); } catch (_) {}
    setTimeout(() => process.exit(0), 500).unref();
  });
  setTimeout(() => process.exit(1), 8000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Birthday surprise server running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
