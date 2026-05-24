import api from "@/lib/axios";
import type { IAuthService } from "@/services/interfaces/IAuthService";
import type { AuthResponse } from "@/types/api";
import type { RegisterStep1Form } from "@/types/forms";

export class AuthService implements IAuthService {
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const { data } = await api.post("/auth/login", credentials);
    return data.data;
  }

  async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    const { data } = await api.post("/auth/google", { id_token: idToken });
    return data.data;
  }

  async registerStep1(formData: RegisterStep1Form): Promise<AuthResponse> {
    const { data } = await api.post("/auth/register", formData);
    return data.data;
  }

  async registerStep2(role: "owner" | "renter"): Promise<void> {
    await api.patch("/auth/register/details", { role });
  }

  async registerStep3(avatar: File): Promise<{ avatar_url: string }> {
    const form = new FormData();
    form.append("avatar", avatar);
    const { data } = await api.patch("/auth/register/avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ access_token: string }> {
    const { data } = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return data.data;
  }

  async deleteAccount(): Promise<void> {
    await api.delete("/auth/account");
  }
}

export const authService: IAuthService = new AuthService();
