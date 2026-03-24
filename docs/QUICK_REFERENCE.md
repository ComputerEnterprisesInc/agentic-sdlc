# Agentic SDLC Quick Reference

This quick reference provides an at-a-glance guide to implementing the Agentic SDLC in your projects.

---

### Prompt Template

```markdown
---
title: Prompt Name
description: What this prompt does
applyTo:
  - "src/**/*.js"
tags:
  - tag1
  - tag2
---

# Prompt Name

I need you to {ACTION} for {RESOURCE}.

## Requirements
1. {REQUIREMENT_1}
2. {REQUIREMENT_2}

## Example Usage
{SHOW_EXAMPLE}
```

### Skill Template

```markdown
---
name: skill-name
description: What this skill knows
triggers:
  - "keyword1"
  - "keyword2"
applyTo:
  - "**/*.js"
---

# Skill Name

## Expertise Areas
- Area 1
- Area 2

## Core Principles
{EXPLAIN_KEY_CONCEPTS}

## Patterns & Examples
{SHOW_CODE_PATTERNS}

## When to Use
{EXPLAIN_WHEN_TO_INVOKE}
```

### Agent Template

```markdown
---
name: Agent Name
description: Agent role and expertise
model: claude-sonnet-4.5
triggers:
  - "@agent-name"
---

# Agent Name

## Role
I am a {ROLE} specialized in {EXPERTISE}.

## Workflow
When you ask me to {TASK}:
1. Step 1
2. Step 2
3. Step 3

## Expertise
- Skill 1
- Skill 2
```

---

## 🎯 Decision Matrix: Which Level to Use?

### Use Instructions When:
- ✅ Rule applies to all/most code
- ✅ Want consistent style
- ✅ Need to reference repeatedly
- ✅ Onboarding new developers

### Use Prompts When:
- ✅ Task is repetitive
- ✅ Workflow is standardized
- ✅ Need template with parameters
- ✅ Want to reuse across projects

### Use Skills When:
- ✅ Domain has deep expertise
- ✅ Want automatic invocation
- ✅ Knowledge applies in many contexts
- ✅ Best practices are well-established

### Use Agents When:
- ✅ Need specialized persona
- ✅ Workflow has multiple phases
- ✅ Require complex decision-making
- ✅ Want role-based assistance

### Use Autonomous When:
- ✅ Feature is well-defined
- ✅ Trust in AI capabilities
- ✅ Can review at checkpoints
- ✅ Want end-to-end automation

---

## 📊 Measuring Success

### Key Metrics

**Productivity Metrics:**
- Time to complete common tasks (before/after)
- Number of iterations needed for correct code
- Lines of code written per day
- Pull request cycle time

**Quality Metrics:**
- Code review issues found
- Bug density in new code
- Test coverage percentage
- Security vulnerability count

**Adoption Metrics:**
- Team members using customizations
- Number of prompts in library
- Skills created and maintained
- Agent invocations per week

### Success Indicators

**Level 1 Success:**
- Consistent code style across team
- Fewer style-related PR comments
- Faster onboarding for new developers

**Level 2 Success:**
- Common tasks completed in 50% less time
- Prompts reused across team
- Reduced context-switching

**Level 3 Success:**
- Expert guidance automatically provided
- Fewer Google searches needed
- Better adherence to best practices

**Level 4 Success:**
- Complex workflows handled smoothly
- AI suggests next steps proactively
- Multi-phase tasks completed efficiently

**Level 5 Success:**
- Features developed with minimal intervention
- Approval gates catch issues early
- Significant time savings on large features

---

## 📚 Additional Resources

### In This Repository
- [Complete Lab Guide](../labs/README.md)
- [Customization Reference](./CUSTOMIZATION_REFERENCE.md)
- [Example Files](../.github/)

### External Resources
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [VS Code Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Instruction Files Guide](https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions)
- [Prompt File Guide](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files)
- [Skill File Guide](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Agent File Guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Copilot Best Practices](https://github.blog/tag/github-copilot/)

---

## 🎯 Next Actions

**Just Getting Started?**
→ [Go to Lab 1](../labs/lab-01-instructions.md)

**Want Examples?**
→ [Browse .github/copilot/](../.github/copilot/)

**Need Deep Dive?**
→ [Read AGENTIC_SDLC_GUIDE.md](./AGENTIC_SDLC_GUIDE.md)

**Ready to Implement?**
→ Start with instructions.md in your project!

---

**Remember:** Start simple, build incrementally, measure impact, and maintain control. The goal is to augment your development process, not replace your judgment.
