"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistService } from "@/services/WishlistService";
import { QUERY_KEYS } from "@/lib/constants";
import type { Listing } from "@/types/api";

export function useWishlistVM() {
  const queryClient = useQueryClient();

  const { data: savedListings = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.wishlist,
    queryFn: () => wishlistService.getWishlist(),
  });

  const toggleMutation = useMutation({
    mutationFn: (listingId: string) =>
      wishlistService.toggleWishlist(listingId),
    onMutate: async (listingId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.wishlist });
      const prev = queryClient.getQueryData<Listing[]>(QUERY_KEYS.wishlist);
      queryClient.setQueryData<Listing[]>(QUERY_KEYS.wishlist, (old = []) =>
        old.some((l) => l.id === listingId)
          ? old.filter((l) => l.id !== listingId)
          : old
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(QUERY_KEYS.wishlist, ctx.prev);
      toast.error("Failed to update wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wishlist });
    },
  });

  return {
    savedListings,
    isLoading,
    error: error ? "Failed to load wishlist" : null,
    toggle: toggleMutation.mutate,
    togglePending: toggleMutation.isPending,
    isSaved: (listingId: string) =>
      savedListings.some((l) => l.id === listingId),
  };
}
