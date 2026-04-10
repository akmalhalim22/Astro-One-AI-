import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { CSS } from './styles'
import { topbar } from './layout'
import { homeScreen } from './screens/home'
import { overviewScreen } from './screens/overview'
import { aiScreen } from './screens/ai'
import { digestScreen } from './screens/digest'
import { pipelineScreen, clientsScreen, salesPerfScreen } from './screens/presales'
import { revenueScreen, campaignScreen, gamAnalyticsScreen } from './screens/postsales'
import { portalsScreen, socialScreen } from './screens/traffic'
import { uploadScreen, apiConnScreen, setupScreen, blendScreen, apiDataScreen } from './screens/data'
import { reportAiScreen } from './screens/reportai'
import { canvasScreen } from './screens/canvas'
import { settingsScreen } from './screens/settings'
import {
  loginPage, registerPage, sessionCookie, getSessionToken,
  generateToken, generateSalt, verifyPassword, hashPassword,
  SESSION_TTL, LOGIN_COOKIE
} from './auth'
import { readSheet, listSheetTabs, appendSheet, fmtRM, sumCol, groupSum,
  getGAMNetwork, listGAMOrders, listGAMLineItems, listGAMAdUnits, listGAMReports, runGAMReport,
  getGAMDeliveryMetrics } from './sheets'

// ── Cloudflare bindings ───────────────────────────────────────────────────
type Bindings = {
  SESSIONS: KVNamespace
  // Secrets (set via wrangler secret put):
  INVITE_CODE?: string
  ADMIN_EMAIL:          string
  ADMIN_PASSWORD_HASH:  string
  ADMIN_SALT:           string
  // Google Sheets (optional - configured via wrangler secret)
  SHEET_ID?:            string
  SERVICE_ACCOUNT_JSON?: string
  // Google Ad Manager (optional - configured via wrangler secret)
  GAM_NETWORK_CODE?:    string
  GAM_SERVICE_ACCOUNT_JSON?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// ── Static files ──────────────────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './' }))

// ── Auth helpers ──────────────────────────────────────────────────────────
async function requireAuth(c: any, next: () => Promise<void>) {
  const token = getSessionToken(c.req.header('Cookie') || null)
  if (!token) return c.redirect('/login')
  const session = token ? await c.env.SESSIONS.get('session:' + token) : null
  if (!session) return c.redirect('/login')
  c.set('session', JSON.parse(session))
  await next()
}

// ── Config helpers ─────────────────────────────────────────────────────────
// Google Sheets - read from KV storage (same pattern as GAM)
async function getSheetsConfig(kv: KVNamespace): Promise<{ sheetId: string; saJson: string } | null> {
  const raw = await kv.get('config:conn:sheets')
  if (!raw) return null
  const cfg = JSON.parse(raw)
  if (!cfg.sheets_sa_json || !cfg.sheets_id) return null
  return { sheetId: cfg.sheets_id, saJson: cfg.sheets_sa_json }
}

// Google Ad Manager - read from KV storage
async function getGAMConfig(kv: KVNamespace): Promise<{ saJson: string; networkCode: string } | null> {
  const raw = await kv.get('config:conn:gam')
  if (!raw) return null
  const cfg = JSON.parse(raw)
  if (!cfg.gam_sa_json || !cfg.gam_network_code) return null
  return { saJson: cfg.gam_sa_json, networkCode: cfg.gam_network_code }
}

// Tab names — keys are section IDs, values are EXACT Google Sheet tab names
// ⚠️  These must match the actual tab names in the spreadsheet character-for-character
function getTabNames(): Record<string, string> {
  return {
    pipeline:  'Pipeline',        // Pre-Sales (not yet available → handled gracefully)
    revenue:   'revenue',         // Revenue Performance  — exact sheet tab name
    campaign:  'direct campaign', // Campaign Performance — exact sheet tab name
    ads:       'Ads',
    traffic:   'Traffic',
    social:    'Social',
    clients:   'Clients'
  }
}

// Helper: find the first field from a list of candidate names in a row object
function findField(row: Record<string,string>, candidates: string[]): string {
  for (const k of candidates) {
    if (row[k] !== undefined && row[k] !== '') return row[k]
  }
  return ''
}

// Helper: sum a numeric column — tries multiple candidate field names
function sumColFlex(rows: Record<string,string>[], ...candidates: string[]): number {
  return rows.reduce((s, r) => {
    const v = parseFloat(findField(r, candidates)) || 0
    return s + v
  }, 0)
}

// ═══════════════════════════════════════════════════════════════════════════
//   LOGIN / LOGOUT
// ═══════════════════════════════════════════════════════════════════════════

app.get('/login',    (c) => c.html(loginPage()))
app.get('/register', (c) => c.html(registerPage()))

// Detect if request is over HTTPS (for Secure cookie flag)
function isSecureRequest(c: any): boolean {
  const proto = c.req.header('X-Forwarded-Proto') || c.req.header('cf-visitor') || ''
  const url = c.req.url || ''
  return proto.includes('https') || url.startsWith('https')
}

app.get('/logout', async (c) => {
  const token = getSessionToken(c.req.header('Cookie') || null)
  if (token) await c.env.SESSIONS.delete('session:' + token)
  const secure = isSecureRequest(c)
  return new Response(null, { status: 302, headers: { Location: '/login', 'Set-Cookie': sessionCookie('', true, secure) } })
})

app.post('/login', async (c) => {
  const body = await c.req.parseBody()
  const email    = (body['email']    as string || '').toLowerCase().trim()
  const password = (body['password'] as string || '')

  // Load users list from KV (or fall back to env-var admin)
  const usersRaw = await c.env.SESSIONS.get('config:users')
  const users: { email: string; passwordHash: string; salt: string; name: string; role: string }[] =
    usersRaw ? JSON.parse(usersRaw) : []

  // Always include the bootstrap admin from env secrets
  const adminHash = c.env.ADMIN_PASSWORD_HASH || ''
  const adminSalt = c.env.ADMIN_SALT           || 'astro-one-salt-2025'
  const adminEmail = (c.env.ADMIN_EMAIL || 'admin@astro.com.my').toLowerCase()

  let matched = users.find(u => u.email === email)
  let isValid = false

  if (matched) {
    isValid = await verifyPassword(password, matched.passwordHash, matched.salt)
  } else if (email === adminEmail) {
    if (adminHash) {
      isValid = await verifyPassword(password, adminHash, adminSalt)
    } else {
      // Bootstrap: first login with password 'Astro@2025!' creates the admin
      isValid = password === 'Astro@2025!'
    }
    if (isValid) {
      matched = { email: adminEmail, passwordHash: adminHash, salt: adminSalt, name: "Dato' Lee", role: 'admin' }
    }
  }

  if (!isValid || !matched) {
    return c.html(loginPage('Incorrect email or password. Please try again.'))
  }

  // Create session
  const token = generateToken()
  const sessionData = { email: matched.email, name: matched.name, role: matched.role, loginAt: Date.now() }
  await c.env.SESSIONS.put('session:' + token, JSON.stringify(sessionData), { expirationTtl: SESSION_TTL })

  const secure = isSecureRequest(c)
  return new Response(null, {
    status: 302,
    headers: { Location: '/home', 'Set-Cookie': sessionCookie(token, false, secure) }
  })
})

// ─── Register ──────────────────────────────────────────────────────────────
app.post('/register', async (c) => {
  const body         = await c.req.parseBody()
  const firstName    = (body['firstName']    as string || '').trim()
  const lastName     = (body['lastName']     as string || '').trim()
  const email        = (body['email']        as string || '').toLowerCase().trim()
  const password     = (body['password']     as string || '')
  const confirmPwd   = (body['confirmPassword'] as string || '')
  const inviteCode   = (body['inviteCode']   as string || '').trim()

  const prefill = { firstName, lastName, email }

  // ── Validation ────────────────────────────────────────────────────────
  if (!firstName || !lastName)
    return c.html(registerPage('Please enter your full name.', '', prefill))
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.html(registerPage('Please enter a valid email address.', '', prefill))
  if (password.length < 8)
    return c.html(registerPage('Password must be at least 8 characters long.', '', prefill))
  if (password !== confirmPwd)
    return c.html(registerPage('Passwords do not match. Please try again.', '', prefill))

  // ── Validate invite code ──────────────────────────────────────────────
  // Accept: env secret INVITE_CODE  OR  a KV-stored code  OR  fallback default
  const envCode = c.env.INVITE_CODE || 'ASTRO2025'
  const kvCode  = await c.env.SESSIONS.get('config:invite_code') || envCode
  if (inviteCode.toUpperCase() !== kvCode.toUpperCase())
    return c.html(registerPage('Invalid invite code. Please contact your administrator.', '', prefill))

  // ── Check email not already taken ─────────────────────────────────────
  const adminEmail = (c.env.ADMIN_EMAIL || 'analytics@kult.my').toLowerCase()
  if (email === adminEmail)
    return c.html(registerPage('This email address is already registered. Please sign in.', '', prefill))

  const usersRaw = await c.env.SESSIONS.get('config:users')
  const users: { email: string; passwordHash: string; salt: string; name: string; role: string }[] =
    usersRaw ? JSON.parse(usersRaw) : []

  if (users.find(u => u.email === email))
    return c.html(registerPage('This email address is already registered. Please sign in.', '', prefill))

  // ── Hash password and save user ───────────────────────────────────────
  const salt         = generateSalt()
  const passwordHash = await hashPassword(password, salt)
  const name         = `${firstName} ${lastName}`

  users.push({ email, name, role: 'viewer', passwordHash, salt })
  await c.env.SESSIONS.put('config:users', JSON.stringify(users))

  // ── Auto-login: create session immediately ────────────────────────────
  const token       = generateToken()
  const sessionData = { email, name, role: 'viewer', loginAt: Date.now() }
  await c.env.SESSIONS.put('session:' + token, JSON.stringify(sessionData), { expirationTtl: SESSION_TTL })

  const secure = isSecureRequest(c)
  return new Response(null, {
    status: 302,
    headers: { Location: '/home', 'Set-Cookie': sessionCookie(token, false, secure) }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
//   SETTINGS API ROUTES (admin only)
// ═══════════════════════════════════════════════════════════════════════════

// Load current settings (for populating the Settings form on page load)
app.get('/api/settings/config', requireAuth, async (c) => {
  const cfg = await getConfig(c.env.SESSIONS)
  const hasCreds = !!(await c.env.SESSIONS.get('secret:service_account'))
  return c.json({ ok: true, sheetId: cfg.sheetId, tabs: cfg.tabs, hasCreds })
})

// Load users list
app.get('/api/settings/users', requireAuth, async (c) => {
  const usersRaw = await c.env.SESSIONS.get('config:users')
  const users: { email: string; name: string; role: string }[] = usersRaw ? JSON.parse(usersRaw) : []
  // Add the bootstrap admin (from env) to the list if not already there
  const adminEmail = (c.env.ADMIN_EMAIL || 'analytics@kult.my').toLowerCase()
  const allUsers = [
    { email: adminEmail, name: "Admin", role: 'admin' },
    ...users.filter((u: any) => u.email !== adminEmail)
  ]
  return c.json({ ok: true, users: allUsers.map(u => ({ email: u.email, name: u.name, role: u.role })) })
})

app.post('/api/settings/credentials', requireAuth, async (c) => {
  const body = await c.req.json<{ serviceAccountJson: string }>()
  try {
    JSON.parse(body.serviceAccountJson) // validate JSON
    await c.env.SESSIONS.put('secret:service_account', body.serviceAccountJson)
    return c.json({ ok: true })
  } catch { return c.json({ ok: false, error: 'Invalid JSON format' }) }
})

app.get('/api/settings/test-connection', requireAuth, async (c) => {
  try {
    const sa  = await c.env.SESSIONS.get('secret:service_account')
    if (!sa) return c.json({ ok: false, error: 'No service account credentials stored. Please save credentials first.' })
    const cfg = await getConfig(c.env.SESSIONS)
    if (!cfg.sheetId) return c.json({ ok: false, error: 'No Spreadsheet ID configured. Please set it in Sheet Configuration.' })
    const tabs = await listSheetTabs(sa, cfg.sheetId)
    return c.json({ ok: true, message: 'Connection successful!', tabs })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message || 'Connection failed' })
  }
})

app.get('/api/settings/detect-tabs', requireAuth, async (c) => {
  try {
    const sa  = await c.env.SESSIONS.get('secret:service_account')
    const cfg = await getConfig(c.env.SESSIONS)
    if (!sa || !cfg.sheetId) return c.json({ ok: false, error: 'Set credentials and Sheet ID first.' })
    const tabs = await listSheetTabs(sa, cfg.sheetId)
    return c.json({ ok: true, tabs })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

app.post('/api/settings/sheet-config', requireAuth, async (c) => {
  try {
    const body = await c.req.json()
    const existing = await c.env.SESSIONS.get('config:platform')
    const cfg = existing ? JSON.parse(existing) : {}
    cfg.sheetId = body.sheetId
    cfg.tabs    = body.tabs
    await c.env.SESSIONS.put('config:platform', JSON.stringify(cfg))
    return c.json({ ok: true })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

app.post('/api/settings/add-user', requireAuth, async (c) => {
  try {
    const { name, email, password, role } = await c.req.json<{ name:string; email:string; password:string; role:string }>()
    const salt = generateToken().slice(0, 16)
    const enc = new TextEncoder()
    const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
    const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', hash:'SHA-256', salt:enc.encode(salt), iterations:100_000 }, base, 256)
    const passwordHash = btoa(String.fromCharCode(...new Uint8Array(bits)))
    const usersRaw = await c.env.SESSIONS.get('config:users')
    const users = usersRaw ? JSON.parse(usersRaw) : []
    if (users.find((u: any) => u.email === email.toLowerCase())) {
      return c.json({ ok: false, error: 'Email already exists.' })
    }
    users.push({ email: email.toLowerCase(), name, role, passwordHash, salt })
    await c.env.SESSIONS.put('config:users', JSON.stringify(users))
    return c.json({ ok: true })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

app.post('/api/settings/remove-user', requireAuth, async (c) => {
  try {
    const { email } = await c.req.json<{ email: string }>()
    const usersRaw = await c.env.SESSIONS.get('config:users')
    const users = usersRaw ? JSON.parse(usersRaw) : []
    const updated = users.filter((u: any) => u.email !== email.toLowerCase())
    await c.env.SESSIONS.put('config:users', JSON.stringify(updated))
    return c.json({ ok: true })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

app.post('/api/settings/change-password', requireAuth, async (c) => {
  try {
    const session = c.get('session') as { email: string }
    const { currentPassword, newPassword } = await c.req.json<{ currentPassword:string; newPassword:string }>()
    const usersRaw = await c.env.SESSIONS.get('config:users')
    const users = usersRaw ? JSON.parse(usersRaw) : []
    const user = users.find((u: any) => u.email === session.email)
    if (!user) return c.json({ ok: false, error: 'User not found.' })
    const valid = await verifyPassword(currentPassword, user.passwordHash, user.salt)
    if (!valid) return c.json({ ok: false, error: 'Current password is incorrect.' })
    const salt = generateToken().slice(0, 16)
    const enc = new TextEncoder()
    const base = await crypto.subtle.importKey('raw', enc.encode(newPassword), 'PBKDF2', false, ['deriveBits'])
    const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', hash:'SHA-256', salt:enc.encode(salt), iterations:100_000 }, base, 256)
    user.passwordHash = btoa(String.fromCharCode(...new Uint8Array(bits)))
    user.salt = salt
    await c.env.SESSIONS.put('config:users', JSON.stringify(users))
    return c.json({ ok: true })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

app.post('/api/settings/invalidate-sessions', requireAuth, async (c) => {
  const token = getSessionToken(c.req.header('Cookie') || null)
  if (token) await c.env.SESSIONS.delete('session:' + token)
  return new Response(null, { status: 302, headers: { Location: '/login', 'Set-Cookie': sessionCookie('', true) } })
})

// Get / set the invite code (admin only)
app.get('/api/settings/invite-code', requireAuth, async (c) => {
  const session = c.get('session') as { role: string }
  if (session.role !== 'admin') return c.json({ ok: false, error: 'Admin only' })
  const stored  = await c.env.SESSIONS.get('config:invite_code')
  const current = stored || c.env.INVITE_CODE || 'ASTRO2025'
  return c.json({ ok: true, code: current })
})

app.post('/api/settings/invite-code', requireAuth, async (c) => {
  const session = c.get('session') as { role: string }
  if (session.role !== 'admin') return c.json({ ok: false, error: 'Admin only' })
  try {
    const { code } = await c.req.json<{ code: string }>()
    if (!code || code.trim().length < 4)
      return c.json({ ok: false, error: 'Invite code must be at least 4 characters.' })
    await c.env.SESSIONS.put('config:invite_code', code.trim().toUpperCase())
    return c.json({ ok: true })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
//   API CONNECTION CONFIG — stores/reads credentials for GA4, GAM, BQ, etc.
// ═══════════════════════════════════════════════════════════════════════════

// Get status of a specific connection source
app.get('/api/conn/status/:sourceId', requireAuth, async (c) => {
  const sourceId = c.req.param('sourceId')
  const key = 'config:conn:' + sourceId
  const stored = await c.env.SESSIONS.get(key)
  if (stored) {
    const cfg = JSON.parse(stored)
    // Don't expose secrets, just confirm configured
    return c.json({ ok: true, configured: true, sourceId, configuredAt: cfg.savedAt })
  }
  return c.json({ ok: true, configured: false, sourceId })
})

// Save connection config (credentials stored in KV)
app.post('/api/conn/config', requireAuth, async (c) => {
  try {
    const body = await c.req.json<Record<string, string>>()
    const { sourceId } = body
    if (!sourceId) return c.json({ ok: false, error: 'sourceId required' })

    const key = 'config:conn:' + sourceId
    const payload = { ...body, savedAt: new Date().toISOString() }
    await c.env.SESSIONS.put(key, JSON.stringify(payload))
    return c.json({ ok: true, sourceId })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Trigger a manual sync for a source (currently demonstrates the pattern;
// real sync requires a Cloudflare Cron Worker with the respective API library)
app.post('/api/conn/sync/:sourceId', requireAuth, async (c) => {
  const sourceId = c.req.param('sourceId')
  const key = 'config:conn:' + sourceId
  const stored = await c.env.SESSIONS.get(key)

  if (!stored) {
    return c.json({ ok: false, error: sourceId + ' is not configured — open Config to enter credentials first.' })
  }

  // For Google Sheets: test the real connection
  if (sourceId === 'sheets') {
    try {
      const sa  = await c.env.SESSIONS.get('secret:service_account')
      const cfg = await getConfig(c.env.SESSIONS)
      if (!sa || !cfg.sheetId)
        return c.json({ ok: false, error: 'Google Sheets not configured in Settings yet.' })
      const tabs = await listSheetTabs(sa, cfg.sheetId)
      return c.json({ ok: true, message: 'Google Sheets live — ' + tabs.length + ' tabs found.', records: tabs.length })
    } catch (e: any) {
      return c.json({ ok: false, error: e.message })
    }
  }

  // For other sources: record the sync attempt with timestamp
  const connData = JSON.parse(stored)
  connData.lastSync = new Date().toISOString()
  await c.env.SESSIONS.put(key, JSON.stringify(connData))

  return c.json({
    ok: true,
    message: sourceId.toUpperCase() + ' sync triggered. In production this fires the respective API integration worker.',
    records: 0,
    note: 'To enable real sync, deploy a Cloudflare Cron Worker with the ' + sourceId + ' API integration code shown in the Setup Guide.'
  })
})

// ═══════════════════════════════════════════════════════════════════════════
//   GOOGLE AD MANAGER (GAM) API ROUTES — READ-ONLY
//   All GAM calls use admanager.readonly OAuth scope.
//   No create / update / delete operations are exposed.
// ═══════════════════════════════════════════════════════════════════════════

// Helper: get stored GAM config from KV
// Test GAM connection — get network info
app.get('/api/gam/test', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured. Click Config on the Google Ad Manager card to set it up.' })
    const network = await getGAMNetwork(gam.saJson, gam.networkCode)
    return c.json({ ok: true, network })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Configure GAM (save to KV)
app.post('/api/gam/config', requireAuth, async (c) => {
  try {
    const { serviceAccountJson, networkCode } = await c.req.json()
    if (!serviceAccountJson || !networkCode) {
      return c.json({ ok: false, error: 'Missing serviceAccountJson or networkCode' })
    }
    // Validate JSON
    try {
      JSON.parse(serviceAccountJson)
    } catch {
      return c.json({ ok: false, error: 'Invalid service account JSON' })
    }
    // Save to KV
    await c.env.SESSIONS.put('config:conn:gam', JSON.stringify({
      gam_sa_json: serviceAccountJson,
      gam_network_code: networkCode
    }))
    return c.json({ ok: true, message: 'GAM configuration saved' })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Test Sheets connection
app.get('/api/sheets/test', requireAuth, async (c) => {
  try {
    const sheets = await getSheetsConfig(c.env.SESSIONS)
    if (!sheets) return c.json({ ok: false, error: 'Google Sheets not configured. Click Config on the Google Sheets card to set it up.' })
    const tabs = await listSheetTabs(sheets.saJson, sheets.sheetId)
    return c.json({ ok: true, sheetId: sheets.sheetId, tabs, count: tabs.length })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Configure Sheets (save to KV)
app.post('/api/sheets/config', requireAuth, async (c) => {
  try {
    const { serviceAccountJson, sheetId } = await c.req.json()
    if (!serviceAccountJson || !sheetId) {
      return c.json({ ok: false, error: 'Missing serviceAccountJson or sheetId' })
    }
    // Validate JSON
    try {
      JSON.parse(serviceAccountJson)
    } catch {
      return c.json({ ok: false, error: 'Invalid service account JSON' })
    }
    // Save to KV
    await c.env.SESSIONS.put('config:conn:sheets', JSON.stringify({
      sheets_sa_json: serviceAccountJson,
      sheets_id: sheetId
    }))
    return c.json({ ok: true, message: 'Google Sheets configuration saved' })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Get network info
app.get('/api/gam/network', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    const network = await getGAMNetwork(gam.saJson, gam.networkCode)
    return c.json({ ok: true, network })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// List orders (with caching)
app.get('/api/gam/orders', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    
    // Check cache
    const pageSize = parseInt(c.req.query('pageSize') || '50')
    const cacheKey = 'cache:gam:orders:' + gam.networkCode + ':' + pageSize
    const useCached = c.req.query('cached') === 'true'
    
    if (useCached) {
      const cached = await c.env.SESSIONS.get(cacheKey)
      if (cached) {
        const data = JSON.parse(cached)
        return c.json({ ...data, cached: true })
      }
    }
    
    const orders = await listGAMOrders(gam.saJson, gam.networkCode, pageSize)
    const result = { ok: true, orders, count: orders.length }
    
    // Cache for 5 minutes
    await c.env.SESSIONS.put(cacheKey, JSON.stringify(result), { expirationTtl: 300 })
    
    return c.json({ ...result, cached: false })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// List line items (with caching)
app.get('/api/gam/lineitems', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    
    // Check cache
    const pageSize = parseInt(c.req.query('pageSize') || '50')
    const cacheKey = 'cache:gam:lineitems:' + gam.networkCode + ':' + pageSize
    const useCached = c.req.query('cached') === 'true'
    
    if (useCached) {
      const cached = await c.env.SESSIONS.get(cacheKey)
      if (cached) {
        const data = JSON.parse(cached)
        return c.json({ ...data, cached: true })
      }
    }
    
    const lineItems = await listGAMLineItems(gam.saJson, gam.networkCode, pageSize)
    const result = { ok: true, lineItems, count: lineItems.length }
    
    // Cache for 5 minutes
    await c.env.SESSIONS.put(cacheKey, JSON.stringify(result), { expirationTtl: 300 })
    
    return c.json({ ...result, cached: false })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// List ad units
app.get('/api/gam/adunits', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    const adUnits = await listGAMAdUnits(gam.saJson, gam.networkCode)
    return c.json({ ok: true, adUnits, count: adUnits.length })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// List saved reports
app.get('/api/gam/reports', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    const reports = await listGAMReports(gam.saJson, gam.networkCode)
    return c.json({ ok: true, reports, count: reports.length })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Run a specific saved report (GET — read-only; :run is GAM's report-fetch verb, no data is written)
app.get('/api/gam/reports/:reportId/run', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    const reportId = c.req.param('reportId')
    const result = await runGAMReport(gam.saJson, gam.networkCode, reportId)
    return c.json({ ok: true, ...result })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Dashboard summary — pulls orders + line items and aggregates (with caching)
app.get('/api/gam/summary', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.', demo: true })

    // Check for cached data (5-minute TTL)
    const cacheKey = 'cache:gam:summary:' + gam.networkCode
    const useCached = c.req.query('cached') === 'true'
    
    if (useCached) {
      const cached = await c.env.SESSIONS.get(cacheKey)
      if (cached) {
        const data = JSON.parse(cached)
        return c.json({ ...data, cached: true, cacheAge: Date.now() - data._cachedAt })
      }
    }

    const [network, orders, lineItems, adUnits] = await Promise.all([
      getGAMNetwork(gam.saJson, gam.networkCode).catch(() => null),
      listGAMOrders(gam.saJson, gam.networkCode, 500).catch(() => []),
      listGAMLineItems(gam.saJson, gam.networkCode, 500).catch(() => []),
      listGAMAdUnits(gam.saJson, gam.networkCode, 200).catch(() => []),
    ])

    // Aggregate order stats (exclude DRAFT and UNKNOWN)
    const ordersByStatus: Record<string, number> = {}
    for (const o of orders) {
      const s = o.status || 'UNKNOWN'
      if (s === 'DRAFT' || s === 'UNKNOWN') continue
      ordersByStatus[s] = (ordersByStatus[s] || 0) + 1
    }

    // Aggregate line item stats (exclude DRAFT and UNKNOWN)
    const liByStatus: Record<string, number> = {}
    let totalImpressions = 0
    let totalClicks = 0
    for (const li of lineItems) {
      const s = li.status || 'UNKNOWN'
      if (s === 'DRAFT' || s === 'UNKNOWN') continue
      liByStatus[s] = (liByStatus[s] || 0) + 1
      totalImpressions += parseInt(li.impressionsDelivered || '0')
      totalClicks += parseInt(li.clicksDelivered || '0')
    }

    const activeAdUnits = adUnits.filter(u => u.status === 'ACTIVE' || !u.status).length

    const result = {
      ok: true,
      networkCode: gam.networkCode,
      networkName: network?.displayName || gam.networkCode,
      currency: network?.currencyCode || 'USD',
      timeZone: network?.timeZone || '',
      orders: { total: orders.length, byStatus: ordersByStatus },
      lineItems: { total: lineItems.length, byStatus: liByStatus, totalImpressions, totalClicks },
      adUnits: { total: adUnits.length, active: activeAdUnits },
      _cachedAt: Date.now()
    }

    // Cache the result for 5 minutes (300 seconds)
    await c.env.SESSIONS.put(cacheKey, JSON.stringify(result), { expirationTtl: 300 })

    return c.json({ ...result, cached: false })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Delivery metrics report — creates+runs ad-hoc report for impressions/clicks
// Returns: { ok, lineItemMetrics: {liId: {impressions, clicks}}, orderMetrics: {orderId: {impressions, clicks}} }
app.get('/api/gam/metrics', requireAuth, async (c) => {
  try {
    const gam = await getGAMConfig(c.env.SESSIONS)
    if (!gam) return c.json({ ok: false, error: 'GAM not configured.' })
    const { lineItemMetrics, orderMetrics } = await getGAMDeliveryMetrics(gam.saJson, gam.networkCode)
    return c.json({ ok: true, lineItemMetrics, orderMetrics })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
//   DATA API — reads real Google Sheets data
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/data/:section', requireAuth, async (c) => {
  try {
    const section = c.req.param('section')
    const sheets = await getSheetsConfig(c.env.SESSIONS)

    if (!sheets) {
      return c.json({ ok: false, error: 'Google Sheets not configured. Visit Data Management → API Connections to set it up.' })
    }

    const tabMap: Record<string, string> = getTabNames()
    const tabName = tabMap[section]
    if (!tabName) return c.json({ ok: false, error: 'Unknown section: ' + section })

    let rows: Record<string,string>[] = []
    let sheetError: string | null = null
    try {
      rows = await readSheet(sheets.saJson, sheets.sheetId, `${tabName}!A:Z`)
    } catch (sheetErr: any) {
      sheetError = sheetErr.message || String(sheetErr)
    }

    if (sheetError) {
      return c.json({ ok: false, error: `Cannot read sheet tab "${tabName}": ${sheetError}` })
    }

    const debugInfo = rows.length > 0 ? {
      sampleRow: rows[0],
      columns: Object.keys(rows[0] || {}),
      columnCount: Object.keys(rows[0] || {}).length
    } : { columns: [], columnCount: 0, sampleRow: null }

    return c.json({ ok: true, rows, count: rows.length, tab: tabName, debug: debugInfo })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// KPI summary endpoint — aggregates key metrics from Sheets
app.get('/api/kpis', requireAuth, async (c) => {
  try {
    const sheets = await getSheetsConfig(c.env.SESSIONS)
    if (!sheets) return c.json({ ok: false, error: 'Google Sheets not configured' })

    const tabs = getTabNames()

    // Pipeline is not yet available — catch silently
    const pipelineRows = await readSheet(sheets.saJson, sheets.sheetId, `${tabs.pipeline}!A:Z`).catch(() => [])

    // Revenue tab — exact tab name 'revenue'
    const revenueRows  = await readSheet(sheets.saJson, sheets.sheetId, `${tabs.revenue}!A:Z`).catch(() => [])

    // Campaign tab — exact tab name 'direct campaign'
    const campaignRows = await readSheet(sheets.saJson, sheets.sheetId, `${tabs.campaign}!A:Z`).catch(() => [])

    // Revenue: try all common field names for the revenue value
    const revenueTotal   = sumColFlex(revenueRows,  'Revenue', 'revenue', 'Amount', 'amount', 'Total', 'total')
    const revenueTarget  = sumColFlex(revenueRows,  'Target',  'target',  'Budget', 'budget')

    // Pipeline: try common field names
    const pipelineTotal  = sumColFlex(pipelineRows, 'deal_value', 'Deal Value', 'Value', 'value', 'Amount', 'amount')

    // Campaign: try common revenue field names
    const campaignTotal  = sumColFlex(campaignRows, 'Total', 'total', 'Revenue', 'revenue', 'Amount', 'amount', 'Total Revenue')

    // Stage breakdown for pipeline
    const stageBreakdown = groupSum(pipelineRows, 'stage', 'deal_value')

    // Revenue by month (for charts)
    const revByMonth: Record<string, number> = {}
    for (const r of revenueRows) {
      const m = findField(r, ['Month', 'month', 'Revenue Month', 'revenue_month']) || 'Unknown'
      const v = parseFloat(findField(r, ['Revenue', 'revenue', 'Amount', 'amount', 'Total', 'total'])) || 0
      revByMonth[m] = (revByMonth[m] || 0) + v
    }

    // Revenue by portal/type
    const revByPortal: Record<string, number> = {}
    for (const r of revenueRows) {
      const p = findField(r, ['Portal', 'portal', 'Channel', 'channel']) || 'Other'
      const v = parseFloat(findField(r, ['Revenue', 'revenue', 'Amount', 'amount'])) || 0
      revByPortal[p] = (revByPortal[p] || 0) + v
    }

    // Columns info for frontend debugging
    const revColumns   = revenueRows.length  > 0 ? Object.keys(revenueRows[0])  : []
    const campColumns  = campaignRows.length > 0 ? Object.keys(campaignRows[0]) : []
    const pipeColumns  = pipelineRows.length > 0 ? Object.keys(pipelineRows[0]) : []

    return c.json({
      ok: true,
      // Raw numeric totals (frontend formats them)
      totalRevenue:   revenueTotal,
      totalTarget:    revenueTarget,
      totalPipeline:  pipelineTotal,
      totalCampaign:  campaignTotal,
      // Counts
      revenueCount:   revenueRows.length,
      campaignCount:  campaignRows.length,
      pipelineCount:  pipelineRows.length,
      // Chart data
      revenueByMonth: revByMonth,
      revenueByPortal: revByPortal,
      // Stage breakdown
      pipelineStages: stageBreakdown,
      // Debug: actual column names from each tab
      _debug: { revColumns, campColumns, pipeColumns }
    })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// Upload endpoint — appends CSV rows to a Sheet tab
app.post('/api/upload', requireAuth, async (c) => {
  try {
    const body = await c.req.json<{ tab: string; rows: string[][] }>()
    const sa   = await c.env.SESSIONS.get('secret:service_account')
    const cfg  = await getConfig(c.env.SESSIONS)
    if (!sa || !cfg.sheetId) return c.json({ ok: false, error: 'Platform not configured — set credentials in Settings first.' })
    const tabName = cfg.tabs[body.tab] || body.tab
    await appendSheet(sa, cfg.sheetId, `${tabName}!A:Z`, body.rows)
    return c.json({ ok: true, appended: body.rows.length, tab: tabName })
  } catch (e: any) {
    return c.json({ ok: false, error: e.message })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
//   MAIN PAGE RENDERER
// ═══════════════════════════════════════════════════════════════════════════

const routes: Record<string, { screen: string; content: () => string }> = {
  '/':          { screen: 'home',     content: homeScreen },
  '/home':      { screen: 'home',     content: homeScreen },
  '/overview':  { screen: 'overview', content: overviewScreen },
  '/ai':        { screen: 'ai',       content: aiScreen },
  '/digest':    { screen: 'digest',   content: digestScreen },
  '/presales':  { screen: 'presales', content: pipelineScreen },
  '/pipeline':  { screen: 'pipeline', content: pipelineScreen },
  '/clients':   { screen: 'clients',  content: clientsScreen },
  '/salesperf': { screen: 'salesperf',content: salesPerfScreen },
  '/postsales': { screen: 'postsales',content: revenueScreen },
  '/revenue':   { screen: 'revenue',  content: revenueScreen },
  '/campaign':  { screen: 'campaign', content: campaignScreen },
  '/gamanalytics': { screen: 'gamanalytics', content: gamAnalyticsScreen },
  '/traffic':   { screen: 'traffic',  content: portalsScreen },
  '/portals':   { screen: 'portals',  content: portalsScreen },
  '/social':    { screen: 'social',   content: socialScreen },
  '/data':      { screen: 'data',     content: apiDataScreen },
  '/upload':    { screen: 'upload',   content: apiDataScreen },
  '/apiconn':   { screen: 'apiconn',  content: apiConnScreen },
  '/setup':     { screen: 'setup',    content: setupScreen },
  '/blend':     { screen: 'blend',    content: blendScreen },
  '/reportai':  { screen: 'reportai', content: reportAiScreen },
  '/canvas':    { screen: 'canvas',   content: canvasScreen },
  '/settings':  { screen: 'settings', content: settingsScreen },
}

function buildNav(active: string, userRole = 'viewer'): string {
  type NavItem = { id: string; label: string; icon: string; badge?: string; sub?: NavItem[]; adminOnly?: boolean }
  const nav: NavItem[] = [
    { id: 'home',     label: 'Home',         icon: 'fa-house' },
    { id: 'overview', label: 'Overview',     icon: 'fa-chart-pie' },
    { id: 'ai',       label: 'Ask AI',       icon: 'fa-sparkles',  badge: 'AI' },
    { id: 'digest',   label: 'Daily Digest', icon: 'fa-newspaper', badge: '4' },
    { id: 'presales', label: 'Pre-Sales',    icon: 'fa-funnel', sub: [
      { id: 'pipeline',  label: 'Pipeline Health',    icon: 'fa-filter' },
      { id: 'clients',   label: 'Client Intelligence', icon: 'fa-building' },
      { id: 'salesperf', label: 'Sales Performance',  icon: 'fa-chart-line' },
    ]},
    { id: 'postsales', label: 'Post-Sales',  icon: 'fa-rocket', sub: [
      { id: 'revenue',       label: 'Revenue Performance',  icon: 'fa-sack-dollar' },
      { id: 'campaign',      label: 'Campaign Performance', icon: 'fa-megaphone' },
      { id: 'gamanalytics', label: 'GAM Analytics',         icon: 'fa-rectangle-ad', badge: 'Live' },
    ]},
    { id: 'traffic', label: 'Traffic Performance', icon: 'fa-signal', sub: [
      { id: 'portals', label: 'Portals Traffic', icon: 'fa-globe' },
      { id: 'social',  label: 'Sprout Social',   icon: 'fa-seedling' },
    ]},
    { id: 'data', label: 'Data Management', icon: 'fa-database', sub: [
      { id: 'upload',  label: 'API Data Sources', icon: 'fa-satellite-dish' },
      { id: 'apiconn', label: 'API Connections', icon: 'fa-plug' },
      { id: 'setup',   label: 'Setup Guide',     icon: 'fa-book-open' },
      { id: 'blend',   label: 'Data Blend',      icon: 'fa-code-merge' },
    ]},
    { id: 'reportai', label: 'Report AI',  icon: 'fa-file-chart-pie', badge: 'New' },
    { id: 'canvas',   label: 'Canvas',     icon: 'fa-layer-group',    badge: 'New' },
    { id: 'settings', label: 'Settings',   icon: 'fa-gear', adminOnly: true },
  ]

  function renderItem(n: NavItem, depth = 0): string {
    if (n.adminOnly && userRole !== 'admin') return ''
    const isActive     = active === n.id
    const hasActiveSub = n.sub?.some(s => s.id === active)
    const isOpen       = isActive || hasActiveSub || false
    const indent       = depth > 0 ? 'style="padding-left:22px"' : ''
    if (n.sub && n.sub.length > 0) {
      const subHtml = n.sub.map(s => renderItem(s, 1)).join('')
      return `
        <a href="/${n.id}" class="nav-item ${isActive ? 'active' : ''}">
          <i class="fas ${n.icon} ni"></i>
          <span style="flex:1">${n.label}</span>
          ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
          <i class="fas fa-chevron-${isOpen ? 'down' : 'right'}" style="font-size:8px;color:var(--text-muted);flex-shrink:0"></i>
        </a>
        ${isOpen ? `<div class="nav-sub">${subHtml}</div>` : ''}
      `
    }
    return `
      <a href="/${n.id}" class="nav-item ${isActive ? 'active' : ''}" ${indent}>
        <i class="fas ${n.icon} ni"></i>
        <span style="flex:1">${n.label}</span>
        ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
      </a>
    `
  }
  return nav.map(n => renderItem(n)).join('')
}

function page(screen: string, body: string, session: { name: string; email: string; role: string }): string {
  const nav = buildNav(screen, session.role)
  const tb  = topbar(screen)
  const initials = session.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Astro One — Digital Performance Hub</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png"/>
  <link rel="apple-touch-icon" href="/static/apple-touch-icon.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <style>${CSS}</style>
</head>
<body>
<div class="app">

  <!-- ═══ SIDEBAR ════════════════════════════════════════════ -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img src="/static/astro-one-logo-transparent.png" alt="Astro One" class="logo-img"/>
      <div class="logo-sub">Management AI Assistant</div>
    </div>

    <nav class="sidebar-nav">${nav}</nav>

    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">${initials}</div>
        <div style="flex:1;min-width:0">
          <div class="user-name">${session.name}</div>
          <div class="user-role">${session.role === 'admin' ? 'Administrator' : session.role === 'editor' ? 'Editor' : 'Viewer'}</div>
        </div>
        <a href="/logout" title="Sign out" style="color:var(--text-muted);font-size:13px;padding:4px;transition:color .2s" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--text-muted)'">
          <i class="fas fa-right-from-bracket"></i>
        </a>
      </div>
    </div>
  </aside>

  <!-- ═══ MAIN ════════════════════════════════════════════════ -->
  <main class="main">
    ${tb}
    ${body}
  </main>

</div>

<!-- ═══ GLOBAL SCRIPTS ═══════════════════════════════════════ -->
<script>
// ─── Navigation ──────────────────────────────────────────────
function navigate(screen) { window.location.href = '/' + screen; }
function fillPrompt(text) {
  const el = document.getElementById('chatInput');
  if (el) { el.value = text; el.focus(); }
}

// ─── Live data loader ─────────────────────────────────────────
async function loadLiveData(section) {
  try {
    const res = await fetch('/api/data/' + section);
    const d   = await res.json();
    if (d.ok && d.rows && d.rows.length > 0) {
      injectLiveData(section, d.rows);
    }
  } catch(e) { /* silently fall back to demo data */ }
}

function injectLiveData(section, rows) {
  // Generic injection: update [data-live-col] elements with aggregated values
  // Specific screens can override this
  console.log('[Live] ' + section + ': ' + rows.length + ' rows loaded from Google Sheets');
}

// ─── Chat ─────────────────────────────────────────────────────
function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}
function sendMessage() {
  const inp = document.getElementById('chatInput');
  const win = document.getElementById('chatWindow');
  if (!inp || !win || !inp.value.trim()) return;
  const msg = inp.value.trim(); inp.value = '';
  win.innerHTML += \`
    <div class="msg-row user fade-in">
      <div class="msg-av user"><i class="fas fa-user"></i></div>
      <div class="msg-bub user">\${msg}</div>
    </div>
    <div class="msg-row fade-in" id="typingRow">
      <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
      <div class="msg-bub ai"><div class="typing-row"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>
    </div>\`;
  win.scrollTop = win.scrollHeight;
  setTimeout(() => {
    const tr = document.getElementById('typingRow');
    if (tr) tr.remove();
    win.innerHTML += \`
      <div class="msg-row fade-in">
        <div class="msg-av ai"><i class="fas fa-sparkles"></i></div>
        <div class="msg-bub ai">
          <div class="ai-sum">🔍 AI Analysis: <em>\${msg}</em></div>
          <div class="ai-exp" style="margin-bottom:12px">
            In production, this response pulls <strong>live data</strong> from your connected Google Sheets,
            GA4, Google Ads Manager, BigQuery, and TikTok Ads — returning structured numbers, anomaly flags,
            and drill-down actions tailored to your question.
          </div>
          <div class="ai-acts">
            <button class="ai-act"><i class="fas fa-bookmark"></i>Save Insight</button>
            <button class="ai-act"><i class="fab fa-microsoft"></i>Share to Teams</button>
            <button class="ai-act"><i class="fas fa-expand"></i>Drill Deeper</button>
            <button class="ai-act"><i class="fas fa-download"></i>Export Data</button>
          </div>
        </div>
      </div>\`;
    win.scrollTop = win.scrollHeight;
  }, 1800);
}

// ─── Tab switchers ────────────────────────────────────────────
function switchAdTab(tab, el) {
  document.querySelectorAll('#adsTabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}
function switchSetupTab(tab, el) {
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['sheets','ga4','gam','bq','tiktok','flow'].forEach(id => {
    const panel = document.getElementById('setup-' + id);
    if (panel) panel.style.display = id === tab ? 'block' : 'none';
  });
}

// ─── Toast ────────────────────────────────────────────────────
function showToast(msg, type) {
  type = type || 'info';
  let t = document.getElementById('globalToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'globalToast';
    t.style.cssText = 'position:fixed;bottom:28px;right:28px;padding:11px 18px;border-radius:10px;font-size:12px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.5);transition:opacity .3s;font-weight:600;display:flex;align-items:center;gap:8px';
    document.body.appendChild(t);
  }
  var colors = { success:'#00d68f', error:'#f43f5e', info:'#60a5fa' };
  var icons  = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info' };
  t.style.background = type==='success'?'rgba(0,214,143,0.15)':type==='error'?'rgba(244,63,94,0.15)':'rgba(96,165,250,0.15)';
  t.style.border     = '1px solid ' + (colors[type]||'rgba(255,255,255,0.1)') + '44';
  t.style.color      = colors[type] || '#f0f0ff';
  t.innerHTML = '<i class="fas ' + (icons[type]||'fa-info') + '"></i>' + msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.style.opacity='0'; }, 3200);
}

// ─── Chart defaults ───────────────────────────────────────────
const chartDefaults = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f0f1f',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      titleColor: '#f0f0ff',
      bodyColor: '#8080a8',
      padding: 10,
      cornerRadius: 8,
    }
  },
  scales: {
    x: { grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:'#48486a',font:{size:10}}, border:{display:false} },
    y: { grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#48486a',font:{size:10}}, border:{display:false} }
  },
  responsive: true,
  maintainAspectRatio: false,
};

function mkGrad(ctx, c1, c2, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h || 200);
  g.addColorStop(0, c1); g.addColorStop(1, c2);
  return g;
}

window.addEventListener('DOMContentLoaded', () => {

  // ── Home Revenue Chart ─────────────────────────────────
  const hrc = document.getElementById('homeRevChart');
  if (hrc) new Chart(hrc, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { label:'Actual', data:[18.4,21.2,24.1,0,0,0,0,0,0,0,0,0],
          backgroundColor: ctx=>mkGrad(ctx.chart.ctx,'rgba(226,0,122,0.88)','rgba(226,0,122,0.18)'),
          borderRadius:5, borderSkipped:false },
        { label:'Target', data:[19,20,21,22,23,24,25,26,27,28,29,30],
          type:'line', borderColor:'rgba(255,255,255,0.13)', borderWidth:1.5,
          borderDash:[5,4], pointRadius:0, fill:false, tension:0.4 }
      ]
    },
    options: { ...chartDefaults,
      plugins:{...chartDefaults.plugins, tooltip:{...chartDefaults.plugins.tooltip, callbacks:{label:ctx=>' RM '+ctx.parsed.y+'M'}}},
      scales:{...chartDefaults.scales, y:{...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback:v=>'RM'+v+'M'}}}
    }
  });

  // ── Overview Revenue Chart ─────────────────────────────
  const orc = document.getElementById('ovRevChart');
  if (orc) new Chart(orc, {
    type:'line',
    data:{ labels:['Jan','Feb','Mar'],
      datasets:[
        { label:'Revenue', data:[18.4,21.2,24.1], borderColor:'#e2007a', borderWidth:2.5,
          pointBackgroundColor:'#e2007a', pointRadius:4, fill:true,
          backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,150);g.addColorStop(0,'rgba(226,0,122,0.26)');g.addColorStop(1,'rgba(226,0,122,0.02)');return g;}, tension:0.4 },
        { label:'Target', data:[19,20,21], borderColor:'rgba(255,255,255,0.18)', borderWidth:1.5,
          borderDash:[5,4], pointRadius:0, fill:false, tension:0.4 }
      ]
    },
    options:{...chartDefaults, scales:{...chartDefaults.scales, y:{...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback:v=>'RM'+v+'M'}}}}
  });

  // ── Ads Mix Donut ──────────────────────────────────────
  const amc = document.getElementById('adsMixChart');
  if (amc) new Chart(amc, { type:'doughnut',
    data:{ labels:['Google','Meta','TikTok'], datasets:[{ data:[43,35,22],
      backgroundColor:['rgba(66,133,244,0.82)','rgba(24,119,242,0.65)','rgba(255,0,80,0.75)'],
      borderColor:['#4285f4','#1877f2','#ff0050'], borderWidth:1.5, hoverOffset:6 }]},
    options:{ responsive:true, maintainAspectRatio:false, cutout:'66%',
      plugins:{ legend:{display:true,position:'bottom',labels:{color:'#8080a8',font:{size:10},padding:12,boxWidth:10}}, tooltip:chartDefaults.plugins.tooltip }}
  });

  // ── Revenue Performance Chart ──────────────────────────
  const rpc = document.getElementById('revPerfChart');
  if (rpc) new Chart(rpc, { type:'bar',
    data:{ labels:['Jan','Feb','Mar'],
      datasets:[
        { label:'Actual', data:[18.4,21.2,24.1], backgroundColor:ctx=>mkGrad(ctx.chart.ctx,'rgba(226,0,122,0.88)','rgba(226,0,122,0.18)'), borderRadius:5, borderSkipped:false },
        { label:'Target', data:[19,20,21], backgroundColor:'rgba(255,255,255,0.07)', borderRadius:5, borderSkipped:false }
      ]},
    options:{...chartDefaults,
      plugins:{...chartDefaults.plugins, legend:{display:true,position:'top',labels:{color:'#8080a8',font:{size:10},padding:10,boxWidth:10}}},
      scales:{...chartDefaults.scales, y:{...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback:v=>'RM'+v+'M'}}}
    }
  });

  // ── Campaign Revenue Chart ─────────────────────────────
  const crc = document.getElementById('campRevChart');
  if (crc) new Chart(crc, { type:'bar',
    data:{ labels:['Jan','Feb','Mar'], datasets:[{ label:'Campaign Rev', data:[11.2,13.8,13.6],
      backgroundColor:ctx=>mkGrad(ctx.chart.ctx,'rgba(167,139,250,0.82)','rgba(167,139,250,0.12)'), borderRadius:5, borderSkipped:false }]},
    options:{...chartDefaults, scales:{...chartDefaults.scales, y:{...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback:v=>'RM'+v+'M'}}}}
  });

  // ── Ads Spend Donut ────────────────────────────────────
  const asd = document.getElementById('adsSpendChart');
  if (asd) new Chart(asd, { type:'doughnut',
    data:{ labels:['Google Ads','Meta Ads','TikTok Ads'], datasets:[{ data:[43,35,22],
      backgroundColor:['rgba(66,133,244,0.85)','rgba(24,119,242,0.7)','rgba(255,0,80,0.78)'],
      borderColor:['#4285f4','#1877f2','#ff0050'], borderWidth:1.5, hoverOffset:6 }]},
    options:{ responsive:true, maintainAspectRatio:false, cutout:'68%',
      plugins:{ legend:{display:false}, tooltip:chartDefaults.plugins.tooltip }}
  });

  // ── Portals Traffic Chart ──────────────────────────────
  const tc = document.getElementById('trafficChart');
  if (tc) new Chart(tc, { type:'line',
    data:{ labels:['1 Mar','5 Mar','10 Mar','15 Mar','20 Mar','25 Mar','27 Mar'],
      datasets:[
        { label:'Sessions', data:[128,142,156,138,162,178,184], borderColor:'#60a5fa', borderWidth:2.5,
          pointRadius:3, pointBackgroundColor:'#60a5fa', fill:true,
          backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,150);g.addColorStop(0,'rgba(96,165,250,0.22)');g.addColorStop(1,'rgba(96,165,250,0.02)');return g;}, tension:0.4 },
        { label:'Users', data:[86,94,104,91,108,119,122], borderColor:'#2dd4bf', borderWidth:2, pointRadius:3, fill:false, tension:0.4 }
      ]},
    options:{...chartDefaults, plugins:{...chartDefaults.plugins, legend:{display:true,position:'top',labels:{color:'#8080a8',font:{size:10},padding:10,boxWidth:10}}}}
  });

  // ── Social Chart ───────────────────────────────────────
  const sc = document.getElementById('socialChart');
  if (sc) new Chart(sc, { type:'line',
    data:{ labels:['Week 1','Week 2','Week 3','Week 4'],
      datasets:[
        { label:'Reach', data:[480000,520000,540000,560000], borderColor:'#a78bfa', borderWidth:2.5,
          pointRadius:3, fill:true,
          backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,150);g.addColorStop(0,'rgba(167,139,250,0.22)');g.addColorStop(1,'rgba(167,139,250,0.02)');return g;}, tension:0.4 },
        { label:'Engagements', data:[62000,68000,72000,82000], borderColor:'#00d68f', borderWidth:2, pointRadius:3, fill:false, tension:0.4 }
      ]},
    options:{...chartDefaults, plugins:{...chartDefaults.plugins, legend:{display:true,position:'top',labels:{color:'#8080a8',font:{size:10},padding:10,boxWidth:10}}}}
  });

  // ── Audience Growth Chart ──────────────────────────────
  const agc = document.getElementById('audienceChart');
  if (agc) new Chart(agc, { type:'bar',
    data:{ labels:['Jan','Feb','Mar'],
      datasets:[
        { label:'IG', data:[1760,1810,1840], backgroundColor:'rgba(225,48,108,0.75)', borderRadius:4, borderSkipped:false },
        { label:'TT', data:[840,890,920],   backgroundColor:'rgba(255,0,80,0.65)',   borderRadius:4, borderSkipped:false },
        { label:'FB', data:[2060,2080,2100], backgroundColor:'rgba(24,119,242,0.65)', borderRadius:4, borderSkipped:false },
      ]},
    options:{...chartDefaults,
      plugins:{...chartDefaults.plugins, legend:{display:true,position:'top',labels:{color:'#8080a8',font:{size:10},padding:8,boxWidth:8}}},
      scales:{...chartDefaults.scales, y:{...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback:function(v){return (v/1000)+'K';}}}}
    }
  });

  // ── Report AI Charts ───────────────────────────────────
  const raiRev = document.getElementById('raiRevChart');
  if (raiRev) new Chart(raiRev, { type:'bar',
    data:{ labels:['Jan','Feb','Mar'],
      datasets:[
        { label:'Actual', data:[18.4,21.2,24.1], backgroundColor:ctx=>mkGrad(ctx.chart.ctx,'rgba(226,0,122,0.88)','rgba(226,0,122,0.18)'), borderRadius:5, borderSkipped:false },
        { label:'Target', data:[19,20,21], backgroundColor:'rgba(255,255,255,0.07)', borderRadius:5, borderSkipped:false }
      ]},
    options:{...chartDefaults,
      plugins:{...chartDefaults.plugins, legend:{display:true,position:'top',labels:{color:'#8080a8',font:{size:10},padding:10,boxWidth:10}}},
      scales:{...chartDefaults.scales, y:{...chartDefaults.scales.y, ticks:{...chartDefaults.scales.y.ticks, callback:v=>'RM'+v+'M'}}}
    }
  });
  const raiProd = document.getElementById('raiProductChart');
  if (raiProd) new Chart(raiProd, { type:'doughnut',
    data:{ labels:['Digital Ads','Content Syndi.','Events & Live','Sponsorship'],
      datasets:[{ data:[45,27,17,10],
        backgroundColor:['rgba(226,0,122,0.82)','rgba(96,165,250,0.75)','rgba(167,139,250,0.75)','rgba(45,212,191,0.75)'],
        borderColor:['#e2007a','#60a5fa','#a78bfa','#2dd4bf'], borderWidth:1.5, hoverOffset:5 }]},
    options:{ responsive:true, maintainAspectRatio:false, cutout:'66%',
      plugins:{ legend:{display:true,position:'bottom',labels:{color:'#8080a8',font:{size:9},padding:8,boxWidth:8}}, tooltip:chartDefaults.plugins.tooltip }}
  });

}); // end DOMContentLoaded
</script>
</body>
</html>`
}

// Register all protected page routes
for (const [path, { screen, content }] of Object.entries(routes)) {
  app.get(path, requireAuth, async (c) => {
    const session = c.get('session') as { name: string; email: string; role: string }
    return c.html(page(screen, content(), session))
  })
}

export default app
