/* global React */

// ============================================================
// FLATNEST — v2
// Anchored to the sketch: a HOUSE ICON replaces the word "Flat",
// and the wordmark just reads "nest". The mark must also carry
// the SEARCH / find-a-home idea.
//
// Six refined directions, each as: mark · lockup · app icon.
// Plus a sketch→refined comparison row up top.
//
// Palette (oklch, harmonised):
//   ink     : oklch(0.22 0.03 50)    near-black warm
//   brick   : oklch(0.58 0.14 40)    terracotta (matches sketch ink)
//   cream   : oklch(0.97 0.012 80)
//   moss    : oklch(0.55 0.09 155)   (optional accent)
// Type: Plus Jakarta Sans (rounded geometric, friendly for an app)
// ============================================================

const C = {
  ink:    "oklch(0.22 0.03 50)",
  brick:  "oklch(0.58 0.14 40)",
  cream:  "oklch(0.97 0.012 80)",
  moss:   "oklch(0.55 0.09 155)",
  paper:  "oklch(0.94 0.015 75)",
  shadow: "oklch(0.45 0.06 50)",
};

/* ============================================================
   MARKS  — each takes {size, color, accent}
   ============================================================ */

/* 01 — HOUSE + LENS
   The window of the house is a magnifying lens. House = flat,
   lens = search. Most literal to the brief. */
function MarkHouseLens({ size = 200, color = C.ink, accent = C.brick }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* house body */}
      <path
        d="M28 96 L100 36 L172 96 L172 168 Q172 174 166 174 L34 174 Q28 174 28 168 Z"
        fill={color}
      />
      {/* roof eave highlight */}
      <path
        d="M22 100 L100 36 L178 100"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* lens = "window" */}
      <circle cx="90" cy="118" r="28" fill={C.cream} />
      <circle cx="90" cy="118" r="28" stroke={accent} strokeWidth="10" fill="none" />
      {/* lens handle */}
      <rect
        x="108" y="138" width="36" height="12" rx="6"
        fill={accent}
        transform="rotate(45 108 138)"
      />
    </svg>
  );
}

/* 02 — SKETCH-FAITHFUL
   Clean refinement of the user's drawing: roof + wall + square
   window, exact silhouette, no search element. The wordmark
   carries everything else. */
function MarkSketchHouse({ size = 200, color = C.ink, accent = C.brick }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* pitched roof, long right eave like sketch */}
      <path
        d="M30 110 L92 50 L186 110"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* left wall */}
      <path
        d="M44 102 L44 170"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* floor */}
      <path
        d="M44 170 L140 170"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* right post (short, like sketch) */}
      <path
        d="M140 124 L140 170"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* square window */}
      <rect x="70" y="118" width="36" height="36" rx="3" stroke={accent} strokeWidth="10" fill="none" />
    </svg>
  );
}

/* 03 — LENS WITH HOUSE INSIDE
   Magnifier IS the logo; a tiny house sits inside the lens.
   "Find your nest." */
function MarkLensHouse({ size = 200, color = C.ink, accent = C.brick }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* handle */}
      <rect
        x="128" y="148" width="56" height="18" rx="9"
        fill={color}
        transform="rotate(45 128 148)"
      />
      {/* lens ring */}
      <circle cx="86" cy="86" r="60" fill={C.cream} stroke={color} strokeWidth="14" />
      {/* tiny house inside */}
      <path
        d="M58 96 L86 70 L114 96 L114 116 L58 116 Z"
        fill={accent}
      />
      <rect x="78" y="100" width="16" height="16" fill={C.cream} />
    </svg>
  );
}

/* 04 — PIN HOUSE
   Location pin shaped like a house with a doorway opening
   = nesting. Search-by-map metaphor. */
function MarkPinHouse({ size = 200, color = C.ink, accent = C.brick }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* pin silhouette with pitched top */}
      <path
        d="M100 22
           L48 70
           L48 122
           Q48 138 60 148
           L100 184
           L140 148
           Q152 138 152 122
           L152 70 Z"
        fill={color}
      />
      {/* door = entrance to the nest */}
      <path
        d="M86 152 L86 110 Q86 96 100 96 Q114 96 114 110 L114 152 Z"
        fill={accent}
      />
      {/* small egg in the doorway */}
      <circle cx="100" cy="138" r="6" fill={C.cream} />
    </svg>
  );
}

/* 05 — ROOF + LENS
   Just a roof line + a lens hanging under it. Minimal, modern. */
function MarkRoofLens({ size = 200, color = C.ink, accent = C.brick }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* roof */}
      <path
        d="M24 100 L100 40 L176 100"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* lens */}
      <circle cx="92" cy="130" r="30" stroke={color} strokeWidth="14" fill="none" />
      {/* handle */}
      <rect
        x="114" y="152" width="42" height="14" rx="7"
        fill={accent}
        transform="rotate(45 114 152)"
      />
    </svg>
  );
}

/* 06 — HOUSE-IN-CHAT
   House inside a search/chat-bubble pointer. "Your home, found." */
function MarkBubble({ size = 200, color = C.ink, accent = C.brick }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* rounded square bubble */}
      <path
        d="M30 38
           Q30 22 46 22
           L154 22
           Q170 22 170 38
           L170 134
           Q170 150 154 150
           L96 150
           L72 178
           L72 150
           L46 150
           Q30 150 30 134 Z"
        fill={color}
      />
      {/* house inside */}
      <path
        d="M64 96 L100 64 L136 96 L136 124 L64 124 Z"
        fill={accent}
      />
      <rect x="92" y="100" width="16" height="24" fill={color} />
    </svg>
  );
}

/* ============================================================
   WORDMARK  — "nest" only (sketch concept)
   ============================================================ */
function NestWord({ color = C.ink, size = 56, weight = 800, ls = "-0.04em" }) {
  return (
    <span style={{
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontWeight: weight,
      color,
      fontSize: size,
      letterSpacing: ls,
      lineHeight: 1,
    }}>
      nest
    </span>
  );
}

/* Full "Flatnest" wordmark — useful where the icon is too small */
function FullWord({ color = C.ink, size = 36 }) {
  return (
    <span style={{
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontWeight: 700,
      color,
      fontSize: size,
      letterSpacing: "-0.025em",
      lineHeight: 1,
    }}>
      Flat<span style={{ color: C.brick }}>nest</span>
    </span>
  );
}

/* ============================================================
   LOCKUP — icon on the left, "nest" right next to it,
   exactly like the sketch
   ============================================================ */
function Lockup({ Mark, color = C.ink, accent = C.brick, bg = C.cream, label, sub }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: bg, borderRadius: 18,
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 18, padding: 28, boxSizing: "border-box", position: "relative",
    }}>
      <Mark size={120} color={color} accent={accent} />
      <NestWord color={color} size={64} />
      <div style={{
        position: "absolute", bottom: 14, left: 20, right: 20,
        display: "flex", justifyContent: "space-between",
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        color, opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        <span>{label}</span>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function MarkTile({ Mark, label, color = C.ink, accent = C.brick, bg = C.cream }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: bg, borderRadius: 18,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <Mark size={180} color={color} accent={accent} />
      <div style={{
        position: "absolute", bottom: 14, left: 16, right: 16,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        color, opacity: 0.55, letterSpacing: "0.08em", textTransform: "uppercase",
        textAlign: "center",
      }}>
        {label}
      </div>
    </div>
  );
}

function AppIcon({ Mark, bg = C.brick, fg = C.cream, accent = C.cream }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: C.paper, borderRadius: 18,
    }}>
      <div style={{
        width: 200, height: 200, background: bg, borderRadius: 46,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.25)",
      }}>
        <Mark size={130} color={fg} accent={accent} />
      </div>
    </div>
  );
}

/* ============================================================
   SKETCH ARTBOARD — show the original next to the refined
   interpretation so the user sees the through-line.
   ============================================================ */
function SketchCard() {
  return (
    <div style={{
      width: "100%", height: "100%", background: C.paper, borderRadius: 18,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 24, boxSizing: "border-box", position: "relative",
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent 0, transparent 23px, rgba(0,0,0,0.08) 23px, rgba(0,0,0,0.08) 24px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* hand-styled house */}
        <svg width={140} height={140} viewBox="0 0 200 200" fill="none" style={{ transform: "rotate(-2deg)" }}>
          <path
            d="M30 110 L92 50 L186 110"
            stroke={C.brick} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: "url(#wob)" }}
          />
          <path d="M44 100 L44 170 L140 170 L140 122" stroke={C.brick} strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="72" y="120" width="32" height="32" stroke={C.brick} strokeWidth="5" fill="none" />
          <defs>
            <filter id="wob"><feTurbulence baseFrequency="0.04" numOctaves="2" /><feDisplacementMap in="SourceGraphic" scale="2" /></filter>
          </defs>
        </svg>
        <span style={{
          fontFamily: "'Caveat', 'Bradley Hand', cursive",
          fontSize: 80, color: C.brick, fontWeight: 700, transform: "rotate(-2deg)",
        }}>
          nest
        </span>
      </div>
      <div style={{
        position: "absolute", bottom: 14, left: 20, right: 20,
        display: "flex", justifyContent: "space-between",
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        color: C.ink, opacity: 0.55, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        <span>your sketch</span>
        <span>concept</span>
      </div>
    </div>
  );
}

/* ============================================================
   CANVAS
   ============================================================ */
const MARKS = [
  { id: "house-lens",  Mark: MarkHouseLens,   name: "House + Lens",        note: "search lives in the window" },
  { id: "sketch",      Mark: MarkSketchHouse, name: "Sketch (refined)",    note: "faithful to your drawing" },
  { id: "lens-house",  Mark: MarkLensHouse,   name: "Lens with House",     note: "find your nest" },
  { id: "pin-house",   Mark: MarkPinHouse,    name: "Pin House",           note: "map / location search" },
  { id: "roof-lens",   Mark: MarkRoofLens,    name: "Roof + Lens",         note: "minimal, modern" },
  { id: "bubble",      Mark: MarkBubble,      name: "House in Bubble",     note: "your home, found" },
];

function App() {
  return (
    <DesignCanvas
      title="Flatnest — v2"
      subtitle="House replaces 'Flat', wordmark is 'nest', and the search concept lives in the mark."
      background={C.ink}
      defaultZoom={0.72}
    >
      {/* Row 0 — sketch reference */}
      <DCSection id="ref" title="Reference">
        <DCArtboard id="sketch-card" label="Your sketch" width={520} height={360}>
          <SketchCard />
        </DCArtboard>
        <DCArtboard id="reading" label="How we read it" width={520} height={360}>
          <div style={{
            width: "100%", height: "100%", background: C.cream, borderRadius: 18,
            padding: 32, boxSizing: "border-box",
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: C.ink,
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 12,
          }}>
            <div style={{ fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>Concept</div>
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              The house <span style={{ color: C.brick }}>is</span> the "Flat."<br/>
              The wordmark reads <span style={{ fontStyle: "italic" }}>nest</span>.<br/>
              The mark also carries <span style={{ color: C.brick }}>search</span>.
            </div>
            <div style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.5 }}>
              Six directions below — each plays with how house + search combine. Tell me which to refine.
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* Row 1 — full lockups (icon + "nest") */}
      <DCSection id="lockups" title="Lockups · icon + 'nest'">
        {MARKS.map((m, i) => (
          <DCArtboard key={m.id} id={`lk-${m.id}`} label={`0${i+1} · ${m.name}`} width={520} height={300}>
            <Lockup Mark={m.Mark} label={m.name} sub={m.note} />
          </DCArtboard>
        ))}
      </DCSection>

      {/* Row 2 — marks only */}
      <DCSection id="marks" title="Marks only">
        {MARKS.map((m) => (
          <DCArtboard key={m.id} id={`mk-${m.id}`} label={m.name} width={320} height={320}>
            <MarkTile Mark={m.Mark} label={m.name} />
          </DCArtboard>
        ))}
      </DCSection>

      {/* Row 3 — app icons (rounded square, iOS) */}
      <DCSection id="appicons" title="App icons">
        {MARKS.map((m) => (
          <DCArtboard key={m.id} id={`ai-${m.id}`} label={m.name} width={260} height={260}>
            <AppIcon Mark={m.Mark} bg={C.brick} fg={C.cream} accent={C.cream} />
          </DCArtboard>
        ))}
      </DCSection>

      {/* Row 4 — colorways of the leading direction (House + Lens) */}
      <DCSection id="colorways" title="Colorways · House + Lens">
        <DCArtboard id="cw-cream" label="Cream / ink"   width={320} height={320}>
          <MarkTile Mark={MarkHouseLens} label="Cream · Ink · Brick" bg={C.cream} color={C.ink} accent={C.brick} />
        </DCArtboard>
        <DCArtboard id="cw-brick" label="Brick / cream" width={320} height={320}>
          <MarkTile Mark={MarkHouseLens} label="Brick · Cream" bg={C.brick} color={C.cream} accent={C.cream} />
        </DCArtboard>
        <DCArtboard id="cw-ink"   label="Ink / cream"   width={320} height={320}>
          <MarkTile Mark={MarkHouseLens} label="Ink · Cream · Brick" bg={C.ink} color={C.cream} accent={C.brick} />
        </DCArtboard>
        <DCArtboard id="cw-moss"  label="Moss / cream"  width={320} height={320}>
          <MarkTile Mark={MarkHouseLens} label="Moss · Cream" bg={C.moss} color={C.cream} accent={C.cream} />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
