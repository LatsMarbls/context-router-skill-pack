```
                    ╔══════════════════════════════════════════════════════════════╗
                    ║                                                              ║
                    ║              ███████╗██╗  ██╗██╗██╗     ██╗                  ║
                    ║              ██╔════╝██║ ██╔╝██║██║     ██║                  ║
                    ║              ███████╗█████╔╝ ██║██║     ██║                  ║
                    ║              ╚════██║██╔═██╗ ██║██║     ██║                  ║
                    ║              ███████║██║  ██╗██║███████╗███████╗             ║
                    ║              ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝             ║
                    ║                                                              ║
                    ║              ██████╗  █████╗  ██████╗██╗  ██╗                ║
                    ║              ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝                ║
                    ║              ██████╔╝███████║██║     █████╔╝                 ║
                    ║              ██╔═══╝ ██╔══██║██║     ██╔═██╗                 ║
                    ║              ██║     ██║  ██║╚██████╗██║  ██╗                ║
                    ║              ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝                ║
                    ║                                                              ║
                    ║                 Skill Pack for OpenCode                      ║
                    ║              Modular Skills · Context Router                 ║
                    ║                                                              ║
                    ╚══════════════════════════════════════════════════════════════╝ 
```

A reusable skill pack for the [opencode-context-router](https://github.com/LatsMarbls/opencode-context-router) plugin. Drop in context-aware skills that inject conventions, best practices, and coding rules triggered by file paths, extensions, and keywords.

---

## Why

The `opencode-context-router` plugin injects relevant code conventions into your OpenCode sessions. Instead of manually creating skills, this pack gives you a curated set for Laravel, Vue, PHP, and general development — automatically triggered when you work on matching files or ask matching questions.

---

## Quick Install

```bash
npx ocr-pack install
```

Copies skills to `~/.config/opencode/skills/context-router/` and adds the install path to your `context-routing.jsonc`. The scanner auto-discovers triggers from frontmatter — zero config needed.

### Options

| Flag | Description |
|------|-------------|
| `--project <path>` | Install into `.opencode/` of specific project |
| `--link` | Symlink instead of copy (live updates) |
| `--force` | Overwrite existing skill files with same name |

---

## How It Works

```
skills/context-router/{name}/SKILL.md      ← 19 skills
       │                              │
       │  ┌─ name: my-skill           │
       │  ├─ triggers:                │
       │  │  extensions: [".php"]     │  skillLocations only
       │  │  paths: ["src/"]          │  (frontmatter covers
       │  │  keywords: ["laravel"]    │   triggers, priority,
       │  ├─ priority: 7              │   groups, always flag)
       │  └─ groups: ["backend"]      │
       │                              │
       └──────────┬───────────────────┘
                  │
                  ▼
        OpenCode context-router
        scanner reads frontmatter →
        resolves triggers →
        injects matching skills
```

### Config Merge Order (last wins)
1. Plugin default: `~/.config/opencode/plugins/context-routing/context-routing.json`
2. Skill pack: `context-router.jsonc` (this repo, merged on install)
3. User global: `~/.config/opencode/context-routing.json`
4. Project: `{project}/.opencode/context-routing.json`

---

## Commands

```bash
npx ocr-pack install       # Install skills (default: --user)
npx ocr-pack install --project ./my-app  # Project-level
npx ocr-pack install --link              # Symlink dev mode
npx ocr-pack uninstall     # Remove installed skills
npx ocr-pack list          # Show installed skills
```

---

## Extending

Fork → add/modify skills → PR. Skills are just markdown with YAML frontmatter:

```bash
mkdir -p skills/my-rules
cat > skills/my-rules/SKILL.md << 'EOF'
---
name: my-rules
description: My custom conventions
triggers:
  extensions: [".php"]
  paths: ["src/"]
  keywords: ["my", "custom"]
priority: 7
---
## My Rules
- Always do X
- Never do Y
EOF
```

Run `npx ocr-pack install --force` to update. Multiple packs can coexist — install as many as you want.

---

## Requirements

- [opencode-context-router](https://github.com/LatsMarbls/opencode-context-router) plugin installed and activated
- Node.js 18+
- OpenCode with plugin support

---
