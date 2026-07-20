"use client";

import { ArrowRight } from "lucide-react";
import { MotionWrapper } from "@/lib/animations";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <MotionWrapper>
          <div className="relative rounded-3xl overflow-hidden bg-black p-8 md:p-12 lg:p-16 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald/25 to-transparent" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="heading-md text-white mb-4">
                Insights for building wealth
              </h2>
              <p className="text-gray-400 mb-8">
                Join our newsletter for practical education on trading, business,
                AI, and the digital economy. No hype, just value.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald text-sm"
                  aria-label="Email address"
                  required
                />
                <Button type="submit" size="md" className="whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-gray-500 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
