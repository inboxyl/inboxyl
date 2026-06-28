import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewareExperimental: false,
  },
};

export default nextConfig;
