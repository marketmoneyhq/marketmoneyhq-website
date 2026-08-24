import type { Metadata } from "next";
import {
  Layout,
  Megaphone,
  Layers,
  Search,
  Palette,
  MapPin,
  Filter,
  UserPlus,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { websiteServices } from "@/lib/constants";
import { siteConfig } from "@/lib/metadata";
import {
  createBreadcrumbSchema,
  createMetadata,
  createServiceSchema,
} from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Business Development",
  description:
    "Grow your business with website development, digital marketing, or both. Custom sites, SEO, brand strategy, funnels, and lead generation from Market Money HQ.",
  path: "/business-development",
  keywords: [
    "business development",
    "website development",
    "digital marketing",
    "SEO services",
    "lead generation",
  ],
});

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Search,
  Palette,
  MapPin,
  Filter,
  UserPlus,
  Zap,
};

const offerPaths = [
  {
    icon: Layout,
    title: "Website Development",
    description:
      "A custom, conversion-focused website built to look premium, load fast, and turn visitors into leads and customers.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Digital marketing systems that attract the right audience — SEO, Google Business, funnels, content, and lead generation.",
  },
  {
    icon: Layers,
    title: "Website + Marketing",
    description:
      "The full stack: a high-performing website paired with marketing that drives traffic, trust, and measurable growth.",
  },
];

export default function BusinessDevelopmentPage() {
  const serviceSchema = createServiceSchema(
    "Business Development",
    "Website development, digital marketing, or both — practical growth services for entrepreneurs and small businesses.",
    "https://www.marketmoneyhq.com/business-development"
  );
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Business Development", path: "/business-development" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        badge="Business Development"
        title="Web Development & Marketing"
        description="Choose the path that fits your goals. We build custom websites, run digital marketing, or combine both into one growth system."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-emerald">
              How We Can Help
            </p>
            <h2 className="heading-lg mb-4">Pick What Your Business Needs</h2>
            <p className="body-lg">
              Not every business needs everything at once. Start with a website,
              focus on marketing, or build both together.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {offerPaths.map((offer) => {
              const Icon = offer.icon;
              return (
                <Card key={offer.title} className="h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10">
                    <Icon className="h-5 w-5 text-emerald" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{offer.title}</h3>
                  <p className="body-md mb-6 text-sm">{offer.description}</p>
                  <Button href={siteConfig.calendlyUrl} size="sm" variant="outline">
                    Discuss this option
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-charcoal-dark">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-emerald">
              Capabilities
            </p>
            <h2 className="heading-lg mb-4">
              Everything Your Business Needs Online
            </h2>
            <p className="body-lg">
              From custom websites to strategic marketing campaigns, we provide
              practical digital solutions designed to help your business stand
              out and scale.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websiteServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.title}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10">
                    <Icon className="h-5 w-5 text-emerald" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                  <p className="body-md text-sm">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-emerald">
              Our Process
            </p>
            <h2 className="heading-lg mb-4">From Concept To Growth</h2>
            <p className="body-lg">
              A clear process — transparent, collaborative, and focused on your
              business goals.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We learn about your business, audience, goals, and competitive landscape to recommend website, marketing, or both.",
              },
              {
                step: "02",
                title: "Strategy & Design",
                description:
                  "Brand strategy, wireframes, campaign plans, and creative direction crafted to communicate your value and convert.",
              },
              {
                step: "03",
                title: "Build & Launch",
                description:
                  "Clean development, marketing setup, and SEO best practices — shipped ready to attract and convert.",
              },
              {
                step: "04",
                title: "Optimize & Scale",
                description:
                  "Analytics, iteration, and ongoing improvements so your online presence keeps compounding.",
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-6">
                <span className="flex-shrink-0 text-3xl font-semibold text-emerald/30">
                  {step.step}
                </span>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="body-md">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready To Grow Your Business Online?"
        description="Tell us whether you need a website, marketing, or both — and we'll build a plan that fits."
        primaryLabel="Book a Consultation"
        secondaryLabel="Trading Education"
        secondaryHref="/trading"
      />
    </>
  );
}
