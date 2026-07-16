---
name: testing-rules
description: PRAXXYS testing conventions — ResourceOperationTest, BDD, SCEUDRIX traits
triggers:
  extensions: [".php"]
  paths: ["tests/"]
  keywords: ["test", "phpunit", "pest"]
priority: 8
groups: ["backend-stack"]
---

## PRAXXYS Testing Conventions

### Structure
- Extend `ResourceOperationTest` for CRUD feature tests
- Compose test traits per SCEUDRIX flags enabled on entity
- One test class per entity

### BDD First
- Write Gherkin feature files before test code
- `Given` (state) → `When` (action) → `Then` (assertion)

### SCEUDRIX Test Traits
| Flag | Test Trait |
|------|-----------|
| S | HasReadTest |
| C | HasCreateTest |
| E/U | HasUpdateTest |
| D | HasDeleteTest |
| R | HasRestoreTest |
| I | HasImportTest |
| X | HasExportTest |

### Red-Green-Refactor
- Write failing test first, make it pass, then refactor
- `php artisan test --filter={Entity}` — all must pass

### Mocking
- `Excel::fake()` for import tests
- `Storage::fake('local')` for upload tests
- `Queue::fake()` for job tests
- `Http::fake()` for external API calls

### Coverage
- 80%+ for business logic
- 100% for Action classes
- Integration tests for critical journeys
- Happy path AND error cases