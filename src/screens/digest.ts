export function digestScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── Data Sources ─────────────────────────────────────────────────────── -->
  <div style="display:flex;align-items:center;gap:7px;padding:5px 12px;background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.15);border-radius:8px;margin-bottom:12px;font-size:11px;color:var(--text-muted);flex-wrap:wrap">
    <i class="fas fa-newspaper" style="color:#f59e0b"></i>
    <strong style="color:var(--text-primary)">Daily Digest</strong> <span class="text-muted">·</span> Aggregated from:
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(52,211,153,0.15);color:#34d399">Sheets</span>
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(66,133,244,0.15);color:#4285f4">GAM</span>
    <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(45,212,191,0.15);color:#2dd4bf">Analytics</span>
    <span style="margin-left:auto;font-size:10px" id="digestTimestamp">Loading…</span>
  </div>

  <!-- ── HEADER ──────────────────────────────────────────────── -->
  <div class="digest-hd">
    <div style="flex:1;min-width:0">
      <div style="font-size:10.5px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--magenta);margin-bottom:6px" id="digestDateLine">
        <i class="fas fa-calendar-day" style="margin-right:5px"></i><span id="digestDate">Loading date…</span>
      </div>
      <div style="font-size:22px;font-weight:800;margin-bottom:8px;line-height:1.25;letter-spacing:-0.3px">
        Your data at a glance —<br>
        <span style="color:var(--text-secondary)">live from connected sources.</span>
      </div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.65;margin-bottom:18px;max-width:540px" id="digestSummary">
        Loading live data from Google Sheets and GAM API…
      </div>
      <div style="display:flex;gap:9px;flex-wrap:wrap">
        <button class="btn-primary" onclick="navigate('ai')">
          <i class="fas fa-sparkles"></i>Explore with AI
        </button>
        <button class="btn-ghost" onclick="loadDigestKPIs()"><i class="fas fa-rotate"></i>Refresh</button>
      </div>
    </div>
    <div style="text-align:center;flex-shrink:0">
      <div class="score-ring" id="digestScoreRing">
        <div class="score-v" id="digestScore">—</div>
        <div class="score-l">Score</div>
      </div>
      <div class="fs11 text-muted" style="margin-top:7px" id="digestScoreSub">Calculating…</div>
      <div style="margin-top:10px;display:flex;gap:8px;justify-content:center">
        <div style="text-align:center">
          <div class="fw7 fs14" id="digestRevCount" style="color:var(--text-primary)">—</div>
          <div class="fs10 text-muted">Rev Rows</div>
        </div>
        <div style="text-align:center">
          <div class="fw7 fs14" id="digestCampCount" style="color:var(--text-primary)">—</div>
          <div class="fs10 text-muted">Campaigns</div>
        </div>
        <div style="text-align:center">
          <div class="fw7 fs14" id="digestOrderCount" style="color:var(--text-primary)">—</div>
          <div class="fs10 text-muted">GAM Orders</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── 4 KPIs ───────────────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val" id="dig-kpi-revenue"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="dig-kpi-revenue-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-bullhorn"></i></div>
      <div class="kpi-lbl">Campaign Revenue</div>
      <div class="kpi-val" id="dig-kpi-campaign"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="dig-kpi-campaign-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">GAM Orders</div>
      <div class="kpi-val" id="dig-kpi-orders"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="dig-kpi-orders-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Impressions Delivered</div>
      <div class="kpi-val" id="dig-kpi-impr"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="dig-kpi-impr-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
  </div>

  <!-- ── LIVE DATA BREAKDOWN ───────────────────────────────────── -->
  <div class="g3" style="margin-bottom:14px">
    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:10px">
        <div class="card-title"><i class="fas fa-sack-dollar" style="color:var(--magenta);margin-right:5px"></i>Revenue Summary</div>
        <span class="card-action" onclick="navigate('revenue')">Detail →</span>
      </div>
      <div id="digRevBreakdown" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:14px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:10px">
        <div class="card-title"><i class="fas fa-bullhorn" style="color:var(--info);margin-right:5px"></i>Campaign Summary</div>
        <span class="card-action" onclick="navigate('campaign')">Detail →</span>
      </div>
      <div id="digCampBreakdown" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:14px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
    <div class="card card-sm">
      <div class="card-hd" style="margin-bottom:10px">
        <div class="card-title"><i class="fas fa-rectangle-ad" style="color:var(--teal);margin-right:5px"></i>GAM Summary</div>
        <span class="card-action" onclick="navigate('gamanalytics')">Detail →</span>
      </div>
      <div id="digGAMBreakdown" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:14px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
  </div>

  <!-- ── MAIN 2-COL CONTENT ───────────────────────────────────── -->
  <div class="g62" style="margin-bottom:0">
    <!-- LEFT: Insights ─────────────────────────── -->
    <div>
      <div class="sec-label" style="color:var(--info)">
        <i class="fas fa-circle-info" style="margin-right:4px"></i>Data Insights — from live connected sources
      </div>
      <div id="digInsights">
        <div class="text-muted fs12" style="text-align:center;padding:24px"><i class="fas fa-spinner fa-spin" style="font-size:18px"></i><br><span style="display:block;margin-top:8px">Loading insights from connected data sources…</span></div>
      </div>
    </div>

    <!-- RIGHT: Data Status + Links ── -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-hd"><div class="card-title">Connection Status</div></div>
        <div id="digConnStatus" style="display:flex;flex-direction:column;gap:8px">
          <div class="text-muted fs12" style="text-align:center;padding:14px"><i class="fas fa-spinner fa-spin"></i></div>
        </div>
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
          <button class="btn-ghost" style="width:100%;justify-content:center;font-size:11px" onclick="navigate('apiconn')">
            <i class="fas fa-plug"></i>Manage Connections
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-sparkles" style="color:var(--magenta);margin-right:5px"></i>Quick Actions</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:7px">
          <button class="btn-ghost" style="justify-content:flex-start;font-size:12px" onclick="navigate('revenue')">
            <i class="fas fa-chart-line" style="color:var(--magenta)"></i>Revenue Performance →
          </button>
          <button class="btn-ghost" style="justify-content:flex-start;font-size:12px" onclick="navigate('campaign')">
            <i class="fas fa-bullhorn" style="color:var(--info)"></i>Campaign Analysis →
          </button>
          <button class="btn-ghost" style="justify-content:flex-start;font-size:12px" onclick="navigate('gamanalytics')">
            <i class="fas fa-rectangle-ad" style="color:var(--teal)"></i>GAM Analytics →
          </button>
          <button class="btn-ghost" style="justify-content:flex-start;font-size:12px" onclick="navigate('ai')">
            <i class="fas fa-sparkles" style="color:var(--success)"></i>Ask AI a Question →
          </button>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
// ── Digest screen — live data loader ─────────────────────────────────────
function digFmt(n){
  n=parseFloat(n)||0;
  if(n>=1e9) return 'RM '+(n/1e9).toFixed(2)+'B';
  if(n>=1e6) return 'RM '+(n/1e6).toFixed(2)+'M';
  if(n>=1e3) return 'RM '+(n/1e3).toFixed(1)+'K';
  return 'RM '+n.toFixed(0);
}
function digFmtShort(n){
  n=parseFloat(n)||0;
  if(n>=1e9) return (n/1e9).toFixed(1)+'B';
  if(n>=1e6) return (n/1e6).toFixed(1)+'M';
  if(n>=1e3) return (n/1e3).toFixed(1)+'K';
  return n===0?'—':n.toLocaleString();
}
function digSetEl(id,val){ const el=document.getElementById(id); if(el) el.innerHTML=val; }

// Set date
(function(){
  const d=new Date();
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const weekNum=Math.ceil(((d-new Date(d.getFullYear(),0,1))/86400000+new Date(d.getFullYear(),0,1).getDay()+1)/7);
  digSetEl('digestDate', days[d.getDay()]+' · '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+' · Week '+weekNum+' of 52');
  digSetEl('digestTimestamp', 'Today '+d.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'}));
})();

async function loadDigestKPIs(){
  const [kpiRes, gamRes] = await Promise.all([
    fetch('/api/kpis').then(r=>r.json()).catch(e=>({ok:false,error:e.message})),
    fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(e=>({ok:false,error:e.message}))
  ]);

  console.log('[Digest] KPI response:', kpiRes);
  console.log('[Digest] GAM response:', gamRes);

  // ── Summary counts ─────────────────────────────────────────────
  digSetEl('digestRevCount', (kpiRes.ok && kpiRes.revenueCount) ? kpiRes.revenueCount : '—');
  digSetEl('digestCampCount', (kpiRes.ok && kpiRes.campaignCount) ? kpiRes.campaignCount : '—');
  digSetEl('digestOrderCount', (gamRes.ok && gamRes.orders?.total) ? gamRes.orders.total : '—');

  // ── Score calculation ──────────────────────────────────────────
  let score = 0, scoreCount = 0;
  if(kpiRes.ok && kpiRes.totalRevenue > 0) { score += 70; scoreCount++; }
  if(kpiRes.ok && kpiRes.campaignCount > 0) { score += 70; scoreCount++; }
  if(gamRes.ok && gamRes.orders?.total > 0) { score += 70; scoreCount++; }
  const finalScore = scoreCount > 0 ? Math.round(score / scoreCount) : 0;
  digSetEl('digestScore', finalScore > 0 ? finalScore : '—');
  digSetEl('digestScoreSub', scoreCount+' data source'+(scoreCount!==1?'s':'')+' connected');

  // ── Revenue KPI ────────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalRevenue > 0){
    digSetEl('dig-kpi-revenue', digFmt(kpiRes.totalRevenue));
    const att = kpiRes.totalTarget>0 ? ' · '+(kpiRes.totalRevenue/kpiRes.totalTarget*100).toFixed(1)+'% target' : '';
    digSetEl('dig-kpi-revenue-sub', '<span class="up">'+kpiRes.revenueCount+' records'+att+'</span>');
  } else {
    digSetEl('dig-kpi-revenue', '—');
    digSetEl('dig-kpi-revenue-sub', '<span style="color:var(--text-muted)">'+(kpiRes.ok?'No revenue data':'Sheets not connected')+'</span>');
  }

  // ── Campaign KPI ───────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalCampaign > 0){
    digSetEl('dig-kpi-campaign', digFmt(kpiRes.totalCampaign));
    digSetEl('dig-kpi-campaign-sub', '<span class="up">'+kpiRes.campaignCount+' campaigns</span>');
  } else {
    digSetEl('dig-kpi-campaign', '—');
    digSetEl('dig-kpi-campaign-sub', '<span style="color:var(--text-muted)">'+(kpiRes.ok?'No campaign data':'Not connected')+'</span>');
  }

  // ── GAM KPIs ───────────────────────────────────────────────────
  if(gamRes.ok){
    const orders=gamRes.orders?.total||0;
    const active=(gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr=gamRes.lineItems?.totalImpressions||0;
    const clicks=gamRes.lineItems?.totalClicks||0;
    const ctr=impr>0?(clicks/impr*100).toFixed(2)+'%':'—';
    digSetEl('dig-kpi-orders', orders.toLocaleString());
    digSetEl('dig-kpi-orders-sub', '<span class="up">'+active+' active/delivering</span>');
    digSetEl('dig-kpi-impr', digFmtShort(impr));
    digSetEl('dig-kpi-impr-sub', '<span class="text-muted">'+digFmtShort(clicks)+' clicks · '+ctr+'</span>');
  } else {
    digSetEl('dig-kpi-orders', '—');
    digSetEl('dig-kpi-orders-sub', '<span style="color:#f59e0b">GAM not connected</span>');
    digSetEl('dig-kpi-impr', '—');
    digSetEl('dig-kpi-impr-sub', '<span style="color:#f59e0b">Not connected</span>');
  }

  // ── Revenue breakdown card ─────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalRevenue > 0){
    const rows=[['Total Revenue', digFmt(kpiRes.totalRevenue), 'b-green']];
    if(kpiRes.totalTarget>0) rows.push(['Target', digFmt(kpiRes.totalTarget), 'b-blue']);
    if(kpiRes.totalTarget>0) rows.push(['Attainment', (kpiRes.totalRevenue/kpiRes.totalTarget*100).toFixed(1)+'%', 'b-pink']);
    rows.push(['Records', kpiRes.revenueCount+' rows', 'b-gray']);
    digSetEl('digRevBreakdown', rows.map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    digSetEl('digRevBreakdown', '<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-'+(kpiRes.ok?'info-circle':'plug')+'" style="color:'+(kpiRes.ok?'var(--text-muted)':'#f59e0b')+';margin-right:5px"></i>'+(kpiRes.ok?'No revenue data in sheet':'Connect Google Sheets')+'</div>');
  }

  // ── Campaign breakdown card ────────────────────────────────────
  if(kpiRes.ok && kpiRes.campaignCount > 0){
    digSetEl('digCampBreakdown',[
      ['Total Revenue', digFmt(kpiRes.totalCampaign), 'b-green'],
      ['Campaigns', kpiRes.campaignCount+' records', 'b-blue'],
    ].map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    digSetEl('digCampBreakdown','<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-'+(kpiRes.ok?'info-circle':'plug')+'" style="color:'+(kpiRes.ok?'var(--text-muted)':'#f59e0b')+';margin-right:5px"></i>'+(kpiRes.ok?'No campaign data in sheet':'Connect Google Sheets')+'</div>');
  }

  // ── GAM breakdown card ─────────────────────────────────────────
  if(gamRes.ok){
    const orders=gamRes.orders?.total||0, active=(gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr=gamRes.lineItems?.totalImpressions||0, li=gamRes.lineItems?.total||0;
    digSetEl('digGAMBreakdown',[
      ['Network', gamRes.networkName||gamRes.networkCode||'—', 'b-blue'],
      ['Orders', orders+' total', 'b-green'],
      ['Active', active+' delivering', 'b-green'],
      ['Line Items', li+' total', 'b-purple'],
      ['Impressions', digFmtShort(impr), 'b-amber'],
    ].map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    digSetEl('digGAMBreakdown','<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-plug" style="color:#f59e0b;margin-right:5px"></i>GAM not connected<br><a href="#" onclick="navigate(\'apiconn\')" style="color:#60a5fa;font-size:10px">Set up in API Connections</a></div>');
  }

  // ── Connection status ──────────────────────────────────────────
  const sheetsOk = kpiRes.ok;
  const gamOk = gamRes.ok;
  digSetEl('digConnStatus',[
    {name:'Google Sheets', ok:sheetsOk, detail:sheetsOk?(kpiRes.revenueCount||0)+' rev · '+(kpiRes.campaignCount||0)+' camp':'Not connected'},
    {name:'GAM API', ok:gamOk, detail:gamOk?(gamRes.orders?.total||0)+' orders':'Not connected'},
    {name:'GA4 / Traffic', ok:false, detail:'Not yet connected'},
  ].map(s=>'<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--border)">'+
    '<div class="dot '+(s.ok?'dot-green':'dot-amber')+'"></div>'+
    '<div style="flex:1"><div class="fs12 fw6">'+s.name+'</div></div>'+
    '<div class="fs11 text-muted">'+s.detail+'</div></div>'
  ).join(''));

  // ── Insights ───────────────────────────────────────────────────
  const insights=[];
  if(kpiRes.ok && kpiRes.totalRevenue > 0){
    const att=kpiRes.totalTarget>0?(kpiRes.totalRevenue/kpiRes.totalTarget*100).toFixed(1):null;
    insights.push({
      icon:'fa-sack-dollar', color:'var(--success)', bg:'var(--success-dim)',
      title:'Revenue: '+digFmt(kpiRes.totalRevenue)+' from '+kpiRes.revenueCount+' records',
      body: att ? 'Revenue attainment is at <strong>'+att+'%</strong> of target ('+digFmt(kpiRes.totalTarget)+'). '+(parseFloat(att)>=100?'Target achieved!':parseFloat(att)>=80?'On track to meet target.':'Below target — review revenue performance.') : 'Revenue data loaded from Google Sheets. '+(kpiRes.revenueCount||0)+' records available for analysis.',
      badge:'b-green', badgeLbl:'Revenue', navId:'revenue'
    });
  } else if(!kpiRes.ok){
    insights.push({icon:'fa-plug',color:'#f59e0b',bg:'rgba(245,158,11,0.1)',title:'Google Sheets not connected',body:'Connect your Google Sheets to see revenue and campaign data in the digest. Visit API Connections to set up.',badge:'b-amber',badgeLbl:'Setup Required',navId:'apiconn'});
  } else {
    insights.push({icon:'fa-info-circle',color:'var(--info)',bg:'var(--info-dim)',title:'No revenue data in Google Sheets',body:'The revenue tab is empty or has no readable data. Ensure the "revenue" tab exists with the correct column headers.',badge:'b-blue',badgeLbl:'No Data',navId:'revenue'});
  }

  if(kpiRes.ok && kpiRes.campaignCount > 0){
    insights.push({
      icon:'fa-bullhorn', color:'var(--info)', bg:'var(--info-dim)',
      title:'Campaign data: '+digFmt(kpiRes.totalCampaign)+' from '+kpiRes.campaignCount+' campaigns',
      body:'Campaign performance data loaded from the "direct campaign" tab in Google Sheets. '+kpiRes.campaignCount+' campaign records available.',
      badge:'b-blue', badgeLbl:'Campaigns', navId:'campaign'
    });
  }

  if(gamRes.ok){
    const orders=gamRes.orders?.total||0;
    const active=(gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr=gamRes.lineItems?.totalImpressions||0;
    insights.push({
      icon:'fa-rectangle-ad', color:'var(--teal)', bg:'rgba(45,212,191,0.1)',
      title:'GAM: '+orders+' orders · '+digFmtShort(impr)+' impressions delivered',
      body:'Connected to <strong>'+(gamRes.networkName||gamRes.networkCode)+'</strong>. '+active+' orders currently active/delivering. '+(gamRes.lineItems?.total||0)+' line items tracked.',
      badge:'b-teal', badgeLbl:'GAM Live', navId:'gamanalytics'
    });
  } else {
    insights.push({icon:'fa-rectangle-ad',color:'#f59e0b',bg:'rgba(245,158,11,0.1)',title:'GAM API not connected',body:'Connect your Google Ad Manager account to see order, line item and impression data in the digest.',badge:'b-amber',badgeLbl:'Setup Required',navId:'apiconn'});
  }

  digSetEl('digInsights', insights.map(ins=>
    '<div style="display:flex;align-items:flex-start;gap:11px;padding:12px;background:var(--bg-card);border:1px solid var(--border);border-radius:11px;margin-bottom:10px">'+
      '<div style="width:32px;height:32px;border-radius:9px;background:'+ins.bg+';color:'+ins.color+';display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0"><i class="fas '+ins.icon+'"></i></div>'+
      '<div style="flex:1;min-width:0">'+
        '<div style="font-size:12.5px;font-weight:600;margin-bottom:4px">'+ins.title+'</div>'+
        '<div class="fs12 text-muted" style="margin-bottom:8px;line-height:1.55">'+ins.body+'</div>'+
        '<div style="display:flex;gap:7px;align-items:center">'+
          '<span class="b '+ins.badge+'" style="font-size:9px">'+ins.badgeLbl+'</span>'+
          '<button class="ai-act" onclick="navigate(\''+ins.navId+'\')"><i class="fas fa-arrow-right"></i>View Detail</button>'+
        '</div>'+
      '</div>'+
    '</div>'
  ).join(''));

  // ── Summary line ───────────────────────────────────────────────
  const parts=[];
  if(kpiRes.ok && kpiRes.totalRevenue>0) parts.push(digFmt(kpiRes.totalRevenue)+' revenue from '+kpiRes.revenueCount+' records');
  if(kpiRes.ok && kpiRes.campaignCount>0) parts.push(kpiRes.campaignCount+' campaign records');
  if(gamRes.ok) parts.push((gamRes.orders?.total||0)+' GAM orders · '+(gamRes.lineItems?.totalImpressions||0).toLocaleString()+' impressions');
  if(parts.length===0) parts.push('Connect data sources in API Connections to see live data');
  digSetEl('digestSummary', parts.join(' · ')+'.');

  console.log('[Digest] Dashboard updated');
}

// Auto-load
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadDigestKPIs);
else setTimeout(loadDigestKPIs,80);
</script>
`;
}
