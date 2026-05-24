"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ListingCard from "@/components/listing/ListingCard";
import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";
import FilterSheet from "@/components/listing/FilterSheet";
import { useListingsVM } from "@/viewmodels/useListingsVM";
import type { ListingType, Amenity } from "@/types/api";

interface Props {
  listingTypes: ListingType[];
  amenities: Amenity[];
}

export default function HomeClient({ listingTypes, amenities }: Props) {
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

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search area or title…"
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Badge
          variant={!activeTypeId ? "default" : "outline"}
          className="cursor-pointer whitespace-nowrap shrink-0"
          onClick={() => setTypeFilter(undefined)}
        >
          All
        </Badge>
        {listingTypes.map((t) => (
          <Badge
            key={t.id}
            variant={activeTypeId === t.id ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap shrink-0"
            onClick={() => setTypeFilter(t.id)}
          >
            {t.label}
          </Badge>
        ))}
        <div className="ml-auto shrink-0">
          <FilterSheet
            filters={filters}
            amenities={amenities}
            onApply={applyFilters}
          />
        </div>
      </div>

      {error && (
        <p className="text-center text-destructive text-sm py-8">{error}</p>
      )}

      {isLoading ? (
        <ListingCardSkeleton count={6} />
      ) : listings.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm py-12">
          No listings found. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
