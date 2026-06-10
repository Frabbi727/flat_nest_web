"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { chatService } from "@/services/ChatService";
import { QUERY_KEYS, CHAT_POLL_INTERVAL_MS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import type { ChatMessagesResponse, ChatStatus } from "@/types/api";

export function useChatDetailVM(chatId: string) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading, error } = useQuery({
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

  const messages = data?.messages ?? [];
  // Treat missing/unknown status as pending (spec §15.1) — never show the
  // input until the backend confirms the chat is accepted.
  const chatStatus: ChatStatus = data?.chat.status ?? chat?.status ?? "pending";

  const sendMutation = useMutation({
    mutationFn: (text: string) => chatService.sendMessage(chatId, text),
    onSuccess: (newMessage) => {
      queryClient.setQueryData<ChatMessagesResponse>(
        QUERY_KEYS.chatMessages(chatId),
        (old) =>
          old
            ? { ...old, messages: [...old.messages, newMessage] }
            : { chat: { status: "accepted" }, messages: [newMessage] }
      );
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const applyStatus = (status: ChatStatus) => {
    queryClient.setQueryData<ChatMessagesResponse>(
      QUERY_KEYS.chatMessages(chatId),
      (old) => (old ? { ...old, chat: { ...old.chat, status } } : old)
    );
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.chats });
  };

  const acceptMutation = useMutation({
    mutationFn: () => chatService.acceptChat(chatId),
    onSuccess: ({ status }) => {
      applyStatus(status);
      toast.success("Chat request accepted");
    },
    onError: () => toast.error("Failed to accept chat request"),
  });

  const rejectMutation = useMutation({
    mutationFn: () => chatService.rejectChat(chatId),
    onSuccess: ({ status }) => {
      applyStatus(status);
      toast.success("Chat request declined");
    },
    onError: () => toast.error("Failed to decline chat request"),
  });

  return {
    messages,
    chatStatus,
    isLoading,
    error: error ? "Failed to load messages" : null,
    chat,
    sendMessage: sendMutation.mutate,
    sendPending: sendMutation.isPending,
    sendError: sendMutation.error?.message ?? null,
    acceptChat: acceptMutation.mutate,
    acceptPending: acceptMutation.isPending,
    rejectChat: rejectMutation.mutate,
    rejectPending: rejectMutation.isPending,
  };
}
