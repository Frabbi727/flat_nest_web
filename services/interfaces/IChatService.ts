import type { Chat, ChatMessage, StartChatPayload } from "@/types/api";

export interface IChatService {
  getChats(): Promise<Chat[]>;
  startChat(data: StartChatPayload): Promise<Chat>;
  getMessages(chatId: string): Promise<ChatMessage[]>;
  sendMessage(chatId: string, text: string): Promise<ChatMessage>;
}
