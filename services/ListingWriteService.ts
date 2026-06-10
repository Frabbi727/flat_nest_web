import api from "@/lib/axios";
import type { IListingWriteService } from "@/services/interfaces/IListingWriteService";
import type {
  Listing,
  CreateListingStep1Payload,
  LocationPayload,
  OwnerInfoPayload,
} from "@/types/api";

export class ListingWriteService implements IListingWriteService {
  async createDraft(data: CreateListingStep1Payload): Promise<Listing> {
    const { data: res } = await api.post("/listings", data);
    return res.data;
  }

  async uploadPhotos(listingId: string, photos: File[]): Promise<void> {
    const form = new FormData();
    photos.forEach((photo) => form.append("photos[]", photo));
    await api.post(`/listings/${listingId}/photos`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async saveLocation(
    listingId: string,
    data: LocationPayload
  ): Promise<Listing> {
    const { data: res } = await api.patch(
      `/listings/${listingId}/location`,
      data
    );
    return res.data;
  }

  async saveOwnerInfo(
    listingId: string,
    data: OwnerInfoPayload
  ): Promise<Listing> {
    const { data: res } = await api.patch(
      `/listings/${listingId}/owner-info`,
      data
    );
    return res.data;
  }

  async updateListing(
    listingId: string,
    data: Partial<CreateListingStep1Payload & OwnerInfoPayload & { amenities: number[] }>
  ): Promise<Listing> {
    const { data: res } = await api.patch(`/listings/${listingId}`, data);
    return res.data;
  }

  async submitForReview(listingId: string): Promise<void> {
    await api.post(`/listings/${listingId}/submit`, {});
  }

  async markRented(listingId: string): Promise<void> {
    await api.post(`/listings/${listingId}/mark-rented`, {});
  }

  async deleteListing(listingId: string): Promise<void> {
    await api.delete(`/listings/${listingId}`);
  }
}

export const listingWriteService: IListingWriteService =
  new ListingWriteService();
