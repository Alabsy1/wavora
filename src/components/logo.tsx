import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}

export function Logo({ variant = "dark", className, href }: LogoProps) {
  const inner = (
    <span className="group inline-flex items-center">
      <Image
        src="/Neovorm-logo-transparent.png"
        alt="WAVORA"
        width={140}
        height={32}
        className={cn(
          "h-8 w-auto object-contain transition-all duration-300",
          variant === "light"
            ? "brightness-0 invert"
            : "dark:brightness-0 dark:invert",
          className,
        )}
        priority
      />
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label="WAVORA — home"
        className="inline-flex"
      >
        {inner}
      </a>
    );
  }

  return <span className="inline-flex">{inner}</span>;
}
