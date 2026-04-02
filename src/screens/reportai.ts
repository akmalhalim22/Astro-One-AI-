export function reportAiScreen(): string {
  return `
<div class="content fade-in" style="display:flex;gap:0;padding:0;height:calc(100vh - var(--topbar-h));overflow:hidden">

  <!-- ── Left Panel: History & Sources ─────────────────────── -->
  <div class="rai-left">
    <div class="rai-panel-hd">
      <span class="rai-panel-title"><i class="fas fa-file-chart-pie"></i>Report AI</span>
      <button class="btn-primary" style="height:30px;font-size:11px;padding:0 12px" onclick="newReport()">
        <i class="fas fa-plus"></i>New Report
      </button>
    </div>

    <div style="padding:10px 14px 6px;font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase">Saved Reports</div>
    ${[
      ['Q1 2025 Revenue Summary','27 Mar 2025','fa-file-powerpoint','#f59e0b','4 charts · 6 pages','PPTX'],
      ['Pipeline Health Digest','25 Mar 2025','fa-file-powerpoint','#f59e0b','3 charts · 4 pages','PPTX'],
      ['Monthly Ads Performance','20 Mar 2025','fa-file-pdf','#f43f5e','5 charts · 8 pages','PDF'],
      ['Client Intelligence Brief','15 Mar 2025','fa-file-powerpoint','#f59e0b','2 charts · 3 pages','PPTX'],
      ['Executive Weekly Digest','10 Mar 2025','fa-file-powerpoint','#f59e0b','6 charts · 10 pages','PPTX'],
    ].map(([name, date, icon, col, meta, fmt]) => `
    <div class="rai-report-item" onclick="loadReport('${name}')">
      <i class="fas ${icon}" style="color:${col};font-size:18px;flex-shrink:0"></i>
      <div style="flex:1;min-width:0">
        <div class="fw6 fs12 ellipsis">${name}</div>
        <div class="fs11 text-muted">${meta} · ${date}</div>
      </div>
      <span class="b ${fmt === 'PPTX' ? 'b-amber' : 'b-danger'}" style="font-size:9px">${fmt}</span>
    </div>`).join('')}

    <div style="padding:16px 14px 6px;font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase;border-top:1px solid var(--border);margin-top:8px">Data Sources</div>
    ${[
      ['Google Sheets','Central Warehouse','fa-table','#0f9d58','Live'],
      ['Google Analytics 4','Traffic & Engagement','fa-chart-bar','#e34c26','Live'],
      ['Google Ads Manager','Ads Performance','fa-rectangle-ad','#4285f4','Live'],
      ['TikTok Ads','Social Ad Data','fa-music','#ff0050','Live'],
      ['Sprout Social','Social Metrics','fa-seedling','#2ea44f','Delayed'],
    ].map(([n, d, ic, col, st]) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 14px">
      <div style="width:28px;height:28px;border-radius:7px;background:${col}22;color:${col};display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0"><i class="fas ${ic}"></i></div>
      <div style="flex:1;min-width:0">
        <div class="fw6 fs12 ellipsis">${n}</div>
        <div class="fs11 text-muted">${d}</div>
      </div>
      <span class="status-dot ${st === 'Live' ? 'green' : 'amber'}"></span>
    </div>`).join('')}
  </div>

  <!-- ── Main: Chat + Preview ───────────────────────────────── -->
  <div class="rai-main">

    <!-- Tabs: Builder vs Preview -->
    <div class="rai-tabs-bar">
      <div class="rai-tab active" id="rai-tab-build" onclick="raiTab('build',this)"><i class="fas fa-wand-magic-sparkles"></i>Build Report</div>
      <div class="rai-tab" id="rai-tab-preview" onclick="raiTab('preview',this)"><i class="fas fa-eye"></i>Preview</div>
      <div style="flex:1"></div>
      <div style="display:flex;gap:8px;align-items:center;padding-right:16px">
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="saveReport()"><i class="fas fa-floppy-disk"></i>Save</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="renameReport()"><i class="fas fa-pen"></i>Rename</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="rerunReport()"><i class="fas fa-rotate"></i>Rerun</button>
        <button class="btn-primary" style="height:30px;font-size:11px;padding:0 14px" onclick="exportReport('pptx')"><i class="fas fa-file-powerpoint"></i>Export PPTX</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="exportReport('pdf')"><i class="fas fa-file-pdf"></i>PDF</button>
      </div>
    </div>

    <!-- Build Panel -->
    <div id="rai-panel-build" style="display:flex;flex-direction:column;flex:1;overflow:hidden">
      <!-- Chat window -->
      <div id="raiChatWindow" class="rai-chat-window">

        <!-- AI Welcome -->
        <div class="msg-row">
          <div class="msg-av ai"><i class="fas fa-wand-magic-sparkles"></i></div>
          <div class="msg-bub ai">
            <div class="fw7 fs13 mb8"><span class="text-pink">Report AI</span> — your intelligent report builder</div>
            <div class="fs12 text-secondary mb12">Describe the report you want and I'll generate charts, KPI summaries, and a multi-page slide deck — ready to export as PPTX or PDF.</div>
            <div class="fs11 text-muted mb8">Try a prompt below, or type your own:</div>
            <div style="display:flex;flex-wrap:wrap;gap:7px">
              ${[
                'Q1 Revenue summary with target vs actual charts',
                'Pipeline health report for leadership review',
                'Monthly ads performance across all platforms',
                'Client intelligence brief — top 10 by revenue',
                'Weekly executive digest with anomaly highlights',
                'Traffic & engagement trend report for portals',
              ].map(p => `<button class="rai-prompt-pill" onclick="fillRaiPrompt(this)">${p}</button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Sample Exchange -->
        <div class="msg-row user">
          <div class="msg-av user"><i class="fas fa-user"></i></div>
          <div class="msg-bub user">Generate a Q1 2025 Revenue Summary report with revenue vs target bar chart, top 5 clients table, and a product mix donut.</div>
        </div>

        <div class="msg-row">
          <div class="msg-av ai"><i class="fas fa-wand-magic-sparkles"></i></div>
          <div class="msg-bub ai">
            <div class="ai-sum">✅ Report generated: <strong>Q1 2025 Revenue Summary</strong></div>
            <div class="fs12 text-secondary mb12">Built 6 pages · 3 charts · 4 KPI sections from Google Sheets + GA4 data.</div>

            <!-- Mini KPI strip -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
              ${[['RM 142.3M','YTD Revenue'],['94%','Target Attainment'],['+12.4%','vs Last Year'],['RM 9.1M','Gap to Close']].map(([v,l])=>`
              <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:10px;text-align:center">
                <div class="fw7 fs14 text-pink">${v}</div>
                <div class="fs10 text-muted">${l}</div>
              </div>`).join('')}
            </div>

            <!-- Report pages preview strip -->
            <div class="rai-page-strip">
              ${[
                ['fa-star','Title Slide','Astro One · Q1 Revenue Summary','#e2007a'],
                ['fa-chart-bar','Revenue vs Target','Bar chart · Jan-Mar 2025','#60a5fa'],
                ['fa-building','Top Clients','Table · Top 5 by YTD Revenue','#2dd4bf'],
                ['fa-chart-pie','Product Mix','Donut · 4 product lines','#a78bfa'],
                ['fa-triangle-exclamation','Risks & Flags','3 at-risk deals · RM 8.7M','#f59e0b'],
                ['fa-flag-checkered','Summary & Actions','Q1 close probability 68%','#00d68f'],
              ].map(([ic, title, desc, col], i) => `
              <div class="rai-page-thumb">
                <div class="rai-page-num">${i + 1}</div>
                <div style="width:100%;aspect-ratio:16/9;background:var(--bg-secondary);border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:1px solid var(--border)">
                  <i class="fas ${ic}" style="color:${col};font-size:18px"></i>
                  <div class="fw6 fs10">${title}</div>
                  <div class="fs9 text-muted" style="text-align:center;padding:0 6px">${desc}</div>
                </div>
              </div>`).join('')}
            </div>

            <div class="ai-acts mt12">
              <button class="ai-act" onclick="raiTab('preview',document.getElementById('rai-tab-preview'))"><i class="fas fa-eye"></i>Preview Full Report</button>
              <button class="ai-act" onclick="exportReport('pptx')"><i class="fas fa-file-powerpoint"></i>Export PPTX</button>
              <button class="ai-act" onclick="exportReport('pdf')"><i class="fas fa-file-pdf"></i>Export PDF</button>
              <button class="ai-act" onclick="saveReport()"><i class="fas fa-floppy-disk"></i>Save Report</button>
            </div>
          </div>
        </div>

      </div><!-- /raiChatWindow -->

      <!-- Input row -->
      <div class="rai-input-row">
        <div class="rai-input-wrap">
          <i class="fas fa-wand-magic-sparkles" style="color:var(--magenta);font-size:14px;flex-shrink:0"></i>
          <textarea id="raiInput" class="rai-textarea" rows="1"
            placeholder="Describe your report — data source, charts, KPIs, audience…"
            onkeydown="handleRaiKey(event)" oninput="autoResize(this)"></textarea>
          <div style="display:flex;gap:6px;flex-shrink:0;align-items:center">
            <div style="position:relative">
              <button class="btn-ghost" style="height:32px;font-size:11px;padding:0 10px" onclick="toggleSourceMenu()">
                <i class="fas fa-database"></i>Source
              </button>
              <div id="sourceMenu" class="rai-dropdown" style="display:none">
                ${['All Sources','Google Sheets Only','GA4 + Sheets','Ads Data Only','Uploaded CSV'].map(s=>`
                <div class="rai-dropdown-item" onclick="selectSource('${s}')">${s}</div>`).join('')}
              </div>
            </div>
            <div style="position:relative">
              <button class="btn-ghost" style="height:32px;font-size:11px;padding:0 10px" onclick="toggleFormatMenu()">
                <i class="fas fa-sliders"></i>Format
              </button>
              <div id="formatMenu" class="rai-dropdown" style="display:none">
                ${['Auto (Recommended)','Slide Deck (PPTX)','PDF Report','Summary Card','Data Table Only'].map(f=>`
                <div class="rai-dropdown-item" onclick="selectFormat('${f}')">${f}</div>`).join('')}
              </div>
            </div>
            <button class="btn-primary" style="height:32px;width:32px;padding:0;justify-content:center;flex-shrink:0" onclick="sendRaiMessage()">
              <i class="fas fa-paper-plane" style="font-size:12px"></i>
            </button>
          </div>
        </div>
        <div style="text-align:center;font-size:10px;color:var(--text-muted);margin-top:6px">
          Report AI uses your connected data sources · Charts rendered from live data · Exports optimized for PowerPoint
        </div>
      </div>
    </div>

    <!-- Preview Panel -->
    <div id="rai-panel-preview" style="display:none;flex:1;overflow-y:auto;background:var(--bg-base)">
      <div class="rai-preview-container">

        <!-- Slide 1: Title -->
        <div class="rai-slide">
          <div class="rai-slide-num">Slide 1 / 6</div>
          <div style="background:linear-gradient(135deg,#0f0f1f 0%,#1a0a14 100%);border-radius:12px;padding:40px;display:flex;flex-direction:column;justify-content:space-between;height:100%">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:38px;height:38px;background:var(--pink-gradient);border-radius:8px;display:flex;align-items:center;justify-content:center">
                <i class="fas fa-chart-pie" style="color:#fff;font-size:16px"></i>
              </div>
              <div style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:600">ASTRO ONE · DIGITAL PERFORMANCE HUB</div>
            </div>
            <div>
              <div style="font-size:32px;font-weight:800;line-height:1.15;margin-bottom:10px">Q1 2025<br><span style="background:var(--pink-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Revenue Summary</span></div>
              <div style="color:rgba(255,255,255,0.45);font-size:13px">27 March 2025 · Prepared by Report AI · Confidential</div>
            </div>
            <div style="display:flex;gap:20px">
              ${[['RM 142.3M','YTD Revenue'],['94%','Q1 Attainment'],['+12.4%','YoY Growth']].map(([v,l])=>`
              <div>
                <div style="font-size:22px;font-weight:800;color:#ff4db8">${v}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.4)">${l}</div>
              </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Slide 2: Revenue vs Target Chart -->
        <div class="rai-slide">
          <div class="rai-slide-num">Slide 2 / 6</div>
          <div class="card" style="height:100%;display:flex;flex-direction:column">
            <div class="card-hd"><div class="card-title">Revenue vs Target — Jan to Mar 2025</div><span class="b b-green">On Track</span></div>
            <div class="chart-container" style="flex:1">
              <canvas id="raiRevChart"></canvas>
            </div>
            <div style="display:flex;gap:16px;padding:12px 0 0">
              ${[['RM 63.7M','Q1 Actual','var(--magenta)'],['RM 60M','Q1 Target','rgba(255,255,255,0.25)'],['RM 9.1M','Gap Remaining','var(--warning)']].map(([v,l,c])=>`
              <div style="display:flex;align-items:center;gap:7px">
                <div style="width:8px;height:8px;border-radius:50%;background:${c}"></div>
                <div class="fs11"><span class="fw7" style="color:${c}">${v}</span> <span class="text-muted">${l}</span></div>
              </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Slide 3: Top Clients Table -->
        <div class="rai-slide">
          <div class="rai-slide-num">Slide 3 / 6</div>
          <div class="card" style="height:100%;display:flex;flex-direction:column">
            <div class="card-hd"><div class="card-title">Top 5 Clients by YTD Revenue</div></div>
            <table class="tbl" style="flex:1">
              <thead><tr><th>#</th><th>Client</th><th>Segment</th><th>YTD Revenue</th><th>vs Target</th><th>Status</th></tr></thead>
              <tbody>
                ${[
                  ['1','Maxis Berhad','Enterprise','RM 12.4M','+8.2%','b-green'],
                  ['2','Celcom Axiata','Enterprise','RM 10.8M','+5.6%','b-green'],
                  ['3','Petronas Digital','Enterprise','RM 8.6M','+12.1%','b-green'],
                  ['4','Watsons Malaysia','Mid-Market','RM 6.2M','-3.4%','b-amber'],
                  ['5','MyEG Services','Mid-Market','RM 5.8M','+2.2%','b-green'],
                ].map(([n, name, seg, rev, vs, b]) => `
                <tr>
                  <td class="text-muted">${n}</td>
                  <td class="fw6">${name}</td>
                  <td><span class="b b-gray">${seg}</span></td>
                  <td class="fw7 text-pink">${rev}</td>
                  <td><span class="b ${b}">${vs}</span></td>
                  <td><span class="b ${b === 'b-green' ? 'b-green' : 'b-amber'}">${b === 'b-green' ? 'On Track' : 'Watch'}</span></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Slide 4: Product Mix Donut -->
        <div class="rai-slide">
          <div class="rai-slide-num">Slide 4 / 6</div>
          <div class="card" style="height:100%;display:flex;flex-direction:column">
            <div class="card-hd"><div class="card-title">Revenue by Product Line</div><span class="fs11 text-muted">Q1 2025</span></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1">
              <div class="chart-container"><canvas id="raiProductChart"></canvas></div>
              <div style="display:flex;flex-direction:column;justify-content:center;gap:12px">
                ${[
                  ['Digital Ads','RM 64.2M','45%','var(--magenta)'],
                  ['Content Syndication','RM 38.4M','27%','var(--info)'],
                  ['Events & Live','RM 24.8M','17%','var(--purple)'],
                  ['Sponsorship','RM 14.9M','10%','var(--teal)'],
                ].map(([name, rev, pct, col]) => `
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                    <span class="fs12 fw6">${name}</span>
                    <span class="fs12 fw7" style="color:${col}">${rev}</span>
                  </div>
                  <div style="height:4px;background:var(--border);border-radius:2px">
                    <div style="height:100%;width:${pct};background:${col};border-radius:2px"></div>
                  </div>
                  <div class="fs10 text-muted mt4">${pct} of total revenue</div>
                </div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 5: Risks -->
        <div class="rai-slide">
          <div class="rai-slide-num">Slide 5 / 6</div>
          <div class="card" style="height:100%;display:flex;flex-direction:column">
            <div class="card-hd"><div class="card-title">Risks & AI-Flagged Items</div><span class="b b-danger">3 Critical</span></div>
            <div style="display:flex;flex-direction:column;gap:10px;flex:1;overflow-y:auto">
              ${[
                ['Astro Arena deal idle 34 days','RM 2.4M · Proposal stage · High risk','fa-triangle-exclamation','var(--danger)','Escalate immediately'],
                ['Google Ads CTR dropped 18%','5.2% → 4.3% · RM 14K/day spend at risk','fa-rectangle-ad','var(--warning)','Pause & review creative'],
                ['Watsons account inactive 60+ days','RM 6.2M YTD · No activity since Jan','fa-building','var(--warning)','Re-engagement campaign'],
              ].map(([title, desc, ic, col, action]) => `
              <div style="background:var(--bg-secondary);border:1px solid ${col}33;border-left:3px solid ${col};border-radius:10px;padding:14px;display:flex;gap:12px">
                <i class="fas ${ic}" style="color:${col};font-size:18px;margin-top:2px;flex-shrink:0"></i>
                <div style="flex:1">
                  <div class="fw7 fs13 mb4">${title}</div>
                  <div class="fs11 text-secondary mb8">${desc}</div>
                  <div class="fs11" style="color:${col}">⚡ Recommended: ${action}</div>
                </div>
              </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Slide 6: Summary -->
        <div class="rai-slide">
          <div class="rai-slide-num">Slide 6 / 6</div>
          <div style="background:linear-gradient(135deg,#0f0f1f 0%,#1a0a14 100%);border-radius:12px;padding:32px;height:100%;display:flex;flex-direction:column;justify-content:space-between">
            <div class="fw8 fs18">Summary & Next Steps</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1;margin-top:20px">
              ${[
                ['Q1 Revenue','RM 142.3M vs RM 151.4M target. 94% attainment. Close probability 68% for remaining RM 9.1M gap.','var(--info)','fa-chart-bar'],
                ['Top Risk','Astro Arena RM 2.4M stalled at proposal for 34 days. Escalation required before Q1 close.','var(--danger)','fa-triangle-exclamation'],
                ['Ads Efficiency','Google Ads CTR anomaly detected. Recommend creative refresh on Campaign #4421.','var(--warning)','fa-rectangle-ad'],
                ['Opportunity','Watsons re-engagement + Petronas upsell could add RM 4.8M to Q1 pipeline.','var(--success)','fa-arrow-trend-up'],
              ].map(([title, desc, col, ic]) => `
              <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:14px">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <i class="fas ${ic}" style="color:${col}"></i>
                  <div class="fw7 fs13">${title}</div>
                </div>
                <div class="fs11 text-secondary">${desc}</div>
              </div>`).join('')}
            </div>
          </div>
        </div>

      </div><!-- /rai-preview-container -->
    </div><!-- /rai-panel-preview -->

  </div><!-- /rai-main -->

</div>

<script>
// Report AI scripts
function raiTab(tab, el) {
  document.querySelectorAll('.rai-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('rai-panel-build').style.display   = tab === 'build' ? 'flex' : 'none';
  document.getElementById('rai-panel-preview').style.display = tab === 'preview' ? 'flex' : 'none';
}
function fillRaiPrompt(el) {
  const ta = document.getElementById('raiInput');
  if (ta) { ta.value = el.textContent; ta.focus(); autoResize(ta); }
}
function handleRaiKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendRaiMessage(); }
}
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}
function sendRaiMessage() {
  const inp = document.getElementById('raiInput');
  const win = document.getElementById('raiChatWindow');
  if (!inp || !win || !inp.value.trim()) return;
  const msg = inp.value.trim(); inp.value = ''; inp.style.height = 'auto';
  win.innerHTML += \`
    <div class="msg-row user fade-in">
      <div class="msg-av user"><i class="fas fa-user"></i></div>
      <div class="msg-bub user">\${msg}</div>
    </div>
    <div class="msg-row fade-in" id="raiTyping">
      <div class="msg-av ai"><i class="fas fa-wand-magic-sparkles"></i></div>
      <div class="msg-bub ai"><div class="typing-row"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>
    </div>\`;
  win.scrollTop = win.scrollHeight;
  setTimeout(() => {
    const t = document.getElementById('raiTyping'); if (t) t.remove();
    win.innerHTML += \`
      <div class="msg-row fade-in">
        <div class="msg-av ai"><i class="fas fa-wand-magic-sparkles"></i></div>
        <div class="msg-bub ai">
          <div class="ai-sum">✅ Report generated for: <em>\${msg}</em></div>
          <div class="fs12 text-secondary mb10">In production, this would pull live data, render charts, and build a complete multi-page PPTX/PDF using your connected sources.</div>
          <div class="ai-acts">
            <button class="ai-act" onclick="raiTab('preview',document.getElementById('rai-tab-preview'))"><i class="fas fa-eye"></i>Preview</button>
            <button class="ai-act" onclick="exportReport('pptx')"><i class="fas fa-file-powerpoint"></i>Export PPTX</button>
            <button class="ai-act" onclick="saveReport()"><i class="fas fa-floppy-disk"></i>Save</button>
          </div>
        </div>
      </div>\`;
    win.scrollTop = win.scrollHeight;
  }, 2000);
}
function loadReport(name) {
  raiTab('preview', document.getElementById('rai-tab-preview'));
}
function saveReport() { showToast('Report saved ✓'); }
function renameReport() { showToast('Rename: enter a new name in a real app'); }
function rerunReport() { showToast('Rerunning report with latest data…'); }
function exportReport(fmt) { showToast('Exporting as ' + fmt.toUpperCase() + ' — in production this downloads a file.'); }
function newReport() {
  raiTab('build', document.getElementById('rai-tab-build'));
  document.getElementById('raiInput').focus();
}
function toggleSourceMenu() {
  const m = document.getElementById('sourceMenu');
  const f = document.getElementById('formatMenu');
  if (f) f.style.display = 'none';
  if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none';
}
function toggleFormatMenu() {
  const m = document.getElementById('formatMenu');
  const s = document.getElementById('sourceMenu');
  if (s) s.style.display = 'none';
  if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none';
}
function selectSource(s) { document.getElementById('sourceMenu').style.display='none'; showToast('Source: ' + s); }
function selectFormat(f) { document.getElementById('formatMenu').style.display='none'; showToast('Format: ' + f); }
function showToast(msg) {
  let t = document.getElementById('globalToast');
  if (!t) { t = document.createElement('div'); t.id='globalToast'; t.style.cssText='position:fixed;bottom:28px;right:28px;background:var(--bg-card);border:1px solid var(--border-light);color:var(--text-primary);padding:10px 18px;border-radius:10px;font-size:12px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.4)'; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity='1';
  setTimeout(() => { t.style.opacity='0'; }, 2800);
}
document.addEventListener('click', e => {
  if (!e.target.closest('.rai-input-wrap')) {
    const sm = document.getElementById('sourceMenu'); if (sm) sm.style.display='none';
    const fm = document.getElementById('formatMenu'); if (fm) fm.style.display='none';
  }
});
</script>
`;
}
