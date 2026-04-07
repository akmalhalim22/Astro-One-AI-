// ─── Auth helpers (runs in Cloudflare Workers edge runtime) ────────────────
// Sessions stored in KV with 8-hour TTL.
// Passwords are bcrypt-free (Web Crypto PBKDF2) to stay within Workers env.

export const LOGIN_COOKIE = 'astro_session'
export const SESSION_TTL  = 60 * 60 * 8   // 8 hours in seconds

// ── Shared CSS for auth pages ─────────────────────────────────────────────
const BASE_CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;background:#060610;color:#f0f0ff;font-family:'Inter',-apple-system,sans-serif;font-size:14px;-webkit-font-smoothing:antialiased}
  .auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(226,0,122,0.10) 0%,transparent 65%)}
  .auth-card{background:#0f0f1f;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:40px 38px;width:100%;max-width:420px;box-shadow:0 24px 80px rgba(0,0,0,0.6)}
  .auth-logo{display:flex;flex-direction:column;align-items:center;margin-bottom:28px;gap:10px}
  .auth-logo-mark{width:50px;height:50px;background:linear-gradient(135deg,#e2007a 0%,#ff4db8 100%);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:#fff;letter-spacing:-1px;box-shadow:0 0 32px rgba(226,0,122,0.35)}
  .auth-logo-name{font-size:20px;font-weight:800;letter-spacing:-0.5px}
  .auth-logo-sub{font-size:11px;color:#48486a;font-weight:500;letter-spacing:0.5px;text-align:center;line-height:1.6}
  .auth-title{font-size:16px;font-weight:700;margin-bottom:4px;letter-spacing:-0.2px}
  .auth-subtitle{font-size:12px;color:#8080a8;margin-bottom:22px}
  .auth-form{display:flex;flex-direction:column;gap:14px}
  .field{display:flex;flex-direction:column;gap:5px}
  .field label{font-size:11.5px;font-weight:600;color:#8080a8;letter-spacing:0.3px}
  .field input,.field select{background:#09091a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 14px;color:#f0f0ff;font-family:inherit;font-size:13px;outline:none;transition:border-color .2s;width:100%}
  .field input:focus{border-color:#e2007a}
  .field input::placeholder{color:#48486a}
  .field .hint{font-size:11px;color:#48486a;margin-top:3px}
  .btn-primary{width:100%;padding:13px;background:linear-gradient(135deg,#e2007a 0%,#ff4db8 100%);border:none;border-radius:10px;color:#fff;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px;transition:opacity .2s;letter-spacing:0.2px;display:flex;align-items:center;justify-content:center;gap:8px}
  .btn-primary:hover{opacity:0.9}
  .btn-primary:active{opacity:0.8}
  .btn-secondary{width:100%;padding:11px;background:transparent;border:1px solid rgba(255,255,255,0.10);border-radius:10px;color:#8080a8;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px}
  .btn-secondary:hover{border-color:rgba(226,0,122,0.4);color:#f0f0ff;background:rgba(226,0,122,0.06)}
  .msg-err{background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.25);border-radius:9px;padding:10px 14px;font-size:12px;color:#f43f5e;display:flex;align-items:center;gap:8px}
  .msg-ok{background:rgba(0,214,143,0.10);border:1px solid rgba(0,214,143,0.22);border-radius:9px;padding:10px 14px;font-size:12px;color:#00d68f;display:flex;align-items:center;gap:8px}
  .divider{height:1px;background:rgba(255,255,255,0.06);margin:4px 0}
  .divider-text{display:flex;align-items:center;gap:10px;margin:6px 0;font-size:11px;color:#48486a}
  .divider-text::before,.divider-text::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.06)}
  .auth-footer{text-align:center;margin-top:18px;font-size:11px;color:#48486a;line-height:1.8}
  .pass-wrap{position:relative}
  .pass-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#48486a;cursor:pointer;padding:4px;font-size:13px}
  .pass-toggle:hover{color:#8080a8}
  .secure-badge{display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px;color:#48486a;margin-top:14px}
  .strength-bar{height:3px;border-radius:2px;background:rgba(255,255,255,0.06);margin-top:6px;overflow:hidden}
  .strength-fill{height:100%;border-radius:2px;transition:width .3s,background .3s;width:0}
  .row-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
`

const AUTH_HEAD = (title: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png"/>
  <link rel="apple-touch-icon" href="/static/apple-touch-icon.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet"/>
  <style>${BASE_CSS}</style>
</head>
<body>`

// ── Derive a key from a password string using PBKDF2 ──────────────────────
async function pbkdf2Hash(password: string, salt: string): Promise<string> {
  const enc  = new TextEncoder()
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(salt), iterations: 100_000 },
    base, 256
  )
  return btoa(String.fromCharCode(...new Uint8Array(bits)))
}

// ── Verify password against stored hash ──────────────────────────────────
export async function verifyPassword(input: string, storedHash: string, salt: string): Promise<boolean> {
  const hash = await pbkdf2Hash(input, salt)
  return hash === storedHash
}

// ── Hash a new password ───────────────────────────────────────────────────
export async function hashPassword(password: string, salt: string): Promise<string> {
  return pbkdf2Hash(password, salt)
}

// ── Generate a secure random session token ───────────────────────────────
export function generateToken(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return btoa(String.fromCharCode(...arr)).replace(/[+/=]/g, c => ({ '+': '-', '/': '_', '=': '' }[c] || c))
}

// ── Generate a random salt ────────────────────────────────────────────────
export function generateSalt(): string {
  return generateToken().slice(0, 20)
}

// ── Build a Set-Cookie header ─────────────────────────────────────────────
export function sessionCookie(token: string, clear = false, secure = true): string {
  const secureFlag = secure ? '; Secure' : ''
  if (clear) return `${LOGIN_COOKIE}=; Path=/; HttpOnly${secureFlag}; SameSite=Lax; Max-Age=0`
  return `${LOGIN_COOKIE}=${token}; Path=/; HttpOnly${secureFlag}; SameSite=Lax; Max-Age=${SESSION_TTL}`
}

// ── Parse Cookie header → token ───────────────────────────────────────────
export function getSessionToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim()
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const k = trimmed.slice(0, eqIdx).trim()
    const v = trimmed.slice(eqIdx + 1).trim()
    if (k === LOGIN_COOKIE && v) return v
  }
  return null
}

// ═══════════════════════════════════════════════════════════════════════════
//   LOGIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
export function loginPage(error = ''): string {
  return `${AUTH_HEAD('Astro One — Sign In')}
<div class="auth-wrap">
  <div class="auth-card">
    <div class="auth-logo">
      <img src="/static/astro-one-logo-transparent.png" alt="Astro One" style="width:220px;height:auto;display:block;margin:0 auto 4px"/>
      <div class="auth-logo-sub">Management AI Assistant · Digital Performance Hub</div>
    </div>

    <div class="auth-title">Welcome back</div>
    <div class="auth-subtitle">Sign in to your account to continue</div>

    ${error ? `<div class="msg-err" style="margin-bottom:14px"><i class="fas fa-circle-exclamation"></i>${error}</div>` : ''}

    <form class="auth-form" method="POST" action="/login">
      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" placeholder="you@astro.com.my" required autocomplete="email"/>
      </div>
      <div class="field">
        <label>Password</label>
        <div class="pass-wrap">
          <input type="password" name="password" id="pwdInput" placeholder="Enter your password" required autocomplete="current-password"/>
          <button type="button" class="pass-toggle" onclick="togglePwd('pwdInput','eyeIcon')">
            <i class="fas fa-eye" id="eyeIcon"></i>
          </button>
        </div>
      </div>
      <div class="divider"></div>
      <button type="submit" class="btn-primary">
        <i class="fas fa-right-to-bracket"></i>Sign In
      </button>
    </form>

    <div class="divider-text">or</div>

    <a href="/register" style="text-decoration:none">
      <button type="button" class="btn-secondary">
        <i class="fas fa-user-plus"></i>Create an Account
      </button>
    </a>

    <div class="secure-badge">
      <i class="fas fa-lock"></i>
      Secured · Sessions expire in 8 hours · Cloudflare Edge
    </div>

    <div class="auth-footer">
      Astro One Management AI &nbsp;·&nbsp; Internal Platform<br>
      Authorised personnel only
    </div>
  </div>
</div>
<script>
function togglePwd(id, iconId) {
  const i = document.getElementById(id)
  const e = document.getElementById(iconId)
  if (i.type === 'password') { i.type = 'text'; e.className = 'fas fa-eye-slash' }
  else { i.type = 'password'; e.className = 'fas fa-eye' }
}
</script>
</body></html>`
}

// ═══════════════════════════════════════════════════════════════════════════
//   REGISTER PAGE
// ═══════════════════════════════════════════════════════════════════════════
export function registerPage(error = '', success = '', prefill: Record<string,string> = {}): string {
  return `${AUTH_HEAD('Astro One — Create Account')}
<div class="auth-wrap">
  <div class="auth-card">
    <div class="auth-logo">
      <img src="/static/astro-one-logo-transparent.png" alt="Astro One" style="width:220px;height:auto;display:block;margin:0 auto 4px"/>
      <div class="auth-logo-sub">Management AI Assistant · Digital Performance Hub</div>
    </div>

    <div class="auth-title">Create your account</div>
    <div class="auth-subtitle">You need an invite code to register. Contact your administrator.</div>

    ${error   ? `<div class="msg-err" style="margin-bottom:14px"><i class="fas fa-circle-exclamation"></i>${error}</div>`   : ''}
    ${success ? `<div class="msg-ok"  style="margin-bottom:14px"><i class="fas fa-circle-check"></i>${success}</div>` : ''}

    ${!success ? `
    <form class="auth-form" method="POST" action="/register">

      <div class="row-2">
        <div class="field">
          <label>First name</label>
          <input type="text" name="firstName" placeholder="e.g. Ahmad" required value="${prefill.firstName||''}" autocomplete="given-name"/>
        </div>
        <div class="field">
          <label>Last name</label>
          <input type="text" name="lastName" placeholder="e.g. Razif" required value="${prefill.lastName||''}" autocomplete="family-name"/>
        </div>
      </div>

      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" placeholder="you@astro.com.my" required value="${prefill.email||''}" autocomplete="email"/>
      </div>

      <div class="field">
        <label>Password</label>
        <div class="pass-wrap">
          <input type="password" name="password" id="regPwd" placeholder="Minimum 8 characters" required autocomplete="new-password"
            oninput="checkStrength(this.value)"/>
          <button type="button" class="pass-toggle" onclick="togglePwd('regPwd','regEye')">
            <i class="fas fa-eye" id="regEye"></i>
          </button>
        </div>
        <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
        <div class="hint" id="strengthLabel">Password strength</div>
      </div>

      <div class="field">
        <label>Confirm password</label>
        <div class="pass-wrap">
          <input type="password" name="confirmPassword" id="regPwd2" placeholder="Re-enter your password" required autocomplete="new-password"/>
          <button type="button" class="pass-toggle" onclick="togglePwd('regPwd2','regEye2')">
            <i class="fas fa-eye" id="regEye2"></i>
          </button>
        </div>
      </div>

      <div class="field">
        <label>Invite code</label>
        <input type="text" name="inviteCode" placeholder="Enter the invite code given by your admin" required
          style="letter-spacing:0.08em" autocomplete="off"/>
        <div class="hint"><i class="fas fa-info-circle" style="margin-right:4px"></i>Ask your platform administrator for the invite code</div>
      </div>

      <div class="divider"></div>
      <button type="submit" class="btn-primary">
        <i class="fas fa-user-plus"></i>Create Account
      </button>
    </form>
    ` : `
    <div style="text-align:center;padding:10px 0 4px">
      <a href="/login" style="text-decoration:none">
        <button type="button" class="btn-primary">
          <i class="fas fa-right-to-bracket"></i>Go to Sign In
        </button>
      </a>
    </div>
    `}

    <div class="divider-text" style="margin-top:${success?'18px':'14px'}">already have an account?</div>
    <a href="/login" style="text-decoration:none">
      <button type="button" class="btn-secondary">
        <i class="fas fa-right-to-bracket"></i>Sign In Instead
      </button>
    </a>

    <div class="auth-footer" style="margin-top:16px">
      Astro One Management AI &nbsp;·&nbsp; Internal Platform<br>
      Authorised personnel only
    </div>
  </div>
</div>
<script>
function togglePwd(id, iconId) {
  const i = document.getElementById(id)
  const e = document.getElementById(iconId)
  if (i.type === 'password') { i.type = 'text'; e.className = 'fas fa-eye-slash' }
  else { i.type = 'password'; e.className = 'fas fa-eye' }
}
function checkStrength(pw) {
  const fill  = document.getElementById('strengthFill')
  const label = document.getElementById('strengthLabel')
  if (!fill || !label) return
  let score = 0
  if (pw.length >= 8)  score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const levels = [
    { w:'0%',   bg:'transparent',  t:'Password strength' },
    { w:'25%',  bg:'#f43f5e',      t:'Weak' },
    { w:'50%',  bg:'#fb923c',      t:'Fair' },
    { w:'75%',  bg:'#facc15',      t:'Good' },
    { w:'100%', bg:'#00d68f',      t:'Strong ✓' },
  ]
  const l = levels[Math.min(score, 4)]
  fill.style.width      = l.w
  fill.style.background = l.bg
  label.textContent     = l.t
  label.style.color     = l.bg === 'transparent' ? '#48486a' : l.bg
}
</script>
</body></html>`
}
