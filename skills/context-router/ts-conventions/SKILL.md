---
name: ts-conventions
description: TypeScript conventions for Vue/Inertia
triggers:
  extensions: [".ts", ".vue"]
  keywords: ["typescript conventions"]
priority: 5
groups: ["frontend-stack"]
---

## TypeScript Conventions

- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and primitives
- Explicit return types on all functions — no inference for public APIs
- Use `as const` for literal types
- Avoid `any` — use `unknown` + type narrowing
- Use branded types for IDs: `type UserId = string & { __brand: 'UserId' }`
- Define interfaces co-located with their component/page
- Shared types in `src/interfaces/` directory
- Use generics for reusable utility types
- No type stubs — fix the actual source
