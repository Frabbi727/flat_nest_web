"use client";

import Link from "next/link";
import ListingCard from "@/components/listing/ListingCard";
import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";
import { useWishlistVM } from "@/viewmodels/useWishlistVM";

export default function WishlistPage() {
  const { savedListings, isLoading, error } = useWishlistVM({
    withListings: true,
  });

  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "32px 40px 80px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1C1C1E" }}>Saved</h1>
        {!isLoading && savedListings.length > 0 && (
          <p style={{ fontSize: 13, color: "#8A8A8E", marginTop: 2 }}>
            {savedListings.length} saved {savedListings.length === 1 ? "listing" : "listings"}
          </p>
        )}
      </div>

      {error && <p style={{ fontSize: 13, color: "#FF6B6B", marginBottom: 16 }}>{error}</p>}

      {isLoading ? (
        <ListingCardSkeleton count={4} />
      ) : savedListings.length === 0 ? (
        <div
          className="text-center"
          style={{
            border: "1px dashed #E5E7EB",
            borderRadius: 20,
            padding: "72px 24px",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1.5"
            style={{ margin: "0 auto 16px" }}
          >
            <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.7 1.2 5.5 3.2C13.8 5.2 15.5 4 17.5 4 21 4 23.5 8 21.5 12c-2.5 4.5-9.5 9-9.5 9z" strokeLinejoin="round" />
          </svg>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E", marginBottom: 8 }}>
            No saved listings yet
          </p>
          <p style={{ fontSize: 14, color: "#8A8A8E", marginBottom: 24 }}>
            Tap the heart on any listing to save it for later.
          </p>
          <Link
            href="/"
            style={{
              height: 44,
              padding: "0 24px",
              borderRadius: 999,
              background: "#1A6B72",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            Browse listings
          </Link>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: 24 }}
        >
          {savedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
