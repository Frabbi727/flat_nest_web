"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ListingCard from "@/components/listing/ListingCard";
import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";
import FilterSheet from "@/components/listing/FilterSheet";
import PromoBanner from "@/components/banner/PromoBanner";
import { useListingsVM } from "@/viewmodels/useListingsVM";
import type { ListingType, Amenity, GeoItem, ListingFacing } from "@/types/api";

interface Props {
  listingTypes: ListingType[];
  amenities: Amenity[];
  facings?: ListingFacing[];
  divisions?: GeoItem[];
}

export default function HomeClient({
  listingTypes,
  amenities,
  facings,
  divisions,
}: Props) {
  const {
    listings,
    isLoading,
    error,
    searchQuery,
    activeTypeId,
    filters,
    setSearch,
    setTypeFilter,
    applyFilters,
  } = useListingsVM(listingTypes, amenities);

  // Sheet-managed filters only — search & type chips live outside the sheet
  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  return (
    <div>
      {/* Filter strip — matches design's Browse filter bar */}
      <div
        className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none mb-8"
        style={{ marginBottom: 24 }}
      >
        {/* Chips — All + listing types */}
        <Chip active={!activeTypeId} onClick={() => setTypeFilter(undefined)}>
          All
        </Chip>
        {listingTypes.map((t) => (
          <Chip
            key={t.id}
            active={activeTypeId === t.id}
            onClick={() => setTypeFilter(t.id)}
          >
            {t.label}
          </Chip>
        ))}

        {/* Spacer pushes filter button right */}
        <div className="flex-1" />

        {/* Filter button */}
        <FilterSheet
          filters={filters}
          amenities={amenities}
          facings={facings}
          divisions={divisions}
          onApply={applyFilters}
        >
          <button
            className="flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            style={{
              height: 36,
              padding: "0 14px",
              borderRadius: 999,
              background: "transparent",
              border: "1px solid #E5E7EB",
              fontSize: 13,
              fontWeight: 500,
              color: "#1C1C1E",
              cursor: "pointer",
            }}
            aria-label="Open filters"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span
                style={{
                  minWidth: 18,
                  height: 18,
                  padding: "0 5px",
                  borderRadius: 999,
                  background: "#1C1C1E",
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </FilterSheet>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          style={{ width: 16, height: 16 }}
        />
        <Input
          className="pl-11 rounded-full bg-white border-border"
          style={{ height: 44 }}
          placeholder="Search by area or title…"
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Promo banner — inline widget below search/filters; the dialog
          variant (logged-in users) is portaled from the same component */}
      <PromoBanner />

      {/* Error */}
      {error && (
        <p className="text-center text-destructive text-sm py-8">{error}</p>
      )}

      {/* Listing result count */}
      {!isLoading && listings.length > 0 && (
        <p
          className="mb-4"
          style={{ fontSize: 14, color: "#5B5B62" }}
        >
          {listings.length} {listings.length === 1 ? "flat" : "flats"} in Dhaka
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <ListingCardSkeleton count={8} />
      ) : listings.length === 0 ? (
        <p
          className="text-center py-16"
          style={{ fontSize: 14, color: "#8A8A8E" }}
        >
          No listings found. Try adjusting your filters.
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: 24 }}
        >
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Internal chip component matching design's FNWChip exactly ──
function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 36,
        padding: "0 14px",
        borderRadius: 999,
        background: active ? "#1C1C1E" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#1C1C1E",
        border: `1px solid ${active ? "#1C1C1E" : "#E5E7EB"}`,
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: "nowrap",
        cursor: "pointer",
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
    </button>
  );
}
