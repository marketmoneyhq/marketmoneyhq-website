import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/website-design",
        destination: "/trading",
        permanent: true,
      },
      {
        source: "/business-development",
        destination: "/trading",
        permanent: true,
      },
      {
        source: "/ai",
        destination: "/trading",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/trading",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
