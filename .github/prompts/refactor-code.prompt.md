---
agent: 'agent'
title: Refactor Code
description: Refactor existing code to improve quality, maintainability, and follow best practices
applyTo:
  - "src/**/*.js"
tags:
  - refactor
  - code-quality
  - improvement
---

# Refactor Code

I need to refactor {FILE_OR_FUNCTION} to improve code quality and maintainability.

## Target Code

**File(s)**: {FILE_PATH}

**Function/Section**: {SPECIFIC_FUNCTION_OR_SECTION}

## Refactoring Goals

Please refactor the code to achieve the following:

### Primary Goals
- [ ] {GOAL_1 - e.g., "Improve readability"}
- [ ] {GOAL_2 - e.g., "Reduce complexity"}
- [ ] {GOAL_3 - e.g., "Follow DRY principle"}

### Specific Improvements
Choose applicable improvements:

#### Code Organization
- [ ] Extract large functions into smaller, focused functions
- [ ] Move business logic to service layer
- [ ] Consolidate duplicate code
- [ ] Improve variable and function naming
- [ ] Organize imports and dependencies

#### Error Handling
- [ ] Add comprehensive error handling
- [ ] Improve error messages
- [ ] Add appropriate logging
- [ ] Handle edge cases

#### Performance
- [ ] Optimize database queries
- [ ] Reduce unnecessary operations
- [ ] Implement caching where appropriate
- [ ] Avoid blocking operations

#### Maintainability
- [ ] Add/improve documentation
- [ ] Follow project coding standards
- [ ] Make code more testable
- [ ] Reduce coupling between modules

## Constraints

**Must Maintain**:
- [ ] Existing API contracts (input/output)
- [ ] Current functionality (no breaking changes)
- [ ] Test coverage (if exists)
- [ ] Performance characteristics

**Must Not**:
- Change database schema
- Break existing integrations
- Introduce new dependencies without discussion

## Refactoring Approach

Please:

### 1. Analysis
- Review the current code structure
- Identify code smells and areas for improvement
- List specific issues found

### 2. Planning
- Propose refactoring strategy
- Explain what changes will be made
- Highlight any risks or considerations

### 3. Implementation
- Make changes incrementally
- Follow project coding standards
- Maintain consistent style
- Preserve all existing functionality

### 4. Verification
- Ensure no behavioral changes
- Add comments for complex logic
- Update related documentation
- Suggest tests if needed

## Success Criteria

The refactoring is successful when:
- [ ] Code is more readable and maintainable
- [ ] All primary goals are achieved
- [ ] No functionality is broken
- [ ] Code follows project standards
- [ ] {ADDITIONAL_CRITERIA}

---

## Example Usage #1: Refactor Complex Function

```
I need to refactor the getUserTasks function in src/api/tasks.js to improve code quality and maintainability.

File: src/api/tasks.js
Function: getUserTasks

Primary Goals:
- Improve readability
- Extract business logic to service layer
- Add proper error handling

Specific Improvements:
- Extract large functions into smaller, focused functions
- Move business logic to service layer
- Add comprehensive error handling
- Improve variable naming

Must Maintain:
- Existing API response format
- Current authentication flow
- Performance characteristics

Success Criteria:
- Function is under 20 lines
- Business logic is in service layer
- All errors are properly handled
- Code is easier to understand
```

## Example Usage #2: Refactor Multiple Files

```
I need to refactor the authentication module to improve code organization and maintainability.

Files:
- src/api/auth.js
- src/middleware/auth.js
- src/services/authService.js

Primary Goals:
- Consolidate duplicate code
- Improve error handling
- Follow DRY principle

Specific Improvements:
- Consolidate duplicate validation logic
- Create reusable utility functions
- Standardize error responses
- Add comprehensive logging

Must Maintain:
- JWT token format
- Existing endpoints
- Authentication flow

Success Criteria:
- No duplicate validation code
- Consistent error handling across all auth endpoints
- Improved logging for debugging
```
