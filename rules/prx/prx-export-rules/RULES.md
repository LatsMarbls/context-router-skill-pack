---
name: prx-export-rules
triggers:
  keywords: ["prx export"]
priority: 8
groups: ["backend-stack"]
---

## PRX Export Conventions

### Trait Pair
| Layer | Trait |
|-------|-------|
| Controller | `HasExportMethod` |
| Service | `HasExportProcessor` |
| Test | `HasExportTest` |

### Streaming (Recommended)
```php
protected function exportClass(): ?BaseExport { return null; }
protected function exportFileName(): string
{
    return '{Entity} ' . now()->toDateTimeString() . '.csv';
}
protected function exportColumns(): array
{
    return ['ID', 'Name', 'Status', 'Date Created'];
}
```

### ExportResource — CSV-safe
```php
// ✅ Correct:
'status' => $this->status?->meta('title'),

// ❌ Wrong — pill() returns HTML, not CSV-safe:
'status' => $this->status?->pill(),
```

### DO NOT / DO
| DO NOT | DO |
|--------|-----|
| `$this->status?->pill()` in ExportResource | `$this->status?->meta('title')` |
| `exportClass()` returns class with `->query()` | `exportClass()` returns `null` for streaming |
| Skip `getStreamedContent()` helper | Include for streaming export CSV assertion |