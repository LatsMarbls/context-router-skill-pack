---
name: request-rules
description: FormRequest validation conventions
triggers:
  extensions: [".php"]
  paths: ["app/Http/Requests/", "src/Requests/"]
  keywords: ["request", "validation", "form request", "validated"]
priority: 7
groups: ["backend-stack"]
---

## Request Conventions

### Rule Class
- Use `Rule` from `Illuminate\Validation\Rule` for dynamic rules
- Never use arbitrary string rules for uniqueness, exists, etc.
```php
use Illuminate\Validation\Rule;

// ✅ Correct
Rule::unique('products', 'slug')->ignore($this->route('product')),

// ❌ Wrong
'unique:products,slug,' . $this->route('product'),
```

### Rule Definition
- Always use inline arrays for rules — never string pipes
```php
// ✅ Correct
return [
    'title'       => ['required', 'string', 'max:255'],
    'email'       => ['required', 'email', Rule::unique('users')],
    'password'    => ['required', 'string', 'min:8', 'confirmed'],
];

// ❌ Wrong
return [
    'title'    => 'required|string|max:255',
    'email'    => 'required|email|unique:users',
];
```

### Authorization
- Use `authorize()` method for permission checks
- Delegate to Gate/Policy — never inline role checks
```php
public function authorize(): bool
{
    return Gate::allows('create', Product::class);
}
```

### Preparation
- Use `prepareForValidation()` for data normalization
- Use `passedValidation()` for post-validation hooks
- Keep both methods minimal — no business logic
