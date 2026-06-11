"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { authService } from "@/services/AuthService";
import { useAuthStore } from "@/store/auth.store";
import type { AuthResponse, User } from "@/types/api";
import type { RegisterStep1Form } from "@/types/forms";

function resolvePostAuthRoute(user: User, registrationStep: number | null): string {
  if (!user.is_complete) {
    if (user.phone === null) return "/register?googleUser=true";
    if (registrationStep === 1) return "/register/role";
    if (registrationStep === 2) return "/register/avatar";
    return "/register/role";
  }
  return user.role === "owner" ? "/dashboard" : "/";
}

export function useAuthVM() {
  const { setTokens, setUser, logout: storeLogout, user, isAuthenticated } =
    useAuthStore();
  const router = useRouter();
  const [step1ApiErrors, setStep1ApiErrors] = useState<Record<string, string> | null>(null);
  const [basicApiErrors, setBasicApiErrors] = useState<Record<string, string> | null>(null);
  const [showGoogleHint, setShowGoogleHint] = useState(false);

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
      router.push(resolvePostAuthRoute(data.user, data.registration_step));
    }
  };

  const loginMutation = useMutation({
    mutationFn: (creds: { email: string; password: string }) =>
      authService.login(creds),
    onSuccess: (data) => {
      setShowGoogleHint(false);
      onAuthSuccess(data);
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data?.code === "USE_GOOGLE_SIGN_IN") {
        setShowGoogleHint(true);
      } else {
        toast.error("Invalid email or password");
      }
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: (idToken: string) => authService.loginWithGoogle(idToken),
    onSuccess: onAuthSuccess,
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data?.code === "EMAIL_ACCOUNT_EXISTS") {
        toast.error(
          error.response.data.message ??
            "An account with this email already exists. Please sign in with your email and password."
        );
      } else {
        toast.error("Google sign-in failed. Please try again.");
      }
    },
  });

  const registerStep1Mutation = useMutation({
    mutationFn: (data: RegisterStep1Form) => authService.registerStep1(data),
    onSuccess: (data) => {
      setStep1ApiErrors(null);
      setTokens(data.access_token, data.refresh_token);
      setUser(data.user);
      router.push("/register/role");
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data?.errors) {
        const raw = error.response.data.errors as Record<string, string[]>;
        const flat: Record<string, string> = {};
        for (const [k, v] of Object.entries(raw)) flat[k] = v[0];
        setStep1ApiErrors(flat);
      } else {
        const msg = isAxiosError(error)
          ? (error.response?.data?.message ?? "Registration failed.")
          : "Registration failed.";
        toast.error(msg);
      }
    },
  });

  const registerBasicMutation = useMutation({
    mutationFn: (payload: { phone: string; password: string }) =>
      authService.registerBasic(payload),
    onSuccess: (data) => {
      setBasicApiErrors(null);
      setUser(data.user);
      router.push("/register/role");
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data?.errors) {
        const raw = error.response.data.errors as Record<string, string[]>;
        const flat: Record<string, string> = {};
        for (const [k, v] of Object.entries(raw)) flat[k] = v[0];
        setBasicApiErrors(flat);
      } else {
        const msg = isAxiosError(error)
          ? (error.response?.data?.message ?? "Failed to save info.")
          : "Failed to save info.";
        toast.error(msg);
      }
    },
  });

  const registerStep2Mutation = useMutation({
    mutationFn: (role: "owner" | "renter") => authService.registerStep2(role),
    onSuccess: (data) => {
      setUser(data.user);
      router.push("/register/avatar");
    },
    onError: () => {
      toast.error("Failed to save role. Please try again.");
    },
  });

  const registerStep3Mutation = useMutation({
    mutationFn: (avatar: File) => authService.registerStep3(avatar),
    onSuccess: (data) => {
      setUser(data.user);
      router.push(data.user.role === "owner" ? "/dashboard" : "/");
    },
    onError: () => {
      toast.error("Failed to upload photo. You can update it later.");
    },
  });

  const skipStep3 = () => {
    if (user) setUser({ ...user, is_complete: true });
    router.push(user?.role === "owner" ? "/dashboard" : "/");
  };

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
    showGoogleHint,
    resetGoogleHint: () => setShowGoogleHint(false),

    loginWithGoogle: loginWithGoogleMutation.mutate,
    loginWithGooglePending: loginWithGoogleMutation.isPending,

    registerStep1: registerStep1Mutation.mutate,
    registerStep1Pending: registerStep1Mutation.isPending,
    registerStep1ApiErrors: step1ApiErrors,

    registerBasic: registerBasicMutation.mutate,
    registerBasicPending: registerBasicMutation.isPending,
    registerBasicApiErrors: basicApiErrors,

    registerStep2: registerStep2Mutation.mutate,
    registerStep2Pending: registerStep2Mutation.isPending,

    registerStep3: registerStep3Mutation.mutate,
    registerStep3Pending: registerStep3Mutation.isPending,
    skipStep3,

    logout: logoutMutation.mutate,
    logoutPending: logoutMutation.isPending,
  };
}
