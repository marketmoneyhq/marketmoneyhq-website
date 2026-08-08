import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/trading/purchase"],
      },
    ],
    sitemap: "https://www.marketmoneyhq.com/sitemap.xml",
    host: "https://www.marketmoneyhq.com",
  };
}
