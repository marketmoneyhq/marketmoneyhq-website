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
    sitemap: "https://marketmoneyhq.com/sitemap.xml",
    host: "https://marketmoneyhq.com",
  };
}
