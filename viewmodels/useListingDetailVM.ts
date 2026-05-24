"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { listingService } from "@/services/ListingService";
import { wishlistService } from "@/services/WishlistService";
import { chatService } from "@/services/ChatService";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import type { Listing } from "@/types/api";

export function useListingDetailVM(listingId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuthStore();

  const { data: listing, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.listing(listingId),
    queryFn: () => listingService.getListingById(listingId),
    enabled: !!listingId,
  });

  const wishlistData = queryClient.getQueryData<Listing[]>(QUERY_KEYS.wishlist);
  const isSaved = wishlistData?.some((l) => l.id === listingId) ?? false;
  const isOwnListing = listing?.owner?.id === user?.id;

  const toggleSaveMutation = useMutation({
    mutationFn: () => wishlistService.toggleWishlist(listingId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.wishlist });
      const prev = queryClient.getQueryData<Listing[]>(QUERY_KEYS.wishlist);
      queryClient.setQueryData<Listing[]>(QUERY_KEYS.wishlist, (old = []) =>
        isSaved
          ? old.filter((l) => l.id !== listingId)
          : listing
          ? [...old, listing]
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

  const startChatMutation = useMutation({
    mutationFn: (initialMessage: string) =>
      chatService.startChat({
        listing_id: listingId,
        initial_message: initialMessage,
      }),
    onSuccess: (chat) => {
      router.push(`/messages/${chat.id}`);
    },
    onError: () => {
      toast.error("Failed to start conversation");
    },
  });

  return {
    listing: listing ?? null,
    isLoading,
    error: error ? "Failed to load listing" : null,
    isSaved,
    isOwnListing,

    toggleSave: toggleSaveMutation.mutate,
    toggleSavePending: toggleSaveMutation.isPending,

    startChat: (msg?: string) =>
      startChatMutation.mutate(
        msg ?? `Hi, I'm interested in "${listing?.title}". Is it still available?`
      ),
    startChatPending: startChatMutation.isPending,
  };
}
