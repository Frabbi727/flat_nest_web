"use client";

import Image from "next/image";
import { Phone, MessageCircle, Heart, Bed, Bath, Maximize2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useListingDetailVM } from "@/viewmodels/useListingDetailVM";
import { resolveImageUrl, formatPrice, formatDate, cn } from "@/lib/utils";

export default function ListingDetailView({ listingId }: { listingId: string }) {
  const {
    listing,
    isLoading,
    error,
    isSaved,
    isOwnListing,
    toggleSave,
    toggleSavePending,
    startChat,
    startChatPending,
  } = useListingDetailVM(listingId);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto pb-24">
        <Skeleton className="h-64 w-full" />
        <div className="px-4 py-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-muted-foreground">Listing not found.</p>
      </div>
    );
  }

  const coverPhoto =
    listing.photos.length > 0
      ? resolveImageUrl(listing.photos[0].url)
      : "/placeholder-listing.jpg";

  return (
    <div className="max-w-2xl mx-auto pb-28">
      <div className="relative h-64 bg-muted">
        <Image
          src={coverPhoto}
          alt={listing.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 672px) 100vw, 672px"
        />
        <button
          onClick={() => toggleSave()}
          disabled={toggleSavePending}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
        >
          <Heart
            className={cn(
              "w-5 h-5",
              isSaved ? "fill-red-500 text-red-500" : "text-gray-400"
            )}
          />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">{listing.title}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{listing.area}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-primary font-bold text-lg">
              {formatPrice(listing.price)}
            </p>
            <p className="text-xs text-muted-foreground">/month</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {listing.beds !== null && (
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" /> {listing.beds} Beds
            </span>
          )}
          {listing.baths !== null && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" /> {listing.baths} Baths
            </span>
          )}
          {listing.size !== null && (
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4" /> {listing.size} sqft
            </span>
          )}
          {listing.floor_no !== null && (
            <span className="flex items-center gap-1.5">
              Floor {listing.floor_no}
            </span>
          )}
        </div>

        {listing.available_from !== null ? (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Available from {formatDate(listing.available_from)}
          </div>
        ) : (
          <Badge
            variant="outline"
            className="text-green-600 border-green-300 w-fit"
          >
            Available Now
          </Badge>
        )}

        {listing.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((a) => (
              <Badge key={a.id} variant="secondary">
                {a.label}
              </Badge>
            ))}
          </div>
        )}

        {listing.description && (
          <p className="text-sm text-foreground leading-relaxed">
            {listing.description}
          </p>
        )}

        {listing.deposit && (
          <div className="rounded-lg border p-3 text-sm">
            <span className="text-muted-foreground">Security deposit: </span>
            <span className="font-medium">{formatPrice(listing.deposit)}</span>
          </div>
        )}

        {listing.owner && !isOwnListing && (
          <div className="rounded-xl border p-3">
            <p className="font-semibold text-sm mb-1">Contact Owner</p>
            <p className="text-sm">{listing.owner_name ?? listing.owner.name}</p>
            {listing.owner_phone && (
              <p className="text-sm text-muted-foreground">{listing.owner_phone}</p>
            )}
          </div>
        )}
      </div>

      {!isOwnListing && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-3 flex gap-3 max-w-2xl mx-auto">
          {listing.owner_phone && (
            <a
              href={`tel:${listing.owner_phone}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 justify-center"
              )}
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </a>
          )}
          <Button
            className="flex-1"
            onClick={() => startChat()}
            disabled={startChatPending}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            {startChatPending ? "Opening…" : "Chat"}
          </Button>
        </div>
      )}
    </div>
  );
}
