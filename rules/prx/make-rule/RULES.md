---
name: make-rule
description: Meta-skill for creating new rules in this skill pack. Guides AI on RULES.md structure, frontmatter schema, triggers, and conventions.
keywords: ["make rule", "create rule", "new rule", "rule generator", "RULES.md"]
priority: 10
---

## How to Create a New Rule

### File Structure

```
rules/prx/{name}/RULES.md
```

### Frontmatter Schema

```yaml
---
name: {kebab-case-name}
description: {one-line description}
triggers:
  extensions: [".ext1", ".ext2"]       # file extensions that activate this rule
  paths: ["app/SomeDir/"]               # directory prefixes that activate this rule
  keywords: ["keyword1", "keyword2"]    # free-text keywords that activate this rule
priority: {5-10}                        # 10 = highest, 5 = default
groups: ["group-name"]                  # optional: group membership for bulk loading
---
```

### Trigger Rules

- **`extensions`** — use sparingly. Only declare `.php` if the rule applies to ALL PHP files. Prefer `paths` for directory-specific rules.
- **`paths`** — directory prefixes. Matches when a referenced file path starts with the given prefix.
- **`keywords`** — natural language triggers. Use specific phrases users would say.
- At least one trigger type should be present. Empty triggers means manual activation only.

### Guidelines

- Keep RULES.md focused — one concern per rule file
- Use `priority: 10` for critical conventions, `5` for preferences
- `groups` are optional — only add if part of a SCEUDRIX/backend-stack/frontend-stack group
- No `.php` extension on directory-specific rules (controller-rules, model-rules, etc.) — only `php-conventions` carries `.php`
- Reference existing rules in `rules/prx/` for style consistency