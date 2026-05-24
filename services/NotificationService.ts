import api from "@/lib/axios";
import type { INotificationService } from "@/services/interfaces/INotificationService";
import type { Notification, PaginatedResponse } from "@/types/api";

export class NotificationService implements INotificationService {
  async getNotifications(
    page = 1
  ): Promise<PaginatedResponse<Notification>> {
    const { data } = await api.get("/notifications", { params: { page } });
    return data;
  }

  async getUnreadCount(): Promise<number> {
    const { data } = await api.get("/notifications/unread-count");
    return data.data.unread_count as number;
  }

  async markOneRead(notificationId: string): Promise<void> {
    await api.patch(`/notifications/${notificationId}/read`);
  }

  async markAllRead(): Promise<void> {
    await api.patch("/notifications/read-all");
  }
}

export const notificationService: INotificationService =
  new NotificationService();
