---
name: config-rules
description: Configuration and environment conventions
triggers:
  extensions: [".env", ".yaml", ".yml", ".toml"]
  paths: ["config/", ".env"]
  keywords: ["config", "env"]
priority: 4
---

## Config Rules

- Store sensitive values in `.env`, never commit to repo
- Provide sensible defaults in `config/*.php` with `env()` helper
- Validate required config in `config/services.php` or boot service provider
- Use `config()` helper, not `$_ENV` direct access
- Document all environment variables in `.env.example`
- Use typed config: `config('app.debug', false)` not raw strings
- Environment detection: `app()->environment()` not manual checks
- Cache config in production: `php artisan config:cache`
