import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <p className="text-[#0088ff] font-medium text-sm tracking-wide uppercase mb-4">
          {badge}
        </p>
      )}
      <h2 className="heading-lg text-balance mb-4">{title}</h2>
      {description && <p className="body-lg text-balance">{description}</p>}
    </div>
  );
}
