"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/constants";
import { MotionWrapper } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white dark:bg-charcoal-dark">
      <div className="container-custom max-w-3xl">
        <MotionWrapper className="mb-16">
          <SectionHeader
            badge="FAQ"
            title="Common questions"
            description="Everything you need to know about Market Money HQ and our approach to education."
          />
        </MotionWrapper>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <MotionWrapper key={faq.question} delay={index * 0.05}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-charcoal-light flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="body-md">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
