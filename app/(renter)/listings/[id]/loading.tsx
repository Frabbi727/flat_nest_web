import { Skeleton } from "@/components/ui/skeleton";

export default function ListingDetailLoading() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 96 }}>
      <Skeleton className="h-72 w-full" />
      <div style={{ padding: "20px 16px" }} className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    </div>
  );
}
