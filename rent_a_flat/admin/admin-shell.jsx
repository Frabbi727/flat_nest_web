// admin-shell.jsx — sidebar + topbar + layout primitives for FlatNest Admin

// ───────────────────────────────────────────────────────────
// Inline SVG icons — kept simple, all 20×20, currentColor
// ───────────────────────────────────────────────────────────
function ADMIcon({ name, size = 18 }) {
  const props = { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':     return <svg {...props}><path d="M3 9.5 10 3l7 6.5V17a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1V9.5Z"/></svg>;
    case 'listing':  return <svg {...props}><rect x="3" y="3" width="14" height="14" rx="1.5"/><path d="M3 8h14M7 12h2M7 15h2M11 12h2M11 15h2"/></svg>;
    case 'users':    return <svg {...props}><circle cx="8" cy="7.5" r="2.8"/><path d="M2.5 17c.6-2.6 2.9-4 5.5-4s4.9 1.4 5.5 4"/><circle cx="14.5" cy="6" r="2.2"/><path d="M17.8 13.6c-.9-.9-2.1-1.4-3.3-1.4"/></svg>;
    case 'approve':  return <svg {...props}><circle cx="10" cy="10" r="7.5"/><path d="m6.8 10 2.2 2.2 4.2-4.4"/></svg>;
    case 'report':   return <svg {...props}><path d="M4 4v13"/><path d="M4 4h10l-1.8 3L14 10H4"/></svg>;
    case 'chart':    return <svg {...props}><path d="M3 17V8M9 17V4M15 17v-6"/><path d="M2.5 17h15"/></svg>;
    case 'search':   return <svg {...props}><circle cx="9" cy="9" r="5.5"/><path d="m17 17-3.8-3.8"/></svg>;
    case 'bell':     return <svg {...props}><path d="M5 8.5a5 5 0 1 1 10 0V12l1.5 2.5h-13L5 12V8.5Z"/><path d="M8.5 16.5a1.5 1.5 0 0 0 3 0"/></svg>;
    case 'edit':     return <svg {...props}><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z"/></svg>;
    case 'trash':    return <svg {...props}><path d="M4 6h12M8 6V4h4v2M6 6l1 11h6l1-11"/></svg>;
    case 'check':    return <svg {...props}><path d="m4 10 4 4 8-9"/></svg>;
    case 'x':        return <svg {...props}><path d="m5 5 10 10M15 5 5 15"/></svg>;
    case 'eye':      return <svg {...props}><path d="M2 10s2.8-5 8-5 8 5 8 5-2.8 5-8 5-8-5-8-5Z"/><circle cx="10" cy="10" r="2.4"/></svg>;
    case 'flag':     return <svg {...props}><path d="M5 17V3"/><path d="M5 3h9l-1.4 3.5L14 10H5"/></svg>;
    case 'chevron':  return <svg {...props}><path d="m8 5 5 5-5 5"/></svg>;
    case 'plus':     return <svg {...props}><path d="M10 4v12M4 10h12"/></svg>;
    case 'filter':   return <svg {...props}><path d="M3 5h14M5.5 10h9M8.5 15h3"/></svg>;
    case 'arrow-up': return <svg {...props}><path d="M10 16V4M5 9l5-5 5 5"/></svg>;
    case 'arrow-dn': return <svg {...props}><path d="M10 4v12M5 11l5 5 5-5"/></svg>;
    case 'sparkle':  return <svg {...props}><path d="M10 3v4M10 13v4M3 10h4M13 10h4"/></svg>;
    case 'logout':   return <svg {...props}><path d="M11 4H5v12h6"/><path d="m14 7 3 3-3 3M9 10h8"/></svg>;
    case 'verify':   return <svg {...props}><path d="m4 10 4 4 8-9"/><circle cx="10" cy="10" r="8.5" strokeDasharray="2 2"/></svg>;
    case 'mail':     return <svg {...props}><rect x="3" y="5" width="14" height="10" rx="1.5"/><path d="m3.5 6 6.5 5 6.5-5"/></svg>;
    case 'phone':    return <svg {...props}><path d="M5 3h3l1.5 4-2 1.5a10 10 0 0 0 4 4L13 10.5 17 12v3a2 2 0 0 1-2 2A12 12 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>;
    case 'cal':      return <svg {...props}><rect x="3" y="4" width="14" height="13" rx="1.5"/><path d="M3 8h14M7 3v3M13 3v3"/></svg>;
    case 'pin':      return <svg {...props}><path d="M10 17s-5-5.5-5-10a5 5 0 0 1 10 0c0 4.5-5 10-5 10Z"/><circle cx="10" cy="7" r="2"/></svg>;
    default: return null;
  }
}

// ───────────────────────────────────────────────────────────
// Sidebar
// ───────────────────────────────────────────────────────────
function ADMSidebar({ t, page, setPage, counts }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'approvals', label: 'Approvals', icon: 'approve', count: counts.pending },
    { id: 'listings',  label: 'Listings',  icon: 'listing', count: counts.listings },
    { id: 'users',     label: 'Users',     icon: 'users',   count: counts.users },
    { id: 'reports',   label: 'Reports',   icon: 'flag',    count: counts.reports },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
  ];
  return (
    <aside style={{
      width: 232, flexShrink: 0, height: '100vh', position: 'sticky', top: 0,
      background: t.bgAlt, borderRight: `1px solid ${t.border}`,
      padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px 18px' }}>
        <ADMLogoMark t={t} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.2, color: t.ink }}>Flatnest</div>
          <div style={{ fontSize: 10.5, color: t.inkSoft, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Admin Console</div>
        </div>
      </div>

      <div style={{ fontSize: 10.5, color: t.inkSoft, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', padding: '8px 10px 6px' }}>Manage</div>

      {items.map((it) => {
        const active = page === it.id;
        return (
          <button key={it.id} onClick={() => setPage(it.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
            background: active ? t.primarySoft : 'transparent',
            color: active ? t.primaryInk : t.inkMid,
            border: 'none', fontSize: 13.5, fontWeight: active ? 600 : 500,
            fontFamily: FN_FONT, textAlign: 'left', width: '100%',
            position: 'relative',
          }}>
            <span style={{ color: active ? t.primary : t.inkSoft, display: 'flex' }}>
              <ADMIcon name={it.icon} />
            </span>
            <span style={{ flex: 1 }}>{it.label}</span>
            {typeof it.count === 'number' && it.count > 0 && (
              <span style={{
                background: active ? t.primary : t.surface,
                color: active ? '#fff' : t.inkMid,
                fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 999,
                fontVariantNumeric: 'tabular-nums',
              }}>{it.count}</span>
            )}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Footer card — admin profile */}
      <div style={{
        marginTop: 12, padding: 12, borderRadius: 12,
        background: t.surface, border: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 17,
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 13,
        }}>AD</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, lineHeight: 1.2 }}>Admin</div>
          <div style={{ fontSize: 11, color: t.inkSoft, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>admin@flatnest.bd</div>
        </div>
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: t.inkSoft, display: 'flex', padding: 6, borderRadius: 6,
        }} title="Sign out"><ADMIcon name="logout" /></button>
      </div>
    </aside>
  );
}

// Small "stacked-roofs" mark (geometric — squares + a tucked triangle)
function ADMLogoMark({ t, size = 30 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 9,
      background: t.primary, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 4px 12px ${withAlpha(t.primary, 0.35)}`,
    }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20" fill="none">
        <path d="M3 11.5 10 5l7 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="6" y="10" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Top bar — title, breadcrumb, search, notifications
// ───────────────────────────────────────────────────────────
function ADMTopBar({ t, title, crumb, right, search, setSearch }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 28px', borderBottom: `1px solid ${t.border}`,
      background: t.bg, position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ minWidth: 0 }}>
        {crumb && (
          <div style={{ fontSize: 11.5, color: t.inkSoft, fontWeight: 500, letterSpacing: 0.3, marginBottom: 2 }}>
            {crumb}
          </div>
        )}
        <div style={{ fontSize: 22, fontWeight: 700, color: t.ink, letterSpacing: -0.4 }}>{title}</div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 38, padding: '0 12px', borderRadius: 10,
        background: t.surface, border: `1px solid ${t.border}`,
        width: 280, color: t.inkSoft,
      }}>
        <ADMIcon name="search" size={16} />
        <input
          value={search || ''}
          onChange={(e) => setSearch && setSearch(e.target.value)}
          placeholder="Search listings, users, IDs…"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            color: t.ink, fontSize: 13, fontFamily: FN_FONT,
          }} />
        <span style={{ fontSize: 11, color: t.inkFaint, border: `1px solid ${t.border}`, padding: '1px 6px', borderRadius: 5 }}>⌘K</span>
      </div>

      {/* Notifications */}
      <button style={{
        width: 38, height: 38, borderRadius: 10,
        background: t.surface, border: `1px solid ${t.border}`,
        color: t.inkMid, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative',
      }}>
        <ADMIcon name="bell" />
        <span style={{
          position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: 4,
          background: t.secondary, border: `2px solid ${t.surface}`,
        }} />
      </button>

      {right}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Status pill specialized for FlatNest statuses
// ───────────────────────────────────────────────────────────
function ADMStatus({ status, t }) {
  const map = {
    Active:   { kind: 'active',   dot: t.success },
    Pending:  { kind: 'pending',  dot: t.warning },
    Rejected: { kind: 'rejected', dot: t.error },
    Rented:   { kind: 'rented',   dot: t.inkMid },
  };
  const c = map[status] || map.Active;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px 3px 8px', borderRadius: 999,
      background: c.kind === 'active' ? t.successSoft : c.kind === 'pending' ? t.warningSoft : c.kind === 'rejected' ? t.errorSoft : t.bgAlt,
      color: c.kind === 'active' ? t.success : c.kind === 'pending' ? t.warning : c.kind === 'rejected' ? t.error : t.inkMid,
      fontSize: 11.5, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: c.dot }} />
      {status}
    </span>
  );
}

// Role pill — owner vs renter
function ADMRole({ role, t }) {
  const isOwner = role === 'owner';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 9px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
      background: isOwner ? t.warningSoft : t.primarySoft,
      color: isOwner ? t.warning : t.primaryInk,
      textTransform: 'capitalize',
    }}>{role}</span>
  );
}

// Tiny avatar
function ADMAvatar({ name, color, size = 32, t }) {
  const initials = (name || '?').split(/\s+/).filter(Boolean).map(s => s[0]).slice(0, 2).join('').toUpperCase();
  // Hash name → hue for stable color
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  const bg = color || `oklch(0.55 0.10 ${hue})`;
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: bg, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, flexShrink: 0,
      fontFamily: FN_FONT,
    }}>{initials}</div>
  );
}

// Card container
function ADMCard({ children, style, t, pad = 18 }) {
  return (
    <div style={{
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 14, padding: pad, ...style,
    }}>{children}</div>
  );
}

// Section header with optional action
function ADMSectionHead({ title, hint, action, t, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, ...style }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>{title}</div>
        {hint && <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>{hint}</div>}
      </div>
      <div style={{ flex: 1 }} />
      {action}
    </div>
  );
}

// Sparkline — auto-scaled polyline
function ADMSparkline({ data, color, width = 100, height = 28, fill = true }) {
  if (!data || !data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = (max - min) || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => [i * step, height - 2 - ((v - min) / range) * (height - 4)]);
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${width.toFixed(1)},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      {fill && <path d={area} fill={withAlpha(color, 0.15)} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}

// Bar chart (horizontal)
function ADMHBars({ data, t, color }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {data.map((d) => (
        <div key={d.area || d.type} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 30px', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12.5, color: t.inkMid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.area || d.type}</div>
          <div style={{ height: 8, background: t.bgAlt, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${(d.count / max) * 100}%`,
              background: d.color || color || t.primary, borderRadius: 4,
              transition: 'width .35s ease',
            }} />
          </div>
          <div style={{ fontSize: 12.5, color: t.ink, fontWeight: 600, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{d.count}</div>
        </div>
      ))}
    </div>
  );
}

// Bar chart (vertical) — for the 14-day trend
function ADMBars({ data, t, color, height = 90 }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height, marginTop: 8 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${(v / max) * 100}%`, minHeight: 3,
          background: i === data.length - 1 ? color : withAlpha(color, 0.55),
          borderRadius: 3,
        }} />
      ))}
    </div>
  );
}

// Donut — used for listing type breakdown
function ADMDonut({ data, size = 140, thickness = 18, t }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const cx = size / 2, cy = size / 2;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={t.bgAlt} strokeWidth={thickness} />
        {data.map((d, i) => {
          const len = (d.count / total) * c;
          const seg = (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={d.color} strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt" />
          );
          offset += len;
          return seg;
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.ink, lineHeight: 1 }}>{total}</div>
        <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 600 }}>Listings</div>
      </div>
    </div>
  );
}

// Photo thumbnail for listing rows
function ADMThumb({ tint, size = 40 }) {
  const stripe = `repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 6px)`;
  return (
    <div style={{
      width: size, height: size, borderRadius: 8, flexShrink: 0,
      background: tint, backgroundImage: stripe, position: 'relative', overflow: 'hidden',
    }}>
      <svg viewBox="0 0 40 40" width={size} height={size} style={{ position: 'absolute', inset: 0, opacity: 0.45 }}>
        <path d="M6 24 L20 12 L34 24 L34 32 L6 32 Z" fill="rgba(0,0,0,0.18)"/>
        <rect x="16" y="22" width="8" height="10" fill="rgba(255,255,255,0.35)"/>
      </svg>
    </div>
  );
}

// Tab-style filter (segmented)
function ADMTabs({ value, onChange, options, t }) {
  return (
    <div style={{
      display: 'inline-flex', padding: 3, gap: 2,
      background: t.bgAlt, borderRadius: 10, border: `1px solid ${t.border}`,
    }}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        const count = typeof o === 'object' ? o.count : null;
        const active = value === v;
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            padding: '6px 12px', borderRadius: 8, border: 'none',
            background: active ? t.surface : 'transparent',
            color: active ? t.ink : t.inkMid,
            fontSize: 12.5, fontWeight: 600, fontFamily: FN_FONT, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            boxShadow: active ? t.shadow : 'none',
          }}>
            {label}
            {count != null && (
              <span style={{ color: active ? t.inkSoft : t.inkSoft, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Icon button
function ADMIconBtn({ icon, onClick, t, tone = 'default', title }) {
  const tones = {
    default: { c: t.inkMid, hover: t.ink },
    primary: { c: t.primary, hover: t.primary },
    danger:  { c: t.error,   hover: t.error },
    success: { c: t.success, hover: t.success },
  };
  const tn = tones[tone];
  return (
    <button title={title} onClick={onClick} style={{
      width: 32, height: 32, borderRadius: 8,
      background: 'transparent', border: `1px solid ${t.border}`,
      color: tn.c, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}><ADMIcon name={icon} size={15} /></button>
  );
}

Object.assign(window, {
  ADMIcon, ADMSidebar, ADMTopBar, ADMStatus, ADMRole, ADMAvatar, ADMCard,
  ADMSectionHead, ADMSparkline, ADMHBars, ADMBars, ADMDonut, ADMThumb, ADMTabs, ADMIconBtn,
});
