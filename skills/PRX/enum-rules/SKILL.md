---
name: enum-rules
description: PRX enum conventions — backed enums, label(), migration pattern
triggers:
  extensions: [".php"]
  paths: ["app/Enums/"]
  keywords: ["enum", "case", "backed enum", "status"]
priority: 8
groups: ["prx-stack"]
---

## PRX Enum Conventions

### Definition
- PHP 8.1+ backed enums with `int` type
- Name: `{Entity}{Attribute}` — e.g. `ProductStatus`, `OrderState`

### Label Method
- Every enum includes `label()` returning display text:
```php
public function label(): string
{
    return match ($this) {
        self::Draft     => 'Draft',
        self::Published => 'Published',
    };
}
```

### Migration
- `unsignedTinyInteger` — never `string` or `integer`:
```php
$table->unsignedTinyInteger('status')
    ->default(ProductStatus::Draft->value)
    ->comment(ProductStatus::class);
```

### Casting
- `'status' => ProductStatus::class` in model `$casts`

### Methods
- Business logic on enum (e.g. `canTransitionTo()`)
- Pure methods — no DB queries or side effects