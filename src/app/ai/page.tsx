import type { Metadata } from "next";
import {
  Workflow,
  PenTool,
  Headphones,
  BarChart3,
  Clock,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Card } from "@/components/ui/Card";
import { aiFeatures } from "@/lib/constants";
import { createMetadata, createServiceSchema } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "AI Consulting & Solutions",
  description:
    "Practical AI consulting for entrepreneurs and small businesses. Automate workflows, enhance productivity, and build smarter businesses with AI.",
  path: "/ai",
});

const iconMap: Record<string, LucideIcon> = {
  Workflow,
  PenTool,
  Headphones,
  BarChart3,
  Clock,
  Lightbulb,
};

export default function AIPage() {
  const serviceSchema = createServiceSchema(
    "AI Consulting & Solutions",
    "Practical AI implementation for entrepreneurs — workflow automation, productivity tools, and business strategy.",
    "https://marketmoneyhq.com/ai"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        badge="AI Solutions"
        title="Work smarter with practical AI"
        description="We help entrepreneurs and small businesses implement AI tools that save time, automate repetitive work, and create competitive advantages — without the complexity."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              AI for Business
            </p>
            <h2 className="heading-lg mb-4">
              AI that actually helps your business
            </h2>
            <p className="body-lg">
              We cut through the AI hype to identify and implement tools that
              deliver real value — saving you hours each week and helping you
              scale without scaling your workload.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card key={feature.title}>
                  <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="body-md text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why AI Section */}
      <section className="section-padding bg-white dark:bg-charcoal-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
                Why Now
              </p>
              <h2 className="heading-lg mb-6">
                AI is the biggest productivity shift in decades
              </h2>
              <div className="space-y-4 body-md">
                <p>
                  Artificial intelligence isn&apos;t just for tech companies anymore.
                  Today, entrepreneurs and small business owners can leverage AI
                  to automate customer support, generate content, analyze data, and
                  streamline operations — often at a fraction of the cost of
                  hiring additional staff.
                </p>
                <p>
                  But the AI landscape is overwhelming. Hundreds of tools, constant
                  new releases, and exaggerated marketing make it hard to know
                  where to start. That&apos;s where we come in.
                </p>
                <p>
                  We assess your business, identify the highest-impact AI
                  opportunities, and help you implement solutions that integrate
                  seamlessly with your existing workflows.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Focus", label: "High-value work first" },
                { stat: "Clarity", label: "The right tools only" },
                { stat: "Systems", label: "Repeatable workflows" },
                { stat: "Growth", label: "Scale without burnout" },
              ].map((item) => (
                <Card key={item.label} hover={false} className="text-center">
                  <p className="text-2xl font-display font-bold text-emerald mb-1">
                    {item.stat}
                  </p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to leverage AI for your business?"
        description="Book a consultation to discover which AI tools and strategies can save you time and accelerate your growth."
        primaryLabel="Book AI Consultation"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
