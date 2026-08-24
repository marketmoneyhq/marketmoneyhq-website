"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HOLD_MS = 1700;
const OPEN_MS = 1100;

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

/** Shared stage so hold logo and curtain halves share the exact same centering */
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

export function IntroCurtain() {
  const [phase, setPhase] = useState<"hold" | "open" | "done">("hold");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setPhase("done");
      return;
    }

    document.documentElement.style.overflow = "hidden";

    // Fade in only after layout is settled — no position/scale movement
    const show = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setVisible(true));
    });

    const openTimer = window.setTimeout(() => setPhase("open"), HOLD_MS);
    const doneTimer = window.setTimeout(
      () => setPhase("done"),
      HOLD_MS + OPEN_MS + 150
    );

    return () => {
      window.cancelAnimationFrame(show);
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.style.overflow = "";
    }
  }, [phase]);

  if (phase === "done") return null;

  const opening = phase === "open";

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${opening ? "pointer-events-none" : ""}`}
      aria-hidden
    >
      {/* Curtains — already aligned as one full centered logo while closed */}
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
