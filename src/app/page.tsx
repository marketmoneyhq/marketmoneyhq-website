import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Pillars } from "@/components/sections/Pillars";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";
import { CTA } from "@/components/sections/CTA";
import { createFAQSchema } from "@/lib/metadata";
import { faqs } from "@/lib/constants";

export default function HomePage() {
  const faqSchema = createFAQSchema([...faqs]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Mission />
      <Pillars />
      <Services />
      <Pricing />
      <Stats />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  );
}
