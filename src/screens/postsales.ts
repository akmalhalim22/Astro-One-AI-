// ═══════════════════════════════════════════════════════════════════════════
//  POST-SALES MODULE  —  Revenue · Campaign · GAM Analytics
// ═══════════════════════════════════════════════════════════════════════════

// ─── Shared inline styles ────────────────────────────────────────────────────
const PS_CSS = `
<style>
/* ── filter bar ─────────────────────────────────────────────────── */
.ps-filter-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 14px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;margin-bottom:14px}
.ps-filter-bar label{font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.ps-filter-bar select,.ps-filter-bar input{background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--text-primary);font-size:11px;outline:none;height:30px}
.ps-filter-bar select:focus,.ps-filter-bar input:focus{border-color:#4285f4}
.ps-filter-sep{width:1px;height:20px;background:var(--border);margin:0 4px}
/* ── section header ─────────────────────────────────────────────── */
.ps-section-hd{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.ps-section-hd h3{font-size:13px;font-weight:700;color:var(--text-primary);margin:0}
.ps-section-hd .ps-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
/* ── data source pill ───────────────────────────────────────────── */
.ps-src{display:flex;align-items:center;gap:7px;padding:5px 12px;background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.15);border-radius:8px;margin-bottom:12px;font-size:11px;color:var(--text-muted);flex-wrap:wrap}
.ps-src strong{color:var(--text-primary)}
/* ── connection banner ──────────────────────────────────────────── */
.ps-banner{display:flex;align-items:center;gap:10px;padding:10px 15px;border-radius:11px;margin-bottom:14px;border:1px solid rgba(66,133,244,0.2);background:rgba(66,133,244,0.07);font-size:12px}
/* ── kpi grid ───────────────────────────────────────────────────── */
.ps-kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.ps-kpi-row-5{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px}
@media(max-width:900px){.ps-kpi-row,.ps-kpi-row-5{grid-template-columns:repeat(2,1fr)}}
.ps-kpi{background:var(--bg-card);border:1px solid var(--border);border-radius:13px;padding:14px 16px;display:flex;flex-direction:column;gap:4px}
.ps-kpi.accent{border-left:3px solid #4285f4}
.ps-kpi-icon{width:32px;height:32px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;margin-bottom:4px}
.ps-kpi-lbl{font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em}
.ps-kpi-val{font-size:22px;font-weight:800;color:var(--text-primary);line-height:1}
.ps-kpi-sub{font-size:11px;color:var(--text-muted)}
.ps-kpi-sub.up{color:#00d68f}.ps-kpi-sub.dn{color:#f43f5e}.ps-kpi-sub.flat{color:#f59e0b}
/* ── chart grid ─────────────────────────────────────────────────── */
.ps-g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.ps-g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px}
.ps-g62{display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:14px}
.ps-g26{display:grid;grid-template-columns:1fr 1.6fr;gap:12px;margin-bottom:14px}
@media(max-width:900px){.ps-g2,.ps-g3,.ps-g62,.ps-g26{grid-template-columns:1fr}}
/* ── table ──────────────────────────────────────────────────────── */
.ps-tbl-wrap{overflow-x:auto}
.ps-tbl{width:100%;border-collapse:collapse;font-size:12px}
.ps-tbl th{padding:8px 10px;text-align:left;background:var(--bg-input);border-bottom:2px solid var(--border);font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em;cursor:pointer;white-space:nowrap;user-select:none}
.ps-tbl th:hover{color:var(--text-primary)}
.ps-tbl th.sort-asc::after{content:' ▲';font-size:9px;color:#4285f4}
.ps-tbl th.sort-desc::after{content:' ▼';font-size:9px;color:#4285f4}
.ps-tbl td{padding:9px 10px;border-bottom:1px solid var(--border);vertical-align:middle}
.ps-tbl tr:hover td{background:rgba(66,133,244,0.04)}
.ps-tbl .num{text-align:right;font-variant-numeric:tabular-nums}
.ps-tbl .muted{color:var(--text-muted);font-size:11px}
/* ── expand rows ────────────────────────────────────────────────── */
.ps-order-row{cursor:pointer}
.ps-order-row:hover td{background:rgba(66,133,244,0.05)!important}
.ps-li-row td{background:rgba(0,0,0,0.12)!important;font-size:11px}
.ps-li-row:hover td{background:rgba(66,133,244,0.06)!important}
.ps-chevron{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:5px;background:rgba(66,133,244,0.1);color:#4285f4;font-size:9px;transition:transform .2s;flex-shrink:0}
.ps-chevron.open{transform:rotate(90deg)}
.ps-li-hdr th{background:rgba(167,139,250,0.08)!important;color:#a78bfa!important}
/* ── pagination ─────────────────────────────────────────────────── */
.ps-pag{display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)}
/* ── progress bar ───────────────────────────────────────────────── */
.ps-prog-wrap{height:5px;border-radius:3px;background:rgba(255,255,255,0.07);overflow:hidden}
.ps-prog-fill{height:5px;border-radius:3px;transition:width .6s ease}
/* ── platform pill ──────────────────────────────────────────────── */
.ps-plat{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700}
.ps-plat-gam{background:rgba(66,133,244,0.15);color:#4285f4}
.ps-plat-tiktok{background:rgba(20,20,20,0.4);color:#fff}
.ps-plat-fb{background:rgba(59,89,152,0.2);color:#6990d3}
.ps-plat-sheets{background:rgba(52,211,153,0.15);color:#34d399}
/* ── top-order bar ──────────────────────────────────────────────── */
.ps-hbar-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)}
.ps-hbar-name{flex:1;min-width:0;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ps-hbar-track{flex:2;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden}
.ps-hbar-fill{height:6px;border-radius:3px;transition:width .5s}
.ps-hbar-val{font-size:10px;color:var(--text-muted);white-space:nowrap;width:60px;text-align:right}
/* ── insight card ───────────────────────────────────────────────── */
.ps-insight{background:rgba(66,133,244,0.06);border:1px solid rgba(66,133,244,0.15);border-radius:10px;padding:10px 14px;font-size:11px}
.ps-insight-title{font-size:11px;font-weight:700;color:var(--text-primary);margin-bottom:4px}
/* ── trend indicator ────────────────────────────────────────────── */
.ps-trend-up{color:#00d68f;font-size:10px;font-weight:700}
.ps-trend-dn{color:#f43f5e;font-size:10px;font-weight:700}
.ps-trend-flat{color:#f59e0b;font-size:10px;font-weight:700}
/* ── GAM specific ───────────────────────────────────────────────── */
.gam-li-indent{padding-left:44px!important}
.gam-spark{display:inline-block;width:60px;height:16px;vertical-align:middle}
.gam-tab-bar{display:flex;gap:4px;margin-bottom:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:4px}
.gam-tab{padding:6px 14px;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--text-muted);transition:all .2s}
.gam-tab.active{background:rgba(66,133,244,0.15);color:#4285f4}
.gam-tab:hover:not(.active){background:rgba(255,255,255,0.05);color:var(--text-primary)}
.gam-under{color:#f43f5e;font-weight:700}
.gam-on{color:#00d68f;font-weight:700}
.gam-warn{color:#f59e0b;font-weight:700}
</style>`;

// ─── Shared utility ───────────────────────────────────────────────────────────
function _psIcon(color: string, icon: string) {
  return `<div class="ps-kpi-icon" style="background:${color}20;color:${color}"><i class="fas fa-${icon}"></i></div>`;
}
function _psKpi(accent: boolean, color: string, icon: string, lbl: string, valId: string, subId: string) {
  return `
  <div class="ps-kpi${accent?' accent':''}">
    ${_psIcon(color, icon)}
    <div class="ps-kpi-lbl">${lbl}</div>
    <div class="ps-kpi-val" id="${valId}"><span class="text-muted" style="font-size:14px">—</span></div>
    <div class="ps-kpi-sub" id="${subId}"></div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
//  1. REVENUE PERFORMANCE  (Management View)
// ═══════════════════════════════════════════════════════════════════════════
export function revenueScreen(): string {
  return `
${PS_CSS}
<div class="content fade-in">

<!-- ── Data source ─────────────────────────────────────────────────────── -->
<div class="ps-src">
  <i class="fas fa-table-cells" style="color:#34d399"></i>
  <strong>Google Sheets</strong> <span class="text-muted">·</span> "revenue" tab
  <span class="ps-plat ps-plat-sheets">Sheets · Live</span>
  <span id="rev-src-status" style="margin-left:auto;font-size:11px"></span>
</div>

<!-- ── Filters ─────────────────────────────────────────────────────────── -->
<div class="ps-filter-bar">
  <label>Financial Year</label>
  <select id="rev-fy" onchange="revApplyFilters()"><option value="">All Years</option></select>
  <div class="ps-filter-sep"></div>
  <label>Portal</label>
  <select id="rev-portal" onchange="revApplyFilters()"><option value="">All Portals</option></select>
  <div class="ps-filter-sep"></div>
  <label>Media Category</label>
  <select id="rev-cat" onchange="revApplyFilters()"><option value="">All Categories</option></select>
  <div class="ps-filter-sep"></div>
  <label>Revenue Type</label>
  <select id="rev-type" onchange="revApplyFilters()"><option value="">All Types</option></select>
  <div class="ps-filter-sep"></div>
  <label>Month</label>
  <select id="rev-month" onchange="revApplyFilters()"><option value="">All Months</option></select>
  <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="revReset()"><i class="fas fa-filter-circle-xmark"></i> Reset</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadRevenueData()"><i class="fas fa-rotate"></i> Refresh</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="revExportCSV()"><i class="fas fa-download"></i> CSV</button>
</div>

<!-- ── KPIs Row 1 ───────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(true,  '#4285f4','sack-dollar',    'Total Revenue',      'rev-kv-total',   'rev-ks-total')}
  ${_psKpi(false, '#00d68f','bullseye',        'Total Target',       'rev-kv-target',  'rev-ks-target')}
  ${_psKpi(false, '#f59e0b','chart-line',      '% Achievement',      'rev-kv-ach',     'rev-ks-ach')}
  ${_psKpi(false, '#a78bfa','arrow-trend-up',  'MoM Growth',         'rev-kv-mom',     'rev-ks-mom')}
</div>

<!-- ── KPIs Row 2 ───────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(false, '#34d399','globe',           'Top Portal',         'rev-kv-portal',  'rev-ks-portal')}
  ${_psKpi(false, '#60a5fa','tags',            'Top Media Category', 'rev-kv-cat',     'rev-ks-cat')}
  ${_psKpi(false, '#e879f9','layer-group',     'Revenue Types',      'rev-kv-types',   'rev-ks-types')}
  ${_psKpi(false, '#fb923c','calendar-check',  'Active Months',      'rev-kv-mths',    'rev-ks-mths')}
</div>

<!-- ── Row 3: Revenue Trend + Type Breakdown ────────────────────────────── -->
<div class="ps-g62">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-area" style="color:#4285f4;margin-right:6px"></i>Revenue vs Target Trend</div>
      <div style="display:flex;gap:6px;align-items:center">
        <button class="btn-ghost" id="rev-toggle-monthly" style="height:24px;font-size:10px;padding:0 8px;border-color:#4285f4;color:#4285f4" onclick="revSetChartMode('monthly')">Monthly</button>
        <span id="rev-trend-lbl" class="fs11 text-muted"></span>
      </div>
    </div>
    <div style="height:220px"><canvas id="revTrendChart"></canvas></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-pie" style="color:#a78bfa;margin-right:6px"></i>Revenue by Type</div>
    </div>
    <div style="height:150px"><canvas id="revTypeChart"></canvas></div>
    <div id="revTypeBars" style="margin-top:10px;display:flex;flex-direction:column;gap:6px"></div>
  </div>
</div>

<!-- ── Row 4: Portal Performance + Target vs Actual ─────────────────────── -->
<div class="ps-g2">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-globe" style="color:#00d68f;margin-right:6px"></i>Portal Performance</div>
      <span id="rev-portal-count" class="fs11 text-muted"></span>
    </div>
    <div id="revPortalBars" style="display:flex;flex-direction:column;gap:7px;min-height:80px">
      <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></div>
    </div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-scale-balanced" style="color:#f59e0b;margin-right:6px"></i>Target vs Actual (by Month)</div>
    </div>
    <div style="height:200px"><canvas id="revTvAChart"></canvas></div>
  </div>
</div>

<!-- ── Row 5: Entity/Category + Achievement Heatmap ──────────────────────── -->
<div class="ps-g2">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-building" style="color:#60a5fa;margin-right:6px"></i>Revenue by Entity</div>
      <span id="rev-entity-count" class="fs11 text-muted"></span>
    </div>
    <div id="revEntityBars" style="display:flex;flex-direction:column;gap:7px;min-height:80px">
      <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></div>
    </div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-grip" style="color:#e879f9;margin-right:6px"></i>Achievement by Portal (%)</div>
    </div>
    <div id="revAchGrid" style="display:flex;flex-direction:column;gap:5px;min-height:80px">
      <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></div>
    </div>
  </div>
</div>

<!-- ── Row 6: Revenue Detail Table ──────────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-table-list" style="color:#60a5fa;margin-right:6px"></i>Revenue Detail</div>
    <div style="display:flex;gap:6px;align-items:center">
      <input id="rev-search" type="text" placeholder="Search…" style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:160px;outline:none" oninput="revApplyFilters()">
      <span id="rev-count" class="fs11 text-muted"></span>
    </div>
  </div>
  <div class="ps-tbl-wrap">
    <table class="ps-tbl" id="revTable">
      <thead>
        <tr>
          <th onclick="revSort('portal')" id="revth-portal">Portal</th>
          <th onclick="revSort('entity')" id="revth-entity">Entity</th>
          <th onclick="revSort('fy')" id="revth-fy">FY</th>
          <th onclick="revSort('month')" id="revth-month">Month</th>
          <th onclick="revSort('category')" id="revth-category">Media Category</th>
          <th onclick="revSort('type')" id="revth-type">Type</th>
          <th onclick="revSort('revenue')" class="num" id="revth-revenue">Revenue</th>
          <th onclick="revSort('target')" class="num" id="revth-target">Target</th>
          <th class="num">Achievement</th>
        </tr>
      </thead>
      <tbody id="revTbody">
        <tr><td colspan="9" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ps-pag">
    <span id="rev-pag-info" class="fs11 text-muted">—</span>
    <div style="display:flex;gap:6px">
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="revPrevBtn" onclick="revPage(-1)" disabled>← Prev</button>
      <span id="rev-pag-lbl" class="fs11 text-muted" style="padding:0 6px;line-height:26px">Page 1</span>
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="revNextBtn" onclick="revPage(1)">Next →</button>
    </div>
  </div>
</div>

</div><!-- /content -->

<script>
// ── Revenue state ────────────────────────────────────────────────────────────
let _revRows=[], _revFiltered=[], _revPageNum=1, _revPageSz=25;
let _revSortKey='revenue', _revSortAsc=false;
let _revTrendChart=null, _revTypeChart=null, _revTvAChart=null;
const REV_COLORS=['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399','#60a5fa','#e879f9',
  '#fb923c','#38bdf8','#4ade80','#f472b6','#94a3b8','#fbbf24','#c084fc','#22d3ee','#86efac','#fca5a5',
  '#a5f3fc','#d8b4fe','#fed7aa','#bfdbfe'];
const TYPE_COLORS={'AA':'#4285f4','Direct':'#00d68f','Programmatic':'#f59e0b','Digital':'#a78bfa','Print':'#f43f5e'};

function revFmt(n){n=parseFloat(n)||0;if(n>=1e6)return'RM '+(n/1e6).toFixed(2)+'M';if(n>=1e3)return'RM '+(n/1e3).toFixed(1)+'K';return'RM '+n.toFixed(0);}
function revFmtShort(n){n=parseFloat(n)||0;if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n.toFixed(0);}

// ── Field accessors (flexible column name mapping) ───────────────────────────
function revG(r,keys){for(const k of keys){if(r[k]!==undefined&&r[k]!=='')return r[k];}return'';}
function revGetRevenue(r) {return revG(r,['Revenue','revenue','Amount','amount','Total','total','Rev','rev','Revenue (RM)','Revenue(RM)','Revenue RM','Nett','Net Revenue']);}
function revGetTarget(r)  {return revG(r,['Target','target','Budget','budget','Target Revenue','target_revenue','Budget (RM)']);}
function revGetPortal(r)  {return revG(r,['Portal','portal','Channel','channel','Portals','portals','Publication','Platform','Brand']);}
function revGetEntity(r)  {return revG(r,['Entity','entity','Business Unit','BusinessUnit','BU','Company','Subsidiary']);}
function revGetFY(r)      {return revG(r,['Financial Year','FinancialYear','FY','fy','financial_year','Year','year','FY Year','Fiscal Year']);}
function revGetMonth(r)   {return revG(r,['Month','month','Revenue Month','revenue_month','Period','Bulan','MonthYear']);}
function revGetType(r)    {return revG(r,['Revenue Type','RevenueType','Type','type','revenue_type','Rev Type','Revenue_Type']);}
function revGetCat(r)     {return revG(r,['Media Category','MediaCategory','Category','category','Media_Category','Ad Type','Product','media_category']);}
function revGetDate(r)    {return revG(r,['Date','date','Invoice Date','InvoiceDate','Transaction Date']);}

async function loadRevenueData(){
  const src=document.getElementById('rev-src-status');
  if(src)src.innerHTML='<i class="fas fa-spinner fa-spin" style="color:#4285f4;font-size:11px"></i> Loading…';
  try{
    console.log('[Revenue] Fetching /api/data/revenue…');
    const r=await fetch('/api/data/revenue').then(x=>x.json());
    console.log('[Revenue] API response:', {ok:r.ok, count:r.count, tab:r.tab, error:r.error, debug:r.debug});
    if(!r.ok){
      const msg=r.error||'Not connected';
      if(src)src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> '+msg+'</span>';
      revShowEmpty(msg); return;
    }
    _revRows=r.rows||[];
    if(_revRows.length>0){
      console.log('[Revenue] Columns detected:', Object.keys(_revRows[0]));
      console.log('[Revenue] Sample row:', _revRows[0]);
      console.log('[Revenue] Field mapping test on row 0:', {
        revenue: revGetRevenue(_revRows[0]), target: revGetTarget(_revRows[0]),
        portal: revGetPortal(_revRows[0]), entity: revGetEntity(_revRows[0]),
        fy: revGetFY(_revRows[0]), month: revGetMonth(_revRows[0]),
        type: revGetType(_revRows[0]), category: revGetCat(_revRows[0])
      });
    }
    if(_revRows.length===0){
      if(src)src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> Tab "'+r.tab+'" is empty</span>';
      revShowEmpty('No data rows in sheet tab "'+r.tab+'"'); return;
    }
    if(src)src.innerHTML='<span style="color:#00d68f;font-size:11px"><i class="fas fa-circle-check"></i> '+_revRows.length+' rows from "'+r.tab+'"</span>';
    revPopulateFilters();
    revApplyFilters();
  }catch(e){
    console.error('[Revenue] Error:', e);
    if(src)src.innerHTML='<span style="color:#f43f5e;font-size:11px"><i class="fas fa-xmark"></i> '+e.message+'</span>';
    revShowEmpty(e.message);
  }
}

function revShowEmpty(reason=''){
  const msg=reason?'<br><span style="font-size:10px;color:#48486a;margin-top:4px;display:block">'+reason+'</span>':'';
  const empty='<div style="text-align:center;padding:32px"><i class="fas fa-plug" style="color:#f59e0b;font-size:16px"></i><br><span style="font-size:11px;color:var(--text-muted);display:block;margin-top:8px">No data available'+msg+'</span></div>';
  document.getElementById('revTbody').innerHTML='<tr><td colspan="9">'+empty+'</td></tr>';
  ['revPortalBars','revEntityBars','revAchGrid'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';});
  ['rev-kv-total','rev-kv-target','rev-kv-ach','rev-kv-mom','rev-kv-portal','rev-kv-cat','rev-kv-types','rev-kv-mths'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<span style="font-size:14px;color:var(--text-muted)">—</span>';});
}

function revPopulateFilters(){
  const fys=[...new Set(_revRows.map(r=>revGetFY(r)).filter(Boolean))].sort().reverse();
  const portals=[...new Set(_revRows.map(r=>revGetPortal(r)).filter(Boolean))].sort();
  const cats=[...new Set(_revRows.map(r=>revGetCat(r)).filter(Boolean))].sort();
  const types=[...new Set(_revRows.map(r=>revGetType(r)).filter(Boolean))].sort();
  const months=[...new Set(_revRows.map(r=>revGetMonth(r)).filter(Boolean))];
  const fill=(id,arr,ph)=>{const el=document.getElementById(id);if(!el)return;const cur=el.value;el.innerHTML='<option value="">'+ph+'</option>'+arr.map(v=>'<option value="'+v+'"'+(v===cur?' selected':'')+'>'+v+'</option>').join('');};
  fill('rev-fy',fys,'All Years');fill('rev-portal',portals,'All Portals');fill('rev-cat',cats,'All Categories');fill('rev-type',types,'All Types');fill('rev-month',months,'All Months');
}

function revApplyFilters(){
  const fy=document.getElementById('rev-fy').value;
  const portal=document.getElementById('rev-portal').value;
  const cat=document.getElementById('rev-cat').value;
  const type=document.getElementById('rev-type').value;
  const month=document.getElementById('rev-month').value;
  const q=(document.getElementById('rev-search')?.value||'').toLowerCase();
  _revFiltered=_revRows.filter(r=>{
    if(fy&&revGetFY(r)!==fy) return false;
    if(portal&&revGetPortal(r)!==portal) return false;
    if(cat&&revGetCat(r)!==cat) return false;
    if(type&&revGetType(r)!==type) return false;
    if(month&&revGetMonth(r)!==month) return false;
    if(q&&!Object.values(r).some(v=>String(v).toLowerCase().includes(q))) return false;
    return true;
  });
  _revFiltered.sort((a,b)=>{
    let va,vb;
    if(_revSortKey==='revenue'){va=parseFloat(revGetRevenue(a))||0;vb=parseFloat(revGetRevenue(b))||0;}
    else if(_revSortKey==='target'){va=parseFloat(revGetTarget(a))||0;vb=parseFloat(revGetTarget(b))||0;}
    else if(_revSortKey==='portal'){va=revGetPortal(a);vb=revGetPortal(b);}
    else if(_revSortKey==='entity'){va=revGetEntity(a);vb=revGetEntity(b);}
    else if(_revSortKey==='fy'){va=revGetFY(a);vb=revGetFY(b);}
    else if(_revSortKey==='month'){va=revGetMonth(a);vb=revGetMonth(b);}
    else if(_revSortKey==='category'){va=revGetCat(a);vb=revGetCat(b);}
    else if(_revSortKey==='type'){va=revGetType(a);vb=revGetType(b);}
    else{va='';vb='';}
    if(va<vb)return _revSortAsc?-1:1;if(va>vb)return _revSortAsc?1:-1;return 0;
  });
  _revPageNum=1;
  revRenderKPIs();
  revRenderCharts();
  revRenderPortalBars();
  revRenderEntityBars();
  revRenderAchGrid();
  revRenderPage();
}

function revReset(){['rev-fy','rev-portal','rev-cat','rev-type','rev-month'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});const s=document.getElementById('rev-search');if(s)s.value='';revApplyFilters();}

function revRenderKPIs(){
  const totalRev=_revFiltered.reduce((s,r)=>s+parseFloat(revGetRevenue(r)||'0'),0);
  const totalTgt=_revFiltered.reduce((s,r)=>s+parseFloat(revGetTarget(r)||'0'),0);
  const ach=totalTgt>0?(totalRev/totalTgt*100).toFixed(1):'—';
  // By Portal
  const byPortal={};_revFiltered.forEach(r=>{const p=revGetPortal(r)||'—';byPortal[p]=(byPortal[p]||0)+parseFloat(revGetRevenue(r)||'0');});
  const topPortal=Object.entries(byPortal).sort((a,b)=>b[1]-a[1])[0]||['—',0];
  // By category
  const byCat={};_revFiltered.forEach(r=>{const c=revGetCat(r)||'—';byCat[c]=(byCat[c]||0)+parseFloat(revGetRevenue(r)||'0');});
  const topCat=Object.entries(byCat).sort((a,b)=>b[1]-a[1])[0]||['—',0];
  // Types count
  const types=new Set(_revFiltered.map(r=>revGetType(r)).filter(Boolean));
  // Months
  const months=new Set(_revFiltered.map(r=>revGetMonth(r)).filter(Boolean));
  // MoM: compare last two months
  const byMonth={};_revFiltered.forEach(r=>{const m=revGetMonth(r);if(m){byMonth[m]=(byMonth[m]||0)+parseFloat(revGetRevenue(r)||'0');}});
  const sortedMonths=Object.keys(byMonth).sort();
  let momTxt='—',momCls='';
  if(sortedMonths.length>=2){
    const last=byMonth[sortedMonths[sortedMonths.length-1]];
    const prev=byMonth[sortedMonths[sortedMonths.length-2]];
    const pct=prev>0?((last-prev)/prev*100).toFixed(1):null;
    if(pct!==null){momTxt=(parseFloat(pct)>=0?'+':'')+pct+'%';momCls=parseFloat(pct)>=0?'up':'dn';}
  }

  const setKpi=(vid,sid,val,subHtml,subCls='')=>{
    const v=document.getElementById(vid);const s=document.getElementById(sid);
    if(v)v.textContent=val;if(s){s.innerHTML=subHtml;if(subCls)s.className='ps-kpi-sub '+subCls;}
  };
  setKpi('rev-kv-total','rev-ks-total',revFmt(totalRev),'<span class="text-muted">'+_revFiltered.length+' records</span>');
  setKpi('rev-kv-target','rev-ks-target',revFmt(totalTgt),totalTgt?'<span class="text-muted">Total target</span>':'<span class="text-muted">No target data</span>');
  const achN=parseFloat(ach)||0;
  setKpi('rev-kv-ach','rev-ks-ach',ach!=='—'?ach+'%':ach,'<span>'+(achN>=100?'On target ✓':achN>=80?'Near target':'Below target')+'</span>',achN>=100?'up':achN>=80?'flat':'dn');
  setKpi('rev-kv-mom','rev-ks-mom',momTxt==='+0.0%'?'Flat':momTxt,'<span class="text-muted">vs prior month</span>',momCls||'flat');
  setKpi('rev-kv-portal','rev-ks-portal',String(topPortal[0]),'<span class="text-muted">'+revFmt(Number(topPortal[1]))+' highest</span>');
  setKpi('rev-kv-cat','rev-ks-cat',String(topCat[0]),'<span class="text-muted">'+revFmt(Number(topCat[1]))+'</span>');
  setKpi('rev-kv-types','rev-ks-types',String(types.size),'<span class="text-muted">revenue types</span>');
  setKpi('rev-kv-mths','rev-ks-mths',String(months.size),'<span class="text-muted">months with data</span>');
}

function revRenderCharts(){
  // Trend: group by Month
  const byMonth={};
  _revFiltered.forEach(r=>{const m=revGetMonth(r)||'?';byMonth[m]=(byMonth[m]||{rev:0,tgt:0});byMonth[m].rev+=parseFloat(revGetRevenue(r)||'0');byMonth[m].tgt+=parseFloat(revGetTarget(r)||'0');});
  const mLabels=Object.keys(byMonth);
  const mRevs=mLabels.map(k=>byMonth[k].rev);
  const mTgts=mLabels.map(k=>byMonth[k].tgt);
  const trendLbl=document.getElementById('rev-trend-lbl');
  if(trendLbl)trendLbl.textContent=mLabels.length+' months';
  const tCtx=document.getElementById('revTrendChart');
  if(tCtx){
    if(_revTrendChart){_revTrendChart.destroy();_revTrendChart=null;}
    _revTrendChart=new Chart(tCtx,{type:'line',data:{labels:mLabels,datasets:[
      {label:'Revenue',data:mRevs,borderColor:'#4285f4',backgroundColor:'rgba(66,133,244,0.08)',fill:true,tension:0.4,pointRadius:4,pointBackgroundColor:'#4285f4',borderWidth:2.5},
      {label:'Target',data:mTgts,borderColor:'#f59e0b',backgroundColor:'transparent',borderDash:[6,3],tension:0.3,pointRadius:3,borderWidth:1.5}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8080a8',font:{size:10},boxWidth:10,padding:10}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>revFmtShort(v)}}}}});
  }
  // Type donut — sorted highest to lowest, top-10, with % labels
  const byType={};_revFiltered.forEach(r=>{const t=revGetType(r)||'Other';byType[t]=(byType[t]||0)+parseFloat(revGetRevenue(r)||'0');});
  const tSorted=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const tLabels=tSorted.map(([k])=>k);const tVals=tSorted.map(([,v])=>v);
  const tColors=tLabels.map(k=>TYPE_COLORS[k]||REV_COLORS[tLabels.indexOf(k)%REV_COLORS.length]);
  const tTotal=tVals.reduce((s,v)=>s+v,0)||1;
  const ttCtx=document.getElementById('revTypeChart');
  if(ttCtx){
    if(_revTypeChart){_revTypeChart.destroy();_revTypeChart=null;}
    _revTypeChart=new Chart(ttCtx,{type:'doughnut',data:{labels:tLabels,datasets:[{data:tVals,backgroundColor:tColors,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8,generateLabels:ch=>{const ds=ch.data.datasets[0];return ch.data.labels.map((l,i)=>{const pct=Math.round(ds.data[i]/tTotal*100);return{text:l+' '+pct+'%',fillStyle:ds.backgroundColor[i],strokeStyle:'transparent',lineWidth:0,index:i};});}}},tooltip:{callbacks:{label:c=>{const pct=Math.round(c.parsed/tTotal*100);return ' '+c.label+': '+revFmt(c.parsed)+' ('+pct+'%)';}}}}}});
  }
  const tbEl=document.getElementById('revTypeBars');
  if(tbEl)tbEl.innerHTML=tLabels.map((l,i)=>{const pct=Math.round(tVals[i]/tTotal*100);return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+l+'</span><span class="fs11 fw7" style="color:'+tColors[i]+'">'+revFmt(tVals[i])+' <span style="opacity:.7">('+pct+'%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct*2.2+'%;max-width:100%;background:'+tColors[i]+'"></div></div></div>';}).join('');
  // Target vs Actual bar
  const tvaCtx=document.getElementById('revTvAChart');
  if(tvaCtx){
    if(_revTvAChart){_revTvAChart.destroy();_revTvAChart=null;}
    _revTvAChart=new Chart(tvaCtx,{type:'bar',data:{labels:mLabels,datasets:[
      {label:'Actual',data:mRevs,backgroundColor:'rgba(66,133,244,0.75)',borderRadius:4,borderWidth:0},
      {label:'Target',data:mTgts,backgroundColor:'rgba(245,158,11,0.35)',borderRadius:4,borderWidth:0}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8}}},scales:{x:{grid:{display:false},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>revFmtShort(v)}}}}});
  }
}

function revSetChartMode(mode){revRenderCharts();}

function revRenderPortalBars(){
  const el=document.getElementById('revPortalBars');
  const cntEl=document.getElementById('rev-portal-count');
  const byPortal={};_revFiltered.forEach(r=>{const p=revGetPortal(r)||'—';byPortal[p]=(byPortal[p]||0)+parseFloat(revGetRevenue(r)||'0');});
  const sorted=Object.entries(byPortal).sort((a,b)=>b[1]-a[1]).slice(0,10);  // top-10 highest→lowest
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';return;}
  const grandTotal=sorted.reduce((s,[,v])=>s+v,0)||1;
  const mx=sorted[0][1]||1;
  if(cntEl)cntEl.textContent='Top '+sorted.length+' portals';
  el.innerHTML=sorted.map(([name,val],i)=>{
    const barPct=Math.round(val/mx*100);const sharePct=Math.round(val/grandTotal*100);const col=REV_COLORS[i%REV_COLORS.length];
    return '<div class="ps-hbar-item"><span class="ps-hbar-name" title="'+name+'">'+name+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+barPct+'%;background:'+col+'"></div></div><span class="ps-hbar-val">'+revFmt(val)+' <span style="opacity:.6">('+sharePct+'%)</span></span></div>';
  }).join('');
}

function revRenderEntityBars(){
  const el=document.getElementById('revEntityBars');
  const cntEl=document.getElementById('rev-entity-count');
  const byEnt={};_revFiltered.forEach(r=>{const e=revGetEntity(r)||'—';byEnt[e]=(byEnt[e]||0)+parseFloat(revGetRevenue(r)||'0');});
  const sorted=Object.entries(byEnt).sort((a,b)=>b[1]-a[1]).slice(0,10);  // top-10 highest→lowest
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';return;}
  if(cntEl)cntEl.textContent='Top '+sorted.length+' entities';
  const grandTotal=sorted.reduce((s,[,v])=>s+v,0)||1;
  const mx=sorted[0][1]||1;
  el.innerHTML=sorted.map(([name,val],i)=>{
    const barPct=Math.round(val/mx*100);const sharePct=Math.round(val/grandTotal*100);const col=REV_COLORS[(i+5)%REV_COLORS.length];
    return '<div class="ps-hbar-item"><span class="ps-hbar-name" title="'+name+'">'+name+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+barPct+'%;background:'+col+'"></div></div><span class="ps-hbar-val">'+revFmt(val)+' <span style="opacity:.6">('+sharePct+'%)</span></span></div>';
  }).join('');
}

function revRenderAchGrid(){
  const el=document.getElementById('revAchGrid');
  const byPortal={};
  _revFiltered.forEach(r=>{const p=revGetPortal(r)||'—';if(!byPortal[p])byPortal[p]={rev:0,tgt:0};byPortal[p].rev+=parseFloat(revGetRevenue(r)||'0');byPortal[p].tgt+=parseFloat(revGetTarget(r)||'0');});
  const sorted=Object.entries(byPortal).filter(([,v])=>v.tgt>0).sort((a,b)=>b[1].rev-a[1].rev).slice(0,10);
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No target data available</div>';return;}
  el.innerHTML=sorted.map(([name,d])=>{
    const ach=d.tgt>0?Math.round(d.rev/d.tgt*100):0;
    const col=ach>=100?'#00d68f':ach>=80?'#f59e0b':'#f43f5e';
    const bg=ach>=100?'rgba(0,214,143,0.08)':ach>=80?'rgba(245,158,11,0.08)':'rgba(244,63,94,0.08)';
    return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">'+
      '<span style="flex:1;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+name+'">'+name+'</span>'+
      '<div style="flex:2;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden"><div style="height:8px;width:'+Math.min(ach,120)+'%;background:'+col+';border-radius:4px;transition:width .5s"></div></div>'+
      '<span style="font-size:11px;font-weight:700;color:'+col+';width:44px;text-align:right">'+ach+'%</span>'+
    '</div>';
  }).join('');
}

function revRenderPage(){
  const tbody=document.getElementById('revTbody');
  const start=(_revPageNum-1)*_revPageSz;
  const page=_revFiltered.slice(start,start+_revPageSz);
  const total=_revFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_revPageSz));
  document.getElementById('rev-pag-info').textContent=(start+1)+'–'+Math.min(start+_revPageSz,total)+' of '+total+' rows';
  document.getElementById('rev-pag-lbl').textContent='Page '+_revPageNum+' / '+pages;
  document.getElementById('revPrevBtn').disabled=_revPageNum<=1;
  document.getElementById('revNextBtn').disabled=_revPageNum>=pages;
  document.getElementById('rev-count').textContent=total+' records';
  if(!page.length){tbody.innerHTML='<tr><td colspan="9" class="text-muted" style="text-align:center;padding:24px">No records match current filters</td></tr>';return;}
  tbody.innerHTML=page.map(r=>{
    const rev=parseFloat(revGetRevenue(r)||'0');
    const tgt=parseFloat(revGetTarget(r)||'0');
    const ach=tgt>0?(rev/tgt*100).toFixed(1)+'%':'—';
    const achN=parseFloat(ach)||0;
    const achCol=achN>=100?'#00d68f':achN>=80?'#f59e0b':'#f43f5e';
    return '<tr>'+
      '<td class="fw6">'+(revGetPortal(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(revGetEntity(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(revGetFY(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(revGetMonth(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(revGetCat(r)||'—')+'</td>'+
      '<td><span class="ps-plat ps-plat-sheets" style="font-size:9px">'+(revGetType(r)||'—')+'</span></td>'+
      '<td class="num fw7" style="color:#4285f4">'+revFmt(rev)+'</td>'+
      '<td class="num muted">'+revFmt(tgt)+'</td>'+
      '<td class="num fw7" style="color:'+achCol+'">'+ach+'</td>'+
    '</tr>';
  }).join('');
}

function revSort(key){
  if(_revSortKey===key)_revSortAsc=!_revSortAsc;else{_revSortKey=key;_revSortAsc=false;}
  document.querySelectorAll('[id^="revth-"]').forEach(th=>{th.classList.remove('sort-asc','sort-desc');});
  const th=document.getElementById('revth-'+key);if(th)th.classList.add(_revSortAsc?'sort-asc':'sort-desc');
  revApplyFilters();
}
function revPage(dir){const pages=Math.max(1,Math.ceil(_revFiltered.length/_revPageSz));_revPageNum=Math.max(1,Math.min(pages,_revPageNum+dir));revRenderPage();}
function revExportCSV(){
  if(!_revFiltered.length)return;
  const keys=Object.keys(_revFiltered[0]||{});
  const csv=[keys.join(','),..._revFiltered.map(r=>keys.map(k=>'"'+(String(r[k]||'').replace(/"/g,'""'))+'"').join(','))].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='revenue.csv';a.click();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadRevenueData);
else setTimeout(loadRevenueData,80);
</script>
`;
}


// ═══════════════════════════════════════════════════════════════════════════
//  2. DIRECT CAMPAIGN PERFORMANCE  (Client & Sales View)
// ═══════════════════════════════════════════════════════════════════════════
export function campaignScreen(): string {
  return `
${PS_CSS}
<div class="content fade-in">

<!-- ── Data source ─────────────────────────────────────────────────────── -->
<div class="ps-src">
  <i class="fas fa-table-cells" style="color:#34d399"></i>
  <strong>Google Sheets</strong> <span class="text-muted">·</span> "direct campaign" tab
  <span class="ps-plat ps-plat-sheets">Sheets · Live</span>
  <span id="camp-src-status" style="margin-left:auto;font-size:11px"></span>
</div>

<!-- ── Filters ─────────────────────────────────────────────────────────── -->
<div class="ps-filter-bar">
  <label>FY</label>
  <select id="camp-fy" onchange="campApplyFilters()"><option value="">All Years</option></select>
  <div class="ps-filter-sep"></div>
  <label>Advertiser</label>
  <select id="camp-adv" onchange="campApplyFilters()"><option value="">All Advertisers</option></select>
  <div class="ps-filter-sep"></div>
  <label>Campaign Type</label>
  <select id="camp-type" onchange="campApplyFilters()"><option value="">All Types</option></select>
  <div class="ps-filter-sep"></div>
  <label>Platform</label>
  <select id="camp-platform" onchange="campApplyFilters()"><option value="">All Platforms</option></select>
  <div class="ps-filter-sep"></div>
  <label>Deal Type</label>
  <select id="camp-deal" onchange="campApplyFilters()"><option value="">All Deals</option></select>
  <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="campReset()"><i class="fas fa-filter-circle-xmark"></i> Reset</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadCampData()"><i class="fas fa-rotate"></i> Refresh</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="campExportCSV()"><i class="fas fa-download"></i> CSV</button>
</div>

<!-- ── KPIs Row 1 ───────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(true,  '#4285f4','sack-dollar',     'Total Direct Revenue',      'camp-kv-rev',    'camp-ks-rev')}
  ${_psKpi(false, '#a78bfa','bullhorn',         'Active Campaigns',          'camp-kv-count',  'camp-ks-count')}
  ${_psKpi(false, '#00d68f','building',         'Unique Advertisers',        'camp-kv-advs',   'camp-ks-advs')}
  ${_psKpi(false, '#f59e0b','coins',            'Avg Revenue / Campaign',    'camp-kv-avg',    'camp-ks-avg')}
</div>

<!-- ── KPIs Row 2 ───────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(false, '#34d399','crown',            'Top Advertiser',            'camp-kv-adv',    'camp-ks-adv')}
  ${_psKpi(false, '#60a5fa','industry',         'Top Industry',              'camp-kv-ind',    'camp-ks-ind')}
  ${_psKpi(false, '#e879f9','handshake',        'Top Deal Type',             'camp-kv-deal',   'camp-ks-deal')}
  ${_psKpi(false, '#fb923c','triangle-exclamation','Lost / Inactive Clients','camp-kv-lost',   'camp-ks-lost')}
</div>

<!-- ── Row 3: Revenue Trend + Campaign Type ─────────────────────────────── -->
<div class="ps-g62">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-line" style="color:#4285f4;margin-right:6px"></i>Revenue Trend (Monthly)</div>
      <span id="camp-trend-lbl" class="fs11 text-muted"></span>
    </div>
    <div style="height:220px"><canvas id="campTrendChart"></canvas></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-pie" style="color:#a78bfa;margin-right:6px"></i>Campaign Type Split</div>
    </div>
    <div style="height:150px"><canvas id="campTypeChart"></canvas></div>
    <div id="campTypeBars" style="margin-top:10px;display:flex;flex-direction:column;gap:6px"></div>
  </div>
</div>

<!-- ── Row 4: Top Advertisers + Deal Type + Platform ────────────────────── -->
<div class="ps-g3">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-building" style="color:#00d68f;margin-right:6px"></i>Top Advertisers</div>
      <span id="camp-adv-count" class="fs11 text-muted"></span>
    </div>
    <div id="campAdvBars" style="display:flex;flex-direction:column;gap:6px;min-height:80px">
      <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></div>
    </div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-handshake" style="color:#f59e0b;margin-right:6px"></i>Revenue by Deal Type</div>
    </div>
    <div id="campDealBars" style="display:flex;flex-direction:column;gap:6px"></div>
    <div style="height:120px;margin-top:8px"><canvas id="campDealChart"></canvas></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-layer-group" style="color:#60a5fa;margin-right:6px"></i>Revenue by Platform</div>
    </div>
    <div id="campPlatBars" style="display:flex;flex-direction:column;gap:6px"></div>
    <div style="height:120px;margin-top:8px"><canvas id="campPlatChart"></canvas></div>
  </div>
</div>

<!-- ── Row 5: Lost Client Analysis ──────────────────────────────────────── -->
<div class="card" style="margin-bottom:14px">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-user-slash" style="color:#f43f5e;margin-right:6px"></i>Lost / Inactive Client Detection</div>
    <span id="camp-lost-count" class="fs11 text-muted"></span>
  </div>
  <div id="campLostClients" style="display:flex;flex-direction:column;gap:6px;min-height:40px">
    <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
  </div>
</div>

<!-- ── Row 6: Campaign Performance Table ────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-table-list" style="color:#60a5fa;margin-right:6px"></i>Campaign Performance</div>
    <div style="display:flex;gap:6px;align-items:center">
      <input id="camp-search" type="text" placeholder="Search campaign, advertiser…" style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:220px;outline:none" oninput="campApplyFilters()">
      <span id="camp-count" class="fs11 text-muted"></span>
    </div>
  </div>
  <div class="ps-tbl-wrap">
    <table class="ps-tbl">
      <thead>
        <tr>
          <th onclick="campSort('campaign')" id="campth-campaign">Campaign</th>
          <th onclick="campSort('advertiser')" id="campth-advertiser">Advertiser</th>
          <th onclick="campSort('industry')" id="campth-industry">Industry</th>
          <th onclick="campSort('type')" id="campth-type">Type</th>
          <th onclick="campSort('platform')" id="campth-platform">Platform</th>
          <th onclick="campSort('deal')" id="campth-deal">Deal</th>
          <th onclick="campSort('fy')" id="campth-fy">FY</th>
          <th onclick="campSort('month')" id="campth-month">Month</th>
          <th onclick="campSort('revenue')" class="num" id="campth-revenue">Revenue</th>
        </tr>
      </thead>
      <tbody id="campTbody">
        <tr><td colspan="9" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ps-pag">
    <span id="camp-pag-info" class="fs11 text-muted">—</span>
    <div style="display:flex;gap:6px">
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="campPrevBtn" onclick="campPage(-1)" disabled>← Prev</button>
      <span id="camp-pag-lbl" class="fs11 text-muted" style="padding:0 6px;line-height:26px">Page 1</span>
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="campNextBtn" onclick="campPage(1)">Next →</button>
    </div>
  </div>
</div>

</div>
<script>
let _campRows=[], _campFiltered=[], _campPageNum=1, _campPageSz=25;
let _campSortKey='revenue', _campSortAsc=false;
let _campTrendChart=null, _campTypeChart=null, _campDealChart=null, _campPlatChart=null;
const CAMP_COLORS=['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399','#60a5fa','#e879f9','#fb923c','#38bdf8','#4ade80','#f472b6'];

function campFmt(n){n=parseFloat(n)||0;if(n>=1e6)return'RM '+(n/1e6).toFixed(2)+'M';if(n>=1e3)return'RM '+(n/1e3).toFixed(1)+'K';return'RM '+n.toFixed(0);}
function campFmtShort(n){n=parseFloat(n)||0;if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n.toFixed(0);}
function campG(r,keys){for(const k of keys){if(r[k]!==undefined&&r[k]!=='')return r[k];}return'';}

function campGetRevenue(r){return campG(r,['Total','total','Revenue','revenue','Amount','amount','Total Revenue','Total (RM)','Revenue (RM)','Nett','nett','Net Revenue','Gross Revenue']);}
function campGetAdv(r)    {return campG(r,['AdvertiserCompany','Advertiser','advertiser','Client','client','Company','company','Pengiklan','Advertiser Company']);}
function campGetIndustry(r){return campG(r,['Industry','industry','Sector','sector','Vertical','vertical','Industry Type','Product Industry']);}
function campGetFY(r)     {return campG(r,['Financial Year','FinancialYear','FY','fy','Year','year','financial_year','Fiscal Year']);}
function campGetMonth(r)  {return campG(r,['Month','month','Period','period','Revenue Month','Bulan','MonthYear']);}
function campGetType(r)   {return campG(r,['campaignType','Campaign Type','CampaignType','Type','type','Category','category','Jenis']);}
function campGetPlat(r)   {return campG(r,['Platform','platform','Channel','channel','Media','media','Ad Platform']);}
function campGetDeal(r)   {return campG(r,['DealType','Deal Type','deal_type','Deal','deal','Package','package','Deal Category']);}
function campGetCampaign(r){return campG(r,['Campaign Name','CampaignName','Campaign','campaign','Campaign Title','Name','name']);}
function campGetProduct(r){return campG(r,['ProductCategory','Product Category','product_category','Product','product','Ad Unit','Ad unit']);}

async function loadCampData(){
  const src=document.getElementById('camp-src-status');
  if(src)src.innerHTML='<i class="fas fa-spinner fa-spin" style="color:#4285f4;font-size:11px"></i> Loading…';
  try{
    console.log('[Campaign] Fetching /api/data/campaign…');
    const r=await fetch('/api/data/campaign').then(x=>x.json());
    console.log('[Campaign] API response:', {ok:r.ok, count:r.count, tab:r.tab, error:r.error});
    if(!r.ok){
      const msg=r.error||'Not connected';
      if(src)src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> '+msg+'</span>';
      campShowEmpty(msg); return;
    }
    _campRows=r.rows||[];
    if(_campRows.length>0){
      console.log('[Campaign] Columns:', Object.keys(_campRows[0]));
      console.log('[Campaign] Sample row:', _campRows[0]);
      console.log('[Campaign] Field map test:', {
        revenue:campGetRevenue(_campRows[0]), advertiser:campGetAdv(_campRows[0]),
        type:campGetType(_campRows[0]), platform:campGetPlat(_campRows[0]),
        deal:campGetDeal(_campRows[0]), industry:campGetIndustry(_campRows[0]),
        campaign:campGetCampaign(_campRows[0])
      });
    }
    if(_campRows.length===0){
      if(src)src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> Tab "'+r.tab+'" is empty</span>';
      campShowEmpty('No data in "'+r.tab+'"'); return;
    }
    if(src)src.innerHTML='<span style="color:#00d68f;font-size:11px"><i class="fas fa-circle-check"></i> '+_campRows.length+' rows from "'+r.tab+'"</span>';
    campPopulateFilters();
    campApplyFilters();
  }catch(e){
    console.error('[Campaign] Error:',e);
    if(src)src.innerHTML='<span style="color:#f43f5e;font-size:11px"><i class="fas fa-xmark"></i> '+e.message+'</span>';
    campShowEmpty(e.message);
  }
}

function campShowEmpty(reason=''){
  const msg=reason?'<br><span style="font-size:10px;color:#48486a;margin-top:4px;display:block">'+reason+'</span>':'';
  const empty='<div style="text-align:center;padding:32px"><i class="fas fa-plug" style="color:#f59e0b;font-size:16px"></i><br><span style="font-size:11px;color:var(--text-muted);display:block;margin-top:8px">No data available'+msg+'</span></div>';
  document.getElementById('campTbody').innerHTML='<tr><td colspan="9">'+empty+'</td></tr>';
  ['camp-kv-rev','camp-kv-count','camp-kv-advs','camp-kv-avg','camp-kv-adv','camp-kv-ind','camp-kv-deal','camp-kv-lost'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<span style="font-size:14px;color:var(--text-muted)">—</span>';});
  ['campAdvBars','campDealBars','campPlatBars','campLostClients'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';});
}

function campPopulateFilters(){
  const fys=[...new Set(_campRows.map(r=>campGetFY(r)).filter(Boolean))].sort().reverse();
  const advs=[...new Set(_campRows.map(r=>campGetAdv(r)).filter(Boolean))].sort();
  const types=[...new Set(_campRows.map(r=>campGetType(r)).filter(Boolean))].sort();
  const plats=[...new Set(_campRows.map(r=>campGetPlat(r)).filter(Boolean))].sort();
  const deals=[...new Set(_campRows.map(r=>campGetDeal(r)).filter(Boolean))].sort();
  const fill=(id,arr,ph)=>{const el=document.getElementById(id);if(!el)return;const cur=el.value;el.innerHTML='<option value="">'+ph+'</option>'+arr.map(v=>'<option value="'+v+'"'+(v===cur?' selected':'')+'>'+v+'</option>').join('');};
  fill('camp-fy',fys,'All Years');fill('camp-adv',advs,'All Advertisers');fill('camp-type',types,'All Types');fill('camp-platform',plats,'All Platforms');fill('camp-deal',deals,'All Deals');
}

function campApplyFilters(){
  const fy=document.getElementById('camp-fy').value;
  const adv=document.getElementById('camp-adv').value;
  const type=document.getElementById('camp-type').value;
  const plat=document.getElementById('camp-platform').value;
  const deal=document.getElementById('camp-deal').value;
  const q=(document.getElementById('camp-search')?.value||'').toLowerCase();
  _campFiltered=_campRows.filter(r=>{
    if(fy&&campGetFY(r)!==fy) return false;
    if(adv&&campGetAdv(r)!==adv) return false;
    if(type&&campGetType(r)!==type) return false;
    if(plat&&campGetPlat(r)!==plat) return false;
    if(deal&&campGetDeal(r)!==deal) return false;
    if(q&&!Object.values(r).some(v=>String(v).toLowerCase().includes(q))) return false;
    return true;
  });
  _campFiltered.sort((a,b)=>{
    let va,vb;
    if(_campSortKey==='revenue'){va=parseFloat(campGetRevenue(a))||0;vb=parseFloat(campGetRevenue(b))||0;}
    else if(_campSortKey==='advertiser'){va=campGetAdv(a);vb=campGetAdv(b);}
    else if(_campSortKey==='campaign'){va=campGetCampaign(a);vb=campGetCampaign(b);}
    else if(_campSortKey==='industry'){va=campGetIndustry(a);vb=campGetIndustry(b);}
    else if(_campSortKey==='type'){va=campGetType(a);vb=campGetType(b);}
    else if(_campSortKey==='platform'){va=campGetPlat(a);vb=campGetPlat(b);}
    else if(_campSortKey==='deal'){va=campGetDeal(a);vb=campGetDeal(b);}
    else if(_campSortKey==='fy'){va=campGetFY(a);vb=campGetFY(b);}
    else if(_campSortKey==='month'){va=campGetMonth(a);vb=campGetMonth(b);}
    else{va='';vb='';}
    if(va<vb)return _campSortAsc?-1:1;if(va>vb)return _campSortAsc?1:-1;return 0;
  });
  _campPageNum=1;
  campRenderKPIs();
  campRenderCharts();
  campRenderAdvBars();
  campRenderDealBars();
  campRenderPlatBars();
  campRenderLostClients();
  campRenderPage();
}

function campReset(){['camp-fy','camp-adv','camp-type','camp-platform','camp-deal'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});const s=document.getElementById('camp-search');if(s)s.value='';campApplyFilters();}

function campRenderKPIs(){
  const totalRev=_campFiltered.reduce((s,r)=>s+parseFloat(campGetRevenue(r)||'0'),0);
  const count=_campFiltered.length;
  const avg=count>0?totalRev/count:0;
  const advSet=new Set(_campFiltered.map(r=>campGetAdv(r)).filter(Boolean));
  const byAdv={};_campFiltered.forEach(r=>{const a=campGetAdv(r)||'—';byAdv[a]=(byAdv[a]||0)+parseFloat(campGetRevenue(r)||'0');});
  const topAdv=Object.entries(byAdv).sort((a,b)=>b[1]-a[1])[0]||['—',0];
  const byInd={};_campFiltered.forEach(r=>{const i=campGetIndustry(r)||'—';byInd[i]=(byInd[i]||0)+parseFloat(campGetRevenue(r)||'0');});
  const topInd=Object.entries(byInd).filter(([k])=>k!=='—').sort((a,b)=>b[1]-a[1])[0]||['—',0];
  const byDeal={};_campFiltered.forEach(r=>{const d=campGetDeal(r)||'—';byDeal[d]=(byDeal[d]||0)+parseFloat(campGetRevenue(r)||'0');});
  const topDeal=Object.entries(byDeal).filter(([k])=>k!=='—').sort((a,b)=>b[1]-a[1])[0]||['—',0];
  // Lost clients: advertisers present in prior months but not recent
  const byAdvMonth={};_campFiltered.forEach(r=>{const a=campGetAdv(r);const m=campGetMonth(r);if(a&&m){if(!byAdvMonth[a])byAdvMonth[a]=new Set();byAdvMonth[a].add(m);}});
  const allMonths=[...new Set(_campFiltered.map(r=>campGetMonth(r)).filter(Boolean))].sort();
  const recentMonth=allMonths[allMonths.length-1]||'';
  const lostClients=Object.entries(byAdvMonth).filter(([,ms])=>!ms.has(recentMonth)&&ms.size>0);

  const setKpi=(vid,sid,val,sub,cls='')=>{const v=document.getElementById(vid);const s=document.getElementById(sid);if(v)v.textContent=val;if(s){s.innerHTML=sub;if(cls)s.className='ps-kpi-sub '+cls;}};
  setKpi('camp-kv-rev','camp-ks-rev',campFmt(totalRev),'<span class="text-muted">'+count+' records</span>');
  setKpi('camp-kv-count','camp-ks-count',count.toLocaleString(),'<span class="text-muted">campaign records</span>');
  setKpi('camp-kv-advs','camp-ks-advs',advSet.size.toString(),'<span class="text-muted">unique advertisers</span>');
  setKpi('camp-kv-avg','camp-ks-avg',campFmt(avg),'<span class="text-muted">per campaign</span>');
  setKpi('camp-kv-adv','camp-ks-adv',String(topAdv[0]),'<span class="text-muted">'+campFmt(Number(topAdv[1]))+'</span>');
  setKpi('camp-kv-ind','camp-ks-ind',String(topInd[0]),'<span class="text-muted">'+campFmt(Number(topInd[1]))+'</span>');
  setKpi('camp-kv-deal','camp-ks-deal',String(topDeal[0]),'<span class="text-muted">'+campFmt(Number(topDeal[1]))+'</span>');
  setKpi('camp-kv-lost','camp-ks-lost',String(lostClients.length),'<span class="text-muted">not in recent month</span>',lostClients.length>0?'dn':'');
}

function campRenderCharts(){
  const byMonth={};
  _campFiltered.forEach(r=>{const m=campGetMonth(r)||'?';byMonth[m]=(byMonth[m]||0)+parseFloat(campGetRevenue(r)||'0');});
  const mL=Object.keys(byMonth);const mV=mL.map(k=>byMonth[k]);
  const tCtx=document.getElementById('campTrendChart');
  const tlbl=document.getElementById('camp-trend-lbl');
  if(tlbl)tlbl.textContent=mL.length+' months';
  if(tCtx){
    if(_campTrendChart){_campTrendChart.destroy();_campTrendChart=null;}
    _campTrendChart=new Chart(tCtx,{type:'bar',data:{labels:mL,datasets:[{label:'Revenue',data:mV,backgroundColor:'rgba(66,133,244,0.7)',borderRadius:5,borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>campFmtShort(v)}}}}});
  }
  const byType={};
  _campFiltered.forEach(r=>{const t=campGetType(r)||'Other';byType[t]=(byType[t]||0)+parseFloat(campGetRevenue(r)||'0');});
  const tSorted=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,10);  // top-10 high→low
  const tLabels=tSorted.map(([k])=>k);const tVals=tSorted.map(([,v])=>v);
  const tColors=tLabels.map((_,i)=>CAMP_COLORS[i%CAMP_COLORS.length]);
  const tTotal=tVals.reduce((s,v)=>s+v,0)||1;
  const ttCtx=document.getElementById('campTypeChart');
  if(ttCtx){
    if(_campTypeChart){_campTypeChart.destroy();_campTypeChart=null;}
    _campTypeChart=new Chart(ttCtx,{type:'doughnut',data:{labels:tLabels,datasets:[{data:tVals,backgroundColor:tColors,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8,generateLabels:ch=>{const ds=ch.data.datasets[0];return ch.data.labels.map((l,i)=>{const pct=Math.round(ds.data[i]/tTotal*100);return{text:l+' '+pct+'%',fillStyle:ds.backgroundColor[i],strokeStyle:'transparent',lineWidth:0,index:i};});}}},tooltip:{callbacks:{label:c=>{const pct=Math.round(c.parsed/tTotal*100);return ' '+c.label+': '+campFmt(c.parsed)+' ('+pct+'%)';}}}}}}); 
  }
  const tot=tVals.reduce((s,v)=>s+v,0)||1;
  const tbEl=document.getElementById('campTypeBars');
  if(tbEl)tbEl.innerHTML=tLabels.map((l,i)=>{const pct=Math.round(tVals[i]/tot*100);return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+l+'</span><span class="fs11 fw7" style="color:'+tColors[i]+'">'+campFmt(tVals[i])+' <span style="opacity:.7">('+pct+'%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct*2.2+'%;max-width:100%;background:'+tColors[i]+'"></div></div></div>';}).join('');
}

function campRenderAdvBars(){
  const el=document.getElementById('campAdvBars');const cntEl=document.getElementById('camp-adv-count');
  const byAdv={};_campFiltered.forEach(r=>{const a=campGetAdv(r)||'—';byAdv[a]=(byAdv[a]||0)+parseFloat(campGetRevenue(r)||'0');});
  const sorted=Object.entries(byAdv).sort((a,b)=>b[1]-a[1]).slice(0,10);  // top-10 high→low
  if(cntEl)cntEl.textContent='Top 10 of '+Object.keys(byAdv).length+' advertisers';
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';return;}
  const grandTotal=sorted.reduce((s,[,v])=>s+v,0)||1;
  const mx=sorted[0][1]||1;
  el.innerHTML=sorted.map(([name,val],i)=>{const barPct=Math.round(val/mx*100);const sharePct=Math.round(val/grandTotal*100);const col=CAMP_COLORS[i%CAMP_COLORS.length];return '<div class="ps-hbar-item"><span class="ps-hbar-name" title="'+name+'">'+name+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+barPct+'%;background:'+col+'"></div></div><span class="ps-hbar-val">'+campFmt(val)+' <span style="opacity:.6">('+sharePct+'%)</span></span></div>';}).join('');
}

function campRenderDealBars(){
  const el=document.getElementById('campDealBars');
  const byDeal={};_campFiltered.forEach(r=>{const d=campGetDeal(r)||'—';byDeal[d]=(byDeal[d]||0)+parseFloat(campGetRevenue(r)||'0');});
  const sorted=Object.entries(byDeal).sort((a,b)=>b[1]-a[1]).slice(0,10);  // top-10 high→low
  const tot=sorted.reduce((s,[,v])=>s+v,0)||1;
  el.innerHTML=sorted.map(([name,val],i)=>{const pct=Math.round(val/tot*100);const col=CAMP_COLORS[i%CAMP_COLORS.length];return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+name+'</span><span class="fs11 fw7" style="color:'+col+'">'+campFmt(val)+' <span class="text-muted">('+pct+'%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct*2.2+'%;max-width:100%;background:'+col+'"></div></div></div>';}).join('');
  const dCtx=document.getElementById('campDealChart');
  if(dCtx){
    if(_campDealChart){_campDealChart.destroy();_campDealChart=null;}
    _campDealChart=new Chart(dCtx,{type:'doughnut',data:{labels:sorted.map(([l])=>l),datasets:[{data:sorted.map(([,v])=>v),backgroundColor:sorted.map((_,i)=>CAMP_COLORS[i%CAMP_COLORS.length]),borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:6,generateLabels:ch=>{const ds=ch.data.datasets[0];return ch.data.labels.map((l,i)=>{const pct=Math.round(ds.data[i]/tot*100);return{text:l+' '+pct+'%',fillStyle:ds.backgroundColor[i],strokeStyle:'transparent',lineWidth:0,index:i};});}}},tooltip:{callbacks:{label:c=>{const pct=Math.round(c.parsed/tot*100);return ' '+c.label+': '+campFmt(c.parsed)+' ('+pct+'%)';}}}}}}); 
  }
}

function campRenderPlatBars(){
  const el=document.getElementById('campPlatBars');
  const byPlat={};_campFiltered.forEach(r=>{const p=campGetPlat(r)||'—';byPlat[p]=(byPlat[p]||0)+parseFloat(campGetRevenue(r)||'0');});
  const sorted=Object.entries(byPlat).sort((a,b)=>b[1]-a[1]).slice(0,10);  // top-10 high→low
  const tot=sorted.reduce((s,[,v])=>s+v,0)||1;
  el.innerHTML=sorted.map(([name,val],i)=>{const pct=Math.round(val/tot*100);const col=CAMP_COLORS[(i+3)%CAMP_COLORS.length];return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+name+'</span><span class="fs11 fw7" style="color:'+col+'">'+campFmt(val)+' <span class="text-muted">('+pct+'%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct*2.2+'%;max-width:100%;background:'+col+'"></div></div></div>';}).join('');
  const pCtx=document.getElementById('campPlatChart');
  if(pCtx){
    if(_campPlatChart){_campPlatChart.destroy();_campPlatChart=null;}
    _campPlatChart=new Chart(pCtx,{type:'doughnut',data:{labels:sorted.map(([l])=>l),datasets:[{data:sorted.map(([,v])=>v),backgroundColor:sorted.map((_,i)=>CAMP_COLORS[(i+3)%CAMP_COLORS.length]),borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:6,generateLabels:ch=>{const ds=ch.data.datasets[0];return ch.data.labels.map((l,i)=>{const pct=Math.round(ds.data[i]/tot*100);return{text:l+' '+pct+'%',fillStyle:ds.backgroundColor[i],strokeStyle:'transparent',lineWidth:0,index:i};});}}},tooltip:{callbacks:{label:c=>{const pct=Math.round(c.parsed/tot*100);return ' '+c.label+': '+campFmt(c.parsed)+' ('+pct+'%)';}}}}}});
  }
}

function campRenderLostClients(){
  const el=document.getElementById('campLostClients');
  const cntEl=document.getElementById('camp-lost-count');
  const byAdvMonth={};
  const byAdvRev={};
  _campFiltered.forEach(r=>{
    const a=campGetAdv(r);const m=campGetMonth(r);const v=parseFloat(campGetRevenue(r)||'0');
    if(a){if(!byAdvMonth[a])byAdvMonth[a]=new Set();if(m)byAdvMonth[a].add(m);byAdvRev[a]=(byAdvRev[a]||0)+v;}
  });
  const allMonths=[...new Set(_campFiltered.map(r=>campGetMonth(r)).filter(Boolean))].sort();
  const recentMonth=allMonths[allMonths.length-1]||'';
  const prevMonth=allMonths[allMonths.length-2]||'';
  const lostClients=Object.entries(byAdvMonth)
    .filter(([,ms])=>prevMonth?ms.has(prevMonth)&&!ms.has(recentMonth):!ms.has(recentMonth)&&ms.size>0)
    .sort((a,b)=>(byAdvRev[b[0]]||0)-(byAdvRev[a[0]]||0));
  if(cntEl)cntEl.textContent=lostClients.length+' inactive in '+recentMonth;
  if(!lostClients.length){
    el.innerHTML='<div class="text-muted fs12" style="padding:10px;text-align:center"><i class="fas fa-circle-check" style="color:#00d68f;margin-right:6px"></i>No inactive clients detected in current view</div>';
    return;
  }
  el.innerHTML='<div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px 0">'+
    lostClients.slice(0,20).map(([name])=>{
      const rev=byAdvRev[name]||0;
      return '<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(244,63,94,0.08);border:1px solid rgba(244,63,94,0.15);border-radius:8px">'+
        '<i class="fas fa-user-slash" style="color:#f43f5e;font-size:10px"></i>'+
        '<span style="font-size:11px;font-weight:600">'+name+'</span>'+
        '<span style="font-size:10px;color:var(--text-muted)">'+campFmt(rev)+' hist.</span>'+
      '</div>';
    }).join('')+'</div>';
}

function campRenderPage(){
  const tbody=document.getElementById('campTbody');
  const start=(_campPageNum-1)*_campPageSz;
  const page=_campFiltered.slice(start,start+_campPageSz);
  const total=_campFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_campPageSz));
  document.getElementById('camp-pag-info').textContent=(start+1)+'–'+Math.min(start+_campPageSz,total)+' of '+total;
  document.getElementById('camp-pag-lbl').textContent='Page '+_campPageNum+' / '+pages;
  document.getElementById('campPrevBtn').disabled=_campPageNum<=1;
  document.getElementById('campNextBtn').disabled=_campPageNum>=pages;
  document.getElementById('camp-count').textContent=total+' campaigns';
  if(!page.length){tbody.innerHTML='<tr><td colspan="9" class="text-muted" style="text-align:center;padding:24px">No records match current filters</td></tr>';return;}
  tbody.innerHTML=page.map(r=>{
    const rev=parseFloat(campGetRevenue(r)||'0');
    const campaign=campGetCampaign(r)||'—';
    return '<tr>'+
      '<td class="fw6" style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+campaign+'">'+campaign+'</td>'+
      '<td class="muted fs11">'+(campGetAdv(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(campGetIndustry(r)||'—')+'</td>'+
      '<td><span style="font-size:9px;padding:2px 6px;border-radius:5px;background:rgba(66,133,244,0.12);color:#4285f4;white-space:nowrap">'+(campGetType(r)||'—')+'</span></td>'+
      '<td class="muted fs11">'+(campGetPlat(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(campGetDeal(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(campGetFY(r)||'—')+'</td>'+
      '<td class="muted fs11">'+(campGetMonth(r)||'—')+'</td>'+
      '<td class="num fw7" style="color:#4285f4">'+campFmt(rev)+'</td>'+
    '</tr>';
  }).join('');
}

function campSort(key){if(_campSortKey===key)_campSortAsc=!_campSortAsc;else{_campSortKey=key;_campSortAsc=false;}campApplyFilters();}
function campPage(dir){const pages=Math.max(1,Math.ceil(_campFiltered.length/_campPageSz));_campPageNum=Math.max(1,Math.min(pages,_campPageNum+dir));campRenderPage();}
function campExportCSV(){
  if(!_campFiltered.length)return;
  const keys=Object.keys(_campFiltered[0]||{});
  const csv=[keys.join(','),..._campFiltered.map(r=>keys.map(k=>'"'+(String(r[k]||'').replace(/"/g,'""'))+'"').join(','))].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='campaigns.csv';a.click();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadCampData);
else setTimeout(loadCampData,80);
</script>
`;
}


// ═══════════════════════════════════════════════════════════════════════════
//  3. GAM ANALYTICS  (Management High-Level View)
// ═══════════════════════════════════════════════════════════════════════════
export function gamAnalyticsScreen(): string {
  return `
${PS_CSS}
<style>
.gam-li-indent{padding-left:44px!important}
.gam-tab-bar{display:flex;gap:4px;margin-bottom:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:4px}
.gam-tab{padding:6px 16px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--text-muted);transition:all .2s}
.gam-tab.active{background:rgba(66,133,244,0.15);color:#4285f4}
.gam-tab:hover:not(.active){background:rgba(255,255,255,0.05);color:var(--text-primary)}
</style>
<div class="content fade-in">

<!-- ── Data source ─────────────────────────────────────────────────────── -->
<div class="ps-src">
  <i class="fab fa-google" style="color:#4285f4"></i>
  <strong>Google Ad Manager</strong> <span class="text-muted">·</span> Orders &amp; Line Items
  <span class="ps-plat ps-plat-gam">GAM API · Live</span>
  <span class="b b-gray fs10">Network: <span id="gam-ds-network" style="color:#60a5fa">—</span></span>
  <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-satellite-dish" style="margin-right:4px"></i>Real-time · auto-loads on open</span>
</div>

<!-- ── Status Banner ───────────────────────────────────────────────────── -->
<div id="gamBanner" class="ps-banner">
  <i class="fas fa-spinner fa-spin" id="gamBannerIcon" style="color:#4285f4;font-size:14px"></i>
  <span id="gamBannerText" style="flex:1;color:#60a5fa;font-size:12px">Loading live data from Google Ad Manager…</span>
  <span id="gamLastRefresh" style="font-size:10px;color:var(--text-muted)"></span>
  <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" onclick="loadGAMAnalytics(true)">
    <i class="fas fa-rotate" id="gamRefreshIcon"></i> Refresh
  </button>
</div>

<!-- ── View Tab Bar ─────────────────────────────────────────────────────── -->
<div class="gam-tab-bar">
  <button class="gam-tab active" id="gamTab-overview" onclick="gamSwitchTab('overview')"><i class="fas fa-chart-pie" style="margin-right:5px"></i>Overview</button>
  <button class="gam-tab" id="gamTab-running" onclick="gamSwitchTab('running')"><i class="fas fa-circle-play" style="margin-right:5px;color:#00d68f"></i>Running Campaigns</button>
  <button class="gam-tab" id="gamTab-completed" onclick="gamSwitchTab('completed')"><i class="fas fa-flag-checkered" style="margin-right:5px;color:#60a5fa"></i>Completed Orders</button>
</div>

<!-- ═══ OVERVIEW TAB ════════════════════════════════════════════════════════ -->
<div id="gamView-overview">

<!-- ── KPI Strip ─────────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(true,  '#4285f4','file-invoice',   'Total Orders',          'kv-orders',   'kc-orders')}
  ${_psKpi(false, '#00d68f','circle-play',    'Running / Delivering',  'kv-active',   'kc-active')}
  ${_psKpi(false, '#60a5fa','flag-checkered', 'Completed Orders',      'kv-completed','kc-completed')}
  ${_psKpi(false, '#a78bfa','layer-group',    'Total Line Items',      'kv-li',       'kc-li')}
</div>
<div class="ps-kpi-row">
  ${_psKpi(false, '#f59e0b','eye',            'Impressions Delivered', 'kv-impr',     'kc-impr')}
  ${_psKpi(false, '#34d399','computer-mouse', 'Total Clicks',          'kv-clicks',   'kc-clicks')}
  ${_psKpi(false, '#e879f9','percent',        'Overall CTR',           'kv-ctr',      'kc-ctr')}
  ${_psKpi(false, '#fb923c','network-wired',  'Active Ad Units',       'kv-adunits',  'kc-adunits')}
</div>

<!-- ── Row 2: Order Status + LI Status ─────────────────────────────────── -->
<div class="ps-g62">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-circle-dot" style="color:#4285f4;margin-right:7px"></i>Order Status Distribution</div>
      <span class="b b-gray fs10" id="networkStatusBadge">—</span>
    </div>
    <div id="orderStatusBars" style="display:flex;flex-direction:column;gap:10px;min-height:100px">
      <div class="text-muted fs12" style="padding:20px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
    </div>
    <div style="height:150px;margin-top:14px"><canvas id="orderStatusChart"></canvas></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:12px">
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-signal" style="color:#00d68f;margin-right:7px"></i>Line Item Status</div>
      </div>
      <div id="liStatusBars" style="display:flex;flex-direction:column;gap:7px;min-height:60px">
        <div class="text-muted fs12" style="text-align:center;padding:10px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
    <div class="card card-sm">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-trophy" style="color:#f59e0b;margin-right:7px"></i>Top Delivering Line Items</div>
        <span class="b b-gray fs10">by impressions</span>
      </div>
      <div id="gamTopLI" style="display:flex;flex-direction:column;gap:4px;min-height:60px">
        <div class="text-muted fs12" style="text-align:center;padding:10px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
  </div>
</div>

<!-- ── Row 3: Top Orders Bar Chart ─────────────────────────────────────── -->
<div class="card" style="margin-bottom:14px">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-chart-bar" style="color:#4285f4;margin-right:7px"></i>Top Orders by Impressions</div>
    <span class="fs11 text-muted" id="gamTopOrdersLbl"></span>
  </div>
  <div id="gamTopOrdersBars" style="display:flex;flex-direction:column;gap:6px;min-height:80px">
    <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></div>
  </div>
</div>

<!-- ── Network Info Card ─────────────────────────────────────────────────── -->
<div class="card card-sm">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-network-wired" style="color:#4285f4;margin-right:7px"></i>Network Information</div>
    <span class="b b-gray fs10" id="networkStatusBadge2">—</span>
  </div>
  <table class="ps-tbl">
    <tbody id="networkInfoBody">
      <tr><td colspan="2" class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-spinner fa-spin"></i></td></tr>
    </tbody>
  </table>
</div>

</div><!-- /overview -->

<!-- ═══ RUNNING CAMPAIGNS TAB ════════════════════════════════════════════════ -->
<div id="gamView-running" style="display:none">

<!-- ── Filters ───────────────────────────────────────────────────────────── -->
<div class="ps-filter-bar">
  <label>Search</label>
  <input id="gam-run-search" type="text" placeholder="Order or advertiser…" oninput="gamRunFilter()" style="width:180px">
  <div class="ps-filter-sep"></div>
  <label>Status</label>
  <select id="gam-run-status" onchange="gamRunFilter()">
    <option value="">All Running</option>
    <option value="ACTIVE">Active</option>
    <option value="DELIVERING">Delivering</option>
    <option value="PAUSED">Paused</option>
  </select>
  <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="gamRunReset()"><i class="fas fa-filter-circle-xmark"></i> Reset</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="gamExportCSV('running')"><i class="fas fa-download"></i> CSV</button>
</div>

<!-- ── Running KPIs ──────────────────────────────────────────────────────── -->
<div class="ps-kpi-row" id="gamRunKpis">
  ${_psKpi(true,  '#00d68f','circle-play',   'Running Orders',        'gam-run-kv-orders', 'gam-run-ks-orders')}
  ${_psKpi(false, '#4285f4','layer-group',   'Active Line Items',     'gam-run-kv-li',     'gam-run-ks-li')}
  ${_psKpi(false, '#f59e0b','eye',           'Total Impressions',     'gam-run-kv-impr',   'gam-run-ks-impr')}
  ${_psKpi(false, '#e879f9','percent',       'Avg CTR',               'gam-run-kv-ctr',    'gam-run-ks-ctr')}
</div>

<!-- ── Under-Performing Alerts ──────────────────────────────────────────── -->
<div id="gamRunAlerts" style="margin-bottom:14px"></div>

<!-- ── Running Orders Table (expandable to Line Items) ──────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-sitemap" style="color:#00d68f;margin-right:7px"></i>Running Campaigns — Orders &amp; Line Items</div>
    <div style="display:flex;gap:6px;align-items:center">
      <span id="gamRunCount" class="b b-gray fs10">—</span>
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="gamRunExpandAll" onclick="gamToggleExpandAll('run')"><i class="fas fa-expand-alt"></i> Expand All</button>
    </div>
  </div>
  <div class="ps-tbl-wrap">
    <table class="ps-tbl" style="min-width:800px">
      <thead>
        <tr>
          <th style="width:30px"></th>
          <th>Order Name</th>
          <th>Advertiser</th>
          <th>Status</th>
          <th>Start</th>
          <th>End</th>
          <th>Line Items</th>
          <th class="num">Impressions</th>
          <th class="num">Clicks / CTR</th>
        </tr>
      </thead>
      <tbody id="gamRunTbody">
        <tr><td colspan="9" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Loading running campaigns…</span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ps-pag">
    <span id="gamRunPagInfo" class="fs11 text-muted">—</span>
    <div style="display:flex;gap:6px">
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="gamRunPrevBtn" onclick="gamRunPage(-1)" disabled>← Prev</button>
      <span id="gamRunPagLbl" class="fs11 text-muted" style="padding:0 6px;line-height:26px">Page 1</span>
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="gamRunNextBtn" onclick="gamRunPage(1)">Next →</button>
    </div>
  </div>
</div>

</div><!-- /running -->

<!-- ═══ COMPLETED ORDERS TAB ════════════════════════════════════════════════ -->
<div id="gamView-completed" style="display:none">

<!-- ── Date Range Note ──────────────────────────────────────────────────── -->
<div class="ps-banner" style="background:rgba(96,165,250,0.07);border-color:rgba(96,165,250,0.2)">
  <i class="fas fa-calendar-range" style="color:#60a5fa;font-size:14px"></i>
  <span style="flex:1;color:#60a5fa;font-size:12px">Showing completed orders from <strong id="gamCompStartDate">January last year</strong> to today.</span>
  <span id="gamCompCount" class="b b-gray fs10">—</span>
</div>

<!-- ── Filters ───────────────────────────────────────────────────────────── -->
<div class="ps-filter-bar">
  <label>Search</label>
  <input id="gam-comp-search" type="text" placeholder="Order name, advertiser…" oninput="gamCompFilter()" style="width:200px">
  <div class="ps-filter-sep"></div>
  <label>Sort By</label>
  <select id="gam-comp-sort" onchange="gamCompFilter()">
    <option value="impressions">Impressions</option>
    <option value="endDate">End Date</option>
    <option value="startDate">Start Date</option>
    <option value="name">Name</option>
  </select>
  <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="gamCompReset()"><i class="fas fa-filter-circle-xmark"></i> Reset</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="gamExportCSV('completed')"><i class="fas fa-download"></i> CSV</button>
</div>

<!-- ── Completed KPIs ────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(true,  '#60a5fa','flag-checkered', 'Completed Orders',     'gam-comp-kv-orders','gam-comp-ks-orders')}
  ${_psKpi(false, '#4285f4','eye',            'Total Impressions',    'gam-comp-kv-impr',  'gam-comp-ks-impr')}
  ${_psKpi(false, '#00d68f','computer-mouse', 'Total Clicks',         'gam-comp-kv-clicks','gam-comp-ks-clicks')}
  ${_psKpi(false, '#f59e0b','percent',        'Avg CTR',              'gam-comp-kv-ctr',   'gam-comp-ks-ctr')}
</div>

<!-- ── Completed Orders Summary Table ────────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-table-list" style="color:#60a5fa;margin-right:7px"></i>Completed Orders Summary</div>
    <span id="gamCompPagInfo" class="fs11 text-muted">—</span>
  </div>
  <div class="ps-tbl-wrap">
    <table class="ps-tbl" style="min-width:800px">
      <thead>
        <tr>
          <th>Order Name</th>
          <th>Advertiser</th>
          <th>Start</th>
          <th>End</th>
          <th>Line Items</th>
          <th class="num">Impressions</th>
          <th class="num">Clicks</th>
          <th class="num">CTR</th>
        </tr>
      </thead>
      <tbody id="gamCompTbody">
        <tr><td colspan="8" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Loading completed orders…</span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ps-pag">
    <span id="gamCompPagCount" class="fs11 text-muted">—</span>
    <div style="display:flex;gap:6px">
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="gamCompPrevBtn" onclick="gamCompPage(-1)" disabled>← Prev</button>
      <span id="gamCompPagLbl" class="fs11 text-muted" style="padding:0 6px;line-height:26px">Page 1</span>
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="gamCompNextBtn" onclick="gamCompPage(1)">Next →</button>
    </div>
  </div>
</div>

</div><!-- /completed -->

</div><!-- /content -->

<script>
// ── GAM Analytics state ────────────────────────────────────────────────────
let _gamOrders=[], _gamLineItems=[], _gamNetwork=null;
let _gamRunFiltered=[], _gamRunPageNum=1, _gamRunPageSz=15;
let _gamCompFiltered=[], _gamCompPageNum=1, _gamCompPageSz=20;
let _gamExpandedRun=new Set(), _gamAllExpandRun=false;
let _orderMetaCache={};
let _orderStatusChart=null;
let _gamCurrentTab='overview';

const STATUS_COLOR={ACTIVE:'#00d68f',DELIVERING:'#00c07f',COMPLETED:'#60a5fa',PAUSED:'#f59e0b',CANCELED:'#f43f5e',DRAFT:'#8080a8',PENDING_APPROVAL:'#a78bfa',UNKNOWN:'#48486a'};
const STATUS_BADGE={ACTIVE:'b-green',DELIVERING:'b-green',COMPLETED:'b-blue',PAUSED:'b-amber',CANCELED:'b-red',DRAFT:'b-gray',PENDING_APPROVAL:'b-purple',UNKNOWN:'b-gray'};

function fmtImpr(n){n=parseInt(n)||0;if(n>=1e9)return(n/1e9).toFixed(1)+'B';if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n===0?'—':n.toLocaleString();}
function fmtDateShort(s){if(!s)return'—';try{const d=new Date(s);return d.toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'2-digit'});}catch{return s.slice(0,10);}}
function fmtBudget(b){if(!b)return'—';const u=parseFloat(b.units||'0');if(u===0)return'—';const c=b.currencyCode||'';if(u>=1e6)return c+'\u00a0'+(u/1e6).toFixed(2)+'M';if(u>=1e3)return c+'\u00a0'+(u/1e3).toFixed(1)+'K';return c+'\u00a0'+u.toFixed(0);}
function advShort(id){if(!id)return'—';const n=id.split('/').pop();return n?'#'+n:id;}
function statusBadge(s){const cls=STATUS_BADGE[s]||'b-gray';const lbl=(s||'UNKNOWN').replace(/_/g,' ');return \`<span class="b \${cls}" style="font-size:9px;white-space:nowrap">\${lbl}</span>\`;}

// Tab switcher
function gamSwitchTab(tab){
  _gamCurrentTab=tab;
  ['overview','running','completed'].forEach(t=>{
    const view=document.getElementById('gamView-'+t);
    const btn=document.getElementById('gamTab-'+t);
    if(view)view.style.display=t===tab?'block':'none';
    if(btn){btn.classList.toggle('active',t===tab);}
  });
  if(tab==='running') gamRunRender();
  if(tab==='completed') gamCompRender();
}

// ── Main Loader — guard against concurrent fetches ────────────────────────
async function loadGAMAnalytics(force=false){
  if(window._gamLoading&&!force) return;
  window._gamLoading=true;
  const icon=document.getElementById('gamBannerIcon');
  const txt=document.getElementById('gamBannerText');
  const ri=document.getElementById('gamRefreshIcon');
  const banner=document.getElementById('gamBanner');
  icon.className='fas fa-spinner fa-spin';icon.style.color='#4285f4';
  txt.textContent='Loading data…';txt.style.color='#60a5fa';
  banner.style.background='rgba(66,133,244,0.08)';banner.style.borderColor='rgba(66,133,244,0.2)';
  if(ri)ri.className='fas fa-spinner fa-spin';

  try{
    // Step 1: Try cached data for instant display
    if(!force&&!window._gamDataLoaded){
      const[cSumRes,cOrdRes,cLiRes]=await Promise.all([
        fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(()=>({ok:false})),
        fetch('/api/gam/orders?pageSize=500&cached=true').then(r=>r.json()).catch(()=>({ok:false})),
        fetch('/api/gam/lineitems?pageSize=500&cached=true').then(r=>r.json()).catch(()=>({ok:false})),
      ]);
      if(cSumRes.ok&&cSumRes.cached){
        _gamOrders=(cOrdRes.ok?cOrdRes.orders:[])||[];
        _gamLineItems=(cLiRes.ok?cLiRes.lineItems:[])||[];
        _gamOrders=_gamOrders.filter(o=>o.status!=='UNKNOWN'&&o.status!=='DRAFT');
        _gamLineItems=_gamLineItems.filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');
        _gamNetwork=cSumRes;
        _orderMetaCache={};_buildOrderMetaCache();
        icon.className='fas fa-database';icon.style.color='#a78bfa';
        const age=Math.round((cSumRes.cacheAge||0)/1000);
        txt.textContent='Cached data ('+age+'s old) · Refreshing live data…';txt.style.color='#a78bfa';
        _gamRenderAll(cSumRes);
        if(ri)ri.className='fas fa-spinner fa-spin';
      }
    }
    // Step 2: Fetch fresh data
    const[sumRes,ordRes,liRes]=await Promise.all([
      fetch('/api/gam/summary').then(r=>r.json()),
      fetch('/api/gam/orders?pageSize=500').then(r=>r.json()),
      fetch('/api/gam/lineitems?pageSize=500').then(r=>r.json()),
    ]);
    if(!sumRes.ok){
      const em=sumRes.error||'Unknown error. Set up GAM in API Connections.';
      console.error('[GAM] API error:', {sumRes, ordRes, liRes});
      icon.className='fas fa-triangle-exclamation';icon.style.color='#f59e0b';
      txt.textContent='GAM not connected — '+em;txt.style.color='#f59e0b';
      banner.style.background='rgba(245,158,11,0.07)';banner.style.borderColor='rgba(245,158,11,0.2)';
      const noConf='<div class="text-muted fs12" style="padding:14px 0;text-align:center"><i class="fas fa-plug" style="color:#f59e0b;margin-right:6px"></i>GAM not configured — <a href="#" onclick="navigate(\'apiconn\')" style="color:#60a5fa">Set up in API Connections</a></div>';
      ['gamRunTbody','gamCompTbody','gamTopLI','orderStatusBars','liStatusBars','networkInfoBody','gamTopOrdersBars'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=noConf;});
      if(ri)ri.className='fas fa-rotate';
      window._gamLoading=false; return;
    }
    console.log('[GAM] Data loaded:', {orders:(ordRes.orders||[]).length, lineItems:(liRes.lineItems||[]).length, network:sumRes.networkName, sampleOrder:(ordRes.orders||[])[0], sampleLI:(liRes.lineItems||[])[0]});
    _gamOrders=(ordRes.ok?ordRes.orders:[])||[];
    _gamLineItems=(liRes.ok?liRes.lineItems:[])||[];
    _gamOrders=_gamOrders.filter(o=>o.status!=='UNKNOWN'&&o.status!=='DRAFT');
    _gamLineItems=_gamLineItems.filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');
    _gamNetwork=sumRes;
    _orderMetaCache={};_buildOrderMetaCache();
    window._gamDataLoaded=true;
    const now=new Date().toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'});
    icon.className='fas fa-circle-check';icon.style.color='#00d68f';
    txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders · '+_gamLineItems.length+' line items · Updated '+now;
    txt.style.color='#00d68f';banner.style.background='rgba(0,214,143,0.06)';banner.style.borderColor='rgba(0,214,143,0.18)';
    const lr=document.getElementById('gamLastRefresh');if(lr)lr.textContent='Updated '+now;
    if(ri)ri.className='fas fa-rotate';
    _gamRenderAll(sumRes);
    window._gamLoading=false;
  }catch(e){
    console.error('[GAM] Load error:', e);
    const icon2=document.getElementById('gamBannerIcon');const txt2=document.getElementById('gamBannerText');
    icon2.className='fas fa-circle-xmark';icon2.style.color='#f43f5e';
    txt2.textContent='Failed to load GAM data: '+e.message;txt2.style.color='#f43f5e';
    if(ri)ri.className='fas fa-rotate';
    window._gamLoading=false;
  }
}

function _gamRenderAll(s){
  renderKPIs(s);
  renderOrderStatusBars(s.orders?.byStatus||{});
  renderLIStatusBars(s.lineItems?.byStatus||{});
  renderNetworkInfo(s);
  renderTopLI();
  renderCharts(s);
  renderTopOrdersBars();
  if(_gamCurrentTab==='running') gamRunRender();
  if(_gamCurrentTab==='completed') gamCompRender();
}

// ── Per-order metrics cache ────────────────────────────────────────────────
function _buildOrderMetaCache(){
  const map={};
  for(const li of _gamLineItems){
    if(li.status==='UNKNOWN'||li.status==='DRAFT') continue;
    const oid=li.orderId||(li.name?li.name.split('/lineItems/')[0]:'');
    if(!oid) continue;
    if(!map[oid])map[oid]={impr:0,clicks:0,lis:[],activeCount:0};
    const im=parseInt(li.impressionsDelivered||'0');
    const cl=parseInt(li.clicksDelivered||'0');
    map[oid].impr+=im;map[oid].clicks+=cl;map[oid].lis.push(li);
    if(li.status==='ACTIVE'||li.status==='DELIVERING')map[oid].activeCount++;
  }
  for(const key of Object.keys(map)){const num=key.split('/').pop();if(num&&num!==key)map[num]=map[key];}
  _orderMetaCache=map;
}
function _getOrderMeta(o){const oid=o.name||o.id||'';const num=oid.split('/').pop();return _orderMetaCache[oid]||_orderMetaCache[num]||{impr:0,clicks:0,lis:[],activeCount:0};}

// ── Overview KPIs ────────────────────────────────────────────────────────
function renderKPIs(s){
  const tot=s.orders?.total||_gamOrders.length;
  const act=(s.orders?.byStatus?.ACTIVE||0)+(s.orders?.byStatus?.DELIVERING||0);
  const comp=s.orders?.byStatus?.COMPLETED||0;
  const impr=s.lineItems?.totalImpressions||0;
  const clk=s.lineItems?.totalClicks||0;
  const li=s.lineItems?.total||_gamLineItems.length;
  const ali=(s.lineItems?.byStatus?.ACTIVE||0)+(s.lineItems?.byStatus?.DELIVERING||0);
  const ctr=impr>0?((clk/impr)*100).toFixed(2):'—';
  const adUnits=s.adUnits?.active||0;
  const setK=(vid,sid,v,sub)=>{const vEl=document.getElementById(vid);const sEl=document.getElementById(sid);if(vEl)vEl.textContent=v;if(sEl)sEl.innerHTML=sub;};
  setK('kv-orders','kc-orders',tot,'<span class="text-muted">'+act+' active/delivering</span>');
  setK('kv-active','kc-active',act,'<span class="text-muted">orders running</span>');
  setK('kv-completed','kc-completed',comp,'<span class="text-muted">orders done</span>');
  setK('kv-li','kc-li',li,'<span class="text-muted">'+ali+' active line items</span>');
  setK('kv-impr','kc-impr',fmtImpr(impr),'<span class="text-muted">across all orders</span>');
  setK('kv-clicks','kc-clicks',fmtImpr(clk),'<span class="text-muted">total clicks</span>');
  setK('kv-ctr','kc-ctr',ctr!=='—'?ctr+'%':ctr,'<span class="text-muted">'+(impr>0?'overall CTR':'no impressions yet')+'</span>');
  setK('kv-adunits','kc-adunits',adUnits||'—','<span class="text-muted">active ad units</span>');
  const networkEl=document.getElementById('gam-ds-network');
  if(networkEl)networkEl.textContent=s.networkName||s.networkCode||'—';
}

function renderOrderStatusBars(byStatus){
  const el=document.getElementById('orderStatusBars');
  const statusOrder=['ACTIVE','DELIVERING','PAUSED','COMPLETED','CANCELED','PENDING_APPROVAL'];
  const entries=statusOrder.filter(s=>byStatus[s]>0).map(s=>[s,byStatus[s]]);
  const others=Object.entries(byStatus).filter(([s])=>!statusOrder.includes(s));
  const all=[...entries,...others];
  const total=all.reduce((s,[,v])=>s+v,0)||1;
  const badge1=document.getElementById('networkStatusBadge');
  if(badge1)badge1.textContent=(_gamNetwork?.networkName||_gamNetwork?.networkCode||'—');
  if(!all.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No order data</div>';return;}
  el.innerHTML=all.map(([status,count])=>{
    const pct=Math.round(count/total*100);const col=STATUS_COLOR[status]||'#8080a8';
    return '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><span class="fs11 fw6">'+status.replace(/_/g,' ')+'</span><span class="fs11 fw7" style="color:'+col+'">'+count+' <span class="text-muted">('+pct+'%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct+'%;background:'+col+'"></div></div></div>';
  }).join('');
}

function renderLIStatusBars(byStatus){
  const el=document.getElementById('liStatusBars');
  const entries=Object.entries(byStatus).filter(([s])=>s!=='UNKNOWN'&&s!=='DRAFT').sort((a,b)=>b[1]-a[1]);
  const total=entries.reduce((s,[,v])=>s+v,0)||1;
  if(!entries.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:8px">No line item data</div>';return;}
  el.innerHTML=entries.map(([status,count])=>{
    const pct=Math.round(count/total*100);const col=STATUS_COLOR[status]||'#8080a8';
    return '<div style="display:flex;align-items:center;gap:8px"><span class="fs11" style="width:100px;color:'+col+';font-weight:600">'+status.replace(/_/g,' ')+'</span><div class="ps-prog-wrap" style="flex:1"><div class="ps-prog-fill" style="width:'+pct+'%;background:'+col+'"></div></div><span class="fs10 text-muted">'+count+'</span></div>';
  }).join('');
}

function renderNetworkInfo(s){
  const el=document.getElementById('networkInfoBody');
  const el2=document.getElementById('networkStatusBadge2');
  if(el2)el2.textContent=s.networkName||s.networkCode||'—';
  if(!s.ok){el.innerHTML='<tr><td colspan="2" class="text-muted fs12" style="text-align:center;padding:12px">Not connected</td></tr>';return;}
  const rows=[
    ['Network Name', s.networkName||'—'],
    ['Network Code', s.networkCode||'—'],
    ['Currency', s.currency||'—'],
    ['Time Zone', s.timeZone||'—'],
    ['Total Orders', (s.orders?.total||0)+' (excl. Draft/Unknown)'],
    ['Total Line Items', (s.lineItems?.total||0)+' (excl. Draft/Unknown)'],
    ['Total Ad Units', s.adUnits?.total||'—'],
    ['Active Ad Units', s.adUnits?.active||'—'],
  ];
  el.innerHTML=rows.map(([k,v])=>'<tr><td class="muted fs11" style="width:140px">'+k+'</td><td class="fw6 fs11">'+v+'</td></tr>').join('');
}

function renderTopLI(){
  const el=document.getElementById('gamTopLI');
  const active=_gamLineItems.filter(li=>li.status==='ACTIVE'||li.status==='DELIVERING')
    .sort((a,b)=>(parseInt(b.impressionsDelivered)||0)-(parseInt(a.impressionsDelivered)||0)).slice(0,10);
  if(!active.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:10px">No active line items</div>';return;}
  const maxImpr=parseInt(active[0].impressionsDelivered)||1;
  el.innerHTML=active.map((li,i)=>{
    const impr=parseInt(li.impressionsDelivered)||0;const clk=parseInt(li.clicksDelivered)||0;
    const ctr=impr>0?((clk/impr)*100).toFixed(2)+'%':'—';
    const pct=Math.round(impr/maxImpr*100);const col=STATUS_COLOR[li.status]||'#8080a8';
    const name=li.displayName||li.name||'Line Item '+i;
    return '<div style="padding:4px 0;border-bottom:1px solid var(--border)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><span class="fs11 fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:60%">'+name+'</span>'+statusBadge(li.status)+'</div><div style="display:flex;align-items:center;gap:8px"><div class="ps-prog-wrap" style="flex:1"><div class="ps-prog-fill" style="width:'+pct+'%;background:'+col+'"></div></div><span class="fs10 text-muted">'+fmtImpr(impr)+' · '+ctr+'</span></div></div>';
  }).join('');
}

function renderTopOrdersBars(){
  const el=document.getElementById('gamTopOrdersBars');const lbl=document.getElementById('gamTopOrdersLbl');
  const sorted=_gamOrders.slice().sort((a,b)=>{const am=_getOrderMeta(a);const bm=_getOrderMeta(b);return bm.impr-am.impr;}).slice(0,10);
  if(lbl)lbl.textContent='Top '+sorted.length+' of '+_gamOrders.length+' orders (by impressions)';
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:20px">No order data</div>';return;}
  const totalImprAll=sorted.reduce((s,o)=>s+_getOrderMeta(o).impr,0)||1;
  const maxImpr=_getOrderMeta(sorted[0]).impr||1;
  el.innerHTML=sorted.map((o,i)=>{
    const m=_getOrderMeta(o);const barPct=Math.round(m.impr/maxImpr*100);const sharePct=Math.round(m.impr/totalImprAll*100);const col=['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399','#60a5fa','#e879f9','#fb923c','#38bdf8'][i%10];
    const name=o.displayName||o.name||'—';const ctr=m.impr>0?((m.clicks/m.impr)*100).toFixed(2)+'%':'—';
    return '<div class="ps-hbar-item"><span class="ps-hbar-name" style="font-size:10px" title="'+name+'"><span style="color:'+col+';margin-right:5px;font-weight:700">'+(i+1)+'.</span>'+name+' '+statusBadge(o.status)+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+barPct+'%;background:'+col+'"></div></div><span class="ps-hbar-val" style="width:120px;text-align:right">'+fmtImpr(m.impr)+' <span style="opacity:.6">('+sharePct+'%)</span> · '+ctr+'</span></div>';
  }).join('');
}

function renderCharts(s){
  const ctx=document.getElementById('orderStatusChart');
  if(!ctx) return;
  if(_orderStatusChart){_orderStatusChart.destroy();_orderStatusChart=null;}
  const bs=s.orders?.byStatus||{};
  const entries=Object.entries(bs).filter(([,v])=>v>0);
  if(!entries.length) return;
  const statusTotal=entries.reduce((s,[,v])=>s+v,0)||1;
  // Sort high→low, top-10
  const statusSorted=entries.sort((a,b)=>b[1]-a[1]).slice(0,10);
  _orderStatusChart=new Chart(ctx,{type:'doughnut',data:{labels:statusSorted.map(([l])=>l.replace(/_/g,' ')),datasets:[{data:statusSorted.map(([,v])=>v),backgroundColor:statusSorted.map(([l])=>STATUS_COLOR[l]||'#8080a8'),borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8,generateLabels:ch=>{const ds=ch.data.datasets[0];return ch.data.labels.map((l,i)=>{const pct=Math.round(ds.data[i]/statusTotal*100);return{text:l+' '+pct+'%',fillStyle:ds.backgroundColor[i],strokeStyle:'transparent',lineWidth:0,index:i};});}}},tooltip:{callbacks:{label:c=>{const pct=Math.round(c.parsed/statusTotal*100);return ' '+c.label+': '+c.parsed+' ('+pct+'%)';}}}}}}});
}

// ── Running Campaigns Tab ─────────────────────────────────────────────────
function gamRunFilter(){gamRunRender();}
function gamRunReset(){const s=document.getElementById('gam-run-search');if(s)s.value='';const st=document.getElementById('gam-run-status');if(st)st.value='';gamRunRender();}

function gamRunRender(){
  const q=(document.getElementById('gam-run-search')?.value||'').toLowerCase();
  const statusF=document.getElementById('gam-run-status')?.value||'';
  const runningStatuses=['ACTIVE','DELIVERING','PAUSED'];
  _gamRunFiltered=_gamOrders.filter(o=>{
    if(!runningStatuses.includes(o.status)) return false;
    if(statusF&&o.status!==statusF) return false;
    if(q){const name=(o.displayName||o.name||'').toLowerCase();const adv=(o.advertiserId||'').toLowerCase();if(!name.includes(q)&&!adv.includes(q)) return false;}
    return true;
  }).sort((a,b)=>{const am=_getOrderMeta(a);const bm=_getOrderMeta(b);return bm.impr-am.impr;});
  _gamRunPageNum=1;
  gamRunRenderKPIs();
  gamRunRenderAlerts();
  gamRunRenderTable();
}

function gamRunRenderKPIs(){
  const totalImpr=_gamRunFiltered.reduce((s,o)=>s+_getOrderMeta(o).impr,0);
  const totalClk=_gamRunFiltered.reduce((s,o)=>s+_getOrderMeta(o).clicks,0);
  const totalLI=_gamRunFiltered.reduce((s,o)=>s+(_getOrderMeta(o).lis.filter(li=>li.status==='ACTIVE'||li.status==='DELIVERING').length),0);
  const ctr=totalImpr>0?((totalClk/totalImpr)*100).toFixed(2)+'%':'—';
  const setK=(vid,sid,v,sub)=>{const vEl=document.getElementById(vid);const sEl=document.getElementById(sid);if(vEl)vEl.textContent=v;if(sEl)sEl.innerHTML=sub;};
  setK('gam-run-kv-orders','gam-run-ks-orders',_gamRunFiltered.length,'<span class="text-muted">running orders</span>');
  setK('gam-run-kv-li','gam-run-ks-li',totalLI,'<span class="text-muted">active line items</span>');
  setK('gam-run-kv-impr','gam-run-ks-impr',fmtImpr(totalImpr),'<span class="text-muted">impressions</span>');
  setK('gam-run-kv-ctr','gam-run-ks-ctr',ctr,'<span class="text-muted">click-through rate</span>');
  const cntEl=document.getElementById('gamRunCount');if(cntEl)cntEl.textContent=_gamRunFiltered.length+' orders';
}

function gamRunRenderAlerts(){
  const el=document.getElementById('gamRunAlerts');if(!el) return;
  // Find under-performing: active LIs with >10k impressions but CTR < 0.5%
  const underPerforming=[];
  for(const o of _gamRunFiltered){
    const m=_getOrderMeta(o);
    if(m.impr>10000&&m.impr>0){const ctr=m.clicks/m.impr*100;if(ctr<0.5)underPerforming.push({name:o.displayName||o.name,ctr:ctr.toFixed(3),impr:m.impr});}
  }
  if(!underPerforming.length){el.innerHTML='';return;}
  el.innerHTML='<div class="ps-banner" style="background:rgba(244,63,94,0.07);border-color:rgba(244,63,94,0.2)"><i class="fas fa-triangle-exclamation" style="color:#f43f5e;font-size:14px"></i><span style="flex:1;color:#f43f5e;font-size:12px"><strong>'+underPerforming.length+' under-performing orders</strong> with CTR below 0.5%: '+underPerforming.slice(0,3).map(u=>u.name+' ('+u.ctr+'%)').join(', ')+(underPerforming.length>3?' +more':'')+' — consider reviewing ad creative or targeting.</span></div>';
}

function gamRunRenderTable(){
  const tbody=document.getElementById('gamRunTbody');
  const start=(_gamRunPageNum-1)*_gamRunPageSz;
  const page=_gamRunFiltered.slice(start,start+_gamRunPageSz);
  const total=_gamRunFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_gamRunPageSz));
  document.getElementById('gamRunPagInfo').textContent=(start+1)+'–'+Math.min(start+_gamRunPageSz,total)+' of '+total;
  document.getElementById('gamRunPagLbl').textContent='Page '+_gamRunPageNum+' / '+pages;
  document.getElementById('gamRunPrevBtn').disabled=_gamRunPageNum<=1;
  document.getElementById('gamRunNextBtn').disabled=_gamRunPageNum>=pages;
  if(!page.length){tbody.innerHTML='<tr><td colspan="9" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-circle-play" style="font-size:16px;color:#00d68f"></i><br><span style="font-size:11px;display:block;margin-top:8px">No running campaigns match filters</span></td></tr>';return;}
  const rows=[];
  for(const o of page){
    const m=_getOrderMeta(o);const ctr=m.impr>0?((m.clicks/m.impr)*100).toFixed(2)+'%':'—';
    const isExpanded=_gamExpandedRun.has(o.name||o.id||'');
    const chevCls='ps-chevron'+(isExpanded?' open':'');
    const oid=o.name||o.id||'';
    rows.push('<tr class="ps-order-row" onclick="gamRunToggleExpand(\''+oid+'\')">'+
      '<td><span class="'+chevCls+'"><i class="fas fa-chevron-right"></i></span></td>'+
      '<td class="fw6" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(o.displayName||'')+'">'+( o.displayName||o.name||'—')+'</td>'+
      '<td class="muted fs11">'+advShort(o.advertiserId)+'</td>'+
      '<td>'+statusBadge(o.status)+'</td>'+
      '<td class="muted fs11">'+fmtDateShort(o.startTime)+'</td>'+
      '<td class="muted fs11">'+fmtDateShort(o.endTime)+'</td>'+
      '<td class="fs11"><span class="text-muted">'+m.lis.length+' LIs</span>'+(m.activeCount>0?' <span class="b b-green fs9">'+m.activeCount+' active</span>':'')+'</td>'+
      '<td class="num fw7" style="color:#4285f4">'+fmtImpr(m.impr)+'</td>'+
      '<td class="num fs11">'+fmtImpr(m.clicks)+' · <span style="color:#a78bfa">'+ctr+'</span></td>'+
    '</tr>');
    if(isExpanded&&m.lis.length>0){
      rows.push('<tr class="ps-li-hdr"><th colspan="9" class="gam-li-indent"><table class="ps-tbl" style="width:100%"><thead><tr><th>Line Item</th><th>Status</th><th>Start</th><th>End</th><th class="num">Impressions</th><th class="num">Clicks</th><th class="num">CTR</th></tr></thead></th></tr>');
      for(const li of m.lis.sort((a,b)=>(parseInt(b.impressionsDelivered)||0)-(parseInt(a.impressionsDelivered)||0))){
        const liImpr=parseInt(li.impressionsDelivered)||0;const liClk=parseInt(li.clicksDelivered)||0;
        const liCtr=liImpr>0?((liClk/liImpr)*100).toFixed(2)+'%':'—';
        const underPerf=liImpr>10000&&parseFloat(liCtr)<0.5;
        rows.push('<tr class="ps-li-row">'+
          '<td class="gam-li-indent fw6 fs11"'+(underPerf?' style="color:#f43f5e"':'')+' colspan="1">'+( li.displayName||li.name||'—')+(underPerf?' <i class="fas fa-triangle-exclamation" style="color:#f43f5e" title="Under-performing CTR"></i>':'')+'</td>'+
          '<td>'+statusBadge(li.status)+'</td>'+
          '<td class="muted fs10">'+fmtDateShort(li.startTime)+'</td>'+
          '<td class="muted fs10">'+fmtDateShort(li.endTime)+'</td>'+
          '<td class="num fs11">'+fmtImpr(liImpr)+'</td>'+
          '<td class="num fs11">'+fmtImpr(liClk)+'</td>'+
          '<td class="num fs11" style="color:'+(underPerf?'#f43f5e':'#a78bfa')+'">'+liCtr+'</td>'+
        '</tr>');
      }
      rows.push('</table></tr>');
    }
  }
  tbody.innerHTML=rows.join('');
}

function gamRunToggleExpand(oid){if(_gamExpandedRun.has(oid))_gamExpandedRun.delete(oid);else _gamExpandedRun.add(oid);gamRunRenderTable();}
function gamToggleExpandAll(mode){_gamAllExpandRun=!_gamAllExpandRun;if(_gamAllExpandRun)_gamRunFiltered.forEach(o=>_gamExpandedRun.add(o.name||o.id||''));else _gamExpandedRun.clear();gamRunRenderTable();}
function gamRunPage(dir){const pages=Math.max(1,Math.ceil(_gamRunFiltered.length/_gamRunPageSz));_gamRunPageNum=Math.max(1,Math.min(pages,_gamRunPageNum+dir));gamRunRenderTable();}

// ── Completed Orders Tab ─────────────────────────────────────────────────
function gamCompFilter(){gamCompRender();}
function gamCompReset(){const s=document.getElementById('gam-comp-search');if(s)s.value='';const srt=document.getElementById('gam-comp-sort');if(srt)srt.value='impressions';gamCompRender();}

function gamCompRender(){
  // Filter: COMPLETED, end date from Jan of last year to today
  const now=new Date();
  const startFilter=new Date(now.getFullYear()-1,0,1); // Jan 1 last year
  const startDateStr=startFilter.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  const startEl=document.getElementById('gamCompStartDate');
  if(startEl)startEl.textContent='January '+String(now.getFullYear()-1);
  const q=(document.getElementById('gam-comp-search')?.value||'').toLowerCase();
  const sortBy=document.getElementById('gam-comp-sort')?.value||'impressions';
  _gamCompFiltered=_gamOrders.filter(o=>{
    if(o.status!=='COMPLETED') return false;
    if(o.endTime){const end=new Date(o.endTime);if(end<startFilter||end>now) return false;}
    if(q){const name=(o.displayName||o.name||'').toLowerCase();const adv=(o.advertiserId||'').toLowerCase();if(!name.includes(q)&&!adv.includes(q)) return false;}
    return true;
  });
  // Sort
  _gamCompFiltered.sort((a,b)=>{
    if(sortBy==='impressions'){return _getOrderMeta(b).impr-_getOrderMeta(a).impr;}
    if(sortBy==='endDate'){return new Date(b.endTime||0)-new Date(a.endTime||0);}
    if(sortBy==='startDate'){return new Date(b.startTime||0)-new Date(a.startTime||0);}
    if(sortBy==='name'){return (a.displayName||'').localeCompare(b.displayName||'');}
    return 0;
  });
  _gamCompPageNum=1;
  gamCompRenderKPIs();
  gamCompRenderTable();
}

function gamCompRenderKPIs(){
  const totalImpr=_gamCompFiltered.reduce((s,o)=>s+_getOrderMeta(o).impr,0);
  const totalClk=_gamCompFiltered.reduce((s,o)=>s+_getOrderMeta(o).clicks,0);
  const ctr=totalImpr>0?((totalClk/totalImpr)*100).toFixed(2)+'%':'—';
  const setK=(vid,sid,v,sub)=>{const vEl=document.getElementById(vid);const sEl=document.getElementById(sid);if(vEl)vEl.textContent=v;if(sEl)sEl.innerHTML=sub;};
  setK('gam-comp-kv-orders','gam-comp-ks-orders',_gamCompFiltered.length,'<span class="text-muted">completed orders</span>');
  setK('gam-comp-kv-impr','gam-comp-ks-impr',fmtImpr(totalImpr),'<span class="text-muted">total delivered</span>');
  setK('gam-comp-kv-clicks','gam-comp-ks-clicks',fmtImpr(totalClk),'<span class="text-muted">total clicks</span>');
  setK('gam-comp-kv-ctr','gam-comp-ks-ctr',ctr,'<span class="text-muted">click-through rate</span>');
  const cntEl=document.getElementById('gamCompCount');if(cntEl)cntEl.textContent=_gamCompFiltered.length+' completed orders';
}

function gamCompRenderTable(){
  const tbody=document.getElementById('gamCompTbody');
  const start=(_gamCompPageNum-1)*_gamCompPageSz;
  const page=_gamCompFiltered.slice(start,start+_gamCompPageSz);
  const total=_gamCompFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_gamCompPageSz));
  document.getElementById('gamCompPagInfo').textContent=(start+1)+'–'+Math.min(start+_gamCompPageSz,total)+' of '+total+' rows';
  document.getElementById('gamCompPagCount').textContent=(start+1)+'–'+Math.min(start+_gamCompPageSz,total)+' of '+total;
  document.getElementById('gamCompPagLbl').textContent='Page '+_gamCompPageNum+' / '+pages;
  document.getElementById('gamCompPrevBtn').disabled=_gamCompPageNum<=1;
  document.getElementById('gamCompNextBtn').disabled=_gamCompPageNum>=pages;
  if(!page.length){tbody.innerHTML='<tr><td colspan="8" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-flag-checkered" style="font-size:16px;color:#60a5fa"></i><br><span style="font-size:11px;display:block;margin-top:8px">No completed orders in date range (Jan '+String(new Date().getFullYear()-1)+' – today)</span></td></tr>';return;}
  tbody.innerHTML=page.map(o=>{
    const m=_getOrderMeta(o);
    const ctr=m.impr>0?((m.clicks/m.impr)*100).toFixed(2)+'%':'—';
    return '<tr>'+
      '<td class="fw6" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(o.displayName||'')+'">'+(o.displayName||o.name||'—')+'</td>'+
      '<td class="muted fs11">'+advShort(o.advertiserId)+'</td>'+
      '<td class="muted fs11">'+fmtDateShort(o.startTime)+'</td>'+
      '<td class="muted fs11">'+fmtDateShort(o.endTime)+'</td>'+
      '<td class="fs11 text-muted">'+m.lis.length+' items</td>'+
      '<td class="num fw7" style="color:#60a5fa">'+fmtImpr(m.impr)+'</td>'+
      '<td class="num fs11">'+fmtImpr(m.clicks)+'</td>'+
      '<td class="num fs11" style="color:#a78bfa">'+ctr+'</td>'+
    '</tr>';
  }).join('');
}
function gamCompPage(dir){const pages=Math.max(1,Math.ceil(_gamCompFiltered.length/_gamCompPageSz));_gamCompPageNum=Math.max(1,Math.min(pages,_gamCompPageNum+dir));gamCompRenderTable();}

// ── CSV Export ────────────────────────────────────────────────────────────
function gamExportCSV(type){
  const rows=type==='running'?_gamRunFiltered:_gamCompFiltered;
  if(!rows.length)return;
  const headers=['Order Name','Advertiser ID','Status','Start','End','Impressions','Clicks','CTR','Line Items'];
  const csv=[headers.join(','),...rows.map(o=>{const m=_getOrderMeta(o);const ctr=m.impr>0?((m.clicks/m.impr)*100).toFixed(2)+'%':'—';return['"'+(o.displayName||o.name||'').replace(/"/g,'""')+'"','"'+(o.advertiserId||'')+'"','"'+(o.status||'')+'"','"'+fmtDateShort(o.startTime)+'"','"'+fmtDateShort(o.endTime)+'"',m.impr,m.clicks,ctr,m.lis.length].join(',');})].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='gam_'+type+'_orders.csv';a.click();
}

// ── Auto-load ─────────────────────────────────────────────────────────────
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>loadGAMAnalytics());
else setTimeout(()=>loadGAMAnalytics(),80);
</script>
`;
}
