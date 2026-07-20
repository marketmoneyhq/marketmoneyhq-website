"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/constants";
import { MotionWrapper } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const PREVIEW_LENGTH = 280;

function getPreview(quote: string) {
  if (quote.length <= PREVIEW_LENGTH) {
    return { preview: quote, needsExpand: false };
  }

  const slice = quote.slice(0, PREVIEW_LENGTH);
  const lastSpace = slice.lastIndexOf(" ");
  const preview = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trimEnd();

  return { preview: `${preview}…`, needsExpand: true };
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const total = testimonials.length;
  const current = testimonials[index];
  const { preview, needsExpand } = getPreview(current.quote);
  const displayQuote = expanded || !needsExpand ? current.quote : preview;

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  const goTo = (next: number) => {
    setIndex((next + total) % total);
  };

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-custom">
        <MotionWrapper className="mb-12 md:mb-16">
          <SectionHeader
            badge="Testimonials"
            title="Trusted by learners worldwide"
            description="Real stories from students who chose mentorship, consistency, and long-term skill development."
          />
        </MotionWrapper>

        <MotionWrapper>
          <div className="relative max-w-4xl mx-auto">
            <Card hover={false} className="min-h-[320px] md:min-h-[360px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.author}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col flex-1"
                >
                  <blockquote className="mb-6 flex-1">
                    <p className="text-lg md:text-xl leading-relaxed text-charcoal dark:text-gray-200 whitespace-pre-line">
                      &ldquo;{displayQuote}&rdquo;
                    </p>
                  </blockquote>

                  {needsExpand && (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      className="self-start mb-6 text-sm font-semibold text-[#0088ff] hover:text-[#4db8ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088ff] rounded"
                    >
                      {expanded ? "Read less" : "Read more"}
                    </button>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-2 border-t border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#0088ff]/10 flex items-center justify-center text-[#0088ff] font-bold text-sm">
                        {current.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{current.author}</p>
                        <p className="text-gray-500 text-sm">{current.role}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 tabular-nums">
                      {index + 1} / {total}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className={cn(
                  "w-11 h-11 rounded-full border border-black/10 dark:border-white/15",
                  "flex items-center justify-center transition-all",
                  "hover:bg-[#0088ff]/10 hover:border-[#0088ff]/40 hover:text-[#0088ff]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088ff]"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.author}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial from ${item.author}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index
                        ? "w-6 bg-[#0088ff]"
                        : "w-1.5 bg-gray-300 dark:bg-white/20 hover:bg-[#0088ff]/50"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className={cn(
                  "w-11 h-11 rounded-full border border-black/10 dark:border-white/15",
                  "flex items-center justify-center transition-all",
                  "hover:bg-[#0088ff]/10 hover:border-[#0088ff]/40 hover:text-[#0088ff]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088ff]"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
