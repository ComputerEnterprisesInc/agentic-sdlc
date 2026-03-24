---
applyTo: "**/*.js, **/*.ts"
description: Security requirements and best practices for all code in this project.
excludeAgent: "code-reviewer"
---

# Security Instructions Example

## Purpose
Security requirements and best practices for all code in this project.

## Authentication & Authorization

### JWT Token Handling

#### Token Generation
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: user.id, username: user.username }, // Payload
  process.env.JWT_SECRET,                    // Secret
  { expiresIn: '24h' }                       // Options
);
```

**Rules**:
- ✅ Always set an expiration time
- ✅ Use environment variables for secrets
- ✅ Include only necessary data in payload (no sensitive info)
- ❌ Never include passwords in JWT payload
- ❌ Never hardcode JWT secrets

#### Token Verification
```javascript
const token = req.headers.authorization?.replace('Bearer ', '');

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
} catch (error) {
  return res.status(401).json({ error: 'Invalid token' });
}
```

### Password Security

#### Hashing Passwords
```javascript
const bcrypt = require('bcryptjs');

// When creating/updating user
const hashedPassword = await bcrypt.hash(password, 10);

// When verifying
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

**Rules**:
- ✅ Always hash passwords before storing
- ✅ Use bcrypt with at least 10 rounds
- ✅ Never log passwords
- ✅ Never return passwords in API responses
- ❌ Never store plain text passwords
- ❌ Never compare passwords with `===`

#### Password Requirements
Enforce these minimum requirements:
- Minimum 6 characters (for demo; use 12+ in production)
- Validate on registration and password change
```javascript
body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters')
```

### Authorization Checks

#### Resource Ownership
Always verify users can only access their own resources:

```javascript
// Get the resource
const task = await Task.findById(req.params.id);

// Check if it exists
if (!task) {
  return res.status(404).json({ error: 'Task not found' });
}

// Check ownership
if (task.user_id !== req.user.id) {
  return res.status(403).json({ error: 'Access denied' });
}

// Proceed with operation
```

**Apply to**:
- GET (viewing)
- PUT (updating)
- DELETE (deleting)

## Input Validation & Sanitization

### Validate All Input
Use express-validator on all endpoints that accept data:

```javascript
const { body, validationResult } = require('express-validator');

const validateInput = [
  body('email').isEmail().normalizeEmail(),
  body('username').trim().isLength({ min: 3 }).escape(),
  body('title').trim().notEmpty().escape()
];

router.post('/', validateInput, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process validated input
});
```

### Common Validations
- `trim()` - Remove whitespace
- `escape()` - Escape HTML characters
- `notEmpty()` - Require field
- `isEmail()` - Validate email
- `isLength()` - Check length
- `isIn()` - Enum validation
- `normalizeEmail()` - Standardize email

### SQL Injection Prevention

**Always use parameterized queries**:

✅ **Safe**:
```javascript
db.get('SELECT * FROM users WHERE id = ?', [userId], callback);
db.run('INSERT INTO tasks VALUES (?, ?)', [title, desc], callback);
```

❌ **Vulnerable**:
```javascript
db.get(`SELECT * FROM users WHERE id = ${userId}`, callback);
db.run(`INSERT INTO tasks VALUES ('${title}', '${desc}')`, callback);
```

## Sensitive Data

### Environment Variables
Never commit sensitive data. Use environment variables:

```javascript
// .env file (add to .gitignore!)
JWT_SECRET=your-secret-key
DB_PASSWORD=database-password

// In code
const secret = process.env.JWT_SECRET;
```

### Logging Rules
- ✅ Log user actions (login, resource access)
- ✅ Log errors with stack traces
- ❌ Never log passwords
- ❌ Never log full JWT tokens
- ❌ Never log credit card data

```javascript
// Good
console.log(`User ${username} logged in`);

// Bad
console.log(`Login attempt: ${username}:${password}`); // Don't log passwords!
```

### API Responses
Never leak sensitive information in responses:

```javascript
// Good - no sensitive data
res.json({
  id: user.id,
  username: user.username,
  email: user.email
});

// Bad - includes password hash
res.json({
  id: user.id,
  username: user.username,
  password: user.password // Never include this!
});
```

## Rate Limiting

For production, implement rate limiting (not included in demo):

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Common Security Mistakes

### ❌ Mistake 1: Not Checking Ownership
```javascript
// BAD - any user can delete any task
router.delete('/:id', authenticate, async (req, res) => {
  await Task.delete(req.params.id);
  res.json({ deleted: true });
});
```

### ✅ Correct: Check Ownership
```javascript
// GOOD - verify ownership first
router.delete('/:id', authenticate, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  if (task.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  await Task.delete(req.params.id);
  res.json({ deleted: true });
});
```

### ❌ Mistake 2: SQL Injection
```javascript
// BAD - vulnerable to SQL injection
const query = `SELECT * FROM tasks WHERE title LIKE '%${searchTerm}%'`;
db.all(query, callback);
```

### ✅ Correct: Parameterized Query
```javascript
// GOOD - safe from SQL injection
const query = 'SELECT * FROM tasks WHERE title LIKE ?';
db.all(query, [`%${searchTerm}%`], callback);
```

### ❌ Mistake 3: Exposing Errors
```javascript
// BAD - leaks database structure
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack });
});
```

### ✅ Correct: Generic Error Message
```javascript
// GOOD - keeps details private
app.use((err, req, res, next) => {
  console.error(err); // Log internally
  res.status(500).json({ 
    error: 'Internal server error' // Generic public message
  });
});
```

## Security Checklist

When implementing any feature, verify:

- ✅ All routes have appropriate authentication
- ✅ Resource ownership is verified
- ✅ All inputs are validated and sanitized
- ✅ Passwords are hashed
- ✅ Parameterized queries are used
- ✅ No sensitive data in responses or logs
- ✅ Environment variables for secrets
- ✅ Error messages don't leak information
- ✅ HTTP status codes are appropriate (401 vs 403)
- ✅ JWT tokens have expiration

## Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- JWT Best Practices: https://tools.ietf.org/html/rfc8725
- Express Security: https://expressjs.com/en/advanced/best-practice-security.html
