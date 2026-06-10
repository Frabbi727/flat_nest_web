import { Suspense } from "react";
import Link from "next/link";
import { fetchListingTypes, fetchAmenities } from "@/services/MetaService";
import HomeClient from "@/components/listing/HomeClient";
import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";

// Unsplash photos matching the design's data.jsx sample listings
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1440&q=80&auto=format&fit=crop";

const NEIGHBORHOODS = [
  {
    name: "Banani",
    count: "412 flats",
    tint: "#FFD9A8",
    photo: "1502672260266-1c1ef2d93688",
    big: true,
  },
  {
    name: "Gulshan",
    count: "328 flats",
    tint: "#C4B5A0",
    photo: "1554995207-c18c203602cb",
    big: false,
  },
  {
    name: "Dhanmondi",
    count: "496 flats",
    tint: "#B8D4C8",
    photo: "1493809842364-78817add7ffb",
    big: false,
  },
] as const;

const TRUST_SIGNALS = [
  { icon: "🛡", label: "Verified owners only" },
  { icon: "💬", label: "Direct messaging" },
  { icon: "🚫", label: "No broker fees" },
  { icon: "📸", label: "50,000+ real photos" },
  { icon: "⭐", label: "4.8 / 5 from 12k renters" },
] as const;

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Search & filter",
    body: "Browse verified flats by neighbourhood, price, and type. Save the ones you like.",
  },
  {
    n: "02",
    title: "Chat with owners",
    body: "Skip the broker. Message owners directly to schedule a visit or ask questions.",
  },
  {
    n: "03",
    title: "Move in",
    body: "Finalise the lease, pay the deposit through FlatNest, and pick up the keys.",
  },
] as const;

export default async function HomePage() {
  const [listingTypes, amenities] = await Promise.all([
    fetchListingTypes(),
    fetchAmenities(),
  ]);

  return (
    <>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 640 }}>
        {/* Photo background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_PHOTO}')` }}
        />
        {/* Gradient overlay — matches design exactly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,20,30,0.10) 0%, rgba(15,20,30,0.55) 70%, rgba(15,20,30,0.75) 100%)",
          }}
        />
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.18'/></svg>")`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Floating search pill — desktop only, top-center */}
        <div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2"
          style={{ top: 96 }}
        >
          <a
            href="#listings"
            className="flex items-center rounded-full bg-white cursor-pointer"
            style={{
              padding: "6px 6px 6px 28px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
              minWidth: 720,
              textDecoration: "none",
            }}
          >
            <div
              className="flex flex-col flex-[1.4]"
              style={{
                padding: "6px 20px 6px 0",
                borderRight: "1px solid #EFF1F4",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1C1C1E",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                }}
              >
                Where
              </span>
              <span style={{ fontSize: 14, color: "#5B5B62", marginTop: 2 }}>
                Banani · Gulshan · Dhanmondi
              </span>
            </div>
            <div
              className="flex flex-col flex-1"
              style={{
                padding: "6px 24px",
                borderRight: "1px solid #EFF1F4",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1C1C1E",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                }}
              >
                Move in
              </span>
              <span style={{ fontSize: 14, color: "#5B5B62", marginTop: 2 }}>
                Any time
              </span>
            </div>
            <div
              className="flex flex-col flex-1"
              style={{ padding: "6px 24px" }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1C1C1E",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                }}
              >
                Budget
              </span>
              <span style={{ fontSize: 14, color: "#5B5B62", marginTop: 2 }}>
                Up to ৳40,000
              </span>
            </div>
            <div
              className="flex items-center gap-2 shrink-0"
              style={{
                height: 52,
                padding: "0 24px",
                borderRadius: 999,
                background: "#1A6B72",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              Search
            </div>
          </a>
        </div>

        {/* Hero copy — anchored to bottom-left, CTA column at bottom-right */}
        <div
          className="absolute flex flex-col md:flex-row md:items-end md:justify-between gap-10 text-white"
          style={{ left: 40, right: 40, bottom: 56 }}
        >
          <div style={{ maxWidth: 720 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Dhaka · 2,400+ verified flats
            </p>
            <h1
              className="text-[52px] md:text-[72px] lg:text-[84px]"
              style={{
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-2.5px",
                margin: "14px 0 0",
                textWrap: "balance",
              }}
            >
              The home you
              <br />
              actually want.
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                marginTop: 18,
                opacity: 0.9,
                maxWidth: 540,
              }}
            >
              Find or list flats across the city — without brokers, hidden
              fees, or guesswork. Real photos, verified owners, instant chat.
            </p>
          </div>

          <div
            className="flex flex-col gap-3 w-full md:w-auto"
            style={{ minWidth: 280 }}
          >
            <a
              href="#listings"
              className="flex items-center justify-center"
              style={{
                height: 52,
                borderRadius: 999,
                background: "#1A6B72",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Find a flat →
            </a>
            <Link
              href="/register"
              className="flex items-center justify-center"
              style={{
                height: 52,
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.30)",
                textDecoration: "none",
              }}
            >
              List your flat
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid #EFF1F4",
          background: "#FFFFFF",
          padding: "20px 40px",
        }}
      >
        <div
          className="flex flex-wrap justify-between items-center gap-4"
          style={{ fontSize: 13, color: "#5B5B62" }}
        >
          {TRUST_SIGNALS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED LISTINGS ─────────────────────────────────── */}
      <section id="listings" style={{ padding: "72px 40px" }}>
        <div
          className="flex justify-between items-end"
          style={{ marginBottom: 28 }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1A6B72",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 8,
              }}
            >
              Hand-picked
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1C1C1E",
                letterSpacing: "-0.8px",
                margin: 0,
              }}
            >
              Featured this week in Dhaka
            </h2>
          </div>
        </div>

        <Suspense fallback={<ListingCardSkeleton count={8} />}>
          <HomeClient listingTypes={listingTypes} amenities={amenities} />
        </Suspense>
      </section>

      {/* ── NEIGHBOURHOOD STRIP ───────────────────────────────── */}
      <section style={{ padding: "24px 40px 80px" }}>
        <div
          className="flex justify-between items-end"
          style={{ marginBottom: 28 }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1A6B72",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 8,
              }}
            >
              Explore
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1C1C1E",
                letterSpacing: "-0.8px",
                margin: 0,
              }}
            >
              By neighbourhood
            </h2>
          </div>
        </div>

        {/* Photo grid — 2fr 1fr 1fr matching design */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 16,
            height: 360,
          }}
        >
          {NEIGHBORHOODS.map((n) => (
            <div
              key={n.name}
              className="relative overflow-hidden cursor-pointer"
              style={{
                borderRadius: 18,
                backgroundImage: `url('https://images.unsplash.com/photo-${n.photo}?w=720&q=80&auto=format&fit=crop')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: n.tint,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.60) 100%)",
                }}
              />
              <div
                className="absolute text-white"
                style={{ bottom: 24, left: 24 }}
              >
                <div
                  style={{
                    fontSize: n.big ? 38 : 24,
                    fontWeight: 700,
                    letterSpacing: "-0.8px",
                  }}
                >
                  {n.name}
                </div>
                <div style={{ fontSize: 14, opacity: 0.85, marginTop: 2 }}>
                  {n.count}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-4 md:hidden">
          {NEIGHBORHOODS.map((n) => (
            <div
              key={n.name}
              className="relative overflow-hidden cursor-pointer"
              style={{
                borderRadius: 18,
                height: 180,
                backgroundImage: `url('https://images.unsplash.com/photo-${n.photo}?w=720&q=80&auto=format&fit=crop')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: n.tint,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%)",
                }}
              />
              <div
                className="absolute text-white"
                style={{ bottom: 20, left: 20 }}
              >
                <div style={{ fontSize: 26, fontWeight: 700 }}>{n.name}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{n.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ background: "#F2F0EC", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1A6B72",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 8,
              }}
            >
              How it works
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1C1C1E",
                letterSpacing: "-0.8px",
                margin: 0,
              }}
            >
              Three steps from search to keys
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 36 }}>
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1A6B72",
                    letterSpacing: "0.6px",
                    marginBottom: 18,
                  }}
                >
                  {s.n}
                </p>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#1C1C1E",
                    letterSpacing: "-0.4px",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "#5B5B62",
                    lineHeight: 1.6,
                    maxWidth: 320,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OWNER CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "88px 40px" }}>
        <div
          className="relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-10"
          style={{
            background: "#1C1C1E",
            borderRadius: 24,
            padding: "64px 56px",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: 200,
              background:
                "radial-gradient(circle, rgba(26,107,114,0.40), transparent 70%)",
            }}
          />

          <div className="relative" style={{ maxWidth: 600 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1A6B72",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              For owners
            </p>
            <h2
              className="text-white"
              style={{
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: "-1.2px",
                lineHeight: 1.05,
                marginTop: 14,
              }}
            >
              Reach 12,000+ verified renters this week.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.70)",
                marginTop: 16,
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              List your flat in under 3 minutes. We verify renters, you choose
              who to message. No commission, ever.
            </p>
          </div>

          <Link
            href="/register"
            className="relative shrink-0 flex items-center justify-center"
            style={{
              height: 52,
              padding: "0 28px",
              borderRadius: 999,
              background: "#1A6B72",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            List your flat →
          </Link>
        </div>
      </section>

      <Footer />
      <AuthModal />
    </>
  );
}
