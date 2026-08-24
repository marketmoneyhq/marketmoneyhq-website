"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

/** Wraps header/main/footer — stays in place so hero can do the line rises */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div id="mmhq-site">{children}</div>;
}
