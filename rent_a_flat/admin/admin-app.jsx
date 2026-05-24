// admin-app.jsx — main FlatNest Admin app

const ADM_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1A6B72",
  "dark": true,
  "density": "regular"
}/*EDITMODE-END*/;

function ADMApp() {
  const [tw, setTweak] = useTweaks(ADM_TWEAK_DEFAULTS);
  const t = fnTheme({ dark: tw.dark, accent: tw.accent });
  const [page, setPage] = React.useState('dashboard');
  const [search, setSearch] = React.useState('');

  // Page-level counts for sidebar badges
  const counts = {
    pending:  ADM_LISTINGS.filter(l => l.status === 'Pending').length,
    listings: ADM_LISTINGS.length,
    users:    ADM_USERS.length,
    reports:  ADM_REPORTS.length,
  };

  const pageMeta = {
    dashboard: { title: 'Dashboard',  crumb: 'Overview' },
    approvals: { title: 'Approvals',  crumb: 'Listings · Pending review' },
    listings:  { title: 'Listings',   crumb: 'Listings · All' },
    users:     { title: 'Users',      crumb: 'People · All' },
    reports:   { title: 'Reports',    crumb: 'Trust & Safety · Open' },
    analytics: { title: 'Analytics',  crumb: 'Insights · Last 14 days' },
  }[page];

  const pageEl = {
    dashboard: <ADMPageDashboard t={t} setPage={setPage} />,
    approvals: <ADMPageApprovals t={t} />,
    listings:  <ADMPageListings t={t} />,
    users:     <ADMPageUsers t={t} />,
    reports:   <ADMPageReports t={t} />,
    analytics: <ADMPageAnalytics t={t} />,
  }[page];

  return (
    <div style={{
      minHeight: '100vh', background: t.bg, color: t.ink,
      fontFamily: FN_FONT, display: 'flex',
    }}
    data-screen-label={`Admin · ${pageMeta.title}`}>
      <ADMSidebar t={t} page={page} setPage={setPage} counts={counts} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <ADMTopBar t={t} title={pageMeta.title} crumb={pageMeta.crumb} search={search} setSearch={setSearch} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {pageEl}
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={tw.accent}
          options={['#1A6B72', '#4F46E5', '#1F7A4E', '#6A2B7A', '#D96A3A']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Dark mode" value={tw.dark}
          onChange={(v) => setTweak('dark', v)} />
        <TweakSection label="Navigate" />
        <TweakRadio label="Page" value={page} options={['dashboard', 'approvals']}
          onChange={setPage} />
        <TweakRadio label="More" value={page} options={['listings', 'users']}
          onChange={setPage} />
        <TweakRadio label="More 2" value={page} options={['reports', 'analytics']}
          onChange={setPage} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ADMApp />);
