---
name: context-router-rule-author
description: Author and maintain context-router rules (RULES.md) for the PRAXXYS skill pack. Guides AI on frontmatter schema, trigger types, file structure, and conventions.
compatibility: opencode
metadata:
  owner: engineering
  stack: context-router
keywords: ["make rule", "create rule", "new rule", "rule generator", "RULES.md", "author rule", "context-router rule"]
priority: 10
---

# Context-Router Rule Author

Create and maintain rules in `rules/prx/{name}/RULES.md` format.

## File Structure

```
rules/prx/{name}/RULES.md
```

## Frontmatter Schema

```yaml
---
name: {kebab-case-name}
description: {one-line description}
triggers:
  extensions: [".ext1", ".ext2"]
  paths: ["app/SomeDir/"]
  keywords: ["keyword1", "keyword2"]
priority: {5-10}
groups: ["group-name"]
---
```

## Trigger Rules

| Trigger | When it fires | Best for |
|---------|---------------|----------|
| `extensions` | Any file with matching extension is referenced | Broad conventions (e.g. `.php` on `php-conventions` only) |
| `paths` | Referenced file path starts with prefix | Directory-specific rules (e.g. `app/Models/` for model-rules) |
| `keywords` | Natural language match in user message | Concept-based rules (e.g. "migration", "controller") |

## Guidelines

- One concern per rule file. Keep focused.
- `priority: 10` for critical conventions, `5` for preferences
- `groups` are optional — only add if part of a SCEUDRIX/backend-stack/frontend-stack group
- **No `.php` extension on directory-specific rules** (controller-rules, model-rules, etc.) — only `php-conventions` carries `.php`
- Prefer `paths` over `extensions` for directory-specific rules
- Reference existing rules in `rules/prx/` for style consistency

## Existing Rules

Check `rules/prx/` for existing rules before creating new ones. Avoid duplicating concerns.