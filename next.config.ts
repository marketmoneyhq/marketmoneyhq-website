import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/website-design",
        destination: "/business-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
