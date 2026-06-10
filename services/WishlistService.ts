import api from "@/lib/axios";
import type { IWishlistService } from "@/services/interfaces/IWishlistService";
import type { Listing } from "@/types/api";

export class WishlistService implements IWishlistService {
  async getWishlistIds(): Promise<string[]> {
    const { data } = await api.get("/wishlist");
    // Live API returns { saved_ids: [...] } — NOT the array of full Listing
    // objects the spec (§10.1) describes. Tolerate both shapes.
    const payload = data.data;
    if (Array.isArray(payload?.saved_ids)) return payload.saved_ids.map(String);
    if (Array.isArray(payload)) {
      return payload.map((item: string | Listing) =>
        typeof item === "object" ? String(item.id) : String(item)
      );
    }
    return [];
  }

  async getWishlistListings(ids: string[]): Promise<Listing[]> {
    // No bulk endpoint exists for saved listings — fetch each by id.
    // A saved listing that is no longer visible (e.g. deleted) just drops out.
    const results = await Promise.allSettled(
      ids.map((id) =>
        api.get(`/listings/${id}`).then((r) => r.data.data as Listing)
      )
    );
    return results
      .filter((r): r is PromiseFulfilledResult<Listing> => r.status === "fulfilled")
      .map((r) => r.value);
  }

  async toggleWishlist(listingId: string): Promise<{ saved: boolean }> {
    const { data } = await api.post(`/wishlist/${listingId}/toggle`);
    return data.data;
  }
}

export const wishlistService: IWishlistService = new WishlistService();
