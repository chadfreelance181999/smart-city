import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0, // Forces dynamic pages to fetch fresh data on back/forward actions
      static: 180 // Keeps static pages cached for 3 minutes (adjust as needed)
    }
  }
};

export default nextConfig;
