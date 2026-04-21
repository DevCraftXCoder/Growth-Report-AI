# Security Policy

## Reporting a Vulnerability

Do **not** open a public GitHub issue for security vulnerabilities.

Contact via GitHub: [@DevCraftXCoder](https://github.com/DevCraftXCoder)

---

## Security Architecture

### Authentication & Access Control

- Admin-only access — all analytics routes require valid admin session
- Session tokens validated on every request; short TTL with server-side revocation
- No analytics data accessible without authentication

### AI Prompt Injection Prevention

- User-controlled strings are never embedded directly into AI prompts as instructions
- Metric data passed to AI as structured JSON in a clearly delimited data block
- AI prompt structure: fixed system instruction → cached context → parameterized data block
- AI responses stripped of any injected instructions before display (output sanitization)
- Rate limiting on AI report endpoints prevents adversarial prompt cycling

### Data Privacy

- Analytics endpoints return aggregated metrics only — no raw PII in API responses
- No individual user identifiers in AI-facing payloads — only aggregate counts and rates
- Anthropic API calls do not include PII; prompts audited before any schema changes

### Query Security

- All database queries parameterized — no string concatenation in SQL
- Date range inputs validated and clamped before querying
- Ownership checks on all queries — users can only access their own analytics
- Query results cached with user-scoped cache keys — no cross-user cache poisoning

### API Key Management

- Anthropic API key stored in encrypted environment variables
- Never logged, never returned in API responses
- Key access scoped to the analytics service only

### Infrastructure

- Edge runtime — no Node.js `fs` or `child_process` in the API layer
- All secrets loaded from environment at startup, never from disk at request time
