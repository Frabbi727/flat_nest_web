"use client";

import { useAuthVM } from "@/viewmodels/useAuthVM";
import { Button } from "@/components/ui/button";
import { Building2, Search } from "lucide-react";

export default function RegisterRolePage() {
  const { registerStep2, registerStep2Pending } = useAuthVM();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold">Who are you?</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Choose your role on FlatNest
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => registerStep2("owner")}
            disabled={registerStep2Pending}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
          >
            <Building2 className="w-10 h-10 text-primary" />
            <div>
              <p className="font-semibold">I&apos;m an Owner</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Post &amp; manage listings
              </p>
            </div>
          </button>
          <button
            onClick={() => registerStep2("renter")}
            disabled={registerStep2Pending}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
          >
            <Search className="w-10 h-10 text-primary" />
            <div>
              <p className="font-semibold">I&apos;m a Renter</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Browse &amp; find homes
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
