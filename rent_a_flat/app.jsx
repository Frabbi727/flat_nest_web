// app.jsx — assemble all screens into a DesignCanvas + Tweaks panel

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C2410C",
  "ink": "#1C1917",
  "density": "default",
  "showNotes": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#C2410C", // terracotta (default)
  "#0F766E", // deep teal
  "#1E3A8A", // indigo
  "#92400E", // earthy bronze
];

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--ink', t.ink);
    root.style.setProperty('--accent-soft', tintFor(t.accent));
  }, [t.accent, t.ink]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="public" title="Public — discovery & auth" subtitle="What guests see, and how we gate them.">
          <DCArtboard id="home" label="01 · Home (guest)" width={390} height={844}>
            <ScreenHome/>
          </DCArtboard>
          <DCArtboard id="gate" label="02 · Auth gate modal" width={390} height={844}>
            <ScreenAuthGate/>
          </DCArtboard>
          <DCArtboard id="filter" label="03 · Filter sheet" width={390} height={844}>
            <ScreenFilter/>
          </DCArtboard>
          <DCArtboard id="login" label="04 · Log in" width={390} height={844}>
            <ScreenLogin/>
          </DCArtboard>
          <DCArtboard id="role" label="05 · Register · role" width={390} height={844}>
            <ScreenRegisterRole/>
          </DCArtboard>
        </DCSection>

        <DCSection id="renter" title="Renter — authenticated" subtitle="The browsing & contact loop after login.">
          <DCArtboard id="detail" label="06 · Listing detail" width={390} height={844}>
            <ScreenListingDetail/>
          </DCArtboard>
          <DCArtboard id="map" label="07 · Map / nearby" width={390} height={844}>
            <ScreenMap/>
          </DCArtboard>
          <DCArtboard id="wish" label="08 · Saved" width={390} height={844}>
            <ScreenWishlist/>
          </DCArtboard>
          <DCArtboard id="chats" label="09 · Messages" width={390} height={844}>
            <ScreenChatList/>
          </DCArtboard>
          <DCArtboard id="thread" label="10 · Chat thread" width={390} height={844}>
            <ScreenChatThread/>
          </DCArtboard>
        </DCSection>

        <DCSection id="owner" title="Owner — list & manage" subtitle="Dashboard + create-listing wizard (steps shown).">
          <DCArtboard id="dash" label="11 · Owner dashboard" width={390} height={844}>
            <ScreenOwnerDashboard/>
          </DCArtboard>
          <DCArtboard id="cr1" label="12 · Create · basics" width={390} height={844}>
            <ScreenCreateStep1/>
          </DCArtboard>
          <DCArtboard id="cr2" label="13 · Create · photos" width={390} height={844}>
            <ScreenCreateStep2/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent color">
          <TweakColor value={t.accent} options={ACCENT_OPTIONS} onChange={v => setTweak('accent', v)}/>
        </TweakSection>
        <TweakSection label="Ink (deep neutral)">
          <TweakColor value={t.ink} options={["#1C1917","#0F172A","#1F1611","#000000"]} onChange={v => setTweak('ink', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// 6% tint of accent — used for accent-soft surfaces (button hover, badge bg)
function tintFor(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  // mix with cream (250,250,246)
  const mix = (c, bg) => Math.round(c*0.08 + bg*0.92);
  const rr = mix(r, 250).toString(16).padStart(2,'0');
  const gg = mix(g, 250).toString(16).padStart(2,'0');
  const bb = mix(b, 246).toString(16).padStart(2,'0');
  return `#${rr}${gg}${bb}`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
