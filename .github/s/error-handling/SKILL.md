---
name: error-handling
description: Expert in comprehensive error handling, error responses, logging, and debugging strategies. Use this skill for implementing robust error handling, creating custom errors, and debugging application issues.
---

# Error Handling Skill

## Expertise Areas

I am an expert in application error handling with deep knowledge of:
- Exception handling patterns
- Error response formatting
- Logging strategies
- Debugging techniques
- Error recovery mechanisms
- Custom error classes
- Error monitoring and alerting

## Core Principles

### Error Handling Philosophy

1. **Fail Fast**: Detect errors as early as possible
2. **Clear Messages**: Errors should explain what went wrong and how to fix it
3. **Consistent Format**: All errors follow the same response structure
4. **Proper Logging**: Log enough detail for debugging without exposing sensitive data
5. **Graceful Degradation**: System continues functioning when possible

### Error Categories

#### 1. Client Errors (4xx)
Caused by invalid input or unauthorized access:
- Validation errors
- Authentication failures
- Authorization failures
- Resource not found
- Malformed requests

#### 2. Server Errors (5xx)
Caused by server-side issues:
- Database connection failures
- External service timeouts
- Unexpected exceptions
- Configuration errors
- Resource exhaustion

#### 3. Operational Errors
Expected errors that should be handled:
- File not found
- Network timeout
- Invalid user input
- Business rule violations

#### 4. Programmer Errors
Bugs that should be fixed:
- Null reference
- Undefined variable
- Type errors
- Logic errors

## Implementation Patterns

### Custom Error Classes

```javascript
// Base custom error
class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 404, 'NOT_FOUND');
    this.resource = resource;
    this.id = id;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

class DatabaseError extends AppError {
  constructor(message, originalError) {
    super(message, 500, 'DATABASE_ERROR');
    this.originalError = originalError;
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError
};
```

### Error Response Format

```javascript
// Standard error response structure
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'Human-readable message',
    details: { /* Additional context */ },
    timestamp: '2024-01-15T10:30:00Z',
    requestId: 'unique-request-id'
  }
}

// Validation error response
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    details: {
      fields: {
        email: ['Email is required', 'Email format is invalid'],
        password: ['Password must be at least 8 characters']
      }
    }
  }
}
```

### Global Error Handler Middleware

```javascript
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  // Log error
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    user: req.user?.id,
    requestId: req.id
  });

  // Handle operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.errors || err.details || {},
        requestId: req.id
      }
    });
  }

  // Handle programmer errors (bugs)
  // Don't leak error details to client
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      requestId: req.id
    }
  });
}

module.exports = errorHandler;
```

### Try-Catch Patterns

#### API Route Handler
```javascript
router.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate input
    if (!id || isNaN(id)) {
      throw new ValidationError('Invalid user ID');
    }
    
    // Call service layer
    const user = await userService.getUserById(id);
    
    // Check if found
    if (!user) {
      throw new NotFoundError('User', id);
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

#### Service Layer Method
```javascript
async function getUserTasks(userId) {
  try {
    logger.debug(`Fetching tasks for user ${userId}`);
    
    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User', userId);
    }
    
    // Get tasks
    const tasks = await Task.findByUserId(userId);
    
    logger.info(`Found ${tasks.length} tasks for user ${userId}`);
    return tasks;
    
  } catch (error) {
    if (error.isOperational) {
      throw error; // Re-throw operational errors
    }
    
    // Wrap unexpected errors
    logger.error('Unexpected error in getUserTasks:', error);
    throw new AppError(
      'Failed to retrieve user tasks',
      500,
      'SERVICE_ERROR'
    );
  }
}
```

#### Database Operations
```javascript
async function findById(id) {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id);
    return user;
  } catch (error) {
    logger.error('Database query failed:', error);
    throw new DatabaseError(
      'Failed to query user',
      error
    );
  }
}
```

### Async Error Wrapper

```javascript
// Utility to wrap async route handlers
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ success: true, data: user });
}));
```

## Logging Best Practices

### Log Levels

```javascript
// ERROR: Errors that need attention
logger.error('Database connection failed', { error: err });

// WARN: Potential issues that should be monitored
logger.warn('API rate limit approaching', { current: count, limit: max });

// INFO: Important business events
logger.info('User logged in', { userId, timestamp });

// DEBUG: Detailed information for debugging
logger.debug('Query executed', { sql, params, duration });
```

### What to Log

**DO Log**:
- Error messages and stack traces
- Request IDs for correlation
- User IDs (not names or emails in production)
- Endpoint paths and methods
- Important business events
- Performance metrics
- External API calls

**DON'T Log**:
- Passwords or API keys
- Credit card numbers
- Personal identifying information (PII)
- Full request/response bodies in production
- Session tokens

### Structured Logging

```javascript
logger.error('Operation failed', {
  operation: 'createUser',
  userId: req.user?.id,
  error: err.message,
  stack: err.stack,
  requestId: req.id,
  duration: Date.now() - startTime,
  metadata: {
    path: req.path,
    method: req.method,
    ip: req.ip
  }
});
```

## Debugging Strategies

### 1. Add Strategic Logging

```javascript
async function processTask(taskId) {
  logger.debug('Starting task processing', { taskId });
  
  const task = await getTask(taskId);
  logger.debug('Task retrieved', { task: task.id, status: task.status });
  
  const result = await performWork(task);
  logger.debug('Work completed', { taskId, result });
  
  return result;
}
```

### 2. Use Correlation IDs

```javascript
// Middleware to add request ID
const { v4: uuidv4 } = require('uuid');

function addRequestId(req, res, next) {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
}
```

### 3. Error Context

```javascript
try {
  await riskyOperation();
} catch (error) {
  // Add context before re-throwing
  error.context = {
    operation: 'riskyOperation',
    userId: currentUser.id,
    timestamp: new Date().toISOString()
  };
  throw error;
}
```

### 4. Debugging Checklist

When debugging an error:
- [ ] Check error message and stack trace
- [ ] Review recent code changes
- [ ] Check request parameters and body
- [ ] Verify authentication/authorization
- [ ] Review database state
- [ ] Check external service status
- [ ] Look for similar errors in logs
- [ ] Reproduce in development environment
- [ ] Add logging to trace execution flow

## Common Error Scenarios

### Database Errors

```javascript
async function handleDatabaseOperation() {
  try {
    return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  } catch (error) {
    if (error.code === 'SQLITE_BUSY') {
      throw new DatabaseError('Database is locked, try again');
    }
    if (error.code === 'SQLITE_CONSTRAINT') {
      throw new ValidationError('Constraint violation');
    }
    throw new DatabaseError('Database operation failed', error);
  }
}
```

### Authentication Errors

```javascript
function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Token expired'));
    } else if (error.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
}
```

### Validation Errors

```javascript
function validateInput(data, schema) {
  const errors = {};
  
  if (!data.email || !data.email.includes('@')) {
    errors.email = ['Invalid email format'];
  }
  
  if (!data.password || data.password.length < 8) {
    errors.password = ['Password must be at least 8 characters'];
  }
  
  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', { fields: errors });
  }
}
```

## Error Monitoring

### Production Considerations

1. **Error Tracking**: Use services like Sentry, Rollbar, or similar
2. **Alerting**: Set up alerts for error rate thresholds
3. **Metrics**: Track error rates, types, and trends
4. **Health Checks**: Implement health check endpoints
5. **Graceful Shutdown**: Handle SIGTERM properly

### Health Check Endpoint

```javascript
router.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {}
  };
  
  try {
    // Check database
    await db.query('SELECT 1');
    health.checks.database = 'ok';
  } catch (error) {
    health.status = 'degraded';
    health.checks.database = 'error';
  }
  
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

---

## When to Use This Skill

Invoke this skill when you need to:
- Implement error handling in new features
- Debug application errors
- Create custom error classes
- Design error response formats
- Add logging to code
- Handle edge cases and failure scenarios
- Improve error messages
- Set up error monitoring
