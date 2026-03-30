export function pipelineScreen(): string {
  return `
<div class="content fade-in">
  <div class="alert alert-red">
    <i class="fas fa-circle-exclamation"></i>
    <strong>3 deals (RM 8.7M)</strong> at critical risk of slipping this quarter — immediate review required.
    <span style="margin-left:auto;cursor:pointer;text-decoration:underline;white-space:nowrap" onclick="navigate('ai')">Ask AI for recovery plan →</span>
  </div>

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-filter"></i></div>
      <div class="kpi-lbl">Total Pipeline</div>
      <div class="kpi-val">RM 87.4<sup>M</sup></div>
      <div class="kpi-chg down"><i class="fas fa-arrow-trend-down"></i>−2.1% vs last week</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-bullseye"></i></div>
      <div class="kpi-lbl">Weighted Pipeline</div>
      <div class="kpi-val">RM 41.2<sup>M</sup></div>
      <div class="kpi-chg up">+5.3% vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-calendar-check"></i></div>
      <div class="kpi-lbl">Q1 Closing</div>
      <div class="kpi-val">24<sup> deals</sup></div>
      <div class="kpi-chg flat">RM 22.8M combined</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-hourglass-half"></i></div>
      <div class="kpi-lbl">Avg Deal Cycle</div>
      <div class="kpi-val">47<sup>d</sup></div>
      <div class="kpi-chg down">+6d vs benchmark</div>
    </div>
  </div>

  <!-- ── FUNNEL + AT-RISK ──────────────────────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Sales Pipeline Funnel</div>
        <div style="display:flex;gap:6px;align-items:center">
          <span class="b b-gray">All Segments</span>
          <span class="card-action" onclick="navigate('ai')">Ask AI →</span>
        </div>
      </div>
      <div style="padding:4px 0 8px">
        ${[
          ['Prospecting',  'RM 24.1M','41',85,'pf-blue',   'rgba(96,165,250,0.75)'],
          ['Qualification','RM 18.6M','22',65,'pf-pink',   'rgba(226,0,122,0.75)'],
          ['Proposal',     'RM 19.2M','14',50,'pf-amber',  'rgba(245,158,11,0.75)'],
          ['Negotiation',  'RM 14.8M', '7',38,'pf-green',  'rgba(0,214,143,0.75)'],
          ['Closing',      'RM 10.7M', '3',24,'pf-green',  'rgba(0,214,143,0.9)'],
        ].map(([l,v,c,w,f,bg]) => `
        <div class="funnel-stage">
          <div class="funnel-lbl">${l}</div>
          <div class="funnel-track">
            <div class="funnel-bar" style="width:${w}%;background:${bg}">
              <span>${v}</span>
            </div>
          </div>
          <div class="funnel-num" style="font-weight:600">${c}</div>
        </div>`).join('')}
      </div>

      <div class="divider"></div>

      <div class="card-title" style="margin-bottom:12px">Stage Conversion Rates</div>
      <div class="flex items-center" style="gap:0">
        ${['Prosp.→Qual.','Qual.→Prop.','Prop.→Nego.','Nego.→Close'].map((l,i) => `
        <div style="text-align:center;flex:1;padding:0 6px">
          <div class="fw8" style="font-size:17px;margin-bottom:2px;color:${i>=2?'var(--warning)':'var(--success)'}">${['54%','63%','50%','71%'][i]}</div>
          <div class="fs10 text-muted">${l}</div>
        </div>
        ${i < 3 ? '<div style="color:var(--border-light);font-size:18px;flex-shrink:0">›</div>' : ''}`).join('')}
      </div>

      <div class="divider" style="margin-top:12px"></div>
      <div style="display:flex;gap:16px">
        ${[['Avg Deal Size','RM 2.4M','text-pink'],['Win Rate','38%','text-green'],['Lost Rate','28%','text-red'],['Stalled','34%','text-amber']].map(([l,v,c]) => `
        <div>
          <div class="fs11 text-muted" style="margin-bottom:2px">${l}</div>
          <div class="fs15 fw8 ${c}">${v}</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-hd">
        <div class="card-title">⚠ At-Risk Deals</div>
        <span class="card-action">All 9 at-risk →</span>
      </div>
      ${[
        ['Astro Arena',       'RM 2.4M','Proposal',    'Ahmad R.','34d','b-red',  'Critical'],
        ['MyEG Services',     'RM 2.1M','Negotiation', 'James O.','28d','b-red',  'High'],
        ['Digi-X Media',      'RM 4.2M','Proposal',    'Priya S.','25d','b-amber','Medium'],
        ['Watsons Campaign',  'RM 890K','Qualification','Chen W.', '19d','b-amber','Medium'],
        ['RHB Q2 Follow-up',  'RM 1.4M','Proposal',    'Ahmad R.','22d','b-amber','Medium'],
      ].map(([n,v,s,o,d,b,st]) => `
      <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:7px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .15s"
           onmouseover="this.style.borderColor='var(--border-light)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="flex:1;min-width:0">
          <div class="fw6 fs13 truncate">${n}</div>
          <div class="fs11 text-muted">${s} · ${o}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="fw7 fs14 text-pink">${v}</div>
          <div class="fs10 text-muted">${d} stalled</div>
        </div>
        <span class="b ${b}">${st}</span>
      </div>`).join('')}
      <button class="btn-ghost" style="width:100%;justify-content:center;margin-top:6px" onclick="navigate('ai')">
        <i class="fas fa-sparkles"></i>AI Recovery Analysis
      </button>
    </div>
  </div>

  <!-- ── FULL DEALS TABLE ──────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title">All Active Deals — Top 10</div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="b b-gray">87 total</span>
        <span class="card-action">View All →</span>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px"><i class="fas fa-download"></i>Export</button>
      </div>
    </div>
    <table class="tbl">
      <thead>
        <tr><th>Deal Name</th><th>Client</th><th>Value</th><th>Stage</th><th>Owner</th><th>Prob</th><th>Close Date</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${[
          ['Celcom Axiata Q2',    'Celcom',   'RM 4.2M','Negotiation', 'Priya S.', '75%','31 Mar','b-green','On Track'],
          ['Petronas TVC 2025',   'Petronas', 'RM 3.6M','Closing',     'Ahmad R.', '90%','28 Mar','b-green','Closing'],
          ['TNB Digital Suite',   'TNB',      'RM 2.8M','Proposal',    'Chen W.',  '40%','15 Apr','b-blue', 'In Progress'],
          ['Digi-X Media Deal',   'Digi-X',   'RM 4.2M','Proposal',    'Priya S.', '35%','31 Mar','b-red',  'At Risk'],
          ['MyEG Services',       'MyEG',     'RM 2.1M','Negotiation', 'James O.', '60%','29 Mar','b-red',  'At Risk'],
          ['Maxis Enterprise',    'Maxis',    'RM 3.1M','Qualification','Ahmad R.','25%','30 Apr','b-blue', 'Early Stage'],
          ['RHB Asset Mgmt',      'RHB',      'RM 1.8M','Proposal',    'Priya S.', '55%','15 Apr','b-amber','Follow-Up'],
          ['CIMB Niaga Q2',       'CIMB',     'RM 2.6M','Closing',     'Chen W.',  '85%','31 Mar','b-green','On Track'],
          ['Astro Arena 2025',    'Astro',    'RM 2.4M','Proposal',    'Ahmad R.', '30%','31 Mar','b-red',  'Critical'],
          ['Axiata Digital Ads',  'Axiata',   'RM 1.9M','Qualification','James O.','20%','30 Apr','b-gray', 'Nurturing'],
        ].map(([dn,c,v,s,o,p,cd,b,st]) => `
        <tr>
          <td class="fw6">${dn}</td>
          <td class="dim">${c}</td>
          <td class="text-pink fw7">${v}</td>
          <td><span class="b b-blue" style="font-size:10px">${s}</span></td>
          <td class="dim">${o}</td>
          <td class="fw6">${p}</td>
          <td class="dim">${cd}</td>
          <td><span class="b ${b}">${st}</span></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

</div>`;
}


export function clientsScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-building"></i></div>
      <div class="kpi-lbl">Active Clients</div>
      <div class="kpi-val">348</div>
      <div class="kpi-chg up">+14 new this quarter</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-user-slash"></i></div>
      <div class="kpi-lbl">Churn Risk</div>
      <div class="kpi-val">28</div>
      <div class="kpi-chg down">+5 vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-rotate"></i></div>
      <div class="kpi-lbl">Recovery Pipeline</div>
      <div class="kpi-val">RM 9.2<sup>M</sup></div>
      <div class="kpi-chg flat">34 dormant accounts</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-star"></i></div>
      <div class="kpi-lbl">NPS Score</div>
      <div class="kpi-val">62</div>
      <div class="kpi-chg up">+4 vs Q4 2024</div>
    </div>
  </div>

  <!-- ── TOP CLIENTS TABLE + RIGHT PANEL ──────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Top 10 Clients by YTD Revenue</div>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="navigate('ai')">
            <i class="fas fa-sparkles"></i>AI Insights
          </button>
          <span class="card-action">Full List →</span>
        </div>
      </div>
      <table class="tbl">
        <thead>
          <tr><th>#</th><th>Client</th><th>Segment</th><th>YTD Rev</th><th>Health</th><th>Last Touch</th><th>Trend</th></tr>
        </thead>
        <tbody>
          ${[
            ['1', 'Maxis Bhd',     'Enterprise', 'RM 12.4M', 92, '2d',  'up'],
            ['2', 'Celcom Axiata', 'Enterprise', 'RM 10.8M', 88, '1d',  'up'],
            ['3', 'Petronas',      'Enterprise', 'RM 9.6M',  85, '3d',  'flat'],
            ['4', 'CIMB Group',    'Enterprise', 'RM 7.2M',  79, '5d',  'flat'],
            ['5', 'Digi Telecom',  'Mid-Market', 'RM 5.1M',  71, '7d',  'down'],
            ['6', 'TNB',           'Enterprise', 'RM 4.9M',  90, '1d',  'up'],
            ['7', 'RHB Bank',      'Enterprise', 'RM 4.2M',  68, '12d', 'down'],
            ['8', 'Watsons MY',    'Mid-Market', 'RM 3.8M',  44, '45d', 'down'],
            ['9', 'Axiata Group',  'Enterprise', 'RM 3.6M',  82, '4d',  'flat'],
            ['10','MyEG Services', 'Mid-Market', 'RM 2.9M',  55, '18d', 'down'],
          ].map(([r,n,s,v,h,lt,t]) => {
            const hc = +h >= 80 ? 'text-green' : +h >= 60 ? 'text-amber' : 'text-red';
            const tc = t === 'up' ? 'var(--success)' : t === 'down' ? 'var(--danger)' : 'var(--text-muted)';
            const ti = t === 'up' ? '↑' : t === 'down' ? '↓' : '→';
            const ltNum = parseInt(lt);
            return `<tr>
              <td class="dim fw7">${r}</td>
              <td class="fw6">${n}</td>
              <td><span class="b ${s === 'Enterprise' ? 'b-blue' : 'b-gray'}" style="font-size:10px">${s}</span></td>
              <td class="text-pink fw7">${v}</td>
              <td><span class="fw8 ${hc}" style="font-size:14px">${h}</span></td>
              <td style="color:${ltNum > 14 ? 'var(--danger)' : 'var(--text-muted)'}">${lt} ago</td>
              <td style="color:${tc};font-weight:800;font-size:16px">${ti}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">

      <div class="card">
        <div class="card-hd"><div class="card-title">Health Distribution</div></div>
        ${[
          ['Healthy (80–100)','214','62%','pf-green'],
          ['At Risk (60–79)', ' 89','26%','pf-amber'],
          ['Critical (<60)',  ' 45','13%','pf-red'],
        ].map(([l,c,p,f]) => `
        <div style="margin-bottom:12px">
          <div class="flex justify-between" style="margin-bottom:5px">
            <span class="fs12 text-sec">${l}</span>
            <span class="fs12 fw7">${c.trim()} <span class="text-muted">(${p})</span></span>
          </div>
          <div class="prog-wrap"><div class="prog-fill ${f}" style="width:${p}"></div></div>
        </div>`).join('')}
      </div>

      <div class="card">
        <div class="card-hd">
          <div class="card-title">🔄 Recovery Targets</div>
          <span class="card-action">All 34 →</span>
        </div>
        ${[
          ['Watsons MY',       'RM 1.1M','45d',88,'b-red'],
          ['Guardian Pharma',  'RM 780K', '62d',72,'b-red'],
          ['Parkson Retail',   'RM 650K', '38d',65,'b-amber'],
          ['Focus Point',      'RM 420K', '90d',52,'b-amber'],
          ['Caring Pharmacy',  'RM 310K', '55d',44,'b-amber'],
        ].map(([n,v,d,s,b]) => `
        <div class="flex items-center gap8" style="padding:9px 0;border-bottom:1px solid var(--border)">
          <div style="flex:1;min-width:0">
            <div class="fw6 fs13 truncate">${n}</div>
            <div class="fs11 text-muted">Inactive ${d} · Score ${s}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="text-pink fw7 fs13">${v}</div>
            <span class="b ${b}" style="font-size:9px">Recover</span>
          </div>
        </div>`).join('')}
        <button class="btn-ghost" style="width:100%;justify-content:center;margin-top:8px" onclick="navigate('ai')">
          <i class="fas fa-sparkles"></i>AI Recovery Strategy
        </button>
      </div>

      <div class="card card-sm">
        <div class="card-hd"><div class="card-title">Revenue by Segment</div></div>
        ${[
          ['Enterprise',    'RM 44.0M','pf-pink',  69],
          ['Mid-Market',    'RM 14.4M','pf-blue',  23],
          ['SMB',           'RM 3.8M', 'pf-amber',  6],
          ['Public Sector', 'RM 1.5M', 'pf-green',  2],
        ].map(([l,v,f,p]) => `
        <div class="flex items-center gap8" style="margin-bottom:9px">
          <span class="fs12 text-sec" style="width:92px">${l}</span>
          <div class="prog-wrap" style="flex:1"><div class="prog-fill ${f}" style="width:${p*4}%"></div></div>
          <span class="fs12 fw6" style="width:68px;text-align:right">${v}</span>
        </div>`).join('')}
      </div>

    </div>
  </div>

</div>`;
}


export function salesPerfScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── KPIs ─────────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-trophy"></i></div>
      <div class="kpi-lbl">Team Attainment</div>
      <div class="kpi-val">94<sup>%</sup></div>
      <div class="kpi-chg up">+3pp vs last month</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-circle-check"></i></div>
      <div class="kpi-lbl">Deals Won MTD</div>
      <div class="kpi-val">17</div>
      <div class="kpi-chg up">RM 18.4M booked</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-phone-volume"></i></div>
      <div class="kpi-lbl">Total Activities</div>
      <div class="kpi-val">412</div>
      <div class="kpi-chg flat">this week · 18 reps</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-user-clock"></i></div>
      <div class="kpi-lbl">Low-Activity Reps</div>
      <div class="kpi-val">3</div>
      <div class="kpi-chg down">below threshold</div>
    </div>
  </div>

  <!-- ── LEADERBOARD + ACTIVITY ────────────────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Rep Leaderboard — March 2025</div>
        <div style="display:flex;gap:6px">
          <span class="b b-pink" style="font-size:9px">MTD</span>
          <span class="card-action" onclick="navigate('ai')">Ask AI →</span>
        </div>
      </div>
      ${[
        ['Priya Subramaniam','Enterprise','RM 8.9M','RM 7.5M','118%',12,'pf-green','up',   '#00d68f'],
        ['Reza Fahmi',       'Enterprise','RM 6.1M','RM 7.5M', '81%', 8,'pf-amber','up',   '#f59e0b'],
        ['Ahmad Razali',     'Enterprise','RM 7.2M','RM 7.5M', '96%', 9,'pf-amber','flat', '#f59e0b'],
        ['Nurul Ain',        'SMB',       'RM 4.1M','RM 4.0M','102%', 8,'pf-green','up',   '#00d68f'],
        ['Siva Kumar',       'Enterprise','RM 4.8M','RM 6.0M', '80%', 7,'pf-amber','flat', '#f59e0b'],
        ['Chen Wei Ling',    'Mid-Market','RM 5.4M','RM 6.4M', '84%',11,'pf-amber','down', '#f59e0b'],
        ['Lim Kai Xin',      'Mid-Market','RM 2.9M','RM 4.0M', '72%', 5,'pf-amber','down', '#f59e0b'],
        ['James Ooi',        'Mid-Market','RM 3.2M','RM 5.2M', '61%', 4,'pf-red',  'down', '#f43f5e'],
      ].map(([n,seg,rev,tgt,att,acts,f,t,aCol],i) => {
        const tCol = t === 'up' ? 'var(--success)' : t === 'down' ? 'var(--danger)' : 'var(--text-muted)';
        const tIc  = t === 'up' ? '↑' : t === 'down' ? '↓' : '→';
        const aNum = parseInt(String(att));
        const initials = String(n).split(' ').map((w: string) => w[0]).join('').slice(0,2);
        return `
        <div class="flex items-center gap8" style="padding:11px 0;border-bottom:1px solid var(--border)">
          <div class="fw8" style="width:20px;color:${i < 3 ? 'var(--magenta)' : 'var(--text-muted)'};font-size:13px">${i+1}</div>
          <div style="width:30px;height:30px;border-radius:50%;background:var(--bg-secondary);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text-muted);flex-shrink:0">${initials}</div>
          <div style="flex:1;min-width:0">
            <div class="fw6 fs13 truncate">${n}</div>
            <div class="fs11 text-muted">${seg} · ${acts} activities</div>
            <div style="margin-top:4px"><div class="prog-wrap" style="height:3px"><div class="prog-fill ${f}" style="width:${Math.min(aNum,100)}%"></div></div></div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="fw8 fs13" style="color:${aCol}">${att}</div>
            <div class="fs11 text-muted">${rev}</div>
          </div>
          <div style="color:${tCol};font-size:16px;font-weight:800;width:14px">${tIc}</div>
        </div>`;
      }).join('')}
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">

      <div class="card">
        <div class="card-hd">
          <div class="card-title">Activity vs Pipeline Ratio</div>
          <span class="b b-red">3 Flagged</span>
        </div>
        <div class="alert alert-amber" style="margin-bottom:10px;padding:8px 12px;font-size:11.5px">
          <i class="fas fa-exclamation-triangle"></i>
          <span>James Ooi: only 4 activities vs RM 5.2M pipeline — immediate coaching required</span>
        </div>
        ${[
          ['Priya S.', '12 acts','RM 8.9M',95,'pf-green'],
          ['Ahmad R.', ' 9 acts','RM 7.2M',72,'pf-green'],
          ['Chen W.',  '11 acts','RM 5.4M',88,'pf-amber'],
          ['James O.', ' 4 acts','RM 5.2M',25,'pf-red'],
          ['Nurul A.', ' 8 acts','RM 4.1M',80,'pf-amber'],
          ['Reza F.',  ' 8 acts','RM 6.1M',78,'pf-amber'],
        ].map(([n,a,p,s,f]) => `
        <div class="flex items-center gap8" style="padding:8px 0;border-bottom:1px solid var(--border)">
          <div style="flex:1;min-width:0">
            <div class="flex justify-between" style="margin-bottom:4px">
              <span class="fw6 fs12">${n}</span>
              <span class="fs11 text-muted">${a} · ${p}</span>
            </div>
            <div class="prog-wrap" style="height:3px"><div class="prog-fill ${f}" style="width:${s}%"></div></div>
          </div>
          <div class="fw7 fs13" style="color:${+s > 70 ? 'var(--success)' : +s > 40 ? 'var(--warning)' : 'var(--danger)'};width:32px;text-align:right">${s}</div>
        </div>`).join('')}
      </div>

      <div class="card card-sm">
        <div class="card-hd"><div class="card-title">Monthly Targets</div></div>
        ${[
          ['Revenue',    'RM 18.4M','RM 19.6M', 94,'pf-amber'],
          ['Deals Won',        '17',       '18', 94,'pf-amber'],
          ['New Logos',         '5',        '6', 83,'pf-red'],
          ['Renewals',         '12',       '12',100,'pf-green'],
          ['Upsells',           '8',       '10', 80,'pf-amber'],
        ].map(([l,a,t,p,f]) => `
        <div style="margin-bottom:10px">
          <div class="flex justify-between" style="margin-bottom:4px">
            <span class="fs12 text-sec">${l}</span>
            <span class="fs12 fw6">${a}/${t} <span class="text-muted">(${p}%)</span></span>
          </div>
          <div class="prog-wrap"><div class="prog-fill ${f}" style="width:${p}%"></div></div>
        </div>`).join('')}
      </div>

    </div>
  </div>

</div>`;
}
