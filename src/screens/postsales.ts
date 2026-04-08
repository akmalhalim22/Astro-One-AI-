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

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-megaphone"></i></div>
      <div class="kpi-lbl">Active Campaigns</div>
      <div class="kpi-val">24</div>
      <div class="kpi-chg up">+4 vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">Campaign Revenue</div>
      <div class="kpi-val">RM 38.6<sup>M</sup></div>
      <div class="kpi-chg up">+14% vs Q1 LY</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Avg Campaign ROI</div>
      <div class="kpi-val">4.2<sup>×</sup></div>
      <div class="kpi-chg up">+0.6 vs last quarter</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-eye"></i></div>
      <div class="kpi-lbl">Total Impressions</div>
      <div class="kpi-val">482<sup>M</sup></div>
      <div class="kpi-chg up">+22% MoM</div>
    </div>
  </div>

  <!-- ── CHART + TYPE BREAKDOWN ───────────────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Campaign Revenue Trend</div>
        <span class="card-action">Export →</span>
      </div>
      <div class="ch" style="height:170px"><canvas id="campRevChart"></canvas></div>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Revenue by Campaign Type</div></div>
      ${[
        ['Brand Awareness', 'RM 12.4M','pf-pink',  32],
        ['Direct Response', 'RM 9.8M', 'pf-blue',  25],
        ['Seasonal / Promo','RM 8.6M', 'pf-amber', 22],
        ['Retargeting',     'RM 4.4M', 'pf-green', 11],
        ['Content Seeding', 'RM 3.4M', 'pf-purple',  9],
      ].map(([l,v,f,p]) => `
      <div style="margin-bottom:12px">
        <div class="flex justify-between" style="margin-bottom:5px">
          <span class="fs12 text-sec">${l}</span>
          <span class="fs12 fw7">${v} <span class="text-muted">(${p}%)</span></span>
        </div>
        <div class="prog-wrap"><div class="prog-fill ${f}" style="width:${p*3}%"></div></div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ── CAMPAIGNS TABLE ──────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title">Active Campaigns — Q1 2025</div>
      <div style="display:flex;gap:8px">
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px"><i class="fas fa-sliders"></i>Filter</button>
        <span class="card-action">All 24 →</span>
      </div>
    </div>
    <table class="tbl">
      <thead>
        <tr><th>Campaign</th><th>Client</th><th>Type</th><th>Revenue</th><th>Impressions</th><th>CTR</th><th>ROI</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${[
          ['Raya 2025 Digital',    'Celcom',  'Seasonal','RM 4.2M','82M', '4.8%','5.2×','b-green'],
          ['Maxis Always On',      'Maxis',   'Brand',   'RM 3.8M','64M', '3.9%','4.4×','b-green'],
          ['Petronas Vision 25',   'Petronas','Brand',   'RM 3.1M','48M', '3.2%','3.8×','b-green'],
          ['CIMB Q1 DR',           'CIMB',    'Direct',  'RM 2.6M','31M', '5.1%','4.1×','b-amber'],
          ['TNB Green Campaign',   'TNB',     'Awareness','RM 2.1M','28M','2.8%','2.9×','b-amber'],
          ['Digi Raya Push',       'Digi',    'Seasonal','RM 1.9M','22M', '4.2%','3.2×','b-amber'],
          ['RHB Retarget Q1',      'RHB',     'Retarget','RM 1.4M','14M', '6.2%','5.8×','b-green'],
          ['Watsons Beauty Week',  'Watsons', 'Promo',   'RM 1.1M','18M', '3.4%','2.1×','b-red'],
        ].map(([c,cl,t,r,im,ct,roi,b]) => `
        <tr>
          <td class="fw6">${c}</td>
          <td class="dim">${cl}</td>
          <td><span class="b b-gray" style="font-size:10px">${t}</span></td>
          <td class="text-pink fw7">${r}</td>
          <td class="dim">${im}</td>
          <td class="fw6">${ct}</td>
          <td class="fw7 ${b === 'b-green' ? 'text-green' : b === 'b-red' ? 'text-red' : 'text-amber'}">${roi}</td>
          <td><span class="b ${b}">${b === 'b-green' ? 'On Track' : b === 'b-red' ? 'Underperform' : 'Watch'}</span></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

</div>`;
}


export function adsScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Total Ad Spend</div>
      <div class="kpi-val">RM 2.8<sup>M</sup></div>
      <div class="kpi-chg up">Mar MTD · 3 platforms</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-chart-line"></i></div>
      <div class="kpi-lbl">Blended ROAS</div>
      <div class="kpi-val">3.4<sup>×</sup></div>
      <div class="kpi-chg up">+0.4 vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-eye"></i></div>
      <div class="kpi-lbl">Total Impressions</div>
      <div class="kpi-val">39.1<sup>M</sup></div>
      <div class="kpi-chg up">+11% MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-arrow-pointer"></i></div>
      <div class="kpi-lbl">Blended CTR</div>
      <div class="kpi-val">4.2<sup>%</sup></div>
      <div class="kpi-chg down">−0.2pp vs last month</div>
    </div>
  </div>

  <!-- ── PLATFORM TABS ─────────────────────────────────────────── -->
  <div class="tabs" id="adsTabs">
    <div class="tab active" onclick="switchAdTab('all',this)">All Platforms</div>
    <div class="tab" onclick="switchAdTab('gam',this)">
      <i class="fab fa-google" style="margin-right:5px;color:#4285f4"></i>Google Ads
    </div>
    <div class="tab" onclick="switchAdTab('meta',this)">
      <i class="fab fa-meta" style="margin-right:5px;color:#1877f2"></i>Meta
    </div>
    <div class="tab" onclick="switchAdTab('tiktok',this)">
      <i class="fab fa-tiktok" style="margin-right:5px;color:#ff0050"></i>TikTok
    </div>
  </div>

  <!-- ── 3 PLATFORM CARDS ─────────────────────────────────────── -->
  <div class="g3">

    <!-- Google Ads -->
    <div class="card" style="border-left:3px solid #4285f4">
      <div class="platform-card-hd">
        <div class="platform-icon" style="background:rgba(66,133,244,0.15);color:#4285f4">
          <i class="fab fa-google"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="fw7 fs13">Google Ads Manager</div>
          <div class="fs11 text-muted">Search · Display · YouTube</div>
        </div>
        <span class="b b-green" style="font-size:9px">Live</span>
      </div>
      ${[
        ['Spend','RM 1.2M'],['Impressions','8.4M'],
        ['Clicks','352K'],  ['CTR','4.2%'],
        ['Conversions','12.4K'],['ROAS','3.8×'],
      ].map(([l,v]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="fw7">${v}</span>
      </div>`).join('')}
      <div class="alert alert-red" style="margin-top:11px;padding:8px 11px;font-size:11px">
        <i class="fas fa-triangle-exclamation"></i>
        CTR dropped 18% on Campaign #4421 — review needed
      </div>
    </div>

    <!-- Meta Ads -->
    <div class="card" style="border-left:3px solid #1877f2">
      <div class="platform-card-hd">
        <div class="platform-icon" style="background:rgba(24,119,242,0.15);color:#1877f2">
          <i class="fab fa-meta"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="fw7 fs13">Meta Ads</div>
          <div class="fs11 text-muted">Facebook · Instagram · Audience Net.</div>
        </div>
        <span class="b b-green" style="font-size:9px">Live</span>
      </div>
      ${[
        ['Spend','RM 980K'],  ['Impressions','12.1M'],
        ['Clicks','375K'],    ['CTR','3.1%'],
        ['Conversions','9.8K'],['ROAS','2.9×'],
      ].map(([l,v]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="fw7">${v}</span>
      </div>`).join('')}
      <div class="alert alert-amber" style="margin-top:11px;padding:8px 11px;font-size:11px">
        <i class="fas fa-eye"></i>ROAS 2.9× — below 3.0× threshold; review budget allocation
      </div>
    </div>

    <!-- TikTok Ads -->
    <div class="card" style="border-left:3px solid #ff0050">
      <div class="platform-card-hd">
        <div class="platform-icon" style="background:rgba(255,0,80,0.12);color:#ff0050">
          <i class="fab fa-tiktok"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="fw7 fs13">TikTok Ads</div>
          <div class="fs11 text-muted">In-Feed · TopView · Spark Ads</div>
        </div>
        <span class="b b-green" style="font-size:9px">Live</span>
      </div>
      ${[
        ['Spend','RM 620K'],  ['Impressions','18.6M'],
        ['Clicks','1.0M'],    ['CTR','5.4%'],
        ['Conversions','8.2K'],['ROAS','3.1×'],
      ].map(([l,v]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="fw7">${v}</span>
      </div>`).join('')}
      <div class="alert alert-green" style="margin-top:11px;padding:8px 11px;font-size:11px">
        <i class="fas fa-star"></i>Highest CTR platform this month — scale budget here
      </div>
    </div>

  </div>

  <!-- ── CAMPAIGNS TABLE + SPEND MIX ─────────────────────────── -->
  <div class="g2" style="margin-bottom:0">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Top Campaigns — All Platforms</div>
        <span class="card-action">View All →</span>
      </div>
      <table class="tbl">
        <thead>
          <tr><th>Campaign</th><th>Platform</th><th>Spend</th><th>CTR</th><th>ROAS</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${[
            ['Raya 2025 Hero',    'Google', '#4285f4','b-blue',  'RM 420K','5.1%','4.6×','b-green'],
            ['Maxis Always On',   'Meta',   '#1877f2','b-purple','RM 380K','3.8%','3.9×','b-green'],
            ['Petronas TVC Push', 'TikTok', '#ff0050','b-red',   'RM 280K','6.2%','4.1×','b-green'],
            ['CIMB Raya DR',      'Google', '#4285f4','b-blue',  'RM 240K','4.4%','3.4×','b-amber'],
            ['TNB Green Spark',   'TikTok', '#ff0050','b-red',   'RM 190K','4.8%','3.2×','b-amber'],
            ['Watsons Beauty',    'Meta',   '#1877f2','b-purple','RM 160K','2.9%','2.1×','b-red'],
          ].map(([c,p,pc,pb,s,ct,r,b]) => `
          <tr>
            <td class="fw6">${c}</td>
            <td>
              <span class="b ${pb}" style="font-size:9.5px">
                <i class="fab ${p === 'Google' ? 'fa-google' : p === 'Meta' ? 'fa-meta' : 'fa-tiktok'}"
                   style="color:${pc}"></i> ${p}
              </span>
            </td>
            <td class="text-pink fw7">${s}</td>
            <td class="fw6">${ct}</td>
            <td class="fw7 ${b === 'b-green' ? 'text-green' : b === 'b-red' ? 'text-red' : 'text-amber'}">${r}</td>
            <td><span class="b ${b}">${b === 'b-green' ? 'Strong' : b === 'b-red' ? 'Weak' : 'Watch'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Spend Distribution</div></div>
      <div class="ch" style="height:156px"><canvas id="adsSpendChart"></canvas></div>
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
        ${[
          ['Google Ads','43%','RM 1.2M','#4285f4'],
          ['Meta Ads',  '35%','RM 980K', '#1877f2'],
          ['TikTok Ads','22%','RM 620K', '#ff0050'],
        ].map(([p,pct,s,c]) => `
        <div class="flex items-center gap8" style="padding:7px 0;border-bottom:1px solid var(--border)">
          <div style="width:10px;height:10px;border-radius:50%;background:${c};flex-shrink:0"></div>
          <span class="fs12 text-sec" style="flex:1">${p}</span>
          <span class="fw7 fs13">${pct}</span>
          <span class="fs11 text-muted">${s}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

</div>`;
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

  <!-- ── ROW 3: ORDERS TABLE ─────────────────────────────────────────────── -->
  <div class="card" id="ordersTableCard">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-list-check" style="color:#4285f4;margin-right:7px"></i>Orders</div>
      <div style="display:flex;gap:8px;align-items:center">
        <input id="orderSearch" type="text" placeholder="Search orders…"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--text-primary);font-size:11px;width:160px;outline:none"
          oninput="filterOrders(this.value)">
        <select id="orderStatusFilter"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 8px;color:var(--text-primary);font-size:11px;outline:none"
          onchange="filterOrders(document.getElementById('orderSearch').value)">
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DELIVERING">Delivering</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
          <option value="PAUSED">Paused</option>
          <option value="DRAFT">Draft</option>
        </select>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="exportOrdersCSV()">
          <i class="fas fa-download"></i>CSV
        </button>
      </div>
    </div>
    <div id="ordersTableWrap" style="overflow-x:auto">
      <table class="tbl" id="ordersTable">
        <thead>
          <tr>
            <th onclick="sortOrdersBy('displayName')" style="cursor:pointer">Order Name <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('status')" style="cursor:pointer">Status <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('totalBudget')" style="cursor:pointer">Budget <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('startTime')" style="cursor:pointer">Start <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th onclick="sortOrdersBy('endTime')" style="cursor:pointer">End <i class="fas fa-sort" style="opacity:0.4;font-size:9px"></i></th>
            <th>Advertiser</th>
          </tr>
        </thead>
        <tbody id="ordersTbody">
          <tr><td colspan="6" class="text-muted" style="text-align:center;padding:24px"><i class="fas fa-spinner fa-spin"></i> Loading orders…</td></tr>
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

  <!-- ── ROW 4: LINE ITEMS + AD UNITS ───────────────────────────────────── -->
  <div class="g62">

    <!-- Line Items Table -->
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-layer-group" style="color:#a78bfa;margin-right:7px"></i>Line Items</div>
        <div style="display:flex;gap:7px">
          <select id="liStatusFilter"
            style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 8px;color:var(--text-primary);font-size:11px;outline:none"
            onchange="filterLineItems()">
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="DELIVERING">Delivering</option>
            <option value="COMPLETED">Completed</option>
            <option value="PAUSED">Paused</option>
          </select>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Status</th><th>Impressions</th><th>Clicks</th><th>Start</th></tr>
          </thead>
          <tbody id="liTbody">
            <tr><td colspan="6" class="text-muted" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i></td></tr>
          </tbody>
        </table>
      </div>
      <div id="liCount" class="fs11 text-muted" style="margin-top:8px"></div>
    </div>

    <!-- Ad Units + Revenue Analysis -->
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
      ['ordersTbody','liTbody','adUnitsList','reportsList','orderStatusBars','liStatusBars','networkInfoBody','revenueAnalysis'].forEach(id => {
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
    renderLineItems();
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

// ── Orders Table ─────────────────────────────────────────────────────────────
function filterOrders(query) {
  const sf = document.getElementById('orderStatusFilter').value;
  const q = (query||'').toLowerCase();
  _ordersFiltered = _gamOrders.filter(o => {
    const matchQ  = !q || (o.displayName||'').toLowerCase().includes(q) || (o.advertiserId||'').toLowerCase().includes(q);
    const matchSt = !sf || o.status === sf;
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
  filterOrders('');
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
    tbody.innerHTML = '<tr><td colspan="6" class="text-muted" style="text-align:center;padding:20px">No orders match the current filter.</td></tr>';
    return;
  }
  tbody.innerHTML = page.map(o => \`
  <tr>
    <td class="fw6" style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${o.displayName||''}">\${o.displayName||o.name||'—'}</td>
    <td>\${statusBadge(o.status)}</td>
    <td class="fw7" style="color:#60a5fa">\${fmtBudget(o.totalBudget)}</td>
    <td class="dim">\${fmtDate(o.startTime)}</td>
    <td class="dim">\${fmtDate(o.endTime)}</td>
    <td class="dim fs11">\${o.advertiserId ? o.advertiserId.split('/').pop() : '—'}</td>
  </tr>\`).join('');
}
function ordersPage(dir) {
  const pages = Math.ceil(_ordersFiltered.length / PAGE_SIZE);
  _ordersPageNum = Math.max(1, Math.min(pages, _ordersPageNum + dir));
  renderOrdersPage();
}

// ── Line Items ───────────────────────────────────────────────────────────────
function filterLineItems() {
  const sf = document.getElementById('liStatusFilter').value;
  const items = sf ? _gamLineItems.filter(l=>l.status===sf) : _gamLineItems;
  const tbody = document.getElementById('liTbody');
  document.getElementById('liCount').textContent = items.length + ' line items' + (sf ? ' (' + sf + ')' : '');
  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-muted" style="text-align:center;padding:16px">No line items</td></tr>';
    return;
  }
  tbody.innerHTML = items.slice(0,50).map(li => \`
  <tr>
    <td class="fw6" style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="\${li.displayName||''}">\${li.displayName||li.name||'—'}</td>
    <td class="dim fs11">\${li.lineItemType||'—'}</td>
    <td>\${statusBadge(li.status)}</td>
    <td class="fw6" style="color:#f59e0b">\${fmtImpr(parseInt(li.impressionsDelivered||'0'))}</td>
    <td class="dim">\${fmtImpr(parseInt(li.clicksDelivered||'0'))}</td>
    <td class="dim fs11">\${fmtDate(li.startTime)}</td>
  </tr>\`).join('');
}
function renderLineItems() { filterLineItems(); }

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
