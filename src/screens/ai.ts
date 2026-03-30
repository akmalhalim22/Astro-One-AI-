export function aiScreen(): string {
  return `
<div class="content fade-in" style="padding:16px 24px;height:calc(100vh - var(--topbar-h));overflow:hidden">
  <div class="chat-wrap">

    <!-- ── LEFT SIDEBAR ─────────────────────────────────────── -->
    <div class="chat-side">
      <!-- Suggested prompts -->
      <div class="prompt-cat">Pre-Sales</div>
      ${[
        ['fa-triangle-exclamation','var(--danger)',
          'Which deals above RM200K are at risk this month?'],
        ['fa-ranking-star','var(--magenta)',
          'Show top 10 clients by YTD revenue'],
        ['fa-user-clock','var(--warning)',
          'Which salespeople have low activity relative to pipeline?'],
        ['fa-code-compare','var(--info)',
          'What changed in pipeline versus last week?'],
        ['fa-rotate-left','var(--success)',
          'Which inactive clients have the highest recovery potential?'],
      ].map(([ic,col,txt]) => `
      <div class="prompt-ex" onclick="fillPrompt(\`${txt.replace(/`/g,"\\`")}\`)">
        <i class="fas ${ic}" style="color:${col};margin-right:6px"></i>${txt}
      </div>`).join('')}

      <div class="prompt-cat" style="margin-top:6px">Post-Sales & Ads</div>
      ${[
        ['fa-rectangle-ad','var(--purple)',
          'Which ad campaign has the best ROAS this month?'],
        ['fa-chart-bar','var(--info)',
          'Compare Google vs TikTok ad spend efficiency'],
        ['fa-megaphone','var(--teal)',
          'Which campaigns are underperforming vs target ROI?'],
        ['fa-sack-dollar','var(--success)',
          'Show revenue breakdown by product and segment'],
      ].map(([ic,col,txt]) => `
      <div class="prompt-ex" onclick="fillPrompt(\`${txt.replace(/`/g,"\\`")}\`)">
        <i class="fas ${ic}" style="color:${col};margin-right:6px"></i>${txt}
      </div>`).join('')}

      <div class="prompt-cat" style="margin-top:6px">Traffic & Social</div>
      ${[
        ['fa-globe','var(--teal)',
          'What are the top traffic sources this week?'],
        ['fa-seedling','var(--purple)',
          'Which social platform has the highest engagement rate?'],
        ['fa-chart-line','var(--magenta)',
          'Forecast Q2 2025 revenue risk based on current pipeline'],
      ].map(([ic,col,txt]) => `
      <div class="prompt-ex" onclick="fillPrompt(\`${txt.replace(/`/g,"\\`")}\`)">
        <i class="fas ${ic}" style="color:${col};margin-right:6px"></i>${txt}
      </div>`).join('')}

      <div class="divider"></div>

      <div class="prompt-cat">Data Sources</div>
      ${[
        ['fa-table',        '#0f9d58', 'Google Sheets', 'Live'],
        ['fa-chart-bar',    '#e34c26', 'GA4',           'Live'],
        ['fa-rectangle-ad', '#4285f4', 'Google Ads Mgr','Live'],
        ['fa-database',     '#669df6', 'BigQuery',      'Live'],
        ['fa-music',        '#ff0050', 'TikTok Ads',    'Live'],
        ['fa-seedling',     '#2ea44f', 'Sprout Social', 'Delayed'],
      ].map(([ic,col,n,s]) => `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 4px;font-size:11.5px">
        <i class="fas ${ic}" style="color:${col};width:13px;text-align:center"></i>
        <span class="text-sec">${n}</span>
        <span class="b ${s==='Live'?'b-green':'b-amber'}" style="margin-left:auto;font-size:9px;padding:1px 6px">${s}</span>
      </div>`).join('')}

      <div class="divider"></div>

      <div class="prompt-cat">Recent Sessions</div>
      ${[
        ['At-risk deals — Q1 analysis','14 mins ago'],
        ['Maxis account deep-dive','2 hours ago'],
        ['Ads performance Feb 2025','Yesterday'],
        ['Pipeline vs last month','Yesterday'],
        ['Top traffic sources — March','2 days ago'],
      ].map(([s,t]) => `
      <div class="session-item">
        <i class="fas fa-clock" style="font-size:10px;flex-shrink:0"></i>
        <span style="flex:1;truncate">${s}</span>
        <span class="fs10 text-muted">${t}</span>
      </div>`).join('')}
    </div>

    <!-- ── MAIN CHAT ─────────────────────────────────────────── -->
    <div class="chat-main">
      <div class="chat-win" id="chatWindow">

        <!-- AI intro message -->
        <div class="msg-row fade-in">
          <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
          <div class="msg-bub ai" style="max-width:72%">
            <div style="font-weight:700;font-size:14px;margin-bottom:8px">
              Astro One AI is ready
              <span class="b b-green" style="margin-left:8px;font-size:9.5px;vertical-align:middle">● All sources live</span>
            </div>
            <div style="font-size:12.5px;color:var(--text-secondary);line-height:1.65">
              Ask me anything about your <strong style="color:var(--text-primary)">pipeline, revenue, ads, traffic, or client health</strong>.
              I have live access to Google Sheets, GA4, Google Ads Manager, BigQuery, and TikTok Ads data.
            </div>
            <div style="margin-top:10px;display:flex;gap:7px;flex-wrap:wrap">
              ${[
                'Which deals are at risk this month?',
                'Show top clients by YTD revenue',
                'Best ROAS campaign this week',
              ].map(q => `
              <button class="ai-act" onclick="fillPrompt(\`${q}\`)">
                <i class="fas fa-bolt" style="font-size:9px"></i>${q}
              </button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Sample exchange: At-risk deals -->
        <div class="msg-row fade-in">
          <div class="msg-av user"><i class="fas fa-user"></i></div>
          <div class="msg-bub user">Which deals above RM200K are at risk this month?</div>
        </div>

        <div class="msg-row fade-in">
          <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
          <div class="msg-bub ai" style="max-width:92%">
            <div class="ai-sum">
              ⚠ <strong>3 deals totalling RM 8.7M</strong> are at high risk of slipping past March — all stalled beyond 25 days with no recorded CRM activity.
            </div>
            <div class="ai-kpis">
              <div class="ai-kpi">
                <div class="ai-kpi-v text-red">3</div>
                <div class="ai-kpi-l">At Risk</div>
              </div>
              <div class="ai-kpi">
                <div class="ai-kpi-v">RM 8.7M</div>
                <div class="ai-kpi-l">Combined Value</div>
              </div>
              <div class="ai-kpi">
                <div class="ai-kpi-v text-amber">32d</div>
                <div class="ai-kpi-l">Avg Stall</div>
              </div>
              <div class="ai-kpi">
                <div class="ai-kpi-v text-muted">Q1</div>
                <div class="ai-kpi-l">Target Quarter</div>
              </div>
            </div>
            <div class="ai-exp">
              Deals flagged using three signals: <strong>days since last CRM activity</strong>, <strong>stage duration vs pipeline benchmark</strong>, and
              <strong>email engagement drop-off</strong> from Google Sheets pipeline data. Ahmad R. has zero CRM entries in 5 weeks.
            </div>
            <table class="tbl" style="font-size:11.5px;margin-bottom:10px">
              <thead>
                <tr><th>Deal</th><th>Value</th><th>Stage</th><th>Owner</th><th>Stall</th><th>Competitor</th><th>Risk</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td class="fw6">Astro Arena</td>
                  <td class="text-pink fw7">RM 2.4M</td>
                  <td><span class="b b-amber">Proposal</span></td>
                  <td class="dim">Ahmad R.</td>
                  <td class="text-red fw6">34d</td>
                  <td class="dim fs11">Rumoured active</td>
                  <td><span class="b b-red">Critical</span></td>
                </tr>
                <tr>
                  <td class="fw6">MyEG Services</td>
                  <td class="text-pink fw7">RM 2.1M</td>
                  <td><span class="b b-blue">Negotiation</span></td>
                  <td class="dim">James O.</td>
                  <td class="text-amber fw6">28d</td>
                  <td class="dim fs11">None detected</td>
                  <td><span class="b b-red">High</span></td>
                </tr>
                <tr>
                  <td class="fw6">Digi-X Media</td>
                  <td class="text-pink fw7">RM 4.2M</td>
                  <td><span class="b b-amber">Proposal</span></td>
                  <td class="dim">Priya S.</td>
                  <td class="text-amber fw6">25d</td>
                  <td class="dim fs11">None detected</td>
                  <td><span class="b b-amber">Medium</span></td>
                </tr>
              </tbody>
            </table>
            <div class="ai-flag">
              <i class="fas fa-flag" style="flex-shrink:0;margin-top:1px"></i>
              <div>
                <strong>Risk Rule Applied:</strong> Flagged when no CRM activity logged &gt;21d at Proposal stage or &gt;14d at Negotiation.
                Ahmad R. has 0 CRM entries for 5 consecutive weeks — <strong>immediate escalation recommended</strong>.
              </div>
            </div>
            <div class="ai-acts">
              <button class="ai-act"><i class="fas fa-envelope"></i>Draft escalation email</button>
              <button class="ai-act"><i class="fas fa-calendar-plus"></i>Schedule urgent review</button>
              <button class="ai-act"><i class="fab fa-microsoft"></i>Share to Teams</button>
              <button class="ai-act"><i class="fas fa-bookmark"></i>Save insight</button>
              <button class="ai-act" onclick="fillPrompt('Tell me more about the Astro Arena deal and suggest a recovery plan')">
                <i class="fas fa-magnifying-glass"></i>Drill into Astro Arena
              </button>
            </div>
          </div>
        </div>

        <!-- Sample exchange 2: Top clients -->
        <div class="msg-row fade-in">
          <div class="msg-av user"><i class="fas fa-user"></i></div>
          <div class="msg-bub user">Show top 10 clients by YTD revenue</div>
        </div>

        <div class="msg-row fade-in">
          <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
          <div class="msg-bub ai" style="max-width:92%">
            <div class="ai-sum">
              📊 <strong>Top 10 clients account for RM 74.5M</strong> (78% of YTD revenue). 2 accounts showing declining trend and below-threshold engagement.
            </div>
            <div class="ai-kpis">
              <div class="ai-kpi"><div class="ai-kpi-v">RM 74.5M</div><div class="ai-kpi-l">Top 10 Revenue</div></div>
              <div class="ai-kpi"><div class="ai-kpi-v">78%</div><div class="ai-kpi-l">Revenue Share</div></div>
              <div class="ai-kpi"><div class="ai-kpi-v text-red">2</div><div class="ai-kpi-l">Declining</div></div>
              <div class="ai-kpi"><div class="ai-kpi-v text-green">8</div><div class="ai-kpi-l">Healthy</div></div>
            </div>
            <table class="tbl" style="font-size:11.5px;margin-bottom:10px">
              <thead><tr><th>#</th><th>Client</th><th>YTD Revenue</th><th>vs LY</th><th>Health</th><th>Last Touch</th></tr></thead>
              <tbody>
                ${[
                  ['1','Maxis Bhd','RM 12.4M','+18%',92,'2d','text-green'],
                  ['2','Celcom Axiata','RM 10.8M','+12%',88,'1d','text-green'],
                  ['3','Petronas','RM 9.6M','+9%',85,'3d','text-green'],
                  ['4','CIMB Group','RM 7.2M','+6%',79,'5d','text-amber'],
                  ['5','Digi Telecom','RM 5.1M','−3%',71,'7d','text-amber'],
                  ['6','TNB','RM 4.9M','+11%',90,'1d','text-green'],
                  ['7','RHB Bank','RM 4.2M','+2%',68,'12d','text-amber'],
                  ['8','Watsons MY','RM 3.8M','−8%',44,'45d','text-red'],
                  ['9','Axiata Group','RM 3.6M','+7%',82,'4d','text-green'],
                  ['10','MyEG Services','RM 2.9M','−5%',55,'18d','text-amber'],
                ].map(([r,n,v,g,h,lt,hc]) => `
                <tr>
                  <td class="text-muted fw7">${r}</td>
                  <td class="fw6">${n}</td>
                  <td class="text-pink fw7">${v}</td>
                  <td style="color:${g.startsWith('+')?'var(--success)':'var(--danger)'};font-weight:600">${g}</td>
                  <td><span class="fw7 ${hc}">${h}</span></td>
                  <td style="color:${parseInt(lt)>14?'var(--danger)':'var(--text-muted)'}">${lt} ago</td>
                </tr>`).join('')}
              </tbody>
            </table>
            <div class="ai-acts">
              <button class="ai-act"><i class="fas fa-user-slash"></i>Show churn risk accounts</button>
              <button class="ai-act"><i class="fas fa-rotate-left"></i>Recovery plan for Watsons</button>
              <button class="ai-act"><i class="fab fa-microsoft"></i>Share to Teams</button>
              <button class="ai-act"><i class="fas fa-bookmark"></i>Save insight</button>
            </div>
          </div>
        </div>

      </div><!-- end chat-win -->

      <!-- ── INPUT ROW ── -->
      <div class="chat-input-row">
        <i class="fas fa-sparkles" style="color:var(--magenta);font-size:14px;flex-shrink:0;padding-bottom:2px"></i>
        <textarea
          class="chat-inp"
          id="chatInput"
          rows="1"
          placeholder="Ask anything — pipeline, revenue, ads, traffic, client health, forecasts…"
          onkeydown="handleKey(event)"
        ></textarea>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0">
          <button class="btn-icon" title="Attach context" style="width:30px;height:30px">
            <i class="fas fa-paperclip" style="font-size:11px"></i>
          </button>
          <button class="chat-send" onclick="sendMessage()" title="Send (Enter)">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div><!-- end chat-main -->

  </div>
</div>`;
}
