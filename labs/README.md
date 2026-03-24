# Agentic SDLC Complete Lab Guide

Welcome to the Agentic SDLC workshop! This comprehensive guide will teach you how to progressively add autonomy to GitHub Copilot, transforming it from a code completion tool into an intelligent development partner.

## 🎯 What You'll Learn

This workshop teaches the **Agentic Software Development Life Cycle** - a methodology for building AI-assisted development workflows with increasing levels of autonomy.

### The Five Levels of Autonomy

| Lab | Focus | Autonomy | What Copilot Does | What You Do |
|-----|-------|----------|-------------------|-------------|
| 1 | **Instructions** | 10% | Follows coding standards | Direct all work, Copilot assists |
| 2 | **Prompts** | 25% | Executes task templates | Specify tasks, Copilot implements |
| 3 | **Skills** | 50% | Auto-applies expertise | State intent, Copilot provides expertise |
| 4 | **Agents** | 75% | Handles workflows | Define goals, agents orchestrate |
| 5 | **Autonomous** | 90% | Plans & implements features | Approve gates, AI handles rest |

---

## 📚 Lab Overview

### [Lab 1: Instruction Files](./lab-01-instructions.md)
**Duration:** 30-45 minutes | **Level:** Beginner

Learn to establish coding standards that Copilot follows automatically.

**You'll create:**
- Global project instructions
- Directory-specific instructions
- Test Copilot's adherence to standards

**Key Concept:** Instructions are like a style guide that Copilot always references.

---

### [Lab 2: Prompt Files](./lab-02-prompts.md)
**Duration:** 45-60 minutes | **Level:** Beginner to Intermediate

Create reusable task templates for common development workflows.

**You'll create:**
- Feature addition prompts
- Debug workflow prompts
- Testing prompts

**Key Concept:** Prompts are like filling out a form - you provide parameters, Copilot executes.

---

### [Lab 3: Copilot Skills](./lab-03-skills.md)
**Duration:** 60 minutes | **Level:** Intermediate

Package domain expertise that Copilot automatically invokes when needed.

**You'll create:**
- API design skill
- Error handling skill
- Authentication skill

**Key Concept:** Skills are like expert consultants Copilot can call upon automatically.

---

### [Lab 4: Custom Agents](./lab-04-agents.md)
**Duration:** 60 minutes | **Level:** Intermediate to Advanced

Build specialized AI personas that handle complex, multi-step workflows.

**You'll create:**
- Backend Developer agent
- Code Reviewer agent
- Database Administrator agent

**Key Concept:** Agents are like team members with specific roles and expertise.

---

### [Lab 5: Autonomous Development](./lab-05-autonomous.md)
**Duration:** 90 minutes | **Level:** Advanced

Enable fully autonomous feature development with human oversight gates.

**You'll create:**
- Complete autonomous workflow
- Approval gate system
- Quality validation automation

**Key Concept:** AI plans and implements, you approve at critical checkpoints.

---

## 🚀 Getting Started

### Prerequisites

**Required:**
- VS Code with GitHub Copilot installed
- GitHub Copilot subscription (or trial)
- Basic JavaScript/Node.js knowledge
- Git fundamentals

**Recommended:**
- Understanding of REST APIs
- Experience with Express.js
- Familiarity with databases

### Setup Instructions

1. **Clone this repository:**
   ```powershell
   git clone <repo-url>
   cd agentic-sdlc
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Initialize the database:**
   ```powershell
   node src/utils/initDatabase.js
   ```

4. **Start the application:**
   ```powershell
   npm start
   ```

5. **Verify setup:**
   - Application runs at `http://localhost:3000`
   - Test endpoint: `http://localhost:3000/api/health`

### Repository Structure

```
agentic-sdlc/
├── .github/
│   └── copilot/
│       ├── instructions.md          # Global coding standards
│       ├── prompts/                 # Task templates
│       ├── skills/                  # Domain expertise
│       └── agents/                  # AI personas
├── src/
│   ├── api/                         # API endpoints
│   ├── models/                      # Database models
│   ├── services/                    # Business logic
│   ├── middleware/                  # Express middleware
│   └── utils/                       # Utilities
├── labs/
│   ├── README.md                    # Complete lab overview
│   ├── lab-01-instructions.md       # Lab 1: Instruction Files
│   ├── lab-02-prompts.md            # Lab 2: Prompt Files
│   ├── lab-03-skills.md             # Lab 3: Copilot Skills
│   ├── lab-04-agents.md             # Lab 4: Custom Agents
│   └── lab-05-autonomous.md         # Lab 5: Autonomous Development
├── examples/                        # Reference examples
└── docs/                            # Additional documentation
```

---

## 📖 Learning Path

### Option 1: Complete Workshop (Recommended)
**Time:** 4-6 hours

Complete all 5 labs in order for the full Agentic SDLC experience.

1. Start with Lab 1
2. Complete each lab sequentially
3. Do the exercises in each lab
4. Review key takeaways

### Option 2: Quick Start
**Time:** 1-2 hours

If you're short on time, focus on the most impactful labs:

1. **Lab 1** - Instructions (essential foundation)
2. **Lab 2** - Prompts (biggest immediate impact)
3. **Lab 3** - Skills (significant autonomy boost)

Return to Labs 4 and 5 when ready for advanced concepts.

### Option 3: Pick Your Level
**Time:** 1-2 hours per lab

Jump to the lab that matters most to you:

- **New to Copilot customization?** → Lab 1
- **Want reusable workflows?** → Lab 2
- **Need domain expertise?** → Lab 3
- **Building complex systems?** → Lab 4
- **Want full automation?** → Lab 5

---

## 💡 Key Concepts

### The Agentic SDLC Model

```
Traditional Dev:        You write every line of code
↓
Copilot (Basic):       Copilot suggests completions
↓
Copilot + Instructions: Copilot follows your standards  ← Lab 1
↓
Copilot + Prompts:     Copilot executes workflows      ← Lab 2
↓
Copilot + Skills:      Copilot applies expertise       ← Lab 3
↓
Copilot + Agents:      Copilot manages workflows       ← Lab 4
↓
Autonomous Dev:        AI plans & implements features   ← Lab 5
```

### When to Use Each Component

**Instructions** 📝
- Coding standards
- Architecture patterns
- Naming conventions
- *Always active, background guidance*

**Prompts** 📋
- Repetitive tasks
- Standardized workflows
- Template-based work
- *Explicitly invoked when needed*

**Skills** 🎓
- Domain expertise
- Complex patterns
- Best practices
- *Auto-triggered by keywords*

**Agents** 🤖
- Multi-step workflows
- Role-based assistance
- Complex decision-making
- *Invoked for specialized work*

**Autonomous** 🚀
- Complete features
- End-to-end implementation
- Multi-agent orchestration
- *Invoked for major work with oversight*

---

## ✅ Success Criteria

You'll know you're successful when:

### After Lab 1
- [ ] Copilot follows your coding standards automatically
- [ ] Generated code matches your project patterns
- [ ] You've reduced repetitive instruction giving

### After Lab 2
- [ ] You can invoke workflow templates on demand
- [ ] Common tasks are automated with prompts
- [ ] You've built a personal prompt library

### After Lab 3
- [ ] Copilot provides expert guidance automatically
- [ ] Skills trigger based on your questions
- [ ] Domain knowledge is packaged and reusable

### After Lab 4
- [ ] Agents handle complex multi-step workflows
- [ ] Different agents provide specialized expertise
- [ ] You orchestrate agents for different tasks

### After Lab 5
- [ ] You can request complete features
- [ ] AI plans and implements autonomously
- [ ] You approve at key checkpoints only

---

## 🎓 Learning Objectives

By completing these labs, you will:

1. **Understand the Agentic SDLC Philosophy**
   - Progressive autonomy levels
   - When to use each component
   - How components work together

2. **Master Copilot Customization**
   - Create effective instruction files
   - Build reusable prompt templates
   - Package domain expertise as skills
   - Design specialized agents
   - Orchestrate autonomous workflows

3. **Improve Development Efficiency**
   - Reduce repetitive work
   - Standardize workflows
   - Leverage AI expertise
   - Accelerate feature development

4. **Build Better Systems**
   - Consistent code quality
   - Pattern adherence
   - Best practice application
   - Automated quality checks

---

## 🔧 Demo Application

The repository includes a **Task Management API** that serves as the foundation for all labs.

### Features

- User authentication (JWT)
- Task CRUD operations
- User management
- RESTful API design
- SQLite database
- Express.js backend

### API Endpoints

```
Auth:
POST   /api/auth/register  - Register new user
POST   /api/auth/login     - Login user

Users:
GET    /api/users          - Get all users
GET    /api/users/:id      - Get user by ID

Tasks:
GET    /api/tasks          - Get all tasks for user
GET    /api/tasks/:id      - Get task by ID
POST   /api/tasks          - Create new task
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
```

### Testing the API

```powershell
# Register a user
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"password123"}'

# Create a task (use token from login)
curl -X POST http://localhost:3000/api/tasks `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_TOKEN_HERE" `
  -d '{"title":"My Task","description":"Task description"}'
```

---

## 📊 Progress Tracking

Use this checklist to track your progress:

### Setup
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Application running
- [ ] GitHub Copilot installed and active

### Lab Completion
- [ ] Lab 1: Instruction Files ✅
- [ ] Lab 2: Prompt Files ✅
- [ ] Lab 3: Copilot Skills ✅
- [ ] Lab 4: Custom Agents ✅
- [ ] Lab 5: Autonomous Development ✅

### Practical Application
- [ ] Created custom instructions for my project
- [ ] Built personal prompt library
- [ ] Packaged domain skills
- [ ] Designed specialized agents
- [ ] Implemented autonomous workflow

---

## 🆘 Troubleshooting

### Common Issues

**Problem:** Copilot not following instructions
- **Solution:** Ensure `.instructions.md` file exists in correct location
- **Solution:** Reload VS Code window (Ctrl+Shift+P → "Reload Window")
- **Solution:** Check file is named correctly (with dot prefix)

**Problem:** Prompts not found
- **Solution:** Place prompts in `.github/copilot/prompts/` directory
- **Solution:** Ensure filename ends with `.prompt.md`
- **Solution:** Reload VS Code

**Problem:** Skills not triggering
- **Solution:** Use trigger phrases defined in skill YAML frontmatter
- **Solution:** Ensure `SKILL.md` is in skill subdirectory
- **Solution:** Check YAML syntax is correct

**Problem:** Application won't start
- **Solution:** Run `npm install` to ensure dependencies are installed
- **Solution:** Initialize database: `node src/utils/initDatabase.js`
- **Solution:** Check port 3000 is available

---

## 📚 Additional Resources

### Documentation
- [Agentic SDLC Guide](../docs/AGENTIC_SDLC_GUIDE.md)
- [Customization Reference](../docs/CUSTOMIZATION_REFERENCE.md)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

### Examples
- [Example Instructions](../examples/instructions/)
- [Example Prompts](../.github/copilot/prompts/)
- [Example Skills](../.github/copilot/skills/)
- [Example Agents](../.github/copilot/agents/)

### Community
- Share your customizations
- Learn from others
- Contribute improvements

---

## 🎉 Next Steps After Completion

Once you've completed all labs:

1. **Apply to Your Projects**
   - Adapt instructions to your codebase
   - Create project-specific prompts
   - Build domain skills
   - Design workflow agents

2. **Share with Your Team**
   - Standardize team workflows
   - Create team skill libraries
   - Build organization agents
   - Establish best practices

3. **Expand Your Knowledge**
   - Explore advanced agent patterns
   - Integration with CI/CD
   - Custom MCP servers
   - Multi-repository support

4. **Contribute Back**
   - Share prompt templates
   - Contribute skills
   - Improve documentation
   - Help others learn

---

## 📝 Feedback

We'd love to hear about your experience! Please share:

- What worked well?
- What was confusing?
- What would you like to see added?
- How are you using Agentic SDLC in your work?

---

## 📄 License

This project is provided as an educational resource. Feel free to adapt and use in your own projects.

---

**Ready to begin? Start with [Lab 1: Instruction Files →](./lab-01-instructions.md)**
