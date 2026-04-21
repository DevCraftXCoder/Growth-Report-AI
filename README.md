# Growth Report AI

**AI-powered growth analytics dashboard. Real-time metrics, historical trends, and AI-generated growth insights.**

> A full-stack analytics dashboard that combines real-time platform metrics with AI-generated narrative reports. Engineered for speed — under 2-second dashboard load, under 500ms per query — with streaming AI insights that arrive progressively as you view your data.

---

## Architecture

```
Browser
  │
  ▼
Next.js 15  (App Router · SSR · streaming)
  │
  ├── Growth Dashboard Page  (React Server Components + client charts)
  │     ├── GrowthChart (client component — recharts / D3)
  │     └── AI Insights Panel (streaming — SSE)
  │
  └── API Routes
        ├── GET /api/growth/metrics      → aggregated platform stats
        ├── GET /api/growth/historical   → time-series query (cursor-paginated)
        ├── GET /api/growth/compare      → period-over-period comparison
        └── POST /api/growth/ai-report   → Claude API streaming report generation
              │
              └── Anthropic SDK (claude-sonnet)  ←  prompt cache (5-min TTL)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, App Router, React Server Components |
| Charts | Recharts / D3 |
| AI | Anthropic Claude API (streaming) |
| Caching | Prompt caching (Anthropic SDK) + application-level TTL cache |
| API | Next.js API Routes (edge runtime) |
| Validation | Zod |

---

## Features

### Metrics Dashboard
- Platform growth metrics: followers, plays, likes, comments, shares over time
- Period-over-period comparison (week/month/quarter)
- Audience breakdown by demographics and geography
- Top-performing content ranked by engagement rate
- Real-time updates on key metrics

### AI Report Generation
- Narrative growth report generated from current metrics
- Identifies trends, anomalies, and opportunities
- Streamed progressively — first words appear in ~300ms
- Includes specific, actionable recommendations
- Prompt-cached for repeated runs on unchanged data (latency + cost reduction)

### Performance
- Dashboard initial load: < 2 seconds
- Metric queries: < 500ms per query
- Chart render: < 200ms
- AI first token: < 300ms (prompt-cached runs)

---

## Key Engineering Decisions

### Streaming AI reports
AI report generation uses Server-Sent Events (SSE) to stream tokens progressively. The dashboard is usable immediately while the AI generates the narrative. First token arrives in ~300ms; full report in 4–8 seconds depending on length.

### Prompt caching for repeat runs
The metrics context is passed as a cached prefix to the Anthropic API. If you run a report twice on the same data, the second run hits the cache — ~5x faster and ~80% cheaper. Cache TTL is 5 minutes.

### Separate query paths for real-time vs. historical
Real-time metrics use a hot read path (application-level cache, 30s TTL). Historical time-series uses a cursor-paginated cold path with no cache. This avoids cache pollution from infrequently accessed historical data.

### RSC for initial data, client for interactivity
The initial dashboard render is a React Server Component — zero client-side JS for the above-the-fold metrics. Charts hydrate on the client only after the initial render. This achieves < 2s perceived load.

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

## Security

- AI report endpoint rate-limited — prevents prompt injection via rapid-fire requests
- Metric endpoints validate date ranges and user ownership before querying
- AI prompts sanitized — user-controlled strings are passed as data, not instructions
- No raw SQL in API layer — parameterized queries only
- Prompt responses stripped of any injected instructions before display

---

## License

MIT — see [LICENSE](LICENSE)
