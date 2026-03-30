export function homeScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── WELCOME BANNER ──────────────────────────────────────── -->
  <div class="banner">
    <div class="banner-eyebrow"><i class="fas fa-sparkles" style="margin-right:6px"></i>AI-Powered · Live Data · Updated 2 min ago</div>
    <div class="banner-title">Good morning, Dato' Lee —<br>your digital performance, <span>at a glance</span>.</div>
    <div class="banner-desc">
      All 7 data sources synced. AI has flagged <strong style="color:#fff;font-weight:700">4 items</strong> requiring immediate attention.
      Revenue tracking at <strong style="color:#fff;font-weight:700">94% of Q1 target</strong> with 4 days remaining.
    </div>
    <div class="quick-pills">
      <a class="pill" onclick="navigate('ai')" href="javascript:void(0)">
        <i class="fas fa-triangle-exclamation" style="color:var(--warning)"></i>Show at-risk deals
      </a>
      <a class="pill" onclick="navigate('ai')" href="javascript:void(0)">
        <i class="fas fa-chart-line" style="color:var(--magenta)"></i>Revenue vs target
      </a>
      <a class="pill" onclick="navigate('ai')" href="javascript:void(0)">
        <i class="fas fa-rectangle-ad" style="color:var(--info)"></i>Best performing ads
      </a>
      <a class="pill" onclick="navigate('ai')" href="javascript:void(0)">
        <i class="fas fa-globe" style="color:var(--teal)"></i>Top traffic sources
      </a>
      <a class="pill" onclick="navigate('ai')" href="javascript:void(0)">
        <i class="fas fa-rotate-left" style="color:var(--success)"></i>Recovery opportunities
      </a>
    </div>
  </div>

  <!-- ── TOP 4 KPIs ──────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val">RM 63.7<sup>M</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+12.4% vs LY &nbsp;·&nbsp; 94% target</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-filter"></i></div>
      <div class="kpi-lbl">Active Pipeline</div>
      <div class="kpi-val">RM 87.4<sup>M</sup></div>
      <div class="kpi-chg down"><i class="fas fa-arrow-trend-down"></i>−2.1% vs last week</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-users"></i></div>
      <div class="kpi-lbl">Portal Sessions</div>
      <div class="kpi-val">4.2<sup>M</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+8.3% MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Blended Ad ROAS</div>
      <div class="kpi-val">3.4<sup>×</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>RM 2.8M spend MTD</div>
    </div>
  </div>

  <!-- ── REVENUE CHART + AI FLAGS ────────────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div>
          <div class="card-title">Revenue Trend — FY 2025</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted)">
            <div style="width:8px;height:8px;border-radius:2px;background:var(--magenta)"></div>Actual
            <div style="width:8px;height:8px;border-radius:2px;background:rgba(255,255,255,0.15);margin-left:4px"></div>Target
          </div>
          <span class="card-action" onclick="navigate('revenue')">Full Report →</span>
        </div>
      </div>
      <div class="ch" style="height:148px"><canvas id="homeRevChart"></canvas></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        ${[
          ['Q1 Target',   'RM 67.6M',  'var(--text-secondary)'],
          ['Q1 Achieved', 'RM 63.7M',  'var(--success)'],
          ['Gap',         'RM 3.9M',   'var(--danger)'],
          ['Attainment',  '94.2%',     'var(--magenta)'],
        ].map(([l,v,c]) => `
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">${l}</div>
          <div style="font-size:15px;font-weight:800;color:${c}">${v}</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title"><i class="fas fa-sparkles" style="color:var(--magenta);margin-right:5px"></i>AI Flags Today</div>
        <span class="b b-red" style="font-size:9.5px">4 Active</span>
      </div>
      ${[
        ['fa-triangle-exclamation','var(--danger-dim)','var(--danger)',
         'Astro Arena deal — 34 days stalled','RM 2.4M · Proposal · Ahmad R. · Escalate NOW'],
        ['fa-chart-line-down','var(--warning-dim)','var(--warning)',
         'Google Ads CTR dropped 18% overnight','Campaign #4421 · RM 14K/day still running'],
        ['fa-user-slash','var(--danger-dim)','var(--danger)',
         'Watsons MY — 45 days no activity','Recovery potential: RM 1.1M · High priority'],
        ['fa-circle-check','var(--success-dim)','var(--success)',
         'Maxis deal closed — RM 3.8M booked','Q1 milestone · Priya S. · Excellent work'],
      ].map(([ic,bg,col,title,sub]) => `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
        <div style="width:30px;height:30px;border-radius:8px;background:${bg};color:${col};display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">
          <i class="fas ${ic}"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12.5px;font-weight:600;margin-bottom:2px">${title}</div>
          <div class="fs11 text-muted truncate">${sub}</div>
        </div>
      </div>`).join('')}
      <button class="btn-primary" style="width:100%;justify-content:center;margin-top:12px" onclick="navigate('ai')">
        <i class="fas fa-sparkles"></i>Explore All Flags in AI
      </button>
    </div>
  </div>

  <!-- ── SECONDARY 4 KPIs ─────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi">
      <div class="kpi-icon purple"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Google Ads ROAS</div>
      <div class="kpi-val">3.8<sup>×</sup></div>
      <div class="kpi-chg up">+0.4 vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon teal"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Engagement Rate</div>
      <div class="kpi-val">64<sup>%</sup></div>
      <div class="kpi-chg up">+3pp MoM · GA4</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-seedling"></i></div>
      <div class="kpi-lbl">Social Reach</div>
      <div class="kpi-val">2.1<sup>M</sup></div>
      <div class="kpi-chg up">+22% MoM · Sprout</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-triangle-exclamation"></i></div>
      <div class="kpi-lbl">At-Risk Deals</div>
      <div class="kpi-val">3</div>
      <div class="kpi-chg down">+1 since last week · RM 8.7M</div>
    </div>
  </div>

  <!-- ── 3-PANEL SNAPSHOT + DATA SOURCES ──────────────────────── -->
  <div class="g3">
    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-funnel" style="color:var(--warning);margin-right:5px"></i>Pre-Sales Snapshot</div>
        <span class="card-action" onclick="navigate('pipeline')">Detail →</span>
      </div>
      ${[
        ['Pipeline Value','RM 87.4M','b-amber'],
        ['Deals Closing Q1','24 deals','b-green'],
        ['Avg Win Prob','62%','b-blue'],
        ['At Risk','3 deals · RM 8.7M','b-red'],
        ['Avg Deal Cycle','47 days','b-gray'],
      ].map(([l,v,b]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="b ${b}">${v}</span>
      </div>`).join('')}
    </div>

    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-rocket" style="color:var(--magenta);margin-right:5px"></i>Post-Sales Snapshot</div>
        <span class="card-action" onclick="navigate('revenue')">Detail →</span>
      </div>
      ${[
        ['YTD Revenue','RM 63.7M','b-green'],
        ['Q1 Target','RM 67.6M','b-blue'],
        ['Attainment','94.2%','b-pink'],
        ['Campaign ROI','4.2×','b-green'],
        ['Top Platform','TikTok · CTR 5.4%','b-red'],
      ].map(([l,v,b]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="b ${b}">${v}</span>
      </div>`).join('')}
    </div>

    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-signal" style="color:var(--teal);margin-right:5px"></i>Traffic & Social Snapshot</div>
        <span class="card-action" onclick="navigate('portals')">Detail →</span>
      </div>
      ${[
        ['Monthly Sessions','4.2M','b-blue'],
        ['Engagement Rate','64%','b-green'],
        ['Fill Rate','88%','b-amber'],
        ['Social Reach','2.1M','b-purple'],
        ['Rev / User','RM 0.34','b-teal'],
      ].map(([l,v,b]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="b ${b}">${v}</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- ── ADS SUMMARY TABLE + DATA SYNC ────────────────────────── -->
  <div class="g62" style="margin-bottom:0">
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-rectangle-ad" style="color:var(--info);margin-right:5px"></i>Ads Performance Summary</div>
        <span class="card-action" onclick="navigate('ads')">Full Ads Report →</span>
      </div>
      <table class="tbl">
        <thead>
          <tr><th>Platform</th><th>Spend</th><th>Impressions</th><th>CTR</th><th>ROAS</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${[
            ['Google Ads','RM 1.2M','8.4M','4.2%','3.8×','b-green','On Target'],
            ['Meta Ads','RM 980K','12.1M','3.1%','2.9×','b-amber','Watch'],
            ['TikTok Ads','RM 620K','18.6M','5.4%','3.1×','b-green','On Target'],
          ].map(([p,s,i,c,r,b,st]) => `
          <tr>
            <td>
              <div class="flex items-center gap8">
                <i class="fab ${p.includes('Google')?'fa-google':p.includes('Meta')?'fa-meta':'fa-tiktok'}"
                   style="color:${p.includes('Google')?'#4285f4':p.includes('Meta')?'#1877f2':'#ff0050'};font-size:12px"></i>
                <span class="fw6">${p}</span>
              </div>
            </td>
            <td class="text-pink fw7">${s}</td>
            <td class="dim">${i}</td>
            <td class="fw6">${c}</td>
            <td class="fw7">${r}</td>
            <td><span class="b ${b}">${st}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-database" style="color:var(--info);margin-right:5px"></i>Data Source Status</div>
        <span class="card-action" onclick="navigate('apiconn')">Manage →</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[
          ['Google Sheets','Central warehouse','dot-green','2m ago'],
          ['GA4','Web analytics','dot-green','1h ago'],
          ['Google Ads Mgr','Ads performance','dot-green','1h ago'],
          ['BigQuery','Data analytics','dot-green','3h ago'],
          ['TikTok Ads','TikTok campaigns','dot-green','2h ago'],
          ['Sprout Social','Social analytics','dot-amber','4h ago'],
          ['Manual Upload','Monthly CSV/XLS','dot-blue','1 Mar 25'],
        ].map(([n,d,dot,t]) => `
        <div style="display:flex;align-items:center;gap:9px;padding:7px 10px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--border)">
          <div class="dot ${dot}"></div>
          <div style="flex:1;min-width:0">
            <div class="fs12 fw6 truncate">${n}</div>
            <div class="fs10 text-muted">${d}</div>
          </div>
          <div class="fs10 text-muted">${t}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

</div>`;
}
