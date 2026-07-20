---
name: debug-rules
keywords: ["debug"]
priority: 5
---

## PRAXXYS Debug Rules

- Reproduce with minimal steps first
- Check logs: `storage/logs/laravel.log`, browser console, network tab
- Narrow scope: isolate failing layer (controller/service/model/view)
- Use `ray()`/`dd()` during debug — remove before commit
- Write a failing test that reproduces the bug before fixing
- Check recent deploys — most bugs come from recent changes
- Fix root cause, not symptom
- Run full test suite after fix: `php artisan test`