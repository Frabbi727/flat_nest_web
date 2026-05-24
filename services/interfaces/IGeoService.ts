import type { GeoItem } from "@/types/api";

export interface IGeoService {
  getDivisions(): Promise<GeoItem[]>;
  getDistricts(divisionId: number): Promise<GeoItem[]>;
  getUpazilas(districtId: number): Promise<GeoItem[]>;
  getUnions(upazilaId: number): Promise<GeoItem[]>;
}
