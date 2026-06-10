"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { listingService } from "@/services/ListingService";
import { listingWriteService } from "@/services/ListingWriteService";
import { QUERY_KEYS } from "@/lib/constants";
import type { CreateListingStep1Payload, OwnerInfoPayload } from "@/types/api";

export function useEditListingVM(listingId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: listing, isLoading } = useQuery({
    queryKey: QUERY_KEYS.listing(listingId),
    queryFn: () => listingService.getListingById(listingId),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateListingStep1Payload & OwnerInfoPayload>) =>
      listingWriteService.updateListing(listingId, data),
    onSuccess: () => {
      toast.success("Listing updated");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.listing(listingId) });
      queryClient.invalidateQueries({ queryKey: ["owner-listings"] });
      router.push("/dashboard");
    },
    onError: () => toast.error("Failed to update listing"),
  });

  return {
    listing: listing ?? null,
    isLoading,
    updateListing: updateMutation.mutate,
    updatePending: updateMutation.isPending,
  };
}
