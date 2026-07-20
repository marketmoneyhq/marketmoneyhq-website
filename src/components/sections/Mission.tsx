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
              title="Skills that create freedom, not shortcuts"
              align="left"
            />
          </MotionWrapper>

          <MotionWrapper variants={fadeInUp} delay={0.2}>
            <div className="space-y-6 body-md">
              <p>
                Market Money HQ exists to help everyday people develop the skills,
                knowledge, and mindset needed to create income in the digital economy.
              </p>
              <p>
                We believe financial freedom, time freedom, and location freedom become
                possible when you learn how to make your money work for you instead of
                constantly working for money.
              </p>
              <p>
                Our foundation begins with trading, but our vision extends far beyond
                the charts. Through education, mentorship, investing, business
                development, website design, digital marketing, and emerging
                technologies like AI, we equip people with practical tools to build
                wealth and take greater control of their future.
              </p>
              <p className="text-charcoal dark:text-white font-medium">
                This isn&apos;t about getting rich overnight. It&apos;s about building
                real skills, making smarter financial decisions, and creating a life
                with more freedom, flexibility, and abundance.
              </p>
            </div>
          </MotionWrapper>
        </MotionSection>
      </div>
    </section>
  );
}
