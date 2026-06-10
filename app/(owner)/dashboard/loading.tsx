import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ border: "1px solid #EFF1F4", borderRadius: 16, padding: 16, display: "flex", gap: 12 }}>
            <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
