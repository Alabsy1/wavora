import { cn } from "@/lib/cn";

interface SeaMarqueeProps {
  items: readonly string[];
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Very thin editorial marquee — a transition between scenes, not a decoration.
 */
export function SeaMarquee({ items, tone = "light", className }: SeaMarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden border-y py-3.5",
        tone === "light"
          ? "border-fg/10 text-fg/45"
          : "border-section-fg/10 text-section-fg/45",
        className,
      )}
    >
      <div
        className="flex w-max items-center"
        style={{ animation: "marquee 44s linear infinite" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="block px-8 text-[0.6875rem] font-bold uppercase tracking-[0.35em] whitespace-nowrap">
              {item}
            </span>
            <span
              className={cn(
                "size-1 shrink-0 rounded-full",
                tone === "light" ? "bg-fg/25" : "bg-section-fg/25",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}