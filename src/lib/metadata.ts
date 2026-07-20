import type { Metadata } from "next";

const siteUrl = "https://marketmoneyhq.com";
const siteName = "Market Money HQ";
const defaultDescription =
  "Build skills. Create wealth. Live with freedom. Premium education and mentorship in trading, business, AI, and the digital economy.";

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
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} — ${siteConfig.tagline}`;
  const pageDescription = description ?? defaultDescription;
  const url = `${siteUrl}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    description: defaultDescription,
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer service",
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/resources?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
    url,
  };
}
