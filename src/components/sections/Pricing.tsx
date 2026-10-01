"use client";

import { Check, Users, FileText } from "lucide-react";
import { pricingPlans } from "@/lib/constants";
import { siteConfig } from "@/lib/metadata";
import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const iconMap = {
  pdf: FileText,
  mentorship: Users,
} as const;

export function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-white dark:bg-charcoal-dark">
      <div className="container-custom">
        <MotionWrapper className="mb-16">
          <SectionHeader
            badge="Pricing"
            title="Choose How You Want To Learn"
            description="Start with a self-paced PDF, or choose In-Person / Online mentorship for one-on-one teaching with Stefan — wherever you are."
          />
        </MotionWrapper>

        <MotionSection className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = iconMap[plan.id];
            const href =
              plan.ctaHref === "calendly"
                ? siteConfig.calendlyUrl
                : plan.ctaHref;

            return (
              <MotionWrapper
                key={plan.id}
                variants={fadeInUp}
                delay={index * 0.1}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-6 md:p-8",
                    plan.highlighted
                      ? "border-[#0088ff]/40 bg-[#0088ff]/5 shadow-[0_0_40px_rgba(0,136,255,0.12)]"
                      : "border-gray-200/80 bg-surface/60 dark:border-white/10 dark:bg-charcoal/40"
                  )}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald">
                        {plan.badge}
                      </p>
                      <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald/10">
                      <Icon className="h-5 w-5 text-emerald" />
                    </div>
                  </div>

                  <p className="mb-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
                    {plan.priceLabel}
                    <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      one-time
                    </span>
                  </p>

                  <p className="body-md mb-4">{plan.summary}</p>
                  <p className="mb-8 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={href}
                    size="lg"
                    variant={plan.highlighted ? "primary" : "outline"}
                    className="w-full justify-center"
                  >
                    {plan.ctaLabel}
                  </Button>
                </div>
              </MotionWrapper>
            );
          })}
        </MotionSection>

        <MotionWrapper className="mx-auto mt-10 max-w-2xl text-center" delay={0.2}>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Trading involves substantial risk of loss. Education only — no
            profits are guaranteed. Trading is taught as a supplemental skill,
            not a promise to replace your income. The PDF is self-paced;
            In-Person / Online includes direct access to Stefan for questions
            and guidance.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}
