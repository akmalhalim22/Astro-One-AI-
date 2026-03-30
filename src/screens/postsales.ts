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
