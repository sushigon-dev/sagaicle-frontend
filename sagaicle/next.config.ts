import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sushigon-dev.github.io",
        pathname: "/sagaicle-docs/images/**",
      },
    ],
  },
};

export default nextConfig;
