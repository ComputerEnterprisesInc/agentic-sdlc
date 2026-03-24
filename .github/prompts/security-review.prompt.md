---
agent: 'agent'
title: Security Review
description: Performs comprehensive security audit of code changes
applyTo:
  - "**/*.js"
tags:
  - security
  - audit
  - review
---

# Security Review

Perform a comprehensive security review of the code in {FILE_PATH_OR_FEATURE}.

## Review Checklist

### 1. Authentication & Authorization
- [ ] Are all protected endpoints using authentication middleware?
- [ ] Is JWT token validation working correctly?
- [ ] Are tokens being securely stored and transmitted?
- [ ] Is there proper session management?
- [ ] Are there any authentication bypass vulnerabilities?

Check for:
- Missing `authenticate` middleware on protected routes
- Weak JWT secret or missing expiration
- Hardcoded credentials
- Improper token storage

### 2. Input Validation
- [ ] Are all user inputs validated?
- [ ] Is validation performed on both client and server?
- [ ] Are there checks for required fields?
- [ ] Is data type validation in place?
- [ ] Are length limits enforced?

Check for:
- Missing express-validator usage on POST/PUT routes
- Unvalidated query parameters
- Missing sanitization of HTML/script content
- Type coercion vulnerabilities

### 3. SQL Injection Prevention
- [ ] Are all database queries using parameterized statements?
- [ ] Is there any string concatenation in SQL queries?
- [ ] Are user inputs properly escaped?

Check for:
```javascript
// ❌ VULNERABLE
db.run(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ SECURE
db.run('SELECT * FROM users WHERE id = ?', [userId]);
```

### 4. Authorization & Access Control
- [ ] Is resource ownership verified before modification?
- [ ] Are user permissions checked?
- [ ] Can users access/modify resources they don't own?
- [ ] Are there privilege escalation risks?

Check for:
```javascript
// ✅ Check ownership
if (resource.user_id !== req.user.id) {
  return res.status(403).json({ error: 'Access denied' });
}
```

### 5. Sensitive Data Exposure
- [ ] Are passwords being hashed (bcrypt)?
- [ ] Are secrets stored in environment variables?
- [ ] Is sensitive data excluded from API responses?
- [ ] Are error messages leaking information?

Check for:
- Passwords in plain text
- JWT secrets in code
- Stack traces in production responses
- Detailed error messages to users

### 6. Error Handling
- [ ] Are errors being caught and handled?
- [ ] Do error messages avoid leaking sensitive info?
- [ ] Is there a global error handler?
- [ ] Are errors logged appropriately?

Check for:
- Unhandled promise rejections
- Stack traces sent to client
- Database error details exposed

### 7. Rate Limiting & DoS Protection
- [ ] Is there rate limiting on authentication endpoints?
- [ ] Are there limits on request size?
- [ ] Are expensive operations protected?

Recommend:
- express-rate-limit for login/signup
- Request size limits
- Query result pagination

### 8. CORS & Headers
- [ ] Is CORS properly configured?
- [ ] Are security headers set (helmet)?
- [ ] Is HTTPS enforced in production?

Check for:
- Wildcard CORS (*) in production
- Missing security headers
- HTTP in production

### 9. Dependencies
- [ ] Are all dependencies up to date?
- [ ] Are there known vulnerabilities?

Recommend running:
```bash
npm audit
npm audit fix
```

### 10. Common Vulnerabilities

#### Check for XSS (Cross-Site Scripting)
- Unescaped user content in responses
- innerHTML usage
- eval() or Function() with user input

#### Check for CSRF (Cross-Site Request Forgery)
- State-changing operations without CSRF tokens
- Consider using SameSite cookies

#### Check for Information Disclosure
- Directory listing enabled
- Source maps in production
- .env files in version control

## Output Format

Provide the security review in this format:

### 🔴 Critical Issues
List any critical security vulnerabilities that must be fixed immediately.

### 🟡 Warnings
List potential security concerns that should be addressed.

### 🟢 Good Practices Found
List security measures that are correctly implemented.

### 📋 Recommendations
Provide specific, actionable recommendations with code examples.

### 🔧 Fixes Required
For each issue, provide:
1. **Location**: File and line numbers
2. **Issue**: Description of the vulnerability
3. **Risk**: Impact if exploited
4. **Fix**: Exact code changes needed

Example:
```javascript
// ❌ BEFORE (Vulnerable)
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ AFTER (Secure)
const query = 'SELECT * FROM users WHERE email = ?';
db.get(query, [email], callback);
```

Perform the complete security review and provide detailed findings with actionable fixes.
