"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const QUESTIONNAIRE_STORAGE_KEY = "mmhq-questionnaire-done";

type IntroRevealContextValue = {
  revealed: boolean;
  reveal: () => void;
  siteUnlocked: boolean;
  unlockSite: () => void;
};

const IntroRevealContext = createContext<IntroRevealContextValue>({
  revealed: false,
  reveal: () => {},
  siteUnlocked: false,
  unlockSite: () => {},
});

export function useIntroReveal() {
  return useContext(IntroRevealContext);
}

function readQuestionnaireDone() {
  try {
    return sessionStorage.getItem(QUESTIONNAIRE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function IntroRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const [siteUnlocked, setSiteUnlocked] = useState(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    document.documentElement.classList.remove("mmhq-intro-pending");
    document.documentElement.classList.add("mmhq-content-revealed");
  }, []);

  const unlockSite = useCallback(() => {
    try {
      sessionStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setSiteUnlocked(true);
  }, []);

  useEffect(() => {
    if (readQuestionnaireDone()) {
      setSiteUnlocked(true);
    }
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
    () => ({ revealed, reveal, siteUnlocked, unlockSite }),
    [revealed, reveal, siteUnlocked, unlockSite]
  );

  return (
    <IntroRevealContext.Provider value={value}>
      {children}
    </IntroRevealContext.Provider>
  );
}

/** Header/main/footer — only mounts after the questionnaire is completed */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const { siteUnlocked } = useIntroReveal();

  if (!siteUnlocked) {
    return (
      <div
        id="mmhq-site-pending"
        className="fixed inset-0 z-0 bg-black"
        aria-hidden
      />
    );
  }

  return <div id="mmhq-site">{children}</div>;
}
