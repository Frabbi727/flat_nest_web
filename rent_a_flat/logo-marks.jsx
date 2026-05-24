// logo-marks.jsx — six FlatNest logo directions, each a self-contained component.
// Marks are vector SVGs. Wordmarks use Inter for sans, Fraunces for serif accents.

const TEAL = '#1A6B72';
const TEAL_INK = '#0E484D';
const TEAL_SOFT = '#E6F0F1';
const CORAL = '#FF6B6B';
const PAPER = '#f0eee9';
const INK = '#1C1C1E';

// ── 01 — "Pitched N" — a rooftop hidden inside the N of FlatNest ────────────
function Mark01({ size = 96, fg = TEAL, accent = CORAL }) {
  const s = size;
  return (
    <svg viewBox="0 0 64 64" width={s} height={s} aria-label="FlatNest mark — pitched N">
      <rect x="2" y="2" width="60" height="60" rx="14" fill={fg} />
      {/* N strokes: two verticals + a roof pitch as the diagonal */}
      <rect x="14" y="16" width="6" height="32" rx="1" fill="#fff" />
      <rect x="44" y="16" width="6" height="32" rx="1" fill="#fff" />
      <path d="M14 16 L32 32 L50 16 L50 22 L32 38 L14 22 Z" fill={accent} />
    </svg>
  );
}
function Logo01({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
      <Mark01 size={56 * scale} />
      <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 30 * scale, letterSpacing: -0.4, color: INK }}>
        Flat<span style={{ color: TEAL }}>Nest</span>
      </div>
    </div>
  );
}

// ── 02 — "Window grid" — a flat seen as a 2×2 window pane ───────────────────
function Mark02({ size = 96, fg = TEAL, accent = CORAL }) {
  const s = size;
  return (
    <svg viewBox="0 0 64 64" width={s} height={s}>
      <rect x="6" y="8" width="52" height="48" rx="6" fill="none" stroke={fg} strokeWidth="4" />
      <line x1="32" y1="8" x2="32" y2="56" stroke={fg} strokeWidth="4" />
      <line x1="6" y1="32" x2="58" y2="32" stroke={fg} strokeWidth="4" />
      {/* one pane lit */}
      <rect x="34" y="10" width="22" height="20" rx="2" fill={accent} />
    </svg>
  );
}
function Logo02({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
      <Mark02 size={52 * scale} />
      <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 28 * scale, letterSpacing: -0.3, color: TEAL_INK }}>
        flatnest
      </div>
    </div>
  );
}

// ── 03 — Editorial wordmark — Fraunces serif with a coral dot for the "i" ──
function Logo03({ scale = 1 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: 'Fraunces', fontWeight: 600,
                  fontSize: 44 * scale, letterSpacing: -1.2, color: INK, lineHeight: 1 }}>
      <span>flatnest</span>
      <span style={{
        display: 'inline-block', width: 8 * scale, height: 8 * scale, borderRadius: 999,
        background: CORAL, marginLeft: 4 * scale, transform: `translateY(-${22 * scale}px)`,
      }} />
    </div>
  );
}

// ── 04 — "Folded roof" monogram — minimalist FN inside a chamfered tile ────
function Mark04({ size = 96 }) {
  const s = size;
  return (
    <svg viewBox="0 0 64 64" width={s} height={s}>
      <defs>
        <linearGradient id="m04g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={TEAL} />
          <stop offset="1" stopColor={TEAL_INK} />
        </linearGradient>
      </defs>
      <path d="M8 18 L32 4 L56 18 L56 56 L8 56 Z" fill="url(#m04g)" />
      {/* monogram */}
      <path d="M20 24 L20 46 M20 24 L32 24 M20 34 L29 34" stroke="#fff" strokeWidth="3.2" strokeLinecap="square" fill="none" />
      <path d="M36 46 L36 24 L48 46 L48 24" stroke={CORAL} strokeWidth="3.2" strokeLinecap="square" fill="none" />
    </svg>
  );
}
function Logo04({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
      <Mark04 size={56 * scale} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 24 * scale, letterSpacing: -0.4, color: INK }}>FlatNest</div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11 * scale, letterSpacing: 2, textTransform: 'uppercase', color: TEAL }}>
          rent · live · stay
        </div>
      </div>
    </div>
  );
}

// ── 05 — "Pin & roof" — geolocation pin where the head is a tiny gabled house ─
function Mark05({ size = 96 }) {
  const s = size;
  return (
    <svg viewBox="0 0 64 64" width={s} height={s}>
      <path d="M32 4 C18 4, 10 14, 10 26 C10 40, 32 60, 32 60 C32 60, 54 40, 54 26 C54 14, 46 4, 32 4 Z" fill={TEAL} />
      {/* house cutout */}
      <path d="M20 28 L32 16 L44 28 L44 38 L20 38 Z" fill="#fff" />
      <rect x="28" y="30" width="8" height="8" fill={CORAL} />
    </svg>
  );
}
function Logo05({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
      <Mark05 size={56 * scale} />
      <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 30 * scale, letterSpacing: -0.4, color: TEAL_INK }}>
        FlatNest
      </div>
    </div>
  );
}

// ── 06 — Pure wordmark — black sans, custom ligature where the "tn" joins ──
function Logo06({ scale = 1 }) {
  return (
    <svg viewBox="0 0 320 64" width={300 * scale} height={60 * scale} aria-label="FlatNest wordmark">
      <text x="0" y="48" fontFamily="Inter" fontWeight="900" fontSize="56" letterSpacing="-2.2" fill={INK}>
        Flat
      </text>
      <text x="124" y="48" fontFamily="Inter" fontWeight="900" fontSize="56" letterSpacing="-2.2" fill={TEAL}>
        Nest
      </text>
      <rect x="118" y="14" width="6" height="36" fill={CORAL} />
    </svg>
  );
}

// ── 07 — Stacked badge — pill lockup, nice for app store / favicon at size ─
function Logo07({ scale = 1 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10 * scale,
      padding: `${10 * scale}px ${18 * scale}px`,
      background: INK, color: '#fff', borderRadius: 999,
      fontFamily: 'Inter', fontWeight: 600, fontSize: 22 * scale, letterSpacing: -0.2,
    }}>
      <svg viewBox="0 0 24 24" width={20 * scale} height={20 * scale}>
        <path d="M3 11 L12 3 L21 11 L21 21 L3 21 Z" fill="none" stroke={CORAL} strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="12" cy="15" r="2" fill={CORAL} />
      </svg>
      flatnest
    </div>
  );
}

// ── 08 — App icon set — square tiles at iOS curvature ─────────────────────
function AppIcon({ children, size = 96, bg = TEAL, radius = 22 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 18px rgba(15, 20, 30, 0.10)',
    }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  Mark01, Mark02, Mark04, Mark05,
  Logo01, Logo02, Logo03, Logo04, Logo05, Logo06, Logo07,
  AppIcon,
  TEAL, TEAL_INK, TEAL_SOFT, CORAL, PAPER, INK,
});
