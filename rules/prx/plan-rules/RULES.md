---
name: plan-rules
triggers:
  keywords: ["plan", "analyze", "design", "architecture"]
priority: 7
---

## Planning Conventions

### Task Breakdown
- Split work into atomic, single-responsibility tasks
- Each task: one file change or one logical concern
- Order: foundation → domain → integration → polish

### Architecture First
- Define data schema before writing business logic
- Identify models, relationships, and migration order
- Map service boundaries before controllers

### Documentation
- Document why, not what (diff shows what)
- Note assumptions, edge cases, and open questions
- Reference existing patterns in the codebase

### Review Gates
- Each task must have a clear acceptance criterion
- No task exceeds 400 lines diff
- Architecture decisions must be justified with alternatives considered
