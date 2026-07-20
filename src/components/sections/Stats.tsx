"use client";

import { stats } from "@/lib/constants";
import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Stats() {
  return (
    <section className="section-padding bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/20 via-transparent to-emerald/5" />
      <div className="container-custom relative z-10">
        <MotionSection className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <MotionWrapper
              key={stat.label}
              variants={fadeInUp}
              delay={index * 0.1}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight block mb-2"
              />
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </MotionWrapper>
          ))}
        </MotionSection>
      </div>
    </section>
  );
}
