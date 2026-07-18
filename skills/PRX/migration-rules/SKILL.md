---
name: migration-rules
description: PRX migration conventions — naming, archives(), enum columns, monetary
triggers:
  extensions: [".php"]
  paths: ["database/migrations/"]
  keywords: ["migration", "schema", "table", "column"]
priority: 10
groups: ["prx-stack"]
---

## PRX Migration Conventions

### Naming
- `YYYY_MM_DD_{sequence}_create_{table}_table.php`

### Archives
- `$table->archives()` — PRX soft-delete shortcut (use instead of `$table->softDeletes()`)

### Enum Columns
- **Never use native PHP enums as column types**
- `unsignedTinyInteger` with `->default()` and `->comment(EnumClass::class)`:
```php
$table->unsignedTinyInteger('status')
    ->default(ProductStatus::Draft->value)
    ->comment(ProductStatus::class);
```

### Monetary
- `$table->bigInteger('amount')` — store in cents
- Use `WithDecimal` cast in model to present as float

### Foreign Keys
- `$table->foreignId('user_id')->constrained((new User())->getTable())`

### Best Practices
- `$table->id()` primary key first
- `$table->timestamps()`, `$table->softDeletes()`
- Charset: `utf8mb4`, Engine: `InnoDB`
- `->index()` on foreign key columns
- Migrations immutable once deployed — create new migration for changes