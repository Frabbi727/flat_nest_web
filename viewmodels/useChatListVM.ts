"use client";

import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/ChatService";
import { QUERY_KEYS } from "@/lib/constants";

export function useChatListVM() {
  const { data: chats = [], isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.chats,
    queryFn: () => chatService.getChats(),
  });

  const totalUnread = chats.reduce((acc, c) => acc + c.unread_count, 0);

  return {
    chats,
    isLoading,
    error: error ? "Failed to load conversations" : null,
    totalUnread,
    refetch,
  };
}
