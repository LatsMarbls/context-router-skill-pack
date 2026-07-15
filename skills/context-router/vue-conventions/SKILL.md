---
name: vue-conventions
description: Vue 3 + Composition API conventions
triggers:
  extensions: [".vue"]
  paths: ["src/components/", "src/pages/"]
  keywords: ["vue conventions"]
priority: 6
groups: ["frontend-stack"]
---

## Vue 3 Conventions

### Composition API
- Use `<script setup lang="ts">` — no Options API
- One component per file
- Composable functions in `src/composables/` named `use*`
- Extract logic > 5 lines into composables

### Template
- Use `v-for` with `:key` (always)
- Event handlers: `@click="handler"` not `@click="handler()"` (unless passing args)
- Conditional rendering: `v-if` over `v-show` for rare toggles
- Use slots for extensible child components

### Props & Emits
- Define props with `defineProps<{ ... }>()` — type-safe
- Define emits with `defineEmits<{ (e: 'update', val: T): void }>()`
- Use `v-model` for two-way bindings following PrimeVue patterns

### Styling
- Use design tokens from `tokens.css` — never hardcode colors
- Scoped styles: `<style scoped>`
- Use CSS variables for theme-able values

### Script Setup
- Always `<script setup lang="ts">` — no Options API
- Define component name via file name, not `name:` property
- Use `await` directly in setup (surrounded by `Suspense`)

### Data Fetching
- Use Inertia `usePage()` / `useForm()` for form handling
- Use `router.get()`, `router.post()` for navigation, not axios
- Loading states: use `useForm.progress` for uploads

### Performance
- Lazy load routes: `defineAsyncComponent` or dynamic `import()`
- Use `shallowRef` for large immutable data
- Use `v-memo` for expensive lists that rarely change
- Avoid watchers on computed properties — computed already caches
