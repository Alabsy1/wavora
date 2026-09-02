import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  dark?: boolean;
  className?: string;
  reverse?: boolean;
}

export function Marquee({
  items,
  dark = false,
  className,
  reverse = false,
}: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden py-6 select-none sm:py-7",
        dark ? "bg-section text-section-fg" : "bg-page text-fg",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max items-center gap-10 sm:gap-14",
          reverse && "[animation-direction:reverse]",
        )}
        style={{
          animation: `marquee 38s linear infinite`,
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 sm:gap-14">
            <span className="text-2xl font-extrabold tracking-[0.18em] whitespace-nowrap sm:text-3xl">
              {item}
            </span>
            <span className="size-1.5 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}