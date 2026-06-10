import type { Listing } from "@/types/api";

export interface IWishlistService {
  getWishlistIds(): Promise<string[]>;
  getWishlistListings(ids: string[]): Promise<Listing[]>;
  toggleWishlist(listingId: string): Promise<{ saved: boolean }>;
}
