import api from "@/lib/axios";
import type { IWishlistService } from "@/services/interfaces/IWishlistService";
import type { Listing } from "@/types/api";

export class WishlistService implements IWishlistService {
  async getWishlist(): Promise<Listing[]> {
    const { data } = await api.get("/wishlist");
    return data.data;
  }

  async toggleWishlist(listingId: string): Promise<{ saved: boolean }> {
    const { data } = await api.post(`/wishlist/${listingId}/toggle`);
    return data.data;
  }
}

export const wishlistService: IWishlistService = new WishlistService();
