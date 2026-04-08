export function revenueScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── DATA SOURCE INDICATOR ──────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.15);border-radius:9px;margin-bottom:14px;flex-wrap:wrap">
    <i class="fas fa-database" style="color:#60a5fa;font-size:10px"></i>
    <span style="font-size:11px;color:var(--text-muted);font-weight:600">DATA SOURCE</span>
    <span style="font-size:11px;color:var(--text-primary)">Google Sheets <span class="text-muted">·</span> Revenue tab</span>
    <span class="b b-gray" style="font-size:10px;margin-left:4px">Sheets</span>
    <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-circle-info" style="margin-right:4px"></i>Static data — connect Google Sheets in <a href="/apiconn" style="color:#60a5fa;text-decoration:none">API Connections</a> to sync live</span>
  </div>

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

  <!-- ── DATA SOURCE INDICATOR ──────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(66,133,244,0.07);border:1px solid rgba(66,133,244,0.15);border-radius:9px;margin-bottom:10px;flex-wrap:wrap">
    <i class="fas fa-rectangle-ad" style="color:#4285f4;font-size:10px"></i>
    <span style="font-size:11px;color:var(--text-muted);font-weight:600">DATA SOURCE</span>
    <span style="font-size:11px;color:var(--text-primary)">Google Ad Manager <span class="text-muted">·</span> Orders (as Campaigns)</span>
    <span class="b b-blue" style="font-size:10px;margin-left:4px">GAM API · Live</span>
    <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-satellite-dish" style="margin-right:4px"></i>Fetches live from GAM on page load</span>
  </div>

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

    _campOrders    = (ordRes.orders    || []).filter(o=>o.status!=='UNKNOWN'&&o.status!=='DRAFT');
    _campLineItems = (liRes.lineItems  || []).filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');
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
  // Filter out DRAFT and UNKNOWN
  const filteredEntries = Object.entries(byStatus).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  const total = filteredEntries.reduce((a,[,b])=>a+b,0)||1;
  const sorted = [...filteredEntries].sort((a,b)=>b[1]-a[1]);
  if (!sorted.length) { el.innerHTML = '<div class="text-muted fs12" style="text-align:center;padding:10px">No data</div>'; return; }
  el.innerHTML = sorted.map(([st, cnt]) => {
    const pct = Math.round(cnt/total*100);
    const col = CAMP_STATUS_COLOR[st]||'#48486a';
    return '<div><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span class="fs12">'+st+'</span><span class="fs12 fw7">'+cnt+' <span class="text-muted">('+pct+'%)</span></span></div><div class="prog-wrap"><div class="prog-fill" style="width:'+pct+'%;background:'+col+';border-radius:4px;height:6px;transition:width 0.6s"></div></div></div>';
  }).join('');

  // Doughnut chart (also filter UNKNOWN)
  const ctx = document.getElementById('campStatusChart');
  if (!ctx) return;
  if (_campStatusChart) { _campStatusChart.destroy(); _campStatusChart = null; }
  const labels = sorted.map(([l])=>l); const values = sorted.map(([,v])=>v);
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

  <!-- ── DATA SOURCE INDICATOR ───────────────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(66,133,244,0.07);border:1px solid rgba(66,133,244,0.15);border-radius:9px;margin-bottom:10px;flex-wrap:wrap">
    <i class="fas fa-rectangle-ad" style="color:#4285f4;font-size:10px"></i>
    <span style="font-size:11px;color:var(--text-muted);font-weight:600">DATA SOURCE</span>
    <span style="font-size:11px;color:var(--text-primary)">Google Ad Manager <span class="text-muted">·</span> Line Items (as Ad Performance)</span>
    <span class="b b-blue" style="font-size:10px;margin-left:4px">GAM API · Live</span>
    <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-satellite-dish" style="margin-right:4px"></i>Fetches live from GAM on page load</span>
  </div>

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

    // Filter out UNKNOWN status line items
    _adsLineItems = (liRes.lineItems || []).filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');
    _adsOrders    = ordRes.orders    || [];

    icon.className = 'fas fa-circle-check'; icon.style.color = '#00d68f';
    text.textContent = 'Connected · '+_adsLineItems.length+' line items loaded from '+(sumRes.networkName||sumRes.networkCode)+' · Fetching delivery metrics…';
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

    // Fetch delivery metrics asynchronously
    try{
      const metricsRes=await fetch('/api/gam/metrics').then(r=>r.json());
      if(metricsRes.ok&&metricsRes.lineItemMetrics){
        for(const li of _adsLineItems){
          const liNum=li.name?li.name.split('/').pop():'';
          const m=metricsRes.lineItemMetrics[liNum]||metricsRes.lineItemMetrics[li.name]||null;
          if(m){
            li.impressionsDelivered=String(m.impressions||0);
            li.clicksDelivered=String(m.clicks||0);
          }
        }
        let totalImpr=0,totalClk=0;
        for(const li of _adsLineItems){
          totalImpr+=parseInt(li.impressionsDelivered||'0');
          totalClk+=parseInt(li.clicksDelivered||'0');
        }
        const enrichedSumRes={...sumRes,lineItems:{...sumRes.lineItems,totalImpressions:totalImpr,totalClicks:totalClk}};
        renderAdsKPIs(enrichedSumRes);
        renderAdsTypeBars();
        renderAdsTopPerformers();
        renderAdsTable();
        text.textContent='Connected · '+_adsLineItems.length+' line items · Metrics updated from '+(sumRes.networkName||sumRes.networkCode)+' · Live';
      }else{
        text.textContent='Connected · '+_adsLineItems.length+' line items (metrics unavailable: '+(metricsRes.error||'unknown')+')';
      }
    }catch(me){
      text.textContent='Connected · '+_adsLineItems.length+' line items (metrics failed: '+me.message+')';
    }
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
  // Filter out DRAFT and UNKNOWN
  const filtered = Object.entries(byStatus).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  const total = filtered.reduce((a,[,b])=>a+b,0)||1;
  const sorted = [...filtered].sort((a,b)=>b[1]-a[1]);
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
    .filter(li=>parseInt(li.impressionsDelivered||'0')>0&&li.status!=='UNKNOWN')
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
    else { mS = !sf || (li.status===sf && li.status!=='UNKNOWN'); }
    const mT = !tf || li.lineItemType===tf;
    // Always exclude UNKNOWN
    return mQ && mS && mT && li.status!=='UNKNOWN';
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

  <!-- ── DATA SOURCE INDICATOR ───────────────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(66,133,244,0.07);border:1px solid rgba(66,133,244,0.15);border-radius:9px;margin-bottom:14px;flex-wrap:wrap">
    <i class="fas fa-rectangle-ad" style="color:#4285f4;font-size:10px"></i>
    <span style="font-size:11px;color:var(--text-muted);font-weight:600">DATA SOURCE</span>
    <span style="font-size:11px;color:var(--text-primary)">Google Ad Manager <span class="text-muted">·</span> Orders &amp; Line Items</span>
    <span class="b b-blue" style="font-size:10px;margin-left:4px">GAM API · Live</span>
    <span class="b b-gray" style="font-size:10px">Network: <span id="gam-ds-network" style="color:#60a5fa">—</span></span>
    <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-satellite-dish" style="margin-right:4px"></i>Real-time · Refreshes on page load</span>
  </div>

  <!-- ── STATUS BANNER ─────────────────────────────────────────────────── -->
  <div id="gamBanner" style="display:flex;align-items:center;gap:10px;background:rgba(66,133,244,0.08);border:1px solid rgba(66,133,244,0.2);border-radius:12px;padding:11px 16px;margin-bottom:16px">
    <i class="fas fa-spinner fa-spin" id="gamBannerIcon" style="color:#4285f4;font-size:14px"></i>
    <span id="gamBannerText" style="font-size:12px;color:#60a5fa;flex:1">Loading live data from Google Ad Manager…</span>
    <span id="gamLastRefresh" style="font-size:10px;color:var(--text-muted)"></span>
    <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" onclick="loadGAMAnalytics()" id="gamRefreshBtn">
      <i class="fas fa-rotate" id="gamRefreshIcon"></i>Refresh
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
      <div class="kpi-icon green"><i class="fas fa-circle-play"></i></div>
      <div class="kpi-lbl">Active / Delivering</div>
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

  <!-- ── ROW 2: STATUS OVERVIEW + DELIVERY HEALTH ──────────────────────── -->
  <div class="g62">

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

    <div style="display:flex;flex-direction:column;gap:14px">

      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-layer-group" style="color:#a78bfa;margin-right:7px"></i>Line Item Health</div>
          <span class="b b-gray fs10">Excl. Drafts</span>
        </div>
        <div id="liStatusBars" style="display:flex;flex-direction:column;gap:9px;min-height:60px">
          <div class="text-muted fs12" style="padding:10px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i> Loading…</div>
        </div>
      </div>

      <div class="card card-sm">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-trophy" style="color:#f59e0b;margin-right:7px"></i>Top Delivering Line Items</div>
          <span class="b b-gray fs10">by impr.</span>
        </div>
        <div id="gamTopLI" style="display:flex;flex-direction:column;gap:5px;min-height:50px">
          <div class="text-muted fs12" style="padding:10px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
      </div>

      <div class="card card-sm" id="networkInfoCard">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-network-wired" style="color:#00d68f;margin-right:7px"></i>Network</div>
        </div>
        <div id="networkInfoBody" style="display:flex;flex-direction:column;gap:5px">
          <div class="text-muted fs12" style="padding:8px 0;text-align:center"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
      </div>

    </div>
  </div>

  <!-- ── ROW 3: ORDERS + LINE ITEMS ─────────────────────────────────────── -->
  <div class="card" id="ordersTableCard">
    <div class="card-hd" style="flex-wrap:wrap;gap:10px">
      <div class="card-title">
        <i class="fas fa-list-check" style="color:#4285f4;margin-right:7px"></i>Orders &amp; Line Items
        <span id="ordersCountBadge" style="font-size:10px;font-weight:600;padding:2px 8px;background:rgba(66,133,244,0.12);color:#4285f4;border-radius:10px;margin-left:8px">—</span>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-left:auto">
        <div style="position:relative">
          <i class="fas fa-search" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);font-size:10px;color:var(--text-muted)"></i>
          <input id="orderSearch" type="text" placeholder="Search orders, advertiser…"
            style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 10px 5px 26px;color:var(--text-primary);font-size:11px;width:190px;outline:none"
            oninput="filterOrders(this.value)">
        </div>
        <select id="orderStatusFilter"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="filterOrders(document.getElementById('orderSearch').value)">
          <option value="ACTIVE_DELIVERING">Active &amp; Delivering</option>
          <option value="ACTIVE">Active</option>
          <option value="DELIVERING">Delivering</option>
          <option value="PAUSED">Paused</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
          <option value="">All (excl. Draft)</option>
          <option value="ALL_INCL_DRAFT">All (incl. Draft)</option>
        </select>
        <select id="orderPageSize"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="_ordersPageSize=parseInt(this.value);_ordersPageNum=1;renderOrdersPage()">
          <option value="15">15 / page</option>
          <option value="25" selected>25 / page</option>
          <option value="50">50 / page</option>
          <option value="100">100 / page</option>
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
      #ordersTable { border-collapse:collapse; width:100%; }
      #ordersTable th { white-space:nowrap; }
      .order-row { cursor:pointer; transition:background 0.1s; }
      .order-row:hover td { background:rgba(66,133,244,0.06) !important; }
      .order-row.order-expanded > td { background:rgba(66,133,244,0.04); }
      .li-child-row td { font-size:11px; background:rgba(66,133,244,0.025); }
      .li-child-row:hover td { background:rgba(167,139,250,0.07) !important; }
      .li-child-row td:nth-child(2) { padding-left:44px; }
      .expand-icon { display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:5px;background:rgba(66,133,244,0.12);color:#4285f4;font-size:9px;transition:transform 0.18s;flex-shrink:0; }
      .expand-icon.open { transform:rotate(90deg);background:rgba(66,133,244,0.25); }
      .li-count-badge { display:inline-flex;align-items:center;background:rgba(167,139,250,0.15);color:#a78bfa;font-size:9px;font-weight:700;padding:1px 7px;border-radius:10px;white-space:nowrap; }
      .li-subhdr td { background:rgba(66,133,244,0.08) !important;font-size:10px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.04em;padding-top:5px !important;padding-bottom:5px !important; }
      .li-subhdr td:nth-child(2) { padding-left:44px; }
      @keyframes liSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      .li-child-row { animation:liSlide 0.12s ease; }
      .sort-active { color:#60a5fa !important; }
      .tbl-th-sort { cursor:pointer;user-select:none; }
      .tbl-th-sort:hover { color:#d0d0e8; }
    </style>

    <div id="ordersTableWrap" style="overflow-x:auto;margin-top:2px">
      <table class="tbl" id="ordersTable">
        <thead>
          <tr>
            <th style="width:36px"></th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('displayName')" id="th-displayName">Order Name <i class="fas fa-sort" id="si-displayName" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('advertiserId')" id="th-advertiserId">Advertiser <i class="fas fa-sort" id="si-advertiserId" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('status')" id="th-status">Status <i class="fas fa-sort" id="si-status" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('startTime')" id="th-startTime">Start <i class="fas fa-sort" id="si-startTime" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('endTime')" id="th-endTime">End <i class="fas fa-sort" id="si-endTime" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('totalBudget')" id="th-totalBudget">Budget <i class="fas fa-sort" id="si-totalBudget" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th>Line Items</th>
            <th class="tbl-th-sort" onclick="sortOrdersBy('impressions')" id="th-impressions">Impressions <i class="fas fa-sort" id="si-impressions" style="opacity:0.35;font-size:9px;margin-left:3px"></i></th>
            <th>Clicks / CTR</th>
          </tr>
        </thead>
        <tbody id="ordersTbody">
          <tr><td colspan="10" class="text-muted" style="text-align:center;padding:32px">
            <i class="fas fa-spinner fa-spin" style="font-size:18px"></i>
            <br><span style="font-size:11px;display:block;margin-top:8px">Loading orders from Google Ad Manager…</span>
          </td></tr>
        </tbody>
      </table>
    </div>

    <div id="ordersPagination" style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
      <span class="fs11 text-muted" id="ordersCount">—</span>
      <div style="display:flex;gap:6px;align-items:center">
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="ordersPrevBtn" onclick="ordersPage(-1)" disabled>← Prev</button>
        <span class="fs11 text-muted" id="ordersPageLabel" style="padding:0 6px;line-height:26px;min-width:80px;text-align:center">Page 1 / 1</span>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="ordersNextBtn" onclick="ordersPage(1)">Next →</button>
      </div>
    </div>
  </div>

</div>

<script>
// ── State ──────────────────────────────────────────────────────────────────
let _gamOrders      = [];
let _gamLineItems   = [];
let _gamNetwork     = null;
let _ordersFiltered = [];
let _ordersPageNum  = 1;
let _ordersPageSize = 25;
let _ordersSortKey  = 'status';
let _ordersSortAsc  = true;
let _orderStatusChart = null;
let _expandedOrders = new Set();
let _allExpanded    = false;
let _orderMetaCache = {};

// ── Utilities ──────────────────────────────────────────────────────────────
function fmtImpr(n) {
  n = parseInt(n)||0;
  if(n>=1_000_000_000) return (n/1_000_000_000).toFixed(1)+'B';
  if(n>=1_000_000)     return (n/1_000_000).toFixed(1)+'M';
  if(n>=1_000)         return (n/1_000).toFixed(1)+'K';
  return n===0?'—':n.toLocaleString();
}
function fmtDateShort(s){
  if(!s) return '—';
  try{ const d=new Date(s); return d.toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'2-digit'}); }catch{ return s.slice(0,10); }
}
function fmtBudget(b){
  if(!b) return '—';
  const u=parseFloat(b.units||'0'); if(u===0) return '—';
  const c=b.currencyCode||'';
  if(u>=1_000_000) return c+'\u00a0'+(u/1_000_000).toFixed(2)+'M';
  if(u>=1_000)     return c+'\u00a0'+(u/1_000).toFixed(1)+'K';
  return c+'\u00a0'+u.toFixed(0);
}
function advShort(id){ if(!id) return '—'; const n=id.split('/').pop(); return n?'#'+n:id; }
const STATUS_COLOR={ACTIVE:'#00d68f',DELIVERING:'#00c07f',COMPLETED:'#60a5fa',PAUSED:'#f59e0b',CANCELED:'#f43f5e',DRAFT:'#8080a8',PENDING_APPROVAL:'#a78bfa',UNKNOWN:'#48486a'};
const STATUS_BADGE={ACTIVE:'b-green',DELIVERING:'b-green',COMPLETED:'b-blue',PAUSED:'b-amber',CANCELED:'b-red',DRAFT:'b-gray',PENDING_APPROVAL:'b-purple',UNKNOWN:'b-gray'};
function statusBadge(s){
  const cls=STATUS_BADGE[s]||'b-gray';
  const lbl=(s||'UNKNOWN').replace(/_/g,'\u00a0');
  return \`<span class="b \${cls}" style="font-size:9px;white-space:nowrap">\${lbl}</span>\`;
}

// ── Main Loader ────────────────────────────────────────────────────────────
async function loadGAMAnalytics(){
  const icon=document.getElementById('gamBannerIcon');
  const txt=document.getElementById('gamBannerText');
  const ri=document.getElementById('gamRefreshIcon');
  const banner=document.getElementById('gamBanner');
  icon.className='fas fa-spinner fa-spin'; icon.style.color='#4285f4';
  txt.textContent='Loading live data from Google Ad Manager…'; txt.style.color='#60a5fa';
  banner.style.background='rgba(66,133,244,0.08)'; banner.style.borderColor='rgba(66,133,244,0.2)';
  if(ri) ri.className='fas fa-spinner fa-spin';
  const tb=document.getElementById('ordersTbody');
  if(tb) tb.innerHTML='<tr><td colspan="10" class="text-muted" style="text-align:center;padding:32px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i><br><span style="font-size:11px;display:block;margin-top:8px">Fetching orders…</span></td></tr>';

  try{
    const [sumRes,ordRes,liRes]=await Promise.all([
      fetch('/api/gam/summary').then(r=>r.json()),
      fetch('/api/gam/orders?pageSize=500').then(r=>r.json()),
      fetch('/api/gam/lineitems?pageSize=500').then(r=>r.json()),
    ]);
    if(!sumRes.ok){
      const em=sumRes.error||'Unknown error. Set up GAM in API Connections.';
      icon.className='fas fa-triangle-exclamation'; icon.style.color='#f59e0b';
      txt.textContent='GAM not connected — '+em; txt.style.color='#f59e0b';
      banner.style.background='rgba(245,158,11,0.07)'; banner.style.borderColor='rgba(245,158,11,0.2)';
      const noConf='<div class="text-muted fs12" style="padding:14px 0;text-align:center"><i class="fas fa-plug" style="color:#f59e0b;margin-right:6px"></i>GAM not configured — <a href="#" onclick="navigate(\'api\')" style="color:#60a5fa">Set up in API Connections</a></div>';
      ['ordersTbody','gamTopLI','orderStatusBars','liStatusBars','networkInfoBody'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=noConf;});
      if(ri) ri.className='fas fa-rotate';
      return;
    }

    // Filter out UNKNOWN and DRAFT status line items and orders
    const rawOrders=(ordRes.ok?ordRes.orders:[])||[];
    const rawLineItems=(liRes.ok?liRes.lineItems:[])||[];
    _gamOrders   = rawOrders.filter(o=>o.status!=='UNKNOWN'&&o.status!=='DRAFT');
    _gamLineItems= rawLineItems.filter(li=>li.status!=='UNKNOWN'&&li.status!=='DRAFT');

    _gamNetwork  =sumRes;
    _orderMetaCache={};
    _buildOrderMetaCache();
    const now=new Date().toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'});
    icon.className='fas fa-circle-check'; icon.style.color='#00d68f';
    txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders · '+_gamLineItems.length+' line items · Fetching delivery metrics…';
    txt.style.color='#00d68f';
    banner.style.background='rgba(0,214,143,0.06)'; banner.style.borderColor='rgba(0,214,143,0.18)';
    const lr=document.getElementById('gamLastRefresh'); if(lr) lr.textContent='Last refresh: '+now;
    if(ri) ri.className='fas fa-rotate';

    // Render initial view immediately with structural data
    renderKPIs(sumRes);
    renderOrderStatusBars(sumRes.orders?.byStatus||{});
    renderLIStatusBars(sumRes.lineItems?.byStatus||{});
    renderNetworkInfo(sumRes);
    renderTopLI();
    renderOrdersTable();
    renderCharts(sumRes);

    // Now fetch delivery metrics asynchronously (via Reports API — takes ~10-30s)
    // This enriches the table with real impressions/clicks without blocking the UI
    txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · Fetching delivery metrics (this may take 15-30s)…';
    try{
      const metricsRes=await fetch('/api/gam/metrics').then(r=>r.json());
      if(metricsRes.ok&&metricsRes.lineItemMetrics){
        // Merge metrics into _gamLineItems by line item numeric ID
        for(const li of _gamLineItems){
          const liNum=li.name?li.name.split('/').pop():'';
          const m=metricsRes.lineItemMetrics[liNum]||metricsRes.lineItemMetrics[li.name]||null;
          if(m){
            li.impressionsDelivered=String(m.impressions||0);
            li.clicksDelivered=String(m.clicks||0);
          }
        }
        // Rebuild meta cache with real data
        _orderMetaCache={};
        _buildOrderMetaCache();
        // Update KPIs with real metrics totals
        let totalImpr=0,totalClk=0;
        for(const li of _gamLineItems){
          totalImpr+=parseInt(li.impressionsDelivered||'0');
          totalClk+=parseInt(li.clicksDelivered||'0');
        }
        const enrichedSumRes={...sumRes,lineItems:{...sumRes.lineItems,totalImpressions:totalImpr,totalClicks:totalClk}};
        renderKPIs(enrichedSumRes);
        renderTopLI();
        renderOrdersPage(); // re-render table with metrics
        txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders · '+_gamLineItems.length+' line items · Metrics updated';
      }else{
        txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders (metrics unavailable: '+(metricsRes.error||'unknown')+')';
        icon.className='fas fa-circle-exclamation'; icon.style.color='#f59e0b';
      }
    }catch(me){
      // Metrics fetch failed — still show structural data
      txt.textContent='Connected to '+(sumRes.networkName||sumRes.networkCode)+' · '+_gamOrders.length+' orders (delivery metrics failed: '+me.message+')';
      icon.className='fas fa-circle-exclamation'; icon.style.color='#f59e0b';
    }
  }catch(e){
    icon.className='fas fa-circle-xmark'; icon.style.color='#f43f5e';
    txt.textContent='Failed to load GAM data: '+e.message; txt.style.color='#f43f5e';
    banner.style.background='rgba(244,63,94,0.07)'; banner.style.borderColor='rgba(244,63,94,0.2)';
    if(ri) ri.className='fas fa-rotate';
  }
}

// ── Build per-order metrics cache ──────────────────────────────────────────
function _buildOrderMetaCache(){
  const map={};
  for(const li of _gamLineItems){
    // Skip UNKNOWN/DRAFT line items
    if(li.status==='UNKNOWN'||li.status==='DRAFT') continue;
    const oid=li.orderId||(li.name?li.name.split('/lineItems/')[0]:'');
    if(!oid) continue;
    if(!map[oid]) map[oid]={impr:0,clicks:0,lis:[],activeCount:0};
    const im=parseInt(li.impressionsDelivered||'0');
    const cl=parseInt(li.clicksDelivered||'0');
    map[oid].impr+=im; map[oid].clicks+=cl; map[oid].lis.push(li);
    if(li.status==='ACTIVE'||li.status==='DELIVERING') map[oid].activeCount++;
  }
  for(const key of Object.keys(map)){
    const num=key.split('/').pop();
    if(num&&num!==key) map[num]=map[key];
  }
  _orderMetaCache=map;
}
function _getOrderMeta(o){
  const oid=o.name||o.id||'';
  const num=oid.split('/').pop();
  return _orderMetaCache[oid]||_orderMetaCache[num]||{impr:0,clicks:0,lis:[],activeCount:0};
}

// ── KPIs ───────────────────────────────────────────────────────────────────
function renderKPIs(s){
  const tot=s.orders?.total||0;
  const act=(s.orders?.byStatus?.ACTIVE||0)+(s.orders?.byStatus?.DELIVERING||0);
  const impr=s.lineItems?.totalImpressions||0;
  const li=s.lineItems?.total||0;
  const ali=(s.lineItems?.byStatus?.ACTIVE||0)+(s.lineItems?.byStatus?.DELIVERING||0);
  const clk=s.lineItems?.totalClicks||0;
  const ctr=impr>0?(clk/impr*100).toFixed(2)+'%':'—';
  document.getElementById('kv-orders').textContent=tot.toLocaleString();
  document.getElementById('kc-orders').innerHTML='<span class="text-muted">'+li+' line items total</span>';
  document.getElementById('kv-active').textContent=act.toLocaleString();
  document.getElementById('kc-active').innerHTML='<span class="up"><i class="fas fa-circle" style="font-size:7px;margin-right:4px;color:#00d68f"></i>'+ali+' active LIs</span>';
  document.getElementById('kv-impr').innerHTML=fmtImpr(impr);
  document.getElementById('kc-impr').innerHTML='<span class="text-muted">'+fmtImpr(clk)+' clicks · '+ctr+' CTR</span>';
  document.getElementById('kv-li').textContent=li.toLocaleString();
  document.getElementById('kc-li').innerHTML='<span class="up">'+ali+' active</span>';
}

// ── Order Status Bars ──────────────────────────────────────────────────────
function renderOrderStatusBars(by){
  const el=document.getElementById('orderStatusBars');
  const order=['ACTIVE','DELIVERING','PAUSED','COMPLETED','CANCELED','PENDING_APPROVAL','UNKNOWN'];
  const all=Object.entries(by).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  const tot=all.reduce((a,[,v])=>a+v,0)||1;
  all.sort((a,b)=>{const ia=order.indexOf(a[0]),ib=order.indexOf(b[0]);if(ia!==-1&&ib!==-1)return ia-ib;if(ia!==-1)return -1;if(ib!==-1)return 1;return b[1]-a[1];});
  if(!all.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:16px">No order data</div>';return;}
  el.innerHTML=all.map(([st,cnt])=>{
    const pct=Math.round(cnt/tot*100);
    const col=STATUS_COLOR[st]||'#48486a';
    return \`<div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
        <span class="fs12" style="display:flex;align-items:center;gap:5px">
          <span style="width:8px;height:8px;border-radius:50%;background:\${col};display:inline-block"></span>
          \${st.replace(/_/g,' ')}
        </span>
        <span class="fs12 fw7">\${cnt} <span class="text-muted">(\${pct}%)</span></span>
      </div>
      <div class="prog-wrap"><div class="prog-fill" style="width:\${pct}%;background:\${col};border-radius:4px;height:6px;transition:width 0.6s"></div></div>
    </div>\`;
  }).join('');
}

// ── LI Status Bars ─────────────────────────────────────────────────────────
function renderLIStatusBars(by){
  const el=document.getElementById('liStatusBars');
  const filt=Object.entries(by).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  const tot=filt.reduce((a,[,v])=>a+v,0)||1;
  const srt=[...filt].sort((a,b)=>b[1]-a[1]).slice(0,7);
  if(!srt.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:10px">No line item data</div>';return;}
  el.innerHTML=srt.map(([st,cnt])=>{
    const pct=Math.round(cnt/tot*100);
    const col=STATUS_COLOR[st]||'#48486a';
    return \`<div style="display:flex;align-items:center;gap:8px">
      <span class="fs11 text-muted" style="width:90px;flex-shrink:0">\${st.replace(/_/g,' ')}</span>
      <div class="prog-wrap" style="flex:1"><div class="prog-fill" style="width:\${pct}%;background:\${col};border-radius:3px;height:5px"></div></div>
      <span class="fs11 fw7" style="width:32px;text-align:right">\${cnt}</span>
    </div>\`;
  }).join('');
}

// ── Network Info ───────────────────────────────────────────────────────────
function renderNetworkInfo(s){
  const b=document.getElementById('networkStatusBadge');
  if(b){b.textContent='Live';b.className='b b-green';}
  const dn=document.getElementById('gam-ds-network');
  if(dn) dn.textContent=s.networkName||s.networkCode||'—';
  const body=document.getElementById('networkInfoBody');
  if(!body) return;
  body.innerHTML=[
    ['Network',s.networkName||s.networkCode||'—'],
    ['Code',s.networkCode||'—'],
    ['Currency',s.currency||'—'],
    ['Time Zone',s.timeZone||'—'],
    ['Orders',(s.orders?.total||0)+' total'],
    ['Line Items',(s.lineItems?.total||0)+' total'],
  ].map(([k,v])=>\`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
    <span class="fs12 text-muted">\${k}</span><span class="fs12 fw6">\${v}</span>
  </div>\`).join('');
}

// ── Top Delivering LIs ──────────────────────────────────────────────────────
function renderTopLI(){
  const el=document.getElementById('gamTopLI');
  if(!el) return;
  const act=_gamLineItems
    .filter(li=>(li.status==='ACTIVE'||li.status==='DELIVERING')&&li.status!=='UNKNOWN'&&parseInt(li.impressionsDelivered||'0')>0)
    .sort((a,b)=>parseInt(b.impressionsDelivered||'0')-parseInt(a.impressionsDelivered||'0'))
    .slice(0,6);
  if(!act.length){el.innerHTML='<div class="text-muted fs12" style="text-align:center;padding:12px 0">No active deliveries</div>';return;}
  const mx=parseInt(act[0].impressionsDelivered||'0')||1;
  el.innerHTML=act.map((li,i)=>{
    const im=parseInt(li.impressionsDelivered||'0');
    const cl=parseInt(li.clicksDelivered||'0');
    const ctr=im>0?(cl/im*100).toFixed(2)+'%':'—';
    const pct=Math.round(im/mx*100);
    const nm=li.displayName||li.name||'—';
    return '<div style="padding:5px 0;border-bottom:1px solid var(--border)">'+
      '<div style="display:flex;align-items:center;gap:7px;margin-bottom:3px">'+
        '<span style="min-width:16px;height:16px;border-radius:50%;background:rgba(0,214,143,0.15);display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00d68f">'+(i+1)+'</span>'+
        '<div style="flex:1;min-width:0"><div class="fs11 fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+nm+'">'+nm+'</div></div>'+
        '<span class="b b-green" style="font-size:9px;flex-shrink:0">LIVE</span>'+
      '</div>'+
      '<div style="display:flex;align-items:center;gap:8px;padding-left:23px">'+
        '<div style="flex:1;height:3px;background:rgba(66,133,244,0.12);border-radius:2px">'+
          '<div style="width:'+pct+'%;height:3px;background:#4285f4;border-radius:2px;transition:width 0.5s"></div>'+
        '</div>'+
        '<span class="fs10 text-muted" style="white-space:nowrap">'+fmtImpr(im)+' impr · '+ctr+'</span>'+
      '</div>'+
    '</div>';
  }).join('');
}

// ── Charts ─────────────────────────────────────────────────────────────────
function renderCharts(s){ renderOrderStatusChart(s.orders?.byStatus||{}); }
function renderOrderStatusChart(by){
  const ctx=document.getElementById('orderStatusChart');
  if(!ctx) return;
  if(_orderStatusChart){_orderStatusChart.destroy();_orderStatusChart=null;}
  const ent=Object.entries(by).filter(([s])=>s!=='DRAFT'&&s!=='UNKNOWN');
  if(!ent.length) return;
  const labels=ent.map(([l])=>l.replace(/_/g,' '));
  const values=ent.map(([,v])=>v);
  const colors=ent.map(([l])=>STATUS_COLOR[l]||'#48486a');
  _orderStatusChart=new Chart(ctx,{
    type:'doughnut',
    data:{labels,datasets:[{data:values,backgroundColor:colors,borderWidth:0,hoverOffset:4}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'68%',
      plugins:{
        legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:10,padding:8}},
        tooltip:{callbacks:{label:c=>' '+c.label+': '+c.parsed}}
      }
    }
  });
}

// ── Orders Table ───────────────────────────────────────────────────────────
function renderOrdersTable(){
  const sel=document.getElementById('orderStatusFilter');
  if(sel) sel.value='ACTIVE_DELIVERING';
  _ordersFiltered=[..._gamOrders];
  filterOrders('');
}

function filterOrders(query){
  const sf=document.getElementById('orderStatusFilter').value;
  const q=(query||'').toLowerCase().trim();
  _ordersFiltered=_gamOrders.filter(o=>{
    const mq=!q||(o.displayName||'').toLowerCase().includes(q)||(o.name||'').toLowerCase().includes(q)||(o.advertiserId||'').toLowerCase().includes(q);
    let ms;
    if(sf==='ACTIVE_DELIVERING') ms=o.status==='ACTIVE'||o.status==='DELIVERING';
    else if(sf==='ALL_INCL_DRAFT') ms=true;
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
    if(va<vb) return _ordersSortAsc?-1:1;
    if(va>vb) return _ordersSortAsc?1:-1;
    return 0;
  });
  _ordersPageNum=1;
  _updateSortIcons();
  renderOrdersPage();
}

function _updateSortIcons(){
  const keys=['displayName','advertiserId','status','startTime','endTime','totalBudget','impressions'];
  for(const k of keys){
    const ic=document.getElementById('si-'+k);
    const th=document.getElementById('th-'+k);
    if(!ic||!th) continue;
    if(k===_ordersSortKey){
      ic.className=_ordersSortAsc?'fas fa-sort-up':'fas fa-sort-down';
      ic.style.opacity='0.9';ic.style.color='#60a5fa';
      th.classList.add('sort-active');
    }else{
      ic.className='fas fa-sort';ic.style.opacity='0.35';ic.style.color='';
      th.classList.remove('sort-active');
    }
  }
}

function sortOrdersBy(key){
  if(_ordersSortKey===key) _ordersSortAsc=!_ordersSortAsc;
  else{_ordersSortKey=key;_ordersSortAsc=true;}
  filterOrders(document.getElementById('orderSearch')?.value||'');
}

function toggleOrder(oid){
  if(_expandedOrders.has(oid)) _expandedOrders.delete(oid);
  else _expandedOrders.add(oid);
  renderOrdersPage();
}

function toggleExpandAll(){
  _allExpanded=!_allExpanded;
  const btn=document.getElementById('expandAllBtn');
  if(_allExpanded){
    _expandedOrders=new Set(_ordersFiltered.map(o=>o.name||o.id||o.displayName));
    if(btn) btn.innerHTML='<i class="fas fa-compress-alt"></i>Collapse All';
  }else{
    _expandedOrders.clear();
    if(btn) btn.innerHTML='<i class="fas fa-expand-alt"></i>Expand All';
  }
  renderOrdersPage();
}

function renderOrdersPage(){
  const tbody=document.getElementById('ordersTbody');
  const start=(_ordersPageNum-1)*_ordersPageSize;
  const page=_ordersFiltered.slice(start,start+_ordersPageSize);
  const total=_ordersFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_ordersPageSize));
  const cb=document.getElementById('ordersCountBadge');
  if(cb) cb.textContent=total+' orders'+(total!==_gamOrders.length?' of '+_gamOrders.length:'');
  document.getElementById('ordersCount').textContent=(start+1)+'–'+Math.min(start+_ordersPageSize,total)+' of '+total.toLocaleString()+' orders';
  document.getElementById('ordersPageLabel').textContent='Page '+_ordersPageNum+' / '+pages;
  document.getElementById('ordersPrevBtn').disabled=_ordersPageNum<=1;
  document.getElementById('ordersNextBtn').disabled=_ordersPageNum>=pages;
  if(!page.length){
    tbody.innerHTML='<tr><td colspan="10" class="text-muted" style="text-align:center;padding:28px"><i class="fas fa-filter" style="margin-right:6px"></i>No orders match the current filter</td></tr>';
    return;
  }
  const rows=[];
  for(const o of page){
    const oid=o.name||o.id||o.displayName;
    const isOpen=_expandedOrders.has(oid);
    const meta=_getOrderMeta(o);
    const lis=meta.lis||[];
    const liCount=lis.length;
    const ctr=meta.impr>0?(meta.clicks/meta.impr*100).toFixed(2)+'%':'—';
    const adv=advShort(o.advertiserId);
    rows.push(\`
    <tr class="order-row\${isOpen?' order-expanded':''}" onclick="toggleOrder(\${JSON.stringify(oid)})">
      <td style="text-align:center;vertical-align:middle;padding:8px 4px">
        <span class="expand-icon\${isOpen?' open':''}"><i class="fas fa-chevron-right" style="font-size:8px"></i></span>
      </td>
      <td style="max-width:220px;padding:8px 10px">
        <div class="fw6 fs12" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${o.displayName||''}">\${o.displayName||o.name||'—'}</div>
        <div class="fs10 text-muted">\${oid?oid.split('/').pop():''}</div>
      </td>
      <td class="fs11 text-muted" style="max-width:100px">
        <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${o.advertiserId||''}">\${adv}</div>
      </td>
      <td>\${statusBadge(o.status)}</td>
      <td class="dim fs11">\${fmtDateShort(o.startTime)}</td>
      <td class="dim fs11">\${fmtDateShort(o.endTime)}</td>
      <td class="fw6 fs11" style="color:#60a5fa;white-space:nowrap">\${fmtBudget(o.totalBudget)}</td>
      <td>
        \${liCount>0
          ? '<span class="li-count-badge">'+liCount+'</span>'+(meta.activeCount>0?'<span style="font-size:9px;color:#00d68f;display:block;margin-top:2px">'+meta.activeCount+' active</span>':'')
          : '<span class="text-muted fs11">—</span>'}
      </td>
      <td class="fw6 fs11" style="color:\${meta.impr>0?'#f59e0b':'var(--text-muted)'}">
        \${fmtImpr(meta.impr)}
      </td>
      <td class="fs11" style="white-space:nowrap">
        \${meta.impr>0?fmtImpr(meta.clicks)+' <span class="text-muted">('+ctr+')</span>':'<span class="text-muted">—</span>'}
      </td>
    </tr>\`);

    if(isOpen){
      if(liCount>0){
        rows.push(\`
        <tr class="li-subhdr">
          <td></td>
          <td>Line Item Name</td><td>Advertiser</td><td>Status</td>
          <td>Start</td><td>End</td><td>Budget</td><td>Type</td>
          <td>Impressions</td><td>Clicks / CTR</td>
        </tr>\`);
        const slis=[...lis].filter(li=>li.status!=='UNKNOWN').sort((a,b)=>{
          const aa=a.status==='ACTIVE'||a.status==='DELIVERING'?1:0;
          const ba=b.status==='ACTIVE'||b.status==='DELIVERING'?1:0;
          if(ba!==aa) return ba-aa;
          return parseInt(b.impressionsDelivered||'0')-parseInt(a.impressionsDelivered||'0');
        });
        for(const li of slis){
          const lim=parseInt(li.impressionsDelivered||'0');
          const lcl=parseInt(li.clicksDelivered||'0');
          const lctr=lim>0?(lcl/lim*100).toFixed(2)+'%':'—';
          const ladv=advShort(li.advertiserId||o.advertiserId);
          const ltyp=(li.lineItemType||'—').replace(/_/g,' ');
          rows.push(\`
          <tr class="li-child-row">
            <td style="text-align:center;vertical-align:middle">
              <span style="display:inline-flex;width:16px;height:16px;border-radius:4px;background:rgba(167,139,250,0.14);align-items:center;justify-content:center;font-size:8px;color:#a78bfa"><i class="fas fa-minus"></i></span>
            </td>
            <td style="padding:6px 10px 6px 44px;max-width:200px">
              <div class="fw6" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11.5px" title="\${li.displayName||''}">\${li.displayName||li.name||'—'}</div>
              <div class="fs10 text-muted">\${li.name?li.name.split('/').pop():''}</div>
            </td>
            <td class="fs11 text-muted">\${ladv}</td>
            <td>\${statusBadge(li.status)}</td>
            <td class="dim fs10">\${fmtDateShort(li.startTime)}</td>
            <td class="dim fs10">\${fmtDateShort(li.endTime)}</td>
            <td class="fs10" style="color:#60a5fa">\${fmtBudget(li.budget)}</td>
            <td class="fs10 text-muted" style="white-space:nowrap">\${ltyp}</td>
            <td class="fw6 fs11" style="color:\${lim>0?'#f59e0b':'var(--text-muted)'}">
              \${fmtImpr(lim)}
            </td>
            <td class="fs11" style="white-space:nowrap">
              \${lim>0?fmtImpr(lcl)+' <span class="text-muted">('+lctr+')</span>':'<span class="text-muted">—</span>'}
            </td>
          </tr>\`);
        }
      }else{
        rows.push(\`
        <tr class="li-child-row">
          <td></td>
          <td colspan="9" class="text-muted fs11" style="padding-left:44px;padding-top:8px;padding-bottom:8px">
            <i class="fas fa-circle-info" style="margin-right:5px;color:#60a5fa"></i>No line items found for this order
          </td>
        </tr>\`);
      }
    }
  }
  tbody.innerHTML=rows.join('');
}

function ordersPage(dir){
  const pages=Math.max(1,Math.ceil(_ordersFiltered.length/_ordersPageSize));
  _ordersPageNum=Math.max(1,Math.min(pages,_ordersPageNum+dir));
  renderOrdersPage();
}

// ── CSV Export ─────────────────────────────────────────────────────────────
function exportOrdersCSV(){
  const data=_ordersFiltered.length?_ordersFiltered:_gamOrders;
  if(!data.length) return;
  const esc=s=>'"'+String(s||'').replace(/"/g,'""')+'"';
  const hdrs=['Order ID','Order Name','Advertiser ID','Status','Budget Currency','Budget Amount','Start','End','Line Items','Impressions','Clicks','CTR'];
  const rows=data.map(o=>{
    const m=_getOrderMeta(o);
    const ctr=m.impr>0?(m.clicks/m.impr*100).toFixed(2)+'%':'';
    return [esc(o.name?o.name.split('/').pop():''),esc(o.displayName||o.name||''),esc(o.advertiserId?o.advertiserId.split('/').pop():''),esc(o.status||''),esc(o.totalBudget?.currencyCode||''),esc(o.totalBudget?.units||''),esc(o.startTime?o.startTime.slice(0,10):''),esc(o.endTime?o.endTime.slice(0,10):''),m.lis.length,m.impr,m.clicks,esc(ctr)].join(',');
  });
  const csv=[hdrs.join(','),...rows].join('\n');
  const a=document.createElement('a');
  a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download='gam-orders-'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
}

// ── Auto-load ──────────────────────────────────────────────────────────────
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',loadGAMAnalytics);
}else{
  setTimeout(loadGAMAnalytics,80);
}
</script>
`;
}

