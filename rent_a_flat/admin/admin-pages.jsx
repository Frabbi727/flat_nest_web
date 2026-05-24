// admin-pages.jsx — page bodies for FlatNest Admin

// ───────────────────────────────────────────────────────────
// DASHBOARD
// ───────────────────────────────────────────────────────────
function ADMPageDashboard({ t, setPage }) {
  const stats = [
    { label: 'Active listings',  value: 7,  delta: '+12%', up: true,  trend: ADM_TREND_LISTINGS, color: t.primary },
    { label: 'Total users',      value: 15, delta: '+8%',  up: true,  trend: ADM_TREND_USERS,    color: t.secondary },
    { label: 'Pending approval', value: 3,  delta: '+2',   up: true,  trend: [1,1,2,1,2,2,3,2,3,3,2,3,3,3], color: t.warning },
    { label: 'Reports open',     value: 3,  delta: '-1',   up: false, trend: [4,5,5,4,4,3,4,3,3,4,3,3,3,3], color: t.error },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 28 }}>
      {/* Top: stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map((s) => (
          <ADMCard key={s.label} t={t}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 12.5, color: t.inkSoft, fontWeight: 600 }}>{s.label}</div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                fontSize: 11, fontWeight: 600,
                color: s.up ? t.success : t.error,
                background: s.up ? t.successSoft : t.errorSoft,
                padding: '2px 7px', borderRadius: 999,
              }}>
                <ADMIcon name={s.up ? 'arrow-up' : 'arrow-dn'} size={11} />
                {s.delta}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: t.ink, letterSpacing: -0.6, lineHeight: 1 }}>{s.value}</div>
              <ADMSparkline data={s.trend} color={s.color} width={88} height={32} />
            </div>
            <div style={{ fontSize: 11.5, color: t.inkFaint, marginTop: 8 }}>vs. previous 14 days</div>
          </ADMCard>
        ))}
      </div>

      {/* Middle row: trend chart + type breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <ADMCard t={t}>
          <ADMSectionHead t={t} title="New listings — last 14 days"
            hint="Daily count of new flat listings posted on the platform"
            action={<ADMTabs t={t} value="14d" onChange={() => {}} options={[{value:'7d',label:'7d'},{value:'14d',label:'14d'},{value:'30d',label:'30d'}]} />} />
          <ADMBars data={ADM_TREND_LISTINGS} color={t.primary} t={t} height={140} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: t.inkSoft, fontVariantNumeric: 'tabular-nums' }}>
            <span>May 7</span><span>May 14</span><span>Today</span>
          </div>
        </ADMCard>

        <ADMCard t={t}>
          <ADMSectionHead t={t} title="By listing type" hint="Distribution of active listings" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <ADMDonut t={t} data={ADM_TYPE_BREAKDOWN} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ADM_TYPE_BREAKDOWN.map((d) => (
                <div key={d.type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                  <span style={{ fontSize: 12.5, color: t.inkMid, flex: 1 }}>{d.type}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </ADMCard>
      </div>

      {/* Lower row: pending approvals + top areas + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>
        {/* Pending approvals */}
        <ADMCard t={t} pad={0}>
          <div style={{ padding: 18, paddingBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>Pending approvals</div>
              <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>New listings waiting for review</div>
            </div>
            <button onClick={() => setPage('approvals')} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: t.primary, fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>View queue <ADMIcon name="chevron" size={14}/></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ADM_LISTINGS.filter(l => l.status === 'Pending').slice(0, 3).map((l, i, arr) => (
              <div key={l.id} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr auto',
                gap: 12, padding: '12px 18px', alignItems: 'center',
                borderTop: `1px solid ${t.border}`,
              }}>
                <ADMThumb tint={l.photo} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>
                    {l.owner} · {l.area} · {fnBDT(l.price)}/mo · {l.created}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <ADMIconBtn t={t} icon="check" tone="success" title="Approve" />
                  <ADMIconBtn t={t} icon="x" tone="danger"  title="Reject" />
                  <ADMIconBtn t={t} icon="eye" title="View" />
                </div>
              </div>
            ))}
          </div>
        </ADMCard>

        {/* Top areas */}
        <ADMCard t={t}>
          <ADMSectionHead t={t} title="Top areas" hint="Most active neighborhoods" />
          <ADMHBars t={t} data={ADM_AREA_BREAKDOWN} color={t.primary} />
        </ADMCard>

        {/* Recent activity */}
        <ADMCard t={t} pad={0}>
          <div style={{ padding: 18, paddingBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>Recent activity</div>
            <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>Audit feed</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 280, overflow: 'auto' }}>
            {ADM_ACTIVITY.slice(0, 6).map((a) => {
              const icon = {
                'listing.new': 'plus', 'listing.approve': 'check', 'listing.reject': 'x',
                'listing.flag': 'flag', 'user.new': 'users', 'user.verify': 'verify',
                'chat.report': 'flag',
              }[a.kind] || 'sparkle';
              const color = {
                'listing.new': t.primary, 'listing.approve': t.success, 'listing.reject': t.error,
                'listing.flag': t.warning, 'user.new': t.primary, 'user.verify': t.success,
                'chat.report': t.warning,
              }[a.kind] || t.inkMid;
              return (
                <div key={a.id} style={{
                  display: 'flex', gap: 10, padding: '10px 18px',
                  borderTop: `1px solid ${t.border}`, alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 13,
                    background: withAlpha(color, 0.15), color,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}><ADMIcon name={icon} size={14} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: t.ink, lineHeight: 1.35 }}>
                      <b style={{ fontWeight: 600 }}>{a.actor}</b> · <span style={{ color: t.inkMid }}>{a.target}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </ADMCard>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// LISTINGS
// ───────────────────────────────────────────────────────────
function ADMPageListings({ t }) {
  const [filter, setFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const counts = {
    All:      ADM_LISTINGS.length,
    Active:   ADM_LISTINGS.filter(l => l.status === 'Active').length,
    Pending:  ADM_LISTINGS.filter(l => l.status === 'Pending').length,
    Rejected: ADM_LISTINGS.filter(l => l.status === 'Rejected').length,
  };

  const rows = ADM_LISTINGS.filter(l => filter === 'All' || l.status === filter)
    .filter(l => !search || (l.title + l.owner + l.area).toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ADMTabs t={t} value={filter} onChange={setFilter} options={[
          { value: 'All',      label: 'All',      count: counts.All },
          { value: 'Active',   label: 'Active',   count: counts.Active },
          { value: 'Pending',  label: 'Pending',  count: counts.Pending },
          { value: 'Rejected', label: 'Rejected', count: counts.Rejected },
        ]} />
        <div style={{ flex: 1 }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 36, padding: '0 12px', borderRadius: 9,
          background: t.surface, border: `1px solid ${t.border}`,
          width: 240, color: t.inkSoft,
        }}>
          <ADMIcon name="search" size={15} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter listings…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: t.ink, fontSize: 13 }} />
        </div>
        <button style={{
          height: 36, padding: '0 12px', borderRadius: 9,
          background: t.surface, border: `1px solid ${t.border}`, color: t.inkMid,
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 600, fontSize: 13,
        }}><ADMIcon name="filter" size={14} /> Filters</button>
        <button style={{
          height: 36, padding: '0 14px', borderRadius: 9,
          background: t.primary, color: '#fff', border: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 600, fontSize: 13,
        }}><ADMIcon name="plus" size={14} /> New listing</button>
      </div>

      <ADMCard t={t} pad={0}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FN_FONT }}>
            <thead>
              <tr style={{ background: t.bgAlt }}>
                {['ID', 'Listing', 'Owner', 'Area', 'Type', 'Price', 'Beds', 'Status', 'Views', ''].map((h, i) => (
                  <th key={i} style={{
                    textAlign: i === 5 || i === 6 || i === 8 ? 'right' : 'left',
                    fontSize: 11, color: t.inkSoft, fontWeight: 600,
                    letterSpacing: 0.4, textTransform: 'uppercase',
                    padding: '12px 16px', borderBottom: `1px solid ${t.border}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: t.inkSoft, fontFamily: 'ui-monospace, monospace' }}>{l.id}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <ADMThumb tint={l.photo} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260, whiteSpace: 'nowrap' }}>{l.title}</div>
                        <div style={{ fontSize: 11.5, color: t.inkSoft, marginTop: 2 }}>{l.created}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: t.ink }}>{l.owner}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: t.inkMid }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ADMIcon name="pin" size={12} /> {l.area}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex', padding: '2px 8px', borderRadius: 999,
                      background: t.primarySoft, color: t.primaryInk,
                      fontSize: 11.5, fontWeight: 600,
                    }}>{l.type}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 600, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>{fnBDT(l.price)}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: t.inkMid, fontVariantNumeric: 'tabular-nums' }}>{l.beds}</td>
                  <td style={{ padding: '12px 16px' }}><ADMStatus status={l.status} t={t} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: t.inkMid, fontVariantNumeric: 'tabular-nums' }}>{l.views}</td>
                  <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      {l.status === 'Pending' && (
                        <React.Fragment>
                          <ADMIconBtn t={t} icon="check" tone="success" title="Approve" />
                          <ADMIconBtn t={t} icon="x" tone="danger" title="Reject" />
                        </React.Fragment>
                      )}
                      <ADMIconBtn t={t} icon="eye" title="View" />
                      <ADMIconBtn t={t} icon="edit" title="Edit" />
                      <ADMIconBtn t={t} icon="trash" tone="danger" title="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', borderTop: `1px solid ${t.border}`,
        }}>
          <div style={{ fontSize: 12, color: t.inkSoft }}>
            Showing <b style={{ color: t.ink }}>1–{rows.length}</b> of <b style={{ color: t.ink }}>{rows.length}</b> listings
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: t.inkSoft }}>Per page</span>
            <span style={{
              padding: '4px 10px', borderRadius: 7,
              background: t.bgAlt, color: t.ink, fontSize: 12.5, fontWeight: 600,
            }}>10</span>
          </div>
        </div>
      </ADMCard>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// USERS
// ───────────────────────────────────────────────────────────
function ADMPageUsers({ t }) {
  const [filter, setFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const counts = {
    All:     ADM_USERS.length,
    Owners:  ADM_USERS.filter(u => u.role === 'owner').length,
    Renters: ADM_USERS.filter(u => u.role === 'renter').length,
    Unverified: ADM_USERS.filter(u => !u.verified).length,
  };
  const rows = ADM_USERS
    .filter(u => filter === 'All' || (filter === 'Owners' && u.role === 'owner') || (filter === 'Renters' && u.role === 'renter') || (filter === 'Unverified' && !u.verified))
    .filter(u => !search || (u.name + u.email + u.phone).toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ADMTabs t={t} value={filter} onChange={setFilter} options={[
          { value: 'All',        label: 'All',        count: counts.All },
          { value: 'Owners',     label: 'Owners',     count: counts.Owners },
          { value: 'Renters',    label: 'Renters',    count: counts.Renters },
          { value: 'Unverified', label: 'Unverified', count: counts.Unverified },
        ]} />
        <div style={{ flex: 1 }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 36, padding: '0 12px', borderRadius: 9,
          background: t.surface, border: `1px solid ${t.border}`,
          width: 240, color: t.inkSoft,
        }}>
          <ADMIcon name="search" size={15} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Find users…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: t.ink, fontSize: 13 }} />
        </div>
        <button style={{
          height: 36, padding: '0 14px', borderRadius: 9,
          background: t.primary, color: '#fff', border: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 600, fontSize: 13,
        }}><ADMIcon name="plus" size={14} /> Invite user</button>
      </div>

      <ADMCard t={t} pad={0}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FN_FONT }}>
            <thead>
              <tr style={{ background: t.bgAlt }}>
                {['User', 'Contact', 'Role', 'Listings', 'Verified', 'Last active', 'Joined', ''].map((h, i) => (
                  <th key={i} style={{
                    textAlign: (i === 3) ? 'right' : 'left',
                    fontSize: 11, color: t.inkSoft, fontWeight: 600,
                    letterSpacing: 0.4, textTransform: 'uppercase',
                    padding: '12px 16px', borderBottom: `1px solid ${t.border}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <ADMAvatar name={u.name} t={t} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink, lineHeight: 1.2 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: t.inkSoft, fontFamily: 'ui-monospace, monospace', marginTop: 2 }}>{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ fontSize: 12.5, color: t.ink, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <ADMIcon name="mail" size={12} /> {u.email}
                    </div>
                    {u.phone !== '—' && (
                      <div style={{ fontSize: 11.5, color: t.inkSoft, display: 'flex', alignItems: 'center', gap: 5, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>
                        <ADMIcon name="phone" size={11} /> {u.phone}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}><ADMRole role={u.role} t={t} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 600, color: u.listings > 0 ? t.ink : t.inkFaint, fontVariantNumeric: 'tabular-nums' }}>{u.listings}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {u.verified ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: t.success, fontSize: 12.5, fontWeight: 600 }}>
                        <ADMIcon name="check" size={14} /> Verified
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: t.warning, fontSize: 12.5, fontWeight: 600 }}>
                        <ADMIcon name="x" size={14} /> Pending
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12.5, color: t.inkMid }}>{u.lastActive}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12.5, color: t.inkSoft }}>{u.joined}</td>
                  <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <ADMIconBtn t={t} icon="eye" title="View" />
                      <ADMIconBtn t={t} icon="edit" title="Edit" />
                      <ADMIconBtn t={t} icon="trash" tone="danger" title="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderTop: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, color: t.inkSoft }}>
            Showing <b style={{ color: t.ink }}>1–{rows.length}</b> of <b style={{ color: t.ink }}>{rows.length}</b> users
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {[1, 2].map((p, i) => (
              <button key={p} style={{
                width: 28, height: 28, borderRadius: 7,
                background: i === 0 ? t.primary : t.surface,
                color: i === 0 ? '#fff' : t.inkMid,
                border: `1px solid ${i === 0 ? t.primary : t.border}`,
                cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
              }}>{p}</button>
            ))}
            <button style={{
              width: 28, height: 28, borderRadius: 7,
              background: t.surface, color: t.inkMid,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><ADMIcon name="chevron" size={14}/></button>
          </div>
        </div>
      </ADMCard>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// APPROVALS — moderation queue (rich card per listing)
// ───────────────────────────────────────────────────────────
function ADMPageApprovals({ t }) {
  const pending = ADM_LISTINGS.filter(l => l.status === 'Pending');
  const recent = ADM_LISTINGS.filter(l => l.status === 'Active' || l.status === 'Rejected').slice(0, 5);

  return (
    <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ADMSectionHead t={t}
          title={`${pending.length} listings need review`}
          hint="Approve to publish, reject to remove from the queue. Listings auto-expire after 7 days unreviewed."
        />
        {pending.map((l) => (
          <ADMCard key={l.id} t={t} pad={0}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0 }}>
              {/* Photo */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '100%', height: '100%', minHeight: 180,
                  background: l.photo, borderRadius: '14px 0 0 14px',
                  backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 10px)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    background: 'rgba(0,0,0,0.5)', color: '#fff',
                    fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
                    padding: '3px 7px', borderRadius: 5, textTransform: 'uppercase',
                    fontFamily: 'ui-monospace, monospace',
                  }}>{l.id}</div>
                  <svg viewBox="0 0 160 180" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
                    <path d="M20 110 L80 60 L140 110 L140 160 L20 160 Z" fill="rgba(0,0,0,0.18)"/>
                    <rect x="68" y="108" width="24" height="52" fill="rgba(255,255,255,0.35)"/>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>{l.title}</div>
                    <div style={{ fontSize: 12.5, color: t.inkSoft, marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><ADMIcon name="pin" size={12}/> {l.area}</span>
                      <span>·</span>
                      <span>{l.type}</span>
                      <span>·</span>
                      <span>{l.beds} beds</span>
                      <span>·</span>
                      <span>Submitted {l.created}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 19, fontWeight: 700, color: t.ink, letterSpacing: -0.3, fontVariantNumeric: 'tabular-nums' }}>{fnBDT(l.price)}</div>
                    <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>per month</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${t.borderSoft}` }}>
                  <ADMAvatar name={l.owner} size={26} t={t} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, color: t.ink, fontWeight: 600 }}>{l.owner}</div>
                    <div style={{ fontSize: 11, color: t.inkSoft }}>Owner · 4 prior listings · 92% approval rate</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button style={{
                    flex: 1, height: 38, borderRadius: 9, border: 'none',
                    background: t.success, color: '#fff', fontWeight: 600, fontSize: 13.5,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    cursor: 'pointer',
                  }}><ADMIcon name="check" size={15}/> Approve</button>
                  <button style={{
                    flex: 1, height: 38, borderRadius: 9, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.error, fontWeight: 600, fontSize: 13.5,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    cursor: 'pointer',
                  }}><ADMIcon name="x" size={15}/> Reject</button>
                  <button style={{
                    height: 38, padding: '0 14px', borderRadius: 9, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.inkMid, fontWeight: 600, fontSize: 13.5,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    cursor: 'pointer',
                  }}><ADMIcon name="eye" size={15}/> Preview</button>
                </div>
              </div>
            </div>
          </ADMCard>
        ))}

        {pending.length === 0 && (
          <ADMCard t={t}>
            <div style={{ textAlign: 'center', padding: 40, color: t.inkSoft }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>All caught up</div>
              <div style={{ fontSize: 12.5, marginTop: 4 }}>No listings waiting for review.</div>
            </div>
          </ADMCard>
        )}
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ADMCard t={t}>
          <div style={{ fontSize: 13, color: t.inkSoft, fontWeight: 600 }}>Review pace · 7-day avg</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: t.ink, letterSpacing: -0.6, marginTop: 6 }}>2.4h</div>
          <div style={{ fontSize: 12, color: t.success, marginTop: 4, fontWeight: 600 }}>↓ 18% faster than last week</div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: t.inkSoft, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Approved</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.ink, marginTop: 2 }}>14 <span style={{ fontSize: 11, color: t.success }}>· 88%</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: t.inkSoft, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Rejected</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.ink, marginTop: 2 }}>2 <span style={{ fontSize: 11, color: t.error }}>· 12%</span></div>
            </div>
          </div>
        </ADMCard>

        <ADMCard t={t} pad={0}>
          <div style={{ padding: 16, paddingBottom: 10 }}>
            <div style={{ fontSize: 13, color: t.inkSoft, fontWeight: 600 }}>Recently reviewed</div>
          </div>
          {recent.map((l) => (
            <div key={l.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px', borderTop: `1px solid ${t.border}`,
            }}>
              <ADMThumb tint={l.photo} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                <div style={{ fontSize: 11, color: t.inkSoft }}>{l.owner}</div>
              </div>
              <ADMStatus status={l.status} t={t} />
            </div>
          ))}
        </ADMCard>

        <ADMCard t={t}>
          <div style={{ fontSize: 13, color: t.inkSoft, fontWeight: 600, marginBottom: 8 }}>Quick reject reasons</div>
          {['Title violates community guidelines', 'Stock / fake photos', 'Price seems unrealistic', 'Duplicate of existing listing', 'Missing required info'].map((r) => (
            <div key={r} style={{
              padding: '8px 10px', borderRadius: 8,
              background: t.bgAlt, fontSize: 12.5, color: t.ink, marginTop: 6,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <ADMIcon name="x" size={12} /> {r}
            </div>
          ))}
        </ADMCard>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// REPORTS — user-submitted issues
// ───────────────────────────────────────────────────────────
function ADMPageReports({ t }) {
  const sevColor = { high: t.error, medium: t.warning, low: t.inkMid };
  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ADMSectionHead t={t}
        title="Open reports"
        hint="Issues submitted by renters or flagged automatically by chat moderation"
      />
      <ADMCard t={t} pad={0}>
        {ADM_REPORTS.map((r, i) => (
          <div key={r.id} style={{
            display: 'grid', gridTemplateColumns: '8px 1fr auto', gap: 14,
            padding: 18, borderTop: i === 0 ? 'none' : `1px solid ${t.border}`,
          }}>
            <div style={{ width: 4, borderRadius: 2, background: sevColor[r.severity] }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace', color: t.inkSoft }}>{r.id}</span>
                <span style={{
                  padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                  background: withAlpha(sevColor[r.severity], 0.15), color: sevColor[r.severity],
                  textTransform: 'capitalize',
                }}>{r.severity}</span>
                <span style={{ fontSize: 11, color: t.inkSoft }}>{r.time}</span>
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: t.ink, marginBottom: 4 }}>{r.listing}</div>
              <div style={{ fontSize: 13, color: t.inkMid, marginBottom: 6 }}>{r.reason}</div>
              <div style={{ fontSize: 12, color: t.inkSoft, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <ADMIcon name="mail" size={12} /> Reporter: {r.reporter}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <button style={{
                height: 32, padding: '0 12px', borderRadius: 8,
                background: t.primary, color: '#fff', border: 'none',
                fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
              }}>Investigate</button>
              <button style={{
                height: 32, padding: '0 12px', borderRadius: 8,
                background: t.surface, color: t.inkMid, border: `1px solid ${t.border}`,
                fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
              }}>Dismiss</button>
            </div>
          </div>
        ))}
      </ADMCard>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// ANALYTICS
// ───────────────────────────────────────────────────────────
function ADMPageAnalytics({ t }) {
  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <ADMCard t={t}>
          <ADMSectionHead t={t} title="New users — 14 days" />
          <ADMBars data={ADM_TREND_USERS} color={t.secondary} t={t} height={140} />
        </ADMCard>
        <ADMCard t={t}>
          <ADMSectionHead t={t} title="Chats started — 14 days" />
          <ADMBars data={ADM_TREND_CHATS} color={t.primary} t={t} height={140} />
        </ADMCard>
      </div>

      <ADMCard t={t}>
        <ADMSectionHead t={t} title="Estimated commission revenue"
          hint="Based on 5% match fee — thousand BDT per day"
        />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 700, color: t.ink, letterSpacing: -0.8 }}>৳2,28,000</div>
            <div style={{ fontSize: 12.5, color: t.success, fontWeight: 600 }}>+34% vs previous period</div>
          </div>
          <div style={{ flex: 1 }}>
            <ADMBars data={ADM_TREND_REVENUE} color={t.primary} t={t} height={70} />
          </div>
        </div>
      </ADMCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <ADMCard t={t}>
          <ADMSectionHead t={t} title="Top areas" />
          <ADMHBars t={t} data={ADM_AREA_BREAKDOWN} color={t.primary} />
        </ADMCard>
        <ADMCard t={t}>
          <ADMSectionHead t={t} title="Listing types" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <ADMDonut t={t} data={ADM_TYPE_BREAKDOWN} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ADM_TYPE_BREAKDOWN.map((d) => (
                <div key={d.type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                  <span style={{ fontSize: 12.5, color: t.inkMid, flex: 1 }}>{d.type}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: t.ink }}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </ADMCard>
      </div>
    </div>
  );
}

Object.assign(window, {
  ADMPageDashboard, ADMPageListings, ADMPageUsers,
  ADMPageApprovals, ADMPageReports, ADMPageAnalytics,
});
