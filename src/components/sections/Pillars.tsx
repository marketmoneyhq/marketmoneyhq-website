"use client";

import Link from "next/link";
import {
  BookOpen,
  Shield,
  Brain,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { pillars } from "@/lib/constants";
import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Shield,
  Brain,
  Users,
};

export function Pillars() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <MotionWrapper className="mb-16">
          <SectionHeader
            badge="Trading Education"
            title="What We Teach"
            description="A focused path to trading competence — education, risk, psychology, and mentorship working together."
          />
        </MotionWrapper>

        <MotionSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];
            return (
              <MotionWrapper key={pillar.id} variants={fadeInUp} delay={index * 0.1}>
                <Link
                  href={pillar.href}
                  className="group glass-card glass-card-glow flex h-full flex-col p-6 md:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(0,136,255,0.45)]">
                    <Icon className="h-6 w-6 text-emerald" />
                  </div>
                  <h3 className="heading-md mb-3">{pillar.title}</h3>
                  <p className="body-md mb-6 flex-1">{pillar.description}</p>
                  <ul className="mb-6 space-y-2">
                    {pillar.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald transition-all group-hover:gap-3">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </MotionWrapper>
            );
          })}
        </MotionSection>
      </div>
    </section>
  );
}
