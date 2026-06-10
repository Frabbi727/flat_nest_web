"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNearbyMapVM } from "@/viewmodels/useNearbyMapVM";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/types/api";

// react-leaflet 5.0.0's MapContainer breaks under React 19 remounts (error
// boundary retry, StrictMode): it never resets its internal instance ref, so
// Leaflet throws "Map container is being reused by another instance" or keeps
// a destroyed map. This component manages Leaflet imperatively with full
// cleanup instead, which survives any remount.

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

// API may serialize numerics as strings; coords are absent entirely when the
// backend hides them
function getLatLng(listing: Listing): [number, number] | null {
  const lat = Number(listing.coord_y);
  const lng = Number(listing.coord_x);
  if (
    listing.coord_y == null ||
    listing.coord_x == null ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    (lat === 0 && lng === 0)
  ) {
    return null;
  }
  return [lat, lng];
}

// Popup built via DOM APIs (not an HTML string) so listing titles can't
// inject markup
function buildPopup(listing: Listing): HTMLElement {
  const root = document.createElement("div");
  root.style.cssText = "min-width:160px;font-size:13px;line-height:1.4";

  const title = document.createElement("p");
  title.textContent = listing.title;
  title.style.cssText = "font-weight:600;margin:0 0 2px";
  root.appendChild(title);

  if (listing.area) {
    const area = document.createElement("p");
    area.textContent = listing.area;
    area.style.cssText = "color:#8A8A8E;font-size:12px;margin:0";
    root.appendChild(area);
  }

  const price = document.createElement("p");
  price.textContent = `${formatPrice(listing.price)}/mo`;
  price.style.cssText = "color:#1A6B72;font-weight:700;margin:2px 0";
  root.appendChild(price);

  const distance = Number(listing.distance_km);
  if (listing.distance_km != null && Number.isFinite(distance)) {
    const dist = document.createElement("p");
    dist.textContent = `${distance.toFixed(1)} km away`;
    dist.style.cssText = "color:#8A8A8E;font-size:12px;margin:0";
    root.appendChild(dist);
  }

  const link = document.createElement("a");
  link.href = `/listings/${listing.id}`;
  link.textContent = "View details →";
  link.style.cssText =
    "display:block;color:#1A6B72;text-decoration:underline;font-size:12px;margin-top:4px";
  root.appendChild(link);

  return root;
}

const RADIUS_OPTIONS_KM = [2, 5, 10, 20];

export default function NearbyMap() {
  const {
    listings,
    isLoading,
    userCoords,
    gpsPermissionDenied,
    radius,
    setRadius,
  } = useNearbyMapVM();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  // Create the map once coords are known; destroy it fully on unmount so a
  // remount always starts from a clean container
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current || !userCoords) return;

    const map = L.map(container).setView([userCoords.lat, userCoords.lng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // "You are here" indicator
    L.circleMarker([userCoords.lat, userCoords.lng], {
      radius: 8,
      color: "#fff",
      weight: 2,
      fillColor: "#1A6B72",
      fillOpacity: 1,
    })
      .bindTooltip("You are here")
      .addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
      radiusCircleRef.current = null;
    };
  }, [userCoords]);

  // Greenish coverage circle — visualizes the search radius and grows/shrinks
  // with the selected km; the viewport re-fits so the whole area stays visible
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userCoords) return;
    const center: [number, number] = [userCoords.lat, userCoords.lng];
    const meters = radius * 1000;
    if (!radiusCircleRef.current) {
      radiusCircleRef.current = L.circle(center, {
        radius: meters,
        color: "#1A6B72",
        weight: 1.5,
        fillColor: "#1A6B72",
        fillOpacity: 0.08,
        interactive: false,
      }).addTo(map);
    } else {
      radiusCircleRef.current.setLatLng(center);
      radiusCircleRef.current.setRadius(meters);
    }
    map.fitBounds(radiusCircleRef.current.getBounds(), {
      padding: [24, 24],
    });
  }, [radius, userCoords]);

  // Sync listing markers whenever data changes
  useEffect(() => {
    const group = markersRef.current;
    if (!group) return;
    group.clearLayers();
    for (const listing of listings) {
      const latLng = getLatLng(listing);
      if (!latLng) continue;
      L.marker(latLng).bindPopup(buildPopup(listing)).addTo(group);
    }
  }, [listings, userCoords]);

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

  const locatableCount = listings.filter((l) => getLatLng(l) !== null).length;

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full">
      <div ref={containerRef} className="h-full w-full" />

      {/* Radius filter — drives the nearby query and the coverage circle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1 bg-background border rounded-full p-1 shadow-lg">
        {RADIUS_OPTIONS_KM.map((km) => (
          <button
            key={km}
            onClick={() => setRadius(km)}
            className={
              radius === km
                ? "h-8 px-3.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground"
                : "h-8 px-3.5 rounded-full text-sm text-muted-foreground hover:bg-muted"
            }
          >
            {km} km
          </button>
        ))}
      </div>

      {!isLoading && listings.length === 0 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-background border rounded-full px-4 py-1.5 text-sm text-muted-foreground shadow">
          No flats found nearby.
        </div>
      )}
      {!isLoading && listings.length > 0 && locatableCount === 0 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-background border rounded-full px-4 py-1.5 text-sm text-muted-foreground shadow whitespace-nowrap">
          {listings.length} {listings.length === 1 ? "flat" : "flats"} found,
          but map locations are unavailable.
        </div>
      )}
    </div>
  );
}
