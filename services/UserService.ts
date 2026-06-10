import api from "@/lib/axios";
import type { IUserService } from "@/services/interfaces/IUserService";
import type { RegisterFcmTokenPayload } from "@/types/api";

export class UserService implements IUserService {
  async updateLocation(lat: number, lng: number): Promise<void> {
    await api.patch("/user/location", { lat, lng });
  }

  async registerFcmToken(
    fcmToken: string,
    deviceModel?: string
  ): Promise<void> {
    const payload: RegisterFcmTokenPayload = {
      fcm_token: fcmToken,
      device_type: "web",
      device_model: deviceModel || this.getBrowserInfo(),
    };
    await api.post("/device/fcm-token", payload);
  }

  private getBrowserInfo(): string {
    if (typeof window === "undefined") return "Server";
    const ua = window.navigator.userAgent;
    let browser = "Browser";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Edge")) browser = "Edge";

    let os = "OS";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone")) os = "iOS";

    return `${browser}/${os}`.substring(0, 100);
  }
}

export const userService: IUserService = new UserService();
