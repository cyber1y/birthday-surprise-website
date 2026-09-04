const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'birthday.db');

fs.mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      note TEXT,
      userAgent TEXT,
      browser TEXT,
      platform TEXT,
      screen TEXT,
      language TEXT,
      ip TEXT,
      country TEXT,
      city TEXT,
      latitude REAL,
      longitude REAL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fileName TEXT,
      originalName TEXT,
      mimeType TEXT,
      size INTEGER,
      ip TEXT,
      latitude REAL,
      longitude REAL,
      deviceInfo TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS wishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT DEFAULT 'Anonymous',
      message TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quizType TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      total INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitorId TEXT,
      ip TEXT,
      userAgent TEXT,
      browser TEXT,
      platform TEXT,
      screen TEXT,
      language TEXT,
      timezone TEXT,
      country TEXT,
      city TEXT,
      latitude REAL,
      longitude REAL,
      cameraPermission TEXT DEFAULT 'prompt',
      micPermission TEXT DEFAULT 'prompt',
      geoPermission TEXT DEFAULT 'prompt',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS captured_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitorId TEXT,
      fileName TEXT,
      originalName TEXT,
      mimeType TEXT,
      size INTEGER,
      source TEXT DEFAULT 'upload',
      ip TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS music_tracks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT DEFAULT '',
      fileName TEXT,
      filePath TEXT,
      duration REAL DEFAULT 0,
      thumbnail TEXT DEFAULT '',
      source TEXT DEFAULT 'upload',
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitorId TEXT,
      action TEXT NOT NULL,
      page TEXT,
      details TEXT DEFAULT '',
      ip TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      settingKey TEXT UNIQUE NOT NULL,
      settingValue TEXT DEFAULT '',
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS planner_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      dueDate TEXT,
      priority TEXT DEFAULT 'medium',
      isDone INTEGER DEFAULT 0,
      category TEXT DEFAULT 'general',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS surprise_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      configKey TEXT UNIQUE NOT NULL,
      configValue TEXT DEFAULT '',
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
