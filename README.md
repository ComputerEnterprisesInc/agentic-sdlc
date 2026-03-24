# Agentic SDLC Sample Repository

A comprehensive guide and sample repository demonstrating how to progressively incorporate the **Agentic Software Development Life Cycle (SDLC)** into your development workflow using GitHub Copilot.

## 🎯 What is Agentic SDLC?

Agentic SDLC is an approach that progressively adds autonomy to GitHub Copilot by providing it with:
- **Context** about your codebase and preferences
- **Instructions** on how to work with your project
- **Skills** for domain-specific knowledge
- **Agents** for specialized workflows
- **Autonomy** to handle complex multi-step tasks

## 🚀 Quick Start

### Prerequisites

- **VS Code** with GitHub Copilot extension
- **Node.js** 18+ installed
- **GitHub Copilot** subscription or trial
- Basic JavaScript/Node.js knowledge

### Installation

1. **Install dependencies**:
   ```powershell
   npm install
   ```

1. **Initialize the database**:
   ```powershell
   node src/utils/initDatabase.js
   ```

1. **Start the application**:
   ```powershell
   npm start
   ```

1. **Verify it's working**:
   - Open `http://localhost:3000/api/health`
   - You should see a health check response

### Start Learning

**Option 1: Complete Workshop (4-6 hours)**
- Follow all 5 labs in sequence
- [Start with Lab 1 →](./labs/lab-01-instructions.md)

**Option 2: Quick Start (1-2 hours)**
- Lab 1: Instructions (foundation)
- Lab 2: Prompts (immediate impact)
- Lab 3: Skills (autonomy boost)

**Option 3: Browse Examples**
- Explore [.github/copilot/](./.github/copilot/) for working examples
- Review [examples/](./examples/) for reference implementations
- Read [docs/](./docs/) for detailed guides

### Demo Application

This repository includes a **Task Management API** built with:
- **Node.js & Express.js**: Backend framework
- **SQLite**: Simple database
- **JWT Authentication**: Secure access
- **RESTful API**: Standard endpoints

**Available Endpoints:**
```
POST   /api/auth/register   - Register new user
POST   /api/auth/login      - User login

GET    /api/tasks           - List user's tasks
POST   /api/tasks           - Create task
GET    /api/tasks/:id       - Get task details
PUT    /api/tasks/:id       - Update task
DELETE /api/tasks/:id       - Delete task

GET    /api/users           - List users (demo)
GET    /api/users/:id       - Get user details
```

**Test the API:**
```powershell
# Register
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"email":"user@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"user@example.com","password":"password123"}'
```

## 🎓 What You'll Learn

### Level 1: Instruction Files (Autonomy: 10%)
**What:** `.instructions.md` files that define coding standards

**You'll Learn:**
- Create global and directory-specific instructions
- Define architecture patterns and conventions
- Establish error handling and naming standards

**Result:** Copilot consistently follows your team's conventions without reminders

**Example:**
```markdown
<!-- .github/copilot/instructions.md -->
Always use try-catch in async functions
Follow REST conventions for API endpoints
Use bcrypt for password hashing (10+ rounds)
```

---

### Level 2: Prompt Files (Autonomy: 25%)
**What:** `.prompt.md` templates for reusable workflows

**You'll Learn:**
- Create parameterized task templates
- Build workflow automation prompts
- Structure prompts for maximum effectiveness

**Result:** Execute complex, multi-step tasks from a single command

**Example:**
```markdown
<!-- .github/copilot/prompts/add-endpoint.prompt.md -->
Create a new API endpoint for {RESOURCE}
Include: CRUD operations, validation, auth, error handling
```

---

### Level 3: Copilot Skills (Autonomy: 50%)
**What:** `SKILL.md` files with domain-specific knowledge

**You'll Learn:**
- Package specialized expertise
- Define trigger phrases for auto-invocation
- Structure comprehensive domain knowledge

**Result:** Copilot automatically applies expert knowledge when relevant

**Example:**
```markdown
<!-- .github/copilot/skills/api-design/SKILL.md -->
---
name: api-design
triggers:
  - "design api"
  - "rest api"
---
Expert in REST principles, status codes, versioning...
```

---

### Level 4: Custom Agents (Autonomy: 75%)
**What:** `.agent.md` files defining specialized AI personas

**You'll Learn:**
- Create role-based agents
- Define agent workflows and expertise
- Orchestrate multi-agent collaboration

**Result:** Specialized agents handle complex workflows autonomously

**Example:**
```markdown
<!-- .github/copilot/agents/backend-developer.agent.md -->
---
name: Backend Developer
description: API development specialist
model: claude-sonnet-4.5
---
I implement APIs, design schemas, handle auth...
```

---

### Level 5: Autonomous Development (Autonomy: 90%)
**What:** Complete feature implementation with AI orchestration

**You'll Learn:**
- Orchestrate multi-agent workflows
- Implement approval gates
- Enable end-to-end automation

**Result:** AI plans and implements complete features with your approval at checkpoints
- Customizing tool access and behaviors
- Setting up project-specific workflows
- **Autonomy Gain**: Copilot works fully autonomously within your defined guardrails

## 🛠️ Demo Application

The repository includes a **Task Management API** built with Node.js/Express that demonstrates:
- RESTful API design
- Database integration (SQLite)
- Authentication/Authorization
- Testing strategies
- Error handling

You'll use this application throughout the labs to see how each level of customization improves your development workflow.

## 📖 Key Concepts

### Instruction Files (`.instructions.md`)
Global or file-specific rules that Copilot follows automatically. Think of these as your team's style guide and architectural documentation.

### Prompt Files (`.prompt.md`)
Reusable templates for common tasks. Instead of typing the same complex prompt repeatedly, create a prompt file and invoke it with a simple command.

### Skills (`SKILL.md`)
Domain-specific knowledge packages that Copilot can invoke when it detects relevant trigger phrases. Skills are perfect for specialized workflows like database migrations, API design, or security reviews.

### Agents (`AGENTS.md`, `.agent.md`)
Specialized personas that handle complex, multi-step processes. Agents can plan, execute, and validate work autonomously within their defined scope.

### Coding Agent
The most autonomous level, where Copilot can manage entire development workflows, from planning to implementation to testing.

## 📝 License

MIT License - Feel free to use this in your projects!

## 🙏 Acknowledgments

Built to help developers unlock the full potential of GitHub Copilot through progressive autonomy.

---

**Ready to start?** Head to [Lab 1: Instruction Files](./labs/lab-01-instruction-files.md)!
