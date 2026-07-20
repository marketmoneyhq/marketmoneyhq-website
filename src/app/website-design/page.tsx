import type { Metadata } from "next";
import {
  Layout,
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
import { websiteServices } from "@/lib/constants";
import { createMetadata, createServiceSchema } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Website Design & Digital Marketing",
  description:
    "Custom websites, SEO, brand strategy, Google Business, sales funnels, lead generation, and AI automation for businesses that want to grow online.",
  path: "/website-design",
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

export default function WebsiteDesignPage() {
  const serviceSchema = createServiceSchema(
    "Website Design & Digital Marketing",
    "Custom website design, SEO optimization, brand strategy, and digital marketing services for growing businesses.",
    "https://marketmoneyhq.com/website-design"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        badge="Website Design"
        title="Digital experiences that convert"
        description="We build custom websites and digital marketing systems that attract the right audience, build trust, and drive measurable business growth."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              What We Offer
            </p>
            <h2 className="heading-lg mb-4">
              Everything your business needs online
            </h2>
            <p className="body-lg">
              From stunning custom websites to strategic marketing campaigns, we
              provide end-to-end digital solutions designed to help your business
              stand out and scale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.title}>
                  <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="body-md text-sm">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white dark:bg-charcoal-dark">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              Our Process
            </p>
            <h2 className="heading-lg mb-4">From concept to launch</h2>
            <p className="body-lg">
              A proven process that delivers results — transparent, collaborative,
              and focused on your business goals.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We learn about your business, audience, goals, and competitive landscape to build a strategy that fits.",
              },
              {
                step: "02",
                title: "Strategy & Design",
                description:
                  "Brand strategy, wireframes, and visual design — crafted to communicate your value and convert visitors.",
              },
              {
                step: "03",
                title: "Development",
                description:
                  "Clean, fast, mobile-responsive code built with modern technology and SEO best practices from day one.",
              },
              {
                step: "04",
                title: "Launch & Growth",
                description:
                  "Deployment, analytics setup, marketing integration, and ongoing optimization to keep your business growing.",
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-6">
                <span className="text-3xl font-semibold text-emerald/30 flex-shrink-0">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="body-md">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to elevate your online presence?"
        description="Let's discuss your project and create a digital strategy that drives real results for your business."
        primaryLabel="Start a Project"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
