import type { Metadata } from "next";
import {
  BookOpen,
  Shield,
  Brain,
  Users,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { tradingFeatures } from "@/lib/constants";
import {
  createBreadcrumbSchema,
  createMetadata,
  createServiceSchema,
  siteConfig,
} from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Trading Education",
  description:
    "Learn trading as a supplemental stream of income through structured education, risk management, psychology, and mentorship. Choose a self-paced PDF or In-Person / Online teaching with Market Money HQ.",
  path: "/trading",
  keywords: [
    "trading course",
    "stock market education",
    "trading mentor",
    "day trading education",
  ],
});

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Shield,
  Brain,
  Users,
};

export default function TradingPage() {
  const serviceSchema = createServiceSchema(
    "Trading Education & Mentorship",
    "Structured trading education focused on risk management, psychology, and building trading as a supplemental stream of income.",
    "https://www.marketmoneyhq.com/trading"
  );
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Trading Education", path: "/trading" },
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
        badge="Trading Education"
        title="Learn To Trade With Discipline, Not Desperation"
        description="Build trading skills as a supplemental stream of income — with education, risk management, and psychology first. Not a promise to quit your job overnight."
      />

      <section className="pb-4">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-[#0088ff]/20 bg-[#0088ff]/5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl font-bold mb-1">
                Two Ways To Learn
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Self-paced PDF for $250, or In-Person / Online mentorship with
                Market Money HQ for $5,000.
              </p>
            </div>
            <Button href="#pricing" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-900/30">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                Important Risk Disclosure
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-500/80">
                Trading involves substantial risk of loss and is not suitable for
                all investors. Past performance is not indicative of future
                results. No profits are guaranteed. Market Money HQ provides
                education and mentorship — not financial advice. Only trade with
                capital you can afford to lose. We teach trading as a
                supplemental skill — not as a guaranteed replacement for your
                primary income.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              Our Approach
            </p>
            <h2 className="heading-lg mb-4">
              Education That Builds Real Traders
            </h2>
            <p className="body-lg">
              We don&apos;t teach you to chase profits or treat trading like a
              get-rich-quick career swap. We teach you to manage risk, control
              emotions, and make informed decisions — skills that support a
              supplemental stream of income over time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradingFeatures.map((feature) => {
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

      <Pricing />

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              Curriculum
            </p>
            <h2 className="heading-lg mb-4">A Structured Path To Proficiency</h2>
            <p className="body-lg">
              Our curriculum progresses from fundamentals to advanced concepts,
              ensuring you build a solid foundation before taking on complexity.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                phase: "Phase 1",
                title: "Foundations",
                topics:
                  "Market basics, chart reading, order types, platform setup",
              },
              {
                phase: "Phase 2",
                title: "Strategy & Analysis",
                topics:
                  "Technical analysis, market structure, trade setups, journaling",
              },
              {
                phase: "Phase 3",
                title: "Risk & Psychology",
                topics:
                  "Position sizing, risk-reward, emotional control, discipline",
              },
              {
                phase: "Phase 4",
                title: "Advanced Application",
                topics:
                  "Advanced strategies, mentorship support, trade reviews",
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                className="glass-card glass-card-glow p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <span className="text-emerald font-medium text-sm whitespace-nowrap">
                  {phase.phase}
                </span>
                <div>
                  <h3 className="font-semibold mb-1">{phase.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {phase.topics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready To Build A Supplemental Trading Skill?"
        description="Start with the self-paced PDF, choose In-Person / Online mentorship with Market Money HQ, or book a consultation if you are still deciding."
        primaryLabel="View Pricing"
        primaryHref="#pricing"
        secondaryLabel="Book a Consultation"
        secondaryHref={siteConfig.calendlyUrl}
      />
    </>
  );
}
