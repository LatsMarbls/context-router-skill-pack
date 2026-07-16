---
name: security-rules
description: Security best practices for all code
triggers:
  keywords: ["proper cybersecurity"]
priority: 10
---

## Security Rules

- **Never trust user input** — validate, sanitize, escape
- Use parameterized queries / Eloquent ORM — never raw `DB::statement()` with concatenation
- Escape output: `{{ $var }}` in Blade, not `{!! $var !!}` unless safe HTML
- CSRF: Include `@csrf` on every POST/PUT/DELETE form
- XSS: Use `strip_tags()` or HTML purifier for rich text
- SQL Injection: Always use Eloquent or Query Builder with bound params
- Authentication: Use Laravel's built-in guards, never roll your own
- Authorization: Use Gates/Policies, not `if (auth()->user()->role === 'admin')`
- Rate limiting on public endpoints
- Validate file uploads: MIME type, size, extension
- Log security events: failed logins, unauthorized access attempts
