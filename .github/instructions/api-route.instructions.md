---
applyTo: "src/api/**/*.js"
description: Instructions for creating and maintaining API route handlers in the src/api/ directory.
---

# API Route Instructions Example

## Purpose
Instructions specific to creating and maintaining API route handlers in the `src/api/` directory.

## Route Structure

All route files in `src/api/` must follow this structure:

```javascript
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Model = require('../models/ModelName');
const { authenticate } = require('../middleware/auth');

// Validation middleware (if needed)
const validateInput = [
  body('field').validation().withMessage('Error message')
];

// Route handlers
router.get('/', async (req, res, next) => {
  try {
    // Implementation
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

## Required Patterns

### 1. Authentication
All routes except public endpoints (login, register) must use `authenticate` middleware:
```javascript
router.get('/protected', authenticate, async (req, res) => {
  // req.user is available here
});
```

### 2. Validation
Use express-validator for input validation on POST and PUT routes:
```javascript
const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['todo', 'in-progress', 'done'])
];

router.post('/', authenticate, validateTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process validated data
});
```

### 3. Error Handling
Always use try-catch and pass errors to next():
```javascript
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});
```

### 4. Resource Ownership
For user-owned resources, always verify ownership:
```javascript
const task = await Task.findById(req.params.id);
if (task.user_id !== req.user.id) {
  return res.status(403).json({ error: 'Access denied' });
}
```

## HTTP Status Codes

Use these status codes consistently:
- `200` - Successful GET, PUT, DELETE
- `201` - Successful POST (resource created)
- `400` - Validation error or bad request
- `401` - Authentication required or invalid token
- `403` - Forbidden (authenticated but not authorized)
- `404` - Resource not found
- `409` - Conflict (e.g., duplicate username)
- `500` - Server error (handled by error middleware)

## Response Formats

### Success Response
```javascript
// Single item
res.json({ id: 1, name: 'Item' });

// Multiple items
res.json([{ id: 1 }, { id: 2 }]);

// With metadata
res.json({
  data: [...],
  total: 100,
  page: 1
});
```

### Error Response
```javascript
// Simple error
res.status(404).json({ error: 'Task not found' });

// Validation errors
res.status(400).json({ errors: errors.array() });
```

## RESTful Conventions

Follow these REST patterns:
- GET `/resource` - List all
- GET `/resource/:id` - Get one
- POST `/resource` - Create new
- PUT `/resource/:id` - Update existing
- DELETE `/resource/:id` - Delete

For filtered queries:
- GET `/resource/status/:status` - Filter by status
- GET `/resource?priority=high` - Query parameters for complex filters

## Common Mistakes to Avoid

❌ **Don't** forget try-catch:
```javascript
// BAD
router.get('/', async (req, res) => {
  const data = await Model.findAll(); // Unhandled error
  res.json(data);
});
```

✅ **Do** use try-catch and next():
```javascript
// GOOD
router.get('/', async (req, res, next) => {
  try {
    const data = await Model.findAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
```

❌ **Don't** skip authorization checks:
```javascript
// BAD - any authenticated user can delete any task
router.delete('/:id', authenticate, async (req, res) => {
  await Task.delete(req.params.id);
});
```

✅ **Do** verify ownership:
```javascript
// GOOD
router.delete('/:id', authenticate, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  await Task.delete(req.params.id);
});
```

## When Creating New Routes

1. Determine if authentication is required
2. Create validation middleware if accepting input
3. Implement error handling
4. Verify resource ownership for protected resources
5. Use appropriate status codes
6. Follow consistent response format
7. Import and mount in `src/index.js`

## Testing Checklist

When implementing routes, test:
- ✅ Happy path works correctly
- ✅ Authentication is enforced
- ✅ Validation catches invalid input
- ✅ Ownership checks prevent unauthorized access
- ✅ Non-existent resources return 404
- ✅ Errors are handled gracefully
