"use client";

import Link from "next/link";
import {
  LineChart,
  Globe,
  Megaphone,
  Bot,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/constants";
import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

const iconMap: Record<string, LucideIcon> = {
  LineChart,
  Globe,
  Megaphone,
  Bot,
  Briefcase,
};

export function Services() {
  return (
    <section className="section-padding bg-white dark:bg-charcoal-dark">
      <div className="container-custom">
        <MotionWrapper className="mb-16">
          <SectionHeader
            badge="Our Services"
            title="Practical solutions for real growth"
            description="From trading mentorship to AI consulting, we provide the education and services you need to build lasting wealth."
          />
        </MotionWrapper>

        <MotionSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <MotionWrapper key={service.id} variants={fadeInUp} delay={index * 0.08}>
                <Link href={service.href}>
                  <Card className="h-full group">
                    <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center mb-5 group-hover:bg-emerald/15 transition-colors">
                      <Icon className="w-5 h-5 text-emerald group-hover:text-emerald-light transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="body-md text-sm mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-emerald text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Card>
                </Link>
              </MotionWrapper>
            );
          })}
        </MotionSection>

        <MotionWrapper className="text-center mt-12" delay={0.3}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-emerald font-medium hover:gap-3 transition-all"
          >
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionWrapper>
      </div>
    </section>
  );
}
