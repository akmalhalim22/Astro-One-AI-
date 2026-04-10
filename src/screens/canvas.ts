export function canvasScreen(): string {
  return `
<div class="content fade-in" style="display:flex;gap:0;padding:0;height:calc(100vh - var(--topbar-h));overflow:hidden">

  <!-- ── Active Data Source Indicator (top bar) ─────────────── -->
  <div style="position:absolute;top:0;left:280px;right:0;z-index:100;display:flex;align-items:center;gap:7px;padding:5px 14px;background:rgba(96,165,250,0.07);border-bottom:1px solid rgba(96,165,250,0.15);font-size:11px;color:var(--text-muted)">
    <i class="fas fa-database" style="color:#a78bfa"></i>
    <strong style="color:var(--text-primary)">Active Data Source:</strong>
    <span id="cvsActiveSource" style="color:#4285f4;font-weight:700">Pre-Sales · Pipeline</span>
    <span class="text-muted">·</span>
    <span id="cvsSourceMeta" style="font-size:10px">7 columns available</span>
    <span style="margin-left:auto;font-size:10px">Change source in left panel →</span>
  </div>

  <!-- ── Left Panel: Toolbox ────────────────────────────────── -->
  <div class="cvs-left">
    <div class="rai-panel-hd">
      <span class="rai-panel-title"><i class="fas fa-grid-2-plus"></i>Canvas</span>
      <button class="btn-primary" style="height:30px;font-size:11px;padding:0 12px" onclick="newCanvas()">
        <i class="fas fa-plus"></i>New
      </button>
    </div>

    <!-- Saved Canvases -->
    <div style="padding:10px 14px 6px;font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase">Saved Canvases</div>
    ${[
      ['Q1 Pipeline Pivot','3 charts · 2 pivots','27 Mar'],
      ['Revenue by Product','2 charts · 1 pivot','25 Mar'],
      ['Ads Channel Breakdown','4 charts · 0 pivots','22 Mar'],
      ['Client Health Matrix','1 chart · 3 pivots','18 Mar'],
    ].map(([name, meta, date]) => `
    <div class="rai-report-item" onclick="loadCanvas('${name}')">
      <i class="fas fa-layer-group" style="color:var(--purple);font-size:16px;flex-shrink:0"></i>
      <div style="flex:1;min-width:0">
        <div class="fw6 fs12 ellipsis">${name}</div>
        <div class="fs11 text-muted">${meta} · ${date}</div>
      </div>
    </div>`).join('')}

    <div style="border-top:1px solid var(--border);margin:10px 0"></div>

    <!-- Widget Toolbox -->
    <div style="padding:6px 14px;font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase">Add Widget</div>
    <div style="padding:6px 10px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${[
        ['fa-table-pivot','Pivot Table','pivot','var(--info)'],
        ['fa-chart-bar','Bar Chart','bar','var(--magenta)'],
        ['fa-chart-line','Line Chart','line','var(--success)'],
        ['fa-chart-pie','Donut / Pie','donut','var(--purple)'],
        ['fa-table-cells','Data Table','table','var(--teal)'],
        ['fa-hashtag','KPI Card','kpi','var(--orange)'],
      ].map(([ic, label, type, col]) => `
      <div class="cvs-tool-btn" draggable="true" ondragstart="dragWidget('${type}')" onclick="addWidget('${type}')">
        <i class="fas ${ic}" style="color:${col};font-size:16px"></i>
        <div class="fs11 fw6">${label}</div>
      </div>`).join('')}
    </div>

    <div style="border-top:1px solid var(--border);margin:10px 0"></div>

    <!-- Data Source -->
    <div style="padding:6px 14px;font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase">Data Source</div>
    <div style="padding:6px 14px">
      <select id="cvsDataSource" onchange="changeDataSource(this.value)"
        style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:7px;padding:7px 10px;font-family:inherit;font-size:12px">
        <option value="pipeline">Pre-Sales · Pipeline</option>
        <option value="revenue">Revenue Data</option>
        <option value="campaign">Campaign Performance</option>
        <option value="ads">Ads Performance</option>
        <option value="traffic">Traffic Data</option>
        <option value="social">Social Media</option>
        <option value="blended">Blended Source ✨</option>
      </select>
    </div>
    <div style="padding:0 14px 10px">
      <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px">Available Columns</div>
      <div id="cvsColumns" style="display:flex;flex-wrap:wrap;gap:5px">
        ${['deal_id','client_name','deal_value','stage','owner','probability','close_date'].map(col=>`
        <span class="cvs-col-tag" draggable="true" ondragstart="dragColumn('${col}')">${col}</span>`).join('')}
      </div>
    </div>

    <div style="border-top:1px solid var(--border);margin:4px 0"></div>
    <!-- Canvas Controls -->
    <div style="padding:10px 14px;display:flex;flex-direction:column;gap:8px">
      <button class="btn-ghost" style="width:100%;justify-content:center;height:32px;font-size:11px" onclick="saveCanvas()"><i class="fas fa-floppy-disk"></i>Save Canvas</button>
      <button class="btn-ghost" style="width:100%;justify-content:center;height:32px;font-size:11px" onclick="clearCanvas()"><i class="fas fa-trash"></i>Clear All</button>
    </div>
  </div>

  <!-- ── Main: Canvas Grid ──────────────────────────────────── -->
  <div class="cvs-main" id="cvsMain" ondragover="event.preventDefault()" ondrop="dropWidget(event)" style="padding-top:36px">

    <!-- Canvas Toolbar -->
    <div class="cvs-toolbar">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="fw7 fs13" id="cvsTitle">Q1 Pipeline Pivot</div>
        <button class="btn-ghost" style="height:26px;font-size:10px;padding:0 8px" onclick="renameCanvas()"><i class="fas fa-pen"></i></button>
      </div>
      <div style="flex:1"></div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 11px" onclick="toggleGrid()"><i class="fas fa-grid-2"></i>Grid</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 11px" onclick="autoLayout()"><i class="fas fa-wand-sparkles"></i>Auto Layout</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 11px" onclick="exportCanvas()"><i class="fas fa-download"></i>Export</button>
        <button class="btn-primary" style="height:30px;font-size:11px;padding:0 13px" onclick="saveCanvas()"><i class="fas fa-floppy-disk"></i>Save</button>
      </div>
    </div>

    <!-- Canvas Drop Zone -->
    <div class="cvs-grid" id="cvsGrid">

      <!-- Widget 1: Pivot Table -->
      <div class="cvs-widget" id="w1" style="grid-column:span 2">
        <div class="cvs-widget-hd">
          <div class="fw6 fs12"><i class="fas fa-table-pivot" style="color:var(--info);margin-right:6px"></i>Pipeline by Stage & Owner</div>
          <div style="display:flex;gap:6px">
            <button class="cvs-widget-btn" onclick="configWidget('w1')"><i class="fas fa-sliders"></i></button>
            <button class="cvs-widget-btn" onclick="removeWidget('w1')"><i class="fas fa-xmark"></i></button>
          </div>
        </div>
        <div class="cvs-pivot-controls">
          <div class="cvs-ctrl-grp">
            <div class="cvs-ctrl-label">Rows</div>
            <div class="cvs-ctrl-pills">
              <span class="cvs-pill">stage <i class="fas fa-xmark cvs-pill-rm" onclick="removePill(this)"></i></span>
            </div>
          </div>
          <div class="cvs-ctrl-grp">
            <div class="cvs-ctrl-label">Columns</div>
            <div class="cvs-ctrl-pills">
              <span class="cvs-pill">owner <i class="fas fa-xmark cvs-pill-rm" onclick="removePill(this)"></i></span>
            </div>
          </div>
          <div class="cvs-ctrl-grp">
            <div class="cvs-ctrl-label">Values</div>
            <div class="cvs-ctrl-pills">
              <span class="cvs-pill purple">SUM(deal_value) <i class="fas fa-xmark cvs-pill-rm" onclick="removePill(this)"></i></span>
            </div>
          </div>
          <div class="cvs-ctrl-grp">
            <div class="cvs-ctrl-label">Filter</div>
            <div class="cvs-ctrl-pills">
              <span class="cvs-pill amber">Q1 2025 <i class="fas fa-xmark cvs-pill-rm" onclick="removePill(this)"></i></span>
            </div>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="tbl cvs-pivot-tbl">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Priya S.</th><th>James O.</th><th>Aisha R.</th><th>Marcus T.</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['Prospecting',  '8.2','6.4','5.8','3.7','24.1'],
                ['Qualification','5.6','4.8','4.2','4.0','18.6'],
                ['Proposal',     '6.4','5.2','4.1','3.5','19.2'],
                ['Negotiation',  '4.8','3.6','3.8','2.6','14.8'],
                ['Closing',      '3.2','2.8','2.6','2.1','10.7'],
                ['Total',        '28.2','22.8','20.5','15.9','87.4'],
              ].map(([stage, ...vals], i) => `
              <tr ${i === 5 ? 'class="cvs-total-row"' : ''}>
                <td class="fw6">${stage}</td>
                ${vals.map((v, vi) => `<td class="${i===5||vi===4?'fw7 text-pink':''}" style="text-align:right">RM ${v}M</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Widget 2: Bar Chart -->
      <div class="cvs-widget">
        <div class="cvs-widget-hd">
          <div class="fw6 fs12"><i class="fas fa-chart-bar" style="color:var(--magenta);margin-right:6px"></i>Pipeline by Stage</div>
          <div style="display:flex;gap:6px">
            <select class="cvs-chart-select" onchange="changeCvsChartType('w2bar',this.value)">
              <option value="bar" selected>Bar</option>
              <option value="horizontalBar">Horiz. Bar</option>
              <option value="line">Line</option>
            </select>
            <button class="cvs-widget-btn" onclick="removeWidget('w2bar')"><i class="fas fa-xmark"></i></button>
          </div>
        </div>
        <div class="chart-container" style="height:180px">
          <canvas id="cvsBarChart"></canvas>
        </div>
      </div>

      <!-- Widget 3: Donut -->
      <div class="cvs-widget">
        <div class="cvs-widget-hd">
          <div class="fw6 fs12"><i class="fas fa-chart-pie" style="color:var(--purple);margin-right:6px"></i>Deal Value Mix</div>
          <div style="display:flex;gap:6px">
            <select class="cvs-chart-select" onchange="changeCvsChartType('w3donut',this.value)">
              <option value="doughnut" selected>Donut</option>
              <option value="pie">Pie</option>
            </select>
            <button class="cvs-widget-btn" onclick="removeWidget('w3donut')"><i class="fas fa-xmark"></i></button>
          </div>
        </div>
        <div class="chart-container" style="height:180px">
          <canvas id="cvsDonutChart"></canvas>
        </div>
      </div>

      <!-- Widget 4: KPI Cards -->
      <div class="cvs-widget" style="grid-column:span 2">
        <div class="cvs-widget-hd">
          <div class="fw6 fs12"><i class="fas fa-hashtag" style="color:var(--orange);margin-right:6px"></i>KPI Summary</div>
          <div style="display:flex;gap:6px">
            <button class="cvs-widget-btn" onclick="addKpiCard()"><i class="fas fa-plus"></i></button>
            <button class="cvs-widget-btn" onclick="removeWidget('w4kpi')"><i class="fas fa-xmark"></i></button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px" id="cvsKpiGrid">
          ${[
            ['RM 87.4M','Total Pipeline','var(--magenta)','+2.1%'],
            ['RM 41.2M','Weighted Value','var(--info)','+5.3%'],
            ['24 deals','Q1 Closing','var(--success)','RM 22.8M'],
            ['47 days','Avg Deal Cycle','var(--warning)','+6 days'],
          ].map(([val, label, col, sub]) => `
          <div class="cvs-kpi-card">
            <div class="cvs-kpi-val" style="color:${col}">${val}</div>
            <div class="cvs-kpi-label">${label}</div>
            <div class="cvs-kpi-sub">${sub}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Widget 5: Line Chart -->
      <div class="cvs-widget" style="grid-column:span 2">
        <div class="cvs-widget-hd">
          <div class="fw6 fs12"><i class="fas fa-chart-line" style="color:var(--success);margin-right:6px"></i>Pipeline Value Trend</div>
          <div style="display:flex;gap:6px">
            <select class="cvs-chart-select">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            <button class="cvs-widget-btn" onclick="removeWidget('w5line')"><i class="fas fa-xmark"></i></button>
          </div>
        </div>
        <div class="chart-container" style="height:160px">
          <canvas id="cvsLineChart"></canvas>
        </div>
      </div>

      <!-- Drop zone hint (shown when canvas is empty) -->
      <div id="cvsDropHint" style="display:none;grid-column:span 2;padding:40px;text-align:center;border:2px dashed var(--border);border-radius:12px;color:var(--text-muted)">
        <i class="fas fa-grid-2-plus" style="font-size:32px;margin-bottom:12px;display:block;color:var(--border-light)"></i>
        <div class="fs14 fw6 mb6">Drop widgets here</div>
        <div class="fs12">Select a widget from the toolbox or drag it onto the canvas</div>
      </div>

    </div><!-- /cvsGrid -->
  </div><!-- /cvsMain -->

  <!-- ── Config Panel (hidden by default) ──────────────────── -->
  <div class="cvs-config-panel" id="cvsConfigPanel" style="display:none">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <div class="fw7 fs13">Widget Settings</div>
      <button class="cvs-widget-btn" onclick="closeConfig()"><i class="fas fa-xmark"></i></button>
    </div>

    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Chart Type</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px">
      ${[['fa-chart-bar','Bar'],['fa-chart-line','Line'],['fa-chart-pie','Donut'],['fa-table-pivot','Pivot'],['fa-table','Table'],['fa-hashtag','KPI']].map(([ic,label])=>`
      <div class="cvs-type-btn"><i class="fas ${ic}"></i><div class="fs10">${label}</div></div>`).join('')}
    </div>

    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">X Axis / Rows</div>
    <select style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:6px 8px;font-family:inherit;font-size:11px;margin-bottom:10px">
      <option>stage</option><option>owner</option><option>client_name</option><option>close_date</option>
    </select>

    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Y Axis / Values</div>
    <select style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:6px 8px;font-family:inherit;font-size:11px;margin-bottom:10px">
      <option>SUM(deal_value)</option><option>COUNT(deal_id)</option><option>AVG(probability)</option>
    </select>

    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Color Theme</div>
    <div style="display:flex;gap:8px;margin-bottom:14px">
      ${['#e2007a','#60a5fa','#a78bfa','#00d68f','#f59e0b','#2dd4bf'].map(c=>`
      <div onclick="setWidgetColor('${c}')" style="width:24px;height:24px;border-radius:50%;background:${c};cursor:pointer;border:2px solid transparent" class="cvs-color-swatch"></div>`).join('')}
    </div>

    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Filter</div>
    <input type="text" placeholder="e.g. stage = Closing" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:7px 10px;font-family:inherit;font-size:11px;margin-bottom:14px">

    <button class="btn-primary" style="width:100%;justify-content:center;height:34px;font-size:12px" onclick="applyConfig()">
      <i class="fas fa-check"></i>Apply Changes
    </button>
  </div>

</div>

<script>
// ── Canvas scripts ──────────────────────────────────────────
let dragType = null;

function dragWidget(type) { dragType = type; }
function dragColumn(col) { dragType = 'col:' + col; }

function dropWidget(e) {
  e.preventDefault();
  if (!dragType) return;
  if (dragType.startsWith('col:')) {
    showToast('Column "' + dragType.slice(4) + '" — drop onto a widget to bind.');
  } else {
    addWidget(dragType);
  }
  dragType = null;
}

function addWidget(type) {
  const labels = {
    pivot: 'New Pivot Table',
    bar:   'New Bar Chart',
    line:  'New Line Chart',
    donut: 'New Donut Chart',
    table: 'New Data Table',
    kpi:   'New KPI Card',
  };
  showToast(labels[type] + ' added to canvas.');
}

function removeWidget(id) {
  const el = document.getElementById(id);
  if (el) { el.style.opacity='0'; el.style.transform='scale(0.95)'; setTimeout(()=>el.remove(),250); }
  else showToast('Widget removed.');
}

function configWidget(id) {
  const panel = document.getElementById('cvsConfigPanel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function closeConfig() {
  const panel = document.getElementById('cvsConfigPanel');
  if (panel) panel.style.display = 'none';
}

function applyConfig() { closeConfig(); showToast('Widget updated ✓'); }

function newCanvas() {
  document.getElementById('cvsTitle').textContent = 'Untitled Canvas';
  showToast('New canvas created.');
}

function loadCanvas(name) {
  document.getElementById('cvsTitle').textContent = name;
  showToast('Canvas loaded: ' + name);
}

function saveCanvas() { showToast('Canvas saved ✓'); }
function clearCanvas() { showToast('Canvas cleared — drag widgets to rebuild.'); }
function renameCanvas() {
  const t = document.getElementById('cvsTitle');
  const cur = t.textContent;
  const nw = prompt('Rename canvas:', cur);
  if (nw && nw.trim()) { t.textContent = nw.trim(); showToast('Renamed to: ' + nw.trim()); }
}
function toggleGrid() { showToast('Grid lines toggled.'); }
function autoLayout() { showToast('Auto layout applied ✓'); }
function exportCanvas() { showToast('Exporting canvas — in production this downloads PNG/PDF.'); }
function removePill(el) { el.closest('.cvs-pill').remove(); }
function addKpiCard() { showToast('KPI card added — configure metric in settings.'); }
function changeCvsChartType(id, type) { showToast('Chart type changed to ' + type); }
function setWidgetColor(c) {
  document.querySelectorAll('.cvs-color-swatch').forEach(s => s.style.borderColor='transparent');
  event.target.style.borderColor='#fff';
}
function changeDataSource(val) {
  const colSets = {
    pipeline: ['deal_id','client_name','deal_value','stage','owner','probability','close_date'],
    revenue:  ['month','client_name','product','amount','campaign_id','invoice_id','created_at'],
    campaign: ['campaign_id','name','client','type','budget','impressions','clicks','ctr','revenue'],
    ads:      ['date','platform','campaign_id','spend','impressions','clicks','ctr','roas'],
    traffic:  ['date','portal','sessions','users','engagement_rate','bounce_rate','fill_rate'],
    social:   ['date','platform','reach','impressions','engagements','eng_rate','followers'],
    blended:  ['source','date','client_name','revenue','sessions','impressions','roas','stage'],
  };
  const sourceNames = {
    pipeline: 'Pre-Sales · Pipeline',
    revenue:  'Revenue Data',
    campaign: 'Campaign Performance',
    ads:      'Ads Performance',
    traffic:  'Traffic Data',
    social:   'Social Media',
    blended:  'Blended Source ✨',
  };
  const cols = colSets[val] || [];
  const container = document.getElementById('cvsColumns');
  if (container) container.innerHTML = cols.map(col =>
    \`<span class="cvs-col-tag" draggable="true" ondragstart="dragColumn('\${col}')">\${col}</span>\`
  ).join('');
  
  // Update top indicator
  const activeEl = document.getElementById('cvsActiveSource');
  const metaEl = document.getElementById('cvsSourceMeta');
  if (activeEl) activeEl.textContent = sourceNames[val] || val;
  if (metaEl) metaEl.textContent = cols.length + ' columns available';
}

// ── Init canvas charts ─────────────────────────────────────
(function initCvsCharts() {
  if (typeof Chart === 'undefined') { setTimeout(initCvsCharts, 300); return; }

  const chartDefaults = {
    plugins: { legend: { display: false }, tooltip: { backgroundColor:'#0f0f1f', borderColor:'rgba(255,255,255,0.08)', borderWidth:1, titleColor:'#f0f0ff', bodyColor:'#8080a8', padding:10, cornerRadius:8 } },
    scales: {
      x: { grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:'#a0a0c0',font:{size:10}}, border:{display:false} },
      y: { grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#a0a0c0',font:{size:10}}, border:{display:false} }
    },
    responsive: true, maintainAspectRatio: false
  };

  // Bar
  const bc = document.getElementById('cvsBarChart');
  if (bc) new Chart(bc, {
    type: 'bar',
    data: {
      labels: ['Prospect','Qualify','Proposal','Negotiate','Closing'],
      datasets: [{
        label: 'Pipeline Value (RM M)',
        data: [24.1, 18.6, 19.2, 14.8, 10.7],
        backgroundColor: ['rgba(226,0,122,0.8)','rgba(226,0,122,0.65)','rgba(226,0,122,0.5)','rgba(226,0,122,0.38)','rgba(226,0,122,0.28)'],
        borderRadius: 5, borderSkipped: false
      }]
    },
    options: { ...chartDefaults, scales: { ...chartDefaults.scales, y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => 'RM'+v+'M' } } } }
  });

  // Donut
  const dc = document.getElementById('cvsDonutChart');
  if (dc) new Chart(dc, {
    type: 'doughnut',
    data: {
      labels: ['Enterprise','Mid-Market','SMB','Public'],
      datasets: [{
        data: [63, 22, 10, 5],
        backgroundColor: ['rgba(226,0,122,0.82)','rgba(96,165,250,0.75)','rgba(167,139,250,0.75)','rgba(45,212,191,0.75)'],
        borderColor: ['#e2007a','#60a5fa','#a78bfa','#2dd4bf'],
        borderWidth: 1.5, hoverOffset: 5
      }]
    },
    options: { responsive:true, maintainAspectRatio:false, cutout:'66%',
      plugins: { legend:{ display:true, position:'bottom', labels:{color:'#c8c8e8',font:{size:9},padding:10,boxWidth:9} }, tooltip: chartDefaults.plugins.tooltip }
    }
  });

  // Line
  const lc = document.getElementById('cvsLineChart');
  if (lc) new Chart(lc, {
    type: 'line',
    data: {
      labels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
      datasets: [
        { label:'Pipeline', data:[72.1,78.4,82.6,84.2,88.9,87.4], borderColor:'#e2007a', borderWidth:2.5, pointRadius:3, pointBackgroundColor:'#e2007a', fill:true,
          backgroundColor: ctx => { const g=ctx.chart.ctx.createLinearGradient(0,0,0,120); g.addColorStop(0,'rgba(226,0,122,0.25)'); g.addColorStop(1,'rgba(226,0,122,0.02)'); return g; }, tension:0.4 },
        { label:'Weighted', data:[34.1,37.2,40.8,38.6,42.1,41.2], borderColor:'#60a5fa', borderWidth:2, pointRadius:3, fill:false, tension:0.4 }
      ]
    },
    options: { ...chartDefaults,
      plugins: { ...chartDefaults.plugins, legend:{ display:true, position:'top', labels:{color:'#c8c8e8',font:{size:10},padding:10,boxWidth:10} } },
      scales: { ...chartDefaults.scales, y: { ...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback: v=>'RM'+v+'M'} } }
    }
  });
})();

if (typeof showToast !== 'function') {
  window.showToast = function(msg) {
    let t = document.getElementById('globalToast');
    if (!t) { t=document.createElement('div'); t.id='globalToast'; t.style.cssText='position:fixed;bottom:28px;right:28px;background:var(--bg-card);border:1px solid var(--border-light);color:var(--text-primary);padding:10px 18px;border-radius:10px;font-size:12px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.4)'; document.body.appendChild(t); }
    t.textContent=msg; t.style.opacity='1';
    setTimeout(()=>{ t.style.opacity='0'; }, 2800);
  };
}
</script>
`;
}
