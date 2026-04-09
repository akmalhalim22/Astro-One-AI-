export function overviewScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── Data Sources ─────────────────────────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:7px;padding:5px 12px;background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.15);border-radius:8px;margin-bottom:12px;font-size:11px;color:var(--text-muted);flex-wrap:wrap">
    <i class="fas fa-layer-group" style="color:#a78bfa"></i>
    <strong style="color:var(--text-primary)">Blended View</strong> <span class="text-muted">·</span>
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(52,211,153,0.15);color:#34d399"><i class="fas fa-table-cells" style="font-size:9px"></i> Sheets</span>
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(66,133,244,0.15);color:#4285f4"><i class="fab fa-google" style="font-size:9px"></i> GAM</span>
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(45,212,191,0.15);color:#2dd4bf"><i class="fas fa-chart-line" style="font-size:9px"></i> Analytics</span>
    <span style="margin-left:auto;font-size:10px;color:var(--text-muted)">Real-time dashboard</span>
  </div>

  <!-- ── ROW 1: 4 HEADLINE KPIs ─────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val">RM 63.7<sup>M</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+12.4% vs LY · 94% target</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-filter"></i></div>
      <div class="kpi-lbl">Pipeline Value</div>
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
      <div class="kpi-lbl">Blended ROAS</div>
      <div class="kpi-val">3.4<sup>×</sup></div>
      <div class="kpi-chg up"><i class="fas fa-arrow-trend-up"></i>+0.4 vs last month</div>
    </div>
  </div>

  <!-- ── ROW 2: More KPIs ────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-handshake"></i></div>
      <div class="kpi-lbl">Deals Won MTD</div>
      <div class="kpi-val">17</div>
      <div class="kpi-chg up">RM 18.4M booked</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-triangle-exclamation"></i></div>
      <div class="kpi-lbl">At-Risk Deals</div>
      <div class="kpi-val">3</div>
      <div class="kpi-chg down">RM 8.7M combined</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon teal"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Engagement Rate</div>
      <div class="kpi-val">64<sup>%</sup></div>
      <div class="kpi-chg up">+3pp MoM · GA4</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon purple"><i class="fas fa-seedling"></i></div>
      <div class="kpi-lbl">Social Reach</div>
      <div class="kpi-val">2.1<sup>M</sup></div>
      <div class="kpi-chg up">+22% MoM · Sprout</div>
    </div>
  </div>

  <!-- ── ROW 3: Revenue Chart + Platform Score ──────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div>
          <div class="card-title">Revenue vs Target — Monthly</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="b b-green"><i class="fas fa-circle" style="font-size:7px"></i>On Track</span>
          <span class="card-action" onclick="navigate('revenue')">Full Report →</span>
        </div>
      </div>
      <div class="ch" style="height:165px"><canvas id="ovRevChart"></canvas></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        ${[
          ['Jan','RM 18.4M','var(--success)'],
          ['Feb','RM 21.2M','var(--success)'],
          ['Mar (est)','RM 24.1M','var(--magenta)'],
          ['Run Rate','RM 190M/yr','var(--info)'],
        ].map(([l,v,c]) => `
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">${l}</div>
          <div style="font-size:14px;font-weight:800;color:${c}">${v}</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Platform Health Score</div></div>
      <div style="display:flex;flex-direction:column;gap:13px">
        ${[
          ['Revenue Attainment','94%',94,'pf-green'],
          ['Pipeline Health','78%',78,'pf-amber'],
          ['Ad Efficiency','86%',86,'pf-blue'],
          ['Traffic Growth','71%',71,'pf-teal'],
          ['Social Engagement','82%',82,'pf-purple'],
          ['Client Health','76%',76,'pf-pink'],
        ].map(([l,v,p,f]) => `
        <div>
          <div class="flex justify-between" style="margin-bottom:5px">
            <span class="fs12 text-sec">${l}</span>
            <span class="fs12 fw7">${v}</span>
          </div>
          <div class="prog-wrap"><div class="prog-fill ${f}" style="width:${p}%"></div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ── ROW 4: Domain Snapshots ────────────────────────────── -->
  <div class="g3">
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-funnel" style="color:var(--warning);margin-right:5px"></i>Pre-Sales</div>
        <span class="card-action" onclick="navigate('pipeline')">Detail →</span>
      </div>
      ${[
        ['Pipeline','RM 87.4M','b-amber'],
        ['Deals Closing Q1','24','b-green'],
        ['Weighted Value','RM 41.2M','b-blue'],
        ['At Risk','3 deals · RM 8.7M','b-red'],
        ['Rep Attainment','94% avg','b-gray'],
      ].map(([l,v,b]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="b ${b}">${v}</span>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-rocket" style="color:var(--magenta);margin-right:5px"></i>Post-Sales</div>
        <span class="card-action" onclick="navigate('revenue')">Detail →</span>
      </div>
      ${[
        ['YTD Revenue','RM 63.7M','b-green'],
        ['Q1 Target','RM 67.6M','b-blue'],
        ['Gap Remaining','RM 3.9M','b-red'],
        ['Best Campaign','Raya 2025 · 5.2×','b-pink'],
        ['Avg Campaign ROI','4.2×','b-green'],
      ].map(([l,v,b]) => `
      <div class="stat-row">
        <span class="stat-lbl">${l}</span><span class="b ${b}">${v}</span>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-signal" style="color:var(--teal);margin-right:5px"></i>Traffic & Social</div>
        <span class="card-action" onclick="navigate('portals')">Detail →</span>
      </div>
      ${[
        ['Sessions','4.2M','b-blue'],
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

  <!-- ── ROW 5: Ads table + Donut ──────────────────────────── -->
  <div class="g2" style="margin-bottom:0">
    <div class="card">
      <div class="card-hd">
        <div class="card-title">Ads Performance Summary</div>
        <span class="card-action" onclick="navigate('ads')">Full Ads Report →</span>
      </div>
      <table class="tbl">
        <thead>
          <tr><th>Platform</th><th>Spend</th><th>Impressions</th><th>CTR</th><th>ROAS</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${[
            ['Google Ads','fa-google','#4285f4','RM 1.2M','8.4M','4.2%','3.8×','b-green','On Target'],
            ['Meta Ads','fa-meta','#1877f2','RM 980K','12.1M','3.1%','2.9×','b-amber','Watch'],
            ['TikTok Ads','fa-tiktok','#ff0050','RM 620K','18.6M','5.4%','3.1×','b-green','On Target'],
          ].map(([p,ic,col,s,i,c,r,b,st]) => `
          <tr>
            <td>
              <div class="flex items-center gap8">
                <i class="fab ${ic}" style="color:${col};font-size:12px"></i>
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

    <div class="card">
      <div class="card-hd"><div class="card-title">Ad Spend Channel Mix</div></div>
      <div class="ch" style="height:145px"><canvas id="adsMixChart"></canvas></div>
      <div class="flex justify-between" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
        ${[['Google','43%','#4285f4'],['Meta','35%','#1877f2'],['TikTok','22%','#ff0050']].map(([p,v,c]) => `
        <div style="text-align:center">
          <div style="width:10px;height:10px;border-radius:50%;background:${c};margin:0 auto 5px"></div>
          <div class="fs11 text-muted">${p}</div>
          <div class="fw7 fs14">${v}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

</div>

<script>
// ── Load real data for Overview dashboard ────────────────────────────────
let _ovData = {revenue: 0, pipeline: 0, gamOrders: 0, gamLineItems: 0};

async function loadOverviewKPIs(){
  try {
    // Fetch KPIs
    const kpiRes = await fetch('/api/kpis').then(r=>r.json()).catch(()=>({ok:false}));
    if(kpiRes.ok){
      _ovData.revenue = kpiRes.totalRevenue || 0;
      _ovData.pipeline = kpiRes.totalPipeline || 0;
      console.log('Overview KPIs loaded:', kpiRes);
    }
    
    // Fetch GAM data
    const gamRes = await fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(()=>({ok:false}));
    if(gamRes.ok){
      _ovData.gamOrders = gamRes.orders?.total || 0;
      _ovData.gamLineItems = gamRes.lineItems?.total || 0;
      console.log('Overview GAM loaded:', gamRes);
    }
    
    updateOverviewKPIs();
  } catch(e){
    console.error('Overview data load error:', e);
  }
}

function updateOverviewKPIs(){
  // Update YTD Revenue
  if(_ovData.revenue > 0){
    const revKpi = document.querySelector('.kpi.accent .kpi-val');
    if(revKpi){
      const val = _ovData.revenue;
      const fmt = val >= 1e6 ? 'RM ' + (val/1e6).toFixed(1) + '<sup>M</sup>' : 
                  val >= 1e3 ? 'RM ' + (val/1e3).toFixed(1) + '<sup>K</sup>' :
                  'RM ' + val.toFixed(0);
      revKpi.innerHTML = fmt;
    }
  }
  
  // Update Pipeline
  if(_ovData.pipeline > 0){
    const kpis = document.querySelectorAll('.kpi');
    if(kpis[1]){
      const pipeVal = kpis[1].querySelector('.kpi-val');
      if(pipeVal){
        const val = _ovData.pipeline;
        const fmt = val >= 1e6 ? 'RM ' + (val/1e6).toFixed(1) + '<sup>M</sup>' : 
                    val >= 1e3 ? 'RM ' + (val/1e3).toFixed(1) + '<sup>K</sup>' :
                    'RM ' + val.toFixed(0);
        pipeVal.innerHTML = fmt;
      }
    }
  }
  
  console.log('Overview KPIs updated on screen');
}

// Auto-load
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadOverviewKPIs);
else setTimeout(loadOverviewKPIs,80);
</script>
`;
}
