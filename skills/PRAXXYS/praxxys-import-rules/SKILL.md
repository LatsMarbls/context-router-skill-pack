---
name: praxxys-import-rules
description: PRAXXYS Import conventions — BaseImport, ManifestExport, trait pairs, name-based resolution
triggers:
  keywords: ["praxxys import"]
priority: 8
groups: ["backend-stack", "scrudrix", "sdrix", "six"]
---

## PRAXXYS Import Conventions

### MCP Verification
```
mcp_praxxys_backend_get_trait --name=HasImportMethod
mcp_praxxys_backend_get_trait --name=HasImportProcessor
mcp_praxxys_backend_get_trait --name=HasImportTest
```

### Trait Pair
| Layer | Trait |
|-------|-------|
| Controller | `HasImportMethod` |
| Service | `HasImportProcessor` |
| Test | `HasImportTest` |

### Import Class
```php
class {Entity}Import implements ToCollection, WithHeadingRow, WithValidation
{
    public function collection(Collection $rows): void
    {
        foreach ($rows as $row) {
            $category = Category::where('name', $row['category'])->first();
            {Entity}::create([
                'name'        => $row['name'],
                'category_id' => $category?->id,
                'status'      => {Entity}Status::DRAFT->value,
            ]);
        }
    }
}
```

### Manifest Class
```php
class {Entity}Manifest extends ManifestExport implements WithHeadings, ShouldAutoSize
{
    public function headings(): array { return ['name']; }
}
```

### DO NOT / DO
| DO NOT | DO |
|--------|-----|
| `protected string $model = Entity::class;` | `implements ToCollection, WithHeadingRow, WithValidation` |
| `CONCAT(id, ' - ', name)` | `where('name', $value)->first()` |
| Skip `Excel::fake()` | `Excel::fake()` + `Storage::fake()` + `Queue::fake()` |