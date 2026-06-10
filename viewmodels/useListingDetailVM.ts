"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { listingService } from "@/services/ListingService";
import { chatService } from "@/services/ChatService";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { useWishlistVM } from "@/viewmodels/useWishlistVM";

export function useListingDetailVM(listingId: string) {
  const router = useRouter();
  const { user } = useAuthStore();
  const wishlist = useWishlistVM();

  const { data: listing, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.listing(listingId),
    queryFn: () => listingService.getListingById(listingId),
    enabled: !!listingId,
  });

  const isSaved = wishlist.isSaved(listingId);
  const isOwnListing = listing?.owner?.id === user?.id;

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

    toggleSave: () => wishlist.toggle(listingId),
    toggleSavePending: wishlist.isToggling(listingId),

    startChat: (msg?: string) =>
      startChatMutation.mutate(
        msg ?? `Hi, I'm interested in "${listing?.title}". Is it still available?`
      ),
    startChatPending: startChatMutation.isPending,
  };
}
