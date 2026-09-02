import { cn } from "@/lib/cn";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  link?: { label: string; href: string };
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
  link,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {eyebrow && (
          <p
            className={cn(
              "eyebrow",
              dark ? "text-section-fg/70" : "text-fg/60",
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "display-md text-balance",
            dark ? "text-section-fg" : "text-fg",
          )}
        >
          {title}
        </h2>
      </div>

      <div
        className={cn(
          "flex flex-col gap-6",
          align === "center" && "items-center",
          "lg:flex-row lg:items-end lg:justify-between",
        )}
      >
        {description && (
          <p
            className={cn(
              "max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
              dark ? "text-section-fg/65" : "text-fg/60",
              align === "center" && "text-center",
            )}
          >
            {description}
          </p>
        )}
        {link && (
          <Link
            href={link.href}
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight link-underline",
              dark ? "text-section-fg" : "text-fg",
            )}
          >
            {link.label}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </Reveal>
  );
}