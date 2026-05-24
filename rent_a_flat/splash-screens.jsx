/* global React, DesignCanvas, DCSection, DCArtboard */

// ============================================================
// FLATNEST — Splash screen explorations (with wordmark)
// Pastel mint/coral vocabulary from the v4 icon reference.
// Font: Quicksand — rounded, soft, friendly. Pairs with the
// puffy-cloud illustrative style.
// ============================================================

const P = {
  skyTop:     '#EAF4F5',
  sky:        '#DCEBED',
  skyDeep:    '#C7DDE1',
  outline:    '#B7D2D7',
  white:      '#FFFFFF',
  windowLite: '#C6E6EA',
  windowMid:  '#A9D8DE',
  cloud:      '#F5FAFB',
  cloudEdge:  '#CFE0E3',
  pin:        '#F36B6B',
  pinDeep:    '#E25555',
  pinHalo:    '#F9D6D6',
  glow:       '#FFE3A8',
  ink:        '#3F5A60',
  inkSoft:    '#7A969C',
  night:      '#1F3338',
  nightDeep:  '#142226',
};

const FAM = `'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`;

// Phone canvas dimensions used across every splash artboard
const PHONE_W = 300;
const PHONE_H = 620;

/* ============================================================
   PRIMITIVES
   ============================================================ */

const SQUIRCLE =
  'M512 0 C 832 0, 1024 192, 1024 512 C 1024 832, 832 1024, 512 1024 C 192 1024, 0 832, 0 512 C 0 192, 192 0, 512 0 Z';

// Compact app-icon used inside splashes
function MiniIcon({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" style={{ display: 'block' }}>
      <path d={SQUIRCLE} fill={P.sky} />
      <path d={SQUIRCLE} fill="none" stroke={P.outline} strokeWidth="6" strokeOpacity="0.4"
        transform="translate(40,40) scale(0.922,0.922)" />
      <ellipse cx="240" cy="190" rx="58" ry="20" fill={P.cloud} stroke={P.cloudEdge} strokeWidth="3" />
      <ellipse cx="780" cy="240" rx="64" ry="22" fill={P.cloud} stroke={P.cloudEdge} strokeWidth="3" />
      <rect x="220" y="240" width="584" height="700" rx="36" fill={P.white} stroke={P.outline} strokeWidth="8" />
      {[0,1,2,3,4].map(r => [0,1,2,3].map(c => (
        <rect key={`${r}${c}`} x={270 + c*128} y={310 + r*120} width="88" height="88" rx="18" fill={P.windowMid} />
      )))}
      <circle cx="660" cy="540" r="74" fill={P.pinHalo} />
      <circle cx="660" cy="510" r="30" fill={P.pin} />
      <rect x="638" y="534" width="44" height="36" rx="8" fill={P.pin} />
    </svg>
  );
}

// Inline pin glyph for stylistic use within wordmarks
function PinGlyph({ size = 36, color = P.pin }) {
  return (
    <svg width={size} height={size * 1.55} viewBox="0 0 60 94" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <circle cx="30" cy="30" r="26" fill={color} />
      <rect x="14" y="50" width="32" height="34" rx="7" fill={color} />
    </svg>
  );
}

// Drifting cloud (absolutely positioned)
function DriftCloud({ x, y, scale = 1, opacity = 1, color = P.cloud, edge = P.cloudEdge }) {
  return (
    <svg
      style={{ position: 'absolute', left: x, top: y, transform: `scale(${scale})`, transformOrigin: 'top left', opacity, pointerEvents: 'none' }}
      width="140" height="60" viewBox="-70 -30 140 60"
    >
      <ellipse cx="0"  cy="0"  rx="58" ry="22" fill={color} stroke={edge} strokeWidth="3" />
      <ellipse cx="42" cy="-6" rx="32" ry="18" fill={color} stroke={edge} strokeWidth="3" />
      <ellipse cx="-42" cy="-4" rx="28" ry="16" fill={color} stroke={edge} strokeWidth="3" />
    </svg>
  );
}

/* ============================================================
   WORDMARK — "flatnest"
   Default lockup: "flat" + soft dot + "nest"
   `pin` variant replaces the dot with the coral pin (best read
   as a small floating mark above the seam)
   ============================================================ */
function Wordmark({ size = 44, color = P.ink, variant = 'dot', weight = 700, tracking = '-0.02em' }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: size * 0.08,
      fontFamily: FAM, fontWeight: weight, fontSize: size, color, letterSpacing: tracking, lineHeight: 1,
    }}>
      <span>flat</span>
      {variant === 'pin' ? (
        <span style={{
          display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'flex-end', height: size, paddingBottom: size * 0.04,
        }}>
          <PinGlyph size={size * 0.36} />
        </span>
      ) : variant === 'none' ? null : (
        <span style={{
          width: size * 0.16, height: size * 0.16, borderRadius: '50%',
          background: variant === 'coral' ? P.pin : color, marginTop: size * 0.6,
        }} />
      )}
      <span>nest</span>
    </div>
  );
}

/* ============================================================
   SKYLINE — a small reusable building strip
   ============================================================ */
function SkylineStrip({ width = PHONE_W, height = 180, dark = false }) {
  const wallFill = dark ? '#34555B' : P.white;
  const wallStroke = dark ? '#4D7177' : P.outline;
  const win = dark ? P.glow : P.windowMid;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {/* back layer */}
      <rect x={width*0.05}  y={height*0.42} width={width*0.18} height={height*0.55} rx="8" fill={wallFill} stroke={wallStroke} strokeWidth="2" />
      <rect x={width*0.72}  y={height*0.32} width={width*0.20} height={height*0.65} rx="8" fill={wallFill} stroke={wallStroke} strokeWidth="2" />
      {/* center tall */}
      <rect x={width*0.28} y={height*0.10} width={width*0.40} height={height*0.87} rx="10" fill={wallFill} stroke={wallStroke} strokeWidth="2.5" />
      {/* windows on center */}
      {[0,1,2,3].map(r => [0,1,2].map(c => (
        <rect key={`c${r}${c}`} x={width*0.32 + c * width*0.105} y={height*0.18 + r * height*0.18}
          width={width*0.075} height={height*0.12} rx="3" fill={win} opacity={dark && (r+c)%2===0 ? 1 : (dark ? 0.55 : 1)} />
      )))}
      {/* windows on sides */}
      {[0,1].map(r => [0,1].map(c => (
        <rect key={`l${r}${c}`} x={width*0.075 + c * width*0.07} y={height*0.5 + r * height*0.18}
          width={width*0.05} height={height*0.1} rx="2" fill={win} opacity={dark ? 0.5 : 1} />
      )))}
      {[0,1,2].map(r => (
        <rect key={`r${r}`} x={width*0.77} y={height*0.42 + r * height*0.16}
          width={width*0.05} height={height*0.09} rx="2" fill={win} opacity={dark ? 0.55 : 1} />
      ))}
      {/* coral pin on center building */}
      <g transform={`translate(${width*0.56},${height*0.28})`}>
        <circle cx="0" cy="6" r={width*0.06} fill={P.pinHalo} />
        <circle cx="0" cy="-2" r={width*0.026} fill={P.pin} />
        <rect x={-width*0.02} y={width*0.012} width={width*0.04} height={width*0.034} rx="2" fill={P.pin} />
      </g>
    </svg>
  );
}

/* ============================================================
   SPLASHES — each is rendered inside the phone frame
   They all assume parent is {position: relative, w: PHONE_W, h: PHONE_H}
   ============================================================ */

// 01 — Centered icon + wordmark, soft sky
function S01_Centered() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.sky} 70%, ${P.skyDeep} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
    }}>
      <DriftCloud x={20}  y={110} scale={0.55} opacity={0.9} />
      <DriftCloud x={180} y={70}  scale={0.45} opacity={0.7} />
      <DriftCloud x={10}  y={470} scale={0.4} opacity={0.6} />
      <DriftCloud x={170} y={510} scale={0.6} opacity={0.85} />
      <div style={{ filter: 'drop-shadow(0 14px 28px rgba(55,90,100,0.25))' }}>
        <MiniIcon size={130} />
      </div>
      <Wordmark size={40} variant="pin" />
      <div style={{
        fontFamily: FAM, fontWeight: 500, fontSize: 11, color: P.inkSoft,
        letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: -8,
      }}>find your nest</div>
    </div>
  );
}

// 02 — Wordmark up top, skyline anchored to bottom
function S02_Skyline() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.sky} 100%)`,
    }}>
      <DriftCloud x={20}  y={120} scale={0.55} />
      <DriftCloud x={170} y={170} scale={0.45} opacity={0.75} />
      <DriftCloud x={50}  y={260} scale={0.4} opacity={0.65} />
      <div style={{
        position: 'absolute', top: '30%', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <Wordmark size={42} variant="pin" />
        <div style={{
          fontFamily: FAM, fontWeight: 500, fontSize: 10.5, color: P.inkSoft,
          letterSpacing: '0.24em', textTransform: 'uppercase',
        }}>rent · stay · belong</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <SkylineStrip width={PHONE_W} height={220} />
      </div>
    </div>
  );
}

// 03 — Wordmark is the hero: huge "flatnest", coral pin marks a letter
function S03_Type() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: P.skyTop,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0,
    }}>
      {/* big stacked type */}
      <div style={{
        fontFamily: FAM, fontWeight: 800, fontSize: 64, color: P.ink,
        letterSpacing: '-0.04em', lineHeight: 0.92, textAlign: 'center', position: 'relative',
      }}>
        <div>flat</div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          nest
          {/* pin perched on top of the 'n' */}
          <div style={{ position: 'absolute', top: -38, left: 6 }}>
            <PinGlyph size={26} />
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 28, fontFamily: FAM, fontWeight: 500, fontSize: 12, color: P.inkSoft,
        letterSpacing: '0.26em', textTransform: 'uppercase',
      }}>find your nest</div>
      {/* corner ornaments */}
      <div style={{
        position: 'absolute', top: 60, left: 28, width: 32, height: 32,
        borderTop: `2px solid ${P.outline}`, borderLeft: `2px solid ${P.outline}`, borderRadius: '6px 0 0 0', opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute', bottom: 60, right: 28, width: 32, height: 32,
        borderBottom: `2px solid ${P.outline}`, borderRight: `2px solid ${P.outline}`, borderRadius: '0 0 6px 0', opacity: 0.5,
      }} />
    </div>
  );
}

// 04 — Window grid as backdrop, wordmark over the lit unit
function S04_GridBackdrop() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: P.white,
    }}>
      <svg viewBox="0 0 300 620" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {/* 4 columns x 7 rows of windows */}
        {[0,1,2,3,4,5,6].map(r => [0,1,2,3].map(c => {
          const lit = r === 3 && c === 2;
          return (
            <rect key={`${r}${c}`} x={20 + c*70} y={20 + r*82} width="60" height="62" rx="12"
              fill={lit ? P.glow : P.windowMid} opacity={lit ? 1 : 0.85} />
          );
        }))}
      </svg>
      {/* center plate */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
        <div style={{
          background: P.white, padding: '22px 28px', borderRadius: 22,
          border: `2px solid ${P.outline}`,
          boxShadow: '0 20px 40px rgba(55,90,100,0.18)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}>
          <Wordmark size={32} variant="pin" />
          <div style={{
            fontFamily: FAM, fontWeight: 500, fontSize: 10, color: P.inkSoft,
            letterSpacing: '0.24em', textTransform: 'uppercase',
          }}>find your nest</div>
        </div>
      </div>
    </div>
  );
}

// 05 — Coral pin drops onto the wordmark from above (looks like animation freeze frame)
function S05_PinDrop() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.sky} 100%)`,
    }}>
      <DriftCloud x={20}  y={90} scale={0.45} opacity={0.75} />
      <DriftCloud x={180} y={140} scale={0.55} opacity={0.85} />
      {/* dashed flight path */}
      <svg width="100%" height="100%" viewBox="0 0 300 620" style={{ position: 'absolute', inset: 0 }}>
        <path d="M 150 80 Q 130 200 150 280" fill="none" stroke={P.outline} strokeWidth="2" strokeDasharray="3 6" opacity="0.7" />
      </svg>
      {/* the pin, mid-drop */}
      <div style={{ position: 'absolute', top: 230, left: '50%', transform: 'translateX(-50%)' }}>
        <PinGlyph size={56} />
      </div>
      {/* halo shadow on ground */}
      <div style={{
        position: 'absolute', top: 360, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 16, borderRadius: '50%', background: P.pinHalo, filter: 'blur(2px)',
      }} />
      {/* wordmark below */}
      <div style={{
        position: 'absolute', top: 400, left: 0, right: 0, textAlign: 'center',
      }}>
        <Wordmark size={36} variant="none" />
        <div style={{
          marginTop: 12, fontFamily: FAM, fontWeight: 500, fontSize: 11, color: P.inkSoft,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>your spot, marked</div>
      </div>
    </div>
  );
}

// 06 — Dark / night version
function S06_Night() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${P.night} 0%, ${P.nightDeep} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22,
    }}>
      {/* faint stars / dot grid */}
      <svg width="100%" height="100%" viewBox="0 0 300 620" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id="stars" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill={P.glow} />
          </pattern>
        </defs>
        <rect width="300" height="620" fill="url(#stars)" />
      </svg>
      {/* glow halo behind icon */}
      <div style={{
        position: 'absolute', width: 260, height: 260, borderRadius: '50%',
        background: `radial-gradient(circle, ${P.glow}44 0%, transparent 65%)`,
        top: '24%',
      }} />
      <div style={{
        filter: `drop-shadow(0 0 24px ${P.glow}66)`, zIndex: 1,
      }}>
        <MiniIcon size={130} />
      </div>
      <Wordmark size={40} color={P.cloud} variant="pin" />
      <div style={{
        fontFamily: FAM, fontWeight: 500, fontSize: 11, color: P.glow, opacity: 0.7,
        letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: -10,
      }}>welcome home</div>
    </div>
  );
}

// 07 — Editorial: icon top-left, wordmark big bottom-left, taglines on right
function S07_Editorial() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: P.skyTop, padding: 28, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <MiniIcon size={64} />
        <div style={{
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10, color: P.inkSoft,
          letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.7,
        }}>
          v 1.0<br />
          est. 2025
        </div>
      </div>
      <div>
        <div style={{
          fontFamily: FAM, fontWeight: 500, fontSize: 13, color: P.inkSoft, marginBottom: 14,
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>a place to call yours</div>
        <Wordmark size={56} variant="coral" />
        <div style={{
          marginTop: 16, paddingTop: 14, borderTop: `1px solid ${P.outline}66`,
          fontFamily: FAM, fontWeight: 500, fontSize: 12, color: P.ink,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>rent</span><span>·</span><span>stay</span><span>·</span><span>belong</span>
        </div>
      </div>
    </div>
  );
}

// 08 — Skyline framed: icon on left, wordmark right, skyline bottom
function S08_FullScene() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.sky} 65%, ${P.skyDeep} 100%)`,
    }}>
      <DriftCloud x={20}  y={70}  scale={0.5} />
      <DriftCloud x={180} y={120} scale={0.4} opacity={0.8} />
      {/* hero icon centered upper */}
      <div style={{
        position: 'absolute', top: '14%', left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        filter: 'drop-shadow(0 14px 24px rgba(55,90,100,0.22))',
      }}>
        <MiniIcon size={140} />
      </div>
      {/* wordmark center */}
      <div style={{
        position: 'absolute', top: '52%', left: 0, right: 0, textAlign: 'center',
      }}>
        <Wordmark size={42} variant="pin" />
        <div style={{
          marginTop: 12, fontFamily: FAM, fontWeight: 500, fontSize: 11, color: P.inkSoft,
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>find your nest</div>
      </div>
      {/* mini skyline as ground */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 130 }}>
        <SkylineStrip width={PHONE_W} height={130} />
      </div>
    </div>
  );
}

// 09 — Loader / progress: subtle dots animation captured at one frame
function S09_Loader() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.sky} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
    }}>
      <DriftCloud x={20}  y={120} scale={0.5} opacity={0.75} />
      <DriftCloud x={190} y={160} scale={0.4} opacity={0.65} />
      <div style={{ filter: 'drop-shadow(0 14px 26px rgba(55,90,100,0.22))' }}>
        <MiniIcon size={120} />
      </div>
      <Wordmark size={36} variant="pin" />
      {/* loader dots */}
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i === 1 ? P.pin : P.outline,
            opacity: i === 1 ? 1 : 0.6,
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontFamily: FAM, fontWeight: 500, fontSize: 11, color: P.inkSoft,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>finding the perfect place…</div>
    </div>
  );
}

// 10 — Postcard / stamp aesthetic
function S10_Postcard() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: '#F4EFE2',
    }}>
      {/* paper texture via dots */}
      <svg width="100%" height="100%" viewBox="0 0 300 620" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <defs>
          <pattern id="paper" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#C4B89A" />
          </pattern>
        </defs>
        <rect width="300" height="620" fill="url(#paper)" />
      </svg>
      {/* stamp area top-right */}
      <div style={{
        position: 'absolute', top: 32, right: 28, width: 96, height: 110,
        border: `2px dashed ${P.outline}`, padding: 6, boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: P.skyTop,
      }}>
        <MiniIcon size={84} />
      </div>
      {/* postmark */}
      <div style={{
        position: 'absolute', top: 60, left: 28,
        border: `2px solid ${P.pin}`, color: P.pin, borderRadius: '50%',
        width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FAM, fontWeight: 700, fontSize: 11, textAlign: 'center',
        letterSpacing: '0.12em', lineHeight: 1.2, transform: 'rotate(-8deg)',
      }}>
        FLAT<br/>NEST<br/>·2025·
      </div>
      {/* wordmark bottom */}
      <div style={{
        position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center',
      }}>
        <Wordmark size={46} variant="coral" />
        <div style={{
          marginTop: 10, fontFamily: FAM, fontWeight: 500, fontSize: 11, color: P.inkSoft,
          letterSpacing: '0.24em', textTransform: 'uppercase',
        }}>send me home</div>
      </div>
      {/* address lines */}
      <div style={{
        position: 'absolute', bottom: 56, left: 28, right: 28,
        borderTop: `1px solid ${P.outline}`, paddingTop: 14,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ height: 1, background: P.outline, opacity: 0.5, width: ['80%', '60%', '70%'][i] }} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   WRAP each splash in the phone frame
   ============================================================ */
function SplashTile({ Comp, scheme = 'light' }) {
  return (
    <Phone scheme={scheme}>
      <Comp />
    </Phone>
  );
}

function Phone({ children, scheme = 'light' }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: scheme === 'dark' ? '#0E1A1D' : '#EEF5F6', borderRadius: 18, padding: 20, boxSizing: 'border-box',
    }}>
      <div style={{
        width: PHONE_W, height: PHONE_H, borderRadius: 46,
        background: scheme === 'dark' ? '#1A2A2E' : '#2B4448', padding: 8, boxSizing: 'border-box',
        boxShadow: '0 40px 80px -28px rgba(43,68,72,0.55), 0 0 0 1px rgba(0,0,0,0.05)',
        position: 'relative',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 38, overflow: 'hidden',
          position: 'relative', background: '#fff',
        }}>
          {children}
          {/* status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 11, fontWeight: 700, color: scheme === 'dark' ? P.cloud : P.ink, opacity: 0.85,
            pointerEvents: 'none', zIndex: 10,
          }}>
            <span>9:41</span>
            <span>···</span>
          </div>
          {/* notch */}
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            width: 90, height: 22, background: scheme === 'dark' ? '#1A2A2E' : '#2B4448', borderRadius: 14, zIndex: 11,
          }} />
          {/* home indicator */}
          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 4, background: scheme === 'dark' ? P.cloud : P.ink, opacity: 0.4, borderRadius: 2, zIndex: 10,
          }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   WORDMARK STUDIES — separate artboards for the logo lockups
   ============================================================ */
function WordmarkStudy({ label, bg, color = P.ink, variant = 'pin', size = 56, sub }) {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',
      background: bg, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 14, position: 'relative',
    }}>
      <Wordmark size={size} color={color} variant={variant} />
      {sub && (
        <div style={{
          fontFamily: FAM, fontWeight: 500, fontSize: 11, color,
          opacity: 0.65, letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>{sub}</div>
      )}
      <div style={{
        position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10,
        color, opacity: 0.45, letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

/* ============================================================
   CANVAS
   ============================================================ */
function App() {
  const SPLASHES = [
    { id: 's01', label: '01 · Centered hero',       Comp: S01_Centered,      scheme: 'light' },
    { id: 's02', label: '02 · Skyline at bottom',   Comp: S02_Skyline,       scheme: 'light' },
    { id: 's03', label: '03 · Big type',            Comp: S03_Type,          scheme: 'light' },
    { id: 's04', label: '04 · Window grid card',    Comp: S04_GridBackdrop,  scheme: 'light' },
    { id: 's05', label: '05 · Pin drop',            Comp: S05_PinDrop,       scheme: 'light' },
    { id: 's06', label: '06 · Night mode',          Comp: S06_Night,         scheme: 'dark'  },
    { id: 's07', label: '07 · Editorial layout',    Comp: S07_Editorial,     scheme: 'light' },
    { id: 's08', label: '08 · Full scene',          Comp: S08_FullScene,     scheme: 'light' },
    { id: 's09', label: '09 · Loader (in-app)',     Comp: S09_Loader,        scheme: 'light' },
    { id: 's10', label: '10 · Postcard',            Comp: S10_Postcard,      scheme: 'light' },
  ];

  return (
    <DesignCanvas
      title="Flatnest — Splash Screens"
      subtitle="Ten directions for the launch screen, all using the pastel icon vocabulary and a Quicksand wordmark."
      background="#0e1a1d"
      defaultZoom={0.7}
    >
      <DCSection id="wordmark" title="Wordmark studies (no scene)">
        <DCArtboard id="wm-1" label="Coral pin · dot replacement" width={420} height={240}>
          <WordmarkStudy label="primary" bg={P.skyTop} variant="pin" size={64} sub="find your nest" />
        </DCArtboard>
        <DCArtboard id="wm-2" label="Soft dot · neutral" width={420} height={240}>
          <WordmarkStudy label="neutral" bg={P.white} variant="dot" size={64} />
        </DCArtboard>
        <DCArtboard id="wm-3" label="Coral dot" width={420} height={240}>
          <WordmarkStudy label="accent" bg={P.skyTop} variant="coral" size={64} />
        </DCArtboard>
        <DCArtboard id="wm-4" label="Inverted on coral" width={420} height={240}>
          <WordmarkStudy label="reverse" bg={P.pin} color={P.white} variant="none" size={64} />
        </DCArtboard>
        <DCArtboard id="wm-5" label="On night" width={420} height={240}>
          <WordmarkStudy label="dark" bg={P.night} color={P.cloud} variant="pin" size={64} />
        </DCArtboard>
        <DCArtboard id="wm-6" label="Icon + wordmark, horizontal" width={420} height={240}>
          <div style={{
            width: '100%', height: '100%', background: P.skyTop, borderRadius: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          }}>
            <MiniIcon size={84} />
            <Wordmark size={48} variant="none" />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="splashes" title="Splash screens · on device">
        {SPLASHES.map(s => (
          <DCArtboard key={s.id} id={s.id} label={s.label} width={400} height={760}>
            <SplashTile Comp={s.Comp} scheme={s.scheme} />
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="full" title="Splash screens · full-bleed (no device)">
        {SPLASHES.map(s => (
          <DCArtboard key={`fb-${s.id}`} id={`fb-${s.id}`} label={s.label} width={320} height={680}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',
              boxShadow: '0 24px 60px -20px rgba(43,68,72,0.4)',
            }}>
              <s.Comp />
            </div>
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
