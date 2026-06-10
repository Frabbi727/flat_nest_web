import Link from "next/link";

const columns = [
  {
    heading: "For renters",
    links: ["How to find a flat", "Verified listings", "Safety tips", "Trust & safety"],
  },
  {
    heading: "For owners",
    links: ["List your flat", "Owner handbook", "Verification", "Pricing"],
  },
  {
    heading: "Company",
    links: ["About us", "Careers", "Press", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Help center", "Neighborhoods", "Mobile app", "Blog"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F2F0EC] border-t border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 md:gap-12 pb-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <path
                  d="M4 16L16 5l12 11v10a3 3 0 01-3 3H7a3 3 0 01-3-3V16z"
                  fill="#1A6B72"
                  fillOpacity="0.15"
                  stroke="#1A6B72"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <rect
                  x="12.5" y="15.5" width="7" height="9" rx="1.2"
                  stroke="#1A6B72"
                  strokeWidth="2"
                  fill="#1A6B72"
                  fillOpacity="0.6"
                />
              </svg>
              <span className="text-base font-bold tracking-tight">FlatNest</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-[280px]">
              Find or list a flat across Dhaka. Trusted owners, verified renters, zero broker fees.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 FlatNest. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Cookies</span>
            <span>🇧🇩 English (BD)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
