// ═══════════════════════════════════════════════════════════════════════════
//  POST-SALES MODULE  —  Revenue · Campaign · Ads Performance · GAM Analytics
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
@media(max-width:900px){.ps-kpi-row{grid-template-columns:repeat(2,1fr)}}
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
//  1. REVENUE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════
export function revenueScreen(): string {
  return `
${PS_CSS}
<div class="content fade-in">

<!-- ── Data source ─────────────────────────────────────────────────────── -->
<div class="ps-src">
  <i class="fas fa-table-cells" style="color:#34d399"></i>
  <strong>Google Sheets</strong> <span class="text-muted">·</span> Revenue tab
  <span class="ps-plat ps-plat-sheets">Sheets · Live</span>
  <span id="rev-src-status" style="margin-left:auto"></span>
</div>

<!-- ── Filters ─────────────────────────────────────────────────────────── -->
<div class="ps-filter-bar">
  <label>Financial Year</label>
  <select id="rev-fy" onchange="revApplyFilters()"><option value="">All Years</option></select>
  <div class="ps-filter-sep"></div>
  <label>Portal</label>
  <select id="rev-portal" onchange="revApplyFilters()"><option value="">All Portals</option></select>
  <div class="ps-filter-sep"></div>
  <label>Revenue Type</label>
  <select id="rev-type" onchange="revApplyFilters()"><option value="">All Types</option></select>
  <div class="ps-filter-sep"></div>
  <label>Month</label>
  <select id="rev-month" onchange="revApplyFilters()"><option value="">All Months</option></select>
  <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="revReset()"><i class="fas fa-filter-circle-xmark"></i>Reset</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadRevenueData()"><i class="fas fa-rotate"></i>Refresh</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="revExportCSV()"><i class="fas fa-download"></i>CSV</button>
</div>

<!-- ── KPIs ────────────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(true,  '#4285f4','sack-dollar',   'Total Revenue',    'rev-kv-total',  'rev-ks-total')}
  ${_psKpi(false, '#00d68f','bullseye',       'Target',           'rev-kv-target', 'rev-ks-target')}
  ${_psKpi(false, '#f59e0b','chart-line',     '% Achievement',    'rev-kv-ach',    'rev-ks-ach')}
  ${_psKpi(false, '#a78bfa','arrow-trend-up', 'Top Portal',       'rev-kv-portal', 'rev-ks-portal')}
</div>

<!-- ── Row 2: Trend + Portal Breakdown ─────────────────────────────────── -->
<div class="ps-g62">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-area" style="color:#4285f4;margin-right:6px"></i>Revenue Trend</div>
      <span id="rev-trend-lbl" class="fs11 text-muted"></span>
    </div>
    <div style="height:200px"><canvas id="revTrendChart"></canvas></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-pie" style="color:#a78bfa;margin-right:6px"></i>Revenue Type</div>
    </div>
    <div style="height:140px"><canvas id="revTypeChart"></canvas></div>
    <div id="revTypeBars" style="margin-top:10px;display:flex;flex-direction:column;gap:6px"></div>
  </div>
</div>

<!-- ── Row 3: Portal Breakdown + Target vs Actual ───────────────────────── -->
<div class="ps-g2">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-globe" style="color:#00d68f;margin-right:6px"></i>Revenue by Portal</div>
      <span id="rev-portal-count" class="fs11 text-muted"></span>
    </div>
    <div id="revPortalBars" style="display:flex;flex-direction:column;gap:7px;min-height:80px">
      <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></div>
    </div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-scale-balanced" style="color:#f59e0b;margin-right:6px"></i>Target vs Actual</div>
    </div>
    <div style="height:200px"><canvas id="revTvAChart"></canvas></div>
  </div>
</div>

<!-- ── Row 4: Revenue Table ─────────────────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-table-list" style="color:#60a5fa;margin-right:6px"></i>Revenue Detail</div>
    <div style="display:flex;gap:6px;align-items:center">
      <input id="rev-search" type="text" placeholder="Search…" style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:140px;outline:none" oninput="revApplyFilters()">
      <span id="rev-count" class="fs11 text-muted"></span>
    </div>
  </div>
  <div class="ps-tbl-wrap">
    <table class="ps-tbl" id="revTable">
      <thead>
        <tr>
          <th onclick="revSort('Portal')" id="revth-Portal">Portal</th>
          <th onclick="revSort('FinancialYear')" id="revth-FinancialYear">FY</th>
          <th onclick="revSort('Month')" id="revth-Month">Month</th>
          <th onclick="revSort('RevenueType')" id="revth-RevenueType">Type</th>
          <th onclick="revSort('Revenue')" class="num" id="revth-Revenue">Revenue</th>
          <th onclick="revSort('Target')" class="num" id="revth-Target">Target</th>
          <th class="num">Achievement</th>
        </tr>
      </thead>
      <tbody id="revTbody">
        <tr><td colspan="7" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i></td></tr>
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
let _revRows = [], _revFiltered = [], _revPageNum = 1, _revPageSz = 25;
let _revSortKey = 'Revenue', _revSortAsc = false;
let _revTrendChart = null, _revTypeChart = null, _revTvAChart = null;
const PORTALS = ['ARENA','AWANI','CHINESE - OTHERS','GEMPAK','GEN NEXT','HOTSPOT','INDIAN - OTHERS',
  'MALAY - OTHERS','NI','OTHERS','OTT - VOD','RADIO','ROJAK DAILY','SHAW','SOOKA',
  'SPORTS - OTHERS','STADIUM ASTRO','THINKER STUDIOS','TV Linear','ULAGAM','XUAN','KULT'];
const REV_TYPES = ['AA','Direct','Programmatic'];
const PORTAL_COLORS = ['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399','#60a5fa','#e879f9',
  '#fb923c','#38bdf8','#4ade80','#f472b6','#94a3b8','#fbbf24','#c084fc','#22d3ee','#86efac','#fca5a5',
  '#a5f3fc','#d8b4fe','#fed7aa','#bfdbfe'];
const TYPE_COLORS = {'AA':'#4285f4','Direct':'#00d68f','Programmatic':'#f59e0b'};

function revFmt(n){ n=parseFloat(n)||0; if(n>=1e6) return 'RM '+(n/1e6).toFixed(2)+'M'; if(n>=1e3) return 'RM '+(n/1e3).toFixed(1)+'K'; return 'RM '+n.toFixed(0); }
function revFmtShort(n){ n=parseFloat(n)||0; if(n>=1e6) return (n/1e6).toFixed(1)+'M'; if(n>=1e3) return (n/1e3).toFixed(1)+'K'; return n.toFixed(0); }

async function loadRevenueData(){
  const src = document.getElementById('rev-src-status');
  if(src) src.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:#4285f4;font-size:11px"></i> Loading…';
  try{
    const r = await fetch('/api/data/revenue').then(x=>x.json());
    if(!r.ok){ if(src) src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> '+( r.error||'Not connected')+'</span>'; revShowEmpty(); return; }
    _revRows = r.rows||[];
    if(src) src.innerHTML='<span style="color:#00d68f;font-size:11px"><i class="fas fa-circle-check"></i> '+_revRows.length+' rows loaded</span>';
    revPopulateFilters();
    revApplyFilters();
  }catch(e){
    if(src) src.innerHTML='<span style="color:#f43f5e;font-size:11px"><i class="fas fa-xmark"></i> '+e.message+'</span>';
    revShowEmpty();
  }
}

function revShowEmpty(){
  document.getElementById('revTbody').innerHTML='<tr><td colspan="7" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-plug" style="color:#f59e0b;font-size:16px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Connect Google Sheets in <a href="#" onclick="navigate(\'api\')" style="color:#60a5fa">API Connections</a></span></td></tr>';
  document.getElementById('revPortalBars').innerHTML='<div class="text-muted fs12" style="text-align:center;padding:20px">No data</div>';
}

function revPopulateFilters(){
  const fys=[...new Set(_revRows.map(r=>r['Financial Year']||r['FinancialYear']||r['FY']||'').filter(Boolean))].sort().reverse();
  const portals=[...new Set(_revRows.map(r=>r['Portal']||'').filter(Boolean))].sort();
  const types=[...new Set(_revRows.map(r=>r['Revenue Type']||r['RevenueType']||r['Type']||'').filter(Boolean))].sort();
  const months=[...new Set(_revRows.map(r=>r['Month']||r['Revenue Month']||'').filter(Boolean))];

  const fyS=document.getElementById('rev-fy');
  const cur=fyS.value;
  fyS.innerHTML='<option value="">All Years</option>'+fys.map(v=>'<option value="'+v+'"'+(v===cur?' selected':'')+'">'+v+'</option>').join('');

  const pS=document.getElementById('rev-portal');
  const cp=pS.value;
  pS.innerHTML='<option value="">All Portals</option>'+portals.map(v=>'<option value="'+v+'"'+(v===cp?' selected':'')+'">'+v+'</option>').join('');

  const tS=document.getElementById('rev-type');
  const ct=tS.value;
  tS.innerHTML='<option value="">All Types</option>'+types.map(v=>'<option value="'+v+'"'+(v===ct?' selected':'')+'">'+v+'</option>').join('');

  const mS=document.getElementById('rev-month');
  const cm=mS.value;
  mS.innerHTML='<option value="">All Months</option>'+months.map(v=>'<option value="'+v+'"'+(v===cm?' selected':'')+'">'+v+'</option>').join('');
}

function revGetField(row,keys){ for(const k of keys){ if(row[k]!==undefined) return row[k]; } return ''; }

function revApplyFilters(){
  const fy=document.getElementById('rev-fy').value;
  const portal=document.getElementById('rev-portal').value;
  const type=document.getElementById('rev-type').value;
  const month=document.getElementById('rev-month').value;
  const q=(document.getElementById('rev-search')?.value||'').toLowerCase();
  _revFiltered=_revRows.filter(r=>{
    const rFy=revGetField(r,['Financial Year','FinancialYear','FY']);
    const rPortal=revGetField(r,['Portal']);
    const rType=revGetField(r,['Revenue Type','RevenueType','Type']);
    const rMonth=revGetField(r,['Month','Revenue Month']);
    const mFy=!fy||rFy===fy;
    const mPortal=!portal||rPortal===portal;
    const mType=!type||rType===type;
    const mMonth=!month||rMonth===month;
    const mQ=!q||Object.values(r).some(v=>String(v).toLowerCase().includes(q));
    return mFy&&mPortal&&mType&&mMonth&&mQ;
  });
  _revFiltered.sort((a,b)=>{
    const va=parseFloat(revGetField(a,[_revSortKey]))||revGetField(a,[_revSortKey])||'';
    const vb=parseFloat(revGetField(b,[_revSortKey]))||revGetField(b,[_revSortKey])||'';
    if(va<vb) return _revSortAsc?-1:1; if(va>vb) return _revSortAsc?1:-1; return 0;
  });
  _revPageNum=1;
  revRenderKPIs();
  revRenderCharts();
  revRenderPortalBars();
  revRenderPage();
}

function revReset(){ ['rev-fy','rev-portal','rev-type','rev-month'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';}); document.getElementById('rev-search').value=''; revApplyFilters(); }

function revRenderKPIs(){
  const totalRev=_revFiltered.reduce((s,r)=>s+parseFloat(revGetField(r,['Revenue'])||'0'),0);
  const totalTgt=_revFiltered.reduce((s,r)=>s+parseFloat(revGetField(r,['Target'])||'0'),0);
  const ach=totalTgt>0?(totalRev/totalTgt*100).toFixed(1):'—';
  // top portal
  const byPortal={};
  _revFiltered.forEach(r=>{ const p=revGetField(r,['Portal'])||'—'; byPortal[p]=(byPortal[p]||0)+parseFloat(revGetField(r,['Revenue'])||'0'); });
  const topPortal=Object.entries(byPortal).sort((a,b)=>b[1]-a[1])[0]||['—',0];
  document.getElementById('rev-kv-total').textContent=revFmt(totalRev);
  document.getElementById('rev-ks-total').innerHTML='<span class="text-muted">'+_revFiltered.length+' records</span>';
  document.getElementById('rev-kv-target').textContent=revFmt(totalTgt);
  document.getElementById('rev-ks-target').innerHTML=totalTgt?'<span class="text-muted">Total target budget</span>':'<span class="text-muted">No target data</span>';
  document.getElementById('rev-kv-ach').textContent=(ach!=='—'?ach+'%':ach);
  const achN=parseFloat(ach)||0;
  document.getElementById('rev-ks-ach').className='ps-kpi-sub '+(achN>=100?'up':achN>=80?'flat':'dn');
  document.getElementById('rev-ks-ach').textContent=achN>=100?'On target':achN>=80?'Near target':'Below target';
  document.getElementById('rev-kv-portal').textContent=topPortal[0];
  document.getElementById('rev-ks-portal').innerHTML='<span class="text-muted">'+revFmt(topPortal[1])+' · highest revenue</span>';
}

function revRenderCharts(){
  // Trend: group by Month
  const byMonth={};
  _revFiltered.forEach(r=>{
    const m=revGetField(r,['Month','Revenue Month'])||'Unknown';
    byMonth[m]=(byMonth[m]||{rev:0,tgt:0});
    byMonth[m].rev+=parseFloat(revGetField(r,['Revenue'])||'0');
    byMonth[m].tgt+=parseFloat(revGetField(r,['Target'])||'0');
  });
  const mLabels=Object.keys(byMonth);
  const mRevs=mLabels.map(k=>byMonth[k].rev);
  const mTgts=mLabels.map(k=>byMonth[k].tgt);
  const trendLbl=document.getElementById('rev-trend-lbl');
  if(trendLbl) trendLbl.textContent=mLabels.length+' months';
  const tCtx=document.getElementById('revTrendChart');
  if(tCtx){
    if(_revTrendChart){_revTrendChart.destroy();_revTrendChart=null;}
    _revTrendChart=new Chart(tCtx,{type:'line',data:{labels:mLabels,datasets:[
      {label:'Revenue',data:mRevs,borderColor:'#4285f4',backgroundColor:'rgba(66,133,244,0.1)',fill:true,tension:0.4,pointRadius:3,borderWidth:2},
      {label:'Target',data:mTgts,borderColor:'#f59e0b',backgroundColor:'transparent',borderDash:[5,3],tension:0.4,pointRadius:2,borderWidth:1.5}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8080a8',font:{size:10},boxWidth:10,padding:10}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>revFmtShort(v)}}}}});
  }

  // Type donut
  const byType={};
  _revFiltered.forEach(r=>{ const t=revGetField(r,['Revenue Type','RevenueType','Type'])||'Other'; byType[t]=(byType[t]||0)+parseFloat(revGetField(r,['Revenue'])||'0'); });
  const tLabels=Object.keys(byType); const tVals=tLabels.map(k=>byType[k]);
  const tColors=tLabels.map(k=>TYPE_COLORS[k]||'#60a5fa');
  const ttCtx=document.getElementById('revTypeChart');
  if(ttCtx){
    if(_revTypeChart){_revTypeChart.destroy();_revTypeChart=null;}
    _revTypeChart=new Chart(ttCtx,{type:'doughnut',data:{labels:tLabels,datasets:[{data:tVals,backgroundColor:tColors,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8}},tooltip:{callbacks:{label:c=>' '+c.label+': '+revFmt(c.parsed)}}}}});
  }
  const total=tVals.reduce((s,v)=>s+v,0)||1;
  const tbEl=document.getElementById('revTypeBars');
  if(tbEl) tbEl.innerHTML=tLabels.map((l,i)=>{const pct=Math.round(tVals[i]/total*100);return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+l+'</span><span class="fs11 fw7" style="color:'+tColors[i]+'">'+revFmt(tVals[i])+'</span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct+'%;background:'+tColors[i]+'"></div></div></div>';}).join('');

  // Target vs Actual bar
  const tvaCtx=document.getElementById('revTvAChart');
  if(tvaCtx){
    if(_revTvAChart){_revTvAChart.destroy();_revTvAChart=null;}
    _revTvAChart=new Chart(tvaCtx,{type:'bar',data:{labels:mLabels,datasets:[
      {label:'Actual',data:mRevs,backgroundColor:'rgba(66,133,244,0.7)',borderRadius:4,borderWidth:0},
      {label:'Target',data:mTgts,backgroundColor:'rgba(245,158,11,0.4)',borderRadius:4,borderWidth:0}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8}}},scales:{x:{grid:{display:false},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>revFmtShort(v)}}}}});
  }
}

function revRenderPortalBars(){
  const el=document.getElementById('revPortalBars');
  const cntEl=document.getElementById('rev-portal-count');
  const byPortal={};
  _revFiltered.forEach(r=>{ const p=revGetField(r,['Portal'])||'—'; byPortal[p]=(byPortal[p]||0)+parseFloat(revGetField(r,['Revenue'])||'0'); });
  const sorted=Object.entries(byPortal).sort((a,b)=>b[1]-a[1]);
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';return;}
  const mx=sorted[0][1]||1;
  if(cntEl) cntEl.textContent=sorted.length+' portals';
  el.innerHTML=sorted.map(([name,val],i)=>{
    const pct=Math.round(val/mx*100);
    const col=PORTAL_COLORS[i%PORTAL_COLORS.length];
    return '<div class="ps-hbar-item"><span class="ps-hbar-name" title="'+name+'">'+name+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+pct+'%;background:'+col+'"></div></div><span class="ps-hbar-val">'+revFmt(val)+'</span></div>';
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
  if(!page.length){tbody.innerHTML='<tr><td colspan="7" class="text-muted" style="text-align:center;padding:24px">No records match</td></tr>';return;}
  tbody.innerHTML=page.map(r=>{
    const rev=parseFloat(revGetField(r,['Revenue'])||'0');
    const tgt=parseFloat(revGetField(r,['Target'])||'0');
    const ach=tgt>0?(rev/tgt*100).toFixed(1)+'%':'—';
    const achN=parseFloat(ach)||0;
    const achCol=achN>=100?'#00d68f':achN>=80?'#f59e0b':'#f43f5e';
    return '<tr>'+
      '<td class="fw6">'+( revGetField(r,['Portal'])||'—')+'</td>'+
      '<td class="muted">'+( revGetField(r,['Financial Year','FinancialYear','FY'])||'—')+'</td>'+
      '<td class="muted">'+( revGetField(r,['Month','Revenue Month'])||'—')+'</td>'+
      '<td><span class="ps-plat ps-plat-sheets" style="font-size:9px">'+( revGetField(r,['Revenue Type','RevenueType','Type'])||'—')+'</span></td>'+
      '<td class="num fw7" style="color:#4285f4">'+revFmt(rev)+'</td>'+
      '<td class="num muted">'+revFmt(tgt)+'</td>'+
      '<td class="num fw7" style="color:'+achCol+'">'+ach+'</td>'+
    '</tr>';
  }).join('');
}

function revSort(key){
  if(_revSortKey===key) _revSortAsc=!_revSortAsc; else {_revSortKey=key;_revSortAsc=false;}
  const ths=document.querySelectorAll('[id^="revth-"]');
  ths.forEach(th=>{th.classList.remove('sort-asc','sort-desc');});
  const th=document.getElementById('revth-'+key);
  if(th) th.classList.add(_revSortAsc?'sort-asc':'sort-desc');
  revApplyFilters();
}
function revPage(dir){ const pages=Math.max(1,Math.ceil(_revFiltered.length/_revPageSz)); _revPageNum=Math.max(1,Math.min(pages,_revPageNum+dir)); revRenderPage(); }
function revExportCSV(){
  if(!_revFiltered.length) return;
  const keys=Object.keys(_revFiltered[0]||{});
  const csv=[keys.join(','),..._revFiltered.map(r=>keys.map(k=>'"'+(String(r[k]||'').replace(/"/g,'""'))+'"').join(','))].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='revenue.csv';a.click();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadRevenueData);
else setTimeout(loadRevenueData,80);
</script>
`;
}


// ═══════════════════════════════════════════════════════════════════════════
//  2. CAMPAIGN PERFORMANCE (Direct Campaign – Google Sheets)
// ═══════════════════════════════════════════════════════════════════════════
export function campaignScreen(): string {
  return `
${PS_CSS}
<div class="content fade-in">

<!-- ── Data source ─────────────────────────────────────────────────────── -->
<div class="ps-src">
  <i class="fas fa-table-cells" style="color:#34d399"></i>
  <strong>Google Sheets</strong> <span class="text-muted">·</span> Direct Campaign tab
  <span class="ps-plat ps-plat-sheets">Sheets · Live</span>
  <span id="camp-src-status" style="margin-left:auto"></span>
</div>

<!-- ── Filters ─────────────────────────────────────────────────────────── -->
<div class="ps-filter-bar">
  <label>Financial Year</label>
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
  <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="campReset()"><i class="fas fa-filter-circle-xmark"></i>Reset</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadCampData()"><i class="fas fa-rotate"></i>Refresh</button>
  <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="campExportCSV()"><i class="fas fa-download"></i>CSV</button>
</div>

<!-- ── KPIs ────────────────────────────────────────────────────────────── -->
<div class="ps-kpi-row">
  ${_psKpi(true,  '#4285f4','sack-dollar',     'Total Revenue',         'camp-kv-rev',   'camp-ks-rev')}
  ${_psKpi(false, '#a78bfa','bullhorn',         'Total Campaigns',       'camp-kv-count', 'camp-ks-count')}
  ${_psKpi(false, '#00d68f','chart-bar',        'Avg Revenue / Campaign','camp-kv-avg',   'camp-ks-avg')}
  ${_psKpi(false, '#f59e0b','crown',            'Top Advertiser',        'camp-kv-adv',   'camp-ks-adv')}
</div>

<!-- ── Row 2: Trend + Advertiser Bar ───────────────────────────────────── -->
<div class="ps-g62">
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-line" style="color:#4285f4;margin-right:6px"></i>Revenue Trend (Monthly)</div>
      <span id="camp-trend-lbl" class="fs11 text-muted"></span>
    </div>
    <div style="height:200px"><canvas id="campTrendChart"></canvas></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-chart-pie" style="color:#a78bfa;margin-right:6px"></i>Campaign Type Split</div>
    </div>
    <div style="height:140px"><canvas id="campTypeChart"></canvas></div>
    <div id="campTypeBars" style="margin-top:10px;display:flex;flex-direction:column;gap:6px"></div>
  </div>
</div>

<!-- ── Row 3: Top Advertisers + Deal Type ──────────────────────────────── -->
<div class="ps-g2">
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
    <div id="campDealBars" style="display:flex;flex-direction:column;gap:7px"></div>
    <div style="height:130px;margin-top:10px"><canvas id="campDealChart"></canvas></div>
  </div>
</div>

<!-- ── Row 4: Campaign Table ────────────────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-table-list" style="color:#60a5fa;margin-right:6px"></i>Campaign Detail</div>
    <div style="display:flex;gap:6px;align-items:center">
      <input id="camp-search" type="text" placeholder="Search campaign, advertiser…" style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:200px;outline:none" oninput="campApplyFilters()">
      <span id="camp-count" class="fs11 text-muted"></span>
    </div>
  </div>
  <div class="ps-tbl-wrap">
    <table class="ps-tbl">
      <thead>
        <tr>
          <th onclick="campSort('Campaign Name')" id="campth-Campaign-Name">Campaign</th>
          <th onclick="campSort('AdvertiserCompany')" id="campth-AdvertiserCompany">Advertiser</th>
          <th onclick="campSort('campaignType')" id="campth-campaignType">Type</th>
          <th onclick="campSort('Platform')" id="campth-Platform">Platform</th>
          <th onclick="campSort('DealType')" id="campth-DealType">Deal Type</th>
          <th onclick="campSort('ProductCategory')" id="campth-ProductCategory">Category</th>
          <th onclick="campSort('Financial Year')" id="campth-Financial-Year">FY</th>
          <th onclick="campSort('Month')" id="campth-Month">Month</th>
          <th onclick="campSort('Total')" class="num" id="campth-Total">Revenue</th>
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
let _campSortKey='Total', _campSortAsc=false;
let _campTrendChart=null, _campTypeChart=null, _campDealChart=null;
const CAMP_COLORS=['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399','#60a5fa','#e879f9','#fb923c','#38bdf8'];

function campFmt(n){ n=parseFloat(n)||0; if(n>=1e6) return 'RM '+(n/1e6).toFixed(2)+'M'; if(n>=1e3) return 'RM '+(n/1e3).toFixed(1)+'K'; return 'RM '+n.toFixed(0); }
function campFmtShort(n){ n=parseFloat(n)||0; if(n>=1e6) return (n/1e6).toFixed(1)+'M'; if(n>=1e3) return (n/1e3).toFixed(1)+'K'; return n.toFixed(0); }
function campG(r,keys){ for(const k of keys) if(r[k]!==undefined) return r[k]; return ''; }

async function loadCampData(){
  const src=document.getElementById('camp-src-status');
  if(src) src.innerHTML='<i class="fas fa-spinner fa-spin" style="color:#4285f4;font-size:11px"></i> Loading…';
  try{
    const r=await fetch('/api/data/campaign').then(x=>x.json());
    if(!r.ok){ if(src) src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> '+(r.error||'Not connected')+'</span>'; campShowEmpty(); return; }
    _campRows=r.rows||[];
    if(src) src.innerHTML='<span style="color:#00d68f;font-size:11px"><i class="fas fa-circle-check"></i> '+_campRows.length+' rows loaded</span>';
    campPopulateFilters();
    campApplyFilters();
  }catch(e){
    if(src) src.innerHTML='<span style="color:#f43f5e;font-size:11px"><i class="fas fa-xmark"></i> '+e.message+'</span>';
    campShowEmpty();
  }
}

function campShowEmpty(){
  document.getElementById('campTbody').innerHTML='<tr><td colspan="9" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-plug" style="color:#f59e0b;font-size:16px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Connect Google Sheets in <a href="#" onclick="navigate(\'api\')" style="color:#60a5fa">API Connections</a></span></td></tr>';
}

function campPopulateFilters(){
  const fys=[...new Set(_campRows.map(r=>campG(r,['Financial Year','FinancialYear','FY'])).filter(Boolean))].sort().reverse();
  const advs=[...new Set(_campRows.map(r=>campG(r,['AdvertiserCompany','Advertiser'])).filter(Boolean))].sort();
  const types=[...new Set(_campRows.map(r=>campG(r,['campaignType','Campaign Type','CampaignType'])).filter(Boolean))].sort();
  const plats=[...new Set(_campRows.map(r=>campG(r,['Platform'])).filter(Boolean))].sort();
  const fill=(id,arr,cur)=>{ const el=document.getElementById(id); if(!el) return; const first=el.options[0].text; el.innerHTML='<option value="">'+first+'</option>'+arr.map(v=>'<option value="'+v+'"'+(v===cur?' selected':'')+'">'+v+'</option>').join(''); };
  fill('camp-fy',fys,document.getElementById('camp-fy').value);
  fill('camp-adv',advs,document.getElementById('camp-adv').value);
  fill('camp-type',types,document.getElementById('camp-type').value);
  fill('camp-platform',plats,document.getElementById('camp-platform').value);
}

function campApplyFilters(){
  const fy=document.getElementById('camp-fy').value;
  const adv=document.getElementById('camp-adv').value;
  const type=document.getElementById('camp-type').value;
  const plat=document.getElementById('camp-platform').value;
  const q=(document.getElementById('camp-search')?.value||'').toLowerCase();
  _campFiltered=_campRows.filter(r=>{
    const mFy=!fy||campG(r,['Financial Year','FinancialYear','FY'])===fy;
    const mAdv=!adv||campG(r,['AdvertiserCompany','Advertiser'])===adv;
    const mType=!type||campG(r,['campaignType','Campaign Type','CampaignType'])===type;
    const mPlat=!plat||campG(r,['Platform'])===plat;
    const mQ=!q||Object.values(r).some(v=>String(v).toLowerCase().includes(q));
    return mFy&&mAdv&&mType&&mPlat&&mQ;
  });
  _campFiltered.sort((a,b)=>{
    const va=parseFloat(campG(a,[_campSortKey]))||campG(a,[_campSortKey])||'';
    const vb=parseFloat(campG(b,[_campSortKey]))||campG(b,[_campSortKey])||'';
    if(va<vb) return _campSortAsc?-1:1; if(va>vb) return _campSortAsc?1:-1; return 0;
  });
  _campPageNum=1;
  campRenderKPIs();
  campRenderCharts();
  campRenderAdvBars();
  campRenderDealBars();
  campRenderPage();
}

function campReset(){ ['camp-fy','camp-adv','camp-type','camp-platform'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';}); document.getElementById('camp-search').value=''; campApplyFilters(); }

function campRenderKPIs(){
  const totalRev=_campFiltered.reduce((s,r)=>s+parseFloat(campG(r,['Total','Revenue','Total Revenue'])||'0'),0);
  const count=_campFiltered.length;
  const avg=count>0?totalRev/count:0;
  // top advertiser
  const byAdv={};
  _campFiltered.forEach(r=>{ const a=campG(r,['AdvertiserCompany','Advertiser'])||'—'; byAdv[a]=(byAdv[a]||0)+parseFloat(campG(r,['Total','Revenue'])||'0'); });
  const topAdv=Object.entries(byAdv).sort((a,b)=>b[1]-a[1])[0]||['—',0];
  document.getElementById('camp-kv-rev').textContent=campFmt(totalRev);
  document.getElementById('camp-ks-rev').innerHTML='<span class="text-muted">'+count+' campaigns</span>';
  document.getElementById('camp-kv-count').textContent=count.toLocaleString();
  document.getElementById('camp-ks-count').innerHTML='<span class="text-muted">direct campaigns</span>';
  document.getElementById('camp-kv-avg').textContent=campFmt(avg);
  document.getElementById('camp-ks-avg').innerHTML='<span class="text-muted">per campaign</span>';
  document.getElementById('camp-kv-adv').textContent=topAdv[0];
  document.getElementById('camp-ks-adv').innerHTML='<span class="text-muted">'+campFmt(topAdv[1])+'</span>';
}

function campRenderCharts(){
  // Trend
  const byMonth={};
  _campFiltered.forEach(r=>{ const m=campG(r,['Month','Revenue Month'])||'Unknown'; byMonth[m]=(byMonth[m]||0)+parseFloat(campG(r,['Total','Revenue'])||'0'); });
  const mL=Object.keys(byMonth); const mV=mL.map(k=>byMonth[k]);
  const tCtx=document.getElementById('campTrendChart');
  const tlbl=document.getElementById('camp-trend-lbl');
  if(tlbl) tlbl.textContent=mL.length+' months';
  if(tCtx){
    if(_campTrendChart){_campTrendChart.destroy();_campTrendChart=null;}
    _campTrendChart=new Chart(tCtx,{type:'bar',data:{labels:mL,datasets:[{label:'Revenue',data:mV,backgroundColor:'rgba(66,133,244,0.7)',borderRadius:5,borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>campFmtShort(v)}}}}});
  }
  // Type donut
  const byType={};
  _campFiltered.forEach(r=>{ const t=campG(r,['campaignType','Campaign Type'])||'Other'; byType[t]=(byType[t]||0)+parseFloat(campG(r,['Total','Revenue'])||'0'); });
  const tLabels=Object.keys(byType); const tVals=tLabels.map(k=>byType[k]);
  const tColors=tLabels.map((_,i)=>CAMP_COLORS[i%CAMP_COLORS.length]);
  const ttCtx=document.getElementById('campTypeChart');
  if(ttCtx){
    if(_campTypeChart){_campTypeChart.destroy();_campTypeChart=null;}
    _campTypeChart=new Chart(ttCtx,{type:'doughnut',data:{labels:tLabels,datasets:[{data:tVals,backgroundColor:tColors,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8}},tooltip:{callbacks:{label:c=>' '+c.label+': '+campFmt(c.parsed)}}}}});
  }
  const tot=tVals.reduce((s,v)=>s+v,0)||1;
  const tbEl=document.getElementById('campTypeBars');
  if(tbEl) tbEl.innerHTML=tLabels.map((l,i)=>{const pct=Math.round(tVals[i]/tot*100);return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+l+'</span><span class="fs11 fw7" style="color:'+tColors[i]+'">'+campFmt(tVals[i])+'</span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct+'%;background:'+tColors[i]+'"></div></div></div>';}).join('');
}

function campRenderAdvBars(){
  const el=document.getElementById('campAdvBars');
  const cntEl=document.getElementById('camp-adv-count');
  const byAdv={};
  _campFiltered.forEach(r=>{ const a=campG(r,['AdvertiserCompany','Advertiser'])||'—'; byAdv[a]=(byAdv[a]||0)+parseFloat(campG(r,['Total','Revenue'])||'0'); });
  const sorted=Object.entries(byAdv).sort((a,b)=>b[1]-a[1]).slice(0,12);
  if(cntEl) cntEl.textContent=Object.keys(byAdv).length+' advertisers';
  if(!sorted.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No data</div>';return;}
  const mx=sorted[0][1]||1;
  el.innerHTML=sorted.map(([name,val],i)=>{const pct=Math.round(val/mx*100);const col=CAMP_COLORS[i%CAMP_COLORS.length];return '<div class="ps-hbar-item"><span class="ps-hbar-name" title="'+name+'">'+name+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+pct+'%;background:'+col+'"></div></div><span class="ps-hbar-val">'+campFmt(val)+'</span></div>';}).join('');
}

function campRenderDealBars(){
  const el=document.getElementById('campDealBars');
  const byDeal={};
  _campFiltered.forEach(r=>{ const d=campG(r,['DealType','Deal Type'])||'—'; byDeal[d]=(byDeal[d]||0)+parseFloat(campG(r,['Total','Revenue'])||'0'); });
  const sorted=Object.entries(byDeal).sort((a,b)=>b[1]-a[1]);
  const tot=sorted.reduce((s,[,v])=>s+v,0)||1;
  el.innerHTML=sorted.map(([name,val],i)=>{const pct=Math.round(val/tot*100);const col=CAMP_COLORS[i%CAMP_COLORS.length];return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+name+'</span><span class="fs11 fw7" style="color:'+col+'">'+campFmt(val)+' <span class="text-muted">('+pct+'%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:'+pct+'%;background:'+col+'"></div></div></div>';}).join('');
  const dCtx=document.getElementById('campDealChart');
  if(dCtx){
    if(_campDealChart){_campDealChart.destroy();_campDealChart=null;}
    _campDealChart=new Chart(dCtx,{type:'doughnut',data:{labels:sorted.map(([l])=>l),datasets:[{data:sorted.map(([,v])=>v),backgroundColor:sorted.map((_,i)=>CAMP_COLORS[i%CAMP_COLORS.length]),borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8}},tooltip:{callbacks:{label:c=>' '+c.label+': '+campFmt(c.parsed)}}}}});
  }
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
  if(!page.length){tbody.innerHTML='<tr><td colspan="9" class="text-muted" style="text-align:center;padding:24px">No records match</td></tr>';return;}
  tbody.innerHTML=page.map(r=>{
    const rev=parseFloat(campG(r,['Total','Revenue','Total Revenue'])||'0');
    return '<tr>'+
      '<td class="fw6" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(campG(r,['Campaign Name','CampaignName'])||'—')+'">'+(campG(r,['Campaign Name','CampaignName'])||'—')+'</td>'+
      '<td class="muted">'+(campG(r,['AdvertiserCompany','Advertiser'])||'—')+'</td>'+
      '<td><span style="font-size:9px;padding:2px 6px;border-radius:5px;background:rgba(66,133,244,0.12);color:#4285f4;white-space:nowrap">'+(campG(r,['campaignType','Campaign Type'])||'—')+'</span></td>'+
      '<td class="muted fs11">'+(campG(r,['Platform'])||'—')+'</td>'+
      '<td class="muted fs11">'+(campG(r,['DealType','Deal Type'])||'—')+'</td>'+
      '<td class="muted fs11">'+(campG(r,['ProductCategory','Product Category'])||'—')+'</td>'+
      '<td class="muted fs11">'+(campG(r,['Financial Year','FinancialYear','FY'])||'—')+'</td>'+
      '<td class="muted fs11">'+(campG(r,['Month','Revenue Month'])||'—')+'</td>'+
      '<td class="num fw7" style="color:#4285f4">'+campFmt(rev)+'</td>'+
    '</tr>';
  }).join('');
}

function campSort(key){
  const safeKey=key;
  if(_campSortKey===safeKey) _campSortAsc=!_campSortAsc; else {_campSortKey=safeKey;_campSortAsc=false;}
  campApplyFilters();
}
function campPage(dir){ const pages=Math.max(1,Math.ceil(_campFiltered.length/_campPageSz)); _campPageNum=Math.max(1,Math.min(pages,_campPageNum+dir)); campRenderPage(); }
function campExportCSV(){
  if(!_campFiltered.length) return;
  const keys=Object.keys(_campFiltered[0]||{});
  const csv=[keys.join(','),..._campFiltered.map(r=>keys.map(k=>'"'+(String(r[k]||'').replace(/"/g,'""'))+'"').join(','))].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='campaigns.csv';a.click();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadCampData);
else setTimeout(loadCampData,80);
</script>
`;
}


// ═══════════════════════════════════════════════════════════════════════════
//  3. ADS PERFORMANCE (Cross-Platform: GAM + TikTok + Facebook)
// ═══════════════════════════════════════════════════════════════════════════
export function gamAnalyticsScreen(): string {
  return `
${PS_CSS}
<style>
.gam-li-indent{padding-left:44px!important}
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
  <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" onclick="loadGAMAnalytics()">
    <i class="fas fa-rotate" id="gamRefreshIcon"></i>Refresh
  </button>
</div>

<!-- ── KPI Strip ───────────────────────────────────────────────────────── -->
<div class="ps-kpi-row" id="gamKpiStrip">
  ${_psKpi(true,  '#4285f4','file-invoice',  'Total Orders',        'kv-orders',  'kc-orders')}
  ${_psKpi(false, '#00d68f','circle-play',   'Active / Delivering',  'kv-active',  'kc-active')}
  ${_psKpi(false, '#f59e0b','eye',           'Impressions Delivered','kv-impr',    'kc-impr')}
  ${_psKpi(false, '#a78bfa','layer-group',   'Total Line Items',     'kv-li',      'kc-li')}
</div>

<!-- ── Row 2: Status Overview + Delivery Health ────────────────────────── -->
<div class="ps-g62">

  <!-- Order Status Overview -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-circle-dot" style="color:#4285f4;margin-right:7px"></i>Order Status Overview</div>
      <span class="b b-gray fs10" id="networkStatusBadge">—</span>
    </div>
    <div id="orderStatusBars" style="display:flex;flex-direction:column;gap:10px;min-height:100px">
      <div class="text-muted fs12" style="padding:20px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
    </div>
    <div style="height:150px;margin-top:14px"><canvas id="orderStatusChart"></canvas></div>
  </div>

  <!-- Right column: LI Health + Top LIs -->
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

<!-- ── Row 4: Orders + Line Items Table ────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-sitemap" style="color:#4285f4;margin-right:7px"></i>Orders &amp; Line Items</div>
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
      <span id="ordersCountBadge" class="b b-gray fs10">—</span>
      <input id="orderSearch" type="text" placeholder="Search orders…"
        style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:160px;outline:none;height:28px"
        oninput="filterOrders(this.value)">
      <select id="orderStatusFilter"
        style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 8px;color:var(--text-primary);font-size:11px;outline:none;height:28px"
        onchange="filterOrders(document.getElementById('orderSearch').value)">
        <option value="ACTIVE_DELIVERING">Active &amp; Delivering</option>
        <option value="PAUSED">Paused</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELED">Canceled</option>
        <option value="">All (excl. Draft)</option>
      </select>
      <select id="orderPageSize"
        style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 8px;color:var(--text-primary);font-size:11px;outline:none;height:28px"
        onchange="_ordersPageSize=parseInt(this.value);filterOrders(document.getElementById('orderSearch').value)">
        <option value="15">15/page</option>
        <option value="25" selected>25/page</option>
        <option value="50">50/page</option>
        <option value="100">100/page</option>
      </select>
      <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" id="expandAllBtn" onclick="toggleExpandAll()"><i class="fas fa-expand-alt"></i>Expand All</button>
      <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="exportOrdersCSV()"><i class="fas fa-download"></i>CSV</button>
    </div>
  </div>

  <div class="ps-tbl-wrap">
    <table class="ps-tbl" style="min-width:900px">
      <thead>
        <tr>
          <th style="width:30px"></th>
          <th id="th-displayName" onclick="sortOrdersBy('displayName')" style="min-width:180px">Order Name <i class="fas fa-sort" id="si-displayName" style="opacity:0.3;font-size:9px"></i></th>
          <th id="th-advertiserId" onclick="sortOrdersBy('advertiserId')">Advertiser <i class="fas fa-sort" id="si-advertiserId" style="opacity:0.3;font-size:9px"></i></th>
          <th id="th-status" onclick="sortOrdersBy('status')">Status <i class="fas fa-sort" id="si-status" style="opacity:0.3;font-size:9px"></i></th>
          <th id="th-startTime" onclick="sortOrdersBy('startTime')">Start <i class="fas fa-sort" id="si-startTime" style="opacity:0.3;font-size:9px"></i></th>
          <th id="th-endTime" onclick="sortOrdersBy('endTime')">End <i class="fas fa-sort" id="si-endTime" style="opacity:0.3;font-size:9px"></i></th>
          <th id="th-totalBudget" onclick="sortOrdersBy('totalBudget')">Budget <i class="fas fa-sort" id="si-totalBudget" style="opacity:0.3;font-size:9px"></i></th>
          <th>Line Items</th>
          <th id="th-impressions" onclick="sortOrdersBy('impressions')" class="num">Impressions <i class="fas fa-sort" id="si-impressions" style="opacity:0.3;font-size:9px"></i></th>
          <th class="num">Clicks / CTR</th>
        </tr>
      </thead>
      <tbody id="ordersTbody">
        <tr><td colspan="10" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Fetching orders…</span></td></tr>
      </tbody>
    </table>
  </div>

  <div class="ps-pag">
    <span id="ordersCount" class="fs11 text-muted">—</span>
    <div style="display:flex;gap:6px;align-items:center">
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="ordersPrevBtn" onclick="ordersPage(-1)" disabled>← Prev</button>
      <span id="ordersPageLabel" class="fs11 text-muted" style="padding:0 6px;line-height:26px">Page 1</span>
      <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="ordersNextBtn" onclick="ordersPage(1)">Next →</button>
    </div>
  </div>
</div>

<!-- ── Row 5: Network Info ──────────────────────────────────────────────── -->
<div class="card card-sm" style="margin-top:14px">
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

</div><!-- /content -->

<script>
// ── GAM Analytics state ────────────────────────────────────────────────────
let _gamOrders=[], _gamLineItems=[], _gamNetwork=null;
let _ordersFiltered=[], _ordersPageNum=1, _ordersPageSize=25;
let _ordersSortKey='impressions', _ordersSortAsc=false;
let _expandedOrders=new Set(), _allExpanded=false;
let _orderMetaCache={};
let _orderStatusChart=null;

// ── Utilities ─────────────────────────────────────────────────────────────
function fmtImpr(n){n=parseInt(n)||0;if(n>=1e9)return(n/1e9).toFixed(1)+'B';if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n===0?'—':n.toLocaleString();}
function fmtDateShort(s){if(!s)return'—';try{const d=new Date(s);return d.toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'2-digit'});}catch{return s.slice(0,10);}}
function fmtBudget(b){if(!b)return'—';const u=parseFloat(b.units||'0');if(u===0)return'—';const c=b.currencyCode||'';if(u>=1e6)return c+'\u00a0'+(u/1e6).toFixed(2)+'M';if(u>=1e3)return c+'\u00a0'+(u/1e3).toFixed(1)+'K';return c+'\u00a0'+u.toFixed(0);}
function advShort(id){if(!id)return'—';const n=id.split('/').pop();return n?'#'+n:id;}
const STATUS_COLOR={ACTIVE:'#00d68f',DELIVERING:'#00c07f',COMPLETED:'#60a5fa',PAUSED:'#f59e0b',CANCELED:'#f43f5e',DRAFT:'#8080a8',PENDING_APPROVAL:'#a78bfa',UNKNOWN:'#48486a'};
const STATUS_BADGE={ACTIVE:'b-green',DELIVERING:'b-green',COMPLETED:'b-blue',PAUSED:'b-amber',CANCELED:'b-red',DRAFT:'b-gray',PENDING_APPROVAL:'b-purple',UNKNOWN:'b-gray'};
function statusBadge(s){const cls=STATUS_BADGE[s]||'b-gray';const lbl=(s||'UNKNOWN').replace(/_/g,'\u00a0');return \`<span class="b \${cls}" style="font-size:9px;white-space:nowrap">\${lbl}</span>\`;}

// ── Main Loader (Progressive: cached first, then fresh) ──────────────────────
async function loadGAMAnalytics(force=false){
  const icon=document.getElementById('gamBannerIcon');
  const txt=document.getElementById('gamBannerText');
  const ri=document.getElementById('gamRefreshIcon');
  const banner=document.getElementById('gamBanner');
  icon.className='fas fa-spinner fa-spin';icon.style.color='#4285f4';
  txt.textContent='Loading data…';txt.style.color='#60a5fa';
  banner.style.background='rgba(66,133,244,0.08)';banner.style.borderColor='rgba(66,133,244,0.2)';
  if(ri) ri.className='fas fa-spinner fa-spin';
  const tb=document.getElementById('ordersTbody');
  if(tb) tb.innerHTML='<tr><td colspan="10" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Fetching orders…</span></td></tr>';

  try{
    // Step 1: Try to load cached data for instant display (unless forced refresh)
    if(!force && !window._gamDataLoaded){
      const[cSumRes,cOrdRes,cLiRes]=await Promise.all([
        fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(()=>({ok:false})),
        fetch('/api/gam/orders?pageSize=500&cached=true').then(r=>r.json()).catch(()=>({ok:false})),
        fetch('/api/gam/lineitems?pageSize=500&cached=true').then(r=>r.json()).catch(()=>({ok:false})),
      ]);
      
      if(cSumRes.ok && cSumRes.cached){
        // Render cached data immediately
        _gamOrders=(cOrdRes.ok?cOrdRes.orders:[])||[];
        _gamLineItems=(cLiRes.ok?cLiRes.lineItems:[])||[];
        _gamOrders=_gamOrders.filter(o=>o.status!=='UNKNOWN'&&o.status!=='DRAFT');
        _gamLineItems=_gamLineItems.filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');
        _gamNetwork=cSumRes;
        _orderMetaCache={};_buildOrderMetaCache();
        
        icon.className='fas fa-database';icon.style.color='#a78bfa';
        const age=Math.round((cSumRes.cacheAge||0)/1000);
        txt.textContent='Cached data ('+age+'s old) · Refreshing live data…';txt.style.color='#a78bfa';
        
        renderGAMKPIs();renderGAMCharts();applyOrderFilters();renderNetworkInfo();
        if(ri)ri.className='fas fa-spinner fa-spin';
      }
    }
    
    // Step 2: Fetch fresh data from GAM API
    const[sumRes,ordRes,liRes]=await Promise.all([
      fetch('/api/gam/summary').then(r=>r.json()),
      fetch('/api/gam/orders?pageSize=500').then(r=>r.json()),
      fetch('/api/gam/lineitems?pageSize=500').then(r=>r.json()),
    ]);
    
    if(!sumRes.ok){
      const em=sumRes.error||'Unknown error. Set up GAM in API Connections.';
      icon.className='fas fa-triangle-exclamation';icon.style.color='#f59e0b';
      txt.textContent='GAM not connected — '+em;txt.style.color='#f59e0b';
      banner.style.background='rgba(245,158,11,0.07)';banner.style.borderColor='rgba(245,158,11,0.2)';
      const noConf='<div class="text-muted fs12" style="padding:14px 0;text-align:center"><i class="fas fa-plug" style="color:#f59e0b;margin-right:6px"></i>GAM not configured — <a href="#" onclick="navigate(\'api\')" style="color:#60a5fa">Set up in API Connections</a></div>';
      ['ordersTbody','gamTopLI','orderStatusBars','liStatusBars','networkInfoBody','gamTopOrdersBars'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=noConf;});
      if(ri)ri.className='fas fa-rotate';return;
    }
    
    // Update with fresh data
    _gamOrders=(ordRes.ok?ordRes.orders:[])||[];
    _gamLineItems=(liRes.ok?liRes.lineItems:[])||[];
    _gamOrders=_gamOrders.filter(o=>o.status!=='UNKNOWN'&&o.status!=='DRAFT');
    _gamLineItems=_gamLineItems.filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');
    _gamNetwork=sumRes;
    _orderMetaCache={};_buildOrderMetaCache();
    
    const now=new Date().toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'});
    icon.className='fas fa-circle-check';icon.style.color='#00d68f';
    txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders · '+_gamLineItems.length+' line items · Fetching delivery metrics…';
    txt.style.color='#00d68f';banner.style.background='rgba(0,214,143,0.06)';banner.style.borderColor='rgba(0,214,143,0.18)';
    const lr=document.getElementById('gamLastRefresh');if(lr)lr.textContent='Last refresh: '+now;
    if(ri)ri.className='fas fa-rotate';
    renderKPIs(sumRes);renderOrderStatusBars(sumRes.orders?.byStatus||{});renderLIStatusBars(sumRes.lineItems?.byStatus||{});renderNetworkInfo(sumRes);renderTopLI();renderOrdersTable();renderCharts(sumRes);renderTopOrdersBars();

    // Async metrics fetch
    txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · Fetching delivery metrics (15-30s)…';
    try{
      const metricsRes=await fetch('/api/gam/metrics').then(r=>r.json());
      if(metricsRes.ok&&metricsRes.lineItemMetrics){
        for(const li of _gamLineItems){const liNum=li.name?li.name.split('/').pop():'';const m=metricsRes.lineItemMetrics[liNum]||metricsRes.lineItemMetrics[li.name]||null;if(m){li.impressionsDelivered=String(m.impressions||0);li.clicksDelivered=String(m.clicks||0);}}
        _orderMetaCache={};_buildOrderMetaCache();
        let totalImpr=0,totalClk=0;
        for(const li of _gamLineItems){totalImpr+=parseInt(li.impressionsDelivered||'0');totalClk+=parseInt(li.clicksDelivered||'0');}
        const enriched={...sumRes,lineItems:{...sumRes.lineItems,totalImpressions:totalImpr,totalClicks:totalClk}};
        renderKPIs(enriched);renderTopLI();renderTopOrdersBars();renderOrdersPage();
        txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders · '+_gamLineItems.length+' line items · Metrics updated';
      }else{
        txt.textContent='Connected · '+_gamOrders.length+' orders (metrics unavailable: '+(metricsRes.error||'unknown')+')';
        icon.className='fas fa-circle-exclamation';icon.style.color='#f59e0b';
      }
    }catch(me){
      txt.textContent='Connected · '+_gamOrders.length+' orders (delivery metrics failed: '+me.message+')';
      icon.className='fas fa-circle-exclamation';icon.style.color='#f59e0b';
    }
  }catch(e){
    icon.className='fas fa-circle-xmark';icon.style.color='#f43f5e';
    txt.textContent='Failed to load GAM data: '+e.message;txt.style.color='#f43f5e';
    banner.style.background='rgba(244,63,94,0.07)';banner.style.borderColor='rgba(244,63,94,0.2)';
    if(ri)ri.className='fas fa-rotate';
  }
}

// ── Per-order metrics cache ────────────────────────────────────────────────
function _buildOrderMetaCache(){
  const map={};
  for(const li of _gamLineItems){
    if(li.status==='UNKNOWN'||li.status==='DRAFT') continue;
    const oid=li.orderId||(li.name?li.name.split('/lineItems/')[0]:'');
    if(!oid) continue;
    if(!map[oid]) map[oid]={impr:0,clicks:0,lis:[],activeCount:0};
    const im=parseInt(li.impressionsDelivered||'0');
    const cl=parseInt(li.clicksDelivered||'0');
    map[oid].impr+=im;map[oid].clicks+=cl;map[oid].lis.push(li);
    if(li.status==='ACTIVE'||li.status==='DELIVERING') map[oid].activeCount++;
  }
  for(const key of Object.keys(map)){const num=key.split('/').pop();if(num&&num!==key) map[num]=map[key];}
  _orderMetaCache=map;
}
function _getOrderMeta(o){const oid=o.name||o.id||'';const num=oid.split('/').pop();return _orderMetaCache[oid]||_orderMetaCache[num]||{impr:0,clicks:0,lis:[],activeCount:0};}

// ── KPIs ───────────────────────────────────────────────────────────────────
function renderKPIs(s){
  const tot=s.orders?.total||_gamOrders.length;
  const act=(s.orders?.byStatus?.ACTIVE||0)+(s.orders?.byStatus?.DELIVERING||0);
  const impr=s.lineItems?.totalImpressions||0;
  const li=s.lineItems?.total||_gamLineItems.length;
  const ali=(s.lineItems?.byStatus?.ACTIVE||0)+(s.lineItems?.byStatus?.DELIVERING||0);
  const clk=s.lineItems?.totalClicks||0;
  const ctr=impr>0?(clk/impr*100).toFixed(2)+'%':'—';
  document.getElementById('kv-orders').textContent=tot.toLocaleString();
  document.getElementById('kc-orders').innerHTML='<span class="text-muted">'+li+' line items</span>';
  document.getElementById('kv-active').textContent=act.toLocaleString();
  document.getElementById('kc-active').innerHTML='<span class="up"><i class="fas fa-circle" style="font-size:7px;margin-right:4px;color:#00d68f"></i>'+ali+' active LIs</span>';
  document.getElementById('kv-impr').innerHTML=fmtImpr(impr);
  document.getElementById('kc-impr').innerHTML='<span class="text-muted">'+fmtImpr(clk)+' clicks · '+ctr+'</span>';
  document.getElementById('kv-li').textContent=li.toLocaleString();
  document.getElementById('kc-li').innerHTML='<span class="up">'+ali+' active</span>';
}

// ── Status bars ────────────────────────────────────────────────────────────
function renderOrderStatusBars(by){
  const el=document.getElementById('orderStatusBars');
  const order=['ACTIVE','DELIVERING','PAUSED','COMPLETED','CANCELED','PENDING_APPROVAL'];
  const all=Object.entries(by).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  const tot=all.reduce((a,[,v])=>a+v,0)||1;
  all.sort((a,b)=>{const ia=order.indexOf(a[0]),ib=order.indexOf(b[0]);if(ia!==-1&&ib!==-1)return ia-ib;if(ia!==-1)return -1;if(ib!==-1)return 1;return b[1]-a[1];});
  if(!all.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No order data</div>';return;}
  el.innerHTML=all.map(([st,cnt])=>{
    const pct=Math.round(cnt/tot*100);const col=STATUS_COLOR[st]||'#48486a';
    return \`<div><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span class="fs12" style="display:flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:\${col};display:inline-block"></span>\${st.replace(/_/g,' ')}</span><span class="fs12 fw7">\${cnt} <span class="text-muted">(\${pct}%)</span></span></div><div class="ps-prog-wrap"><div class="ps-prog-fill" style="width:\${pct}%;background:\${col}"></div></div></div>\`;
  }).join('');
}

function renderLIStatusBars(by){
  const el=document.getElementById('liStatusBars');
  const filt=Object.entries(by).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  const tot=filt.reduce((a,[,v])=>a+v,0)||1;
  const srt=[...filt].sort((a,b)=>b[1]-a[1]).slice(0,7);
  if(!srt.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:10px">No line item data</div>';return;}
  el.innerHTML=srt.map(([st,cnt])=>{
    const pct=Math.round(cnt/tot*100);const col=STATUS_COLOR[st]||'#48486a';
    return \`<div style="display:flex;align-items:center;gap:8px"><span class="fs11 text-muted" style="width:90px;flex-shrink:0">\${st.replace(/_/g,' ')}</span><div class="ps-prog-wrap" style="flex:1"><div class="ps-prog-fill" style="width:\${pct}%;background:\${col}"></div></div><span class="fs11 fw7" style="width:32px;text-align:right">\${cnt}</span></div>\`;
  }).join('');
}

// ── Network Info ───────────────────────────────────────────────────────────
function renderNetworkInfo(s){
  ['networkStatusBadge','networkStatusBadge2'].forEach(id=>{const b=document.getElementById(id);if(b){b.textContent='Live';b.className='b b-green';}});
  const dn=document.getElementById('gam-ds-network');if(dn) dn.textContent=s.networkName||s.networkCode||'—';
  const body=document.getElementById('networkInfoBody');if(!body) return;
  body.innerHTML=[['Network',s.networkName||s.networkCode||'—'],['Code',s.networkCode||'—'],['Currency',s.currency||'—'],['Time Zone',s.timeZone||'—'],['Orders',(s.orders?.total||0)+' total'],['Line Items',(s.lineItems?.total||0)+' total']].map(([k,v])=>'<tr><td class="muted fs12">'+k+'</td><td class="fs12 fw6">'+v+'</td></tr>').join('');
}

// ── Top Delivering LIs ─────────────────────────────────────────────────────
function renderTopLI(){
  const el=document.getElementById('gamTopLI');if(!el) return;
  const act=_gamLineItems.filter(li=>(li.status==='ACTIVE'||li.status==='DELIVERING')&&li.status!=='UNKNOWN'&&parseInt(li.impressionsDelivered||'0')>0).sort((a,b)=>parseInt(b.impressionsDelivered||'0')-parseInt(a.impressionsDelivered||'0')).slice(0,6);
  if(!act.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:12px 0">No active deliveries</div>';return;}
  const mx=parseInt(act[0].impressionsDelivered||'0')||1;
  el.innerHTML=act.map((li,i)=>{
    const im=parseInt(li.impressionsDelivered||'0');const cl=parseInt(li.clicksDelivered||'0');const ctr=im>0?(cl/im*100).toFixed(2)+'%':'—';const pct=Math.round(im/mx*100);const nm=li.displayName||li.name||'—';
    return '<div style="padding:5px 0;border-bottom:1px solid var(--border)">'+
      '<div style="display:flex;align-items:center;gap:7px;margin-bottom:3px">'+
        '<span style="min-width:16px;height:16px;border-radius:50%;background:rgba(0,214,143,0.15);display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00d68f">'+(i+1)+'</span>'+
        '<div style="flex:1;min-width:0"><div class="fs11 fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+nm+'">'+nm+'</div></div>'+
        '<span class="b b-green" style="font-size:9px;flex-shrink:0">LIVE</span>'+
      '</div>'+
      '<div style="display:flex;align-items:center;gap:8px;padding-left:23px">'+
        '<div style="flex:1;height:3px;background:rgba(66,133,244,0.12);border-radius:2px"><div style="width:'+pct+'%;height:3px;background:#4285f4;border-radius:2px;transition:width 0.5s"></div></div>'+
        '<span class="fs10 text-muted" style="white-space:nowrap">'+fmtImpr(im)+' impr · '+ctr+'</span>'+
      '</div>'+
    '</div>';
  }).join('');
}

// ── Top Orders Bars ────────────────────────────────────────────────────────
function renderTopOrdersBars(){
  const el=document.getElementById('gamTopOrdersBars');
  const lbl=document.getElementById('gamTopOrdersLbl');
  const ordersWithImpr=_gamOrders.map(o=>{const m=_getOrderMeta(o);return{name:o.displayName||o.name||'—',impr:m.impr,clicks:m.clicks,lis:m.lis.length};}).filter(o=>o.impr>0).sort((a,b)=>b.impr-a.impr).slice(0,10);
  if(lbl) lbl.textContent=ordersWithImpr.length+' orders with impressions';
  if(!ordersWithImpr.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:20px">No impression data yet — metrics load after ~20s</div>';return;}
  const mx=ordersWithImpr[0].impr||1;
  el.innerHTML=ordersWithImpr.map((o,i)=>{
    const pct=Math.round(o.impr/mx*100);const col=['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399','#60a5fa','#e879f9','#fb923c','#38bdf8'][i%10];
    const ctr=o.impr>0?(o.clicks/o.impr*100).toFixed(2)+'%':'—';
    return '<div class="ps-hbar-item"><span class="ps-hbar-name" title="'+o.name+'">'+o.name+'</span><div class="ps-hbar-track"><div class="ps-hbar-fill" style="width:'+pct+'%;background:'+col+'"></div></div><span class="ps-hbar-val">'+fmtImpr(o.impr)+'</span><span style="font-size:10px;color:var(--text-muted);width:60px;text-align:right;flex-shrink:0">'+ctr+' CTR</span></div>';
  }).join('');
}

// ── Charts ─────────────────────────────────────────────────────────────────
function renderCharts(s){renderOrderStatusChart(s.orders?.byStatus||{});}
function renderOrderStatusChart(by){
  const ctx=document.getElementById('orderStatusChart');if(!ctx) return;
  if(_orderStatusChart){_orderStatusChart.destroy();_orderStatusChart=null;}
  const ent=Object.entries(by).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  if(!ent.length) return;
  const labels=ent.map(([l])=>l.replace(/_/g,' '));const values=ent.map(([,v])=>v);const colors=ent.map(([l])=>STATUS_COLOR[l]||'#48486a');
  _orderStatusChart=new Chart(ctx,{type:'doughnut',data:{labels,datasets:[{data:values,backgroundColor:colors,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:10,padding:8}},tooltip:{callbacks:{label:c=>' '+c.label+': '+c.parsed}}}}});
}

// ── Orders Table ───────────────────────────────────────────────────────────
function renderOrdersTable(){
  const sel=document.getElementById('orderStatusFilter');if(sel) sel.value='ACTIVE_DELIVERING';
  _ordersFiltered=[..._gamOrders];filterOrders('');
}

function filterOrders(query){
  const sf=document.getElementById('orderStatusFilter').value;
  const q=(query||'').toLowerCase().trim();
  _ordersFiltered=_gamOrders.filter(o=>{
    const mq=!q||(o.displayName||'').toLowerCase().includes(q)||(o.name||'').toLowerCase().includes(q)||(o.advertiserId||'').toLowerCase().includes(q);
    let ms;
    if(sf==='ACTIVE_DELIVERING') ms=o.status==='ACTIVE'||o.status==='DELIVERING';
    else if(sf==='') ms=o.status!=='DRAFT'&&o.status!=='UNKNOWN';
    else ms=o.status===sf;
    return mq&&ms;
  });
  _ordersFiltered.sort((a,b)=>{
    let va,vb;
    if(_ordersSortKey==='totalBudget'){va=parseFloat(a.totalBudget?.units||'0');vb=parseFloat(b.totalBudget?.units||'0');}
    else if(_ordersSortKey==='impressions'){va=_getOrderMeta(a).impr;vb=_getOrderMeta(b).impr;}
    else if(_ordersSortKey==='advertiserId'){va=(a.advertiserId||'').split('/').pop()||'';vb=(b.advertiserId||'').split('/').pop()||'';}
    else{va=(a[_ordersSortKey]||'').toString().toLowerCase();vb=(b[_ordersSortKey]||'').toString().toLowerCase();}
    if(va<vb)return _ordersSortAsc?-1:1;if(va>vb)return _ordersSortAsc?1:-1;return 0;
  });
  _ordersPageNum=1;_updateSortIcons();renderOrdersPage();
}

function _updateSortIcons(){
  const keys=['displayName','advertiserId','status','startTime','endTime','totalBudget','impressions'];
  for(const k of keys){
    const ic=document.getElementById('si-'+k);const th=document.getElementById('th-'+k);
    if(!ic||!th) continue;
    if(k===_ordersSortKey){ic.className=_ordersSortAsc?'fas fa-sort-up':'fas fa-sort-down';ic.style.opacity='0.9';ic.style.color='#60a5fa';th.classList.add('sort-active');}
    else{ic.className='fas fa-sort';ic.style.opacity='0.3';ic.style.color='';th.classList.remove('sort-active');}
  }
}

function sortOrdersBy(key){if(_ordersSortKey===key)_ordersSortAsc=!_ordersSortAsc;else{_ordersSortKey=key;_ordersSortAsc=true;}filterOrders(document.getElementById('orderSearch')?.value||'');}
function toggleOrder(oid){if(_expandedOrders.has(oid))_expandedOrders.delete(oid);else _expandedOrders.add(oid);renderOrdersPage();}
function toggleExpandAll(){
  _allExpanded=!_allExpanded;const btn=document.getElementById('expandAllBtn');
  if(_allExpanded){_expandedOrders=new Set(_ordersFiltered.map(o=>o.name||o.id||o.displayName));if(btn) btn.innerHTML='<i class="fas fa-compress-alt"></i>Collapse All';}
  else{_expandedOrders.clear();if(btn) btn.innerHTML='<i class="fas fa-expand-alt"></i>Expand All';}
  renderOrdersPage();
}

function renderOrdersPage(){
  const tbody=document.getElementById('ordersTbody');
  const start=(_ordersPageNum-1)*_ordersPageSize;
  const page=_ordersFiltered.slice(start,start+_ordersPageSize);
  const total=_ordersFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_ordersPageSize));
  const cb=document.getElementById('ordersCountBadge');if(cb) cb.textContent=total+' orders'+(total!==_gamOrders.length?' of '+_gamOrders.length:'');
  document.getElementById('ordersCount').textContent=(start+1)+'–'+Math.min(start+_ordersPageSize,total)+' of '+total.toLocaleString()+' orders';
  document.getElementById('ordersPageLabel').textContent='Page '+_ordersPageNum+' / '+pages;
  document.getElementById('ordersPrevBtn').disabled=_ordersPageNum<=1;
  document.getElementById('ordersNextBtn').disabled=_ordersPageNum>=pages;
  if(!page.length){tbody.innerHTML='<tr><td colspan="10" class="text-muted" style="text-align:center;padding:28px"><i class="fas fa-filter" style="margin-right:6px"></i>No orders match</td></tr>';return;}
  const rows=[];
  for(const o of page){
    const oid=o.name||o.id||o.displayName;
    const isOpen=_expandedOrders.has(oid);
    const meta=_getOrderMeta(o);
    const lis=meta.lis||[];const liCount=lis.length;
    const ctr=meta.impr>0?(meta.clicks/meta.impr*100).toFixed(2)+'%':'—';
    const adv=advShort(o.advertiserId);
    rows.push(\`<tr class="ps-order-row\${isOpen?' order-expanded':''}" onclick="toggleOrder(\${JSON.stringify(oid)})">
      <td style="text-align:center;padding:8px 4px"><span class="ps-chevron\${isOpen?' open':''}"><i class="fas fa-chevron-right"></i></span></td>
      <td style="max-width:220px;padding:8px 10px">
        <div class="fw6 fs12" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${o.displayName||''}">\${o.displayName||o.name||'—'}</div>
        <div class="fs10 text-muted">\${oid?oid.split('/').pop():''}</div>
      </td>
      <td class="fs11 text-muted" style="max-width:100px"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${adv}</div></td>
      <td>\${statusBadge(o.status)}</td>
      <td class="muted fs11">\${fmtDateShort(o.startTime)}</td>
      <td class="muted fs11">\${fmtDateShort(o.endTime)}</td>
      <td class="fw6 fs11" style="color:#60a5fa;white-space:nowrap">\${fmtBudget(o.totalBudget)}</td>
      <td>
        \${liCount>0?'<span style="padding:2px 7px;border-radius:10px;background:rgba(167,139,250,0.15);color:#a78bfa;font-size:9px;font-weight:700">'+liCount+'</span>'+(meta.activeCount>0?'<span style="font-size:9px;color:#00d68f;margin-left:4px">'+meta.activeCount+' active</span>':''):'<span class="text-muted fs11">—</span>'}
      </td>
      <td class="num fw7 fs11" style="color:\${meta.impr>0?'#f59e0b':'var(--text-muted)'}">
        \${fmtImpr(meta.impr)}
      </td>
      <td class="num fs11" style="white-space:nowrap">
        \${meta.impr>0?fmtImpr(meta.clicks)+' <span class="text-muted">('+ctr+')</span>':'<span class="text-muted">—</span>'}
      </td>
    </tr>\`);

    if(isOpen){
      const validLIs=lis.filter(li=>li.status!=='UNKNOWN');
      if(validLIs.length>0){
        rows.push(\`<tr class="ps-li-hdr"><td></td><th>Line Item</th><th>Status</th><th>Type</th><th>Start</th><th>End</th><th>Budget</th><th></th><th class="num">Impressions</th><th class="num">Clicks / CTR</th></tr>\`);
        const slis=[...validLIs].sort((a,b)=>{const aa=a.status==='ACTIVE'||a.status==='DELIVERING'?1:0;const ba=b.status==='ACTIVE'||b.status==='DELIVERING'?1:0;if(ba!==aa)return ba-aa;return parseInt(b.impressionsDelivered||'0')-parseInt(a.impressionsDelivered||'0');});
        for(const li of slis){
          const lim=parseInt(li.impressionsDelivered||'0');const lcl=parseInt(li.clicksDelivered||'0');const lctr=lim>0?(lcl/lim*100).toFixed(2)+'%':'—';const ltyp=(li.lineItemType||'—').replace(/_/g,' ');
          rows.push(\`<tr class="ps-li-row">
            <td style="text-align:center"><span style="display:inline-flex;width:14px;height:14px;border-radius:3px;background:rgba(167,139,250,0.15);align-items:center;justify-content:center;font-size:8px;color:#a78bfa"><i class="fas fa-minus"></i></span></td>
            <td class="gam-li-indent" style="max-width:200px"><div class="fw6 fs11" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${li.displayName||''}">\${li.displayName||li.name||'—'}</div><div class="fs10 text-muted">\${li.name?li.name.split('/').pop():''}</div></td>
            <td>\${statusBadge(li.status)}</td>
            <td class="fs10 muted" style="white-space:nowrap">\${ltyp}</td>
            <td class="muted fs10">\${fmtDateShort(li.startTime)}</td>
            <td class="muted fs10">\${fmtDateShort(li.endTime)}</td>
            <td class="fs10" style="color:#60a5fa">\${fmtBudget(li.budget)}</td>
            <td></td>
            <td class="num fw6 fs11" style="color:\${lim>0?'#f59e0b':'var(--text-muted)'}">
              \${fmtImpr(lim)}
            </td>
            <td class="num fs11" style="white-space:nowrap">
              \${lim>0?fmtImpr(lcl)+' <span class="text-muted">('+lctr+')</span>':'<span class="text-muted">—</span>'}
            </td>
          </tr>\`);
        }
      }else{
        rows.push(\`<tr class="ps-li-row"><td></td><td colspan="9" class="muted fs11" style="padding-left:44px;padding-top:8px;padding-bottom:8px"><i class="fas fa-circle-info" style="margin-right:5px;color:#60a5fa"></i>No line items found for this order</td></tr>\`);
      }
    }
  }
  tbody.innerHTML=rows.join('');
}

function ordersPage(dir){const pages=Math.max(1,Math.ceil(_ordersFiltered.length/_ordersPageSize));_ordersPageNum=Math.max(1,Math.min(pages,_ordersPageNum+dir));renderOrdersPage();}

// ── CSV Export ─────────────────────────────────────────────────────────────
function exportOrdersCSV(){
  const data=_ordersFiltered.length?_ordersFiltered:_gamOrders;if(!data.length) return;
  const esc=s=>'"'+String(s||'').replace(/"/g,'""')+'"';
  const hdrs=['Order ID','Order Name','Advertiser ID','Status','Budget Currency','Budget Amount','Start','End','Line Items','Impressions','Clicks','CTR'];
  const rows=data.map(o=>{
    const m=_getOrderMeta(o);const ctr=m.impr>0?(m.clicks/m.impr*100).toFixed(2)+'%':'';
    return [esc(o.name?o.name.split('/').pop():''),esc(o.displayName||o.name||''),esc(o.advertiserId?o.advertiserId.split('/').pop():''),esc(o.status||''),esc(o.totalBudget?.currencyCode||''),esc(o.totalBudget?.units||''),esc(o.startTime?o.startTime.slice(0,10):''),esc(o.endTime?o.endTime.slice(0,10):''),m.lis.length,m.impr,m.clicks,esc(ctr)].join(',');
  });
  const csv=[hdrs.join(','),...rows].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='gam-orders-'+new Date().toISOString().slice(0,10)+'.csv';a.click();
}

// ── Auto-load ──────────────────────────────────────────────────────────────
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadGAMAnalytics);
else setTimeout(loadGAMAnalytics,80);
</script>
`;
}
