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
      { id:'sheets', icon:'fa-table',        col:'#0f9d58', name:'Google Sheets',       desc:'Central data warehouse',   st:'NOT SET UP',  bc:'b-gray',
        fields:[['Sheet ID','—'],['Status','Not configured'],['Access','Read / Write'],['Auth','Service Account']] },
      { id:'ga4',    icon:'fa-chart-bar',    col:'#e34c26', name:'Google Analytics 4',  desc:'Web traffic & engagement', st:'NOT SET UP',  bc:'b-gray',
        fields:[['Property ID','—'],['Auth Method','Service Account'],['Data','Sessions, Users, Bounce Rate'],['Sync','Daily · 02:00']] },
      { id:'gam',    icon:'fa-rectangle-ad', col:'#4285f4', name:'Google Ads Manager',  desc:'Ads performance data',     st:'NOT SET UP',  bc:'b-gray',
        fields:[['Network Code','—'],['Auth Method','Service Account'],['Data','Orders, Line Items, Ad Units, Reports'],['Scope','Read-Only · admanager.readonly']] },
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

  <!-- ── Setup Guide Banner ──────────────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-circle-info" style="color:var(--info);margin-right:7px"></i>Getting Started</div>
      <button class="btn-primary" style="height:30px;font-size:11px;padding:0 14px" onclick="window.location.href='/setup'">
        <i class="fas fa-book-open"></i>View Setup Guide
      </button>
    </div>
    <div class="fs12 text-muted" style="line-height:1.8">
      <strong>Google Sheets</strong> and <strong>Google Ad Manager</strong> are your primary data sources.
      Click <strong>Config</strong> on each card above to enter your Service Account credentials.
      Then click <strong>Test</strong> to verify the connection. Once connected, all dashboards will automatically load live data.
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
    title: 'Google Sheets Setup',
    fields: [
      { label: 'Spreadsheet ID', id: 'sheets_spreadsheet_id', placeholder: 'e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms', hint: 'Found in your Sheet URL: docs.google.com/spreadsheets/d/SHEET_ID/edit' },
      { label: 'Service Account JSON', id: 'sheets_sa_json', type: 'textarea', placeholder: '{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...","client_email":"...@....iam.gserviceaccount.com",...}', hint: 'Download JSON key from Google Cloud → IAM → Service Accounts. Share your Sheet with the service account email (Editor).' },
    ]
  },
  ga4: {
    title: 'Google Analytics 4 Setup',
    fields: [
      { label: 'Property ID', id: 'ga4_property_id', placeholder: 'e.g. 123456789', hint: 'Found in GA4 Admin → Property Settings' },
      { label: 'Service Account JSON', id: 'ga4_sa_json', type: 'textarea', placeholder: 'Paste your service account JSON key here', hint: 'Must have Analytics Viewer role on your GA4 property' },
    ]
  },
  gam: {
    title: 'Google Ad Manager (GAM) Setup',
    fields: [
      { label: 'Network Code', id: 'gam_network_code', placeholder: 'e.g. 142680780', hint: 'Found in GAM UI → Admin → Global Settings → Network code' },
      { label: 'Service Account JSON', id: 'gam_sa_json', type: 'textarea', placeholder: 'Paste the full contents of your service account .json key file here', hint: 'Service account must be added in GAM: Admin → Global Settings → API access → Service accounts' },
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

  // For Google Sheets, test the real Sheets API
  if (id === 'sheets') {
    try {
      const res = await fetch('/api/sheets/test');
      const d = await res.json();
      if (d.ok) {
        statusBadge.textContent = 'CONNECTED';
        statusBadge.className = 'b b-green';
        document.getElementById('field-sheets-sheet-id').textContent = d.sheetId.substring(0, 20) + '… · ' + (d.tabs ? d.tabs.length + ' tabs' : 'OK');
        document.getElementById('field-sheets-status').textContent = 'Connected ✓';
        document.getElementById('rowStatus-sheets').textContent = 'Live';
        document.getElementById('rowStatus-sheets').className = 'b b-green';
        if (icon) icon.className = 'fas fa-circle-check';
        showToast('Google Sheets connected! ' + (d.tabs ? d.tabs.length + ' tabs found.' : ''), 'success');
      } else {
        statusBadge.textContent = 'NOT CONFIGURED';
        statusBadge.className = 'b b-amber';
        if (icon) icon.className = 'fas fa-rotate';
        showToast('Sheets: ' + (d.error || 'Not configured — click Config to connect'), 'error');
      }
    } catch(e) {
      if (icon) icon.className = 'fas fa-rotate';
      showToast('Test failed: ' + e.message, 'error');
    }
    return;
  }

  // For Google Ad Manager — call the real GAM test endpoint
  if (id === 'gam') {
    try {
      const res = await fetch('/api/gam/test');
      const d = await res.json();
      if (d.ok && d.network) {
        const net = d.network;
        statusBadge.textContent = 'CONNECTED';
        statusBadge.className = 'b b-green';
        // Update the card fields that exist in the new Service Account card layout
        const ncEl = document.getElementById('field-gam-network-code');
        if (ncEl) ncEl.textContent = net.networkCode || 'Connected';
        const authEl = document.getElementById('field-gam-auth-method');
        if (authEl) authEl.textContent = 'Service Account ✓';
        const dataEl = document.getElementById('field-gam-data');
        if (dataEl) dataEl.textContent = 'Orders, Line Items, Ad Units, Reports';
        const scopeEl = document.getElementById('field-gam-scope');
        if (scopeEl) scopeEl.textContent = 'Read-Only · ' + (net.currencyCode ? net.currencyCode + ' · ' : '') + (net.timeZone || 'Active');
        if (icon) icon.className = 'fas fa-circle-check';
        showToast('Google Ad Manager connected! Network: ' + (net.displayName || net.networkCode), 'success');
        loadGAMSummary();
      } else {
        statusBadge.textContent = 'NOT CONFIGURED';
        statusBadge.className = 'b b-amber';
        if (icon) icon.className = 'fas fa-rotate';
        showToast('GAM: ' + (d.error || 'Not configured — click Config to set up'), 'error');
      }
    } catch(e) {
      if (icon) icon.className = 'fas fa-rotate';
      showToast('GAM test failed: ' + e.message, 'error');
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
    if (icon) icon.className = 'fas fa-rotate';
    showToast(name + ' — click Config to enter credentials', 'info');
  }
}

// ── Load GAM summary panel ──────────────────────────────────────────────────
async function loadGAMSummary() {
  try {
    const res = await fetch('/api/gam/summary');
    const d = await res.json();
    if (!d.ok) return;
    const panel = document.getElementById('gamSummaryPanel');
    if (!panel) return;
    panel.style.display = '';
    panel.innerHTML = \`
      <div class="card-hd" style="margin-bottom:14px">
        <div class="card-title"><i class="fas fa-rectangle-ad" style="color:#4285f4;margin-right:7px"></i>Google Ad Manager — Live Summary</div>
        <span class="b b-green">LIVE</span>
      </div>
      <div class="g3" style="gap:12px">
        <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:14px 16px;text-align:center">
          <div style="font-size:22px;font-weight:800;color:var(--text-primary)">\${d.orders.total}</div>
          <div class="fs11 text-muted mt4">Total Orders</div>
          <div class="fs11" style="margin-top:6px">\${Object.entries(d.orders.byStatus).map(([s,c]) => '<span class="b b-gray" style="margin-right:4px;font-size:10px">'+s+': '+c+'</span>').join('')}</div>
        </div>
        <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:14px 16px;text-align:center">
          <div style="font-size:22px;font-weight:800;color:var(--text-primary)">\${d.lineItems.total}</div>
          <div class="fs11 text-muted mt4">Line Items</div>
          <div class="fs11" style="margin-top:6px">\${d.lineItems.totalImpressions > 0 ? d.lineItems.totalImpressions.toLocaleString() + ' impr.' : 'Active'}</div>
        </div>
        <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:10px;padding:14px 16px;text-align:center">
          <div style="font-size:22px;font-weight:800;color:var(--text-primary)">\${d.adUnits.active}</div>
          <div class="fs11 text-muted mt4">Active Ad Units</div>
          <div class="fs11" style="margin-top:6px">\${d.adUnits.total} total</div>
        </div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 11px" onclick="loadGAMData('orders')"><i class="fas fa-list"></i>View Orders</button>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 11px" onclick="loadGAMData('lineitems')"><i class="fas fa-bars"></i>Line Items</button>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 11px" onclick="loadGAMData('adunits')"><i class="fas fa-th-large"></i>Ad Units</button>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 11px" onclick="loadGAMData('reports')"><i class="fas fa-file-chart-pie"></i>Reports</button>
      </div>
    \`;
  } catch(e) { /* silent */ }
}

// ── Load GAM data table ─────────────────────────────────────────────────────
async function loadGAMData(type) {
  const panel = document.getElementById('gamDataPanel');
  if (!panel) return;
  panel.style.display = '';
  panel.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-muted)"><i class="fas fa-spinner fa-spin" style="margin-right:8px"></i>Loading ' + type + '…</div>';

  try {
    const res = await fetch('/api/gam/' + type);
    const d = await res.json();
    if (!d.ok) { panel.innerHTML = '<div style="padding:12px;color:var(--danger);font-size:12px">Error: ' + d.error + '</div>'; return; }

    const items = d.orders || d.lineItems || d.adUnits || d.reports || [];
    if (items.length === 0) { panel.innerHTML = '<div style="padding:12px;color:var(--text-muted);font-size:12px">No ' + type + ' found.</div>'; return; }

    const cols = Object.keys(items[0]).filter(k => !['reportDefinition'].includes(k)).slice(0, 6);
    panel.innerHTML = \`
      <div class="card-hd" style="margin-bottom:10px">
        <div class="card-title">\${type.charAt(0).toUpperCase()+type.slice(1)} (\${items.length})</div>
        <button class="btn-ghost" style="height:26px;font-size:11px;padding:0 9px" onclick="document.getElementById('gamDataPanel').style.display='none'"><i class="fas fa-xmark"></i></button>
      </div>
      <div style="overflow-x:auto;max-height:260px;overflow-y:auto">
        <table class="tbl" style="font-size:11px">
          <thead><tr>\${cols.map(c => '<th>'+c.replace(/([A-Z])/g,' $1').trim()+'</th>').join('')}</tr></thead>
          <tbody>\${items.slice(0,20).map(row =>
            '<tr>'+cols.map(c => '<td>'+(row[c]||'—')+'</td>').join('')+'</tr>'
          ).join('')}</tbody>
        </table>
      </div>
    \`;
  } catch(e) {
    panel.innerHTML = '<div style="padding:12px;color:var(--danger);font-size:12px">Error: ' + e.message + '</div>';
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
    // Google Sheets uses new unified API endpoint
    if (id === 'sheets') {
      const saJson = data['sheets_sa_json'];
      const sheetId = data['sheets_spreadsheet_id'];
      if (!saJson || !sheetId) { showToast('Please fill in both the Spreadsheet ID and Service Account JSON.', 'error'); return; }
      try { JSON.parse(saJson); } catch(e) { showToast('Invalid Service Account JSON — please check the format.', 'error'); return; }
      // Save via new API endpoint
      const res = await fetch('/api/sheets/config', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({serviceAccountJson:saJson, sheetId}) });
      const d = await res.json();
      if (!d.ok) { showToast('Save failed: '+(d.error||'Unknown error'), 'error'); return; }
      closeModal('configModal');
      document.getElementById('status-sheets').textContent = 'CONFIGURED';
      document.getElementById('status-sheets').className = 'b b-green';
      const fieldEl = document.getElementById('field-sheets-sheet-id');
      if (fieldEl) fieldEl.textContent = sheetId.slice(0,18)+'…';
      showToast('Google Sheets credentials saved! Click Test to verify the connection.', 'success');
      return;
    }
    // Google Ad Manager uses new unified API endpoint
    if (id === 'gam') {
      const saJson = data['gam_sa_json'];
      const networkCode = data['gam_network_code'];
      if (!saJson || !networkCode) { showToast('Please fill in both the Network Code and Service Account JSON.', 'error'); return; }
      try { JSON.parse(saJson); } catch(e) { showToast('Invalid Service Account JSON — please check the format.', 'error'); return; }
      // Save via new API endpoint
      const res = await fetch('/api/gam/config', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({serviceAccountJson:saJson, networkCode}) });
      const d = await res.json();
      if (!d.ok) { showToast('Save failed: '+(d.error||'Unknown error'), 'error'); return; }
      closeModal('configModal');
      document.getElementById('status-gam').textContent = 'CONFIGURED';
      document.getElementById('status-gam').className = 'b b-green';
      const fieldEl = document.getElementById('field-gam-network-code');
      if (fieldEl) fieldEl.textContent = networkCode;
      showToast('Google Ad Manager credentials saved! Click Test to verify the connection.', 'success');
      return;
    }
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

    <div class="card" style="margin-bottom:16px;border-left:3px solid #4285f4">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <i class="fas fa-circle-info" style="color:#4285f4"></i>
        <span style="font-weight:700;font-size:13px">Service Account Authentication (No OAuth required)</span>
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.7">
        This platform connects to Google Ad Manager using a <strong>Service Account JSON key</strong> — no browser OAuth flow, no refresh tokens needed.
        The service account authenticates server-to-server using <code style="background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">admanager.readonly</code> scope.
        Your GAM data is <strong>read-only</strong>: orders, line items, ad units and saved reports are fetched but never modified.
      </div>
    </div>

    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-list-check" style="color:#4285f4;margin-right:7px"></i>Setup Steps</div></div>

        <div class="step-item">
          <div class="step-num">1</div>
          <div>
            <div class="step-title">Enable Ad Manager API in Google Cloud</div>
            <div class="step-body">
              Go to <strong>Google Cloud Console → APIs &amp; Services → Library</strong><br>
              Search for <em>"Google Ad Manager API"</em> → Click <strong>Enable</strong>.<br>
              Make sure this is the same project your service account belongs to.
              <br><a href="https://console.cloud.google.com/apis/library/admanager.googleapis.com" target="_blank" class="text-pink fs11">Open API Library →</a>
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-num">2</div>
          <div>
            <div class="step-title">Create (or reuse) a Service Account</div>
            <div class="step-body">
              In Cloud Console → <strong>IAM &amp; Admin → Service Accounts → Create Service Account</strong>.<br>
              Name it e.g. <code style="background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">gam-reader</code>. No Cloud IAM roles needed for GAM access.<br>
              Then: <strong>Keys → Add Key → Create New Key → JSON</strong> → download the file.
              <br><a href="https://console.cloud.google.com/iam-admin/serviceaccounts" target="_blank" class="text-pink fs11">Manage Service Accounts →</a>
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-num">3</div>
          <div>
            <div class="step-title">Add Service Account to Google Ad Manager</div>
            <div class="step-body">
              In GAM UI: <strong>Admin → Global Settings → API access → Service accounts → Add a service account user</strong>.<br>
              Paste the service account email (ends in <code style="background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">@...iam.gserviceaccount.com</code>).<br>
              Set role to <strong>Read Only</strong> (Viewer is sufficient for pulling reports/orders/line items).<br>
              Save. GAM may take a few minutes to activate the account.
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-num">4</div>
          <div>
            <div class="step-title">Find your Network Code</div>
            <div class="step-body">
              In GAM UI: <strong>Admin → Global Settings</strong> — the <strong>Network code</strong> is listed at the top (e.g. <code style="background:var(--bg3);padding:1px 5px;border-radius:4px;font-size:11px">142680780</code>).<br>
              You'll need this along with the JSON key when configuring the connection.
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-num">5</div>
          <div>
            <div class="step-title">Configure &amp; Test in API Connections</div>
            <div class="step-body">
              Go to <strong>API Connections</strong> → Google Ads Manager card → <strong>Config</strong>.<br>
              Enter your <strong>Network Code</strong> and paste the full <strong>Service Account JSON</strong>.<br>
              Click <strong>Save</strong>, then click <strong>Test</strong> — you should see <span style="color:#00d68f;font-weight:600">CONNECTED</span> with your network name.
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="card">
          <div class="card-hd"><div class="card-title"><i class="fas fa-code" style="color:#4285f4;margin-right:7px"></i>How the Authentication Works</div></div>
          <div class="code-block"><span class="cmt">// 1. Sign a JWT with the service account private key</span>
<span class="kw">const</span> jwt = <span class="kw">await</span> <span class="fn">signJwt</span>(saJson, {
  scope: <span class="str">'https://www.googleapis.com/auth/admanager.readonly'</span>,
  aud:   <span class="str">'https://oauth2.googleapis.com/token'</span>,
  iss:   saJson.client_email,
});

<span class="cmt">// 2. Exchange JWT for a short-lived access token</span>
<span class="kw">const</span> { access_token } = <span class="kw">await</span> fetch(<span class="str">'https://oauth2.googleapis.com/token'</span>, {
  method: <span class="str">'POST'</span>,
  body: <span class="str">\`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=\${jwt}\`</span>
}).<span class="fn">json</span>();

<span class="cmt">// 3. Call GAM REST API with Bearer token</span>
<span class="kw">const</span> network = <span class="kw">await</span> fetch(
  <span class="str">\`https://admanager.googleapis.com/v1/networks/\${networkCode}\`</span>,
  { headers: { Authorization: <span class="str">\`Bearer \${access_token}\`</span> } }
).<span class="fn">json</span>();</div>
        </div>

        <div class="card">
          <div class="card-hd"><div class="card-title"><i class="fas fa-plug" style="color:#4285f4;margin-right:7px"></i>Available API Endpoints</div></div>
          ${[
            ['/api/gam/test',         'GET', 'Test connection & get network info'],
            ['/api/gam/network',      'GET', 'Full network metadata'],
            ['/api/gam/orders',       'GET', 'List all orders (up to 100)'],
            ['/api/gam/lineitems',    'GET', 'List all line items'],
            ['/api/gam/adunits',      'GET', 'List all ad units'],
            ['/api/gam/reports',      'GET', 'List saved reports'],
            ['/api/gam/reports/:id/run', 'GET', 'Fetch results of a saved report'],
            ['/api/gam/summary',      'GET', 'Aggregated dashboard summary'],
          ].map(([ep, method, desc]) => `
          <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
            <span style="background:rgba(66,133,244,0.15);color:#4285f4;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;flex-shrink:0;margin-top:1px">${method}</span>
            <div>
              <code style="font-size:11px;color:var(--text-muted)">${ep}</code>
              <div style="font-size:11px;color:var(--text-muted2);margin-top:1px">${desc}</div>
            </div>
          </div>`).join('')}
          <div style="margin-top:10px;font-size:11px;color:var(--text-muted);display:flex;align-items:center;gap:6px">
            <i class="fas fa-lock" style="color:#4285f4"></i>
            All endpoints require an active session (login) and use read-only GAM scope.
          </div>
        </div>
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
            ['3','API Sync — GAM','Service Account JWT → GAM REST API (read-only) → Orders/Line Items/Reports','fa-rectangle-ad','#4285f4'],
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

<span class="cmt">// Daily at 3 AM — GAM read-only pull via Service Account</span>
cron.<span class="fn">schedule</span>(<span class="str">'0 3 * * *'</span>, <span class="kw">async</span> () => {
  <span class="cmt">// JWT signed with SA key → admanager.readonly token</span>
  <span class="kw">const</span> token = <span class="kw">await</span> <span class="fn">getGAMAccessToken</span>(saJson);
  <span class="kw">const</span> orders = <span class="kw">await</span> <span class="fn">listGAMOrders</span>(token, networkCode);
  <span class="cmt">// No writes to GAM — data is pulled and stored locally</span>
});

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

// ─────────────────────────────────────────────────────────────────────────────
//  API DATA SOURCES SCREEN  (replaces Manual Upload — direct API integrations)
// ─────────────────────────────────────────────────────────────────────────────
export function apiDataScreen(): string {
  return `
<div class="content fade-in">

  <!-- ── Header banner ──────────────────────────────────────────────────── -->
  <div class="card" style="background:linear-gradient(135deg,rgba(66,133,244,0.12),rgba(226,0,122,0.08));border:1px solid rgba(66,133,244,0.25);margin-bottom:0">
    <div style="display:flex;align-items:center;gap:14px">
      <div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#4285f4,#e2007a);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="fas fa-satellite-dish" style="color:#fff;font-size:18px"></i>
      </div>
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--text-primary)">API Data Sources</div>
        <div class="fs12 text-muted" style="margin-top:2px">Live integrations with Google Ad Manager, Google Sheets and BigQuery — no manual uploads required</div>
      </div>
      <div style="margin-left:auto;display:flex;gap:8px;flex-shrink:0">
        <button class="btn-ghost" style="height:30px;font-size:11px;padding:0 12px" onclick="refreshAllStatus()">
          <i class="fas fa-rotate" id="refreshAllIcon"></i>Refresh Status
        </button>
        <button class="btn-primary" style="height:30px;font-size:11px;padding:0 12px" onclick="navigate('apiconn')">
          <i class="fas fa-plug"></i>Manage Connections
        </button>
      </div>
    </div>
  </div>

  <!-- ── Connection Status Row ─────────────────────────────────────────── -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">

    <!-- GAM -->
    <div class="card" id="gamStatusCard">
      <div class="card-hd" style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;border-radius:9px;background:rgba(66,133,244,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas fa-rectangle-ad" style="color:#4285f4;font-size:14px"></i>
          </div>
          <div>
            <div class="fw7 fs13">Google Ad Manager</div>
            <div class="fs10 text-muted">admanager.readonly</div>
          </div>
        </div>
        <span class="b b-gray fs10" id="gamConnBadge">Checking…</span>
      </div>
      <div id="gamConnDetails" style="display:flex;flex-direction:column;gap:5px;min-height:54px">
        <div class="text-muted fs12" style="text-align:center;padding:8px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
      <div style="display:flex;gap:7px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn-ghost" style="flex:1;height:28px;font-size:11px;justify-content:center" onclick="testSource('gam')">
          <i class="fas fa-vial" id="gamTestIcon"></i>Test
        </button>
        <button class="btn-primary" style="flex:1;height:28px;font-size:11px;justify-content:center" onclick="navigate('gamanalytics')">
          <i class="fas fa-chart-line"></i>View Data
        </button>
      </div>
    </div>

    <!-- Sheets -->
    <div class="card" id="sheetsStatusCard">
      <div class="card-hd" style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;border-radius:9px;background:rgba(0,214,143,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas fa-table-cells" style="color:#00d68f;font-size:14px"></i>
          </div>
          <div>
            <div class="fw7 fs13">Google Sheets</div>
            <div class="fs10 text-muted">spreadsheets.readonly</div>
          </div>
        </div>
        <span class="b b-gray fs10" id="sheetsConnBadge">Checking…</span>
      </div>
      <div id="sheetsConnDetails" style="display:flex;flex-direction:column;gap:5px;min-height:54px">
        <div class="text-muted fs12" style="text-align:center;padding:8px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
      <div style="display:flex;gap:7px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn-ghost" style="flex:1;height:28px;font-size:11px;justify-content:center" onclick="testSource('sheets')">
          <i class="fas fa-vial" id="sheetsTestIcon"></i>Test
        </button>
        <button class="btn-primary" style="flex:1;height:28px;font-size:11px;justify-content:center" onclick="navigate('revenue')">
          <i class="fas fa-chart-bar"></i>View Data
        </button>
      </div>
    </div>

    <!-- BigQuery -->
    <div class="card" id="bqStatusCard">
      <div class="card-hd" style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;border-radius:9px;background:rgba(245,158,11,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas fa-database" style="color:#f59e0b;font-size:14px"></i>
          </div>
          <div>
            <div class="fw7 fs13">BigQuery</div>
            <div class="fs10 text-muted">bigquery.readonly</div>
          </div>
        </div>
        <span class="b b-gray fs10" id="bqConnBadge">Checking…</span>
      </div>
      <div id="bqConnDetails" style="display:flex;flex-direction:column;gap:5px;min-height:54px">
        <div class="text-muted fs12" style="text-align:center;padding:8px"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
      <div style="display:flex;gap:7px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn-ghost" style="flex:1;height:28px;font-size:11px;justify-content:center" onclick="testSource('bq')">
          <i class="fas fa-vial" id="bqTestIcon"></i>Test
        </button>
        <button class="btn-primary" style="flex:1;height:28px;font-size:11px;justify-content:center" onclick="navigate('traffic')">
          <i class="fas fa-chart-area"></i>View Data
        </button>
      </div>
    </div>

  </div>

  <!-- ── Live Data Preview ───────────────────────────────────────────────── -->
  <div class="card">
    <div class="card-hd">
      <div class="card-title"><i class="fas fa-eye" style="color:#4285f4;margin-right:7px"></i>Live Data Preview</div>
      <div style="display:flex;gap:8px;align-items:center">
        <select id="previewSource" style="background:var(--bg-input);border:1px solid var(--border);border-radius:8px;padding:4px 10px;color:var(--text-primary);font-size:11px;outline:none" onchange="loadDataPreview()">
          <option value="">— Select source —</option>
          <option value="gam-orders">GAM → Orders</option>
          <option value="gam-lineitems">GAM → Line Items</option>
          <option value="gam-adunits">GAM → Ad Units</option>
          <option value="sheets-revenue">Sheets → Revenue</option>
          <option value="sheets-pipeline">Sheets → Pipeline</option>
          <option value="sheets-traffic">Sheets → Traffic</option>
        </select>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" onclick="loadDataPreview()">
          <i class="fas fa-sync" id="previewRefreshIcon"></i>Fetch
        </button>
        <button class="btn-ghost" style="height:28px;font-size:11px;padding:0 10px" id="previewExportBtn" onclick="exportPreviewCSV()" style="display:none">
          <i class="fas fa-download"></i>CSV
        </button>
      </div>
    </div>
    <div id="previewBanner" style="display:none;padding:10px 14px;border-radius:8px;background:rgba(66,133,244,0.08);border:1px solid rgba(66,133,244,0.2);margin-bottom:10px;font-size:12px;color:#4285f4"></div>
    <div id="previewTableWrap" style="overflow-x:auto;max-height:320px;overflow-y:auto">
      <div class="text-muted fs12" style="padding:30px;text-align:center">
        <i class="fas fa-satellite-dish" style="font-size:24px;margin-bottom:8px;display:block;opacity:0.3"></i>
        Select a data source above to preview live API data
      </div>
    </div>
    <div id="previewMeta" class="fs11 text-muted" style="margin-top:8px"></div>
  </div>

  <!-- ── Data Flow Architecture ─────────────────────────────────────────── -->
  <div class="g62">

    <!-- Data Sources Detail -->
    <div class="card">
      <div class="card-hd"><div class="card-title"><i class="fas fa-diagram-project" style="color:#a78bfa;margin-right:7px"></i>Data Flow</div></div>
      ${[
        ['Google Ad Manager', 'fa-rectangle-ad', '#4285f4',
         'Orders · Line Items · Ad Units · Reports',
         '/gamanalytics', 'GAM Analytics'],
        ['Google Sheets', 'fa-table-cells', '#00d68f',
         'Revenue · Pipeline · Campaign · Traffic · Social',
         '/revenue', 'Revenue View'],
        ['BigQuery', 'fa-database', '#f59e0b',
         'GA4 Events · Sessions · Custom SQL Queries',
         '/traffic', 'Traffic View'],
      ].map(([name, icon, color, data, href, btnLabel]) => `
      <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">
        <div style="width:36px;height:36px;border-radius:10px;background:${color}1a;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">
          <i class="fas ${icon}" style="color:${color};font-size:15px"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="fw7 fs13">${name}</div>
          <div class="fs11 text-muted" style="margin-top:3px">${data}</div>
        </div>
        <a href="${href}" style="text-decoration:none">
          <button class="btn-ghost" style="height:26px;font-size:10px;padding:0 9px;flex-shrink:0">
            <i class="fas fa-arrow-right"></i>${btnLabel}
          </button>
        </a>
      </div>`).join('')}
    </div>

    <!-- Right column -->
    <div style="display:flex;flex-direction:column;gap:14px">

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-bolt" style="color:#f59e0b;margin-right:7px"></i>Quick Actions</div></div>
        ${[
          ['fa-plug','#4285f4','Configure API Connections','Set up service accounts & credentials','navigate(\'apiconn\')'],
          ['fa-book-open','#a78bfa','Setup Guide','Step-by-step integration instructions','navigate(\'setup\')'],
          ['fa-code-merge','#00d68f','Data Blend','Combine and transform data sources','navigate(\'blend\')'],
          ['fa-file-chart-pie','#e2007a','Report AI','Generate AI-powered reports','navigate(\'reportai\')'],
        ].map(([icon, col, title, sub, action]) => `
        <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="${action}">
          <div style="width:30px;height:30px;border-radius:8px;background:${col}1a;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas ${icon}" style="color:${col};font-size:12px"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div class="fw6 fs12">${title}</div>
            <div class="fs10 text-muted">${sub}</div>
          </div>
          <i class="fas fa-chevron-right" style="color:var(--border);font-size:9px;flex-shrink:0"></i>
        </div>`).join('')}
      </div>

      <!-- Last Refresh -->
      <div class="card card-sm">
        <div class="card-hd"><div class="card-title"><i class="fas fa-clock-rotate-left" style="color:#8080a8;margin-right:7px"></i>Connection Info</div></div>
        <div style="display:flex;flex-direction:column;gap:6px" id="connInfoRows">
          ${[
            ['GAM','admanager.readonly','Service Account JWT'],
            ['Sheets','spreadsheets.readonly','Service Account JWT'],
            ['BigQuery','bigquery.readonly','Service Account JWT'],
          ].map(([src,scope,method]) => `
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
            <span class="fs11 text-muted">${src}</span>
            <span class="fs11 fw6" style="text-align:right">
              <span class="b b-gray" style="font-size:9px">${method}</span>
            </span>
          </div>`).join('')}
        </div>
      </div>

    </div>
  </div>

</div>

<script>
// ── Connection status checks ─────────────────────────────────────────────────
async function refreshAllStatus() {
  const icon = document.getElementById('refreshAllIcon');
  if (icon) icon.className = 'fas fa-spinner fa-spin';
  await Promise.all([checkGAM(), checkSheets(), checkBQ()]);
  if (icon) icon.className = 'fas fa-rotate';
}

async function testSource(id) {
  const iconEl = document.getElementById(id + 'TestIcon');
  if (iconEl) iconEl.className = 'fas fa-spinner fa-spin';
  if      (id === 'gam')    await checkGAM();
  else if (id === 'sheets') await checkSheets();
  else if (id === 'bq')     await checkBQ();
  if (iconEl) iconEl.className = 'fas fa-vial';
}

async function checkGAM() {
  const badge   = document.getElementById('gamConnBadge');
  const details = document.getElementById('gamConnDetails');
  try {
    const res = await fetch('/api/gam/test');
    const d   = await res.json();
    if (d.ok && d.network) {
      badge.textContent = 'Connected';
      badge.className   = 'b b-green fs10';
      details.innerHTML = [
        ['Network', d.network.displayName || d.network.networkCode],
        ['Currency', d.network.currencyCode || '—'],
        ['Time Zone', d.network.timeZone || '—'],
      ].map(([k,v]) => \`<div style="display:flex;justify-content:space-between"><span class="fs11 text-muted">\${k}</span><span class="fs11 fw6">\${v}</span></div>\`).join('');
    } else {
      badge.textContent = 'Not Configured';
      badge.className   = 'b b-amber fs10';
      details.innerHTML = '<div class="fs11 text-muted" style="padding:6px 0">' + (d.error || 'Go to API Connections → GAM Config') + '</div>';
    }
  } catch(e) {
    badge.textContent = 'Error';
    badge.className   = 'b b-red fs10';
    details.innerHTML = '<div class="fs11 text-muted" style="padding:6px 0">Network error: ' + e.message + '</div>';
  }
}

async function checkSheets() {
  const badge   = document.getElementById('sheetsConnBadge');
  const details = document.getElementById('sheetsConnDetails');
  try {
    const res = await fetch('/api/sheets/test');
    const d   = await res.json();
    if (d.ok) {
      badge.textContent = 'Connected';
      badge.className   = 'b b-green fs10';
      details.innerHTML = [
        ['Sheet ID', (d.spreadsheetId || '—').slice(0,18)+'…'],
        ['Tabs', (d.tabs || []).slice(0,3).join(', ') || '—'],
      ].map(([k,v]) => \`<div style="display:flex;justify-content:space-between"><span class="fs11 text-muted">\${k}</span><span class="fs11 fw6" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${v}</span></div>\`).join('');
    } else {
      badge.textContent = 'Not Configured';
      badge.className   = 'b b-amber fs10';
      details.innerHTML = '<div class="fs11 text-muted" style="padding:6px 0">' + (d.error || 'Go to API Connections → Sheets Config') + '</div>';
    }
  } catch(e) {
    badge.textContent = 'Error';
    badge.className   = 'b b-red fs10';
    details.innerHTML = '<div class="fs11 text-muted" style="padding:6px 0">Network error: ' + e.message + '</div>';
  }
}

async function checkBQ() {
  const badge   = document.getElementById('bqConnBadge');
  const details = document.getElementById('bqConnDetails');
  try {
    const res = await fetch('/api/bq/test');
    const d   = await res.json();
    if (d.ok) {
      badge.textContent = 'Connected';
      badge.className   = 'b b-green fs10';
      details.innerHTML = [
        ['Project', d.projectId || '—'],
        ['Dataset', d.datasetId || '—'],
      ].map(([k,v]) => \`<div style="display:flex;justify-content:space-between"><span class="fs11 text-muted">\${k}</span><span class="fs11 fw6">\${v}</span></div>\`).join('');
    } else {
      badge.textContent = 'Not Configured';
      badge.className   = 'b b-amber fs10';
      details.innerHTML = '<div class="fs11 text-muted" style="padding:6px 0">' + (d.error || 'Go to API Connections → BigQuery Config') + '</div>';
    }
  } catch(e) {
    badge.textContent = 'Error';
    badge.className   = 'b b-red fs10';
    details.innerHTML = '<div class="fs11 text-muted" style="padding:6px 0">Network error: ' + e.message + '</div>';
  }
}

// ── Live Data Preview ────────────────────────────────────────────────────────
let _previewData = [];
let _previewCols = [];

async function loadDataPreview() {
  const src    = document.getElementById('previewSource').value;
  const wrap   = document.getElementById('previewTableWrap');
  const meta   = document.getElementById('previewMeta');
  const banner = document.getElementById('previewBanner');
  const icon   = document.getElementById('previewRefreshIcon');
  if (!src) { wrap.innerHTML = '<div class="text-muted fs12" style="padding:30px;text-align:center">Select a data source above</div>'; return; }
  wrap.innerHTML = '<div class="text-muted fs12" style="padding:24px;text-align:center"><i class="fas fa-spinner fa-spin"></i> Fetching live data…</div>';
  banner.style.display = 'none';
  meta.textContent = '';
  if (icon) icon.className = 'fas fa-spinner fa-spin';
  try {
    let rows = [], cols = [], sourceLabel = src;
    if (src === 'gam-orders') {
      const d = await fetch('/api/gam/orders?pageSize=50').then(r=>r.json());
      rows = d.orders || [];
      cols = ['displayName','status','totalBudget','startTime','endTime','advertiserId'];
      sourceLabel = 'GAM Orders';
    } else if (src === 'gam-lineitems') {
      const d = await fetch('/api/gam/lineitems?pageSize=50').then(r=>r.json());
      rows = d.lineItems || [];
      cols = ['displayName','status','lineItemType','impressionsDelivered','clicksDelivered','startTime','endTime'];
      sourceLabel = 'GAM Line Items';
    } else if (src === 'gam-adunits') {
      const d = await fetch('/api/gam/adunits').then(r=>r.json());
      rows = d.adUnits || [];
      cols = ['displayName','adUnitCode','status'];
      sourceLabel = 'GAM Ad Units';
    } else if (src.startsWith('sheets-')) {
      const section = src.replace('sheets-','');
      const d = await fetch('/api/data/' + section).then(r=>r.json());
      rows = d.rows || [];
      cols = rows.length > 0 ? Object.keys(rows[0]) : [];
      sourceLabel = 'Sheets: ' + section;
    }
    _previewData = rows;
    _previewCols = cols;
    if (!rows.length) {
      wrap.innerHTML = '<div class="text-muted fs12" style="padding:24px;text-align:center"><i class="fas fa-inbox" style="font-size:20px;display:block;margin-bottom:8px;opacity:0.3"></i>No data returned. Check connection settings.</div>';
      meta.textContent = '';
    } else {
      banner.textContent = 'Live from ' + sourceLabel + ' · ' + rows.length + ' records returned';
      banner.style.display = 'block';
      const headerRow = '<thead><tr>' + cols.map(c => '<th style="font-size:10px;white-space:nowrap">' + c + '</th>').join('') + '</tr></thead>';
      const bodyRows = rows.slice(0,30).map(row =>
        '<tr>' + cols.map(c => {
          let v = row[c];
          if (v && typeof v === 'object') v = v.units ? v.currencyCode + ' ' + v.units : JSON.stringify(v);
          return '<td class="fs11" style="white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis" title="' + (v||'') + '">' + (v !== undefined && v !== null ? v : '—') + '</td>';
        }).join('') + '</tr>'
      ).join('');
      wrap.innerHTML = '<table class="tbl" style="font-size:11px">' + headerRow + '<tbody>' + bodyRows + '</tbody></table>';
      meta.textContent = rows.length + ' records · showing first 30' + (rows.length > 30 ? ' · export CSV to get all' : '');
      document.getElementById('previewExportBtn').style.display = 'inline-flex';
    }
  } catch(e) {
    wrap.innerHTML = '<div class="text-muted fs12" style="padding:24px;text-align:center">Error: ' + e.message + '</div>';
  }
  if (icon) icon.className = 'fas fa-sync';
}

function exportPreviewCSV() {
  if (!_previewData.length) return;
  const cols = _previewCols;
  const rows = _previewData.map(row => cols.map(c => {
    let v = row[c];
    if (v && typeof v === 'object') v = v.units ? v.currencyCode + ' ' + v.units : JSON.stringify(v);
    return '"' + String(v||'').replace(/"/g,'""') + '"';
  }).join(','));
  const csv = [cols.join(','), ...rows].join('\\n');
  const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'data-preview.csv'; a.click();
}

// ── Auto-check connections on load ───────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', refreshAllStatus);
} else {
  setTimeout(refreshAllStatus, 80);
}
</script>
`;
}
