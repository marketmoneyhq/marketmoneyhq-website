"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SignatureMode = "draw" | "adopt";

const ADOPT_STYLES = [
  { id: "script", label: "Script", fontFamily: '"Segoe Script", "Brush Script MT", cursive' },
  { id: "elegant", label: "Elegant", fontFamily: "Georgia, 'Times New Roman', serif" },
  { id: "modern", label: "Modern", fontFamily: "Manrope, Arial, sans-serif" },
] as const;

interface SignatureCaptureProps {
  fullName: string;
  onChange: (dataUrl: string | null) => void;
  className?: string;
}

export function SignatureCapture({
  fullName,
  onChange,
  className,
}: SignatureCaptureProps) {
  const [mode, setMode] = useState<SignatureMode>("draw");
  const [styleId, setStyleId] = useState<(typeof ADOPT_STYLES)[number]["id"]>("script");
  const [adopted, setAdopted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  const activeStyle = useMemo(
    () => ADOPT_STYLES.find((s) => s.id === styleId) ?? ADOPT_STYLES[0],
    [styleId]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode !== "draw") return;
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 2.25;
  }, [mode]);

  useEffect(() => {
    if (mode !== "draw") return;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [mode, resizeCanvas]);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const emitDrawn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
  };

  const clearDraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    onChange(null);
    resizeCanvas();
  };

  const renderAdoptedSignature = useCallback(
    (name: string, fontFamily: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 220;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0a0a0a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `italic 72px ${fontFamily}`;
      ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 8);
      return canvas.toDataURL("image/png");
    },
    []
  );

  const adoptSignature = () => {
    const name = fullName.trim();
    if (name.length < 2) return;
    const dataUrl = renderAdoptedSignature(name, activeStyle.fontFamily);
    if (!dataUrl) return;
    setAdopted(true);
    onChange(dataUrl);
  };

  const switchMode = (next: SignatureMode) => {
    setMode(next);
    setHasInk(false);
    setAdopted(false);
    onChange(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="inline-flex rounded-full bg-gray-100 p-1 dark:bg-charcoal-light">
        <button
          type="button"
          onClick={() => switchMode("draw")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            mode === "draw"
              ? "bg-[#0088ff] text-white"
              : "text-gray-600 hover:text-charcoal dark:text-gray-300"
          )}
        >
          Draw
        </button>
        <button
          type="button"
          onClick={() => switchMode("adopt")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            mode === "adopt"
              ? "bg-[#0088ff] text-white"
              : "text-gray-600 hover:text-charcoal dark:text-gray-300"
          )}
        >
          Adopt
        </button>
      </div>

      {mode === "draw" ? (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-white/15">
            <canvas
              ref={canvasRef}
              className="h-40 w-full touch-none cursor-crosshair"
              onPointerDown={(event) => {
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");
                if (!canvas || !ctx) return;
                drawing.current = true;
                canvas.setPointerCapture(event.pointerId);
                const { x, y } = getPoint(event);
                ctx.beginPath();
                ctx.moveTo(x, y);
              }}
              onPointerMove={(event) => {
                if (!drawing.current) return;
                const ctx = canvasRef.current?.getContext("2d");
                if (!ctx) return;
                const { x, y } = getPoint(event);
                ctx.lineTo(x, y);
                ctx.stroke();
                if (!hasInk) setHasInk(true);
              }}
              onPointerUp={() => {
                if (!drawing.current) return;
                drawing.current = false;
                emitDrawn();
              }}
              onPointerLeave={() => {
                if (!drawing.current) return;
                drawing.current = false;
                emitDrawn();
              }}
            />
            {!hasInk && (
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                Draw your signature
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={clearDraw}
            className="text-sm font-medium text-[#0088ff] hover:underline"
          >
            Clear signature
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose a style and adopt your typed name as your signature (like
            DocuSign).
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {ADOPT_STYLES.map((style) => {
              const previewName = fullName.trim() || "Your Name";
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setStyleId(style.id);
                    setAdopted(false);
                    onChange(null);
                  }}
                  className={cn(
                    "rounded-xl border bg-white px-3 py-4 text-center transition-colors dark:bg-charcoal",
                    styleId === style.id
                      ? "border-[#0088ff] ring-2 ring-[#0088ff]/30"
                      : "border-gray-300 dark:border-white/15"
                  )}
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {style.label}
                  </p>
                  <p
                    className="truncate text-2xl text-charcoal dark:text-white"
                    style={{ fontFamily: style.fontFamily, fontStyle: "italic" }}
                  >
                    {previewName}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-6 text-center dark:border-white/15 dark:bg-charcoal">
            {adopted ? (
              <p
                className="text-4xl text-charcoal dark:text-white"
                style={{ fontFamily: activeStyle.fontFamily, fontStyle: "italic" }}
              >
                {fullName.trim()}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Preview appears after you adopt a signature
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={adoptSignature}
            disabled={fullName.trim().length < 2}
            className="rounded-full bg-[#0088ff] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            Adopt & Sign
          </button>
        </div>
      )}
    </div>
  );
}
