---
name: model-rules
description: Eloquent model patterns and trait composition
triggers:
  extensions: [".php"]
  paths: ["src/Models/", "app/Models/"]
  keywords: ["model", "eloquent", "relationship", "scope", "accessor", "mutator"]
priority: 8
groups: ["backend-stack"]
---

## Model Rules

### Structure
- Extend base `Model` class
- Use trait composition for shared behavior — no inheritance chains beyond base Model
- Declare traits at the top of the class body
- Table name: snake_case plural of class name (auto-detected, override only for exceptions)

### Properties
```php
protected $fillable = ['name', 'email', 'role_id'];
protected $casts = [
    'is_active' => 'boolean',
    'metadata'  => 'array',
    'status'    => ProductStatus::class,  // enum casting
];
```

### Relationships
- Return type declarations: `BelongsTo`, `HasMany`, `BelongsToMany`, `HasOne`
- Name relationships as camelCase (`author()`, `latestPosts()`)
- Eager load with `with()` on queries to avoid N+1
- Use `withCount()` for counter caches
- Chain constraints inside relationship closures
```php
public function activeProducts(): HasMany
{
    return $this->hasMany(Product::class)->where('is_active', true);
}
```

### Scopes
- Local scopes: `public function scopeActive(Builder $query): Builder`
- Global scopes only for soft-deletes or multi-tenant filtering
- Chain scopes for readability: `Product::active()->published()->get()`

### Casting
- Cast enums: `'status' => ProductStatus::class`
- Cast JSON: `'metadata' => 'array'` or `'collection'`
- Cast dates: `'published_at' => 'datetime:Y-m-d'`
- Custom casts: one concern per cast class

### Events & Observers
- Use `#[ObservedBy]` attribute or `$observers` property
- Dedicated Observer class per model when > 3 events
- Avoid `self::created()` closures in `boot()` — extract to Observer
