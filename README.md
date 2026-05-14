# Growth Report AI

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI_Powered-D97706?style=flat&logo=anthropic&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

**AI-powered growth analytics dashboard. Real-time platform metrics, historical trends, and streaming AI-generated growth insights.**

> A full-stack analytics dashboard that combines real-time platform metrics with AI-generated narrative reports. Engineered for speed — sub-2s dashboard load, sub-500ms queries — with streaming AI insights that arrive progressively.

---

## Architecture

```
Browser
  │
  ▼
Next.js 15  (App Router · SSR · streaming)
  │
  ├── Growth Dashboard Page  (React Server Components + client charts)
  │     ├── GrowthChart  (client component — Recharts / D3)
  │     └── AI Insights Panel  (streaming — SSE)
  │
  └── API Routes
        ├── GET /api/growth/metrics       → aggregated platform stats
        ├── GET /api/growth/historical    → time-series query (cursor-paginated)
        ├── GET /api/growth/compare       → period-over-period comparison
        └── POST /api/growth/ai-report    → AI streaming report
              │
              └── AI SDK (LLM)  ←  prompt cache (5-min TTL)
```

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 15, App Router, React Server Components | Zero JS on initial render for above-the-fold |
| Charts | Recharts / D3 | Client-hydrated only after initial RSC render |
| AI | LLM API (streaming) | SSE |
| Caching | LLM prompt caching + application TTL cache | 5-min prompt cache, 30s hot-read cache |
| API | Next.js API Routes | Edge runtime |
| Validation | Zod | All API payloads |

---

## Features

### Metrics Dashboard
- Platform growth metrics: followers, plays, likes, comments, shares — over time
- Period-over-period comparison (week / month / quarter)
- Audience breakdown by demographics and geography
- Top-performing content ranked by engagement rate
- Real-time updates on key metrics

### AI Report Generation
- Narrative growth report generated from current metrics context
- Identifies trends, anomalies, and opportunities with specific observations
- Streamed progressively — first words appear in **~300ms**
- Prompt-cached for repeat runs on unchanged data — ~5× faster, ~80% cheaper
- Includes actionable recommendations calibrated to the specific numbers

### Performance Benchmarks

| Operation | Target | Achieved |
|---|---|---|
| Dashboard initial load | < 2s | **< 2s** |
| Metric query | < 500ms | **< 500ms** |
| Chart render | < 200ms | **< 200ms** |
| AI first token (cached) | < 300ms | **~300ms** |

---

## Security

### API Key Handling
- AI credentials are server-side environment variables — never exposed to client JavaScript or included in client bundles.
- Edge runtime API routes — credentials exist only in the Cloudflare Workers execution context, not in any client-accessible resource.

### Prompt Injection Prevention
- User-controlled strings (metric labels, time ranges) are passed to AI as **structured data** with strict user/system role separation.
- User input is never interpolated directly into the system prompt.
- AI responses are rendered as plain text — no HTML injection surface.

### Rate Limiting
- AI report endpoint rate-limited per session — prevents prompt injection via rapid-fire requests.
- Historical data queries validate date ranges and ownership before querying.

### Data Handling
- Metric ownership validated on every API request — users can only query their own data.
- No raw SQL in the API layer — parameterized queries only.
- No user data transmitted to the AI provider beyond the explicitly constructed report context.

---

## Key Engineering Decisions

### Streaming AI reports
AI report generation uses Server-Sent Events (SSE) to stream tokens progressively. The dashboard is usable while the AI generates the narrative. First token in ~300ms; full report in 4–8 seconds.

### Prompt caching for repeat runs
Metrics context is passed as a cached prefix to the AI API. A second run on the same data hits the cache — ~5× faster and ~80% cheaper. Cache TTL is 5 minutes.

### Separate query paths for real-time vs. historical
Real-time metrics use a hot read path (application-level cache, 30s TTL). Historical time-series uses a cursor-paginated cold path with no cache — avoids cache pollution from infrequently accessed historical data.

### RSC for initial data, client for interactivity
The initial dashboard render is a React Server Component — zero client-side JS for above-the-fold metrics. Charts hydrate on the client only after the initial render. Achieves < 2s perceived load.

### Cursor-paginated historical queries
Historical time-series uses `created_at + id` composite cursors — not OFFSET. Stable under concurrent writes and consistent across paginated views.

---

## AI Report API

```http
POST /api/growth/ai-report
Content-Type: application/json

{
  "period": "last_30_days",
  "metrics": {
    "followers": { "current": 12400, "previous": 9800 },
    "plays": { "current": 84200, "previous": 61000 },
    "engagement_rate": { "current": 0.064, "previous": 0.058 }
  }
}
```

Response: `text/event-stream` — tokens streamed as `data: <token>` events.

---

## License

MIT — see [LICENSE](LICENSE)

---

*Built by Frxncois — not open source.*
