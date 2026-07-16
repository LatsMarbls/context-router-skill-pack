---
name: resource-rules
description: PRAXXYS JsonResource conventions — status formatting, whenLoaded, preview, CSV-safe
triggers:
  extensions: [".php"]
  paths: ["app/Http/Resources/"]
  keywords: ["resource", "json resource"]
priority: 8
groups: ["backend-stack"]
---

## PRAXXYS Resource Conventions

### Status Formatting (context-dependent)
| Context | Method | Returns |
|---------|--------|---------|
| Index (list) | `$this->status?->pill()` | HTML badge markup |
| Edit (form) | `$this->status?->value` | Raw enum value |
| Export (CSV) | `$this->status?->meta('title')` | Plain text label |

```php
// IndexResource — badge for table display
'status' => $this->status?->pill(),

// EditResource — raw value for form select
'status' => $this->status?->value,

// ExportResource — CSV-safe text
'status' => $this->status?->meta('title'),
```

### Relationships
- Always use `whenLoaded` — never eager-load in resource:
```php
'category' => $this->whenLoaded('category', fn() => $this->category->preview()),
'image'    => $this->whenLoaded('image', fn() => $this->image->preview()),
```

### Dates
- Index: `$this->{$this->getCreatedAtColumn()}`
- Edit: **No timestamps** — `noTimestampsEdit: true`

### Key Formatting
- Response keys: `camelCase`
- Never expose `id` as `id` — use entity-specific naming when needed

### Resource Types
| Resource | Purpose | When to Create |
|----------|---------|-----------------|
| IndexResource | Paginated list response | Always (SCEUDRIX S or index) |
| EditResource | Edit form data | When E/U flag present |
| ShowResource | Detail view data | When S flag present without E/U |
| ExportResource | CSV/Excel export | When X flag present |

### Show vs Edit Logic
- **Show resource** appears when there is **no Edit/Update** — view page instead of edit page
- If **no Update**, there is **no Create** — entity is created through API/seeder, not form
- Show resource includes: all fields + status pill + relationships + dates
- Edit resource includes: form fields only (no timestamps, no status managed by service)
