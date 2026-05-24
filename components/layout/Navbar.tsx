"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Map,
  Heart,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { resolveImageUrl, cn } from "@/lib/utils";

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const isOwner = user?.role === "owner";
  const { logout } = useAuthVM();
  const pathname = usePathname();
  const router = useRouter();

  const navLink = (href: string, label: string, icon: React.ReactNode) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors",
        pathname === href
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-primary">
          FlatNest
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {!isAuthenticated &&
            navLink("/", "Browse", <Home className="w-4 h-4" />)}
          {isAuthenticated && !isOwner && (
            <>
              {navLink("/", "Browse", <Home className="w-4 h-4" />)}
              {navLink("/map", "Map", <Map className="w-4 h-4" />)}
              {navLink("/wishlist", "Saved", <Heart className="w-4 h-4" />)}
              {navLink(
                "/messages",
                "Messages",
                <MessageCircle className="w-4 h-4" />
              )}
            </>
          )}
          {isAuthenticated && isOwner && (
            <>
              {navLink(
                "/dashboard",
                "Dashboard",
                <LayoutDashboard className="w-4 h-4" />
              )}
              {navLink(
                "/messages",
                "Messages",
                <MessageCircle className="w-4 h-4" />
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" })
                )}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none focus:ring-2 focus:ring-primary">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={resolveImageUrl(user?.avatar_url)}
                    alt={user?.name ?? ""}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
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
          )}
        </div>
      </div>
    </header>
  );
}
