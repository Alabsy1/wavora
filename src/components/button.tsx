import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "outline" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  "aria-label"?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-fg text-page hover:bg-fg/85 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]",
  light: "bg-pill text-pill-fg hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(11,12,13,0.35)]",
  outline: "border border-fg/20 text-fg hover:border-fg hover:bg-fg hover:text-page",
  "outline-light": "border border-section-fg/30 text-section-fg hover:bg-pill hover:text-pill-fg",
  ghost: "text-fg hover:text-fg/60",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[0.9375rem]",
  lg: "h-14 px-9 text-base",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  type = "button",
  disabled,
  external,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}