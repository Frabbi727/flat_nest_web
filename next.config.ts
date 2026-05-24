import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flatnest.techrealify.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
