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

// ── Internal helper: poll an operation and fetch result rows ────────────────
async function _pollAndFetchRows(
  token: string,
  networkCode: string,
  reportId: string,
  operationName: string,
  initialDone: boolean,
  initialOpData: Record<string, unknown>
): Promise<{ rows: Record<string, string | number>[]; totalRows: number }> {
  let done = initialDone
  let opData: Record<string, unknown> = initialOpData
  let opName = operationName

  // Poll until done (max 18 attempts = ~90 seconds with 5s intervals)
  for (let i = 0; i < 18 && !done; i++) {
    await new Promise(r => setTimeout(r, 5000))
    const pollRes = await fetch(`https://admanager.googleapis.com/v1/${opName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!pollRes.ok) break
    opData = await pollRes.json()
    done = (opData.done as boolean) || false
  }

  if (!done || !opData.response) {
    throw new Error('Report did not complete in time.')
  }

  // Extract result resource name: "networks/NETWORK/reports/REPORT_ID/results/RESULT_ID"
  const reportResult = (opData.response as any)?.reportResult as string | undefined
  if (!reportResult) throw new Error('No report result returned.')

  // Fetch rows (paginate with pageSize=5000)
  const allRows: Record<string, string | number>[] = []
  let pageToken: string | undefined
  let totalRows = 0

  do {
    const url = new URL(`https://admanager.googleapis.com/v1/${reportResult}:fetchRows`)
    url.searchParams.set('pageSize', '5000')
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const rowsRes = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } })
    if (!rowsRes.ok) {
      const txt = await rowsRes.text()
      throw new Error(`GAM fetch rows error (${rowsRes.status}): ${txt}`)
    }

    // New API response format: rows have dimensionValues and metricValueGroups
    const rowsData: {
      rows?: {
        dimensionValues?: ({ stringValue?: string; intValue?: string } | null)[];
        metricValueGroups?: { primaryValues?: ({ intValue?: string; doubleValue?: string } | null)[] }[];
      }[];
      totalRowCount?: number;
      nextPageToken?: string;
    } = await rowsRes.json()

    totalRows = rowsData.totalRowCount || totalRows
    pageToken = rowsData.nextPageToken

    for (const row of rowsData.rows || []) {
      const dims = row.dimensionValues || []
      const metrics = row.metricValueGroups?.[0]?.primaryValues || []
      allRows.push({
        // Dimension 0: ORDER_ID (int)
        orderId: dims[0]?.intValue || dims[0]?.stringValue || '',
        // Dimension 1: LINE_ITEM_ID (int)
        lineItemId: dims[1]?.intValue || dims[1]?.stringValue || '',
        // Metric 0: AD_SERVER_IMPRESSIONS
        impressions: parseInt(metrics[0]?.intValue || '0') || 0,
        // Metric 1: AD_SERVER_CLICKS
        clicks: parseInt(metrics[1]?.intValue || '0') || 0,
      })
    }
  } while (pageToken)

  return { rows: allRows, totalRows }
}

// ── Run a report and poll for results (for saved reports) ─────────────────
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
  let opData: Record<string, unknown> = operation as unknown as Record<string, unknown>

  for (let i = 0; i < 12 && !done; i++) {
    await new Promise(r => setTimeout(r, 5000))
    const pollRes = await fetch(`${GAM_BASE}/${opName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!pollRes.ok) break
    opData = await pollRes.json()
    done = (opData.done as boolean) || false
  }

  if (!done || !opData.response) {
    throw new Error('Report did not complete in time. Try again in a moment.')
  }

  // 3. Fetch report result rows (legacy format for saved reports)
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

// ── Run an ad-hoc delivery metrics report (all-time impressions + clicks) ──
// Returns a map: lineItemId → { impressions, clicks }
// and orderMetrics: orderId → { impressions, clicks }
export async function getGAMDeliveryMetrics(
  saJson: string,
  networkCode: string
): Promise<{
  lineItemMetrics: Record<string, { impressions: number; clicks: number }>;
  orderMetrics: Record<string, { impressions: number; clicks: number }>;
}> {
  const token = await getGAMAccessToken(saJson)

  // 1. Create an ad-hoc report: ORDER_ID + LINE_ITEM_ID × IMPRESSIONS + CLICKS, ALL_TIME
  const createUrl = `${GAM_BASE}/networks/${networkCode}/reports`
  const reportBody = {
    report: {
      displayName: 'BI Builder Delivery Metrics (auto)',
      visibility: 'HIDDEN',
      reportDefinition: {
        dimensions: ['ORDER_ID', 'LINE_ITEM_ID'],
        metrics: ['AD_SERVER_IMPRESSIONS', 'AD_SERVER_CLICKS'],
        dateRange: { relative: 'ALL_TIME' },
        reportType: 'HISTORICAL',
      },
    },
  }

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(reportBody),
  })
  if (!createRes.ok) {
    const txt = await createRes.text()
    throw new Error(`GAM create metrics report error (${createRes.status}): ${txt}`)
  }
  const created: { name: string; reportId?: string } = await createRes.json()
  const reportName = created.name // e.g. networks/12345/reports/6789

  // 2. Run the report
  const runUrl = `${GAM_BASE}/${reportName}:run`
  const runRes = await fetch(runUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: '{}',
  })
  if (!runRes.ok) {
    const txt = await runRes.text()
    throw new Error(`GAM run metrics report error (${runRes.status}): ${txt}`)
  }
  const operation: { name: string; done?: boolean; response?: Record<string, unknown> } = await runRes.json()

  // 3. Poll + fetch rows
  const { rows } = await _pollAndFetchRows(
    token,
    networkCode,
    '',
    operation.name,
    operation.done || false,
    operation as unknown as Record<string, unknown>
  )

  // 4. Build lookup maps
  const lineItemMetrics: Record<string, { impressions: number; clicks: number }> = {}
  const orderMetrics: Record<string, { impressions: number; clicks: number }> = {}

  for (const row of rows) {
    const liId = String(row.lineItemId || '')
    const oId  = String(row.orderId || '')
    const impr = Number(row.impressions) || 0
    const clk  = Number(row.clicks) || 0

    if (liId) {
      if (!lineItemMetrics[liId]) lineItemMetrics[liId] = { impressions: 0, clicks: 0 }
      lineItemMetrics[liId].impressions += impr
      lineItemMetrics[liId].clicks += clk
    }
    if (oId) {
      if (!orderMetrics[oId]) orderMetrics[oId] = { impressions: 0, clicks: 0 }
      orderMetrics[oId].impressions += impr
      orderMetrics[oId].clicks += clk
    }
  }

  return { lineItemMetrics, orderMetrics }
}

