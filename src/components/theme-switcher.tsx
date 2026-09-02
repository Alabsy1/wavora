"use client";

import { Moon, MoonStar, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTheme, type ThemeName } from "@/components/theme-provider";

const OPTIONS: { id: ThemeName; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "night", label: "Night", icon: Moon },
  { id: "dark", label: "Dark", icon: MoonStar },
];

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-paper/15 bg-paper/5 p-0.5 backdrop-blur-md",
        className,
      )}
    >
      {OPTIONS.map(({ id, label, icon: Icon }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            onClick={() => setTheme(id)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.625rem] font-bold uppercase tracking-[0.14em] transition-all duration-300 ease-out",
              active
                ? "bg-pill text-pill-fg shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
                : "text-paper/60 hover:text-paper",
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span className="hidden xl:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}