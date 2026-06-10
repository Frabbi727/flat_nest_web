"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { listingService } from "@/services/ListingService";
import { chatService } from "@/services/ChatService";
import { accessRequestService } from "@/services/AccessRequestService";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import { useWishlistVM } from "@/viewmodels/useWishlistVM";

export function useListingDetailVM(listingId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const wishlist = useWishlistVM();

  const { data: listing, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.listing(listingId),
    queryFn: () => listingService.getListingById(listingId),
    enabled: !!listingId,
  });

  const isSaved = wishlist.isSaved(listingId);
  const isOwnListing = !!listing?.owner && listing.owner.id === user?.id;

  const accessRequestStatus = listing?.access_request_status ?? null;
  // Owners always see their own listing in full; renters need an accepted request
  const hasContactAccess = isOwnListing || accessRequestStatus === "accepted";
  const canRequestAccess =
    !isOwnListing &&
    (accessRequestStatus === null || accessRequestStatus === "rejected");

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

  const requestAccessMutation = useMutation({
    mutationFn: () => accessRequestService.requestAccess(listingId),
    onSuccess: () => {
      toast.success("Access request sent to the owner.");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.listing(listingId) });
    },
    onError: (error) => {
      const message =
        isAxiosError(error) && error.response?.data?.message
          ? String(error.response.data.message)
          : "Failed to send access request";
      toast.error(message);
      // A 422 means our cached status is stale (already pending/accepted) — resync
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.listing(listingId) });
    },
  });

  return {
    listing: listing ?? null,
    isLoading,
    error: error ? "Failed to load listing" : null,
    isSaved,
    isOwnListing,

    accessRequestStatus,
    hasContactAccess,
    canRequestAccess,

    requestAccess: () => {
      if (!isAuthenticated) {
        openAuthModal("Sign in to request the owner's contact details.");
        return;
      }
      if (!canRequestAccess || requestAccessMutation.isPending) return;
      requestAccessMutation.mutate();
    },
    requestAccessPending: requestAccessMutation.isPending,

    toggleSave: () => wishlist.toggle(listingId),
    toggleSavePending: wishlist.isToggling(listingId),

    startChat: (msg?: string) =>
      startChatMutation.mutate(
        msg ?? `Hi, I'm interested in "${listing?.title}". Is it still available?`
      ),
    startChatPending: startChatMutation.isPending,
  };
}
