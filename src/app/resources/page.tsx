import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceGrid } from "@/components/sections/ResourceGrid";
import { Newsletter } from "@/components/sections/Newsletter";
import { CTA } from "@/components/sections/CTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resources",
  description:
    "Free educational resources on trading, business development, AI, and building financial freedom. Practical guides for the modern digital economy.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        badge="Resources"
        title="Knowledge that compounds"
        description="Practical guides, tutorials, and insights on trading, business, AI, and the mindset for building lasting wealth. Education you can apply today."
      />
      <ResourceGrid />
      <Newsletter />
      <CTA
        title="Want personalized guidance?"
        description="Our resources are a great starting point. For tailored mentorship and hands-on support, book a consultation with our team."
        primaryLabel="Book a Consultation"
        secondaryLabel="Explore Programs"
        secondaryHref="/services"
      />
    </>
  );
}
