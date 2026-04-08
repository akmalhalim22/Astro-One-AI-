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
.gam-simple-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:16px}
.gam-stat{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)}
.gam-stat:last-child{border-bottom:none}
.gam-stat-label{font-size:12px;color:var(--text-muted)}
.gam-stat-value{font-size:16px;font-weight:700;color:var(--text-primary)}
</style>
<div class="content fade-in">

<!-- ── Data source ─────────────────────────────────────────────────────── -->
<div class="ps-src">
  <i class="fab fa-google" style="color:#4285f4"></i>
  <strong>Google Ad Manager</strong> <span class="text-muted">·</span> Live API
  <span class="ps-plat ps-plat-gam">Cached · 5min TTL</span>
  <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-bolt" style="margin-right:4px"></i>Fast load with cache</span>
</div>

<!-- ── Status Banner ───────────────────────────────────────────────────── -->
<div id="gamBanner" class="ps-banner">
  <i class="fas fa-spinner fa-spin" id="gamBannerIcon" style="color:#4285f4;font-size:14px"></i>
  <span id="gamBannerText" style="flex:1;color:#60a5fa;font-size:12px">Loading GAM data…</span>
  <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" onclick="loadGAMSimple(true)">
    <i class="fas fa-rotate" id="gamRefreshIcon"></i>Refresh
  </button>
</div>

<!-- ── Summary Grid ─────────────────────────────────────────────────────── -->
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:14px">
  <div class="gam-simple-card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:36px;height:36px;border-radius:10px;background:rgba(66,133,244,0.12);display:flex;align-items:center;justify-content:center">
        <i class="fas fa-file-invoice" style="color:#4285f4;font-size:16px"></i>
      </div>
      <div>
        <div style="font-size:24px;font-weight:800;color:#4285f4" id="totalOrders">—</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Total Orders</div>
      </div>
    </div>
    <div id="ordersByStatus"></div>
  </div>

  <div class="gam-simple-card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:36px;height:36px;border-radius:10px;background:rgba(0,214,143,0.12);display:flex;align-items:center;justify-content:center">
        <i class="fas fa-layer-group" style="color:#00d68f;font-size:16px"></i>
      </div>
      <div>
        <div style="font-size:24px;font-weight:800;color:#00d68f" id="totalLineItems">—</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Total Line Items</div>
      </div>
    </div>
    <div id="lineItemsByStatus"></div>
  </div>

  <div class="gam-simple-card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,0.12);display:flex;align-items:center;justify-content:center">
        <i class="fas fa-eye" style="color:#f59e0b;font-size:16px"></i>
      </div>
      <div>
        <div style="font-size:24px;font-weight:800;color:#f59e0b" id="totalImpressions">—</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Impressions</div>
      </div>
    </div>
    <div class="gam-stat">
      <span class="gam-stat-label">Clicks</span>
      <span class="gam-stat-value" id="totalClicks">—</span>
    </div>
    <div class="gam-stat">
      <span class="gam-stat-label">CTR</span>
      <span class="gam-stat-value" id="totalCTR">—</span>
    </div>
  </div>

  <div class="gam-simple-card">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <div style="width:36px;height:36px;border-radius:10px;background:rgba(96,165,250,0.12);display:flex;align-items:center;justify-content:center">
        <i class="fas fa-network-wired" style="color:#60a5fa;font-size:16px"></i>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:700;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis" id="networkName">—</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Network</div>
      </div>
    </div>
    <div class="gam-stat">
      <span class="gam-stat-label">Network Code</span>
      <span class="gam-stat-value" id="networkCode" style="font-size:13px">—</span>
    </div>
    <div class="gam-stat">
      <span class="gam-stat-label">Currency</span>
      <span class="gam-stat-value" id="networkCurrency" style="font-size:13px">—</span>
    </div>
  </div>
</div>

<!-- ── Quick Links ─────────────────────────────────────────────────────── -->
<div class="card">
  <div class="card-hd">
    <div class="card-title"><i class="fas fa-link" style="color:#a78bfa;margin-right:7px"></i>Quick Actions</div>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <button class="btn-ghost" onclick="window.open('https://admanager.google.com','_blank')" style="height:32px;font-size:11px">
      <i class="fab fa-google"></i>Open GAM Console
    </button>
    <button class="btn-ghost" onclick="exportGAMSummary()" style="height:32px;font-size:11px">
      <i class="fas fa-download"></i>Export Summary CSV
    </button>
    <button class="btn-ghost" onclick="navigate('api')" style="height:32px;font-size:11px">
      <i class="fas fa-gear"></i>Configure GAM Connection
    </button>
  </div>
</div>

</div><!-- /content -->

<script>
let _gamData = null;

function fmtNum(n){n=parseInt(n)||0;if(n>=1e9)return(n/1e9).toFixed(1)+'B';if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n.toLocaleString();}

async function loadGAMSimple(force=false){
  const icon=document.getElementById('gamBannerIcon');
  const txt=document.getElementById('gamBannerText');
  const banner=document.getElementById('gamBanner');
  
  icon.className='fas fa-spinner fa-spin';icon.style.color='#4285f4';
  txt.textContent='Loading GAM data…';txt.style.color='#60a5fa';
  banner.style.background='rgba(66,133,244,0.08)';banner.style.borderColor='rgba(66,133,244,0.2)';
  
  try{
    // Try cached first for instant display
    if(!force && !window._gamLoaded){
      const cacheRes = await fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(()=>({ok:false}));
      if(cacheRes.ok && cacheRes.cached){
        _gamData = cacheRes;
        renderGAMSimple();
        icon.className='fas fa-database';icon.style.color='#a78bfa';
        const age=Math.round((cacheRes.cacheAge||0)/1000);
        txt.textContent='Cached data ('+age+'s old) · Refreshing…';txt.style.color='#a78bfa';
      }
    }
    
    // Fetch fresh data
    const res = await fetch('/api/gam/summary').then(r=>r.json());
    if(!res.ok){
      icon.className='fas fa-triangle-exclamation';icon.style.color='#f59e0b';
      txt.textContent='GAM not connected — '+res.error;txt.style.color='#f59e0b';
      banner.style.background='rgba(245,158,11,0.07)';banner.style.borderColor='rgba(245,158,11,0.2)';
      return;
    }
    
    _gamData = res;
    window._gamLoaded = true;
    renderGAMSimple();
    
    icon.className='fas fa-circle-check';icon.style.color='#00d68f';
    txt.textContent='Connected to '+(res.networkName||res.networkCode)+' · Last updated: '+new Date().toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'});
    txt.style.color='#00d68f';
    banner.style.background='rgba(0,214,143,0.06)';banner.style.borderColor='rgba(0,214,143,0.2)';
  }catch(e){
    icon.className='fas fa-xmark';icon.style.color='#f43f5e';
    txt.textContent='Error loading data: '+e.message;txt.style.color='#f43f5e';
  }
}

function renderGAMSimple(){
  if(!_gamData) return;
  
  // Orders
  document.getElementById('totalOrders').textContent = _gamData.orders.total.toLocaleString();
  const orderStats = Object.entries(_gamData.orders.byStatus).sort((a,b)=>b[1]-a[1]).slice(0,4);
  document.getElementById('ordersByStatus').innerHTML = orderStats.map(([status,count])=>
    '<div class="gam-stat"><span class="gam-stat-label">'+status.replace(/_/g,' ')+'</span><span class="gam-stat-value">'+count+'</span></div>'
  ).join('');
  
  // Line Items
  document.getElementById('totalLineItems').textContent = _gamData.lineItems.total.toLocaleString();
  const liStats = Object.entries(_gamData.lineItems.byStatus).sort((a,b)=>b[1]-a[1]).slice(0,4);
  document.getElementById('lineItemsByStatus').innerHTML = liStats.map(([status,count])=>
    '<div class="gam-stat"><span class="gam-stat-label">'+status.replace(/_/g,' ')+'</span><span class="gam-stat-value">'+count+'</span></div>'
  ).join('');
  
  // Metrics
  const impr = _gamData.lineItems.totalImpressions || 0;
  const clicks = _gamData.lineItems.totalClicks || 0;
  const ctr = impr > 0 ? ((clicks / impr) * 100).toFixed(2) + '%' : '—';
  document.getElementById('totalImpressions').textContent = fmtNum(impr);
  document.getElementById('totalClicks').textContent = fmtNum(clicks);
  document.getElementById('totalCTR').textContent = ctr;
  
  // Network
  document.getElementById('networkName').textContent = _gamData.networkName || _gamData.networkCode || '—';
  document.getElementById('networkCode').textContent = _gamData.networkCode || '—';
  document.getElementById('networkCurrency').textContent = _gamData.currency || '—';
  document.getElementById('gam-ds-network').textContent = _gamData.networkCode || '—';
}

function exportGAMSummary(){
  if(!_gamData) return;
  const rows = [
    ['Metric','Value'],
    ['Total Orders',_gamData.orders.total],
    ['Total Line Items',_gamData.lineItems.total],
    ['Impressions',_gamData.lineItems.totalImpressions],
    ['Clicks',_gamData.lineItems.totalClicks],
    ['Network',_gamData.networkName],
    ['Network Code',_gamData.networkCode],
    ['Currency',_gamData.currency],
  ];
  const csv = rows.map(r=>r.join(',')).join('\\n');
  const a=document.createElement('a');
  a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download='gam-summary.csv';
  a.click();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>loadGAMSimple());
else setTimeout(()=>loadGAMSimple(),80);
</script>
`;
}
