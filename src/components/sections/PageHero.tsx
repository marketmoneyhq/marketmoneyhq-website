"use client";

import { MotionWrapper, fadeInUp } from "@/lib/animations";
import { Badge } from "@/components/ui/Badge";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
}

export function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-premium dark:opacity-50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper variants={fadeInUp} className="max-w-3xl">
          {badge && (
            <Badge variant="emerald" className="mb-6">
              {badge}
            </Badge>
          )}
          <h1 className="heading-xl text-balance mb-6">{title}</h1>
          <p className="body-lg max-w-2xl">{description}</p>
        </MotionWrapper>
      </div>
    </section>
  );
}
