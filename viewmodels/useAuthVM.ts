"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { authService } from "@/services/AuthService";
import { useAuthStore } from "@/store/auth.store";
import type { AuthResponse } from "@/types/api";
import type { RegisterStep1Form } from "@/types/forms";

function resolvePostAuthRoute(
  role: string | null,
  isComplete: boolean,
  registrationStep: number | null
): string {
  if (!isComplete) {
    if (registrationStep === null || registrationStep === 1)
      return "/register/role";
    if (registrationStep === 2) return "/register/avatar";
  }
  return role === "owner" ? "/dashboard" : "/";
}

export function useAuthVM() {
  const { setTokens, setUser, logout: storeLogout, user, isAuthenticated } =
    useAuthStore();
  const router = useRouter();

  const isOwner = user?.role === "owner";
  const isRenter = user?.role === "renter";
  const isRegistrationComplete = user?.is_complete ?? false;

  const onAuthSuccess = (data: AuthResponse) => {
    setTokens(data.access_token, data.refresh_token);
    setUser(data.user);
    // ?next= set by AuthGate/AuthModal — only same-origin paths, and only
    // once registration is complete (otherwise resume the register wizard)
    const next = new URLSearchParams(window.location.search).get("next");
    if (data.user.is_complete && next?.startsWith("/") && !next.startsWith("//")) {
      router.push(next);
    } else {
      router.push(
        resolvePostAuthRoute(
          data.user.role,
          data.user.is_complete,
          data.registration_step
        )
      );
    }
  };

  const loginMutation = useMutation({
    mutationFn: (creds: { email: string; password: string }) =>
      authService.login(creds),
    onSuccess: onAuthSuccess,
    onError: (error) => {
      if (
        isAxiosError(error) &&
        error.response?.data?.code === "USE_GOOGLE_SIGN_IN"
      ) {
        toast.error("This account uses Google Sign-In.");
      } else {
        toast.error("Invalid email or password");
      }
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: (idToken: string) => authService.loginWithGoogle(idToken),
    onSuccess: onAuthSuccess,
    onError: () => {
      toast.error("Google sign-in failed. Please try again.");
    },
  });

  const registerStep1Mutation = useMutation({
    mutationFn: (data: RegisterStep1Form) => authService.registerStep1(data),
    onSuccess: (data) => {
      setTokens(data.access_token, data.refresh_token);
      setUser(data.user);
      router.push("/register/role");
    },
    onError: () => {
      toast.error("Registration failed. Email may already be in use.");
    },
  });

  const registerStep2Mutation = useMutation({
    mutationFn: (role: "owner" | "renter") => authService.registerStep2(role),
    onSuccess: (_, role) => {
      if (user) setUser({ ...user, role });
      router.push("/register/avatar");
    },
    onError: () => {
      toast.error("Failed to save role. Please try again.");
    },
  });

  const registerStep3Mutation = useMutation({
    mutationFn: (avatar: File) => authService.registerStep3(avatar),
    onSuccess: (data) => {
      if (user) setUser({ ...user, avatar_url: data.avatar_url, is_complete: true });
      router.push(user?.role === "owner" ? "/dashboard" : "/");
    },
    onError: () => {
      toast.error("Failed to upload photo. You can update it later.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      // Spec §4.5: also drop the Google session so the account picker reappears
      window.google?.accounts.id.disableAutoSelect();
      storeLogout();
      router.push("/login");
    },
  });

  return {
    user,
    isAuthenticated,
    isOwner,
    isRenter,
    isRegistrationComplete,

    login: loginMutation.mutate,
    loginPending: loginMutation.isPending,
    loginError: loginMutation.error?.message ?? null,

    loginWithGoogle: loginWithGoogleMutation.mutate,
    loginWithGooglePending: loginWithGoogleMutation.isPending,

    registerStep1: registerStep1Mutation.mutate,
    registerStep1Pending: registerStep1Mutation.isPending,

    registerStep2: registerStep2Mutation.mutate,
    registerStep2Pending: registerStep2Mutation.isPending,

    registerStep3: registerStep3Mutation.mutate,
    registerStep3Pending: registerStep3Mutation.isPending,

    logout: logoutMutation.mutate,
    logoutPending: logoutMutation.isPending,
  };
}
