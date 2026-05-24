// web-screens-other.jsx — Auth, Owner Dashboard, Owner Create Listing, Admin, Mobile-web

// ═════════════════════════════════════════════════════════════════
// 4. SIGN IN / REGISTER — split-screen editorial
// ═════════════════════════════════════════════════════════════════
function FNWAuth({ t }) {
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT, minHeight: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 720 }}>
        {/* LEFT — form */}
        <div style={{ padding: '40px 56px', display: 'flex', flexDirection: 'column' }}>
          <FNWLogo size={32} t={t} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 420 }}>
            <h1 style={{ fontSize: 42, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1, margin: 0 }}>
              Welcome back to FlatNest.
            </h1>
            <div style={{ fontSize: 15, color: t.inkMid, marginTop: 12, lineHeight: 1.6 }}>
              Sign in to message owners, save flats, and pick up where you left off.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 36 }}>
              <FNWInput t={t} label="Email" defaultValue="rashid.k@example.com" type="email" />
              <FNWInput t={t} label="Password" defaultValue="•••••••••••" type="password"
                trailing={<a style={{ fontSize: 12, fontWeight: 600, color: t.primary, cursor: 'pointer' }}>Forgot?</a>} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: t.primary, width: 16, height: 16 }} />
              <span style={{ fontSize: 13, color: t.inkMid }}>Keep me signed in on this device</span>
            </div>

            <FNWButton t={t} kind="accent" size="lg" style={{ marginTop: 24 }} full>Sign in</FNWButton>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
              <div style={{ flex: 1, height: 1, background: t.borderSoft }} />
              <div style={{ fontSize: 11, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 0.6 }}>or</div>
              <div style={{ flex: 1, height: 1, background: t.borderSoft }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {[
                ['Google', '🇬'],
                ['Apple', ''],
                ['Facebook', 'ƒ'],
              ].map(([name, glyph]) => (
                <FNWButton key={name} t={t} kind="outline" size="md" full
                  leading={<span style={{ fontWeight: 700, fontSize: 16 }}>{glyph}</span>}>
                  {name}
                </FNWButton>
              ))}
            </div>

            <div style={{ marginTop: 32, fontSize: 13, color: t.inkMid }}>
              New to FlatNest? <a style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>Create an account →</a>
            </div>
          </div>
          <div style={{ fontSize: 12, color: t.inkSoft }}>
            By signing in you agree to our <a style={{ color: t.ink, cursor: 'pointer' }}>Terms</a> and <a style={{ color: t.ink, cursor: 'pointer' }}>Privacy Policy</a>.
          </div>
        </div>

        {/* RIGHT — visual */}
        <div style={{ position: 'relative', background: t.primary, overflow: 'hidden' }}>
          <FNWPhoto src={LISTINGS[2].photo} style={{ position: 'absolute', inset: 0, opacity: 0.78 }} />
          <div style={{ position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, ${withAlpha(t.primary, 0.4)} 0%, ${withAlpha(t.primary, 0.8)} 100%)` }} />
          <div style={{
            position: 'absolute', bottom: 56, left: 56, right: 56, color: '#fff',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, opacity: 0.8 }}>FROM THE COMMUNITY</div>
            <blockquote style={{
              fontSize: 28, fontWeight: 600, lineHeight: 1.3, letterSpacing: -0.5,
              margin: '20px 0 28px 0', textWrap: 'balance',
            }}>
              "Found my flat in Banani in three days — chatted with the owner directly, visited the same weekend, signed the lease that Monday."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FNWAvatar initials="FM" size={44} color="rgba(255,255,255,0.2)" t={{ ...t, ink: '#fff' }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Faisal Mahmud</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Software engineer · Banani</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FNWInput({ t, label, defaultValue, type = 'text', placeholder, trailing }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{label}</label>
        {trailing}
      </div>
      <input type={type} defaultValue={defaultValue} placeholder={placeholder}
        style={{
          width: '100%', height: 48, padding: '0 16px',
          borderRadius: 10, background: t.surface,
          border: `1px solid ${t.border}`, outline: 'none',
          fontSize: 14, color: t.ink, fontFamily: FN_FONT,
          boxSizing: 'border-box',
        }} />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 5. OWNER DASHBOARD — KPI cards, performance chart, listings table
// ═════════════════════════════════════════════════════════════════
function FNWOwnerDash({ t }) {
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT, minHeight: '100%' }}>
      <FNWTopNav t={t} variant="browse" signedIn role="owner" />

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        {/* sidebar */}
        <FNWOwnerSidebar t={t} active="dash" />

        {/* main */}
        <div style={{ padding: '32px 40px 56px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 13, color: t.inkMid, marginBottom: 4 }}>Welcome back, Tahmid</div>
              <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6, margin: 0 }}>Dashboard</h1>
            </div>
            <FNWButton t={t} kind="accent" size="md" leading={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            }>Post new listing</FNWButton>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Active listings', value: '4', delta: '+1', deltaKind: 'success', icon: '🏠' },
              { label: 'Views this week', value: '1,284', delta: '↑ 18%', deltaKind: 'success', icon: '👁' },
              { label: 'New inquiries', value: '23', delta: '6 unread', deltaKind: 'warning', icon: '💬' },
              { label: 'Conversion rate', value: '4.2%', delta: '↑ 0.6pp', deltaKind: 'success', icon: '📈' },
            ].map((k, i) => (
              <div key={i} style={{
                padding: 20, borderRadius: 14, background: t.surface, border: `1px solid ${t.borderSoft}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 13, color: t.inkMid, fontWeight: 500 }}>{k.label}</div>
                  <div style={{ fontSize: 16 }}>{k.icon}</div>
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: t.ink, letterSpacing: -0.6, marginBottom: 8 }}>{k.value}</div>
                <FNWBadge t={t} kind={k.deltaKind === 'success' ? 'active' : 'pending'}>{k.delta}</FNWBadge>
              </div>
            ))}
          </div>

          {/* Performance + Inbox split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 28 }}>
            {/* Chart */}
            <div style={{ padding: 24, borderRadius: 14, background: t.surface, border: `1px solid ${t.borderSoft}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.ink }}>Performance</div>
                  <div style={{ fontSize: 12, color: t.inkMid, marginTop: 2 }}>Views and inquiries · Last 14 days</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['7d', '14d', '30d', '90d'].map((d) => (
                    <FNWChip key={d} t={t} active={d === '14d'} size="sm">{d}</FNWChip>
                  ))}
                </div>
              </div>
              <FNWChart t={t} />
              <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 12, color: t.inkMid }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: t.primary }} /> Views
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: t.secondary }} /> Inquiries
                </div>
              </div>
            </div>

            {/* Inbox preview */}
            <div style={{ padding: 24, borderRadius: 14, background: t.surface, border: `1px solid ${t.borderSoft}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.ink }}>Recent inquiries</div>
                <a style={{ fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }}>View all</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { ini: 'RK', name: 'Rashid K.', listing: 'Sunlit 3BHK · Dhanmondi', msg: 'Is the unit still available?', time: '12m' },
                  { ini: 'FM', name: 'Faria M.', listing: 'Studio loft · Gulshan 2', msg: 'Can I visit this weekend?', time: '1h' },
                  { ini: 'IS', name: 'Imran S.', listing: 'Sunlit 3BHK · Dhanmondi', msg: 'What\'s included in the rent?', time: '3h' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <FNWAvatar initials={m.ini} size={36} color={t.primarySoft} t={t} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: t.inkSoft }}>{m.time}</div>
                      </div>
                      <div style={{ fontSize: 11, color: t.inkSoft }}>{m.listing}</div>
                      <div style={{ fontSize: 13, color: t.inkMid, marginTop: 4,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.msg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your listings table */}
          <div style={{ padding: 24, borderRadius: 14, background: t.surface, border: `1px solid ${t.borderSoft}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.ink }}>Your listings</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['All (4)', 'Active (2)', 'Pending (1)', 'Rented (1)'].map((f, i) => (
                  <FNWChip key={f} t={t} active={i === 0} size="sm">{f}</FNWChip>
                ))}
              </div>
            </div>
            <FNWTable t={t} cols={['Listing', 'Status', 'Views (7d)', 'Inquiries', 'Posted', '']} rows={[
              { l: LISTINGS[0], status: 'active',   views: 412, inq: 8, posted: 'Nov 12' },
              { l: LISTINGS[1], status: 'active',   views: 280, inq: 5, posted: 'Nov 8'  },
              { l: LISTINGS[3], status: 'pending',  views: 0,   inq: 0, posted: 'Today'  },
              { l: LISTINGS[2], status: 'rented',   views: 122, inq: 0, posted: 'Oct 1'  },
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FNWOwnerSidebar({ t, active }) {
  const items = [
    { id: 'dash',     label: 'Dashboard',   ic: '◐' },
    { id: 'listings', label: 'My listings', ic: '▦' },
    { id: 'inquiries',label: 'Inquiries',   ic: '✉', badge: 6 },
    { id: 'analytics',label: 'Analytics',   ic: '◔' },
    { id: 'payouts',  label: 'Payouts',     ic: '◇' },
    { id: 'reviews',  label: 'Reviews',     ic: '★' },
    { id: 'settings', label: 'Settings',    ic: '◯' },
  ];
  return (
    <div style={{ borderRight: `1px solid ${t.borderSoft}`, background: t.surface, padding: '24px 16px',
      minHeight: 'calc(100vh - 73px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it) => {
          const on = it.id === active;
          return (
            <a key={it.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
              background: on ? t.primarySoft : 'transparent',
              color: on ? t.primary : t.inkMid,
              fontSize: 14, fontWeight: on ? 600 : 500,
            }}>
              <span style={{ fontSize: 14, width: 16, textAlign: 'center', fontWeight: 700 }}>{it.ic}</span>
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge && (
                <span style={{
                  minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10,
                  background: t.secondary, color: '#fff', fontSize: 11, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{it.badge}</span>
              )}
            </a>
          );
        })}
      </div>

      <div style={{ marginTop: 32, padding: 16, borderRadius: 12, background: t.primarySoft }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.primaryInk }}>Verified owner</div>
        <div style={{ fontSize: 11, color: t.primaryInk, opacity: 0.7, marginTop: 4, lineHeight: 1.4 }}>
          Your account is verified. Your listings show a ✓ badge.
        </div>
      </div>
    </div>
  );
}

function FNWChart({ t }) {
  // hand-drawn dual line chart
  const views =     [40, 60, 50, 80, 100, 90, 120, 140, 130, 160, 180, 170, 200, 220];
  const inquiries = [4,  6,  5,  9,  12,  10, 14,  18,  16,  20,  22,  21,  24,  28];
  const W = 600, H = 180, pad = 16;
  const toPts = (arr, scale) => arr.map((v, i) => {
    const x = pad + (i / (arr.length - 1)) * (W - pad * 2);
    const y = H - pad - (v / scale) * (H - pad * 2);
    return [x, y];
  });
  const ptsV = toPts(views, 240);
  const ptsI = toPts(inquiries, 30);
  const toPath = (pts) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');
  const toArea = (pts) => `${toPath(pts)} L${pts[pts.length-1][0]},${H - pad} L${pts[0][0]},${H - pad} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {/* horizontal grid */}
      {[0, 0.33, 0.66, 1].map((p, i) => (
        <line key={i} x1={pad} x2={W - pad}
          y1={pad + p * (H - pad * 2)} y2={pad + p * (H - pad * 2)}
          stroke={t.borderSoft} strokeDasharray="2 4" strokeWidth="1" />
      ))}
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.primary} stopOpacity="0.2" />
          <stop offset="100%" stopColor={t.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={toArea(ptsV)} fill="url(#g1)" />
      <path d={toPath(ptsV)} stroke={t.primary} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d={toPath(ptsI)} stroke={t.secondary} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      {/* end dots */}
      {[ptsV, ptsI].map((pts, k) => (
        <circle key={k} cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4"
          fill={k === 0 ? t.primary : t.secondary} stroke="#fff" strokeWidth="2"/>
      ))}
    </svg>
  );
}

function FNWTable({ t, cols, rows }) {
  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: '2.6fr 1fr 1fr 1fr 1fr 0.6fr',
        padding: '10px 8px', fontSize: 11, fontWeight: 700, color: t.inkSoft,
        textTransform: 'uppercase', letterSpacing: 0.5,
        borderBottom: `1px solid ${t.borderSoft}`,
      }}>
        {cols.map((c, i) => <div key={i}>{c}</div>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '2.6fr 1fr 1fr 1fr 1fr 0.6fr',
          padding: '14px 8px', alignItems: 'center', fontSize: 14,
          borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${t.borderSoft}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FNWPhoto src={r.l.photo} style={{ width: 48, height: 48, borderRadius: 8 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.ink,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.l.title}</div>
              <div style={{ fontSize: 12, color: t.inkSoft }}>{r.l.area} · {fnW_BDT(r.l.price)}</div>
            </div>
          </div>
          <div><FNWBadge t={t} kind={r.status}>{r.status}</FNWBadge></div>
          <div style={{ color: t.ink, fontWeight: 500 }}>{r.views}</div>
          <div style={{ color: t.ink, fontWeight: 500 }}>{r.inq}</div>
          <div style={{ color: t.inkMid }}>{r.posted}</div>
          <div style={{ textAlign: 'right' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: t.inkMid, padding: 6 }}>⋯</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 6. OWNER — Create/Edit listing (multi-step form, web layout)
// ═════════════════════════════════════════════════════════════════
function FNWOwnerCreate({ t }) {
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT }}>
      <FNWTopNav t={t} variant="browse" signedIn role="owner" />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', maxWidth: 1280, margin: '0 auto' }}>
        {/* steps sidebar */}
        <div style={{ padding: '32px 20px 32px 40px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.inkSoft, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 16 }}>Post a flat</div>
          {[
            { n: '01', label: 'Basics', done: true },
            { n: '02', label: 'Photos & description', done: true },
            { n: '03', label: 'Location & amenities', active: true },
            { n: '04', label: 'Pricing & rules' },
            { n: '05', label: 'Review & publish' },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0',
              borderBottom: i < 4 ? `1px dashed ${t.borderSoft}` : 'none',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14,
                background: s.done ? t.primary : (s.active ? t.surface : 'transparent'),
                border: s.active ? `2px solid ${t.primary}` : (s.done ? 'none' : `1px solid ${t.border}`),
                color: s.done ? '#fff' : (s.active ? t.primary : t.inkSoft),
                fontSize: 12, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{s.done ? '✓' : s.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: s.active ? 700 : 500, color: s.active ? t.ink : t.inkMid }}>{s.label}</div>
                {s.active && <div style={{ fontSize: 12, color: t.primary, marginTop: 2, fontWeight: 600 }}>You are here</div>}
              </div>
            </div>
          ))}
        </div>

        {/* form */}
        <div style={{ padding: '32px 40px 56px 20px', minWidth: 0 }}>
          <div style={{ background: t.surface, borderRadius: 16, padding: 32, border: `1px solid ${t.borderSoft}` }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>Location & amenities</h1>
            <div style={{ fontSize: 14, color: t.inkMid, marginTop: 6, lineHeight: 1.5 }}>
              Pin your flat on the map and tell renters what's included. Exact street address is only shown to renters you've replied to.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }}>
              <FNWInput t={t} label="Neighborhood" defaultValue="Banani" />
              <FNWInput t={t} label="House & road number" defaultValue="House 24, Road 11" />
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 8 }}>Pin on map</div>
              <div style={{
                height: 260, borderRadius: 12, background: t.bgAlt, border: `1px solid ${t.borderSoft}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: `linear-gradient(${t.borderSoft} 1px, transparent 1px),
                    linear-gradient(90deg, ${t.borderSoft} 1px, transparent 1px)`,
                  backgroundSize: '40px 40px' }} />
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M0 100 Q200 140 400 90 T800 130" stroke={t.borderSoft} strokeWidth="6" fill="none"/>
                  <path d="M100 0 L100 300" stroke={t.borderSoft} strokeWidth="4" fill="none"/>
                </svg>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  background: t.primary, color: '#fff', padding: '6px 12px', borderRadius: 999,
                  fontSize: 13, fontWeight: 700,
                  boxShadow: `0 6px 18px ${withAlpha(t.primary, 0.4)}`,
                }}>📍 Drag to adjust</div>
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 12 }}>
                Amenities <span style={{ color: t.inkSoft, fontWeight: 400 }}>· Select all that apply</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  ['📶', 'Wi-Fi', true], ['🅿', 'Parking', true], ['🔥', 'Gas line', true],
                  ['🛗', 'Lift', true], ['⚡', 'Generator', true], ['🏋', 'Gym', false],
                  ['🌿', 'Roof access', false], ['🛋', 'Furnished', false], ['❄', 'AC', true],
                  ['🛡', 'Security', true], ['🌐', 'Cable TV', false], ['🚿', 'Hot water', true],
                ].map(([ic, name, on], i) => (
                  <label key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 14px', borderRadius: 12,
                    border: `1px solid ${on ? t.primary : t.border}`,
                    background: on ? t.primarySoft : t.surface,
                    cursor: 'pointer', fontSize: 14, fontWeight: 500,
                    color: on ? t.primaryInk : t.ink,
                  }}>
                    <input type="checkbox" defaultChecked={on}
                      style={{ accentColor: t.primary, width: 16, height: 16 }} />
                    <span style={{ fontSize: 16 }}>{ic}</span>
                    {name}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', marginTop: 36 }}>
              <FNWButton t={t} kind="outline" size="md">← Back</FNWButton>
              <div style={{ display: 'flex', gap: 10 }}>
                <FNWButton t={t} kind="ghost" size="md">Save draft</FNWButton>
                <FNWButton t={t} kind="accent" size="md">Continue →</FNWButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 7. ADMIN PANEL — moderation queue
// ═════════════════════════════════════════════════════════════════
function FNWAdmin({ t }) {
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT, minHeight: '100%' }}>
      <div style={{
        borderBottom: `1px solid ${t.borderSoft}`,
        background: t.dark ? t.bgAlt : '#1C1C1E',
        color: '#fff',
        padding: '14px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FNWLogo size={26} color="#fff" t={{ ink: '#fff' }} />
          <FNWBadge t={t} kind="secondary">Admin</FNWBadge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13 }}>
          <span style={{ opacity: 0.7 }}>flatnest.com / admin</span>
          <FNWAvatar initials="AD" size={28} color="rgba(255,255,255,0.15)" t={{ ink: '#fff' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr' }}>
        {/* sidebar */}
        <div style={{ borderRight: `1px solid ${t.borderSoft}`, padding: 16, background: t.surface,
          minHeight: 'calc(100vh - 53px)' }}>
          {[
            ['Moderation queue', 12, true],
            ['Users', null, false],
            ['Owners', null, false],
            ['Reports', 3, false],
            ['Listings index', null, false],
            ['Settings', null, false],
          ].map(([label, n, on], i) => (
            <a key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', borderRadius: 8, marginBottom: 2,
              background: on ? t.primarySoft : 'transparent',
              color: on ? t.primary : t.inkMid,
              fontSize: 14, fontWeight: on ? 600 : 500, cursor: 'pointer',
            }}>
              <span>{label}</span>
              {n != null && (
                <span style={{ fontSize: 11, fontWeight: 700,
                  background: on ? t.primary : t.bgAlt,
                  color: on ? '#fff' : t.inkSoft, padding: '2px 7px', borderRadius: 10 }}>{n}</span>
              )}
            </a>
          ))}
        </div>

        {/* table view */}
        <div style={{ padding: '28px 32px 56px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: -0.4 }}>Moderation queue</h1>
              <div style={{ fontSize: 13, color: t.inkMid, marginTop: 4 }}>
                <b style={{ color: t.warning }}>12 listings</b> waiting for review · Oldest 4h
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <FNWInput t={t} label="" placeholder="Search listings / owners…" />
              <FNWButton t={t} kind="outline" size="md">Export CSV</FNWButton>
            </div>
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {['All (12)', 'New today (5)', 'Re-submitted (3)', 'Flagged (2)', 'High value (2)'].map((c, i) => (
              <FNWChip key={c} t={t} active={i === 0} size="sm">{c}</FNWChip>
            ))}
          </div>

          {/* Listing review rows */}
          <div style={{ background: t.surface, borderRadius: 14, border: `1px solid ${t.borderSoft}`, overflow: 'hidden' }}>
            {LISTINGS.slice(0, 4).map((l, i) => (
              <div key={l.id} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr 1fr 220px',
                gap: 20, padding: 18, alignItems: 'center',
                borderBottom: i < 3 ? `1px solid ${t.borderSoft}` : 'none',
              }}>
                <FNWPhoto src={l.photo} style={{ width: 120, height: 90, borderRadius: 8 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.ink }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 4 }}>{l.area} · {fnW_BDT(l.price)} /mo · {l.beds} BR</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    {i === 1 && <FNWBadge t={t} kind="warning">Re-submitted</FNWBadge>}
                    {i === 2 && <FNWBadge t={t} kind="rejected">Flagged · low photos</FNWBadge>}
                    {i === 3 && <FNWBadge t={t} kind="primary">High value</FNWBadge>}
                    {i === 0 && <FNWBadge t={t} kind="primary">New</FNWBadge>}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: t.inkSoft }}>Owner</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    {['Tahmid R.', 'Nazia K.', 'Rafiq A.', 'Sumaiya H.'][i]}
                    {i !== 2 && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={t.primary}>
                        <path d="M12 2l3 2.5 4-.5.5 4L22 11l-2.5 3 .5 4-4-.5L12 22l-3-2.5-4 .5-.5-4L2 13l2.5-3-.5-4 4 .5z"/>
                        <path d="M8 12l3 3 6-6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4 }}>
                    {['Verified · 4 listings', 'Verified · 2 listings', 'Unverified · 1 listing', 'Unverified · 1 listing'][i]}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <FNWButton t={t} kind="ghost" size="sm">View</FNWButton>
                  <FNWButton t={t} kind="outline" size="sm" style={{ color: t.error, borderColor: t.errorSoft }}>Reject</FNWButton>
                  <FNWButton t={t} kind="accent" size="sm">Approve</FNWButton>
                </div>
              </div>
            ))}
          </div>

          {/* Stats footer */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 24 }}>
            {[
              ['Approved today', '34', t.success],
              ['Rejected today', '4', t.error],
              ['Avg. review time', '6m 12s', t.ink],
              ['Total active listings', '2,412', t.ink],
            ].map(([k, v, c], i) => (
              <div key={i} style={{
                padding: 16, borderRadius: 12, background: t.surface, border: `1px solid ${t.borderSoft}`,
              }}>
                <div style={{ fontSize: 12, color: t.inkSoft }}>{k}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: c, marginTop: 4, letterSpacing: -0.3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 8. MOBILE WEB — Responsive showcase (3 viewports side by side)
// ═════════════════════════════════════════════════════════════════
function FNWMobileWeb({ t }) {
  return (
    <div style={{ background: '#F4F0EA', padding: 32, fontFamily: FN_FONT, minHeight: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '375px 768px 1fr', gap: 32, justifyContent: 'center' }}>
        <FNResponsiveFrame t={t} label="Mobile · 375px" width={375}>
          <FNWMobileBrowse t={t} compact />
        </FNResponsiveFrame>
        <FNResponsiveFrame t={t} label="Tablet · 768px" width={768}>
          <FNWMobileBrowse t={t} compact={false} />
        </FNResponsiveFrame>
        <FNResponsiveFrame t={t} label="Desktop · 1440px+" width={null}>
          <div style={{ padding: 40, textAlign: 'center', color: t.inkMid }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 0.6 }}>Full layout shown in</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: t.ink, marginTop: 6 }}>"Browse" artboard ←</div>
            <div style={{ marginTop: 24, padding: 20, background: t.bgAlt, borderRadius: 12, fontSize: 13, color: t.inkMid, textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.ink, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>Breakpoints</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['xs', '<640px',  '1 col, stacked nav, no map'],
                  ['sm', '640–768', '2 col grid, drawer map'],
                  ['md', '768–1024','2 col grid + side map'],
                  ['lg', '1024–1440','3 col + map'],
                  ['xl', '≥1440px',  '4 col + map (full layout)'],
                ].map(([n, r, d]) => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '40px 100px 1fr', gap: 8, fontSize: 12 }}>
                    <b style={{ color: t.primary }}>{n}</b>
                    <span style={{ color: t.ink }}>{r}</span>
                    <span style={{ color: t.inkMid }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FNResponsiveFrame>
      </div>
    </div>
  );
}

function FNResponsiveFrame({ t, label, width, children }) {
  return (
    <div style={{ width: width || '100%' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: t.inkSoft, textTransform: 'uppercase',
        letterSpacing: 0.6, marginBottom: 12, textAlign: 'center' }}>{label}</div>
      <div style={{
        background: t.surface, borderRadius: 12, overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)', minHeight: 600,
      }}>{children}</div>
    </div>
  );
}

function FNWMobileBrowse({ t, compact }) {
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT }}>
      {/* mobile top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: t.surface, borderBottom: `1px solid ${t.borderSoft}`,
      }}>
        <FNWLogo size={22} t={t} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 38, height: 38, borderRadius: 19, background: t.surface,
            border: `1px solid ${t.border}`, color: t.ink, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.ink} strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>

      {/* search */}
      <div style={{ padding: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          height: 48, padding: '0 16px',
          background: t.surface, border: `1px solid ${t.border}`, borderRadius: 999,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.inkSoft} strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
          </svg>
          <div style={{ flex: 1, fontSize: 13, color: t.inkMid }}>Banani · Dec 1 · ৳20–40k</div>
          <div style={{ fontSize: 12, color: t.inkSoft }}>·</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.ink }}>Filters</div>
        </div>
      </div>

      {/* chips */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['All', 'Family', 'Bachelor', 'Furnished', 'Under ৳20k'].map((c, i) => (
          <FNWChip key={c} t={t} active={i === 0} size="sm">{c}</FNWChip>
        ))}
      </div>

      {/* grid */}
      <div style={{ padding: '0 16px 16px',
        display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: 16 }}>
        {LISTINGS.slice(0, compact ? 4 : 4).map((l, i) => (
          <FNWListingCard key={l.id} listing={l} t={t} saved={i === 0} />
        ))}
      </div>

      {/* sticky map button */}
      <div style={{ position: 'sticky', bottom: 16, display: 'flex', justifyContent: 'center', padding: 16 }}>
        <FNWButton t={t} kind="primary" size="md" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
          leading={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>}>
          Show map
        </FNWButton>
      </div>
    </div>
  );
}

Object.assign(window, { FNWAuth, FNWOwnerDash, FNWOwnerCreate, FNWAdmin, FNWMobileWeb });
