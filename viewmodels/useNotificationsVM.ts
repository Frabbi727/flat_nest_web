"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationService } from "@/services/NotificationService";
import { QUERY_KEYS, NOTIFICATION_POLL_INTERVAL_MS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";

export function useNotificationsVM() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.notifications(currentPage),
    queryFn: () => notificationService.getNotifications(currentPage),
    enabled: isAuthenticated,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: QUERY_KEYS.notificationsUnread,
    queryFn: () => notificationService.getUnreadCount(),
    enabled: isAuthenticated,
    refetchInterval: NOTIFICATION_POLL_INTERVAL_MS,
  });

  const markAllMutation = useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications(currentPage),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notificationsUnread,
      });
    },
    onError: () => {
      toast.error("Failed to mark notifications as read");
    },
  });

  return {
    notifications: data?.data ?? [],
    isLoading,
    error: error ? "Failed to load notifications" : null,
    unreadCount,
    currentPage,
    totalPages: data?.meta.last_page ?? 1,
    loadNextPage: () =>
      setCurrentPage((p) => Math.min(p + 1, data?.meta.last_page ?? 1)),
    markAllRead: markAllMutation.mutate,
    markAllReadPending: markAllMutation.isPending,
  };
}
