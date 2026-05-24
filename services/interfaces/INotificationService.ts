import type { Notification, PaginatedResponse } from "@/types/api";

export interface INotificationService {
  getNotifications(page?: number): Promise<PaginatedResponse<Notification>>;
  getUnreadCount(): Promise<number>;
  markOneRead(notificationId: string): Promise<void>;
  markAllRead(): Promise<void>;
}
