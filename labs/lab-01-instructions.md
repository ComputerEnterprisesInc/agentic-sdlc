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


