# GitHub Copilot Customization Reference

Complete reference guide for all GitHub Copilot customization file types.

## Table of Contents
1. [Instruction Files](#instruction-files)
2. [Prompt Files](#prompt-files)
3. [Skill Files](#skill-files)
4. [Agent Files](#agent-files)
5. [File Locations](#file-locations)
6. [YAML Frontmatter](#yaml-frontmatter)
7. [Quick Reference](#quick-reference)

---

## Instruction Files

### File Extension
`.instructions.md` or `copilot-instructions.md`

### Purpose
Define coding standards, architectural patterns, and conventions that Copilot should follow.

### Complete Syntax

```markdown
---
applyTo:
  - "src/**/*.js"          # Include patterns (glob)
  - "!src/legacy/**"       # Exclude patterns (!) 
  - "*.test.js"            # File pattern matching
alwaysInclude: false       # Optional: false (default) or true
priority: 100              # Optional: Higher = more important
---

# Instruction Title

## Overview
Brief description of what these instructions cover.

## Architecture Patterns
Describe architectural decisions and patterns to follow.

## Code Conventions
Specific coding standards and style guidelines.

## Security Requirements
Security-specific rules and requirements.

## Examples
Provide concrete examples of correct implementation.
```

### Frontmatter Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `applyTo` | array | Yes | Glob patterns for file matching |
| `alwaysInclude` | boolean | No | Include regardless of file context |
| `priority` | number | No | Precedence when multiple files apply |

### Glob Pattern Examples

```yaml
# Match all JavaScript files in src
applyTo: ["src/**/*.js"]

# Match API routes only
applyTo: ["src/api/**/*.js"]

# Match all files except tests
applyTo: ["**/*", "!**/*.test.js"]

# Multiple specific directories
applyTo:
  - "src/api/**/*.js"
  - "src/models/**/*.js"
```

### Best Practices

✅ **Do:**
- Be specific and actionable
- Include concrete examples
- Focus on "what" and "why"
- Keep scope targeted
- Update regularly

❌ **Don't:**
- Be vague or ambiguous
- Include outdated patterns
- Over-scope (match too many files)
- Duplicate information
- Write overly long instructions

### Example Structure

```markdown
---
applyTo: ["src/api/**/*.js"]
---

# API Route Development Instructions

## Overview
Instructions for creating and maintaining Express.js API routes.

## Route Structure
All routes must follow this pattern:

\`\`\`javascript
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
  try {
    // Implementation
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
\`\`\`

## Authentication
- All routes must use `authenticate` middleware
- Public routes must explicitly document why

## Error Handling
- Use try/catch for async operations
- Return consistent error format
- Log errors with appropriate level

## Response Format
Always return JSON with this structure:
\`\`\`json
{
  "success": true|false,
  "data": {},       // on success
  "error": {}       // on failure
}
\`\`\`
```

---

## Prompt Files

### File Extension
`.prompt.md`

### Purpose
Reusable templates for common development tasks that can be invoked manually.

### Complete Syntax

```markdown
---
name: prompt-name
description: Brief description shown in UI
tags:
  - api
  - crud
  - backend
---

# Prompt Title

## Objective
Clear description of what this prompt does.

## Required Inputs
- **Parameter1**: Description
- **Parameter2**: Description

## Instructions
Step-by-step instructions for Copilot to follow:

1. First step with specific details
2. Second step
3. Third step

## Validation Checklist
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Example Output
Show what the final result should look like.
```

### Frontmatter Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | No | Identifier for the prompt |
| `description` | string | No | Shown in VS Code UI |
| `tags` | array | No | For categorization/search |

### Invocation Methods

1. **Manual Reference:**
   ```
   @workspace #file:add-endpoint.prompt.md create endpoint for products
   ```

2. **Copilot Panel:**
   - Open Copilot panel
   - Select "Prompts"
   - Choose prompt from list

### Best Practices

✅ **Do:**
- Make instructions sequential
- Include validation steps
- Provide examples
- Parameterize appropriately
- Test prompts thoroughly

❌ **Don't:**
- Make prompts too generic
- Skip validation steps
- Assume context
- Create one-size-fits-all prompts

### Example Structure

```markdown
---
name: add-crud-endpoint
description: Add complete CRUD endpoints for a model
tags: [api, crud, rest]
---

# Add CRUD Endpoints

## Objective
Create a complete set of CRUD operations for a specified model.

## Required Inputs
- **ModelName**: Name of the model (e.g., "Product")
- **RoutePrefix**: API route prefix (e.g., "/products")

## Instructions

1. **Create Route File**
   - Create `src/api/{modelName}.js`
   - Import required dependencies
   - Create Express router

2. **Implement GET /list**
   - Return paginated list
   - Support filtering
   - Include error handling

3. **Implement GET /:id**
   - Validate ID format
   - Return 404 if not found
   - Include related data

4. **Implement POST /**
   - Validate input with Joi
   - Check authentication
   - Return created resource

5. **Implement PUT /:id**
   - Validate ID and body
   - Check authorization
   - Return updated resource

6. **Implement DELETE /:id**
   - Validate ID
   - Check authorization
   - Return success confirmation

## Validation Checklist
- [ ] All routes use authentication middleware
- [ ] Input validation on POST/PUT
- [ ] Consistent error handling
- [ ] Proper HTTP status codes
- [ ] JSDoc comments on all functions

## Example Output
\`\`\`javascript
// src/api/products.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Product = require('../models/Product');

// GET /products - List all products
router.get('/', authenticate, async (req, res) => {
  // Implementation
});

// ... other endpoints
\`\`\`
```

---

## Skill Files

### File Extension
`SKILL.md`

### Purpose
Package domain-specific knowledge that Copilot invokes automatically based on trigger phrases.

### Complete Syntax

```markdown
---
name: skill-name
description: What this skill provides (shown in skill list)
triggerPhrases:
  - "phrase one"
  - "phrase two"
  - "keyword"
allowedTools:
  - create_file
  - replace_string_in_file
  - read_file
  - run_in_terminal
prohibitedTools:
  - delete_file
requiresConfirmation: false
---

# Skill Title

## When to Use This Skill
Describe scenarios where this skill should be applied.

## Core Principles
Key concepts and principles for this domain.

## Implementation Patterns
Specific patterns and approaches to use.

## Decision Trees
Help Copilot make domain-specific decisions.

## Common Pitfalls
What to avoid and why.

## Examples
Concrete examples of applying this skill.
```

### Frontmatter Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Unique skill identifier |
| `description` | string | Yes | Skill purpose and capabilities |
| `triggerPhrases` | array | Yes | Phrases that activate the skill |
| `allowedTools` | array | No | Tools the skill can use |
| `prohibitedTools` | array | No | Tools the skill cannot use |
| `requiresConfirmation` | boolean | No | Require approval before execution |

### Trigger Phrase Guidelines

```yaml
# Good - Natural language variations
triggerPhrases:
  - "design api"
  - "create rest api"
  - "build endpoint"
  - "api best practices"

# Too Specific - Won't match often
triggerPhrases:
  - "design a RESTful API following best practices"

# Too Broad - Matches too often  
triggerPhrases:
  - "api"
  - "design"
```

### Tool Permissions

Common tools you can allow/prohibit:

- `create_file` - Create new files
- `replace_string_in_file` - Edit existing files
- `read_file` - Read file contents
- `run_in_terminal` - Execute commands
- `delete_file` - Delete files
- `grep_search` - Search codebase
- `semantic_search` - Semantic code search

### Best Practices

✅ **Do:**
- Focus on one domain
- Use natural trigger phrases
- Provide decision-making guidance
- Include anti-patterns
- Show concrete examples

❌ **Don't:**
- Create overlapping skills
- Use overly broad triggers
- Skip tool restrictions
- Make skills too large
- Duplicate instruction content

### Example Structure

```markdown
---
name: api-design
description: REST API design best practices and patterns
triggerPhrases:
  - "design api"
  - "create endpoint"
  - "rest api"
  - "api structure"
allowedTools:
  - create_file
  - replace_string_in_file
  - read_file
requiresConfirmation: false
---

# API Design Skill

## When to Use This Skill
Invoke this skill when:
- Designing new REST API endpoints
- Restructuring existing APIs
- Making API architecture decisions
- Reviewing API implementations

## Core Principles

### 1. Resource-Oriented Design
- URLs represent resources, not actions
- Use nouns, not verbs
- Support standard CRUD operations

### 2. HTTP Methods
- GET: Retrieve resource(s)
- POST: Create new resource
- PUT: Replace entire resource
- PATCH: Update partial resource
- DELETE: Remove resource

### 3. Status Codes
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## Implementation Patterns

### Pattern 1: Collection + Resource
\`\`\`
GET    /products          # List all
GET    /products/:id      # Get one
POST   /products          # Create
PUT    /products/:id      # Replace
PATCH  /products/:id      # Update
DELETE /products/:id      # Delete
\`\`\`

### Pattern 2: Nested Resources
\`\`\`
GET /users/:userId/orders
GET /users/:userId/orders/:orderId
\`\`\`

### Pattern 3: Filtering & Pagination
\`\`\`
GET /products?category=electronics&page=2&limit=20
\`\`\`

## Decision Trees

### Choosing HTTP Method
1. Creating new resource? → POST
2. Full replacement? → PUT
3. Partial update? → PATCH
4. Removing resource? → DELETE
5. Reading data? → GET

### URL Structure
1. Operating on collection? → /resources
2. Operating on specific item? → /resources/:id
3. Nested relationship? → /parent/:id/children

## Common Pitfalls

❌ **Using verbs in URLs**
\`\`\`
Bad:  POST /createProduct
Good: POST /products
\`\`\`

❌ **Inconsistent naming**
\`\`\`
Bad:  /user, /product, /orderItem
Good: /users, /products, /order-items
\`\`\`

❌ **Wrong HTTP methods**
\`\`\`
Bad:  GET /deleteProduct/:id
Good: DELETE /products/:id
\`\`\`

## Examples

### Complete Endpoint Implementation
\`\`\`javascript
// GET /products/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    });
  }
});
\`\`\`
```

---

## Agent Files

### File Extension
`.agent.md`

### Purpose
Define specialized AI personas with specific expertise and behaviors for complex workflows.

### Complete Syntax

```markdown
---
name: AgentName
description: Brief description of agent's role
expertise:
  - Domain area 1
  - Domain area 2
capabilities:
  - What it can do 1
  - What it can do 2
handoffProtocol:
  - AgentName: When to hand off to another agent
allowedTools:
  - tool1
  - tool2
requiresApproval: false
---

# Agent Name

## Role Definition
Describe the agent's primary role and responsibilities.

## Expertise Areas
Detail what this agent knows and can do.

## Decision-Making Criteria
How the agent makes decisions in its domain.

## Handoff Protocols
When and how to delegate to other agents.

## Quality Standards
What constitutes success for this agent.

## Example Workflows
Show typical scenarios this agent handles.
```

### Frontmatter Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Unique agent identifier |
| `description` | string | Yes | Agent's role summary |
| `expertise` | array | No | Areas of specialization |
| `capabilities` | array | No | What agent can accomplish |
| `handoffProtocol` | object | No | When to delegate to other agents |
| `allowedTools` | array | No | Permitted tools |
| `requiresApproval` | boolean | No | Need human approval |

### Invocation Methods

1. **Direct Call:**
   ```
   @ArchitectAgent design a user authentication system
   ```

2. **Programmatic:**
   ```markdown
   When designing system architecture, invoke @ArchitectAgent
   ```

### Best Practices

✅ **Do:**
- Define clear responsibilities
- Establish handoff criteria
- Include decision frameworks
- Specify quality standards
- Show collaboration patterns

❌ **Don't:**
- Make agents too broad
- Overlap responsibilities
- Skip handoff protocols
- Create isolated agents
- Ignore quality metrics

### Example Structure

```markdown
---
name: ArchitectAgent
description: Software architecture and system design specialist
expertise:
  - System architecture
  - Design patterns
  - Performance optimization
  - Scalability planning
capabilities:
  - Design system architectures
  - Choose appropriate patterns
  - Identify bottlenecks
  - Plan for scale
handoffProtocol:
  DeveloperAgent: After architecture is approved
  SecurityAgent: For security review of design
allowedTools:
  - create_file
  - read_file
  - grep_search
requiresApproval: true
---

# Architect Agent

## Role Definition
I am a software architect responsible for designing system architecture, selecting appropriate patterns, and ensuring scalability and maintainability.

## Expertise Areas

### 1. System Architecture
- Microservices vs Monolith decisions
- Service boundaries and communication
- Data architecture and flow
- Integration patterns

### 2. Design Patterns
- Creational patterns (Factory, Builder, Singleton)
- Structural patterns (Adapter, Facade, Proxy)
- Behavioral patterns (Observer, Strategy, Command)
- Architectural patterns (MVC, MVVM, Layered)

### 3. Performance & Scalability
- Caching strategies
- Load balancing
- Database optimization
- Async processing

## Decision-Making Criteria

### Choosing Architecture Style
1. **Project Size & Complexity**
   - Small: Monolith
   - Medium: Modular monolith
   - Large: Microservices

2. **Team Size**
   - Small team: Simpler architecture
   - Large team: Distributed architecture

3. **Performance Requirements**
   - Real-time: Event-driven
   - Batch: Job-based
   - Mixed: Hybrid

### Selecting Design Patterns
1. Identify the problem type
2. Consider maintenance impact
3. Evaluate team familiarity
4. Balance complexity vs benefit

## Handoff Protocols

### To Developer Agent
**When:**
- Architecture design is complete
- Patterns are selected
- Technical specs are documented

**What to Provide:**
- Architecture diagrams
- Component responsibilities
- Integration points
- Technology choices

### To Security Agent
**When:**
- Sensitive data is involved
- External integrations exist
- Authentication/authorization needed

**What to Provide:**
- Data flow diagrams
- Trust boundaries
- Authentication approach

## Quality Standards

### Architecture Documentation
- [ ] High-level system diagram
- [ ] Component interaction diagram
- [ ] Data flow documentation
- [ ] Technology stack justified
- [ ] Scalability plan outlined

### Design Decisions
- [ ] Rationale documented
- [ ] Alternatives considered
- [ ] Trade-offs analyzed
- [ ] Future implications noted

## Example Workflows

### Workflow 1: New Feature Architecture
1. Analyze requirements
2. Identify affected components
3. Design integration approach
4. Document changes
5. Hand off to Developer Agent

### Workflow 2: Performance Optimization
1. Identify bottlenecks
2. Design optimization strategy
3. Evaluate caching opportunities
4. Plan implementation phases
5. Hand off to Developer Agent
```

---

## File Locations

### Workspace Root
```
/
├── .instructions.md          # Project-wide instructions
├── copilot-instructions.md   # Alternative name
├── add-feature.prompt.md     # Prompt files
└── AGENTS.md                 # Agent registry
```

### .github/copilot Directory
```
.github/copilot/
├── instructions/
│   ├── api.instructions.md
│   └── security.instructions.md
├── prompts/
│   ├── add-endpoint.prompt.md
│   └── refactor.prompt.md
└── skills/
    ├── api-design/
    │   └── SKILL.md
    └── database/
        └── SKILL.md
```

### Scope-Specific Locations
```
src/
└── api/
    └── .instructions.md      # Applies only to src/api/**
```

---

## YAML Frontmatter

### Syntax Rules

```yaml
---
# Use lowercase for property names
propertyName: value

# Arrays can use either syntax
array1: ["item1", "item2"]
array2:
  - item1
  - item2

# Strings with special characters need quotes
withQuotes: "value: with!special*chars"

# Booleans
boolValue: true
anotherBool: false

# Numbers
numberValue: 100
```

### Common Errors

❌ **Missing dashes:**
```yaml
 propertyName: value    # Missing leading ---
```

✅ **Correct:**
```yaml
---
propertyName: value
---
```

❌ **Inconsistent indentation:**
```yaml
---
applyTo:
- "pattern1"
  - "pattern2"    # Wrong indentation
---
```

✅ **Correct:**
```yaml
---
applyTo:
  - "pattern1"
  - "pattern2"
---
```

### Validation

Test your YAML at: https://www.yamllint.com/

---

## Quick Reference

### Instruction File Template
```markdown
---
applyTo: ["src/**/*.js"]
---

# Instructions Title

## Overview
Brief description.

## Patterns
Specific guidance and examples.
```

### Prompt File Template
```markdown
---
name: task-name
description: What it does
---

# Prompt Title

## Objective
What this accomplishes.

## Instructions
1. Step one
2. Step two
```

### Skill File Template
```markdown
---
name: skill-name
description: Skill purpose
triggerPhrases:
  - "trigger one"
---

# Skill Title

## When to Use
Activation scenarios.

## Implementation
How to apply this knowledge.
```

### Agent File Template
```markdown
---
name: AgentName
description: Agent role
expertise:
  - Area 1
---

# Agent Name

## Role
Agent's responsibilities.

## Workflows
How agent operates.
```

---

## Additional Resources

- [Agentic SDLC Guide](AGENTIC_SDLC_GUIDE.md)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Example Files](../examples/)
- [Lab Exercises](../labs/)

---

Last Updated: March 2026
