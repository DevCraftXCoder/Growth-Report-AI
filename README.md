# Growth Report AI

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Automation Powered](https://img.shields.io/badge/LLM_Powered-D97706?style=flat&logo=anthropic&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat&logo=cloudflare&logoColor=white)

**Intelligence-driven growth analytics dashboard — streaming LLM reports, animated KPIs, 6-step onboarding wizard.**

> Connects to your platform data, generates narrative growth reports via Server-Sent Events, and visualizes trends with animated charts and period-over-period comparisons. Built on Next.js 15 with a 6-step guided setup wizard and sub-2s dashboard load.

## Architecture

```
Browser
  └── Next.js 15 (RSC + edge API routes)
        ├── LLM API (streaming SSE — reports arrive as generated)
        │     └── Prompt cache (5-min TTL on system prompt + reference data)
        └── Recharts (animated KPI counters, bar charts, trend lines)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, edge runtime) |
| LLM | LLM API (Sonnet tier) with prompt caching |
| Streaming | Server-Sent Events (SSE) |
| Charts | Recharts — animated KPI counters, bar charts, trend lines |
| Hosting | Cloudflare Workers (opennextjs-cloudflare) |
| Language | TypeScript |

## Automation Integration

- **Extended prompt caching** — 5-min TTL on system prompt + reference data; reduces latency on repeat analysis
- **Streaming SSE** — report lines arrive as the LLM generates them; no waiting for full response
- **Retry with exponential backoff** on transient API errors
- **Model: LLM (Sonnet tier)** — cost/quality balance optimized for analytics summaries
- **Narrative insights** — The model generates prose interpretation, not just number tables

## Key Features

- 6-step onboarding wizard with animated progress and AI-guided setup
- Animated KPI counters and live chart previews on landing
- Historical trends with cursor-paginated data queries
- Period-over-period comparison (week/month/quarter)
- Per-platform breakdown across major streaming and social platforms
- Mobile-first layout with cinematic scroll effects

## Recent Additions

- Full landing hero with animated KPI counters, particle glow background, and trust badges
- Comprehensive UI overhaul — animated chart previews, cinematic scroll, hover animations
- 6-step wizard: fab, onboarding tour, template picker, chart wiring, generate step with roadmap timeline

