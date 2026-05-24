import type { AuthResponse, User } from "@/types/api";
import type { RegisterStep1Form } from "@/types/forms";

export interface IAuthService {
  login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse>;
  loginWithGoogle(idToken: string): Promise<AuthResponse>;
  registerStep1(data: RegisterStep1Form): Promise<AuthResponse>;
  registerStep2(role: "owner" | "renter"): Promise<void>;
  registerStep3(avatar: File): Promise<{ avatar_url: string }>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<{ access_token: string }>;
  deleteAccount(): Promise<void>;
}
