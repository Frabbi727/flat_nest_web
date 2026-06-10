"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth.store";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { useNotificationsVM } from "@/viewmodels/useNotificationsVM";
import { resolveImageUrl } from "@/lib/utils";

// Logo SVG matches the design's FNWLogo exactly
function FlatNestLogo() {
  return (
    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path
          d="M4 16L16 5l12 11v10a3 3 0 01-3 3H7a3 3 0 01-3-3V16z"
          fill="#1A6B72"
          fillOpacity="0.14"
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
      <span style={{ fontSize: 17, fontWeight: 700, color: "#1C1C1E", letterSpacing: "-0.4px" }}>
        FlatNest
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const isOwner = user?.role === "owner";
  const { logout } = useAuthVM();
  const { unreadCount } = useNotificationsVM();
  const pathname = usePathname();
  const router = useRouter();

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontSize: 14,
    fontWeight: 500,
    color: active ? "#1C1C1E" : "#5B5B62",
    padding: "8px 14px",
    borderRadius: 999,
    cursor: "pointer",
    background: active ? "#EEF0F4" : "transparent",
    textDecoration: "none",
    display: "inline-block",
    transition: "background 0.12s",
  });

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        borderBottom: "1px solid #EFF1F4",
        background: "#FFFFFF",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 40px", gap: 24 }}
      >
        <FlatNestLogo />

        {/* Center nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 4 }}>
          {!isAuthenticated && (
            <>
              <Link href="/" style={linkStyle(pathname === "/")}>Browse</Link>
              <Link href="/#how-it-works" style={linkStyle(false)}>How it works</Link>
              <Link href="/#for-owners" style={linkStyle(false)}>For owners</Link>
              <Link href="#" style={linkStyle(false)}>Help</Link>
            </>
          )}
          {isAuthenticated && !isOwner && (
            <>
              <Link href="/" style={linkStyle(pathname === "/")}>Browse</Link>
              <Link href="/map" style={linkStyle(pathname === "/map")}>Map</Link>
              <Link href="/wishlist" style={linkStyle(pathname === "/wishlist")}>Saved</Link>
              <Link href="/messages" style={linkStyle(pathname === "/messages")}>Messages</Link>
            </>
          )}
          {isAuthenticated && isOwner && (
            <>
              <Link href="/dashboard" style={linkStyle(pathname === "/dashboard")}>Dashboard</Link>
              <Link href="/messages" style={linkStyle(pathname === "/messages")}>Messages</Link>
            </>
          )}
        </nav>

        {/* Right — auth / user */}
        <div className="flex items-center" style={{ gap: 10 }}>
          {!isAuthenticated ? (
            <>
              <Link
                href="/register"
                className="hidden md:block"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1C1C1E",
                  padding: "8px 14px",
                  borderRadius: 999,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                List your flat
              </Link>
              <Link
                href="/login"
                style={{
                  height: 36,
                  padding: "0 14px",
                  borderRadius: 999,
                  background: "transparent",
                  border: "1px solid #E5E7EB",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1C1C1E",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                style={{
                  height: 36,
                  padding: "0 14px",
                  borderRadius: 999,
                  background: "#1A6B72",
                  border: "1px solid transparent",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              {isOwner && (
                <Link
                  href="/listings/create"
                  className="hidden md:inline-flex"
                  style={{
                    height: 36,
                    padding: "0 14px",
                    borderRadius: 999,
                    background: "#1A6B72",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  + New listing
                </Link>
              )}
              <Link
                href="/notifications"
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div
                    className="flex items-center cursor-pointer"
                    style={{
                      gap: 8,
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: 999,
                      padding: "5px 6px 5px 12px",
                    }}
                  >
                    {/* Hamburger */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5B5B62"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={resolveImageUrl(user?.avatar_url)}
                        alt={user?.name ?? ""}
                      />
                      <AvatarFallback
                        style={{
                          background: "#E6F0F1",
                          color: "#0E484D",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
