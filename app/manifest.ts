import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlatNest — Find Your Perfect Home",
    short_name: "FlatNest",
    description: "Browse and rent apartments in Bangladesh",
    start_url: "/",
    display: "standalone",
    background_color: "#E6F0F1",
    theme_color: "#1A6B72",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
