export function digestScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── HEADER ──────────────────────────────────────────────── -->
  <div class="digest-hd">
    <div style="flex:1;min-width:0">
      <div style="font-size:10.5px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--magenta);margin-bottom:6px">
        <i class="fas fa-calendar-day" style="margin-right:5px"></i>Thursday · 27 March 2025 · Week 13 of 52
      </div>
      <div style="font-size:22px;font-weight:800;margin-bottom:8px;line-height:1.25;letter-spacing:-0.3px">
        Good morning, Dato' Lee —<br>
        <span style="color:var(--text-secondary)">here's your business at a glance.</span>
      </div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.65;margin-bottom:18px;max-width:540px">
        <strong style="color:var(--danger)">4 AI-flagged items</strong> require your attention today.
        Revenue is at <strong style="color:#fff">94% of Q1 target</strong> with 4 days remaining.
        An overnight Google Ads CTR anomaly was detected at 04:30 AM.
      </div>
      <div style="display:flex;gap:9px;flex-wrap:wrap">
        <button class="btn-primary" onclick="navigate('ai')">
          <i class="fas fa-sparkles"></i>Explore with AI
        </button>
        <button class="btn-ghost"><i class="fas fa-print"></i>Print Digest</button>
        <button class="btn-ghost"><i class="fab fa-microsoft"></i>Share to Teams</button>
        <button class="btn-ghost"><i class="fas fa-envelope"></i>Email Digest</button>
      </div>
    </div>
    <div style="text-align:center;flex-shrink:0">
      <div class="score-ring">
        <div class="score-v">91</div>
        <div class="score-l">Score</div>
      </div>
      <div class="fs11 text-muted" style="margin-top:7px">↑ 3 vs last week</div>
      <div style="margin-top:10px;display:flex;gap:8px;justify-content:center">
        <div style="text-align:center">
          <div class="fw7 fs14 text-red">4</div>
          <div class="fs10 text-muted">Urgent</div>
        </div>
        <div style="text-align:center">
          <div class="fw7 fs14 text-green">2</div>
          <div class="fs10 text-muted">Wins</div>
        </div>
        <div style="text-align:center">
          <div class="fw7 fs14 text-amber">5</div>
          <div class="fs10 text-muted">Recs</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── 4 KPIs ───────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val">RM 63.7<sup>M</sup></div>
      <div class="kpi-chg up">94% target · +12.4% YoY</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-triangle-exclamation"></i></div>
      <div class="kpi-lbl">Urgent Flags</div>
      <div class="kpi-val">4</div>
      <div class="kpi-chg down">+1 since yesterday</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-handshake"></i></div>
      <div class="kpi-lbl">Closing This Week</div>
      <div class="kpi-val">6</div>
      <div class="kpi-chg up">RM 14.2M combined</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Ad Spend Today</div>
      <div class="kpi-val">RM 92<sup>K</sup></div>
      <div class="kpi-chg up">ROAS 3.4× · On Target</div>
    </div>
  </div>

  <!-- ── MAIN 2-COL CONTENT ───────────────────────────────────── -->
  <div class="g62" style="margin-bottom:0">

    <!-- LEFT: Insights ─────────────────────────── -->
    <div>

      <!-- Urgent -->
      <div class="sec-label" style="color:var(--danger)">
        <i class="fas fa-circle-exclamation" style="margin-right:4px"></i>Urgent — Action Required
      </div>

      <div class="ins-card urgent">
        <div class="ins-icon" style="background:var(--danger-dim);color:var(--danger)">
          <i class="fas fa-triangle-exclamation"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="ins-title">Astro Arena deal — 34 days without any CRM activity</div>
          <div class="ins-body">
            RM 2.4M at Proposal stage. No CRM activity or emails logged. Competitor reported to be actively engaged.
            Q1 miss risk: <strong style="color:var(--danger)">High</strong>.
          </div>
          <div class="ins-meta">
            <span class="b b-red">Critical</span>
            Last touch: 21 Feb · Owner: Ahmad R. · Stage: Proposal · Age: 34 days
          </div>
          <div style="display:flex;gap:7px;margin-top:10px;flex-wrap:wrap">
            <button class="ai-act" style="background:rgba(244,63,94,0.07);border-color:rgba(244,63,94,0.22);color:var(--danger)">
              <i class="fas fa-phone"></i>Escalate Now
            </button>
            <button class="ai-act" onclick="navigate('pipeline')"><i class="fas fa-magnifying-glass"></i>View Deal</button>
            <button class="ai-act" onclick="fillPrompt('Give me a recovery plan for the Astro Arena deal');navigate('ai')">
              <i class="fas fa-sparkles"></i>AI Recovery Plan
            </button>
          </div>
        </div>
      </div>

      <div class="ins-card urgent">
        <div class="ins-icon" style="background:var(--danger-dim);color:var(--danger)">
          <i class="fas fa-chart-line-down"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="ins-title">Google Ads CTR dropped 18% overnight — Campaign #4421</div>
          <div class="ins-body">
            CTR fell from 5.2% to 4.3% between 10 PM and 4 AM. Campaign continues spending at RM 14K/day.
            Recommend pausing underperforming ad sets immediately pending review.
          </div>
          <div class="ins-meta">
            <span class="b b-red">Ads Anomaly</span>
            Platform: Google Ads Manager · Detected 04:30 AM · Auto-flagged by AI
          </div>
          <div style="display:flex;gap:7px;margin-top:10px">
            <button class="ai-act" onclick="navigate('ads')"><i class="fas fa-rectangle-ad"></i>View Campaign</button>
            <button class="ai-act" onclick="fillPrompt('What caused Google Ads CTR to drop 18%?');navigate('ai')">
              <i class="fas fa-sparkles"></i>Diagnose with AI
            </button>
          </div>
        </div>
      </div>

      <!-- Positive -->
      <div class="sec-label" style="color:var(--success);margin-top:20px">
        <i class="fas fa-circle-check" style="margin-right:4px"></i>Positive Signals
      </div>

      <div class="ins-card positive">
        <div class="ins-icon" style="background:var(--success-dim);color:var(--success)">
          <i class="fas fa-trophy"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="ins-title">Priya Subramaniam — 118% attainment, 4 deals closing this week</div>
          <div class="ins-body">
            Closed Maxis RM 3.8M deal yesterday. 4 active deals at Closing stage (RM 12.1M) — highest pipeline
            probability on the team. Client NPS average: 4.6/5.
          </div>
          <div class="ins-meta">
            <span class="b b-green">Star Performer</span>
            12 activities this week · Enterprise segment · 4 deals at Closing
          </div>
        </div>
      </div>

      <div class="ins-card positive">
        <div class="ins-icon" style="background:var(--success-dim);color:var(--success)">
          <i class="fas fa-globe"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="ins-title">Portal traffic +14% WoW — highest engagement rate in Q1</div>
          <div class="ins-body">
            4.2M sessions this week vs 3.7M last week. Revenue per user rose to RM 0.34.
            Engagement rate at 64% across all Astro portals.
          </div>
          <div class="ins-meta">
            <span class="b b-green">Traffic Win</span>
            Source: GA4 · Updated 1h ago · Astro.com.my leading with 1.82M sessions
          </div>
          <div style="display:flex;gap:7px;margin-top:10px">
            <button class="ai-act" onclick="navigate('portals')"><i class="fas fa-chart-bar"></i>View Traffic</button>
          </div>
        </div>
      </div>

      <!-- Forecast & Watch -->
      <div class="sec-label" style="color:var(--info);margin-top:20px">
        <i class="fas fa-chart-bar" style="margin-right:4px"></i>Forecast & Watch
      </div>

      <div class="ins-card info">
        <div class="ins-icon" style="background:var(--info-dim);color:var(--info)">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="ins-title">Q1 Forecast: 94% likely — RM 3.9M gap with 4 days left</div>
          <div class="ins-body">
            AI model gives 68% probability of closing the gap if Celcom Axiata (RM 3.6M) and Petronas TVC (RM 3.2M)
            close on schedule this week.
          </div>
          <div class="ins-meta">
            <span class="b b-blue">AI Forecast</span>
            Model refreshed 06:00 AM today · Based on pipeline + historical win rate
          </div>
        </div>
      </div>

      <div class="ins-card warning">
        <div class="ins-icon" style="background:var(--warning-dim);color:var(--warning)">
          <i class="fas fa-rotate-left"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="ins-title">5 dormant accounts — RM 3.9M recovery opportunity identified</div>
          <div class="ins-body">
            Watsons MY (RM 1.1M, inactive 45d) and Guardian Pharma (RM 780K, inactive 62d) are highest priority.
            AI recommends personalised re-engagement campaign with product tailoring.
          </div>
          <div class="ins-meta">
            <span class="b b-amber">Recovery</span>
            Avg inactivity: 68 days · 5 accounts · RM 3.9M total potential
          </div>
          <div style="display:flex;gap:7px;margin-top:10px">
            <button class="ai-act" onclick="navigate('clients')"><i class="fas fa-building"></i>View Accounts</button>
          </div>
        </div>
      </div>

    </div><!-- end left -->

    <!-- RIGHT: Schedule + Week Snapshot + AI Recs ── -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <div class="card">
        <div class="card-hd"><div class="card-title">Today's Schedule</div>
          <span class="b b-pink" style="font-size:9px">4 Events</span>
        </div>
        ${[
          ['09:30','Pipeline Review','Management · 60m','b-pink'],
          ['11:00','Celcom Deal Call','Priya S. · 45m','b-green'],
          ['14:00','Deal Escalation','Ahmad R. · 30m','b-red'],
          ['16:00','Q1 Forecast Briefing','Exec Team · 90m','b-blue'],
        ].map(([t,e,p,b]) => `
        <div style="display:flex;gap:11px;padding:10px 0;border-bottom:1px solid var(--border);align-items:flex-start">
          <div class="text-pink fw7 fs12" style="width:38px;flex-shrink:0">${t}</div>
          <div style="flex:1;min-width:0">
            <div class="fw6 fs13">${e}</div>
            <div class="fs11 text-muted">${p}</div>
          </div>
          <span class="b ${b} fs9">${b==='b-red'?'Urgent':b==='b-pink'?'Priority':'Scheduled'}</span>
        </div>`).join('')}
      </div>

      <div class="card">
        <div class="card-hd"><div class="card-title">Week at a Glance</div></div>
        ${[
          ['Deals Closing','6 this week','text-green'],
          ['Pipeline Δ','+RM 1.2M','text-green'],
          ['Ad Spend','RM 92K/day','text-sec'],
          ['AI Queries','24 today','text-sec'],
          ['Data Syncs','7 sources OK','text-green'],
          ['Alerts','0 system errors','text-green'],
          ['New Logos','2 this week','text-teal'],
          ['Churned Accounts','1 warning','text-amber'],
        ].map(([l,v,tc]) => `
        <div class="stat-row">
          <span class="stat-lbl">${l}</span>
          <span class="fw6 fs13 ${tc}">${v}</span>
        </div>`).join('')}
      </div>

      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-sparkles" style="color:var(--magenta);margin-right:5px"></i>AI Recommendations</div>
        </div>
        ${[
          ['Escalate Astro Arena deal to CRO level today','fa-circle-exclamation','var(--danger)'],
          ['Pause Campaign #4421 Google Ads pending CTR review','fa-rectangle-ad','var(--warning)'],
          ['Activate Watsons MY & Guardian re-engagement sequence','fa-rotate-left','var(--warning)'],
          ['Confirm Petronas contract signature — key Q1 close','fa-signature','var(--success)'],
          ['Review James Ooi activity levels this afternoon','fa-user-clock','var(--warning)'],
        ].map(([t,ic,c]) => `
        <div style="display:flex;align-items:flex-start;gap:9px;padding:8px 0;border-bottom:1px solid var(--border)">
          <i class="fas ${ic}" style="color:${c};margin-top:2px;font-size:12px;flex-shrink:0"></i>
          <div class="fs12 text-secondary">${t}</div>
        </div>`).join('')}
        <button class="btn-primary" style="width:100%;justify-content:center;margin-top:12px" onclick="navigate('ai')">
          <i class="fas fa-sparkles"></i>Ask AI for More Insights
        </button>
      </div>

    </div><!-- end right -->
  </div>

</div>`;
}
