import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      blog: {
        stale: 60 * 10,
        revalidate: 60 * 10,
        expire: 60 * 10,
      },
    },
  },
};

export default nextConfig;
