export function shell(_activeScreen: string, _activeSub: string, _bodyContent: string): string {
  return '';
}

export function topbar(screen: string): string {
  const titles: Record<string, { title: string; sub: string }> = {
    home:      { title: 'Home', sub: 'Unified Digital Performance Dashboard · All sources live' },
    overview:  { title: 'Overview', sub: 'All metrics at a glance · Updated 2 min ago' },
    ai:        { title: '<i class="fas fa-sparkles" style="color:var(--magenta);margin-right:6px"></i>Ask AI', sub: 'Natural language queries across all data sources' },
    digest:    { title: 'Executive Daily Digest', sub: 'AI-curated · 27 March 2025' },
    pipeline:  { title: 'Pipeline Health', sub: 'Pre-Sales · March 2025 · 87 active deals' },
    clients:   { title: 'Client Intelligence', sub: 'Pre-Sales · 348 active accounts' },
    salesperf: { title: 'Sales Performance', sub: 'Pre-Sales · March 2025 · 18 reps tracked' },
    revenue:   { title: 'Revenue Performance', sub: 'Post-Sales · FY2025 YTD · Google Sheets' },
    campaign:  { title: 'Campaign Performance', sub: 'Post-Sales · Direct Sales · Q1 2025' },
    ads:       { title: 'Ads Performance', sub: 'Post-Sales · Google Ads · Meta · TikTok' },
    gamanalytics: { title: '<i class="fab fa-google" style="color:#4285f4;margin-right:6px"></i>GAM Analytics', sub: 'Google Ad Manager · Live · Orders · Line Items · Ad Units · Reports' },
    portals:   { title: 'Portals Traffic Performance', sub: 'GA4 · Sessions · Engagement · Revenue/User' },
    social:    { title: 'Sprout Social Performance', sub: 'Reach · Impressions · Engagement · Growth' },
    upload:    { title: 'Manual Data Upload', sub: 'CSV / Excel → Google Sheets auto-transform' },
    apiconn:   { title: 'API Connections', sub: 'GAM · GA4 · BigQuery · TikTok Ads · Sprout Social' },
    setup:     { title: 'Setup & Integration Guide', sub: 'Google Sheets · APIs · Data Flow Architecture' },
    presales:  { title: 'Pre-Sales Dashboard', sub: 'Pipeline · Client Intelligence · Sales Performance' },
    postsales: { title: 'Post-Sales Dashboard', sub: 'Revenue · Campaign · Ads Performance' },
    traffic:   { title: 'Traffic Performance Dashboard', sub: 'Portals · Sprout Social Analytics' },
    data:      { title: 'Data Management', sub: 'Upload · Connect · Automate · Monitor' },
    blend:     { title: 'Data Blend', sub: 'Merge data sources for cross-source analysis' },
    reportai:  { title: 'Report AI', sub: 'Generate charts, KPI summaries and slide decks from your data' },
    canvas:    { title: 'Canvas', sub: 'Drag-and-drop pivot tables and charts from your data' },
    settings:  { title: 'Platform Settings', sub: 'Google Sheets · Users · Security · Notifications' },
  };

  const t = titles[screen] || { title: 'Dashboard', sub: '' };

  const extras: Record<string, string> = {
    home: `
      <button class="btn-ghost"><i class="fas fa-rotate"></i>Refresh</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    overview: `
      <button class="btn-ghost"><i class="fas fa-calendar"></i>Mar 2025</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    ai: `
      <button class="btn-ghost"><i class="fas fa-trash"></i>Clear Chat</button>
      <button class="btn-ghost"><i class="fas fa-bookmark"></i>Save</button>
      <button class="btn-primary"><i class="fab fa-microsoft"></i>Share to Teams</button>`,

    digest: `
      <button class="btn-ghost"><i class="fas fa-envelope"></i>Email</button>
      <button class="btn-ghost"><i class="fas fa-print"></i>Print</button>
      <button class="btn-primary"><i class="fab fa-microsoft"></i>Share to Teams</button>`,

    pipeline: `
      <button class="btn-ghost"><i class="fas fa-sliders"></i>Filters</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    clients: `
      <button class="btn-ghost"><i class="fas fa-magnifying-glass"></i>Search Client</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    salesperf: `
      <button class="btn-ghost"><i class="fas fa-calendar"></i>Mar 2025</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    revenue: `
      <button class="btn-ghost"><i class="fas fa-calendar"></i>FY2025</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    campaign: `
      <button class="btn-ghost"><i class="fas fa-sliders"></i>Filters</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    ads: `
      <button class="btn-ghost"><i class="fas fa-calendar"></i>Mar 2025</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    gamanalytics: `
      <button class="btn-ghost" onclick="loadGAMAnalytics()"><i class="fas fa-rotate"></i>Refresh Live</button>
      <button class="btn-ghost" onclick="exportOrdersCSV()"><i class="fas fa-download"></i>Export CSV</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    portals: `
      <button class="btn-ghost"><i class="fas fa-calendar"></i>Last 30d</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    social: `
      <button class="btn-ghost"><i class="fas fa-calendar"></i>Mar 2025</button>
      <button class="btn-ghost"><i class="fas fa-download"></i>Export</button>
      <button class="btn-primary" onclick="navigate('ai')"><i class="fas fa-sparkles"></i>Ask AI</button>`,

    upload: `
      <button class="btn-primary"><i class="fas fa-upload"></i>Upload Now</button>`,

    apiconn: `
      <button class="btn-ghost"><i class="fas fa-rotate"></i>Test All</button>
      <button class="btn-primary"><i class="fas fa-plus"></i>Add Source</button>`,

    setup: `
      <button class="btn-ghost"><i class="fas fa-download"></i>Export Guide</button>`,

    settings: `
      <button class="btn-ghost" onclick="navigate('home')"><i class="fas fa-arrow-left"></i>Back</button>
      <button class="btn-primary" onclick="saveAllSettings()"><i class="fas fa-floppy-disk"></i>Save All</button>`,
  };

  return `
    <div class="topbar">
      <div class="topbar-left">
        <div class="topbar-title">${t.title}</div>
        <div class="topbar-sub">
          <span class="dot dot-green dot-pulse"></span>
          ${t.sub}
        </div>
      </div>
      <div class="topbar-actions">
        ${extras[screen] || ''}
      </div>
    </div>
  `;
}
