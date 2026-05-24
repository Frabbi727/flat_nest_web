// logo-marks-v2.jsx — six AESTHETIC, unique FlatNest marks.
// No clichés (no literal houses, roofs, windows or pins).
// Each mark is a distilled idea expressed as a single confident shape.

const V2 = {
  ink:      '#1B1A17',
  paper:    '#F1ECE2',  // warm bone
  cream:    '#FAF6EE',
  teal:     '#0F4F4F',  // deeper, mossier teal
  terra:    '#C4623E',  // burnt terracotta
  ochre:    '#C9943A',
  forest:   '#1F3F2E',
  plum:     '#4A1F3D',
  sand:     '#D9C6A3',
  smoke:    '#5A5750',
};

// ── A — "Whorl" ────────────────────────────────────────────────────────────
// A single continuous spiral that reads as a woven nest AND a fingerprint
// (a place that's uniquely yours). Drawn as one stroke, no fill.
function MarkWhorl({ size = 96, stroke = V2.ink, sw = 2.6 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <path
        d="M32 56
           C 14 56, 10 40, 14 30
           C 18 18, 32 14, 40 20
           C 48 26, 46 38, 36 40
           C 28 41, 24 34, 28 30
           C 32 26, 38 30, 36 34"
        fill="none" stroke={stroke} strokeWidth={sw}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ── B — "Arch" ─────────────────────────────────────────────────────────────
// A single tall arch — Mediterranean doorway / Bauhaus — with a small offset
// circle as keystone/lamp. Architectural without being a house.
function MarkArch({ size = 96, fg = V2.ink, dot = V2.terra }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <path
        d="M14 56 L14 30 A18 18 0 0 1 50 30 L50 56"
        fill="none" stroke={fg} strokeWidth="3" strokeLinecap="square"
      />
      <circle cx="32" cy="22" r="3.2" fill={dot} />
    </svg>
  );
}

// ── C — "Fold" ─────────────────────────────────────────────────────────────
// An origami fold — a sheet of paper turned into a tiny shelter. Two planes
// of slightly different value sell the dimensionality.
function MarkFold({ size = 96, light = V2.cream, mid = V2.sand, dark = V2.terra }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <rect x="6" y="6" width="52" height="52" rx="4" fill={light} stroke={V2.ink} strokeWidth="1.2" />
      <path d="M6 6 L32 32 L58 6 Z" fill={mid} />
      <path d="M32 32 L58 6 L58 32 Z" fill={dark} opacity="0.95" />
      <path d="M6 6 L32 32 L58 6" fill="none" stroke={V2.ink} strokeWidth="1.2" />
    </svg>
  );
}

// ── D — "Bowl" ─────────────────────────────────────────────────────────────
// A half-moon cradle. Reads as a nest, a bowl, a hammock — soft and human.
// One filled crescent, one hairline above (the horizon / a person settling in).
function MarkBowl({ size = 96, fg = V2.ink, accent = V2.ochre }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <path
        d="M8 30 Q 32 60, 56 30 L 50 30 Q 32 50, 14 30 Z"
        fill={fg}
      />
      <circle cx="32" cy="20" r="4" fill={accent} />
    </svg>
  );
}

// ── E — "Plan" ─────────────────────────────────────────────────────────────
// An architectural floor-plan glyph — three lines suggesting walls + a doorway
// gap. Reads as both an "F" and a tiny apartment plan view.
function MarkPlan({ size = 96, fg = V2.ink, accent = V2.terra }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      {/* outer L */}
      <path d="M14 50 L14 14 L50 14" fill="none" stroke={fg} strokeWidth="4" strokeLinecap="square" />
      {/* interior wall with door gap */}
      <path d="M14 32 L26 32 M34 32 L42 32" stroke={fg} strokeWidth="4" strokeLinecap="square" />
      {/* door swing */}
      <path d="M26 32 A 8 8 0 0 1 34 24" fill="none" stroke={accent} strokeWidth="2" />
    </svg>
  );
}

// ── F — "Knot" ─────────────────────────────────────────────────────────────
// Two interlinked rings forming an infinity-like figure. Owner ↔ Renter,
// place ↔ person. A single continuous loop.
function MarkKnot({ size = 96, a = V2.ink, b = V2.terra, sw = 3.2 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <circle cx="22" cy="32" r="14" fill="none" stroke={a} strokeWidth={sw} />
      <circle cx="42" cy="32" r="14" fill="none" stroke={b} strokeWidth={sw} />
      {/* over/under: hide a slice of ring B where it crosses ring A */}
      <path
        d="M 36.1 22.5 A 14 14 0 0 1 36.1 41.5"
        fill="none" stroke="#fff" strokeWidth={sw + 1.6}
      />
      <path
        d="M 36.1 22.5 A 14 14 0 0 1 36.1 41.5"
        fill="none" stroke={b} strokeWidth={sw}
      />
    </svg>
  );
}

// ── Wordmark presets ───────────────────────────────────────────────────────
function Wordmark({ children, font = 'Fraunces', weight = 500, size = 32, tracking = -0.8, color = V2.ink, italic = false }) {
  return (
    <span style={{
      fontFamily: font, fontWeight: weight, fontSize: size,
      letterSpacing: tracking, color, fontStyle: italic ? 'italic' : 'normal',
      lineHeight: 1,
    }}>
      {children}
    </span>
  );
}

function MicroLabel({ children, color = V2.smoke, tracking = 3, size = 9 }) {
  return (
    <span style={{
      fontFamily: 'Inter', fontWeight: 500, fontSize: size, letterSpacing: tracking,
      textTransform: 'uppercase', color,
    }}>
      {children}
    </span>
  );
}

// ── Composed lockups ───────────────────────────────────────────────────────
function LockupA({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 * scale }}>
      <MarkWhorl size={72 * scale} stroke={V2.ink} sw={2.4} />
      <Wordmark size={28 * scale} tracking={-1.2}>flatnest</Wordmark>
    </div>
  );
}

function LockupB({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
      <MarkArch size={56 * scale} fg={V2.ink} dot={V2.terra} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale, lineHeight: 1 }}>
        <Wordmark size={26 * scale} tracking={-0.6} weight={500}>FlatNest</Wordmark>
        <MicroLabel size={9 * scale}>est. somewhere</MicroLabel>
      </div>
    </div>
  );
}

function LockupC({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale }}>
      <MarkFold size={56 * scale} />
      <Wordmark size={28 * scale} tracking={-0.4} weight={600} font="Inter">flatnest</Wordmark>
    </div>
  );
}

function LockupD({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 * scale }}>
      <MarkBowl size={44 * scale} fg={V2.forest} accent={V2.ochre} />
      <Wordmark size={30 * scale} tracking={-1} color={V2.forest} italic>Flatnest</Wordmark>
    </div>
  );
}

function LockupE({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
      <MarkPlan size={56 * scale} fg={V2.ink} accent={V2.terra} />
      <Wordmark size={26 * scale} tracking={2} weight={500} font="Inter" color={V2.ink}>
        FLATNEST
      </Wordmark>
    </div>
  );
}

function LockupF({ scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale }}>
      <MarkKnot size={56 * scale} a={V2.ink} b={V2.terra} />
      <Wordmark size={28 * scale} tracking={-0.4} weight={500}>flatnest</Wordmark>
    </div>
  );
}

Object.assign(window, {
  V2,
  MarkWhorl, MarkArch, MarkFold, MarkBowl, MarkPlan, MarkKnot,
  Wordmark, MicroLabel,
  LockupA, LockupB, LockupC, LockupD, LockupE, LockupF,
});
