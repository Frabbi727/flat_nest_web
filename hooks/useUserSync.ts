"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { userService } from "@/services/UserService";

/**
 * Hook to synchronize user-specific background data:
 * 1. Current GPS location (for nearby alerts)
 * 2. FCM Push Token (for notifications)
 */
export function useUserSync() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // 1. Sync GPS Location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userService.updateLocation(pos.coords.latitude, pos.coords.longitude)
            .catch((err) => console.error("Failed to sync location:", err));
        },
        (err) => {
          console.warn("Location permission denied or unavailable for sync.", err);
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    }

    // 2. Sync FCM Token (Placeholder for Firebase integration)
    // In a real implementation, you would:
    // a. Check for notification permission
    // b. Call getToken(messaging, { vapidKey: '...' })
    // c. Call userService.registerFcmToken(token)
  }, [isAuthenticated, user?.id]);
}
