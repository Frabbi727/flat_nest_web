import type {
  Chat,
  ChatMessage,
  ChatMessagesResponse,
  ChatStatus,
  StartChatPayload,
} from "@/types/api";

export interface IChatService {
  getChats(): Promise<Chat[]>;
  startChat(data: StartChatPayload): Promise<Chat>;
  getMessages(chatId: string): Promise<ChatMessagesResponse>;
  sendMessage(chatId: string, text: string): Promise<ChatMessage>;
  acceptChat(chatId: string): Promise<{ status: ChatStatus }>;
  rejectChat(chatId: string): Promise<{ status: ChatStatus }>;
}
