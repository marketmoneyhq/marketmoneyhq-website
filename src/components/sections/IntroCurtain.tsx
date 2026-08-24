"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  document.getElementById(BOOT_ID)?.remove();
  document.documentElement.classList.remove(
    "mmhq-intro-lock",
    "mmhq-intro-pending"
  );
  document.documentElement.style.overflow = "";
}

export function IntroCurtain() {
  const { reveal } = useIntroReveal();
  const [phase, setPhase] = useState<"hold" | "open" | "done">("hold");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      clearIntroLock();
      reveal();
      setPhase("done");
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.getElementById(BOOT_ID)?.remove();

    const openTimer = window.setTimeout(() => {
      setPhase("open");
    }, HOLD_MS);

    // Reveal after curtains finish parting — then hero lines rise in
    const revealTimer = window.setTimeout(() => {
      reveal();
    }, HOLD_MS + OPEN_MS);

    const doneTimer = window.setTimeout(
      () => setPhase("done"),
      HOLD_MS + OPEN_MS + 40
    );

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      clearIntroLock();
    };
  }, [reveal]);

  useEffect(() => {
    if (phase === "done") {
      clearIntroLock();
    }
  }, [phase]);

  if (phase === "done") return null;

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
