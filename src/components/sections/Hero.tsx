"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/metadata";
import { HeroPhoneChart } from "@/components/sections/HeroPhoneChart";
import { useIntroReveal } from "@/components/providers/IntroReveal";
import { MaskReveal, revealEase } from "@/lib/animations";

export function Hero() {
  const { revealed } = useIntroReveal();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 78% 42%, rgba(0,136,255,0.22), transparent 58%),
            radial-gradient(ellipse 50% 40% at 12% 80%, rgba(0,102,214,0.14), transparent 55%),
            linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)
          `,
        }}
      />

      <div className="container-custom relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-32 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <div className="max-w-2xl">
            <p className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
              <MaskReveal
                start={revealed}
                delay={0}
                lines={["Market Money HQ"]}
              />
            </p>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl text-white tracking-tight leading-[1.15] mb-6">
              <MaskReveal
                start={revealed}
                delay={0.1}
                stagger={0.08}
                lines={["Build Skills.", "Create Wealth."]}
              />
              <motion.span
                className="block whitespace-nowrap text-emerald-light"
                initial={{ opacity: 0, y: 22 }}
                animate={
                  revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
                }
                transition={{
                  duration: 0.85,
                  delay: revealed ? 0.26 : 0,
                  ease: revealEase,
                }}
              >
                Live with Freedom!
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={
                revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.7,
                delay: revealed ? 0.28 : 0,
                ease: revealEase,
              }}
              className="text-lg md:text-xl text-silver max-w-xl leading-relaxed mb-10"
            >
              Premium education and mentorship for trading, business, and AI —
              helping everyday people build financial independence through real
              skills, not shortcuts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.7,
                delay: revealed ? 0.38 : 0,
                ease: revealEase,
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.7,
              delay: revealed ? 0.45 : 0,
              ease: revealEase,
            }}
            className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none lg:h-[560px] xl:h-[600px]"
          >
            {revealed ? <HeroPhoneChart /> : null}
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10"
        aria-hidden
      >
        <div className="w-5 h-9 rounded-full border border-silver/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={revealed ? { y: [0, 10, 0] } : { y: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-emerald-light"
          />
        </div>
      </div>
    </section>
  );
}
