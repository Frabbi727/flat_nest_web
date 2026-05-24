import api from "@/lib/axios";
import type { IListingService } from "@/services/interfaces/IListingService";
import type { Listing } from "@/types/api";
import type { ListingFilters, NearbyFilters } from "@/types/filters";

export class ListingService implements IListingService {
  async getListings(filters?: ListingFilters): Promise<Listing[]> {
    const { data } = await api.get("/listings", { params: filters });
    return data.data;
  }

  async getListingById(id: string): Promise<Listing> {
    const { data } = await api.get(`/listings/${id}`);
    return data.data;
  }

  async getNearbyListings(params: NearbyFilters): Promise<Listing[]> {
    const { data } = await api.get("/listings/nearby", { params });
    return data.data;
  }
}

export const listingService: IListingService = new ListingService();
