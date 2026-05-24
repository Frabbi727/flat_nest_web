import type { Listing } from "@/types/api";

export interface IWishlistService {
  getWishlist(): Promise<Listing[]>;
  toggleWishlist(listingId: string): Promise<{ saved: boolean }>;
}
