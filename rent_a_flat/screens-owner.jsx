// screens-owner.jsx — Owner Dashboard, Create Listing wizard (Steps 1 & 2)

// ===========================================================
// OWNER DASHBOARD
// ===========================================================
function ScreenOwnerDashboard() {
  const myListings = [
    { ...byId("l1"), status: "Active", statusKind: "success", views: 248, inquiries: 12 },
    { ...byId("l3"), status: "Under review", statusKind: "warning", views: 0, inquiries: 0 },
    { ...byId("l8"), status: "Rented", statusKind: "info", views: 612, inquiries: 38 },
    { ...byId("l5"), status: "Draft", statusKind: "muted", views: 0, inquiries: 0 },
  ];

  return (
    <Phone>
      <div className="screen" style={{paddingBottom:100}}>
        {/* Header */}
        <div style={{padding:'8px 20px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div className="t-eyebrow" style={{color:'var(--muted)'}}>Owner</div>
              <h1 className="t-display" style={{fontSize:24, margin:0, marginTop:2}}>Hello, Tareq</h1>
            </div>
            <div style={{display:'flex', gap:6, alignItems:'center'}}>
              <button className="btn btn-ghost btn-sm" style={{padding:0, position:'relative'}}>
                <I name="bell" size={22}/>
                <span style={{position:'absolute', top:0, right:0, width:8, height:8, borderRadius:'50%', background:'var(--accent)', border:'2px solid var(--bg)'}}/>
              </button>
              <img src={AVATARS[1]} style={{width:36, height:36, borderRadius:'50%', objectFit:'cover'}}/>
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div style={{padding:'18px 20px 0'}}>
          <div style={{background:'var(--ink)', color:'#FFFCF7', borderRadius:18, padding:'18px 18px 16px', position:'relative', overflow:'hidden'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div className="t-eyebrow" style={{color:'rgba(255,252,247,.55)'}}>This month</div>
                <div className="t-display" style={{fontSize:32, marginTop:4, letterSpacing:'-0.03em'}}>৳1,42,000</div>
                <div style={{fontSize:11, color:'rgba(255,252,247,.55)'}}>Collected from 2 active rentals</div>
              </div>
              <div style={{background:'var(--accent)', borderRadius:10, padding:'4px 8px', fontSize:11, fontWeight:600, display:'flex', alignItems:'center', gap:3}}>
                <I name="arrow-right" size={11} style={{transform:'rotate(-45deg)'}}/> +12%
              </div>
            </div>
            {/* Sparkline */}
            <svg viewBox="0 0 320 40" style={{width:'100%', height:36, marginTop:10}}>
              <path d="M0 30 L 30 26 L 60 28 L 90 20 L 120 22 L 150 16 L 180 18 L 210 12 L 240 14 L 270 8 L 300 10 L 320 6" fill="none" stroke="rgba(255,252,247,.5)" strokeWidth="1.5"/>
              <path d="M0 30 L 30 26 L 60 28 L 90 20 L 120 22 L 150 16 L 180 18 L 210 12 L 240 14 L 270 8 L 300 10 L 320 6 L 320 40 L 0 40 Z" fill="url(#g)" opacity=".4"/>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#C2410C"/><stop offset="1" stopColor="#C2410C" stopOpacity="0"/></linearGradient></defs>
            </svg>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:12}}>
            <MiniStat label="Active" value="2" delta="+1" />
            <MiniStat label="Inquiries" value="38" delta="+6" />
            <MiniStat label="Views"    value="1.2K" delta="+18%" />
          </div>
        </div>

        {/* Tabs */}
        <div style={{padding:'24px 20px 0', display:'flex', gap:6, overflowX:'auto'}}>
          {[{n:"All", c:5, sel:true}, {n:"Active", c:2}, {n:"Review", c:1}, {n:"Drafts", c:1}, {n:"Rented", c:1}].map(t => (
            <div key={t.n} className={`chip${t.sel?' active':''}`}>{t.n} <span style={{opacity:.6, marginLeft:2, fontFamily:'var(--font-mono)', fontSize:11}}>{t.c}</span></div>
          ))}
        </div>

        {/* Listing cards */}
        <div style={{padding:'14px 20px 0', display:'flex', flexDirection:'column', gap:10}}>
          {myListings.map(l => <OwnerListingCard key={l.id} listing={l}/>)}
        </div>

        {/* Promo */}
        <div style={{padding:'18px 20px 0'}}>
          <div style={{padding:14, background:'var(--accent-soft)', border:'1px solid #F2D2BD', borderRadius:14, display:'flex', gap:12, alignItems:'flex-start'}}>
            <div style={{width:36, height:36, borderRadius:10, background:'var(--accent)', color:'#fff', display:'grid', placeItems:'center', flexShrink:0}}>
              <I name="verified" size={18}/>
            </div>
            <div style={{flex:1, fontSize:13, color:'var(--ink-2)'}}>
              <div style={{fontWeight:600, fontSize:13, marginBottom:2, color:'var(--ink)'}}>Get the Verified badge</div>
              Owners with verified listings get 3× more inquiries. Takes 5 minutes.
            </div>
            <button className="btn" style={{height:32, background:'var(--ink)', color:'#fff', fontSize:12}}>Start</button>
          </div>
        </div>
      </div>

      <BottomNav active="home" role="owner"/>
    </Phone>
  );
}

function MiniStat({ label, value, delta }) {
  return (
    <div style={{padding:14, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14}}>
      <div style={{fontSize:11, color:'var(--muted)', letterSpacing:'.04em', textTransform:'uppercase', fontWeight:600}}>{label}</div>
      <div className="t-display" style={{fontSize:22, marginTop:6, letterSpacing:'-0.02em'}}>{value}</div>
      <div style={{fontSize:11, color:'var(--success)', fontWeight:600, marginTop:2}}>{delta}</div>
    </div>
  );
}

function OwnerListingCard({ listing }) {
  return (
    <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:12, display:'flex', gap:12, alignItems:'flex-start'}}>
      <div style={{position:'relative', width:84, height:84, borderRadius:12, overflow:'hidden', flexShrink:0}}>
        <img src={listing.photo} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8}}>
          <div style={{fontWeight:600, fontSize:14, lineHeight:1.25, overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical'}}>{listing.title}</div>
          <button className="btn btn-ghost btn-sm" style={{padding:0, color:'var(--muted)', height:'auto'}}><I name="more" size={18}/></button>
        </div>
        <div style={{fontSize:11, color:'var(--muted)', marginTop:1}}>{listing.area}</div>
        <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:6}}>
          <span className={`badge badge-${listing.statusKind}`}>{listing.statusKind === 'success' && '● '}{listing.status}</span>
          <span className="t-mono" style={{fontSize:13, fontWeight:600}}>৳{listing.price.toLocaleString('en-IN')}<span style={{color:'var(--muted)', fontWeight:500, fontFamily:'var(--font-sans)', fontSize:11}}> /mo</span></span>
        </div>
        <div style={{display:'flex', gap:14, marginTop:8, fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:4}}><I name="eye" size={11}/>{listing.views}</span>
          <span style={{display:'inline-flex', alignItems:'center', gap:4}}><I name="message" size={11}/>{listing.inquiries}</span>
        </div>
      </div>
    </div>
  );
}

// ===========================================================
// CREATE LISTING — STEP 1 (basic info)
// ===========================================================
function ScreenCreateStep1() {
  const types = [
    { n: "Apartment", ic: "home" },
    { n: "Sublet",    ic: "calendar" },
    { n: "Family",    ic: "user" },
    { n: "Bachelor",  ic: "bed" },
    { n: "Office",    ic: "image" },
    { n: "Roommate",  ic: "user" },
  ];
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:96}}>
        {/* Header */}
        <div style={{padding:'8px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button className="btn btn-ghost btn-sm" style={{padding:0}}><I name="x" size={22}/></button>
          <div style={{fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>Step 1 / 5</div>
          <button className="btn btn-ghost btn-sm" style={{padding:0, color:'var(--muted)'}}>Save</button>
        </div>
        {/* Progress */}
        <div style={{padding:'12px 20px 0'}}>
          <div style={{display:'flex', gap:4, height:4}}>
            {[1,2,3,4,5].map(s => (
              <div key={s} style={{flex:1, height:4, borderRadius:2, background: s===1 ? 'var(--accent)' : 'var(--surface-2)'}}/>
            ))}
          </div>
        </div>

        <div style={{padding:'24px 20px 0'}}>
          <div className="t-eyebrow">The basics</div>
          <h1 className="t-display" style={{fontSize:26, lineHeight:1.1, marginTop:6, marginBottom:6}}>
            Tell us about your place.
          </h1>
          <p className="t-muted" style={{margin:0, fontSize:13}}>You can refine details later — start with what you know.</p>

          <div style={{marginTop:22}}>
            <div className="field-label" style={{marginBottom:10}}>Property type</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
              {types.map((t, i) => (
                <div key={t.n} style={{
                  padding:'14px 8px',
                  border: i===0 ? '1.5px solid var(--ink)' : '1px solid var(--border)',
                  background: i===0 ? 'var(--ink)' : 'var(--surface)',
                  color: i===0 ? '#FFFCF7' : 'var(--ink)',
                  borderRadius:12,
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  gap:6,
                  cursor:'pointer',
                }}>
                  <I name={t.ic} size={20}/>
                  <span style={{fontSize:12, fontWeight:600}}>{t.n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="field" style={{marginTop:22}}>
            <div className="field-label">Listing title</div>
            <div className="field-input">
              <input defaultValue="Sunlit 3BHK near Dhanmondi Lake"/>
            </div>
            <div style={{fontSize:11, color:'var(--muted)', marginTop:2, display:'flex', justifyContent:'space-between'}}>
              <span>Make it specific &amp; honest.</span>
              <span className="t-mono">36 / 60</span>
            </div>
          </div>

          <div style={{marginTop:22}}>
            <div className="field-label" style={{marginBottom:10}}>Rooms</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10}}>
              <Counter label="Bedrooms" value={3}/>
              <Counter label="Bathrooms" value={2}/>
              <Counter label="Balconies" value={1}/>
            </div>
          </div>

          <div className="field" style={{marginTop:22}}>
            <div className="field-label">Size</div>
            <div className="field-input">
              <input defaultValue="1,450"/>
              <span style={{fontSize:13, color:'var(--muted)', fontWeight:500}}>sqft</span>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:18}}>
            <div className="field">
              <div className="field-label">Monthly rent</div>
              <div className="field-input">
                <span className="prefix">৳</span>
                <input defaultValue="42,000"/>
              </div>
            </div>
            <div className="field">
              <div className="field-label">Deposit</div>
              <div className="field-input">
                <span className="prefix">৳</span>
                <input defaultValue="42,000" style={{color:'var(--muted-2)'}}/>
              </div>
            </div>
          </div>

          <div style={{padding:'14px', marginTop:18, background:'var(--surface-2)', borderRadius:12, display:'flex', gap:10, alignItems:'flex-start'}}>
            <I name="check-circle" size={18} style={{color:'var(--success)', flexShrink:0, marginTop:1}}/>
            <div style={{fontSize:12, color:'var(--ink-2)', lineHeight:1.5}}>
              <strong style={{color:'var(--ink)'}}>Looks priced right.</strong> Similar 3BHK flats in Dhanmondi rent for ৳38,000–৳50,000.
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'14px 20px 22px', background:'rgba(250,250,246,.92)', backdropFilter:'blur(12px)', borderTop:'1px solid var(--border)', display:'flex', gap:10, alignItems:'center'}}>
          <div style={{flex:1, fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>Next: photos</div>
          <button className="btn btn-accent btn-lg" style={{minWidth:160}}>Continue <I name="arrow-right" size={16}/></button>
        </div>
      </div>
    </Phone>
  );
}

function Counter({ label, value }) {
  return (
    <div style={{border:'1px solid var(--border-strong)', borderRadius:12, padding:'8px 10px', background:'var(--surface)'}}>
      <div style={{fontSize:10, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600}}>{label}</div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:4}}>
        <button style={{width:24, height:24, borderRadius:'50%', border:'1px solid var(--border-strong)', background:'var(--surface)', display:'grid', placeItems:'center'}}><I name="minus" size={14}/></button>
        <span className="t-mono" style={{fontSize:18, fontWeight:600}}>{value}</span>
        <button style={{width:24, height:24, borderRadius:'50%', border:'1px solid var(--ink)', background:'var(--ink)', color:'#fff', display:'grid', placeItems:'center'}}><I name="plus" size={14}/></button>
      </div>
    </div>
  );
}

// ===========================================================
// CREATE LISTING — STEP 2 (photos)
// ===========================================================
function ScreenCreateStep2() {
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:96}}>
        <div style={{padding:'8px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button className="btn btn-ghost btn-sm" style={{padding:0}}><I name="chevron-left" size={22}/></button>
          <div style={{fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>Step 2 / 5</div>
          <button className="btn btn-ghost btn-sm" style={{padding:0, color:'var(--muted)'}}>Save</button>
        </div>
        <div style={{padding:'12px 20px 0'}}>
          <div style={{display:'flex', gap:4, height:4}}>
            {[1,2,3,4,5].map(s => (
              <div key={s} style={{flex:1, height:4, borderRadius:2, background: s<=2 ? 'var(--accent)' : 'var(--surface-2)'}}/>
            ))}
          </div>
        </div>

        <div style={{padding:'24px 20px 0'}}>
          <div className="t-eyebrow">Photos</div>
          <h1 className="t-display" style={{fontSize:26, lineHeight:1.1, marginTop:6, marginBottom:6}}>
            Show off your place.
          </h1>
          <p className="t-muted" style={{margin:0, fontSize:13}}>Add at least 5 well-lit photos. The first one becomes your cover.</p>

          {/* Photo grid */}
          <div style={{marginTop:22}}>
            <div style={{position:'relative', width:'100%', aspectRatio:'4/3', borderRadius:16, overflow:'hidden', background:'var(--surface-2)'}}>
              <img src={LISTINGS[0].photo} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
              <span className="badge badge-ink" style={{position:'absolute', top:10, left:10, height:24, fontSize:11}}>Cover · 1</span>
              <div style={{position:'absolute', top:10, right:10, display:'flex', gap:6}}>
                <button style={{width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,.92)', border:'none', display:'grid', placeItems:'center'}}><I name="edit" size={14}/></button>
                <button style={{width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,.92)', border:'none', display:'grid', placeItems:'center', color:'var(--danger)'}}><I name="trash" size={14}/></button>
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:8}}>
              {LISTINGS[0].photos.slice(1, 4).map((p, i) => (
                <div key={i} style={{position:'relative', aspectRatio:'1', borderRadius:12, overflow:'hidden', background:'var(--surface-2)'}}>
                  <img src={p} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                  <span className="badge badge-ink" style={{position:'absolute', top:6, left:6, height:20, fontSize:10}}>{i+2}</span>
                </div>
              ))}
              {/* Upload tile */}
              <div style={{aspectRatio:'1', borderRadius:12, border:'1.5px dashed var(--border-strong)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, color:'var(--muted)', background:'var(--surface)'}}>
                <I name="plus" size={20}/>
                <span style={{fontSize:11, fontWeight:600}}>Add</span>
              </div>
              <div style={{aspectRatio:'1', borderRadius:12, border:'1.5px dashed var(--border)', background:'var(--surface)'}}/>
              <div style={{aspectRatio:'1', borderRadius:12, border:'1.5px dashed var(--border)', background:'var(--surface)'}}/>
            </div>
          </div>

          {/* Drop area / camera */}
          <div style={{marginTop:18, padding:14, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, display:'flex', gap:12, alignItems:'center'}}>
            <div style={{width:42, height:42, borderRadius:10, background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center'}}>
              <I name="camera" size={20}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600, fontSize:13}}>Take photos now</div>
              <div style={{fontSize:11, color:'var(--muted)'}}>Daylight, landscape orientation works best.</div>
            </div>
            <button className="btn btn-outline btn-sm">Open</button>
          </div>

          {/* Tips */}
          <div style={{marginTop:18}}>
            <div className="t-eyebrow">Quick tips</div>
            <ul style={{margin:'10px 0 0', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:6}}>
              {[
                "Wide shots beat close-ups for living spaces",
                "Open curtains and turn on the lights",
                "Show every room — bedrooms, bathrooms, kitchen",
              ].map(t => (
                <li key={t} style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--ink-2)'}}>
                  <I name="check" size={14} style={{color:'var(--success)'}} stroke={2.4}/> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'14px 20px 22px', background:'rgba(250,250,246,.92)', backdropFilter:'blur(12px)', borderTop:'1px solid var(--border)', display:'flex', gap:10, alignItems:'center'}}>
          <div style={{flex:1, fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>4 of 5 added · 1 to go</div>
          <button className="btn btn-accent btn-lg" style={{minWidth:160}}>Continue <I name="arrow-right" size={16}/></button>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenOwnerDashboard, ScreenCreateStep1, ScreenCreateStep2 });
