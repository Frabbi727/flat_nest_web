"use client";

import { useState } from "react";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { Building2, Search } from "lucide-react";

const ROLES = [
  {
    value: "owner" as const,
    icon: Building2,
    tag: "List my flat",
    label: "I'm an Owner",
    description: "Post property, manage inquiries, rent faster",
    badge: "Verified listings",
  },
  {
    value: "renter" as const,
    icon: Search,
    tag: "Find a flat",
    label: "I'm a Renter",
    description: "Browse listings, save favorites, message owners",
    badge: "Free",
  },
];

export default function RegisterRolePage() {
  const { registerStep2, registerStep2Pending } = useAuthVM();
  const [selected, setSelected] = useState<"owner" | "renter" | null>(null);

  const handleSelect = (role: "owner" | "renter") => {
    setSelected(role);
    registerStep2(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Step indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step 2 of 3</span>
            <span>Role</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className="h-1 flex-1 rounded-full bg-muted" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Who are you?</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Choose your role on FlatNest
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ROLES.map(({ value, icon: Icon, tag, label, description, badge }) => (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              disabled={registerStep2Pending}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 text-left transition-colors disabled:opacity-60 ${
                selected === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary hover:bg-primary/5"
              }`}
            >
              {/* Free / Verified badge */}
              <span className="absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {badge}
              </span>

              <Icon className="w-9 h-9 text-primary mt-1" />

              <div className="text-center">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  {tag}
                </p>
                <p className="font-semibold text-sm mt-0.5">{label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
