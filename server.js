const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    const safeName = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`;
    cb(null, safeName);
  }
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Birthday surprise backend is running',
    time: new Date().toISOString()
  });
});

app.get('/api/visitors', (_req, res) => {
  db.all('SELECT * FROM visitors ORDER BY id DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/photos', (_req, res) => {
  db.all('SELECT * FROM photos ORDER BY id DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.post('/api/visitor', (req, res) => {
  const {
    name = '',
    email = '',
    note = '',
    userAgent = '',
    browser = '',
    platform = '',
    screen = '',
    language = '',
    ip = '',
    location = {}
  } = req.body || {};

  const { country = null, city = null, latitude = null, longitude = null } = location || {};

  const query = `
    INSERT INTO visitors
      (name, email, note, userAgent, browser, platform, screen, language, ip, country, city, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    name,
    email,
    note,
    userAgent,
    browser,
    platform,
    screen,
    language,
    ip || req.ip || null,
    country,
    city,
    latitude,
    longitude
  ], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json({
      success: true,
      id: this.lastID,
      message: 'Visitor saved successfully'
    });
  });
});

app.post('/api/photo', upload.single('photo'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No photo uploaded.' });
    return;
  }

  const {
    latitude = null,
    longitude = null,
    ip = '',
    deviceInfo = ''
  } = req.body || {};

  const query = `
    INSERT INTO photos (fileName, originalName, mimeType, size, ip, latitude, longitude, deviceInfo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    req.file.filename,
    req.file.originalname,
    req.file.mimetype,
    req.file.size,
    ip || req.ip || null,
    latitude || null,
    longitude || null,
    deviceInfo || null
  ], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json({
      success: true,
      id: this.lastID,
      file: `/uploads/${req.file.filename}`,
      message: 'Photo saved successfully'
    });
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Birthday surprise server running at http://localhost:${PORT}`);
});
