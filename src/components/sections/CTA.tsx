"use client";

import { ArrowRight } from "lucide-react";
import { MotionWrapper } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/metadata";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({
  title = "Ready to build skills that create freedom?",
  description = "Book a free consultation and discover how Market Money HQ can help you develop the skills, knowledge, and mindset for financial independence.",
  primaryLabel = "Book a Consultation",
  primaryHref = siteConfig.calendlyUrl,
  secondaryLabel = "Explore Programs",
  secondaryHref = "/services",
}: CTAProps) {
  return (
    <section className="section-padding bg-white dark:bg-charcoal-dark">
      <div className="container-custom">
        <MotionWrapper>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg text-balance mb-6">{title}</h2>
            <p className="body-lg mb-10">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href={primaryHref} size="lg">
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button href={secondaryHref} variant="outline" size="lg">
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
