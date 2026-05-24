"use client";

import { Heart } from "lucide-react";
import ListingCard from "@/components/listing/ListingCard";
import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";
import { useWishlistVM } from "@/viewmodels/useWishlistVM";

export default function WishlistPage() {
  const { savedListings, isLoading, error, isSaved } = useWishlistVM();

  return (
    <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">Saved Listings</h1>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      {isLoading ? (
        <ListingCardSkeleton count={4} />
      ) : savedListings.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No saved listings yet.</p>
          <p className="text-sm mt-1">Tap the heart on any listing to save it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} saved={isSaved(listing.id)} />
          ))}
        </div>
      )}
    </main>
  );
}
