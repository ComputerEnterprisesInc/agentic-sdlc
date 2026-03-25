---
agent: 'agent'
description: Systematic approach to debugging and fixing issues in the application
---

# Debug Application Issue

I'm experiencing an issue with {FEATURE_OR_ENDPOINT} and need help debugging and fixing it.

## Problem Description

**Symptom**: {DESCRIBE_WHAT_IS_HAPPENING}

**Expected Behavior**: {DESCRIBE_WHAT_SHOULD_HAPPEN}

**How to Reproduce**:
1. {STEP_1}
2. {STEP_2}
3. {STEP_3}

## Error Information

**Error Message** (if any):
```
{ERROR_MESSAGE}
```

**Stack Trace** (if any):
```
{STACK_TRACE}
```

**Related Files**:
- {FILE_1}
- {FILE_2}

## Debugging Steps

Please help me debug this issue by:

### 1. Analysis Phase
- Review the relevant code files
- Identify potential causes based on the symptoms
- Check for common issues:
  - Undefined variables or null references
  - Async/await errors
  - Database query issues
  - Authentication/authorization problems
  - Input validation failures
  - Missing error handling

### 2. Investigation
- Add appropriate logging to trace execution flow
- Check database state if relevant
- Verify request/response data
- Review middleware execution order

### 3. Root Cause Identification
- Explain what is causing the issue
- Show where in the code the problem occurs
- Explain why it's happening

### 4. Fix Implementation
- Provide the fix with clear explanation
- Ensure fix follows project coding standards
- Add error handling if missing
- Add logging for future debugging

### 5. Prevention
- Suggest how to prevent similar issues
- Recommend tests to add
- Identify any related code that might have the same issue

## Additional Context

**Recent Changes**: {DESCRIBE_ANY_RECENT_CHANGES}

**Environment**: {development/production}

**When it Started**: {WHEN_DID_THIS_START_HAPPENING}

## Success Criteria

The issue is resolved when:
- [ ] {CRITERIA_1}
- [ ] {CRITERIA_2}
- [ ] No errors in logs
- [ ] Expected behavior is restored
- [ ] Solution includes proper error handling

---

## Example Usage

```
I'm experiencing an issue with the login endpoint and need help debugging and fixing it.

Symptom: Users are getting "Invalid credentials" even with correct password

Expected Behavior: Users should be able to login with valid credentials

How to Reproduce:
1. POST to /api/auth/login with valid email and password
2. Receive 401 error with "Invalid credentials" message
3. Check database - user exists with correct email

Error Message:
"Error: Invalid credentials"

Related Files:
- src/api/auth.js
- src/models/User.js

Recent Changes: Updated password hashing logic yesterday
Environment: development
```
