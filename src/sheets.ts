// ─── Google Sheets API (server-side, runs in Cloudflare Workers) ───────────
// Uses Google Service Account JWT auth (no googleapis npm — pure fetch + Web Crypto).

export interface SheetRow { [key: string]: string }

// ── Sign a JWT for Google Service Account ─────────────────────────────────
async function signJwt(serviceAccountJson: string): Promise<string> {
  const sa = JSON.parse(serviceAccountJson)
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
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

// ── Get an OAuth access token from Google ─────────────────────────────────
async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const jwt = await signJwt(serviceAccountJson)
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })
  if (!res.ok) throw new Error(`Token error: ${await res.text()}`)
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
