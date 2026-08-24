"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

type IntroRevealContextValue = {
  revealed: boolean;
  reveal: () => void;
};

const IntroRevealContext = createContext<IntroRevealContextValue>({
  revealed: false,
  reveal: () => {},
});

export function useIntroReveal() {
  return useContext(IntroRevealContext);
}

export function IntroRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    document.documentElement.classList.remove("mmhq-intro-pending");
    document.documentElement.classList.add("mmhq-content-revealed");
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      reveal();
    }
  }, [reveal]);

  const value = useMemo(
    () => ({ revealed, reveal }),
    [revealed, reveal]
  );

  return (
    <IntroRevealContext.Provider value={value}>
      {children}
    </IntroRevealContext.Provider>
  );
}

/** Wraps header/main/footer — rises in smoothly when the intro reveals the site */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const { revealed } = useIntroReveal();

  return (
    <motion.div
      id="mmhq-site"
      initial={false}
      animate={
        revealed
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
