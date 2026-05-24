// logo-canvas-v2.jsx — aesthetic logo exploration

function Tile({ bg, pad = 56, children, footer }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: pad,
      boxSizing: 'border-box', overflow: 'hidden' }}>
      {children}
      {footer ? (
        <div style={{ position: 'absolute', left: 18, bottom: 14, fontFamily: 'Inter',
          fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.45)' }}>
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <DesignCanvas backgroundColor="#E8E2D6">
      <DCSection id="marks" title="Six aesthetic directions" subtitle="No house/roof/window clichés — each is one confident idea">

        <DCArtboard id="a" label="A · Whorl" width={420} height={300}>
          <Tile bg={V2.cream} footer="A · spiral / fingerprint / nest">
            <LockupA scale={1.2} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="b" label="B · Arch" width={420} height={300}>
          <Tile bg={V2.cream} footer="B · doorway · keystone dot">
            <LockupB scale={1.2} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="c" label="C · Fold" width={420} height={300}>
          <Tile bg={V2.paper} footer="C · origami · paper turned to shelter">
            <LockupC scale={1.2} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="d" label="D · Bowl" width={420} height={300}>
          <Tile bg={V2.cream} footer="D · cradle · soft, human">
            <LockupD scale={1.2} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="e" label="E · Plan" width={420} height={300}>
          <Tile bg={V2.cream} footer="E · architectural plan glyph">
            <LockupE scale={1.2} />
          </Tile>
        </DCArtboard>

        <DCArtboard id="f" label="F · Knot" width={420} height={300}>
          <Tile bg={V2.cream} footer="F · owner ↔ renter · linked rings">
            <LockupF scale={1.2} />
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="onpaper" title="On warm paper" subtitle="Same marks against the app's actual background">
        <DCArtboard id="p1" label="Whorl on paper" width={420} height={300}>
          <Tile bg="#f0eee9" footer="paper · #f0eee9">
            <LockupA scale={1.2} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="p2" label="Arch on paper" width={420} height={300}>
          <Tile bg="#f0eee9">
            <LockupB scale={1.2} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="p3" label="Bowl on paper" width={420} height={300}>
          <Tile bg="#f0eee9">
            <LockupD scale={1.2} />
          </Tile>
        </DCArtboard>
        <DCArtboard id="p4" label="Knot on paper" width={420} height={300}>
          <Tile bg="#f0eee9">
            <LockupF scale={1.2} />
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="dark" title="Reversed" subtitle="On deep ink and forest grounds">
        <DCArtboard id="r1" label="A on ink" width={420} height={300}>
          <Tile bg={V2.ink}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <MarkWhorl size={84} stroke={V2.cream} sw={2.4} />
              <Wordmark size={32} tracking={-1.2} color={V2.cream}>flatnest</Wordmark>
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="r2" label="D on forest" width={420} height={300}>
          <Tile bg={V2.forest}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <MarkBowl size={56} fg={V2.cream} accent={V2.ochre} />
              <Wordmark size={36} tracking={-1} color={V2.cream} italic>Flatnest</Wordmark>
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="r3" label="F on plum" width={420} height={300}>
          <Tile bg={V2.plum}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <MarkKnot size={68} a={V2.cream} b={V2.ochre} sw={3.4} />
              <Wordmark size={34} tracking={-0.6} color={V2.cream}>flatnest</Wordmark>
            </div>
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="palettes" title="Palette explorations" subtitle="Three moods, same marks">
        <DCArtboard id="pal1" label="Bone + terracotta + ink" width={420} height={260}>
          <Tile bg={V2.cream} pad={28}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {[V2.paper, V2.terra, V2.ink, V2.sand, V2.smoke].map((c) => (
                <div key={c} style={{ width: 48, height: 88, borderRadius: 4, background: c,
                  border: c === V2.paper ? '1px solid rgba(0,0,0,0.08)' : 'none' }} />
              ))}
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="pal2" label="Forest + ochre + bone" width={420} height={260}>
          <Tile bg={V2.cream} pad={28}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {[V2.forest, V2.ochre, V2.paper, V2.smoke, V2.ink].map((c) => (
                <div key={c} style={{ width: 48, height: 88, borderRadius: 4, background: c,
                  border: c === V2.paper ? '1px solid rgba(0,0,0,0.08)' : 'none' }} />
              ))}
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="pal3" label="Plum + sand + cream" width={420} height={260}>
          <Tile bg={V2.cream} pad={28}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {[V2.plum, V2.sand, V2.cream, V2.smoke, V2.ink].map((c) => (
                <div key={c} style={{ width: 48, height: 88, borderRadius: 4, background: c,
                  border: c === V2.cream ? '1px solid rgba(0,0,0,0.08)' : 'none' }} />
              ))}
            </div>
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="appicons" title="App icons" subtitle="Same DNA, sized for the home screen">
        <DCArtboard id="ai-a" label="A · Whorl icon" width={220} height={220}>
          <Tile bg={V2.cream} pad={20}>
            <div style={{ width: 152, height: 152, borderRadius: 36, background: V2.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
              <MarkWhorl size={100} stroke={V2.cream} sw={2.6} />
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="ai-b" label="B · Arch icon" width={220} height={220}>
          <Tile bg={V2.cream} pad={20}>
            <div style={{ width: 152, height: 152, borderRadius: 36, background: V2.paper,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.10)' }}>
              <MarkArch size={108} fg={V2.ink} dot={V2.terra} />
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="ai-d" label="D · Bowl icon" width={220} height={220}>
          <Tile bg={V2.cream} pad={20}>
            <div style={{ width: 152, height: 152, borderRadius: 36, background: V2.forest,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MarkBowl size={100} fg={V2.cream} accent={V2.ochre} />
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="ai-e" label="E · Plan icon" width={220} height={220}>
          <Tile bg={V2.cream} pad={20}>
            <div style={{ width: 152, height: 152, borderRadius: 36, background: V2.terra,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MarkPlan size={100} fg={V2.cream} accent={V2.cream} />
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="ai-f" label="F · Knot icon" width={220} height={220}>
          <Tile bg={V2.cream} pad={20}>
            <div style={{ width: 152, height: 152, borderRadius: 36, background: V2.plum,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MarkKnot size={104} a={V2.cream} b={V2.ochre} sw={3.6} />
            </div>
          </Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="inuse" title="In use" subtitle="Quick context — splash, header, card">
        <DCArtboard id="u-splash" label="Splash · Whorl" width={300} height={500}>
          <Tile bg={V2.ink} pad={32}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
              <MarkWhorl size={104} stroke={V2.cream} sw={2.4} />
              <Wordmark size={36} tracking={-1.4} color={V2.cream}>flatnest</Wordmark>
              <MicroLabel color="rgba(255,255,255,0.5)">a place to land</MicroLabel>
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="u-splash2" label="Splash · Bowl" width={300} height={500}>
          <Tile bg={V2.forest} pad={32}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18, width: '100%' }}>
              <MarkBowl size={72} fg={V2.cream} accent={V2.ochre} />
              <Wordmark size={46} tracking={-1.6} color={V2.cream} italic>Flatnest</Wordmark>
              <div style={{ height: 1, width: 60, background: V2.ochre, marginTop: 8 }} />
              <MicroLabel color="rgba(255,255,255,0.55)">find your nest</MicroLabel>
            </div>
          </Tile>
        </DCArtboard>

        <DCArtboard id="u-card" label="Card · Arch" width={420} height={260}>
          <Tile bg={V2.paper} pad={28}>
            <div style={{ width: 320, height: 184, background: V2.cream, borderRadius: 6,
              boxShadow: '0 8px 24px rgba(0,0,0,0.10)', padding: 22,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <LockupB scale={1.0} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontFamily: 'Inter', fontSize: 10, color: V2.smoke, lineHeight: 1.6 }}>
                  Maya Okonkwo<br />
                  Host relations
                </div>
                <div style={{ fontFamily: 'Fraunces', fontSize: 11, color: V2.terra, fontStyle: 'italic' }}>
                  flatnest.app
                </div>
              </div>
            </div>
          </Tile>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
