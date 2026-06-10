import api from "@/lib/axios";
import type { IChatService } from "@/services/interfaces/IChatService";
import type {
  Chat,
  ChatMessage,
  ChatMessagesResponse,
  ChatStatus,
  StartChatPayload,
} from "@/types/api";

export class ChatService implements IChatService {
  async getChats(): Promise<Chat[]> {
    const { data } = await api.get("/chats");
    return data.data;
  }

  async startChat(payload: StartChatPayload): Promise<Chat> {
    const { data } = await api.post("/chats", payload);
    return data.data;
  }

  async getMessages(chatId: string): Promise<ChatMessagesResponse> {
    const { data } = await api.get(`/chats/${chatId}/messages`);
    // Spec §15.3: data = { chat: { status }, messages: [...] }.
    // Tolerate a bare array in case an older backend returns one.
    if (Array.isArray(data.data)) {
      return { chat: { status: "pending" }, messages: data.data };
    }
    return data.data;
  }

  async sendMessage(chatId: string, text: string): Promise<ChatMessage> {
    const { data } = await api.post(`/chats/${chatId}/messages`, { text });
    return data.data;
  }

  async acceptChat(chatId: string): Promise<{ status: ChatStatus }> {
    const { data } = await api.post(`/chats/${chatId}/accept`);
    return data.data;
  }

  async rejectChat(chatId: string): Promise<{ status: ChatStatus }> {
    const { data } = await api.post(`/chats/${chatId}/reject`);
    return data.data;
  }
}

export const chatService: IChatService = new ChatService();
