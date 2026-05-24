"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { listingWriteService } from "@/services/ListingWriteService";
import { QUERY_KEYS } from "@/lib/constants";
import type { OwnerListing } from "@/types/api";
import type { OwnerListingFilters } from "@/types/filters";

export function useOwnerDashboardVM() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<
    OwnerListingFilters["status"] | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);

  const filters: OwnerListingFilters = {
    page: currentPage,
    status: statusFilter,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ownerListings(filters),
    queryFn: async () => {
      const { data } = await api.get("/owner/listings", { params: filters });
      return data as { data: OwnerListing[]; meta: { last_page: number; total: number } };
    },
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["owner-listings"],
    });

  const submitMutation = useMutation({
    mutationFn: (listingId: string) =>
      listingWriteService.submitForReview(listingId),
    onSuccess: () => {
      toast.success("Listing submitted for review");
      invalidate();
    },
    onError: () => toast.error("Failed to submit listing"),
  });

  const markRentedMutation = useMutation({
    mutationFn: (listingId: string) =>
      listingWriteService.markRented(listingId),
    onSuccess: () => {
      toast.success("Listing marked as rented");
      invalidate();
    },
    onError: () => toast.error("Failed to mark as rented"),
  });

  const deleteMutation = useMutation({
    mutationFn: (listingId: string) =>
      listingWriteService.deleteListing(listingId),
    onSuccess: () => {
      toast.success("Listing deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete listing"),
  });

  return {
    listings: data?.data ?? [],
    isLoading,
    error: error ? "Failed to load your listings" : null,
    statusFilter,
    setStatusFilter,
    currentPage,
    totalPages: data?.meta.last_page ?? 1,
    setPage: setCurrentPage,

    submitListing: submitMutation.mutate,
    submitPending: submitMutation.isPending,

    markRented: markRentedMutation.mutate,
    markRentedPending: markRentedMutation.isPending,

    deleteListing: deleteMutation.mutate,
    deletePending: deleteMutation.isPending,
  };
}
