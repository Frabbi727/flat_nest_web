// logo-canvas.jsx — lay out logo directions on the design canvas.

const { useState } = React;

function CardFrame({ children, bg = '#ffffff', pad = 48 }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: pad, boxSizing: 'border-box',
    }}>
      {children}
    </div>
  );
}

function Caption({ title, note }) {
  return (
    <div style={{ position: 'absolute', left: 16, bottom: 12, fontFamily: 'Inter',
      fontSize: 11, color: '#8A8A8E', letterSpacing: 0.2, textTransform: 'uppercase' }}>
      <span style={{ color: '#1C1C1E', fontWeight: 600 }}>{title}</span>
      {note ? <span> · {note}</span> : null}
    </div>
  );
}

function Tile({ title, note, bg, children }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CardFrame bg={bg}>{children}</CardFrame>
      <Caption title={title} note={note} />
    </div>
  );
}

// Sized for ~420×260 artboards at scale ≈ 1.0
function App() {
  return (
    <DesignCanvas backgroundColor="#f0eee9">
      <DCSection id="primary" title="Primary directions" subtitle="Mark + wordmark, on light surface">
        <DCArtboard id="d1" label="01 — Pitched N" width={460} height={220}>
          <Tile title="01" note="Rooftop hidden in the N · bold, friendly" bg="#ffffff">
            <Logo01 scale={1.15} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="d2" label="02 — Window grid" width={460} height={220}>
          <Tile title="02" note="A flat seen as a window pane · architectural" bg="#ffffff">
            <Logo02 scale={1.15} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="d3" label="03 — Editorial" width={460} height={220}>
          <Tile title="03" note="Serif wordmark · magazine-y, premium" bg="#ffffff">
            <Logo03 scale={1.0} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="d4" label="04 — Folded roof monogram" width={460} height={220}>
          <Tile title="04" note="FN monogram in a gabled tile · with tagline" bg="#ffffff">
            <Logo04 scale={1.0} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="d5" label="05 — Pin & roof" width={460} height={220}>
          <Tile title="05" note="Geolocation pin with a tiny house · place-led" bg="#ffffff">
            <Logo05 scale={1.05} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="d6" label="06 — Pure wordmark" width={460} height={220}>
          <Tile title="06" note="No icon · two-tone wordmark with coral hairline" bg="#ffffff">
            <Logo06 scale={0.95} />
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="dark" title="On dark + paper" subtitle="Reversed-out and warm-paper backgrounds">
        <DCArtboard id="dd1" label="01 on ink" width={460} height={220}>
          <Tile title="01 · dark" bg="#0E484D">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Mark01 size={64} fg="#ffffff" accent={CORAL} />
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 34, letterSpacing: -0.4, color: '#fff' }}>
                Flat<span style={{ color: '#9CD7DC' }}>Nest</span>
              </div>
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="dd2" label="02 on ink" width={460} height={220}>
          <Tile title="02 · dark" bg="#0E484D">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Mark02 size={60} fg="#ffffff" accent={CORAL} />
              <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 30, letterSpacing: -0.3, color: '#fff' }}>
                flatnest
              </div>
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="dd3" label="06 on paper" width={460} height={220}>
          <Tile title="06 · paper" bg="#f0eee9">
            <Logo06 scale={0.95} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="dd4" label="07 pill lockup" width={460} height={220}>
          <Tile title="07" note="Pill lockup · works at small sizes" bg="#f0eee9">
            <Logo07 scale={1.2} />
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="icons" title="App icons" subtitle="Same DNA, sized for the home screen">
        <DCArtboard id="i1" label="01 tile" width={220} height={220}>
          <CardFrame bg="#ffffff" pad={28}>
            <AppIcon size={140} bg={TEAL} radius={32}>
              <svg viewBox="0 0 64 64" width="96" height="96">
                <rect x="14" y="16" width="6" height="32" rx="1" fill="#fff" />
                <rect x="44" y="16" width="6" height="32" rx="1" fill="#fff" />
                <path d="M14 16 L32 32 L50 16 L50 22 L32 38 L14 22 Z" fill={CORAL} />
              </svg>
            </AppIcon>
          </CardFrame>
        </DCArtboard>

        <DCArtboard id="i2" label="02 tile" width={220} height={220}>
          <CardFrame bg="#ffffff" pad={28}>
            <AppIcon size={140} bg="#fff" radius={32}>
              <Mark02 size={92} fg={TEAL} accent={CORAL} />
            </AppIcon>
          </CardFrame>
        </DCArtboard>

        <DCArtboard id="i4" label="04 tile" width={220} height={220}>
          <CardFrame bg="#ffffff" pad={28}>
            <div style={{ width: 140, height: 140, borderRadius: 32, overflow: 'hidden',
              boxShadow: '0 6px 18px rgba(15,20,30,0.10)' }}>
              <Mark04 size={140} />
            </div>
          </CardFrame>
        </DCArtboard>

        <DCArtboard id="i5" label="05 tile" width={220} height={220}>
          <CardFrame bg="#ffffff" pad={28}>
            <AppIcon size={140} bg="#fff" radius={32}>
              <Mark05 size={96} />
            </AppIcon>
          </CardFrame>
        </DCArtboard>

        <DCArtboard id="ifn" label="FN monogram" width={220} height={220}>
          <CardFrame bg="#ffffff" pad={28}>
            <AppIcon size={140} bg={INK} radius={32}>
              <div style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: 64, letterSpacing: -2, color: '#fff', lineHeight: 1 }}>
                F<span style={{ color: CORAL }}>n</span>
              </div>
            </AppIcon>
          </CardFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="usage" title="In use" subtitle="Quick sanity check at real sizes">
        <DCArtboard id="u1" label="App header — direction 01" width={460} height={220}>
          <div style={{ width: '100%', height: '100%', background: '#fff',
            display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #EFF1F4',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Logo01 scale={0.78} />
              <div style={{ width: 32, height: 32, borderRadius: 999, background: '#EEF0F4' }} />
            </div>
            <div style={{ flex: 1, padding: 20, display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, background: '#F7F8FA', borderRadius: 12 }} />
              <div style={{ flex: 1, background: '#F7F8FA', borderRadius: 12 }} />
            </div>
          </div>
        </DCArtboard>

        <DCArtboard id="u2" label="Splash — direction 05" width={460} height={220}>
          <div style={{ width: '100%', height: '100%', background: TEAL,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <Mark05 size={72} />
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 30, letterSpacing: -0.4, color: '#fff' }}>
              FlatNest
            </div>
            <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, letterSpacing: 2,
              textTransform: 'uppercase', color: '#9CD7DC' }}>
              find your place
            </div>
          </div>
        </DCArtboard>

        <DCArtboard id="u3" label="Business card — direction 03" width={460} height={220}>
          <div style={{ width: '100%', height: '100%', background: '#f0eee9',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 280, height: 160, background: '#fff', borderRadius: 6,
              boxShadow: '0 8px 24px rgba(15,20,30,0.10)',
              padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Logo03 scale={0.7} />
              <div style={{ fontFamily: 'Inter', fontSize: 10, color: '#5B5B62', lineHeight: 1.5 }}>
                Maya Okonkwo · Host relations<br />
                maya@flatnest.app · +44 20 7946 0958
              </div>
            </div>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
