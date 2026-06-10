export interface ListingFilters {
  search?: string;
  listing_type_id?: number;
  price_min?: number;
  price_max?: number;
  beds?: number;
  baths?: number;
  facing_id?: number;
  floor_min?: number;
  floor_max?: number;
  size_min?: number;
  size_max?: number;
  available_from_start?: string;
  available_from_end?: string;
  amenities?: string;
  division_id?: number;
  district_id?: number;
  upazila_id?: number;
  union_id?: number;
  sort_by?: "price_asc" | "price_desc" | "newest" | "oldest";
}

export interface NearbyFilters {
  coord_x: number;
  coord_y: number;
  radius?: number;
  listing_type_id?: number;
  price_min?: number;
  price_max?: number;
  beds?: number;
  baths?: number;
}

export interface OwnerListingFilters {
  page?: number;
  status?: "draft" | "pending" | "active" | "rejected" | "rented";
  type_id?: number;
}
