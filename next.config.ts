import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" }
    ],
    unoptimized: true
  }
};

export default nextConfig;
