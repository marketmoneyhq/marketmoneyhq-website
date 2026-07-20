"use client";

import Link from "next/link";
import {
  TrendingUp,
  Building2,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { pillars } from "@/lib/constants";
import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Building2,
  Sparkles,
};

export function Pillars() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <MotionWrapper className="mb-16">
          <SectionHeader
            badge="Three Pillars"
            title="Everything connects to financial independence"
            description="Trading is one pillar. Business is another. AI and digital skills complete the foundation for lasting wealth."
          />
        </MotionWrapper>

        <MotionSection className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];
            return (
              <MotionWrapper key={pillar.id} variants={fadeInUp} delay={index * 0.1}>
                <Card className="h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="heading-md mb-3">{pillar.title}</h3>
                  <p className="body-md mb-6 flex-1">{pillar.description}</p>
                  <ul className="space-y-2 mb-6">
                    {pillar.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 text-emerald font-medium text-sm hover:gap-3 transition-all"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </MotionWrapper>
            );
          })}
        </MotionSection>
      </div>
    </section>
  );
}
