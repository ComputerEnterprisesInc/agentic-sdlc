const db = require('../utils/database');

class Task {
  /**
   * Get all tasks, optionally filtered by user
   */
  static async findAll(userId = null) {
    const sql = userId 
      ? 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC'
      : 'SELECT * FROM tasks ORDER BY created_at DESC';
    
    const params = userId ? [userId] : [];
    
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  /**
   * Get a single task by ID
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Create a new task
   */
  static async create(taskData) {
    const { title, description, status, priority, user_id } = taskData;
    const sql = `
      INSERT INTO tasks (title, description, status, priority, user_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;
    
    return new Promise((resolve, reject) => {
      db.run(sql, [title, description, status || 'todo', priority || 'medium', user_id], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...taskData });
      });
    });
  }

  /**
   * Update an existing task
   */
  static async update(id, taskData) {
    const { title, description, status, priority } = taskData;
    const sql = `
      UPDATE tasks 
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          status = COALESCE(?, status),
          priority = COALESCE(?, priority),
          updated_at = datetime('now')
      WHERE id = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.run(sql, [title, description, status, priority, id], function(err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error('Task not found'));
        else resolve({ id, ...taskData });
      });
    });
  }

  /**
   * Delete a task
   */
  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error('Task not found'));
        else resolve({ deleted: true, id });
      });
    });
  }

  /**
   * Get tasks by status
   */
  static async findByStatus(status, userId = null) {
    const sql = userId
      ? 'SELECT * FROM tasks WHERE status = ? AND user_id = ? ORDER BY created_at DESC'
      : 'SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC';
    
    const params = userId ? [status, userId] : [status];
    
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = Task;
