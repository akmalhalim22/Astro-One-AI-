export function portalsScreen(): string {
  return `
<div class="content fade-in">

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
<div class="content fade-in">

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon purple"><i class="fas fa-seedling"></i></div>
      <div class="kpi-lbl">Total Reach</div>
      <div class="kpi-val">2.1<sup>M</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+22% MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-eye"></i></div>
      <div class="kpi-lbl">Total Impressions</div>
      <div class="kpi-val">8.4<sup>M</sup></div>
      <div class="kpi-chg up">+18% MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-heart"></i></div>
      <div class="kpi-lbl">Total Engagements</div>
      <div class="kpi-val">284<sup>K</sup></div>
      <div class="kpi-chg up">+31% MoM</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-chart-line"></i></div>
      <div class="kpi-lbl">Avg Eng. Rate</div>
      <div class="kpi-val">3.4<sup>%</sup></div>
      <div class="kpi-chg up">+0.6pp MoM</div>
    </div>
  </div>

  <!-- ── TREND CHART + PLATFORM BREAKDOWN ─────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Engagement & Reach Trend — March 2025</div>
        <span class="card-action">Sprout Source →</span>
      </div>
      <div class="ch" style="height:168px"><canvas id="socialChart"></canvas></div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-hd"><div class="card-title">Platform Breakdown</div></div>
        ${[
          ['fa-instagram','#e1306c','Instagram','820K reach','148K eng','3.8%','b-green'],
          ['fa-tiktok',   '#ff0050','TikTok',   '680K reach', '96K eng','4.2%','b-green'],
          ['fa-facebook', '#1877f2','Facebook', '380K reach', '28K eng','2.1%','b-amber'],
          ['fa-youtube',  '#ff0000','YouTube',  '220K reach', '12K eng','1.8%','b-amber'],
        ].map(([ic,col,n,r,e,er,b]) => `
        <div class="flex gap8 items-center" style="padding:10px 0;border-bottom:1px solid var(--border)">
          <div style="width:32px;height:32px;border-radius:8px;background:${col}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fab ${ic}" style="color:${col};font-size:14px"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div class="fw6 fs13">${n}</div>
            <div class="fs11 text-muted">${r} · ${e}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="fw7 fs14">${er}</div>
            <span class="b ${b} fs9">Eng. Rate</span>
          </div>
        </div>`).join('')}
      </div>

      <div class="card card-sm">
        <div class="card-hd"><div class="card-title">Content Performance by Type</div></div>
        ${[
          ['Reels / Shorts',  '5.6%','pf-purple'],
          ['Video Content',   '4.2%','pf-pink'],
          ['Carousels',       '3.4%','pf-green'],
          ['Image Posts',     '3.1%','pf-blue'],
          ['Stories',         '2.8%','pf-amber'],
        ].map(([l,v,f]) => `
        <div class="flex items-center gap8" style="padding:7px 0;border-bottom:1px solid var(--border)">
          <span class="fs12 text-sec" style="width:104px">${l}</span>
          <div class="prog-wrap" style="flex:1"><div class="prog-fill ${f}" style="width:${parseFloat(v)*14}%"></div></div>
          <span class="fs12 fw7" style="width:36px;text-align:right">${v}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ── TOP POSTS + AUDIENCE ─────────────────────────────────── -->
  <div class="g2" style="margin-bottom:0">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Top Posts — March 2025</div>
        <span class="card-action">Sprout Dashboard →</span>
      </div>
      <table class="tbl">
        <thead>
          <tr><th>Post</th><th>Platform</th><th>Reach</th><th>Impressions</th><th>Eng.</th><th>Eng. Rate</th></tr>
        </thead>
        <tbody>
          ${[
            ['Raya 2025 Teaser',     '#e1306c','Instagram','180K','420K','24.2K','5.8%'],
            ['Astro Sports Live',    '#ff0050','TikTok',   '142K','380K','18.6K','4.9%'],
            ['Maxis × Astro Collab', '#e1306c','Instagram','124K','294K','14.8K','5.0%'],
            ['FIFA Finals Highlight','#ff0000','YouTube',  '98K', '248K', '8.4K','3.4%'],
            ['Go Shop Flash Sale',   '#1877f2','Facebook', '84K', '198K', '6.2K','3.1%'],
            ['Astro GO New Shows',   '#ff0050','TikTok',   '76K', '182K', '9.1K','5.0%'],
          ].map(([p,col,pl,r,im,e,er]) => `
          <tr>
            <td class="fw6">${p}</td>
            <td>
              <span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:var(--text-secondary)">
                <i class="fab ${pl === 'Instagram' ? 'fa-instagram' : pl === 'TikTok' ? 'fa-tiktok' : pl === 'YouTube' ? 'fa-youtube' : 'fa-facebook'}"
                   style="color:${col};font-size:12px"></i>${pl}
              </span>
            </td>
            <td class="fw6">${r}</td>
            <td class="dim">${im}</td>
            <td class="fw6">${e}</td>
            <td class="text-pink fw7">${er}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Audience Growth</div></div>
      <div class="ch" style="height:140px"><canvas id="audienceChart"></canvas></div>
      <div class="flex justify-between" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
        ${[
          ['Instagram','1.84M','+4.2%','#e1306c'],
          ['TikTok',   '920K', '+8.1%','#ff0050'],
          ['Facebook', '2.1M', '+1.2%','#1877f2'],
          ['YouTube',  '480K', '+3.4%','#ff0000'],
        ].map(([p,f,g,c]) => `
        <div style="text-align:center">
          <div class="fs10 text-muted">${p}</div>
          <div class="fw7 fs14" style="color:${c}">${f}</div>
          <div class="fs11 text-green">${g}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

</div>`;
}
