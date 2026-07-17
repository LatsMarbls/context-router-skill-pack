---
name: request-rules
description: PRAXXYS FormRequest conventions — never include status/slug, Rule::unique/enum/exists
triggers:
  extensions: [".php"]
  paths: ["app/Http/Requests/"]
  keywords: ["request", "validation", "form request"]
priority: 8
groups: ["backend-stack", "crudrix", "scrudrix", "sdrix", "six", "sx"]
---

## PRAXXYS Request Conventions

### Never Include
- `status` — managed by service, not user input
- `slug` — auto-generated from title by service

### Rule Patterns
- `Rule::unique({Model}::class)->ignore($this->route('{entity}'))` — unique with ignore
- `Rule::enum({StatusEnum}::class)` — enum validation
- `Rule::exists({Model}::class, 'id')` — foreign key existence
- `Rule::in([...])` — fixed value sets

### Image Rules
```php
'image' => ['nullable', 'image', 'mimes:jpg,png', 'max:2048'],
```

### Mobile Rules
```php
'mobile' => ['required', 'string', 'digits:10'],
```

### Format
- Always inline arrays — never string pipes
- `Rule` class from `Illuminate\Validation\Rule` — never string rules for uniqueness/exists

### Authorization
- `authorize()` delegates to Gate/Policy — never inline role checks

### Hooks
- `prepareForValidation()` — data normalization
- `passedValidation()` — post-validation hooks