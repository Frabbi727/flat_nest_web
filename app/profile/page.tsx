"use client";

import { User, Mail, Phone, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { resolveImageUrl } from "@/lib/utils";
import AuthGate from "@/components/auth/AuthGate";

function ProfileContent() {
  const { user, logout, logoutPending } = useAuthVM();

  if (!user) return null;

  return (
    <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={resolveImageUrl(user.avatar_url)}
            alt={user.name}
          />
          <AvatarFallback className="text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground text-sm capitalize">
            {user.role ?? "User"}
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
        )}
      </div>

      <Separator />

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => logout()}
        disabled={logoutPending}
      >
        <LogOut className="w-4 h-4 mr-2" />
        {logoutPending ? "Signing out…" : "Sign Out"}
      </Button>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <AuthGate>
      <ProfileContent />
    </AuthGate>
  );
}
