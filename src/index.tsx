import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { CSS } from './styles'
import { topbar } from './layout'
import { homeScreen } from './screens/home'
import { overviewScreen } from './screens/overview'
import { aiScreen } from './screens/ai'
import { digestScreen } from './screens/digest'
import { pipelineScreen, clientsScreen, salesPerfScreen } from './screens/presales'
import { revenueScreen, campaignScreen, adsScreen } from './screens/postsales'
import { portalsScreen, socialScreen } from './screens/traffic'
import { uploadScreen, apiConnScreen, setupScreen, blendScreen } from './screens/data'
import { reportAiScreen } from './screens/reportai'
import { canvasScreen } from './screens/canvas'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './' }))

const routes: Record<string, { screen: string; content: () => string }> = {
  '/':          { screen: 'home',     content: homeScreen },
  '/home':      { screen: 'home',     content: homeScreen },
  '/overview':  { screen: 'overview', content: overviewScreen },
  '/ai':        { screen: 'ai',       content: aiScreen },
  '/digest':    { screen: 'digest',   content: digestScreen },
  '/presales':  { screen: 'presales', content: pipelineScreen },
  '/pipeline':  { screen: 'pipeline', content: pipelineScreen },
  '/clients':   { screen: 'clients',  content: clientsScreen },
  '/salesperf': { screen: 'salesperf',content: salesPerfScreen },
  '/postsales': { screen: 'postsales',content: revenueScreen },
  '/revenue':   { screen: 'revenue',  content: revenueScreen },
  '/campaign':  { screen: 'campaign', content: campaignScreen },
  '/ads':       { screen: 'ads',      content: adsScreen },
  '/traffic':   { screen: 'traffic',  content: portalsScreen },
  '/portals':   { screen: 'portals',  content: portalsScreen },
  '/social':    { screen: 'social',   content: socialScreen },
  '/data':      { screen: 'data',     content: uploadScreen },
  '/upload':    { screen: 'upload',   content: uploadScreen },
  '/apiconn':   { screen: 'apiconn',  content: apiConnScreen },
  '/setup':     { screen: 'setup',    content: setupScreen },
  '/blend':     { screen: 'blend',    content: blendScreen },
  '/reportai':  { screen: 'reportai', content: reportAiScreen },
  '/canvas':    { screen: 'canvas',   content: canvasScreen },
}

function buildNav(active: string): string {
  type NavItem = { id: string; label: string; icon: string; badge?: string; sub?: NavItem[] }
  const nav: NavItem[] = [
    { id: 'home',     label: 'Home',         icon: 'fa-house' },
    { id: 'overview', label: 'Overview',     icon: 'fa-chart-pie' },
    { id: 'ai',       label: 'Ask AI',       icon: 'fa-sparkles',  badge: 'AI' },
    { id: 'digest',   label: 'Daily Digest', icon: 'fa-newspaper', badge: '4' },
    { id: 'presales', label: 'Pre-Sales',    icon: 'fa-funnel', sub: [
      { id: 'pipeline',  label: 'Pipeline Health',    icon: 'fa-filter' },
      { id: 'clients',   label: 'Client Intelligence', icon: 'fa-building' },
      { id: 'salesperf', label: 'Sales Performance',  icon: 'fa-chart-line' },
    ]},
    { id: 'postsales', label: 'Post-Sales',  icon: 'fa-rocket', sub: [
      { id: 'revenue',  label: 'Revenue Performance',  icon: 'fa-sack-dollar' },
      { id: 'campaign', label: 'Campaign Performance', icon: 'fa-megaphone' },
      { id: 'ads',      label: 'Ads Performance',      icon: 'fa-rectangle-ad' },
    ]},
    { id: 'traffic', label: 'Traffic Performance', icon: 'fa-signal', sub: [
      { id: 'portals', label: 'Portals Traffic', icon: 'fa-globe' },
      { id: 'social',  label: 'Sprout Social',   icon: 'fa-seedling' },
    ]},
    { id: 'data', label: 'Data Management', icon: 'fa-database', sub: [
      { id: 'upload',  label: 'Manual Upload',   icon: 'fa-upload' },
      { id: 'apiconn', label: 'API Connections', icon: 'fa-plug' },
      { id: 'setup',   label: 'Setup Guide',     icon: 'fa-book-open' },
      { id: 'blend',   label: 'Data Blend',       icon: 'fa-code-merge' },
    ]},
    { id: 'reportai', label: 'Report AI',  icon: 'fa-file-chart-pie', badge: 'New' },
    { id: 'canvas',   label: 'Canvas',     icon: 'fa-layer-group',    badge: 'New' },
  ]

  function renderItem(n: NavItem, depth = 0): string {
    const isActive    = active === n.id
    const hasActiveSub = n.sub?.some(s => s.id === active)
    const isOpen      = isActive || hasActiveSub || false
    const indent      = depth > 0 ? 'style="padding-left:22px"' : ''

    if (n.sub && n.sub.length > 0) {
      const subHtml = n.sub.map(s => renderItem(s, 1)).join('')
      return `
        <a href="/${n.id}" class="nav-item ${isActive ? 'active' : ''}">
          <i class="fas ${n.icon} ni"></i>
          <span style="flex:1">${n.label}</span>
          ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
          <i class="fas fa-chevron-${isOpen ? 'down' : 'right'}" style="font-size:8px;color:var(--text-muted);flex-shrink:0"></i>
        </a>
        ${isOpen ? `<div class="nav-sub">${subHtml}</div>` : ''}
      `
    }
    return `
      <a href="/${n.id}" class="nav-item ${isActive ? 'active' : ''}" ${indent}>
        <i class="fas ${n.icon} ni"></i>
        <span style="flex:1">${n.label}</span>
        ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
      </a>
    `
  }

  return nav.map(n => renderItem(n)).join('')
}

function page(screen: string, body: string): string {
  const nav = buildNav(screen)
  const tb  = topbar(screen)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Astro One — Digital Performance Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <style>${CSS}</style>
</head>
<body>
<div class="app">

  <!-- ═══ SIDEBAR ════════════════════════════════════════════ -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img src="/static/astro-logo.png" alt="Astro" class="logo-img"/>
      <div class="logo-sub">Digital Performance Hub</div>
    </div>

    <nav class="sidebar-nav">${nav}</nav>

    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">DL</div>
        <div style="flex:1;min-width:0">
          <div class="user-name">Dato' Lee</div>
          <div class="user-role">Chief Revenue Officer</div>
        </div>
        <i class="fas fa-chevron-up" style="font-size:8px;color:var(--text-muted)"></i>
      </div>
    </div>
  </aside>

  <!-- ═══ MAIN ════════════════════════════════════════════════ -->
  <main class="main">
    ${tb}
    ${body}
  </main>

</div>

<!-- ═══ GLOBAL SCRIPTS ═══════════════════════════════════════ -->
<script>
// ─── Navigation ──────────────────────────────────────────────
function navigate(screen) {
  window.location.href = '/' + screen;
}
function fillPrompt(text) {
  const el = document.getElementById('chatInput');
  if (el) { el.value = text; el.focus(); }
}

// ─── Chat ─────────────────────────────────────────────────────
function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}
function sendMessage() {
  const inp = document.getElementById('chatInput');
  const win = document.getElementById('chatWindow');
  if (!inp || !win || !inp.value.trim()) return;
  const msg = inp.value.trim(); inp.value = '';

  win.innerHTML += \`
    <div class="msg-row user fade-in">
      <div class="msg-av user"><i class="fas fa-user"></i></div>
      <div class="msg-bub user">\${msg}</div>
    </div>
    <div class="msg-row fade-in" id="typingRow">
      <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
      <div class="msg-bub ai"><div class="typing-row"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>
    </div>\`;
  win.scrollTop = win.scrollHeight;

  setTimeout(() => {
    const tr = document.getElementById('typingRow');
    if (tr) tr.remove();
    win.innerHTML += \`
      <div class="msg-row fade-in">
        <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
        <div class="msg-bub ai">
          <div class="ai-sum">🔍 AI Analysis: <em>\${msg}</em></div>
          <div class="ai-exp" style="margin-bottom:12px">
            In production, this response would pull <strong>structured live data</strong> from your Google Sheets,
            GA4, Google Ads Manager, BigQuery, and TikTok Ads — returning key numbers, supporting tables,
            anomaly flags, and drill-down actions tailored to your question.
          </div>
          <div class="ai-acts">
            <button class="ai-act"><i class="fas fa-bookmark"></i>Save Insight</button>
            <button class="ai-act"><i class="fab fa-microsoft"></i>Share to Teams</button>
            <button class="ai-act"><i class="fas fa-expand"></i>Drill Deeper</button>
            <button class="ai-act"><i class="fas fa-download"></i>Export Data</button>
          </div>
        </div>
      </div>\`;
    win.scrollTop = win.scrollHeight;
  }, 1800);
}

// ─── Tab switchers ────────────────────────────────────────────
function switchAdTab(tab, el) {
  document.querySelectorAll('#adsTabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}
function switchSetupTab(tab, el) {
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['sheets','ga4','gam','bq','tiktok','flow'].forEach(id => {
    const panel = document.getElementById('setup-' + id);
    if (panel) panel.style.display = id === tab ? 'block' : 'none';
  });
}

// ─── Chart defaults ───────────────────────────────────────────
const chartDefaults = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f0f1f',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      titleColor: '#f0f0ff',
      bodyColor: '#8080a8',
      padding: 10,
      cornerRadius: 8,
    }
  },
  scales: {
    x: {
      grid:   { color: 'rgba(255,255,255,0.03)' },
      ticks:  { color: '#48486a', font: { size: 10 } },
      border: { display: false }
    },
    y: {
      grid:   { color: 'rgba(255,255,255,0.04)' },
      ticks:  { color: '#48486a', font: { size: 10 } },
      border: { display: false }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
};

function mkGrad(ctx, c1, c2, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h || 200);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  return g;
}

window.addEventListener('DOMContentLoaded', () => {

  // ── Home Revenue Chart ────────────────────────────────────
  const hrc = document.getElementById('homeRevChart');
  if (hrc) new Chart(hrc, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          label: 'Actual Revenue',
          data: [18.4, 21.2, 24.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: ctx => mkGrad(ctx.chart.ctx, 'rgba(226,0,122,0.88)', 'rgba(226,0,122,0.18)'),
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Target',
          data: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          type: 'line',
          borderColor: 'rgba(255,255,255,0.13)',
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        }
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: { label: ctx => ' RM ' + ctx.parsed.y + 'M' }
        }
      },
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => 'RM' + v + 'M' } }
      }
    }
  });

  // ── Overview Revenue Chart ───────────────────────────────
  const orc = document.getElementById('ovRevChart');
  if (orc) new Chart(orc, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Revenue',
          data: [18.4, 21.2, 24.1],
          borderColor: '#e2007a',
          borderWidth: 2.5,
          pointBackgroundColor: '#e2007a',
          pointRadius: 4,
          fill: true,
          backgroundColor: ctx => {
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 150);
            g.addColorStop(0, 'rgba(226,0,122,0.26)');
            g.addColorStop(1, 'rgba(226,0,122,0.02)');
            return g;
          },
          tension: 0.4
        },
        {
          label: 'Target',
          data: [19, 20, 21],
          borderColor: 'rgba(255,255,255,0.18)',
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => 'RM' + v + 'M' } }
      }
    }
  });

  // ── Ads Mix Donut (Overview) ─────────────────────────────
  const amc = document.getElementById('adsMixChart');
  if (amc) new Chart(amc, {
    type: 'doughnut',
    data: {
      labels: ['Google', 'Meta', 'TikTok'],
      datasets: [{
        data: [43, 35, 22],
        backgroundColor: ['rgba(66,133,244,0.82)', 'rgba(24,119,242,0.65)', 'rgba(255,0,80,0.75)'],
        borderColor: ['#4285f4', '#1877f2', '#ff0050'],
        borderWidth: 1.5,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '66%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: '#8080a8', font: { size: 10 }, padding: 12, boxWidth: 10 }
        },
        tooltip: chartDefaults.plugins.tooltip
      }
    }
  });

  // ── Revenue Performance Chart ────────────────────────────
  const rpc = document.getElementById('revPerfChart');
  if (rpc) new Chart(rpc, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Actual',
          data: [18.4, 21.2, 24.1],
          backgroundColor: ctx => mkGrad(ctx.chart.ctx, 'rgba(226,0,122,0.88)', 'rgba(226,0,122,0.18)'),
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Target',
          data: [19, 20, 21],
          backgroundColor: 'rgba(255,255,255,0.07)',
          borderRadius: 5,
          borderSkipped: false,
        }
      ]
    },
    options: {
      ...chartDefaults,
      plugins: { ...chartDefaults.plugins, legend: { display: true, position: 'top', labels: { color: '#8080a8', font: { size: 10 }, padding: 10, boxWidth: 10 } } },
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => 'RM' + v + 'M' } }
      }
    }
  });

  // ── Campaign Revenue Chart ───────────────────────────────
  const crc = document.getElementById('campRevChart');
  if (crc) new Chart(crc, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Campaign Rev',
        data: [11.2, 13.8, 13.6],
        backgroundColor: ctx => mkGrad(ctx.chart.ctx, 'rgba(167,139,250,0.82)', 'rgba(167,139,250,0.12)'),
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      ...chartDefaults,
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => 'RM' + v + 'M' } }
      }
    }
  });

  // ── Ads Spend Donut ──────────────────────────────────────
  const asd = document.getElementById('adsSpendChart');
  if (asd) new Chart(asd, {
    type: 'doughnut',
    data: {
      labels: ['Google Ads', 'Meta Ads', 'TikTok Ads'],
      datasets: [{
        data: [43, 35, 22],
        backgroundColor: ['rgba(66,133,244,0.85)', 'rgba(24,119,242,0.7)', 'rgba(255,0,80,0.78)'],
        borderColor: ['#4285f4', '#1877f2', '#ff0050'],
        borderWidth: 1.5,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: { legend: { display: false }, tooltip: chartDefaults.plugins.tooltip }
    }
  });

  // ── Portals Traffic Chart ────────────────────────────────
  const tc = document.getElementById('trafficChart');
  if (tc) new Chart(tc, {
    type: 'line',
    data: {
      labels: ['1 Mar','5 Mar','10 Mar','15 Mar','20 Mar','25 Mar','27 Mar'],
      datasets: [
        {
          label: 'Sessions',
          data: [128, 142, 156, 138, 162, 178, 184],
          borderColor: '#60a5fa',
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: '#60a5fa',
          fill: true,
          backgroundColor: ctx => {
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 150);
            g.addColorStop(0, 'rgba(96,165,250,0.22)');
            g.addColorStop(1, 'rgba(96,165,250,0.02)');
            return g;
          },
          tension: 0.4
        },
        {
          label: 'Users',
          data: [86, 94, 104, 91, 108, 119, 122],
          borderColor: '#2dd4bf',
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: true, position: 'top', labels: { color: '#8080a8', font: { size: 10 }, padding: 10, boxWidth: 10 } }
      }
    }
  });

  // ── Social Chart ─────────────────────────────────────────
  const sc = document.getElementById('socialChart');
  if (sc) new Chart(sc, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Reach',
          data: [480000, 520000, 540000, 560000],
          borderColor: '#a78bfa',
          borderWidth: 2.5,
          pointRadius: 3,
          fill: true,
          backgroundColor: ctx => {
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 150);
            g.addColorStop(0, 'rgba(167,139,250,0.22)');
            g.addColorStop(1, 'rgba(167,139,250,0.02)');
            return g;
          },
          tension: 0.4
        },
        {
          label: 'Engagements',
          data: [62000, 68000, 72000, 82000],
          borderColor: '#00d68f',
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: true, position: 'top', labels: { color: '#8080a8', font: { size: 10 }, padding: 10, boxWidth: 10 } }
      }
    }
  });

  // ── Audience Growth Chart ────────────────────────────────
  const agc = document.getElementById('audienceChart');
  if (agc) new Chart(agc, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        { label: 'IG', data: [1760, 1810, 1840], backgroundColor: 'rgba(225,48,108,0.75)', borderRadius: 4, borderSkipped: false },
        { label: 'TT', data: [840,  890,  920],  backgroundColor: 'rgba(255,0,80,0.65)',   borderRadius: 4, borderSkipped: false },
        { label: 'FB', data: [2060, 2080, 2100], backgroundColor: 'rgba(24,119,242,0.65)', borderRadius: 4, borderSkipped: false },
      ]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: true, position: 'top', labels: { color: '#8080a8', font: { size: 10 }, padding: 8, boxWidth: 8 } }
      },
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: function(v) { return (v / 1000) + 'K'; } } }
      }
    }
  });

  // ── Report AI Charts ────────────────────────────────────
  const raiRev = document.getElementById('raiRevChart');
  if (raiRev) new Chart(raiRev, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        { label: 'Actual', data: [18.4, 21.2, 24.1],
          backgroundColor: ctx => mkGrad(ctx.chart.ctx, 'rgba(226,0,122,0.88)', 'rgba(226,0,122,0.18)'),
          borderRadius: 5, borderSkipped: false },
        { label: 'Target', data: [19, 20, 21],
          backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 5, borderSkipped: false }
      ]
    },
    options: {
      ...chartDefaults,
      plugins: { ...chartDefaults.plugins, legend: { display: true, position: 'top', labels: { color: '#8080a8', font: { size: 10 }, padding: 10, boxWidth: 10 } } },
      scales: { ...chartDefaults.scales, y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => 'RM' + v + 'M' } } }
    }
  });

  const raiProd = document.getElementById('raiProductChart');
  if (raiProd) new Chart(raiProd, {
    type: 'doughnut',
    data: {
      labels: ['Digital Ads', 'Content Syndi.', 'Events & Live', 'Sponsorship'],
      datasets: [{ data: [45, 27, 17, 10],
        backgroundColor: ['rgba(226,0,122,0.82)','rgba(96,165,250,0.75)','rgba(167,139,250,0.75)','rgba(45,212,191,0.75)'],
        borderColor: ['#e2007a','#60a5fa','#a78bfa','#2dd4bf'],
        borderWidth: 1.5, hoverOffset: 5 }]
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: '66%',
      plugins: { legend: { display: true, position: 'bottom', labels: { color: '#8080a8', font: { size: 9 }, padding: 8, boxWidth: 8 } }, tooltip: chartDefaults.plugins.tooltip }
    }
  });

}); // end DOMContentLoaded
</script>
</body>
</html>`
}

// Register all routes
for (const [path, { screen, content }] of Object.entries(routes)) {
  app.get(path, (c) => c.html(page(screen, content())))
}

export default app
