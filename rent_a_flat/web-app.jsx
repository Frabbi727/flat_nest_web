// web-app.jsx — FlatNest WEB design canvas composition

const FN_WEB_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#1A6B72"
}/*EDITMODE-END*/;

// Browser frame wrapping a screen at a fixed width (1440 desktop / 1280 dashboards).
function FNWBrowserFrame({ url, width, height, children }) {
  return (
    <ChromeWindow
      width={width}
      height={height}
      url={url}
      tabs={[{ title: 'FlatNest' }, { title: 'Gmail' }]}
      activeIndex={0}
    >
      <div style={{ width, minHeight: height - 84 }}>{children}</div>
    </ChromeWindow>
  );
}

function WebApp() {
  const [tweaks, setTweak] = useTweaks(FN_WEB_DEFAULTS);
  const t = fnTheme({ dark: tweaks.dark, accent: tweaks.accent });

  React.useEffect(() => {
    const id = 'fnw-base';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      ::-webkit-scrollbar { display: none; }
      input, textarea, button { font-family: ${FN_FONT}; }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <>
      <DesignCanvas>
        <DCSection id="hero" title="Hero · Landing page" subtitle="Primary screen — the marketing front door">
          <DCArtboard id="landing" label="Landing page · public marketing" width={1440} height={2400}>
            <FNWBrowserFrame url="flatnest.com" width={1440} height={2400}>
              <FNWLanding t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
        </DCSection>

        <DCSection id="renter" title="Renter app" subtitle="Browse → detail · public access, no sign-in required">
          <DCArtboard id="browse" label="Browse · map + grid" width={1440} height={1100}>
            <FNWBrowserFrame url="flatnest.com/browse" width={1440} height={1100}>
              <FNWBrowse t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
          <DCArtboard id="detail" label="Listing detail" width={1440} height={2100}>
            <FNWBrowserFrame url="flatnest.com/flat/sunlit-3bhk-dhanmondi" width={1440} height={2100}>
              <FNWListingDetailWeb t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
        </DCSection>

        <DCSection id="auth" title="Auth" subtitle="Sign-in / register · split-screen editorial">
          <DCArtboard id="signin" label="Sign in · split layout" width={1440} height={820}>
            <FNWBrowserFrame url="flatnest.com/signin" width={1440} height={820}>
              <FNWAuth t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
        </DCSection>

        <DCSection id="owner" title="Owner dashboard" subtitle="Manage listings, analytics, inquiries">
          <DCArtboard id="dashboard" label="Dashboard · KPIs + chart + table" width={1440} height={1100}>
            <FNWBrowserFrame url="flatnest.com/owner/dashboard" width={1440} height={1100}>
              <FNWOwnerDash t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
          <DCArtboard id="create" label="Post a listing · step 3 of 5" width={1440} height={1180}>
            <FNWBrowserFrame url="flatnest.com/owner/post" width={1440} height={1180}>
              <FNWOwnerCreate t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
        </DCSection>

        <DCSection id="admin" title="Admin" subtitle="Moderation queue · approve / reject listings">
          <DCArtboard id="admin-mod" label="Moderation queue" width={1440} height={900}>
            <FNWBrowserFrame url="flatnest.com/admin/queue" width={1440} height={900}>
              <FNWAdmin t={t} />
            </FNWBrowserFrame>
          </DCArtboard>
        </DCSection>

        <DCSection id="responsive" title="Responsive" subtitle="Mobile-web · tablet · desktop breakpoints">
          <DCArtboard id="mobile-tablet" label="Mobile + tablet + breakpoint guide" width={1280} height={900}>
            <div style={{ width: 1280, height: 900, background: '#F4F0EA' }}>
              <FNWMobileWeb t={t} />
            </div>
          </DCArtboard>
        </DCSection>

        <DCPostIt top={100} left={40} rotate={-3} width={210}>
          Hero shot is the LANDING PAGE — first artboard. Click any to focus fullscreen.
        </DCPostIt>
        <DCPostIt top={140} right={40} rotate={2} width={210}>
          Toggle dark mode + recolor accent in the Tweaks panel (bottom-right) →
        </DCPostIt>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={tweaks.dark}
          onChange={(v) => setTweak('dark', v)} />
        <TweakColor label="Accent" value={tweaks.accent}
          options={['#1A6B72', '#4F46E5', '#1F7A4E', '#6A2B7A', '#1C1C1E']}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WebApp />);
