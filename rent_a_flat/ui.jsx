// ui.jsx — icons + shared UI primitives for FlatNest screens

const I = ({ name, size = 18, stroke = 1.6, fill = "none", className, style }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill, stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
    className, style,
  };
  switch (name) {
    case "search":   return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "filter":   return <svg {...props}><path d="M3 6h18M6 12h12M10 18h4"/></svg>;
    case "sliders":  return <svg {...props}><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2" stroke="none" fill="currentColor"/></svg>;
    case "heart":    return <svg {...props}><path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20Z"/></svg>;
    case "heart-fill": return <svg {...props} fill="currentColor" stroke="none"><path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20Z"/></svg>;
    case "bed":      return <svg {...props}><path d="M3 18V8m18 10v-5a3 3 0 0 0-3-3H3"/><path d="M3 14h18M7 10V7h6v3"/></svg>;
    case "bath":     return <svg {...props}><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M6 12V6a2 2 0 0 1 4 0M5 19l-1 2M19 19l1 2"/></svg>;
    case "ruler":    return <svg {...props}><path d="M3 17 17 3l4 4L7 21Z"/><path d="m7 13 1.5 1.5M10 10l1.5 1.5M13 7l1.5 1.5"/></svg>;
    case "map-pin":  return <svg {...props}><path d="M12 21s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "compass":  return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5 5-2Z"/></svg>;
    case "message":  return <svg {...props}><path d="M21 12c0 4-4 7-9 7a10 10 0 0 1-3.6-.6L4 20l1-3.4A6.5 6.5 0 0 1 3 12c0-4 4-7 9-7s9 3 9 7Z"/></svg>;
    case "message-fill": return <svg {...props} fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M21 12c0 4-4 7-9 7a10 10 0 0 1-3.6-.6L4 20l1-3.4A6.5 6.5 0 0 1 3 12c0-4 4-7 9-7s9 3 9 7Z"/></svg>;
    case "phone":    return <svg {...props}><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case "bell":     return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7Z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>;
    case "user":     return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case "home":     return <svg {...props}><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z"/></svg>;
    case "home-fill":return <svg {...props} fill="currentColor"><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z"/></svg>;
    case "plus":     return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":    return <svg {...props}><path d="M5 12h14"/></svg>;
    case "chevron-right": return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case "chevron-left":  return <svg {...props}><path d="m15 6-6 6 6 6"/></svg>;
    case "chevron-down":  return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case "arrow-right":   return <svg {...props}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
    case "x":          return <svg {...props}><path d="M6 6 18 18M18 6 6 18"/></svg>;
    case "lock":       return <svg {...props}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></svg>;
    case "check":      return <svg {...props}><path d="m5 12 5 5L20 7"/></svg>;
    case "check-circle": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
    case "eye":        return <svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "send":       return <svg {...props}><path d="m4 12 16-8-5 16-3-7-8-1Z"/></svg>;
    case "camera":     return <svg {...props}><path d="M3 8h3l2-3h8l2 3h3v11H3Z"/><circle cx="12" cy="13" r="4"/></svg>;
    case "image":      return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 19 5-5 4 4 3-3 4 4"/></svg>;
    case "verified":   return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2.5 14.2 4 17 3.7l1 2.7 2.5 1.5-.8 2.8 1 2.6L18.3 15l-.6 2.9-2.8.4L13.6 21 12 19.6 10.4 21l-1.3-2.7-2.8-.4L5.7 15l-2.4-1.7 1-2.6L3.5 7.9 6 6.4l1-2.7L9.8 4Z"/><path stroke="#fff" strokeWidth="2" fill="none" d="m8.5 12 2.5 2.5L16 9.5"/></svg>;
    case "star":       return <svg {...props} fill="currentColor" stroke="none"><path d="M12 3.5l2.6 5.4 5.9.6-4.4 4 1.3 5.8L12 16.4l-5.4 2.9 1.3-5.8-4.4-4 5.9-.6Z"/></svg>;
    case "wifi":       return <svg {...props}><path d="M2 9a16 16 0 0 1 20 0M5 12.5a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>;
    case "car":        return <svg {...props}><path d="M4 17V11l2-5h12l2 5v6"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 11h14"/></svg>;
    case "tv":         return <svg {...props}><rect x="3" y="5" width="18" height="13" rx="2"/><path d="m8 21 4-3 4 3"/></svg>;
    case "snow":       return <svg {...props}><path d="M12 2v20M4 7l16 10M4 17 20 7M8 4l4 2 4-2M8 20l4-2 4 2"/></svg>;
    case "elevator":   return <svg {...props}><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M9 9l-2 2 4-1ZM15 15l2-2-4 1Z"/></svg>;
    case "shield":     return <svg {...props}><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6Z"/></svg>;
    case "battery":    return <svg viewBox="0 0 28 14" width={size*1.6} height={size*0.9} fill="none" stroke="currentColor" strokeWidth="1.2" className={className} style={style}><rect x="1" y="1" width="22" height="12" rx="3"/><rect x="3" y="3" width="18" height="8" rx="1.5" fill="currentColor" stroke="none"/><rect x="24" y="5" width="2" height="4" rx="1" fill="currentColor" stroke="none"/></svg>;
    case "signal":     return <svg viewBox="0 0 18 12" width={size*1.1} height={size*0.75} fill="currentColor" stroke="none" className={className} style={style}><rect x="0" y="8" width="3" height="4" rx="0.6"/><rect x="5" y="5" width="3" height="7" rx="0.6"/><rect x="10" y="2" width="3" height="10" rx="0.6"/><rect x="15" y="0" width="3" height="12" rx="0.6"/></svg>;
    case "wifi-bar":   return <svg viewBox="0 0 16 12" width={size} height={size*0.75} fill="currentColor" stroke="none" className={className} style={style}><path d="M8 11.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM3 6.7l1.6 1.6a4.7 4.7 0 0 1 6.8 0L13 6.7a7 7 0 0 0-10 0ZM0 3.5l1.6 1.6a9.2 9.2 0 0 1 12.8 0L16 3.5a11.5 11.5 0 0 0-16 0Z"/></svg>;
    case "more":       return <svg {...props}><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>;
    case "settings":   return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>;
    case "edit":       return <svg {...props}><path d="m4 20 4-1 11-11-3-3L5 16Z"/></svg>;
    case "trash":      return <svg {...props}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/></svg>;
    case "globe":      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "calendar":   return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    default: return null;
  }
};

// === Status bar — matches iOS-ish chrome (we are mobile-web after all) ===
function StatusBar({ time = "9:41" }) {
  return (
    <div className="status-bar">
      <span>{time}</span>
      <div className="right">
        <I name="signal" size={14} />
        <I name="wifi-bar" size={14} />
        <I name="battery" size={14} />
      </div>
    </div>
  );
}

function UrlBar({ path = "flatnest.com", showBack = false }) {
  return (
    <div className="url-bar">
      <button className="icon-btn"><I name={showBack ? "chevron-left" : "more"} size={18}/></button>
      <div className="url">
        <I name="lock" className="lock" size={11} />
        <span>{path}</span>
      </div>
      <button className="icon-btn"><I name="plus" size={18}/></button>
    </div>
  );
}

// === Listing card ===
function ListingCard({ listing, saved, badge }) {
  return (
    <div className="listing-card">
      <div className="photo">
        <img src={listing.photo} alt="" />
        <div className="type"><span className="badge badge-light">{listing.type}</span></div>
        <div className="heart" data-saved={saved}>
          <I name={saved ? "heart-fill" : "heart"} size={16} style={saved ? {color:'var(--accent)'} : null}/>
        </div>
        {badge && <div style={{position:'absolute', bottom:10, left:10}}><span className="badge badge-accent">{badge}</span></div>}
      </div>
      <div className="meta">
        <div className="title-row">
          <div style={{minWidth:0}}>
            <div className="title">{listing.title}</div>
            <div className="area">{listing.area}</div>
          </div>
        </div>
        <div className="mt-2" style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div className="price">৳{listing.price.toLocaleString('en-IN')}<span style={{fontFamily:'var(--font-sans)', fontSize:11, color:'var(--muted)', fontWeight:500}}> /mo</span></div>
          {listing.rating && <div style={{display:'flex', alignItems:'center', gap:3, fontSize:12}}><I name="star" size={11} style={{color:'var(--ink)'}}/>{listing.rating}</div>}
        </div>
        <div className="specs">
          {listing.beds != null && <span><I name="bed" size={11}/>{listing.beds}</span>}
          {listing.baths != null && <span><I name="bath" size={11}/>{listing.baths}</span>}
          {listing.size != null && <span><I name="ruler" size={11}/>{listing.size} sqft</span>}
        </div>
      </div>
    </div>
  );
}

// Compact listing row (used in dashboard / wishlist alt)
function ListingRow({ listing, status, statusKind = "muted", extra }) {
  return (
    <div style={{display:'flex', gap:12, padding:12, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14}}>
      <div style={{width:84, height:84, borderRadius:10, overflow:'hidden', flexShrink:0, background:'var(--surface-2)'}}>
        <img src={listing.photo} style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontWeight:600, fontSize:14, letterSpacing:'-0.01em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{listing.title}</div>
        <div style={{fontSize:12, color:'var(--muted)', marginTop:2}}>{listing.area}</div>
        <div className="t-mono" style={{fontSize:13, marginTop:6, fontWeight:600}}>৳{listing.price.toLocaleString('en-IN')}<span style={{fontFamily:'var(--font-sans)', color:'var(--muted)', fontWeight:500}}> /mo</span></div>
        <div style={{display:'flex', gap:8, marginTop:8, alignItems:'center'}}>
          {status && <span className={`badge badge-${statusKind}`}>{status}</span>}
          {extra}
        </div>
      </div>
    </div>
  );
}

// Bottom navigation. role: "guest" | "renter" | "owner"
function BottomNav({ active = "home", role = "renter" }) {
  const items = role === "owner" ? [
    { key: "home",     label: "Listings",  icon: "home" },
    { key: "msg",      label: "Messages",  icon: "message" },
    { key: "create",   label: "New",       icon: "plus", primary: true },
    { key: "bell",     label: "Activity",  icon: "bell" },
    { key: "user",     label: "Account",   icon: "user" },
  ] : [
    { key: "home",     label: "Browse",    icon: "home" },
    { key: "map",      label: "Map",       icon: "compass" },
    { key: "saved",    label: "Saved",     icon: "heart" },
    { key: "msg",      label: "Messages",  icon: "message" },
    { key: "user",     label: "Profile",   icon: "user" },
  ];
  return (
    <div className="bottom-nav">
      {items.map(it => (
        <div key={it.key} className={`nav-item${active===it.key?' active':''}`}>
          {it.primary ? (
            <div style={{width:42, height:42, borderRadius:12, background:'var(--accent)', color:'#fff', display:'grid', placeItems:'center', marginBottom:-2, boxShadow:'0 4px 14px rgba(194,65,12,.35)'}}>
              <I name={it.icon} size={20} stroke={2}/>
            </div>
          ) : (
            <I name={it.icon} size={22} stroke={active===it.key?2:1.6}/>
          )}
          {!it.primary && <span>{it.label}</span>}
        </div>
      ))}
    </div>
  );
}

// Section header
function SectionHeader({ eyebrow, title, action }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:4, marginBottom:14}}>
      <div>
        {eyebrow && <div className="t-eyebrow" style={{marginBottom:4}}>{eyebrow}</div>}
        <h3 className="t-display" style={{margin:0, fontSize:22}}>{title}</h3>
      </div>
      {action && <button className="btn btn-ghost btn-sm" style={{padding:'0 4px', color:'var(--ink-2)'}}>{action} <I name="chevron-right" size={14}/></button>}
    </div>
  );
}

// Tiny phone wrapper used by every artboard
function Phone({ children, className = "", noBottomNav, time }) {
  return (
    <div className={`phone ${className}`}>
      <StatusBar time={time}/>
      {children}
      <div className="home-indicator"></div>
    </div>
  );
}

Object.assign(window, {
  I, StatusBar, UrlBar, ListingCard, ListingRow, BottomNav, SectionHeader, Phone,
});
