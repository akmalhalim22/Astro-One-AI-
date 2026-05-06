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
    <span style="margin-left:auto;font-size:10px;color:var(--text-muted)" id="ov-last-updated">Loading…</span>
  </div>

  <!-- ── ROW 1: 4 HEADLINE KPIs ─────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi accent">
      <div class="kpi-icon pink"><i class="fas fa-sack-dollar"></i></div>
      <div class="kpi-lbl">YTD Revenue</div>
      <div class="kpi-val" id="ov-kpi-revenue"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-revenue-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon amber"><i class="fas fa-bullhorn"></i></div>
      <div class="kpi-lbl">Campaign Revenue</div>
      <div class="kpi-val" id="ov-kpi-campaign"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-campaign-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon blue"><i class="fas fa-list-check"></i></div>
      <div class="kpi-lbl">GAM Orders</div>
      <div class="kpi-val" id="ov-kpi-orders"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-orders-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-rectangle-ad"></i></div>
      <div class="kpi-lbl">Impressions Delivered</div>
      <div class="kpi-val" id="ov-kpi-impr"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-impr-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
  </div>

  <!-- ── ROW 2: More KPIs ────────────────────────────────────── -->
  <div class="kpi-grid-4">
    <div class="kpi">
      <div class="kpi-icon purple"><i class="fas fa-layer-group"></i></div>
      <div class="kpi-lbl">GAM Line Items</div>
      <div class="kpi-val" id="ov-kpi-li"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-li-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon teal"><i class="fas fa-mouse-pointer"></i></div>
      <div class="kpi-lbl">GAM Clicks</div>
      <div class="kpi-val" id="ov-kpi-clicks"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-clicks-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon green"><i class="fas fa-chart-bar"></i></div>
      <div class="kpi-lbl">Revenue Records</div>
      <div class="kpi-val" id="ov-kpi-rev-count"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-rev-count-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon red"><i class="fas fa-network-wired"></i></div>
      <div class="kpi-lbl">GAM Network</div>
      <div class="kpi-val" id="ov-kpi-network" style="font-size:13px;line-height:1.3"><i class="fas fa-spinner fa-spin" style="font-size:14px;color:var(--text-muted)"></i></div>
      <div class="kpi-chg" id="ov-kpi-network-sub" style="color:var(--text-muted)">Loading…</div>
    </div>
  </div>

  <!-- ── ROW 3: Revenue Chart + Platform breakdown ─────────── -->
  <div class="g62">
    <div class="card">
      <div class="card-hd">
        <div>
          <div class="card-title">Revenue vs Target — Monthly</div>
          <div class="fs11 text-muted" id="ovRevSubTitle">from Google Sheets</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted)">
            <div style="width:8px;height:8px;border-radius:2px;background:#ec4899"></div>Revenue
            <div style="width:8px;height:8px;border-radius:2px;background:#f59e0b;margin-left:4px"></div>Target
          </div>
          <span class="card-action" onclick="navigate('revenue')">Full Report →</span>
        </div>
      </div>
      <div class="ch" style="height:165px"><canvas id="ovRevChart"></canvas></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">Total Revenue</div>
          <div style="font-size:14px;font-weight:800;color:var(--success)" id="ovRevTotal">—</div>
        </div>
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">Target</div>
          <div style="font-size:14px;font-weight:800;color:var(--text-secondary)" id="ovRevTarget">—</div>
        </div>
        <div style="padding:0 12px;border-right:1px solid var(--border)">
          <div class="fs11 text-muted" style="margin-bottom:3px">Attainment</div>
          <div style="font-size:14px;font-weight:800;color:var(--magenta)" id="ovRevAtt">—</div>
        </div>
        <div style="padding:0 12px">
          <div class="fs11 text-muted" style="margin-bottom:3px">Months Data</div>
          <div style="font-size:14px;font-weight:800;color:var(--info)" id="ovRevMonths">—</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Revenue by Portal (Top 6)</div></div>
      <div id="ovPortalBars" style="display:flex;flex-direction:column;gap:9px;min-height:80px">
        <div class="text-muted fs12" style="text-align:center;padding:24px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
  </div>

  <!-- ── ROW 4: Domain Snapshots ────────────────────────────── -->
  <div class="g3">
    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-rocket" style="color:var(--magenta);margin-right:5px"></i>Revenue Breakdown</div>
        <span class="card-action" onclick="navigate('revenue')">Detail →</span>
      </div>
      <div id="ovRevSnapshot" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>

    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-bullhorn" style="color:var(--info);margin-right:5px"></i>Campaign Summary</div>
        <span class="card-action" onclick="navigate('campaign')">Detail →</span>
      </div>
      <div id="ovCampSnapshot" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>

    <div class="card">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-rectangle-ad" style="color:var(--teal);margin-right:5px"></i>GAM Summary</div>
        <span class="card-action" onclick="navigate('gamanalytics')">Detail →</span>
      </div>
      <div id="ovGAMSnapshot" style="display:flex;flex-direction:column;gap:4px">
        <div class="text-muted fs12" style="text-align:center;padding:16px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>
  </div>

</div>

<script>
// ── Overview screen — live data loader ────────────────────────────────────
let _ovRevChart = null;

// Month-key helper: converts any date string to YYYYMM integer for chronological sort
function ovParseMonthKey(m){
  if(!m)return 0;const s=String(m).trim();
  let mt=s.match(/^(\d{4})-(\d{2})/);
  if(mt)return parseInt(mt[1])*100+parseInt(mt[2]);
  mt=s.match(/^(\d{1,2})\/(\d{2,4})$/);
  if(mt){const yr=mt[2].length===2?2000+parseInt(mt[2]):parseInt(mt[2]);return yr*100+parseInt(mt[1]);}
  const MON=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  mt=s.match(/([a-zA-Z]+)[\s\-\/]+(\d{2,4})/);
  if(!mt)mt=s.match(/(\d{2,4})[\s\-\/]+([a-zA-Z]+)/);
  if(mt){const p=[mt[1].toLowerCase(),mt[2].toLowerCase()];const ni=MON.findIndex(n=>p[0].startsWith(n));const yr=ni>=0?parseInt(p[1]):parseInt(p[0]);const mo=ni>=0?(ni+1):MON.findIndex(n=>p[1].startsWith(n))+1;if(yr>0&&mo>0)return yr*100+mo;}
  mt=s.match(/^(\d{4})$/);if(mt)return parseInt(mt[1])*100;
  return 0;
}
function ovFmt(n){
  n=parseFloat(n)||0;
  if(n>=1e9) return 'RM '+(n/1e9).toFixed(2)+'B';
  if(n>=1e6) return 'RM '+(n/1e6).toFixed(2)+'M';
  if(n>=1e3) return 'RM '+(n/1e3).toFixed(1)+'K';
  return 'RM '+n.toFixed(0);
}
function ovFmtShort(n){
  n=parseFloat(n)||0;
  if(n>=1e9) return (n/1e9).toFixed(1)+'B';
  if(n>=1e6) return (n/1e6).toFixed(1)+'M';
  if(n>=1e3) return (n/1e3).toFixed(1)+'K';
  return n===0?'—':n.toLocaleString();
}
function ovSetEl(id,val){ const el=document.getElementById(id); if(el) el.innerHTML=val; }

async function loadOverviewKPIs(){
  const [kpiRes, gamRes] = await Promise.all([
    fetch('/api/kpis').then(r=>r.json()).catch(e=>({ok:false,error:e.message})),
    fetch('/api/gam/summary?cached=true').then(r=>r.json()).catch(e=>({ok:false,error:e.message}))
  ]);

  console.log('[Overview] KPI response:', kpiRes);
  console.log('[Overview] GAM response:', gamRes);

  const now = new Date().toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'});
  ovSetEl('ov-last-updated', 'Updated '+now);

  // ── Revenue KPIs ───────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalRevenue > 0){
    ovSetEl('ov-kpi-revenue', ovFmt(kpiRes.totalRevenue));
    ovSetEl('ov-kpi-revenue-sub', '<span class="up"><i class="fas fa-circle-check" style="font-size:9px"></i> '+kpiRes.revenueCount+' records</span>');
    ovSetEl('ovRevTotal', ovFmt(kpiRes.totalRevenue));
    ovSetEl('ovRevTarget', kpiRes.totalTarget>0 ? ovFmt(kpiRes.totalTarget) : '—');
    const att = kpiRes.totalTarget>0 ? (kpiRes.totalRevenue/kpiRes.totalTarget*100).toFixed(1)+'%' : '—';
    ovSetEl('ovRevAtt', att);
    ovSetEl('ov-kpi-rev-count', (kpiRes.revenueCount||0).toLocaleString());
    ovSetEl('ov-kpi-rev-count-sub', '<span class="text-muted">revenue records</span>');
    ovSetEl('ovRevSubTitle', kpiRes.revenueCount+' rows from Google Sheets');
  } else {
    ovSetEl('ov-kpi-revenue', '—');
    ovSetEl('ov-kpi-revenue-sub', '<span style="color:'+(kpiRes.ok?'var(--text-muted)':'#f59e0b')+'"><i class="fas fa-'+(kpiRes.ok?'info-circle':'plug')+'"></i> '+(kpiRes.ok?'No revenue data':'Sheets not connected')+'</span>');
    ovSetEl('ovRevTotal', '—'); ovSetEl('ovRevTarget', '—'); ovSetEl('ovRevAtt', '—');
    ovSetEl('ov-kpi-rev-count', '—');
    ovSetEl('ov-kpi-rev-count-sub', kpiRes.ok ? '<span class="text-muted">No data</span>' : '<span style="color:#f59e0b">Not connected</span>');
    ovSetEl('ovRevSubTitle', kpiRes.ok ? 'No revenue data in sheet' : 'Connect Google Sheets');
  }

  // ── Campaign KPIs ──────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.totalCampaign > 0){
    ovSetEl('ov-kpi-campaign', ovFmt(kpiRes.totalCampaign));
    ovSetEl('ov-kpi-campaign-sub', '<span class="up">'+kpiRes.campaignCount+' records</span>');
  } else {
    ovSetEl('ov-kpi-campaign', '—');
    ovSetEl('ov-kpi-campaign-sub', '<span style="color:var(--text-muted)">'+(kpiRes.ok?'No campaign data':'Not connected')+'</span>');
  }

  // ── GAM KPIs ───────────────────────────────────────────────────
  if(gamRes.ok){
    const orders=gamRes.orders?.total||0;
    const active=(gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr=gamRes.lineItems?.totalImpressions||0;
    const clicks=gamRes.lineItems?.totalClicks||0;
    const li=gamRes.lineItems?.total||0;
    const ctr=impr>0?(clicks/impr*100).toFixed(2)+'%':'—';
    ovSetEl('ov-kpi-orders', orders.toLocaleString());
    ovSetEl('ov-kpi-orders-sub', '<span class="up">'+active+' active/delivering</span>');
    ovSetEl('ov-kpi-impr', ovFmtShort(impr));
    ovSetEl('ov-kpi-impr-sub', '<span class="text-muted">'+ovFmtShort(clicks)+' clicks · '+ctr+'</span>');
    ovSetEl('ov-kpi-li', li.toLocaleString());
    ovSetEl('ov-kpi-li-sub', '<span class="text-muted">total line items</span>');
    ovSetEl('ov-kpi-clicks', ovFmtShort(clicks));
    ovSetEl('ov-kpi-clicks-sub', '<span class="text-muted">CTR: '+ctr+'</span>');
    ovSetEl('ov-kpi-network', gamRes.networkName||gamRes.networkCode||'—');
    ovSetEl('ov-kpi-network-sub', '<span class="up"><i class="fas fa-circle-check" style="font-size:9px"></i> Connected</span>');
  } else {
    ['ov-kpi-orders','ov-kpi-impr','ov-kpi-li','ov-kpi-clicks','ov-kpi-network'].forEach(id=>ovSetEl(id,'—'));
    const nc='<span style="color:#f59e0b"><i class="fas fa-plug"></i> GAM not connected</span>';
    ['ov-kpi-orders-sub','ov-kpi-impr-sub','ov-kpi-li-sub','ov-kpi-clicks-sub','ov-kpi-network-sub'].forEach(id=>ovSetEl(id,nc));
  }

  // ── Revenue chart ──────────────────────────────────────────────
  const ctx = document.getElementById('ovRevChart');
  if(ctx && kpiRes.ok && kpiRes.revenueByMonth && Object.keys(kpiRes.revenueByMonth).length>0){
    const months = Object.keys(kpiRes.revenueByMonth).sort((a,b)=>ovParseMonthKey(a)-ovParseMonthKey(b));
    const revVals = months.map(m=>kpiRes.revenueByMonth[m]||0);
    ovSetEl('ovRevMonths', months.length+' months');
    if(_ovRevChart){_ovRevChart.destroy();_ovRevChart=null;}
    _ovRevChart = new Chart(ctx, {
      type:'bar',
      data:{
        labels:months,
        datasets:[{label:'Revenue',data:revVals,backgroundColor:'rgba(236,72,153,0.7)',borderRadius:4,borderWidth:0}]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false},ticks:{color:'#a0a0c0',font:{size:9}}},
          y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#a0a0c0',font:{size:9},callback:v=>ovFmtShort(v)}}}}
    });
  } else if(ctx) {
    const c2=ctx.getContext('2d');
    c2.fillStyle='rgba(255,255,255,0.03)';c2.fillRect(0,0,ctx.width,ctx.height);
    c2.fillStyle='#a0a0c0';c2.font='11px sans-serif';c2.textAlign='center';
    c2.fillText(kpiRes.ok?'No monthly data':'Connect Google Sheets to see chart',ctx.width/2,ctx.height/2);
    ovSetEl('ovRevMonths','—');
  }

  // ── Portal bars ────────────────────────────────────────────────
  const COLORS=['#4285f4','#a78bfa','#00d68f','#f59e0b','#f43f5e','#34d399'];
  if(kpiRes.ok && kpiRes.revenueByPortal && Object.keys(kpiRes.revenueByPortal).length>0){
    const portals=Object.entries(kpiRes.revenueByPortal).sort((a,b)=>b[1]-a[1]).slice(0,6);
    const mx=portals[0][1]||1;
    ovSetEl('ovPortalBars', portals.map(([p,v],i)=>{
      const pct=Math.round(v/mx*100);const col=COLORS[i%6];
      return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span class="fs11 fw6">'+p+'</span><span class="fs11 fw7" style="color:'+col+'">'+ovFmt(v)+'</span></div><div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden"><div style="width:'+pct+'%;height:4px;background:'+col+';border-radius:2px;transition:width 0.5s"></div></div></div>';
    }).join(''));
  } else {
    ovSetEl('ovPortalBars','<div class="text-muted fs12" style="text-align:center;padding:24px"><i class="fas fa-'+(kpiRes.ok?'info-circle':'plug')+'" style="color:'+(kpiRes.ok?'var(--text-muted)':'#f59e0b')+';margin-right:6px"></i>'+(kpiRes.ok?'No portal breakdown available — check column names in sheet':'Connect Google Sheets to see portal data')+'</div>');
  }

  // ── Revenue snapshot ─────────────────────────────────────────────
  if(kpiRes.ok){
    const rows=[];
    if(kpiRes.totalRevenue>0) rows.push(['Total Revenue', ovFmt(kpiRes.totalRevenue), 'b-green']);
    if(kpiRes.totalTarget>0) rows.push(['Target', ovFmt(kpiRes.totalTarget), 'b-blue']);
    if(kpiRes.totalRevenue>0&&kpiRes.totalTarget>0) rows.push(['Attainment', (kpiRes.totalRevenue/kpiRes.totalTarget*100).toFixed(1)+'%', 'b-pink']);
    rows.push(['Records', (kpiRes.revenueCount||0)+' rows', 'b-gray']);
    ovSetEl('ovRevSnapshot', rows.length>1 ? rows.map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join('') : '<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-info-circle" style="margin-right:5px"></i>No revenue data in sheet</div>');
  } else {
    ovSetEl('ovRevSnapshot','<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-plug" style="color:#f59e0b;margin-right:5px"></i>Connect Google Sheets<br><a href="#" onclick="navigate(\'apiconn\')" style="color:#60a5fa;font-size:10px">Set up in API Connections</a></div>');
  }

  // ── Campaign snapshot ─────────────────────────────────────────────
  if(kpiRes.ok && kpiRes.campaignCount>0){
    ovSetEl('ovCampSnapshot',[
      ['Total', ovFmt(kpiRes.totalCampaign), 'b-green'],
      ['Records', kpiRes.campaignCount+' campaigns', 'b-blue'],
    ].map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    ovSetEl('ovCampSnapshot','<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-'+(kpiRes.ok?'info-circle':'plug')+'" style="color:'+(kpiRes.ok?'var(--text-muted)':'#f59e0b')+';margin-right:5px"></i>'+(kpiRes.ok?'No campaign data in sheet':'Connect Google Sheets')+'</div>');
  }

  // ── GAM snapshot ─────────────────────────────────────────────────
  if(gamRes.ok){
    const orders=gamRes.orders?.total||0;
    const active=(gamRes.orders?.byStatus?.ACTIVE||0)+(gamRes.orders?.byStatus?.DELIVERING||0);
    const impr=gamRes.lineItems?.totalImpressions||0;
    const li=gamRes.lineItems?.total||0;
    ovSetEl('ovGAMSnapshot',[
      ['Network', gamRes.networkName||gamRes.networkCode||'—', 'b-blue'],
      ['Orders', orders+' total', 'b-green'],
      ['Active', active+' delivering', 'b-green'],
      ['Line Items', li+' total', 'b-purple'],
      ['Impressions', ovFmtShort(impr), 'b-amber'],
    ].map(([l,v,b])=>'<div class="stat-row"><span class="stat-lbl">'+l+'</span><span class="b '+b+'">'+v+'</span></div>').join(''));
  } else {
    ovSetEl('ovGAMSnapshot','<div class="text-muted fs12" style="text-align:center;padding:12px"><i class="fas fa-plug" style="color:#f59e0b;margin-right:5px"></i>Connect GAM API<br><a href="#" onclick="navigate(\'apiconn\')" style="color:#60a5fa;font-size:10px">Set up in API Connections</a></div>');
  }

  console.log('[Overview] KPIs updated on screen');
}

// Auto-load
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadOverviewKPIs);
else setTimeout(loadOverviewKPIs,80);
</script>
`;
}
