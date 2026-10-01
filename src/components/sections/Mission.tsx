"use client";

import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Mission() {
  return (
    <section className="section-padding bg-white dark:bg-charcoal-dark">
      <div className="container-custom">
        <MotionSection className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <MotionWrapper variants={fadeInUp}>
            <SectionHeader
              badge="Our Mission"
              title="Trading Skills That Create Freedom, Not Shortcuts"
              align="left"
            />
          </MotionWrapper>

          <MotionWrapper variants={fadeInUp} delay={0.2}>
            <div className="space-y-6 body-md">
              <p>
                Market Money HQ exists to help everyday people develop the
                trading skills, discipline, and mindset needed to navigate markets
                with clarity — not hype.
              </p>
              <p>
                We believe financial freedom becomes more possible when you learn
                how markets work, how to manage risk, and how to make decisions
                based on process instead of emotion.
              </p>
              <p>
                Our focus is trading education: structured curriculum, risk
                management, trading psychology, and live mentorship. We teach you
                how to think — not just what to trade.
              </p>
              <p className="text-charcoal dark:text-white font-medium">
                This isn&apos;t about getting rich overnight. It&apos;s about
                building real trading skills, making smarter decisions, and
                creating a foundation for greater freedom over time.
              </p>
            </div>
          </MotionWrapper>
        </MotionSection>
      </div>
    </section>
  );
}
