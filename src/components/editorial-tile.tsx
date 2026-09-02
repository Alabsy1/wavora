import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface EditorialTileProps {
  href: string;
  image: string;
  alt: string;
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function EditorialTile({
  href,
  image,
  alt,
  tag,
  title,
  subtitle,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: EditorialTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-3xl bg-section focus-visible:outline-offset-4",
        className,
      )}
      aria-label={`${title}${subtitle ? ` — ${subtitle}` : ""}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-section/75 via-section/10 to-section/10 transition-opacity duration-500 group-hover:from-section/80" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-pill/15 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-section-fg backdrop-blur-md">
            {tag}
          </span>
          <span className="inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-pill text-pill-fg opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div>
          <h3 className="display-sm text-section-fg">{title}</h3>
          {subtitle && (
            <p className="mt-1.5 text-sm text-section-fg/70">{subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  );
}