# Lab 2: Prompt Files - Creating Reusable Task Templates

**Duration:** 45-60 minutes  
**Difficulty:** Beginner to Intermediate  
**Autonomy Level:** ⭐⭐☆☆☆ (25% - Task Templates)

## 📋 Overview

In this lab, you'll learn how to create **prompt files** - reusable templates for common development tasks. While instruction files provide guidance, prompt files provide complete workflows that Copilot can execute autonomously!

### What You'll Learn
- Creating `.prompt.md` files with YAML frontmatter
- Structuring prompts for maximum effectiveness
- Parameterizing prompts for flexibility
- Invoking prompts from Copilot Chat
- Building a library of reusable tasks

### What You'll Build
- Custom prompt for adding features
- Use existing prompts to generate code
- Understand how prompts increase autonomy

### Prerequisites
- Completed Lab 1 (Instruction Files)
- Understanding of GitHub Copilot Chat
- Familiarity with the demo application

---

## 🎯 Learning Objectives

By the end of this lab, you will:
1. Understand the difference between instructions and prompts
2. Create effective prompt templates
3. Use prompts to automate complex workflows
4. Parameterize prompts for reusability
5. Build a personal prompt library

---

## 📚 Background: Instructions vs Prompts

### Instructions Files 📝
- **Purpose**: Define how to write code
- **Scope**: Continuous guidance
- **Usage**: Automatic, background
- **Example**: "Always use try-catch in async functions"

### Prompt Files 🎯
- **Purpose**: Define what to build
- **Scope**: Specific tasks or workflows
- **Usage**: Explicitly invoked
- **Example**: "Add a new API endpoint with these requirements"

Think of it this way:
- **Instructions** = "Here's how we do things"
- **Prompts** = "Here's a complete task to do"

---

## 🔬 Lab Steps

### Step 1: Understand Prompt Structure (10 minutes)

1. **Open the existing prompt**: `.github/copilot/prompts/add-endpoint.prompt.md`

2. **Study the structure**:

```yaml
---
title: Add New API Endpoint
description: Creates a complete CRUD endpoint
applyTo:
  - "src/api/**/*.js"
tags:
  - api
  - endpoint
---
```

- **title**: Name of the prompt
- **description**: What it does
- **applyTo**: Which files it's relevant for
- **tags**: Keywords for searching

3. **Examine the prompt body**:
   - Clear task description
   - Required parameters (marked with {PLACEHOLDERS})
   - Step-by-step requirements
   - Expected outputs
   - Example usage

4. **Key observation**: The prompt is structured like a specification - it tells Copilot not just "what" but also "how much detail" to generate.

---

### Step 2: Use an Existing Prompt (15 minutes)

Let's use the `add-feature.prompt.md` to add a real feature.

1. **Open GitHub Copilot Chat** (Ctrl+Shift+I / Cmd+Shift+I)

2. **Reference the prompt** by typing:
   ```
   @workspace /addFeature #file:add-feature.prompt.md
   ```
   Or simply:
   ```
   I need to add a new feature using the add-feature prompt template
   ```

3. **Provide the feature details**:
   ```
   Feature Name: Task Priorities
   
   Purpose: Allow users to assign priority levels to tasks
   
   User Story: As a user, I want to assign priority levels (Low, Medium, High, Urgent) to my tasks, so that I can focus on the most important tasks first.
   
   Core Functionality:
   1. Tasks can have one priority level
   2. Default priority is Medium
   3. Users can filter tasks by priority
   4. Priority is displayed in task list
   
   Database Changes:
   Add to tasks table:
   - priority (TEXT, default 'Medium', check constraint for valid values)
   
   API Endpoints:
   | Method | Path | Auth | Description |
   |--------|------|------|-------------|
   | PUT | /api/tasks/:id/priority | Yes | Update task priority |
   | GET | /api/tasks?priority=X | Yes | Filter tasks by priority |
   
   Security:
   - Users can only set priority on their own tasks
   - Validate priority values (Low, Medium, High, Urgent)
   
   Acceptance Criteria:
   - Tasks have a priority field
   - Users can update task priority
   - Users can filter tasks by priority
   - Invalid priorities are rejected
   ```

4. **Let Copilot implement**:
   - Watch as it creates/modifies files
   - See how it follows the instruction files automatically
   - Notice it generates complete implementation

5. **Review the implementation**:
   - Check `src/models/Task.js` for schema changes
   - Check `src/api/tasks.js` for new endpoints
   - Verify error handling and validation

**✨ Success Indicator**: Copilot should generate a complete, working implementation following all project standards.

---

### Step 3: Create a Custom Prompt (20 minutes)

Now create your own prompt template for test creation.

1. **Create new file**: `.github/copilot/prompts/add-tests.prompt.md`

2. **Add the following content**:

```markdown
---
title: Add Comprehensive Tests
description: Creates unit and integration tests for a given file or feature
applyTo:
  - "**/*.test.js"
  - "src/**/*.js"
tags:
  - testing
  - jest
  - quality
---

# Add Comprehensive Tests

I need you to create comprehensive tests for {FILE_OR_FEATURE}.

## Test Requirements

### Test File Location
Create test file: `{FILE_PATH}.test.js` (or `__tests__/{FILE_NAME}.test.js`)

### Test Coverage

#### Unit Tests
Test individual functions/methods:
- [ ] Happy path (expected behavior)
- [ ] Edge cases
- [ ] Error conditions
- [ ] Boundary values
- [ ] Invalid inputs

#### Integration Tests (if applicable)
Test how components work together:
- [ ] API endpoint requests
- [ ] Database operations
- [ ] Authentication/authorization
- [ ] End-to-end workflows

### Test Structure

Follow this structure:
```javascript
describe('{Component/Feature}', () => {
  // Setup
  beforeEach(() => {
    // Initialize test data
  });
  
  afterEach(() => {
    // Clean up
  });
  
  describe('{method or functionality}', () => {
    it('should {expected behavior}', () => {
      // Arrange
      // Act
      // Assert
    });
    
    it('should handle {edge case}', () => {
      // Test edge case
    });
    
    it('should throw error when {error condition}', () => {
      // Test error handling
    });
  });
});
```

### Mocking Strategy

For dependencies:
- Mock external services
- Mock database for unit tests
- Use in-memory database for integration tests
- Mock authentication middleware

### Assertions to Include

- Expected return values
- Error types and messages
- Function call verification (toHaveBeenCalled)
- Side effects (database changes, etc.)

## What to Test

### For API Endpoints
- [ ] Successful requests (200/201)
- [ ] Validation errors (400)
- [ ] Authentication (401)
- [ ] Authorization (403)
- [ ] Not found (404)
- [ ] Server errors (500)
- [ ] Request/response format

### For Services
- [ ] Business logic correctness
- [ ] Error handling
- [ ] Dependency interactions
- [ ] Return values

### For Models
- [ ] CRUD operations
- [ ] Query methods
- [ ] Validation
- [ ] Error cases

### For Utilities
- [ ] Pure function behavior
- [ ] Input validation
- [ ] Edge cases
- [ ] Error throwing

## Test Quality Requirements

- **Descriptive Names**: Test names clearly explain what is being tested
- **Independence**: Tests don't depend on each other
- **Fast**: Tests run quickly (<100ms per test)
- **Deterministic**: Same result every time
- **Clear Assertions**: Easy to understand what failed

## Coverage Goal

Aim for:
- [ ] 80%+ line coverage
- [ ] 80%+ branch coverage
- [ ] 100% of critical paths
- [ ] All error paths tested

---

## Example Usage

### Example 1: Test a Utility Function

```
I need you to create comprehensive tests using the add-tests prompt.

File: src/utils/validateEmail.js

This is a pure function that validates email format.
Returns true for valid emails, false for invalid.
```

### Example 2: Test an API Endpoint

```
I need you to create comprehensive tests using the add-tests prompt.

File: src/api/tasks.js

This file contains CRUD endpoints for tasks.
Test all endpoints: GET /api/tasks, GET /api/tasks/:id, POST /api/tasks, 
PUT /api/tasks/:id, DELETE /api/tasks/:id

Include authentication tests and validation tests.
```

### Example 3: Test a Service

```
I need you to create comprehensive tests using the add-tests prompt.

File: src/services/taskService.js

This service contains business logic for task management.
Mock the Task model and User model dependencies.
Test: createTask, getUserTasks, updateTask, deleteTask methods.
```
```

3. **Save the file**

---

### Step 4: Use Your Custom Prompt (10 minutes)

Test your newly created prompt.

1. **In Copilot Chat**, reference your prompt:
   ```
   Use the add-tests prompt to create tests for src/utils/database.js
   ```

2. **Let Copilot generate tests**

3. **Review the generated tests**:
   - Check test structure
   - Verify coverage of edge cases
   - Look for mocks and setup/teardown
   - Check test names for clarity

4. **Run the tests** (if Jest is configured):
   ```powershell
   npm test
   ```

**✨ Success Indicator**: Complete test suite generated with proper structure, mocks, and coverage.

---

### Step 5: Use the Debug Prompt (10 minutes)

Use the existing `debug-issue.prompt.md` prompt.

1. **Intentionally introduce a bug**:
   - Open `src/api/tasks.js`
   - In the GET endpoint, change a variable name to cause an error

2. **In Copilot Chat**:
   ```
   I need help debugging an issue using the debug-issue prompt.
   
   Symptom: Getting error when fetching tasks
   Expected: Should return list of tasks
   Error Message: "taskModel is not defined"
   File: src/api/tasks.js
   ```

3. **Watch Copilot**:
   - Analyze the code
   - Identify the root cause
   - Suggest the fix
   - Explain why it happened

4. **Apply the fix** and verify it works

**Learning Point**: Prompts can structure problem-solving workflows, making debugging more systematic.

---

## ✅ Success Criteria

You've successfully completed this lab when:

- [x] You understand the difference between instructions and prompts
- [x] You've used existing prompts to generate code
- [x] You've created a custom prompt template
- [x] You've tested your custom prompt
- [x] You can explain how prompts increase autonomy

---

## 🎓 Key Takeaways

### What You Learned

1. **Prompts are task templates**
   - Complete workflows, not just guidance
   - Reusable across projects
   - Structured and parameterized

2. **Prompts increase autonomy to ~25%**
   - You specify WHAT to build
   - Copilot figures out HOW
   - Follows instructions automatically

3. **Good prompts include**:
   - Clear objective
   - Detailed requirements
   - Parameter placeholders
   - Example usage
   - Success criteria

4. **Prompts vs Instructions**:
   ```
   Instructions: "When writing tests, use Jest and include edge cases"
   Prompts: "Create a complete test suite for this file with..."
   ```

---

## 🚀 Next Steps

### Try These Exercises

1. **Create More Prompts**
   - Database migration prompt
   - Documentation generation prompt
   - Performance optimization prompt

2. **Combine Prompts**
   - Use add-feature prompt, then add-tests prompt
   - Chain prompts for complete workflows

3. **Share Prompts**
   - Prompts can be shared across teams
   - Create organization-wide prompt libraries

### Prompt Ideas

- `add-logging.prompt.md` - Add logging to a file
- `optimize-performance.prompt.md` - Optimize slow code
- `add-validation.prompt.md` - Add input validation
- `generate-docs.prompt.md` - Generate API documentation

### Ready for Lab 3?

In the next lab, you'll learn about **Skills** - domain-specific knowledge packages that add even more autonomy.

[Continue to Lab 3: Copilot Skills →](./lab-03-skills.md)

---

## 📖 Additional Resources

- [Example Prompt Files](../../.github/copilot/prompts/)
- [Prompt Writing Best Practices](../../docs/CUSTOMIZATION_REFERENCE.md#prompts)
- [GitHub Copilot Prompt Engineering](https://docs.github.com/en/copilot)

---

## 🆘 Troubleshooting

**Problem**: Copilot doesn't find my prompt

**Solutions**:
- Ensure file ends with `.prompt.md`
- Put prompts in `.github/copilot/prompts/` directory
- Reload VS Code window

**Problem**: Prompt output is incomplete

**Fix**:
- Make requirements more specific
- Add examples in the prompt
- Break complex prompts into smaller ones

**Problem**: Prompts not following instructions

**Verify**:
- Instruction files are in place
- Instructions are clear and specific
- Using `applyTo` patterns correctly
- Security review prompt
- Feature implementation prompt

### Prerequisites
- Completed Lab 1 (Instruction Files)
- Understanding of instruction files from Lab 1

---

## 🎯 Learning Objectives

By the end of this lab, you will:
1. ✅ Understand the difference between instructions and prompts
2. ✅ Create effective prompt templates
3. ✅ Use prompts to automate routine tasks
4. ✅ Parameterize prompts for reusability
5. ✅ Build a personal prompt library

---

## 📚 Background: Instructions vs Prompts

### The Key Difference

| Aspect | Instruction Files | Prompt Files |
|--------|------------------|--------------|
| **Purpose** | Define conventions | Define workflows |
| **Activation** | Automatic | Manual invocation |
| **Scope** | File patterns | Specific task |
| **Autonomy** | 10% (Guidance) | 25% (Execution) |
| **Output** | Influences suggestions | Executes complete task |

### When to Use Each

**Use Instruction Files when:**
- Setting coding standards
- Defining architectural patterns
- Establishing security rules
- Guiding general development

**Use Prompt Files when:**
- Repeating the same task often
- Following a multi-step workflow
- Need consistent implementation
- Onboarding new patterns

### Real-World Example

**Instruction File approach:**
```markdown
# API Route Instructions
- Use authentication middleware
- Include error handling
- Return consistent JSON format
```
*Result:* Copilot suggests code that follows these patterns

**Prompt File approach:**
```markdown
# Add New API Endpoint Prompt
1. Create route file in src/api/
2. Add authentication middleware
3. Implement CRUD operations
4. Add input validation
5. Write tests
```
*Result:* Copilot executes all steps and creates complete implementation

---

## 🔧 Part 1: Your First Prompt File

### Step 1: Create a Simple Prompt

1. Create a new file in the workspace root: `test-prompt.prompt.md`

2. Add basic frontmatter and content:

```markdown
---
name: test-prompt
description: A simple test prompt to learn the basics
---

# Test Prompt

## Objective
Create a simple "Hello World" route to test prompt functionality.

## Instructions
Create a new file `src/api/hello.js` with the following:

1. Import Express router
2. Create a GET route at `/hello`
3. Return JSON with message "Hello from prompt!"
4. Export the router

## Expected Output
A working Express route that responds with a greeting.
```

3. Save the file

### Step 2: Invoke Your Prompt

1. Open Copil chat (Ctrl+Shift+I or Cmd+Shift+I)

2. Type the following:
   ```
   @workspace #file:test-prompt.prompt.md
   ```

3. Press Enter and watch Copilot execute the prompt!

4. Copilot should:
   - Read your prompt instructions
   - Create the `src/api/hello.js` file
   - Implement the route as specified
   - Follow your instruction file conventions

### Step 3: Verify the Result

1. Check that `src/api/hello.js` was created

2. Open the file and verify it contains:
   - Express router import
   - GET route handler
   - JSON response
   - Router export

3. Test it by adding to `src/index.js`:
   ```javascript
   const helloRoutes = require('./api/hello');
   app.use('/api/hello', helloRoutes);
   ```

4. Run your server and test: `http://localhost:3000/api/hello`

---

## 🔧 Part 2: The Endpoint Creation Prompt

Now let's create a real, production-ready prompt. Let's make one for adding new API endpoints.

### Step 1: Analyze the Example

1. Open `examples/prompts/add-endpoint.prompt.md`

2. Notice the structure:
   ```markdown
   ---
   name: add-endpoint
   description: Generates a complete CRUD API endpoint
   tags: [api, crud, backend]
   ---
   
   # Sections:
   1. Objective
   2. Required Inputs
   3. Detailed Instructions
   4. Validation Checklist
   5. Example Output
   ```

3. Pay attention to:
   - **Parameterization**: Uses placeholders like `{EntityName}`
   - **Completeness**: Covers all CRUD operations
   - **Validation**: Includes a checklist
   - **Examples**: Shows expected code

### Step 2: Create Your Endpoint Prompt

1. Create: `add-endpoint.prompt.md` in workspace root

2. Add the following content:

```markdown
---
name: add-endpoint
description: Create a complete CRUD API endpoint with validation and error handling
tags: [api, crud, rest, endpoint]
---

# Add Complete API Endpoint

## Objective
Generate a fully functional CRUD API endpoint for a specified entity, including routes, validation, error handling, and integration with the existing model.

## Required Inputs
When using this prompt, specify:
- **Entity Name** (singular): e.g., "Category", "Product", "Order"
- **Route Prefix**: e.g., "/categories", "/products", "/orders"
- **Fields**: List of model fields and their types

## Instructions

### Step 1: Create Route File
Create `src/api/{entityName}.js` (lowercase, plural)

### Step 2: Import Dependencies
```javascript
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Joi = require('joi');
const {EntityName} = require('../models/{EntityName}');
const db = require('../utils/database');
```

### Step 3: Define Validation Schema
Create a Joi schema for input validation:
```javascript
const {entityName}Schema = Joi.object({
  // Add fields based on the entity
});
```

### Step 4: Implement GET / (List All)
```javascript
/**
 * GET / - Get all {entities}
 * @query {number} page - Page number (default: 1)
 * @query {number} limit - Items per page (default: 10)
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const {entityName}Model = new {EntityName}(db);
    const items = {entityName}Model.findAll({ limit, offset });
    const total = {entityName}Model.count();
    
    res.json({
      success: true,
      data: {
        items,
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
```

### Step 5: Implement GET /:id (Get One)
```javascript
/**
 * GET /:id - Get a single {entity} by ID
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const {entityName}Model = new {EntityName}(db);
    const item = {entityName}Model.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: '{EntityName} not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: item
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
```

### Step 6: Implement POST / (Create)
```javascript
/**
 * POST / - Create a new {entity}
 */
router.post('/', authenticate, async (req, res) => {
  try {
    // Validate input
    const { error, value } = {entityName}Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message,
          details: error.details
        }
      });
    }
    
    const {entityName}Model = new {EntityName}(db);
    const created = {entityName}Model.create(value);
    
    res.status(201).json({
      success: true,
      data: created
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
```

### Step 7: Implement PUT /:id (Update)
```javascript
/**
 * PUT /:id - Update an existing {entity}
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    // Validate input
    const { error, value } = {entityName}Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message,
          details: error.details
        }
      });
    }
    
    const {entityName}Model = new {EntityName}(db);
    const updated = {entityName}Model.update(req.params.id, value);
    
    if (!updated) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: '{EntityName} not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: updated
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
```

### Step 8: Implement DELETE /:id (Delete)
```javascript
/**
 * DELETE /:id - Delete a {entity}
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const {entityName}Model = new {EntityName}(db);
    const deleted = {entityName}Model.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: '{EntityName} not found'
        }
      });
    }
    
    res.json({
      success: true,
      message: '{EntityName} deleted successfully'
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

### Step 9: Register Route in Main App
Add to `src/index.js`:
```javascript
const {entityName}Routes = require('./api/{entityName}');
app.use('/api/{route-prefix}', {entityName}Routes);
```

## Validation Checklist
After implementation, verify:

- [ ] All five CRUD operations implemented (GET all, GET one, POST, PUT, DELETE)
- [ ] Authentication middleware on all routes
- [ ] Input validation using Joi on POST and PUT
- [ ] Consistent error response format
- [ ] Proper HTTP status codes (200, 201, 400, 404, 500)
- [ ] JSDoc comments on all route handlers
- [ ] Pagination on list endpoint
- [ ] 404 handling for non-existent resources
- [ ] Route registered in main app

## Example Usage

```
@workspace #file:add-endpoint.prompt.md

Create a CRUD endpoint for "Category" with fields:
- name (string, required)
- description (string, optional)
- userId (integer, required)

Route prefix: /categories
```

## Expected Result
A complete, working CRUD endpoint that integrates with the existing application structure and follows all established conventions.
```

3. Save the file

### Step 3: Test the Prompt

1. First, create the Category model (we'll do this manually first, then automate it in the next section):

Create `src/models/Category.js`:
```javascript
class Category {
  constructor(db) {
    this.db = db;
  }

  create(data) {
    const stmt = this.db.prepare(`
      INSERT INTO categories (name, description, userId)
      VALUES (@name, @description, @userId)
    `);
    const info = stmt.run(data);
    return { id: info.lastInsertRowid, ...data };
  }

  findAll({ limit = 10, offset = 0 } = {}) {
    const stmt = this.db.prepare(`
      SELECT * FROM categories 
      LIMIT ? OFFSET ?
    `);
    return stmt.all(limit, offset);
  }

  findById(id) {
    const stmt = this.db.prepare('SELECT * FROM categories WHERE id = ?');
    return stmt.get(id);
  }

  update(id, data) {
    const stmt = this.db.prepare(`
      UPDATE categories 
      SET name = @name, description = @description 
      WHERE id = @id
    `);
    const info = stmt.run({ ...data, id });
    return info.changes > 0 ? { id, ...data } : null;
  }

  delete(id) {
    const stmt = this.db.prepare('DELETE FROM categories WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
  }

  count() {
    const stmt = this.db.prepare('SELECT COUNT(*) as count FROM categories');
    return stmt.get().count;
  }
}

module.exports = Category;
```

2. Now, invoke your prompt in Copilot chat:
   ```
   @workspace #file:add-endpoint.prompt.md
   
   Create a CRUD endpoint for "Category" with these fields:
   - name (string, required)
   - description (string, optional)
   - userId (integer, required)
   
   Use route prefix: /categories
   ```

3. Watch Copilot:
   - Create the route file
   - Implement all CRUD operations
   - Add validation
   - Register in main app

4. Test the endpoint!

---

## 🔧 Part 3: Model Generation Prompt

Let's automate model creation too!

### Step 1: Create Model Prompt

Create `create-model.prompt.md`:

```markdown
---
name: create-model
description: Generate a complete data model with CRUD operations
tags: [model, database, crud]
---

# Create Data Model

## Objective
Generate a complete data model class with all standard CRUD operations using better-sqlite3.

## Required Inputs
- **Model Name**: Name of the entity (e.g., "Category", "Product")
- **Table Name**: Database table name (typically lowercase plural)
- **Fields**: List of fields with types and constraints

## Instructions

### Step 1: Create Model File
Create `src/models/{ModelName}.js`

### Step 2: Implement Model Class
```javascript
class {ModelName} {
  constructor(db) {
    this.db = db;
  }

  /**
   * Create a new {modelName}
   * @param {Object} data - {ModelName} data
   * @returns {Object} Created {modelName} with ID
   */
  create(data) {
    const stmt = this.db.prepare(`
      INSERT INTO {tableName} ({fields})
      VALUES ({placeholders})
    `);
    const info = stmt.run(data);
    return { id: info.lastInsertRowid, ...data };
  }

  /**
   * Find all {modelNames}
   * @param {Object} options - Query options (limit, offset)
   * @returns {Array} Array of {modelNames}
   */
  findAll({ limit = 10, offset = 0 } = {}) {
    const stmt = this.db.prepare(`
      SELECT * FROM {tableName}
      LIMIT ? OFFSET ?
    `);
    return stmt.all(limit, offset);
  }

  /**
   * Find {modelName} by ID
   * @param {number} id - {ModelName} ID
   * @returns {Object|null} {ModelName} object or null
   */
  findById(id) {
    const stmt = this.db.prepare(`
      SELECT * FROM {tableName} WHERE id = ?
    `);
    return stmt.get(id);
  }

  /**
   * Update a {modelName}
   * @param {number} id - {ModelName} ID
   * @param {Object} data - Updated data
   * @returns {Object|null} Updated {modelName} or null
   */
  update(id, data) {
    const fields = Object.keys(data)
      .map(key => `${key} = @${key}`)
      .join(', ');
    
    const stmt = this.db.prepare(`
      UPDATE {tableName} 
      SET ${fields}
      WHERE id = @id
    `);
    
    const info = stmt.run({ ...data, id });
    return info.changes > 0 ? { id, ...data } : null;
  }

  /**
   * Delete a {modelName}
   * @param {number} id - {ModelName} ID
   * @returns {boolean} True if deleted
   */
  delete(id) {
    const stmt = this.db.prepare(`
      DELETE FROM {tableName} WHERE id = ?
    `);
    const info = stmt.run(id);
    return info.changes > 0;
  }

  /**
   * Count total {modelNames}
   * @returns {number} Total count
   */
  count() {
    const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM {tableName}
    `);
    return stmt.get().count;
  }
}

module.exports = {ModelName};
```

### Step 3: Add Custom Methods (if needed)
Based on the entity, add entity-specific finder methods:
- findByUserId()
- findByStatus()
- findByDateRange()
- etc.

## Validation Checklist
- [ ] Class name matches model name (PascalCase)
- [ ] Constructor accepts db parameter
- [ ] All standard CRUD methods present
- [ ] JSDoc comments on all methods
- [ ] Prepared statements used throughout
- [ ] Error handling in place
- [ ] Model exported with module.exports

## Example Usage

```
@workspace #file:create-model.prompt.md

Create a model for "Product" with table "products":
Fields:
- name (TEXT, required)
- description (TEXT)
- price (REAL, required)
- stock (INTEGER, default 0)
- userId (INTEGER, required, foreign key)
```
```

### Step 2: Test Model Creation

1. Use your new prompt:
   ```
   @workspace #file:create-model.prompt.md
   
   Create a model for "Tag" with table "tags":
   Fields:
   - name (TEXT, required, unique)
   - color (TEXT, default '#gray')
   ```

2. Verify the model was created correctly

3. Now create an endpoint for it using your other prompt!
   ```
   @workspace #file:add-endpoint.prompt.md
   
   Create endpoint for "Tag" at /tags  
   Fields: name (string), color (string)
   ```

4. You've now automated both model AND endpoint creation! 🎉

---

## 🔧 Part 4: Security Review Prompt

Prompts aren't just for creation—they're great for reviews too!

### Step 1: Create Security Review Prompt

Create `security-review.prompt.md`:

```markdown
---
name: security-review
description: Perform a comprehensive security review of code
tags: [security, review, audit]
---

# Security Review

## Objective
Perform a thorough security review of specified code and identify potential vulnerabilities.

## Instructions

### Step 1: Authentication & Authorization
Review and check:
- [ ] All protected routes have authentication middleware
- [ ] Authorization checks verify user permissions
- [ ] JWT tokens validated properly
- [ ] Session management secure

### Step 2: Input Validation
Check for:
- [ ] All user input validated before use
- [ ] Joi schemas or equivalent validation
- [ ] Type checking on parameters
- [ ] File upload restrictions (if applicable)

### Step 3: SQL Injection Prevention
Verify:
- [ ] Prepared statements used for all queries
- [ ] No string concatenation in SQL
- [ ] Parameterized queries throughout
- [ ] ORM/query builder used correctly

### Step 4: XSS Prevention
Check:
- [ ] Output encoding/escaping
- [ ] Content Security Policy headers
- [ ] No innerHTML with user data
- [ ] JSON responses properly structured

### Step 5: Error Handling
Ensure:
- [ ] No sensitive data in error messages
- [ ] Stack traces not exposed to clients
- [ ] Errors logged securely
- [ ] Generic error messages for production

### Step 6: API Security
Verify:
- [ ] Rate limiting implemented
- [ ] CORS configured properly
- [ ] HTTPS enforced
- [ ] API keys/secrets not in code

### Step 7: Data Protection
Check:
- [ ] Passwords hashed (bcrypt)
- [ ] Sensitive data encrypted
- [ ] Secrets in environment variables
- [ ] No hardcoded credentials

## Output Format

Provide a report with:

1. **Summary**: Overall security posture
2. **Critical Issues**: Must-fix vulnerabilities
3. **Warnings**: Should-fix issues
4. **Recommendations**: Best practice improvements
5. **Code Examples**: Show how to fix issues

## Example Usage

```
@workspace #file:security-review.prompt.md

Review security of src/api/users.js
```
```

### Step 2: Test Security Review

1. Invoke the prompt on an endpoint:
   ```
   @workspace #file:security-review.prompt.md
   
   Review security of src/api/tasks.js
   ```

2. Copilot should:
   - Check authentication
   - Review validation
   - Look for SQL injection risks
   - Verify error handling
   - Provide a detailed report

3. Fix any issues it finds!

---

## 🧪 Part 5: Exercises

### Exercise 1: Create a Feature Prompt

**Task**: Create `add-feature.prompt.md` that implements a complete feature including:
- Model creation
- API endpoints
- Database migration
- Tests

<details>
<summary>Hint: Structure</summary>

```markdown
## Instructions
1. Create database migration
2. Generate model with create-model prompt
3. Generate endpoints with add-endpoint prompt
4. Create tests
5. Update documentation
```
</details>

### Exercise 2: Create a Refactoring Prompt

**Task**: Create a prompt that takes existing code and refactors it according to your conventions.

Should check:
- Naming conventions
- Error handling patterns
- Comment quality
- Code structure

### Exercise 3: Create a Test Generation Prompt

**Task**: Create a prompt that generates comprehensive tests for an existing endpoint.

Should include:
- Unit tests for each route
- Authorization tests
- Validation tests
- Error cases

---

## 📊 Part 6: Building Your Prompt Library

### Organization Strategy

Create a folder structure:
```
.github/copilot/prompts/
├── creation/
│   ├── add-endpoint.prompt.md
│   ├── create-model.prompt.md
│   └── add-feature.prompt.md
├── review/
│   ├── security-review.prompt.md
│   ├── code-review.prompt.md
│   └── performance-review.prompt.md
├── maintenance/
│   ├── refactor.prompt.md
│   ├── update-tests.prompt.md
│   └── update-docs.prompt.md
└── README.md
```

### Prompt Library README

Create `.github/copilot/prompts/README.md`:

```markdown
# Prompt Library

## Creation Prompts
- `add-endpoint.prompt.md` - Generate CRUD API endpoint
- `create-model.prompt.md` - Generate data model
- `add-feature.prompt.md` - Implement complete feature

## Review Prompts
- `security-review.prompt.md` - Security audit
- `code-review.prompt.md` - Code quality review
- `performance-review.prompt.md` - Performance analysis

## Maintenance Prompts
- `refactor.prompt.md` - Refactor code to standards
- `update-tests.prompt.md` - Update or generate tests
- `update-docs.prompt.md` - Update documentation

## Usage
Invoke with: `@workspace #file:prompt-name.prompt.md [parameters]`
```

### Tracking Prompt Usage

Consider creating a log to track:
- Which prompts you use most
- Time saved per prompt
- Quality of generated code
- Areas for improvement

---

## 🎓 Best Practices

### DO ✅

1. **Be Detailed**
   - Include every step explicitly
   - Show code examples
   - Provide validation checklists

2. **Parameterize**
   - Use placeholders ({EntityName})
   - Support variations
   - Make prompts flexible

3. **Include Validation**
   - Checklist of requirements
   - Expected output examples
   - Error scenarios

4. **Test Thoroughly**
   - Invoke prompts multiple times
   - Try edge cases
   - Refine based on results

### DON'T ❌

1. **Be Too Generic**
   ```markdown
   ❌ "Create an API endpoint"
   ✅ "Create a CRUD API endpoint with auth, validation, and error handling"
   ```

2. **Skip Examples**
   - Always show expected code
   - Include multiple use cases
   - Demonstrate with real scenarios

3. **Forget Edge Cases**
   - Handle errors
   - Consider edge cases
   - Plan for failures

4. **Create One-Off Prompts**
   - Make prompts reusable
   - Parameterize instead of hardcode
   - Think "template" not "script"

---

## 📝 Lab Completion Checklist

- [ ] Created endpoint generation prompt
- [ ] Created model generation prompt
- [ ] Created security review prompt
- [ ] Successfully generated endpoints using prompts
- [ ] Successfully generated models using prompts
- [ ] Performed security review using prompt
- [ ] Understand parameterization
- [ ] Created personal prompt library structure

---

## 🎯 Key Takeaways

1. **Prompts = Automated Workflows** - They execute multi-step tasks
2. **Parameterization = Reusability** - Make prompts flexible
3. **Validation = Quality** - Include checklists
4. **Library = Productivity** - Build reusable collection
5. **Instructions + Prompts = Power** - Use together for best results

---

## ➡️ Next Steps

Excellent work! You've automated common development tasks.

**Next:** [Lab 3 - Skills →](./lab-03-skills.md)

In Lab 3, you'll package domain expertise into skills that Copilot invokes automatically—no manual invocation needed!

---

## 🔗 Additional Resources

- [Customization Reference: Prompts](../../docs/CUSTOMIZATION_REFERENCE.md#prompt-files)
- [Example Prompts](../../examples/prompts/)
- [Agentic SDLC Guide: Level 2](../../docs/AGENTIC_SDLC_GUIDE.md#level-2-prompt-files)
