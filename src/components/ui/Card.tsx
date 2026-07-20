import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 md:p-8 transition-all duration-300",
        hover && "hover:shadow-lg hover:shadow-emerald/5 hover:-translate-y-1 dark:hover:shadow-emerald/10",
        className
      )}
    >
      {children}
    </div>
  );
}
