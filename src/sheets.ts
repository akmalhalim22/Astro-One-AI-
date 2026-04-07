// ─── Google Sheets + Google Ad Manager API ────────────────────────────────
// Runs in Cloudflare Workers — pure fetch + Web Crypto, no npm libraries.

export interface SheetRow { [key: string]: string }

// ── Sign a JWT for Google Service Account ─────────────────────────────────
// scope param lets us reuse this for both Sheets and Ad Manager
async function signJwt(serviceAccountJson: string, scope: string): Promise<string> {
  const sa = JSON.parse(serviceAccountJson)
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: sa.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  const enc = (obj: object) => btoa(JSON.stringify(obj)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
  const sigInput = `${enc(header)}.${enc(payload)}`

  // Import private key (PEM → CryptoKey)
  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')
  const keyBytes = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0))
  const key = await crypto.subtle.importKey(
    'pkcs8', keyBytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  )
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(sigInput))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
  return `${sigInput}.${sigB64}`
}

// ── Get an OAuth access token — Sheets scope ─────────────────────────────
async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const jwt = await signJwt(serviceAccountJson, 'https://www.googleapis.com/auth/spreadsheets')
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })
  if (!res.ok) throw new Error(`Token error: ${await res.text()}`)
  const data: { access_token: string } = await res.json()
  return data.access_token
}

// ── Get an OAuth access token — Ad Manager scope (READ-ONLY) ─────────────
export async function getGAMAccessToken(serviceAccountJson: string): Promise<string> {
  // Use read-only scope — GAM data is never written from this platform
  const jwt = await signJwt(serviceAccountJson, 'https://www.googleapis.com/auth/admanager.readonly')
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GAM token error: ${txt}`)
  }
  const data: { access_token: string } = await res.json()
  return data.access_token
}

// ── Read a named range from a Sheet ───────────────────────────────────────
export async function readSheet(
  serviceAccountJson: string,
  sheetId: string,
  range: string,
): Promise<SheetRow[]> {
  const token = await getAccessToken(serviceAccountJson)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sheets read error (${res.status}): ${err}`)
  }
  const data: { values?: string[][] } = await res.json()
  const rows = data.values || []
  if (rows.length < 2) return []
  const headers = rows[0].map(h => h.trim())
  return rows.slice(1).map(row => {
    const obj: SheetRow = {}
    headers.forEach((h, i) => { obj[h] = (row[i] || '').trim() })
    return obj
  })
}

// ── Append rows to a Sheet ────────────────────────────────────────────────
export async function appendSheet(
  serviceAccountJson: string,
  sheetId: string,
  range: string,
  values: string[][],
): Promise<void> {
  const token = await getAccessToken(serviceAccountJson)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values }),
  })
  if (!res.ok) throw new Error(`Sheets append error: ${await res.text()}`)
}

// ── List sheet tab names ──────────────────────────────────────────────────
export async function listSheetTabs(serviceAccountJson: string, sheetId: string): Promise<string[]> {
  const token = await getAccessToken(serviceAccountJson)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error(`Sheets list error: ${await res.text()}`)
  const data: { sheets: { properties: { title: string } }[] } = await res.json()
  return data.sheets.map(s => s.properties.title)
}

// ── Aggregate helpers ─────────────────────────────────────────────────────
export function sumCol(rows: SheetRow[], col: string): number {
  return rows.reduce((s, r) => s + (parseFloat(r[col]?.replace(/[^0-9.-]/g,'') || '0') || 0), 0)
}

export function countBy(rows: SheetRow[], col: string): Record<string, number> {
  return rows.reduce((acc: Record<string,number>, r) => {
    const v = r[col] || 'Unknown'
    acc[v] = (acc[v] || 0) + 1
    return acc
  }, {})
}

export function groupSum(rows: SheetRow[], groupCol: string, valueCol: string): Record<string, number> {
  return rows.reduce((acc: Record<string,number>, r) => {
    const k = r[groupCol] || 'Unknown'
    acc[k] = (acc[k] || 0) + (parseFloat(r[valueCol]?.replace(/[^0-9.-]/g,'') || '0') || 0)
    return acc
  }, {})
}

export function fmtRM(n: number): string {
  if (n >= 1_000_000) return 'RM ' + (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return 'RM ' + (n / 1_000).toFixed(1) + 'K'
  return 'RM ' + n.toFixed(0)
}

export function pct(a: number, b: number): string {
  if (!b) return '0%'
  return (a / b * 100).toFixed(1) + '%'
}

// ═══════════════════════════════════════════════════════════════════════════
//   GOOGLE AD MANAGER (GAM) REST API v1 (Beta)
//   Base: https://admanager.googleapis.com/v1/networks/{networkCode}
// ═══════════════════════════════════════════════════════════════════════════

const GAM_BASE = 'https://admanager.googleapis.com/v1'

export interface GAMNetwork {
  name: string
  displayName: string
  networkCode: string
  propertyCode: string
  timeZone: string
  currencyCode: string
}

export interface GAMOrder {
  name: string
  displayName: string
  status: string
  advertiserId?: string
  agencyId?: string
  totalBudget?: { currencyCode: string; units: string }
  startTime?: string
  endTime?: string
}

export interface GAMLineItem {
  name: string
  displayName: string
  orderId?: string
  status: string
  lineItemType?: string
  startTime?: string
  endTime?: string
  budget?: { currencyCode: string; units: string }
  impressionsDelivered?: string
  clicksDelivered?: string
}

export interface GAMReport {
  name: string
  displayName?: string
  reportDefinition?: Record<string, unknown>
}

// ── Get network info ──────────────────────────────────────────────────────
export async function getGAMNetwork(saJson: string, networkCode: string): Promise<GAMNetwork> {
  const token = await getGAMAccessToken(saJson)
  const url = `${GAM_BASE}/networks/${networkCode}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GAM network error (${res.status}): ${txt}`)
  }
  return res.json()
}

// ── List orders ───────────────────────────────────────────────────────────
export async function listGAMOrders(
  saJson: string,
  networkCode: string,
  pageSize = 50
): Promise<GAMOrder[]> {
  const token = await getGAMAccessToken(saJson)
  const url = `${GAM_BASE}/networks/${networkCode}/orders?pageSize=${pageSize}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GAM orders error (${res.status}): ${txt}`)
  }
  const data: { orders?: GAMOrder[] } = await res.json()
  return data.orders || []
}

// ── List line items ───────────────────────────────────────────────────────
export async function listGAMLineItems(
  saJson: string,
  networkCode: string,
  pageSize = 50
): Promise<GAMLineItem[]> {
  const token = await getGAMAccessToken(saJson)
  const url = `${GAM_BASE}/networks/${networkCode}/lineItems?pageSize=${pageSize}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GAM lineItems error (${res.status}): ${txt}`)
  }
  const data: { lineItems?: GAMLineItem[] } = await res.json()
  return data.lineItems || []
}

// ── List ad units ─────────────────────────────────────────────────────────
export async function listGAMAdUnits(
  saJson: string,
  networkCode: string,
  pageSize = 50
): Promise<{ name: string; displayName: string; adUnitCode?: string; status?: string }[]> {
  const token = await getGAMAccessToken(saJson)
  const url = `${GAM_BASE}/networks/${networkCode}/adUnits?pageSize=${pageSize}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GAM adUnits error (${res.status}): ${txt}`)
  }
  const data: { adUnits?: { name: string; displayName: string; adUnitCode?: string; status?: string }[] } = await res.json()
  return data.adUnits || []
}

// ── List reports (saved reports) ──────────────────────────────────────────
export async function listGAMReports(
  saJson: string,
  networkCode: string,
  pageSize = 20
): Promise<GAMReport[]> {
  const token = await getGAMAccessToken(saJson)
  const url = `${GAM_BASE}/networks/${networkCode}/reports?pageSize=${pageSize}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GAM reports error (${res.status}): ${txt}`)
  }
  const data: { reports?: GAMReport[] } = await res.json()
  return data.reports || []
}

// ── Run a report and poll for results ─────────────────────────────────────
export async function runGAMReport(
  saJson: string,
  networkCode: string,
  reportId: string
): Promise<{ rows: Record<string, string>[]; columnNames: string[] }> {
  const token = await getGAMAccessToken(saJson)

  // 1. Trigger report run
  const runUrl = `${GAM_BASE}/networks/${networkCode}/reports/${reportId}:run`
  const runRes = await fetch(runUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: '{}',
  })
  if (!runRes.ok) {
    const txt = await runRes.text()
    throw new Error(`GAM run report error (${runRes.status}): ${txt}`)
  }
  const operation: { name: string; done?: boolean; response?: Record<string, unknown> } = await runRes.json()

  // 2. Poll until done (max 12 attempts = ~60 seconds)
  let opName = operation.name
  let done = operation.done || false
  let opData = operation

  for (let i = 0; i < 12 && !done; i++) {
    await new Promise(r => setTimeout(r, 5000))
    const pollRes = await fetch(`${GAM_BASE}/${opName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!pollRes.ok) break
    opData = await pollRes.json()
    done = opData.done || false
  }

  if (!done || !opData.response) {
    throw new Error('Report did not complete in time. Try again in a moment.')
  }

  // 3. Fetch report result rows
  const resultToken = (opData.response as any)?.reportResult
  if (!resultToken) throw new Error('No report result returned.')

  const rowsUrl = `${GAM_BASE}/networks/${networkCode}/reports/${reportId}/results:fetchRows?reportResult=${encodeURIComponent(resultToken)}`
  const rowsRes = await fetch(rowsUrl, { headers: { Authorization: `Bearer ${token}` } })
  if (!rowsRes.ok) {
    const txt = await rowsRes.text()
    throw new Error(`GAM fetch rows error (${rowsRes.status}): ${txt}`)
  }

  const rowsData: { rows?: { dimensionValues?: {value:string}[]; metricValues?: {value:string}[] }[]; columnNames?: string[] } = await rowsRes.json()
  const columnNames = rowsData.columnNames || []
  const rows = (rowsData.rows || []).map(r => {
    const obj: Record<string, string> = {}
    const vals = [...(r.dimensionValues || []), ...(r.metricValues || [])]
    columnNames.forEach((col, i) => { obj[col] = vals[i]?.value || '' })
    return obj
  })
  return { rows, columnNames }
}

