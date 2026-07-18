---
name: php-conventions
description: PHP type safety and style conventions
triggers:
  extensions: [".php"]
  keywords: ["php"]
priority: 5
groups: ["prx-stack"]

---

## PHP Conventions

### Type Safety
- Strict types: `declare(strict_types=1)` on all files
- Type hints on all parameters and return types
- Return type on every method — never omit
- Use readonly properties for immutable DTOs/ValueObjects
- Constructor promotion for simple property injection

### Style
- PSR-12 for style (4-space indent, braces on new line for classes)
- Aligned array formatting — keys and `=>` line up vertically
- Use `match()` over `switch()` when possible
- Named arguments only for optional params with clear meaning
- Nullsafe operator `?->` and null coalescing `??` preferred
- Use enums over class constants for fixed value sets

### Naming
- Classes: PascalCase
- Methods/Functions: camelCase
- Database columns: snake_case
- Config keys: snake_case
- Exceptions: PascalCase + descriptive suffix (`InsufficientStockException`)

### Imports
- Always import every class explicitly — no `\` prefixed calls
- Group: PHP core → vendor → app
- No unused imports — clean up before commit

### Debug
- No `var_dump`, `dd`, `echo`, `ray()` in committed code — use logger
- Use `logger()` or `Log::debug()` for temporary debugging
- Remove all debug statements before PR
