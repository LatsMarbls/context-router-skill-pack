---
name: model-rules
description: PRAXXYS model conventions — BaseModel, trait composition, Archives
triggers:
  extensions: [".php"]
  paths: ["app/Models/"]
  keywords: ["model", "eloquent"]
priority: 9
groups: ["backend-stack"]
---

## PRAXXYS Model Conventions

### Base Class
- Extend `PRAXXYS\Backend\Models\BaseModel` (aliased as `Model`)
- Base extends `Illuminate\Database\Eloquent\Model`

### Required Traits
- `Archives` — soft delete + archived_at pattern
- `HandlesDateRange` — date range filtering
- `LogsActivity` — activity log queries
- `RendersSelect` — dropdown rendering
- `SearchableResource` — search functionality
- `HasFactory` — testing factories

### Optional Traits
- `HasSeoContent` — adds `seo()` relation + `Seo::sync()`
- `WithDecimal` — casts `bigInteger` cents to float

### Casts
- Enum: `'status' => PageStatus::class`
- JSON: `'metadata' => 'array'`
- Monetary: `'amount' => WithDecimal::class`

### Sections
- `Relations` — typed return: BelongsTo, HasMany, etc.
- `Scopes` — query scopes
- `Attributes` — accessors/mutators
- `Search` — searchable fields

### File Upload Pattern
- `FileUploader::store($request->file('image'), '{folder}')` in service
- `foreignId('image_id')->nullable()->constrained((new UploadedFile())->getTable())` in migration
- `$this->whenLoaded('image', fn() => $this->image->preview())` in resource