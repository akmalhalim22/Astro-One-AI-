export function uploadScreen(): string {
  return `
<div class="content fade-in">
  <div class="g62">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-hd"><div class="card-title">Upload Data to Google Sheets</div></div>
        <div class="upload-zone" onclick="this.style.borderColor='var(--magenta)'">
          <div class="upload-icon"><i class="fas fa-cloud-arrow-up"></i></div>
          <div class="upload-title">Drop CSV or Excel file here</div>
          <div class="upload-sub">Supports .csv, .xlsx, .xls · Max 50MB</div>
          <button class="btn-primary" style="margin-top:14px"><i class="fas fa-folder-open"></i>Browse Files</button>
        </div>
      </div>

      <div class="card">
        <div class="card-hd"><div class="card-title">Map to Google Sheet</div></div>
        <div class="conn-line"><span class="conn-key">Target Sheet</span>
          <select style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:7px;padding:5px 10px;font-family:inherit;font-size:12px">
            <option>Pre-Sales · Pipeline</option>
            <option>Revenue Data</option>
            <option>Campaign Performance</option>
            <option>Traffic Data</option>
          </select>
        </div>
        <div class="conn-line"><span class="conn-key">Auto-clean duplicates</span><input type="checkbox" checked style="accent-color:var(--magenta)"></div>
        <div class="conn-line"><span class="conn-key">Format dates (YYYY-MM-DD)</span><input type="checkbox" checked style="accent-color:var(--magenta)"></div>
        <div class="conn-line"><span class="conn-key">Format currency (RM)</span><input type="checkbox" checked style="accent-color:var(--magenta)"></div>
        <div class="conn-line"><span class="conn-key">Timestamp upload</span><input type="checkbox" checked style="accent-color:var(--magenta)"></div>
        <button class="btn-primary" style="width:100%;justify-content:center;margin-top:14px"><i class="fas fa-upload"></i>Upload & Sync to Sheets</button>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-hd"><div class="card-title">Upload History</div><span class="card-action">View All</span></div>
        ${[
          ['Revenue_Feb2025.xlsx','Revenue Data','1 Mar 2025','2,841 rows','b-green','Success'],
          ['Pipeline_Q1.csv','Pre-Sales · Pipeline','15 Feb 2025','1,204 rows','b-green','Success'],
          ['Campaign_Jan.xlsx','Campaign Performance','5 Feb 2025','892 rows','b-green','Success'],
          ['Traffic_Data.csv','Traffic Data','1 Feb 2025','5,120 rows','b-amber','Partial'],
          ['Revenue_Jan2025.xlsx','Revenue Data','3 Jan 2025','2,614 rows','b-green','Success'],
        ].map(([f,s,d,r,b,st])=>`
        <div style="padding:10px 0;border-bottom:1px solid var(--border)">
          <div class="flex justify-between items-center">
            <div><div class="fw6 fs12"><i class="fas fa-file-excel" style="color:var(--success);margin-right:6px"></i>${f}</div><div class="fs11 text-muted">${s} · ${d} · ${r}</div></div>
            <span class="b ${b}">${st}</span>
          </div>
        </div>`).join('')}
      </div>

      <div class="card card-sm">
        <div class="card-hd"><div class="card-title">Sheet Schema — Pipeline</div></div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${['deal_id','client_name','deal_value','stage','owner','probability','close_date','created_at','last_activity','notes'].map(f=>`
          <span style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:5px;padding:3px 9px;font-family:monospace;font-size:11px;color:var(--info)">${f}</span>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;
}

export function apiConnScreen(): string {
  return `
<div class="content fade-in">
  <div class="g3 mb20">
    ${[
      ['fa-table','#0f9d58','Google Sheets','Central data warehouse','CONNECTED','b-green',
        [['Sheet ID','1BxiMVs0X…Fg3ue6M'],['Last Sync','2 min ago'],['Sheets','8 active'],['Access','Read/Write']]],
      ['fa-chart-bar','#e34c26','Google Analytics 4','Web traffic & engagement','CONNECTED','b-green',
        [['Property ID','UA-48230412'],['Last Sync','1 hour ago'],['Metrics','124 active'],['Auth','Service Account']]],
      ['fa-rectangle-ad','#4285f4','Google Ads Manager','Ads performance data','CONNECTED','b-green',
        [['Customer ID','123-456-7890'],['Last Sync','1 hour ago'],['Campaigns','24 active'],['Auth','OAuth 2.0']]],
      ['fa-database','#669df6','BigQuery','Large-scale data analytics','CONNECTED','b-green',
        [['Project ID','astro-dph-prod'],['Last Sync','3 hours ago'],['Datasets','6 active'],['Auth','Service Account']]],
      ['fa-music','#ff0050','TikTok Ads','TikTok campaign data','CONNECTED','b-green',
        [['Advertiser ID','7184920341'],['Last Sync','2 hours ago'],['Campaigns','12 active'],['Auth','Access Token']]],
      ['fa-seedling','#2ea44f','Sprout Social','Social media analytics','DELAYED','b-amber',
        [['Account ID','SP-48920'],['Last Sync','4 hours ago'],['Profiles','8 active'],['Auth','API Key']]],
    ].map(([ic,col,n,d,st,b,fields])=>`
    <div class="api-card">
      <div class="api-card-hd">
        <div class="api-logo" style="background:${col}20;color:${col}"><i class="${ic.startsWith('fa-')?'fas':'fab'} ${ic}"></i></div>
        <div><div class="api-name">${n}</div><div class="api-desc">${d}</div></div>
        <div class="api-status"><span class="b ${b}">${st}</span></div>
      </div>
      ${(fields as unknown as string[][]).map(([k,v]: string[])=>`<div class="conn-line"><span class="conn-key">${k}</span><span class="conn-val">${v}</span></div>`).join('')}
      <div style="display:flex;gap:7px;margin-top:12px">
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 10px"><i class="fas fa-rotate"></i>Test</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 10px"><i class="fas fa-gear"></i>Config</button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 10px;margin-left:auto"><i class="fas fa-clock"></i>Schedule</button>
      </div>
    </div>`).join('')}
  </div>

  <div class="card">
    <div class="card-hd"><div class="card-title">Sync Schedule</div><span class="card-action">Edit Schedule</span></div>
    <table class="tbl">
      <thead><tr><th>Source</th><th>Frequency</th><th>Last Run</th><th>Next Run</th><th>Status</th><th>Records</th><th>Actions</th></tr></thead>
      <tbody>
        ${[
          ['GA4','Daily · 02:00','27 Mar 06:00','28 Mar 02:00','b-green','8,421 rows'],
          ['Google Ads Manager','Daily · 03:00','27 Mar 06:30','28 Mar 03:00','b-green','2,841 rows'],
          ['BigQuery','Daily · 04:00','27 Mar 07:00','28 Mar 04:00','b-green','24,182 rows'],
          ['TikTok Ads','Daily · 03:30','27 Mar 06:45','28 Mar 03:30','b-green','1,204 rows'],
          ['Sprout Social','Daily · 05:00','27 Mar 05:00','28 Mar 05:00','b-amber','Delayed'],
          ['Revenue (Manual)','Monthly · 1st','1 Mar 2025','1 Apr 2025','b-gray','Manual'],
        ].map(([s,f,l,n,b,r])=>`
        <tr>
          <td class="fw6">${s}</td><td class="dim">${f}</td>
          <td class="dim">${l}</td><td class="dim">${n}</td>
          <td><span class="b ${b}">${b==='b-green'?'OK':b==='b-amber'?'Delayed':'Manual'}</span></td>
          <td class="dim">${r}</td>
          <td><button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 9px"><i class="fas fa-play"></i>Run Now</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

export function setupScreen(): string {
  return `
<div class="content fade-in">
  <div class="tabs">
    <div class="tab active" onclick="switchSetupTab('sheets',this)">Google Sheets Setup</div>
    <div class="tab" onclick="switchSetupTab('ga4',this)">GA4 Integration</div>
    <div class="tab" onclick="switchSetupTab('gam',this)">Google Ads Manager</div>
    <div class="tab" onclick="switchSetupTab('bq',this)">BigQuery</div>
    <div class="tab" onclick="switchSetupTab('tiktok',this)">TikTok Ads</div>
    <div class="tab" onclick="switchSetupTab('flow',this)">Data Flow</div>
  </div>

  <div id="setup-sheets">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title">Step 1 — Create Google Sheets Structure</div></div>
        ${[
          ['Create a new Google Spreadsheet','Name it: Astro Digital Performance Hub. Create sheets: Pipeline, Revenue, Campaign, Traffic, Social, Ads.','Create Spreadsheet →'],
          ['Enable Google Sheets API','Go to Google Cloud Console → APIs & Services → Enable Sheets API v4 for your project.','Cloud Console →'],
          ['Create Service Account','IAM & Admin → Service Accounts → Create → Download JSON key. Share your Sheet with the service account email.','Create SA →'],
          ['Store Sheet ID','Copy your Spreadsheet ID from the URL: docs.google.com/spreadsheets/d/<b>SHEET_ID</b>/edit',''],
        ].map(([t,b,l],i)=>`
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div><div class="step-title">${t}</div><div class="step-body">${b}${l?`<br><a href="#" class="text-pink" style="font-size:11.5px;margin-top:4px;display:inline-block">${l}</a>`:''}</div></div>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-hd"><div class="card-title">Sheet Schema Reference</div></div>
        ${[
          ['Pipeline Sheet','deal_id, client_name, deal_value, stage, owner, probability, close_date, last_activity, created_at'],
          ['Revenue Sheet','month, client_name, product, amount, currency, campaign_id, invoice_id, created_at'],
          ['Campaign Sheet','campaign_id, name, client, type, start_date, end_date, budget, impressions, clicks, ctr, revenue'],
          ['Traffic Sheet','date, portal, sessions, users, engagement_rate, bounce_rate, avg_session, fill_rate, rev_per_user'],
          ['Social Sheet','date, platform, reach, impressions, engagements, eng_rate, followers, post_count'],
          ['Ads Sheet','date, platform, campaign_id, spend, impressions, clicks, ctr, conversions, roas'],
        ].map(([s,f])=>`
        <div style="padding:10px 0;border-bottom:1px solid var(--border)">
          <div class="fw6 fs12" style="margin-bottom:4px">${s}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${f.split(', ').map(col=>`<span style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 7px;font-family:monospace;font-size:10.5px;color:var(--info)">${col}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-hd"><div class="card-title">Node.js — Google Sheets API Write Example</div><span class="b b-gray">googleapis v6</span></div>
      <div class="code-block"><span class="kw">const</span> { google } = <span class="fn">require</span>(<span class="str">'googleapis'</span>);

<span class="cmt">// Authenticate with service account</span>
<span class="kw">const</span> auth = <span class="kw">new</span> google.auth.<span class="fn">GoogleAuth</span>({
  keyFile: <span class="str">'service-account.json'</span>,
  scopes: [<span class="str">'https://www.googleapis.com/auth/spreadsheets'</span>],
});

<span class="kw">const</span> sheets = google.<span class="fn">sheets</span>({ version: <span class="str">'v4'</span>, auth });
<span class="kw">const</span> SHEET_ID = <span class="str">'YOUR_SPREADSHEET_ID'</span>;

<span class="cmt">// Write pipeline data to Sheets</span>
<span class="kw">async function</span> <span class="fn">writePipelineData</span>(rows) {
  <span class="kw">await</span> sheets.spreadsheets.values.<span class="fn">append</span>({
    spreadsheetId: SHEET_ID,
    range: <span class="str">'Pipeline!A:Z'</span>,
    valueInputOption: <span class="str">'USER_ENTERED'</span>,
    resource: { values: rows },
  });
}

<span class="cmt">// Read data back for dashboard</span>
<span class="kw">async function</span> <span class="fn">readDashboardData</span>(sheetName) {
  <span class="kw">const</span> res = <span class="kw">await</span> sheets.spreadsheets.values.<span class="fn">get</span>({
    spreadsheetId: SHEET_ID,
    range: <span class="str">\`\${sheetName}!A:Z\`</span>,
  });
  <span class="kw">return</span> res.data.values;
}</div>
    </div>
  </div>

  <div id="setup-ga4" style="display:none">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title">GA4 Data API Setup</div></div>
        ${[
          ['Enable GA4 Data API','Google Cloud Console → APIs → Search "Google Analytics Data API" → Enable.',''],
          ['Create Service Account','IAM & Admin → Service Accounts → Create → Give Analytics Viewer role.',''],
          ['Add to GA4 Property','GA4 Admin → Property → Property Access Management → Add service account email.','GA4 Admin →'],
          ['Get Property ID','GA4 Admin → Property Settings → Property ID (format: 123456789).',''],
        ].map(([t,b,l],i)=>`
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div><div class="step-title">${t}</div><div class="step-body">${b}${l?`<br><a href="#" class="text-pink fs11 mt-4">${l}</a>`:''}</div></div>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-hd"><div class="card-title">GA4 → Sheets Auto-Sync Code</div></div>
        <div class="code-block"><span class="kw">const</span> { BetaAnalyticsDataClient } = <span class="fn">require</span>(<span class="str">'@google-analytics/data'</span>);

<span class="kw">const</span> client = <span class="kw">new</span> <span class="fn">BetaAnalyticsDataClient</span>({
  keyFilename: <span class="str">'service-account.json'</span>
});

<span class="kw">async function</span> <span class="fn">syncGA4ToSheets</span>() {
  <span class="kw">const</span> [res] = <span class="kw">await</span> client.<span class="fn">runReport</span>({
    property: <span class="str">'properties/YOUR_PROPERTY_ID'</span>,
    dateRanges: [{ startDate: <span class="str">'30daysAgo'</span>, endDate: <span class="str">'today'</span> }],
    dimensions: [{ name: <span class="str">'date'</span> }, { name: <span class="str">'pagePath'</span> }],
    metrics: [
      { name: <span class="str">'sessions'</span> },
      { name: <span class="str">'activeUsers'</span> },
      { name: <span class="str">'engagementRate'</span> },
      { name: <span class="str">'bounceRate'</span> },
    ],
  });
  <span class="cmt">// Map rows and write to Google Sheets</span>
  <span class="kw">const</span> rows = res.rows.map(r => [
    r.dimensionValues[0].value,  <span class="cmt">// date</span>
    r.dimensionValues[1].value,  <span class="cmt">// page</span>
    ...r.metricValues.map(m => m.value)
  ]);
  <span class="kw">await</span> <span class="fn">writePipelineData</span>(rows);  <span class="cmt">// reuse write function</span>
}</div>
      </div>
    </div>
  </div>

  <div id="setup-gam" style="display:none">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title">Google Ads Manager API Setup</div></div>
        ${[
          ['Enable Google Ads API','Google Cloud Console → APIs → "Google Ads API" → Enable. Requires Google Ads Manager Account.',''],
          ['OAuth2 Setup','Create OAuth credentials (Desktop App) → Get developer token from your MCC account.',''],
          ['Install Client Library','Run: npm install google-ads-api or use REST directly with your access token.',''],
          ['Configure credentials','Create google-ads.yaml with developer_token, client_id, client_secret, refresh_token.',''],
        ].map(([t,b],i)=>`
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div><div class="step-title">${t}</div><div class="step-body">${b}</div></div>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-hd"><div class="card-title">GAM → Sheets Sync</div></div>
        <div class="code-block"><span class="kw">const</span> { GoogleAdsApi } = <span class="fn">require</span>(<span class="str">'google-ads-api'</span>);

<span class="kw">const</span> client = <span class="kw">new</span> <span class="fn">GoogleAdsApi</span>({
  client_id: <span class="str">'YOUR_CLIENT_ID'</span>,
  client_secret: <span class="str">'YOUR_CLIENT_SECRET'</span>,
  developer_token: <span class="str">'YOUR_DEV_TOKEN'</span>,
});

<span class="kw">async function</span> <span class="fn">syncGAMToSheets</span>(customerId) {
  <span class="kw">const</span> customer = client.<span class="fn">Customer</span>({
    customer_id: customerId,
    refresh_token: <span class="str">'YOUR_REFRESH_TOKEN'</span>,
  });
  <span class="kw">const</span> campaigns = <span class="kw">await</span> customer.report({
    entity: <span class="str">'campaign'</span>,
    attributes: [<span class="str">'campaign.id'</span>, <span class="str">'campaign.name'</span>],
    metrics: [<span class="str">'metrics.impressions'</span>, <span class="str">'metrics.clicks'</span>,
              <span class="str">'metrics.ctr'</span>, <span class="str">'metrics.cost_micros'</span>],
    constraints: { <span class="str">'campaign.status'</span>: <span class="str">'ENABLED'</span> },
    date_constant: <span class="str">'LAST_30_DAYS'</span>,
  });
  <span class="cmt">// Transform and write to Ads sheet</span>
  <span class="kw">const</span> rows = campaigns.map(c => [
    <span class="kw">new</span> <span class="fn">Date</span>().toISOString(), c.campaign.id, c.campaign.name,
    c.metrics.impressions, c.metrics.clicks,
    c.metrics.ctr, c.metrics.cost_micros / 1_000_000
  ]);
  <span class="kw">await</span> <span class="fn">writeToSheet</span>(<span class="str">'Ads'</span>, rows);
}</div>
      </div>
    </div>
  </div>

  <div id="setup-bq" style="display:none">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title">BigQuery Setup</div></div>
        ${[
          ['Enable BigQuery API','Cloud Console → APIs → BigQuery API → Enable.',''],
          ['Create Dataset','BigQuery Console → Create dataset: astro_dph_prod with region asia-southeast1.',''],
          ['Service Account','Create SA with BigQuery Data Viewer + Job User roles → Download JSON key.',''],
          ['Link GA4 to BigQuery','GA4 Admin → BigQuery Linking → Link your property for automatic daily exports.',''],
        ].map(([t,b],i)=>`
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div><div class="step-title">${t}</div><div class="step-body">${b}</div></div>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-hd"><div class="card-title">BigQuery → Sheets Query</div></div>
        <div class="code-block"><span class="kw">const</span> { BigQuery } = <span class="fn">require</span>(<span class="str">'@google-cloud/bigquery'</span>);

<span class="kw">const</span> bq = <span class="kw">new</span> <span class="fn">BigQuery</span>({
  projectId: <span class="str">'astro-dph-prod'</span>,
  keyFilename: <span class="str">'service-account.json'</span>,
});

<span class="kw">async function</span> <span class="fn">queryGA4Events</span>() {
  <span class="kw">const</span> query = <span class="str">\`
    SELECT 
      event_date, 
      COUNT(*) AS sessions,
      COUNT(DISTINCT user_pseudo_id) AS users,
      AVG(engagement_time_msec)/1000 AS avg_eng_sec
    FROM \\\`astro-dph-prod.analytics_123456.events_*\\\`
    WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
    GROUP BY event_date
    ORDER BY event_date DESC
  \`</span>;

  <span class="kw">const</span> [rows] = <span class="kw">await</span> bq.<span class="fn">query</span>({ query });
  <span class="cmt">// Write results to Google Sheets</span>
  <span class="kw">await</span> <span class="fn">writeToSheet</span>(<span class="str">'Traffic'</span>, 
    rows.map(r => [r.event_date, r.sessions, r.users, r.avg_eng_sec])
  );
}</div>
      </div>
    </div>
  </div>

  <div id="setup-tiktok" style="display:none">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title">TikTok Marketing API Setup</div></div>
        ${[
          ['Create TikTok Developer App','developer.tiktok.com → Create App → Set scopes: Ads Management, Reporting.','Developer Portal →'],
          ['Get Access Token','OAuth flow: POST https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/',''],
          ['Get Advertiser ID','Use the access token to call /user/info/ endpoint to get your advertiser_id.',''],
          ['Pull Campaign Reports','Use /report/integrated/get/ endpoint with metrics: spend, impressions, clicks, ctr, roas.',''],
        ].map(([t,b,l],i)=>`
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div><div class="step-title">${t}</div><div class="step-body">${b}${l?`<br><a href="#" class="text-pink fs11">${l}</a>`:''}</div></div>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-hd"><div class="card-title">TikTok Ads → Sheets Sync</div></div>
        <div class="code-block"><span class="kw">const</span> axios = <span class="fn">require</span>(<span class="str">'axios'</span>);

<span class="kw">const</span> TIKTOK_BASE = <span class="str">'https://business-api.tiktok.com/open_api/v1.3'</span>;
<span class="kw">const</span> ACCESS_TOKEN = <span class="str">'YOUR_ACCESS_TOKEN'</span>;
<span class="kw">const</span> ADVERTISER_ID = <span class="str">'YOUR_ADVERTISER_ID'</span>;

<span class="kw">async function</span> <span class="fn">syncTikTokToSheets</span>() {
  <span class="kw">const</span> res = <span class="kw">await</span> axios.<span class="fn">get</span>(<span class="str">\`\${TIKTOK_BASE}/report/integrated/get/\`</span>, {
    headers: { <span class="str">'Access-Token'</span>: ACCESS_TOKEN },
    params: {
      advertiser_id: ADVERTISER_ID,
      report_type: <span class="str">'CAMPAIGN'</span>,
      dimensions: [<span class="str">'campaign_id'</span>, <span class="str">'stat_time_day'</span>],
      metrics: [<span class="str">'spend'</span>, <span class="str">'impressions'</span>, <span class="str">'clicks'</span>, <span class="str">'ctr'</span>, <span class="str">'conversion'</span>],
      start_date: <span class="str">'2025-03-01'</span>,
      end_date: <span class="str">'2025-03-27'</span>,
    }
  });

  <span class="kw">const</span> rows = res.data.data.list.map(r => [
    r.dimensions.stat_time_day, r.dimensions.campaign_id,
    r.metrics.spend, r.metrics.impressions,
    r.metrics.clicks, r.metrics.ctr
  ]);
  <span class="kw">await</span> <span class="fn">writeToSheet</span>(<span class="str">'Ads'</span>, rows);
}</div>
      </div>
    </div>
  </div>

  <div id="setup-flow" style="display:none">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title">Complete Data Flow Architecture</div></div>
        <div style="padding:8px 0">
          ${[
            ['1','Manual Upload','CSV/Excel → UI → Auto-clean → Google Sheets','fa-upload','var(--warning)'],
            ['2','API Sync — GA4','Daily cron → GA4 Data API → Process → Traffic Sheet','fa-chart-bar','var(--info)'],
            ['3','API Sync — GAM','Daily cron → Google Ads API → Process → Ads Sheet','fa-rectangle-ad','#4285f4'],
            ['4','API Sync — BigQuery','Daily cron → BQ SQL query → Process → Multiple Sheets','fa-database','#669df6'],
            ['5','API Sync — TikTok','Daily cron → TikTok API → Process → Ads Sheet','fa-music','#ff0050'],
            ['6','Dashboard Read','Dashboard → Read from Sheets → Visualize → User','fa-chart-pie','var(--magenta)'],
          ].map(([n,t,d,ic,col])=>`
          <div class="step-item">
            <div class="step-num" style="background:${col}22;color:${col};border:1px solid ${col}33;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">${n}</div>
            <div><div class="step-title"><i class="fas ${ic}" style="color:${col};margin-right:7px"></i>${t}</div><div class="step-body">${d}</div></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-hd"><div class="card-title">Cron Job Setup (Node.js)</div></div>
        <div class="code-block"><span class="kw">const</span> cron = <span class="fn">require</span>(<span class="str">'node-cron'</span>);

<span class="cmt">// Daily at 2 AM — GA4 sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'0 2 * * *'</span>, <span class="kw">async</span> () => {
  <span class="kw">try</span> {
    <span class="kw">await</span> <span class="fn">syncGA4ToSheets</span>();
    <span class="kw">await</span> <span class="fn">notifySlack</span>(<span class="str">'✅ GA4 sync complete'</span>);
  } <span class="kw">catch</span> (err) {
    <span class="kw">await</span> <span class="fn">notifySlack</span>(<span class="str">\`❌ GA4 sync failed: \${err.message}\`</span>);
    <span class="kw">await</span> <span class="fn">retry</span>(<span class="fn">syncGA4ToSheets</span>, 3); <span class="cmt">// 3 retries</span>
  }
});

<span class="cmt">// Daily at 3 AM — Google Ads sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'0 3 * * *'</span>, <span class="fn">syncGAMToSheets</span>);

<span class="cmt">// Daily at 3:30 AM — TikTok sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'30 3 * * *'</span>, <span class="fn">syncTikTokToSheets</span>);

<span class="cmt">// Daily at 4 AM — BigQuery sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'0 4 * * *'</span>, <span class="fn">queryGA4Events</span>);

<span class="cmt">// Slack notification helper</span>
<span class="kw">async function</span> <span class="fn">notifySlack</span>(msg) {
  <span class="kw">await</span> fetch(process.env.SLACK_WEBHOOK, {
    method: <span class="str">'POST'</span>,
    body: JSON.<span class="fn">stringify</span>({ text: msg })
  });
}</div>
      </div>
    </div>
  </div>
</div>`;
}
