---
agent: 'agent'
description: Creates a complete data model class with CRUD methods and validation
---

# Create Data Model

Create a new data model class for {MODEL_NAME} with full CRUD operations.

## Requirements

### 1. Model Structure
- **Location**: `src/models/{ModelName}.js`
- **Pattern**: Use JavaScript class
- **Database**: SQLite with parameterized queries
- **Methods**: Include static methods for all CRUD operations

### 2. Fields
Define these fields for {MODEL_NAME}:

{FIELD_DEFINITIONS}

Example:
- title (string, required)
- description (text, optional)
- priority (enum: 'low', 'medium', 'high')
- dueDate (date, optional)
- userId (integer, foreign key to users table)

### 3. Methods to Implement

#### Static Methods

```javascript
class {ModelName} {
  // Create
  static async create(data) {
    // Insert new record
    // Return created object with id
  }

  // Read - All
  static async findAll(filters = {}) {
    // Get all records with optional filtering
    // Support userId filter
    // Return array
  }

  // Read - By ID
  static async findById(id) {
    // Get single record by id
    // Return object or null
  }

  // Read - By User
  static async findByUserId(userId, filters = {}) {
    // Get all records for a specific user
    // Support additional filters
    // Return array
  }

  // Update
  static async update(id, data) {
    // Update existing record
    // Only update provided fields
    // Return updated object
  }

  // Delete
  static async delete(id) {
    // Delete record by id
    // Return true/false
  }

  // Custom queries as needed
  static async findByStatus(status, userId) {
    // Example custom query
  }
}
```

### 4. Database Integration
- Import db from `../utils/database.js`
- Use `db.run()` for INSERT, UPDATE, DELETE
- Use `db.get()` for single record queries
- Use `db.all()` for multiple record queries
- Always use parameterized queries: `db.run(sql, [param1, param2])`

### 5. Error Handling
- Wrap all database operations in try-catch
- Throw descriptive errors
- Example:
  ```javascript
  static async findById(id) {
    try {
      const row = await db.get('SELECT * FROM {table} WHERE id = ?', [id]);
      return row || null;
    } catch (error) {
      throw new Error(`Failed to find {model}: ${error.message}`);
    }
  }
  ```

### 6. Validation
- Add a static `validate(data)` method
- Check required fields
- Validate field types and formats
- Return `{ isValid: boolean, errors: [] }`
- Example:
  ```javascript
  static validate(data) {
    const errors = [];
    if (!data.title || data.title.length < 1) {
      errors.push('Title is required');
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  ```

### 7. Database Schema
Include a comment at the top of the file with the CREATE TABLE statement:

```javascript
/**
 * Database Schema:
 * 
 * CREATE TABLE {table_name} (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   field1 TYPE CONSTRAINTS,
 *   field2 TYPE CONSTRAINTS,
 *   user_id INTEGER NOT NULL,
 *   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   FOREIGN KEY (user_id) REFERENCES users(id)
 * );
 */
```

### 8. Code Quality
- Add JSDoc comments for all methods
- Use descriptive variable names
- Follow project naming conventions
- Include timestamps (created_at, updated_at)
- Handle null/undefined gracefully

### 9. Export
Export the class as default:
```javascript
module.exports = {ModelName};
```

## Bonus Features (Optional)
- Add pagination support (limit, offset)
- Add search functionality
- Add sorting options
- Add aggregate methods (count, statistics)

Generate the complete model class with all methods, proper error handling, and documentation.
