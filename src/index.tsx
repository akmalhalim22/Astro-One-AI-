import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.redirect('/home')
})

app.get('/home', (c) => c.html(getPage('home')))
app.get('/ask-ai', (c) => c.html(getPage('ask-ai')))
app.get('/pipeline', (c) => c.html(getPage('pipeline')))
app.get('/clients', (c) => c.html(getPage('clients')))
app.get('/sales', (c) => c.html(getPage('sales')))
app.get('/digest', (c) => c.html(getPage('digest')))

function getPage(active: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Astro One Management AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg-primary: #080810;
      --bg-secondary: #0f0f1a;
      --bg-card: #131320;
      --bg-card-hover: #1a1a2e;
      --bg-input: #0d0d1a;
      --border: #1e1e35;
      --border-light: #252540;
      --text-primary: #ffffff;
      --text-secondary: #8888aa;
      --text-muted: #55557a;
      --magenta: #e0007a;
      --magenta-bright: #ff0099;
      --magenta-dim: #cc006e;
      --magenta-glow: rgba(224, 0, 122, 0.15);
      --magenta-glow-strong: rgba(224, 0, 122, 0.3);
      --pink-gradient: linear-gradient(135deg, #e0007a, #ff4db8);
      --pink-gradient-subtle: linear-gradient(135deg, rgba(224,0,122,0.08), rgba(255,77,184,0.04));
      --success: #00d68f;
      --warning: #ffb347;
      --danger: #ff4757;
      --info: #5b8dee;
      --sidebar-w: 240px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; background: var(--bg-primary); color: var(--text-primary); font-family: 'Inter', sans-serif; overflow: hidden; }
    
    /* ─── LAYOUT ─── */
    .app { display: flex; height: 100vh; overflow: hidden; }

    /* ─── SIDEBAR ─── */
    .sidebar {
      width: var(--sidebar-w); flex-shrink: 0;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      padding: 0;
      position: relative;
      z-index: 10;
    }
    .sidebar-logo {
      padding: 28px 24px 24px;
      border-bottom: 1px solid var(--border);
    }
    .logo-mark {
      display: flex; flex-direction: column; align-items: flex-start; gap: 0;
    }
    .logo-astro {
      font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #fff;
      line-height: 1;
    }
    .logo-swoosh {
      width: 60px; height: 3px;
      background: linear-gradient(90deg, #fff 60%, transparent);
      border-radius: 2px;
      margin: 3px 0 2px;
      opacity: 0.9;
    }
    .logo-one {
      font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
      color: var(--magenta); line-height: 1;
    }
    .logo-sub {
      font-size: 9px; font-weight: 500; letter-spacing: 2px;
      color: var(--text-muted); text-transform: uppercase; margin-top: 6px;
    }
    .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; }
    .nav-section-label {
      font-size: 9px; font-weight: 600; letter-spacing: 2px;
      color: var(--text-muted); text-transform: uppercase;
      padding: 0 12px 8px; margin-top: 8px;
    }
    .nav-item {
      display: flex; align-items: center; gap: 11px;
      padding: 10px 12px; border-radius: 10px;
      color: var(--text-secondary); font-size: 13.5px; font-weight: 500;
      cursor: pointer; text-decoration: none;
      transition: all 0.18s ease;
      margin-bottom: 2px;
    }
    .nav-item:hover { background: var(--bg-card); color: var(--text-primary); }
    .nav-item.active {
      background: var(--magenta-glow);
      color: var(--text-primary);
      border: 1px solid rgba(224,0,122,0.25);
    }
    .nav-item.active .nav-icon { color: var(--magenta); }
    .nav-icon { width: 16px; text-align: center; font-size: 13px; }
    .nav-badge {
      margin-left: auto; background: var(--magenta);
      color: #fff; font-size: 10px; font-weight: 700;
      padding: 2px 7px; border-radius: 20px; min-width: 20px; text-align: center;
    }
    .sidebar-footer {
      padding: 16px 12px;
      border-top: 1px solid var(--border);
    }
    .user-card {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 10px;
      cursor: pointer; transition: background 0.15s;
    }
    .user-card:hover { background: var(--bg-card); }
    .user-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: var(--pink-gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
    }
    .user-info { flex: 1; min-width: 0; }
    .user-name { font-size: 12.5px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-role { font-size: 10.5px; color: var(--text-muted); }

    /* ─── MAIN CONTENT ─── */
    .main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }
    .topbar {
      height: 60px; flex-shrink: 0;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; padding: 0 28px;
      gap: 16px;
    }
    .topbar-title { font-size: 15px; font-weight: 600; color: var(--text-primary); flex: 1; }
    .topbar-sub { font-size: 12px; color: var(--text-muted); }
    .topbar-actions { display: flex; align-items: center; gap: 10px; }
    .btn-icon {
      width: 36px; height: 36px; border-radius: 8px;
      background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text-secondary); display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 13px; transition: all 0.15s;
    }
    .btn-icon:hover { color: var(--text-primary); border-color: var(--border-light); }
    .btn-primary {
      height: 36px; padding: 0 16px; border-radius: 8px;
      background: var(--pink-gradient); color: #fff;
      font-size: 12.5px; font-weight: 600; cursor: pointer;
      border: none; display: flex; align-items: center; gap: 8px;
      transition: opacity 0.15s;
    }
    .btn-primary:hover { opacity: 0.88; }
    .btn-ghost {
      height: 36px; padding: 0 14px; border-radius: 8px;
      background: transparent; color: var(--text-secondary);
      font-size: 12.5px; font-weight: 500; cursor: pointer;
      border: 1px solid var(--border-light);
      display: flex; align-items: center; gap: 8px;
      transition: all 0.15s;
    }
    .btn-ghost:hover { color: var(--text-primary); border-color: #3a3a60; }
    .status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      display: inline-block; margin-right: 6px;
    }
    .dot-green { background: var(--success); box-shadow: 0 0 6px var(--success); }
    .dot-amber { background: var(--warning); }
    .dot-red { background: var(--danger); }

    .content { flex: 1; overflow-y: auto; padding: 28px; }
    .content::-webkit-scrollbar { width: 5px; }
    .content::-webkit-scrollbar-track { background: transparent; }
    .content::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 3px; }

    /* ─── CARDS ─── */
    .card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 16px; padding: 22px;
    }
    .card-sm { padding: 16px 18px; }
    .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
    .card-title { font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.8px; }
    .card-action { font-size: 11.5px; color: var(--magenta); cursor: pointer; font-weight: 500; }
    .card-action:hover { opacity: 0.8; }

    /* ─── GRID ─── */
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
    .grid-62 { display: grid; grid-template-columns: 1fr 380px; gap: 16px; margin-bottom: 20px; }
    .grid-46 { display: grid; grid-template-columns: 380px 1fr; gap: 16px; margin-bottom: 20px; }

    /* ─── KPI CARDS ─── */
    .kpi-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 16px; padding: 20px 22px;
      position: relative; overflow: hidden;
      transition: border-color 0.2s;
    }
    .kpi-card:hover { border-color: var(--border-light); }
    .kpi-card.accent { border-color: rgba(224,0,122,0.3); }
    .kpi-card.accent::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: var(--pink-gradient);
    }
    .kpi-label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .kpi-value { font-size: 28px; font-weight: 800; color: var(--text-primary); line-height: 1; letter-spacing: -0.5px; margin-bottom: 8px; }
    .kpi-value span { font-size: 14px; font-weight: 500; }
    .kpi-change { font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 5px; }
    .kpi-change.up { color: var(--success); }
    .kpi-change.down { color: var(--danger); }
    .kpi-change.neutral { color: var(--text-muted); }
    .kpi-icon {
      position: absolute; top: 18px; right: 18px;
      width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .kpi-icon.pink { background: var(--magenta-glow); color: var(--magenta); }
    .kpi-icon.green { background: rgba(0,214,143,0.1); color: var(--success); }
    .kpi-icon.amber { background: rgba(255,179,71,0.1); color: var(--warning); }
    .kpi-icon.blue { background: rgba(91,141,238,0.1); color: var(--info); }
    .kpi-icon.red { background: rgba(255,71,87,0.1); color: var(--danger); }

    /* ─── TABLES ─── */
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table th {
      text-align: left; padding: 10px 14px; font-size: 10.5px; font-weight: 600;
      color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px;
      border-bottom: 1px solid var(--border);
    }
    .data-table td {
      padding: 12px 14px; border-bottom: 1px solid var(--border);
      color: var(--text-primary); vertical-align: middle;
    }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: var(--bg-card-hover); }
    .data-table td.muted { color: var(--text-secondary); }

    /* ─── BADGES ─── */
    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
    }
    .badge-green { background: rgba(0,214,143,0.12); color: var(--success); }
    .badge-amber { background: rgba(255,179,71,0.12); color: var(--warning); }
    .badge-red { background: rgba(255,71,87,0.12); color: var(--danger); }
    .badge-blue { background: rgba(91,141,238,0.12); color: var(--info); }
    .badge-pink { background: var(--magenta-glow); color: var(--magenta); }
    .badge-gray { background: rgba(136,136,170,0.12); color: var(--text-secondary); }

    /* ─── PROGRESS BAR ─── */
    .progress-bar-wrap { background: var(--bg-secondary); border-radius: 20px; height: 6px; overflow: hidden; }
    .progress-bar-fill { height: 100%; border-radius: 20px; }
    .fill-pink { background: var(--pink-gradient); }
    .fill-green { background: linear-gradient(90deg, var(--success), #00ffb2); }
    .fill-amber { background: linear-gradient(90deg, var(--warning), #ffd080); }
    .fill-red { background: linear-gradient(90deg, var(--danger), #ff7787); }
    .fill-blue { background: linear-gradient(90deg, var(--info), #8ab4ff); }

    /* ─── SPARKLINE ─── */
    .sparkline { display: flex; align-items: flex-end; gap: 3px; height: 32px; }
    .spark-bar {
      flex: 1; border-radius: 3px 3px 0 0; min-width: 6px;
      background: var(--border-light); transition: background 0.2s;
    }
    .spark-bar.active { background: var(--pink-gradient); }
    .spark-bar:last-child { background: var(--pink-gradient); }

    /* ─── SCREEN VISIBILITY ─── */
    .screen { display: none; }
    .screen.active { display: block; }

    /* ─── HOME SCREEN ─── */
    .welcome-banner {
      background: linear-gradient(135deg, #12121f 0%, #1a0a2e 50%, #120818 100%);
      border: 1px solid var(--border);
      border-radius: 16px; padding: 28px 32px;
      margin-bottom: 20px; position: relative; overflow: hidden;
    }
    .welcome-banner::before {
      content: ''; position: absolute; top: -40px; right: -40px;
      width: 200px; height: 200px; border-radius: 50%;
      background: radial-gradient(circle, rgba(224,0,122,0.18) 0%, transparent 70%);
    }
    .welcome-greeting { font-size: 13px; color: var(--text-muted); margin-bottom: 6px; font-weight: 500; }
    .welcome-title { font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; letter-spacing: -0.3px; }
    .welcome-title span { color: var(--magenta); }
    .welcome-desc { font-size: 13.5px; color: var(--text-secondary); max-width: 520px; line-height: 1.6; margin-bottom: 20px; }
    .welcome-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .quick-prompt {
      padding: 8px 14px; border-radius: 20px;
      background: rgba(255,255,255,0.05); border: 1px solid var(--border-light);
      font-size: 12px; color: var(--text-secondary); cursor: pointer;
      transition: all 0.15s; white-space: nowrap;
    }
    .quick-prompt:hover { border-color: var(--magenta); color: var(--text-primary); background: var(--magenta-glow); }

    .activity-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 12px 0; border-bottom: 1px solid var(--border);
    }
    .activity-item:last-child { border-bottom: none; }
    .activity-icon {
      width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 12px;
    }
    .activity-text { flex: 1; }
    .activity-title { font-size: 13px; font-weight: 500; color: var(--text-primary); margin-bottom: 2px; }
    .activity-sub { font-size: 11.5px; color: var(--text-muted); }
    .activity-time { font-size: 11px; color: var(--text-muted); white-space: nowrap; }

    /* ─── MINI CHART ─── */
    .mini-chart-wrap { height: 60px; }

    /* ─── ASK AI SCREEN ─── */
    .chat-layout { display: flex; gap: 16px; height: calc(100vh - 60px - 56px); }
    .chat-sidebar {
      width: 260px; flex-shrink: 0;
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
      overflow-y: auto; padding: 16px;
    }
    .chat-sidebar::-webkit-scrollbar { width: 4px; }
    .chat-sidebar::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }
    .chat-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .chat-window {
      flex: 1; overflow-y: auto;
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
      padding: 24px; margin-bottom: 12px;
    }
    .chat-window::-webkit-scrollbar { width: 4px; }
    .chat-window::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

    .msg-row { display: flex; gap: 12px; margin-bottom: 24px; }
    .msg-row.user { flex-direction: row-reverse; }
    .msg-avatar {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
    }
    .msg-avatar.ai { background: var(--pink-gradient); color: #fff; }
    .msg-avatar.user { background: #1e1e35; color: var(--text-secondary); border: 1px solid var(--border-light); }
    .msg-bubble {
      max-width: 80%; padding: 14px 18px; border-radius: 16px; font-size: 13.5px; line-height: 1.7;
    }
    .msg-bubble.ai { background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-primary); border-radius: 4px 16px 16px 16px; }
    .msg-bubble.user { background: var(--magenta-glow); border: 1px solid rgba(224,0,122,0.25); color: var(--text-primary); border-radius: 16px 4px 16px 16px; }

    .ai-response { }
    .ai-summary {
      font-size: 14.5px; font-weight: 600; color: var(--text-primary);
      margin-bottom: 14px; line-height: 1.5;
    }
    .ai-kpi-row { display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
    .ai-kpi {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 10px; padding: 10px 14px; min-width: 90px;
    }
    .ai-kpi-val { font-size: 20px; font-weight: 800; color: var(--text-primary); }
    .ai-kpi-lbl { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px; }
    .ai-explanation { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; }
    .ai-mini-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 12px; }
    .ai-mini-table th { padding: 7px 10px; text-align: left; color: var(--text-muted); font-size: 10px; text-transform: uppercase; letter-spacing: 0.7px; border-bottom: 1px solid var(--border); }
    .ai-mini-table td { padding: 8px 10px; border-bottom: 1px solid var(--border); color: var(--text-primary); }
    .ai-mini-table tr:last-child td { border: none; }
    .ai-flag {
      background: rgba(255,71,87,0.08); border: 1px solid rgba(255,71,87,0.2);
      border-radius: 8px; padding: 10px 14px; font-size: 12px; color: var(--danger);
      display: flex; gap: 8px; align-items: flex-start; margin-bottom: 10px;
    }
    .ai-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
    .ai-action-btn {
      padding: 6px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 500;
      background: transparent; border: 1px solid var(--border-light);
      color: var(--text-secondary); cursor: pointer; transition: all 0.15s;
      display: flex; align-items: center; gap: 6px;
    }
    .ai-action-btn:hover { color: var(--text-primary); border-color: var(--magenta); }

    .chat-input-wrap {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px;
      padding: 12px 16px; display: flex; align-items: flex-end; gap: 10px;
    }
    .chat-input {
      flex: 1; background: transparent; border: none; outline: none;
      color: var(--text-primary); font-size: 14px; font-family: inherit;
      resize: none; line-height: 1.5; max-height: 100px;
    }
    .chat-input::placeholder { color: var(--text-muted); }
    .chat-send {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--pink-gradient); border: none; color: #fff;
      cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px;
      flex-shrink: 0; transition: opacity 0.15s;
    }
    .chat-send:hover { opacity: 0.85; }

    .prompt-example {
      padding: 10px 12px; border-radius: 10px; cursor: pointer;
      font-size: 12px; color: var(--text-secondary); line-height: 1.4;
      border: 1px solid var(--border); margin-bottom: 6px;
      transition: all 0.15s; background: var(--bg-secondary);
    }
    .prompt-example:hover { border-color: var(--magenta); color: var(--text-primary); background: var(--magenta-glow); }
    .prompt-cat { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); padding: 12px 4px 6px; }

    .session-item {
      padding: 8px 10px; border-radius: 8px; font-size: 12px; color: var(--text-secondary);
      cursor: pointer; margin-bottom: 3px; display: flex; align-items: center; gap: 8px;
      transition: all 0.15s;
    }
    .session-item:hover { background: var(--bg-secondary); color: var(--text-primary); }
    .session-item.today { color: var(--magenta); }

    /* ─── PIPELINE SCREEN ─── */
    .funnel-wrap { padding: 10px 0; }
    .funnel-stage {
      display: flex; align-items: center; gap: 16px; margin-bottom: 10px;
    }
    .funnel-bar-wrap { flex: 1; position: relative; }
    .funnel-bar-bg { background: var(--bg-secondary); border-radius: 6px; height: 36px; }
    .funnel-bar-fill { height: 36px; border-radius: 6px; position: relative; display: flex; align-items: center; padding: 0 14px; }
    .funnel-bar-fill span { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); }
    .funnel-label { width: 100px; font-size: 12px; color: var(--text-secondary); text-align: right; flex-shrink: 0; }
    .funnel-val { width: 80px; text-align: right; font-size: 13px; font-weight: 600; color: var(--text-primary); flex-shrink: 0; }
    .funnel-count { width: 40px; text-align: right; font-size: 11.5px; color: var(--text-muted); flex-shrink: 0; }

    .deal-card {
      background: var(--bg-secondary); border: 1px solid var(--border);
      border-radius: 12px; padding: 14px 16px; margin-bottom: 8px;
      display: flex; align-items: center; gap: 14px; cursor: pointer;
      transition: border-color 0.15s;
    }
    .deal-card:hover { border-color: var(--border-light); }
    .deal-name { font-size: 13.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; }
    .deal-meta { font-size: 11.5px; color: var(--text-muted); }
    .deal-value { font-size: 15px; font-weight: 700; color: var(--text-primary); white-space: nowrap; }
    .deal-prob { font-size: 11px; color: var(--text-muted); text-align: right; margin-top: 2px; }
    .risk-bar { width: 60px; height: 4px; border-radius: 2px; background: var(--bg-card); }
    .risk-fill { height: 4px; border-radius: 2px; }

    /* ─── CLIENT INTELLIGENCE ─── */
    .client-row {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 0; border-bottom: 1px solid var(--border);
    }
    .client-row:last-child { border-bottom: none; }
    .client-avatar {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--bg-secondary); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: var(--text-secondary); flex-shrink: 0;
    }
    .client-name { font-size: 13.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
    .client-seg { font-size: 11px; color: var(--text-muted); }
    .health-circle {
      width: 36px; height: 36px; border-radius: 50%;
      border: 2.5px solid; display: flex; align-items: center;
      justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0;
    }
    .health-green { border-color: var(--success); color: var(--success); }
    .health-amber { border-color: var(--warning); color: var(--warning); }
    .health-red { border-color: var(--danger); color: var(--danger); }

    /* ─── SALES PERFORMANCE ─── */
    .rep-row {
      display: flex; align-items: center; gap: 14px;
      padding: 13px 0; border-bottom: 1px solid var(--border);
    }
    .rep-row:last-child { border-bottom: none; }
    .rep-rank { font-size: 16px; font-weight: 800; color: var(--text-muted); width: 28px; flex-shrink: 0; }
    .rep-rank.top { color: var(--magenta); }
    .rep-name { font-size: 13.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
    .rep-team { font-size: 11px; color: var(--text-muted); }
    .rep-bar-wrap { flex: 1; }
    .rep-attain { font-size: 13px; font-weight: 700; white-space: nowrap; }
    .rep-deals { font-size: 11px; color: var(--text-muted); white-space: nowrap; }

    /* ─── DIGEST SCREEN ─── */
    .digest-header {
      display: flex; align-items: flex-start; gap: 20px;
      background: linear-gradient(135deg, #12121f 0%, #1a0a2e 60%, #120818 100%);
      border: 1px solid var(--border); border-radius: 16px;
      padding: 28px 32px; margin-bottom: 20px; position: relative; overflow: hidden;
    }
    .digest-header::before {
      content: ''; position: absolute; top: -60px; right: -60px;
      width: 240px; height: 240px; border-radius: 50%;
      background: radial-gradient(circle, rgba(224,0,122,0.14) 0%, transparent 70%);
    }
    .digest-date { font-size: 12px; color: var(--magenta); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .digest-title { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
    .digest-sub { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
    .digest-score { flex-shrink: 0; text-align: center; }
    .score-ring {
      width: 80px; height: 80px; border-radius: 50%;
      border: 3px solid var(--magenta);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: var(--magenta-glow);
    }
    .score-val { font-size: 22px; font-weight: 800; color: var(--text-primary); line-height: 1; }
    .score-lbl { font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

    .insight-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 12px; padding: 16px 18px; margin-bottom: 10px;
      display: flex; gap: 14px; align-items: flex-start; cursor: pointer;
      transition: border-color 0.15s;
    }
    .insight-card:hover { border-color: var(--border-light); }
    .insight-card.urgent { border-left: 3px solid var(--danger); }
    .insight-card.positive { border-left: 3px solid var(--success); }
    .insight-card.warning { border-left: 3px solid var(--warning); }
    .insight-card.info { border-left: 3px solid var(--info); }
    .insight-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
    .insight-title { font-size: 13.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
    .insight-body { font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; }
    .insight-meta { font-size: 11px; color: var(--text-muted); margin-top: 6px; }

    /* ─── TOOLTIP ─── */
    .tooltip { position: relative; }
    .tooltip-text {
      display: none; position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
      background: #1e1e35; border: 1px solid var(--border-light); border-radius: 6px;
      padding: 5px 10px; font-size: 11px; color: var(--text-secondary); white-space: nowrap; z-index: 100;
    }
    .tooltip:hover .tooltip-text { display: block; }

    /* ─── SCROLLBAR ─── */
    * { scrollbar-width: thin; scrollbar-color: var(--border-light) transparent; }

    /* ─── DIVIDER ─── */
    .divider { height: 1px; background: var(--border); margin: 16px 0; }
    .section-gap { margin-bottom: 20px; }

    /* ─── ALERT STRIP ─── */
    .alert-strip {
      background: rgba(255,71,87,0.06); border: 1px solid rgba(255,71,87,0.18);
      border-radius: 10px; padding: 11px 16px;
      display: flex; align-items: center; gap: 10px;
      font-size: 12.5px; color: var(--danger); margin-bottom: 16px;
    }
    .alert-strip.amber { background: rgba(255,179,71,0.06); border-color: rgba(255,179,71,0.18); color: var(--warning); }
    .alert-strip.green { background: rgba(0,214,143,0.06); border-color: rgba(0,214,143,0.18); color: var(--success); }

    /* ─── TAG ─── */
    .tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .tag-risk { background: rgba(255,71,87,0.1); color: var(--danger); }
    .tag-hot { background: var(--magenta-glow); color: var(--magenta); }
    .tag-new { background: rgba(0,214,143,0.1); color: var(--success); }
    .tag-cold { background: rgba(136,136,170,0.1); color: var(--text-secondary); }

    /* ─── ANIMATION ─── */
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    .pulse { animation: pulse 2s infinite; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    .fade-in { animation: fadeIn 0.3s ease; }

    /* ─── CHART ─── */
    .chart-wrap { position: relative; }
    canvas { max-width: 100%; }

    /* ─── TYPING INDICATOR ─── */
    .typing { display: flex; align-items: center; gap: 4px; padding: 12px 16px; }
    .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--magenta); animation: bounce 1.2s infinite; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

    /* Trend arrows */
    .trend-up::before { content: '↑ '; }
    .trend-down::before { content: '↓ '; }

    /* Gradient text */
    .grad-text { background: var(--pink-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  </style>
</head>
<body>
<div class="app">

  <!-- ═══ SIDEBAR ═══ -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">
        <span class="logo-astro">astro</span>
        <div class="logo-swoosh"></div>
        <span class="logo-one">one</span>
      </div>
      <div class="logo-sub">Management AI</div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Overview</div>
      <a href="/home" class="nav-item ${active==='home'?'active':''}">
        <i class="fas fa-grid-2 nav-icon"></i> Home
      </a>
      <a href="/digest" class="nav-item ${active==='digest'?'active':''}">
        <i class="fas fa-newspaper nav-icon"></i> Daily Digest
        <span class="nav-badge">3</span>
      </a>

      <div class="nav-section-label" style="margin-top:16px;">Intelligence</div>
      <a href="/ask-ai" class="nav-item ${active==='ask-ai'?'active':''}">
        <i class="fas fa-sparkles nav-icon"></i> Ask AI
      </a>
      <a href="/pipeline" class="nav-item ${active==='pipeline'?'active':''}">
        <i class="fas fa-filter nav-icon"></i> Pipeline Health
      </a>
      <a href="/clients" class="nav-item ${active==='clients'?'active':''}">
        <i class="fas fa-building nav-icon"></i> Client Intelligence
      </a>
      <a href="/sales" class="nav-item ${active==='sales'?'active':''}">
        <i class="fas fa-chart-line nav-icon"></i> Sales Performance
      </a>

      <div class="nav-section-label" style="margin-top:16px;">Workspace</div>
      <a href="#" class="nav-item">
        <i class="fas fa-bookmark nav-icon"></i> Saved Insights
      </a>
      <a href="#" class="nav-item">
        <i class="fab fa-microsoft nav-icon"></i> Share to Teams
      </a>
      <a href="#" class="nav-item">
        <i class="fas fa-gear nav-icon"></i> Settings
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">DL</div>
        <div class="user-info">
          <div class="user-name">Dato' Lee</div>
          <div class="user-role">Chief Revenue Officer</div>
        </div>
        <i class="fas fa-chevron-up" style="font-size:10px;color:var(--text-muted);"></i>
      </div>
    </div>
  </aside>

  <!-- ═══ MAIN ═══ -->
  <main class="main">

    <!-- ─ HOME ─ -->
    <div id="screen-home" class="screen ${active==='home'?'active':''}">
      <div class="topbar">
        <div>
          <div class="topbar-title">Overview</div>
          <div class="topbar-sub"><span class="status-dot dot-green"></span>Live · Updated 2 min ago</div>
        </div>
        <div class="topbar-actions">
          <div class="btn-ghost" onclick="window.location='/ask-ai'"><i class="fas fa-sparkles" style="color:var(--magenta)"></i> Ask AI</div>
          <div class="btn-icon tooltip"><i class="fas fa-bell"></i><span class="tooltip-text">3 alerts</span></div>
          <div class="btn-icon"><i class="fas fa-arrows-rotate"></i></div>
          <div class="btn-primary"><i class="fas fa-share-nodes"></i> Share to Teams</div>
        </div>
      </div>
      <div class="content">
        <!-- Welcome banner -->
        <div class="welcome-banner fade-in">
          <div class="welcome-greeting">Good morning, Dato' Lee</div>
          <div class="welcome-title">Thursday, 27 March <span>2025</span></div>
          <div class="welcome-desc">Your pipeline shows <strong style="color:#fff">RM 87.4M</strong> in active deals. Revenue is tracking at <strong style="color:var(--success)">94% of target</strong> — 3 deals flagged as at-risk this week. Ask AI for a deeper read.</div>
          <div class="welcome-actions">
            <div class="quick-prompt" onclick="window.location='/ask-ai'"><i class="fas fa-triangle-exclamation" style="color:var(--warning);margin-right:5px"></i> Show at-risk deals</div>
            <div class="quick-prompt" onclick="window.location='/ask-ai'"><i class="fas fa-ranking-star" style="color:var(--magenta);margin-right:5px"></i> Top clients by YTD revenue</div>
            <div class="quick-prompt" onclick="window.location='/ask-ai'"><i class="fas fa-chart-line" style="color:var(--info);margin-right:5px"></i> Pipeline vs last week</div>
            <div class="quick-prompt" onclick="window.location='/ask-ai'"><i class="fas fa-user-clock" style="color:var(--text-muted);margin-right:5px"></i> Low-activity reps</div>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="grid-4">
          <div class="kpi-card accent">
            <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
            <div class="kpi-label">YTD Revenue</div>
            <div class="kpi-value">RM 142.3<span>M</span></div>
            <div class="kpi-change up"><i class="fas fa-arrow-trend-up"></i> +12.4% vs LY</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon green"><i class="fas fa-filter"></i></div>
            <div class="kpi-label">Active Pipeline</div>
            <div class="kpi-value">RM 87.4<span>M</span></div>
            <div class="kpi-change neutral"><i class="fas fa-minus"></i> −2.1% vs last wk</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon amber"><i class="fas fa-handshake"></i></div>
            <div class="kpi-label">Deals Closing Q1</div>
            <div class="kpi-value">24<span> deals</span></div>
            <div class="kpi-change up"><i class="fas fa-arrow-trend-up"></i> 3 new this week</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon red"><i class="fas fa-triangle-exclamation"></i></div>
            <div class="kpi-label">At-Risk Deals</div>
            <div class="kpi-value">3<span> critical</span></div>
            <div class="kpi-change down"><i class="fas fa-arrow-trend-up"></i> +1 vs last week</div>
          </div>
        </div>

        <!-- Charts + Activity -->
        <div class="grid-62">
          <!-- Revenue Trend -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Revenue Trend — 2025</div>
              <div style="display:flex;gap:8px">
                <div class="badge badge-green"><i class="fas fa-circle" style="font-size:7px"></i> On Track</div>
                <div class="card-action">Full Report →</div>
              </div>
            </div>
            <div class="chart-wrap" style="height:160px">
              <canvas id="revChart"></canvas>
            </div>
            <div style="display:flex;gap:20px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
              <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Target</div><div style="font-size:15px;font-weight:700">RM 151.4M</div></div>
              <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Achieved</div><div style="font-size:15px;font-weight:700;color:var(--success)">RM 142.3M</div></div>
              <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Gap</div><div style="font-size:15px;font-weight:700;color:var(--danger)">RM 9.1M</div></div>
              <div style="margin-left:auto"><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Attainment</div><div style="font-size:15px;font-weight:700;color:var(--magenta)">94.0%</div></div>
            </div>
          </div>

          <!-- Activity Feed -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">AI Flags Today</div>
              <div class="card-action">View All</div>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(255,71,87,0.1);color:var(--danger)"><i class="fas fa-triangle-exclamation"></i></div>
              <div class="activity-text">
                <div class="activity-title">Astro Arena deal stalled — 34 days no update</div>
                <div class="activity-sub">RM 2.4M · Proposal stage · Owner: Ahmad R.</div>
              </div>
              <div class="activity-time">Now</div>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(255,179,71,0.1);color:var(--warning)"><i class="fas fa-user-slash"></i></div>
              <div class="activity-text">
                <div class="activity-title">Watsons MY — no activity in 45 days</div>
                <div class="activity-sub">Recovery potential: RM 1.1M · High LTV</div>
              </div>
              <div class="activity-time">1h</div>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(0,214,143,0.1);color:var(--success)"><i class="fas fa-circle-check"></i></div>
              <div class="activity-text">
                <div class="activity-title">Maxis deal closed — RM 3.8M booked</div>
                <div class="activity-sub">Q1 milestone hit · Sales: Priya S.</div>
              </div>
              <div class="activity-time">2h</div>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(91,141,238,0.1);color:var(--info)"><i class="fas fa-rotate"></i></div>
              <div class="activity-text">
                <div class="activity-title">Pipeline refreshed — 4 deals stage-changed</div>
                <div class="activity-sub">Net change: +RM 1.2M total pipeline</div>
              </div>
              <div class="activity-time">3h</div>
            </div>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="grid-3">
          <!-- Win Rate -->
          <div class="card card-sm">
            <div class="card-header">
              <div class="card-title">Win Rate by Segment</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${[['Enterprise','68%',68,'fill-green'],['Mid-Market','51%',51,'fill-amber'],['SMB','38%',38,'fill-red'],['Public Sector','72%',72,'fill-pink']].map(([l,v,p,c])=>`
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                  <span style="font-size:12.5px;color:var(--text-secondary)">${l}</span>
                  <span style="font-size:12.5px;font-weight:600">${v}</span>
                </div>
                <div class="progress-bar-wrap"><div class="progress-bar-fill ${c}" style="width:${p}%"></div></div>
              </div>`).join('')}
            </div>
          </div>

          <!-- Top Deals Closing -->
          <div class="card card-sm">
            <div class="card-header">
              <div class="card-title">Closing This Month</div>
              <div class="card-action">All 24 →</div>
            </div>
            ${[['Celcom Axiata','RM 4.2M','Negotiation','badge-amber'],['Petronas TVC','RM 3.6M','Closing','badge-green'],['TNB Digital','RM 2.8M','Proposal','badge-blue'],['MyEG Services','RM 2.1M','At Risk','badge-red']].map(([n,v,s,b])=>`
            <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
              <div style="flex:1;min-width:0">
                <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:1px">${v}</div>
              </div>
              <span class="badge ${b}">${s}</span>
            </div>`).join('')}
          </div>

          <!-- Sales Team Snapshot -->
          <div class="card card-sm">
            <div class="card-header">
              <div class="card-title">Team Attainment</div>
              <div class="card-action">Details →</div>
            </div>
            ${[['Priya Subramaniam','118%','fill-green'],['Ahmad Razali','96%','fill-amber'],['Chen Wei Ling','84%','fill-amber'],['James Ooi','61%','fill-red']].map(([n,a,c])=>`
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
              <div style="width:28px;height:28px;border-radius:50%;background:var(--bg-secondary);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text-muted);flex-shrink:0">${n.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <div style="flex:1">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:12.5px;color:var(--text-primary)">${n.split(' ')[0]}</span>
                  <span style="font-size:12.5px;font-weight:700">${a}</span>
                </div>
                <div class="progress-bar-wrap" style="height:4px"><div class="progress-bar-fill ${c}" style="width:${parseInt(a)}%"></div></div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- ─ ASK AI ─ -->
    <div id="screen-ask-ai" class="screen ${active==='ask-ai'?'active':''}">
      <div class="topbar">
        <div>
          <div class="topbar-title"><i class="fas fa-sparkles" style="color:var(--magenta);margin-right:8px"></i>Ask AI</div>
          <div class="topbar-sub">Natural language queries across your entire business</div>
        </div>
        <div class="topbar-actions">
          <div class="btn-ghost"><i class="fas fa-bookmark"></i> Save Session</div>
          <div class="btn-primary"><i class="fab fa-microsoft"></i> Share to Teams</div>
        </div>
      </div>
      <div class="content" style="padding:20px;height:calc(100vh - 60px);overflow:hidden">
        <div class="chat-layout">
          <!-- Left: Prompts + History -->
          <div class="chat-sidebar">
            <div class="prompt-cat">Suggested Prompts</div>
            <div class="prompt-example" onclick="fillPrompt('Which deals above RM200K are at risk this month?')">
              <i class="fas fa-triangle-exclamation" style="color:var(--danger);margin-right:6px"></i>
              Which deals above RM200K are at risk this month?
            </div>
            <div class="prompt-example" onclick="fillPrompt('Show top 10 clients by YTD revenue')">
              <i class="fas fa-ranking-star" style="color:var(--magenta);margin-right:6px"></i>
              Show top 10 clients by YTD revenue
            </div>
            <div class="prompt-example" onclick="fillPrompt('Which salespeople have low activity relative to pipeline?')">
              <i class="fas fa-user-clock" style="color:var(--warning);margin-right:6px"></i>
              Which salespeople have low activity relative to pipeline?
            </div>
            <div class="prompt-example" onclick="fillPrompt('What changed in pipeline versus last week?')">
              <i class="fas fa-code-compare" style="color:var(--info);margin-right:6px"></i>
              What changed in pipeline vs last week?
            </div>
            <div class="prompt-example" onclick="fillPrompt('Which inactive clients have the highest recovery potential?')">
              <i class="fas fa-rotate-left" style="color:var(--success);margin-right:6px"></i>
              Which inactive clients have highest recovery?
            </div>
            <div class="prompt-example" onclick="fillPrompt('Forecast risk for Q2 2025')">
              <i class="fas fa-chart-bar" style="color:var(--text-muted);margin-right:6px"></i>
              Forecast risk for Q2 2025
            </div>

            <div class="divider"></div>
            <div class="prompt-cat">Recent Sessions</div>
            <div class="session-item today"><i class="fas fa-clock" style="font-size:11px"></i> At-risk deals — Q1</div>
            <div class="session-item"><i class="fas fa-clock" style="font-size:11px"></i> Maxis account analysis</div>
            <div class="session-item"><i class="fas fa-clock" style="font-size:11px"></i> Pipeline vs last month</div>
            <div class="session-item"><i class="fas fa-clock" style="font-size:11px"></i> Team performance Feb</div>
          </div>

          <!-- Right: Chat Window -->
          <div class="chat-main">
            <div class="chat-window" id="chatWindow">
              <!-- System intro -->
              <div class="msg-row">
                <div class="msg-avatar ai"><i class="fas fa-sparkles"></i></div>
                <div class="msg-bubble ai">
                  <div style="font-weight:600;margin-bottom:6px;color:var(--magenta)">Astro One AI is ready</div>
                  <div style="font-size:13px;color:var(--text-secondary);line-height:1.6">Ask me anything about your pipeline, revenue, clients, or sales team. I have live access to your CRM, deal data, and performance metrics. Try a suggested prompt or type your own question.</div>
                </div>
              </div>

              <!-- User question -->
              <div class="msg-row user">
                <div class="msg-avatar user"><i class="fas fa-user"></i></div>
                <div class="msg-bubble user">
                  Which deals above RM200K are at risk this month?
                </div>
              </div>

              <!-- AI Answer -->
              <div class="msg-row">
                <div class="msg-avatar ai"><i class="fas fa-sparkles"></i></div>
                <div class="msg-bubble ai" style="max-width:90%">
                  <div class="ai-response">
                    <div class="ai-summary">⚠ 3 deals totalling RM 8.7M are at high risk of slipping past March — all stalled beyond 25 days with no owner activity logged.</div>
                    <div class="ai-kpi-row">
                      <div class="ai-kpi"><div class="ai-kpi-val" style="color:var(--danger)">3</div><div class="ai-kpi-lbl">At Risk</div></div>
                      <div class="ai-kpi"><div class="ai-kpi-val">RM 8.7M</div><div class="ai-kpi-lbl">Combined Value</div></div>
                      <div class="ai-kpi"><div class="ai-kpi-val" style="color:var(--warning)">32d</div><div class="ai-kpi-lbl">Avg Stall</div></div>
                      <div class="ai-kpi"><div class="ai-kpi-val">Q1</div><div class="ai-kpi-lbl">Close Target</div></div>
                    </div>
                    <div class="ai-explanation">These deals were last touched between 25–45 days ago and have not progressed stage. Risk score computed on: days since last activity, stage duration vs benchmark, owner engagement frequency, and sentiment signals from email threads.</div>
                    <table class="ai-mini-table">
                      <thead><tr><th>Deal</th><th>Value</th><th>Stage</th><th>Owner</th><th>Stall</th><th>Risk</th></tr></thead>
                      <tbody>
                        <tr><td><strong>Astro Arena</strong></td><td style="color:var(--magenta)">RM 2.4M</td><td><span class="badge badge-amber">Proposal</span></td><td>Ahmad R.</td><td style="color:var(--danger)">34d</td><td><span class="badge badge-red">Critical</span></td></tr>
                        <tr><td><strong>MyEG Services</strong></td><td style="color:var(--magenta)">RM 2.1M</td><td><span class="badge badge-blue">Negotiation</span></td><td>James O.</td><td style="color:var(--warning)">28d</td><td><span class="badge badge-red">High</span></td></tr>
                        <tr><td><strong>Digi-X Media</strong></td><td style="color:var(--magenta)">RM 4.2M</td><td><span class="badge badge-amber">Proposal</span></td><td>Priya S.</td><td style="color:var(--warning)">25d</td><td><span class="badge badge-amber">Medium</span></td></tr>
                      </tbody>
                    </table>
                    <div class="ai-flag">
                      <i class="fas fa-flag"></i>
                      <div><strong>Risk Rule:</strong> Deals flagged when no CRM activity logged for &gt;21 days at Proposal stage or &gt;14 days at Negotiation. Ahmad R. has 0 emails logged in 5 weeks — escalation recommended.</div>
                    </div>
                    <div class="ai-actions">
                      <div class="ai-action-btn"><i class="fas fa-envelope"></i> Draft escalation email</div>
                      <div class="ai-action-btn"><i class="fas fa-calendar"></i> Schedule deal review</div>
                      <div class="ai-action-btn"><i class="fab fa-microsoft"></i> Share to Teams</div>
                      <div class="ai-action-btn"><i class="fas fa-bookmark"></i> Save insight</div>
                      <div class="ai-action-btn" onclick="fillPrompt('Tell me more about the Astro Arena deal')"><i class="fas fa-magnifying-glass"></i> Drill into Astro Arena</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input -->
            <div class="chat-input-wrap">
              <i class="fas fa-sparkles" style="color:var(--magenta);font-size:14px;flex-shrink:0;margin-bottom:2px"></i>
              <textarea class="chat-input" id="chatInput" rows="1" placeholder="Ask anything about your pipeline, clients, revenue, or team…" onkeydown="handleKey(event)"></textarea>
              <button class="chat-send" onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─ PIPELINE ─ -->
    <div id="screen-pipeline" class="screen ${active==='pipeline'?'active':''}">
      <div class="topbar">
        <div>
          <div class="topbar-title">Pipeline Health</div>
          <div class="topbar-sub">March 2025 · 87 active deals</div>
        </div>
        <div class="topbar-actions">
          <div class="btn-ghost"><i class="fas fa-sliders"></i> Filters</div>
          <div class="btn-ghost"><i class="fas fa-download"></i> Export</div>
          <div class="btn-primary" onclick="window.location='/ask-ai'"><i class="fas fa-sparkles"></i> Ask AI</div>
        </div>
      </div>
      <div class="content">
        <div class="alert-strip">
          <i class="fas fa-circle-exclamation"></i>
          <strong>3 high-value deals</strong> at critical risk · Combined: RM 8.7M · Immediate review recommended
          <span style="margin-left:auto;cursor:pointer;text-decoration:underline">Review Now →</span>
        </div>

        <div class="grid-4" style="margin-bottom:20px">
          <div class="kpi-card accent"><div class="kpi-icon pink"><i class="fas fa-filter"></i></div><div class="kpi-label">Total Pipeline</div><div class="kpi-value">RM 87.4<span>M</span></div><div class="kpi-change down">−2.1% vs last week</div></div>
          <div class="kpi-card"><div class="kpi-icon green"><i class="fas fa-bullseye-arrow"></i></div><div class="kpi-label">Weighted Value</div><div class="kpi-value">RM 41.2<span>M</span></div><div class="kpi-change up">+5.3% vs last month</div></div>
          <div class="kpi-card"><div class="kpi-icon amber"><i class="fas fa-calendar-check"></i></div><div class="kpi-label">Q1 Closing</div><div class="kpi-value">24<span> deals</span></div><div class="kpi-change neutral">RM 22.8M combined</div></div>
          <div class="kpi-card"><div class="kpi-icon red"><i class="fas fa-hourglass-half"></i></div><div class="kpi-label">Avg Deal Cycle</div><div class="kpi-value">47<span> days</span></div><div class="kpi-change down">+6d vs benchmark</div></div>
        </div>

        <div class="grid-62">
          <!-- Funnel -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Pipeline Funnel</div>
              <div style="display:flex;gap:6px">
                <span class="badge badge-gray">All Segments</span>
                <span class="card-action">Stage Config</span>
              </div>
            </div>
            <div class="funnel-wrap">
              ${[
                ['Prospecting','RM 24.1M','41',85,'fill-blue'],
                ['Qualification','RM 18.6M','22',65,'fill-pink'],
                ['Proposal','RM 19.2M','14',50,'fill-amber'],
                ['Negotiation','RM 14.8M','7',38,'fill-green'],
                ['Closing','RM 10.7M','3',24,'fill-green'],
              ].map(([l,v,c,w,f])=>`
              <div class="funnel-stage">
                <div class="funnel-label">${l}</div>
                <div class="funnel-bar-wrap">
                  <div class="funnel-bar-bg">
                    <div class="funnel-bar-fill ${f}" style="width:${w}%"><span>${v}</span></div>
                  </div>
                </div>
                <div class="funnel-count">${c}</div>
              </div>`).join('')}
            </div>
            <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
              <div class="card-title" style="margin-bottom:12px">Stage Conversion</div>
              <div style="display:flex;gap:0;align-items:center;justify-content:space-between">
                ${['Prospect→Qual','Qual→Proposal','Proposal→Nego','Nego→Close'].map((l,i)=>{
                  const vals=['54%','63%','50%','71%'][i];
                  const cs=['fill-amber','fill-green','fill-red','fill-green'][i];
                  return `<div style="text-align:center;flex:1">
                    <div style="font-size:17px;font-weight:800;margin-bottom:3px">${vals}</div>
                    <div style="font-size:10px;color:var(--text-muted)">${l}</div>
                  </div>${i<3?'<div style="color:var(--border-light);font-size:18px">›</div>':''}`
                }).join('')}
              </div>
            </div>
          </div>

          <!-- At-risk deals -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">At-Risk Deals</div>
              <div class="card-action">All 9 →</div>
            </div>
            ${[
              ['Astro Arena','RM 2.4M','Proposal','Ahmad R.','34d','Critical'],
              ['MyEG Services','RM 2.1M','Negotiation','James O.','28d','High'],
              ['Digi-X Media','RM 4.2M','Proposal','Priya S.','25d','Medium'],
              ['Watsons Campaign','RM 890K','Qualification','Chen W.','19d','Medium'],
            ].map(([n,v,s,o,d,r])=>`
            <div class="deal-card">
              <div style="flex:1;min-width:0">
                <div class="deal-name">${n}</div>
                <div class="deal-meta">${s} · ${o}</div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div class="deal-value">${v}</div>
                <div class="deal-prob">${d} stalled</div>
              </div>
              <span class="badge ${r==='Critical'?'badge-red':r==='High'?'badge-red':'badge-amber'}">${r}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- Full Deal Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">All Active Deals — Top 10</div>
            <div style="display:flex;gap:8px">
              <div class="btn-ghost" style="height:30px;font-size:12px;padding:0 12px"><i class="fas fa-sort"></i> Sort</div>
              <div class="card-action">View All 87 →</div>
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Deal Name</th><th>Client</th><th>Value</th><th>Stage</th><th>Owner</th><th>Prob.</th><th>Close Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['Celcom Axiata Q2','Celcom Axiata','RM 4.2M','Negotiation','Priya S.','75%','31 Mar','badge-green','On Track'],
                ['Petronas TVC 2025','Petronas','RM 3.6M','Closing','Ahmad R.','90%','28 Mar','badge-green','Closing'],
                ['TNB Digital Suite','TNB','RM 2.8M','Proposal','Chen W.','40%','15 Apr','badge-blue','In Progress'],
                ['Digi-X Media','Digi-X','RM 4.2M','Proposal','Priya S.','35%','31 Mar','badge-red','At Risk'],
                ['MyEG Services','MyEG','RM 2.1M','Negotiation','James O.','60%','29 Mar','badge-red','At Risk'],
                ['Maxis Enterprise','Maxis','RM 3.1M','Qualification','Ahmad R.','25%','30 Apr','badge-blue','Early Stage'],
                ['RHB Asset Mgt','RHB','RM 1.8M','Proposal','Priya S.','55%','15 Apr','badge-amber','Follow-Up'],
                ['CIMB Niaga','CIMB','RM 2.6M','Closing','Chen W.','85%','31 Mar','badge-green','On Track'],
                ['Astro Arena','Astro','RM 2.4M','Proposal','Ahmad R.','30%','31 Mar','badge-red','Critical'],
                ['Axiata Digital','Axiata','RM 1.9M','Qualification','James O.','20%','30 Apr','badge-gray','Nurturing'],
              ].map(([dn,c,v,s,o,p,cd,b,st])=>`
              <tr>
                <td style="font-weight:600">${dn}</td>
                <td class="muted">${c}</td>
                <td style="font-weight:700;color:var(--magenta)">${v}</td>
                <td><span class="badge ${b==='badge-green'?'badge-blue':b==='badge-red'?'badge-amber':b}">${s}</span></td>
                <td class="muted">${o}</td>
                <td style="font-weight:600">${p}</td>
                <td class="muted">${cd}</td>
                <td><span class="badge ${b}">${st}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ─ CLIENTS ─ -->
    <div id="screen-clients" class="screen ${active==='clients'?'active':''}">
      <div class="topbar">
        <div>
          <div class="topbar-title">Client Intelligence</div>
          <div class="topbar-sub">348 active accounts · 12 flagged for review</div>
        </div>
        <div class="topbar-actions">
          <div class="btn-ghost"><i class="fas fa-magnifying-glass"></i> Search</div>
          <div class="btn-ghost"><i class="fas fa-sliders"></i> Segment</div>
          <div class="btn-primary" onclick="window.location='/ask-ai'"><i class="fas fa-sparkles"></i> Ask AI</div>
        </div>
      </div>
      <div class="content">
        <div class="grid-4">
          <div class="kpi-card accent"><div class="kpi-icon pink"><i class="fas fa-building"></i></div><div class="kpi-label">Active Clients</div><div class="kpi-value">348</div><div class="kpi-change up">+14 new this quarter</div></div>
          <div class="kpi-card"><div class="kpi-icon red"><i class="fas fa-user-slash"></i></div><div class="kpi-label">Churned Risk</div><div class="kpi-value">28</div><div class="kpi-change down">+5 vs last month</div></div>
          <div class="kpi-card"><div class="kpi-icon green"><i class="fas fa-rotate"></i></div><div class="kpi-label">Recovery Pipeline</div><div class="kpi-value">RM 9.2<span>M</span></div><div class="kpi-change neutral">from 34 dormant</div></div>
          <div class="kpi-card"><div class="kpi-icon amber"><i class="fas fa-star"></i></div><div class="kpi-label">NPS Score</div><div class="kpi-value">62</div><div class="kpi-change up">+4 vs Q4</div></div>
        </div>

        <div class="grid-62">
          <!-- Health Map -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Top 10 Clients by YTD Revenue</div>
              <div class="card-action">Full List →</div>
            </div>
            <table class="data-table">
              <thead>
                <tr><th>#</th><th>Client</th><th>Segment</th><th>YTD Rev</th><th>Health</th><th>Last Touch</th><th>Trend</th></tr>
              </thead>
              <tbody>
                ${[
                  ['1','Maxis Bhd','Enterprise','RM 12.4M','92','2d ago','up'],
                  ['2','Celcom Axiata','Enterprise','RM 10.8M','88','1d ago','up'],
                  ['3','Petronas','Enterprise','RM 9.6M','85','3d ago','neutral'],
                  ['4','CIMB Group','Enterprise','RM 7.2M','79','5d ago','neutral'],
                  ['5','Digi Tele.','Mid-Market','RM 5.1M','71','7d ago','down'],
                  ['6','TNB','Enterprise','RM 4.9M','90','1d ago','up'],
                  ['7','RHB Bank','Enterprise','RM 4.2M','68','12d ago','down'],
                  ['8','Watsons MY','Mid-Market','RM 3.8M','44','45d ago','down'],
                  ['9','Axiata Group','Enterprise','RM 3.6M','82','4d ago','neutral'],
                  ['10','MyEG Services','Mid-Market','RM 2.9M','55','18d ago','down'],
                ].map(([r,n,s,v,h,lt,t])=>{
                  const hNum=parseInt(h);
                  const hClass=hNum>=80?'health-green':hNum>=60?'health-amber':'health-red';
                  const tColor=t==='up'?'var(--success)':t==='down'?'var(--danger)':'var(--text-muted)';
                  const tIcon=t==='up'?'↑':t==='down'?'↓':'→';
                  return `<tr>
                    <td style="color:var(--text-muted);font-weight:600">${r}</td>
                    <td style="font-weight:600">${n}</td>
                    <td><span class="badge ${s==='Enterprise'?'badge-blue':'badge-gray'}">${s}</span></td>
                    <td style="font-weight:700;color:var(--magenta)">${v}</td>
                    <td><div class="health-circle ${hClass}">${h}</div></td>
                    <td style="color:${parseInt(lt)>14?'var(--danger)':'var(--text-muted)'};">${lt}</td>
                    <td style="color:${tColor};font-weight:700">${tIcon}</td>
                  </tr>`
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Right panel -->
          <div style="display:flex;flex-direction:column;gap:16px">
            <!-- Health distribution -->
            <div class="card">
              <div class="card-header">
                <div class="card-title">Health Distribution</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px">
                ${[['Healthy (80–100)','214','fill-green',62],['At Risk (60–79)','89','fill-amber',26],['Critical (<60)','45','fill-red',13]].map(([l,c,f,p])=>`
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:12.5px;color:var(--text-secondary)">${l}</span>
                    <span style="font-size:12.5px;font-weight:600">${c} <span style="color:var(--text-muted)">(${p}%)</span></span>
                  </div>
                  <div class="progress-bar-wrap"><div class="progress-bar-fill ${f}" style="width:${p}%"></div></div>
                </div>`).join('')}
              </div>
            </div>

            <!-- Recovery targets -->
            <div class="card">
              <div class="card-header">
                <div class="card-title">Recovery Targets</div>
                <div class="card-action">All 34 →</div>
              </div>
              ${[
                ['Watsons MY','RM 1.1M','45d',88],
                ['Guardian Pharma','RM 780K','62d',72],
                ['Parkson Retail','RM 650K','38d',65],
                ['Focus Point','RM 420K','90d',52],
              ].map(([n,v,d,s])=>`
              <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;margin-bottom:2px">${n}</div>
                  <div style="font-size:11px;color:var(--text-muted)">Inactive ${d} · Potential ${v}</div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:13px;font-weight:700;color:var(--magenta)">${v}</div>
                  <div style="font-size:11px;color:var(--text-muted)">Score ${s}</div>
                </div>
              </div>`).join('')}
            </div>

            <!-- Segment Revenue -->
            <div class="card card-sm">
              <div class="card-header"><div class="card-title">Revenue by Segment</div></div>
              <div style="display:flex;flex-direction:column;gap:8px">
                ${[['Enterprise','RM 98.4M','fill-pink',69],['Mid-Market','RM 32.1M','fill-blue',23],['SMB','RM 8.6M','fill-amber',6],['Public Sector','RM 3.2M','fill-green',2]].map(([l,v,f,p])=>`
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="font-size:12px;color:var(--text-secondary);width:90px">${l}</span>
                  <div class="progress-bar-wrap" style="flex:1"><div class="progress-bar-fill ${f}" style="width:${p*4}%"></div></div>
                  <span style="font-size:12px;font-weight:600;width:70px;text-align:right">${v}</span>
                </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─ SALES ─ -->
    <div id="screen-sales" class="screen ${active==='sales'?'active':''}">
      <div class="topbar">
        <div>
          <div class="topbar-title">Sales Performance</div>
          <div class="topbar-sub">March 2025 · 18 active reps</div>
        </div>
        <div class="topbar-actions">
          <div class="btn-ghost"><i class="fas fa-calendar"></i> Mar 2025</div>
          <div class="btn-ghost"><i class="fas fa-download"></i> Export</div>
          <div class="btn-primary" onclick="window.location='/ask-ai'"><i class="fas fa-sparkles"></i> Ask AI</div>
        </div>
      </div>
      <div class="content">
        <div class="grid-4">
          <div class="kpi-card accent"><div class="kpi-icon pink"><i class="fas fa-trophy"></i></div><div class="kpi-label">Team Attainment</div><div class="kpi-value">94<span>%</span></div><div class="kpi-change up">+3pp vs last month</div></div>
          <div class="kpi-card"><div class="kpi-icon green"><i class="fas fa-circle-check"></i></div><div class="kpi-label">Deals Won MTD</div><div class="kpi-value">17<span> deals</span></div><div class="kpi-change up">RM 18.4M booked</div></div>
          <div class="kpi-card"><div class="kpi-icon amber"><i class="fas fa-phone-volume"></i></div><div class="kpi-label">Total Activities</div><div class="kpi-value">412</div><div class="kpi-change neutral">this week</div></div>
          <div class="kpi-card"><div class="kpi-icon red"><i class="fas fa-user-clock"></i></div><div class="kpi-label">Low-Activity Reps</div><div class="kpi-value">3<span> reps</span></div><div class="kpi-change down">below threshold</div></div>
        </div>

        <div class="grid-62">
          <!-- Leaderboard -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Rep Leaderboard</div>
              <div style="display:flex;gap:6px;align-items:center">
                <span class="badge badge-pink">March 2025</span>
              </div>
            </div>
            ${[
              ['Priya Subramaniam','Enterprise','RM 8.9M','RM 7.5M','118%',12,'fill-green','up'],
              ['Ahmad Razali','Enterprise','RM 7.2M','RM 7.5M','96%',9,'fill-amber','neutral'],
              ['Chen Wei Ling','Mid-Market','RM 5.4M','RM 6.4M','84%',11,'fill-amber','down'],
              ['James Ooi','Mid-Market','RM 3.2M','RM 5.2M','61%',4,'fill-red','down'],
              ['Nurul Ain','SMB','RM 4.1M','RM 4.0M','102%',8,'fill-green','up'],
              ['Siva Kumar','Enterprise','RM 4.8M','RM 6.0M','80%',7,'fill-amber','neutral'],
              ['Lim Kai Xin','Mid-Market','RM 2.9M','RM 4.0M','72%',5,'fill-amber','down'],
              ['Reza Fahmi','Enterprise','RM 6.1M','RM 7.5M','81%',8,'fill-amber','up'],
            ].map(([n,seg,rev,tgt,att,acts,f,t],i)=>{
              const tColor=t==='up'?'var(--success)':t==='down'?'var(--danger)':'var(--text-muted)';
              const tIcon=t==='up'?'↑':t==='down'?'↓':'→';
              const rankClass = i<3 ? 'top' : '';
              return `<div class="rep-row">
                <div class="rep-rank ${rankClass}">${i+1}</div>
                <div style="width:32px;height:32px;border-radius:50%;background:var(--bg-secondary);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text-muted);flex-shrink:0">${n.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                <div style="flex:1;min-width:0">
                  <div class="rep-name">${n}</div>
                  <div class="rep-team">${seg} · ${acts} activities</div>
                  <div style="margin-top:5px">
                    <div class="progress-bar-wrap" style="height:4px"><div class="progress-bar-fill ${f}" style="width:${Math.min(parseInt(att),100)}%"></div></div>
                  </div>
                </div>
                <div style="text-align:right;flex-shrink:0">
                  <div class="rep-attain" style="color:${parseInt(att)>=100?'var(--success)':parseInt(att)>=80?'var(--warning)':'var(--danger)'}">${att}</div>
                  <div class="rep-deals">${rev}</div>
                </div>
                <div style="font-size:16px;color:${tColor};width:16px;flex-shrink:0;font-weight:700">${tIcon}</div>
              </div>`
            }).join('')}
          </div>

          <!-- Right panels -->
          <div style="display:flex;flex-direction:column;gap:16px">
            <!-- Activity vs Pipeline -->
            <div class="card">
              <div class="card-header">
                <div class="card-title">Activity vs Pipeline</div>
                <div class="badge badge-red">3 Low-Activity</div>
              </div>
              <div class="alert-strip amber" style="margin-bottom:12px;padding:9px 12px">
                <i class="fas fa-exclamation-triangle"></i>
                James Ooi: 4 activities, RM 5.2M pipeline — critical gap
              </div>
              ${[
                ['Priya S.','12 acts','RM 8.9M pipe',95,'fill-green'],
                ['Ahmad R.','9 acts','RM 7.2M pipe',72,'fill-green'],
                ['Chen W.','11 acts','RM 5.4M pipe',88,'fill-amber'],
                ['James O.','4 acts','RM 5.2M pipe',25,'fill-red'],
                ['Nurul A.','8 acts','RM 4.1M pipe',80,'fill-amber'],
              ].map(([n,a,p,s,f])=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
                <div style="flex:1">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                    <span style="font-size:12.5px;font-weight:600">${n}</span>
                    <span style="font-size:11px;color:var(--text-muted)">${a} · ${p}</span>
                  </div>
                  <div class="progress-bar-wrap" style="height:4px"><div class="progress-bar-fill ${f}" style="width:${s}%"></div></div>
                </div>
                <div style="font-size:13px;font-weight:700;width:36px;text-align:right;color:${s>70?'var(--success)':s>40?'var(--warning)':'var(--danger)'}">${s}</div>
              </div>`).join('')}
            </div>

            <!-- Monthly Target -->
            <div class="card">
              <div class="card-header"><div class="card-title">Monthly Progress</div></div>
              <div style="display:flex;flex-direction:column;gap:12px">
                ${[['Revenue','RM 18.4M','RM 19.6M',94,'fill-amber'],['Deals Won','17','18',94,'fill-amber'],['New Logos','5','6',83,'fill-red'],['Renewals','12','12',100,'fill-green']].map(([l,a,t,p,f])=>`
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:12.5px;color:var(--text-secondary)">${l}</span>
                    <span style="font-size:12.5px;font-weight:600">${a} / ${t} <span style="color:var(--text-muted)">(${p}%)</span></span>
                  </div>
                  <div class="progress-bar-wrap"><div class="progress-bar-fill ${f}" style="width:${p}%"></div></div>
                </div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Win/Loss by reason -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Recent Deals Won / Lost</div>
            <div class="card-action">Full History →</div>
          </div>
          <table class="data-table">
            <thead><tr><th>Deal</th><th>Value</th><th>Rep</th><th>Outcome</th><th>Close Date</th><th>Reason</th><th>Next Step</th></tr></thead>
            <tbody>
              ${[
                ['Maxis Enterprise','RM 3.8M','Priya S.','Won','25 Mar','Strong relationship + competitive price','Onboarding'],
                ['CIMB Digital','RM 2.6M','Chen W.','Won','22 Mar','Sole proposal accepted','Contracting'],
                ['Digi Tele. Q1','RM 1.9M','James O.','Lost','20 Mar','Lost on price to competitor','Debrief'],
                ['Suria KLCC','RM 1.4M','Ahmad R.','Lost','18 Mar','Budget freeze','Re-engage Q3'],
                ['Parkson Group','RM 2.2M','Nurul A.','Won','15 Mar','Best ROI case','Onboarding'],
              ].map(([dn,v,r,o,d,rs,ns])=>`
              <tr>
                <td style="font-weight:600">${dn}</td>
                <td style="font-weight:700;color:var(--magenta)">${v}</td>
                <td class="muted">${r}</td>
                <td><span class="badge ${o==='Won'?'badge-green':'badge-red'}">${o}</span></td>
                <td class="muted">${d}</td>
                <td style="font-size:12px;color:var(--text-secondary)">${rs}</td>
                <td class="muted" style="font-size:12px">${ns}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ─ DIGEST ─ -->
    <div id="screen-digest" class="screen ${active==='digest'?'active':''}">
      <div class="topbar">
        <div>
          <div class="topbar-title">Executive Daily Digest</div>
          <div class="topbar-sub">AI-curated · 27 March 2025</div>
        </div>
        <div class="topbar-actions">
          <div class="btn-ghost"><i class="fas fa-envelope"></i> Email Digest</div>
          <div class="btn-primary"><i class="fab fa-microsoft"></i> Share to Teams</div>
        </div>
      </div>
      <div class="content">
        <!-- Digest header -->
        <div class="digest-header">
          <div style="flex:1">
            <div class="digest-date">Thursday · 27 March 2025 · Week 13</div>
            <div class="digest-title">Good morning, Dato' Lee —<br>here's your business at a glance.</div>
            <div class="digest-sub">3 urgent items need your attention. Revenue is tracking at 94% of Q1 target with 4 days remaining. 1 new critical risk identified overnight by AI monitoring.</div>
            <div style="display:flex;gap:8px;margin-top:16px">
              <div class="btn-primary" style="height:34px" onclick="window.location='/ask-ai'"><i class="fas fa-sparkles"></i> Dig Deeper with AI</div>
              <div class="btn-ghost" style="height:34px"><i class="fas fa-print"></i> Print Digest</div>
            </div>
          </div>
          <div class="digest-score">
            <div class="score-ring">
              <div class="score-val">94</div>
              <div class="score-lbl">Business Score</div>
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:8px;text-align:center">vs 91 last week</div>
          </div>
        </div>

        <div class="grid-4" style="margin-bottom:20px">
          <div class="kpi-card accent"><div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div><div class="kpi-label">YTD Revenue</div><div class="kpi-value">RM 142.3<span>M</span></div><div class="kpi-change up">94% of target · +12.4% YoY</div></div>
          <div class="kpi-card"><div class="kpi-icon red"><i class="fas fa-triangle-exclamation"></i></div><div class="kpi-label">Urgent Flags</div><div class="kpi-value">3</div><div class="kpi-change down">+1 new since yesterday</div></div>
          <div class="kpi-card"><div class="kpi-icon green"><i class="fas fa-handshake"></i></div><div class="kpi-label">Deals Expected</div><div class="kpi-value">6<span> this week</span></div><div class="kpi-change neutral">RM 14.2M combined</div></div>
          <div class="kpi-card"><div class="kpi-icon amber"><i class="fas fa-users"></i></div><div class="kpi-label">Meetings Today</div><div class="kpi-value">4</div><div class="kpi-change neutral">2 strategic, 2 review</div></div>
        </div>

        <div class="grid-62">
          <!-- Insights -->
          <div>
            <div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px">Urgent — Action Required</div>

            <div class="insight-card urgent">
              <div class="insight-icon" style="background:rgba(255,71,87,0.1);color:var(--danger)"><i class="fas fa-triangle-exclamation"></i></div>
              <div style="flex:1">
                <div class="insight-title">Astro Arena deal — 34 days without activity</div>
                <div class="insight-body">RM 2.4M Proposal-stage deal owned by Ahmad Razali. No CRM activity, emails, or meeting logged. Competitor reported active. Risk of Q1 miss is high. Recommend immediate manager intervention.</div>
                <div class="insight-meta"><span class="badge badge-red">Critical Risk</span> &nbsp; Last touch: 21 Feb &nbsp; · &nbsp; Owner: Ahmad R.</div>
                <div style="display:flex;gap:8px;margin-top:10px">
                  <div class="ai-action-btn" style="background:rgba(255,71,87,0.08);border-color:rgba(255,71,87,0.2);color:var(--danger)"><i class="fas fa-phone"></i> Escalate Now</div>
                  <div class="ai-action-btn"><i class="fas fa-magnifying-glass"></i> View Deal</div>
                </div>
              </div>
            </div>

            <div class="insight-card urgent">
              <div class="insight-icon" style="background:rgba(255,71,87,0.1);color:var(--danger)"><i class="fas fa-chart-line-down"></i></div>
              <div style="flex:1">
                <div class="insight-title">James Ooi — critically low activity vs pipeline</div>
                <div class="insight-body">4 logged activities this month against RM 5.2M pipeline. Activity/pipeline ratio is 5× below team average. 2 deals at Negotiation stage at risk of stalling. Coaching or re-assignment needed.</div>
                <div class="insight-meta"><span class="badge badge-red">Performance Flag</span> &nbsp; 61% attainment · 28d to Q-end</div>
                <div style="display:flex;gap:8px;margin-top:10px">
                  <div class="ai-action-btn"><i class="fas fa-calendar"></i> Schedule 1:1</div>
                  <div class="ai-action-btn"><i class="fas fa-chart-bar"></i> View Profile</div>
                </div>
              </div>
            </div>

            <div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin:20px 0 12px">Positive Signals</div>

            <div class="insight-card positive">
              <div class="insight-icon" style="background:rgba(0,214,143,0.1);color:var(--success)"><i class="fas fa-trophy"></i></div>
              <div style="flex:1">
                <div class="insight-title">Priya Subramaniam — 118% attainment, 4 deals in closing</div>
                <div class="insight-body">Top performer this month. Closed Maxis RM 3.8M yesterday. Has 4 deals at Closing stage worth RM 12.1M — highest close probability on team. Pipeline is clean and well-documented.</div>
                <div class="insight-meta"><span class="badge badge-green">Star Performer</span> &nbsp; 12 activities · NPS avg 4.6/5</div>
              </div>
            </div>

            <div class="insight-card positive">
              <div class="insight-icon" style="background:rgba(0,214,143,0.1);color:var(--success)"><i class="fas fa-building-circle-check"></i></div>
              <div style="flex:1">
                <div class="insight-title">Celcom Axiata — expanded scope, +RM 1.2M upsell</div>
                <div class="insight-body">Client health score increased to 88. Account team secured upsell approval for Q2 digital campaign. Contract amendment in progress. Renewal probability: 94%.</div>
                <div class="insight-meta"><span class="badge badge-green">Upsell Win</span> &nbsp; Client since 2019 · Tier 1 Enterprise</div>
              </div>
            </div>

            <div style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin:20px 0 12px">Market & Forecast Intelligence</div>

            <div class="insight-card info">
              <div class="insight-icon" style="background:rgba(91,141,238,0.1);color:var(--info)"><i class="fas fa-chart-bar"></i></div>
              <div style="flex:1">
                <div class="insight-title">Q1 Forecast: 94% likely to close — RM 9.1M gap</div>
                <div class="insight-body">With 4 working days remaining in Q1, the RM 9.1M gap is within reach if Celcom Axiata and Petronas TVC close on schedule. Weighted probability model gives 68% chance of hitting 100% target.</div>
                <div class="insight-meta"><span class="badge badge-blue">Forecast Update</span> &nbsp; Model refreshed 06:00 today</div>
              </div>
            </div>

            <div class="insight-card warning">
              <div class="insight-icon" style="background:rgba(255,179,71,0.1);color:var(--warning)"><i class="fas fa-rotate-left"></i></div>
              <div style="flex:1">
                <div class="insight-title">5 dormant accounts — RM 3.9M recovery opportunity</div>
                <div class="insight-body">AI identified 5 high-LTV clients inactive 60+ days with strong re-engagement potential. Watsons MY alone represents RM 1.1M. Recommended: personalised re-engagement campaign this week.</div>
                <div class="insight-meta"><span class="badge badge-amber">Recovery</span> &nbsp; Avg inactivity: 68 days</div>
                <div style="display:flex;gap:8px;margin-top:10px">
                  <div class="ai-action-btn"><i class="fas fa-envelope"></i> Draft outreach</div>
                  <div class="ai-action-btn" onclick="window.location='/clients'"><i class="fas fa-building"></i> View Accounts</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Today's schedule + meeting notes -->
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card">
              <div class="card-header"><div class="card-title">Today's Schedule</div></div>
              ${[
                ['09:30','Pipeline Review','Management','60m','badge-pink'],
                ['11:00','Client Call — Celcom','Priya S.','45m','badge-green'],
                ['14:00','Deal Escalation — Ahmad R.','1-on-1','30m','badge-red'],
                ['16:00','Q1 Forecast Briefing','Exec Team','90m','badge-blue'],
              ].map(([t,e,p,d,b])=>`
              <div style="display:flex;gap:14px;padding:11px 0;border-bottom:1px solid var(--border);align-items:flex-start">
                <div style="font-size:12px;font-weight:600;color:var(--magenta);width:40px;flex-shrink:0;padding-top:1px">${t}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;margin-bottom:2px">${e}</div>
                  <div style="font-size:11px;color:var(--text-muted)">${p} · ${d}</div>
                </div>
                <span class="badge ${b}" style="flex-shrink:0">${d}</span>
              </div>`).join('')}
            </div>

            <div class="card">
              <div class="card-header"><div class="card-title">Week Snapshot</div></div>
              ${[['Deals Closing','6','this week'],['Pipeline Change','+RM 1.2M','vs Mon'],['Activities Logged','87','team total'],['AI Queries','24','by 6 users']].map(([l,v,s])=>`
              <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)">
                <span style="font-size:12.5px;color:var(--text-secondary)">${l}</span>
                <div style="text-align:right">
                  <div style="font-size:14px;font-weight:700">${v}</div>
                  <div style="font-size:10.5px;color:var(--text-muted)">${s}</div>
                </div>
              </div>`).join('')}
            </div>

            <div class="card">
              <div class="card-header"><div class="card-title">AI Recommendations</div></div>
              ${[
                ['Escalate Astro Arena deal to leadership','fas fa-exclamation-circle','var(--danger)'],
                ['Review James Ooi pipeline this week','fas fa-user-clock','var(--warning)'],
                ['Activate Watsons re-engagement now','fas fa-rotate-left','var(--warning)'],
                ['Book Petronas contract signing','fas fa-signature','var(--success)'],
              ].map(([t,i,c])=>`
              <div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
                <i class="${i}" style="color:${c};margin-top:2px;font-size:13px;flex-shrink:0"></i>
                <div style="font-size:12.5px;color:var(--text-primary);line-height:1.5">${t}</div>
              </div>`).join('')}
              <div style="margin-top:12px">
                <div class="btn-primary" onclick="window.location='/ask-ai'" style="width:100%;justify-content:center"><i class="fas fa-sparkles"></i> Ask AI for More Insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</div>

<script>
// ─── Charts ───
window.addEventListener('DOMContentLoaded', () => {
  // Revenue Chart
  const revCtx = document.getElementById('revChart');
  if (revCtx) {
    new Chart(revCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [18.4, 21.2, 24.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
              gradient.addColorStop(0, 'rgba(224,0,122,0.8)');
              gradient.addColorStop(1, 'rgba(224,0,122,0.2)');
              return gradient;
            },
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Target',
            data: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            type: 'line',
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: false,
            tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: {
          backgroundColor: '#1a1a2e', borderColor: '#252540', borderWidth: 1,
          titleColor: '#fff', bodyColor: '#8888aa',
          callbacks: {
            label: (ctx) => ' RM ' + ctx.parsed.y + 'M'
          }
        }},
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#55557a', font: { size: 11 } }, border: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#55557a', font: { size: 11 }, callback: v => 'RM '+v+'M' }, border: { display: false } }
        }
      }
    });
  }
});

// ─── Chat ───
function fillPrompt(text) {
  const input = document.getElementById('chatInput');
  if (input) { input.value = text; input.focus(); }
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const win = document.getElementById('chatWindow');
  if (!input || !win || !input.value.trim()) return;
  const msg = input.value.trim();
  input.value = '';

  // User message
  win.innerHTML += '<div class="msg-row user fade-in"><div class="msg-avatar user"><i class="fas fa-user"></i></div><div class="msg-bubble user">' + msg + '</div></div>';

  // Typing indicator
  win.innerHTML += '<div class="msg-row fade-in" id="typingRow"><div class="msg-avatar ai"><i class="fas fa-sparkles"></i></div><div class="msg-bubble ai"><div class="typing"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div></div>';
  win.scrollTop = win.scrollHeight;

  setTimeout(() => {
    const tr = document.getElementById('typingRow');
    if (tr) tr.remove();
    win.innerHTML += '<div class="msg-row fade-in"><div class="msg-avatar ai"><i class="fas fa-sparkles"></i></div><div class="msg-bubble ai"><div class="ai-response"><div class="ai-summary">Here is the AI-generated analysis for: <em>' + msg + '</em></div><div class="ai-explanation" style="margin-top:8px">This is a prototype demonstration. In production, this response would contain real-time structured data from your CRM, pipeline, and revenue systems — including key numbers, a supporting table, and actionable flags.</div><div class="ai-actions"><div class="ai-action-btn"><i class="fas fa-bookmark"></i> Save insight</div><div class="ai-action-btn"><i class="fab fa-microsoft"></i> Share to Teams</div><div class="ai-action-btn"><i class="fas fa-expand"></i> Drill deeper</div></div></div></div></div>';
    win.scrollTop = win.scrollHeight;
  }, 1800);
}
</script>
</body>
</html>`
}

export default app
