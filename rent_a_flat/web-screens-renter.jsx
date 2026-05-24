// web-screens-renter.jsx — Landing (hero), Browse (map+list), Listing detail

// ═════════════════════════════════════════════════════════════════
// 1. LANDING PAGE — editorial hero, big type, marketing sections
// ═════════════════════════════════════════════════════════════════
function FNWLanding({ t }) {
  const hero = LISTINGS[0];
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT }}>
      <FNWTopNav t={t} variant="home" />

      {/* HERO — full-bleed photo behind, large editorial copy front */}
      <section style={{ position: 'relative', height: 640, overflow: 'hidden' }}>
        <FNWPhoto src={hero.photo} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,20,30,0.1) 0%, rgba(15,20,30,0.55) 70%, rgba(15,20,30,0.75) 100%)' }} />
        {/* Decorative grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.18'/></svg>")`,
          mixBlendMode: 'overlay', pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute', left: 40, right: 40, bottom: 56,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, color: '#fff',
        }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.2,
              textTransform: 'uppercase', opacity: 0.85 }}>
              Dhaka · 2,400+ verified flats
            </div>
            <h1 style={{
              fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2.5,
              margin: '14px 0 0', textWrap: 'balance',
            }}>
              The home you<br/>actually want.
            </h1>
            <div style={{ fontSize: 18, lineHeight: 1.5, marginTop: 18, opacity: 0.9, maxWidth: 540 }}>
              Find or list flats across the city — without brokers, hidden fees, or guesswork.
              Real photos, verified owners, instant chat.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
            <FNWButton t={t} kind="accent" size="lg" full>Find a flat →</FNWButton>
            <FNWButton t={t} size="lg" full style={{
              background: 'rgba(255,255,255,0.14)', color: '#fff',
              backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)',
            }}>List your flat</FNWButton>
          </div>
        </div>

        {/* search pill, anchored above the bottom copy */}
        <div style={{
          position: 'absolute', left: '50%', top: 96,
          transform: 'translateX(-50%)',
        }}>
          <div style={{
            background: t.surface, borderRadius: 999,
            padding: '6px 6px 6px 28px',
            display: 'flex', alignItems: 'center', gap: 0,
            boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
            minWidth: 720,
          }}>
            <div style={{ flex: 1.4, padding: '6px 20px 6px 0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, letterSpacing: 0.3, textTransform: 'uppercase' }}>Where</div>
              <div style={{ fontSize: 14, color: t.inkMid, marginTop: 2 }}>Banani · Gulshan · Dhanmondi</div>
            </div>
            <div style={{ width: 1, height: 36, background: t.borderSoft }} />
            <div style={{ flex: 1, padding: '6px 24px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, letterSpacing: 0.3, textTransform: 'uppercase' }}>Move in</div>
              <div style={{ fontSize: 14, color: t.inkMid, marginTop: 2 }}>Any time</div>
            </div>
            <div style={{ width: 1, height: 36, background: t.borderSoft }} />
            <div style={{ flex: 1, padding: '6px 24px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, letterSpacing: 0.3, textTransform: 'uppercase' }}>Budget</div>
              <div style={{ fontSize: 14, color: t.inkMid, marginTop: 2 }}>Up to ৳40,000</div>
            </div>
            <button style={{
              height: 52, padding: '0 24px', borderRadius: 999,
              background: t.primary, color: '#fff', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: FN_FONT,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{
        borderBottom: `1px solid ${t.borderSoft}`,
        padding: '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40,
        fontSize: 13, color: t.inkMid,
      }}>
        {[
          ['🛡', 'Verified owners only'],
          ['💬', 'Direct messaging'],
          ['🚫', 'No broker fees'],
          ['📸', '50,000+ real photos'],
          ['⭐', '4.8 / 5 from 12k renters'],
        ].map(([ic, label], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>{ic}</span><span>{label}</span>
          </div>
        ))}
      </section>

      {/* FEATURED LISTINGS */}
      <section style={{ padding: '72px 40px' }}>
        <FNWSectionTitle t={t} eyebrow="Hand-picked"
          title="Featured this week in Dhaka"
          action={<FNWButton t={t} kind="outline" size="sm">View all →</FNWButton>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {LISTINGS.slice(0, 4).map((l, i) => (
            <FNWListingCard key={l.id} listing={l} t={t}
              saved={i === 0} badge={i === 0 ? 'Editor\'s pick' : null} />
          ))}
        </div>
      </section>

      {/* NEIGHBORHOOD STRIP — visual eye candy */}
      <section style={{ padding: '24px 40px 80px' }}>
        <FNWSectionTitle t={t} eyebrow="Explore" title="By neighborhood" />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, height: 360 }}>
          {[
            { name: 'Banani', count: '412 flats', tint: '#FFD9A8', src: LISTINGS[0].photo },
            { name: 'Gulshan', count: '328 flats', tint: '#C4B5A0', src: LISTINGS[1].photo },
            { name: 'Dhanmondi', count: '496 flats', tint: '#B8D4C8', src: LISTINGS[2].photo },
          ].map((n, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }}>
              <FNWPhoto src={n.src} tint={n.tint} style={{ width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, color: '#fff' }}>
                <div style={{ fontSize: i === 0 ? 38 : 24, fontWeight: 700, letterSpacing: -0.8 }}>{n.name}</div>
                <div style={{ fontSize: 14, opacity: 0.85, marginTop: 2 }}>{n.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — editorial 3-step block */}
      <section style={{ background: t.dark ? t.bgAlt : '#F2F0EC', padding: '88px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FNWSectionTitle t={t} eyebrow="How it works"
            title="Three steps from search to keys" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, marginTop: 12 }}>
            {[
              { n: '01', h: 'Search & filter', b: 'Browse verified flats by neighborhood, price, and type. Save the ones you like.' },
              { n: '02', h: 'Chat with owners', b: 'Skip the broker. Message owners directly to schedule a visit or ask questions.' },
              { n: '03', h: 'Move in', b: 'Finalize the lease, pay the deposit through FlatNest, and pick up the keys.' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, letterSpacing: 0.6, marginBottom: 18 }}>{s.n}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: t.ink, letterSpacing: -0.4, marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 15, color: t.inkMid, lineHeight: 1.6, maxWidth: 320 }}>{s.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER CTA — big call out */}
      <section style={{ padding: '88px 40px' }}>
        <div style={{
          background: t.ink, color: '#fff', borderRadius: 24,
          padding: '64px 56px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: 200,
            background: `radial-gradient(circle, ${withAlpha(t.primary, 0.4)}, transparent 70%)`,
          }} />
          <div style={{ maxWidth: 600, position: 'relative' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.primary, letterSpacing: 1, textTransform: 'uppercase' }}>For owners</div>
            <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.05, marginTop: 14 }}>
              Reach 12,000+ verified renters this week.
            </div>
            <div style={{ fontSize: 15, opacity: 0.7, marginTop: 16, lineHeight: 1.6, maxWidth: 480 }}>
              List your flat in under 3 minutes. We verify renters, you choose who to message.
              No commission, ever.
            </div>
          </div>
          <FNWButton t={t} kind="accent" size="lg" style={{ flexShrink: 0 }}>List your flat →</FNWButton>
        </div>
      </section>

      <FNWFooter t={t} />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 2. BROWSE — map drawer left, dense grid right (Airbnb style)
// ═════════════════════════════════════════════════════════════════
function FNWBrowse({ t }) {
  const [selected, setSelected] = React.useState('l1');
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT, minHeight: '100%' }}>
      <FNWTopNav t={t} variant="browse" />

      {/* Filter strip */}
      <div style={{
        borderBottom: `1px solid ${t.borderSoft}`, background: t.surface,
        padding: '12px 40px',
        display: 'flex', alignItems: 'center', gap: 10, overflowX: 'auto',
      }}>
        {['All', 'Family', 'Bachelor', 'Couple', 'Student', 'Furnished', 'Under ৳20k', 'Banani', 'Gulshan', 'Dhanmondi'].map((c, i) => (
          <FNWChip key={c} t={t} active={i === 0} size="sm">{c}</FNWChip>
        ))}
        <div style={{ flex: 1 }} />
        <FNWButton t={t} kind="outline" size="sm" leading={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.ink} strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M6 12h12M10 18h4"/></svg>
        }>Filters</FNWButton>
      </div>

      {/* split: list left, map right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 560px', minHeight: 700 }}>
        {/* LIST */}
        <div style={{ padding: '24px 32px 48px', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.ink, letterSpacing: -0.4 }}>
                124 flats in Dhaka
              </div>
              <div style={{ fontSize: 13, color: t.inkMid, marginTop: 4 }}>Updated 2 min ago · Map results</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: t.inkMid }}>
              Sort by
              <button style={{
                background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 8,
                padding: '6px 12px', fontSize: 13, fontWeight: 500, color: t.ink, cursor: 'pointer',
                fontFamily: FN_FONT, display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>Recommended
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={t.inkMid} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {LISTINGS.slice(0, 6).map((l) => (
              <div key={l.id} onClick={() => setSelected(l.id)}
                style={{ outline: selected === l.id ? `2px solid ${t.primary}` : 'none',
                  outlineOffset: 6, borderRadius: 14, transition: 'outline-color .15s' }}>
                <FNWListingCard listing={l} t={t} saved={l.id === 'l1'} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 40 }}>
            {['‹', '1', '2', '3', '…', '21', '›'].map((p, i) => (
              <button key={i} style={{
                width: 36, height: 36, borderRadius: 8, border: `1px solid ${t.border}`,
                background: i === 1 ? t.ink : t.surface,
                color: i === 1 ? '#fff' : t.ink,
                fontFamily: FN_FONT, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}>{p}</button>
            ))}
          </div>
        </div>

        {/* MAP */}
        <div style={{ position: 'relative', background: t.dark ? '#1A1F22' : '#E4EBF0' }}>
          <div style={{
            position: 'sticky', top: 0, height: '100%',
            backgroundImage: `
              linear-gradient(${t.dark ? '#252B30' : '#D2DCE3'} 1px, transparent 1px),
              linear-gradient(90deg, ${t.dark ? '#252B30' : '#D2DCE3'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}>
            {/* fake land blobs */}
            <div style={{ position: 'absolute', top: 60, left: -40, width: 280, height: 280,
              borderRadius: '50% 60% 40% 70% / 50% 40% 60% 50%', background: t.dark ? '#23282C' : '#EEF3F6' }} />
            <div style={{ position: 'absolute', top: 280, right: -60, width: 320, height: 320,
              borderRadius: '60% 40% 70% 50% / 50% 60% 40% 50%', background: t.dark ? '#23282C' : '#EEF3F6' }} />
            <div style={{ position: 'absolute', bottom: 60, left: 40, width: 240, height: 240,
              borderRadius: '70% 50% 40% 60% / 60% 50% 50% 40%', background: t.dark ? '#23282C' : '#EEF3F6' }} />

            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M0 220 Q200 280 380 200 T560 280" stroke={t.dark ? '#2C3236' : '#C7D2DA'} strokeWidth="6" fill="none"/>
              <path d="M40 460 Q200 440 320 520 T560 510" stroke={t.dark ? '#2C3236' : '#C7D2DA'} strokeWidth="6" fill="none"/>
              <path d="M180 60 L180 800" stroke={t.dark ? '#2C3236' : '#C7D2DA'} strokeWidth="5" fill="none"/>
              <path d="M380 60 L380 800" stroke={t.dark ? '#2C3236' : '#C7D2DA'} strokeWidth="3" fill="none"/>
            </svg>

            {/* pins */}
            {LISTINGS.slice(0, 6).map((l, i) => {
              const positions = [
                { x: 32, y: 28 }, { x: 64, y: 22 }, { x: 24, y: 56 },
                { x: 52, y: 64 }, { x: 78, y: 48 }, { x: 44, y: 78 },
              ];
              const p = positions[i];
              const isSel = selected === l.id;
              return (
                <button key={l.id} onClick={() => setSelected(l.id)} style={{
                  position: 'absolute', top: `${p.y}%`, left: `${p.x}%`,
                  transform: 'translate(-50%, -100%)',
                  border: 'none',
                  background: isSel ? t.ink : t.surface,
                  color: isSel ? '#fff' : t.ink,
                  padding: '7px 12px', borderRadius: 999,
                  fontSize: 13, fontWeight: 700,
                  boxShadow: isSel ? '0 8px 22px rgba(0,0,0,0.3)' : '0 4px 14px rgba(0,0,0,0.18)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  zIndex: isSel ? 5 : 1,
                  fontFamily: FN_FONT,
                  transform: isSel ? 'translate(-50%, -100%) scale(1.1)' : 'translate(-50%, -100%) scale(1)',
                  transition: 'transform .15s, box-shadow .15s',
                }}>{fnW_BDT(l.price)}</button>
              );
            })}

            {/* zoom controls */}
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column',
              background: t.surface, borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
              {['+', '−'].map((c, i) => (
                <button key={i} style={{
                  width: 36, height: 36, border: 'none', background: 'transparent',
                  fontSize: 16, fontWeight: 600, color: t.ink, cursor: 'pointer',
                  borderTop: i > 0 ? `1px solid ${t.borderSoft}` : 'none',
                }}>{c}</button>
              ))}
            </div>

            {/* "Search as I move map" pill */}
            <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{
                background: t.surface, borderRadius: 999,
                padding: '8px 14px 8px 12px',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)', fontSize: 13, color: t.ink, fontWeight: 500,
              }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M2 6l3 3 5-6"/></svg>
                </div>
                Search as I move the map
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 3. LISTING DETAIL — magazine layout, gallery up top
// ═════════════════════════════════════════════════════════════════
function FNWListingDetailWeb({ t }) {
  const l = LISTINGS[0];
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: FN_FONT }}>
      <FNWTopNav t={t} variant="browse" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 40px' }}>
        {/* breadcrumb */}
        <div style={{ fontSize: 13, color: t.inkMid, marginBottom: 16 }}>
          Browse <span style={{ color: t.inkFaint }}>›</span> Dhanmondi <span style={{ color: t.inkFaint }}>›</span> <b style={{ color: t.ink }}>{l.title}</b>
        </div>

        {/* title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.15, margin: 0, textWrap: 'balance' }}>
              {l.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, fontSize: 14, color: t.inkMid }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={t.ink}><path d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5 2 9.5l7-1z"/></svg>
                <b style={{ color: t.ink }}>{l.rating}</b> · 124 reviews
              </span>
              <span>·</span>
              <span>📍 {l.area}</span>
              <span>·</span>
              <FNWBadge t={t} kind="primary">Verified owner</FNWBadge>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <FNWButton t={t} kind="outline" size="sm" leading={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.ink} strokeWidth="2" strokeLinecap="round">
                <path d="M16 6l-4-4-4 4M12 2v13M5 12v8a2 2 0 002 2h10a2 2 0 002-2v-8"/></svg>
            }>Share</FNWButton>
            <FNWButton t={t} kind="outline" size="sm" leading={
              <svg width="14" height="14" viewBox="0 0 24 24" fill={t.secondary} stroke={t.secondary} strokeWidth="2">
                <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.7 1.2 5.5 3.2C13.8 5.2 15.5 4 17.5 4 21 4 23.5 8 21.5 12c-2.5 4.5-9.5 9-9.5 9z"/></svg>
            }>Saved</FNWButton>
          </div>
        </div>

        {/* Photo grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr',
          gap: 8, height: 480, borderRadius: 18, overflow: 'hidden',
        }}>
          <FNWPhoto src={l.photos[0]} style={{ gridRow: 'span 2' }} />
          <FNWPhoto src={l.photos[1]} />
          <FNWPhoto src={l.photos[2]} />
          <FNWPhoto src={l.photos[3]} />
          <div style={{ position: 'relative' }}>
            <FNWPhoto src={l.photo} />
            <button style={{
              position: 'absolute', bottom: 12, right: 12,
              background: t.surface, border: 'none', padding: '8px 14px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, color: t.ink, cursor: 'pointer', fontFamily: FN_FONT,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>📷 Show all 24 photos</button>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, marginTop: 40 }}>
          {/* LEFT */}
          <div>
            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
              paddingBottom: 32, borderBottom: `1px solid ${t.borderSoft}` }}>
              {[
                ['Bedrooms', l.beds], ['Bathrooms', l.baths],
                ['Size', `${l.size} ft²`], ['Floor', `${l.floor}/8`],
              ].map(([k, v], i) => (
                <div key={i}>
                  <div style={{ fontSize: 13, color: t.inkSoft }}>{k}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: t.ink, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Owner card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '28px 0',
              borderBottom: `1px solid ${t.borderSoft}` }}>
              <FNWAvatar initials="TR" size={56} color={t.primarySoft} t={t} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Owned by Tahmid R.
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={t.primary}>
                    <path d="M12 2l3 2.5 4-.5.5 4L22 11l-2.5 3 .5 4-4-.5L12 22l-3-2.5-4 .5-.5-4L2 13l2.5-3-.5-4 4 .5z"/>
                    <path d="M8 12l3 3 6-6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 13, color: t.inkMid, marginTop: 2 }}>
                  Owner since 2022 · Responds within an hour · 4 active listings
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: '28px 0', borderBottom: `1px solid ${t.borderSoft}` }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.ink, marginBottom: 12 }}>About this flat</div>
              <div style={{ fontSize: 15, color: t.inkMid, lineHeight: 1.7, textWrap: 'pretty' }}>
                {l.description} {' '}Two side balconies catch the breeze most of the day, and the kitchen has a brand-new gas line.
                Building has 24/7 security, a back-up generator, and a small rooftop garden shared with neighbors.
              </div>
              <a style={{ display: 'inline-block', marginTop: 12, fontSize: 14, fontWeight: 600,
                color: t.ink, textDecoration: 'underline', cursor: 'pointer' }}>Show more</a>
            </div>

            {/* Amenities */}
            <div style={{ padding: '28px 0', borderBottom: `1px solid ${t.borderSoft}` }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.ink, marginBottom: 16 }}>What this flat offers</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {l.amenities.map((a) => (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: t.ink }}>
                    <span style={{ width: 24, color: t.primary }}>✓</span>{a}
                  </div>
                ))}
              </div>
            </div>

            {/* Location preview */}
            <div style={{ padding: '28px 0' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.ink, marginBottom: 16 }}>Where you'll be</div>
              <div style={{ height: 280, borderRadius: 16, background: t.dark ? '#1A1F22' : '#E4EBF0',
                position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: `linear-gradient(${t.dark ? '#252B30' : '#D2DCE3'} 1px, transparent 1px),
                    linear-gradient(90deg, ${t.dark ? '#252B30' : '#D2DCE3'} 1px, transparent 1px)`,
                  backgroundSize: '36px 36px' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                  background: t.primary, color: '#fff', padding: '8px 14px', borderRadius: 999,
                  fontSize: 13, fontWeight: 700,
                  boxShadow: `0 8px 20px ${withAlpha(t.primary, 0.4)}` }}>
                  📍 Dhanmondi 27
                </div>
              </div>
              <div style={{ fontSize: 13, color: t.inkMid, marginTop: 14, lineHeight: 1.6 }}>
                A quiet residential stretch by the lake — three minutes' walk to Dhanmondi 27 bus stand, ten minutes to Star Kabab.
              </div>
            </div>
          </div>

          {/* RIGHT — sticky booking card */}
          <div>
            <div style={{
              position: 'sticky', top: 24,
              background: t.surface, borderRadius: 16, padding: 24,
              border: `1px solid ${t.borderSoft}`, boxShadow: t.shadow,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 26, fontWeight: 700, color: t.ink }}>{fnW_BDT(l.price)}</span>
                  <span style={{ fontSize: 14, color: t.inkMid }}> / month</span>
                </div>
                <div style={{ fontSize: 13, color: t.inkMid }}>⭐ {l.rating}</div>
              </div>

              <div style={{ marginTop: 18, border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${t.border}` }}>
                  <div style={{ padding: '12px 14px', borderRight: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.ink, letterSpacing: 0.4, textTransform: 'uppercase' }}>Move in</div>
                    <div style={{ fontSize: 13, color: t.inkMid, marginTop: 2 }}>Dec 1, 2026</div>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.ink, letterSpacing: 0.4, textTransform: 'uppercase' }}>Lease</div>
                    <div style={{ fontSize: 13, color: t.inkMid, marginTop: 2 }}>12 months</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.ink, letterSpacing: 0.4, textTransform: 'uppercase' }}>Visitors</div>
                  <div style={{ fontSize: 13, color: t.inkMid, marginTop: 2 }}>Family · 3 adults, 1 child</div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <FNWButton t={t} kind="accent" size="lg" full>Message owner</FNWButton>
                <FNWButton t={t} kind="outline" size="lg" full>Request a visit</FNWButton>
              </div>

              <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 12, textAlign: 'center' }}>
                Free to message · No commission
              </div>

              <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${t.borderSoft}`,
                display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                {[
                  ['First month rent', fnW_BDT(l.price)],
                  ['Security deposit (2mo)', fnW_BDT(l.price * 2)],
                  ['FlatNest service fee', '৳0'],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: t.inkMid }}>
                    <span>{k}</span><span style={{ color: t.ink }}>{v}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: t.borderSoft, margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: t.ink, fontSize: 14 }}>
                  <span>Move-in total</span>
                  <span>{fnW_BDT(l.price * 3)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FNWFooter t={t} />
    </div>
  );
}

Object.assign(window, { FNWLanding, FNWBrowse, FNWListingDetailWeb });
