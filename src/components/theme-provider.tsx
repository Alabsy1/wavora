"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type ThemeName = "light" | "night" | "dark";

const STORAGE_KEY = "wavora-theme";

/** Routes that must stay locked to the original palette (Ocean is protected). */
const FIXED_LIGHT_ROUTES = ["/ocean-experience"];

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function isProtectedRoute(pathname: string) {
  return FIXED_LIGHT_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const forcedLight = isProtectedRoute(pathname);

  const [theme, setThemeState] = useState<ThemeName>("light");
  const [ready, setReady] = useState(false);

  // adopt whatever the FOUC script already stamped on <html>
  useEffect(() => {
    const current = document.documentElement.dataset.theme as ThemeName | undefined;
    queueMicrotask(() => {
      if (current === "light" || current === "night" || current === "dark") {
        setThemeState(current);
      }
      setReady(true);
    });
  }, []);

  // keep the document attribute in sync (theme + protected-route override)
  useEffect(() => {
    const active: ThemeName = forcedLight ? "light" : theme;
    const root = document.documentElement;
    if (root.dataset.theme !== active) {
      root.dataset.theme = active;
    }
    root.style.colorScheme = active === "light" ? "light" : "dark";
  }, [theme, forcedLight]);

  // brief cross-fade while switching (not on protected routes / first paint)
  useEffect(() => {
    if (!ready || forcedLight) return;
    const root = document.documentElement;
    root.classList.add("theme-switching");
    const id = window.setTimeout(() => root.classList.remove("theme-switching"), 420);
    return () => {
      window.clearTimeout(id);
      root.classList.remove("theme-switching");
    };
  }, [theme, ready, forcedLight]);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore private-mode write failures
    }
  }, []);

  const value = useMemo(
    () => ({ theme: forcedLight ? "light" : theme, setTheme }),
    [theme, forcedLight, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Inline script that stamps data-theme before first paint (no FOUC). */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var k="${STORAGE_KEY}";var t=localStorage.getItem(k);var p=location.pathname;var fixed=["/ocean-experience"];var isFixed=fixed.some(function(r){return p===r||p.indexOf(r+"/")===0;});if(isFixed){t="light";}else if(!t){t="light";}if(t!=="light"&&t!=="night"&&t!=="dark"){t="light";}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=(t==="light")?"light":"dark";}catch(e){document.documentElement.dataset.theme="light";}})();`,
      }}
    />
  );
}