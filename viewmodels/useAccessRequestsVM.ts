"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { accessRequestService } from "@/services/AccessRequestService";
import { QUERY_KEYS } from "@/lib/constants";
import type { AccessRequestStatus } from "@/types/api";

function apiErrorMessage(error: unknown, fallback: string): string {
  return isAxiosError(error) && error.response?.data?.message
    ? String(error.response.data.message)
    : fallback;
}

export function useAccessRequestsVM() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<AccessRequestStatus>("pending");
  const [currentPage, setCurrentPage] = useState(1);

  const filters = { status: statusFilter, page: currentPage };

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ownerAccessRequests(filters),
    queryFn: () => accessRequestService.getOwnerRequests(filters),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["owner-access-requests"] });

  const acceptMutation = useMutation({
    mutationFn: (requestId: string) =>
      accessRequestService.acceptRequest(requestId),
    onSuccess: () => {
      toast.success("Access granted.");
      invalidate();
    },
    onError: (err) => {
      toast.error(apiErrorMessage(err, "Failed to accept request"));
      // "Already responded" means our list is stale — resync
      invalidate();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (requestId: string) =>
      accessRequestService.rejectRequest(requestId),
    onSuccess: () => {
      toast.success("Access request declined.");
      invalidate();
    },
    onError: (err) => {
      toast.error(apiErrorMessage(err, "Failed to decline request"));
      invalidate();
    },
  });

  return {
    requests: data?.requests ?? [],
    isLoading,
    error: error ? "Failed to load access requests" : null,

    statusFilter,
    setStatusFilter: (status: AccessRequestStatus) => {
      setStatusFilter(status);
      setCurrentPage(1);
    },

    currentPage,
    totalPages: data?.meta.last_page ?? 1,
    totalCount: data?.meta.total ?? 0,
    setPage: setCurrentPage,

    acceptRequest: acceptMutation.mutate,
    rejectRequest: rejectMutation.mutate,
    isResponding: (requestId: string) =>
      (acceptMutation.isPending && acceptMutation.variables === requestId) ||
      (rejectMutation.isPending && rejectMutation.variables === requestId),
  };
}

/** Lightweight pending-count for sidebar badges. */
export function usePendingAccessRequestCount() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.ownerAccessRequestsPendingCount,
    queryFn: () =>
      accessRequestService.getOwnerRequests({ status: "pending", page: 1 }),
  });
  return data?.meta.total ?? 0;
}
