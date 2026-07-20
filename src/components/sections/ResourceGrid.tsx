"use client";

import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { resources, resourceCategories } from "@/lib/constants";
import { MotionWrapper, MotionSection, fadeInUp } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ResourceGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <MotionWrapper className="mb-12">
          <SectionHeader
            badge="Resources"
            title="Learn at your own pace"
            description="Practical guides on trading, business, AI, and the mindset for building lasting wealth."
          />
        </MotionWrapper>

        <MotionWrapper className="flex flex-wrap justify-center gap-2 mb-12">
          {resourceCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-[#0088ff] text-white"
                  : "bg-gray-100 dark:bg-charcoal-light text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-charcoal"
              )}
            >
              {category}
            </button>
          ))}
        </MotionWrapper>

        <MotionSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource, index) => (
            <MotionWrapper key={resource.title} variants={fadeInUp} delay={index * 0.08}>
              <Card className="h-full group cursor-pointer">
                <Badge variant="emerald" className="mb-4">
                  {resource.category}
                </Badge>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald transition-colors">
                  {resource.title}
                </h3>
                <p className="body-md text-sm mb-4 flex-1">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {resource.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </MotionWrapper>
          ))}
        </MotionSection>
      </div>
    </section>
  );
}
