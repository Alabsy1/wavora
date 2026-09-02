import { cn } from "@/lib/cn";
import { WaveMark } from "@/components/logo-mark";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}

export function Logo({ variant = "dark", className, href }: LogoProps) {
  const color =
    variant === "light"
      ? "text-section-fg"
      : "text-fg";

  const inner = (
    <span className={cn("group inline-flex items-center gap-2.5", color)}>
      <WaveMark className="h-[1.35em] w-auto transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
      <span className="text-[1.05em] font-extrabold tracking-[0.22em]">
        WAVORA
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label="WAVORA — home"
        className={cn("inline-flex text-lg", className)}
      >
        {inner}
      </a>
    );
  }

  return <span className={cn("inline-flex text-lg", className)}>{inner}</span>;
}