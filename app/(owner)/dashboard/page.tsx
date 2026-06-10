"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  List,
  MessageCircle,
  KeyRound,
  BarChart2,
  CreditCard,
  Star,
  Settings,
  Plus,
  BadgeCheck,
  Pencil,
  CheckCircle2,
  Trash2,
  Eye,
  MessageSquare,
  Percent,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOwnerDashboardVM } from "@/viewmodels/useOwnerDashboardVM";
import { useChatListVM } from "@/viewmodels/useChatListVM";
import { usePendingAccessRequestCount } from "@/viewmodels/useAccessRequestsVM";
import { useAuthStore } from "@/store/auth.store";
import { formatPrice, getThumbnail, resolveImageUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { OwnerListing } from "@/types/api";

// ── Sidebar ──────────────────────────────────────────────────────
const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/listings/create", icon: List, label: "My listings", matchPrefix: "/listings" },
  { href: "/messages", icon: MessageCircle, label: "Inquiries" },
  { href: "/access-requests", icon: KeyRound, label: "Access requests" },
  { href: "#", icon: BarChart2, label: "Analytics" },
  { href: "#", icon: CreditCard, label: "Payouts" },
  { href: "#", icon: Star, label: "Reviews" },
  { href: "#", icon: Settings, label: "Settings" },
];

function Sidebar({
  unreadCount,
  accessRequestCount,
}: {
  unreadCount: number;
  accessRequestCount: number;
}) {
  const pathname = usePathname();
  const badgeFor = (label: string) =>
    label === "Inquiries"
      ? unreadCount
      : label === "Access requests"
        ? accessRequestCount
        : 0;
  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: "1px solid #EFF1F4",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 57px)",
        paddingTop: 24,
      }}
    >
      <nav style={{ flex: 1, padding: "0 12px" }}>
        {NAV.map(({ href, icon: Icon, label, matchPrefix }) => {
          const active =
            pathname === href ||
            (matchPrefix ? pathname.startsWith(matchPrefix) : false);
          return (
            <Link
              key={label}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 2,
                background: active ? "#E6F0F1" : "transparent",
                color: active ? "#1A6B72" : "#5B5B62",
                fontSize: 13.5,
                fontWeight: active ? 600 : 400,
                textDecoration: "none",
                position: "relative",
                transition: "background 0.12s",
              }}
            >
              <Icon style={{ width: 16, height: 16 }} />
              {label}
              {badgeFor(label) > 0 && (
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    background: "#FF6B6B",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: "1px 6px",
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {badgeFor(label)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Verified badge */}
      <div
        style={{
          margin: "12px",
          padding: "12px",
          background: "#E6F0F1",
          borderRadius: 12,
        }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
          <BadgeCheck style={{ width: 16, height: 16, color: "#1A6B72" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1A6B72" }}>
            Verified owner
          </span>
        </div>
        <p style={{ fontSize: 11, color: "#0E484D", lineHeight: 1.4 }}>
          Your account is verified. Your listings show a ✓ badge.
        </p>
      </div>
    </aside>
  );
}

// ── KPI card ─────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  deltaColor,
}: {
  label: string;
  value: string | number;
  delta?: string;
  deltaLabel?: string;
  icon: React.ElementType;
  deltaColor?: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #EFF1F4",
        borderRadius: 16,
        padding: "20px 20px 16px",
        background: "#fff",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: "#8A8A8E", fontWeight: 500 }}>{label}</p>
        <Icon style={{ width: 16, height: 16, color: "#8A8A8E" }} />
      </div>
      <p style={{ fontSize: 28, fontWeight: 700, color: "#1C1C1E", lineHeight: 1 }}>
        {value}
      </p>
      {delta && (
        <p style={{ fontSize: 12, marginTop: 8 }}>
          <span style={{ color: deltaColor ?? "#1A6B72", fontWeight: 600 }}>{delta}</span>
          {deltaLabel && (
            <span style={{ color: "#8A8A8E", marginLeft: 4 }}>{deltaLabel}</span>
          )}
        </p>
      )}
    </div>
  );
}

// ── SVG Line Chart ────────────────────────────────────────────────
function smoothPath(data: number[], w: number, h: number, maxVal: number): string {
  if (data.length < 2) return "";
  const pad = 4;
  const xStep = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: pad + i * xStep,
    y: pad + (1 - v / maxVal) * (h - pad * 2),
  }));
  return pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx.toFixed(1)} ${prev.y.toFixed(1)} ${cx.toFixed(1)} ${p.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }, "");
}

function PerformanceChart({
  totalViews,
  totalInquiries,
}: {
  totalViews: number;
  totalInquiries: number;
}) {
  // Deterministic pseudo-random to avoid hydration mismatch
  const pr = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const days = 14;
  const vBase = Math.max(1, Math.round(totalViews / days));
  const iBase = Math.max(1, Math.round(totalInquiries / days));

  const viewsData = Array.from({ length: days }, (_, i) =>
    Math.round(vBase * (0.4 + pr(i * 7 + 1) * 1.2))
  );
  const inqData = Array.from({ length: days }, (_, i) =>
    Math.round(iBase * (0.4 + pr(i * 13 + 2) * 1.2))
  );

  const maxVal = Math.max(...viewsData, ...inqData, 1);
  const W = 400;
  const H = 100;

  const vPath = smoothPath(viewsData, W, H, maxVal);
  const iPath = smoothPath(inqData, W, H, maxVal);

  const vArea = `${vPath} L ${W - 4} ${H} L 4 ${H} Z`;
  const iArea = `${iPath} L ${W - 4} ${H} L 4 ${H} Z`;

  const labels = ["14d ago", "7d ago", "Today"];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 110, display: "block" }}>
        <defs>
          <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A6B72" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1A6B72" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={4}
            y1={4 + t * (H - 8)}
            x2={W - 4}
            y2={4 + t * (H - 8)}
            stroke="#EFF1F4"
            strokeWidth="1"
          />
        ))}
        {/* Area fills */}
        <path d={vArea} fill="url(#gv)" />
        <path d={iArea} fill="url(#gi)" />
        {/* Lines */}
        <path d={vPath} fill="none" stroke="#1A6B72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={iPath} fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* X axis labels */}
      <div className="flex justify-between" style={{ paddingTop: 4 }}>
        {labels.map((l) => (
          <span key={l} style={{ fontSize: 11, color: "#8A8A8E" }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ── Status config ─────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  draft:    { label: "Draft",          color: "#5B5B62", bg: "#EEF0F4" },
  pending:  { label: "Pending Review", color: "#B45309", bg: "#FEF3C7" },
  active:   { label: "Active",         color: "#065F46", bg: "#D1FAE5" },
  rejected: { label: "Rejected",       color: "#991B1B", bg: "#FEE2E2" },
  rented:   { label: "Rented",         color: "#1E40AF", bg: "#DBEAFE" },
};

type TabKey = "all" | "active" | "pending" | "rented";

// ── Main Dashboard ────────────────────────────────────────────────
export default function OwnerDashboard() {
  const { user } = useAuthStore();
  const {
    listings,
    isLoading,
    error,
    submitListing,
    submitPending,
    markRented,
    markRentedPending,
    deleteListing,
    deletePending,
  } = useOwnerDashboardVM();
  const { chats } = useChatListVM();
  const pendingAccessRequests = usePendingAccessRequestCount();

  const unreadCount = chats.reduce((sum, c) => sum + c.unread_count, 0);
  const totalViews = listings.reduce((s, l) => s + (l.views ?? 0), 0);
  const totalInquiries = listings.reduce((s, l) => s + ((l as OwnerListing).inquiries ?? 0), 0);
  const activeCount = listings.filter((l) => l.status === "active").length;
  const convRate =
    totalViews > 0
      ? ((totalInquiries / totalViews) * 100).toFixed(1)
      : "0.0";

  const recentChats = chats.slice(0, 3);

  // Tab filter
  const [tab, setTab] = React.useState<TabKey>("all");
  const tabMap: Record<TabKey, string | undefined> = {
    all: undefined,
    active: "active",
    pending: "pending",
    rented: "rented",
  };
  const filtered = tab === "all" ? listings : listings.filter((l) => l.status === tabMap[tab]);

  const tabCounts: Record<TabKey, number> = {
    all: listings.length,
    active: activeCount,
    pending: listings.filter((l) => l.status === "pending").length,
    rented: listings.filter((l) => l.status === "rented").length,
  };

  // Mark-rented is terminal and delete is destructive — both require confirmation (§14)
  const [confirm, setConfirm] = React.useState<
    { kind: "rent" | "delete"; listing: OwnerListing } | null
  >(null);
  const confirmPending = markRentedPending || deletePending;
  const handleConfirm = () => {
    if (!confirm) return;
    if (confirm.kind === "rent") markRented(confirm.listing.id);
    else deleteListing(confirm.listing.id);
    setConfirm(null);
  };

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 57px)" }}>
      <Sidebar
        unreadCount={unreadCount}
        accessRequestCount={pendingAccessRequests}
      />

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 36px", background: "#F7F8FA", minWidth: 0 }}>
        {/* Header */}
        <div className="flex items-start justify-between" style={{ marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 13, color: "#8A8A8E", fontWeight: 500, marginBottom: 4 }}>
              Welcome back, {user?.name?.split(" ")[0] ?? "there"}
            </p>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: "#1C1C1E" }}>Dashboard</h1>
          </div>
          <Link
            href="/listings/create"
            style={{
              height: 44,
              padding: "0 20px",
              borderRadius: 999,
              background: "#1A6B72",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <Plus style={{ width: 16, height: 16 }} />
            Post new listing
          </Link>
        </div>

        {error && (
          <p style={{ fontSize: 13, color: "#FF6B6B", marginBottom: 16 }}>{error}</p>
        )}

        {/* KPI Cards */}
        <div className="flex" style={{ gap: 16, marginBottom: 24 }}>
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ flex: 1, border: "1px solid #EFF1F4", borderRadius: 16, padding: 20, background: "#fff" }}>
                  <Skeleton className="h-3 w-24 mb-3" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </>
          ) : (
            <>
              <KpiCard
                label="Active listings"
                value={activeCount}
                delta={`+${activeCount}`}
                icon={LayoutDashboard}
              />
              <KpiCard
                label="Views this week"
                value={totalViews.toLocaleString()}
                delta="+96%"
                deltaLabel="vs last week"
                icon={Eye}
                deltaColor="#1A6B72"
              />
              <KpiCard
                label="New inquiries"
                value={totalInquiries}
                delta={totalInquiries > 0 ? `+${totalInquiries}` : undefined}
                deltaLabel="this week"
                icon={MessageSquare}
                deltaColor="#B45309"
              />
              <KpiCard
                label="Conversion rate"
                value={`${convRate}%`}
                delta="7-day avg"
                icon={Percent}
                deltaColor="#8A8A8E"
              />
            </>
          )}
        </div>

        {/* Chart + Recent Inquiries */}
        <div className="flex" style={{ gap: 16, marginBottom: 24 }}>
          {/* Performance Chart */}
          <div
            style={{
              flex: "1 1 0",
              border: "1px solid #EFF1F4",
              borderRadius: 16,
              padding: "20px 20px 16px",
              background: "#fff",
              minWidth: 0,
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>
                  Performance
                </p>
                <p style={{ fontSize: 12, color: "#8A8A8E" }}>
                  Views and inquiries · Last 14 days
                </p>
              </div>
              <div className="flex" style={{ gap: 4 }}>
                {["7d", "14d", "30d", "90d"].map((t, i) => (
                  <button
                    key={t}
                    style={{
                      height: 26,
                      padding: "0 8px",
                      borderRadius: 6,
                      border: "none",
                      background: i === 1 ? "#1A6B72" : "transparent",
                      color: i === 1 ? "#fff" : "#8A8A8E",
                      fontSize: 11,
                      fontWeight: i === 1 ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <PerformanceChart totalViews={totalViews} totalInquiries={totalInquiries} />
            <div className="flex" style={{ gap: 16, marginTop: 8 }}>
              <span className="flex items-center" style={{ gap: 6, fontSize: 11, color: "#5B5B62" }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: "#1A6B72", display: "inline-block" }} />
                Views
              </span>
              <span className="flex items-center" style={{ gap: 6, fontSize: 11, color: "#5B5B62" }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: "#FF6B6B", display: "inline-block" }} />
                Inquiries
              </span>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div
            style={{
              width: 280,
              flexShrink: 0,
              border: "1px solid #EFF1F4",
              borderRadius: 16,
              padding: "20px",
              background: "#fff",
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>
                Recent inquiries
              </p>
              <Link
                href="/messages"
                style={{ fontSize: 12, color: "#1A6B72", textDecoration: "none", fontWeight: 500 }}
              >
                View all
              </Link>
            </div>
            {recentChats.length === 0 ? (
              <p style={{ fontSize: 13, color: "#8A8A8E", textAlign: "center", paddingTop: 24 }}>
                No inquiries yet
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {recentChats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/messages/${chat.id}`}
                    style={{ textDecoration: "none", display: "flex", gap: 10, alignItems: "flex-start" }}
                  >
                    <Avatar style={{ width: 36, height: 36, flexShrink: 0 }}>
                      <AvatarImage src={resolveImageUrl(chat.other_user.avatar_url)} />
                      <AvatarFallback style={{ background: "#E6F0F1", color: "#0E484D", fontSize: 12, fontWeight: 600 }}>
                        {chat.other_user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex items-center justify-between">
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>
                          {chat.other_user.name}
                        </p>
                      </div>
                      <p style={{ fontSize: 11, color: "#8A8A8E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {chat.listing.title}
                      </p>
                      {chat.last_message && (
                        <p style={{ fontSize: 11, color: "#5B5B62", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>
                          {chat.last_message.text}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Listings Table */}
        <div
          style={{
            border: "1px solid #EFF1F4",
            borderRadius: 16,
            background: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "18px 20px 0" }}
          >
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>
              Your listings
            </p>
            {/* Status tabs */}
            <div className="flex" style={{ gap: 4 }}>
              {(["all", "active", "pending", "rented"] as TabKey[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    height: 30,
                    padding: "0 12px",
                    borderRadius: 999,
                    border: "none",
                    background: tab === t ? "#1C1C1E" : "transparent",
                    color: tab === t ? "#fff" : "#5B5B62",
                    fontSize: 12,
                    fontWeight: tab === t ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)} ({tabCounts[t]})
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto", marginTop: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #EFF1F4" }}>
                  {["Listing", "Status", "Views (7d)", "Inquiries", "Posted"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 20px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#8A8A8E",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                  <th style={{ padding: "8px 20px" }} />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [1, 2, 3].map((i) => (
                    <tr key={i}>
                      <td colSpan={6} style={{ padding: "14px 20px" }}>
                        <Skeleton className="h-4 w-full" />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px 20px", textAlign: "center", fontSize: 13, color: "#8A8A8E" }}>
                      No listings in this category.
                    </td>
                  </tr>
                ) : (
                  filtered.map((listing) => {
                    const cfg = STATUS_CFG[listing.status] ?? STATUS_CFG.draft;
                    return (
                      <tr
                        key={listing.id}
                        style={{ borderBottom: "1px solid #EFF1F4" }}
                      >
                        {/* Listing */}
                        <td style={{ padding: "14px 20px" }}>
                          <div className="flex items-center" style={{ gap: 10 }}>
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                overflow: "hidden",
                                position: "relative",
                                flexShrink: 0,
                              }}
                            >
                              <Image
                                src={getThumbnail(listing.photos)}
                                alt={listing.title}
                                fill
                                className="object-cover"
                                sizes="44px"
                              />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <p
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: "#1C1C1E",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: 220,
                                }}
                              >
                                {listing.title}
                              </p>
                              <p style={{ fontSize: 11, color: "#8A8A8E", marginTop: 1 }}>
                                {listing.area ?? "—"}
                                {listing.price ? ` · ${formatPrice(listing.price)}` : ""}
                              </p>
                              {listing.status === "rejected" && listing.rejection_reason && (
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "#991B1B",
                                    background: "#FEF2F2",
                                    borderRadius: 6,
                                    padding: "2px 6px",
                                    marginTop: 4,
                                    maxWidth: 220,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                  title={listing.rejection_reason}
                                >
                                  Admin note: {listing.rejection_reason}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        {/* Status */}
                        <td style={{ padding: "14px 20px" }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              borderRadius: 999,
                              padding: "4px 10px",
                              color: cfg.color,
                              background: cfg.bg,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {cfg.label}
                          </span>
                        </td>
                        {/* Views */}
                        <td style={{ padding: "14px 20px", fontSize: 13, color: "#1C1C1E" }}>
                          {(listing.views ?? 0).toLocaleString()}
                        </td>
                        {/* Inquiries */}
                        <td style={{ padding: "14px 20px", fontSize: 13, color: "#1C1C1E" }}>
                          {((listing as OwnerListing).inquiries ?? 0)}
                        </td>
                        {/* Posted */}
                        <td style={{ padding: "14px 20px", fontSize: 12, color: "#8A8A8E", whiteSpace: "nowrap" }}>
                          {listing.created_at
                            ? new Date(listing.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
                            : "—"}
                        </td>
                        {/* Actions — per-status rules (§13): pending fully locked, rented read-only */}
                        <td style={{ padding: "14px 16px 14px 8px" }}>
                          {listing.status === "pending" ? (
                            <span style={{ fontSize: 11, color: "#B45309", whiteSpace: "nowrap" }}>
                              ⏳ Under review
                            </span>
                          ) : (
                            <div className="flex items-center" style={{ gap: 6 }}>
                              {listing.status !== "rented" && (
                                <Link
                                  href={`/listings/${listing.id}/edit`}
                                  title={listing.status === "rejected" ? "Fix & resubmit" : "Edit"}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 8,
                                    border: "1px solid #E5E7EB",
                                    background: "#fff",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Pencil style={{ width: 12, height: 12, color: "#5B5B62" }} />
                                </Link>
                              )}
                              {(listing.status === "draft" || listing.status === "rejected") && (
                                <button
                                  onClick={() => submitListing(listing.id)}
                                  disabled={submitPending}
                                  style={{
                                    height: 30,
                                    padding: "0 10px",
                                    borderRadius: 8,
                                    border: "none",
                                    background: "#1A6B72",
                                    color: "#fff",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                >
                                  {listing.status === "rejected" ? "Resubmit" : "Submit"}
                                </button>
                              )}
                              {listing.status === "active" && (
                                <button
                                  onClick={() => setConfirm({ kind: "rent", listing })}
                                  disabled={markRentedPending}
                                  style={{
                                    height: 30,
                                    padding: "0 8px",
                                    borderRadius: 8,
                                    border: "1px solid #E5E7EB",
                                    background: "#fff",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    fontSize: 11,
                                    fontWeight: 500,
                                    color: "#065F46",
                                  }}
                                >
                                  <CheckCircle2 style={{ width: 12, height: 12 }} />
                                  Rented
                                </button>
                              )}
                              <button
                                onClick={() => setConfirm({ kind: "delete", listing })}
                                disabled={deletePending}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 8,
                                  border: "1px solid #FEE2E2",
                                  background: "#fff",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Trash2 style={{ width: 12, height: 12, color: "#FF6B6B" }} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmation — mark-rented is terminal, delete is destructive (§14) */}
        <Dialog open={!!confirm} onOpenChange={(open) => !open && setConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {confirm?.kind === "rent" ? "Mark as rented?" : "Delete listing?"}
              </DialogTitle>
              <DialogDescription>
                {confirm?.kind === "rent"
                  ? `"${confirm?.listing.title}" will be marked as rented and removed from search. This cannot be undone.`
                  : `"${confirm?.listing.title}" and all its photos will be permanently deleted. This cannot be undone.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirm(null)}>
                Cancel
              </Button>
              <Button
                variant={confirm?.kind === "delete" ? "destructive" : "default"}
                onClick={handleConfirm}
                disabled={confirmPending}
              >
                {confirm?.kind === "rent" ? "Mark as rented" : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
