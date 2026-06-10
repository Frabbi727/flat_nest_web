"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

function DraggableMarker({
  position,
  onChange,
}: {
  position: [number, number];
  onChange: (lat: number, lng: number) => void;
}) {
  const [pos, setPos] = useState<L.LatLng>(L.latLng(position[0], position[1]));

  const marker = L.marker(pos, { draggable: true });

  useMapEvents({
    click(e) {
      setPos(e.latlng);
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      position={pos}
      draggable
      eventHandlers={{
        dragend(e) {
          const m = e.target as L.Marker;
          const latlng = m.getLatLng();
          setPos(latlng);
          onChange(latlng.lat, latlng.lng);
        },
      }}
    />
  );
}

export default function LocationMapPicker({
  lat,
  lng,
  onChange,
}: {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height: 200,
          borderRadius: 12,
          background: "#EEF0F4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "#8A8A8E" }}>Loading map…</p>
      </div>
    );
  }

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", height: 200 }}>
      <MapContainer center={[lat, lng]} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position={[lat, lng]} onChange={onChange} />
      </MapContainer>
    </div>
  );
}
