"use client";

import dynamic from "next/dynamic";

const NearbyMap = dynamic(() => import("@/components/map/NearbyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <p className="text-muted-foreground">Loading map…</p>
    </div>
  ),
});

export default function MapPage() {
  return <NearbyMap />;
}
