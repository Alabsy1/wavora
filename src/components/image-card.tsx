import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

interface ImageCardProps {
  href: string;
  image: string;
  alt: string;
  tag: string;
  title: string;
  location?: string;
  className?: string;
  aspect?: "square" | "portrait" | "landscape";
  priority?: boolean;
  dark?: boolean;
}

export function ImageCard({
  href,
  image,
  alt,
  tag,
  title,
  location,
  className,
  aspect = "square",
  priority,
  dark = false,
}: ImageCardProps) {
  return (
    <Link
      href={href}
      className={cn("group block focus-visible:outline-offset-4", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl bg-section",
          aspect === "square" && "aspect-square",
          aspect === "portrait" && "aspect-[3/4]",
          aspect === "landscape" && "aspect-[4/3]",
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-section/45 via-transparent to-transparent transition-opacity duration-500 group-hover:from-section/55" />

        <span className="absolute left-4 top-4 rounded-full bg-pill/15 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-section-fg backdrop-blur-md">
          {tag}
        </span>

        <span className="absolute bottom-4 right-4 inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-pill text-pill-fg opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-4">
        <h3
          className={cn(
            "text-base font-bold tracking-tight transition-colors duration-300",
            dark
              ? "text-section-fg group-hover:text-section-fg/70"
              : "text-fg group-hover:text-fg/70",
          )}
        >
          {title}
        </h3>
        {location && (
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-[0.8125rem]",
              dark ? "text-section-fg/55" : "text-fg/55",
            )}
          >
            <MapPin className="size-3.5" aria-hidden="true" />
            {location}
          </p>
        )}
      </div>
    </Link>
  );
}