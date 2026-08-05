---
name: context-router-rule-author
description: Author and maintain context-router rules (RULES.md) for the PRX skill pack. Guides AI on frontmatter schema, trigger types, file structure, and conventions.
compatibility: opencode
metadata:
  owner: engineering
  stack: context-router
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

## File Routing Precedence

When a referenced file matches BOTH an extension trigger and a path pattern,
which bucket wins is set in `context-router.jsonc`:

| flag | value | effect |
|------|-------|--------|
| `precedencePrimary` | `"path"` (default) | Primary agent — folder-path match suppresses .ext |
| `precedenceSubagent` | `"extension"` | Subagents — .ext trigger wins over folder-path match |

The pack ships `precedencePrimary: "path"` and `precedenceSubagent: "extension"`,
so subagents route by extension while the primary agent keeps path-wins. Users
can flip either to the other value. This is a routing policy only — it does not
change which triggers you declare in frontmatter.

## Existing Rules

Check `rules/prx/` for existing rules before creating new ones. Avoid duplicating concerns.