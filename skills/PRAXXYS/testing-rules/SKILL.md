---
name: testing-rules
description: PHPUnit testing conventions (TDD)
triggers:
  extensions: [".php"]
  paths: ["tests/"]
  keywords: ["test", "phpunit", "pest", "assertion", "mock", "factory"]
priority: 7
groups: ["backend-stack"]
---

## Testing Rules

### Structure
- One test file per class: `tests/Unit/Models/UserTest.php`
- Feature tests in `tests/Feature/` for HTTP request testing
- Method naming: `it_does_something_in_this_situation`
- Use Pest for new tests (simpler syntax)

### Best Practices
- Red-Green-Refactor: write failing test first, make it pass, then refactor
- Use factories over fixtures for database seeding
- `RefreshDatabase` trait for feature tests
- `DatabaseTransactions` trait for faster unit tests
- Mock external HTTP calls with `Http::fake()`
- Mock mail with `Mail::fake()`, notifications with `Notification::fake()`
- Test happy path AND error cases
- Assert on response structure, not hardcoded IDs

### Coverage
- Minimum 80% coverage for business logic
- 100% coverage for Action classes
- Integration tests for critical user journeys
