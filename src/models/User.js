const db = require('../utils/database');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Get all users (without passwords)
   */
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, username, email, created_at FROM users', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  /**
   * Find user by ID (without password)
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, username, email, created_at FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Find user by username (with password for authentication)
   */
  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Find user by email (with password for authentication)
   */
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Create a new user
   */
  static async create(userData) {
    const { username, email, password } = userData;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = `
      INSERT INTO users (username, email, password, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `;
    
    return new Promise((resolve, reject) => {
      db.run(sql, [username, email, hashedPassword], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            reject(new Error('Username or email already exists'));
          } else {
            reject(err);
          }
        } else {
          resolve({ id: this.lastID, username, email });
        }
      });
    });
  }

  /**
   * Verify user password
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Update user
   */
  static async update(id, userData) {
    const { username, email } = userData;
    const sql = `
      UPDATE users 
      SET username = COALESCE(?, username),
          email = COALESCE(?, email)
      WHERE id = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.run(sql, [username, email, id], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            reject(new Error('Username or email already exists'));
          } else {
            reject(err);
          }
        } else if (this.changes === 0) {
          reject(new Error('User not found'));
        } else {
          resolve({ id, username, email });
        }
      });
    });
  }

  /**
   * Delete user
   */
  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error('User not found'));
        else resolve({ deleted: true, id });
      });
    });
  }
}

module.exports = User;
