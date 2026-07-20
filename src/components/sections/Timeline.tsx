"use client";

import { timeline } from "@/lib/constants";
import { MotionWrapper, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Timeline() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <MotionWrapper className="mb-16">
          <SectionHeader
            badge="Our Journey"
            title="Built on experience, driven by purpose"
            description="From trading education to a comprehensive platform for financial independence."
          />
        </MotionWrapper>

        <div className="max-w-3xl mx-auto">
          {timeline.map((item, index) => (
            <MotionWrapper key={item.year} variants={fadeInUp} delay={index * 0.1}>
              <div className="relative pl-8 pb-12 last:pb-0">
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gray-200 dark:bg-charcoal-light" />
                )}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-emerald/10 border-2 border-emerald flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald" />
                </div>
                <p className="text-emerald text-sm font-medium mb-1">{item.year}</p>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="body-md">{item.description}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
