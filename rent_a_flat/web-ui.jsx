// web-ui.jsx — FlatNest web UI primitives
// Top nav, search pill, listing card (web), buttons, footer, photo placeholder.

// ─── photo placeholder (web). Uses real Unsplash URL if passed; else striped tint.
function FNWPhoto({ src, tint = '#D6CFC4', label, style, children }) {
  const stripe = `repeating-linear-gradient(135deg, ${withAlpha('#000', 0.04)} 0 1px, transparent 1px 22px)`;
  return (
    <div style={{
      position: 'relative', overflow: 'hidden', background: tint,
      backgroundImage: src ? `url(${src})` : stripe,
      backgroundSize: 'cover', backgroundPosition: 'center',
      ...style,
    }}>
      {label && !src && (
        <div style={{
          position: 'absolute', bottom: 8, left: 10,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 10, color: withAlpha('#fff', 0.85),
          textTransform: 'uppercase', letterSpacing: 0.5,
        }}>{label}</div>
      )}
      {children}
    </div>
  );
}

// ─── BDT formatter
function fnW_BDT(n) { return '৳' + Math.round(n).toLocaleString('en-US'); }

// ─── Logo mark (matches mobile logo direction)
function FNWLogo({ size = 28, color, t }) {
  const c = color || (t ? t.primary : '#1A6B72');
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M4 16L16 5l12 11v10a3 3 0 01-3 3H7a3 3 0 01-3-3V16z"
              fill={c} fillOpacity="0.14" stroke={c} strokeWidth="2.2" strokeLinejoin="round"/>
        <rect x="12.5" y="15.5" width="7" height="9" rx="1.2"
              stroke={c} strokeWidth="2" fill={c} fillOpacity="0.6"/>
      </svg>
      <span style={{
        fontSize: size * 0.62, fontWeight: 700, color: t ? t.ink : '#1C1C1E',
        letterSpacing: -0.4,
      }}>FlatNest</span>
    </div>
  );
}

// ─── Web buttons (denser than mobile)
function FNWButton({ children, kind = 'primary', size = 'md', t, full, onClick, leading, trailing, style }) {
  const sizes = {
    sm: { h: 36, px: 14, fs: 13 },
    md: { h: 44, px: 18, fs: 14 },
    lg: { h: 52, px: 24, fs: 15 },
  };
  const s = sizes[size];
  const kinds = {
    primary:   { bg: t.ink,        fg: '#fff',          bd: 'transparent' },
    accent:    { bg: t.primary,    fg: '#fff',          bd: 'transparent' },
    coral:     { bg: t.secondary,  fg: '#fff',          bd: 'transparent' },
    soft:      { bg: t.primarySoft, fg: t.primaryInk,   bd: 'transparent' },
    outline:   { bg: 'transparent', fg: t.ink,          bd: t.border },
    ghost:     { bg: 'transparent', fg: t.ink,          bd: 'transparent' },
  };
  const k = kinds[kind] || kinds.primary;
  return (
    <button onClick={onClick} style={{
      height: s.h, padding: `0 ${s.px}px`, borderRadius: 999,
      background: k.bg, color: k.fg, border: `1px solid ${k.bd}`,
      fontSize: s.fs, fontWeight: 600, fontFamily: FN_FONT,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      width: full ? '100%' : undefined, cursor: 'pointer',
      letterSpacing: -0.05, transition: 'transform .12s, filter .12s, background .12s',
      ...style,
    }}>
      {leading}{children}{trailing}
    </button>
  );
}

// ─── Chip
function FNWChip({ children, active, onClick, t, size = 'md' }) {
  const h = size === 'sm' ? 30 : 36;
  return (
    <button onClick={onClick} style={{
      height: h, padding: `0 ${size === 'sm' ? 12 : 14}px`, borderRadius: 999,
      background: active ? t.ink : t.surface,
      color: active ? '#fff' : t.ink,
      border: `1px solid ${active ? t.ink : t.border}`,
      fontSize: 13, fontWeight: 500, fontFamily: FN_FONT,
      whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

// ─── Avatar
function FNWAvatar({ initials, size = 36, color, t }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: color || t.bgAlt, color: t.ink,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 600, flexShrink: 0,
    }}>{initials}</div>
  );
}

// ─── Status badge
function FNWBadge({ children, kind = 'neutral', t }) {
  const map = {
    active:   { bg: t.successSoft, fg: t.success },
    pending:  { bg: t.warningSoft, fg: t.warning },
    rejected: { bg: t.errorSoft,   fg: t.error },
    rented:   { bg: t.bgAlt,       fg: t.inkMid },
    primary:  { bg: t.primarySoft, fg: t.primary },
    secondary:{ bg: t.secondarySoft, fg: t.secondary },
    neutral:  { bg: t.bgAlt,       fg: t.inkMid },
  };
  const c = map[kind] || map.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.1,
      background: c.bg, color: c.fg, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// ─── Top navigation (Airbnb-style, sticky, two-row on browse pages)
function FNWTopNav({ t, signedIn = false, role = 'guest', variant = 'home', onSwitchRole }) {
  // variant: 'home' = single row with search center, 'browse' = compact, 'admin' = role label
  const linkStyle = (active) => ({
    fontSize: 14, fontWeight: 500,
    color: active ? t.ink : t.inkMid,
    padding: '8px 14px', borderRadius: 999,
    cursor: 'pointer',
    background: active ? t.bgAlt : 'transparent',
  });
  return (
    <div style={{
      borderBottom: `1px solid ${t.borderSoft}`,
      background: t.surface,
      padding: '14px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 24,
    }}>
      <FNWLogo size={28} t={t} />

      {variant === 'home' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <a style={linkStyle(true)}>Browse</a>
          <a style={linkStyle(false)}>How it works</a>
          <a style={linkStyle(false)}>For owners</a>
          <a style={linkStyle(false)}>Help</a>
        </div>
      ) : (
        // Center: persistent search pill
        <FNWNavSearch t={t} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {!signedIn ? (
          <>
            <a style={{ ...linkStyle(false), color: t.ink, fontWeight: 600 }}>List your flat</a>
            <FNWButton t={t} kind="outline" size="sm">Sign in</FNWButton>
            <FNWButton t={t} kind="accent" size="sm">Sign up</FNWButton>
          </>
        ) : (
          <>
            <a style={linkStyle(false)}>{role === 'owner' ? 'Add listing' : 'List your flat'}</a>
            <div style={{ position: 'relative' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: 999, padding: '5px 6px 5px 12px', cursor: 'pointer',
                color: t.ink,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.inkMid} strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <FNWAvatar initials={role === 'owner' ? 'TR' : role === 'admin' ? 'AD' : 'RK'}
                  size={28} color={t.primarySoft} t={t} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Compact in-nav search pill (Airbnb style)
function FNWNavSearch({ t }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 999, height: 50, padding: '0 6px 0 24px',
      boxShadow: '0 1px 3px rgba(15,20,30,0.04)',
      minWidth: 420,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, letterSpacing: 0.1 }}>Where</div>
        <div style={{ fontSize: 12, color: t.inkSoft }}>Banani, Dhaka</div>
      </div>
      <div style={{ width: 1, height: 28, background: t.borderSoft }} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, letterSpacing: 0.1 }}>Move in</div>
        <div style={{ fontSize: 12, color: t.inkSoft }}>Dec 1, 2026</div>
      </div>
      <div style={{ width: 1, height: 28, background: t.borderSoft }} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 24px', flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, letterSpacing: 0.1 }}>Budget</div>
        <div style={{ fontSize: 12, color: t.inkSoft }}>৳20k – ৳40k</div>
      </div>
      <button style={{
        width: 40, height: 40, borderRadius: 999, background: t.primary,
        border: 'none', cursor: 'pointer', color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Listing card for web (denser than mobile, image-first)
function FNWListingCard({ listing: l, t, saved, onToggleSave, badge }) {
  return (
    <div style={{ cursor: 'pointer' }}>
      <div style={{
        position: 'relative', borderRadius: 14, overflow: 'hidden',
        aspectRatio: '4 / 3',
      }}>
        <FNWPhoto src={l.photo} tint={l.photoTint} style={{ width: '100%', height: '100%' }} />
        {/* heart */}
        <button onClick={(e) => { e.stopPropagation(); onToggleSave && onToggleSave(); }}
          style={{
            position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: 16,
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <svg width="22" height="22" viewBox="0 0 24 24"
               fill={saved ? t.secondary : 'rgba(0,0,0,0.4)'}
               stroke="#fff" strokeWidth="2">
            <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.7 1.2 5.5 3.2C13.8 5.2 15.5 4 17.5 4 21 4 23.5 8 21.5 12c-2.5 4.5-9.5 9-9.5 9z" strokeLinejoin="round"/>
          </svg>
        </button>
        {badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: '#fff', color: t.ink, padding: '4px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.2, textTransform: 'uppercase',
          }}>{badge}</div>
        )}
      </div>
      <div style={{ paddingTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: t.ink, letterSpacing: -0.1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{l.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, color: t.ink, fontWeight: 600 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill={t.ink}><path d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5 2 9.5l7-1z"/></svg>
            {l.rating}
          </div>
        </div>
        <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 2 }}>{l.area}</div>
        <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 1 }}>
          {l.beds} BR · {l.baths} Bath · {l.size} ft²
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.ink, marginTop: 6 }}>
          {fnW_BDT(l.price)}<span style={{ color: t.inkMid, fontWeight: 400 }}> / month</span>
        </div>
      </div>
    </div>
  );
}

// ─── Footer
function FNWFooter({ t }) {
  const cols = [
    { h: 'For renters', items: ['How to find a flat', 'Verified listings', 'Safety tips', 'Trust & safety'] },
    { h: 'For owners',  items: ['List your flat', 'Owner handbook', 'Verification', 'Pricing'] },
    { h: 'Company',     items: ['About us', 'Careers', 'Press', 'Contact'] },
    { h: 'Resources',   items: ['Help center', 'Neighborhoods', 'Mobile app', 'Blog'] },
  ];
  return (
    <div style={{
      background: t.dark ? t.bgAlt : '#F2F0EC',
      borderTop: `1px solid ${t.borderSoft}`,
      padding: '56px 40px 28px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 40 }}>
        <div>
          <FNWLogo size={28} t={t} />
          <div style={{ fontSize: 13, color: t.inkMid, marginTop: 14, lineHeight: 1.6, maxWidth: 280 }}>
            Find or list a flat across Dhaka. Trusted owners, verified renters, zero broker fees.
          </div>
        </div>
        {cols.map((c, i) => (
          <div key={i}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.ink, textTransform: 'uppercase',
              letterSpacing: 0.6, marginBottom: 14 }}>{c.h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.items.map((it) => (
                <a key={it} style={{ fontSize: 13, color: t.inkMid, cursor: 'pointer' }}>{it}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: `1px solid ${t.borderSoft}`, paddingTop: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: t.inkSoft,
      }}>
        <div>© 2026 FlatNest. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a style={{ cursor: 'pointer' }}>Terms</a>
          <a style={{ cursor: 'pointer' }}>Privacy</a>
          <a style={{ cursor: 'pointer' }}>Cookies</a>
          <a style={{ cursor: 'pointer' }}>🇧🇩 English (BD)</a>
        </div>
      </div>
    </div>
  );
}

// ─── Section title for editorial layouts
function FNWSectionTitle({ eyebrow, title, action, t }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
      <div>
        {eyebrow && <div style={{ fontSize: 12, fontWeight: 700, color: t.primary,
          textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{eyebrow}</div>}
        <div style={{ fontSize: 32, fontWeight: 700, color: t.ink, letterSpacing: -0.8, textWrap: 'balance' }}>{title}</div>
      </div>
      {action}
    </div>
  );
}

Object.assign(window, {
  FNWPhoto, fnW_BDT, FNWLogo, FNWButton, FNWChip, FNWAvatar, FNWBadge,
  FNWTopNav, FNWNavSearch, FNWListingCard, FNWFooter, FNWSectionTitle,
});
