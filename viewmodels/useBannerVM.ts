"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { bannerService } from "@/services/BannerService";
import { QUERY_KEYS, BANNER_DISMISSED_KEY } from "@/lib/constants";

const MAX_CAROUSEL_IMAGES = 5;

export function useBannerVM() {
  const { data: banner } = useQuery({
    queryKey: QUERY_KEYS.activeBanner,
    queryFn: () => bannerService.getActiveBanner(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // undefined = server render (no localStorage). The banner query only
  // resolves client-side, so this never causes a hydration mismatch.
  const [dismissedId, setDismissedId] = useState<string | null | undefined>(
    () =>
      typeof window === "undefined"
        ? undefined
        : localStorage.getItem(BANNER_DISMISSED_KEY)
  );

  const images = useMemo(
    () =>
      (banner?.images ?? [])
        .filter((img) => img.is_active)
        .sort((a, b) => a.order - b.order)
        .slice(0, MAX_CAROUSEL_IMAGES),
    [banner]
  );

  // Show only when: campaign exists & active, has visible images, storage was
  // read, and this campaign id wasn't the one the user closed
  const isVisible =
    !!banner &&
    banner.is_active !== false &&
    images.length > 0 &&
    dismissedId !== undefined &&
    String(banner.id) !== dismissedId;

  const dismiss = () => {
    if (!banner) return;
    localStorage.setItem(BANNER_DISMISSED_KEY, String(banner.id));
    setDismissedId(String(banner.id));
  };

  return {
    banner: banner ?? null,
    images,
    isVisible,
    dismiss,
  };
}
