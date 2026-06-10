"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import { useWishlistVM } from "@/viewmodels/useWishlistVM";
import { getThumbnail, formatPrice } from "@/lib/utils";
import type { Listing } from "@/types/api";

interface Props {
  listing: Listing;
}

// Spec §10: saved listings that left `active` status degrade visually
const DEGRADED_LABELS: Partial<Record<Listing["status"], string>> = {
  pending: "Under Review",
  rented: "Rented Out",
};

export default function ListingCard({ listing }: Props) {
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const router = useRouter();
  const { isSaved, isToggling, toggle } = useWishlistVM();

  const saved = isSaved(listing.id);
  const degradedLabel = DEGRADED_LABELS[listing.status];

  const handleCardClick = () => {
    if (!isAuthenticated) {
      openAuthModal("Sign in to view listing details and contact the owner.");
      return;
    }
    router.push(`/listings/${listing.id}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openAuthModal("Sign in to save listings to your wishlist.");
      return;
    }
    toggle(listing.id);
  };

  const specs = [
    listing.beds != null && `${listing.beds} BR`,
    listing.baths != null && `${listing.baths} Bath`,
    listing.size != null && `${listing.size} ft²`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      onClick={handleCardClick}
      className="cursor-pointer"
      aria-label={`${listing.title}${listing.area ? `, ${listing.area}` : ""}`}
    >
      {/* Photo — 4:3, border-radius 14 matching FNWListingCard */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: 14, aspectRatio: "4 / 3" }}
      >
        <Image
          src={getThumbnail(listing.photos)}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300"
          style={{
            transform: "scale(1)",
            filter: degradedLabel ? "grayscale(0.8)" : undefined,
            opacity: degradedLabel ? 0.7 : 1,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1)")
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Heart button — matches design: top:10, right:10, transparent bg */}
        <button
          onClick={handleSave}
          disabled={isToggling(listing.id)}
          className="absolute"
          style={{
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: 16,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={saved ? "#FF6B6B" : "rgba(0,0,0,0.40)"}
            stroke="#fff"
            strokeWidth="2"
          >
            <path
              d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.7 1.2 5.5 3.2C13.8 5.2 15.5 4 17.5 4 21 4 23.5 8 21.5 12c-2.5 4.5-9.5 9-9.5 9z"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Degradation badge — saved listing no longer active (spec §10) */}
        {degradedLabel && (
          <div
            className="absolute"
            style={{
              bottom: 12,
              left: 12,
              background: "rgba(28,28,30,0.85)",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2px",
              textTransform: "uppercase",
            }}
          >
            {degradedLabel}
          </div>
        )}

        {/* Type badge — top:12, left:12 */}
        {listing.type && (
          <div
            className="absolute"
            style={{
              top: 12,
              left: 12,
              background: "#fff",
              color: "#1C1C1E",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2px",
              textTransform: "uppercase",
            }}
          >
            {listing.type}
          </div>
        )}
      </div>

      {/* Details — paddingTop: 10 matching design */}
      <div style={{ paddingTop: 10 }}>
        {/* Title row */}
        <div className="flex justify-between items-baseline" style={{ gap: 8 }}>
          <p
            style={{
              fontSize: 14.5,
              fontWeight: 600,
              color: "#1C1C1E",
              letterSpacing: "-0.1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              margin: 0,
            }}
          >
            {listing.title}
          </p>
        </div>

        {/* Area */}
        {listing.area && (
          <p style={{ fontSize: 13, color: "#8A8A8E", marginTop: 2, margin: "2px 0 0" }}>
            {listing.area}
          </p>
        )}

        {/* Specs */}
        {specs && (
          <p style={{ fontSize: 13, color: "#8A8A8E", marginTop: 1, margin: "1px 0 0" }}>
            {specs}
          </p>
        )}

        {/* Price */}
        <p style={{ fontSize: 14, fontWeight: 700, color: "#1C1C1E", marginTop: 6, margin: "6px 0 0" }}>
          {formatPrice(listing.price)}
          <span style={{ color: "#5B5B62", fontWeight: 400 }}> / month</span>
        </p>
      </div>
    </article>
  );
}
