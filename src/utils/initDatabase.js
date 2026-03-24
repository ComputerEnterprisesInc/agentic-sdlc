require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database.sqlite');

async function initDatabase() {
  const db = new sqlite3.Database(dbPath);

  console.log('🔄 Initializing database...');

  // Create tables
  await new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      // Tasks table
      db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT DEFAULT 'todo',
          priority TEXT DEFAULT 'medium',
          user_id INTEGER NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `, resolve);
    });
  });

  // Insert sample data
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  db.run(`
    INSERT OR IGNORE INTO users (username, email, password, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `, ['demo', 'demo@example.com', hashedPassword]);

  db.get('SELECT id FROM users WHERE username = ?', ['demo'], (err, user) => {
    if (user) {
      const sampleTasks = [
        { title: 'Complete project documentation', description: 'Write comprehensive docs for the new feature', status: 'todo', priority: 'high' },
        { title: 'Review pull requests', description: 'Review and approve pending PRs', status: 'in-progress', priority: 'medium' },
        { title: 'Update dependencies', description: 'Update npm packages to latest versions', status: 'todo', priority: 'low' },
        { title: 'Fix authentication bug', description: 'Investigate and fix the JWT token expiration issue', status: 'done', priority: 'high' }
      ];

      sampleTasks.forEach(task => {
        db.run(`
          INSERT INTO tasks (title, description, status, priority, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        `, [task.title, task.description, task.status, task.priority, user.id]);
      });
    }
  });

  db.close(() => {
    console.log('✅ Database initialized successfully!');
    console.log('📝 Demo user created:');
    console.log('   Username: demo');
    console.log('   Password: password123');
  });
}

initDatabase().catch(console.error);
