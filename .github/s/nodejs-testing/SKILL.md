---
name: nodejs-testing
description: Expert in Node.js testing with Jest, including unit tests, integration tests, mocking, and test-driven development. Use for writing tests, test strategy, and ensuring code quality.
---

# Node.js Testing Skill

## Expertise Areas

I am an expert in Node.js testing with deep knowledge of:
- Jest testing framework
- Unit testing strategies
- Integration testing approaches
- Mocking and stubbing
- Test-driven development (TDD)
- Code coverage analysis
- Testing best practices

## Testing Philosophy

### The Testing Pyramid

```
        /\
       /E2E\         Few end-to-end tests (slow, expensive)
      /______\
     /        \
    /Integration\    Some integration tests (medium speed)
   /____________\
  /              \
 /   Unit Tests   \  Many unit tests (fast, cheap)
/__________________\
```

**Priorities**:
- 70% Unit Tests: Test individual functions/methods
- 20% Integration Tests: Test component interactions
- 10% E2E Tests: Test complete user flows

### Test Characteristics (F.I.R.S.T.)

- **Fast**: Tests should run quickly
- **Independent**: No dependencies between tests
- **Repeatable**: Same result every time
- **Self-validating**: Pass or fail, no manual verification
- **Timely**: Written concurrent with or before production code

## Jest Setup

### Installation

```bash
npm install --save-dev jest supertest
```

### Configuration (package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coverageDirectory": "coverage",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/**/*.test.js",
      "!src/index.js"
    ],
    "testMatch": [
      "**/__tests__/**/*.js",
      "**/*.test.js",
      "**/*.spec.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Unit Testing Patterns

### Basic Test Structure

```javascript
describe('Component/Function Name', () => {
  // Setup
  beforeAll(() => {
    // Run once before all tests
  });
  
  beforeEach(() => {
    // Run before each test
  });
  
  afterEach(() => {
    // Run after each test
  });
  
  afterAll(() => {
    // Run once after all tests
  });
  
  describe('method or scenario', () => {
    it('should do something specific', () => {
      // Arrange: Set up test data
      const input = { value: 42 };
      
      // Act: Execute the code being tested
      const result = functionUnderTest(input);
      
      // Assert: Verify the result
      expect(result).toBe(expected);
    });
    
    it('should handle edge case', () => {
      // Test edge case
    });
    
    it('should throw error for invalid input', () => {
      // Test error case
    });
  });
});
```

### Testing Pure Functions

```javascript
// utils/validation.js
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// utils/validation.test.js
describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  
  it('should return false for email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });
  
  it('should return false for email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });
  
  it('should return false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
  
  it('should return false for null', () => {
    expect(validateEmail(null)).toBe(false);
  });
});
```

### Testing Classes/Models

```javascript
// models/Task.js (simplified)
class Task {
  constructor(db) {
    this.db = db;
  }
  
  async findById(id) {
    const stmt = this.db.prepare('SELECT * FROM tasks WHERE id = ?');
    return stmt.get(id);
  }
  
  async create(taskData) {
    const { title, description, userId } = taskData;
    const stmt = this.db.prepare(
      'INSERT INTO tasks (title, description, user_id, created_at) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(title, description, userId, new Date().toISOString());
    return result.lastInsertRowid;
  }
}

// models/Task.test.js
describe('Task Model', () => {
  let db;
  let taskModel;
  
  beforeEach(() => {
    // Create in-memory database for testing
    const Database = require('better-sqlite3');
    db = new Database(':memory:');
    
    // Create schema
    db.exec(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        user_id INTEGER NOT NULL,
        created_at TEXT NOT NULL
      )
    `);
    
    taskModel = new Task(db);
  });
  
  afterEach(() => {
    db.close();
  });
  
  describe('findById', () => {
    it('should return task when exists', async () => {
      // Insert test data
      db.prepare('INSERT INTO tasks (title, description, user_id, created_at) VALUES (?, ?, ?, ?)')
        .run('Test Task', 'Description', 1, '2024-01-01T00:00:00Z');
      
      const task = await taskModel.findById(1);
      
      expect(task).toBeDefined();
      expect(task.title).toBe('Test Task');
      expect(task.user_id).toBe(1);
    });
    
    it('should return undefined when task does not exist', async () => {
      const task = await taskModel.findById(999);
      expect(task).toBeUndefined();
    });
  });
  
  describe('create', () => {
    it('should create new task and return id', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Test description',
        userId: 1
      };
      
      const taskId = await taskModel.create(taskData);
      
      expect(taskId).toBe(1);
      
      // Verify task was created
      const task = await taskModel.findById(taskId);
      expect(task.title).toBe('New Task');
      expect(task.description).toBe('Test description');
    });
    
    it('should throw error when title is missing', async () => {
      const taskData = {
        description: 'Test',
        userId: 1
      };
      
      await expect(taskModel.create(taskData))
        .rejects.toThrow();
    });
  });
});
```

### Testing Services with Mocks

```javascript
// services/taskService.js
class TaskService {
  constructor(taskModel, userModel) {
    this.taskModel = taskModel;
    this.userModel = userModel;
  }
  
  async getUserTasks(userId) {
    // Verify user exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Get tasks
    const tasks = await this.taskModel.findByUserId(userId);
    return tasks;
  }
}

// services/taskService.test.js
describe('TaskService', () => {
  let taskService;
  let mockTaskModel;
  let mockUserModel;
  
  beforeEach(() => {
    // Create mocks
    mockTaskModel = {
      findByUserId: jest.fn(),
      findById: jest.fn(),
      create: jest.fn()
    };
    
    mockUserModel = {
      findById: jest.fn()
    };
    
    taskService = new TaskService(mockTaskModel, mockUserModel);
  });
  
  describe('getUserTasks', () => {
    it('should return user tasks when user exists', async () => {
      const userId = 1;
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockTasks = [
        { id: 1, title: 'Task 1', user_id: 1 },
        { id: 2, title: 'Task 2', user_id: 1 }
      ];
      
      // Setup mocks
      mockUserModel.findById.mockResolvedValue(mockUser);
      mockTaskModel.findByUserId.mockResolvedValue(mockTasks);
      
      // Execute
      const tasks = await taskService.getUserTasks(userId);
      
      // Assert
      expect(tasks).toEqual(mockTasks);
      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
      expect(mockTaskModel.findByUserId).toHaveBeenCalledWith(userId);
    });
    
    it('should throw error when user does not exist', async () => {
      mockUserModel.findById.mockResolvedValue(null);
      
      await expect(taskService.getUserTasks(1))
        .rejects.toThrow('User not found');
      
      expect(mockTaskModel.findByUserId).not.toHaveBeenCalled();
    });
  });
});
```

## Integration Testing

### Testing API Endpoints with Supertest

```javascript
// api/tasks.test.js
const request = require('supertest');
const app = require('../app');
const { setupTestDatabase, cleanupTestDatabase } = require('./test-helpers');

describe('Tasks API', () => {
  let authToken;
  let testUserId;
  
  beforeAll(async () => {
    await setupTestDatabase();
    
    // Create test user and get auth token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
    
    authToken = response.body.data.token;
    testUserId = response.body.data.userId;
  });
  
  afterAll(async () => {
    await cleanupTestDatabase();
  });
  
  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });
    
    it('should return 401 without auth token', async () => {
      await request(app)
        .get('/api/tasks')
        .expect(401);
    });
  });
  
  describe('POST /api/tasks', () => {
    it('should create new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description'
      };
      
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe(taskData.title);
    });
    
    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ description: 'No title' })
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });
  
  describe('GET /api/tasks/:id', () => {
    it('should return task by id', async () => {
      // Create a task first
      const createResponse = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Find Me', description: 'Test' });
      
      const taskId = createResponse.body.data.id;
      
      // Get the task
      const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(taskId);
      expect(response.body.data.title).toBe('Find Me');
    });
    
    it('should return 404 for non-existent task', async () => {
      await request(app)
        .get('/api/tasks/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
```

## Mocking Techniques

### Jest Mock Functions

```javascript
// Create mock function
const mockFn = jest.fn();

// Mock implementation
mockFn.mockImplementation((x) => x * 2);
// or shorter
mockFn.mockImplementation(x => x * 2);

// Mock return value
mockFn.mockReturnValue(42);

// Mock resolved promise
mockFn.mockResolvedValue({ id: 1, name: 'Test' });

// Mock rejected promise
mockFn.mockRejectedValue(new Error('Failed'));

// Assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg');
```

### Mocking Modules

```javascript
// Mock entire module
jest.mock('../utils/logger');

// Mock with implementation
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
}));

// Partial mock
jest.mock('../utils/database', () => ({
  ...jest.requireActual('../utils/database'),
  query: jest.fn()
}));
```

### Mocking Environment Variables

```javascript
describe('Config', () => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  
  afterAll(() => {
    process.env = originalEnv;
  });
  
  it('should use test database URL', () => {
    process.env.DATABASE_URL = 'sqlite::memory:';
    const config = require('../config');
    expect(config.databaseUrl).toBe('sqlite::memory:');
  });
});
```

## Test-Driven Development (TDD)

### TDD Workflow (Red-Green-Refactor)

1. **Red**: Write a failing test
2. **Green**: Write minimum code to pass
3. **Refactor**: Improve code while keeping tests green

### Example TDD Session

```javascript
// Step 1: RED - Write failing test
describe('calculateTotal', () => {
  it('should calculate total with tax', () => {
    const result = calculateTotal(100, 0.1);
    expect(result).toBe(110);
  });
});

// Step 2: GREEN - Make it pass
function calculateTotal(amount, taxRate) {
  return amount + (amount * taxRate);
}

// Step 3: REFACTOR - Improve
function calculateTotal(amount, taxRate) {
  if (amount < 0 || taxRate < 0) {
    throw new Error('Amount and tax rate must be positive');
  }
  return Number((amount * (1 + taxRate)).toFixed(2));
}

// Add more tests
it('should handle zero tax rate', () => {
  expect(calculateTotal(100, 0)).toBe(100);
});

it('should throw error for negative amount', () => {
  expect(() => calculateTotal(-100, 0.1)).toThrow();
});
```

## Test Coverage

### Running Coverage Reports

```bash
npm test -- --coverage
```

### Coverage Metrics

- **Statements**: Percentage of statements executed
- **Branches**: Percentage of branches (if/else) executed
- **Functions**: Percentage of functions called
- **Lines**: Percentage of lines executed

### Coverage Goals

- Aim for 80%+ coverage
- Focus on critical business logic
- Don't obsess over 100% coverage
- Some code is OK to skip (e.g., trivial getters/setters)

### Ignoring Code from Coverage

```javascript
/* istanbul ignore next */
function unusedFunction() {
  // Won't be counted in coverage
}
```

## Best Practices

### DO ✅

- Write descriptive test names
- Test one thing per test
- Use AAA pattern (Arrange, Act, Assert)
- Test edge cases and error conditions
- Keep tests independent
- Mock external dependencies
- Use test helpers for common setup
- Run tests before committing

### DON'T ❌

- Test implementation details
- Write tests that depend on other tests
- Use real database in unit tests
- Ignore failing tests
- Write tests just for coverage
- Mock everything
- Test private methods directly
- Copy-paste test code

## Common Testing Patterns

### Testing Async Code

```javascript
// Using async/await (preferred)
it('should fetch user', async () => {
  const user = await fetchUser(1);
  expect(user.id).toBe(1);
});

// Using promises
it('should fetch user', () => {
  return fetchUser(1).then(user => {
    expect(user.id).toBe(1);
  });
});

// Testing rejections
it('should throw error', async () => {
  await expect(fetchUser(999))
    .rejects.toThrow('User not found');
});
```

### Testing Callbacks

```javascript
it('should call callback with result', (done) => {
  fetchUser(1, (error, user) => {
    expect(error).toBeNull();
    expect(user.id).toBe(1);
    done();
  });
});
```

### Snapshot Testing

```javascript
it('should match snapshot', () => {
  const result = formatUserData(userData);
  expect(result).toMatchSnapshot();
});
```

---

## When to Use This Skill

Invoke this skill when you need to:
- Write unit tests for functions or classes
- Create integration tests for APIs
- Set up test infrastructure
- Mock dependencies
- Improve test coverage
- Practice test-driven development
- Debug failing tests
- Optimize test performance
