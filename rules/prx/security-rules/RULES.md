---
name: security-rules
keywords: ["security", "cybersecurity"]
priority: 10
---

## PRAXXYS Security Rules

- **Authorization**: Gates/Policies — never inline role checks
- **Validation**: FormRequest `authorize()` — never inline
- **SQL Injection**: Eloquent ORM — never raw SQL with string interpolation
- **XSS**: `{{ }}` in Blade — never `{!! !!}` with user content
- **CSRF**: `@csrf` on every POST form, Sanctum for SPA/API
- **Mass Assignment**: `$fillable` or `$guarded` on every model
- **Rate Limiting**: on all public endpoints, stricter on auth
- **File Uploads**: validate MIME type, size, extension
- **Logging**: log failed logins, unauthorized access, permission changes
- **HTTPS**: enforce in production, secure HTTP headers (HSTS, CSP)