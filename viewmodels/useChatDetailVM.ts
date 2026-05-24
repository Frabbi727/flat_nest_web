"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { chatService } from "@/services/ChatService";
import { QUERY_KEYS, CHAT_POLL_INTERVAL_MS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import type { ChatMessage } from "@/types/api";

export function useChatDetailVM(chatId: string) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.chatMessages(chatId),
    queryFn: () => chatService.getMessages(chatId),
    enabled: !!chatId && isAuthenticated,
    refetchInterval: CHAT_POLL_INTERVAL_MS,
  });

  const { data: chats = [] } = useQuery({
    queryKey: QUERY_KEYS.chats,
    queryFn: () => chatService.getChats(),
    enabled: isAuthenticated,
  });
  const chat = chats.find((c) => c.id === chatId) ?? null;

  const sendMutation = useMutation({
    mutationFn: (text: string) => chatService.sendMessage(chatId, text),
    onSuccess: (newMessage) => {
      queryClient.setQueryData<ChatMessage[]>(
        QUERY_KEYS.chatMessages(chatId),
        (old = []) => [...old, newMessage]
      );
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  return {
    messages,
    isLoading,
    error: error ? "Failed to load messages" : null,
    chat,
    sendMessage: sendMutation.mutate,
    sendPending: sendMutation.isPending,
    sendError: sendMutation.error?.message ?? null,
  };
}
