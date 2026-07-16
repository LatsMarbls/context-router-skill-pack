---
name: laravel-rules
description: Laravel framework conventions for PiaCore
triggers:
  extensions: [".php"]
  paths: ["app/", "src/"]
  keywords: ["laravel conventions"]
priority: 7
groups: ["backend-stack"]
---

## Laravel Conventions

### Architecture
- Repositories are NOT used — use trait-driven models + Action classes
- Services contain business logic, controllers handle HTTP concerns
- FormRequest classes for validation, never inline in controllers
- Action classes per SCEUDRIX flag: Show, Create, Edit, Update, Delete, Restore, Import, Export

### Models
- Extend base Model class, use trait composition
- Always define `$fillable` or `$guarded` — never unguarded
- Define relationships with return type hints: `BelongsTo`, `HasMany`, etc.
- Use `HasFactory` trait for testing

### Routes
- Use route model binding: `Route::get('/users/{user}', ...)`
- API routes in `routes/api.php`, web in `routes/web.php`
- Group by permission middleware

### Database
- Migrations are immutable once deployed — create new migration for changes
- Foreign keys always `->constrained()->cascadeOnDelete()`
- Index frequently queried columns
