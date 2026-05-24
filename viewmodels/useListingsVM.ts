"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { listingService } from "@/services/ListingService";
import { QUERY_KEYS } from "@/lib/constants";
import type { ListingFilters } from "@/types/filters";
import type { ListingType, Amenity, ListingFacing } from "@/types/api";

export function useListingsVM(
  initialTypes: ListingType[] = [],
  initialAmenities: Amenity[] = [],
  initialFacings: ListingFacing[] = []
) {
  const [filters, setFilters] = useState<ListingFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTypeId, setActiveTypeId] = useState<number | undefined>();
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const activeFilters: ListingFilters = {
    ...filters,
    search: debouncedSearch || undefined,
    listing_type_id: activeTypeId,
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (v) => v !== undefined && v !== ""
  );

  const { data: listings = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.listings(hasActiveFilters ? activeFilters : undefined),
    queryFn: () =>
      listingService.getListings(hasActiveFilters ? activeFilters : undefined),
  });

  const applyFilters = (newFilters: ListingFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    setSearchQuery("");
    setActiveTypeId(undefined);
  };

  return {
    listings,
    isLoading,
    error: error ? "Failed to load listings" : null,

    filters,
    activeTypeId,
    searchQuery,
    hasActiveFilters,

    setSearch: setSearchQuery,
    setTypeFilter: setActiveTypeId,
    applyFilters,
    resetFilters,

    listingTypes: initialTypes,
    amenities: initialAmenities,
    listingFacings: initialFacings,
  };
}
