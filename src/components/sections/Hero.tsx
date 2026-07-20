"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/metadata";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 55% at 75% 15%, rgba(0,136,255,0.28), transparent 55%),
            radial-gradient(ellipse 55% 45% at 10% 85%, rgba(0,102,214,0.18), transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,205,213,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,205,213,0.45) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="container-custom relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-32 md:pb-28">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0.01, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight"
          >
            Market Money HQ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] text-balance mb-6"
          >
            Build Skills. Create Wealth.{" "}
            <span className="text-emerald-light">Live with Freedom.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl text-silver max-w-xl leading-relaxed mb-10"
          >
            Premium education and mentorship for trading, business, and AI —
            helping everyday people build financial independence through real
            skills, not shortcuts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button href={siteConfig.calendlyUrl} size="lg">
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-silver/30 text-white hover:bg-white/10 hover:border-silver/50"
            >
              Our Mission
            </Button>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden
      >
        <div className="w-5 h-9 rounded-full border border-silver/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-emerald-light"
          />
        </div>
      </div>
    </section>
  );
}
