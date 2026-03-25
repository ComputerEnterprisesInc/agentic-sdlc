---
agent: 'agent'
description: Add a new feature to the application with full implementation
---

# Add New Feature

I need to add a new feature to the Task Management API.

## Feature Description

**Feature Name**: {FEATURE_NAME}

**Purpose**: {DESCRIBE_WHY_THIS_FEATURE_IS_NEEDED}

**User Story**: As a {USER_TYPE}, I want to {ACTION}, so that {BENEFIT}.

## Functional Requirements

### Core Functionality
1. {REQUIREMENT_1}
2. {REQUIREMENT_2}
3. {REQUIREMENT_3}

### User Interactions
- {HOW_USERS_WILL_INTERACT_WITH_THIS_FEATURE}
- {WHAT_APIs_OR_ENDPOINTS_ARE_NEEDED}

### Business Rules
- {RULE_1}
- {RULE_2}

## Technical Implementation

### Database Changes
**New Tables/Columns**:
```sql
{SQL_SCHEMA_IF_NEEDED}
```

**Migrations Needed**:
- {DESCRIBE_DATA_MIGRATIONS}

### API Endpoints
Create the following endpoints:

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| {GET/POST/etc} | {/api/path} | {Yes/No} | {Description} |

### Service Logic
Implement service layer methods for:
- {SERVICE_METHOD_1}
- {SERVICE_METHOD_2}

### Models
Create/update models:
- {MODEL_NAME}: {DESCRIPTION}

## Non-Functional Requirements

### Security
- [ ] Authentication required: {Yes/No}
- [ ] Authorization rules: {DESCRIBE_WHO_CAN_ACCESS}
- [ ] Input validation for: {LIST_FIELDS_TO_VALIDATE}
- [ ] Data encryption needed: {Yes/No - SPECIFY_FIELDS}

### Performance
- [ ] Expected load: {NUMBER_OF_REQUESTS}
- [ ] Response time requirement: {MILLISECONDS}
- [ ] Caching strategy: {DESCRIBE_IF_NEEDED}

### Error Handling
- [ ] Handle {ERROR_SCENARIO_1}
- [ ] Handle {ERROR_SCENARIO_2}
- [ ] Provide clear error messages

### Logging
- [ ] Log {WHAT_TO_LOG}
- [ ] Include correlation IDs for tracking

## Integration Points

**Dependencies**:
- {EXTERNAL_SERVICE_OR_MODULE_1}
- {EXTERNAL_SERVICE_OR_MODULE_2}

**Impact on Existing Features**:
- {DESCRIBE_ANY_IMPACTS}

## Acceptance Criteria

The feature is complete when:
- [ ] {CRITERION_1}
- [ ] {CRITERION_2}
- [ ] All API endpoints return correct data
- [ ] Proper error handling is implemented
- [ ] Code follows project standards
- [ ] Documentation is updated

## Implementation Steps

Please implement this feature by:

1. **Database Layer**
   - Create/update database schema
   - Write migration if needed
   - Update models

2. **Service Layer**
   - Implement business logic
   - Add validation rules
   - Handle error cases

3. **API Layer**
   - Create route handlers
   - Add authentication/authorization
   - Implement request validation
   - Return consistent responses

4. **Documentation**
   - Add API documentation
   - Update README if needed
   - Include usage examples

5. **Testing Considerations**
   - List test cases to cover
   - Identify edge cases

---

## Example Usage #1: Simple Feature

```
I need to add a new feature to the Task Management API.

Feature Name: Task Comments

Purpose: Allow users to add comments to tasks for collaboration

User Story: As a team member, I want to add comments to tasks, so that I can communicate with other team members about task details.

Core Functionality:
1. Users can add comments to any task they can view
2. Comments include text, author, and timestamp
3. Users can view all comments on a task

API Endpoints:
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/tasks/:id/comments | Yes | Get all comments for a task |
| POST | /api/tasks/:id/comments | Yes | Add a comment to a task |
| DELETE | /api/comments/:id | Yes | Delete a comment (author only) |

Database Changes:
New table: comments
- id (INTEGER PRIMARY KEY)
- task_id (INTEGER, FOREIGN KEY)
- user_id (INTEGER, FOREIGN KEY)
- comment_text (TEXT)
- created_at (DATETIME)

Security:
- Authentication required: Yes
- Users can only delete their own comments
- Validate comment text (max 1000 characters)

Acceptance Criteria:
- Users can post comments to tasks
- Comments are stored with author and timestamp
- Users can view all comments on a task
- Users can delete only their own comments
```

## Example Usage #2: Complex Feature

```
I need to add a new feature to the Task Management API.

Feature Name: Task Categories and Tags

Purpose: Help users organize and filter tasks more effectively

User Story: As a user, I want to categorize tasks and add tags, so that I can better organize and find my tasks.

Core Functionality:
1. Pre-defined categories: Work, Personal, Shopping, Health
2. Custom tags can be created and applied to tasks
3. Filter tasks by category and/or tags
4. One category per task, multiple tags per task

Business Rules:
- Categories are system-defined (cannot create new ones)
- Tags are user-specific (each user has their own tag namespace)
- Tag names must be unique per user
- Maximum 10 tags per task

Database Changes:
New tables:
- categories (id, name, color_code, icon)
- tags (id, user_id, name, created_at)
- task_tags (task_id, tag_id) - junction table

Add to tasks table:
- category_id (INTEGER, FOREIGN KEY, nullable)

API Endpoints:
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/categories | No | List all categories |
| GET | /api/tags | Yes | Get user's tags |
| POST | /api/tags | Yes | Create a new tag |
| PUT | /api/tasks/:id/category | Yes | Set task category |
| POST | /api/tasks/:id/tags | Yes | Add tags to task |
| DELETE | /api/tasks/:id/tags/:tagId | Yes | Remove tag from task |
| GET | /api/tasks?category=X&tags=Y,Z | Yes | Filter tasks |

Security:
- Users can only create and manage their own tags
- Users can only add tags to their own tasks
- Validate tag names (alphanumeric, 1-30 characters)

Performance:
- Index on task_tags (task_id, tag_id)
- Index on tags (user_id, name)
- Cache categories list

Acceptance Criteria:
- Users can assign a category to tasks
- Users can create and manage custom tags
- Users can add multiple tags to tasks
- Task list can be filtered by category and tags
- API responses include category and tag information
```
