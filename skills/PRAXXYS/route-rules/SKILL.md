---
name: route-rules
description: PRAXXYS route conventions — /admin prefix, auth:admin, fluent groups
triggers:
  paths: ["routes/"]
  keywords: ["route", "router", "api route", "web route"]
priority: 8
groups: ["backend-stack", "crudrix", "scrudrix", "sdrix", "six", "sx"]
---

## PRAXXYS Route Conventions

### Structure
- Prefix: `/admin`
- Middleware: `auth:admin`
- POST for both create AND update (Inertia convention)

### Fluent Groups
```php
Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth:admin'])
    ->controller(ProductController::class)
    ->group(function () {
        Route::get('/', 'index')->name('products.index');
        Route::post('/', 'store')->name('products.store');
        Route::get('{product}', 'show')->name('products.show');
        Route::post('{product}', 'update')->name('products.update');
        Route::delete('{product}', 'destroy')->name('products.destroy');
    });
```

### SCEUDRIX Routes
| Route | Method | Action |
|-------|--------|--------|
| `/` | GET | index |
| `/create` | GET | create |
| `/` | POST | store |
| `/{id}` | GET | show |
| `/{id}` | POST | update |
| `/{id}` | DELETE | destroy |
| `/{id}/restore` | POST | restore |
| `/export` | GET | export |
| `/manifest` | GET | downloadManifest |
| `/import` | POST | import |