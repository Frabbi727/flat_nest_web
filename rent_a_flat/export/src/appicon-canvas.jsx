/* global React, DesignCanvas, DCSection, DCArtboard */

// ============================================================
// FLATNEST — App icon + splash screen
// Palette pulled from the user's moodboard:
//   green   #4CAF50   (primary)
//   deep    #2E7D32   (gradient end / depth)
//   slate   #263238   (ink / dark mode)
//   paper   #F5F5F5   (off-white)
//
// Mark: location pin holding a house. Original geometry — sharper
// and more geometric than the moodboard illustration. The icon is
// shown WITHOUT text, per spec.
// ============================================================

const FN = {
  green:  '#4CAF50',
  deep:   '#2E7D32',
  slate:  '#263238',
  paper:  '#F5F5F5',
  white:  '#FFFFFF',
  ink:    '#0E1418',
};

/* ============================================================
   MARK — pin + house, no text
   Sized to a 200×200 viewBox; pass {size, fill, accent}
   ============================================================ */
function PinHouse({ size = 200, fill = FN.white, accent }) {
  // accent defaults to a slightly transparent shade of fill for the
  // window cutout, so the same mark works on green, white, or slate
  // backgrounds without re-coloring.
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {/* Pin silhouette — teardrop with a soft round top.
          Drawn as one path so the fill is unified. */}
      <path
        d="M100 16
           C 56 16, 24 48, 24 92
           C 24 124, 46 154, 78 174
           L 95 188
           Q 100 192 105 188
           L 122 174
           C 154 154, 176 124, 176 92
           C 176 48, 144 16, 100 16 Z"
        fill={fill}
      />
      {/* House cutout — uses a mask so the house reads as "negative
          space" inside the pin, which keeps the icon crisp at small
          sizes (no thin strokes to disappear). */}
      <g style={{ mixBlendMode: 'destination-out' }}>
        {/* The mixBlendMode trick is brittle across renderers — fall back
            to drawing the house with the *background* color instead. */}
      </g>
      {/* Roof */}
      <path
        d="M64 96 L100 64 L136 96 L136 100 L64 100 Z"
        fill={accent || 'transparent'}
        opacity="0"
      />
      {/* Proper "knockout" approach: draw the house in the BACKGROUND
          color (passed via accent) on top of the pin fill. */}
      <g transform="translate(0,0)">
        {/* roof line */}
        <path
          d="M58 100 L100 64 L142 100 Z"
          fill={accent}
        />
        {/* body */}
        <rect x="68" y="98" width="64" height="42" fill={accent} />
        {/* window */}
        <rect x="89" y="108" width="22" height="22" rx="2" fill={fill} />
        {/* window cross */}
        <rect x="99" y="108" width="2" height="22" fill={accent} />
        <rect x="89" y="118" width="22" height="2" fill={accent} />
      </g>
    </svg>
  );
}

/* Same mark but solid (single color) — used when there's no
   background to knock out against, e.g. monochrome lockups. */
function PinHouseSolid({ size = 200, color = FN.slate }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {/* pin */}
      <path
        d="M100 16
           C 56 16, 24 48, 24 92
           C 24 124, 46 154, 78 174
           L 95 188
           Q 100 192 105 188
           L 122 174
           C 154 154, 176 124, 176 92
           C 176 48, 144 16, 100 16 Z
           M 58 100 L100 64 L142 100 L142 140 L58 140 Z"
        fill={color}
        fillRule="evenodd"
      />
      {/* window as a separate cut-out */}
      <rect x="89" y="108" width="22" height="22" rx="2" fill={color} />
      <rect x="89" y="108" width="22" height="22" rx="2" fill={FN.paper} />
      <rect x="99" y="108" width="2" height="22" fill={color} />
      <rect x="89" y="118" width="22" height="2" fill={color} />
    </svg>
  );
}

/* ============================================================
   APP ICON TILES — different masks (rounded square, squircle, circle)
   Always green gradient bg, white mark, no text.
   ============================================================ */

// Shared gradient defs reused across icons.
function IconGradientDefs({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor={FN.green} />
        <stop offset="100%" stopColor={FN.deep}  />
      </linearGradient>
    </defs>
  );
}

function IconRoundedSquare({ size = 220, mark = FN.white, bg }) {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 220 220">
      <IconGradientDefs id={id} />
      <rect x="0" y="0" width="220" height="220" rx="50" ry="50" fill={bg || `url(#${id})`} />
      <g transform="translate(35,30)">
        <PinHouse size={150} fill={mark} accent={bg ? bg : FN.green} />
      </g>
    </svg>
  );
}

function IconSquircle({ size = 220, mark = FN.white, bg }) {
  const id = React.useId();
  // squircle path (superellipse approximation) — fuller, iOS-style corners
  return (
    <svg width={size} height={size} viewBox="0 0 220 220">
      <IconGradientDefs id={id} />
      <path
        d="M110 0
           C 178 0, 220 42, 220 110
           C 220 178, 178 220, 110 220
           C 42 220, 0 178, 0 110
           C 0 42, 42 0, 110 0 Z"
        fill={bg || `url(#${id})`}
      />
      <g transform="translate(35,30)">
        <PinHouse size={150} fill={mark} accent={bg ? bg : FN.green} />
      </g>
    </svg>
  );
}

function IconCircle({ size = 220, mark = FN.white, bg }) {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 220 220">
      <IconGradientDefs id={id} />
      <circle cx="110" cy="110" r="110" fill={bg || `url(#${id})`} />
      <g transform="translate(35,30)">
        <PinHouse size={150} fill={mark} accent={bg ? bg : FN.green} />
      </g>
    </svg>
  );
}

/* ============================================================
   ARTBOARD WRAPPERS
   ============================================================ */
function Tile({ children, bg = FN.paper, label }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg, borderRadius: 18,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {children}
      {label && (
        <div style={{
          position: 'absolute', bottom: 14, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10,
          color: bg === FN.slate || bg === FN.ink ? FN.paper : FN.slate,
          opacity: 0.55, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
}

/* ============================================================
   SPLASH SCREENS
   Three takes — kept clean, no text, just the mark anchored.
   Sized as portrait phone aspect (390×844-ish).
   ============================================================ */

function SplashLight() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${FN.paper} 0%, #E8F5E9 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', borderRadius: 36,
    }}>
      {/* soft radial halo behind the mark */}
      <div style={{
        position: 'absolute', width: 360, height: 360, borderRadius: '50%',
        background: `radial-gradient(circle, ${FN.green}33 0%, transparent 65%)`,
      }} />
      <IconSquircle size={150} />
    </div>
  );
}

function SplashCity() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, #F1F8F2 0%, #E8F5E9 60%, #DCEDC8 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden', borderRadius: 36,
    }}>
      {/* mark */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <IconSquircle size={140} />
      </div>
      {/* city silhouette */}
      <svg viewBox="0 0 390 220" width="100%" height="220" style={{ display: 'block' }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="city" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={FN.green} stopOpacity="0.18" />
            <stop offset="100%" stopColor={FN.deep}  stopOpacity="0.32" />
          </linearGradient>
        </defs>
        {/* back layer */}
        <path
          d="M0 140
             L20 130 L20 100 L48 100 L48 120 L72 120 L72 80 L96 80 L96 110
             L120 110 L120 92 L152 92 L152 120 L180 120 L180 70 L208 70 L208 110
             L240 110 L240 96 L272 96 L272 120 L300 120 L300 84 L328 84 L328 116
             L360 116 L360 100 L390 100 L390 220 L0 220 Z"
          fill="url(#city)"
        />
        {/* front layer, slightly darker */}
        <path
          d="M0 170
             L24 160 L24 140 L56 140 L56 165 L88 165 L88 148 L120 148 L120 170
             L156 170 L156 152 L196 152 L196 175 L228 175 L228 158 L264 158 L264 172
             L300 172 L300 150 L336 150 L336 168 L370 168 L370 158 L390 158 L390 220 L0 220 Z"
          fill={FN.green} fillOpacity="0.28"
        />
      </svg>
    </div>
  );
}

function SplashDark() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${FN.slate} 0%, #0E1A1D 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', borderRadius: 36,
    }}>
      {/* soft halo */}
      <div style={{
        position: 'absolute', width: 320, height: 320, borderRadius: '50%',
        background: `radial-gradient(circle, ${FN.green}55 0%, transparent 60%)`,
        filter: 'blur(8px)',
      }} />
      {/* the icon on dark sits inside a white "tile" like iOS app icon */}
      <div style={{
        width: 168, height: 168, borderRadius: 38, background: FN.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 20px 60px rgba(76,175,80,0.35), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        <IconSquircle size={132} />
      </div>
    </div>
  );
}

/* ============================================================
   DEVICE FRAME — minimal iPhone-ish bezel for the splashes,
   so they read as actual screens.
   ============================================================ */
function PhoneFrame({ children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: FN.paper, borderRadius: 18, padding: 22, boxSizing: 'border-box',
    }}>
      <div style={{
        width: 280, height: 580, borderRadius: 44,
        background: FN.slate, padding: 8, boxSizing: 'border-box',
        boxShadow: '0 30px 60px -20px rgba(38,50,56,0.45), 0 0 0 1px rgba(0,0,0,0.05)',
        position: 'relative',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
          position: 'relative',
        }}>
          {children}
          {/* status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 22px', fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 11, fontWeight: 600, color: FN.slate, mixBlendMode: 'multiply',
          }}>
            <span>9:41</span>
            <span>···</span>
          </div>
          {/* notch */}
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            width: 90, height: 22, background: FN.slate, borderRadius: 14,
          }} />
          {/* home indicator */}
          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 4, background: 'currentColor', borderRadius: 2,
            color: 'rgba(38,50,56,0.4)',
          }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CANVAS
   ============================================================ */
function App() {
  return (
    <DesignCanvas
      title="Flatnest — App Icon & Splash"
      subtitle="Green palette from your moodboard. Mark only, no text — geometric pin-with-house."
      background={FN.ink}
      defaultZoom={0.78}
    >
      {/* Row 1 — hero icon */}
      <DCSection id="hero" title="Hero icon">
        <DCArtboard id="hero-sq" label="Squircle · primary" width={420} height={420}>
          <div style={{
            width: '100%', height: '100%', background: FN.paper, borderRadius: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* subtle grid */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(${FN.slate}0a 1px, transparent 1px), linear-gradient(90deg, ${FN.slate}0a 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }} />
            <div style={{
              filter: 'drop-shadow(0 24px 40px rgba(46,125,50,0.35))',
            }}>
              <IconSquircle size={300} />
            </div>
          </div>
        </DCArtboard>

        <DCArtboard id="hero-grid" label="Size grid" width={420} height={420}>
          <div style={{
            width: '100%', height: '100%', background: FN.slate, borderRadius: 18,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
            placeItems: 'center', padding: 32, boxSizing: 'border-box',
          }}>
            <IconSquircle size={56}  />
            <IconSquircle size={92}  />
            <IconSquircle size={130} />
            <IconSquircle size={130} />
            <IconSquircle size={92}  />
            <IconSquircle size={56}  />
          </div>
        </DCArtboard>
      </DCSection>

      {/* Row 2 — icon shapes */}
      <DCSection id="shapes" title="App icon · shapes">
        <DCArtboard id="rs" label="Rounded square" width={280} height={300}>
          <Tile label="ios · android" >
            <IconRoundedSquare size={180} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="sq" label="Squircle" width={280} height={300}>
          <Tile label="ios native">
            <IconSquircle size={180} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="ci" label="Circle" width={280} height={300}>
          <Tile label="watch · pin">
            <IconCircle size={180} />
          </Tile>
        </DCArtboard>
      </DCSection>

      {/* Row 3 — color variants of the squircle */}
      <DCSection id="colorways" title="Colorways">
        <DCArtboard id="cw-grad" label="Green gradient" width={260} height={280}>
          <Tile label="primary"><IconSquircle size={170} /></Tile>
        </DCArtboard>
        <DCArtboard id="cw-flat" label="Flat green" width={260} height={280}>
          <Tile label="flat">
            <IconSquircle size={170} bg={FN.green} mark={FN.white} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="cw-deep" label="Deep green" width={260} height={280}>
          <Tile label="deep">
            <IconSquircle size={170} bg={FN.deep} mark={FN.white} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="cw-slate" label="Slate" width={260} height={280}>
          <Tile label="dark">
            <IconSquircle size={170} bg={FN.slate} mark={FN.green} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="cw-paper" label="Paper" width={260} height={280}>
          <Tile label="inverted">
            <IconSquircle size={170} bg={FN.paper} mark={FN.green} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="cw-mono" label="Monochrome" width={260} height={280}>
          <Tile label="monochrome">
            <IconSquircle size={170} bg={FN.slate} mark={FN.paper} />
          </Tile>
        </DCArtboard>
      </DCSection>

      {/* Row 4 — splash screens, in phone frames */}
      <DCSection id="splash" title="Splash screen">
        <DCArtboard id="sp-light" label="Light · minimal" width={360} height={640}>
          <PhoneFrame><SplashLight /></PhoneFrame>
        </DCArtboard>
        <DCArtboard id="sp-city" label="Light · city" width={360} height={640}>
          <PhoneFrame><SplashCity /></PhoneFrame>
        </DCArtboard>
        <DCArtboard id="sp-dark" label="Dark · halo" width={360} height={640}>
          <PhoneFrame><SplashDark /></PhoneFrame>
        </DCArtboard>
      </DCSection>

      {/* Row 5 — on-device contact sheet */}
      <DCSection id="ondevice" title="On-device contact sheet">
        <DCArtboard id="hs" label="Home screen mock" width={760} height={420}>
          <div style={{
            width: '100%', height: '100%', background: FN.slate, borderRadius: 18,
            padding: 40, boxSizing: 'border-box',
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 28,
            placeItems: 'center',
            backgroundImage: `radial-gradient(circle at 30% 20%, ${FN.deep}55, transparent 50%), radial-gradient(circle at 80% 80%, ${FN.green}33, transparent 55%), ${FN.slate}`,
          }}>
            {/* placeholder app icons + ours, to show legibility next to neighbors */}
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} style={{
                width: 76, height: 76, borderRadius: 18,
                background: `oklch(${0.35 + (i % 4) * 0.12} 0.06 ${(i * 47) % 360})`,
                opacity: 0.7,
              }} />
            ))}
            {/* ours, mid-grid */}
            <div style={{ gridColumn: '3 / span 1', gridRow: '2 / span 1' }}>
              <IconRoundedSquare size={76} />
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* Row 6 — palette reference */}
      <DCSection id="palette" title="Palette">
        <DCArtboard id="pal" label="Sampled from your moodboard" width={760} height={220}>
          <div style={{
            width: '100%', height: '100%', background: FN.paper, borderRadius: 18,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
            padding: 24, boxSizing: 'border-box',
          }}>
            {[
              { name: 'green',  hex: FN.green },
              { name: 'deep',   hex: FN.deep  },
              { name: 'slate',  hex: FN.slate },
              { name: 'paper',  hex: FN.paper },
            ].map(c => (
              <div key={c.hex} style={{
                background: c.hex, borderRadius: 14,
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: 14, color: c.hex === FN.paper ? FN.slate : FN.paper,
                fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                border: c.hex === FN.paper ? `1px solid ${FN.slate}22` : 'none',
              }}>
                <div style={{ opacity: 0.7 }}>{c.name}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
