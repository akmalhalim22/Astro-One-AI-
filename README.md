# Astro One — Management AI Assistant

## Overview
A production-ready, password-protected digital performance dashboard for Astro Malaysia Holdings Berhad. Built on Cloudflare Pages + Hono edge runtime.

## 🌐 Live URLs
- **Production**: https://astro-one-ai.pages.dev
- **Login**: https://astro-one-ai.pages.dev/login
- **Settings**: https://astro-one-ai.pages.dev/settings (admin only)

## 🔐 Login Credentials
| Field | Value |
|-------|-------|
| Email | `analytics@kult.my` |
| Password | `Astro@2025!` |
| Session | 8 hours, HttpOnly + Secure cookie |

## ✅ Features Implemented

### Authentication
- Password-protected login with PBKDF2 hashed passwords
- Session tokens stored in Cloudflare KV (8h TTL)
- Secure HttpOnly cookies (Secure flag on HTTPS, Lax SameSite)
- Multi-user support: admin, editor, viewer roles
- Settings page for user management (admin only)

### Dashboard Screens (all routes return 200)
| Path | Screen |
|------|--------|
| `/home` | Home Dashboard |
| `/overview` | All-metrics Overview |
| `/ai` | Ask AI (chat interface) |
| `/digest` | Executive Daily Digest |
| `/pipeline` | Pipeline Health |
| `/clients` | Client Intelligence |
| `/salesperf` | Sales Performance |
| `/revenue` | Revenue Performance |
| `/campaign` | Campaign Performance |
| `/ads` | Ads Performance |
| `/portals` | Portals Traffic |
| `/social` | Sprout Social |
| `/upload` | Manual Data Upload |
| `/apiconn` | API Connections |
| `/setup` | Setup Guide |
| `/blend` | Data Blend Builder |
| `/reportai` | Report AI (chat → PPTX/PDF) |
| `/canvas` | Drag-and-drop Canvas |
| `/settings` | Platform Settings (admin) |

### Google Sheets Integration
- Service Account JSON auth (no npm googleapis — pure Web Crypto + Fetch)
- `GET /api/data/:section` — reads live data from configured sheet tabs
- `GET /api/kpis` — aggregates pipeline + revenue totals
- `POST /api/upload` — appends CSV rows to a sheet tab
- `GET /api/settings/config` — returns saved config (sheet ID, tab mapping, creds status)
- Settings screen auto-loads saved config on page open

### Report AI Tab (`/reportai`)
- Chat-style prompt interface
- Suggested prompt pills
- 6-page report preview with charts + KPIs
- Live Revenue vs Target bar + Product Mix donut (Chart.js)
- Export buttons (PPTX / PDF)
- Save / rename / rerun controls
- Data source panel (Google Sheets, GA4, Ads, TikTok, Sprout)

### Canvas Tab (`/canvas`)
- Drag-and-drop widget toolbox
- Pre-populated with 5 widgets (pivot, bar, line, donut, KPI card)
- Column browser for all 7 data sources
- Per-widget type switcher + config panel
- Save / clear / rename / auto-layout / export

### Data Blend Sub-feature (`/blend`)
- Blend Builder: Source A + B + optional Source C
- Join type selector (left / inner / full outer)
- Dynamic column display
- Computed columns (revenue_per_session, engagement_x_revenue)
- Schema preview + saved blends list
- Preview table (5 rows) + CSV export

## 🔧 How to Connect Your Google Sheets

1. Visit **https://astro-one-ai.pages.dev/settings** (login with admin credentials)
2. **Google Sheets tab → Service Account Credentials**:
   - Paste your Google Service Account JSON key
   - Click **Save to Cloudflare Secrets**
3. **Spreadsheet Configuration**:
   - Enter your Spreadsheet ID (from the URL)
   - Map tab names to dashboard sections
   - Click **Auto-Detect Tabs** to fill automatically
   - Click **Save Sheet Configuration**
4. Click **Test Connection** to verify
5. All dashboard screens will now show live data from your sheets

### Sheet Tab Names Expected
| Dashboard Section | Default Tab Name |
|-------------------|-----------------|
| Pre-Sales Pipeline | `Pipeline` |
| Revenue | `Revenue` |
| Campaign | `Campaign` |
| Ads | `Ads` |
| Traffic (GA4) | `Traffic` |
| Sprout Social | `Social` |
| Clients | `Clients` |

## 🏗️ Tech Stack
- **Runtime**: Cloudflare Pages + Workers (edge)
- **Framework**: Hono v4
- **Auth**: PBKDF2 via Web Crypto API, sessions in Cloudflare KV
- **Data**: Cloudflare KV (sessions + config), Google Sheets API (data)
- **Charts**: Chart.js v4 (CDN)
- **Icons**: FontAwesome 6.5 (CDN)
- **Fonts**: Inter (Google Fonts CDN)
- **CSS**: Custom dark theme (all inline, no build step)

## 📦 Cloudflare Resources
- **KV Namespace**: `SESSIONS` (ID: `2c2f01d24ee8483390ca4ae09353437d`)
- **Secrets**: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SALT`

## 🚀 Deployment
```bash
# Install deps
npm install

# Local dev
npm run build
pm2 start ecosystem.config.cjs

# Deploy to production
export CLOUDFLARE_API_TOKEN=your_token
npx wrangler pages deploy dist --project-name astro-one-ai
```

## 📊 Status
- ✅ All 23 routes live and returning 200
- ✅ Authentication working (login, session, logout)
- ✅ Settings screen with live config load
- ✅ Google Sheets API integration (Service Account JWT auth)
- ✅ Zero console errors in production
- **Last deployed**: 2026-04-02
