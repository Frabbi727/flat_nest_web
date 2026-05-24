/* global React, DesignCanvas, DCSection, DCArtboard */

// ============================================================
// FLATNEST — App icon EXPLORATIONS based on the new pastel
// city/pin reference. Keeps the moodboard vocabulary:
//   - soft mint/teal sky
//   - white buildings with grids of light cyan windows
//   - puffy clouds
//   - coral/red pin marking ONE specific unit
//   - rounded-squircle outer mask
// Every variation is an ORIGINAL composition that explores a
// different way to express the same idea ("pin a place to live").
// ============================================================

const FNP = {
  sky:        '#DCEBED', // outer pale mint
  skyDeep:    '#C7DDE1', // base tile
  outline:    '#B7D2D7', // mint outline used everywhere
  white:      '#FFFFFF',
  windowLite: '#C6E6EA',
  windowMid:  '#A9D8DE',
  cloud:      '#F5FAFB',
  cloudEdge:  '#CFE0E3',
  pin:        '#F36B6B', // coral red
  pinDeep:    '#E25555',
  pinHalo:    '#F9D6D6',
  glow:       '#FFE3A8', // for "available unit" glow variant
  glowEdge:   '#F9C46A',
  ink:        '#3F5A60', // deep teal-grey for any tiny labels
};

/* ============================================================
   Shared primitives — squircle tile, cloud, window grid
   ============================================================ */

// iOS-style superellipse path scaled to 1024×1024
const SQUIRCLE_PATH =
  'M512 0 C 832 0, 1024 192, 1024 512 C 1024 832, 832 1024, 512 1024 C 192 1024, 0 832, 0 512 C 0 192, 192 0, 512 0 Z';

function SquircleTile({ size = 320, bg = FNP.sky, edge = FNP.outline, children, padding = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" style={{ display: 'block' }}>
      <defs>
        <clipPath id={`clip-${React.useId()}`}>
          <path d={SQUIRCLE_PATH} />
        </clipPath>
      </defs>
      <path d={SQUIRCLE_PATH} fill={bg} />
      {/* subtle inner outline like the reference */}
      <path d={SQUIRCLE_PATH} fill="none" stroke={edge} strokeWidth="6" strokeOpacity="0.4"
        transform="translate(40,40) scale(0.922,0.922)" />
      <g>{children}</g>
    </svg>
  );
}

function Cloud({ x, y, scale = 1, opacity = 1 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
      <ellipse cx="0"  cy="0" rx="58" ry="22" fill={FNP.cloud} stroke={FNP.cloudEdge} strokeWidth="3" />
      <ellipse cx="48" cy="-6" rx="34" ry="18" fill={FNP.cloud} stroke={FNP.cloudEdge} strokeWidth="3" />
      <ellipse cx="-46" cy="-4" rx="30" ry="16" fill={FNP.cloud} stroke={FNP.cloudEdge} strokeWidth="3" />
    </g>
  );
}

// A window square — used to build building façades
function Win({ x, y, size = 44, color = FNP.windowMid, r = 8 }) {
  return <rect x={x} y={y} width={size} height={size} rx={r} ry={r} fill={color} />;
}

// A building "card" — rounded rectangle with mint outline like the ref
function BuildingCard({ x, y, w, h, fill = FNP.white, stroke = FNP.outline, strokeWidth = 6, r = 24 }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} ry={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}

// The coral pin (round head + body) used by several concepts
function CoralPin({ cx, cy, scale = 1, halo = true, color = FNP.pin }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {halo && <circle cx="0" cy="6" r="74" fill={FNP.pinHalo} />}
      {/* head */}
      <circle cx="0" cy="-22" r="30" fill={color} />
      {/* short stem + base */}
      <rect x="-22" y="2" width="44" height="36" rx="8" fill={color} />
    </g>
  );
}

/* ============================================================
   VARIATION 01 — Faithful baseline
   Three buildings, pin on a middle-floor window of the tallest.
   This is the reference rebuilt in the same vocabulary as our
   other variations so they sit side-by-side.
   ============================================================ */
function V01_Baseline() {
  return (
    <SquircleTile>
      {/* clouds */}
      <Cloud x={210} y={170} scale={1.4} />
      <Cloud x={760} y={220} scale={1.6} />
      {/* left building */}
      <BuildingCard x={90}  y={500} w={220} h={420} />
      {[0,1,2].map(r => [0,1].map(c => (
        <Win key={`L${r}${c}`} x={140 + c*70} y={560 + r*90} size={50} color={FNP.windowLite} r={10} />
      )))}
      {/* right building */}
      <BuildingCard x={720} y={580} w={220} h={340} />
      {[0,1].map(r => [0,1].map(c => (
        <Win key={`R${r}${c}`} x={770 + c*70} y={640 + r*90} size={50} color={FNP.windowLite} r={10} />
      )))}
      {/* center tall building */}
      <BuildingCard x={320} y={310} w={400} h={620} />
      {[0,1,2,3].map(r => [0,1,2].map(c => (
        <Win key={`C${r}${c}`} x={360 + c*100} y={370 + r*120} size={70} color={r === 3 ? FNP.windowMid : FNP.windowMid} r={14} />
      )))}
      {/* door */}
      <rect x="450" y="820" width="140" height="100" rx="14" fill={FNP.windowMid} />
      {/* pin on the top-right window of the second row */}
      <CoralPin cx={620} cy={530} scale={1.0} />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 02 — Hero single building
   Zoom in on one apartment block. Calmer, more iconic at small
   sizes than a three-building skyline.
   ============================================================ */
function V02_HeroSingle() {
  return (
    <SquircleTile>
      <Cloud x={780} y={180} scale={1.3} />
      <Cloud x={220} y={250} scale={1.0} opacity={0.7} />
      {/* hero building filling most of the tile */}
      <BuildingCard x={180} y={170} w={664} h={760} r={36} strokeWidth={8} />
      {/* 4×5 window grid */}
      {[0,1,2,3,4].map(r => [0,1,2,3].map(c => (
        <Win key={`${r}${c}`} x={250 + c*140} y={250 + r*130} size={96} color={FNP.windowMid} r={20} />
      )))}
      {/* pin on row 2, col 3 */}
      <CoralPin cx={665} cy={428} scale={1.5} />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 03 — Window grid
   Pure façade abstraction. Drops the cloud + skyline, just a
   wall of windows with one unit pinned. Reads beautifully at
   very small sizes.
   ============================================================ */
function V03_WindowGrid() {
  return (
    <SquircleTile bg={FNP.white} edge={FNP.outline}>
      {/* 5×5 windows */}
      {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => {
        const isPinned = r === 2 && c === 3;
        return (
          <Win
            key={`${r}${c}`}
            x={110 + c*160}
            y={110 + r*160}
            size={120}
            color={isPinned ? FNP.windowLite : FNP.windowMid}
            r={24}
          />
        );
      }))}
      {/* pin sitting on top of the highlighted window */}
      <CoralPin cx={650} cy={500} scale={1.6} />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 04 — Mini map
   Bird's-eye view: a few small rounded-square buildings on a
   pale mint plot, with the coral pin selecting one. Reads as
   "browse listings on a map."
   ============================================================ */
function V04_MiniMap() {
  return (
    <SquircleTile bg={FNP.sky}>
      {/* subtle road/path */}
      <path
        d="M0 700 Q 300 660 512 680 T 1024 640"
        fill="none" stroke={FNP.outline} strokeWidth="14" strokeOpacity="0.5" strokeLinecap="round"
      />
      <path
        d="M520 0 Q 480 240 560 420 T 480 1024"
        fill="none" stroke={FNP.outline} strokeWidth="14" strokeOpacity="0.5" strokeLinecap="round"
      />
      {/* tiny buildings dotted around */}
      {[
        { x: 130, y: 180, w: 180, h: 200 },
        { x: 700, y: 140, w: 200, h: 220 },
        { x: 760, y: 770, w: 180, h: 180 },
        { x: 120, y: 760, w: 200, h: 190 },
      ].map((b, i) => (
        <g key={i}>
          <BuildingCard {...b} r={24} strokeWidth={6} />
          <Win x={b.x + 24}            y={b.y + 30} size={50} color={FNP.windowLite} r={10} />
          <Win x={b.x + b.w - 24 - 50} y={b.y + 30} size={50} color={FNP.windowLite} r={10} />
          <Win x={b.x + 24}            y={b.y + 100} size={50} color={FNP.windowLite} r={10} />
          <Win x={b.x + b.w - 24 - 50} y={b.y + 100} size={50} color={FNP.windowLite} r={10} />
        </g>
      ))}
      {/* selected building — center, slightly larger */}
      <BuildingCard x={388} y={368} w={248} h={288} r={28} strokeWidth={8} />
      {[0,1].map(r => [0,1].map(c => (
        <Win key={`s${r}${c}`} x={420 + c*100} y={418 + r*100} size={60} color={FNP.windowMid} r={12} />
      )))}
      {/* pin floats above it */}
      <CoralPin cx={512} cy={300} scale={1.4} />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 05 — Pin at the door
   Same building vocabulary, but the pin marks the ENTRANCE
   instead of a window. Reads as "this is your place" rather
   than "this is the unit."
   ============================================================ */
function V05_DoorPin() {
  return (
    <SquircleTile>
      <Cloud x={250} y={180} scale={1.2} />
      <Cloud x={780} y={240} scale={1.4} />
      <BuildingCard x={230} y={230} w={564} h={700} r={32} strokeWidth={8} />
      {/* 3×3 windows above the door */}
      {[0,1,2].map(r => [0,1,2].map(c => (
        <Win key={`${r}${c}`} x={290 + c*150} y={300 + r*150} size={104} color={FNP.windowMid} r={22} />
      )))}
      {/* door */}
      <rect x="442" y="780" width="140" height="150" rx="20" fill={FNP.windowMid} stroke={FNP.outline} strokeWidth="6" />
      {/* doorknob */}
      <circle cx="558" cy="858" r="6" fill={FNP.outline} />
      {/* pin floats over the door */}
      <CoralPin cx={512} cy={700} scale={1.4} />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 06 — Glowing window (no pin)
   A building façade where one window is warmly lit, signalling
   "your apartment is ready." Friendlier, less utilitarian.
   ============================================================ */
function V06_WindowGlow() {
  return (
    <SquircleTile>
      <Cloud x={780} y={190} scale={1.4} />
      <Cloud x={210} y={260} scale={1.1} opacity={0.7} />
      <BuildingCard x={200} y={190} w={624} h={740} r={36} strokeWidth={8} />
      {/* 4×5 windows */}
      {[0,1,2,3,4].map(r => [0,1,2,3].map(c => {
        const lit = r === 2 && c === 2;
        return (
          <g key={`${r}${c}`}>
            {lit && (
              <circle cx={272 + c*140 + 44} cy={270 + r*130 + 44} r="80" fill={FNP.glow} opacity="0.55" />
            )}
            <Win
              x={272 + c*140}
              y={270 + r*130}
              size={88}
              color={lit ? FNP.glow : FNP.windowMid}
              r={18}
            />
          </g>
        );
      }))}
      {/* lit-window inner cross to make it feel "lit" */}
      <rect x={272 + 2*140 + 42} y={270 + 2*130 + 6} width="4" height="76" fill={FNP.glowEdge} opacity="0.55" />
      <rect x={272 + 2*140 + 6}  y={270 + 2*130 + 42} width="76" height="4" fill={FNP.glowEdge} opacity="0.55" />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 07 — Heart pin (saved / favorite)
   Same composition language but the pin is a soft coral heart
   — playful, friendly, leans into the "nest" warmth.
   ============================================================ */
function V07_HeartPin() {
  return (
    <SquircleTile>
      <Cloud x={210} y={190} scale={1.3} />
      <Cloud x={790} y={250} scale={1.2} />
      <BuildingCard x={210} y={210} w={604} h={720} r={36} strokeWidth={8} />
      {[0,1,2,3,4].map(r => [0,1,2,3].map(c => (
        <Win key={`${r}${c}`} x={270 + c*130} y={290 + r*120} size={92} color={FNP.windowMid} r={20} />
      )))}
      {/* halo */}
      <circle cx={660} cy={530} r="76" fill={FNP.pinHalo} />
      {/* heart, drawn as two circles + triangle */}
      <g transform="translate(660,510)">
        <path
          d="M 0 30
             C -8 10, -50 4, -50 -18
             C -50 -42, -22 -50, 0 -22
             C 22 -50, 50 -42, 50 -18
             C 50 4, 8 10, 0 30 Z"
          fill={FNP.pin}
        />
      </g>
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 08 — Nest (literal play on the name)
   A simple woven nest on the rooftop of the central building.
   Owns the "Flatnest" name without needing to spell it out.
   ============================================================ */
function V08_Nest() {
  return (
    <SquircleTile>
      <Cloud x={780} y={210} scale={1.4} />
      <Cloud x={220} y={260} scale={1.1} opacity={0.8} />
      {/* shorter side building */}
      <BuildingCard x={120} y={580} w={200} h={350} />
      {[0,1].map(r => [0,1].map(c => (
        <Win key={`l${r}${c}`} x={158 + c*70} y={640 + r*100} size={50} color={FNP.windowLite} r={10} />
      )))}
      {/* center building */}
      <BuildingCard x={360} y={400} w={360} h={530} r={28} strokeWidth={8} />
      {[0,1,2].map(r => [0,1,2].map(c => (
        <Win key={`c${r}${c}`} x={400 + c*90} y={450 + r*110} size={62} color={FNP.windowMid} r={12} />
      )))}
      {/* right tiny building */}
      <BuildingCard x={760} y={620} w={160} h={310} />
      {[0,1].map(r => (
        <Win key={`r${r}`} x={790} y={680 + r*100} size={50} color={FNP.windowLite} r={10} />
      ))}
      {/* nest on top of center building */}
      <g transform="translate(540,370)">
        {/* nest bowl */}
        <ellipse cx="0" cy="14" rx="118" ry="34" fill="#D9A877" />
        <ellipse cx="0" cy="0"  rx="118" ry="28" fill="#C99368" />
        <ellipse cx="0" cy="-4" rx="92"  ry="20" fill="#3F5A60" opacity="0.18" />
        {/* twigs */}
        {[-100,-60,-20,20,60,100].map((tx, i) => (
          <g key={i} transform={`translate(${tx},-6) rotate(${tx*0.3})`}>
            <rect x="-3" y="-12" width="6" height="22" rx="3" fill="#A77750" />
          </g>
        ))}
        {/* coral egg */}
        <ellipse cx="0" cy="-6" rx="24" ry="28" fill={FNP.pin} />
        <ellipse cx="-6" cy="-14" rx="6" ry="4" fill={FNP.pinHalo} opacity="0.7" />
      </g>
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 09 — Key-pin
   The pin morphs into a key — its head is the round pin head,
   its body is a key blade. Combines "location" and "access."
   ============================================================ */
function V09_KeyPin() {
  return (
    <SquircleTile>
      <Cloud x={210} y={200} scale={1.2} />
      <Cloud x={800} y={260} scale={1.3} />
      <BuildingCard x={230} y={230} w={564} h={700} r={32} strokeWidth={8} />
      {[0,1,2].map(r => [0,1,2].map(c => (
        <Win key={`${r}${c}`} x={290 + c*150} y={300 + r*150} size={104} color={FNP.windowMid} r={22} />
      )))}
      {/* key floating over a window */}
      <g transform="translate(660,520)">
        <circle cx="0" cy="0" r="76" fill={FNP.pinHalo} />
        {/* key bow */}
        <circle cx="0" cy="-22" r="34" fill={FNP.pin} />
        <circle cx="0" cy="-22" r="14" fill={FNP.white} />
        {/* shaft */}
        <rect x="-7" y="6" width="14" height="60" rx="3" fill={FNP.pin} />
        {/* teeth */}
        <rect x="7"  y="44" width="14" height="8"  rx="2" fill={FNP.pin} />
        <rect x="7"  y="58" width="20" height="8"  rx="2" fill={FNP.pin} />
      </g>
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 10 — Tag / price-card hanging from the building
   A coral "for rent" tag dangles from the rooftop. Stays in the
   pastel vocabulary but introduces a marketplace cue.
   ============================================================ */
function V10_Tag() {
  return (
    <SquircleTile>
      <Cloud x={210} y={180} scale={1.3} />
      <Cloud x={790} y={240} scale={1.2} />
      <BuildingCard x={250} y={290} w={524} h={640} r={32} strokeWidth={8} />
      {[0,1,2,3].map(r => [0,1,2].map(c => (
        <Win key={`${r}${c}`} x={300 + c*150} y={360 + r*130} size={94} color={FNP.windowMid} r={20} />
      )))}
      {/* string */}
      <line x1="700" y1="290" x2="780" y2="190" stroke={FNP.outline} strokeWidth="5" />
      {/* tag */}
      <g transform="translate(820,210) rotate(18)">
        <path d="M -60 -42 L 60 -42 L 90 0 L 60 42 L -60 42 Z" fill={FNP.pin} />
        <circle cx="-44" cy="0" r="8" fill={FNP.pinHalo} />
        {/* tiny window symbol on the tag */}
        <rect x="-22" y="-18" width="34" height="36" rx="6" fill={FNP.pinHalo} opacity="0.85" />
      </g>
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 11 — Cutaway / cross-section
   Strips one wall off the building so you can see the units
   inside, with the pin on one specific apartment. Literal but
   delightful.
   ============================================================ */
function V11_Cutaway() {
  const cellW = 200, cellH = 150;
  return (
    <SquircleTile>
      <Cloud x={210} y={180} scale={1.2} opacity={0.8} />
      <Cloud x={800} y={230} scale={1.4} />
      {/* building outer */}
      <BuildingCard x={170} y={210} w={684} h={720} r={32} strokeWidth={8} />
      {/* grid lines defining 3 cols × 4 rows */}
      {[1,2].map(c => (
        <line key={`v${c}`} x1={170 + c*cellW + 42} y1="240" x2={170 + c*cellW + 42} y2="900"
          stroke={FNP.outline} strokeWidth="5" strokeOpacity="0.7" />
      ))}
      {[1,2,3].map(r => (
        <line key={`h${r}`} x1="200" y1={230 + r*cellH + 30} x2="824" y2={230 + r*cellH + 30}
          stroke={FNP.outline} strokeWidth="5" strokeOpacity="0.7" />
      ))}
      {/* each cell gets a small "apartment" icon — a door + window */}
      {Array.from({ length: 12 }).map((_, i) => {
        const r = Math.floor(i / 3), c = i % 3;
        const cx = 170 + 42 + c * cellW + cellW / 2;
        const cy = 230 + 30 + r * cellH + cellH / 2;
        const selected = r === 1 && c === 2;
        return (
          <g key={i}>
            <rect x={cx - 30} y={cy - 28} width="34" height="44" rx="6" fill={selected ? FNP.pinHalo : FNP.windowLite} />
            <rect x={cx + 8}  y={cy - 18} width="24" height="24" rx="4" fill={selected ? FNP.pinHalo : FNP.windowMid} />
          </g>
        );
      })}
      {/* pin on the selected unit */}
      <CoralPin cx={170 + 42 + 2.5 * cellW} cy={230 + 30 + 1.5 * cellH - 14} scale={0.95} />
    </SquircleTile>
  );
}

/* ============================================================
   VARIATION 12 — Inverse / dark
   Same baseline composition flipped to a deep-teal night sky
   with warm yellow windows. Shows the system still works in
   dark mode.
   ============================================================ */
function V12_Night() {
  const NIGHT = {
    sky:     '#2B4448',
    edge:    '#3C5C61',
    wall:    '#E8F2F3',
    window:  '#F6D580',
    windowD: '#E9B95A',
    cloud:   '#3F5A60',
    cloudE:  '#4D6C72',
  };
  return (
    <svg width="320" height="320" viewBox="0 0 1024 1024" style={{ display: 'block' }}>
      <path d={SQUIRCLE_PATH} fill={NIGHT.sky} />
      {/* moons / soft "clouds" */}
      <g>
        <ellipse cx="240" cy="190" rx="58" ry="20" fill={NIGHT.cloud} stroke={NIGHT.cloudE} strokeWidth="3" />
        <ellipse cx="780" cy="240" rx="64" ry="22" fill={NIGHT.cloud} stroke={NIGHT.cloudE} strokeWidth="3" />
      </g>
      {/* buildings */}
      <rect x="90"  y="500" width="220" height="420" rx="24" fill={NIGHT.wall} stroke={NIGHT.edge} strokeWidth="6" />
      <rect x="720" y="580" width="220" height="340" rx="24" fill={NIGHT.wall} stroke={NIGHT.edge} strokeWidth="6" />
      <rect x="320" y="310" width="400" height="620" rx="28" fill={NIGHT.wall} stroke={NIGHT.edge} strokeWidth="8" />
      {/* center windows */}
      {[0,1,2,3].map(r => [0,1,2].map(c => {
        const lit = (r + c) % 2 === 0;
        return (
          <rect key={`c${r}${c}`} x={360 + c*100} y={370 + r*120} width="70" height="70" rx="14"
            fill={lit ? NIGHT.window : NIGHT.windowD} opacity={lit ? 1 : 0.6} />
        );
      }))}
      {[0,1,2].map(r => [0,1].map(c => (
        <rect key={`l${r}${c}`} x={140 + c*70} y={560 + r*90} width="50" height="50" rx="10"
          fill={NIGHT.window} opacity={(r+c) % 2 === 0 ? 1 : 0.55} />
      )))}
      {[0,1].map(r => [0,1].map(c => (
        <rect key={`r${r}${c}`} x={770 + c*70} y={640 + r*90} width="50" height="50" rx="10"
          fill={NIGHT.window} opacity={(r+c) % 2 === 0 ? 1 : 0.55} />
      )))}
      {/* coral pin still pops on dark */}
      <CoralPin cx={620} cy={530} scale={1.0} />
    </svg>
  );
}

/* ============================================================
   PALETTE swatch — useful for the user to see what the
   variations share
   ============================================================ */
function PaletteRow() {
  const swatches = [
    { n: 'sky',        h: FNP.sky },
    { n: 'sky deep',   h: FNP.skyDeep },
    { n: 'outline',    h: FNP.outline },
    { n: 'window lite', h: FNP.windowLite },
    { n: 'window mid', h: FNP.windowMid },
    { n: 'cloud',      h: FNP.cloud },
    { n: 'pin',        h: FNP.pin },
    { n: 'pin halo',   h: FNP.pinHalo },
    { n: 'glow',       h: FNP.glow },
    { n: 'ink',        h: FNP.ink },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', background: '#F8FBFC', borderRadius: 18,
      padding: 20, boxSizing: 'border-box',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12,
    }}>
      {swatches.map(s => (
        <div key={s.h} style={{
          background: s.h, borderRadius: 12,
          border: `1px solid ${FNP.outline}55`,
          padding: 10, minHeight: 86, display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          color: s.h === FNP.pin ? '#fff' : FNP.ink,
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10,
          letterSpacing: '0.06em',
        }}>
          <div style={{ opacity: 0.7, textTransform: 'uppercase' }}>{s.n}</div>
          <div style={{ fontWeight: 700, fontSize: 11 }}>{s.h}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Home-screen contact sheet — show one variation in context
   ============================================================ */
function HomeScreenMock({ Variation }) {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',
      background: 'linear-gradient(160deg, #3a5b66 0%, #1f3037 100%)',
      padding: 24, boxSizing: 'border-box',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, alignContent: 'start',
    }}>
      {Array.from({ length: 16 }).map((_, i) => {
        if (i === 6) {
          return (
            <div key={i} style={{ aspectRatio: '1 / 1', borderRadius: 16, overflow: 'hidden' }}>
              <Variation />
            </div>
          );
        }
        return (
          <div key={i} style={{
            aspectRatio: '1 / 1', borderRadius: 16,
            background: `oklch(${0.4 + (i % 4) * 0.1} 0.07 ${(i * 37 + 180) % 360})`,
            opacity: 0.75,
          }} />
        );
      })}
    </div>
  );
}

/* ============================================================
   Wrapper that scales an SVG-only variation to fill its tile
   ============================================================ */
function Frame({ children, note }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#F4F8FA', borderRadius: 18,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: 14, boxSizing: 'border-box',
    }}>
      <div style={{ filter: 'drop-shadow(0 12px 28px rgba(55,90,100,0.18))' }}>
        {children}
      </div>
      {note && (
        <div style={{
          position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10,
          color: FNP.ink, opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{note}</div>
      )}
    </div>
  );
}

/* ============================================================
   CANVAS
   ============================================================ */
function App() {
  const VARIATIONS = [
    { id: 'v01', label: '01 · Baseline — three buildings',  Comp: V01_Baseline,    note: 'closest to reference' },
    { id: 'v02', label: '02 · Hero single building',         Comp: V02_HeroSingle,  note: 'iconic at 60px' },
    { id: 'v03', label: '03 · Window grid (no sky)',         Comp: V03_WindowGrid,  note: 'minimal, scaleable' },
    { id: 'v04', label: '04 · Mini map (overhead)',          Comp: V04_MiniMap,     note: 'browse cue' },
    { id: 'v05', label: '05 · Pin at the door',              Comp: V05_DoorPin,     note: 'arrival, not unit' },
    { id: 'v06', label: '06 · Glowing window',               Comp: V06_WindowGlow,  note: 'no pin · warm cue' },
    { id: 'v07', label: '07 · Heart pin (saved)',            Comp: V07_HeartPin,    note: 'softer, playful' },
    { id: 'v08', label: '08 · Nest on rooftop',              Comp: V08_Nest,        note: 'plays the name' },
    { id: 'v09', label: '09 · Key-pin',                      Comp: V09_KeyPin,      note: 'access cue' },
    { id: 'v10', label: '10 · For-rent tag',                 Comp: V10_Tag,         note: 'marketplace cue' },
    { id: 'v11', label: '11 · Cutaway interior',             Comp: V11_Cutaway,     note: 'units visible' },
    { id: 'v12', label: '12 · Night mode',                   Comp: V12_Night,       note: 'dark variant' },
  ];

  return (
    <DesignCanvas
      title="Flatnest — App Icon Ideas (pastel direction)"
      subtitle="Twelve original variations grounded in the new mint/coral vocabulary. Same outer squircle, same palette, different ideas for what the icon depicts."
      background="#0e1a1d"
      defaultZoom={0.7}
    >
      {/* Section A — the line-up at icon size */}
      <DCSection id="lineup" title="Line-up · icon size">
        {VARIATIONS.map(v => (
          <DCArtboard key={v.id} id={v.id} label={v.label} width={340} height={360}>
            <Frame note={v.note}><v.Comp /></Frame>
          </DCArtboard>
        ))}
      </DCSection>

      {/* Section B — hero scale of the strongest few */}
      <DCSection id="hero" title="At hero size">
        {[V02_HeroSingle, V03_WindowGrid, V08_Nest].map((Comp, i) => (
          <DCArtboard key={i} id={`hero-${i}`} label={['02 · Hero single','03 · Window grid','08 · Nest'][i]} width={500} height={500}>
            <div style={{
              width: '100%', height: '100%', background: '#F4F8FA', borderRadius: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              filter: 'drop-shadow(0 24px 36px rgba(55,90,100,0.22))',
            }}>
              <div style={{ transform: 'scale(1.35)' }}><Comp /></div>
            </div>
          </DCArtboard>
        ))}
      </DCSection>

      {/* Section C — at very small size, to test legibility */}
      <DCSection id="small" title="Legibility · 56–96px">
        {VARIATIONS.map(v => (
          <DCArtboard key={`s-${v.id}`} id={`s-${v.id}`} label={v.label.split(' · ')[0]} width={220} height={220}>
            <div style={{
              width: '100%', height: '100%', background: '#F4F8FA', borderRadius: 18,
              display: 'grid', gridTemplateColumns: '1fr 1fr', placeItems: 'center', gap: 8,
              padding: 14, boxSizing: 'border-box',
            }}>
              <div style={{ transform: 'scale(0.30)', transformOrigin: 'center' }}><v.Comp /></div>
              <div style={{ transform: 'scale(0.18)', transformOrigin: 'center' }}><v.Comp /></div>
            </div>
          </DCArtboard>
        ))}
      </DCSection>

      {/* Section D — in context on a phone home screen */}
      <DCSection id="context" title="On a home screen">
        {[V02_HeroSingle, V03_WindowGrid, V07_HeartPin, V08_Nest].map((Comp, i) => (
          <DCArtboard key={i} id={`ctx-${i}`} label={['02 · Hero','03 · Grid','07 · Heart','08 · Nest'][i]} width={420} height={520}>
            <HomeScreenMock Variation={Comp} />
          </DCArtboard>
        ))}
      </DCSection>

      {/* Section E — palette */}
      <DCSection id="palette" title="Palette (shared across all variations)">
        <DCArtboard id="pal" label="from the moodboard" width={760} height={220}>
          <PaletteRow />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
