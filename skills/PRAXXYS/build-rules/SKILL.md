---
name: build-rules
description: Personal dev coding preferences for implementation
keywords: ["build", "implement", "code", "write", "refactor"]
priority: 9
---

## Build Conventions

### Array Formatting
- Aligned arrays — keys and arrows line up vertically
- Except in HTTP request/response payloads (keep compact)
```php
// ✅ Aligned
[
    'name'       => 'product',
    'slug'       => 'product-slug',
    'price'      => 19.99,
    'categories' => $categories,
]

// ❌ Not aligned
[
    'name' => 'product',
    'slug' => 'product-slug',
]
```

### Naming
- **Requests / Queries**: `snake_case` for keys
- **Responses / Resources**: `camelCase` for keys
- **Classes**: PascalCase
- **Methods/Functions**: camelCase
- **Database columns**: snake_case
- **Relationships**: camelCase matching method name

### Imports
- Always import every class explicitly — no global/helper references
- Group imports: PHP core → vendor → app
```php
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Services\ProductService;
```

### General
- Strict types: `declare(strict_types=1)` on every PHP file
- Type hints on all parameters + return types
- No inline HTML in PHP files
- No dd()/dump()/ray() in committed code
