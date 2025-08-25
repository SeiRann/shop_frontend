import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://d2k3w6jukbe2xz.cloudfront.net/*")],
  },
  /* config options here */
};

export default nextConfig;
