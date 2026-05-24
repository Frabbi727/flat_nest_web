import { cacheLife } from "next/cache";
import { API_BASE_URL } from "@/lib/constants";
import type { IMetaService } from "@/services/interfaces/IMetaService";
import type { ListingType, Amenity, ListingFacing } from "@/types/api";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  const json = await res.json();
  return json.data;
}

export async function fetchListingTypes(): Promise<ListingType[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<ListingType[]>("/listing-types");
}

export async function fetchAmenities(): Promise<Amenity[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<Amenity[]>("/amenities");
}

export async function fetchListingFacings(): Promise<ListingFacing[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<ListingFacing[]>("/meta/listing-facings");
}

class MetaService implements IMetaService {
  getListingTypes = fetchListingTypes;
  getAmenities = fetchAmenities;
  getListingFacings = fetchListingFacings;
}

export const metaService: IMetaService = new MetaService();
