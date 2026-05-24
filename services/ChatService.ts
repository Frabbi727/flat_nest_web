import api from "@/lib/axios";
import type { IChatService } from "@/services/interfaces/IChatService";
import type { Chat, ChatMessage, StartChatPayload } from "@/types/api";

export class ChatService implements IChatService {
  async getChats(): Promise<Chat[]> {
    const { data } = await api.get("/chats");
    return data.data;
  }

  async startChat(payload: StartChatPayload): Promise<Chat> {
    const { data } = await api.post("/chats", payload);
    return data.data;
  }

  async getMessages(chatId: string): Promise<ChatMessage[]> {
    const { data } = await api.get(`/chats/${chatId}/messages`);
    return data.data;
  }

  async sendMessage(chatId: string, text: string): Promise<ChatMessage> {
    const { data } = await api.post(`/chats/${chatId}/messages`, { text });
    return data.data;
  }
}

export const chatService: IChatService = new ChatService();
