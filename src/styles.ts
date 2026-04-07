export const CSS = `
  :root {
    --bg-base:        #060610;
    --bg-primary:     #07070f;
    --bg-secondary:   #0b0b1a;
    --bg-card:        #0f0f1f;
    --bg-card-hover:  #14142a;
    --bg-glass:       rgba(15,15,31,0.85);
    --bg-input:       #09091a;
    --border:         rgba(255,255,255,0.06);
    --border-light:   rgba(255,255,255,0.1);
    --border-mid:     rgba(255,255,255,0.08);
    --text-primary:   #f0f0ff;
    --text-secondary: #8080a8;
    --text-muted:     #48486a;
    --magenta:        #e2007a;
    --magenta-bright: #ff0099;
    --magenta-mid:    #c8006c;
    --magenta-dim:    #8c004a;
    --magenta-glow:   rgba(226,0,122,0.10);
    --magenta-glow2:  rgba(226,0,122,0.20);
    --magenta-glow3:  rgba(226,0,122,0.30);
    --pink-gradient:  linear-gradient(135deg, #e2007a 0%, #ff4db8 100%);
    --pink-gradient2: linear-gradient(135deg, #c8006c 0%, #e2007a 50%, #ff4db8 100%);
    --success:     #00d68f;
    --success-dim: rgba(0,214,143,0.12);
    --warning:     #f59e0b;
    --warning-dim: rgba(245,158,11,0.12);
    --danger:      #f43f5e;
    --danger-dim:  rgba(244,63,94,0.12);
    --info:        #60a5fa;
    --info-dim:    rgba(96,165,250,0.12);
    --purple:      #a78bfa;
    --purple-dim:  rgba(167,139,250,0.12);
    --teal:        #2dd4bf;
    --teal-dim:    rgba(45,212,191,0.12);
    --orange:      #fb923c;
    --orange-dim:  rgba(251,146,60,0.12);
    --sidebar-w:   256px;
    --topbar-h:    58px;
    --radius:      14px;
    --radius-sm:   10px;
    --radius-xs:   7px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    height: 100%;
    background: var(--bg-base);
    color: var(--text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* ═══════════════════════════════════════════════════
     LAYOUT
  ═══════════════════════════════════════════════════ */
  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ═══════════════════════════════════════════════════
     SIDEBAR
  ═══════════════════════════════════════════════════ */
  .sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 20;
    overflow: hidden;
  }
  .sidebar::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 200px;
    background: radial-gradient(ellipse at 50% -20%, rgba(226,0,122,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .sidebar-logo {
    padding: 22px 20px 20px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .logo-img {
    display: block;
    width: 160px;
    height: auto;
    filter: brightness(1.05) saturate(1.1);
    margin: 0 auto;
  }
  .logo-sub {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 2.8px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-top: 6px;
    text-align: center;
    padding-left: 1px;
  }

  .sidebar-nav {
    flex: 1;
    padding: 14px 10px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border-light) transparent;
  }
  .sidebar-nav::-webkit-scrollbar { width: 3px; }
  .sidebar-nav::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

  .nav-section {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: var(--text-muted);
    text-transform: uppercase;
    padding: 14px 10px 5px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 11px;
    border-radius: var(--radius-xs);
    color: var(--text-secondary);
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.18s ease;
    margin-bottom: 1px;
    border: 1px solid transparent;
    white-space: nowrap;
    overflow: hidden;
  }
  .nav-item:hover {
    background: rgba(255,255,255,0.04);
    color: var(--text-primary);
  }
  .nav-item.active {
    background: var(--magenta-glow);
    color: var(--text-primary);
    border-color: rgba(226,0,122,0.20);
    font-weight: 600;
  }
  .nav-item.active .ni { color: var(--magenta); }
  .ni {
    width: 15px;
    text-align: center;
    font-size: 11px;
    color: var(--text-muted);
    flex-shrink: 0;
    transition: color 0.18s;
  }
  .nav-item:hover .ni { color: var(--text-secondary); }

  .nav-sub { padding-left: 10px; }
  .nav-sub .nav-item { font-size: 12px; padding: 7px 11px; }

  .nav-badge {
    margin-left: auto;
    background: var(--magenta);
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    padding: 1.5px 6px;
    border-radius: 20px;
    flex-shrink: 0;
  }
  .nav-badge-green { background: var(--success); }
  .nav-badge-blue  { background: var(--info); }

  .sidebar-footer {
    padding: 10px;
    border-top: 1px solid var(--border);
  }
  .user-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 11px;
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: background 0.18s;
  }
  .user-card:hover { background: rgba(255,255,255,0.04); }
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--pink-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
    letter-spacing: -0.3px;
  }
  .user-name  { font-size: 12.5px; font-weight: 600; }
  .user-role  { font-size: 10px;   color: var(--text-muted); }

  /* ═══════════════════════════════════════════════════
     MAIN / TOPBAR / CONTENT
  ═══════════════════════════════════════════════════ */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
  }

  .topbar {
    height: var(--topbar-h);
    flex-shrink: 0;
    background: rgba(11,11,26,0.95);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 26px;
    gap: 14px;
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .topbar-left  { flex: 1; min-width: 0; }
  .topbar-title { font-size: 14.5px; font-weight: 700; letter-spacing: -0.2px; }
  .topbar-sub   {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 1px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .topbar-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 22px 26px 28px;
    scrollbar-width: thin;
    scrollbar-color: var(--border-light) transparent;
  }
  .content::-webkit-scrollbar { width: 4px; }
  .content::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

  /* ═══════════════════════════════════════════════════
     BUTTONS
  ═══════════════════════════════════════════════════ */
  .btn-primary {
    height: 34px;
    padding: 0 15px;
    border-radius: var(--radius-xs);
    background: var(--pink-gradient);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: opacity 0.15s, transform 0.1s;
    font-family: inherit;
    white-space: nowrap;
    letter-spacing: 0.1px;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    height: 34px;
    padding: 0 13px;
    border-radius: var(--radius-xs);
    background: transparent;
    color: var(--text-secondary);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid var(--border-light);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: all 0.15s;
    font-family: inherit;
    white-space: nowrap;
  }
  .btn-ghost:hover {
    color: var(--text-primary);
    border-color: var(--border-light);
    background: rgba(255,255,255,0.04);
  }

  .btn-icon {
    width: 34px;
    height: 34px;
    border-radius: var(--radius-xs);
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .btn-icon:hover { color: var(--text-primary); background: var(--bg-card-hover); }

  /* ═══════════════════════════════════════════════════
     CARDS
  ═══════════════════════════════════════════════════ */
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    position: relative;
  }
  .card-sm { padding: 14px 16px; }
  .card-xs { padding: 11px 14px; }
  .card-lg { padding: 24px 26px; }

  .card-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .card-title {
    font-size: 10.5px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }
  .card-action {
    font-size: 11px;
    color: var(--magenta);
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.15s;
    white-space: nowrap;
  }
  .card-action:hover { opacity: 0.75; }

  /* Card variants */
  .card-accent {
    border-color: rgba(226,0,122,0.22);
  }
  .card-accent::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--pink-gradient);
    border-radius: var(--radius) var(--radius) 0 0;
  }

  /* ═══════════════════════════════════════════════════
     KPI TILES
  ═══════════════════════════════════════════════════ */
  .kpi-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 18px; }
  .kpi-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 18px; }
  .kpi-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 18px; }

  .kpi {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.15s;
    cursor: default;
  }
  .kpi::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 80px; height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%);
    pointer-events: none;
  }
  .kpi:hover { border-color: var(--border-light); transform: translateY(-1px); }
  .kpi.accent {
    border-color: rgba(226,0,122,0.25);
    background: linear-gradient(135deg, var(--bg-card) 0%, rgba(226,0,122,0.04) 100%);
  }
  .kpi.accent::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--pink-gradient);
  }

  .kpi-lbl {
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 10px;
  }
  .kpi-val {
    font-size: 27px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }
  .kpi-val sup {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    vertical-align: super;
  }
  .kpi-chg {
    font-size: 11px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .kpi-chg.up   { color: var(--success); }
  .kpi-chg.down { color: var(--danger);  }
  .kpi-chg.flat { color: var(--text-muted); }

  .kpi-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }
  .kpi-icon.pink   { background: var(--magenta-glow);   color: var(--magenta); }
  .kpi-icon.green  { background: var(--success-dim);    color: var(--success); }
  .kpi-icon.amber  { background: var(--warning-dim);    color: var(--warning); }
  .kpi-icon.blue   { background: var(--info-dim);       color: var(--info); }
  .kpi-icon.red    { background: var(--danger-dim);     color: var(--danger); }
  .kpi-icon.purple { background: var(--purple-dim);     color: var(--purple); }
  .kpi-icon.teal   { background: var(--teal-dim);       color: var(--teal); }
  .kpi-icon.orange { background: var(--orange-dim);     color: var(--orange); }

  /* ═══════════════════════════════════════════════════
     GRID LAYOUTS
  ═══════════════════════════════════════════════════ */
  .g2  { display: grid; grid-template-columns: repeat(2,1fr);   gap: 16px; margin-bottom: 18px; }
  .g3  { display: grid; grid-template-columns: repeat(3,1fr);   gap: 16px; margin-bottom: 18px; }
  .g4  { display: grid; grid-template-columns: repeat(4,1fr);   gap: 14px; margin-bottom: 18px; }
  .g62 { display: grid; grid-template-columns: 1fr 340px;       gap: 16px; margin-bottom: 18px; }
  .g26 { display: grid; grid-template-columns: 340px 1fr;       gap: 16px; margin-bottom: 18px; }
  .g73 { display: grid; grid-template-columns: 1fr 290px;       gap: 16px; margin-bottom: 18px; }
  .g37 { display: grid; grid-template-columns: 290px 1fr;       gap: 16px; margin-bottom: 18px; }

  /* ═══════════════════════════════════════════════════
     TABLE
  ═══════════════════════════════════════════════════ */
  .tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .tbl th {
    text-align: left;
    padding: 9px 13px;
    font-size: 9.5px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
    background: transparent;
  }
  .tbl td {
    padding: 11px 13px;
    border-bottom: 1px solid var(--border);
    color: var(--text-primary);
    vertical-align: middle;
  }
  .tbl tr:last-child td { border-bottom: none; }
  .tbl tr:hover td { background: rgba(255,255,255,0.025); }
  .tbl td.dim { color: var(--text-secondary); }

  /* ═══════════════════════════════════════════════════
     BADGES
  ═══════════════════════════════════════════════════ */
  .b {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2.5px 8px;
    border-radius: 20px;
    font-size: 10.5px;
    font-weight: 600;
    white-space: nowrap;
    letter-spacing: 0.2px;
  }
  .b-green  { background: var(--success-dim);  color: var(--success); }
  .b-amber  { background: var(--warning-dim);  color: var(--warning); }
  .b-red    { background: var(--danger-dim);   color: var(--danger);  }
  .b-blue   { background: var(--info-dim);     color: var(--info);    }
  .b-pink   { background: var(--magenta-glow); color: var(--magenta); }
  .b-gray   { background: rgba(128,128,168,0.1); color: var(--text-secondary); }
  .b-purple { background: var(--purple-dim);   color: var(--purple);  }
  .b-teal   { background: var(--teal-dim);     color: var(--teal);    }
  .b-orange { background: var(--orange-dim);   color: var(--orange);  }

  /* ═══════════════════════════════════════════════════
     PROGRESS BARS
  ═══════════════════════════════════════════════════ */
  .prog-wrap {
    background: rgba(255,255,255,0.05);
    border-radius: 20px;
    height: 5px;
    overflow: hidden;
  }
  .prog-fill { height: 100%; border-radius: 20px; transition: width 0.6s ease; }
  .pf-pink   { background: var(--pink-gradient); }
  .pf-green  { background: linear-gradient(90deg, var(--success), #00ffb2); }
  .pf-amber  { background: linear-gradient(90deg, var(--warning), #fcd34d); }
  .pf-red    { background: linear-gradient(90deg, var(--danger),  #fb7185); }
  .pf-blue   { background: linear-gradient(90deg, var(--info),    #93c5fd); }
  .pf-purple { background: linear-gradient(90deg, var(--purple),  #c4b5fd); }
  .pf-teal   { background: linear-gradient(90deg, var(--teal),    #5eead4); }
  .pf-orange { background: linear-gradient(90deg, var(--orange),  #fdba74); }

  /* ═══════════════════════════════════════════════════
     DIVIDERS + SPACING
  ═══════════════════════════════════════════════════ */
  .divider { height: 1px; background: var(--border); margin: 14px 0; }
  .mb12 { margin-bottom: 12px; }
  .mb14 { margin-bottom: 14px; }
  .mb16 { margin-bottom: 16px; }
  .mb18 { margin-bottom: 18px; }
  .mb20 { margin-bottom: 20px; }
  .mt12 { margin-top: 12px; }
  .mt14 { margin-top: 14px; }

  /* ═══════════════════════════════════════════════════
     ALERTS / NOTICES
  ═══════════════════════════════════════════════════ */
  .alert {
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 12px;
    margin-bottom: 14px;
    line-height: 1.4;
  }
  .alert i { flex-shrink: 0; font-size: 13px; }
  .alert-red    { background: rgba(244,63,94,0.06);   border: 1px solid rgba(244,63,94,0.2);  color: var(--danger);  }
  .alert-amber  { background: rgba(245,158,11,0.06);  border: 1px solid rgba(245,158,11,0.2); color: var(--warning); }
  .alert-green  { background: rgba(0,214,143,0.06);   border: 1px solid rgba(0,214,143,0.2);  color: var(--success); }
  .alert-blue   { background: rgba(96,165,250,0.06);  border: 1px solid rgba(96,165,250,0.2); color: var(--info);    }
  .alert-pink   { background: var(--magenta-glow);    border: 1px solid rgba(226,0,122,0.2);  color: var(--magenta); }

  /* ═══════════════════════════════════════════════════
     TABS
  ═══════════════════════════════════════════════════ */
  .tabs {
    display: flex;
    gap: 4px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 4px;
    margin-bottom: 20px;
    width: fit-content;
  }
  .tab {
    padding: 7px 16px;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  .tab.active {
    background: var(--bg-card);
    color: var(--text-primary);
    border-color: var(--border-light);
  }
  .tab:hover:not(.active) { color: var(--text-primary); }

  /* ═══════════════════════════════════════════════════
     SECTION HEADER
  ═══════════════════════════════════════════════════ */
  .sec-hd    { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .sec-title { font-size: 14px; font-weight: 700; letter-spacing: -0.2px; }
  .sec-sub   { font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }
  .sec-label { font-size: 8.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }

  /* ═══════════════════════════════════════════════════
     WELCOME BANNER
  ═══════════════════════════════════════════════════ */
  .banner {
    background: linear-gradient(135deg, #0a0a1e 0%, #120830 50%, #0a0a1e 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 26px 30px;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
  }
  .banner::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(226,0,122,0.14) 0%, transparent 65%);
    pointer-events: none;
  }
  .banner::after {
    content: '';
    position: absolute;
    bottom: -60px; left: 40%;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 65%);
    pointer-events: none;
  }
  .banner-eyebrow { font-size: 10.5px; color: var(--magenta); font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
  .banner-title   { font-size: 22px; font-weight: 800; letter-spacing: -0.4px; margin-bottom: 8px; line-height: 1.2; }
  .banner-title span { color: var(--magenta); }
  .banner-desc    { font-size: 13px; color: var(--text-secondary); max-width: 580px; line-height: 1.65; margin-bottom: 20px; }

  .quick-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    padding: 6px 13px;
    border-radius: 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border-light);
    font-size: 11.5px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
  }
  .pill:hover {
    border-color: var(--magenta);
    color: var(--text-primary);
    background: var(--magenta-glow);
  }

  /* ═══════════════════════════════════════════════════
     STATUS DOTS
  ═══════════════════════════════════════════════════ */
  .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
  .dot-green  { background: var(--success); box-shadow: 0 0 6px rgba(0,214,143,0.5); }
  .dot-amber  { background: var(--warning); }
  .dot-red    { background: var(--danger);  }
  .dot-blue   { background: var(--info);    }
  .dot-pink   { background: var(--magenta); }
  .dot-pulse  { animation: pulse-dot 2s infinite; }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ═══════════════════════════════════════════════════
     CHAT / ASK AI
  ═══════════════════════════════════════════════════ */
  .chat-wrap {
    display: flex;
    gap: 14px;
    height: calc(100vh - var(--topbar-h) - 40px);
  }
  .chat-side {
    width: 236px;
    flex-shrink: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow-y: auto;
    padding: 14px;
    scrollbar-width: thin;
    scrollbar-color: var(--border-light) transparent;
  }
  .chat-side::-webkit-scrollbar { width: 3px; }
  .chat-side::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

  .chat-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }

  .chat-win {
    flex: 1;
    overflow-y: auto;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px;
    margin-bottom: 10px;
    scrollbar-width: thin;
    scrollbar-color: var(--border-light) transparent;
  }
  .chat-win::-webkit-scrollbar { width: 3px; }
  .chat-win::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

  .msg-row { display: flex; gap: 10px; margin-bottom: 22px; }
  .msg-row.user { flex-direction: row-reverse; }

  .msg-av {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    margin-top: 1px;
  }
  .msg-av.ai   { background: var(--pink-gradient); color: #fff; }
  .msg-av.user {
    background: var(--bg-secondary);
    border: 1px solid var(--border-light);
    color: var(--text-muted);
  }

  .msg-bub {
    max-width: 84%;
    padding: 14px 17px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.65;
  }
  .msg-bub.ai {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 4px 14px 14px 14px;
  }
  .msg-bub.user {
    background: var(--magenta-glow);
    border: 1px solid rgba(226,0,122,0.20);
    border-radius: 14px 4px 14px 14px;
  }

  .ai-sum  { font-size: 14px; font-weight: 700; margin-bottom: 12px; line-height: 1.4; }
  .ai-kpis { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .ai-kpi  {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    min-width: 80px;
  }
  .ai-kpi-v { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
  .ai-kpi-l { font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
  .ai-exp   { font-size: 12.5px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 12px; }
  .ai-flag  {
    background: rgba(244,63,94,0.06);
    border: 1px solid rgba(244,63,94,0.18);
    border-radius: 8px;
    padding: 10px 13px;
    font-size: 11.5px;
    color: var(--danger);
    display: flex;
    gap: 9px;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .ai-acts { display: flex; gap: 7px; flex-wrap: wrap; margin-top: 10px; }
  .ai-act {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    background: transparent;
    border: 1px solid var(--border-light);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: inherit;
  }
  .ai-act:hover { color: var(--text-primary); border-color: var(--magenta); background: var(--magenta-glow); }

  .chat-input-row {
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 10px 14px;
    display: flex;
    align-items: flex-end;
    gap: 9px;
    transition: border-color 0.15s;
  }
  .chat-input-row:focus-within { border-color: rgba(226,0,122,0.35); }
  .chat-inp {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-size: 13.5px;
    font-family: inherit;
    resize: none;
    line-height: 1.5;
    max-height: 90px;
  }
  .chat-inp::placeholder { color: var(--text-muted); }
  .chat-send {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: var(--pink-gradient);
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
    transition: opacity 0.15s, transform 0.1s;
  }
  .chat-send:hover { opacity: 0.85; transform: scale(1.05); }

  .prompt-cat  {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 12px 3px 6px;
  }
  .prompt-ex {
    padding: 9px 12px;
    border-radius: var(--radius-xs);
    cursor: pointer;
    font-size: 11.5px;
    color: var(--text-secondary);
    line-height: 1.45;
    border: 1px solid var(--border);
    margin-bottom: 5px;
    transition: all 0.15s;
    background: var(--bg-secondary);
  }
  .prompt-ex:hover {
    border-color: rgba(226,0,122,0.3);
    color: var(--text-primary);
    background: var(--magenta-glow);
  }
  .session-item {
    padding: 7px 9px;
    border-radius: 7px;
    font-size: 11.5px;
    color: var(--text-secondary);
    cursor: pointer;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all 0.15s;
  }
  .session-item:hover { background: var(--bg-secondary); color: var(--text-primary); }

  .typing-row { display: flex; align-items: center; gap: 4px; padding: 8px 4px; }
  .td { width: 7px; height: 7px; border-radius: 50%; background: var(--magenta); animation: bounce 1.2s infinite; }
  .td:nth-child(2) { animation-delay: 0.2s; }
  .td:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

  /* ═══════════════════════════════════════════════════
     DIGEST / INSIGHT CARDS
  ═══════════════════════════════════════════════════ */
  .digest-hd {
    background: linear-gradient(135deg, #0a0a1e 0%, #130930 55%, #0a0a1e 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 26px 30px;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    gap: 22px;
  }
  .digest-hd::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(226,0,122,0.13) 0%, transparent 65%);
    pointer-events: none;
  }

  .score-ring {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    border: 3px solid var(--magenta);
    background: var(--magenta-glow);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
  }
  .score-v { font-size: 22px; font-weight: 800; line-height: 1; }
  .score-l { font-size: 8px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

  .ins-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    margin-bottom: 9px;
    display: flex;
    gap: 12px;
    cursor: pointer;
    transition: border-color 0.15s, transform 0.1s;
  }
  .ins-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
  .ins-card.urgent   { border-left: 3px solid var(--danger);  }
  .ins-card.positive { border-left: 3px solid var(--success); }
  .ins-card.warning  { border-left: 3px solid var(--warning); }
  .ins-card.info     { border-left: 3px solid var(--info);    }
  .ins-card.pink     { border-left: 3px solid var(--magenta); }
  .ins-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .ins-title { font-size: 13px; font-weight: 600; margin-bottom: 3px; line-height: 1.35; }
  .ins-body  { font-size: 12px; color: var(--text-secondary); line-height: 1.55; }
  .ins-meta  { font-size: 10.5px; color: var(--text-muted); margin-top: 5px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

  /* ═══════════════════════════════════════════════════
     DATA MANAGEMENT
  ═══════════════════════════════════════════════════ */
  .upload-zone {
    border: 2px dashed var(--border-light);
    border-radius: var(--radius);
    padding: 34px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .upload-zone:hover {
    border-color: var(--magenta);
    background: var(--magenta-glow);
  }
  .upload-icon  { font-size: 34px; color: var(--text-muted); margin-bottom: 10px; }
  .upload-title { font-size: 14px; font-weight: 600; margin-bottom: 5px; }
  .upload-sub   { font-size: 12px; color: var(--text-muted); }

  .api-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px; }
  .api-card-hd { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .api-logo { width: 36px; height: 36px; border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .api-name { font-size: 13.5px; font-weight: 700; }
  .api-desc { font-size: 11px; color: var(--text-muted); }
  .api-status { margin-left: auto; }

  .conn-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
  }
  .conn-line:last-child { border: none; }
  .conn-key { color: var(--text-muted); }
  .conn-val { color: var(--text-primary); font-weight: 500; font-family: 'JetBrains Mono', monospace; font-size: 11px; }

  .code-block {
    background: #050510;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 16px 18px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 11.5px;
    line-height: 1.75;
    color: #c9d1d9;
    margin-bottom: 12px;
    overflow-x: auto;
    white-space: pre;
  }
  .code-block .kw  { color: #ff7b72; }
  .code-block .str { color: #a5d6ff; }
  .code-block .fn  { color: #d2a8ff; }
  .code-block .cmt { color: #6e7681; font-style: italic; }
  .code-block .num { color: #79c0ff; }

  .step-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
  .step-item:last-child { border: none; }
  .step-num {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--pink-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .step-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
  .step-body  { font-size: 12px; color: var(--text-secondary); line-height: 1.65; }

  /* ═══════════════════════════════════════════════════
     FUNNEL
  ═══════════════════════════════════════════════════ */
  .funnel-stage { display: flex; align-items: center; gap: 12px; margin-bottom: 9px; }
  .funnel-lbl   { width: 100px; font-size: 11.5px; color: var(--text-secondary); text-align: right; flex-shrink: 0; }
  .funnel-track { flex: 1; background: rgba(255,255,255,0.04); border-radius: 6px; height: 33px; }
  .funnel-bar   { height: 33px; border-radius: 6px; display: flex; align-items: center; padding: 0 13px; transition: width 0.6s ease; }
  .funnel-bar span { font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,0.88); white-space: nowrap; }
  .funnel-num   { width: 46px; font-size: 11px; color: var(--text-muted); text-align: right; flex-shrink: 0; }

  /* ═══════════════════════════════════════════════════
     CHART WRAPPER
  ═══════════════════════════════════════════════════ */
  .ch { position: relative; }
  canvas { max-width: 100%; }

  /* ═══════════════════════════════════════════════════
     MINI STAT ROW
  ═══════════════════════════════════════════════════ */
  .stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 0;
    border-bottom: 1px solid var(--border);
    font-size: 12.5px;
  }
  .stat-row:last-child { border: none; }
  .stat-lbl { color: var(--text-secondary); }
  .stat-val { font-weight: 600; }

  /* ═══════════════════════════════════════════════════
     MICRO PLATFORM CARD
  ═══════════════════════════════════════════════════ */
  .platform-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
  }
  .platform-card-hd {
    display: flex;
    align-items: center;
    gap: 11px;
    margin-bottom: 14px;
  }
  .platform-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  /* ═══════════════════════════════════════════════════
     UTILITIES
  ═══════════════════════════════════════════════════ */
  .grad-text {
    background: var(--pink-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes fadeIn  { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.97); }   to { opacity: 1; transform: none; } }

  .fade-in  { animation: fadeIn  0.3s ease; }
  .fade-up  { animation: fadeUp  0.4s ease; }
  .scale-in { animation: scaleIn 0.25s ease; }

  .flex   { display: flex; }
  .flex-1 { flex: 1; }
  .items-center  { align-items: center; }
  .items-start   { align-items: flex-start; }
  .justify-between { justify-content: space-between; }
  .justify-center  { justify-content: center; }
  .flex-col  { flex-direction: column; }
  .flex-wrap { flex-wrap: wrap; }
  .gap4  { gap: 4px;  }
  .gap6  { gap: 6px;  }
  .gap8  { gap: 8px;  }
  .gap10 { gap: 10px; }
  .gap12 { gap: 12px; }
  .gap14 { gap: 14px; }
  .gap16 { gap: 16px; }

  .text-pink   { color: var(--magenta); }
  .text-green  { color: var(--success); }
  .text-red    { color: var(--danger);  }
  .text-amber  { color: var(--warning); }
  .text-blue   { color: var(--info);    }
  .text-purple { color: var(--purple);  }
  .text-teal   { color: var(--teal);    }
  .text-muted  { color: var(--text-muted); }
  .text-sec    { color: var(--text-secondary); }

  .fw5 { font-weight: 500; }
  .fw6 { font-weight: 600; }
  .fw7 { font-weight: 700; }
  .fw8 { font-weight: 800; }

  .fs9  { font-size: 9px;  }
  .fs10 { font-size: 10px; }
  .fs11 { font-size: 11px; }
  .fs12 { font-size: 12px; }
  .fs13 { font-size: 13px; }
  .fs14 { font-size: 14px; }
  .fs15 { font-size: 15px; }
  .fs16 { font-size: 16px; }
  .fs18 { font-size: 18px; }
  .fs20 { font-size: 20px; }

  .row { display: flex; align-items: center; gap: 10px; }
  .col { display: flex; flex-direction: column; }
  .min-w0 { min-width: 0; }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .relative { position: relative; }
  .w-full { width: 100%; }
  .ta-right { text-align: right; }
  .ta-center { text-align: center; }

  * { scrollbar-width: thin; scrollbar-color: var(--border-light) transparent; }

  /* ═══════════════════════════════════════════════════
     REPORT AI
  ═══════════════════════════════════════════════════ */
  .rai-left {
    width: 260px;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    background: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .rai-panel-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 14px 10px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .rai-panel-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .rai-panel-title i { color: var(--magenta); }
  .rai-report-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    cursor: pointer;
    transition: background .15s;
    border-radius: 0;
  }
  .rai-report-item:hover { background: rgba(255,255,255,0.04); }
  .rai-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--bg-primary);
  }
  .rai-tabs-bar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    background: var(--bg-secondary);
    flex-shrink: 0;
  }
  .rai-tab {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 18px;
    height: 44px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all .2s;
    white-space: nowrap;
  }
  .rai-tab:hover { color: var(--text-secondary); }
  .rai-tab.active { color: var(--text-primary); border-bottom-color: var(--magenta); }
  .rai-chat-window {
    flex: 1;
    overflow-y: auto;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .rai-input-row {
    padding: 14px 20px 16px;
    border-top: 1px solid var(--border);
    background: var(--bg-secondary);
    flex-shrink: 0;
  }
  .rai-input-wrap {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    background: var(--bg-input);
    border: 1px solid var(--border-mid);
    border-radius: 12px;
    padding: 10px 12px;
    transition: border-color .2s;
  }
  .rai-input-wrap:focus-within { border-color: var(--magenta); }
  .rai-textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 13px;
    resize: none;
    min-height: 22px;
    max-height: 120px;
    line-height: 1.5;
  }
  .rai-textarea::placeholder { color: var(--text-muted); }
  .rai-prompt-pill {
    background: var(--bg-secondary);
    border: 1px solid var(--border-mid);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
    text-align: left;
  }
  .rai-prompt-pill:hover { background: var(--bg-card-hover); border-color: var(--magenta); color: var(--text-primary); }
  .rai-page-strip {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 6px;
    margin-top: 12px;
  }
  .rai-page-thumb {
    flex-shrink: 0;
    width: 120px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .rai-page-num {
    font-size: 10px;
    color: var(--text-muted);
    font-weight: 600;
    text-align: center;
  }
  .rai-preview-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }
  .rai-slide {
    position: relative;
    aspect-ratio: 16/9;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    padding: 20px;
  }
  .rai-slide-num {
    position: absolute;
    top: 10px;
    right: 14px;
    font-size: 10px;
    color: var(--text-muted);
    z-index: 2;
  }
  .rai-dropdown {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 0;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: 10px;
    padding: 6px 0;
    min-width: 180px;
    z-index: 200;
    box-shadow: 0 8px 32px rgba(0,0,0,.5);
  }
  .rai-dropdown-item {
    padding: 8px 14px;
    font-size: 12px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background .15s;
  }
  .rai-dropdown-item:hover { background: rgba(255,255,255,0.06); color: var(--text-primary); }

  /* ═══════════════════════════════════════════════════
     CANVAS
  ═══════════════════════════════════════════════════ */
  .cvs-left {
    width: 240px;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    background: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .cvs-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--bg-base);
    position: relative;
  }
  .cvs-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-secondary);
    flex-shrink: 0;
  }
  .cvs-grid {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    align-content: start;
  }
  .cvs-widget {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    transition: border-color .2s, box-shadow .2s, opacity .25s, transform .25s;
    cursor: default;
  }
  .cvs-widget:hover { border-color: var(--border-light); }
  .cvs-widget-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .cvs-widget-btn {
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 11px;
    transition: all .15s;
  }
  .cvs-widget-btn:hover { background: rgba(255,255,255,0.06); color: var(--text-primary); }
  .cvs-pivot-controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 12px;
    padding: 10px;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border);
  }
  .cvs-ctrl-grp { display: flex; flex-direction: column; gap: 5px; }
  .cvs-ctrl-label { font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
  .cvs-ctrl-pills { display: flex; gap: 5px; flex-wrap: wrap; }
  .cvs-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--info-dim);
    border: 1px solid rgba(96,165,250,0.25);
    color: var(--info);
    border-radius: 20px;
    padding: 3px 9px;
    font-size: 11px;
    font-weight: 600;
    cursor: default;
  }
  .cvs-pill.purple { background: var(--purple-dim); border-color: rgba(167,139,250,0.25); color: var(--purple); }
  .cvs-pill.amber  { background: var(--warning-dim); border-color: rgba(245,158,11,0.25); color: var(--warning); }
  .cvs-pill-rm { cursor: pointer; opacity: .7; font-size: 9px; }
  .cvs-pill-rm:hover { opacity: 1; }
  .cvs-pivot-tbl td { text-align: right; }
  .cvs-pivot-tbl td:first-child { text-align: left; }
  .cvs-total-row { background: rgba(226,0,122,0.06); }
  .cvs-total-row td { border-top: 1px solid var(--border-mid) !important; }
  .cvs-chart-select {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    border-radius: 6px;
    padding: 3px 7px;
    font-family: inherit;
    font-size: 10.5px;
    height: 26px;
  }
  .cvs-kpi-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    text-align: center;
  }
  .cvs-kpi-val   { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
  .cvs-kpi-label { font-size: 11px; color: var(--text-secondary); margin-bottom: 3px; }
  .cvs-kpi-sub   { font-size: 10px; color: var(--text-muted); }
  .cvs-tool-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 10px 6px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 9px;
    cursor: pointer;
    transition: all .2s;
    text-align: center;
    user-select: none;
  }
  .cvs-tool-btn:hover { background: var(--bg-card-hover); border-color: var(--border-light); }
  .cvs-col-tag {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 3px 8px;
    font-family: monospace;
    font-size: 10.5px;
    color: var(--info);
    cursor: grab;
    transition: background .15s;
    user-select: none;
  }
  .cvs-col-tag:hover { background: var(--bg-card-hover); border-color: var(--info); }
  .cvs-config-panel {
    width: 220px;
    flex-shrink: 0;
    border-left: 1px solid var(--border);
    background: var(--bg-secondary);
    padding: 16px 14px;
    overflow-y: auto;
  }
  .cvs-type-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 4px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: all .2s;
    font-size: 10px;
    color: var(--text-secondary);
  }
  .cvs-type-btn:hover { border-color: var(--magenta); color: var(--text-primary); }
  .cvs-color-swatch { transition: border-color .15s; }

  /* ═══════════════════════════════════════════════════
     DATA BLEND
  ═══════════════════════════════════════════════════ */
  .blend-source-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 10px;
    transition: border-color .2s;
  }
  .blend-source-card:hover { border-color: var(--border-light); }
  .blend-source-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .blend-source-badge {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .blend-source-badge.blue   { background: var(--info-dim);   color: var(--info);   border: 1px solid rgba(96,165,250,.25); }
  .blend-source-badge.purple { background: var(--purple-dim); color: var(--purple); border: 1px solid rgba(167,139,250,.25); }
  .blend-join-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
    margin-bottom: 10px;
  }
  .blend-col-check {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 3px 8px;
    font-size: 11px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background .15s;
    font-family: monospace;
  }
  .blend-col-check:hover { background: var(--bg-card-hover); }
  .blend-col-check input { cursor: pointer; }

  /* ═══════════════════════════════════════════════════
     SETTINGS / USERS
  ═══════════════════════════════════════════════════ */
  .field-label {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .06em;
    display: block;
    margin-bottom: 5px;
  }
  .user-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    transition: background .15s;
  }
  .user-row:last-child { border-bottom: none; }

  /* ═══════════════════════════════════════════════════
     EXTRA BADGE COLOURS
  ═══════════════════════════════════════════════════ */
  .b-pink { background:var(--magenta-glow2); color:var(--magenta-bright); border:1px solid var(--magenta-glow3); }
  .b-info { background:var(--info-dim); color:var(--info); border:1px solid rgba(96,165,250,.25); }
  .b-gray { background:rgba(255,255,255,0.06); color:var(--text-secondary); border:1px solid var(--border); }
  .mb2  { margin-bottom: 2px; }
  .mb4  { margin-bottom: 4px; }
  .mb6  { margin-bottom: 6px; }
  .mb8  { margin-bottom: 8px; }
  .mb12 { margin-bottom: 12px; }
  .mb14 { margin-bottom: 14px; }
  .mb20 { margin-bottom: 20px; }
  .mt4  { margin-top: 4px; }
  .mt12 { margin-top: 12px; }
  .ellipsis { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
`;

