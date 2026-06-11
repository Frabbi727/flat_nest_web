import type { AuthResponse, RegistrationStepResponse } from "@/types/api";
import type { RegisterStep1Form } from "@/types/forms";

export interface IAuthService {
  login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse>;
  loginWithGoogle(idToken: string): Promise<AuthResponse>;
  registerStep1(data: RegisterStep1Form): Promise<AuthResponse>;
  registerBasic(data: { phone: string; password: string }): Promise<RegistrationStepResponse>;
  registerStep2(role: "owner" | "renter"): Promise<RegistrationStepResponse>;
  registerStep3(avatar: File): Promise<RegistrationStepResponse>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<{ access_token: string }>;
  deleteAccount(): Promise<void>;
}
