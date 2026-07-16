---
name: review-rules
description: Code review checklist
triggers:
  keywords: ["code quality"]
priority: 8
---

## Review Rules

- Check for security: SQL injection, XSS, CSRF, mass assignment
- Verify error handling: no silent catches, meaningful error messages
- Check naming: methods are verbs, classes are nouns, booleans start with is/has/can
- No dead code: commented-out blocks, unused imports, unreachable branches
- No debug artifacts: dd(), dump(), console.log(), ray()
- Single responsibility: each class/method does one thing
- Test coverage: new code has tests, bug fixes have regression tests
- No magic numbers/strings — extracted to constants or config
- Follows project conventions (check frontmatter of files changed)
