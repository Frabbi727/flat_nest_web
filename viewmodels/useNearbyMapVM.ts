"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { listingService } from "@/services/ListingService";
import { userService } from "@/services/UserService";
import { QUERY_KEYS } from "@/lib/constants";

export function useNearbyMapVM() {
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [gpsPermissionDenied, setGpsPermissionDenied] = useState(false);
  const [radius, setRadius] = useState(5);

  const updateLocationMutation = useMutation({
    mutationFn: ({ lat, lng }: { lat: number; lng: number }) =>
      userService.updateLocation(lat, lng),
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => setGpsPermissionDenied(true), 0);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserCoords(coords);
        updateLocationMutation.mutate(coords);
      },
      () => {
        setGpsPermissionDenied(true);
        toast.error("Location access denied. Map will not show nearby listings.");
      }
    );
  }, []);

  const nearbyParams = userCoords
    ? { coord_x: userCoords.lng, coord_y: userCoords.lat, radius }
    : null;

  const { data: listings = [], isLoading, error, refetch } = useQuery({
    queryKey: ["listings-nearby", nearbyParams],
    queryFn: () => listingService.getNearbyListings(nearbyParams!),
    enabled: !!nearbyParams,
  });

  return {
    listings,
    isLoading,
    error: error ? "Failed to load nearby listings" : null,
    userCoords,
    gpsPermissionDenied,
    radius,
    setRadius,
    refetch,
  };
}
