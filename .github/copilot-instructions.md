

# Task Management API - Instructions for GitHub Copilot

## Project Overview

This is a Task Management API built with Node.js, Express, and SQLite. The application follows RESTful API principles and implements JWT-based authentication.

## Architecture

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator

### Project Structure
```
src/
├── api/          # Route handlers (tasks, users, auth)
├── models/       # Data models (Task, User)
├── middleware/   # Express middleware (auth)
├── utils/        # Utilities (database connection, init scripts)
└── index.js      # Application entry point
```

## Coding Standards

### JavaScript Style
- Use **async/await** for asynchronous operations (not callbacks or raw promises where possible)
- Prefer **const** over **let**; never use **var**
- Use **arrow functions** for callbacks and simple functions
- Use **template literals** for string interpolation
- Always use **semicolons**

### Naming Conventions
- **Files**: camelCase (e.g., `taskController.js`)
- **Classes**: PascalCase (e.g., `Task`, `User`)
- **Functions/Variables**: camelCase (e.g., `findById`, `userId`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`)
- **Routes**: kebab-case URLs (e.g., `/api/tasks`, `/api/auth/login`)

### Error Handling
- Always use try-catch blocks for async operations
- Pass errors to Express error handler using `next(error)`
- Return meaningful error messages and appropriate HTTP status codes
- Example:
  ```javascript
  try {
    const result = await Model.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
  ```

### API Response Format
- **Success**: Return data directly or with a wrapper object
  ```json
  { "id": 1, "title": "Task name" }
  ```
- **Error**: Always use this format
  ```json
  { "error": { "message": "Error description", "status": 400 } }
  ```
- **Validation Errors**: Return array format from express-validator
  ```json
  { "errors": [{ "field": "email", "message": "Invalid email" }] }
  ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Tasks (Protected)
- `GET /api/tasks` - Get all user's tasks
- `GET /api/tasks/:id` - Get single task
- `GET /api/tasks/status/:status` - Get tasks by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users (Protected)
- `GET /api/users/me` - Get current user profile
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user



## Environment Variables

Required variables (see `.env.example`):
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_PATH` - SQLite database file path
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRES_IN` - Token expiration (default: 24h)

## Common Tasks

### Adding a New Route
1. Create route handler in `src/api/`
2. Add validation middleware if needed
3. Use `authenticate` middleware for protected routes
4. Add error handling with try-catch
5. Import and use in `src/index.js`

### Adding a New Model Method
1. Add static method to the model class
2. Use parameterized queries
3. Return promises
4. Handle errors appropriately

### Database Changes
1. Modify table creation in `src/utils/database.js`
2. Update init script in `src/utils/initDatabase.js`
3. Update corresponding model class
4. Delete existing `database.sqlite` and run `npm run init-db`

## Best Practices

1. **Security**
   - Never log passwords or tokens
   - Always hash passwords with bcrypt
   - Validate and sanitize all inputs
   - Use parameterized queries

2. **Code Organization**
   - One route per file in `api/`
   - One model per file in `models/`
   - Keep routes thin, logic in models
   - Reusable utilities in `utils/`

3. **Performance**
   - Use indexes on frequently queried fields
   - Limit query results when appropriate
   - Use connection pooling for production

4. **Documentation**
   - Document all functions with JSDoc comments
   - Include parameter types and return values
   - Explain complex business logic

## Development Workflow

1. Create feature branch
2. Implement changes following these standards
3. Test manually with Postman/Thunder Client
4. Write automated tests
5. Submit PR for review

## When Asked to Add Features

- Follow existing patterns in the codebase
- Add validation for new endpoints
- Include error handling
- Update this instructions file if adding new conventions
- Consider authentication/authorization requirements
- Add logging for debugging
