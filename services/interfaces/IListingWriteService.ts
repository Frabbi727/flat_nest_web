import type {
  Listing,
  CreateListingStep1Payload,
  LocationPayload,
  OwnerInfoPayload,
} from "@/types/api";

export interface IListingWriteService {
  createDraft(data: CreateListingStep1Payload): Promise<Listing>;
  uploadPhotos(listingId: string, photos: File[]): Promise<void>;
  saveLocation(listingId: string, data: LocationPayload): Promise<Listing>;
  saveOwnerInfo(listingId: string, data: OwnerInfoPayload): Promise<Listing>;
  updateListing(
    listingId: string,
    data: Partial<CreateListingStep1Payload & OwnerInfoPayload>
  ): Promise<Listing>;
  submitForReview(listingId: string): Promise<void>;
  markRented(listingId: string): Promise<void>;
  deleteListing(listingId: string): Promise<void>;
}
