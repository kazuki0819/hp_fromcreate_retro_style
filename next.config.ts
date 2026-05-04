import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow",
        },
      ],
    },
  ],
};

export default nextConfig;
