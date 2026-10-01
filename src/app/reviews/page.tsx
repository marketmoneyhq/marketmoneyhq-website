import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import {
  createBreadcrumbSchema,
  createMetadata,
  siteConfig,
} from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Reviews",
  description:
    "Read student reviews of Market Money HQ trading education and mentorship — real feedback on learning, discipline, and supplemental trading skills.",
  path: "/reviews",
  keywords: [
    "Market Money HQ reviews",
    "trading mentorship reviews",
    "trading education reviews",
  ],
});

export default function ReviewsPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        badge="Reviews"
        title="What Students Are Saying"
        description="Honest feedback from people who learned trading skills with Market Money HQ — focused on education, discipline, and building a supplemental stream of income."
      />
      <Testimonials />
      <CTA
        title="Ready To Start Learning?"
        description="Browse pricing for the self-paced PDF or In-Person / Online mentorship, or book a consultation if you are still deciding."
        primaryLabel="View Pricing"
        primaryHref="/trading#pricing"
        secondaryLabel="Book a Consultation"
        secondaryHref={siteConfig.calendlyUrl}
      />
    </>
  );
}
