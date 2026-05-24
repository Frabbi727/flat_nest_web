import type { ListingType, Amenity, ListingFacing } from "@/types/api";

export interface IMetaService {
  getListingTypes(): Promise<ListingType[]>;
  getAmenities(): Promise<Amenity[]>;
  getListingFacings(): Promise<ListingFacing[]>;
}
