"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNearbyMapVM } from "@/viewmodels/useNearbyMapVM";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);
  return null;
}

export default function NearbyMap() {
  const { listings, isLoading, error, userCoords, gpsPermissionDenied } =
    useNearbyMapVM();

  if (gpsPermissionDenied) {
    return (
      <div className="flex items-center justify-center min-h-64 px-4">
        <p className="text-muted-foreground text-center">
          Location access denied. Please enable location in your browser to use
          the map.
        </p>
      </div>
    );
  }

  if (!userCoords) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-muted-foreground">Getting your location…</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full">
      <MapContainer
        center={[userCoords.lat, userCoords.lng]}
        zoom={14}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap lat={userCoords.lat} lng={userCoords.lng} />

        {listings.map(
          (listing) =>
            listing.coord_x &&
            listing.coord_y && (
              <Marker
                key={listing.id}
                position={[listing.coord_y, listing.coord_x]}
              >
                <Popup>
                  <div className="text-sm space-y-1 min-w-[160px]">
                    <p className="font-semibold line-clamp-2">{listing.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {listing.area}
                    </p>
                    <p className="font-bold text-primary">
                      {formatPrice(listing.price)}/mo
                    </p>
                    {listing.distance_km !== null && (
                      <p className="text-xs text-muted-foreground">
                        {listing.distance_km.toFixed(1)} km away
                      </p>
                    )}
                    <Link
                      href={`/listings/${listing.id}`}
                      className="block text-primary underline text-xs"
                    >
                      View details →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}
