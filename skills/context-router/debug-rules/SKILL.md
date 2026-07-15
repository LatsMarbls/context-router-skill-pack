---
name: debug-rules
description: Debugging methodology conventions
triggers:
  keywords: ["debug"]
priority: 8
---

## Debug Rules

- Reproduce the bug first with minimal steps
- Check logs: `storage/logs/laravel.log`, browser console, network tab
- Narrow scope: isolate the failing component/file/function
- Use `ray()` or `dd()` during debugging — remove before commit
- Write a failing test that reproduces the bug before fixing
- Check recent deploys — most bugs come from recent changes
- For 500 errors: check Laravel log, enable debug mode locally
- For Vue issues: Vue DevTools, check component props/state
- Fix the root cause, not the symptom
