---
applyTo: "src/models/**/*.js"
description: Instructions for creating and maintaining database model classes in src/models/.
---

# Database Model Instructions Example

## Purpose
Instructions for creating and maintaining database model classes in `src/models/`.

## Model Structure

All models must follow this pattern:

```javascript
const db = require('../utils/database');

class ModelName {
  /**
   * Method description
   * @param {Type} paramName - Parameter description
   * @returns {Promise<Object>} Description of return value
   */
  static async methodName(paramName) {
    return new Promise((resolve, reject) => {
      db.method(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = ModelName;
```

## Required Methods

Every model should implement these core methods:

### 1. findAll()
```javascript
static async findAll(userId = null) {
  const sql = userId 
    ? 'SELECT * FROM table WHERE user_id = ?'
    : 'SELECT * FROM table';
  const params = userId ? [userId] : [];
  
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
```

### 2. findById()
```javascript
static async findById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM table WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}
```

### 3. create()
```javascript
static async create(data) {
  const { field1, field2 } = data;
  const sql = `
    INSERT INTO table (field1, field2, created_at, updated_at)
    VALUES (?, ?, datetime('now'), datetime('now'))
  `;
  
  return new Promise((resolve, reject) => {
    db.run(sql, [field1, field2], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, ...data });
    });
  });
}
```

### 4. update()
```javascript
static async update(id, data) {
  const { field1, field2 } = data;
  const sql = `
    UPDATE table 
    SET field1 = COALESCE(?, field1),
        field2 = COALESCE(?, field2),
        updated_at = datetime('now')
    WHERE id = ?
  `;
  
  return new Promise((resolve, reject) => {
    db.run(sql, [field1, field2, id], function(err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error('Not found'));
      else resolve({ id, ...data });
    });
  });
}
```

### 5. delete()
```javascript
static async delete(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM table WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error('Not found'));
      else resolve({ deleted: true, id });
    });
  });
}
```

## Best Practices

### Use Parameterized Queries
Always use `?` placeholders to prevent SQL injection:

✅ **Correct**:
```javascript
db.get('SELECT * FROM users WHERE id = ?', [id], callback);
```

❌ **Never do this**:
```javascript
db.get(`SELECT * FROM users WHERE id = ${id}`, callback); // SQL injection risk!
```

### Handle Timestamps
Always include `created_at` and `updated_at`:
```javascript
INSERT INTO table (..., created_at, updated_at)
VALUES (..., datetime('now'), datetime('now'))

UPDATE table 
SET ..., updated_at = datetime('now')
WHERE id = ?
```

### Use COALESCE for Optional Updates
Allow partial updates by using COALESCE:
```javascript
SET field = COALESCE(?, field)
```
This keeps the existing value if the new value is NULL.

### Return Promises
Always wrap database callbacks in promises for async/await support:
```javascript
return new Promise((resolve, reject) => {
  db.operation(sql, params, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});
```

### Check for Changes
For UPDATE and DELETE operations, verify rows were affected:
```javascript
db.run(sql, params, function(err) {
  if (err) reject(err);
  else if (this.changes === 0) reject(new Error('Not found'));
  else resolve(result);
});
```

### Use JSDoc Comments
Document all methods with JSDoc:
```javascript
/**
 * Find tasks by status
 * @param {string} status - Task status (todo, in-progress, done)
 * @param {number|null} userId - Optional user ID filter
 * @returns {Promise<Array>} Array of task objects
 */
static async findByStatus(status, userId = null) {
  // Implementation
}
```

## Database Operations

### db.get()
Returns a single row:
```javascript
db.get('SELECT * FROM table WHERE id = ?', [id], (err, row) => {
  // row is an object or undefined
});
```

### db.all()
Returns all matching rows:
```javascript
db.all('SELECT * FROM table', (err, rows) => {
  // rows is an array
});
```

### db.run()
For INSERT, UPDATE, DELETE:
```javascript
db.run('INSERT INTO table VALUES (?)', [value], function(err) {
  // this.lastID - ID of inserted row
  // this.changes - Number of rows affected
});
```

## Common Model Patterns

### User-Scoped Queries
For multi-tenant data:
```javascript
static async findAll(userId = null) {
  const sql = userId 
    ? 'SELECT * FROM table WHERE user_id = ?'
    : 'SELECT * FROM table';
  const params = userId ? [userId] : [];
  return this.query(sql, params);
}
```

### Filtering Methods
Create specific finder methods:
```javascript
static async findByStatus(status, userId = null) {
  const sql = userId
    ? 'SELECT * FROM table WHERE status = ? AND user_id = ?'
    : 'SELECT * FROM table WHERE status = ?';
  const params = userId ? [status, userId] : [status];
  return this.queryAll(sql, params);
}
```

### Password Handling (User Model)
Never return password fields in queries:
```javascript
// For listing/getting users
db.get('SELECT id, username, email FROM users WHERE id = ?', [id], callback);

// For authentication only
db.get('SELECT * FROM users WHERE username = ?', [username], callback);
```

Hash passwords before storing:
```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash(password, 10);
```

## Error Handling

### Unique Constraint Violations
Handle duplicate entries gracefully:
```javascript
db.run(sql, params, function(err) {
  if (err) {
    if (err.message.includes('UNIQUE')) {
      reject(new Error('Already exists'));
    } else {
      reject(err);
    }
  } else {
    resolve(result);
  }
});
```

### Not Found vs Error
Distinguish between "not found" and actual errors:
```javascript
db.get(sql, params, (err, row) => {
  if (err) reject(err); // Database error
  else resolve(row); // row could be undefined (not found)
});
```

## When Creating New Models

1. ✅ Create class with static methods
2. ✅ Implement core CRUD methods (findAll, findById, create, update, delete)
3. ✅ Use parameterized queries
4. ✅ Add timestamps
5. ✅ Return promises
6. ✅ Add JSDoc comments
7. ✅ Handle errors appropriately
8. ✅ Test with sample data
