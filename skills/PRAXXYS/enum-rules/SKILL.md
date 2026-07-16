---
name: enum-rules
description: PHP enum definition conventions
triggers:
  extensions: [".php"]
  paths: ["app/Enums/", "src/Enums/"]
  keywords: ["enum", "case", "backed enum", "status"]
priority: 7
groups: ["backend-stack"]
---

## Enum Conventions

### Definition Style
- Use PHP 8.1+ backed enums with `string` or `int` type
- Name pattern: `{Entity}{Attribute}` — e.g. `ProductStatus`, `OrderState`
```php
enum ProductStatus: int
{
    case Draft     = 0;
    case Published = 1;
    case Archived  = 2;
}
```

### Label Method
- Include `label()` method for display-friendly text
```php
public function label(): string
{
    return match ($this) {
        self::Draft     => 'Draft',
        self::Published => 'Published',
        self::Archived  => 'Archived',
    };
}
```

### From Database
- When storing in DB: use `$enum->value` to unwrap
- When casting: set `protected $casts = ['status' => ProductStatus::class];`
- For migration: use unsigned tiny integer with default + comment
```php
$table->unsignedTinyInteger('status')
    ->default(ProductStatus::Draft->value)
    ->comment(ProductStatus::class);
```

### Enum Methods
- Business logic on the enum itself (e.g. `canTransitionTo()`)
- Keep enums focused — one concern per enum
- No side effects in enum methods
