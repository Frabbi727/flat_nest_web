import { cacheLife } from "next/cache";
import { API_BASE_URL } from "@/lib/constants";
import type { IGeoService } from "@/services/interfaces/IGeoService";
import type { GeoItem } from "@/types/api";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  const json = await res.json();
  return json.data;
}

export async function fetchDivisions(): Promise<GeoItem[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<GeoItem[]>("/geo/divisions");
}

export async function fetchDistricts(divisionId: number): Promise<GeoItem[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<GeoItem[]>(`/geo/districts/${divisionId}`);
}

export async function fetchUpazilas(districtId: number): Promise<GeoItem[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<GeoItem[]>(`/geo/upazilas/${districtId}`);
}

export async function fetchUnions(upazilaId: number): Promise<GeoItem[]> {
  "use cache";
  cacheLife("days");
  return fetchJson<GeoItem[]>(`/geo/unions/${upazilaId}`);
}

class GeoService implements IGeoService {
  getDivisions = fetchDivisions;
  getDistricts = fetchDistricts;
  getUpazilas = fetchUpazilas;
  getUnions = fetchUnions;
}

export const geoService: IGeoService = new GeoService();
