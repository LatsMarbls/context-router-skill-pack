---
name: route-rules
description: Route definition conventions with fluent groups
triggers:
  paths: ["routes/"]
  keywords: ["route", "router", "api route", "web route"]
priority: 6
groups: ["backend-stack"]
---

## Route Conventions

### Fluent Groups
- Use fluent method chaining for all route groups
- `console.php` and `channels.php` excluded — keep simple
```php
// ✅ Correct
Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified'])
    ->controller(ProductController::class)
    ->group(function () {
        Route::get('/', 'index')->name('products.index');
        Route::post('/', 'store')->name('products.store');
        Route::get('{product}', 'show')->name('products.show');
        Route::put('{product}', 'update')->name('products.update');
        Route::delete('{product}', 'destroy')->name('products.destroy');
    });

// ❌ Wrong
Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth']], function () {
    //
});
```

### Naming
- Route names match controller methods: `products.index`, `products.store`
- Resourceful routes follow SCEUDRIX pattern: index, show, create, store, edit, update, destroy
- API routes: snake_case for param names

### Organization
- One route file per domain/module when > 10 routes
- Import controllers at top of route file
- Keep routes RESTful — no custom method URLs unless necessary
