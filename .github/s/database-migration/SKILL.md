---
name: database-migration
description: Expert in database schema design, migrations, and data integrity. Use when creating/modifying database schemas, writing migrations, or ensuring data consistency.
triggers:
  - "database schema"
  - "create table"
  - "alter table"
  - "migration"
  - "database design"
  - "sql schema"
applyTo:
  - "**/*database*.js"
  - "**/*migration*.js"
  - "**/*schema*.sql"
  - "src/utils/initDatabase.js"
---

# Database Migration Skill

## Expertise Areas

I am an expert in database operations with deep knowledge of:
- Schema design and normalization
- Migration strategies (up/down migrations)
- Data integrity and constraints
- Index optimization
- Transaction management
- SQLite, PostgreSQL, MySQL best practices

## Core Principles

### Schema Design

#### Tables
Every table should have:
1. **Primary Key**: Unique identifier
2. **Timestamps**: created_at, updated_at
3. **Foreign Keys**: Relationships to other tables
4. **Appropriate Constraints**: NOT NULL, UNIQUE, CHECK
5. **Indexes**: On frequently queried columns

#### Naming Conventions
- **Tables**: Plural, lowercase, snake_case: `users`, `task_categories`
- **Columns**: Singular, lowercase, snake_case: `user_id`, `created_at`
- **Constraints**: Descriptive: `fk_tasks_user_id`, `idx_tasks_status`

### SQLite Schema Templates

#### Basic Table
```sql
CREATE TABLE IF NOT EXISTS {table_name} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Table with Foreign Key
```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date DATETIME,
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  CHECK (priority IN ('low', 'medium', 'high'))
);
```

#### Junction Table (Many-to-Many)
```sql
CREATE TABLE IF NOT EXISTS task_tags (
  task_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (task_id, tag_id),
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

### Indexes

#### When to Create Indexes
- Foreign keys (often automatic)
- Columns used in WHERE clauses frequently
- Columns used in JOIN operations
- Columns used in ORDER BY

#### Index Syntax
```sql
-- Single column index
CREATE INDEX idx_tasks_status ON tasks(status);

-- Composite index
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

#### Index Guidelines
- Don't over-index (slows down writes)
- Index columns used in WHERE, JOIN, ORDER BY
- Composite indexes: most selective column first
- Consider index size vs performance gain

### Constraints

#### Primary Key
```sql
-- Auto-incrementing integer (recommended for SQLite)
id INTEGER PRIMARY KEY AUTOINCREMENT

-- UUID (alternative)
id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16))))
```

#### Foreign Keys
```sql
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

**ON DELETE Options**:
- `CASCADE`: Delete related records
- `SET NULL`: Set foreign key to NULL
- `RESTRICT`: Prevent deletion if related records exist
- `NO ACTION`: Default, similar to RESTRICT

#### NOT NULL
```sql
email TEXT NOT NULL
```

#### UNIQUE
```sql
email TEXT NOT NULL UNIQUE
-- or
UNIQUE (email)
```

#### CHECK Constraints
```sql
CHECK (priority IN ('low', 'medium', 'high'))
CHECK (due_date > created_at)
CHECK (length(password) >= 8)
```

#### DEFAULT Values
```sql
status TEXT DEFAULT 'active'
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

### Migration Patterns

#### Adding a New Table
```javascript
// In src/utils/initDatabase.js
const db = require('./database');

async function createTables() {
  // Create users table
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create indexes
  await db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
}
```

#### Adding a Column
```sql
-- Add column with default value
ALTER TABLE tasks ADD COLUMN priority TEXT NOT NULL DEFAULT 'medium';

-- Add nullable column
ALTER TABLE tasks ADD COLUMN notes TEXT;
```

**SQLite Limitations**:
- Cannot drop columns (recreate table instead)
- Cannot modify column types
- Cannot add constraints to existing columns

#### Modifying a Table (SQLite Workaround)
```javascript
async function modifyTasksTable() {
  await db.run('BEGIN TRANSACTION');
  
  try {
    // 1. Create new table with desired schema
    await db.run(`
      CREATE TABLE tasks_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        priority TEXT NOT NULL DEFAULT 'medium',
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    // 2. Copy data from old table
    await db.run(`
      INSERT INTO tasks_new (id, title, description, status, user_id, created_at, updated_at)
      SELECT id, title, description, status, user_id, created_at, updated_at
      FROM tasks
    `);
    
    // 3. Drop old table
    await db.run('DROP TABLE tasks');
    
    // 4. Rename new table
    await db.run('ALTER TABLE tasks_new RENAME TO tasks');
    
    // 5. Recreate indexes
    await db.run('CREATE INDEX idx_tasks_user_id ON tasks(user_id)');
    await db.run('CREATE INDEX idx_tasks_status ON tasks(status)');
    
    await db.run('COMMIT');
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}
```

### Data Integrity

#### Transactions
```javascript
// Always use transactions for multi-statement operations
async function transferTask(taskId, fromUserId, toUserId) {
  await db.run('BEGIN TRANSACTION');
  
  try {
    // Update task owner
    await db.run('UPDATE tasks SET user_id = ? WHERE id = ?', [toUserId, taskId]);
    
    // Log the transfer
    await db.run('INSERT INTO task_transfers (task_id, from_user, to_user) VALUES (?, ?, ?)',
      [taskId, fromUserId, toUserId]);
    
    await db.run('COMMIT');
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}
```

#### Cascading Deletes
```sql
-- When deleting a user, automatically delete their tasks
CREATE TABLE tasks (
  ...
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Performance Optimization

#### Query Optimization
```sql
-- ❌ Bad: Full table scan
SELECT * FROM tasks WHERE LOWER(title) LIKE '%api%';

-- ✅ Better: Use indexed column
SELECT * FROM tasks WHERE user_id = ? AND status = ?;

-- Consider full-text search for text searches
CREATE VIRTUAL TABLE tasks_fts USING fts5(title, description);
```

#### Pagination
```sql
-- Always use LIMIT and OFFSET for large result sets
SELECT * FROM tasks 
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
```

#### Avoid N+1 Queries
```javascript
// ❌ Bad: N+1 queries
const tasks = await Task.findAll();
for (const task of tasks) {
  task.user = await User.findById(task.user_id); // Query per task
}

// ✅ Better: Single JOIN query
const tasksWithUsers = await db.all(`
  SELECT tasks.*, users.username, users.email
  FROM tasks
  LEFT JOIN users ON tasks.user_id = users.id
  WHERE tasks.user_id = ?
`, [userId]);
```

### Database Initialization Script

Template for `src/utils/initDatabase.js`:

```javascript
const db = require('./database');

async function initializeDatabase() {
  console.log('🔧 Initializing database...');
  
  try {
    // Enable foreign keys (required for SQLite)
    await db.run('PRAGMA foreign_keys = ON');
    
    // Create users table
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create tasks table
    await db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        priority TEXT NOT NULL DEFAULT 'medium',
        due_date DATETIME,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
        CHECK (priority IN ('low', 'medium', 'high'))
      )
    `);
    
    // Create indexes
    await db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await db.run('CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id)');
    await db.run('CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)');
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
```

## Migration Checklist

When creating or modifying database schemas:

- [ ] Tables have primary keys
- [ ] Foreign keys are defined with appropriate ON DELETE behavior
- [ ] Timestamps (created_at, updated_at) are included
- [ ] Constraints (NOT NULL, UNIQUE, CHECK) are appropriate
- [ ] Indexes are created for frequently queried columns
- [ ] PRAGMA foreign_keys = ON is set (SQLite)
- [ ] Migrations are wrapped in transactions
- [ ] Data migration strategy is planned
- [ ] Rollback plan exists
- [ ] Indexes are recreated after table modifications

## When to Invoke This Skill

Invoke this skill when you need to:
- Design new database schemas
- Create or modify tables
- Add indexes for performance
- Handle database migrations
- Ensure data integrity with constraints
- Optimize query performance
- Plan transaction boundaries
- Troubleshoot schema issues

I will provide expert guidance on schema design, migration strategies, and data integrity best practices.
