---
agent: 'agent'
description: 'Creates a complete CRUD endpoint with authentication, validation, and error handling'
---

# Add New API Endpoint

I need you to create a new API endpoint for managing {RESOURCE_NAME} in our Task Management API.

## Requirements

### 1. Create the API Route File
- **Location**: `src/api/{resource-name}.js`
- **Include**: All CRUD operations (GET all, GET by ID, POST, PUT, DELETE)
- **Authentication**: All routes except GET should require authentication
- **Validation**: Use express-validator for POST and PUT requests

### 2. Field Definitions
Create the following fields for {RESOURCE_NAME}:

{FIELD_DEFINITIONS}

Example:
- name (string, required, 1-100 chars)
- description (text, optional)
- status (enum: 'active', 'inactive', default: 'active')

### 3. Routes to Implement

#### GET /{resource-name}
- List all resources
- Support optional query parameters: `limit`, `offset`, `status`
- Return array of objects

#### GET /{resource-name}/:id
- Get single resource by ID
- Return 404 if not found

#### POST /{resource-name}
- Create new resource
- Require authentication
- Validate all required fields
- Associate with authenticated user (user_id)
- Return created resource with 201 status

#### PUT /{resource-name}/:id
- Update existing resource
- Require authentication
- Check ownership (user_id matches req.user.id)
- Return updated resource

#### DELETE /{resource-name}/:id
- Delete resource
- Require authentication
- Check ownership
- Return 204 No Content

### 4. Database Schema
When creating the table, include:
- Primary key: `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- Foreign key: `user_id` (INTEGER NOT NULL, FOREIGN KEY users(id))
- Timestamps: `created_at`, `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- All custom fields defined above

### 5. Follow Project Conventions
- Use async/await for database operations
- Use parameterized queries for SQL injection prevention
- Apply our standard error handling pattern
- Follow API response format from project instructions
- Use express-validator for input validation
- Include JSDoc comments for all functions

### 6. Integration
- Export the router with `module.exports = router;`
- Add the route to `src/index.js`: `app.use('/api/{resource-name}', {resource}Routes);`

## Expected Deliverables

1. Complete route file: `src/api/{resource-name}.js`
2. Database initialization code in `src/utils/initDatabase.js`
3. Updated `src/index.js` to register the new routes
4. Inform me of any additional dependencies needed

Generate the complete, production-ready code following all project conventions and security best practices.
