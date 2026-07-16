---
name: controller-rules
description: PRAXXYS controller conventions — ResourceController, SCEUDRIX trait pairs
triggers:
  extensions: [".php"]
  paths: ["app/Http/Controllers/"]
  keywords: ["controller", "resource", "endpoint", "scrudrix"]
priority: 9
groups: ["backend-stack"]
---

## PRAXXYS Controller Conventions

### Base Class
- Extend `PRAXXYS\Backend\Controllers\ResourceController`
- Bundles: `WithResourceDirectory`, `WithResourceRoute`, `WithResourceService`
- Abstract methods: `directory(): string`, `routeName(): string`, `service(): ResourceService`

### Default Helpers
- `defaultIndex(Request, Model|string, string JsonResourceClass, array additionalProps)` — paginated list
- `defaultCreate(Request, array additionalProps)` — create page
- `defaultEdit(Request, Model, string JsonResourceClass, array additionalProps)` — edit page
- `defaultStore(FormRequest, Model|string)` — store

### SCEUDRIX → Trait Mapping
| Flag | Controller Trait | Service Trait |
|------|-----------------|---------------|
| S | HasReadMethod | HasReadProcessor |
| C | HasCreateMethod | HasCreateProcessor |
| E/U | HasUpdateMethod | HasUpdateProcessor |
| D | HasDeleteMethod | HasDeleteProcessor |
| R | HasRestoreMethod | HasRestoreProcessor |
| I | HasImportMethod | HasImportProcessor |
| X | HasExportMethod | HasExportProcessor |

### Rules
- Controllers are thin — delegate to Services
- No Eloquent queries in controllers
- Always inject typed FormRequest classes, not base Request
- Always return JsonResource — never arrays
- `$this->whenLoaded('relation', fn() => $this->relation->preview())` in resources