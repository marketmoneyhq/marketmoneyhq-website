import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "emerald" | "navy";
}

const variantStyles = {
  default: "bg-gray-100 text-gray-700 dark:bg-charcoal-light dark:text-gray-300",
  emerald: "bg-[#0088ff]/10 text-[#0066d6] dark:text-[#4db8ff]",
  navy: "bg-silver/15 text-charcoal dark:bg-white/10 dark:text-silver-light",
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
