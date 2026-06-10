"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { bannerService } from "@/services/BannerService";
import {
  QUERY_KEYS,
  BANNER_DISMISSED_KEY,
  BANNER_SESSION_SHOWN_KEY,
} from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";

const MAX_CAROUSEL_IMAGES = 5;

export function useBannerVM() {
  const { isAuthenticated } = useAuthStore();

  // Silent re-check on mount and tab refocus so a newly launched campaign
  // (new id) appears without a reload
  const { data: banner } = useQuery({
    queryKey: QUERY_KEYS.activeBanner,
    queryFn: () => bannerService.getActiveBanner(),
    staleTime: 30 * 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 1,
  });

  // undefined = server render (no storage). The banner query only resolves
  // client-side, so this never causes a hydration mismatch.
  const [dismissedId, setDismissedId] = useState<string | null | undefined>(
    () =>
      typeof window === "undefined"
        ? undefined
        : localStorage.getItem(BANNER_DISMISSED_KEY)
  );
  const [sessionShownId, setSessionShownId] = useState<
    string | null | undefined
  >(() =>
    typeof window === "undefined"
      ? undefined
      : sessionStorage.getItem(BANNER_SESSION_SHOWN_KEY)
  );

  const images = useMemo(
    () =>
      (banner?.images ?? [])
        .filter((img) => img.is_active)
        .sort((a, b) => a.order - b.order)
        .slice(0, MAX_CAROUSEL_IMAGES),
    [banner]
  );

  // shouldShowBanner: campaign active, ≥1 active image, storage read, and
  // this campaign id wasn't permanently dismissed via "X"
  const isVisible =
    !!banner &&
    banner.is_active !== false &&
    images.length > 0 &&
    dismissedId !== undefined &&
    String(banner.id) !== dismissedId;

  // Dialog: logged-in users only, at most once per session per campaign id.
  // A new campaign (different id) pops immediately.
  const shouldShowDialog =
    isVisible && isAuthenticated && String(banner.id) !== sessionShownId;

  // Soft close (Esc / backdrop / dialog shown) — hides the dialog for this
  // session only; the inline widget stays
  const closeDialogForSession = () => {
    if (!banner) return;
    sessionStorage.setItem(BANNER_SESSION_SHOWN_KEY, String(banner.id));
    setSessionShownId(String(banner.id));
  };

  // "X" — permanent: this campaign never shows again on this device unless
  // the admin launches a new one with a different id
  const dismiss = () => {
    if (!banner) return;
    localStorage.setItem(BANNER_DISMISSED_KEY, String(banner.id));
    setDismissedId(String(banner.id));
    closeDialogForSession();
  };

  return {
    banner: banner ?? null,
    images,
    isVisible,
    shouldShowDialog,
    closeDialogForSession,
    dismiss,
  };
}
