"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  LineChart,
  Briefcase,
  History,
  MoreHorizontal,
  Menu,
} from "lucide-react";

const START_VALUE = 54_000;
const END_VALUE = 1_000_000;
const DURATION_MS = 14_000;
const HOLD_MS = 4_000;
const TIMEFRAMES = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const;

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Full-width chart whose height climbs with progress (0→1). */
function buildChartPath(progress: number, width: number, height: number) {
  const points = 48;
  const pts: { x: number; y: number }[] = [];
  const p = Math.max(0.04, Math.min(1, progress));

  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const jagged =
      Math.sin(t * 16 + progress * 2) * 0.028 +
      Math.sin(t * 37) * 0.014 -
      Math.cos(t * 8) * 0.02;
    const dip = t > 0.32 && t < 0.42 ? 0.05 : 0;
    // Start near bottom; rise toward top as progress and t increase
    const rise = t * 0.78 * p;
    const yNorm = Math.min(0.92, Math.max(0.08, 0.9 - rise + jagged + dip * p));
    pts.push({ x: t * width, y: yNorm * height });
  }

  const line = pts
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
    .join(" ");
  const last = pts[pts.length - 1];
  const area = `${line} L ${last.x.toFixed(2)} ${height} L 0 ${height} Z`;
  return { line, area, last };
}

export function HeroPhoneChart() {
  const [value, setValue] = useState(START_VALUE);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let start: number | null = null;
    let alive = true;

    const runCycle = () => {
      start = null;
      setProgress(0);
      setValue(START_VALUE);

      const tick = (now: number) => {
        if (!alive) return;
        if (start === null) start = now;
        const raw = Math.min(1, (now - start) / DURATION_MS);
        const eased = 1 - Math.pow(1 - raw, 2);
        setProgress(eased);
        setValue(START_VALUE + (END_VALUE - START_VALUE) * eased);

        if (raw < 1) {
          raf = requestAnimationFrame(tick);
          return;
        }

        // Hold at $540,000, then loop
        holdTimer = setTimeout(() => {
          if (alive) runCycle();
        }, HOLD_MS);
      };

      raf = requestAnimationFrame(tick);
    };

    runCycle();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, []);

  const gain = value - START_VALUE;
  const gainPct = (gain / START_VALUE) * 100;
  const chart = useMemo(() => buildChartPath(progress, 280, 120), [progress]);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[420px] items-center justify-center lg:max-w-none">
      <motion.div
        initial={{ opacity: 0.01, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[230px] sm:w-[260px] md:w-[280px]"
      >
        <div
          className="relative rounded-[2.35rem] border border-white/15 bg-[#0a0a0a] p-[9px]"
          style={{
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.65), 0 0 40px rgba(0,136,255,0.18)",
          }}
        >
          <div className="relative overflow-hidden rounded-[1.9rem] bg-black">
            <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

            <div className="relative flex min-h-[460px] flex-col px-4 pb-3 pt-12 sm:min-h-[500px]">
              <div className="mb-5 flex items-center justify-between text-silver">
                <Menu className="h-5 w-5" />
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                  <Image
                    src="/logo.png"
                    alt="Market Money HQ"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-[11px] font-medium tracking-wide text-silver">
                Portfolio Value
              </p>
              <p className="mt-1 font-display text-[1.65rem] font-bold leading-none tracking-tight text-white sm:text-[1.85rem] tabular-nums">
                {formatMoney(value)}
              </p>
              <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#4DB8FF] tabular-nums">
                <span aria-hidden>▲</span>
                <span>
                  +{formatMoney(gain)} ({gainPct.toFixed(2)}%) Today
                </span>
              </p>

              <div className="relative mt-5 h-[120px] w-full">
                <svg
                  viewBox="0 0 280 120"
                  className="h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0088FF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
                    </linearGradient>
                    <filter
                      id="heroChartGlow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path d={chart.area} fill="url(#heroChartFill)" />
                  <path
                    d={chart.line}
                    fill="none"
                    stroke="#4DB8FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#heroChartGlow)"
                  />
                  <circle
                    cx={chart.last.x}
                    cy={chart.last.y}
                    r="4.5"
                    fill="#4DB8FF"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(77,184,255,0.95))",
                    }}
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between gap-1 text-[10px] font-semibold text-silver">
                {TIMEFRAMES.map((tf) => (
                  <span
                    key={tf}
                    className={
                      tf === "1D"
                        ? "rounded-full bg-[#0088FF] px-2.5 py-1 text-black"
                        : "px-1.5 py-1"
                    }
                  >
                    {tf}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[12px]">
                <span className="text-silver">Profit</span>
                <span className="font-semibold text-[#4DB8FF] tabular-nums">
                  +{formatMoney(gain)}
                </span>
              </div>

              <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-3 text-[9px] text-silver">
                {[
                  { label: "Home", Icon: Home, active: true },
                  { label: "Watchlist", Icon: LineChart },
                  { label: "Portfolio", Icon: Briefcase },
                  { label: "History", Icon: History },
                  { label: "More", Icon: MoreHorizontal },
                ].map(({ label, Icon, active }) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center gap-1 ${
                      active ? "text-[#4DB8FF]" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
