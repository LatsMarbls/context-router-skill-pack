---
name: ts-conventions
triggers:
  extensions: [".ts"]
  keywords: ["typescript", "ts"]
priority: 6
groups: ["frontend-stack"]
---

## PRAXXYS TypeScript Conventions

- `interface` for object shapes, props, data structures
- `type` for unions, intersections, primitives, tuples
- Explicit return types on all functions
- `as const` for literal types, enum-like constants
- `unknown` over `any` — narrow with type guards
- Branded types for entity IDs: `type UserId = string & { __brand: 'UserId' }`
- Co-locate types with component/page
- Shared types in `interfaces/` directory
- Generics for reusable utility types
- `import type { ... }` for type-only imports
- `tsconfig.json`: strict mode, `@/` path alias, `verbatimModuleSyntax`