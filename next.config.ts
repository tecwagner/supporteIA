import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — compatible with Firebase Hosting Spark plan.
  // No Server Actions, API Routes, or dynamic server rendering.
  output: "export",

  // Trailing slash ensures correct static file routing on Firebase Hosting.
  trailingSlash: true,

  // Disable image optimization (requires server; incompatible with static export).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
