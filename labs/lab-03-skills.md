# Lab 3: Skills - Packaging Domain Expertise

**Duration:** 60 minutes  
**Difficulty:** Intermediate  
**Autonomy Level:** ⭐⭐⭐☆☆ (50% - Domain Expertise)

## 📋 Overview

In this lab, you'll learn how to create **skills** - packages of domain-specific knowledge that Copilot invokes automatically based on trigger phrases. This is where AI assistance becomes truly proactive!

### What You'll Learn
- Creating `SKILL.md` files
- Configuring trigger phrases
- Packaging domain expertise
- Managing tool permissions
- Designing decision trees for AI

### What You'll Build
- API Design skill
- Database Migration skill
- Error Handling skill
- Performance Optimization skill

### Prerequisites
- Completed Labs 1 and 2
- Understanding of instructions and prompts

---

## 🎯 Learning Objectives

By the end of this lab, you will:
1. ✅ Understand how skills differ from prompts
2. ✅ Create auto-triggering skills
3. ✅ Package domain knowledge effectively
4. ✅ Configure tool permissions
5. ✅ Build a library of specialized expertise

---

## 📚 Background: Prompts vs Skills

### The Evolution of Autonomy

| Feature | Prompts | Skills |
|---------|---------|--------|
| **Invocation** | Manual | Automatic |
| **Trigger** | Explicit reference | Natural language |
| **Scope** | Single task | Domain knowledge |
| **Autonomy** | 25% (You initiate) | 50% (AI detects need) |
| **Usage** | "Do this task" | "I need expertise in..." |

### The Key Difference

**Prompts: You Tell Copilot What To Do**
```
@workspace #file:add-endpoint.prompt.md create a users endpoint
```

**Skills: Copilot Knows When To Help**
```
Me: "I need to design an API for managing products"
Copilot: *automatically invokes api-design skill*
Copilot: "Let me help you design that API..."
```

### When to Use Skills

Use skills when:
- ✅ Knowledge applies across many scenarios
- ✅ AI should detect when expertise is needed
- ✅ Domain has established best practices
- ✅ Decision-making patterns are complex
- ✅ You want proactive assistance

Don't use skills when:
- ❌ Task is one-off or very specific
- ❌ Workflow is linear and simple
- ❌ You want explicit control over invocation
- ❌ No clear trigger phrases exist

---

## 🔧 Part 1: Understanding Skill Structure

### Step 1: Examine an Example Skill

1. Navigate to `examples/skills/api-design/`

2. Open `SKILL.md` and study the structure:

```markdown
---
name: api-design              # Unique identifier
description: REST API design best practices
triggerPhrases:              # What activates this skill
  - "design api"
  - "create endpoint"
  - "rest api"
allowedTools:                # Tools skill can use
  - create_file
  - replace_string_in_file
requiresConfirmation: false  # Auto-execute or ask first
---

# Skill Content
- When to use
- Core principles
- Implementation patterns
- Decision trees
- Examples
```

3. Notice the key sections:
   - **Frontmatter**: Configuration (triggers, tools)
   - **When to Use**: Activation scenarios
   - **Core Principles**: Domain fundamentals
   - **Decision Trees**: How to make choices
   - **Examples**: Concrete implementations

### Step 2: Understand Trigger Phrases

Good trigger phrases are:
- ✅ Natural language
- ✅ Multiple variations
- ✅ Specific enough to avoid false triggers
- ✅ Broad enough to catch variations

Examples:

**Too Specific:**
```yaml
triggerPhrases:
  - "design a RESTful API following best practices and conventions"
```
*Problem*: Too verbose, won't match casual language

**Too Broad:**
```yaml
triggerPhrases:
  - "api"
  - "design"
```
*Problem*: Triggers on everything, too noisy

**Just Right:**
```yaml
triggerPhrases:
  - "design api"
  - "create endpoint"
  - "rest api"
  - "api structure"
  - "api best practices"
```
*Perfect*: Natural variations, specific enough

---

## 🔧 Part 2: Create Your First Skill

Let's create an API Design skill from scratch.

### Step 1: Create Skill Directory

```bash
mkdir -p .github/copilot/skills/api-design
```

### Step 2: Create the Skill File

Create `.github/copilot/skills/api-design/SKILL.md`:

```markdown
---
name: api-design
description: REST API design patterns and best practices for building scalable, maintainable APIs
triggerPhrases:
  - "design api"
  - "create endpoint"
  - "rest api"
  - "api structure"
  - "api architecture"
  - "design rest"
allowedTools:
  - create_file
  - replace_string_in_file
  - read_file
  - grep_search
requiresConfirmation: false
---

# API Design Skill

## When to Use This Skill

Invoke this skill when:
- Designing new REST API endpoints
- Restructuring existing APIs
- Making API architecture decisions
- Creating resource models
- Planning URL structures
- Designing request/response formats

## Core Principles

### 1. Resource-Oriented Design

APIs should model resources, not actions:

**❌ Bad (Action-Oriented)**
```
POST /createUser
POST /deleteProduct
GET /getUserOrders
```

**✅ Good (Resource-Oriented)**
```
POST   /users
DELETE /products/:id
GET    /users/:id/orders
```

### 2. HTTP Methods Map to Operations

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve resource(s) | GET /products |
| POST | Create new resource | POST /products |
| PUT | Replace entire resource | PUT /products/123 |
| PATCH | Update partial resource | PATCH /products/123 |
| DELETE | Remove resource | DELETE /products/123 |

### 3. Proper Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Not authenticated |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

### 4. Consistent Response Format

Always use consistent JSON structure:

```javascript
// Success Response
{
  "success": true,
  "data": {
    // resource data
  }
}

// Error Response
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": []  // Optional field-specific errors
  }
}
```

## Implementation Patterns

### Pattern 1: Collection + Resource

```
GET    /resources          # List all
POST   /resources          # Create one
GET    /resources/:id      # Get one
PUT    /resources/:id      # Replace one
PATCH  /resources/:id      # Update one
DELETE /resources/:id      # Delete one
```

### Pattern 2: Nested Resources

For related resources:

```
GET /users/:userId/orders           # User's orders
GET /users/:userId/orders/:orderId  # Specific order
POST /users/:userId/orders          # Create order for user
```

**Limit nesting to 2 levels maximum!**

### Pattern 3: Filtering & Pagination

```
GET /products?category=electronics&page=2&limit=20&sort=price&order=asc
```

Pagination response:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 2,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

### Pattern 4: Versioning

Choose one approach:

**URL Versioning (Recommended)**
```
/api/v1/products
/api/v2/products
```

**Header Versioning**
```
GET /api/products
Accept: application/vnd.api+json;version=1
```

## Decision Trees

### Choosing HTTP Method

```
Creating new resource?
  ├─ YES → POST
  └─ NO → Modifying existing?
      ├─ YES → Full replacement?
      │   ├─ YES → PUT
      │   └─ NO → PATCH
      └─ NO → Deleting?
          ├─ YES → DELETE
          └─ NO → Reading?
              ├─ YES → GET
              └─ NO → Consider alternatives
```

### Choosing URL Structure

```
Operating on collection or item?
  ├─ Collection → /resources
  └─ Single item → /resources/:id
      ├─ Related resource? → /resources/:id/related
      └─ Action needed? → Consider POST to sub-resource
```

### Choosing Status Code

```
Request successful?
  ├─ YES → Created something new?
  │   ├─ YES → 201 Created
  │   └─ NO → Returning data?
  │       ├─ YES → 200 OK
  │       └─ NO → 204 No Content
  └─ NO → Client error?
      ├─ YES → Invalid input?
      │   ├─ YES → 400 Bad Request
      │   └─ NO → Not authenticated?
      │       ├─ YES → 401 Unauthorized
      │       └─ NO → Not authorized?
      │           ├─ YES → 403 Forbidden
      │           └─ NO → Not found?
      │               ├─ YES → 404 Not Found
      │               └─ NO → Other client error
      └─ NO → Server error → 500 Internal Server Error
```

## Common Pitfalls

### ❌ Using Verbs in URLs

**Bad:**
```
POST /createProduct
GET  /getUser/123
POST /deleteOrder/456
```

**Good:**
```
POST   /products
GET    /users/123
DELETE /orders/456
```

### ❌ Inconsistent Naming

**Bad:**
```
/user      # singular
/products  # plural
/order_items  # snake_case
```

**Good:**
```
/users       # plural
/products    # plural
/order-items # kebab-case (all consistent)
```

### ❌ Wrong HTTP Methods

**Bad:**
```
GET /deleteUser/:id       # GET should not modify
POST /getProducts         # POST should create, not read
```

**Good:**
```
DELETE /users/:id
GET /products
```

### ❌ Exposing Implementation Details

**Bad:**
```
GET /database/users
POST /cache/clear
GET /products.php
```

**Good:**
```
GET /users
POST /cache      # If cache is a resource
GET /products    # Extension-less
```

## Example Implementations

### Complete CRUD Endpoint

```javascript
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Joi = require('joi');

// Validation schema
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).default(0)
});

// GET /products - List all products
router.get('/', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const products = await Product.findAll({ limit, offset });
    const total = await Product.count();
    
    res.json({
      success: true,
      data: {
        items: products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    });
  }
});

// GET /products/:id - Get one product
router.get('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    });
  }
});

// POST /products - Create product
router.post('/', authenticate, async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message,
          details: error.details
        }
      });
    }
    
    const product = await Product.create(value);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    });
  }
});

module.exports = router;
```

## Quick Reference

### URL Design Checklist
- [ ] Uses nouns, not verbs
- [ ] Plural for collections
- [ ] Consistent naming (all kebab-case or all snake_case)
- [ ] Maximum 2 levels of nesting
- [ ] No file extensions
- [ ] Lowercase only

### Status Code Checklist
- [ ] 200 for successful GET/PUT/PATCH
- [ ] 201 for successful POST
- [ ] 204 for successful DELETE
- [ ] 400 for bad input
- [ ] 401 for missing auth
- [ ] 403 for insufficient permissions
- [ ] 404 for not found
- [ ] 500 for server errors

### Response Format Checklist
- [ ] Consistent JSON structure
- [ ] Success field present
- [ ] Data wrapped in data field
- [ ] Errors include code and message
- [ ] Pagination info for lists

## Related Resources

- REST API Naming conventions
- HTTP specification (RFC 7231)
- JSON API specification
```

3. Save the file

### Step 3: Test the Skill

1. Open Copilot chat

2. Type naturally (don't reference the skill):
   ```
   I need to design an API for managing projects. Each project has tasks.
   ```

3. Watch Copilot:
   - Should automatically detect this is an API design question
   - Invoke the api-design skill
   - Provide recommendations based on skill content
   - Suggest URL structures like:
     ```
     GET    /projects
     POST   /projects
     GET    /projects/:id
     GET    /projects/:id/tasks
     ```

4. Try variations:
   ```
   "How should I structure REST endpoints for users?"
   "What's the best way to create an API for products?"
   "Should I use POST or PUT for updating?"
   ```

---

## 🔧 Part 3: Database Migration Skill

Let's create a skill for a different domain: database migrations.

### Step 1: Create Migration Skill

Create `.github/copilot/skills/database-migration/SKILL.md`:

```markdown
---
name: database-migration
description: Database schema migration best practices and patterns for SQLite
triggerPhrases:
  - "database migration"
  - "schema change"
  - "alter table"
  - "migrate database"
  - "update schema"
  - "add column"
  - "create table"
allowedTools:
  - create_file
  - replace_string_in_file
  - read_file
requiresConfirmation: false
---

# Database Migration Skill

## When to Use This Skill

Invoke when:
- Creating new database tables
- Modifying existing schemas
- Adding/removing columns
- Creating indexes
- Migrating data between versions

## Core Principles

### 1. Migrations Are Immutable
- Never modify existing migration files
- Create new migration for corrections
- Maintain chronological order

### 2. Forward and Backward
- Include UP migration (apply change)
- Include DOWN migration (revert change)
- Test both directions

### 3. Atomic Operations
- One logical change per migration
- Use transactions where possible
- All-or-nothing execution

## SQLite-Specific Patterns

### Pattern 1: Create Table

```sql
-- UP
CREATE TABLE IF NOT EXISTS table_name (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_table_name_name ON table_name(name);

-- DOWN
DROP INDEX IF EXISTS idx_table_name_name;
DROP TABLE IF EXISTS table_name;
```

### Pattern 2: Add Column

SQLite limitations require table recreation:

```sql
-- UP
BEGIN TRANSACTION;

-- Create new table with additional column
CREATE TABLE table_name_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  new_column TEXT,  -- New column
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Copy data
INSERT INTO table_name_new (id, name, created_at, updated_at)
SELECT id, name, created_at, updated_at FROM table_name;

-- Replace old table
DROP TABLE table_name;
ALTER TABLE table_name_new RENAME TO table_name;

COMMIT;

-- DOWN
BEGIN TRANSACTION;

CREATE TABLE table_name_old (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO table_name_old (id, name, created_at, updated_at)
SELECT id, name, created_at, updated_at FROM table_name;

DROP TABLE table_name;
ALTER TABLE table_name_old RENAME TO table_name;

COMMIT;
```

### Pattern 3: Add Foreign Key

```sql
-- UP
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  total REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_orders_user_id ON orders(user_id);

-- DOWN
DROP INDEX IF EXISTS idx_orders_user_id;
DROP TABLE IF EXISTS orders;
```

## Migration File Structure

```javascript
// migrations/001_create_users_table.js
module.exports = {
  up: (db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
      
      CREATE INDEX idx_users_email ON users(email);
    `);
  },
  
  down: (db) => {
    db.exec(`
      DROP INDEX IF EXISTS idx_users_email;
      DROP TABLE IF EXISTS users;
    `);
  }
};
```

## Decision Trees

### When to Add Index

```
Column used in WHERE clause?
  ├─ YES → High selectivity?
  │   ├─ YES → CREATE INDEX
  │   └─ NO → Many duplicates?
  │       ├─ YES → Probably not useful
  │       └─ NO → Monitor performance first
  └─ NO → Column used in JOIN?
      ├─ YES → CREATE INDEX
      └─ NO → Column used in ORDER BY?
          ├─ YES → CREATE INDEX
          └─ NO → Index not needed
```

### Choosing Column Type

```
Storing what type of data?
  ├─ Whole numbers → INTEGER
  ├─ Decimal numbers → REAL
  ├─ Text → TEXT
  ├─ Binary data → BLOB
  └─ Date/Time → TEXT (ISO 8601 format)
```

## Best Practices

### ✅ DO

1. **Use Transactions**
   ```sql
   BEGIN TRANSACTION;
   -- multiple operations
   COMMIT;
   ```

2. **Name Migrations Chronologically**
   ```
   001_create_users_table.js
   002_add_email_verification.js
   003_create_products_table.js
   ```

3. **Test Both Directions**
   ```bash
   # Apply migration
   npm run migrate:up
   
   # Revert migration
   npm run migrate:down
   
   # Reapply to verify
   npm run migrate:up
   ```

### ❌ DON'T

1. **Don't Modify Existing Migrations**
   - Create new migration instead
   - Existing may be in production

2. **Don't Skip Error Handling**
   ```javascript
   up: (db) => {
     try {
       db.exec(`...`);
     } catch (error) {
       console.error('Migration failed:', error);
       throw error;
     }
   }
   ```

3. **Don't Forget Indexes**
   - Add for foreign keys
   - Add for frequently queried columns
   - Remove in down migration

## Common Scenarios

### Scenario 1: Add New Table

```javascript
// migrations/005_create_categories.js
module.exports = {
  up: (db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        user_id INTEGER NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
      
      CREATE INDEX idx_categories_user_id ON categories(user_id);
      CREATE INDEX idx_categories_name ON categories(name);
    `);
  },
  
  down: (db) => {
    db.exec(`
      DROP INDEX IF EXISTS idx_categories_name;
      DROP INDEX IF EXISTS idx_categories_user_id;
      DROP TABLE IF EXISTS categories;
    `);
  }
};
```

### Scenario 2: Add Column to Existing Table

```javascript
// migrations/006_add_avatar_to_users.js
module.exports = {
  up: (db) => {
    db.exec(`
      BEGIN TRANSACTION;
      
      CREATE TABLE users_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );
      
      INSERT INTO users_new (id, email, password, created_at)
      SELECT id, email, password, created_at FROM users;
      
      DROP TABLE users;
      ALTER TABLE users_new RENAME TO users;
      CREATE INDEX idx_users_email ON users(email);
      
      COMMIT;
    `);
  },
  
  down: (db) => {
    db.exec(`
      BEGIN TRANSACTION;
      
      CREATE TABLE users_old (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
      
      INSERT INTO users_old (id, email, password, created_at)
      SELECT id, email, password, created_at FROM users;
      
      DROP TABLE users;
      ALTER TABLE users_old RENAME TO users;
      CREATE INDEX idx_users_email ON users(email);
      
      COMMIT;
    `);
  }
};
```

## Quick Reference Checklist

- [ ] Migration numbered sequentially
- [ ] Both up() and down() implemented
- [ ] Transactions used for multi-step operations
- [ ] Indexes created for foreign keys
- [ ] IF NOT EXISTS used appropriately
- [ ] Error handling implemented
- [ ] Tested in both directions
```

### Step 2: Test Migration Skill

1. In Copilot chat, try:
   ```
   I need to add a "priority" column to the tasks table. How should I create the migration?
   ```

2. Copilot should:
   - Invoke the database-migration skill
   - Explain the table recreation approach (SQLite limitation)
   - Provide the migration code
   - Include both up and down functions

---

## 🔧 Part 4: Tool Permissions

Skills can access different tools. Let's learn to manage permissions.

### Understanding Tool Restrictions

```yaml
allowedTools:
  - create_file        # Can create new files
  - replace_string_in_file  # Can edit files
  - read_file          # Can read files
  - grep_search        # Can search codebase

prohibitedTools:
  - delete_file        # Cannot delete files
  - run_in_terminal    # Cannot run commands
```

### When to Restrict Tools

**High Permission (Most Tools):**
```yaml
# For trusted, well-defined tasks
allowedTools:
  - create_file
  - replace_string_in_file
  - read_file
  - grep_search
  - run_in_terminal
requiresConfirmation: false
```

**Medium Permission:**
```yaml
# For creation/editing only
allowedTools:
  - create_file
  - replace_string_in_file
  - read_file
requiresConfirmation: false
```

**Low Permission:**
```yaml
# For review/analysis only
allowedTools:
  - read_file
  - grep_search
requiresConfirmation: true  # Ask before executing
```

### Exercise: Create a Review Skill

Create a skill that **only reviews** code, cannot modify:

`.github/copilot/skills/code-review/SKILL.md`:

```markdown
---
name: code-review
description: Perform code quality reviews and provide feedback
triggerPhrases:
  - "review code"
  - "code review"
  - "check code quality"
  - "audit code"
allowedTools:
  - read_file
  - grep_search
prohibitedTools:
  - create_file
  - replace_string_in_file
  - delete_file
  - run_in_terminal
requiresConfirmation: true
---

# Code Review Skill

## When to Use
When performing code quality reviews without making changes.

## Review Criteria

### Code Quality
- [ ] Functions under 50 lines
- [ ] Descriptive variable names
- [ ] No magic numbers
- [ ] DRY principle followed

### Error Handling
- [ ] Try/catch on async operations
- [ ] Consistent error format
- [ ] Errors logged appropriately

### Security
- [ ] Input validation present
- [ ] Authentication required
- [ ] No SQL injection risks

### Testing
- [ ] Tests present
- [ ] Edge cases covered
- [ ] Descriptive test names

## Output Format
Provide:
1. Overall assessment
2. Specific issues found
3. Recommendations
4. Priority level (critical, high, medium, low)
```

Test it:
```
Review the code in src/api/users.js for quality issues
```

Copilot will read and analyze but won't modify anything.

---

## 🧪 Part 5: Advanced Skills

### Exercise 1: Error Handling Skill

Create a skill that knows all your error handling patterns.

<details>
<summary>Starter Structure</summary>

```markdown
---
name: error-handling
description: Error handling patterns and best practices
triggerPhrases:
  - "error handling"
  - "handle error"
  - "catch error"
  - "error pattern"
---

# Error Handling Skill

## When to Use
- Implementing error handling
- Reviewing error management
- Standardizing error responses

## Standard Error Response
\`\`\`javascript
{
  error: {
    code: 'ERROR_CODE',
    message: 'User-friendly message',
    details: []  // Optional
  }
}
\`\`\`

## Error Codes
- VALIDATION_ERROR: Bad input
- NOT_FOUND: Resource doesn't exist
- UNAUTHORIZED: Not authenticated
- FORBIDDEN: Not authorized
- INTERNAL_ERROR: Server error

// ... more patterns
```
</details>

### Exercise 2: Performance Optimization Skill

Create a skill that identifies performance issues.

**Should include:**
- Database query optimization
- Caching strategies
- N+1 query detection
- Index recommendations

### Exercise 3: Testing Patterns Skill

Create a skill for test writing conventions.

**Should include:**
- Test structure (AAA pattern)
- Assertion style
- Mock/stub patterns
- Coverage expectations

---

## 📊 Part 6: Building Your Skill Library

### Recommended Skill Structure

```
.github/copilot/skills/
├── api-design/
│   └── SKILL.md
├── database-migration/
│   └── SKILL.md
├── error-handling/
│   └── SKILL.md
├── security-patterns/
│   └── SKILL.md
├── performance-optimization/
│   └── SKILL.md
├── testing-patterns/
│   └── SKILL.md
└── README.md
```

### Skill Library README

Create `.github/copilot/skills/README.md`:

```markdown
# Copilot Skills Library

## Available Skills

### Development
- **api-design**: REST API design patterns
- **database-migration**: Schema migration best practices
- **error-handling**: Error management patterns

### Quality
- **code-review**: Code quality review guidelines
- **testing-patterns**: Test writing conventions
- **security-patterns**: Security best practices

### Performance
- **performance-optimization**: Performance tuning strategies
- **caching-strategies**: Caching implementation patterns

## Usage

Skills are invoked automatically when you use trigger phrases in natural language.

Example:
`"I need to design an API for products"` → Invokes api-design skill

## Creating New Skills

1. Create directory: `.github/copilot/skills/skill-name/`
2. Create `SKILL.md` with frontmatter
3. Define trigger phrases
4. Document principles and patterns
5. Test with natural language
```

---

## 🎓 Best Practices

### DO ✅

1. **Make Triggers Natural**
   ```yaml
   ✅ Good:
   triggerPhrases:
     - "design api"
     - "api best practices"
     - "create endpoint"
   ```

2. **Include Decision Trees**
   ```markdown
   ## When to Use POST vs PUT
   Creating new resource?
     ├─ YES → POST
     └─ NO → Full replacement?
         ├─ YES → PUT
         └─ NO → PATCH
   ```

3. **Provide Examples**
   Show good and bad implementations

4. **Scope Tool Access**
   Only allow necessary tools

### DON'T ❌

1. **Over-Trigger**
   ```yaml
   ❌ Too broad:
   triggerPhrases: ["code", "help"]
   ```

2. **Skip Confirmation for Risky Operations**
   ```yaml
   ❌ Dangerous:
   allowedTools: [delete_file, run_in_terminal]
   requiresConfirmation: false
   ```

3. **Make Skills Too Large**
   - Split into focused skills
   - One domain per skill

4. **Forget to Test**
   - Test with various phrasings
   - Verify tool permissions work

---

## 📝 Lab Completion Checklist

- [ ] Created API Design skill
- [ ] Created Database Migration skill
- [ ] Tested automatic skill invocation
- [ ] Understood trigger phrase configuration
- [ ] Created skill with restricted tools
- [ ] Built custom skill for your domain
- [ ] Tested skills with natural language
- [ ] Understand difference from prompts

---

## 🎯 Key Takeaways

1. **Skills = Domain Expertise** - Package specialized knowledge
2. **Automatic Invocation** - Trigger phrases detect when needed
3. **Tool Permissions** - Control what skills can do
4. **Decision Trees** - Help AI make domain decisions
5. **Natural Language** - Skills work conversationally

---

## ➡️ Next Steps

Outstanding! You've automated domain expertise with skills.

**Next:** [Lab 4 - Custom Agents →](./lab-04-agents.md)

In Lab 4, you'll create specialized AI agents that work together on complex multi-phase tasks!

---

## 🔗 Additional Resources

- [Customization Reference: Skills](../../docs/CUSTOMIZATION_REFERENCE.md#skill-files)
- [Example Skills](../../examples/skills/)
- [Agentic SDLC Guide: Level 3](../../docs/AGENTIC_SDLC_GUIDE.md#level-3-skills)
