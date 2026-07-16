---
name: controller-rules
description: Thin controller conventions
triggers:
  extensions: [".php"]
  paths: ["app/Http/Controllers/", "src/Controllers/"]
  keywords: ["controller", "resource", "endpoint"]
priority: 8
groups: ["backend-stack"]
---

## Controller Conventions

### No Business Logic
- Controllers are thin — one method = one concern
- Delegate all business logic to Services
- No Eloquent queries in controllers (except simple `findOrFail`)
- No computation, no conditionals beyond auth checks

### Validation
- Never validate inline in controllers
- Always delegate to FormRequest classes
```php
// ✅ Correct
public function store(StoreProductRequest $request): ProductResource
{
    return new ProductResource(
        $this->productService->create($request->validated())
    );
}

// ❌ Wrong
public function store(Request $request)
{
    $validated = $request->validate([...]);
}
```

### Responses
- Always use `JsonResource` — never return arrays directly
- Use resource collections for lists
```php
// ✅ Correct
return new ProductResource($product);
return ProductResource::collection($products);

// ❌ Wrong
return response()->json(['data' => $product->toArray()]);
```

### Method Signatures
- Inject services via constructor DI
- Type-hint FormRequests, not base Request class
- Return type-hinted resources
