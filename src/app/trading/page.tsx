import type { Metadata } from "next";
import {
  BookOpen,
  Shield,
  Brain,
  Users,
  AlertTriangle,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { tradingFeatures } from "@/lib/constants";
import { createMetadata, createServiceSchema, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Trading Education",
  description:
    "Learn trading with discipline through structured education, risk management, trading psychology, and live mentorship. No hype — just real skills.",
  path: "/trading",
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
    "Structured trading education with emphasis on risk management, psychology, and long-term skill development.",
    "https://marketmoneyhq.com/trading"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        badge="Trading Education"
        title="Learn to trade with discipline, not desperation"
        description="Our trading program focuses on education, risk management, and psychology — building the foundation for informed decisions in any market condition."
      />

      <section className="pb-4">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-[#0088ff]/20 bg-[#0088ff]/5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl font-bold mb-1">
                Ready to enroll?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sign the Trading Disclosure Form, then complete your one-time
                payment securely with Stripe.
              </p>
            </div>
            <Button href="/trading/purchase" size="lg">
              <ShoppingCart className="h-4 w-4" />
              Purchase
            </Button>
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="py-8 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-900/30">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                Important Risk Disclosure
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-500/80">
                Trading involves substantial risk of loss and is not suitable for all
                investors. Past performance is not indicative of future results. No
                profits are guaranteed. Market Money HQ provides education and
                mentorship — not financial advice. Only trade with capital you can
                afford to lose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              Our Approach
            </p>
            <h2 className="heading-lg mb-4">
              Education that builds real traders
            </h2>
            <p className="body-lg">
              We don&apos;t teach you to chase profits. We teach you to manage risk,
              control emotions, and make informed decisions — the skills that
              separate professionals from gamblers.
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

      {/* Curriculum Overview */}
      <section className="section-padding bg-white dark:bg-charcoal-dark">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
              Curriculum
            </p>
            <h2 className="heading-lg mb-4">A structured path to proficiency</h2>
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
                topics: "Market basics, chart reading, order types, platform setup",
              },
              {
                phase: "Phase 2",
                title: "Strategy & Analysis",
                topics: "Technical analysis, market structure, trade setups, journaling",
              },
              {
                phase: "Phase 3",
                title: "Risk & Psychology",
                topics: "Position sizing, risk-reward, emotional control, discipline",
              },
              {
                phase: "Phase 4",
                title: "Advanced & Live Trading",
                topics: "Advanced strategies, live mentorship, trade reviews",
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                className="glass-card p-6 flex flex-col sm:flex-row sm:items-center gap-4"
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
        title="Ready to learn trading the right way?"
        description="Purchase Trading Education after signing the disclosure, or book a free consultation to discuss fit first."
        primaryLabel="Purchase Trading Education"
        primaryHref="/trading/purchase"
        secondaryLabel="Book a Consultation"
        secondaryHref={siteConfig.calendlyUrl}
      />
    </>
  );
}
