import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceGrid } from "@/components/sections/ResourceGrid";
import { Newsletter } from "@/components/sections/Newsletter";
import { CTA } from "@/components/sections/CTA";
import { createBreadcrumbSchema, createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resources",
  description:
    "Free educational resources on trading, risk management, psychology, and building lasting skill in the markets.",
  path: "/resources",
  keywords: [
    "trading resources",
    "financial education guides",
    "risk management guides",
  ],
});

export default function ResourcesPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        badge="Resources"
        title="Knowledge That Compounds"
        description="Practical guides and insights on trading, risk management, psychology, and the mindset for building lasting skill. Education you can apply today."
      />
      <ResourceGrid />
      <Newsletter />
      <CTA
        title="Want Personalized Guidance?"
        description="Our resources are a great starting point. For tailored trading mentorship and hands-on support, book a consultation with our team."
        primaryLabel="Book a Consultation"
        secondaryLabel="Explore Trading"
        secondaryHref="/trading"
      />
    </>
  );
}
