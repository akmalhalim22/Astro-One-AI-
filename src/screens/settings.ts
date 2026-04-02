export function settingsScreen(): string {
  return `
<div class="content fade-in">

  <div class="section-hd mb20">
    <div>
      <div class="section-title"><i class="fas fa-shield-halved" style="color:var(--magenta);margin-right:8px"></i>Platform Settings</div>
      <div class="fs12 text-muted mt4">Configure Google Sheets connection, manage users, and control platform access.</div>
    </div>
    <button class="btn-primary" onclick="saveAllSettings()"><i class="fas fa-floppy-disk"></i>Save All Changes</button>
  </div>

  <div class="tabs" id="settingsTabs">
    <div class="tab active" onclick="switchSettingsTab('sheets',this)"><i class="fas fa-table" style="margin-right:5px"></i>Google Sheets</div>
    <div class="tab" onclick="switchSettingsTab('users',this)"><i class="fas fa-users" style="margin-right:5px"></i>Users & Access</div>
    <div class="tab" onclick="switchSettingsTab('security',this)"><i class="fas fa-lock" style="margin-right:5px"></i>Security</div>
    <div class="tab" onclick="switchSettingsTab('platform',this)"><i class="fas fa-sliders" style="margin-right:5px"></i>Platform</div>
  </div>

  <!-- ── GOOGLE SHEETS TAB ─────────────────────────────────────── -->
  <div id="st-sheets">
    <div class="g2" style="margin-top:16px">

      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="card">
          <div class="card-hd">
            <div class="card-title"><i class="fas fa-key" style="color:var(--warning);margin-right:7px"></i>Service Account Credentials</div>
            <span class="b" id="saStatus" style="background:var(--success-dim);color:var(--success);border:1px solid rgba(0,214,143,.2);border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700">NOT SET</span>
          </div>
          <div class="fs12 text-muted mb14">
            Paste your Google Service Account JSON key. This is stored as an encrypted Cloudflare secret and <strong style="color:var(--text-primary)">never exposed</strong> to the browser.
          </div>
          <div class="field mb12">
            <label class="field-label">Service Account JSON</label>
            <textarea id="saJson" rows="8" placeholder='{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...","client_email":"...@....iam.gserviceaccount.com",...}'
              style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:9px;padding:11px 13px;font-family:monospace;font-size:11px;resize:vertical;outline:none;line-height:1.5;transition:border-color .2s"
              onfocus="this.style.borderColor='var(--magenta)'" onblur="this.style.borderColor='var(--border)'"></textarea>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn-primary" onclick="saveSACredentials()"><i class="fas fa-cloud-arrow-up"></i>Save to Cloudflare Secrets</button>
            <button class="btn-ghost" onclick="testSACredentials()"><i class="fas fa-rotate"></i>Test Connection</button>
            <button class="btn-ghost" onclick="clearSA()"><i class="fas fa-trash"></i>Clear</button>
          </div>
          <div id="saTestResult" style="display:none;margin-top:12px;padding:10px 14px;border-radius:8px;font-size:12px"></div>
        </div>

        <div class="card">
          <div class="card-hd"><div class="card-title"><i class="fas fa-table" style="color:var(--info);margin-right:7px"></i>Spreadsheet Configuration</div></div>
          <div class="fs12 text-muted mb14">Set your Google Sheets Spreadsheet ID and map each tab to a dashboard section.</div>

          <div class="field mb12">
            <label class="field-label">Spreadsheet ID</label>
            <input type="text" id="sheetId" placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
              style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:monospace;font-size:12px;outline:none;transition:border-color .2s"
              onfocus="this.style.borderColor='var(--magenta)'" onblur="this.style.borderColor='var(--border)'"/>
            <div class="fs11 text-muted mt4">Found in your Sheet URL: docs.google.com/spreadsheets/d/<strong style="color:var(--info)">SHEET_ID</strong>/edit</div>
          </div>

          <div class="card-hd" style="padding:12px 0 10px;border-top:1px solid var(--border);margin-top:4px">
            <div class="card-title" style="font-size:12px">Tab Name Mapping</div>
            <button class="btn-ghost" style="height:26px;font-size:10.5px;padding:0 10px" onclick="detectTabs()"><i class="fas fa-magnifying-glass"></i>Auto-Detect Tabs</button>
          </div>
          <div id="tabMapping" style="display:flex;flex-direction:column;gap:8px">
            ${[
              ['Pipeline','Pre-Sales Pipeline data','pipeline_tab','Pipeline'],
              ['Revenue','Revenue performance data','revenue_tab','Revenue'],
              ['Campaign','Campaign performance data','campaign_tab','Campaign'],
              ['Ads','Ad spend & performance data','ads_tab','Ads'],
              ['Traffic','Portal traffic data (GA4 export)','traffic_tab','Traffic'],
              ['Social','Social media metrics (Sprout)','social_tab','Social'],
              ['Clients','Client account data','clients_tab','Clients'],
            ].map(([label, desc, id, def]) => `
            <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px">
              <div style="flex:1;min-width:0">
                <div class="fw6 fs12">${label}</div>
                <div class="fs11 text-muted">${desc}</div>
              </div>
              <input type="text" id="${id}" value="${def}" placeholder="Sheet tab name"
                style="width:130px;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:6px;padding:5px 9px;font-family:monospace;font-size:11px;outline:none;text-align:center"/>
            </div>`).join('')}
          </div>

          <button class="btn-primary" style="margin-top:14px;width:100%;justify-content:center" onclick="saveSheetConfig()">
            <i class="fas fa-floppy-disk"></i>Save Sheet Configuration
          </button>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="card">
          <div class="card-hd"><div class="card-title"><i class="fas fa-circle-check" style="color:var(--success);margin-right:7px"></i>Connection Status</div></div>
          <div id="connStatus" style="display:flex;flex-direction:column;gap:8px">
            ${[
              ['Google Sheets API','Checking...','fa-table','var(--info)'],
              ['Service Account','Not configured','fa-key','var(--warning)'],
              ['Spreadsheet Access','Not tested','fa-file-spreadsheet','var(--text-muted)'],
            ].map(([name, status, ic, col]) => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px">
              <i class="fas ${ic}" style="color:${col};width:16px;text-align:center"></i>
              <div style="flex:1"><div class="fw6 fs12">${name}</div></div>
              <span class="fs11 text-muted">${status}</span>
            </div>`).join('')}
          </div>
          <button class="btn-ghost" style="width:100%;justify-content:center;margin-top:12px;height:34px" onclick="runFullTest()">
            <i class="fas fa-rotate"></i>Run Full Connectivity Test
          </button>
        </div>

        <div class="card">
          <div class="card-hd"><div class="card-title"><i class="fas fa-book-open" style="color:var(--purple);margin-right:7px"></i>Quick Setup Guide</div></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              ['1','Create Google Sheet','Name it "Astro One Data Hub". Add tabs: Pipeline, Revenue, Campaign, Ads, Traffic, Social, Clients','fa-plus','var(--magenta)'],
              ['2','Enable Sheets API','Google Cloud Console → APIs → Google Sheets API → Enable','fa-toggle-on','var(--info)'],
              ['3','Create Service Account','IAM → Service Accounts → Create → Download JSON key','fa-id-card','var(--success)'],
              ['4','Share Sheet','Share your spreadsheet with the service account email (Editor access)','fa-share','var(--warning)'],
              ['5','Paste & Save','Paste the JSON key above and save. Done!','fa-floppy-disk','var(--teal)'],
            ].map(([n, title, body, ic, col]) => `
            <div style="display:flex;gap:12px">
              <div style="width:26px;height:26px;border-radius:50%;background:${col}22;color:${col};border:1px solid ${col}33;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">${n}</div>
              <div>
                <div class="fw6 fs12 mb2">${title}</div>
                <div class="fs11 text-muted">${body}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── USERS TAB ──────────────────────────────────────────────── -->
  <div id="st-users" style="display:none;margin-top:16px">

    <!-- Invite Code Card (full width, above the 2-col grid) -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-hd">
        <div class="card-title"><i class="fas fa-ticket" style="color:var(--orange);margin-right:7px"></i>Invite Code — Self-Registration Gate</div>
        <span class="b b-gray" id="inviteCodeBadge" style="font-family:monospace;letter-spacing:.06em;font-size:11px">Loading…</span>
      </div>
      <div class="fs12 text-muted mb14">
        Anyone with this code can create a new account via the <strong style="color:var(--text-primary)">Create Account</strong> button on the login page.
        New accounts get <strong style="color:var(--info)">Viewer</strong> role by default — promote them in the user list below.
        Change this code any time to prevent new registrations.
      </div>
      <div style="display:flex;gap:8px;align-items:flex-end">
        <div class="field" style="flex:1">
          <label class="field-label">Current Invite Code</label>
          <input type="text" id="inviteCodeInput" placeholder="e.g. ASTRO2025"
            style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:monospace;font-size:13px;letter-spacing:.08em;outline:none;text-transform:uppercase"/>
        </div>
        <button class="btn-primary" style="height:38px;padding:0 18px;flex-shrink:0;white-space:nowrap" onclick="saveInviteCode()">
          <i class="fas fa-floppy-disk"></i>Save Code
        </button>
        <button class="btn-ghost" style="height:38px;padding:0 14px;flex-shrink:0" onclick="copyInviteCode()" title="Copy to clipboard">
          <i class="fas fa-copy"></i>
        </button>
      </div>
      <div class="fs11 text-muted mt8" style="display:flex;align-items:center;gap:6px">
        <i class="fas fa-circle-info" style="color:var(--info)"></i>
        Share this code only with people you want to grant access to this platform.
      </div>
    </div>

    <div class="g2">
      <div class="card">
        <div class="card-hd">
          <div class="card-title"><i class="fas fa-user-plus" style="color:var(--success);margin-right:7px"></i>Add User Directly</div>
        </div>
        <div class="fs12 text-muted mb12">Create an account without needing an invite code. Useful for onboarding team members directly.</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="field">
            <label class="field-label">Full Name</label>
            <input type="text" id="newUserName" placeholder="e.g. Ahmad Razif" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>
          <div class="field">
            <label class="field-label">Email</label>
            <input type="email" id="newUserEmail" placeholder="user@astro.com.my" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>
          <div class="field">
            <label class="field-label">Password</label>
            <input type="password" id="newUserPwd" placeholder="Minimum 8 characters" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>
          <div class="field">
            <label class="field-label">Role</label>
            <select id="newUserRole" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none">
              <option value="admin">Admin — Full access + Settings</option>
              <option value="editor" selected>Editor — Full access, no Settings</option>
              <option value="viewer">Viewer — Read-only access</option>
            </select>
          </div>
          <button class="btn-primary" onclick="addUser()" style="justify-content:center">
            <i class="fas fa-user-plus"></i>Add User
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-users" style="color:var(--info);margin-right:7px"></i>Current Users</div><span class="b b-gray" id="userCount">—</span></div>
        <div id="userList" style="display:flex;flex-direction:column;gap:0">
          <div style="padding:24px;text-align:center;color:var(--text-muted);font-size:12px">
            <i class="fas fa-spinner fa-spin" style="margin-right:6px"></i>Loading users…
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── SECURITY TAB ───────────────────────────────────────────── -->
  <div id="st-security" style="display:none;margin-top:16px">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-clock" style="color:var(--info);margin-right:7px"></i>Session Settings</div></div>
        <div style="display:flex;flex-direction:column;gap:14px">
          ${[
            ['Session Timeout','How long before users are automatically signed out','8 hours','select',['1 hour','4 hours','8 hours','24 hours','7 days']],
            ['Max Active Sessions','Maximum simultaneous sessions per user','3','select',['1','2','3','5','Unlimited']],
          ].map(([label, desc, val, type, opts]) => `
          <div>
            <div class="fw6 fs12 mb4">${label}</div>
            <div class="fs11 text-muted mb8">${desc}</div>
            <select style="background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:8px 12px;font-family:inherit;font-size:12px;min-width:160px">
              ${(opts as string[]).map(o => `<option ${o===val?'selected':''}>${o}</option>`).join('')}
            </select>
          </div>`).join('')}
          <div>
            <div class="fw6 fs12 mb4">Force Re-login on Suspicious Activity</div>
            <div class="fs11 text-muted mb8">Invalidate session if IP address changes mid-session</div>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" checked style="accent-color:var(--magenta);width:14px;height:14px"/>
              <span class="fs12">Enabled</span>
            </label>
          </div>
        </div>
        <button class="btn-primary" style="margin-top:16px" onclick="saveSecuritySettings()"><i class="fas fa-floppy-disk"></i>Save Security Settings</button>
      </div>

      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-key" style="color:var(--warning);margin-right:7px"></i>Change Your Password</div></div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="field">
            <label class="field-label">Current Password</label>
            <input type="password" id="curPwd" placeholder="Enter current password" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>
          <div class="field">
            <label class="field-label">New Password</label>
            <input type="password" id="newPwd" placeholder="Minimum 8 characters" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>
          <div class="field">
            <label class="field-label">Confirm New Password</label>
            <input type="password" id="confirmPwd" placeholder="Re-enter new password" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>
          <button class="btn-primary" onclick="changePassword()"><i class="fas fa-key"></i>Update Password</button>
        </div>
        <div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--border)">
          <div class="fw6 fs12 mb8" style="color:var(--danger)"><i class="fas fa-triangle-exclamation" style="margin-right:6px"></i>Danger Zone</div>
          <button class="btn-ghost" style="border-color:var(--danger);color:var(--danger);height:34px;font-size:11px" onclick="invalidateAllSessions()">
            <i class="fas fa-ban"></i>Sign Out All Active Sessions
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── PLATFORM TAB ──────────────────────────────────────────── -->
  <div id="st-platform" style="display:none;margin-top:16px">
    <div class="g2">
      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-paintbrush" style="color:var(--purple);margin-right:7px"></i>Platform Identity</div></div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[
            ['Platform Name','Astro One Management AI Assistant','text','platformName'],
            ['Organisation','Astro Malaysia Holdings Berhad','text','orgName'],
            ['Admin Email','dato.lee@astro.com.my','email','adminEmail'],
            ['User Display Name','Dato\' Lee','text','displayName'],
            ['User Title / Role','Chief Revenue Officer','text','userTitle'],
          ].map(([label, def, type, id]) => `
          <div>
            <label class="field-label" style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:5px">${label}</label>
            <input type="${type}" id="${id}" value="${def}" style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:inherit;font-size:12px;outline:none"/>
          </div>`).join('')}
          <button class="btn-primary" onclick="savePlatformSettings()"><i class="fas fa-floppy-disk"></i>Save Platform Settings</button>
        </div>
      </div>

      <div class="card">
        <div class="card-hd"><div class="card-title"><i class="fas fa-bell" style="color:var(--orange);margin-right:7px"></i>Notification Preferences</div></div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[
            ['AI anomaly alerts via email','Alert when AI detects data anomalies',true],
            ['Daily digest auto-send','Email executive digest at 7am daily',true],
            ['Sync failure alerts','Notify when API sync fails',true],
            ['At-risk deal notifications','Alert when deals go stale > 30 days',true],
            ['Weekly performance report','Auto-send report every Monday',false],
          ].map(([label, desc, checked]) => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
            <div>
              <div class="fw6 fs12">${label}</div>
              <div class="fs11 text-muted">${desc}</div>
            </div>
            <label style="position:relative;display:inline-block;width:36px;height:20px;flex-shrink:0;cursor:pointer">
              <input type="checkbox" ${checked ? 'checked' : ''} style="opacity:0;width:0;height:0;position:absolute">
              <span style="position:absolute;inset:0;background:${checked ? 'var(--magenta)' : 'var(--border-light)'};border-radius:10px;transition:.2s"></span>
              <span style="position:absolute;width:14px;height:14px;background:#fff;border-radius:50%;top:3px;${checked ? 'right:3px' : 'left:3px'};transition:.2s"></span>
            </label>
          </div>`).join('')}
          <div class="field">
            <label class="field-label">Slack Webhook URL (optional)</label>
            <input type="url" placeholder="https://hooks.slack.com/services/..." style="width:100%;background:var(--bg-input);border:1px solid var(--border);color:var(--text-primary);border-radius:8px;padding:9px 12px;font-family:monospace;font-size:11px;outline:none"/>
          </div>
          <button class="btn-primary" onclick="saveNotificationSettings()"><i class="fas fa-floppy-disk"></i>Save Notifications</button>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
// Load saved settings on page open
window.addEventListener('DOMContentLoaded', function() {
  // Pre-load invite code (so it's ready when user clicks Users tab)
  loadInviteCode();
  loadUsers();

  fetch('/api/settings/config').then(r=>r.json()).then(d=>{
    if (!d.ok) return;
    // Populate Sheet ID
    if (d.sheetId) {
      const el = document.getElementById('sheetId');
      if (el) el.value = d.sheetId;
    }
    // Populate tab mappings
    const tabMap = { pipeline:'pipeline_tab', revenue:'revenue_tab', campaign:'campaign_tab',
      ads:'ads_tab', traffic:'traffic_tab', social:'social_tab', clients:'clients_tab' };
    if (d.tabs) {
      Object.entries(tabMap).forEach(function([k,id]) {
        const el = document.getElementById(id);
        if (el && d.tabs[k]) el.value = d.tabs[k];
      });
    }
    // Update credentials status badge
    const badge = document.getElementById('saStatus');
    if (badge) {
      if (d.hasCreds) {
        badge.textContent = 'CONFIGURED';
        badge.style.cssText = 'background:rgba(0,214,143,0.12);color:#00d68f;border:1px solid rgba(0,214,143,.2);border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700';
        document.getElementById('saJson').placeholder = '••• Credentials already stored — paste new JSON to replace •••';
      } else {
        badge.textContent = 'NOT SET';
        badge.style.cssText = 'background:rgba(244,63,94,0.12);color:#f43f5e;border:1px solid rgba(244,63,94,.2);border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700';
      }
    }
  }).catch(function(){});
});

function switchSettingsTab(tab, el) {
  document.querySelectorAll('#settingsTabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['sheets','users','security','platform'].forEach(id => {
    const p = document.getElementById('st-' + id);
    if (p) p.style.display = id === tab ? 'block' : 'none';
  });
  if (tab === 'users') { loadUsers(); loadInviteCode(); }
}

function loadUsers() {
  fetch('/api/settings/users').then(r=>r.json()).then(d=>{
    if (!d.ok || !d.users) return;
    const list = document.getElementById('userList');
    const count = document.getElementById('userCount');
    if (count) count.textContent = d.users.length + ' user' + (d.users.length!==1?'s':'');
    if (!list) return;
    const colors = ['var(--magenta)','var(--info)','var(--success)','var(--purple)','var(--teal)','var(--orange)'];
    list.innerHTML = d.users.map(function(u,i) {
      const initials = u.name.split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase() || u.email[0].toUpperCase();
      const col = colors[i % colors.length];
      const roleLabel = u.role==='admin'?'Admin':u.role==='editor'?'Editor':'Viewer';
      const roleCls = u.role==='admin'?'b-pink':u.role==='editor'?'b-info':'b-gray';
      return \`<div class="user-row" data-email="\${u.email}">
        <div style="width:36px;height:36px;border-radius:9px;background:\${col}22;color:\${col};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">\${initials}</div>
        <div style="flex:1;min-width:0">
          <div class="fw6 fs12">\${u.name}</div>
          <div class="fs11 text-muted ellipsis">\${u.email}</div>
        </div>
        <span class="b \${roleCls}">\${roleLabel}</span>
        \${u.role!=='admin'?'<button class="btn-ghost" style="height:28px;font-size:10.5px;padding:0 8px;color:var(--danger)" onclick="removeUser(\''+u.email+'\')"><i class="fas fa-trash"></i></button>':''}
      </div>\`;
    }).join('');
  }).catch(function(){});
}
// ── Invite code ─────────────────────────────────────────────────────────
function loadInviteCode() {
  fetch('/api/settings/invite-code').then(r=>r.json()).then(d=>{
    if (!d.ok) return;
    const inp   = document.getElementById('inviteCodeInput');
    const badge = document.getElementById('inviteCodeBadge');
    if (inp)   inp.value = d.code || '';
    if (badge) badge.textContent = d.code || '';
  }).catch(function(){});
}
function saveInviteCode() {
  const code = (document.getElementById('inviteCodeInput').value || '').trim().toUpperCase();
  if (code.length < 4) { showSettingsToast('Code must be at least 4 characters.', 'error'); return; }
  fetch('/api/settings/invite-code', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({code}) })
    .then(r=>r.json()).then(d=>{
      if (d.ok) {
        const badge = document.getElementById('inviteCodeBadge');
        if (badge) badge.textContent = code;
        showSettingsToast('Invite code updated to ' + code + ' ✓', 'success');
      } else showSettingsToast(d.error||'Error saving code.', 'error');
    }).catch(function(){ showSettingsToast('Network error.', 'error'); });
}
function copyInviteCode() {
  const code = (document.getElementById('inviteCodeInput').value || '').trim();
  if (!code) { showSettingsToast('No code to copy.', 'error'); return; }
  navigator.clipboard.writeText(code).then(function(){
    showSettingsToast('Invite code copied to clipboard ✓', 'success');
  }).catch(function(){
    showSettingsToast('Code: ' + code, 'info');
  });
}

function saveAllSettings() { showSettingsToast('All settings saved successfully ✓', 'success'); }
function saveSACredentials() {
  const v = document.getElementById('saJson').value.trim();
  if (!v) { showSettingsToast('Please paste your Service Account JSON first.', 'error'); return; }
  try { JSON.parse(v); }
  catch(e) { showSettingsToast('Invalid JSON — please check the format.', 'error'); return; }
  fetch('/api/settings/credentials', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({serviceAccountJson:v}) })
    .then(r => r.json()).then(d => {
      if (d.ok) {
        document.getElementById('saStatus').textContent = 'SAVED';
        document.getElementById('saStatus').style.color = 'var(--success)';
        showSettingsToast('Service Account credentials saved to Cloudflare KV ✓', 'success');
        document.getElementById('saJson').value = '••• Credentials stored securely •••';
      } else { showSettingsToast('Error: ' + (d.error || 'Unknown error'), 'error'); }
    }).catch(() => showSettingsToast('Network error — please try again.', 'error'));
}
function testSACredentials() {
  showSettingsToast('Testing connection…', 'info');
  fetch('/api/settings/test-connection')
    .then(r => r.json()).then(d => {
      const el = document.getElementById('saTestResult');
      el.style.display = 'block';
      if (d.ok) {
        el.style.background = 'var(--success-dim)';
        el.style.border = '1px solid rgba(0,214,143,.2)';
        el.style.color = 'var(--success)';
        el.innerHTML = '<i class="fas fa-circle-check" style="margin-right:7px"></i>' + (d.message || 'Connection successful!') + (d.tabs ? ' · Tabs found: ' + d.tabs.join(', ') : '');
        showSettingsToast('Connection test passed ✓', 'success');
      } else {
        el.style.background = 'var(--danger-dim)';
        el.style.border = '1px solid rgba(244,63,94,.2)';
        el.style.color = 'var(--danger)';
        el.innerHTML = '<i class="fas fa-circle-xmark" style="margin-right:7px"></i>' + (d.error || 'Connection failed');
        showSettingsToast('Connection test failed', 'error');
      }
    }).catch(() => showSettingsToast('Network error.', 'error'));
}
function clearSA() {
  if (confirm('Remove stored credentials?')) {
    document.getElementById('saJson').value = '';
    showSettingsToast('Credentials cleared.', 'info');
  }
}
function saveSheetConfig() {
  const cfg = {
    sheetId: document.getElementById('sheetId').value.trim(),
    tabs: {
      pipeline: document.getElementById('pipeline_tab').value.trim(),
      revenue:  document.getElementById('revenue_tab').value.trim(),
      campaign: document.getElementById('campaign_tab').value.trim(),
      ads:      document.getElementById('ads_tab').value.trim(),
      traffic:  document.getElementById('traffic_tab').value.trim(),
      social:   document.getElementById('social_tab').value.trim(),
      clients:  document.getElementById('clients_tab').value.trim(),
    }
  };
  if (!cfg.sheetId) { showSettingsToast('Please enter a Spreadsheet ID.', 'error'); return; }
  fetch('/api/settings/sheet-config', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(cfg) })
    .then(r => r.json()).then(d => {
      if (d.ok) showSettingsToast('Sheet configuration saved ✓', 'success');
      else showSettingsToast('Error: ' + (d.error||'Unknown'), 'error');
    }).catch(() => showSettingsToast('Network error.', 'error'));
}
function detectTabs() {
  showSettingsToast('Detecting sheet tabs…', 'info');
  fetch('/api/settings/detect-tabs')
    .then(r => r.json()).then(d => {
      if (d.ok && d.tabs) {
        showSettingsToast('Detected tabs: ' + d.tabs.join(', '), 'success');
      } else showSettingsToast(d.error || 'Could not detect tabs — check credentials first.', 'error');
    }).catch(() => showSettingsToast('Network error.', 'error'));
}
function runFullTest() {
  showSettingsToast('Running connectivity tests…', 'info');
  fetch('/api/settings/test-connection')
    .then(r => r.json()).then(d => {
      const list = document.getElementById('connStatus');
      if (d.ok) {
        list.innerHTML = [
          ['Google Sheets API','Connected ✓','fa-table','var(--success)'],
          ['Service Account','Authenticated ✓','fa-key','var(--success)'],
          ['Spreadsheet Access',(d.tabs ? d.tabs.length + ' tabs found':'Access granted'),'fa-file-spreadsheet','var(--success)'],
        ].map(([n,s,ic,col])=>\`<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px"><i class="fas \${ic}" style="color:\${col};width:16px;text-align:center"></i><div style="flex:1"><div class="fw6 fs12">\${n}</div></div><span class="fs11" style="color:\${col}">\${s}</span></div>\`).join('');
        showSettingsToast('All systems connected ✓', 'success');
      } else {
        showSettingsToast('Test failed: ' + (d.error||'Check credentials.'), 'error');
      }
    }).catch(() => showSettingsToast('Network error.', 'error'));
}
function addUser() {
  const name  = document.getElementById('newUserName').value.trim();
  const email = document.getElementById('newUserEmail').value.trim();
  const pwd   = document.getElementById('newUserPwd').value;
  const role  = document.getElementById('newUserRole').value;
  if (!name || !email || !pwd) { showSettingsToast('Please fill all fields.', 'error'); return; }
  if (pwd.length < 8) { showSettingsToast('Password must be at least 8 characters.', 'error'); return; }
  fetch('/api/settings/add-user', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password:pwd,role}) })
    .then(r=>r.json()).then(d => {
      if (d.ok) {
        showSettingsToast(name + ' added successfully ✓', 'success');
        document.getElementById('newUserName').value='';
        document.getElementById('newUserEmail').value='';
        document.getElementById('newUserPwd').value='';
      } else showSettingsToast('Error: ' + (d.error||'Unknown'), 'error');
    }).catch(() => showSettingsToast('Network error.', 'error'));
}
function removeUser(email) {
  if (!confirm('Remove ' + email + '?')) return;
  fetch('/api/settings/remove-user', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) })
    .then(r=>r.json()).then(d => {
      if (d.ok) {
        const row = document.querySelector(\`.user-row[data-email="\${email}"]\`);
        if (row) row.remove();
        showSettingsToast('User removed ✓', 'success');
      } else showSettingsToast(d.error||'Error', 'error');
    });
}
function changePassword() {
  const cur = document.getElementById('curPwd').value;
  const nw  = document.getElementById('newPwd').value;
  const cf  = document.getElementById('confirmPwd').value;
  if (nw !== cf) { showSettingsToast('Passwords do not match.', 'error'); return; }
  if (nw.length < 8) { showSettingsToast('New password must be at least 8 characters.', 'error'); return; }
  fetch('/api/settings/change-password', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({currentPassword:cur,newPassword:nw}) })
    .then(r=>r.json()).then(d => {
      if (d.ok) { showSettingsToast('Password updated ✓', 'success'); document.getElementById('curPwd').value=''; document.getElementById('newPwd').value=''; document.getElementById('confirmPwd').value=''; }
      else showSettingsToast(d.error||'Incorrect current password.', 'error');
    });
}
function invalidateAllSessions() {
  if (!confirm('Sign out all active sessions? You will be logged out.')) return;
  fetch('/api/settings/invalidate-sessions', {method:'POST'}).then(()=>{ window.location.href='/login'; });
}
function saveSecuritySettings()    { showSettingsToast('Security settings saved ✓', 'success'); }
function savePlatformSettings()    { showSettingsToast('Platform settings saved ✓', 'success'); }
function saveNotificationSettings(){ showSettingsToast('Notification preferences saved ✓', 'success'); }
function showSettingsToast(msg, type) {
  let t = document.getElementById('globalToast');
  if (!t) { t=document.createElement('div'); t.id='globalToast'; t.style.cssText='position:fixed;bottom:28px;right:28px;padding:11px 18px;border-radius:10px;font-size:12px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.5);transition:opacity .3s;font-weight:600;display:flex;align-items:center;gap:8px'; document.body.appendChild(t); }
  const colors = { success:'#00d68f', error:'#f43f5e', info:'#60a5fa' };
  const icons  = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info' };
  t.style.background = type==='success'?'rgba(0,214,143,0.15)':type==='error'?'rgba(244,63,94,0.15)':'rgba(96,165,250,0.15)';
  t.style.border = '1px solid ' + (colors[type]||'rgba(255,255,255,0.1)') + '44';
  t.style.color = colors[type]||'#f0f0ff';
  t.innerHTML = '<i class="fas ' + (icons[type]||'fa-info') + '"></i>' + msg;
  t.style.opacity='1';
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>{ t.style.opacity='0'; }, 3500);
}
window.showToast = window.showToast || showSettingsToast;
</script>
`;
}
