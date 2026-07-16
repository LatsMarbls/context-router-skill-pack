---
name: migration-rules
description: Database migration conventions
triggers:
  extensions: [".php"]
  paths: ["database/migrations/"]
  keywords: ["migration", "schema", "table", "column", "index", "foreign"]
priority: 9
groups: ["backend-stack"]
---

## Migration Rules

### Naming
- `YYYY_MM_DD_HHmmss_create_{table}_table.php`
- `YYYY_MM_DD_HHmmss_add_{column}_to_{table}_table.php`
- `YYYY_MM_DD_HHmmss_drop_{column}_from_{table}_table.php`

### Structure
- Use `Schema::create()` for new tables, `Schema::table()` for alterations
- Always add `->id()` primary key as first column
- Use `->timestamps()` for created_at / updated_at
- Use `->softDeletes()` when soft deletes are needed
- Foreign keys: `->foreignId('user_id')->constrained()->cascadeOnDelete()`

### Enum Handling
- **Never use native PHP enums as migration column types**
- Use `unsignedTinyInteger` with `->default()` and `->comment(EnumClass::class)`
```php
// ✅ Correct
$table->unsignedTinyInteger('status')
    ->default(ProductStatus::Draft->value)
    ->comment(ProductStatus::class);

// ❌ Wrong
$table->string('status')->default('draft');
```

### Best Practices
- Add `->index()` on foreign key columns
- Set charset: `$table->charset = 'utf8mb4'`
- Set engine: `$table->engine = 'InnoDB'`
- Batch multiple schema changes in one migration when related
- **Migrations are immutable** once deployed — never edit them
- Create a new migration to add/change columns
- Down migrations must exactly reverse up migrations
- Test both `up()` and `down()` before committing
