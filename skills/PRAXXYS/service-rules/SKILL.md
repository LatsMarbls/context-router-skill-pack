---
name: service-rules
description: Service layer conventions for business logic
triggers:
  extensions: [".php"]
  paths: ["app/Services/", "src/Services/"]
  keywords: ["service", "business logic", "transaction"]
priority: 8
groups: ["backend-stack"]
---

## Service Conventions

### Error Handling
- No try/catch in services — let exceptions bubble up to the controller
- Use Laravel's exception handling for global catch
- Throw domain-specific exceptions when needed
```php
throw new InsufficientStockException($product, $quantityRequested);
```

### Database Transactions
- Wrap atomic operations in `DB::transaction()`
- Keep transaction scope minimal — one logical unit
```php
DB::transaction(function () use ($data) {
    $order = $this->orderRepository->create($data);
    $this->inventoryService->reserveStock($order);
    $this->paymentService->charge($order);
    return $order;
});
```

### Query Strategy
- **Eloquent**: CRUD, simple relationships, ≤ 1K rows
- **Query Builder**: Aggregations, reports, joins, 1K–100K rows
- **Raw SQL**: Bulk operations, complex reporting, > 100K rows
- Document why you chose the approach for non-obvious cases

### Eager Loading
- Always eager load relationships that will be accessed
- Use `with()` on queries, never lazy-load inside loops
```php
// ✅ Correct
$orders = Order::with('items.product', 'customer')->get();

// ❌ Wrong — N+1
$orders = Order::all();
foreach ($orders as $order) {
    echo $order->customer->name;
}
```

### Structure
- One service class per domain entity/feature
- Methods return typed results (resources, DTOs, collections)
- Repository pattern is NOT used — trait-driven models instead
