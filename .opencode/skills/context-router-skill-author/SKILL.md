---
name: context-router-skill-author
description: How to author context-router skill files — frontmatter schema, trigger types, group conventions, common pitfalls, and template
triggers:
  extensions: [".md"]
  paths: [".opencode/skills/", "skills/"]
  keywords:
    - create skill
    - new skill
    - add skill
    - make a skill
    - write a skill
    - skill frontmatter
    - skill template
    - author skill
    - skill format
priority: 8
groups: ["context-router-meta"]
---

# Authoring context-router Skills

A skill is a `.md` file with YAML frontmatter. The plugin auto-discovers it via the scanner — **no config needed for triggers, priority, or groups** (those go in frontmatter).

## File location

| Location | Path | When to use |
|----------|------|-------------|
| Project pack (typical) | `skills/{name}/SKILL.md` | Skill pack files |
| Project standalone | `.opencode/skills/{name}/SKILL.md` | Single project-local skills |
| User-global pack | `~/.config/opencode/skills/{name}/SKILL.md` | Cross-project skills |
| User-global (flat) | `~/.config/opencode/agent/{name}.md` | Backward-compat: existing agent files |

**One folder per skill** — name the folder the same as `name:` in frontmatter.

## Frontmatter schema

```yaml
---
name: <required>           # unique id, kebab-case
description: <recommended>  # one-line purpose (shown in /context_routes)
triggers:
  extensions: [".php"]     # file extension triggers
  paths: ["app/Models/"]    # glob path triggers
  agents: ["coder-lite"]    # agent name triggers (glob supported)
  keywords: ["model"]       # whole-word message triggers (digit suffix allowed)
priority: 5                 # higher = survives budget cuts. Default 5.
always: false               # if true, inject every turn regardless of triggers
groups: ["backend-stack"]   # group memberships (used by contentTriggers)
---
```

### Field rules

- `name` — **required**, unique, kebab-case.
- `description` — **strongly recommended**; shown in `/context_routes`, helps the LLM understand purpose.
- `triggers` — **optional** but recommended. If omitted, skill only loads if its `name` is in a config trigger map.
- `priority` — default 5. Use 8–10 for foundational rules, 3–5 for niche patterns.
- `always` — if true, inject every turn regardless of triggers.
- `groups` — **optional**; see "Groups" below.

## The 4 trigger dimensions

A skill loads when **any** trigger matches:

| Type | Match behavior | Example |
|------|----------------|---------|
| `extensions` | Whole-extension match against paths in user text | `[".php"]` matches `src/User.php` |
| `paths` | Glob match against paths in user text | `["app/Models/**"]` matches `app/Models/User.php` |
| `agents` | Glob match against current agent name | `["coder", "coder-lite"]` |
| `keywords` | Whole-word match in user text. Digit suffix allowed. | `["vue"]` matches "use vue3" but NOT "vuex" or "vueing" |

## Groups (frontmatter-only since v0.x)

Groups bundle related skills. They are **defined entirely in frontmatter** — `config.groups` is no longer supported.

**Two directions of expansion:**

1. **Group name in a trigger map** → loads all skills with that group in frontmatter
2. **Skill with `groups:` in frontmatter** → loads all sibling skills sharing any of those groups

```jsonc
// In context-router.jsonc:
{
  "contentTriggers": {
    "laravel-stack": ["laravel-stack"]
  }
}
```

```yaml
---
name: migration-rules
groups: ["laravel-stack", "backend"]   # declares membership
---
```

Up to 3 levels of group nesting.

## Priority & token budget

- Default budget: **8,000 tokens** (configurable via `maxTokens`).
- Skills sorted by priority desc; lowest dropped when budget exceeded.
- Use priority **8–10** for must-have rules (security, core conventions).
- Use priority **3–5** for niche patterns (specific files, edge cases).
- Token count uses **real BPE** (`gpt-tokenizer` cl100k_base) — every word counts.

## Common pitfalls

### ❌ Don't use `config.groups` (removed in v0.x)

This used to work but is silently ignored now. Move all group definitions to frontmatter.

### ❌ Don't set `skillTTL: 0` thinking it's instant expiry

`skillTTL: 0` means **never evict** (skills live for session lifetime). For fresh evaluation each turn, use `accumulateSkills: false` instead.

### ❌ Don't write huge skills

A 5000-token skill eats most of the 8000-token budget alone. Split into focused skills (one per concern) and let `groups:` bundle them.

### ❌ Don't use long keyword phrases as primary triggers

`keywords: ["create a controller"]` works but is fragile. Prefer `extensions` + `paths`. Use keywords for **intent** detection ("migration", "controller", "scrudrix").

### ❌ Don't duplicate trigger info

Pick **one source**: frontmatter triggers OR config trigger maps. If both define the same trigger, config wins. Best practice: **frontmatter only** (auto-discovered, no sync needed).

### ❌ Don't use `dist` / `node_modules` style path triggers

The plugin auto-filters paths in `triggerIgnoreTags` (default: `node_modules`, `.git`, `vendor`, `dist`, `.next`, `build`). Triggers on `dist/bundle.js` won't fire.

## Verifying your skill

After authoring:

```bash
# See all skills + their triggers
npx context-routing matrix

# Check if a specific file triggers it
npx context-routing check src/Models/User.php

# Show resolved config
npx context-routing config

# Measure scanner perf (50 synthetic skills, cold vs warm cache)
npx context-routing benchmark
```

In-session, type `/context_routes` to see loaded skills + budget bar + scan cache status.

## Templates

### Minimal skill

```markdown
---
name: my-rule
description: One-line description of what this rule covers
triggers:
  extensions: [".ext"]
  paths: ["some/path/"]
  keywords: ["keyword"]
priority: 5
---

# My Rule

## Section 1
- Do X
- Don't do Y

## Section 2
- Always Z
```

### Skill with group membership

```markdown
---
name: backend-rule
description: Backend-specific convention
triggers:
  extensions: [".php"]
  paths: ["app/"]
  keywords: ["backend"]
priority: 7
groups: ["backend-stack"]
---

# Backend Rule

...content...
```

Trigger all `backend-stack` skills via a single keyword:

```jsonc
{
  "contentTriggers": {
    "backend": ["backend-stack"]
  }
}
```

### Always-on skill

```markdown
---
name: security-rules
description: Security best practices — always loaded
keywords: ["security"]
priority: 10
always: true
---

# Security Rules

...content...
```

## Hot reload

- **Project-local files** (in `{project}/.opencode/`): auto-reload on save, no restart.
- **Global files** (in `~/.config/opencode/`): run `npx context-routing reload` then send any message.

## Token survival across compaction

The plugin persists active skill summaries via the `experimental.session.compacting` hook. After OpenCode trims context, summaries restore on the next turn — your hard-earned skills don't disappear mid-session.
