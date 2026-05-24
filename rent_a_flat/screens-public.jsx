// screens-public.jsx — Home (guest), Auth modal state, Filter sheet, Login, Register-role

// ===========================================================
// 1) HOME / DISCOVERY (public — guest view)
// ===========================================================
function ScreenHome() {
  const types = ["All", "Apartment", "Sublet", "Bachelor", "Family", "Office"];
  const [hero, ...rest] = LISTINGS;

  return (
    <Phone>
      <div className="screen" style={{paddingBottom:78}}>
        {/* App-bar */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 20px 4px'}}>
          <div className="brand">FlatNest<span className="dot"/></div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button className="btn btn-ghost btn-sm" style={{color:'var(--ink-2)'}}>Log in</button>
            <button className="btn btn-primary btn-sm">Sign up</button>
          </div>
        </div>

        {/* Editorial intro */}
        <div style={{padding:'12px 20px 16px'}}>
          <h1 className="t-display" style={{margin:0, fontSize:32, lineHeight:1.05}}>
            Find a flat that <em style={{fontStyle:'italic', color:'var(--accent)'}}>feels like</em> home.
          </h1>
          <p className="t-muted" style={{margin:'8px 0 0', fontSize:13, maxWidth:300}}>
            Verified rentals across Dhaka, Chattogram &amp; Sylhet — directly from owners.
          </p>
        </div>

        {/* Search */}
        <div style={{padding:'0 20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--border-strong)', borderRadius:14, height:54, padding:'0 6px 0 14px', boxShadow:'var(--shadow-1)'}}>
            <I name="search" size={18} style={{color:'var(--muted)'}}/>
            <input placeholder="Search area, road or landmark…" style={{flex:1, border:'none', outline:'none', background:'transparent', fontFamily:'var(--font-sans)', fontSize:14, color:'var(--ink)'}} defaultValue=""/>
            <button className="btn btn-accent" style={{height:42, width:42, padding:0, borderRadius:10}}><I name="sliders" size={18}/></button>
          </div>
        </div>

        {/* Type pills */}
        <div style={{display:'flex', gap:8, padding:'16px 20px 4px', overflowX:'auto'}}>
          {types.map((t, i) => (
            <div key={t} className={`chip${i===0?' active':''}`}>{t}</div>
          ))}
        </div>

        {/* Featured hero */}
        <div style={{padding:'12px 20px 0'}}>
          <SectionHeader eyebrow="Trending in Dhanmondi" title="This week's pick" action="See all"/>
          <div className="listing-card" style={{gap:10}}>
            <div className="photo" style={{aspectRatio:'16/11'}}>
              <img src={hero.photo} alt=""/>
              <div className="type"><span className="badge badge-ink">Editor&apos;s Pick · {hero.type}</span></div>
              <div className="heart"><I name="heart" size={16}/></div>
              <div className="dots"><span className="on"/><span/><span/><span/></div>
            </div>
            <div className="meta">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{minWidth:0}}>
                  <div className="title" style={{fontSize:16}}>{hero.title}</div>
                  <div className="area">{hero.area} · {hero.facing}</div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:3, fontSize:12, fontWeight:600}}><I name="star" size={12}/>{hero.rating}</div>
              </div>
              <div className="mt-2" style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                <div className="price" style={{fontSize:20}}>৳{hero.price.toLocaleString('en-IN')}<span style={{fontFamily:'var(--font-sans)', fontSize:12, color:'var(--muted)', fontWeight:500}}> /mo</span></div>
                <div style={{display:'flex', gap:10, fontSize:11, color:'var(--muted)'}}>
                  <span style={{display:'inline-flex', alignItems:'center', gap:4}}><I name="bed" size={12}/>{hero.beds} bed</span>
                  <span style={{display:'inline-flex', alignItems:'center', gap:4}}><I name="bath" size={12}/>{hero.baths} bath</span>
                  <span style={{display:'inline-flex', alignItems:'center', gap:4}}><I name="ruler" size={12}/>{hero.size} sqft</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{padding:'24px 20px 24px'}}>
          <SectionHeader eyebrow="Browse" title="Near you" action="Map view"/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
            {rest.slice(0,4).map(l => <ListingCard key={l.id} listing={l}/>)}
          </div>
        </div>

        {/* Owner CTA */}
        <div style={{padding:'8px 20px 28px'}}>
          <div style={{background:'var(--ink)', color:'#FFFCF7', borderRadius:20, padding:'20px', position:'relative', overflow:'hidden'}}>
            <div className="t-eyebrow" style={{color:'rgba(255,252,247,.6)'}}>For property owners</div>
            <div className="t-display" style={{fontSize:22, marginTop:6, maxWidth:240}}>List your flat in under 4 minutes.</div>
            <div style={{marginTop:14}}>
              <button className="btn btn-accent btn-sm">Get started <I name="arrow-right" size={14}/></button>
            </div>
            <div style={{position:'absolute', right:-30, bottom:-30, width:140, height:140, borderRadius:'50%', background:'var(--accent)', opacity:.18}}/>
            <div style={{position:'absolute', right:14, bottom:14, fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(255,252,247,.5)'}}>৳0 to list</div>
          </div>
        </div>
      </div>

      <BottomNav active="home" role="guest"/>
    </Phone>
  );
}

// ===========================================================
// 2) HOME with AUTH MODAL gate
// ===========================================================
function ScreenAuthGate() {
  return (
    <Phone>
      {/* a dim copy of the home behind */}
      <div className="screen" style={{paddingBottom:78, filter:'blur(2px)', opacity:.55, pointerEvents:'none'}}>
        <div style={{padding:'8px 20px 4px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="brand">FlatNest<span className="dot"/></div>
        </div>
        <div style={{padding:'12px 20px 16px'}}>
          <h1 className="t-display" style={{margin:0, fontSize:32, lineHeight:1.05}}>Find a flat that feels like home.</h1>
        </div>
        <div style={{padding:'0 20px'}}>
          <div style={{height:54, borderRadius:14, background:'var(--surface)', border:'1px solid var(--border-strong)'}}/>
        </div>
        <div style={{padding:'24px 20px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
            {LISTINGS.slice(0,2).map(l => <ListingCard key={l.id} listing={l}/>)}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div style={{position:'absolute', inset:0, background:'rgba(28,25,23,.45)', zIndex:8}}/>

      {/* Bottom sheet */}
      <div style={{position:'absolute', left:0, right:0, bottom:0, background:'var(--surface)', borderTopLeftRadius:28, borderTopRightRadius:28, padding:'12px 24px 28px', zIndex:9, boxShadow:'var(--shadow-pop)'}}>
        <div style={{width:40, height:4, borderRadius:2, background:'var(--border-strong)', margin:'4px auto 18px'}}/>
        <div style={{width:56, height:56, borderRadius:16, background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center', marginBottom:16}}>
          <I name="lock" size={26} stroke={1.8}/>
        </div>
        <h2 className="t-display" style={{margin:0, fontSize:24, letterSpacing:'-0.02em'}}>Sign in to continue</h2>
        <p className="t-muted" style={{marginTop:6, fontSize:14, lineHeight:1.45, marginBottom:0}}>
          Create a free account to see full listing details, contact owners, and save your favourites.
        </p>
        <div style={{display:'flex', gap:10, marginTop:22}}>
          <button className="btn btn-outline btn-lg" style={{flex:1}}>Sign up</button>
          <button className="btn btn-accent btn-lg" style={{flex:1.2}}>Log in <I name="arrow-right" size={16}/></button>
        </div>
        <div style={{textAlign:'center', marginTop:14, fontSize:12, color:'var(--muted)'}}>
          By continuing you agree to FlatNest&apos;s <span style={{color:'var(--ink-2)', textDecoration:'underline'}}>Terms</span> &amp; <span style={{color:'var(--ink-2)', textDecoration:'underline'}}>Privacy</span>.
        </div>
      </div>
    </Phone>
  );
}

// ===========================================================
// 3) FILTER SHEET — over Home
// ===========================================================
function ScreenFilter() {
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:78, filter:'blur(2px)', opacity:.5}}>
        <div style={{padding:'8px 20px 4px'}}><div className="brand">FlatNest<span className="dot"/></div></div>
        <div style={{padding:'12px 20px'}}><div style={{height:160, borderRadius:14, background:'var(--surface-2)'}}/></div>
      </div>

      <div style={{position:'absolute', inset:0, background:'rgba(28,25,23,.35)', zIndex:8}}/>

      <div style={{position:'absolute', left:0, right:0, bottom:0, top:80, background:'var(--bg)', borderTopLeftRadius:28, borderTopRightRadius:28, zIndex:9, display:'flex', flexDirection:'column', boxShadow:'var(--shadow-pop)'}}>
        <div style={{width:40, height:4, borderRadius:2, background:'var(--border-strong)', margin:'10px auto 0'}}/>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px 4px'}}>
          <h3 className="t-display" style={{margin:0, fontSize:22}}>Filters</h3>
          <button className="btn btn-ghost btn-sm" style={{color:'var(--muted)'}}>Reset</button>
        </div>

        <div style={{flex:1, overflow:'auto', padding:'12px 20px 24px'}}>
          {/* Price */}
          <div className="t-eyebrow" style={{marginTop:8}}>Monthly rent</div>
          <div style={{display:'flex', gap:10, marginTop:10}}>
            <div className="field-input" style={{flex:1}}>
              <span className="prefix">৳</span>
              <input defaultValue="15,000" />
            </div>
            <div style={{alignSelf:'center', color:'var(--muted-2)'}}>—</div>
            <div className="field-input" style={{flex:1}}>
              <span className="prefix">৳</span>
              <input defaultValue="45,000" />
            </div>
          </div>
          {/* Faux range */}
          <div style={{marginTop:18, position:'relative', height:32}}>
            <svg viewBox="0 0 320 24" style={{position:'absolute', top:0, left:0, width:'100%', height:24}}>
              {[3,5,8,12,18,24,30,28,22,18,14,10,8,5,4,3].map((h,i) => (
                <rect key={i} x={i*20+2} y={24-h} width="14" height={h} rx="2" fill={i>=2 && i<=8 ? "var(--accent)" : "var(--border-strong)"}/>
              ))}
            </svg>
            <div style={{position:'absolute', left:'10%', right:'40%', bottom:0, height:3, background:'var(--ink)'}}/>
            <div style={{position:'absolute', left:'10%', bottom:-4, width:14, height:14, borderRadius:'50%', background:'#fff', border:'2px solid var(--ink)'}}/>
            <div style={{position:'absolute', left:'58%', bottom:-4, width:14, height:14, borderRadius:'50%', background:'#fff', border:'2px solid var(--ink)'}}/>
          </div>

          {/* Type */}
          <div className="t-eyebrow" style={{marginTop:28}}>Property type</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:10}}>
            {[
              {n:"Apartment", sel:true},
              {n:"Sublet", sel:true},
              {n:"Bachelor"},
              {n:"Family", sel:true},
              {n:"Office"},
              {n:"Roommate"},
            ].map(t => (
              <div key={t.n} className={`chip${t.sel?' accent active':''}`} style={{justifyContent:'center', height:38, fontSize:13}}>{t.n}</div>
            ))}
          </div>

          {/* Beds & baths */}
          <div className="t-eyebrow" style={{marginTop:24}}>Bedrooms</div>
          <div style={{display:'flex', gap:6, marginTop:10}}>
            {["Any","1","2","3","4","5+"].map((n,i) => (
              <div key={n} className={`chip${i===2?' active':''}`} style={{flex:1, justifyContent:'center', height:38, fontSize:13}}>{n}</div>
            ))}
          </div>
          <div className="t-eyebrow" style={{marginTop:18}}>Bathrooms</div>
          <div style={{display:'flex', gap:6, marginTop:10}}>
            {["Any","1","2","3","4+"].map((n,i) => (
              <div key={n} className={`chip${i===1?' active':''}`} style={{flex:1, justifyContent:'center', height:38, fontSize:13}}>{n}</div>
            ))}
          </div>

          {/* Amenities */}
          <div className="t-eyebrow" style={{marginTop:24}}>Must-have amenities</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:10}}>
            {[
              {n:"Wi-Fi", ic:"wifi", on:true},
              {n:"Generator", ic:"shield", on:true},
              {n:"Lift", ic:"elevator"},
              {n:"Parking", ic:"car"},
              {n:"Air-conditioning", ic:"snow"},
              {n:"Security", ic:"shield"},
            ].map(a => (
              <div key={a.n} style={{display:'flex', alignItems:'center', gap:10, height:48, border:`1px solid ${a.on?'var(--ink)':'var(--border)'}`, borderRadius:12, padding:'0 12px', background: a.on?'var(--surface)':'var(--surface)'}}>
                <I name={a.ic} size={18} style={{color: a.on ? 'var(--ink)' : 'var(--muted)'}}/>
                <span style={{fontSize:13, fontWeight: a.on?600:500}}>{a.n}</span>
                {a.on && <div style={{marginLeft:'auto', width:18, height:18, borderRadius:6, background:'var(--ink)', color:'#fff', display:'grid', placeItems:'center'}}><I name="check" size={12} stroke={2.4}/></div>}
              </div>
            ))}
          </div>

          <div className="t-eyebrow" style={{marginTop:24}}>Sort by</div>
          <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:10}}>
            {["Newest","Price ↓","Price ↑","Largest"].map((s,i) => (
              <div key={s} className={`chip${i===0?' active':''}`}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{padding:'14px 20px 22px', borderTop:'1px solid var(--border)', background:'rgba(255,252,247,.92)', backdropFilter:'blur(10px)'}}>
          <button className="btn btn-accent btn-lg btn-block">Show 142 listings</button>
        </div>
      </div>
    </Phone>
  );
}

// ===========================================================
// 4) LOGIN
// ===========================================================
function ScreenLogin() {
  return (
    <Phone>
      <div className="screen">
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between'}}>
          <button className="btn btn-ghost btn-sm" style={{padding:0, color:'var(--ink-2)'}}><I name="chevron-left" size={20}/></button>
          <button className="btn btn-ghost btn-sm" style={{padding:'0 8px', color:'var(--muted)', fontWeight:500}}>Need help?</button>
        </div>
        <div style={{padding:'36px 24px 0'}}>
          <div className="brand" style={{fontSize:28}}>FlatNest<span className="dot" style={{width:7, height:7, marginBottom:6}}/></div>
          <h1 className="t-display" style={{fontSize:32, lineHeight:1.05, marginTop:48, marginBottom:6}}>
            Welcome back.
          </h1>
          <p className="t-muted" style={{margin:0, fontSize:14}}>Log in to keep browsing flats &amp; chats.</p>

          <div style={{marginTop:34}} className="col gap-3">
            <div className="field">
              <div className="field-label">Email or phone</div>
              <div className="field-input">
                <input defaultValue="rumana@example.com"/>
              </div>
            </div>
            <div className="field">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div className="field-label">Password</div>
                <div style={{fontSize:12, color:'var(--accent)', fontWeight:600}}>Forgot?</div>
              </div>
              <div className="field-input">
                <input type="password" defaultValue="••••••••"/>
                <I name="eye" size={18} style={{color:'var(--muted)'}}/>
              </div>
            </div>
            <button className="btn btn-accent btn-lg btn-block" style={{marginTop:8}}>Log in</button>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:12, marginTop:28, color:'var(--muted-2)'}}>
            <div className="divider" style={{flex:1}}/>
            <span style={{fontSize:11, letterSpacing:'.08em', textTransform:'uppercase'}}>or</span>
            <div className="divider" style={{flex:1}}/>
          </div>

          <button className="btn btn-outline btn-lg btn-block" style={{marginTop:18}}>
            <I name="phone" size={16}/> Continue with phone
          </button>
        </div>

        <div style={{position:'absolute', left:0, right:0, bottom:32, textAlign:'center', fontSize:13, color:'var(--muted)'}}>
          New to FlatNest? <span style={{color:'var(--ink)', fontWeight:600}}>Create an account</span>
        </div>
      </div>
    </Phone>
  );
}

// ===========================================================
// 5) REGISTER — Role select (Step 2)
// ===========================================================
function ScreenRegisterRole() {
  return (
    <Phone>
      <div className="screen">
        <div style={{padding:'12px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button className="btn btn-ghost btn-sm" style={{padding:0, color:'var(--ink-2)'}}><I name="chevron-left" size={20}/></button>
          <div style={{display:'flex', gap:6}}>
            <div style={{width:24, height:3, borderRadius:2, background:'var(--ink)'}}/>
            <div style={{width:24, height:3, borderRadius:2, background:'var(--ink)'}}/>
            <div style={{width:24, height:3, borderRadius:2, background:'var(--border-strong)'}}/>
          </div>
          <span style={{fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>2 / 3</span>
        </div>

        <div style={{padding:'40px 24px 0'}}>
          <div className="t-eyebrow">Step 2 — Your role</div>
          <h1 className="t-display" style={{margin:'8px 0 6px', fontSize:30, lineHeight:1.05}}>
            What brings you to <em style={{color:'var(--accent)', fontStyle:'italic'}}>FlatNest</em>?
          </h1>
          <p className="t-muted" style={{margin:0, fontSize:14}}>You can switch later from your profile.</p>

          <div style={{marginTop:28, display:'flex', flexDirection:'column', gap:14}}>
            {/* Renter card — selected */}
            <div style={{position:'relative', border:'2px solid var(--ink)', borderRadius:20, padding:'18px', background:'var(--surface)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div style={{width:52, height:52, borderRadius:14, background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center'}}>
                  <I name="search" size={24} stroke={1.8}/>
                </div>
                <div style={{width:24, height:24, borderRadius:'50%', background:'var(--ink)', color:'#fff', display:'grid', placeItems:'center'}}>
                  <I name="check" size={14} stroke={2.6}/>
                </div>
              </div>
              <div className="t-display" style={{fontSize:20, marginTop:14}}>I&apos;m looking to rent</div>
              <div className="t-muted" style={{fontSize:13, marginTop:4}}>Browse listings, chat with owners, save favourites &amp; book a viewing.</div>
            </div>

            {/* Owner card */}
            <div style={{position:'relative', border:'1px solid var(--border)', borderRadius:20, padding:'18px', background:'var(--surface)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div style={{width:52, height:52, borderRadius:14, background:'var(--surface-2)', color:'var(--ink)', display:'grid', placeItems:'center'}}>
                  <I name="home" size={24} stroke={1.8}/>
                </div>
                <div style={{width:24, height:24, borderRadius:'50%', border:'1.5px solid var(--border-strong)'}}/>
              </div>
              <div className="t-display" style={{fontSize:20, marginTop:14}}>I have a property to list</div>
              <div className="t-muted" style={{fontSize:13, marginTop:4}}>Post listings, manage inquiries &amp; track viewings. Free for owners.</div>
              <div style={{marginTop:10, display:'flex', gap:6, flexWrap:'wrap'}}>
                <span className="badge badge-muted">Free</span>
                <span className="badge badge-muted">Verified badge</span>
                <span className="badge badge-muted">In-app chat</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'16px 24px 28px', background:'rgba(250,250,246,.92)', backdropFilter:'blur(10px)', borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-accent btn-lg btn-block">Continue <I name="arrow-right" size={16}/></button>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  ScreenHome, ScreenAuthGate, ScreenFilter, ScreenLogin, ScreenRegisterRole,
});
