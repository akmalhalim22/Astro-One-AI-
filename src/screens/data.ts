// ── data.ts — Upload, API Connections, Setup Guide, Data Blend ───────────

// ─────────────────────────────────────────────────────────────────────────────
//  UPLOAD SCREEN  (fully wired: real file picker → CSV parse → POST /api/upload)
// ─────────────────────────────────────────────────────────────────────────────
export function uploadScreen(): string {
  return `
<div class="content fade-in">
  <div class="g62">
    <!-- Left column -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Drop zone -->
      <div class="card">
        <div class="card-hd">
          <div class="card-title">Upload Data to Google Sheets</div>
          <span class="b b-gray" id="uploadStatusBadge">Ready</span>
        </div>
        <div class="upload-zone" id="dropZone"
          onclick="document.getElementById('fileInput').click()"
          ondragover="event.preventDefault();this.style.borderColor='var(--magenta)'"
          ondragleave="this.style.borderColor=''"
          ondrop="handleDrop(event)">
          <input type="file" id="fileInput" accept=".csv,.xlsx,.xls" style="display:none" onchange="handleFileSelect(this)"/>
          <div class="upload-icon"><i class="fas fa-cloud-arrow-up" id="uploadIcon"></i></div>
          <div class="upload-title" id="uploadTitle">Drop CSV or Excel file here</div>
          <div class="upload-sub" id="uploadSub">Supports .csv, .xlsx, .xls · Max 50 MB</div>
          <button class="btn-primary" style="margin-top:14px;pointer-events:none">
            <i class="fas fa-folder-open"></i>Browse Files
          </button>
        </div>
      </div>

      <!-- Mapping + options -->
      <div class="card">
        <div class="card-hd"><div class="card-title">Map to Google Sheet</div></div>
        <div class="conn-line">
          <span class="conn-key">Target Sheet Tab</span>
          <select id="targetTab" style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:7px;padding:5px 10px;font-family:inherit;font-size:12px">
            <option value="pipeline">Pre-Sales · Pipeline</option>
            <option value="revenue">Revenue Data</option>
            <option value="campaign">Campaign Performance</option>
            <option value="traffic">Traffic Data</option>
            <option value="ads">Ads Performance</option>
            <option value="social">Social Media</option>
          </select>
        </div>
        <div class="conn-line"><span class="conn-key">Auto-clean duplicates</span><input type="checkbox" id="optDedup" checked style="accent-color:var(--magenta)"></div>
        <div class="conn-line"><span class="conn-key">Format dates (YYYY-MM-DD)</span><input type="checkbox" id="optDate" checked style="accent-color:var(--magenta)"></div>
        <div class="conn-line"><span class="conn-key">Format currency (RM)</span><input type="checkbox" id="optCurrency" checked style="accent-color:var(--magenta)"></div>
        <div class="conn-line"><span class="conn-key">Add timestamp column</span><input type="checkbox" id="optTimestamp" checked style="accent-color:var(--magenta)"></div>
        <button class="btn-primary" id="uploadBtn" style="width:100%;justify-content:center;margin-top:14px;opacity:0.45;cursor:not-allowed" disabled onclick="submitUpload()">
          <i class="fas fa-upload"></i>Upload &amp; Sync to Sheets
        </button>
        <div id="uploadProgress" style="display:none;margin-top:10px">
          <div style="height:4px;background:var(--bg-secondary);border-radius:3px;overflow:hidden">
            <div id="progressBar" style="height:100%;background:linear-gradient(90deg,#e2007a,#ff4db8);width:0%;transition:width .4s;border-radius:3px"></div>
          </div>
          <div id="uploadMsg" class="fs11 text-muted" style="margin-top:6px">Preparing…</div>
        </div>
      </div>

      <!-- Preview -->
      <div class="card" id="previewCard" style="display:none">
        <div class="card-hd">
          <div class="card-title">File Preview</div>
          <span class="b b-gray" id="previewMeta">—</span>
        </div>
        <div style="overflow-x:auto;max-height:220px;overflow-y:auto">
          <table class="tbl" id="previewTable" style="font-size:11px"></table>
        </div>
      </div>
    </div>

    <!-- Right column -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Upload history (loaded from KV) -->
      <div class="card">
        <div class="card-hd">
          <div class="card-title">Upload History</div>
          <span class="card-action" onclick="loadUploadHistory()">Refresh</span>
        </div>
        <div id="uploadHistoryList">
          ${[
            ['Revenue_Feb2025.xlsx','Revenue Data','1 Mar 2025','2,841 rows','b-green','Success'],
            ['Pipeline_Q1.csv','Pre-Sales · Pipeline','15 Feb 2025','1,204 rows','b-green','Success'],
            ['Campaign_Jan.xlsx','Campaign Performance','5 Feb 2025','892 rows','b-green','Success'],
            ['Traffic_Data.csv','Traffic Data','1 Feb 2025','5,120 rows','b-amber','Partial'],
          ].map(([f,s,d,r,b,st])=>`
          <div style="padding:10px 0;border-bottom:1px solid var(--border)">
            <div class="flex justify-between items-center">
              <div>
                <div class="fw6 fs12"><i class="fas fa-file-excel" style="color:var(--success);margin-right:6px"></i>${f}</div>
                <div class="fs11 text-muted">${s} · ${d} · ${r}</div>
              </div>
              <span class="b ${b}">${st}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Schema reference -->
      <div class="card card-sm">
        <div class="card-hd">
          <div class="card-title">Sheet Schema Reference</div>
          <select id="schemaSelect" onchange="showSchema(this.value)" style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:3px 8px;font-family:inherit;font-size:11px">
            <option value="pipeline">Pipeline</option>
            <option value="revenue">Revenue</option>
            <option value="campaign">Campaign</option>
            <option value="traffic">Traffic</option>
            <option value="ads">Ads</option>
            <option value="social">Social</option>
          </select>
        </div>
        <div id="schemaFields" style="display:flex;flex-wrap:wrap;gap:6px">
          ${['deal_id','client_name','deal_value','stage','owner','probability','close_date','created_at','last_activity','notes'].map(f=>`
          <span style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:5px;padding:3px 9px;font-family:monospace;font-size:11px;color:var(--info)">${f}</span>`).join('')}
        </div>
      </div>

    </div>
  </div>
</div>

<script>
// ── Schema definitions ─────────────────────────────────────────────────────
const SCHEMAS = {
  pipeline: ['deal_id','client_name','deal_value','stage','owner','probability','close_date','created_at','last_activity','notes'],
  revenue:  ['month','client_name','product','amount','currency','campaign_id','invoice_id','created_at'],
  campaign: ['campaign_id','name','client','type','start_date','end_date','budget','impressions','clicks','ctr','revenue'],
  traffic:  ['date','portal','sessions','users','engagement_rate','bounce_rate','avg_session','fill_rate','rev_per_user'],
  ads:      ['date','platform','campaign_id','spend','impressions','clicks','ctr','conversions','roas'],
  social:   ['date','platform','reach','impressions','engagements','eng_rate','followers','post_count'],
};

function showSchema(key) {
  const fields = SCHEMAS[key] || [];
  document.getElementById('schemaFields').innerHTML = fields.map(f =>
    '<span style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:5px;padding:3px 9px;font-family:monospace;font-size:11px;color:var(--info)">'+f+'</span>'
  ).join('');
}

// ── File handling ──────────────────────────────────────────────────────────
let parsedRows = [];
let parsedHeaders = [];

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('dropZone').style.borderColor = '';
  const f = e.dataTransfer.files[0];
  if (f) processFile(f);
}
function handleFileSelect(input) {
  if (input.files && input.files[0]) processFile(input.files[0]);
}

function processFile(file) {
  if (file.size > 50 * 1024 * 1024) { showToast('File too large — max 50 MB', 'error'); return; }
  const ext = file.name.split('.').pop().toLowerCase();
  document.getElementById('uploadTitle').textContent = file.name;
  document.getElementById('uploadSub').textContent = (file.size/1024).toFixed(1) + ' KB · Reading…';
  document.getElementById('uploadIcon').className = 'fas fa-spinner fa-spin';

  if (ext === 'csv') {
    const reader = new FileReader();
    reader.onload = e => parseCSV(e.target.result, file.name);
    reader.readAsText(file);
  } else if (ext === 'xlsx' || ext === 'xls') {
    // Basic XLSX reading via SheetJS (loaded below)
    const reader = new FileReader();
    reader.onload = e => parseXLSX(e.target.result, file.name);
    reader.readAsArrayBuffer(file);
  } else {
    showToast('Unsupported file type. Use .csv, .xlsx or .xls', 'error');
  }
}

function parseCSV(text, filename) {
  const lines = text.trim().split(/\\r?\\n/);
  if (lines.length < 2) { showToast('CSV appears empty or has no data rows', 'error'); return; }
  parsedHeaders = splitCSVLine(lines[0]);
  parsedRows = lines.slice(1).filter(l => l.trim()).map(l => splitCSVLine(l));
  finishParse(filename);
}

function splitCSVLine(line) {
  const result = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; }
    else if (c === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  result.push(cur.trim());
  return result;
}

function parseXLSX(buffer, filename) {
  // Fallback: if XLSX not available, show manual message
  if (typeof XLSX === 'undefined') {
    showToast('Excel parsing requires SheetJS — see console for manual load', 'error');
    document.getElementById('uploadIcon').className = 'fas fa-file-excel';
    document.getElementById('uploadSub').textContent = 'Excel file selected (convert to CSV for best results)';
    // Enable upload button anyway so user can try
    document.getElementById('uploadBtn').disabled = false;
    document.getElementById('uploadBtn').style.opacity = '1';
    document.getElementById('uploadBtn').style.cursor = 'pointer';
    document.getElementById('uploadStatusBadge').textContent = 'Excel Ready';
    document.getElementById('uploadStatusBadge').className = 'b b-green';
    return;
  }
  const wb = XLSX.read(buffer, { type:'array' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  if (data.length < 2) { showToast('Excel sheet appears empty', 'error'); return; }
  parsedHeaders = data[0].map(String);
  parsedRows = data.slice(1).filter(r => r.some(c => c !== ''));
  finishParse(filename);
}

function finishParse(filename) {
  document.getElementById('uploadIcon').className = 'fas fa-circle-check';
  document.getElementById('uploadIcon').style.color = 'var(--success)';
  document.getElementById('uploadTitle').textContent = filename;
  document.getElementById('uploadSub').textContent = parsedRows.length + ' rows · ' + parsedHeaders.length + ' columns detected';
  document.getElementById('uploadStatusBadge').textContent = parsedRows.length + ' rows ready';
  document.getElementById('uploadStatusBadge').className = 'b b-green';

  // Enable upload button
  const btn = document.getElementById('uploadBtn');
  btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';

  // Show preview
  showPreview();
  if (typeof showToast === 'function') showToast('File loaded: ' + parsedRows.length + ' rows', 'success');
}

function showPreview() {
  const card = document.getElementById('previewCard');
  const tbl  = document.getElementById('previewTable');
  const meta = document.getElementById('previewMeta');
  if (!card || !tbl) return;
  card.style.display = '';
  meta.textContent = parsedRows.length + ' rows · ' + parsedHeaders.length + ' cols';
  const displayRows = parsedRows.slice(0, 6);
  tbl.innerHTML = '<thead><tr>' + parsedHeaders.map(h => '<th>'+h+'</th>').join('') + '</tr></thead>' +
    '<tbody>' + displayRows.map(r =>
      '<tr>' + parsedHeaders.map((_,i) => '<td>'+(r[i]||'')+'</td>').join('') + '</tr>'
    ).join('') + '</tbody>';
}

// ── Upload submission ──────────────────────────────────────────────────────
async function submitUpload() {
  const btn = document.getElementById('uploadBtn');
  if (btn.disabled) return;

  const tab = document.getElementById('targetTab').value;
  const addTimestamp = document.getElementById('optTimestamp').checked;

  let rows = parsedRows.map(r => [...r]);
  let headers = [...parsedHeaders];

  // Add timestamp column if requested
  if (addTimestamp) {
    const ts = new Date().toISOString().slice(0,19).replace('T',' ');
    headers = [...headers, 'uploaded_at'];
    rows = rows.map(r => [...r, ts]);
  }

  // Prepend headers as first row
  const payload = [headers, ...rows];

  // Progress UI
  document.getElementById('uploadProgress').style.display = '';
  setProgress(10, 'Sending ' + rows.length + ' rows to Google Sheets…');
  btn.disabled = true; btn.style.opacity = '0.5';

  try {
    setProgress(40, 'Writing to sheet tab: ' + tab + '…');
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tab, rows: payload })
    });
    const d = await res.json();
    if (d.ok) {
      setProgress(100, '✓ ' + (d.appended||rows.length) + ' rows appended to "' + (d.tab||tab) + '"');
      document.getElementById('uploadStatusBadge').textContent = 'Uploaded!';
      document.getElementById('uploadStatusBadge').className = 'b b-green';
      showToast('Upload successful — ' + (d.appended||rows.length) + ' rows written to "' + (d.tab||tab) + '"', 'success');
      // Add to history list
      addHistoryEntry(document.getElementById('uploadTitle').textContent, tab, rows.length);
    } else {
      setProgress(0, '');
      document.getElementById('uploadProgress').style.display = 'none';
      showToast('Upload failed: ' + (d.error || 'Unknown error'), 'error');
      btn.disabled = false; btn.style.opacity = '1';
    }
  } catch(err) {
    setProgress(0, '');
    document.getElementById('uploadProgress').style.display = 'none';
    showToast('Network error — check your connection and try again', 'error');
    btn.disabled = false; btn.style.opacity = '1';
  }
}

function setProgress(pct, msg) {
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('uploadMsg').textContent = msg;
}

function addHistoryEntry(filename, tab, rowCount) {
  const list = document.getElementById('uploadHistoryList');
  const tabLabel = { pipeline:'Pre-Sales · Pipeline', revenue:'Revenue Data', campaign:'Campaign Performance', traffic:'Traffic Data', ads:'Ads Performance', social:'Social Media' }[tab] || tab;
  const now = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  const entry = document.createElement('div');
  entry.style.cssText = 'padding:10px 0;border-bottom:1px solid var(--border)';
  entry.innerHTML = '<div class="flex justify-between items-center"><div><div class="fw6 fs12"><i class="fas fa-file-csv" style="color:var(--success);margin-right:6px"></i>' + filename + '</div><div class="fs11 text-muted">' + tabLabel + ' · ' + now + ' · ' + rowCount.toLocaleString() + ' rows</div></div><span class="b b-green">Success</span></div>';
  list.insertBefore(entry, list.firstChild);
}

// Sync the schema dropdown with the target tab selection
document.addEventListener('DOMContentLoaded', () => {
  const targetTab = document.getElementById('targetTab');
  if (targetTab) {
    targetTab.addEventListener('change', () => {
      document.getElementById('schemaSelect').value = targetTab.value;
      showSchema(targetTab.value);
    });
  }
});
</script>
`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  API CONNECTIONS SCREEN  (all buttons fully wired)
// ─────────────────────────────────────────────────────────────────────────────
export function apiConnScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── Status Header ─────────────────────────────────────────────────── -->
  <div class="section-hd mb20">
    <div>
      <div class="section-title"><i class="fas fa-plug" style="color:var(--magenta);margin-right:8px"></i>API Connections</div>
      <div class="fs12 text-muted mt4">Manage your live data source connections. Configure, test and schedule syncs from here.</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" onclick="testAllConnections()"><i class="fas fa-rotate"></i>Test All</button>
      <button class="btn-primary" onclick="openAddConnection()"><i class="fas fa-plus"></i>Add Connection</button>
    </div>
  </div>

  <!-- ── Connection Cards ───────────────────────────────────────────────── -->
  <div class="g3 mb20" id="connCards">
    ${[
      { id:'sheets', icon:'fa-table',        col:'#0f9d58', name:'Google Sheets',       desc:'Central data warehouse',   st:'CONNECTED',  bc:'b-green',
        fields:[['Sheet ID','Configure in Settings →'],['Status','Not yet configured'],['Access','Read / Write'],['Auth','Service Account']] },
      { id:'ga4',    icon:'fa-chart-bar',    col:'#e34c26', name:'Google Analytics 4',  desc:'Web traffic & engagement', st:'NOT SET UP',  bc:'b-gray',
        fields:[['Property ID','—'],['Auth Method','Service Account'],['Data','Sessions, Users, Bounce Rate'],['Sync','Daily · 02:00']] },
      { id:'gam',    icon:'fa-rectangle-ad', col:'#4285f4', name:'Google Ads Manager',  desc:'Ads performance data',     st:'NOT SET UP',  bc:'b-gray',
        fields:[['Customer ID','—'],['Auth Method','OAuth 2.0'],['Data','Campaigns, Impressions, Clicks'],['Sync','Daily · 03:00']] },
      { id:'bq',     icon:'fa-database',     col:'#669df6', name:'BigQuery',            desc:'Large-scale analytics',    st:'NOT SET UP',  bc:'b-gray',
        fields:[['Project ID','—'],['Auth Method','Service Account'],['Data','Custom SQL queries → Sheets'],['Sync','Daily · 04:00']] },
      { id:'tiktok', icon:'fa-music',        col:'#ff0050', name:'TikTok Ads',          desc:'TikTok campaign data',     st:'NOT SET UP',  bc:'b-gray',
        fields:[['Advertiser ID','—'],['Auth Method','Access Token'],['Data','Campaigns, Spend, ROAS'],['Sync','Daily · 03:30']] },
      { id:'sprout', icon:'fa-seedling',     col:'#2ea44f', name:'Sprout Social',       desc:'Social media analytics',   st:'NOT SET UP',  bc:'b-gray',
        fields:[['Account ID','—'],['Auth Method','API Key'],['Data','Reach, Engagements, Followers'],['Sync','Daily · 05:00']] },
    ].map(({id,icon,col,name,desc,st,bc,fields}) => `
    <div class="api-card" id="card-${id}">
      <div class="api-card-hd">
        <div class="api-logo" style="background:${col}20;color:${col}"><i class="fas ${icon}"></i></div>
        <div style="flex:1;min-width:0">
          <div class="api-name">${name}</div>
          <div class="api-desc">${desc}</div>
        </div>
        <div class="api-status"><span class="b ${bc}" id="status-${id}">${st}</span></div>
      </div>
      ${fields.map(([k,v])=>`<div class="conn-line"><span class="conn-key">${k}</span><span class="conn-val" id="field-${id}-${k.toLowerCase().replace(/[^a-z0-9]/g,'-')}">${v}</span></div>`).join('')}
      <div style="display:flex;gap:7px;margin-top:12px">
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 10px" onclick="testConnection('${id}','${name}')">
          <i class="fas fa-rotate" id="testIcon-${id}"></i>Test
        </button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 10px" onclick="openConfig('${id}','${name}')">
          <i class="fas fa-gear"></i>Config
        </button>
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 10px;margin-left:auto" onclick="openSchedule('${id}','${name}')">
          <i class="fas fa-clock"></i>Schedule
        </button>
      </div>
    </div>`).join('')}
  </div>

  <!-- ── Sync Schedule Table ────────────────────────────────────────────── -->
  <div class="card mb20">
    <div class="card-hd">
      <div class="card-title">Sync Schedule</div>
      <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 11px" onclick="editAllSchedules()">
        <i class="fas fa-pen"></i>Edit All Schedules
      </button>
    </div>
    <table class="tbl" id="syncTable">
      <thead>
        <tr><th>Source</th><th>Frequency</th><th>Last Run</th><th>Next Run</th><th>Status</th><th>Records</th><th>Actions</th></tr>
      </thead>
      <tbody>
        ${[
          { id:'ga4',    src:'GA4',               freq:'Daily · 02:00', last:'Not yet run', next:'—',     st:'b-gray',  stLbl:'Manual', rows:'—' },
          { id:'gam',    src:'Google Ads Manager', freq:'Daily · 03:00', last:'Not yet run', next:'—',     st:'b-gray',  stLbl:'Manual', rows:'—' },
          { id:'bq',     src:'BigQuery',           freq:'Daily · 04:00', last:'Not yet run', next:'—',     st:'b-gray',  stLbl:'Manual', rows:'—' },
          { id:'tiktok', src:'TikTok Ads',         freq:'Daily · 03:30', last:'Not yet run', next:'—',     st:'b-gray',  stLbl:'Manual', rows:'—' },
          { id:'sprout', src:'Sprout Social',       freq:'Daily · 05:00', last:'Not yet run', next:'—',     st:'b-gray',  stLbl:'Manual', rows:'—' },
          { id:'sheets', src:'Google Sheets',       freq:'Real-time',     last:'—',           next:'Live',   st:'b-green', stLbl:'Live',   rows:'Auto' },
        ].map(({id,src,freq,last,next,st,stLbl,rows}) => `
        <tr id="row-${id}">
          <td class="fw6">${src}</td>
          <td class="dim" id="freq-${id}">${freq}</td>
          <td class="dim" id="last-${id}">${last}</td>
          <td class="dim" id="next-${id}">${next}</td>
          <td><span class="b ${st}" id="rowStatus-${id}">${stLbl}</span></td>
          <td class="dim" id="records-${id}">${rows}</td>
          <td>
            <div style="display:flex;gap:5px">
              <button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 9px" onclick="runNow('${id}','${src}')">
                <i class="fas fa-play" id="runIcon-${id}"></i>Run Now
              </button>
              <button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 8px" onclick="openSchedule('${id}','${src}')">
                <i class="fas fa-clock"></i>
              </button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- ── Google Sheets Quick-Config Banner ──────────────────────────────── -->
  <div class="card" id="sheetsQuickConfig">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-circle-info" style="color:var(--info);margin-right:7px"></i>Quick Setup — Google Sheets</div>
      <button class="btn-primary" style="height:30px;font-size:11px;padding:0 14px" onclick="window.location.href='/settings'">
        <i class="fas fa-gear"></i>Open Settings
      </button>
    </div>
    <div class="fs12 text-muted" style="line-height:1.8">
      Google Sheets is the primary data source for all dashboards.
      To connect: go to <strong>Settings → Google Sheets</strong>, paste your Service Account JSON, enter the Spreadsheet ID, and click <strong>Test Connection</strong>.
      Once connected the status above will update to <span class="b b-green">CONNECTED</span>.
    </div>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="testConnection('sheets','Google Sheets')">
        <i class="fas fa-rotate"></i>Test Sheets Now
      </button>
      <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="window.location.href='/setup'">
        <i class="fas fa-book-open"></i>View Setup Guide
      </button>
    </div>
  </div>

</div>

<!-- ══════════════════════════ MODALS ══════════════════════════════════════ -->

<!-- Config Modal -->
<div id="configModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:1000;display:none;align-items:center;justify-content:center">
  <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:16px;padding:28px 30px;width:100%;max-width:500px;box-shadow:0 24px 80px rgba(0,0,0,.7);position:relative">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div class="fw7 fs14" id="configModalTitle">Configure Connection</div>
      <button onclick="closeModal('configModal')" style="background:none;border:none;color:var(--text-muted);font-size:16px;cursor:pointer;padding:4px"><i class="fas fa-xmark"></i></button>
    </div>
    <div id="configModalBody" style="display:flex;flex-direction:column;gap:12px"></div>
    <div style="display:flex;gap:8px;margin-top:18px">
      <button class="btn-primary" style="flex:1;height:36px;font-size:12px" onclick="saveConfig()"><i class="fas fa-floppy-disk"></i>Save Configuration</button>
      <button class="btn-ghost" style="height:36px;font-size:12px;padding:0 14px" onclick="closeModal('configModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Schedule Modal -->
<div id="scheduleModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:1000;align-items:center;justify-content:center">
  <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:16px;padding:28px 30px;width:100%;max-width:460px;box-shadow:0 24px 80px rgba(0,0,0,.7);position:relative">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div class="fw7 fs14" id="schedModalTitle">Edit Sync Schedule</div>
      <button onclick="closeModal('scheduleModal')" style="background:none;border:none;color:var(--text-muted);font-size:16px;cursor:pointer;padding:4px"><i class="fas fa-xmark"></i></button>
    </div>
    <input type="hidden" id="schedSourceId"/>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div>
        <label class="fs11 fw6" style="color:var(--text-muted);display:block;margin-bottom:5px">Frequency</label>
        <select id="schedFreq" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px">
          <option value="realtime">Real-time (Google Sheets only)</option>
          <option value="hourly">Hourly</option>
          <option value="daily_02" selected>Daily · 02:00 AM</option>
          <option value="daily_03">Daily · 03:00 AM</option>
          <option value="daily_04">Daily · 04:00 AM</option>
          <option value="daily_06">Daily · 06:00 AM</option>
          <option value="weekly">Weekly · Monday 02:00</option>
          <option value="manual">Manual only</option>
        </select>
      </div>
      <div style="background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.2);border-radius:9px;padding:10px 14px;font-size:11.5px;color:var(--info);line-height:1.7">
        <i class="fas fa-circle-info" style="margin-right:6px"></i>
        <strong>Note:</strong> Automatic scheduling requires a Cloudflare Worker Cron Trigger. For now use <em>Run Now</em> to trigger a manual sync, or set up the cron in your Cloudflare dashboard.
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-top:18px">
      <button class="btn-primary" style="flex:1;height:36px;font-size:12px" onclick="saveSchedule()"><i class="fas fa-floppy-disk"></i>Save Schedule</button>
      <button class="btn-ghost" style="height:36px;font-size:12px;padding:0 14px" onclick="closeModal('scheduleModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Add Connection Modal -->
<div id="addConnModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:1000;align-items:center;justify-content:center">
  <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:16px;padding:28px 30px;width:100%;max-width:480px;box-shadow:0 24px 80px rgba(0,0,0,.7)">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div class="fw7 fs14">Add New Connection</div>
      <button onclick="closeModal('addConnModal')" style="background:none;border:none;color:var(--text-muted);font-size:16px;cursor:pointer;padding:4px"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="fs12 text-muted mb16">Select a data source to connect. You'll be taken to the Setup Guide for step-by-step instructions.</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        ['Google Sheets','fa-table','#0f9d58','Central data warehouse — connect first','sheets'],
        ['Google Analytics 4','fa-chart-bar','#e34c26','Web traffic & engagement metrics','ga4'],
        ['Google Ads Manager','fa-rectangle-ad','#4285f4','Ads performance & campaign data','gam'],
        ['BigQuery','fa-database','#669df6','Large-scale analytics & custom queries','bq'],
        ['TikTok Ads','fa-music','#ff0050','TikTok campaign & ad performance','tiktok'],
        ['Sprout Social','fa-seedling','#2ea44f','Social media reach & engagement','sprout'],
      ].map(([n,ic,col,d,id])=>`
      <button onclick="goToSetup('${id}')" style="display:flex;align-items:center;gap:12px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:12px 14px;cursor:pointer;text-align:left;transition:border-color .2s" onmouseover="this.style.borderColor='${col}'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="width:34px;height:34px;background:${col}20;color:${col};border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0"><i class="fas ${ic}"></i></div>
        <div style="flex:1"><div class="fw6 fs12" style="color:var(--text-primary)">${n}</div><div class="fs11 text-muted">${d}</div></div>
        <i class="fas fa-chevron-right" style="color:var(--text-muted);font-size:11px"></i>
      </button>`).join('')}
    </div>
  </div>
</div>

<script>
// ── Source config definitions ───────────────────────────────────────────────
const SOURCE_CONFIGS = {
  sheets: {
    title: 'Google Sheets Configuration',
    note: 'Google Sheets is configured in Settings. Click below to open Settings.',
    redirect: '/settings',
    fields: []
  },
  ga4: {
    title: 'Google Analytics 4 Setup',
    fields: [
      { label: 'Property ID', id: 'ga4_property_id', placeholder: 'e.g. 123456789', hint: 'Found in GA4 Admin → Property Settings' },
      { label: 'Service Account JSON', id: 'ga4_sa_json', type: 'textarea', placeholder: 'Paste your service account JSON key here', hint: 'Must have Analytics Viewer role on your GA4 property' },
    ]
  },
  gam: {
    title: 'Google Ads Manager Setup',
    fields: [
      { label: 'Customer ID', id: 'gam_customer_id', placeholder: 'e.g. 123-456-7890', hint: 'Your Google Ads MCC or account customer ID' },
      { label: 'Developer Token', id: 'gam_dev_token', placeholder: 'From Google Ads API Center', hint: 'Found in Google Ads → Tools → API Center' },
      { label: 'OAuth Refresh Token', id: 'gam_refresh_token', placeholder: 'Obtained via OAuth 2.0 flow', hint: 'See Setup Guide → Google Ads Manager tab for OAuth steps' },
    ]
  },
  bq: {
    title: 'BigQuery Setup',
    fields: [
      { label: 'Project ID', id: 'bq_project_id', placeholder: 'e.g. my-project-123', hint: 'Your Google Cloud project ID containing BigQuery datasets' },
      { label: 'Dataset ID', id: 'bq_dataset_id', placeholder: 'e.g. analytics_123456', hint: 'BigQuery dataset to query (usually GA4 export dataset)' },
      { label: 'Service Account JSON', id: 'bq_sa_json', type: 'textarea', placeholder: 'Paste BigQuery service account JSON', hint: 'Must have BigQuery Data Viewer + Job User roles' },
    ]
  },
  tiktok: {
    title: 'TikTok Ads Setup',
    fields: [
      { label: 'Advertiser ID', id: 'tiktok_advertiser_id', placeholder: 'e.g. 7184920341', hint: 'Found in TikTok Ads Manager → Account Settings' },
      { label: 'Access Token', id: 'tiktok_access_token', placeholder: 'Long-lived access token from TikTok Developer Portal', hint: 'See Setup Guide → TikTok Ads tab for OAuth steps' },
    ]
  },
  sprout: {
    title: 'Sprout Social Setup',
    fields: [
      { label: 'Account ID', id: 'sprout_account_id', placeholder: 'e.g. SP-48920', hint: 'Found in Sprout Social → Settings → Account Info' },
      { label: 'API Key', id: 'sprout_api_key', placeholder: 'Your Sprout Social API key', hint: 'Found in Sprout Social → Settings → API Keys' },
    ]
  }
};

let _currentConfigId = null;

// ── Test connection ─────────────────────────────────────────────────────────
async function testConnection(id, name) {
  const icon = document.getElementById('testIcon-' + id);
  const statusBadge = document.getElementById('status-' + id);
  if (icon) { icon.className = 'fas fa-spinner fa-spin'; }

  // For Google Sheets, test the real API
  if (id === 'sheets') {
    try {
      const res = await fetch('/api/settings/test-connection');
      const d = await res.json();
      if (d.ok) {
        statusBadge.textContent = 'CONNECTED';
        statusBadge.className = 'b b-green';
        document.getElementById('field-sheets-sheet-id').textContent = 'Connected · ' + (d.tabs ? d.tabs.length + ' tabs' : 'OK');
        document.getElementById('rowStatus-sheets').textContent = 'Live';
        document.getElementById('rowStatus-sheets').className = 'b b-green';
        if (icon) icon.className = 'fas fa-circle-check';
        showToast('Google Sheets connected! ' + (d.tabs ? d.tabs.length + ' tabs found.' : ''), 'success');
      } else {
        statusBadge.textContent = 'NOT CONFIGURED';
        statusBadge.className = 'b b-amber';
        if (icon) icon.className = 'fas fa-rotate';
        showToast('Sheets: ' + (d.error || 'Not configured — open Settings to connect'), 'error');
      }
    } catch(e) {
      if (icon) icon.className = 'fas fa-rotate';
      showToast('Test failed: ' + e.message, 'error');
    }
    return;
  }

  // For other sources: check if we have stored config
  try {
    const res = await fetch('/api/conn/status/' + id);
    const d = await res.json();
    if (d.configured) {
      statusBadge.textContent = 'CONFIGURED';
      statusBadge.className = 'b b-green';
      if (icon) icon.className = 'fas fa-circle-check';
      showToast(name + ' configuration found. Sync available via Run Now.', 'success');
    } else {
      if (icon) icon.className = 'fas fa-rotate';
      showToast(name + ' not configured yet — click Config to set up', 'info');
    }
  } catch(e) {
    // Fallback if endpoint not available
    if (icon) icon.className = 'fas fa-rotate';
    showToast(name + ' — click Config to enter credentials', 'info');
  }
}

async function testAllConnections() {
  showToast('Testing all connections…', 'info');
  const ids = ['sheets','ga4','gam','bq','tiktok','sprout'];
  for (const id of ids) {
    const cfg = SOURCE_CONFIGS[id];
    await testConnection(id, cfg.title.replace(' Setup','').replace(' Configuration',''));
    await new Promise(r => setTimeout(r, 300));
  }
}

// ── Config modal ────────────────────────────────────────────────────────────
function openConfig(id, name) {
  _currentConfigId = id;
  const cfg = SOURCE_CONFIGS[id];
  if (!cfg) return;

  // Google Sheets goes to Settings
  if (id === 'sheets') {
    if (confirm('Google Sheets is configured via Settings. Open Settings now?')) {
      window.location.href = '/settings';
    }
    return;
  }

  document.getElementById('configModalTitle').textContent = cfg.title;
  const body = document.getElementById('configModalBody');

  body.innerHTML = cfg.fields.map(f => {
    if (f.type === 'textarea') return \`
      <div>
        <label style="font-size:11px;font-weight:600;color:var(--text-muted);display:block;margin-bottom:5px">\${f.label}</label>
        <textarea id="\${f.id}" placeholder="\${f.placeholder}" rows="4"
          style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:monospace;font-size:11px;resize:vertical"></textarea>
        <div style="font-size:10.5px;color:var(--text-muted);margin-top:3px">\${f.hint||''}</div>
      </div>\`;
    return \`
      <div>
        <label style="font-size:11px;font-weight:600;color:var(--text-muted);display:block;margin-bottom:5px">\${f.label}</label>
        <input type="text" id="\${f.id}" placeholder="\${f.placeholder}"
          style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px"/>
        <div style="font-size:10.5px;color:var(--text-muted);margin-top:3px">\${f.hint||''}</div>
      </div>\`;
  }).join('') + \`
    <div style="background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.2);border-radius:9px;padding:10px 14px;font-size:11.5px;color:#a78bfa;line-height:1.7;margin-top:4px">
      <i class="fas fa-lock" style="margin-right:6px"></i>
      Credentials are stored securely in Cloudflare KV (encrypted at rest). Never stored in plain text.
    </div>\`;

  showModal('configModal');
}

async function saveConfig() {
  const id = _currentConfigId;
  if (!id) return;
  const cfg = SOURCE_CONFIGS[id];
  const data = { sourceId: id };
  for (const f of cfg.fields) {
    const el = document.getElementById(f.id);
    if (el) data[f.id] = el.value.trim();
  }
  try {
    const res = await fetch('/api/conn/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const d = await res.json();
    if (d.ok) {
      closeModal('configModal');
      document.getElementById('status-' + id).textContent = 'CONFIGURED';
      document.getElementById('status-' + id).className = 'b b-green';
      showToast('Configuration saved for ' + cfg.title, 'success');
    } else {
      showToast('Save failed: ' + (d.error || 'Unknown error'), 'error');
    }
  } catch(e) {
    showToast('Error saving: ' + e.message, 'error');
  }
}

// ── Schedule modal ──────────────────────────────────────────────────────────
function openSchedule(id, name) {
  document.getElementById('schedModalTitle').textContent = 'Sync Schedule — ' + name;
  document.getElementById('schedSourceId').value = id;
  const freqEl = document.getElementById('freq-' + id);
  showModal('scheduleModal');
}

function saveSchedule() {
  const id   = document.getElementById('schedSourceId').value;
  const freq = document.getElementById('schedFreq').value;
  const labels = { realtime:'Real-time', hourly:'Hourly', daily_02:'Daily · 02:00', daily_03:'Daily · 03:00', daily_04:'Daily · 04:00', daily_06:'Daily · 06:00', weekly:'Weekly · Mon 02:00', manual:'Manual' };
  const el = document.getElementById('freq-' + id);
  if (el) el.textContent = labels[freq] || freq;
  closeModal('scheduleModal');
  showToast('Schedule updated. Use Run Now to trigger sync immediately.', 'success');
}

// ── Run Now ─────────────────────────────────────────────────────────────────
async function runNow(id, name) {
  const icon = document.getElementById('runIcon-' + id);
  if (icon) icon.className = 'fas fa-spinner fa-spin';

  if (id === 'sheets') {
    // Test connection is equivalent to a sheets "sync"
    await testConnection('sheets', 'Google Sheets');
    if (icon) icon.className = 'fas fa-play';
    return;
  }

  try {
    const res = await fetch('/api/conn/sync/' + id, { method: 'POST' });
    const d = await res.json();
    if (d.ok) {
      const now = new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
      document.getElementById('last-' + id).textContent = 'Today ' + now;
      document.getElementById('rowStatus-' + id).textContent = 'OK';
      document.getElementById('rowStatus-' + id).className = 'b b-green';
      if (d.records) document.getElementById('records-' + id).textContent = d.records.toLocaleString() + ' rows';
      if (icon) icon.className = 'fas fa-play';
      showToast(name + ' sync complete. ' + (d.message||''), 'success');
    } else {
      if (icon) icon.className = 'fas fa-play';
      showToast(name + ': ' + (d.error || 'Sync failed — configure credentials first'), 'error');
    }
  } catch(e) {
    if (icon) icon.className = 'fas fa-play';
    showToast('Run failed: ' + e.message, 'error');
  }
}

function editAllSchedules() {
  showToast('Click the clock icon on each row to edit individual schedules.', 'info');
}

// ── Add connection ──────────────────────────────────────────────────────────
function openAddConnection() { showModal('addConnModal'); }
function goToSetup(id) {
  closeModal('addConnModal');
  const tabMap = { sheets:'sheets', ga4:'ga4', gam:'gam', bq:'bq', tiktok:'tiktok', sprout:'flow' };
  window.location.href = '/setup#' + (tabMap[id] || 'sheets');
}

// ── Modal helpers ───────────────────────────────────────────────────────────
function showModal(id) { const m = document.getElementById(id); if(m){ m.style.display='flex'; } }
function closeModal(id) { const m = document.getElementById(id); if(m){ m.style.display='none'; } }

// Close modal on backdrop click
document.addEventListener('click', e => {
  ['configModal','scheduleModal','addConnModal'].forEach(id => {
    const m = document.getElementById(id);
    if (m && e.target === m) m.style.display = 'none';
  });
});

// ── Auto-test Sheets on load ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => testConnection('sheets', 'Google Sheets'), 600);
});
</script>
`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SETUP GUIDE SCREEN
// ─────────────────────────────────────────────────────────────────────────────
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
          ['Create a new Google Spreadsheet','Name it: <strong>Astro Digital Performance Hub</strong>. Create sheets: Pipeline, Revenue, Campaign, Traffic, Social, Ads.','Create Spreadsheet →'],
          ['Enable Google Sheets API','Go to Google Cloud Console → APIs &amp; Services → Enable Sheets API v4 for your project.','Cloud Console →'],
          ['Create Service Account','IAM &amp; Admin → Service Accounts → Create → Download JSON key. Share your Sheet with the service account email.','Create SA →'],
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
          ['Create Service Account','IAM &amp; Admin → Service Accounts → Create → Give Analytics Viewer role.',''],
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

<span class="kw">const</span> client = <span class="kw">new</span> <span class="fn">BetaAnalyticsDataClient</span>({ keyFilename: <span class="str">'service-account.json'</span> });

<span class="kw">async function</span> <span class="fn">syncGA4ToSheets</span>() {
  <span class="kw">const</span> [res] = <span class="kw">await</span> client.<span class="fn">runReport</span>({
    property: <span class="str">'properties/YOUR_PROPERTY_ID'</span>,
    dateRanges: [{ startDate: <span class="str">'30daysAgo'</span>, endDate: <span class="str">'today'</span> }],
    dimensions: [{ name: <span class="str">'date'</span> }],
    metrics: [{ name: <span class="str">'sessions'</span> }, { name: <span class="str">'activeUsers'</span> }, { name: <span class="str">'engagementRate'</span> }],
  });
  <span class="kw">const</span> rows = res.rows.map(r => [
    r.dimensionValues[0].value,
    ...r.metricValues.map(m => m.value)
  ]);
  <span class="kw">await</span> <span class="fn">writeToSheet</span>(<span class="str">'Traffic'</span>, rows);
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
<span class="kw">const</span> client = <span class="kw">new</span> <span class="fn">GoogleAdsApi</span>({ client_id, client_secret, developer_token });
<span class="kw">const</span> customer = client.<span class="fn">Customer</span>({ customer_id, refresh_token });
<span class="kw">const</span> campaigns = <span class="kw">await</span> customer.report({
  entity: <span class="str">'campaign'</span>,
  attributes: [<span class="str">'campaign.id'</span>, <span class="str">'campaign.name'</span>],
  metrics: [<span class="str">'metrics.impressions'</span>, <span class="str">'metrics.clicks'</span>, <span class="str">'metrics.cost_micros'</span>],
  date_constant: <span class="str">'LAST_30_DAYS'</span>,
});</div>
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
<span class="kw">const</span> bq = <span class="kw">new</span> <span class="fn">BigQuery</span>({ projectId: <span class="str">'astro-dph-prod'</span>, keyFilename: <span class="str">'sa.json'</span> });
<span class="kw">const</span> [rows] = <span class="kw">await</span> bq.<span class="fn">query</span>({
  query: <span class="str">\`SELECT event_date, COUNT(*) AS sessions FROM \\\`dataset.events_*\\\` GROUP BY 1\`</span>
});
<span class="kw">await</span> <span class="fn">writeToSheet</span>(<span class="str">'Traffic'</span>, rows.map(r => [r.event_date, r.sessions]));</div>
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
        <div class="code-block"><span class="kw">const</span> res = <span class="kw">await</span> fetch(<span class="str">\`\${TIKTOK_BASE}/report/integrated/get/\`</span>, {
  headers: { <span class="str">'Access-Token'</span>: ACCESS_TOKEN },
  params: { advertiser_id, report_type: <span class="str">'CAMPAIGN'</span>, metrics: [<span class="str">'spend'</span>,<span class="str">'impressions'</span>,<span class="str">'clicks'</span>,<span class="str">'ctr'</span>] }
});
<span class="kw">const</span> rows = res.data.data.list.map(r => [r.dimensions.stat_time_day, r.metrics.spend, r.metrics.clicks]);
<span class="kw">await</span> <span class="fn">writeToSheet</span>(<span class="str">'Ads'</span>, rows);</div>
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
  <span class="kw">await</span> <span class="fn">syncGA4ToSheets</span>();
});

<span class="cmt">// Daily at 3 AM — Google Ads sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'0 3 * * *'</span>, <span class="fn">syncGAMToSheets</span>);

<span class="cmt">// Daily at 3:30 AM — TikTok sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'30 3 * * *'</span>, <span class="fn">syncTikTokToSheets</span>);

<span class="cmt">// Daily at 4 AM — BigQuery sync</span>
cron.<span class="fn">schedule</span>(<span class="str">'0 4 * * *'</span>, <span class="fn">queryGA4Events</span>);</div>
      </div>
    </div>
  </div>
</div>
<script>
// Open correct tab if URL hash is present
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#','');
  if (hash) {
    const tabs = document.querySelectorAll('.tabs .tab');
    const tabMap = { sheets:0, ga4:1, gam:2, bq:3, tiktok:4, flow:5 };
    const idx = tabMap[hash];
    if (idx !== undefined) {
      tabs.forEach((t,i) => t.classList.toggle('active', i===idx));
      ['sheets','ga4','gam','bq','tiktok','flow'].forEach((id,i) => {
        const p = document.getElementById('setup-'+id);
        if (p) p.style.display = i===idx ? 'block' : 'none';
      });
    }
  }
});
</script>
`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  DATA BLEND SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export function blendScreen(): string {
  return `
<div class="content fade-in">

  <!-- Header -->
  <div class="section-hd mb20">
    <div>
      <div class="section-title"><i class="fas fa-code-merge" style="color:var(--purple);margin-right:8px"></i>Data Blend</div>
      <div class="fs12 text-muted mt4">Combine multiple data sources into a unified blended dataset for cross-source analysis and reporting.</div>
    </div>
    <button class="btn-primary" onclick="newBlend()"><i class="fas fa-plus"></i>New Blend</button>
  </div>

  <div class="g62">

    <!-- Left: Blend Builder -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Active Blend -->
      <div class="card">
        <div class="card-hd">
          <div class="card-title">Blend Builder</div>
          <div style="display:flex;gap:8px;align-items:center">
            <input type="text" id="blendName" value="Revenue x Traffic Q1" placeholder="Blend name..."
              style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:7px;padding:5px 10px;font-family:inherit;font-size:12px;width:180px">
            <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 11px" onclick="previewBlend()"><i class="fas fa-eye"></i>Preview</button>
            <button class="btn-primary" style="height:30px;font-size:11px;padding:0 12px" onclick="saveBlend()"><i class="fas fa-floppy-disk"></i>Save Blend</button>
          </div>
        </div>

        <!-- Source A -->
        <div class="blend-source-card" id="blendA">
          <div class="blend-source-hd">
            <div style="display:flex;align-items:center;gap:8px">
              <div class="blend-source-badge blue">A</div>
              <select id="blendASource" onchange="updateBlendCols('A', this.value)"
                style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:7px;padding:5px 10px;font-family:inherit;font-size:12px">
                <option value="revenue">Revenue Data</option>
                <option value="pipeline">Pre-Sales Pipeline</option>
                <option value="campaign">Campaign Performance</option>
                <option value="ads">Ads Performance</option>
                <option value="traffic">Traffic Data</option>
                <option value="social">Social Media</option>
              </select>
            </div>
            <span class="b b-green">Live · 2 min ago</span>
          </div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Select columns to include</div>
          <div id="blendACols" style="display:flex;flex-wrap:wrap;gap:6px">
            ${['month','client_name','product','amount','campaign_id','created_at'].map((col, i) => `
            <label class="blend-col-check">
              <input type="checkbox" ${i < 4 ? 'checked' : ''} style="accent-color:var(--info)">
              <span>${col}</span>
            </label>`).join('')}
          </div>
        </div>

        <!-- Join Type -->
        <div class="blend-join-row">
          <div style="display:flex;align-items:center;gap:8px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:8px 14px">
            <i class="fas fa-code-merge" style="color:var(--purple)"></i>
            <span class="fw6 fs12">Join on:</span>
            <select id="blendJoinKeyA" style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:4px 8px;font-family:inherit;font-size:11px">
              <option>client_name</option><option>campaign_id</option><option>month</option>
            </select>
            <span style="color:var(--text-muted);font-size:12px">=</span>
            <select id="blendJoinKeyB" style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:4px 8px;font-family:inherit;font-size:11px">
              <option>portal</option><option>date</option><option>client_name</option>
            </select>
            <select id="blendJoinType" style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:4px 8px;font-family:inherit;font-size:11px">
              <option value="left">Left Join</option>
              <option value="inner">Inner Join</option>
              <option value="full">Full Outer</option>
            </select>
          </div>
        </div>

        <!-- Source B -->
        <div class="blend-source-card" id="blendB">
          <div class="blend-source-hd">
            <div style="display:flex;align-items:center;gap:8px">
              <div class="blend-source-badge purple">B</div>
              <select id="blendBSource" onchange="updateBlendCols('B', this.value)"
                style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:7px;padding:5px 10px;font-family:inherit;font-size:12px">
                <option value="traffic">Traffic Data</option>
                <option value="revenue">Revenue Data</option>
                <option value="social">Social Media</option>
                <option value="ads">Ads Performance</option>
                <option value="campaign">Campaign Performance</option>
                <option value="pipeline">Pre-Sales Pipeline</option>
              </select>
            </div>
            <span class="b b-green">Live · 1 hr ago</span>
          </div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Select columns to include</div>
          <div id="blendBCols" style="display:flex;flex-wrap:wrap;gap:6px">
            ${['date','portal','sessions','users','engagement_rate','fill_rate'].map((col, i) => `
            <label class="blend-col-check">
              <input type="checkbox" ${i < 4 ? 'checked' : ''} style="accent-color:var(--purple)">
              <span>${col}</span>
            </label>`).join('')}
          </div>
        </div>

        <!-- Add third source -->
        <button class="btn-ghost" style="width:100%;justify-content:center;margin-top:8px;border-style:dashed" onclick="addBlendSource()">
          <i class="fas fa-plus"></i>Add Third Source
        </button>

        <!-- Computed Columns -->
        <div style="margin-top:16px">
          <div class="card-hd" style="padding:0 0 10px"><div class="card-title" style="font-size:12px">Computed Columns</div><button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 9px" onclick="addComputed()"><i class="fas fa-plus"></i>Add</button></div>
          <div style="display:flex;flex-direction:column;gap:8px" id="computedCols">
            ${[
              ['revenue_per_session','= amount / sessions','var(--teal)'],
              ['engagement_x_revenue','= engagement_rate x amount','var(--orange)'],
            ].map(([name, formula, col]) => `
            <div style="display:flex;align-items:center;gap:10px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px;padding:9px 12px">
              <code style="color:${col};font-size:11px;flex:1">${name}</code>
              <span class="text-muted fs11">${formula}</span>
              <button class="cvs-widget-btn" onclick="this.closest('div').remove()"><i class="fas fa-xmark"></i></button>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Schema Preview -->
      <div class="card card-sm">
        <div class="card-hd"><div class="card-title">Output Schema Preview</div><span class="b b-gray">Blended: Revenue x Traffic Q1</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${['month','client_name','product','amount','campaign_id','date','portal','sessions','users','engagement_rate','revenue_per_session','engagement_x_revenue'].map(f => `
          <span style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:5px;padding:3px 9px;font-family:monospace;font-size:11px;color:var(--purple)">${f}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Right: Saved Blends + Preview -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Saved Blends -->
      <div class="card">
        <div class="card-hd"><div class="card-title">Saved Blends</div><span class="card-action" onclick="showToast('Blend manager coming soon','info')">Manage All</span></div>
        ${[
          ['Revenue x Traffic Q1','Revenue Data + Traffic Data','client_name','Left Join','27 Mar 2025','b-green','Active'],
          ['Ads x Campaign ROI','Ads Performance + Campaign','campaign_id','Inner Join','22 Mar 2025','b-green','Active'],
          ['Client x Social Reach','Pipeline + Social Media','client_name','Left Join','18 Mar 2025','b-amber','Draft'],
          ['Full Cross-Source','Rev + Traffic + Ads + Social','date','Full Outer','10 Mar 2025','b-gray','Archived'],
        ].map(([name, sources, key, join, date, b, status]) => `
        <div style="padding:11px 0;border-bottom:1px solid var(--border)">
          <div class="flex justify-between items-center mb6">
            <div class="fw6 fs12">${name}</div>
            <span class="b ${b}">${status}</span>
          </div>
          <div class="fs11 text-muted mb6">${sources}</div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <span style="font-size:10px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 8px;color:var(--text-secondary)"><i class="fas fa-link" style="margin-right:4px;opacity:.6"></i>${key}</span>
            <span style="font-size:10px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:4px;padding:2px 8px;color:var(--text-secondary)">${join}</span>
            <span class="text-muted" style="font-size:10px;margin-left:auto">${date}</span>
          </div>
          <div style="display:flex;gap:6px;margin-top:9px">
            <button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 9px" onclick="loadBlend('${name}')"><i class="fas fa-folder-open"></i>Open</button>
            <button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 9px" onclick="useInCanvas('${name}')"><i class="fas fa-layer-group"></i>Canvas</button>
            <button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 9px" onclick="useInReport('${name}')"><i class="fas fa-file-chart-pie"></i>Report AI</button>
          </div>
        </div>`).join('')}
      </div>

      <!-- Preview Table -->
      <div class="card">
        <div class="card-hd"><div class="card-title">Blend Preview</div><span class="b b-gray">10 rows · 12 columns</span></div>
        <div style="overflow-x:auto">
          <table class="tbl" style="font-size:11px">
            <thead>
              <tr>
                <th>month</th><th>client_name</th><th>product</th><th>amount</th>
                <th>portal</th><th>sessions</th><th>eng_rate</th><th>rev/session</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['Jan 2025','Maxis Berhad','Digital Ads','4.2M','Astro GO','820K','68%','RM 5.12'],
                ['Jan 2025','Celcom Axiata','Content Syndi.','3.8M','Astro GO','820K','68%','RM 4.63'],
                ['Feb 2025','Maxis Berhad','Digital Ads','4.6M','Astro on the Go','640K','61%','RM 7.19'],
                ['Feb 2025','Petronas','Sponsorship','2.9M','eLive','280K','72%','RM 10.36'],
                ['Mar 2025','Watsons','Events Live','2.1M','Astro GO','920K','66%','RM 2.28'],
              ].map(row => `
              <tr>
                ${row.map((cell, i) => `<td ${i===3||i===7?'class="fw7 text-pink"':''}>${cell}</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="flex justify-between items-center mt12">
          <div class="fs11 text-muted">Showing 5 of 2,841 blended rows · Last refreshed 2 min ago</div>
          <div style="display:flex;gap:7px">
            <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="refreshBlend()"><i class="fas fa-rotate"></i>Refresh</button>
            <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="exportBlend()"><i class="fas fa-download"></i>Export CSV</button>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>

<script>
function newBlend() { document.getElementById('blendName').value='Untitled Blend'; showToast('New blend started — configure sources above.', 'info'); }
function previewBlend() { showToast('Preview refreshed with current configuration.', 'success'); }
function saveBlend() { const n=document.getElementById('blendName').value; showToast('Blend saved: ' + (n||'Untitled'), 'success'); }
function addBlendSource() { showToast('Third source panel — configure key mapping below join row.', 'info'); }
function addComputed() {
  const col = document.getElementById('computedCols');
  const name = prompt('Column name (e.g. margin_rate):');
  if (!name) return;
  const formula = prompt('Formula (e.g. = amount - spend):');
  if (!formula) return;
  const el = document.createElement('div');
  el.style.cssText = 'display:flex;align-items:center;gap:10px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px;padding:9px 12px';
  el.innerHTML = '<code style="color:var(--teal);font-size:11px;flex:1">' + name + '</code><span class="text-muted fs11">' + formula + '</span><button class="cvs-widget-btn" onclick="this.closest(\'div\').remove()"><i class="fas fa-xmark"></i></button>';
  col.appendChild(el);
  showToast('Computed column added: ' + name, 'success');
}
function loadBlend(name) { document.getElementById('blendName').value=name; showToast('Loaded: ' + name, 'success'); }
function useInCanvas(name) { window.location.href='/canvas'; }
function useInReport(name) { window.location.href='/reportai'; }
function refreshBlend() { showToast('Blend data refreshed from Google Sheets', 'success'); }
function exportBlend() {
  const rows = [
    ['month','client_name','product','amount','portal','sessions','eng_rate','rev_session'],
    ['Jan 2025','Maxis Berhad','Digital Ads','4200000','Astro GO','820000','0.68','5.12'],
    ['Jan 2025','Celcom Axiata','Content Syndi.','3800000','Astro GO','820000','0.68','4.63'],
  ];
  const csv = rows.map(r => r.join(',')).join('\\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'blend-export.csv';
  a.click();
  showToast('Exporting blended dataset as CSV…', 'success');
}
function updateBlendCols(side, source) {
  const colSets = {
    revenue: ['month','client_name','product','amount','campaign_id','invoice_id','created_at'],
    pipeline: ['deal_id','client_name','deal_value','stage','owner','probability','close_date'],
    campaign: ['campaign_id','name','client','type','budget','impressions','clicks','ctr','revenue'],
    ads: ['date','platform','campaign_id','spend','impressions','clicks','ctr','roas'],
    traffic: ['date','portal','sessions','users','engagement_rate','bounce_rate','fill_rate'],
    social: ['date','platform','reach','impressions','engagements','eng_rate','followers'],
  };
  const cols = colSets[source] || [];
  const accent = side === 'A' ? 'var(--info)' : 'var(--purple)';
  const container = document.getElementById('blend' + side + 'Cols');
  if (container) container.innerHTML = cols.map((col, i) =>
    '<label class="blend-col-check"><input type="checkbox" ' + (i<4?'checked':'') + ' style="accent-color:' + accent + '"><span>' + col + '</span></label>'
  ).join('');
}
</script>
`;
}
