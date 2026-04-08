export function revenueScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val">RM 63.7<sup>M</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+12.4% vs LY</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-bullseye"></i></div>
      <div class="kpi-lbl">Q1 Target</div>
      <div class="kpi-val">RM 67.6<sup>M</sup></div>
      <div class="kpi-chg flat">94.2% attainment</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-chart-line"></i></div>
      <div class="kpi-lbl">MoM Growth</div>
      <div class="kpi-val">+8.2<sup>%</sup></div>
      <div class="kpi-chg up">vs +5.1% last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-building"></i></div>
      <div class="kpi-lbl">Enterprise Share</div>
      <div class="kpi-val">RM 44.0<sup>M</sup></div>
      <div class="kpi-chg up">69% of total · +14% YoY</div>
    </div>
  </div>

  <!-- ── CHART + BREAKDOWN ─────────────────────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Monthly Revenue vs Target</div>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px"><i class="fas fa-download"></i>Export</button>
          <span class="card-action" onclick="navigate('ai')">AI Forecast →</span>
        </div>
      </div>
      <div class="ch" style="height:178px"><canvas id="revPerfChart"></canvas></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        ${[
          ['Jan','RM 18.4M','var(--success)'],
          ['Feb','RM 21.2M','var(--success)'],
          ['Mar (est)','RM 24.1M','var(--magenta)'],
          ['Run Rate','RM 190M/yr','var(--info)'],
        ].map(([l,v,c]) => `
        <div style="padding:0 10px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">${l}</div>
          <div style="font-size:14px;font-weight:800;color:${c}">${v}</div>
        </div>`).join('')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-hd"><div class="card-title">Revenue by Product Line</div></div>
        ${[
          ['Digital Ads',       'RM 28.7M','pf-pink',  45],
          ['Content Syndi.',    'RM 17.2M','pf-blue',  27],
          ['Events & Live',     'RM 11.0M','pf-amber', 17],
          ['Sponsorship',       'RM  6.8M','pf-green', 11],
        ].map(([l,v,f,p]) => `
        <div style="margin-bottom:12px">
          <div class="flex justify-between" style="margin-bottom:5px">
            <span class="fs12 text-sec">${l}</span>
            <span class="fs12 fw7">${v} <span class="text-muted">(${p}%)</span></span>
          </div>
          <div class="prog-wrap"><div class="prog-fill ${f}" style="width:${p*2.2}%"></div></div>
        </div>`).join('')}
      </div>

      <div class="card card-sm">
        <div class="card-hd">
          <div class="card-title">AI Forecast</div>
          <span class="b b-blue" style="font-size:9px">Live Model</span>
        </div>
        ${[
          ['Q1 Close Prob.','68%',        'b-amber'],
          ['Full Year Proj.','RM 190M',   'b-green'],
          ['Risk Amount',   'RM 5.4M',   'b-red'],
          ['Upsell Opp.',   'RM 8.4M',   'b-blue'],
          ['Q2 Outlook',    'Strong',     'b-green'],
        ].map(([l,v,b]) => `
        <div class="stat-row">
          <span class="stat-lbl">${l}</span><span class="b ${b}">${v}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ── REVENUE TABLE ──────────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title">Revenue by Client — Top 10</div>
      <span class="card-action">Full Report →</span>
    </div>
    <table class="tbl">
      <thead>
        <tr><th>#</th><th>Client</th><th>Segment</th><th>Q1 Rev</th><th>YTD Rev</th><th>vs Target</th><th>YoY Growth</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${[
          ['1', 'Maxis Bhd',     'Enterprise', 'RM 4.1M', 'RM 12.4M', '+8%',  '+18%', 'b-green'],
          ['2', 'Celcom Axiata', 'Enterprise', 'RM 3.6M', 'RM 10.8M', '+3%',  '+12%', 'b-green'],
          ['3', 'Petronas',      'Enterprise', 'RM 3.2M', 'RM 9.6M',  '+1%',  '+9%',  'b-green'],
          ['4', 'CIMB Group',    'Enterprise', 'RM 2.4M', 'RM 7.2M',  '−2%',  '+6%',  'b-amber'],
          ['5', 'Digi Telecom',  'Mid-Market', 'RM 1.7M', 'RM 5.1M',  '−5%',  '−3%',  'b-red'],
          ['6', 'TNB',           'Enterprise', 'RM 1.6M', 'RM 4.9M',  '+4%',  '+11%', 'b-green'],
          ['7', 'RHB Bank',      'Enterprise', 'RM 1.4M', 'RM 4.2M',  '−8%',  '+2%',  'b-amber'],
          ['8', 'Watsons MY',    'Mid-Market', 'RM 1.3M', 'RM 3.8M',  '−12%', '−8%',  'b-red'],
        ].map(([r,n,s,q,y,t,g,b]) => `
        <tr>
          <td class="dim fw7">${r}</td>
          <td class="fw6">${n}</td>
          <td><span class="b ${s === 'Enterprise' ? 'b-blue' : 'b-gray'}" style="font-size:10px">${s}</span></td>
          <td class="text-pink fw7">${q}</td>
          <td class="fw7">${y}</td>
          <td style="color:${String(t).startsWith('+') ? 'var(--success)' : 'var(--danger)'};font-weight:600">${t}</td>
          <td style="color:${String(g).startsWith('+') ? 'var(--success)' : 'var(--danger)'};font-weight:600">${g}</td>
          <td><span class="b ${b}">${b === 'b-green' ? 'On Track' : b === 'b-amber' ? 'Watch' : 'At Risk'}</span></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

</div>`;
}


export function campaignScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── Connection Banner ────────────────────────────────────────────────── -->
  <div id="campBanner" style="display:flex;align-items:center;gap:10px;background:rgba(66,133,244,0.08);border:1px solid rgba(66,133,244,0.2);border-radius:12px;padding:11px 16px;margin-bottom:4px">
    <i class="fas fa-spinner fa-spin" id="campBannerIcon" style="color:#4285f4;font-size:13px"></i>
    <span id="campBannerText" style="font-size:12px;color:#60a5fa">Loading campaign data from Google Ad Manager…</span>
    <button class="btn-ghost" style="margin-left:auto;height:26px;font-size:11px;padding:0 10px" onclick="loadCampaignData()">
      <i class="fas fa-rotate"></i>Refresh
    </button>
  </div>

  <!-- ── KPI STRIP ─────────────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-megaphone"></i></div>
      <div class="kpi-lbl">Active Campaigns</div>
      <div class="kpi-val" id="camp-kv-active"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="camp-kc-active"></div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">Total Budget (Orders)</div>
      <div class="kpi-val" id="camp-kv-budget"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="camp-kc-budget"></div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-eye"></i></div>
      <div class="kpi-lbl">Impressions Delivered</div>
      <div class="kpi-val" id="camp-kv-impr"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="camp-kc-impr"></div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-layer-group"></i></div>
      <div class="kpi-lbl">Total Line Items</div>
      <div class="kpi-val" id="camp-kv-li"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="camp-kc-li"></div>
    </div>
  </div>

  <!-- ── CHART ROW ─────────────────────────────────────────────────────────── -->
  <div class="g62">
    <!-- Campaign Status Breakdown chart -->
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-chart-pie" style="color:#4285f4;margin-right:7px"></i>Campaign Status Breakdown</div>
        <span class="b b-gray fs10" id="camp-source-badge">GAM · Orders</span>
      </div>
      <div style="height:170px"><canvas id="campStatusChart"></canvas></div>
      <div id="campStatusBars" style="display:flex;flex-direction:column;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)"></div>
    </div>

    <!-- Budget by Status + Network Info -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-sack-dollar" style="color:#00d68f;margin-right:7px"></i>Budget Allocation</div></div>
        <div id="campBudgetRows" style="display:flex;flex-direction:column;gap:8px;min-height:60px">
          <div class="text-muted fs12" style="padding:14px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
        <div style="height:110px;margin-top:10px"><canvas id="campBudgetChart"></canvas></div>
      </div>
      <div class="card card-sm">
        <div class="card-hd"><div class="card-title"><i class="fas fa-network-wired" style="color:#00d68f;margin-right:7px"></i>Network</div><span class="b b-gray fs10" id="campNetBadge">—</span></div>
        <div id="campNetInfo" style="display:flex;flex-direction:column;gap:5px">
          <div class="text-muted fs12" style="text-align:center;padding:8px"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── CAMPAIGNS TABLE ───────────────────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-list-check" style="color:#4285f4;margin-right:7px"></i>Campaigns (GAM Orders)</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input id="campSearch" type="text" placeholder="Search…"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:140px;outline:none"
          oninput="filterCampaigns(this.value)">
        <select id="campStatusFilter"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="filterCampaigns(document.getElementById('campSearch').value)">
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DELIVERING">Delivering</option>
          <option value="COMPLETED">Completed</option>
          <option value="PAUSED">Paused</option>
          <option value="CANCELED">Canceled</option>
          <option value="DRAFT">Draft</option>
        </select>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="exportCampaignCSV()">
          <i class="fas fa-download"></i>CSV
        </button>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl" id="campTable">
        <thead>
          <tr>
            <th onclick="sortCampaignsBy('displayName')" style="cursor:pointer">Campaign (Order) <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortCampaignsBy('status')" style="cursor:pointer">Status <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortCampaignsBy('totalBudget')" style="cursor:pointer">Budget <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>CTR</th>
            <th onclick="sortCampaignsBy('startTime')" style="cursor:pointer">Start <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortCampaignsBy('endTime')" style="cursor:pointer">End <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th>Line Items</th>
          </tr>
        </thead>
        <tbody id="campTbody">
          <tr><td colspan="9" class="text-muted" style="text-align:center;padding:28px"><i class="fas fa-spinner fa-spin"></i> Loading…</td></tr>
        </tbody>
      </table>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
      <span class="fs11 text-muted" id="campCount">—</span>
      <div style="display:flex;gap:6px">
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="campPrevBtn" onclick="campPage(-1)" disabled>← Prev</button>
        <span class="fs11 text-muted" id="campPageLabel" style="padding:0 6px;line-height:26px">Page 1</span>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="campNextBtn" onclick="campPage(1)">Next →</button>
      </div>
    </div>
  </div>

</div>

<script>
// ── Campaign state ────────────────────────────────────────────────────────────
let _campOrders    = [];
let _campLineItems = [];
let _campNetwork   = null;
let _campFiltered  = [];
let _campPageNum   = 1;
const CAMP_PAGE    = 20;
let _campSortKey   = 'status';
let _campSortAsc   = true;
let _campStatusChart = null;
let _campBudgetChart = null;

// ── Utilities (shared with GAM Analytics if on same page, else redeclared) ───
function campFmtImpr(n) {
  n = parseInt(n)||0;
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
  return String(n);
}
function campFmtDate(s) {
  if (!s) return '—';
  try { return new Date(s).toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'numeric'}); } catch { return s.slice(0,10); }
}
function campFmtBudget(b) {
  if (!b) return '—';
  const u = parseFloat(b.units||'0'); const c = b.currencyCode||'';
  if (u>=1e6) return c+' '+(u/1e6).toFixed(2)+'M';
  if (u>=1e3) return c+' '+(u/1e3).toFixed(1)+'K';
  return c+' '+u.toFixed(0);
}
const CAMP_STATUS_COLOR = { ACTIVE:'#00d68f', DELIVERING:'#00d68f', COMPLETED:'#60a5fa', PAUSED:'#f59e0b', CANCELED:'#f43f5e', DRAFT:'#8080a8', UNKNOWN:'#48486a' };
const CAMP_STATUS_BADGE = { ACTIVE:'b-green', DELIVERING:'b-green', COMPLETED:'b-blue', PAUSED:'b-amber', CANCELED:'b-red', DRAFT:'b-gray', UNKNOWN:'b-gray' };
function campStatusBadge(s) { return '<span class="b '+(CAMP_STATUS_BADGE[s]||'b-gray')+'" style="font-size:9px">'+(s||'UNKNOWN')+'</span>'; }

// ── Loader ────────────────────────────────────────────────────────────────────
async function loadCampaignData() {
  const icon = document.getElementById('campBannerIcon');
  const text = document.getElementById('campBannerText');
  icon.className = 'fas fa-spinner fa-spin'; icon.style.color = '#4285f4';
  text.textContent = 'Loading campaign data from Google Ad Manager…'; text.style.color = '#60a5fa';

  try {
    const [sumRes, ordRes, liRes] = await Promise.all([
      fetch('/api/gam/summary').then(r=>r.json()),
      fetch('/api/gam/orders?pageSize=200').then(r=>r.json()),
      fetch('/api/gam/lineitems?pageSize=200').then(r=>r.json()),
    ]);

    if (!sumRes.ok) {
      icon.className = 'fas fa-triangle-exclamation'; icon.style.color = '#f59e0b';
      text.textContent = 'GAM not connected: '+(sumRes.error||'Go to API Connections → Config to set up.'); text.style.color = '#f59e0b';
      document.getElementById('campTbody').innerHTML = '<tr><td colspan="9" class="text-muted" style="text-align:center;padding:28px"><i class="fas fa-plug" style="color:#f59e0b"></i> GAM not configured — go to API Connections to set up.</td></tr>';
      return;
    }

    _campOrders    = ordRes.orders    || [];
    _campLineItems = liRes.lineItems  || [];
    _campNetwork   = sumRes;

    icon.className = 'fas fa-circle-check'; icon.style.color = '#00d68f';
    text.textContent = 'Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_campOrders.length+' campaigns (orders) · '+_campLineItems.length+' line items · Live';
    text.style.color = '#00d68f';
    document.getElementById('camp-source-badge').textContent = (sumRes.networkName||sumRes.networkCode)+' · GAM Orders';

    renderCampKPIs(sumRes);
    renderCampStatusBars(sumRes.orders?.byStatus || {});
    renderCampBudget();
    renderCampNetwork(sumRes);
    renderCampaignsTable();
  } catch(e) {
    icon.className = 'fas fa-circle-xmark'; icon.style.color = '#f43f5e';
    text.textContent = 'Failed to load: '+e.message; text.style.color = '#f43f5e';
  }
}

// ── KPIs ──────────────────────────────────────────────────────────────────────
function renderCampKPIs(s) {
  const active = (s.orders?.byStatus?.ACTIVE||0)+(s.orders?.byStatus?.DELIVERING||0);
  const total  = s.orders?.total || 0;
  const impr   = s.lineItems?.totalImpressions || 0;
  const li     = s.lineItems?.total || 0;

  // Budget total
  let budgetTotal = 0; const cur = _campOrders.length ? (_campOrders.find(o=>o.totalBudget?.units)?.totalBudget?.currencyCode||'') : '';
  _campOrders.forEach(o => { budgetTotal += parseFloat(o.totalBudget?.units||'0'); });
  const fmtBudget = budgetTotal >= 1e6 ? cur+' '+(budgetTotal/1e6).toFixed(2)+'M' : budgetTotal >= 1e3 ? cur+' '+(budgetTotal/1e3).toFixed(1)+'K' : cur+' '+budgetTotal.toFixed(0);

  document.getElementById('camp-kv-active').textContent = active;
  document.getElementById('camp-kc-active').innerHTML   = '<span class="text-muted">of '+total+' total orders</span>';
  document.getElementById('camp-kv-budget').innerHTML   = budgetTotal > 0 ? fmtBudget.replace(/^(\w+ )(.+)$/,'$1<sup style="font-size:12px;font-weight:600">$2</sup>') : '<span class="text-muted fs13">—</span>';
  document.getElementById('camp-kc-budget').innerHTML   = '<span class="text-muted">across orders with budget</span>';
  document.getElementById('camp-kv-impr').innerHTML     = campFmtImpr(impr)+'<sup style="font-size:12px;font-weight:600"> total</sup>';
  document.getElementById('camp-kc-impr').innerHTML     = '<span class="text-muted">'+campFmtImpr(s.lineItems?.totalClicks||0)+' clicks</span>';
  document.getElementById('camp-kv-li').textContent     = li;
  const activeLI = (s.lineItems?.byStatus?.ACTIVE||0)+(s.lineItems?.byStatus?.DELIVERING||0);
  document.getElementById('camp-kc-li').innerHTML       = '<span class="up">'+activeLI+' active</span>';
}

// ── Status Bars ───────────────────────────────────────────────────────────────
function renderCampStatusBars(byStatus) {
  const el = document.getElementById('campStatusBars');
  const total = Object.values(byStatus).reduce((a,b)=>a+b,0)||1;
  const sorted = Object.entries(byStatus).sort((a,b)=>b[1]-a[1]);
  if (!sorted.length) { el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:10px">No data</div>'; return; }
  el.innerHTML = sorted.map(([st, cnt]) => {
    const pct = Math.round(cnt/total*100);
    const col = CAMP_STATUS_COLOR[st]||'#48486a';
    return '<div><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span class="fs12">'+st+'</span><span class="fs12 fw7">'+cnt+' <span class="text-muted">('+pct+'%)</span></span></div><div class="prog-wrap"><div class="prog-fill" style="width:'+pct+'%;background:'+col+';border-radius:4px;height:6px;transition:width 0.6s"></div></div></div>';
  }).join('');

  // Doughnut chart
  const ctx = document.getElementById('campStatusChart');
  if (!ctx) return;
  if (_campStatusChart) { _campStatusChart.destroy(); _campStatusChart = null; }
  const labels = Object.keys(byStatus); const values = Object.values(byStatus);
  if (!labels.length) return;
  _campStatusChart = new Chart(ctx, {
    type:'doughnut',
    data:{ labels, datasets:[{ data:values, backgroundColor:labels.map(l=>CAMP_STATUS_COLOR[l]||'#48486a'), borderWidth:0, hoverOffset:4 }] },
    options:{ responsive:true, maintainAspectRatio:false, cutout:'70%',
      plugins:{ legend:{ position:'right', labels:{ color:'#8080a8', font:{size:10}, boxWidth:9, padding:8 } },
        tooltip:{ callbacks:{ label:ctx=>' '+ctx.label+': '+ctx.parsed } } } }
  });
}

// ── Budget by Status ──────────────────────────────────────────────────────────
function renderCampBudget() {
  const el = document.getElementById('campBudgetRows');
  const ordersWithBudget = _campOrders.filter(o=>o.totalBudget?.units);
  if (!ordersWithBudget.length) {
    el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:12px">No budget data on orders</div>';
    return;
  }
  const byStatus = {}; let grand = 0;
  for (const o of ordersWithBudget) {
    const s = o.status||'UNKNOWN'; const v = parseFloat(o.totalBudget.units||'0');
    byStatus[s] = (byStatus[s]||0)+v; grand += v;
  }
  const cur = ordersWithBudget[0]?.totalBudget?.currencyCode||'';
  const fmtV = v => v>=1e6?cur+' '+(v/1e6).toFixed(2)+'M':v>=1e3?cur+' '+(v/1e3).toFixed(1)+'K':cur+' '+v.toFixed(0);
  const sorted = Object.entries(byStatus).sort((a,b)=>b[1]-a[1]);
  el.innerHTML = sorted.map(([st,val]) => {
    const pct = Math.round(val/grand*100); const col = CAMP_STATUS_COLOR[st]||'#48486a';
    return '<div style="margin-bottom:9px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span class="fs12">'+st+'</span><span class="fs12 fw7" style="color:'+col+'">'+fmtV(val)+' <span class="text-muted">('+pct+'%)</span></span></div><div class="prog-wrap"><div class="prog-fill" style="width:'+pct+'%;background:'+col+';border-radius:4px;height:5px;transition:width 0.6s"></div></div></div>';
  }).join('')+'<div class="fs11 text-muted" style="margin-top:6px;border-top:1px solid var(--border);padding-top:6px">Total: <strong style="color:var(--text-primary)">'+fmtV(grand)+'</strong></div>';

  // Budget bar chart
  const ctx = document.getElementById('campBudgetChart');
  if (!ctx) return;
  if (_campBudgetChart) { _campBudgetChart.destroy(); _campBudgetChart = null; }
  const labels = Object.keys(byStatus); const values = Object.values(byStatus);
  _campBudgetChart = new Chart(ctx, {
    type:'bar',
    data:{ labels, datasets:[{ data:values, backgroundColor:labels.map(l=>CAMP_STATUS_COLOR[l]||'#48486a'), borderRadius:5, borderWidth:0 }] },
    options:{ responsive:true, maintainAspectRatio:false, indexAxis:'y',
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:ctx=>' '+cur+' '+ctx.parsed.x.toLocaleString() } } },
      scales:{ x:{ grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#48486a',font:{size:9}} }, y:{ grid:{display:false}, ticks:{color:'#8080a8',font:{size:9}} } } }
  });
}

// ── Network info panel ────────────────────────────────────────────────────────
function renderCampNetwork(s) {
  const badge = document.getElementById('campNetBadge');
  badge.textContent = 'Live'; badge.className = 'b b-green fs10';
  document.getElementById('campNetInfo').innerHTML = [
    ['Network', s.networkName||s.networkCode||'—'],
    ['Currency', s.currency||'—'],
    ['Time Zone', s.timeZone||'—'],
  ].map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)"><span class="fs11 text-muted">'+k+'</span><span class="fs11 fw6">'+v+'</span></div>').join('');
}

// ── Campaigns Table ───────────────────────────────────────────────────────────
function filterCampaigns(query) {
  const sf = document.getElementById('campStatusFilter').value;
  const q  = (query||'').toLowerCase();
  _campFiltered = _campOrders.filter(o => {
    const mQ = !q || (o.displayName||'').toLowerCase().includes(q) || (o.advertiserId||'').toLowerCase().includes(q);
    const mS = !sf || o.status === sf;
    return mQ && mS;
  });
  _campFiltered.sort((a,b) => {
    let va = a[_campSortKey]||'', vb = b[_campSortKey]||'';
    if (_campSortKey==='totalBudget') { va=parseFloat(a.totalBudget?.units||'0'); vb=parseFloat(b.totalBudget?.units||'0'); }
    if (_campSortKey==='status') { // active/delivering first
      const rank = s => (s==='ACTIVE'||s==='DELIVERING')?0:(s==='PAUSED'?1:(s==='COMPLETED'?2:3));
      if (_campSortAsc) return rank(a.status)-rank(b.status); else return rank(b.status)-rank(a.status);
    }
    if (va<vb) return _campSortAsc?-1:1; if (va>vb) return _campSortAsc?1:-1; return 0;
  });
  _campPageNum = 1;
  renderCampaignsPage();
}
function sortCampaignsBy(key) {
  if (_campSortKey===key) _campSortAsc=!_campSortAsc; else { _campSortKey=key; _campSortAsc=true; }
  filterCampaigns(document.getElementById('campSearch')?.value||'');
}
function renderCampaignsTable() {
  _campFiltered = [..._campOrders];
  // Default sort: active/delivering first
  _campSortKey = 'status'; _campSortAsc = true;
  filterCampaigns('');
}

// Build order→lineItems map for this screen
function campBuildLIMap() {
  const map = {};
  for (const li of _campLineItems) {
    const oid = li.orderId || (li.name?li.name.split('/lineItems/')[0]:null);
    if (!oid) continue;
    if (!map[oid]) map[oid]=[];
    map[oid].push(li);
  }
  return map;
}

function renderCampaignsPage() {
  const tbody = document.getElementById('campTbody');
  const start = (_campPageNum-1)*CAMP_PAGE;
  const page  = _campFiltered.slice(start, start+CAMP_PAGE);
  const total = _campFiltered.length;
  const pages = Math.ceil(total/CAMP_PAGE);

  document.getElementById('campCount').textContent = total+' campaigns'+(total!==_campOrders.length?' (filtered from '+_campOrders.length+')':'');
  document.getElementById('campPageLabel').textContent = 'Page '+_campPageNum+' / '+(pages||1);
  document.getElementById('campPrevBtn').disabled = _campPageNum<=1;
  document.getElementById('campNextBtn').disabled = _campPageNum>=pages;

  if (!page.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-muted" style="text-align:center;padding:24px">No campaigns match.</td></tr>';
    return;
  }
  const liMap = campBuildLIMap();
  tbody.innerHTML = page.map(o => {
    const oid = o.name||o.id||o.displayName;
    const oNum = oid?.split('/').pop();
    let lis = liMap[oid]||liMap[oNum]||[];
    if (!lis.length && oNum) lis = _campLineItems.filter(li=>(li.orderId||'').split('/').pop()===oNum);
    const totalImpr   = lis.reduce((s,li)=>s+parseInt(li.impressionsDelivered||'0'),0);
    const totalClicks = lis.reduce((s,li)=>s+parseInt(li.clicksDelivered||'0'),0);
    const ctr         = totalImpr>0?(totalClicks/totalImpr*100).toFixed(2)+'%':'—';
    const activeLI    = lis.filter(li=>li.status==='ACTIVE'||li.status==='DELIVERING').length;
    return '<tr>'+
      '<td style="max-width:220px"><div class="fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(o.displayName||'')+'">'+( o.displayName||o.name||'—')+'</div>'+
        (o.advertiserId?'<div class="fs10 text-muted">Adv: '+o.advertiserId.split('/').pop()+'</div>':'')+'</td>'+
      '<td>'+campStatusBadge(o.status)+'</td>'+
      '<td class="fw7" style="color:#60a5fa">'+campFmtBudget(o.totalBudget)+'</td>'+
      '<td class="fw6" style="color:#f59e0b">'+campFmtImpr(totalImpr)+'</td>'+
      '<td class="dim">'+campFmtImpr(totalClicks)+'</td>'+
      '<td class="fw6">'+ctr+'</td>'+
      '<td class="dim fs11">'+campFmtDate(o.startTime)+'</td>'+
      '<td class="dim fs11">'+campFmtDate(o.endTime)+'</td>'+
      '<td class="fs11"><span class="li-count-badge" style="display:inline-flex;align-items:center;background:rgba(167,139,250,0.15);color:#a78bfa;font-size:9px;font-weight:700;padding:1px 6px;border-radius:10px">'+lis.length+'</span>'+
        (activeLI>0?'<span style="color:#00d68f;font-size:9px;margin-left:4px">'+activeLI+' active</span>':'')+'</td>'+
    '</tr>';
  }).join('');
}
function campPage(dir) {
  const pages = Math.ceil(_campFiltered.length/CAMP_PAGE);
  _campPageNum = Math.max(1,Math.min(pages,_campPageNum+dir));
  renderCampaignsPage();
}
function exportCampaignCSV() {
  const data = _campFiltered.length?_campFiltered:_campOrders;
  if (!data.length) return;
  const liMap = campBuildLIMap();
  const headers = ['Campaign','Status','Budget','Currency','Impressions','Clicks','CTR','Start','End','Line Items'];
  const rows = data.map(o => {
    const oid=o.name||o.id||o.displayName; const oNum=oid?.split('/').pop();
    let lis=liMap[oid]||liMap[oNum]||[];
    if (!lis.length&&oNum) lis=_campLineItems.filter(li=>(li.orderId||'').split('/').pop()===oNum);
    const impr=lis.reduce((s,li)=>s+parseInt(li.impressionsDelivered||'0'),0);
    const clk=lis.reduce((s,li)=>s+parseInt(li.clicksDelivered||'0'),0);
    const ctr=impr>0?(clk/impr*100).toFixed(2)+'%':'';
    return ['"'+(o.displayName||o.name||'').replace(/"/g,'""')+'"',o.status||'',o.totalBudget?.units||'',o.totalBudget?.currencyCode||'',impr,clk,ctr,o.startTime?.slice(0,10)||'',o.endTime?.slice(0,10)||'',lis.length].join(',');
  });
  const csv=[headers.join(','),...rows].join('\\n');
  const a=document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download='campaigns.csv'; a.click();
}

// ── Auto-load ─────────────────────────────────────────────────────────────────
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadCampaignData);
else setTimeout(loadCampaignData,80);
</script>
`;
}


export function adsScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── Connection Banner ─────────────────────────────────────────────────── -->
  <div id="adsBanner" style="display:flex;align-items:center;gap:10px;background:rgba(66,133,244,0.08);border:1px solid rgba(66,133,244,0.2);border-radius:12px;padding:11px 16px;margin-bottom:4px">
    <i class="fas fa-spinner fa-spin" id="adsBannerIcon" style="color:#4285f4;font-size:13px"></i>
    <span id="adsBannerText" style="font-size:12px;color:#60a5fa">Loading ad performance data from Google Ad Manager…</span>
    <button class="btn-ghost" style="margin-left:auto;height:26px;font-size:11px;padding:0 10px" onclick="loadAdsData()">
      <i class="fas fa-rotate"></i>Refresh
    </button>
  </div>

  <!-- ── KPI STRIP ─────────────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Active Line Items</div>
      <div class="kpi-val" id="ads-kv-active"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="ads-kc-active"></div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-eye"></i></div>
      <div class="kpi-lbl">Total Impressions</div>
      <div class="kpi-val" id="ads-kv-impr"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="ads-kc-impr"></div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-arrow-pointer"></i></div>
      <div class="kpi-lbl">Total Clicks</div>
      <div class="kpi-val" id="ads-kv-clicks"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="ads-kc-clicks"></div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-percent"></i></div>
      <div class="kpi-lbl">Overall CTR</div>
      <div class="kpi-val" id="ads-kv-ctr"><span class="text-muted fs13">—</span></div>
      <div class="kpi-chg" id="ads-kc-ctr"></div>
    </div>
  </div>

  <!-- ── CHART ROW ─────────────────────────────────────────────────────────── -->
  <div class="g62">
    <!-- Line Item Type breakdown -->
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-layer-group" style="color:#a78bfa;margin-right:7px"></i>Ad Performance by Type</div>
        <span class="b b-gray fs10" id="ads-source-badge">GAM · Line Items</span>
      </div>
      <div style="height:160px"><canvas id="adsTypeChart"></canvas></div>
      <div id="adsTypeBars" style="display:flex;flex-direction:column;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)"></div>
    </div>

    <!-- Status bars + top performers -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-signal" style="color:#00d68f;margin-right:7px"></i>Line Item Status</div></div>
        <div id="adsStatusBars" style="display:flex;flex-direction:column;gap:8px;min-height:60px">
          <div class="text-muted fs12" style="text-align:center;padding:14px"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
      </div>
      <div class="card card-sm">
        <div class="card-hd"><div class="card-title"><i class="fas fa-trophy" style="color:#f59e0b;margin-right:7px"></i>Top Performers</div><span class="b b-gray fs10">by impressions</span></div>
        <div id="adsTopPerformers" style="display:flex;flex-direction:column;gap:5px">
          <div class="text-muted fs12" style="text-align:center;padding:10px"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── AD PERFORMANCE TABLE ───────────────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-table-list" style="color:#4285f4;margin-right:7px"></i>Line Items — Ad Performance</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input id="adsSearch" type="text" placeholder="Search line items…"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:150px;outline:none"
          oninput="filterAds(this.value)">
        <select id="adsStatusFilter"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="filterAds(document.getElementById('adsSearch').value)">
          <option value="ACTIVE_DELIVERING">Active &amp; Delivering</option>
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DELIVERING">Delivering</option>
          <option value="COMPLETED">Completed</option>
          <option value="PAUSED">Paused</option>
        </select>
        <select id="adsTypeFilter"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="filterAds(document.getElementById('adsSearch').value)">
          <option value="">All Types</option>
        </select>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="exportAdsCSV()">
          <i class="fas fa-download"></i>CSV
        </button>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead>
          <tr>
            <th onclick="sortAdsBy('displayName')" style="cursor:pointer">Line Item <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortAdsBy('status')" style="cursor:pointer">Status <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortAdsBy('lineItemType')" style="cursor:pointer">Type <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortAdsBy('impressionsDelivered')" style="cursor:pointer">Impressions <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortAdsBy('clicksDelivered')" style="cursor:pointer">Clicks <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th>CTR</th>
            <th onclick="sortAdsBy('startTime')" style="cursor:pointer">Start <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortAdsBy('endTime')" style="cursor:pointer">End <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody id="adsTbody">
          <tr><td colspan="9" class="text-muted" style="text-align:center;padding:28px"><i class="fas fa-spinner fa-spin"></i> Loading…</td></tr>
        </tbody>
      </table>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
      <span class="fs11 text-muted" id="adsCount">—</span>
      <div style="display:flex;gap:6px">
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="adsPrevBtn" onclick="adsPage(-1)" disabled>← Prev</button>
        <span class="fs11 text-muted" id="adsPageLabel" style="padding:0 6px;line-height:26px">Page 1</span>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="adsNextBtn" onclick="adsPage(1)">Next →</button>
      </div>
    </div>
  </div>

</div>

<script>
// ── Ads state ─────────────────────────────────────────────────────────────────
let _adsLineItems = [];
let _adsOrders    = [];
let _adsFiltered  = [];
let _adsPageNum   = 1;
const ADS_PAGE    = 25;
let _adsSortKey   = 'impressionsDelivered';
let _adsSortAsc   = false;
let _adsTypeChart  = null;

const ADS_STATUS_COLOR = { ACTIVE:'#00d68f', DELIVERING:'#00d68f', COMPLETED:'#60a5fa', PAUSED:'#f59e0b', CANCELED:'#f43f5e', DRAFT:'#8080a8', UNKNOWN:'#48486a' };
const ADS_STATUS_BADGE = { ACTIVE:'b-green', DELIVERING:'b-green', COMPLETED:'b-blue', PAUSED:'b-amber', CANCELED:'b-red', DRAFT:'b-gray', UNKNOWN:'b-gray' };
function adsFmtImpr(n) {
  n=parseInt(n)||0;
  if(n>=1e9) return (n/1e9).toFixed(1)+'B';
  if(n>=1e6) return (n/1e6).toFixed(1)+'M';
  if(n>=1e3) return (n/1e3).toFixed(1)+'K';
  return String(n);
}
function adsFmtDate(s) {
  if(!s) return '—';
  try { return new Date(s).toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'numeric'}); } catch { return s.slice(0,10); }
}
function adsStatusBadge(s) { return '<span class="b '+(ADS_STATUS_BADGE[s]||'b-gray')+'" style="font-size:9px">'+(s||'UNKNOWN')+'</span>'; }

// ── Loader ────────────────────────────────────────────────────────────────────
async function loadAdsData() {
  const icon = document.getElementById('adsBannerIcon');
  const text = document.getElementById('adsBannerText');
  icon.className = 'fas fa-spinner fa-spin'; icon.style.color = '#4285f4';
  text.textContent = 'Loading ad performance data from Google Ad Manager…'; text.style.color = '#60a5fa';

  try {
    const [sumRes, liRes, ordRes] = await Promise.all([
      fetch('/api/gam/summary').then(r=>r.json()),
      fetch('/api/gam/lineitems?pageSize=200').then(r=>r.json()),
      fetch('/api/gam/orders?pageSize=200').then(r=>r.json()),
    ]);

    if (!sumRes.ok) {
      icon.className = 'fas fa-triangle-exclamation'; icon.style.color = '#f59e0b';
      text.textContent = 'GAM not connected: '+(sumRes.error||'Go to API Connections → Config to set up.'); text.style.color = '#f59e0b';
      document.getElementById('adsTbody').innerHTML = '<tr><td colspan="9" class="text-muted" style="text-align:center;padding:28px"><i class="fas fa-plug" style="color:#f59e0b"></i> GAM not configured.</td></tr>';
      return;
    }

    _adsLineItems = liRes.lineItems  || [];
    _adsOrders    = ordRes.orders    || [];

    icon.className = 'fas fa-circle-check'; icon.style.color = '#00d68f';
    text.textContent = 'Connected · '+_adsLineItems.length+' line items loaded from '+(sumRes.networkName||sumRes.networkCode)+' · Live';
    text.style.color = '#00d68f';
    document.getElementById('ads-source-badge').textContent = (sumRes.networkName||sumRes.networkCode)+' · GAM Line Items';

    // Populate type filter
    const types = [...new Set(_adsLineItems.map(li=>li.lineItemType).filter(Boolean))].sort();
    const sel = document.getElementById('adsTypeFilter');
    types.forEach(t => { const opt=document.createElement('option'); opt.value=t; opt.textContent=t; sel.appendChild(opt); });

    renderAdsKPIs(sumRes);
    renderAdsTypeBars();
    renderAdsStatusBars(sumRes.lineItems?.byStatus||{});
    renderAdsTopPerformers();
    renderAdsTable();
  } catch(e) {
    icon.className = 'fas fa-circle-xmark'; icon.style.color = '#f43f5e';
    text.textContent = 'Failed to load: '+e.message; text.style.color = '#f43f5e';
  }
}

// ── KPIs ──────────────────────────────────────────────────────────────────────
function renderAdsKPIs(s) {
  const active = (s.lineItems?.byStatus?.ACTIVE||0)+(s.lineItems?.byStatus?.DELIVERING||0);
  const total  = s.lineItems?.total||0;
  const impr   = s.lineItems?.totalImpressions||0;
  const clk    = s.lineItems?.totalClicks||0;
  const ctr    = impr>0?(clk/impr*100).toFixed(2)+'%':'—';

  document.getElementById('ads-kv-active').textContent  = active;
  document.getElementById('ads-kc-active').innerHTML    = '<span class="text-muted">of '+total+' total line items</span>';
  document.getElementById('ads-kv-impr').innerHTML      = adsFmtImpr(impr)+'<sup style="font-size:12px;font-weight:600"> total</sup>';
  document.getElementById('ads-kc-impr').innerHTML      = '<span class="text-muted">delivered</span>';
  document.getElementById('ads-kv-clicks').innerHTML    = adsFmtImpr(clk)+'<sup style="font-size:12px;font-weight:600"> total</sup>';
  document.getElementById('ads-kc-clicks').innerHTML    = '<span class="text-muted">across all line items</span>';
  document.getElementById('ads-kv-ctr').innerHTML       = (ctr!=='—'?ctr:'<span class="text-muted fs13">—</span>');
  document.getElementById('ads-kc-ctr').innerHTML       = impr>0?'<span class="text-muted">blended CTR</span>':'';
}

// ── Type bars + doughnut chart ────────────────────────────────────────────────
function renderAdsTypeBars() {
  const el = document.getElementById('adsTypeBars');
  const byType = {};
  let totalImpr = 0;
  for (const li of _adsLineItems) {
    const t = li.lineItemType||'UNKNOWN';
    const impr = parseInt(li.impressionsDelivered||'0');
    byType[t] = (byType[t]||0) + impr;
    totalImpr += impr;
  }
  const sorted = Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const typeColors = ['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#60a5fa','#e2007a','#34d399'];
  const colorMap = {};
  sorted.forEach(([t],i)=>{ colorMap[t]=typeColors[i%typeColors.length]; });

  if (!sorted.length || totalImpr===0) {
    el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:10px">No impression data</div>';
  } else {
    el.innerHTML = sorted.map(([t,v]) => {
      const pct = Math.round(v/totalImpr*100); const col = colorMap[t];
      return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11">'+t+'</span><span class="fs11 fw7">'+adsFmtImpr(v)+' <span class="text-muted">('+pct+'%)</span></span></div><div class="prog-wrap"><div class="prog-fill" style="width:'+pct+'%;background:'+col+';border-radius:3px;height:5px;transition:width 0.6s"></div></div></div>';
    }).join('');
  }

  // Doughnut chart
  const ctx = document.getElementById('adsTypeChart');
  if (!ctx) return;
  if (_adsTypeChart) { _adsTypeChart.destroy(); _adsTypeChart = null; }
  const labels = sorted.map(([t])=>t); const values = sorted.map(([,v])=>v);
  if (!labels.length) return;
  _adsTypeChart = new Chart(ctx, {
    type:'doughnut',
    data:{ labels, datasets:[{ data:values, backgroundColor:labels.map((_,i)=>typeColors[i%typeColors.length]), borderWidth:0, hoverOffset:4 }] },
    options:{ responsive:true, maintainAspectRatio:false, cutout:'68%',
      plugins:{ legend:{ position:'right', labels:{ color:'#8080a8', font:{size:10}, boxWidth:9, padding:7 } },
        tooltip:{ callbacks:{ label:ctx=>' '+ctx.label+': '+adsFmtImpr(ctx.parsed) } } } }
  });
}

// ── Status Bars ───────────────────────────────────────────────────────────────
function renderAdsStatusBars(byStatus) {
  const el = document.getElementById('adsStatusBars');
  const total = Object.values(byStatus).reduce((a,b)=>a+b,0)||1;
  const sorted = Object.entries(byStatus).sort((a,b)=>b[1]-a[1]);
  if (!sorted.length) { el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:10px">No data</div>'; return; }
  el.innerHTML = sorted.map(([st,cnt]) => {
    const pct = Math.round(cnt/total*100); const col = ADS_STATUS_COLOR[st]||'#48486a';
    return '<div style="display:flex;align-items:center;gap:8px"><span class="fs11 text-muted" style="width:90px;flex-shrink:0">'+st+'</span><div class="prog-wrap" style="flex:1"><div class="prog-fill" style="width:'+pct+'%;background:'+col+';border-radius:3px;height:5px"></div></div><span class="fs11 fw7" style="width:30px;text-align:right">'+cnt+'</span></div>';
  }).join('');
}

// ── Top Performers ────────────────────────────────────────────────────────────
function renderAdsTopPerformers() {
  const el = document.getElementById('adsTopPerformers');
  const top = [..._adsLineItems]
    .filter(li=>parseInt(li.impressionsDelivered||'0')>0)
    .sort((a,b)=>parseInt(b.impressionsDelivered||'0')-parseInt(a.impressionsDelivered||'0'))
    .slice(0,5);
  if (!top.length) { el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:10px">No delivery data</div>'; return; }
  el.innerHTML = top.map((li,i) => {
    const impr = parseInt(li.impressionsDelivered||'0');
    const clk  = parseInt(li.clicksDelivered||'0');
    const ctr  = impr>0?(clk/impr*100).toFixed(2)+'%':'—';
    return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">'+
      '<span style="width:16px;height:16px;border-radius:50%;background:rgba(66,133,244,0.15);display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#4285f4;flex-shrink:0">'+(i+1)+'</span>'+
      '<div style="flex:1;min-width:0"><div class="fs11 fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(li.displayName||'')+'">'+( li.displayName||li.name||'—')+'</div>'+
        '<div class="fs10 text-muted">'+adsFmtImpr(impr)+' impr · '+ctr+' CTR</div></div>'+
      adsStatusBadge(li.status)+'</div>';
  }).join('');
}

// ── Ads Table ─────────────────────────────────────────────────────────────────
function filterAds(query) {
  const sf  = document.getElementById('adsStatusFilter').value;
  const tf  = document.getElementById('adsTypeFilter').value;
  const q   = (query||'').toLowerCase();
  _adsFiltered = _adsLineItems.filter(li => {
    const mQ = !q || (li.displayName||'').toLowerCase().includes(q);
    let mS;
    if (sf==='ACTIVE_DELIVERING') { mS = li.status==='ACTIVE'||li.status==='DELIVERING'; }
    else { mS = !sf || li.status===sf; }
    const mT = !tf || li.lineItemType===tf;
    return mQ && mS && mT;
  });
  _adsFiltered.sort((a,b) => {
    let va = a[_adsSortKey]||0, vb = b[_adsSortKey]||0;
    if (_adsSortKey==='impressionsDelivered'||_adsSortKey==='clicksDelivered') { va=parseInt(va)||0; vb=parseInt(vb)||0; }
    if (va<vb) return _adsSortAsc?-1:1; if (va>vb) return _adsSortAsc?1:-1; return 0;
  });
  _adsPageNum = 1;
  renderAdsPage();
}
function sortAdsBy(key) {
  if (_adsSortKey===key) _adsSortAsc=!_adsSortAsc; else { _adsSortKey=key; _adsSortAsc=(key!=='impressionsDelivered'&&key!=='clicksDelivered'); }
  filterAds(document.getElementById('adsSearch')?.value||'');
}
function renderAdsTable() {
  _adsFiltered = [..._adsLineItems];
  const sel = document.getElementById('adsStatusFilter');
  if (sel) sel.value = 'ACTIVE_DELIVERING';
  filterAds('');
}

// Build order name lookup: orderId/name -> displayName
function buildOrderNameMap() {
  const map = {};
  for (const o of _adsOrders) {
    const name = o.name||''; const num = name.split('/').pop();
    map[name] = o.displayName||o.name||'—';
    if (num) map[num] = o.displayName||o.name||'—';
  }
  return map;
}

function renderAdsPage() {
  const tbody = document.getElementById('adsTbody');
  const start = (_adsPageNum-1)*ADS_PAGE;
  const page  = _adsFiltered.slice(start, start+ADS_PAGE);
  const total = _adsFiltered.length;
  const pages = Math.ceil(total/ADS_PAGE);

  document.getElementById('adsCount').textContent = total+' line items'+(total!==_adsLineItems.length?' (filtered from '+_adsLineItems.length+')':'');
  document.getElementById('adsPageLabel').textContent = 'Page '+_adsPageNum+' / '+(pages||1);
  document.getElementById('adsPrevBtn').disabled = _adsPageNum<=1;
  document.getElementById('adsNextBtn').disabled = _adsPageNum>=pages;

  if (!page.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-muted" style="text-align:center;padding:24px">No line items match.</td></tr>';
    return;
  }
  const orderMap = buildOrderNameMap();
  tbody.innerHTML = page.map(li => {
    const impr = parseInt(li.impressionsDelivered||'0');
    const clk  = parseInt(li.clicksDelivered||'0');
    const ctr  = impr>0?(clk/impr*100).toFixed(2)+'%':'—';
    const oid  = (li.orderId||'').split('/').pop();
    const oName = orderMap[li.orderId||'']||orderMap[oid]||oid||'—';
    return '<tr>'+
      '<td style="max-width:200px"><div class="fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(li.displayName||'')+'">'+( li.displayName||li.name||'—')+'</div></td>'+
      '<td>'+adsStatusBadge(li.status)+'</td>'+
      '<td class="dim fs11">'+(li.lineItemType||'—')+'</td>'+
      '<td class="fw6" style="color:#f59e0b">'+adsFmtImpr(impr)+'</td>'+
      '<td class="dim">'+adsFmtImpr(clk)+'</td>'+
      '<td class="fw6">'+(ctr)+'</td>'+
      '<td class="dim fs11">'+adsFmtDate(li.startTime)+'</td>'+
      '<td class="dim fs11">'+adsFmtDate(li.endTime)+'</td>'+
      '<td class="fs11 text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+oName+'">'+oName+'</td>'+
    '</tr>';
  }).join('');
}
function adsPage(dir) {
  const pages = Math.ceil(_adsFiltered.length/ADS_PAGE);
  _adsPageNum = Math.max(1,Math.min(pages,_adsPageNum+dir));
  renderAdsPage();
}
function exportAdsCSV() {
  const data = _adsFiltered.length?_adsFiltered:_adsLineItems;
  if (!data.length) return;
  const orderMap = buildOrderNameMap();
  const headers = ['Line Item','Status','Type','Impressions','Clicks','CTR','Start','End','Order'];
  const rows = data.map(li => {
    const impr=parseInt(li.impressionsDelivered||'0');
    const clk=parseInt(li.clicksDelivered||'0');
    const ctr=impr>0?(clk/impr*100).toFixed(2)+'%':'';
    const oid=(li.orderId||'').split('/').pop();
    const oName=orderMap[li.orderId||'']||orderMap[oid]||oid||'';
    return ['"'+(li.displayName||li.name||'').replace(/"/g,'""')+'"',li.status||'',li.lineItemType||'',impr,clk,ctr,li.startTime?.slice(0,10)||'',li.endTime?.slice(0,10)||'','"'+oName.replace(/"/g,'""')+'"'].join(',');
  });
  const csv=[headers.join(','),...rows].join('\\n');
  const a=document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download='ads-performance.csv'; a.click();
}

// ── Auto-load ─────────────────────────────────────────────────────────────────
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadAdsData);
else setTimeout(loadAdsData,80);
</script>
`;
}


// ═══════════════════════════════════════════════════════════════════════════
//   GAM ANALYTICS — live data from Google Ad Manager API
// ═══════════════════════════════════════════════════════════════════════════
export function gamAnalyticsScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── STATUS BANNER (hidden once loaded) ─────────────────────────────── -->
  <div id="gamBanner" style="display:flex;align-items:center;gap:10px;background:rgba(66,133,244,0.08);border:1px solid rgba(66,133,244,0.2);border-radius:12px;padding:12px 16px;margin-bottom:16px">
    <i class="fas fa-spinner fa-spin" id="gamBannerIcon" style="color:#4285f4"></i>
    <span id="gamBannerText" style="font-size:12px;color:#60a5fa">Loading live data from Google Ad Manager…</span>
    <button class="btn-ghost" style="margin-left:auto;height:26px;font-size:11px;padding:0 10px" onclick="loadGAMAnalytics()">
      <i class="fas fa-rotate"></i>Refresh
    </button>
  </div>

  <!-- ── KPI STRIP ────────────────────────────────────────────────────────── -->
  <div class="kpi-grid-4" id="gamKpiStrip">
    <div class="kpi accent" id="kpi-orders">
      <div class="kpi-icon" style="background:rgba(66,133,244,0.15);color:#4285f4"><i class="fas fa-file-invoice"></i></div>
      <div class="kpi-lbl">Total Orders</div>
      <div class="kpi-val" id="kv-orders"><span class="text-muted fs12">—</span></div>
      <div class="kpi-chg" id="kc-orders"></div>
    </div>
    <div class="kpi" id="kpi-active">
      <div class="kpi-icon green"><i class="fas fa-circle-check"></i></div>
      <div class="kpi-lbl">Active / Running</div>
      <div class="kpi-val" id="kv-active"><span class="text-muted fs12">—</span></div>
      <div class="kpi-chg" id="kc-active"></div>
    </div>
    <div class="kpi" id="kpi-impr">
      <div class="kpi-icon amber"><i class="fas fa-eye"></i></div>
      <div class="kpi-lbl">Impressions Delivered</div>
      <div class="kpi-val" id="kv-impr"><span class="text-muted fs12">—</span></div>
      <div class="kpi-chg" id="kc-impr"></div>
    </div>
    <div class="kpi" id="kpi-li">
      <div class="kpi-icon" style="background:rgba(167,139,250,0.15);color:#a78bfa"><i class="fas fa-layer-group"></i></div>
      <div class="kpi-lbl">Total Line Items</div>
      <div class="kpi-val" id="kv-li"><span class="text-muted fs12">—</span></div>
      <div class="kpi-chg" id="kc-li"></div>
    </div>
  </div>

  <!-- ── ROW 2: ORDER STATUS + LINE ITEM STATUS ──────────────────────────── -->
  <div class="g62">

    <!-- Order Status Breakdown -->
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-file-invoice" style="color:#4285f4;margin-right:7px"></i>Order Status Breakdown</div>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadGAMOrders()">
            <i class="fas fa-table-list"></i>Full List
          </button>
        </div>
      </div>
      <div id="orderStatusBars" style="display:flex;flex-direction:column;gap:10px;min-height:120px">
        <div class="text-muted fs12" style="padding:20px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
      </div>
      <div style="height:160px;margin-top:14px"><canvas id="orderStatusChart"></canvas></div>
    </div>

    <!-- Line Item Status + Network Info -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-layer-group" style="color:#a78bfa;margin-right:7px"></i>Line Item Status</div>
        </div>
        <div id="liStatusBars" style="display:flex;flex-direction:column;gap:9px;min-height:80px">
          <div class="text-muted fs12" style="padding:10px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
        </div>
      </div>

      <div class="card" id="networkInfoCard">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-network-wired" style="color:#00d68f;margin-right:7px"></i>Network Info</div>
          <span class="b b-gray" id="networkStatusBadge">—</span>
        </div>
        <div id="networkInfoBody" style="display:flex;flex-direction:column;gap:6px">
          <div class="text-muted fs12" style="padding:10px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ── ROW 3: ORDERS + LINE ITEMS (expandable hierarchy) ─────────────────── -->
  <div class="card" id="ordersTableCard">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-list-check" style="color:#4285f4;margin-right:7px"></i>Orders &amp; Line Items</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span class="fs11 text-muted" style="white-space:nowrap;display:flex;align-items:center;gap:4px">
          <i class="fas fa-chevron-right" style="font-size:9px"></i>Click row to expand line items
        </span>
        <input id="orderSearch" type="text" placeholder="Search orders…"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--text-primary);font-size:11px;width:150px;outline:none"
          oninput="filterOrders(this.value)">
        <select id="orderStatusFilter"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="filterOrders(document.getElementById('orderSearch').value)">
          <option value="ACTIVE_DELIVERING">Active &amp; Delivering</option>
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DELIVERING">Delivering</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
          <option value="PAUSED">Paused</option>
          <option value="DRAFT">Draft</option>
        </select>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="toggleExpandAll()" id="expandAllBtn">
          <i class="fas fa-expand-alt"></i>Expand All
        </button>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="exportOrdersCSV()">
          <i class="fas fa-download"></i>CSV
        </button>
      </div>
    </div>

    <style>
      .order-row { cursor:pointer; transition:background 0.12s; }
      .order-row:hover td { background:rgba(66,133,244,0.07) !important; }
      .li-child-row td { font-size:11px; background:rgba(66,133,244,0.03); }
      .li-child-row td:nth-child(2) { padding-left:38px; }
      .expand-icon { display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:4px;background:rgba(66,133,244,0.12);color:#4285f4;font-size:9px;transition:transform 0.2s;flex-shrink:0; }
      .expand-icon.open { transform:rotate(90deg);background:rgba(66,133,244,0.22); }
      .li-count-badge { display:inline-flex;align-items:center;background:rgba(167,139,250,0.15);color:#a78bfa;font-size:9px;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:6px; }
      .li-subhdr td { background:rgba(66,133,244,0.10) !important; }
      @keyframes liSlide { from{opacity:0;transform:translateY(-3px)} to{opacity:1;transform:translateY(0)} }
      .li-child-row { animation:liSlide 0.15s ease; }
    </style>

    <div id="ordersTableWrap" style="overflow-x:auto">
      <table class="tbl" id="ordersTable">
        <thead>
          <tr>
            <th style="width:36px"></th>
            <th onclick="sortOrdersBy('displayName')" style="cursor:pointer">Order Name <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('status')" style="cursor:pointer">Status <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('totalBudget')" style="cursor:pointer">Budget <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('startTime')" style="cursor:pointer">Start <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('endTime')" style="cursor:pointer">End <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th>Delivery / Adv.</th>
          </tr>
        </thead>
        <tbody id="ordersTbody">
          <tr><td colspan="7" class="text-muted" style="text-align:center;padding:24px"><i class="fas fa-spinner fa-spin"></i> Loading orders…</td></tr>
        </tbody>
      </table>
    </div>
    <div id="ordersPagination" style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
      <span class="fs11 text-muted" id="ordersCount">—</span>
      <div style="display:flex;gap:6px">
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="ordersPrevBtn" onclick="ordersPage(-1)" disabled>← Prev</button>
        <span class="fs11 text-muted" id="ordersPageLabel" style="padding:0 6px;line-height:26px">Page 1</span>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="ordersNextBtn" onclick="ordersPage(1)">Next →</button>
      </div>
    </div>
  </div>

  <!-- ── ROW 4: AD UNITS + REVENUE ANALYSIS ──────────────────────────────── -->
  <div class="g62">

    <!-- Ad Units -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <!-- Ad Units -->
      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-th-large" style="color:#f59e0b;margin-right:7px"></i>Ad Units</div>
          <span id="adUnitCount" class="b b-gray fs11">—</span>
        </div>
        <div id="adUnitsList" style="display:flex;flex-direction:column;gap:7px;max-height:180px;overflow-y:auto">
          <div class="text-muted fs12" style="padding:10px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
        </div>
      </div>

      <!-- Revenue Analysis from budget data -->
      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-sack-dollar" style="color:#00d68f;margin-right:7px"></i>Budget / Revenue Analysis</div>
        </div>
        <div id="revenueAnalysis" style="min-height:80px">
          <div class="text-muted fs12" style="padding:10px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
        </div>
        <div style="height:130px;margin-top:10px"><canvas id="budgetChart"></canvas></div>
      </div>

    </div>
  </div>

  <!-- ── ROW 5: SAVED REPORTS ───────────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-file-chart-pie" style="color:#e2007a;margin-right:7px"></i>Saved Reports</div>
      <span class="fs11 text-muted">Click Run to fetch results from GAM</span>
    </div>
    <div id="reportsList" style="display:flex;flex-direction:column;gap:8px;min-height:60px">
      <div class="text-muted fs12" style="padding:16px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading reports…</div>
    </div>
    <!-- Report result panel -->
    <div id="reportResultPanel" style="display:none;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
      <div class="card-hd" style="margin-bottom:10px">
        <div class="card-title" id="reportResultTitle">Report Results</div>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 9px" onclick="document.getElementById('reportResultPanel').style.display='none'">
          <i class="fas fa-xmark"></i>Close
        </button>
      </div>
      <div style="overflow-x:auto"><table class="tbl" id="reportResultTable"><tbody></tbody></table></div>
      <div id="reportResultMeta" class="fs11 text-muted" style="margin-top:8px"></div>
    </div>
  </div>

</div>

<script>
// ── State ───────────────────────────────────────────────────────────────────
let _gamOrders    = [];
let _gamLineItems = [];
let _gamAdUnits   = [];
let _gamReports   = [];
let _gamNetwork   = null;
let _ordersFiltered = [];
let _ordersPageNum  = 1;
const PAGE_SIZE     = 15;
let _ordersSortKey  = 'displayName';
let _ordersSortAsc  = true;
let _orderStatusChart = null;
let _budgetChart      = null;
let _expandedOrders = new Set();
let _allExpanded    = false;

// ── Utility ─────────────────────────────────────────────────────────────────
function fmtImpr(n) {
  if (n >= 1_000_000_000) return (n/1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000)     return (n/1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)         return (n/1_000).toFixed(1) + 'K';
  return String(n);
}
function fmtDate(s) {
  if (!s) return '—';
  try { return new Date(s).toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'numeric'}); } catch { return s.slice(0,10); }
}
function fmtBudget(b) {
  if (!b) return '—';
  const units = parseFloat(b.units || '0');
  const cur = b.currencyCode || '';
  if (units >= 1_000_000) return cur + ' ' + (units/1_000_000).toFixed(2) + 'M';
  if (units >= 1_000)     return cur + ' ' + (units/1_000).toFixed(1) + 'K';
  return cur + ' ' + units.toFixed(0);
}
const STATUS_COLOR = {
  ACTIVE:'#00d68f', DELIVERING:'#00d68f', COMPLETED:'#60a5fa',
  PAUSED:'#f59e0b', CANCELED:'#f43f5e', DRAFT:'#8080a8',
  PENDING:'#a78bfa', UNKNOWN:'#48486a'
};
const STATUS_BADGE = {
  ACTIVE:'b-green', DELIVERING:'b-green', COMPLETED:'b-blue',
  PAUSED:'b-amber', CANCELED:'b-red', DRAFT:'b-gray',
  PENDING:'b-purple', UNKNOWN:'b-gray'
};
function statusBadge(s) {
  const cls = STATUS_BADGE[s] || 'b-gray';
  return \`<span class="b \${cls}" style="font-size:9px">\${s||'UNKNOWN'}</span>\`;
}

// ── Main loader ─────────────────────────────────────────────────────────────
async function loadGAMAnalytics() {
  const banner = document.getElementById('gamBanner');
  const bannerIcon = document.getElementById('gamBannerIcon');
  const bannerText = document.getElementById('gamBannerText');
  bannerIcon.className = 'fas fa-spinner fa-spin';
  bannerIcon.style.color = '#4285f4';
  bannerText.textContent = 'Loading live data from Google Ad Manager…';
  banner.style.display = 'flex';

  try {
    // Parallel fetch: summary + orders + line items + ad units + reports
    const [sumRes, ordRes, liRes, auRes, rpRes] = await Promise.all([
      fetch('/api/gam/summary').then(r=>r.json()),
      fetch('/api/gam/orders?pageSize=100').then(r=>r.json()),
      fetch('/api/gam/lineitems?pageSize=100').then(r=>r.json()),
      fetch('/api/gam/adunits').then(r=>r.json()),
      fetch('/api/gam/reports').then(r=>r.json()),
    ]);

    if (!sumRes.ok) {
      bannerIcon.className = 'fas fa-triangle-exclamation';
      bannerIcon.style.color = '#f59e0b';
      bannerText.textContent = 'GAM not connected: ' + (sumRes.error || 'Unknown error. Go to API Connections → Config to set up.');
      bannerText.style.color = '#f59e0b';
      // Clear loading spinners
      ['ordersTbody','adUnitsList','reportsList','orderStatusBars','liStatusBars','networkInfoBody','revenueAnalysis'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<div class="text-muted fs12" style="padding:12px 0;text-align:center"><i class="fas fa-plug" style="color:#f59e0b"></i> GAM not configured</div>';
      });
      return;
    }

    _gamOrders    = ordRes.orders    || [];
    _gamLineItems = liRes.lineItems  || [];
    _gamAdUnits   = auRes.adUnits    || [];
    _gamReports   = rpRes.reports    || [];
    _gamNetwork   = sumRes;

    // Update banner to success
    bannerIcon.className = 'fas fa-circle-check';
    bannerIcon.style.color = '#00d68f';
    bannerText.textContent = 'Connected to ' + (sumRes.networkName || sumRes.networkCode) + ' · ' + _gamOrders.length + ' orders · ' + _gamLineItems.length + ' line items · Last refreshed just now';
    bannerText.style.color = '#00d68f';

    renderKPIs(sumRes);
    renderOrderStatusBars(sumRes.orders?.byStatus || {});
    renderLIStatusBars(sumRes.lineItems?.byStatus || {});
    renderNetworkInfo(sumRes);
    renderOrdersTable();
    renderAdUnits();
    renderRevenueAnalysis();
    renderReports();
    renderCharts(sumRes);

  } catch(e) {
    bannerIcon.className = 'fas fa-circle-xmark';
    bannerIcon.style.color = '#f43f5e';
    bannerText.textContent = 'Failed to load GAM data: ' + e.message;
    bannerText.style.color = '#f43f5e';
  }
}

// ── KPIs ────────────────────────────────────────────────────────────────────
function renderKPIs(s) {
  const totalOrders  = s.orders?.total || 0;
  const activeOrders = (s.orders?.byStatus?.ACTIVE || 0) + (s.orders?.byStatus?.DELIVERING || 0);
  const totalImpr    = s.lineItems?.totalImpressions || 0;
  const totalLI      = s.lineItems?.total || 0;

  document.getElementById('kv-orders').textContent = totalOrders;
  document.getElementById('kc-orders').innerHTML   = \`<span class="text-muted">\${s.adUnits?.total || 0} ad units</span>\`;
  document.getElementById('kv-active').textContent = activeOrders;
  document.getElementById('kc-active').innerHTML   = \`<span class="up"><i class="fas fa-circle" style="font-size:7px;margin-right:4px;color:#00d68f"></i>Live campaigns</span>\`;
  document.getElementById('kv-impr').innerHTML     = \`\${fmtImpr(totalImpr)}<sup style="font-size:12px;font-weight:600"> total</sup>\`;
  document.getElementById('kc-impr').innerHTML     = \`<span class="text-muted">\${fmtImpr(s.lineItems?.totalClicks||0)} clicks</span>\`;
  document.getElementById('kv-li').textContent     = totalLI;
  const activeLI = (s.lineItems?.byStatus?.ACTIVE||0) + (s.lineItems?.byStatus?.DELIVERING||0);
  document.getElementById('kc-li').innerHTML = \`<span class="up">\${activeLI} active</span>\`;
}

// ── Order Status Bars ───────────────────────────────────────────────────────
function renderOrderStatusBars(byStatus) {
  const el = document.getElementById('orderStatusBars');
  const total = Object.values(byStatus).reduce((a,b)=>a+b,0) || 1;
  const sorted = Object.entries(byStatus).sort((a,b)=>b[1]-a[1]);
  if (!sorted.length) { el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:16px">No order data</div>'; return; }
  el.innerHTML = sorted.map(([st, cnt]) => {
    const pct = Math.round(cnt/total*100);
    const col = STATUS_COLOR[st] || '#48486a';
    return \`
    <div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
        <span class="fs12">\${st}</span>
        <span class="fs12 fw7">\${cnt} <span class="text-muted">(\${pct}%)</span></span>
      </div>
      <div class="prog-wrap"><div class="prog-fill" style="width:\${pct}%;background:\${col};border-radius:4px;height:6px;transition:width 0.6s"></div></div>
    </div>\`;
  }).join('');
}

// ── Line Item Status Bars ───────────────────────────────────────────────────
function renderLIStatusBars(byStatus) {
  const el = document.getElementById('liStatusBars');
  const total = Object.values(byStatus).reduce((a,b)=>a+b,0) || 1;
  const sorted = Object.entries(byStatus).sort((a,b)=>b[1]-a[1]).slice(0,6);
  if (!sorted.length) { el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:10px">No line item data</div>'; return; }
  el.innerHTML = sorted.map(([st, cnt]) => {
    const pct = Math.round(cnt/total*100);
    const col = STATUS_COLOR[st] || '#48486a';
    return \`
    <div style="display:flex;align-items:center;gap:8px">
      <span class="fs11 text-muted" style="width:80px;flex-shrink:0">\${st}</span>
      <div class="prog-wrap" style="flex:1"><div class="prog-fill" style="width:\${pct}%;background:\${col};border-radius:3px;height:5px"></div></div>
      <span class="fs11 fw7" style="width:28px;text-align:right">\${cnt}</span>
    </div>\`;
  }).join('');
}

// ── Network Info ────────────────────────────────────────────────────────────
function renderNetworkInfo(s) {
  const badge = document.getElementById('networkStatusBadge');
  badge.textContent = 'Live';
  badge.className = 'b b-green';
  document.getElementById('networkInfoBody').innerHTML = [
    ['Network', s.networkName || s.networkCode],
    ['Network Code', s.networkCode || '—'],
    ['Currency', s.currency || '—'],
    ['Time Zone', s.timeZone || '—'],
    ['Ad Units', (s.adUnits?.total || 0) + ' total · ' + (s.adUnits?.active || 0) + ' active'],
  ].map(([k,v]) => \`
  <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
    <span class="fs12 text-muted">\${k}</span>
    <span class="fs12 fw6">\${v}</span>
  </div>\`).join('');
}

// ── Orders Table (expandable hierarchy) ──────────────────────────────────────

// Build a map: orderResourceName -> [lineItems]
function buildOrderLineItemMap() {
  const map = {};
  for (const li of _gamLineItems) {
    const oid = li.orderId || (li.name ? li.name.split('/lineItems/')[0] : null);
    if (!oid) continue;
    if (!map[oid]) map[oid] = [];
    map[oid].push(li);
  }
  return map;
}

function filterOrders(query) {
  const sf = document.getElementById('orderStatusFilter').value;
  const q = (query||'').toLowerCase();
  _ordersFiltered = _gamOrders.filter(o => {
    const matchQ  = !q || (o.displayName||'').toLowerCase().includes(q) || (o.advertiserId||'').toLowerCase().includes(q);
    let matchSt;
    if (sf === 'ACTIVE_DELIVERING') {
      matchSt = o.status === 'ACTIVE' || o.status === 'DELIVERING';
    } else {
      matchSt = !sf || o.status === sf;
    }
    return matchQ && matchSt;
  });
  // sort
  _ordersFiltered.sort((a,b) => {
    let va = a[_ordersSortKey] || '', vb = b[_ordersSortKey] || '';
    if (_ordersSortKey === 'totalBudget') { va = parseFloat(a.totalBudget?.units||'0'); vb = parseFloat(b.totalBudget?.units||'0'); }
    if (va < vb) return _ordersSortAsc ? -1 : 1;
    if (va > vb) return _ordersSortAsc ?  1 : -1;
    return 0;
  });
  _ordersPageNum = 1;
  renderOrdersPage();
}
function sortOrdersBy(key) {
  if (_ordersSortKey === key) _ordersSortAsc = !_ordersSortAsc;
  else { _ordersSortKey = key; _ordersSortAsc = true; }
  filterOrders(document.getElementById('orderSearch')?.value || '');
}
function renderOrdersTable() {
  _ordersFiltered = [..._gamOrders];
  // Default: show Active & Delivering orders first
  const sel = document.getElementById('orderStatusFilter');
  if (sel && sel.value === '') sel.value = 'ACTIVE_DELIVERING';
  filterOrders('');
}

function toggleOrder(orderId) {
  if (_expandedOrders.has(orderId)) {
    _expandedOrders.delete(orderId);
  } else {
    _expandedOrders.add(orderId);
  }
  renderOrdersPage();
}

function toggleExpandAll() {
  _allExpanded = !_allExpanded;
  const btn = document.getElementById('expandAllBtn');
  if (_allExpanded) {
    _expandedOrders = new Set(_ordersFiltered.map(o => o.name || o.id || o.displayName));
    if (btn) btn.innerHTML = '<i class="fas fa-compress-alt"></i>Collapse All';
  } else {
    _expandedOrders.clear();
    if (btn) btn.innerHTML = '<i class="fas fa-expand-alt"></i>Expand All';
  }
  renderOrdersPage();
}

function renderOrdersPage() {
  const tbody  = document.getElementById('ordersTbody');
  const start  = (_ordersPageNum - 1) * PAGE_SIZE;
  const page   = _ordersFiltered.slice(start, start + PAGE_SIZE);
  const total  = _ordersFiltered.length;
  const pages  = Math.ceil(total / PAGE_SIZE);

  document.getElementById('ordersCount').textContent    = total + ' orders' + (total !== _gamOrders.length ? ' (filtered from ' + _gamOrders.length + ')' : '');
  document.getElementById('ordersPageLabel').textContent = 'Page ' + _ordersPageNum + ' / ' + (pages||1);
  document.getElementById('ordersPrevBtn').disabled = _ordersPageNum <= 1;
  document.getElementById('ordersNextBtn').disabled = _ordersPageNum >= pages;

  if (!page.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-muted" style="text-align:center;padding:20px">No orders match the current filter.</td></tr>';
    return;
  }

  const liMap = buildOrderLineItemMap();
  const rows = [];

  for (const o of page) {
    // Use resource name as stable key (e.g. networks/123/orders/456), fallback to displayName
    const oid      = o.name || o.id || o.displayName;
    const isOpen   = _expandedOrders.has(oid);
    // Try to match line items: by orderId field, or by order resource name prefix
    const orderNumericId = oid?.split('/').pop();
    let lis = liMap[oid] || liMap[orderNumericId] || [];
    // Fallback: match by orderId field that ends with our numeric id
    if (!lis.length && orderNumericId) {
      lis = _gamLineItems.filter(li => {
        const liOid = (li.orderId||'').split('/').pop();
        return liOid === orderNumericId;
      });
    }
    const liCount  = lis.length;

    // ── Order (parent) row ──────────────────────────────────────────────────
    // Summary metrics: total impressions + clicks across child line items
    const totalImpr   = lis.reduce((s, li) => s + parseInt(li.impressionsDelivered||'0'), 0);
    const totalClicks = lis.reduce((s, li) => s + parseInt(li.clicksDelivered||'0'), 0);
    const ctr         = totalImpr > 0 ? (totalClicks / totalImpr * 100).toFixed(2) + '%' : '—';
    const activeCount = lis.filter(li => li.status === 'ACTIVE' || li.status === 'DELIVERING').length;

    rows.push(\`
    <tr class="order-row" onclick="toggleOrder(\${JSON.stringify(oid)})">
      <td style="text-align:center;vertical-align:middle">
        <span class="expand-icon\${isOpen?' open':''}"><i class="fas fa-chevron-right" style="font-size:9px"></i></span>
      </td>
      <td style="max-width:240px">
        <div class="fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${o.displayName||''}">\${o.displayName||o.name||'—'}</div>
        <div class="fs10 text-muted" style="margin-top:2px">\${o.advertiserId ? 'Adv: '+o.advertiserId.split('/').pop() : ''}\${liCount>0?'<span class=\\"li-count-badge\\">'+liCount+' line items</span>':''}</div>
      </td>
      <td>\${statusBadge(o.status)}</td>
      <td class="fw7" style="color:#60a5fa">\${fmtBudget(o.totalBudget)}</td>
      <td class="dim">\${fmtDate(o.startTime)}</td>
      <td class="dim">\${fmtDate(o.endTime)}</td>
      <td class="dim fs11">
        \${totalImpr > 0 ? \`<span title="Impressions" style="color:#f59e0b">\${fmtImpr(totalImpr)}</span> <span class="text-muted">/ \${fmtImpr(totalClicks)} clk</span>\` : '<span class="text-muted">No delivery</span>'}
        \${activeCount > 0 ? \`<br><span style="color:#00d68f;font-size:9px">\${activeCount} active</span>\` : ''}
      </td>
    </tr>\`);

    // ── Line Item (child) rows — only when expanded ──────────────────────────
    if (isOpen && liCount > 0) {
      // Sub-header row
      rows.push(\`
      <tr class="li-subhdr">
        <td></td>
        <td style="padding-left:38px;font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.05em">Line Item</td>
        <td style="font-size:10px;font-weight:700;color:#a78bfa">Status</td>
        <td style="font-size:10px;font-weight:700;color:#a78bfa">Type</td>
        <td style="font-size:10px;font-weight:700;color:#a78bfa">Impressions</td>
        <td style="font-size:10px;font-weight:700;color:#a78bfa">Clicks / CTR</td>
        <td style="font-size:10px;font-weight:700;color:#a78bfa">Dates</td>
      </tr>\`);

      for (const li of lis) {
        const liImpr   = parseInt(li.impressionsDelivered||'0');
        const liClicks = parseInt(li.clicksDelivered||'0');
        const liCTR    = liImpr > 0 ? (liClicks/liImpr*100).toFixed(2)+'%' : '—';
        rows.push(\`
        <tr class="li-child-row">
          <td style="text-align:center">
            <span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:rgba(167,139,250,0.18);font-size:8px;line-height:14px;text-align:center;color:#a78bfa"><i class="fas fa-minus"></i></span>
          </td>
          <td style="padding-left:38px;max-width:200px">
            <div class="fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px" title="\${li.displayName||''}">\${li.displayName||li.name||'—'}</div>
          </td>
          <td>\${statusBadge(li.status)}</td>
          <td class="dim fs10">\${li.lineItemType||'—'}</td>
          <td class="fw6 fs11" style="color:#f59e0b">\${fmtImpr(liImpr)}</td>
          <td class="fs11">\${fmtImpr(liClicks)} <span class="text-muted">(\${liCTR})</span></td>
          <td class="dim fs10">\${fmtDate(li.startTime)}\${li.endTime?' → '+fmtDate(li.endTime):''}</td>
        </tr>\`);
      }
    } else if (isOpen && liCount === 0) {
      rows.push(\`
      <tr class="li-child-row">
        <td></td>
        <td colspan="6" class="text-muted fs11" style="padding-left:38px;padding-top:8px;padding-bottom:8px">
          <i class="fas fa-info-circle" style="margin-right:4px"></i>No line items found for this order
        </td>
      </tr>\`);
    }
  }

  tbody.innerHTML = rows.join('');
}
function ordersPage(dir) {
  const pages = Math.ceil(_ordersFiltered.length / PAGE_SIZE);
  _ordersPageNum = Math.max(1, Math.min(pages, _ordersPageNum + dir));
  renderOrdersPage();
}

// ── Ad Units ─────────────────────────────────────────────────────────────────
function renderAdUnits() {
  const el = document.getElementById('adUnitsList');
  const cnt = document.getElementById('adUnitCount');
  cnt.textContent = _gamAdUnits.length + ' total';
  if (!_gamAdUnits.length) {
    el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:12px">No ad units found</div>';
    return;
  }
  el.innerHTML = _gamAdUnits.slice(0,20).map(au => {
    const isActive = !au.status || au.status === 'ACTIVE';
    return \`
    <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
      <i class="fas fa-circle" style="font-size:6px;color:\${isActive?'#00d68f':'#48486a'};flex-shrink:0"></i>
      <span class="fs12" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${au.displayName||''}">\${au.displayName||au.name||'—'}</span>
      <span class="fs10 text-muted">\${au.adUnitCode||''}</span>
      \${au.status ? \`<span class="b \${isActive?'b-green':'b-gray'}" style="font-size:9px">\${au.status}</span>\` : ''}
    </div>\`;
  }).join('') + (_gamAdUnits.length > 20 ? \`<div class="fs11 text-muted" style="text-align:center;padding:6px">+\${_gamAdUnits.length-20} more</div>\` : '');
}

// ── Revenue / Budget Analysis ────────────────────────────────────────────────
function renderRevenueAnalysis() {
  const el = document.getElementById('revenueAnalysis');
  const ordersWithBudget = _gamOrders.filter(o => o.totalBudget?.units);
  if (!ordersWithBudget.length) {
    el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:12px">No budget data available on orders</div>';
    // clear chart
    const ctx = document.getElementById('budgetChart');
    if (ctx) { ctx.getContext('2d').clearRect(0,0,ctx.width,ctx.height); }
    return;
  }

  // Group budget by status
  const byStatus = {};
  let grandTotal = 0;
  for (const o of ordersWithBudget) {
    const s = o.status || 'UNKNOWN';
    const v = parseFloat(o.totalBudget.units || '0');
    byStatus[s] = (byStatus[s] || 0) + v;
    grandTotal += v;
  }

  const cur = ordersWithBudget[0]?.totalBudget?.currencyCode || '';
  const fmtV = v => v >= 1_000_000 ? cur+' '+(v/1_000_000).toFixed(2)+'M' : v >= 1_000 ? cur+' '+(v/1_000).toFixed(1)+'K' : cur+' '+v.toFixed(0);

  const sorted = Object.entries(byStatus).sort((a,b)=>b[1]-a[1]);
  el.innerHTML = sorted.map(([st, val]) => {
    const pct = Math.round(val/grandTotal*100);
    const col = STATUS_COLOR[st] || '#48486a';
    return \`
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
        <span class="fs12">\${st}</span>
        <span class="fs12 fw7" style="color:\${col}">\${fmtV(val)} <span class="text-muted">(\${pct}%)</span></span>
      </div>
      <div class="prog-wrap"><div class="prog-fill" style="width:\${pct}%;background:\${col};border-radius:4px;height:6px;transition:width 0.6s"></div></div>
    </div>\`;
  }).join('') + \`<div class="fs11 text-muted" style="margin-top:8px;border-top:1px solid var(--border);padding-top:8px">Grand Total: <strong style="color:var(--text-primary)">\${fmtV(grandTotal)}</strong> across \${ordersWithBudget.length} orders with budget data</div>\`;

  renderBudgetChart(byStatus);
}

// ── Reports ───────────────────────────────────────────────────────────────────
function renderReports() {
  const el = document.getElementById('reportsList');
  if (!_gamReports.length) {
    el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-file-slash"></i> No saved reports found in GAM. Create reports in GAM UI → Reports to see them here.</div>';
    return;
  }
  el.innerHTML = _gamReports.map(r => {
    const rid = r.name?.split('/').pop() || '';
    return \`
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-secondary);border-radius:10px;border:1px solid var(--border)">
      <i class="fas fa-file-chart-pie" style="color:#e2007a;font-size:14px;flex-shrink:0"></i>
      <div style="flex:1;min-width:0">
        <div class="fs13 fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${r.displayName||r.name||'Unnamed Report'}</div>
        <div class="fs11 text-muted">ID: \${rid}</div>
      </div>
      <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 12px;flex-shrink:0" onclick="runGAMReport('\${rid}',\${JSON.stringify(r.displayName||r.name||'Report').replace(/"/g,'&quot;')})">
        <i class="fas fa-play" id="runIcon-\${rid}"></i>Run
      </button>
    </div>\`;
  }).join('');
}

async function runGAMReport(reportId, name) {
  const icon = document.getElementById('runIcon-' + reportId);
  if (icon) icon.className = 'fas fa-spinner fa-spin';
  const panel = document.getElementById('reportResultPanel');
  const title = document.getElementById('reportResultTitle');
  const meta  = document.getElementById('reportResultMeta');
  title.textContent = 'Running: ' + name + '…';
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  document.getElementById('reportResultTable').innerHTML = '<tr><td class="text-muted" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i> Fetching report from GAM…</td></tr>';
  meta.textContent = '';
  try {
    const res = await fetch('/api/gam/reports/' + reportId + '/run');
    const d = await res.json();
    if (icon) icon.className = 'fas fa-play';
    if (!d.ok) { document.getElementById('reportResultTable').innerHTML = '<tr><td class="text-muted" style="padding:16px">' + (d.error||'Error') + '</td></tr>'; return; }
    title.textContent = name;
    const cols = d.columnNames || [];
    const rows = d.rows || [];
    const tbl  = document.getElementById('reportResultTable');
    tbl.innerHTML = '<thead><tr>' + cols.map(c=>\`<th>\${c}</th>\`).join('') + '</tr></thead><tbody>' +
      rows.slice(0,50).map(r=>'<tr>'+cols.map(c=>\`<td>\${r[c]??'—'}</td>\`).join('')+'</tr>').join('') + '</tbody>';
    meta.textContent = rows.length + ' rows returned' + (rows.length>50?' (showing first 50)':'');
  } catch(e) {
    if (icon) icon.className = 'fas fa-play';
    document.getElementById('reportResultTable').innerHTML = '<tr><td class="text-muted" style="padding:16px">Error: ' + e.message + '</td></tr>';
  }
}

// ── Charts ─────────────────────────────────────────────────────────────────
function renderCharts(s) {
  renderOrderStatusChart(s.orders?.byStatus || {});
}

function renderOrderStatusChart(byStatus) {
  const ctx = document.getElementById('orderStatusChart');
  if (!ctx) return;
  if (_orderStatusChart) { _orderStatusChart.destroy(); _orderStatusChart = null; }
  const labels = Object.keys(byStatus);
  const values = Object.values(byStatus);
  if (!labels.length) return;
  const colors = labels.map(l => STATUS_COLOR[l] || '#48486a');
  _orderStatusChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data: values, backgroundColor: colors, borderWidth: 0, hoverOffset: 4 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '70%',
      plugins: {
        legend: { position: 'right', labels: { color: '#8080a8', font: { size: 11 }, boxWidth: 10, padding: 10 } },
        tooltip: { callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed } }
      }
    }
  });
}

function renderBudgetChart(byStatus) {
  const ctx = document.getElementById('budgetChart');
  if (!ctx) return;
  if (_budgetChart) { _budgetChart.destroy(); _budgetChart = null; }
  const labels = Object.keys(byStatus);
  const values = Object.values(byStatus);
  if (!labels.length) return;
  const colors = labels.map(l => STATUS_COLOR[l] || '#48486a');
  _budgetChart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ data: values, backgroundColor: colors, borderRadius: 6, borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + ctx.parsed.x.toLocaleString() } } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#48486a', font: { size: 10 } } },
        y: { grid: { display: false }, ticks: { color: '#8080a8', font: { size: 10 } } },
      }
    }
  });
}

// ── Export CSV ──────────────────────────────────────────────────────────────
function exportOrdersCSV() {
  const data = _ordersFiltered.length ? _ordersFiltered : _gamOrders;
  if (!data.length) return;
  const headers = ['Order Name','Status','Budget','Currency','Start','End','Advertiser ID'];
  const rows = data.map(o => [
    '"' + (o.displayName||o.name||'').replace(/"/g,'""') + '"',
    o.status || '',
    o.totalBudget?.units || '',
    o.totalBudget?.currencyCode || '',
    o.startTime ? o.startTime.slice(0,10) : '',
    o.endTime   ? o.endTime.slice(0,10)   : '',
    o.advertiserId?.split('/').pop() || '',
  ].join(','));
  const csv = [headers.join(','), ...rows].join('\\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'gam-orders.csv';
  a.click();
}

function loadGAMOrders() {
  document.getElementById('ordersTableCard')?.scrollIntoView({ behavior: 'smooth' });
}

// ── Auto-load on page render ────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGAMAnalytics);
} else {
  setTimeout(loadGAMAnalytics, 80);
}
</script>
`;
}
