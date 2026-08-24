"use client";

import { motion, type Variants } from "framer-motion";

/** Smooth ease used for scroll + post-curtain text rises */
export const revealEase = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Line-by-line rise from behind a mask (same feel as scroll-in words) */
export function MaskReveal({
  lines,
  className,
  delay = 0,
  stagger = 0.08,
  start = true,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  start?: boolean;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: start ? "0%" : "110%" }}
            transition={{
              duration: 1,
              delay: start ? delay + i * stagger : 0,
              ease: revealEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function MotionWrapper({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}
