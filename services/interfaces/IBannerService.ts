import type { Banner } from "@/types/api";

export interface IBannerService {
  /** Public endpoint — returns the single active campaign, or null when none. */
  getActiveBanner(): Promise<Banner | null>;
}
