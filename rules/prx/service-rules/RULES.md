---
name: service-rules
triggers:
  paths: ["app/Services/"]
  keywords: ["service", "business logic", "transaction"]
priority: 9
groups: ["backend-stack"]
---

## PRAXXYS Service Conventions

### Base Class
- Extend `PRAXXYS\Backend\Services\CrudService` (extends `ResourceService`)

### Bundled Traits (do NOT re-add)
- `HasActivityLogs` — activity log queries
- `HasCounts` — tab counts (total, archived, trashed)
- `HasCreateProcessor` — `defaultStore()` with `prepareStoreData()`
- `HasDeleteProcessor` — `defaultDelete()` with soft/hard delete
- `HasListProcessor` — `defaultIndex()` with search/filter/sort/tab/pagination
- `HasRestoreProcessor` — `defaultRestore()` for soft-deleted records
- `HasUpdateProcessor` — `defaultEdit()` + `defaultUpdate()` with `prepareUpdateData()`

### Filter Chain
- `setTabs()` → `setSorts()` → `setFilters()` → `defaultIndex()`

### Store Pattern
- `DB::transaction(fn() => $this->defaultStore($request))`
- Override `prepareStoreData()` / `prepareUpdateData()` for modifications

### No Constructor
- Do NOT add `__construct()` — controller's `WithResourceService` handles model/resource binding

### Additional Traits
- Read: `HasReadProcessor`
- Export: `HasExportProcessor`
- Import: `HasImportProcessor`