# Astro One Management AI Assistant
## Unified Digital Performance Hub

### Project Overview
- **Name**: Astro One Management AI Assistant
- **Goal**: Unified web dashboard consolidating Pre-Sales, Post-Sales, Ads, and Traffic performance data
- **Design**: Premium dark-mode UI — deep black background, magenta/pink accents, white typography, rounded cards
- **Stack**: Hono (TypeScript) + Cloudflare Workers + Chart.js + FontAwesome + Inter font

### Live URL
- **Sandbox**: https://3000-igbzbjyh2r6a9ppb7mcvf-cbeee0f9.sandbox.novita.ai/home

### Screens (15 Routes)
| Route | Screen | Description |
|-------|--------|-------------|
| `/home` | Home | Unified overview, KPIs, AI flags, data source status |
| `/overview` | Overview | Full metrics dashboard with charts |
| `/ai` | Ask AI | Chat interface with seeded prompts, structured AI responses |
| `/digest` | Daily Digest | Executive AI-curated brief, score ring, recommendations |
| `/pipeline` | Pipeline Health | Sales funnel, at-risk deals, deal table |
| `/clients` | Client Intelligence | Top 10 clients, health scores, recovery targets |
| `/salesperf` | Sales Performance | Rep leaderboard, activity analysis, target tracking |
| `/revenue` | Revenue Performance | YTD revenue, product breakdown, forecasting |
| `/campaign` | Campaign Performance | Active campaigns, ROI analysis |
| `/ads` | Ads Performance | Google Ads, Meta, TikTok — live metrics |
| `/portals` | Portals Traffic | GA4 sessions, engagement, fill rate by portal |
| `/social` | Sprout Social | Reach, impressions, engagement by platform |
| `/upload` | Manual Upload | CSV/Excel → Google Sheets pipeline |
| `/apiconn` | API Connections | GAM, GA4, BigQuery, TikTok, Sprout status |
| `/setup` | Setup Guide | Integration docs, code examples, data flow |

### Data Architecture
- **Central Warehouse**: Google Sheets (manual uploads + API sync targets)
- **Auto-Ingestion**: GA4 API, Google Ads Manager API, BigQuery, TikTok Ads API
- **Manual Upload**: CSV/Excel with auto-clean (deduplication, date format, currency)
- **Scheduler**: Cron-based daily/weekly syncs with Slack/Email alerts

### Ask AI Seeded Prompts
- "Which deals above RM200K are at risk this month?"
- "Show top 10 clients by YTD revenue"
- "Which salespeople have low activity relative to pipeline?"
- "What changed in pipeline versus last week?"
- "Which inactive clients have the highest recovery potential?"
- "Which ad campaign has the best ROAS this month?"
- "Compare Google vs TikTok ad spend efficiency"

### Design System
- Background: `#060610` (deep black)
- Primary accent: `#e2007a` (magenta)
- Gradient: `linear-gradient(135deg, #e2007a, #ff4db8)`
- Typography: Inter (300–900 weight)
- Cards: 14px border-radius, subtle borders, hover effects
- Charts: Chart.js with gradient fills, dark tooltips

### Deployment
- **Platform**: Cloudflare Pages (via Wrangler)
- **Status**: ✅ Running in Sandbox
- **Last Updated**: March 2025
