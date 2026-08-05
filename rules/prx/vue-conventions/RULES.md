---
name: vue-conventions
triggers:
  extensions: [".vue"]
  paths: ["resources/js/"]
  keywords: ["vue", "vue component", "vue page"]
priority: 7
groups: ["frontend-stack"]
---

## PRX Vue Conventions

### Composition API
- `<script setup lang="ts">` — no Options API
- `defineProps<T>()` with TypeScript interface
- `defineEmits<T>()` with typed payload
- `defineModel<T>()` for v-model bindings

### PRX Vue Kit Components
- **UiDataTable** — data tables with filters, sorting, pagination
- **UiModal** — modals
- **UiButton** — buttons
- **UiBadge** — status badges
- **UiTabs** / **UiNavbar** — tab navigation
- **UiFormLayout** — form layouts
- **UiTextBlock** — field display
- **UiActivityLog** — activity/audit logs
- **UiTableActions** — action buttons with getActions()
- **UiCreateButton** — create navigation
- **UiExportButton** / **UiImportButton** — export/import

### Page Structure
- `Pages/Admin/{Domain}/{Feature}/Index.vue`
- `Pages/Admin/{Domain}/{Feature}/Create.vue`
- `Pages/Admin/{Domain}/{Feature}/Edit.vue`
- `Pages/Admin/{Domain}/{Feature}/Show.vue`

### Composables
- `useTableFilters(options)` — filter state synced with URL query params
- `useForm(initialValues)` — Inertia form state management
- `usePage()` — current page props
- `router.get()` / `router.post()` — navigation (not axios)

### Index Page
- `props.data?.data ?? []` — never Array.isArray check
- `dateCreatedField` on both filters and data-table
- `filterConfig` computed from BE-provided prop arrays
- `sortFields` defined for sortable columns
- `UiTableActions` with `getActions()` for view/edit/archive/restore

### Create/Edit
- Initial values match BE FormRequest (no status, no slug)
- `form.post(route('admin.{entity}.store'))` — create
- `form.post(route('admin.{entity}.update', id))` — update
- `:test-id` on all input components
- `UiCancelButton` for navigation back

### Show Page
- `#title` slot with h1 + UiBadge for status
- `#tabs` slot with UiNavbar
- UiTextBlock for field display
- UiActivityLog for activity logs