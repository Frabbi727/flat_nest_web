import type { Listing } from "@/types/api";
import type { ListingFilters, NearbyFilters } from "@/types/filters";

export interface IListingService {
  getListings(filters?: ListingFilters): Promise<Listing[]>;
  getListingById(id: string): Promise<Listing>;
  getNearbyListings(params: NearbyFilters): Promise<Listing[]>;
}
