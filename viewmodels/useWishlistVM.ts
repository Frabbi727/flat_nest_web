"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistService } from "@/services/WishlistService";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/constants";

interface Options {
  /** Fetch full Listing objects for the saved page (one GET /listings/{id} per saved id). */
  withListings?: boolean;
}

export function useWishlistVM({ withListings = false }: Options = {}) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  // Per-listing in-flight lock (spec §10: guard against double-taps)
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());

  // Saved IDs are the source of truth used to paint hearts everywhere.
  // Never fetched for guests (spec §3).
  const idsQuery = useQuery({
    queryKey: QUERY_KEYS.wishlist,
    queryFn: () => wishlistService.getWishlistIds(),
    enabled: isAuthenticated,
  });
  const savedIds = idsQuery.data ?? [];

  const listingsQuery = useQuery({
    queryKey: [...QUERY_KEYS.wishlist, "listings", [...savedIds].sort().join(",")],
    queryFn: () => wishlistService.getWishlistListings(savedIds),
    enabled: withListings && isAuthenticated && savedIds.length > 0,
    placeholderData: (prev) => prev,
  });

  // Filter by current ids so an optimistic removal disappears instantly
  // even while the refetch is in flight.
  const savedListings = (listingsQuery.data ?? []).filter((l) =>
    savedIds.includes(String(l.id))
  );

  const toggleMutation = useMutation({
    mutationFn: (listingId: string) =>
      wishlistService.toggleWishlist(listingId),
    onMutate: async (listingId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.wishlist });
      const prev = queryClient.getQueryData<string[]>(QUERY_KEYS.wishlist);
      // Optimistic flip
      queryClient.setQueryData<string[]>(QUERY_KEYS.wishlist, (old = []) =>
        old.includes(listingId)
          ? old.filter((id) => id !== listingId)
          : [...old, listingId]
      );
      return { prev };
    },
    onSuccess: (result, listingId) => {
      // Reconcile with the server's authoritative `saved` value (spec §10)
      queryClient.setQueryData<string[]>(QUERY_KEYS.wishlist, (old = []) =>
        result.saved
          ? old.includes(listingId)
            ? old
            : [...old, listingId]
          : old.filter((id) => id !== listingId)
      );
    },
    onError: (_err, _listingId, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(QUERY_KEYS.wishlist, ctx.prev);
      toast.error("Failed to update wishlist");
    },
    onSettled: (_data, _err, listingId) => {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(listingId);
        return next;
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.wishlist,
        exact: true,
      });
    },
  });

  const toggle = (listingId: string | number) => {
    const id = String(listingId);
    if (pendingIds.has(id)) return;
    setPendingIds((prev) => new Set(prev).add(id));
    toggleMutation.mutate(id);
  };

  return {
    savedIds,
    savedListings,
    isLoading:
      idsQuery.isLoading ||
      (withListings && savedIds.length > 0 && listingsQuery.isLoading),
    error:
      idsQuery.error || listingsQuery.error ? "Failed to load wishlist" : null,

    toggle,
    isToggling: (listingId: string | number) =>
      pendingIds.has(String(listingId)),
    isSaved: (listingId: string | number) =>
      savedIds.includes(String(listingId)),
  };
}
