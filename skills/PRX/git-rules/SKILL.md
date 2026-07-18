---
name: git-rules
description: Git workflow and commit conventions
triggers:
  keywords: ["git conventions"]
priority: 3
---

## Git Rules

- **Branch naming**: `feature/description`, `fix/description`, `chore/description`
- **Commit style**: Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- **Commit body**: Explain *why*, not *what* (the diff shows what)
- **PRs**: One logical change per PR, max 400 lines diff
- **Rebase** before PR to keep history clean, merge with `--no-ff`
- No commits directly to `main` or `dev`
- Squash fixup commits before merging
- Write commit messages in imperative mood: "Add user authentication" not "Added user auth"
