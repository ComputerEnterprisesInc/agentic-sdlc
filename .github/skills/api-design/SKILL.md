---
name: api-design
description: Expert in RESTful API design, endpoint structure, HTTP methods, status codes, and API best practices. Use this skill when designing new APIs, reviewing endpoint structure, or ensuring REST compliance.
triggers:
  - "design api"
  - "rest api"
  - "api structure"
  - "endpoint design"
  - "http methods"
  - "api best practices"
applyTo:
  - "src/api/**/*.js"
  - "**/*router*.js"
  - "**/*routes*.js"
---

# API Design Skill

## Expertise Areas

I am an expert in RESTful API design with deep knowledge of:
- Resource modeling and endpoint structure
- HTTP methods and semantic usage
- Status code selection
- Request/response formatting
- API versioning strategies
- HATEOAS principles
- API documentation standards

## Core Principles

### REST Resource Modeling

#### Resources vs Actions
- **Resources**: Nouns representing entities (users, tasks, projects)
- **Actions**: Verbs representing operations (create, read, update, delete)

Resources should be:
- **Plural**: `/api/users` not `/api/user`
- **Lowercase**: `/api/projects` not `/api/Projects`
- **Hyphenated**: `/api/task-categories` not `/api/task_categories` or `/api/taskCategories`

### Endpoint Structure

```
GET    /api/resources          # List all resources
GET    /api/resources/:id      # Get single resource
POST   /api/resources          # Create new resource
PUT    /api/resources/:id      # Update resource (full replacement)
PATCH  /api/resources/:id      # Update resource (partial)
DELETE /api/resources/:id      # Delete resource
```

#### Nested Resources
```
GET /api/users/:userId/tasks              # Get tasks for a user
GET /api/users/:userId/tasks/:taskId      # Get specific task for a user
POST /api/users/:userId/tasks             # Create task for a user
```

**Nesting Guidelines**:
- Limit nesting to 2 levels deep
- If relationship is not strictly hierarchical, use query parameters instead
- Example: `/api/tasks?userId=123` vs `/api/users/123/tasks`

### HTTP Methods

| Method | Purpose | Idempotent | Safe | Request Body | Response Body |
|--------|---------|------------|------|--------------|---------------|
| GET | Retrieve resource(s) | ✅ | ✅ | ❌ | ✅ |
| POST | Create resource | ❌ | ❌ | ✅ | ✅ |
| PUT | Replace resource | ✅ | ❌ | ✅ | ✅ |
| PATCH | Update resource | ❌ | ❌ | ✅ | ✅ |
| DELETE | Delete resource | ✅ | ❌ | ❌ | ❌/✅ |

**Idempotent**: Multiple identical requests have same effect as single request  
**Safe**: Does not modify server state

### HTTP Status Codes

#### Success (2xx)
- **200 OK**: Standard success response
- **201 Created**: Resource created (POST)
- **204 No Content**: Success with no response body (DELETE)

#### Client Errors (4xx)
- **400 Bad Request**: Invalid request syntax or validation error
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Request conflicts with current state (duplicate resource)
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded

#### Server Errors (5xx)
- **500 Internal Server Error**: Unexpected server error
- **503 Service Unavailable**: Server temporarily unavailable

### Response Format Standards

#### Success Response
```javascript
// Single resource
{
  "id": 1,
  "title": "Complete API design",
  "status": "in-progress",
  "createdAt": "2026-03-23T10:00:00Z",
  "updatedAt": "2026-03-23T12:00:00Z"
}

// Collection
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

#### Error Response
```javascript
// Single error
{
  "error": {
    "status": 400,
    "message": "Invalid request",
    "code": "INVALID_INPUT"
  }
}

// Validation errors
{
  "error": {
    "status": 422,
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

### Query Parameters

#### Filtering
```
GET /api/tasks?status=completed
GET /api/tasks?priority=high&status=in-progress
```

#### Sorting
```
GET /api/tasks?sort=createdAt:desc
GET /api/tasks?sort=priority:asc,createdAt:desc
```

#### Pagination
```
GET /api/tasks?page=2&limit=20
GET /api/tasks?offset=40&limit=20
```

#### Field Selection
```
GET /api/tasks?fields=id,title,status
```

#### Search
```
GET /api/tasks?search=design
GET /api/tasks?q=api+development
```

### API Versioning

Recommended approach: URL path versioning
```
/api/v1/tasks
/api/v2/tasks
```

Alternative approaches:
- Header versioning: `Accept: application/vnd.api+json;version=1`
- Query parameter: `/api/tasks?version=1`

### Authentication & Authorization

#### JWT Bearer Token (Recommended)
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Auth Endpoints
```
POST /api/auth/register    # Create account
POST /api/auth/login       # Authenticate
POST /api/auth/logout      # End session
POST /api/auth/refresh     # Refresh token
```

### API Documentation Standards

Include in endpoint documentation:
1. **Description**: What the endpoint does
2. **URL**: Full path with parameters
3. **Method**: HTTP method
4. **Authentication**: Required or not
5. **Request Body**: Schema and example
6. **Response**: Status codes, schema, and examples
7. **Errors**: Possible error responses

Example:
```markdown
### Create Task

Creates a new task for the authenticated user.

**URL**: `/api/tasks`
**Method**: `POST`
**Auth Required**: Yes

**Request Body**:
{
  "title": "string (required, 1-200 chars)",
  "description": "string (optional)",
  "priority": "enum: low|medium|high (default: medium)",
  "dueDate": "ISO 8601 date (optional)"
}

**Success Response**: `201 Created`
{
  "id": 1,
  "title": "Complete API design",
  "priority": "high",
  "userId": 5,
  "createdAt": "2026-03-23T10:00:00Z"
}

**Error Responses**:
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Not authenticated
- `422 Unprocessable Entity`: Validation errors
```

## Design Checklist

When designing or reviewing an API, verify:

- [ ] Endpoints use plural resource names
- [ ] HTTP methods match semantic intention
- [ ] Status codes are appropriate
- [ ] Consistent response format (success and error)
- [ ] Authentication properly implemented
- [ ] Authorization checks for ownership/permissions
- [ ] Input validation on all endpoints
- [ ] Pagination for list endpoints
- [ ] Filtering and sorting options where appropriate
- [ ] Error messages are descriptive but not revealing
- [ ] Documentation is complete and accurate
- [ ] Versioning strategy is in place
- [ ] CORS configured correctly for intended clients

## Anti-Patterns to Avoid

❌ **Verbs in URLs**: `/api/getUsers`, `/api/createTask`  
✅ **Use**: `GET /api/users`, `POST /api/tasks`

❌ **Actions as endpoints**: `/api/tasks/complete`  
✅ **Use**: `PATCH /api/tasks/:id` with `{"status": "completed"}`

❌ **Inconsistent naming**: `/api/user`, `/api/Tasks`, `/api/project_items`  
✅ **Use**: `/api/users`, `/api/tasks`, `/api/project-items`

❌ **Wrong status codes**: `200 OK` for errors, `201 Created` for GET  
✅ **Use**: Semantically correct status codes

❌ **Exposing implementation details**: `/api/db/users`, `/api/v1/api_legacy`  
✅ **Use**: Clean, implementation-agnostic URLs

## When to Invoke This Skill

Invoke this skill when you need to:
- Design new API endpoints
- Review existing API structure
- Ensure RESTful compliance
- Choose appropriate HTTP methods and status codes
- Structure request/response formats
- Implement API versioning
- Create API documentation
- Refactor non-REST APIs to REST standards

I will provide expert guidance, best practices, and concrete examples for API design decisions.
