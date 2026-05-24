import api from "@/lib/axios";
import type { IUserService } from "@/services/interfaces/IUserService";

export class UserService implements IUserService {
  async updateLocation(lat: number, lng: number): Promise<void> {
    await api.patch("/user/location", { lat, lng });
  }

  async registerFcmToken(
    fcmToken: string,
    deviceModel: string
  ): Promise<void> {
    await api.post("/device/fcm-token", {
      fcm_token: fcmToken,
      device_type: "web",
      device_model: deviceModel,
    });
  }
}

export const userService: IUserService = new UserService();
