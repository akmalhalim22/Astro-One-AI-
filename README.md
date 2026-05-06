# Astro One AI — Digital Performance Dashboard

A production-ready, password-protected management intelligence dashboard for **Astro Malaysia Holdings Berhad**, built on the Cloudflare Workers edge runtime using the [Hono](https://hono.dev/) framework.

---

## 🌐 Live Demo

| URL | Description |
|-----|-------------|
| https://astro-one-ai.pages.dev | Production dashboard |
| https://astro-one-ai.pages.dev/login | Login page |
| https://astro-one-ai.pages.dev/ai | Ask AI assistant |

---

## ✨ Features

### Authentication & Access Control
- PBKDF2-hashed passwords with per-user salts
- Session tokens in Cloudflare KV (8-hour TTL)
- Secure HttpOnly cookies (Lax SameSite, Secure on HTTPS)
- Multi-user support: **admin**, **editor**, **viewer** roles
- Admin Settings page for user management

### Dashboard Screens

| Route | Screen | Data Source |
|-------|--------|-------------|
| `/home` | Home Dashboard | Google Sheets (KPI aggregates) |
| `/overview` | All-Metrics Overview | Google Sheets |
| `/ai` | Ask AI (Chat Interface) | OpenAI GPT-4o |
| `/digest` | Executive Daily Digest | OpenAI + Sheets |
| `/pipeline` | Pipeline Health | Google Sheets — Pipeline tab |
| `/clients` | Client Intelligence | Google Sheets — Clients tab |
| `/salesperf` | Sales Performance | Google Sheets |
| `/revenue` | Revenue Performance | Google Sheets — revenue tab |
| `/campaign` | Campaign Performance | Google Sheets — direct campaign tab |
| `/ads` | GAM Ads Analytics | Google Ad Manager API |
| `/portals` | Portals Traffic | Google Analytics 4 |
| `/social` | Sprout Social Performance | Google Sheets — Sprout Social tab |
| `/settings` | User & Config Management | Cloudflare KV |
| `/apiconn` | API Connections | Cloudflare KV |

### Data Integrations
- **Google Sheets** — live read via Service Account (all business KPIs)
- **Google Ad Manager API** — orders, line items, impressions, CTR
- **OpenAI GPT-4o** — AI chat assistant + executive digest generation
- *(Google Analytics 4 — sample data; connector ready)*

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | [Cloudflare Workers](https://workers.cloudflare.com/) (edge, global) |
| Framework | [Hono](https://hono.dev/) v4 |
| Build Tool | [Vite](https://vitejs.dev/) + `@hono/vite-cloudflare-pages` |
| Language | TypeScript |
| Storage | Cloudflare KV (sessions, config) |
| Frontend | Vanilla JS + Tailwind CSS (CDN) + Chart.js (CDN) |
| Deployment | Cloudflare Pages |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) ≥ 18
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) ≥ 3.78 (`npm i -g wrangler`)
- A Cloudflare account

### 1 — Clone & Install

```bash
git clone https://github.com/akmalhalim22/Astro-One-AI-.git
cd Astro-One-AI-
npm install
```

### 2 — Create Cloudflare KV Namespace

```bash
# Production KV namespace (stores sessions + config)
npx wrangler kv:namespace create SESSIONS

# Copy the returned ID into wrangler.jsonc → kv_namespaces[].id
```

### 3 — Configure wrangler.jsonc

Open `wrangler.jsonc` and fill in your real KV namespace ID:

```jsonc
{
  "name": "astro-one-ai",
  "kv_namespaces": [
    {
      "binding": "SESSIONS",
      "id": "<YOUR_KV_NAMESPACE_ID>"   // ← paste here
    }
  ]
}
```

### 4 — Set Secrets

```bash
# Required — admin login credentials
npx wrangler secret put ADMIN_EMAIL          # e.g. admin@yourcompany.com
npx wrangler secret put ADMIN_PASSWORD_HASH  # run scripts/hash-password.js first
npx wrangler secret put ADMIN_SALT

# Optional — Google Sheets integration
npx wrangler secret put SERVICE_ACCOUNT_JSON  # full JSON string of service account

# Optional — Google Ad Manager
npx wrangler secret put GAM_NETWORK_CODE
npx wrangler secret put GAM_SERVICE_ACCOUNT_JSON

# Optional — OpenAI AI features
npx wrangler secret put OPENAI_API_KEY
```

> **Local development** — create `.dev.vars` (never commit this file):
> ```
> ADMIN_EMAIL=admin@yourcompany.com
> ADMIN_PASSWORD_HASH=<hash>
> ADMIN_SALT=<salt>
> SERVICE_ACCOUNT_JSON={"type":"service_account",...}
> GAM_NETWORK_CODE=12345678
> OPENAI_API_KEY=sk-...
> ```

### 5 — Run Locally

```bash
npm run build          # compile TypeScript → dist/
npm run dev:sandbox    # start wrangler pages dev on http://localhost:3000
```

### 6 — Deploy to Cloudflare Pages

```bash
npm run deploy         # builds + deploys to Cloudflare Pages
```

---

## 📁 Project Structure

```
.
├── src/
│   ├── index.tsx              # Main Hono app — all routes & API endpoints
│   ├── auth.ts                # Login / register / session HTML pages
│   ├── layout.ts              # Shared HTML shell (nav, sidebar, theme)
│   ├── styles.ts              # Global CSS variables & utility classes
│   ├── sheets.ts              # Google Sheets API client (OAuth2 via SA)
│   └── screens/
│       ├── home.ts            # Home dashboard screen
│       ├── overview.ts        # All-metrics overview
│       ├── ai.ts              # AI chat interface
│       ├── digest.ts          # Executive daily digest
│       ├── presales.ts        # Pipeline & client screens
│       ├── postsales.ts       # Revenue, Campaign, GAM screens
│       ├── traffic.ts         # Portals traffic + Sprout Social screens
│       ├── settings.ts        # User management & config UI
│       ├── data.ts            # API Connections setup UI
│       ├── reportai.ts        # AI report builder
│       └── canvas.ts          # Custom canvas builder
├── public/
│   └── static/
│       └── style.css          # Additional static styles
├── wrangler.jsonc             # Cloudflare Pages / Workers config
├── vite.config.ts             # Vite build config
├── tsconfig.json              # TypeScript config
├── ecosystem.config.cjs       # PM2 config for sandbox dev server
└── package.json
```

---

## 🔐 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_EMAIL` | ✅ | Admin login email |
| `ADMIN_PASSWORD_HASH` | ✅ | PBKDF2 hash of admin password |
| `ADMIN_SALT` | ✅ | Salt used to generate the hash |
| `SERVICE_ACCOUNT_JSON` | Optional | Google Service Account JSON for Sheets + GAM |
| `GAM_NETWORK_CODE` | Optional | Google Ad Manager network code |
| `GAM_SERVICE_ACCOUNT_JSON` | Optional | Separate SA JSON for GAM (if different) |
| `OPENAI_API_KEY` | Optional | OpenAI key for AI features (`/ai`, `/digest`) |

> All secrets are stored in Cloudflare Workers secrets (encrypted at rest) and **never** in source code.

---

## 📊 Google Sheets Tab Names

The dashboard reads from these **exact** tab names in your connected spreadsheet:

| Section | Tab Name |
|---------|----------|
| Revenue Performance | `revenue` |
| Campaign Performance | `direct campaign` |
| Sprout Social | `Sprout Social` |
| Pipeline | `Pipeline` |
| Ads | `Ads` |
| Traffic | `Traffic` |
| Clients | `Clients` |

---

## 🔄 Deployment Pipeline

### Manual Deploy
```bash
npm run deploy
# equivalent to: npm run build && wrangler pages deploy dist --project-name astro-one-ai
```

### Automatic Deploy via GitHub Actions (Recommended)
After connecting your GitHub repository to Cloudflare Pages:

1. Go to **Cloudflare Dashboard** → Pages → `astro-one-ai` → Settings → Builds & Deployments
2. Connect your GitHub repository (`akmalhalim22/Astro-One-AI-`)
3. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18`
4. Add all environment variables / secrets in the Cloudflare Pages dashboard
5. Every push to `main` will automatically trigger a new deployment

---

## 🛡 Security Checklist

- [x] Passwords hashed with PBKDF2 (100k iterations, SHA-256)
- [x] Session tokens are random hex strings, stored only in KV
- [x] HttpOnly + Secure cookies prevent XSS session theft
- [x] No secrets in source code — all via Cloudflare Secrets
- [x] `.gitignore` excludes `.dev.vars`, `.env.*`, `service-account*.json`
- [x] API routes protected by `requireAuth` middleware
- [x] Admin-only routes check `role === 'admin'`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat: add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

Internal project — Astro Malaysia Holdings Berhad. All rights reserved.
