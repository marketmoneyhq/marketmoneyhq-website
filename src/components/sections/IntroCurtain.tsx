"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useIntroReveal } from "@/components/providers/IntroReveal";

const HOLD_MS = 1100;
const OPEN_MS = 900;
const BOOT_ID = "mmhq-intro-boot";

function Logo() {
  return (
    <div
      className="relative aspect-square w-[min(78vmin,560px)] shrink-0"
      style={{ filter: "drop-shadow(0 0 40px rgba(0,136,255,0.5))" }}
    >
      <Image
        src="/logo.png"
        alt="Market Money HQ"
        fill
        priority
        sizes="560px"
        className="object-contain"
      />
    </div>
  );
}

function LogoStage({ offset = false }: { offset?: boolean }) {
  return (
    <div
      className="flex h-full w-[200%] items-center justify-center"
      style={offset ? { marginLeft: "-100%" } : undefined}
    >
      <Logo />
    </div>
  );
}

function clearIntroLock() {
  // Boot node is script-injected (not React-managed) — safe to remove
  document.getElementById(BOOT_ID)?.remove();
  document.documentElement.classList.remove(
    "mmhq-intro-lock",
    "mmhq-intro-pending"
  );
  document.documentElement.style.overflow = "";
}

export function IntroCurtain() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { reveal } = useIntroReveal();
  const playedRef = useRef(!isHome);
  const [phase, setPhase] = useState<"hold" | "open" | "done">(() =>
    isHome ? "hold" : "done"
  );

  useEffect(() => {
    if (!isHome) {
      clearIntroLock();
      reveal();
      playedRef.current = true;
      setPhase("done");
      return;
    }

    if (playedRef.current) {
      clearIntroLock();
      reveal();
      setPhase("done");
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      clearIntroLock();
      reveal();
      playedRef.current = true;
      setPhase("done");
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.getElementById(BOOT_ID)?.remove();

    let cancelled = false;

    const openTimer = window.setTimeout(() => {
      if (!cancelled) setPhase("open");
    }, HOLD_MS);

    const revealTimer = window.setTimeout(() => {
      if (!cancelled) reveal();
    }, HOLD_MS + OPEN_MS);

    const doneTimer = window.setTimeout(() => {
      if (!cancelled) {
        playedRef.current = true;
        setPhase("done");
      }
    }, HOLD_MS + OPEN_MS + 40);

    return () => {
      cancelled = true;
      window.clearTimeout(openTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reveal, isHome]);

  useEffect(() => {
    if (phase === "done") {
      clearIntroLock();
    }
  }, [phase]);

  if (!isHome || phase === "done") return null;

  const opening = phase === "open";

  return (
    <div
      className={`fixed inset-0 z-[200] ${opening ? "pointer-events-none" : ""}`}
      aria-hidden
    >
      <div className="absolute inset-0 flex overflow-hidden">
        <div
          className="relative h-full w-1/2 overflow-hidden bg-black will-change-transform"
          style={{
            transform: opening ? "translate3d(-100%,0,0)" : "translate3d(0,0,0)",
            transition: `transform ${OPEN_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          }}
        >
          <LogoStage />
        </div>

        <div
          className="relative h-full w-1/2 overflow-hidden bg-black will-change-transform"
          style={{
            transform: opening ? "translate3d(100%,0,0)" : "translate3d(0,0,0)",
            transition: `transform ${OPEN_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          }}
        >
          <LogoStage offset />
        </div>
      </div>
    </div>
  );
}
