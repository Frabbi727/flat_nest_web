import api from "@/lib/axios";
import type { IBannerService } from "@/services/interfaces/IBannerService";
import type { Banner } from "@/types/api";

export class BannerService implements IBannerService {
  async getActiveBanner(): Promise<Banner | null> {
    const { data } = await api.get("/banners/active");
    return data.data ?? null;
  }
}

export const bannerService: IBannerService = new BannerService();
