---
name: review-rules
keywords: ["review", "code quality"]
priority: 8
---

## PRX Review Checklist

### Security
- [ ] SQL injection: Eloquent used, no raw queries
- [ ] XSS: `{{ }}` escaping, no `{!! !!}` with user content
- [ ] CSRF: `@csrf` on every POST form
- [ ] Mass assignment: `$fillable`/`$guarded` defined
- [ ] Authorization: Gates/Policies, no inline role checks

### Code Quality
- [ ] No dead code (commented blocks, unused imports)
- [ ] No debug artifacts (dd/dump/ray/console.log)
- [ ] Single responsibility per class/method
- [ ] Controllers thin — no business logic, no Eloquent queries
- [ ] FormRequests handle validation — never inline
- [ ] Naming: methods=verbs, classes=nouns, booleans=is/has/can

### PRX Compliance
- [ ] Traits match PRX conventions
- [ ] Route files use fluent chaining (no array-style groups)
- [ ] Migration uses `unsignedTinyInteger` for enums with `->comment(EnumClass::class)`
- [ ] Resource status follows PRX format
- [ ] Test coverage for new code, regression tests for bug fixes