// ─── Auth helpers (runs in Cloudflare Workers edge runtime) ────────────────
// Sessions stored in KV with 8-hour TTL.
// Passwords are bcrypt-free (Web Crypto PBKDF2) to stay within Workers env.

export const LOGIN_COOKIE = 'astro_session'
export const SESSION_TTL  = 60 * 60 * 8   // 8 hours in seconds

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

// ── Generate a secure random session token ───────────────────────────────
export function generateToken(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return btoa(String.fromCharCode(...arr)).replace(/[+/=]/g, c => ({ '+': '-', '/': '_', '=': '' }[c] || c))
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
    const v = trimmed.slice(eqIdx + 1).trim()  // everything after first '='
    if (k === LOGIN_COOKIE && v) return v
  }
  return null
}

// ── Login page HTML ───────────────────────────────────────────────────────
export function loginPage(error = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Astro One — Sign In</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet"/>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%;background:#060610;color:#f0f0ff;font-family:'Inter',-apple-system,sans-serif;font-size:14px;-webkit-font-smoothing:antialiased}
    .login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(226,0,122,0.10) 0%,transparent 65%)}
    .login-card{background:#0f0f1f;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:44px 40px;width:100%;max-width:400px;box-shadow:0 24px 80px rgba(0,0,0,0.6)}
    .login-logo{display:flex;flex-direction:column;align-items:center;margin-bottom:32px;gap:10px}
    .login-logo-mark{width:52px;height:52px;background:linear-gradient(135deg,#e2007a 0%,#ff4db8 100%);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;letter-spacing:-1px;box-shadow:0 0 32px rgba(226,0,122,0.35)}
    .login-logo-name{font-size:20px;font-weight:800;letter-spacing:-0.5px}
    .login-logo-sub{font-size:11.5px;color:#48486a;font-weight:500;letter-spacing:0.5px;text-align:center}
    .login-form{display:flex;flex-direction:column;gap:16px}
    .field{display:flex;flex-direction:column;gap:6px}
    .field label{font-size:12px;font-weight:600;color:#8080a8;letter-spacing:0.3px}
    .field input{background:#09091a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;color:#f0f0ff;font-family:inherit;font-size:13px;outline:none;transition:border-color .2s}
    .field input:focus{border-color:#e2007a}
    .field input::placeholder{color:#48486a}
    .btn-login{width:100%;padding:13px;background:linear-gradient(135deg,#e2007a 0%,#ff4db8 100%);border:none;border-radius:10px;color:#fff;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px;transition:opacity .2s;letter-spacing:0.2px}
    .btn-login:hover{opacity:0.9}
    .btn-login:active{opacity:0.8}
    .err{background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.25);border-radius:9px;padding:10px 14px;font-size:12px;color:#f43f5e;display:flex;align-items:center;gap:8px}
    .login-footer{text-align:center;margin-top:22px;font-size:11px;color:#48486a;line-height:1.8}
    .pass-wrap{position:relative}
    .pass-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#48486a;cursor:pointer;padding:4px;font-size:13px}
    .pass-toggle:hover{color:#8080a8}
    .divider{height:1px;background:rgba(255,255,255,0.06);margin:4px 0}
    .secure-badge{display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px;color:#48486a;margin-top:16px}
  </style>
</head>
<body>
<div class="login-wrap">
  <div class="login-card">
    <div class="login-logo">
      <div class="login-logo-mark">A1</div>
      <div class="login-logo-name">Astro One</div>
      <div class="login-logo-sub">Management AI Assistant · Digital Performance Hub</div>
    </div>

    ${error ? `<div class="err"><i class="fas fa-circle-exclamation"></i>${error}</div>` : ''}

    <form class="login-form" method="POST" action="/login">
      <div class="field">
        <label>Email address</label>
        <input type="email" name="email" placeholder="you@astro.com.my" required autocomplete="email"/>
      </div>
      <div class="field">
        <label>Password</label>
        <div class="pass-wrap">
          <input type="password" name="password" id="pwdInput" placeholder="Enter your password" required autocomplete="current-password"/>
          <button type="button" class="pass-toggle" onclick="togglePwd()">
            <i class="fas fa-eye" id="eyeIcon"></i>
          </button>
        </div>
      </div>
      <div class="divider"></div>
      <button type="submit" class="btn-login"><i class="fas fa-right-to-bracket" style="margin-right:8px"></i>Sign In</button>
    </form>

    <div class="secure-badge">
      <i class="fas fa-lock"></i>
      Secured · Sessions expire in 8 hours · Cloudflare Edge
    </div>

    <div class="login-footer">
      Astro One Management AI &nbsp;·&nbsp; Internal Platform<br>
      Authorised personnel only
    </div>
  </div>
</div>
<script>
function togglePwd() {
  const i = document.getElementById('pwdInput')
  const e = document.getElementById('eyeIcon')
  if (i.type === 'password') { i.type = 'text'; e.className = 'fas fa-eye-slash' }
  else { i.type = 'password'; e.className = 'fas fa-eye' }
}
</script>
</body>
</html>`
}
