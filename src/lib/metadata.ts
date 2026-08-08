import type { Metadata } from "next";

const siteUrl = "https://www.marketmoneyhq.com";
const siteName = "Market Money HQ";
const defaultDescription =
  "Build skills. Create wealth. Live with freedom. Premium education and mentorship in trading, business, AI, and the digital economy.";

const defaultKeywords = [
  "Market Money HQ",
  "trading education",
  "trading mentorship",
  "financial education",
  "learn to trade",
  "risk management",
  "trading psychology",
  "website design",
  "digital marketing",
  "AI consulting",
  "business development",
  "financial freedom",
];

export const siteConfig = {
  name: siteName,
  tagline: "Build Skills. Create Wealth. Live with Freedom.",
  description: defaultDescription,
  url: siteUrl,
  email: "marketmoneyhq@gmail.com",
  calendlyUrl: "https://calendly.com/marketmoneyhq",
  stripePaymentUrl: "https://buy.stripe.com/eVq8wRaX9aSKa7CeFy6c002",
  tradingAgreementPath: "/agreements/trading-disclosure.pdf",
  social: {
    instagram: "https://www.instagram.com/MarketMoneyHQ",
    youtube: "https://youtube.com/@marketmoneyhq",
  },
};

export function createMetadata({
  title,
  description,
  path = "",
  image = "/og-image.svg",
  keywords,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} — ${siteConfig.tagline}`;
  const pageDescription = description ?? defaultDescription;
  const url = `${siteUrl}${path}`;
  const mergedKeywords = [...defaultKeywords, ...(keywords ?? [])];

  return {
    // Short title so root layout `title.template` can append brand once.
    // Home (no title) uses an absolute title to avoid the template.
    title: title
      ? title
      : { absolute: `${siteName} — ${siteConfig.tagline}` },
    description: pageDescription,
    keywords: mergedKeywords,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "education",
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName,
      title: pageTitle,
      description: pageDescription,
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    legalName: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    description: defaultDescription,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
}

export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    inLanguage: "en-US",
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createServiceSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    areaServed: "Worldwide",
    url,
  };
}

export function createBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
