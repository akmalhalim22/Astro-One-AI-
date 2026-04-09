# Data Debugging Guide - Revenue, Campaign & GAM Analytics

## Problem
Revenue, Campaign, and GAM Analytics tabs are not showing any numbers despite data sources being connected.

## Solution Deployed
I've added comprehensive debug logging and error handling to help identify the issue. The new version is now live.

---

## Debug Steps - Follow These in Order

### Step 1: Open Browser Console
1. Visit: https://astro-one-ai.pages.dev
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Go to **Console** tab
4. Keep this open while testing

### Step 2: Test Revenue Tab
1. Navigate to: https://astro-one-ai.pages.dev/#revenue
2. Watch the console for these messages:
   - ✅ **Success**: `Revenue data loaded: {count: X, debug: {...}, sampleRow: {...}}`
   - ❌ **Error**: `Revenue API error:` or `Revenue load error:`

3. **If you see an error**, check:
   - Error message content
   - `debug.columns` array - shows actual column names from your sheet
   - `sampleRow` object - shows first row of data

4. **Screenshot** the console output and share it with me.

### Step 3: Test Campaign Tab
1. Navigate to: https://astro-one-ai.pages.dev/#campaign
2. Watch the console for:
   - ✅ **Success**: `Campaign data loaded: {count: X, debug: {...}, sampleRow: {...}}`
   - ❌ **Error**: `Campaign API error:` or `Campaign load error:`

3. **Screenshot** the console output.

### Step 4: Test GAM Analytics Tab
1. Navigate to: https://astro-one-ai.pages.dev/#gamanalytics
2. Watch the console for:
   - ✅ **Success**: `GAM data loaded: {orders: X, lineItems: Y, network: "...", ...}`
   - ❌ **Error**: `GAM API error: {...}`

3. **Screenshot** the console output.

### Step 5: Test API Endpoints Directly

Open these URLs in new browser tabs (you need to be logged in):

**Test Sheets Connection:**
```
https://astro-one-ai.pages.dev/api/sheets/test
```
Expected: `{"ok": true, "sheetId": "...", "tabs": [...], "count": X}`

**Test GAM Connection:**
```
https://astro-one-ai.pages.dev/api/gam/test
```
Expected: `{"ok": true, "network": {"displayName": "...", ...}}`

**Test Revenue Data:**
```
https://astro-one-ai.pages.dev/api/data/revenue
```
Expected:
```json
{
  "ok": true,
  "rows": [...],
  "count": X,
  "tab": "Revenue",
  "debug": {
    "sampleRow": {...},
    "columns": ["Column1", "Column2", ...],
    "columnCount": X
  }
}
```

**Test Campaign Data:**
```
https://astro-one-ai.pages.dev/api/data/campaign
```
Expected: Similar to revenue endpoint above

**Test GAM Summary:**
```
https://astro-one-ai.pages.dev/api/gam/summary
```
Expected:
```json
{
  "ok": true,
  "networkCode": "...",
  "orders": {"total": X, "byStatus": {...}},
  "lineItems": {"total": Y, ...}
}
```

---

## Common Issues & Solutions

### Issue 1: "Google Sheets not configured"
**Cause**: Sheets connection not set up or invalid.

**Solution**:
1. Go to: https://astro-one-ai.pages.dev/#apiconn
2. Find "Google Sheets" card
3. Click "Config"
4. Enter:
   - **Spreadsheet ID**: `1Y2T_K8kYGxJZulx-R6Cii6tMY8q91euqoBHhn0YdE1Y`
   - **Service Account JSON**: [Paste your JSON]
5. Click "Save"
6. Click "Test" → Should show "Connected"

### Issue 2: "GAM not configured"
**Cause**: GAM connection not set up or invalid.

**Solution**:
1. Go to: https://astro-one-ai.pages.dev/#apiconn
2. Find "Google Ad Manager" card
3. Click "Config"
4. Enter:
   - **Network Code**: [Your GAM network code]
   - **Service Account JSON**: [Paste your JSON]
5. Click "Save"
6. Click "Test" → Should show network name

### Issue 3: "No data in Revenue/Campaign tab"
**Cause**: Sheet tabs are empty or have wrong names.

**Solution**:
1. Check your Google Sheet: https://docs.google.com/spreadsheets/d/1Y2T_K8kYGxJZulx-R6Cii6tMY8q91euqoBHhn0YdE1Y/edit
2. Verify you have tabs named:
   - **Revenue** (for Revenue screen)
   - **Campaign** (for Campaign screen)
3. Verify these tabs have:
   - Row 1: Column headers
   - Row 2+: Data rows
4. Check that the service account email has Editor/Viewer access to the sheet

### Issue 4: Column name mismatch
**Cause**: The screen expects certain column names, but your sheet has different names.

**Current Expected Columns**:

**Revenue Tab**:
- `Portal` or `portal`
- `Financial Year` or `FinancialYear` or `FY`
- `Month` or `Revenue Month`
- `Revenue Type` or `RevenueType` or `Type`
- `Revenue` or `Total` (numeric)
- `Target` (numeric)

**Campaign Tab**:
- `AdvertiserCompany` or `Advertiser`
- `campaignType` or `Campaign Type` or `CampaignType`
- `Platform`
- `DealType` or `Deal Type`
- `ProductCategory` or `Product Category`
- `Financial Year` or `FinancialYear` or `FY`
- `Month`
- `Total` or `Revenue` (numeric)

**Solution**: Once you share the console output showing `debug.columns`, I can update the code to match your actual column names.

### Issue 5: "403 Forbidden" or "Permission denied"
**Cause**: Service account doesn't have access to the spreadsheet or GAM network.

**Solution for Sheets**:
1. Open your Google Sheet
2. Click "Share" button
3. Add service account email: `gam-api-dashboard-user@gam-api-dashboard-492502.iam.gserviceaccount.com`
4. Give "Editor" or "Viewer" permission
5. Save

**Solution for GAM**:
1. Log into GAM Admin
2. Go to Admin → Access & Authorization → Users
3. Add service account email
4. Give "Reporting" or "Read-only" role
5. Save

---

## What to Share With Me

Please provide:

1. **Console screenshots** from all three tabs (Revenue, Campaign, GAM Analytics)
2. **API endpoint responses** (copy-paste the JSON from the browser)
3. **Column headers** from your Google Sheet:
   - What are the column names in row 1 of your Revenue tab?
   - What are the column names in row 1 of your Campaign tab?
4. **Sample data structure**: Share 1-2 rows of data (remove sensitive info) so I can see the format

With this information, I can:
- Update the column mappings to match your exact sheet structure
- Fix any data parsing issues
- Ensure all visualizations work correctly

---

## New Features in This Update

✅ **Enhanced Error Messages**: More descriptive errors with context
✅ **Console Logging**: Detailed logs showing data structure and column names
✅ **Debug Info**: API responses now include sample data and column list
✅ **Empty Data Detection**: Specific messages for "no data" vs "not configured"
✅ **Error Tracing**: Full error stack traces for debugging

---

## Deployment Details

- **Commit**: `f3fccd0` - "Add comprehensive debug logging and error handling"
- **Deployment**: https://333bd979.astro-one-ai.pages.dev
- **Production**: https://astro-one-ai.pages.dev
- **Build Size**: 499.96 kB

---

## Next Steps

1. **Follow the debug steps above** and collect the console output
2. **Share the information** with me (screenshots, API responses, column names)
3. **I will update the code** to match your exact data structure
4. **Redeploy** with the fixes
5. **Verify** all tabs show data correctly

The platform is now instrumented to show us exactly what's happening. Let's use this information to fix the column mappings and get your dashboards working! 🚀
