import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const sizes = {
  sm: { className: "h-9 w-9", px: 36 },
  md: { className: "h-11 w-11", px: 44 },
  lg: { className: "h-14 w-14", px: 56 },
};

export function BrandLogo({
  className,
  size = "md",
  priority = false,
}: BrandLogoProps) {
  const s = sizes[size];

  return (
    <Image
      src="/logo.png"
      alt="Market Money HQ"
      width={s.px}
      height={s.px}
      priority={priority}
      className={cn(s.className, "object-contain", className)}
    />
  );
}
