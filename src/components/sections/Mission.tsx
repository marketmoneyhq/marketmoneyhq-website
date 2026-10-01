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
              title="Trading Skills As A Supplemental Advantage"
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
                We believe trading works best as a supplemental stream of income
                — something you build alongside your life and work, with risk
                management and process first. This is not about promising that
                trading will replace your job overnight.
              </p>
              <p>
                Our focus is trading education: structured curriculum, risk
                management, trading psychology, and mentorship. We teach you how
                to think — not just what to trade.
              </p>
              <p className="text-charcoal dark:text-white font-medium">
                This isn&apos;t about getting rich overnight. It&apos;s about
                building real trading skills, making smarter decisions, and
                creating an extra layer of opportunity over time.
              </p>
            </div>
          </MotionWrapper>
        </MotionSection>
      </div>
    </section>
  );
}
