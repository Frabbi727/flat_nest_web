// screens-renter.jsx — Listing Detail, Wishlist, Map, Chat list, Chat thread

// ===========================================================
// LISTING DETAIL (auth-required)
// ===========================================================
function ScreenListingDetail() {
  const l = byId("l1");
  const amenityList = [
    { n: "High-speed Wi-Fi", ic: "wifi" },
    { n: "Generator backup", ic: "shield" },
    { n: "Covered parking",  ic: "car" },
    { n: "Passenger lift",   ic: "elevator" },
    { n: "Air-conditioning", ic: "snow" },
    { n: "Smart TV in lounge", ic: "tv" },
    { n: "24/7 security",    ic: "shield" },
    { n: "Balcony — lake-view", ic: "image" },
  ];
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:96}}>
        {/* Hero gallery */}
        <div style={{position:'relative', height:380, marginTop:-44}}>
          <img src={l.photo} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,.15))'}}/>
          {/* Top chrome */}
          <div style={{position:'absolute', top:54, left:16, right:16, display:'flex', justifyContent:'space-between'}}>
            <button style={{width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.92)', border:'none', display:'grid', placeItems:'center', backdropFilter:'blur(8px)'}}>
              <I name="chevron-left" size={20}/>
            </button>
            <div style={{display:'flex', gap:8}}>
              <button style={{width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.92)', border:'none', display:'grid', placeItems:'center'}}>
                <I name="send" size={18}/>
              </button>
              <button style={{width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,.92)', border:'none', display:'grid', placeItems:'center', color:'var(--accent)'}}>
                <I name="heart-fill" size={18}/>
              </button>
            </div>
          </div>
          {/* Photo counter */}
          <div style={{position:'absolute', bottom:16, right:16, background:'rgba(28,25,23,.7)', color:'#fff', borderRadius:999, padding:'4px 10px', fontSize:11, fontWeight:600, fontFamily:'var(--font-mono)', display:'flex', alignItems:'center', gap:4}}>
            <I name="image" size={12}/> 1 / 12
          </div>
          {/* dots */}
          <div style={{position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)', display:'flex', gap:4}}>
            {[0,1,2,3,4].map(i => <span key={i} style={{width:6, height:6, borderRadius:'50%', background: i===0?'#fff':'rgba(255,255,255,.55)'}}/>)}
          </div>
        </div>

        <div style={{padding:'20px 20px 0'}}>
          {/* Title block */}
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span className="badge badge-success" style={{height:20}}>● Available now</span>
                <span className="badge badge-info" style={{height:20}}>{l.type}</span>
              </div>
              <h1 className="t-display" style={{fontSize:26, marginTop:10, marginBottom:4, lineHeight:1.1}}>{l.title}</h1>
              <div style={{fontSize:13, color:'var(--muted)', display:'flex', alignItems:'center', gap:4}}>
                <I name="map-pin" size={13}/> {l.area}
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="t-display" style={{fontSize:24}}>৳{l.price.toLocaleString('en-IN')}</div>
              <div style={{fontSize:12, color:'var(--muted)'}}>per month</div>
            </div>
          </div>

          {/* Stat row */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', marginTop:20, border:'1px solid var(--border)', borderRadius:14, padding:'14px 0', background:'var(--surface)'}}>
            <Stat icon="bed" label="Beds" value={l.beds}/>
            <Stat icon="bath" label="Baths" value={l.baths}/>
            <Stat icon="ruler" label="Size" value={`${l.size}`} suffix="sqft"/>
            <Stat icon="compass" label="Floor" value={`${l.floor}`} suffix="th" last/>
          </div>

          {/* Owner */}
          <div style={{display:'flex', alignItems:'center', gap:12, marginTop:22}}>
            <img src={AVATARS[0]} style={{width:48, height:48, borderRadius:'50%', objectFit:'cover'}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:5}}>
                <span style={{fontWeight:600, fontSize:14}}>Rumana Haque</span>
                <I name="verified" size={14} style={{color:'var(--info)'}}/>
              </div>
              <div style={{fontSize:12, color:'var(--muted)'}}>Owner · Replies in ~2 hrs · 4 listings</div>
            </div>
            <button className="btn btn-outline btn-sm" style={{height:36, borderRadius:10}}><I name="phone" size={14}/> Call</button>
          </div>

          {/* Description */}
          <div style={{marginTop:24}}>
            <SectionHeader title="About this place"/>
            <p style={{margin:0, fontSize:14, lineHeight:1.55, color:'var(--ink-2)'}}>
              {l.description} <span style={{color:'var(--accent)', fontWeight:600}}>Read more</span>
            </p>
          </div>

          {/* Amenities */}
          <div style={{marginTop:24}}>
            <SectionHeader title="What this place offers" action="All 14"/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              {amenityList.slice(0,6).map(a => (
                <div key={a.n} style={{display:'flex', alignItems:'center', gap:10, padding:'10px 0'}}>
                  <I name={a.ic} size={20} style={{color:'var(--ink-2)'}}/>
                  <span style={{fontSize:13}}>{a.n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div style={{marginTop:20, marginBottom:24}}>
            <SectionHeader title="Where you'll be" action="View map"/>
            <div style={{height:160, borderRadius:14, overflow:'hidden', position:'relative', background:'linear-gradient(135deg, #E8EFE8, #F5F2EC)'}}>
              <svg viewBox="0 0 390 200" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
                {/* roads */}
                <g stroke="#D6D3CE" strokeWidth="6" fill="none">
                  <path d="M-10 60 L 410 80"/>
                  <path d="M-10 140 L 410 130"/>
                  <path d="M80 -10 L 110 220"/>
                  <path d="M250 -10 L 230 220"/>
                </g>
                <g stroke="#E7E5E0" strokeWidth="2" fill="none">
                  <path d="M-10 30 L 410 40"/>
                  <path d="M-10 180 L 410 170"/>
                  <path d="M180 -10 L 175 220"/>
                  <path d="M320 -10 L 330 220"/>
                </g>
                {/* lake */}
                <path d="M 50 90 Q 100 60 180 95 Q 260 130 340 100 Q 380 90 410 110 L 410 160 Q 350 175 260 160 Q 170 145 100 165 Q 60 175 30 160 Z" fill="#CFE1E8" opacity="0.7"/>
                {/* parks */}
                <rect x="260" y="20" width="60" height="40" rx="4" fill="#E2EBDC"/>
                <rect x="20" y="160" width="50" height="34" rx="4" fill="#E2EBDC"/>
              </svg>
              <div style={{position:'absolute', top:'48%', left:'50%', transform:'translate(-50%, -100%)', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div style={{background:'var(--accent)', color:'#fff', padding:'6px 10px', borderRadius:999, fontSize:11, fontWeight:700, fontFamily:'var(--font-mono)', boxShadow:'0 4px 12px rgba(194,65,12,.4)'}}>৳42K</div>
                <div style={{width:0, height:0, borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderTop:'6px solid var(--accent)', marginTop:-1}}/>
              </div>
              <div style={{position:'absolute', bottom:10, left:12, background:'rgba(255,252,247,.92)', backdropFilter:'blur(8px)', padding:'6px 10px', borderRadius:10, fontSize:11, fontWeight:600, display:'flex', alignItems:'center', gap:5}}>
                <I name="map-pin" size={12}/> Dhanmondi · House 18, Road 27
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'12px 16px 22px', background:'rgba(255,252,247,.94)', backdropFilter:'blur(14px)', borderTop:'1px solid var(--border)', display:'flex', gap:10, alignItems:'center'}}>
          <div style={{flex:1, paddingLeft:6}}>
            <div className="t-mono" style={{fontSize:10, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.08em'}}>Deposit</div>
            <div style={{fontWeight:700, fontSize:15}}>৳42,000 <span style={{color:'var(--muted)', fontWeight:500, fontSize:12}}>· 1 mo.</span></div>
          </div>
          <button className="btn btn-outline" style={{height:48, width:48, padding:0, borderRadius:14}}><I name="phone" size={18}/></button>
          <button className="btn btn-accent" style={{height:48, padding:'0 22px', borderRadius:14, fontSize:15, flex:1.4}}>
            <I name="message-fill" size={16}/> Message owner
          </button>
        </div>
      </div>
    </Phone>
  );
}

function Stat({ icon, label, value, suffix, last }) {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 4px', borderRight: last? 'none' : '1px solid var(--border)'}}>
      <I name={icon} size={18} style={{color:'var(--muted)'}} stroke={1.4}/>
      <div className="t-mono" style={{fontSize:15, fontWeight:600, marginTop:6, lineHeight:1}}>
        {value}<span style={{fontSize:10, color:'var(--muted)', fontWeight:500}}>{suffix && ' ' + suffix}</span>
      </div>
      <div style={{fontSize:10, color:'var(--muted)', marginTop:4, textTransform:'uppercase', letterSpacing:'.06em'}}>{label}</div>
    </div>
  );
}

// ===========================================================
// WISHLIST
// ===========================================================
function ScreenWishlist() {
  const saved = LISTINGS.slice(0, 4);
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:78}}>
        <div style={{padding:'8px 20px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1 className="t-display" style={{fontSize:28, margin:0}}>Saved</h1>
            <button className="btn btn-ghost btn-sm" style={{padding:0, color:'var(--ink-2)'}}><I name="more" size={20}/></button>
          </div>
          <div className="t-muted" style={{fontSize:13, marginTop:2}}>4 places · 1 collection</div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex', gap:6, padding:'18px 20px 0'}}>
          <div className="chip active">All saved</div>
          <div className="chip">Long-list</div>
          <div className="chip">With Tareq</div>
          <div className="chip" style={{color:'var(--muted)'}}><I name="plus" size={14}/></div>
        </div>

        <div style={{padding:'20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          {saved.map(l => <ListingCard key={l.id} listing={l} saved/>)}
        </div>

        {/* Hint card */}
        <div style={{padding:'0 20px 24px'}}>
          <div style={{padding:14, background:'var(--surface-2)', borderRadius:14, display:'flex', gap:12, alignItems:'flex-start'}}>
            <div style={{width:36, height:36, borderRadius:10, background:'var(--surface)', display:'grid', placeItems:'center', flexShrink:0}}>
              <I name="bell" size={18}/>
            </div>
            <div style={{flex:1, fontSize:13, color:'var(--ink-2)'}}>
              <div style={{fontWeight:600, marginBottom:2}}>Get price alerts</div>
              We&apos;ll ping you if any saved listing drops in price or schedule changes.
            </div>
            <button className="btn btn-outline btn-sm" style={{height:30}}>On</button>
          </div>
        </div>
      </div>
      <BottomNav active="saved" role="renter"/>
    </Phone>
  );
}

// ===========================================================
// MAP
// ===========================================================
function ScreenMap() {
  const pins = [
    {x: 30, y: 30, price: "42K", on: true},
    {x: 65, y: 22, price: "29K"},
    {x: 55, y: 50, price: "55K"},
    {x: 22, y: 60, price: "18K"},
    {x: 78, y: 68, price: "95K"},
    {x: 42, y: 75, price: "24K"},
  ];
  const selected = byId("l1");
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:78, padding:0, position:'relative'}}>
        {/* Map */}
        <div style={{position:'absolute', inset:0, background:'#E8EFE8'}}>
          <svg viewBox="0 0 390 800" style={{width:'100%', height:'100%', display:'block'}}>
            {/* grid */}
            <g stroke="#D6D3CE" strokeWidth="6" fill="none" opacity=".55">
              <path d="M-10 120 L 410 100"/>
              <path d="M-10 240 L 410 260"/>
              <path d="M-10 400 L 410 380"/>
              <path d="M-10 560 L 410 580"/>
              <path d="M-10 720 L 410 700"/>
              <path d="M80 -10 L 100 820"/>
              <path d="M180 -10 L 175 820"/>
              <path d="M290 -10 L 310 820"/>
            </g>
            {/* thinner */}
            <g stroke="#E7E5E0" strokeWidth="2" fill="none">
              <path d="M-10 60 L 410 70"/>
              <path d="M-10 180 L 410 190"/>
              <path d="M-10 320 L 410 310"/>
              <path d="M-10 480 L 410 470"/>
              <path d="M-10 640 L 410 650"/>
              <path d="M30 -10 L 40 820"/>
              <path d="M140 -10 L 130 820"/>
              <path d="M230 -10 L 250 820"/>
              <path d="M350 -10 L 340 820"/>
            </g>
            {/* lake */}
            <path d="M 30 320 Q 140 280 230 330 Q 320 380 380 340 L 380 460 Q 290 480 200 460 Q 110 440 30 460 Z" fill="#CFE1E8" opacity=".75"/>
            <path d="M 80 540 Q 180 510 270 555 L 270 620 Q 180 640 80 620 Z" fill="#CFE1E8" opacity=".5"/>
            {/* parks */}
            <rect x="240" y="100" width="80" height="55" rx="6" fill="#E2EBDC"/>
            <rect x="40" y="640" width="60" height="50" rx="6" fill="#E2EBDC"/>
            <rect x="280" y="680" width="70" height="45" rx="6" fill="#E2EBDC"/>
          </svg>
        </div>

        {/* Top chrome */}
        <div style={{position:'absolute', top:8, left:16, right:16, display:'flex', gap:8, zIndex:2}}>
          <div style={{flex:1, display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--border-strong)', borderRadius:12, height:46, padding:'0 14px', boxShadow:'var(--shadow-2)'}}>
            <I name="search" size={16} style={{color:'var(--muted)'}}/>
            <span style={{fontSize:13, color:'var(--ink)'}}>Dhanmondi, Dhaka</span>
            <span style={{marginLeft:'auto', fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)'}}>14 nearby</span>
          </div>
          <button className="btn btn-outline" style={{width:46, height:46, padding:0, borderRadius:12, background:'var(--surface)', boxShadow:'var(--shadow-2)'}}><I name="sliders" size={18}/></button>
        </div>

        {/* Pin markers */}
        {pins.map((p, i) => (
          <div key={i} style={{position:'absolute', left:`${p.x}%`, top:`${p.y}%`, transform:'translate(-50%, -100%)', zIndex: p.on ? 3 : 2}}>
            <div style={{
              background: p.on ? 'var(--accent)' : 'var(--ink)',
              color: '#fff',
              padding: p.on ? '8px 14px' : '5px 10px',
              borderRadius: 999,
              fontSize: p.on ? 13 : 12,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              boxShadow: p.on ? '0 6px 18px rgba(194,65,12,.4)' : 'var(--shadow-2)',
              border: '2px solid #fff',
            }}>৳{p.price}</div>
          </div>
        ))}

        {/* Cluster bubble */}
        <div style={{position:'absolute', left:'46%', top:'34%', transform:'translate(-50%, -50%)', zIndex:2}}>
          <div style={{width:40, height:40, borderRadius:'50%', background:'var(--ink)', color:'#fff', display:'grid', placeItems:'center', fontSize:13, fontWeight:700, border:'2px solid #fff', boxShadow:'var(--shadow-2)'}}>12</div>
        </div>

        {/* Locate me */}
        <button style={{position:'absolute', right:16, bottom:240, width:44, height:44, borderRadius:'50%', background:'var(--surface)', border:'1px solid var(--border)', boxShadow:'var(--shadow-2)', display:'grid', placeItems:'center', zIndex:3}}>
          <I name="compass" size={20}/>
        </button>

        {/* List toggle */}
        <button style={{position:'absolute', left:'50%', transform:'translateX(-50%)', bottom:222, padding:'10px 18px', background:'var(--ink)', color:'#fff', border:'none', borderRadius:999, fontWeight:600, fontSize:13, display:'flex', alignItems:'center', gap:6, boxShadow:'var(--shadow-pop)', zIndex:3}}>
          <I name="filter" size={14}/> List · 142
        </button>

        {/* Bottom snap card */}
        <div style={{position:'absolute', left:0, right:0, bottom:78, zIndex:3}}>
          <div style={{padding:'0 16px 12px'}}>
            <div style={{background:'var(--surface)', borderRadius:16, boxShadow:'var(--shadow-pop)', padding:10, display:'flex', gap:12}}>
              <img src={selected.photo} style={{width:96, height:96, borderRadius:12, objectFit:'cover', flexShrink:0}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div style={{minWidth:0}}>
                    <div style={{fontWeight:600, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{selected.title}</div>
                    <div style={{fontSize:12, color:'var(--muted)', marginTop:2}}>{selected.area}</div>
                  </div>
                  <I name="heart" size={18} style={{color:'var(--muted)', flexShrink:0}}/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:10}}>
                  <div className="t-display" style={{fontSize:18}}>৳42,000<span style={{fontSize:11, color:'var(--muted)', fontFamily:'var(--font-sans)'}}> /mo</span></div>
                  <div style={{fontSize:11, color:'var(--muted)', display:'flex', gap:8}}>
                    <span><I name="bed" size={11}/> {selected.beds}</span>
                    <span><I name="bath" size={11}/> {selected.baths}</span>
                    <span>{selected.size}sqft</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:8, gap:5}}>
              {[0,1,2,3,4,5].map(i => <span key={i} style={{width:6, height:6, borderRadius:'50%', background: i===0?'var(--ink)':'rgba(0,0,0,.18)'}}/>)}
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="map" role="renter"/>
    </Phone>
  );
}

// ===========================================================
// CHAT LIST
// ===========================================================
function ScreenChatList() {
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:78}}>
        <div style={{padding:'8px 20px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1 className="t-display" style={{fontSize:28, margin:0}}>Messages</h1>
            <button className="btn btn-ghost btn-sm" style={{padding:0}}><I name="edit" size={20}/></button>
          </div>
          <div style={{marginTop:14, display:'flex', alignItems:'center', gap:8, background:'var(--surface-2)', borderRadius:12, height:42, padding:'0 12px'}}>
            <I name="search" size={16} style={{color:'var(--muted)'}}/>
            <span style={{fontSize:13, color:'var(--muted)'}}>Search conversations</span>
          </div>
          <div style={{display:'flex', gap:6, marginTop:14}}>
            <div className="chip active">All <span style={{marginLeft:2, color:'#FFFCF7', opacity:.7}}>4</span></div>
            <div className="chip">Unread <span style={{marginLeft:2, color:'var(--muted)'}}>2</span></div>
            <div className="chip">Archived</div>
          </div>
        </div>

        <div style={{marginTop:18}}>
          {CHATS.map((c, i) => {
            const l = byId(c.listing);
            return (
              <div key={c.id} style={{display:'flex', gap:12, padding:'14px 20px', borderTop: i===0?'1px solid var(--border)':'none', borderBottom:'1px solid var(--border)', alignItems:'flex-start', position:'relative'}}>
                <div style={{position:'relative', flexShrink:0}}>
                  <img src={AVATARS[i % AVATARS.length]} style={{width:48, height:48, borderRadius:'50%', objectFit:'cover'}}/>
                  <img src={l.photo} style={{position:'absolute', right:-6, bottom:-6, width:24, height:24, borderRadius:6, border:'2px solid var(--bg)', objectFit:'cover'}}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <span style={{fontWeight: c.unread ? 700 : 600, fontSize:14}}>{c.name}</span>
                    <span style={{fontSize:11, color:'var(--muted)', flexShrink:0, marginLeft:8}}>{c.time}</span>
                  </div>
                  <div style={{fontSize:12, color:'var(--accent)', fontWeight:500, marginTop:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{l.title}</div>
                  <div style={{display:'flex', alignItems:'center', gap:8, marginTop:4}}>
                    <span style={{fontSize:13, color: c.unread? 'var(--ink)':'var(--muted)', fontWeight: c.unread?500:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1, minWidth:0}}>{c.last}</span>
                    {c.unread > 0 && (
                      <span style={{flexShrink:0, minWidth:18, height:18, borderRadius:9, background:'var(--accent)', color:'#fff', fontSize:10, fontWeight:700, display:'grid', placeItems:'center', padding:'0 6px'}}>{c.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{padding:'24px 20px 0'}}>
          <div className="t-eyebrow" style={{marginBottom:10}}>Suggested</div>
          <div style={{display:'flex', gap:12, alignItems:'center', padding:12, background:'var(--surface)', border:'1px dashed var(--border-strong)', borderRadius:14}}>
            <div style={{width:40, height:40, borderRadius:10, background:'var(--accent-soft)', color:'var(--accent)', display:'grid', placeItems:'center'}}>
              <I name="shield" size={18}/>
            </div>
            <div style={{fontSize:12, color:'var(--ink-2)', flex:1}}>
              <div style={{fontWeight:600, fontSize:13, marginBottom:2}}>Stay safe</div>
              Always visit a property in person before paying any deposit.
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="msg" role="renter"/>
    </Phone>
  );
}

// ===========================================================
// CHAT THREAD
// ===========================================================
function ScreenChatThread() {
  const l = byId("l1");
  return (
    <Phone>
      <div className="screen" style={{paddingBottom:88, background:'var(--surface-2)'}}>
        {/* Header */}
        <div style={{background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'10px 12px'}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <button className="btn btn-ghost btn-sm" style={{padding:'0 4px'}}><I name="chevron-left" size={22}/></button>
            <img src={AVATARS[0]} style={{width:36, height:36, borderRadius:'50%', objectFit:'cover'}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:4}}>
                <span style={{fontWeight:700, fontSize:14}}>Rumana Haque</span>
                <I name="verified" size={13} style={{color:'var(--info)'}}/>
              </div>
              <div style={{fontSize:11, color:'var(--success)', display:'flex', alignItems:'center', gap:4}}><span style={{width:6, height:6, borderRadius:'50%', background:'var(--success)'}}/> Online</div>
            </div>
            <button className="btn btn-ghost btn-sm" style={{padding:'0 6px'}}><I name="phone" size={18}/></button>
            <button className="btn btn-ghost btn-sm" style={{padding:'0 4px'}}><I name="more" size={18}/></button>
          </div>

          {/* Listing pinned */}
          <div style={{display:'flex', gap:10, padding:'10px 12px', marginTop:8, background:'var(--surface-2)', borderRadius:12}}>
            <img src={l.photo} style={{width:46, height:46, borderRadius:8, objectFit:'cover'}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{l.title}</div>
              <div style={{fontSize:11, color:'var(--muted)', marginTop:2}}>{l.area} · ৳{l.price.toLocaleString('en-IN')}/mo</div>
            </div>
            <span className="badge badge-success" style={{alignSelf:'center'}}>Available</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{padding:'14px 16px 80px', display:'flex', flexDirection:'column', gap:8}}>
          <div style={{textAlign:'center', fontSize:11, color:'var(--muted)', margin:'6px 0'}}>Today</div>

          <Bubble side="left" text="Hi! I just sent an inquiry — is the lake-side flat still available?" time="11:02"/>
          <Bubble side="right" text="Hi Rumana! Yes, very interested. We&apos;re a small family of four — would Friday afternoon work for a visit?" time="11:04" read/>
          <Bubble side="left" text="Yes that works. The flat is on the 5th floor, west-facing balcony, and the lift is working as of this week." time="11:08"/>
          <Bubble side="left" text="One thing — deposit is 2 months, but I can negotiate if your contract is at least a year." time="11:08"/>
          <Bubble side="right" text="Sounds great. We&apos;d be on a 2-year minimum. Could you also share the parking situation?" time="11:11" read/>
          <Bubble side="left" attachment={l} time="11:14"/>
          <Bubble side="left" text="Covered parking for one car. Friday 4 PM?" time="11:15"/>

          <div style={{display:'flex', alignSelf:'flex-start', gap:6, marginTop:6, padding:'8px 14px', background:'var(--surface)', borderRadius:'16px 16px 16px 4px', boxShadow:'var(--shadow-1)'}}>
            <span style={{width:5, height:5, borderRadius:'50%', background:'var(--muted-2)', animation:'none'}}/>
            <span style={{width:5, height:5, borderRadius:'50%', background:'var(--muted-2)'}}/>
            <span style={{width:5, height:5, borderRadius:'50%', background:'var(--muted-2)'}}/>
          </div>
        </div>

        {/* Composer */}
        <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'10px 12px 22px', background:'rgba(255,252,247,.96)', backdropFilter:'blur(10px)', borderTop:'1px solid var(--border)', display:'flex', gap:8, alignItems:'center'}}>
          <button className="btn btn-ghost" style={{width:40, height:40, padding:0, borderRadius:'50%', background:'var(--surface-2)'}}><I name="plus" size={20}/></button>
          <div style={{flex:1, background:'var(--surface)', border:'1px solid var(--border-strong)', borderRadius:22, height:44, display:'flex', alignItems:'center', padding:'0 14px', gap:8}}>
            <span style={{flex:1, fontSize:14, color:'var(--ink)'}}>Friday 4 PM works.</span>
            <I name="image" size={18} style={{color:'var(--muted)'}}/>
          </div>
          <button className="btn btn-accent" style={{width:44, height:44, padding:0, borderRadius:'50%'}}><I name="send" size={18}/></button>
        </div>
      </div>
    </Phone>
  );
}

function Bubble({ side, text, time, read, attachment }) {
  const isR = side === "right";
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems: isR?'flex-end':'flex-start', maxWidth:'82%', alignSelf: isR?'flex-end':'flex-start'}}>
      {attachment ? (
        <div style={{background:'var(--surface)', borderRadius:'18px 18px 18px 6px', boxShadow:'var(--shadow-1)', padding:6, display:'flex', flexDirection:'column', gap:0, maxWidth:240}}>
          <img src={attachment.photo} style={{width:'100%', height:130, objectFit:'cover', borderRadius:14}}/>
          <div style={{padding:'8px 6px 4px'}}>
            <div style={{fontSize:12, fontWeight:600}}>Photo · Parking entrance</div>
            <div style={{fontSize:11, color:'var(--muted)', marginTop:1}}>From the listing</div>
          </div>
        </div>
      ) : (
        <div style={{
          background: isR ? 'var(--ink)' : 'var(--surface)',
          color: isR ? '#FFFCF7' : 'var(--ink)',
          padding:'9px 14px',
          borderRadius: isR ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
          fontSize: 14,
          lineHeight: 1.4,
          boxShadow: isR ? 'none' : 'var(--shadow-1)',
          border: isR ? 'none' : '1px solid var(--border)',
        }}>{text}</div>
      )}
      <div style={{fontSize:10, color:'var(--muted-2)', marginTop:3, display:'flex', gap:4, alignItems:'center'}}>
        {time}{read && <I name="check" size={11} style={{color:'var(--info)'}} stroke={2.4}/>}
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenListingDetail, ScreenWishlist, ScreenMap, ScreenChatList, ScreenChatThread,
});
