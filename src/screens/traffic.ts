export function portalsScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── DATA SOURCE INDICATOR ──────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(226,0,122,0.06);border:1px solid rgba(226,0,122,0.15);border-radius:9px;margin-bottom:14px;flex-wrap:wrap">
    <i class="fas fa-chart-bar" style="color:#e2007a;font-size:10px"></i>
    <span style="font-size:11px;color:var(--text-muted);font-weight:600">DATA SOURCE</span>
    <span style="font-size:11px;color:var(--text-primary)">Google Analytics 4 <span class="text-muted">·</span> Web Traffic &amp; Engagement</span>
    <span class="b b-gray" style="font-size:10px;margin-left:4px">GA4 Export</span>
    <span style="margin-left:auto;font-size:10.5px;color:var(--text-muted)"><i class="fas fa-circle-info" style="margin-right:4px"></i>Displaying sample data — connect GA4 in <a href="/apiconn" style="color:#e2007a;text-decoration:none">API Connections</a></span>
  </div>

  <!-- ── KPIs ROW 1 ───────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon blue"><i class="fas fa-users"></i></div>
      <div class="kpi-lbl">Monthly Sessions</div>
      <div class="kpi-val">4.2<sup>M</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+8.3% MoM · GA4</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon teal"><i class="fas fa-user-check"></i></div>
      <div class="kpi-lbl">Unique Users</div>
      <div class="kpi-val">2.8<sup>M</sup></div>
      <div class="kpi-chg up">+6.1% MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Engagement Rate</div>
      <div class="kpi-val">64<sup>%</sup></div>
      <div class="kpi-chg up">+3pp MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-coins"></i></div>
      <div class="kpi-lbl">Revenue / User</div>
      <div class="kpi-val">RM 0.34</div>
      <div class="kpi-chg up">+12% vs last month</div>
    </div>
  </div>

  <!-- ── KPIs ROW 2 ───────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi">
      <div class="kpi-icon purple"><i class="fas fa-fill-drip"></i></div>
      <div class="kpi-lbl">Fill Rate</div>
      <div class="kpi-val">88<sup>%</sup></div>
      <div class="kpi-chg down">−2pp MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon orange"><i class="fas fa-clock-rotate-left"></i></div>
      <div class="kpi-lbl">Avg Session Time</div>
      <div class="kpi-val">4:22</div>
      <div class="kpi-chg up">+0:28 vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-rotate"></i></div>
      <div class="kpi-lbl">Bounce Rate</div>
      <div class="kpi-val">38<sup>%</sup></div>
      <div class="kpi-chg up">−4pp (improved)</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-mobile-screen"></i></div>
      <div class="kpi-lbl">Mobile Share</div>
      <div class="kpi-val">74<sup>%</sup></div>
      <div class="kpi-chg up">+2pp MoM</div>
    </div>
  </div>

  <!-- ── TRAFFIC CHART + SOURCE BREAKDOWN ─────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Sessions & Users — Daily (March 2025)</div>
        <span class="card-action">GA4 Source →</span>
      </div>
      <div class="ch" style="height:168px"><canvas id="trafficChart"></canvas></div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-hd"><div class="card-title">Traffic by Source</div></div>
        ${[
          ['Organic Search','1.68M','pf-green',  40],
          ['Direct',        '0.84M','pf-blue',   20],
          ['Social Media',  '0.67M','pf-purple', 16],
          ['Paid Ads',      '0.63M','pf-pink',   15],
          ['Referral',      '0.38M','pf-amber',   9],
        ].map(([l,v,f,p]) => `
        <div style="margin-bottom:10px">
          <div class="flex justify-between" style="margin-bottom:4px">
            <span class="fs12 text-sec">${l}</span>
            <span class="fs12 fw7">${v} <span class="text-muted">(${p}%)</span></span>
          </div>
          <div class="prog-wrap"><div class="prog-fill ${f}" style="width:${+p*2.2}%"></div></div>
        </div>`).join('')}
      </div>

      <div class="card card-sm">
        <div class="card-hd"><div class="card-title">Fill Rate by Portal</div></div>
        ${[
          ['Astro.com.my', '91%','pf-green'],
          ['Astro Arena',  '88%','pf-green'],
          ['Astro GO',     '79%','pf-amber'],
          ['Go Shop',      '82%','pf-amber'],
          ['Astro Mustika','68%','pf-red'],
        ].map(([p,v,f]) => `
        <div class="flex items-center gap8" style="padding:7px 0;border-bottom:1px solid var(--border)">
          <span class="fs12 text-sec" style="width:96px">${p}</span>
          <div class="prog-wrap" style="flex:1"><div class="prog-fill ${f}" style="width:${parseInt(v)}%"></div></div>
          <span class="fs12 fw7" style="width:36px;text-align:right">${v}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ── PORTAL TABLE + TOP PAGES ─────────────────────────────── -->
  <div class="g2" style="margin-bottom:0">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Portal Performance Breakdown</div>
        <span class="card-action">GA4 Dashboard →</span>
      </div>
      <table class="tbl">
        <thead>
          <tr><th>Portal</th><th>Sessions</th><th>Users</th><th>Eng. Rate</th><th>Fill Rate</th><th>Rev/User</th><th>Trend</th></tr>
        </thead>
        <tbody>
          ${[
            ['Astro.com.my', '1.82M','1.21M','68%','91%','RM 0.42','up'],
            ['Astro GO',     '1.04M','720K', '71%','79%','RM 0.38','up'],
            ['Astro Arena',  '610K', '420K', '58%','88%','RM 0.29','flat'],
            ['Go Shop',      '380K', '260K', '52%','82%','RM 0.24','down'],
            ['Astro Mustika','240K', '162K', '48%','68%','RM 0.18','down'],
            ['Astro Awani',  '104K', '71K',  '66%','85%','RM 0.31','up'],
          ].map(([p,s,u,e,f,r,t]) => {
            const tc = t === 'up' ? 'var(--success)' : t === 'down' ? 'var(--danger)' : 'var(--text-muted)';
            return `<tr>
              <td class="fw6">${p}</td>
              <td class="fw6">${s}</td>
              <td class="dim">${u}</td>
              <td class="fw6">${e}</td>
              <td class="fw6">${f}</td>
              <td class="text-pink fw7">${r}</td>
              <td style="color:${tc};font-weight:800;font-size:16px">${t === 'up' ? '↑' : t === 'down' ? '↓' : '→'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Top Pages — March 2025</div></div>
      ${[
        ['/home',    '82K views','64% eng.','var(--info)'],
        ['/live-tv', '61K views','78% eng.','var(--success)'],
        ['/movies',  '54K views','71% eng.','var(--success)'],
        ['/sports',  '48K views','82% eng.','var(--success)'],
        ['/news',    '32K views','58% eng.','var(--warning)'],
        ['/shop',    '28K views','42% eng.','var(--text-muted)'],
        ['/shows',   '24K views','69% eng.','var(--success)'],
      ].map(([p,v,e,c]) => `
      <div class="flex justify-between items-center" style="padding:9px 0;border-bottom:1px solid var(--border)">
        <div>
          <div class="fw6 fs12 text-primary">${p}</div>
          <div class="fs11 text-muted">${e}</div>
        </div>
        <div class="fw7 fs13" style="color:${c}">${v}</div>
      </div>`).join('')}
    </div>
  </div>

</div>`;
}


export function socialScreen(): string {
  return `
<style>
.soc-kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.soc-kpi-row-6{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:14px}
@media(max-width:900px){.soc-kpi-row,.soc-kpi-row-6{grid-template-columns:repeat(2,1fr)}}
.soc-kpi{background:var(--bg-card);border:1px solid var(--border);border-radius:13px;padding:14px 16px;display:flex;flex-direction:column;gap:4px}
.soc-kpi.accent{border-left:3px solid #2ea44f}
.soc-kpi-icon{width:32px;height:32px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;margin-bottom:4px}
.soc-kpi-lbl{font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em}
.soc-kpi-val{font-size:22px;font-weight:800;color:var(--text-primary);line-height:1}
.soc-kpi-sub{font-size:11px;color:var(--text-muted)}
.soc-kpi-sub.up{color:#00d68f}.soc-kpi-sub.dn{color:#f43f5e}.soc-kpi-sub.flat{color:#f59e0b}
.soc-g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.soc-g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px}
.soc-g62{display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:14px}
@media(max-width:900px){.soc-g2,.soc-g3,.soc-g62{grid-template-columns:1fr}}
.soc-tbl{width:100%;border-collapse:collapse;font-size:12px}
.soc-tbl th{padding:8px 10px;text-align:left;background:var(--bg-input);border-bottom:2px solid var(--border);font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em;cursor:pointer;white-space:nowrap}
.soc-tbl td{padding:9px 10px;border-bottom:1px solid var(--border);vertical-align:middle}
.soc-tbl tr:hover td{background:rgba(46,164,79,0.04)}
.soc-tbl .num{text-align:right;font-variant-numeric:tabular-nums}
.soc-hbar-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)}
.soc-hbar-name{flex:1;min-width:0;font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.soc-hbar-track{flex:2;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden}
.soc-hbar-fill{height:6px;border-radius:3px;transition:width .5s}
.soc-hbar-val{font-size:10px;color:var(--text-muted);white-space:nowrap;width:70px;text-align:right}
.soc-filter-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 14px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;margin-bottom:14px}
.soc-filter-bar label{font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.soc-filter-bar select,.soc-filter-bar input{background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--text-primary);font-size:11px;outline:none;height:30px}
</style>
<div class="content fade-in">

  <!-- ── DATA SOURCE ─────────────────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:7px;padding:5px 12px;background:rgba(46,164,79,0.07);border:1px solid rgba(46,164,79,0.18);border-radius:8px;margin-bottom:12px;font-size:11px;color:var(--text-muted);flex-wrap:wrap">
    <i class="fas fa-seedling" style="color:#2ea44f"></i>
    <strong style="color:var(--text-primary)">Google Sheets</strong> <span class="text-muted">·</span> "Sprout Social" tab
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(46,164,79,0.15);color:#2ea44f">Sheets · Live</span>
    <span id="soc-src-status" style="margin-left:auto;font-size:11px"></span>
  </div>

  <!-- ── Filters ───────────────────────────────────────────────── -->
  <div class="soc-filter-bar">
    <label>Month</label>
    <select id="soc-month" onchange="socApplyFilters()"><option value="">All Months</option></select>
    <span style="width:1px;height:20px;background:var(--border);margin:0 4px"></span>
    <label>Profile</label>
    <select id="soc-profile" onchange="socApplyFilters()"><option value="">All Profiles</option></select>
    <button class="btn-ghost" style="margin-left:auto;height:28px;font-size:11px;padding:0 10px" onclick="socReset()"><i class="fas fa-filter-circle-xmark"></i> Reset</button>
    <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadSocialData()"><i class="fas fa-rotate"></i> Refresh</button>
    <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="socExportCSV()"><i class="fas fa-download"></i> CSV</button>
  </div>

  <!-- ── KPIs Row 1 ─────────────────────────────────────────────── -->
  <div class="soc-kpi-row">
    <div class="soc-kpi accent">
      <div class="soc-kpi-icon" style="background:#2ea44f20;color:#2ea44f"><i class="fas fa-users"></i></div>
      <div class="soc-kpi-lbl">Total Audience</div>
      <div class="soc-kpi-val" id="soc-kv-audience">—</div>
      <div class="soc-kpi-sub" id="soc-ks-audience"></div>
    </div>
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#4285f420;color:#4285f4"><i class="fas fa-arrow-trend-up"></i></div>
      <div class="soc-kpi-lbl">Net Audience Growth</div>
      <div class="soc-kpi-val" id="soc-kv-growth">—</div>
      <div class="soc-kpi-sub" id="soc-ks-growth"></div>
    </div>
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#a78bfa20;color:#a78bfa"><i class="fas fa-eye"></i></div>
      <div class="soc-kpi-lbl">Total Reach</div>
      <div class="soc-kpi-val" id="soc-kv-reach">—</div>
      <div class="soc-kpi-sub" id="soc-ks-reach"></div>
    </div>
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#f59e0b20;color:#f59e0b"><i class="fas fa-bullhorn"></i></div>
      <div class="soc-kpi-lbl">Total Impressions</div>
      <div class="soc-kpi-val" id="soc-kv-impr">—</div>
      <div class="soc-kpi-sub" id="soc-ks-impr"></div>
    </div>
  </div>

  <!-- ── KPIs Row 2 ─────────────────────────────────────────────── -->
  <div class="soc-kpi-row">
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#00d68f20;color:#00d68f"><i class="fas fa-heart"></i></div>
      <div class="soc-kpi-lbl">Video Views</div>
      <div class="soc-kpi-val" id="soc-kv-views">—</div>
      <div class="soc-kpi-sub" id="soc-ks-views"></div>
    </div>
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#60a5fa20;color:#60a5fa"><i class="fas fa-computer-mouse"></i></div>
      <div class="soc-kpi-lbl">Total Clicks</div>
      <div class="soc-kpi-val" id="soc-kv-clicks">—</div>
      <div class="soc-kpi-sub" id="soc-ks-clicks"></div>
    </div>
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#e879f920;color:#e879f9"><i class="fas fa-pen-to-square"></i></div>
      <div class="soc-kpi-lbl">Total Posts</div>
      <div class="soc-kpi-val" id="soc-kv-posts">—</div>
      <div class="soc-kpi-sub" id="soc-ks-posts"></div>
    </div>
    <div class="soc-kpi">
      <div class="soc-kpi-icon" style="background:#fb923c20;color:#fb923c"><i class="fas fa-percent"></i></div>
      <div class="soc-kpi-lbl">Avg Eng. Rate</div>
      <div class="soc-kpi-val" id="soc-kv-engrate">—</div>
      <div class="soc-kpi-sub" id="soc-ks-engrate"></div>
    </div>
  </div>

  <!-- ── Row 3: Growth Trend + Profile Reach ───────────────────── -->
  <div class="soc-g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-chart-line" style="color:#2ea44f;margin-right:6px"></i>Audience & Reach Trend</div>
        <span id="soc-trend-lbl" class="fs11 text-muted"></span>
      </div>
      <div style="height:220px"><canvas id="socTrendChart"></canvas></div>
    </div>
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-chart-bar" style="color:#a78bfa;margin-right:6px"></i>Impressions by Profile</div>
        <span id="soc-profile-count" class="fs11 text-muted"></span>
      </div>
      <div id="socProfileBars" style="display:flex;flex-direction:column;gap:7px;min-height:80px">
        <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:12px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
  </div>

  <!-- ── Row 4: Growth Ranking + Engagement Analysis ───────────── -->
  <div class="soc-g2">
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-ranking-star" style="color:#00d68f;margin-right:6px"></i>Profile Ranking by Growth</div>
      </div>
      <div id="socGrowthRanking" style="display:flex;flex-direction:column;gap:6px;min-height:80px">
        <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:12px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-chart-pie" style="color:#f59e0b;margin-right:6px"></i>Content Activity</div>
      </div>
      <div style="height:160px"><canvas id="socActivityChart"></canvas></div>
      <div id="socActivityBars" style="margin-top:10px;display:flex;flex-direction:column;gap:5px"></div>
    </div>
  </div>

  <!-- ── Row 5: Performance Table ──────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-table-list" style="color:#2ea44f;margin-right:6px"></i>Profile Performance Detail</div>
      <div style="display:flex;gap:6px;align-items:center">
        <input id="soc-search" type="text" placeholder="Search profile, month…"
          style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;width:180px;outline:none"
          oninput="socApplyFilters()">
        <span id="soc-count" class="fs11 text-muted"></span>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="soc-tbl" style="min-width:900px">
        <thead>
          <tr>
            <th onclick="socSort('profile')">Profile</th>
            <th onclick="socSort('month')">Month</th>
            <th class="num" onclick="socSort('audience')">Audience</th>
            <th class="num" onclick="socSort('growth')">Net Growth</th>
            <th class="num" onclick="socSort('reach')">Reach</th>
            <th class="num" onclick="socSort('impressions')">Impressions</th>
            <th class="num" onclick="socSort('posts')">Posts</th>
            <th class="num" onclick="socSort('videoviews')">Video Views</th>
            <th class="num" onclick="socSort('clicks')">Clicks</th>
          </tr>
        </thead>
        <tbody id="socTbody">
          <tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i></td></tr>
        </tbody>
      </table>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
      <span id="soc-pag-info" class="fs11 text-muted">—</span>
      <div style="display:flex;gap:6px">
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="socPrevBtn" onclick="socPage(-1)" disabled>← Prev</button>
        <span id="soc-pag-lbl" class="fs11 text-muted" style="padding:0 6px;line-height:26px">Page 1</span>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 10px" id="socNextBtn" onclick="socPage(1)">Next →</button>
      </div>
    </div>
  </div>

</div>

<script>
// ── Sprout Social state ───────────────────────────────────────────────────────
let _socRows=[], _socFiltered=[], _socPageNum=1, _socPageSz=20;
let _socSortKey='impressions', _socSortAsc=false;
let _socTrendChart=null, _socActivityChart=null;
const SOC_COLORS=['#2ea44f','#4285f4','#a78bfa','#f59e0b','#f43f5e','#00d68f','#60a5fa','#e879f9','#fb923c','#38bdf8'];

function socFmt(n){n=parseFloat(n)||0;if(n>=1e6)return(n/1e6).toFixed(2)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n.toFixed(0);}
function socFmtShort(n){n=parseFloat(n)||0;if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return n.toFixed(0);}

// ── Field accessors ───────────────────────────────────────────────────────────
function socG(r,keys){for(const k of keys){if(r[k]!==undefined&&String(r[k]).trim()!=='')return r[k];}return '';}
function socGetProfile(r)    {return socG(r,['Profile name','Profile Name','Profile','profile','Account','account','Page Name','Page']);}
function socGetMonth(r)      {return socG(r,['Month','month','Period','period','Date','date','Report Month']);}
function socGetAudience(r)   {return socG(r,['Audience','audience','Followers','followers','Total Audience','Total Followers','Audience Size']);}
function socGetGrowth(r)     {return socG(r,['Net audience growth','Net Audience Growth','Net Growth','net_growth','Audience Growth','Audience Change','Change Audience','Audience Change (Net)']);}
function socGetReach(r)      {return socG(r,['Reach','reach','Total Reach','Organic Reach','Paid Reach']);}
function socGetImpr(r)       {return socG(r,['Impressions','impressions','Total Impressions','Organic Impressions','Paid Impressions']);}
function socGetPosts(r)      {return socG(r,['Posts','posts','Total Posts','Post Count','Published Posts','Number of Posts']);}
function socGetViews(r)      {return socG(r,['Video views','Video Views','video_views','Views','views','Video View Count']);}
function socGetClicks(r)     {return socG(r,['Clicks','clicks','Total Clicks','Link Clicks','Click Count']);}
function socGetEngRate(r)    {return socG(r,['Engagement Rate','engagement_rate','Eng Rate','Eng. Rate','Average Engagement Rate','Avg Engagement Rate']);}

async function loadSocialData(){
  const src=document.getElementById('soc-src-status');
  if(src)src.innerHTML='<i class="fas fa-spinner fa-spin" style="color:#2ea44f;font-size:11px"></i> Loading…';
  try{
    console.log('[Social] Fetching /api/data/social…');
    const r=await fetch('/api/data/social').then(x=>x.json());
    console.log('[Social] API response:', {ok:r.ok, count:r.count, tab:r.tab, error:r.error, debug:r.debug});
    if(!r.ok){
      const msg=r.error||'Not connected';
      if(src)src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> '+msg+'</span>';
      socShowEmpty(msg); return;
    }
    _socRows=r.rows||[];
    if(_socRows.length>0){
      console.log('[Social] Columns detected:', Object.keys(_socRows[0]));
      console.log('[Social] Sample row:', _socRows[0]);
      console.log('[Social] Field mapping test:', {
        profile:socGetProfile(_socRows[0]), month:socGetMonth(_socRows[0]),
        audience:socGetAudience(_socRows[0]), growth:socGetGrowth(_socRows[0]),
        reach:socGetReach(_socRows[0]), impressions:socGetImpr(_socRows[0]),
        posts:socGetPosts(_socRows[0]), views:socGetViews(_socRows[0]),
        clicks:socGetClicks(_socRows[0])
      });
    }
    if(_socRows.length===0){
      if(src)src.innerHTML='<span style="color:#f59e0b;font-size:11px"><i class="fas fa-triangle-exclamation"></i> Tab "'+r.tab+'" is empty</span>';
      socShowEmpty('No data in "'+r.tab+'"'); return;
    }
    if(src)src.innerHTML='<span style="color:#00d68f;font-size:11px"><i class="fas fa-circle-check"></i> '+_socRows.length+' rows from "'+r.tab+'"</span>';
    socPopulateFilters();
    socApplyFilters();
  }catch(e){
    console.error('[Social] Error:',e);
    if(src)src.innerHTML='<span style="color:#f43f5e;font-size:11px"><i class="fas fa-xmark"></i> '+e.message+'</span>';
    socShowEmpty(e.message);
  }
}

function socShowEmpty(reason=''){
  const msg=reason?'<br><span style="font-size:10px;color:#48486a;display:block;margin-top:4px">'+reason+'</span>':'';
  const emptyHtml='<div style="text-align:center;padding:32px"><i class="fas fa-plug" style="color:#f59e0b;font-size:16px"></i><br><span style="font-size:11px;color:var(--text-muted);display:block;margin-top:8px">No data available'+msg+'</span></div>';
  const tbody=document.getElementById('socTbody');
  if(tbody)tbody.innerHTML='<tr><td colspan="9">'+emptyHtml+'</td></tr>';
  ['socProfileBars','socGrowthRanking','socActivityBars'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:12px">No data</div>';});
  ['soc-kv-audience','soc-kv-growth','soc-kv-reach','soc-kv-impr','soc-kv-views','soc-kv-clicks','soc-kv-posts','soc-kv-engrate']
    .forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML='<span style="font-size:14px;color:var(--text-muted)">—</span>';});
}

function socPopulateFilters(){
  const months=[...new Set(_socRows.map(r=>socGetMonth(r)).filter(Boolean))].sort();
  const profiles=[...new Set(_socRows.map(r=>socGetProfile(r)).filter(Boolean))].sort();
  const fillSel=(id,arr,ph)=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=el.value;
    el.innerHTML='<option value="">'+ph+'</option>'+arr.map(v=>'<option value="'+v+'"'+(v===cur?' selected':'')+'>'+v+'</option>').join('');
  };
  fillSel('soc-month',months,'All Months');
  fillSel('soc-profile',profiles,'All Profiles');
}

function socApplyFilters(){
  const month=document.getElementById('soc-month')?.value||'';
  const profile=document.getElementById('soc-profile')?.value||'';
  const q=(document.getElementById('soc-search')?.value||'').toLowerCase();
  _socFiltered=_socRows.filter(r=>{
    if(month&&socGetMonth(r)!==month) return false;
    if(profile&&socGetProfile(r)!==profile) return false;
    if(q&&!Object.values(r).some(v=>String(v).toLowerCase().includes(q))) return false;
    return true;
  });
  _socFiltered.sort((a,b)=>{
    let va,vb;
    const numKeys=['audience','growth','reach','impressions','posts','videoviews','clicks'];
    if(numKeys.includes(_socSortKey)){
      const getters={audience:socGetAudience,growth:socGetGrowth,reach:socGetReach,impressions:socGetImpr,posts:socGetPosts,videoviews:socGetViews,clicks:socGetClicks};
      va=parseFloat((getters[_socSortKey]||socGetImpr)(a))||0;
      vb=parseFloat((getters[_socSortKey]||socGetImpr)(b))||0;
    } else if(_socSortKey==='profile'){va=socGetProfile(a);vb=socGetProfile(b);}
    else if(_socSortKey==='month'){va=socGetMonth(a);vb=socGetMonth(b);}
    else{va='';vb='';}
    if(va<vb)return _socSortAsc?-1:1;if(va>vb)return _socSortAsc?1:-1;return 0;
  });
  _socPageNum=1;
  socRenderKPIs();
  socRenderCharts();        // also renders ActivityChart + ActivityBars internally
  socRenderProfileBars();
  socRenderGrowthRanking();
  socRenderPage();
}

function socReset(){
  ['soc-month','soc-profile'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const s=document.getElementById('soc-search');if(s)s.value='';
  socApplyFilters();
}

function socRenderKPIs(){
  const totalAudience=_socFiltered.reduce((s,r)=>s+parseFloat(socGetAudience(r)||'0'),0);
  const totalGrowth=_socFiltered.reduce((s,r)=>s+parseFloat(socGetGrowth(r)||'0'),0);
  const totalReach=_socFiltered.reduce((s,r)=>s+parseFloat(socGetReach(r)||'0'),0);
  const totalImpr=_socFiltered.reduce((s,r)=>s+parseFloat(socGetImpr(r)||'0'),0);
  const totalViews=_socFiltered.reduce((s,r)=>s+parseFloat(socGetViews(r)||'0'),0);
  const totalClicks=_socFiltered.reduce((s,r)=>s+parseFloat(socGetClicks(r)||'0'),0);
  const totalPosts=_socFiltered.reduce((s,r)=>s+parseFloat(socGetPosts(r)||'0'),0);
  // Avg engagement rate (weighted by impressions where available)
  const erRows=_socFiltered.filter(r=>socGetEngRate(r)!=='');
  const avgEr=erRows.length>0?(erRows.reduce((s,r)=>s+parseFloat(socGetEngRate(r)||'0'),0)/erRows.length).toFixed(2):null;
  const growthCls=totalGrowth>=0?'up':'dn';
  const growthSign=totalGrowth>=0?'+':'';
  const profiles=new Set(_socFiltered.map(r=>socGetProfile(r)).filter(Boolean));
  const setK=(vid,sid,v,sub,cls='')=>{
    const vEl=document.getElementById(vid);const sEl=document.getElementById(sid);
    if(vEl)vEl.textContent=v;if(sEl){sEl.innerHTML=sub;if(cls)sEl.className='soc-kpi-sub '+cls;}
  };
  setK('soc-kv-audience','soc-ks-audience',socFmt(totalAudience),'<span class="text-muted">'+profiles.size+' profiles</span>');
  setK('soc-kv-growth','soc-ks-growth',growthSign+socFmt(totalGrowth),'<span class="text-muted">net followers gained</span>',growthCls);
  setK('soc-kv-reach','soc-ks-reach',socFmt(totalReach),'<span class="text-muted">total reach</span>');
  setK('soc-kv-impr','soc-ks-impr',socFmt(totalImpr),'<span class="text-muted">total impressions</span>');
  setK('soc-kv-views','soc-ks-views',socFmt(totalViews),'<span class="text-muted">video views</span>');
  setK('soc-kv-clicks','soc-ks-clicks',socFmt(totalClicks),'<span class="text-muted">total clicks</span>');
  setK('soc-kv-posts','soc-ks-posts',totalPosts.toFixed(0),'<span class="text-muted">total posts</span>');
  setK('soc-kv-engrate','soc-ks-engrate',avgEr!==null?avgEr+'%':'—',avgEr?'<span class="text-muted">avg across profiles</span>':'<span class="text-muted">no rate data</span>');
}

function socRenderCharts(){
  // Group by month for trend
  const byMonth={};
  _socFiltered.forEach(r=>{
    const m=socGetMonth(r)||'?';
    if(!byMonth[m])byMonth[m]={reach:0,impr:0,growth:0};
    byMonth[m].reach+=parseFloat(socGetReach(r)||'0');
    byMonth[m].impr+=parseFloat(socGetImpr(r)||'0');
    byMonth[m].growth+=parseFloat(socGetGrowth(r)||'0');
  });
  const mLabels=Object.keys(byMonth);
  const mReach=mLabels.map(k=>byMonth[k].reach);
  const mImpr=mLabels.map(k=>byMonth[k].impr);
  const trendLbl=document.getElementById('soc-trend-lbl');
  if(trendLbl)trendLbl.textContent=mLabels.length+' months';
  const tCtx=document.getElementById('socTrendChart');
  if(tCtx){
    if(_socTrendChart){_socTrendChart.destroy();_socTrendChart=null;}
    _socTrendChart=new Chart(tCtx,{type:'line',data:{labels:mLabels,datasets:[
      {label:'Reach',data:mReach,borderColor:'#2ea44f',backgroundColor:'rgba(46,164,79,0.08)',fill:true,tension:0.4,pointRadius:4,borderWidth:2.5},
      {label:'Impressions',data:mImpr,borderColor:'#a78bfa',backgroundColor:'transparent',borderDash:[5,3],tension:0.3,pointRadius:3,borderWidth:1.5}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#8080a8',font:{size:10},boxWidth:10,padding:10}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#48486a',font:{size:9},callback:v=>socFmtShort(v)}}}}});
  }
  // Activity chart by profile (posts)
  const byProfile={};
  _socFiltered.forEach(r=>{
    const p=socGetProfile(r)||'—';
    if(!byProfile[p])byProfile[p]={posts:0,reach:0,impr:0};
    byProfile[p].posts+=parseFloat(socGetPosts(r)||'0');
    byProfile[p].reach+=parseFloat(socGetReach(r)||'0');
    byProfile[p].impr+=parseFloat(socGetImpr(r)||'0');
  });
  const pLabels=Object.keys(byProfile);
  const pPosts=pLabels.map(k=>byProfile[k].posts);
  const aCtx=document.getElementById('socActivityChart');
  if(aCtx){
    if(_socActivityChart){_socActivityChart.destroy();_socActivityChart=null;}
    _socActivityChart=new Chart(aCtx,{type:'doughnut',data:{labels:pLabels,datasets:[{data:pPosts,backgroundColor:pLabels.map((_,i)=>SOC_COLORS[i%SOC_COLORS.length]),borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{position:'right',labels:{color:'#8080a8',font:{size:10},boxWidth:9,padding:8}},tooltip:{callbacks:{label:c=>' '+c.label+': '+c.parsed+' posts'}}}}});
  }
  const total=pPosts.reduce((s,v)=>s+v,0)||1;
  const abEl=document.getElementById('socActivityBars');
  if(abEl)abEl.innerHTML=pLabels.map((l,i)=>{const pct=Math.round(pPosts[i]/total*100);return '<div><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span class="fs11">'+l+'</span><span class="fs11 fw7" style="color:'+SOC_COLORS[i%SOC_COLORS.length]+'">'+pPosts[i]+' posts ('+pct+'%)</span></div><div style="height:4px;border-radius:3px;background:rgba(255,255,255,0.06);overflow:hidden"><div style="height:4px;width:'+pct+'%;background:'+SOC_COLORS[i%SOC_COLORS.length]+';border-radius:3px"></div></div></div>';}).join('');
}

function socRenderProfileBars(){
  const el=document.getElementById('socProfileBars');
  const cntEl=document.getElementById('soc-profile-count');
  const byProfile={};
  _socFiltered.forEach(r=>{
    const p=socGetProfile(r)||'—';
    byProfile[p]=(byProfile[p]||0)+parseFloat(socGetImpr(r)||'0');
  });
  const sorted=Object.entries(byProfile).sort((a,b)=>b[1]-a[1]);
  if(!sorted.length){el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:12px">No data</div>';return;}
  if(cntEl)cntEl.textContent=sorted.length+' profiles';
  const mx=sorted[0][1]||1;
  el.innerHTML=sorted.map(([name,val],i)=>{
    const pct=Math.round(val/mx*100);const col=SOC_COLORS[i%SOC_COLORS.length];
    return '<div class="soc-hbar-item"><span class="soc-hbar-name" title="'+name+'">'+name+'</span><div class="soc-hbar-track"><div class="soc-hbar-fill" style="width:'+pct+'%;background:'+col+'"></div></div><span class="soc-hbar-val">'+socFmt(val)+'</span></div>';
  }).join('');
}

function socRenderGrowthRanking(){
  const el=document.getElementById('socGrowthRanking');
  const byProfile={};
  _socFiltered.forEach(r=>{
    const p=socGetProfile(r)||'—';
    if(!byProfile[p])byProfile[p]={growth:0,audience:0,reach:0};
    byProfile[p].growth+=parseFloat(socGetGrowth(r)||'0');
    byProfile[p].audience+=parseFloat(socGetAudience(r)||'0');
    byProfile[p].reach+=parseFloat(socGetReach(r)||'0');
  });
  const sorted=Object.entries(byProfile).sort((a,b)=>b[1].growth-a[1].growth);
  if(!sorted.length){el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:12px">No data</div>';return;}
  el.innerHTML=sorted.map(([name,d],i)=>{
    const growthSign=d.growth>=0?'+':'';
    const col=d.growth>=0?'#00d68f':'#f43f5e';
    return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">'+
      '<span style="font-size:11px;font-weight:800;color:'+SOC_COLORS[i%SOC_COLORS.length]+';width:18px;text-align:center">'+(i+1)+'</span>'+
      '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+name+'</div>'+
      '<div style="font-size:10px;color:var(--text-muted)">Audience: '+socFmt(d.audience)+' · Reach: '+socFmt(d.reach)+'</div></div>'+
      '<span style="font-size:13px;font-weight:800;color:'+col+'">'+growthSign+socFmt(d.growth)+'</span>'+
    '</div>';
  }).join('');
}

function socRenderPage(){
  const tbody=document.getElementById('socTbody');
  const start=(_socPageNum-1)*_socPageSz;
  const page=_socFiltered.slice(start,start+_socPageSz);
  const total=_socFiltered.length;
  const pages=Math.max(1,Math.ceil(total/_socPageSz));
  document.getElementById('soc-pag-info').textContent=(start+1)+'–'+Math.min(start+_socPageSz,total)+' of '+total+' rows';
  document.getElementById('soc-pag-lbl').textContent='Page '+_socPageNum+' / '+pages;
  document.getElementById('socPrevBtn').disabled=_socPageNum<=1;
  document.getElementById('socNextBtn').disabled=_socPageNum>=pages;
  document.getElementById('soc-count').textContent=total+' records';
  if(!page.length){tbody.innerHTML='<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-muted)">No records match filters</td></tr>';return;}
  tbody.innerHTML=page.map(r=>{
    const growth=parseFloat(socGetGrowth(r)||'0');
    const growthCol=growth>=0?'#00d68f':'#f43f5e';
    const growthSign=growth>=0?'+':'';
    return '<tr>'+
      '<td class="fw6">'+(socGetProfile(r)||'—')+'</td>'+
      '<td style="color:var(--text-muted);font-size:11px">'+(socGetMonth(r)||'—')+'</td>'+
      '<td class="num fw6">'+socFmt(parseFloat(socGetAudience(r)||'0'))+'</td>'+
      '<td class="num fw7" style="color:'+growthCol+'">'+growthSign+socFmt(growth)+'</td>'+
      '<td class="num">'+socFmt(parseFloat(socGetReach(r)||'0'))+'</td>'+
      '<td class="num">'+socFmt(parseFloat(socGetImpr(r)||'0'))+'</td>'+
      '<td class="num">'+socFmt(parseFloat(socGetPosts(r)||'0'))+'</td>'+
      '<td class="num">'+socFmt(parseFloat(socGetViews(r)||'0'))+'</td>'+
      '<td class="num">'+socFmt(parseFloat(socGetClicks(r)||'0'))+'</td>'+
    '</tr>';
  }).join('');
}

function socSort(key){
  if(_socSortKey===key)_socSortAsc=!_socSortAsc;else{_socSortKey=key;_socSortAsc=false;}
  socApplyFilters();
}
function socPage(dir){const pages=Math.max(1,Math.ceil(_socFiltered.length/_socPageSz));_socPageNum=Math.max(1,Math.min(pages,_socPageNum+dir));socRenderPage();}
function socExportCSV(){
  if(!_socFiltered.length)return;
  const keys=Object.keys(_socFiltered[0]||{});
  const csv=[keys.join(','),..._socFiltered.map(r=>keys.map(k=>'"'+(String(r[k]||'').replace(/"/g,'""'))+'"').join(','))].join('\\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='sprout_social.csv';a.click();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', loadSocialData);
else setTimeout(loadSocialData, 80);
</script>
`;
}
