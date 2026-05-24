"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, CheckCircle, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useOwnerDashboardVM } from "@/viewmodels/useOwnerDashboardVM";
import { formatPrice, getThumbnail, cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  submitted: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  rented: "bg-blue-100 text-blue-700",
};

export default function OwnerDashboard() {
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

  return (
    <main className="max-w-2xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">My Listings</h1>
        <Link
          href="/listings/create"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          <Plus className="w-4 h-4 mr-1" />
          New Listing
        </Link>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl p-3 flex gap-3">
              <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No listings yet.</p>
          <Link
            href="/listings/create"
            className={cn(buttonVariants(), "mt-4")}
          >
            Create your first listing
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="border rounded-xl p-3 flex gap-3"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={getThumbnail(listing.photos)}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm line-clamp-1">
                  {listing.title}
                </p>
                <p className="text-primary text-sm font-medium">
                  {formatPrice(listing.price)}/mo
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      STATUS_STYLES[listing.status]
                    )}
                  >
                    {listing.status_label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {listing.views} views
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {listing.inquiries} inquiries
                  </span>
                </div>
                {listing.rejection_reason && (
                  <p className="text-xs text-destructive mt-1 line-clamp-2">
                    {listing.rejection_reason}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <Link
                  href={`/listings/${listing.id}/edit`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Link>
                {(listing.status === "draft" ||
                  listing.status === "rejected") && (
                  <Button
                    size="sm"
                    onClick={() => submitListing(listing.id)}
                    disabled={submitPending}
                  >
                    Submit
                  </Button>
                )}
                {listing.status === "approved" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => markRented(listing.id)}
                    disabled={markRentedPending}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Rented
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteListing(listing.id)}
                  disabled={deletePending}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
