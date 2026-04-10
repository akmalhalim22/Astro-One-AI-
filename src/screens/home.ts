export function homeScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── WELCOME BANNER ──────────────────────────────────────── -->
  <div class="banner">
    <div class="banner-eyebrow"><i class="fas fa-sparkles" style="margin-right:6px"></i>AI-Powered · Live Data</div>
    <div class="banner-title">Welcome back —<br>your digital performance, <span>at a glance</span>.</div>
    <div class="banner-desc" id="homeBannerDesc">
      Loading live data from connected sources…
    </div>
    <div class="quick-pills">
      <a class="pill" onclick="navigate('revenue')" href="javascript:void(0)">
        <i class="fas fa-chart-line" style="color:var(--magenta)"></i>Revenue Performance
      </a>
      <a class="pill" onclick="navigate('campaign')" href="javascript:void(0)">
        <i class="fas fa-bullhorn" style="color:var(--info)"></i>Campaign Data
      </a>
      <a class="pill" onclick="navigate('gamanalytics')" href="javascript:void(0)">
        <i class="fas fa-rectangle-ad" style="color:var(--teal)"></i>GAM Analytics
      </a>
      <a class="pill" onclick="navigate('ai')" href="javascript:void(0)">
        <i class="fas fa-sparkles" style="color:var(--success)"></i>AI Insights
      </a>
    </div>
  </div>

  <!-- ── TOP 4 KPIs ──────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val" id="home-kpi-revenue"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="home-kpi-revenue-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-filter"></i></div>
      <div class="kpi-lbl">Campaign Revenue</div>
      <div class="kpi-val" id="home-kpi-campaign"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="home-kpi-campaign-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-list-check"></i></div>
      <div class="kpi-lbl">GAM Orders</div>
      <div class="kpi-val" id="home-kpi-orders"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="home-kpi-orders-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Impressions Delivered</div>
      <div class="kpi-val" id="home-kpi-impr"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="home-kpi-impr-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
  </div>

  <!-- ── REVENUE CHART + DATA STATUS ────────────────────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div>
          <div class="card-title">Revenue Trend</div>
          <div class="fs11 text-muted" id="homeRevSubTitle">from Google Sheets</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted)">
            <div style="width:8px;height:8px;border-radius:2px;background:var(--magenta)"></div>Revenue
            <div style="width:8px;height:8px;border-radius:2px;background:rgba(245,158,11,0.6);margin-left:4px"></div>Target
          </div>
          <span class="card-action" onclick="navigate('revenue')">Full Report →</span>
        </div>
      </div>
      <div class="ch" style="height:148px"><canvas id="homeRevChart"></canvas></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">Total Revenue</div>
          <div style="font-size:15px;font-weight:800;color:var(--success)" id="homeRevTotal">—</div>
        </div>
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">Target</div>
          <div style="font-size:15px;font-weight:800;color:var(--text-secondary)" id="homeRevTarget">—</div>
        </div>
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">Revenue Records</div>
          <div style="font-size:15px;font-weight:800;color:var(--text-primary)" id="homeRevCount">—</div>
        </div>
        <div style="padding:0 12px">
          <div class="fs11 text-muted" style="margin-bottom:3px">Attainment</div>
          <div style="font-size:15px;font-weight:800;color:var(--magenta)" id="homeRevAtt">—</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-database" style="color:var(--info);margin-right:5px"></i>Data Source Status</div>
        <span class="card-action" onclick="navigate('apiconn')">Manage →</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px" id="homeDataSources">
        <div class="text-muted fs12" style="text-align:center;padding:20px"><i class="fas fa-spinner fa-spin"></i> Checking connections…</div>
      </div>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
        <button class="btn-ghost" style="width:100%;justify-content:center;font-size:11px" onclick="loadHomeKPIs()">
          <i class="fas fa-rotate"></i>Refresh All
        </button>
      </div>
    </div>
  </div>

  <!-- ── SECONDARY KPIs ────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi">
      <div class="kpi-icon purple"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Campaign Records</div>
      <div class="kpi-val" id="home-kpi-camp-count"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg text-muted" id="home-kpi-camp-count-sub">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon teal"><i class="fas fa-layer-group"></i></div>
      <div class="kpi-lbl">GAM Line Items</div>
      <div class="kpi-val" id="home-kpi-li"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg text-muted" id="home-kpi-li-sub">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-mouse-pointer"></i></div>
      <div class="kpi-lbl">GAM Clicks</div>
      <div class="kpi-val" id="home-kpi-clicks"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg text-muted" id="home-kpi-clicks-sub">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-network-wired"></i></div>
      <div class="kpi-lbl">GAM Network</div>
      <div class="kpi-val fs14" id="home-kpi-network" style="font-size:14px;line-height:1.3"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg text-muted" id="home-kpi-network-sub">Loading…</div>
    </div>
  </div>

  <!-- ── SNAPSHOTS ─────────────────────────────────────────────── -->
  <div class="g3">
    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-rocket" style="color:var(--magenta);margin-right:5px"></i>Revenue Snapshot</div>
        <span class="card-action" onclick="navigate('revenue')">Detail →</span>
      </div>
      <div id="homeRevSnapshot" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>

    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-bullhorn" style="color:var(--info);margin-right:5px"></i>Campaign Snapshot</div>
        <span class="card-action" onclick="navigate('campaign')">Detail →</span>
      </div>
      <div id="homeCampSnapshot" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>

    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:12px">
        <div class="card-title"><i class="fas fa-rectangle-ad" style="color:var(--teal);margin-right:5px"></i>GAM Snapshot</div>
        <span class="card-action" onclick="navigate('gamanalytics')">Detail →</span>
      </div>
      <div id="homeGAMSnapshot" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
  </div>

</div>

<script>
// ── Home screen — live data loader ────────────────────────────────────────
let _homeRevChart = null;

function homeFmt(n){
  n = parseFloat(n)||0;
  if(n>=1e9) return 'RM '+(n/1e9).toFixed(2)+'B';
  if(n>=1e6) return 'RM '+(n/1e6).toFixed(2)+'M';
  if(n>=1e3) return 'RM '+(n/1e3).toFixed(1)+'K';
  return 'RM '+n.toFixed(0);
}
function homeFmtShort(n){
  n = parseFloat(n)||0;
  if(n>=1e9) return (n/1e9).toFixed(1)+'B';
  if(n>=1e6) return (n/1e6).toFixed(1)+'M';
  if(n>=1e3) return (n/1e3).toFixed(1)+'K';
  return n===0?'—':n.toLocaleString();
}

function homeSetEl(id, val){ const el=document.getElementById(id); if(el) el.innerHTML=val; }

async function loadHomeKPIs(){
  // Show loading state
  homeSetEl('homeBannerDesc', 'Loading live data from connected sources…');

  // Parallel fetches
  const [kpiRes, gamRes] = await Promise.all([
    fetch('/api/kpis').then(r=>r.json()).catch(e=>({ok:false,error:e.message})),
    fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(e=>({ok:false,error:e.message}))
  ]);

  console.log('[Home] KPI response:', kpiRes);
  console.log('[Home] GAM response:', gamRes);

  // ── Revenue KPI ────────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalRevenue > 0){
    homeSetEl('home-kpi-revenue', homeFmt(kpiRes.totalRevenue));
    homeSetEl('home-kpi-revenue-sub', '<span class="up"><i class="fas fa-circle-check" style="font-size:9px"></i> '+kpiRes.revenueCount+' records loaded</span>');
    homeSetEl('homeRevTotal', homeFmt(kpiRes.totalRevenue));
    homeSetEl('homeRevTarget', kpiRes.totalTarget>0 ? homeFmt(kpiRes.totalTarget) : '—');
    homeSetEl('homeRevCount', (kpiRes.revenueCount||0)+' rows');
    const att = kpiRes.totalTarget>0 ? (kpiRes.totalRevenue/kpiRes.totalTarget*100).toFixed(1)+'%' : '—';
    homeSetEl('homeRevAtt', att);
    homeSetEl('homeRevSubTitle', kpiRes.revenueCount+' rows from Google Sheets · revenue tab');
  } else if(kpiRes.ok && kpiRes.totalRevenue === 0) {
    homeSetEl('home-kpi-revenue', '—');
    homeSetEl('home-kpi-revenue-sub', '<span style="color:var(--text-muted)">No revenue data in sheet</span>');
    homeSetEl('homeRevTotal', '—'); homeSetEl('homeRevTarget', '—'); homeSetEl('homeRevCount', '0 rows'); homeSetEl('homeRevAtt', '—');
  } else {
    homeSetEl('home-kpi-revenue', '—');
    homeSetEl('home-kpi-revenue-sub', '<span style="color:#f59e0b"><i class="fas fa-plug"></i> Sheets not connected</span>');
    homeSetEl('homeRevTotal', '—'); homeSetEl('homeRevTarget', '—'); homeSetEl('homeRevCount', '—'); homeSetEl('homeRevAtt', '—');
    homeSetEl('homeRevSubTitle', 'Google Sheets not connected');
  }

  // ── Campaign KPI ───────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalCampaign > 0){
    homeSetEl('home-kpi-campaign', homeFmt(kpiRes.totalCampaign));
    homeSetEl('home-kpi-campaign-sub', '<span class="up"><i class="fas fa-circle-check" style="font-size:9px"></i> '+kpiRes.campaignCount+' records</span>');
    homeSetEl('home-kpi-camp-count', (kpiRes.campaignCount||0).toLocaleString());
    homeSetEl('home-kpi-camp-count-sub', '<span class="text-muted">direct campaign tab</span>');
  } else {
    homeSetEl('home-kpi-campaign', '—');
    homeSetEl('home-kpi-campaign-sub', '<span style="color:var(--text-muted)">'+( kpiRes.ok ? 'No campaign data' : 'Sheets not connected' )+'</span>');
    homeSetEl('home-kpi-camp-count', '—');
    homeSetEl('home-kpi-camp-count-sub', kpiRes.ok ? '<span class="text-muted">No campaign records</span>' : '<span style="color:#f59e0b">Not connected</span>');
  }

  // ── GAM KPIs ───────────────────────────────────────────────────
  if(gamRes.ok){
    const orders = gamRes.orders?.total || 0;
    const active = (gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr = gamRes.lineItems?.totalImpressions || 0;
    const clicks = gamRes.lineItems?.totalClicks || 0;
    const li = gamRes.lineItems?.total || 0;
    const ctr = impr>0 ? (clicks/impr*100).toFixed(2)+'%' : '—';

    homeSetEl('home-kpi-orders', orders.toLocaleString());
    homeSetEl('home-kpi-orders-sub', '<span class="up">'+active+' active/delivering</span>');
    homeSetEl('home-kpi-impr', homeFmtShort(impr));
    homeSetEl('home-kpi-impr-sub', '<span class="text-muted">'+homeFmtShort(clicks)+' clicks · '+ctr+'</span>');
    homeSetEl('home-kpi-li', li.toLocaleString());
    homeSetEl('home-kpi-li-sub', '<span class="text-muted">line items in GAM</span>');
    homeSetEl('home-kpi-clicks', homeFmtShort(clicks));
    homeSetEl('home-kpi-clicks-sub', '<span class="text-muted">CTR: '+ctr+'</span>');
    homeSetEl('home-kpi-network', gamRes.networkName || gamRes.networkCode || '—');
    homeSetEl('home-kpi-network-sub', '<span class="text-muted">'+(gamRes.currency||'')+' · '+(gamRes.timeZone||'')||'connected</span>');
  } else {
    ['home-kpi-orders','home-kpi-impr','home-kpi-li','home-kpi-clicks','home-kpi-network'].forEach(id=>homeSetEl(id,'—'));
    const notConn = '<span style="color:#f59e0b"><i class="fas fa-plug"></i> GAM not connected</span>';
    ['home-kpi-orders-sub','home-kpi-impr-sub','home-kpi-li-sub','home-kpi-clicks-sub','home-kpi-network-sub'].forEach(id=>homeSetEl(id,notConn));
  }

  // ── Revenue chart ──────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.revenueByMonth && Object.keys(kpiRes.revenueByMonth).length>0){
    const months = Object.keys(kpiRes.revenueByMonth).sort();
    const revVals = months.map(m=>kpiRes.revenueByMonth[m]||0);
    const ctx = document.getElementById('homeRevChart');
    if(ctx){
      if(_homeRevChart){_homeRevChart.destroy();_homeRevChart=null;}
      _homeRevChart = new Chart(ctx, {
        type:'line',
        data:{
          labels: months,
          datasets:[{
            label:'Revenue',data:revVals,
            borderColor:'#ec4899',backgroundColor:'rgba(236,72,153,0.12)',
            fill:true,tension:0.4,pointRadius:3,borderWidth:2
          }]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
          scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#a0a0c0',font:{size:9}}},
            y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#a0a0c0',font:{size:9},callback:v=>homeFmtShort(v)}}}}
      });
    }
  } else {
    const ctx = document.getElementById('homeRevChart');
    if(ctx){
      const ctx2 = ctx.getContext('2d');
      ctx2.fillStyle='rgba(255,255,255,0.03)';ctx2.fillRect(0,0,ctx.width,ctx.height);
      ctx2.fillStyle='#a0a0c0';ctx2.font='11px sans-serif';ctx2.textAlign='center';
      ctx2.fillText(kpiRes.ok?'No monthly revenue data in sheet':'Connect Google Sheets to see chart',ctx.width/2,ctx.height/2);
    }
  }

  // ── Revenue Snapshot ───────────────────────────────────────────
  if(kpiRes.ok && kpiRes.revenueByPortal && Object.keys(kpiRes.revenueByPortal).length>0){
    const portals = Object.entries(kpiRes.revenueByPortal).sort((a,b)=>b[1]-a[1]).slice(0,5);
    homeSetEl('homeRevSnapshot', portals.map(([p,v])=>
      '<div class="stat-row"><span class="stat-lbl">'+p+'</span><span class="b b-green">'+homeFmt(v)+'</span></div>'
    ).join(''));
  } else if(kpiRes.ok){
    homeSetEl('homeRevSnapshot', '<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-info-circle" style="margin-right:5px"></i>No revenue breakdown available</div>');
  } else {
    homeSetEl('homeRevSnapshot', '<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-plug" style="color:#f59e0b;margin-right:5px"></i>Connect Google Sheets to see data</div>');
  }

  // ── Campaign Snapshot ─────────────────────────────────────────
  if(kpiRes.ok && kpiRes.campaignCount>0){
    homeSetEl('homeCampSnapshot', [
      ['Total Revenue', homeFmt(kpiRes.totalCampaign), 'b-green'],
      ['Records', kpiRes.campaignCount+' campaigns', 'b-blue'],
    ].map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    homeSetEl('homeCampSnapshot', '<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-'+(kpiRes.ok?'info-circle':'plug')+'" style="color:'+(kpiRes.ok?'var(--text-muted)':'#f59e0b')+';margin-right:5px"></i>'+(kpiRes.ok?'No campaign data in sheet':'Connect Google Sheets')+'</div>');
  }

  // ── GAM Snapshot ───────────────────────────────────────────────
  if(gamRes.ok){
    const orders=gamRes.orders?.total||0;
    const active=(gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr=gamRes.lineItems?.totalImpressions||0;
    const li=gamRes.lineItems?.total||0;
    homeSetEl('homeGAMSnapshot',[
      ['Network', gamRes.networkName||gamRes.networkCode||'—', 'b-blue'],
      ['Orders', orders+' total', 'b-green'],
      ['Active', active+' active/delivering', 'b-green'],
      ['Line Items', li+' total', 'b-purple'],
      ['Impressions', homeFmtShort(impr), 'b-amber'],
    ].map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    homeSetEl('homeGAMSnapshot', '<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-plug" style="color:#f59e0b;margin-right:5px"></i>Connect GAM API to see data<br><a href="#" onclick="navigate(\'apiconn\')" style="color:#60a5fa;font-size:10px">Set up in API Connections</a></div>');
  }

  // ── Data source status panel ───────────────────────────────────
  const sheetsOk = kpiRes.ok;
  const gamOk = gamRes.ok;
  homeSetEl('homeDataSources', [
    { name:'Google Sheets', desc:'Revenue & Campaign data', ok: sheetsOk,
      detail: sheetsOk ? (kpiRes.revenueCount||0)+' rev rows · '+(kpiRes.campaignCount||0)+' camp rows' : 'Not connected' },
    { name:'Google Ad Manager', desc:'Orders, Line Items, Impressions', ok: gamOk,
      detail: gamOk ? (gamRes.orders?.total||0)+' orders · '+(gamRes.lineItems?.total||0)+' LIs' : 'Not connected' },
    { name:'GA4 / Traffic', desc:'Web analytics', ok: false, detail: 'Not yet connected' },
  ].map(s=>'<div style="display:flex;align-items:center;gap:9px;padding:7px 10px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--border)">'+
    '<div class="dot '+(s.ok?'dot-green':'dot-amber')+'"></div>'+
    '<div style="flex:1;min-width:0"><div class="fs12 fw6 truncate">'+s.name+'</div><div class="fs10 text-muted truncate">'+s.desc+'</div></div>'+
    '<div class="fs10 text-muted" style="text-align:right;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+s.detail+'</div>'+
    '</div>'
  ).join(''));

  // ── Banner description ─────────────────────────────────────────
  const parts = [];
  if(sheetsOk) parts.push((kpiRes.revenueCount||0)+' revenue records · '+(kpiRes.campaignCount||0)+' campaign records loaded from Google Sheets');
  else parts.push('Google Sheets not connected');
  if(gamOk) parts.push((gamRes.orders?.total||0)+' GAM orders loaded');
  else parts.push('GAM API not connected');
  homeSetEl('homeBannerDesc', parts.join(' · '));
  
  console.log('[Home] Dashboard updated successfully');
}

// Auto-load when page ready
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadHomeKPIs);
else setTimeout(loadHomeKPIs,80);
</script>
`;
}
