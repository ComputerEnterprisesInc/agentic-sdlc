# Lab 1: Instruction Files - Establishing Coding Standards

**Duration:** 30-45 minutes  
**Difficulty:** Beginner  
**Autonomy Level:** ⭐☆☆☆☆ (10% - Guidance)

## 📋 Overview

In this lab, you'll learn how to use **instruction files** to establish coding standards and conventions that GitHub Copilot will follow automatically. This is the foundation of the Agentic SDLC.

### What You'll Learn
- Creating `.instructions.md` files
- Using `applyTo` patterns to scope instructions
- Writing effective coding conventions
- Testing instruction effectiveness
- Understanding when Copilot uses your instructions

### What You'll Build
- Project-wide instruction file (already exists in `.github/copilot/instructions.md`)
- Directory-specific instruction file for utilities
- Test Copilot's adherence to your instructions

### Prerequisites
- VS Code with GitHub Copilot extension installed
- Basic understanding of JavaScript/Node.js
- This repository cloned locally

---

## 🎯 Learning Objectives

By the end of this lab, you will:
1. Understand how instruction files work
2. Create effective instruction files for your codebase
3. Test Copilot's understanding of your instructions
4. Know when and where to place instruction files

---

## 📚 Background: What Are Instruction Files?

Instruction files (`.instructions.md`) are markdown files that tell GitHub Copilot:
- **How** your code should be structured
- **What** conventions to follow
- **Why** certain patterns are used in your project

### Types of Instruction Files

1. **Global Instructions**: `.github/copilot/instructions.md`
   - Applies to entire repository
   - General coding standards
   - Architecture patterns

2. **Directory Instructions**: `<folder>/.instructions.md`
   - Applies to specific folder and its sub-folders
   - More specific than global rules
   - Example: `src/api/.instructions.md`

3. **File-Specific Instructions**: `<filename>.instructions.md`
   - Applies to a single file
   - Most specific
   - Example: `auth.js.instructions.md`

### How Copilot Uses Instructions

Copilot automatically loads relevant instruction files when:
- You type in a file
- You ask Copilot Chat a question
- You use Copilot to generate code

---

## 🔬 Lab Steps

### Step 1: Review the Global Instructions (5 minutes)

1. Open the file `.github/copilot/instructions.md` in the repository

2. **Review the contents** - This file contains:
   - Project overview
   - Tech stack
   - Coding standards
   - Architecture rules
   - Error handling patterns

3. **Key sections to understand**:
   - **Layered Architecture Rules**: API → Service → Model layers
   - **Error Handling**: Consistent try-catch patterns
   - **API Response Format**: Standard success/error responses
   - **Naming Conventions**: How to name files, functions, variables

**💡 Tip**: These instructions will guide Copilot's suggestions across your entire project.

---

### Step 2: Test Global Instructions (10 minutes)

Let's verify Copilot follows the global instructions.

1. **Create a new file**: `src/api/categories.js`

2. **Open GitHub Copilot Chat** (Ctrl+Shift+I or Cmd+Shift+I)

3. **Ask Copilot**:
   ```
   Create a complete CRUD API for managing task categories. 
   Categories should have: id, name, color, icon.
   Follow the project standards.
   ```

4. **Observe the generated code**. Check if it includes:
   - ✅ Try-catch error handling
   - ✅ Consistent response format `{ success: true, data: ... }`
   - ✅ Authentication middleware where appropriate
   - ✅ Proper status codes (200, 201, 400, 500)
   - ✅ Logging statements
   - ✅ Follows the established patterns from existing API files

5. **Compare with existing file**: Open `src/api/tasks.js` and compare patterns

**✨ Success Indicator**: The new API should follow the same patterns as existing APIs without you explicitly specifying them.

---

### Step 3: Create a Directory-Specific Instruction File (15 minutes)

Now create instructions specific to the `src/utils/` directory.

1. **Create new file**: `src/utils/.instructions.md`

2. **Add the following content**:

```markdown
# Utility Functions - Instructions

## Purpose
This directory contains pure utility functions that are reused across the application.

## Rules for Utility Functions

### Function Characteristics
1. **Pure Functions**: Should not have side effects when possible
2. **Single Responsibility**: Each function does one thing well
3. **Reusable**: Generic enough to be used in multiple places
4. **Well-Tested**: All utilities should have unit tests

### File Organization
- One utility per file (e.g., `formatDate.js`, `validateEmail.js`)
- Group related utilities in subdirectories if needed
- Export functions using `module.exports`

### Naming Conventions
- **Files**: camelCase descriptive of main function (e.g., `parseJSON.js`)
- **Functions**: verb + noun (e.g., `formatDate`, `validateEmail`)
- **Constants**: UPPER_SNAKE_CASE

### Documentation Requirements
Every utility function MUST include:
```javascript
/**
 * Brief description of what the function does
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @throws {Error} When error conditions occur
 * @example
 * functionName(exampleInput) // => exampleOutput
 */
```

### Error Handling
- Validate input parameters
- Throw descriptive errors for invalid input
- Don't catch errors - let caller handle them
- Use custom error types when appropriate

### Testing
- Create `<functionName>.test.js` in the same directory
- Test happy path
- Test edge cases
- Test error conditions

## Example Utility Function

```javascript
/**
 * Formats a date string to YYYY-MM-DD format
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date string
 * @throws {Error} If date is invalid
 * @example
 * formatDate(new Date('2024-01-15')) // => '2024-01-15'
 */
function formatDate(date) {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }
  
  return dateObj.toISOString().split('T')[0];
}

module.exports = formatDate;
```

## What NOT to Put Here
- Business logic (goes in services/)
- Database operations (goes in models/)
- Request handling (goes in api/)
- Configuration (goes in config.js)
```

3. **Save the file**

---

### Step 4: Test Directory-Specific Instructions (10 minutes)

Now test if Copilot uses these new instructions.

1. **Create a new file**: `src/utils/generateId.js`

2. **Open GitHub Copilot Chat**

3. **Ask Copilot**:
   ```
   Create a utility function to generate unique IDs.
   Use UUID v4 format.
   ```

4. **Review the generated code**. It should include:
   - ✅ JSDoc documentation with description, params, returns, example
   - ✅ Input validation
   - ✅ Descriptive function name (verb + noun)
   - ✅ Pure function pattern
   - ✅ Proper error handling
   - ✅ Module.exports at the end

5. **Create test file**: Ask Copilot:
   ```
   Create unit tests for this utility function
   ```

6. **Verify test structure** matches the instructions (happy path, edge cases, errors)

**✨ Success Indicator**: The utility function should be well-documented, pure, and include comprehensive tests.

---

### Step 5: Experiment with Instruction Priority (5 minutes)

Instructions have a hierarchy: File-specific > Directory-specific > Global

1. **In Copilot Chat**, ask:
   ```
   What coding standards should I follow when creating a new utility function?
   ```

2. **Observe**: Copilot should reference both:
   - Global instructions (from `.github/copilot/instructions.md`)
   - Utils-specific instructions (from `src/utils/.instructions.md`)

3. **Ask follow-up**:
   ```
   What's different about writing utilities vs API endpoints in this project?
   ```

4. **Copilot should explain**:
   - Utilities are pure functions
   - APIs handle HTTP requests
   - Different documentation requirements
   - Different error handling approaches

---

## ✅ Success Criteria

You've successfully completed this lab when:

- [x] You understand how instruction files work
- [x] You've reviewed the global instructions
- [x] You've created a directory-specific instruction file
- [x] Copilot generates code following your instructions
- [x] You can explain the instruction file hierarchy

---

## 🎓 Key Takeaways

### What You Learned

1. **Instruction files automate coding standards**
   - No need to repeatedly explain conventions
   - Copilot follows them automatically

2. **Hierarchy matters**
   - More specific instructions override general ones
   - File > Directory > Global

3. **Good instructions are**:
   - Specific and actionable
   - Include examples
   - Explain the "why" not just the "what"

4. **Autonomy Level: 10%**
   - Copilot gets basic guidance
   - You still direct all actions
   - Reduces repetitive explanations

---

## 🚀 Next Steps

### Try These Exercises

1. **Create Model Instructions**
   - Create `src/models/.instructions.md`
   - Define patterns for database models
   - Test with a new model

2. **Add Security Instructions**
   - Create instructions for authentication
   - Include validation patterns
   - Test with auth-related code

3. **Measure Impact**
   - Generate code without instructions
   - Generate same code with instructions
   - Compare quality and consistency

### Ready for Lab 2?

In the next lab, you'll learn about **Prompt Files** - reusable templates that add more autonomy to Copilot.

[Continue to Lab 2: Prompt Files →](./lab-02-prompts.md)

---

## 📖 Additional Resources

- [GitHub Copilot Instructions Documentation](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Example Instruction Files](../../examples/instructions/)
- [Writing Effective Instructions Guide](../../docs/CUSTOMIZATION_REFERENCE.md)

---

## 🆘 Troubleshooting

**Problem**: Copilot isn't following my instructions

**Solutions**:
- Ensure file is named `.instructions.md` (with the dot)
- Check the `applyTo` patterns if you're using them
- Reload VS Code window (Ctrl+Shift+P → "Reload Window")
- Make instructions more specific and include examples

**Problem**: Instructions are too vague

**Fix**: Add concrete examples showing the desired pattern

**Problem**: Copilot suggests old patterns

**Fix**: Explicitly state what NOT to do in instructions

By the end of this lab, you will:
1. ✅ Understand what instruction files are and how they work
2. ✅ Create your first instruction file
3. ✅ Use glob patterns to scope instructions
4. ✅ See Copilot follow your conventions
5. ✅ Know when to use instruction files vs other customization types

---

## 📚 Background: What Are Instruction Files?

**Instruction files** are markdown files that define rules, conventions, and patterns for Copilot to follow when generating code. Think of them as a "style guide" that Copilot automatically reads and applies.

### Key Characteristics

| Aspect | Description |
|--------|-------------|
| **Extension** | `.instructions.md` or `copilot-instructions.md` |
| **Location** | Workspace root, `.github/copilot/`, or any directory |
| **Scope** | Can apply to all files or specific patterns |
| **When Used** | Automatically when editing matching files |
| **Autonomy** | Low - provides guidance, not automation |

### What Problems Do They Solve?

Without instruction files:
- ❌ Copilot generates code that doesn't match your team's style
- ❌ Constant manual corrections to follow conventions
- ❌ Inconsistent code across the project
- ❌ New team members don't know the patterns
- ❌ Code reviews filled with style comments

With instruction files:
- ✅ Copilot automatically follows your conventions
- ✅ Consistent code style across the team
- ✅ Reduced code review friction
- ✅ Living documentation of standards
- ✅ Onboarding becomes easier

---

## 🔧 Part 1: Creating Your First Instruction File

### Step 1: Create a Project-Wide Instruction File

1. In the workspace root, create a new file: `.instructions.md`

2. Add the following content:

```markdown
---
applyTo: ["src/**/*.js"]
---

# Task Management API - General Instructions

## Overview
This is a Task Management API built with Express.js, SQLite, and JWT authentication.
Follow Node.js and Express.js best practices throughout the codebase.

## Code Style Conventions

### Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for class names and models
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names (avoid single-letter variables except in loops)

### File Organization
- One model per file
- One route handler per file
- Group related utilities together

### Error Handling
- Always use try/catch blocks for async operations
- Return consistent error response format
- Log errors with context information

### Comments
- Use JSDoc comments for all functions
- Explain "why", not "what"
- Keep comments up-to-date with code changes

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite via better-sqlite3
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi

## General Principles
1. **Security First**: Always validate input, sanitize data, require authentication
2. **RESTful Design**: Follow REST conventions for API endpoints
3. **Error Clarity**: Provide clear, actionable error messages
4. **Performance**: Use efficient database queries, avoid N+1 problems
```

3. Save the file

### Step 2: Test the Instruction File

Let's test if Copilot is following our instructions.

1. Create a new file: `src/api/categories.js`

2. Start typing a comment:
   ```javascript
   // Create a new Express router for categories
   ```

3. Pay attention to what Copilot suggests. It should:
   - Use camelCase for variables
   - Include try/catch blocks
   - Follow Express.js patterns
   - Match the error handling style from your instructions

4. Accept a few suggestions and observe the style

### Step 3: Verify Naming Conventions

1. In the same file, start typing:
   ```javascript
   const MAX
   ```

2. Copilot should suggest using `UPPER_SNAKE_CASE` for constants like:
   ```javascript
   const MAX_CATEGORIES_PER_USER = 50;
   ```

3. Try typing a function name:
   ```javascript
   function get
   ```

4. Copilot should suggest `camelCase` like:
   ```javascript
   function getCategoryById(id) {
   ```

---

## 🔧 Part 2: Scoped Instructions

Not all instructions apply everywhere. Let's create targeted instruction files.

### Step 1: Create API-Specific Instructions

1. Navigate to `examples/instructions/` directory (or create it if it doesn't exist)

2. **Look at the existing file:** `api-route-instructions.md`

3. **Read through it** and notice:
   - The `applyTo` pattern targets only API files
   - Specific patterns for route structure
   - Authentication requirements
   - Response format standards

4. **Copy this file** to `.github/copilot/instructions/api-routes.instructions.md`

```bash
# Create the directory structure
mkdir -p .github/copilot/instructions

# Copy the example
cp examples/instructions/api-route-instructions.md .github/copilot/instructions/api-routes.instructions.md
```

### Step 2: Understanding Scope Patterns

Open `.github/copilot/instructions/api-routes.instructions.md` and examine the frontmatter:

```yaml
---
applyTo:
  - "src/api/**/*.js"
  - "!src/api/auth.js"     # Exclude auth.js  
---
```

This pattern matches:
- ✅ `src/api/users.js`
- ✅ `src/api/tasks.js`
- ✅ `src/api/categories.js`
- ❌ `src/api/auth.js` (excluded)
- ❌ `src/models/User.js` (different directory)

### Step 3: Create Model-Specific Instructions

1. Create a new file: `.github/copilot/instructions/models.instructions.md`

2. Add the following:

```markdown
---
applyTo: ["src/models/**/*.js"]
---

# Data Model Instructions

## Overview
All data models use better-sqlite3 for database operations.

## Model Structure
Every model must include:

1. **Constructor** - Initialize with database connection
2. **create()** - Insert new record
3. **findById()** - Get single record by ID
4. **findAll()** - Get all records (with optional filters)
5. **update()** - Update existing record
6. **delete()** - Remove record

## Code Template

\`\`\`javascript
class ModelName {
  constructor(db) {
    this.db = db;
  }

  /**
   * Create a new record
   * @param {Object} data - Record data
   * @returns {Object} Created record with ID
   */
  create(data) {
    const stmt = this.db.prepare(`
      INSERT INTO table_name (field1, field2)
      VALUES (@field1, @field2)
    `);
    
    const info = stmt.run(data);
    return { id: info.lastInsertRowid, ...data };
  }

  // ... other methods
}

module.exports = ModelName;
\`\`\`

## Database Best Practices

### Use Prepared Statements
- Always use parameterized queries
- Never concatenate user input into SQL
- Prevents SQL injection

### Transaction Management
- Use transactions for related operations
- Rollback on errors
- Ensure data consistency

### Error Handling
- Catch and transform database errors
- Provide meaningful error messages
- Log errors for debugging

## Validation
- Validate data before database operations
- Use Joi schemas for complex validation
- Return validation errors to caller
```

3. Save the file

### Step 4: Test Scoped Instructions

1. Open `src/models/Task.js`

2. Try to add a new method:
   ```javascript
   /**
    * Find tasks by user
    */
   findByUser
   ```

3. Copilot should suggest a method that:
   - Uses prepared statements
   - Has JSDoc comments
   - Includes error handling
   - Follows the model pattern

4. Now open `src/api/tasks.js`

5. Start typing a new route:
   ```javascript
   router.get('/
   ```

6. Copilot should suggest code following the **API instructions**, not model instructions:
   - Includes authentication middleware
   - Uses try/catch
   - Returns consistent JSON format

---

## 🔧 Part 3: Security Instructions

Security rules should be universal and emphasized.

### Step 1: Review Security Instructions

1. Open `examples/instructions/security-instructions.md`

2. Notice the pattern:
   ```yaml
   ---
   alwaysInclude: true
   priority: 100
   ---
   ```

   - `alwaysInclude: true` means these rules apply *everywhere*
   - `priority: 100` means they override other instructions

### Step 2: Create Your Security Instructions

1. Copy the example to your project:

```bash
cp examples/instructions/security-instructions.md .github/copilot/instructions/security.instructions.md
```

2. Open it and review the security rules:
   - Input validation requirements
   - Authentication enforcement
   - SQL injection prevention
   - XSS prevention
   - Rate limiting guidance

### Step 3: Test Security Instructions

1. Create a new file: `src/api/admin.js`

2. Start typing a route that accepts user input:
   ```javascript
   router.post('/update-user', async (req, res) => {
     const { userId, email } = req.body;
   ```

3. Continue and see if Copilot suggests:
   - Input validation (Joi schema)
   - Authentication check
   - Sanitization of input

---

## 🧪 Part 4: Testing Your Instructions

### Exercise 1: Create a New Endpoint

**Task:** Create a new endpoint `GET /api/tasks/stats` that returns task statistics.

**What to observe:**
- Does Copilot use the correct route structure?
- Is authentication middleware included?
- Is error handling consistent with your patterns?
- Is the response format correct?

<details>
<summary>Click to see expected pattern</summary>

```javascript
router.get('/stats', authenticate, async (req, res) => {
  try {
    const taskModel = new Task(db);
    const stats = {
      total: taskModel.count(),
      completed: taskModel.count({ completed: true }),
      pending: taskModel.count({ completed: false })
    };
    
    res.json({
      success: true,
      data: stats
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
</details>

### Exercise 2: Create a New Model

**Task:** Create a new model `src/models/Category.js`

**What to observe:**
- Does Copilot follow the model template?
- Are prepared statements used?
- Is JSDoc included?
- Are all CRUD methods present?

### Exercise 3: Add Input Validation

**Task:** Add input validation to an existing endpoint

**What to observe:**
- Does Copilot suggest Joi validation?
- Are all required fields validated?
- Are security rules followed?

---

## 📊 Part 5: Measuring Effectiveness

### How to Know if Instructions Are Working

1. **Consistency Check**
   - Generate code in multiple files
   - Compare patterns and style
   - Should be consistent across all files

2. **Security Check**
   - Try to create an endpoint without authentication
   - Copilot should suggest adding it

3. **Convention Check**
   - Create variables and functions
   - Names should follow your conventions

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Copilot ignores instructions | `applyTo` pattern doesn't match | Check glob patterns |
| Instructions not found | File in wrong location | Move to root or `.github/copilot/` |
| Partial compliance | Instructions too vague | Be more specific with examples |
| YAML error | Frontmatter syntax wrong | Validate YAML syntax |

---

## 🎓 Part 6: Best Practices

### DO ✅

1. **Be Specific**
   ```markdown
   ❌ "Use good error handling"
   ✅ "Wrap all async operations in try/catch blocks and return errors in format: { error: { code, message } }"
   ```

2. **Provide Examples**
   ```markdown
   Always include context in log messages:
   \`\`\`javascript
   console.error(`Failed to fetch user ${userId}:`, error);
   \`\`\`
   ```

3. **Scope Appropriately**
   ```yaml
   # Don't apply API rules to models
   applyTo: ["src/api/**/*.js"]
   ```

4. **Prioritize Security**
   ```yaml
   alwaysInclude: true
   priority: 100
   ```

### DON'T ❌

1. **Be Vague**
   ```markdown
   ❌ "Write good code"
   ❌ "Follow best practices"
   ```

2. **Over-Scope**
   ```yaml
   # Too broad
   applyTo: ["**/*"]
   ```

3. **Forget Updates**
   - Review instructions monthly
   - Update when patterns change
   - Remove outdated guidance

4. **Duplicate Across Files**
   - Keep general rules in project-wide file
   - Use scoped files for specific contexts

---

## 🚀 Challenge: Advanced Exercises

### Challenge 1: Multi-Layer Instructions

Create instruction files for different layers:
- `database.instructions.md` for `src/utils/database.js`
- `middleware.instructions.md` for `src/middleware/**/*.js`
- `validation.instructions.md` for validation logic

### Challenge 2: Testing Instructions

Create an instruction file that guides test writing:
- Located in: `.github/copilot/instructions/testing.instructions.md`
- Should apply to: `**/*.test.js` files
- Should include: Testing patterns, assertion style, coverage requirements

### Challenge 3: Documentation Instructions

Create instructions for documentation:
- JSDoc format specifications
- README structure requirements
- API documentation generation

---

## 📝 Lab Completion Checklist

Before moving to Lab 2, ensure you have:

- [ ] Created a project-wide `.instructions.md` file
- [ ] Created scoped instructions for API routes
- [ ] Created scoped instructions for models
- [ ] Created security instructions with high priority
- [ ] Tested instructions by creating new code
- [ ] Observed Copilot following your conventions
- [ ] Understand `applyTo` glob patterns
- [ ] Understand `priority` and `alwaysInclude` options

---

## 🎯 Key Takeaways

1. **Instruction files establish conventions** - They're your codebase's style guide
2. **Scope matters** - Use `applyTo` patterns to target specific files
3. **Security first** - Use `alwaysInclude` and high priority for security rules
4. **Examples are crucial** - Show Copilot exactly what you want
5. **Keep them updated** - Instructions are living documents

---

## ➡️ Next Steps

Congratulations! You've completed Lab 1 and established the foundation of the Agentic SDLC.

**Next:** [Lab 2 - Prompt Files →](./lab-02-prompts.md)

In Lab 2, you'll learn to create reusable task templates that increase automation beyond basic guidance.

---

## 🔗 Additional Resources

- [Customization Reference](../../docs/CUSTOMIZATION_REFERENCE.md#instruction-files)
- [Agentic SDLC Guide](../../docs/AGENTIC_SDLC_GUIDE.md#level-1-instruction-files)
- [Example Instruction Files](../../examples/instructions/)

---

**Questions or Issues?** Check the [troubleshooting section](#common-issues) or  the [Example Files](../../examples/instructions/README.md).
