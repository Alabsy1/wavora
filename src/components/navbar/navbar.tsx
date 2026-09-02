"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, LayoutDashboard, LogIn } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { navItems, siteConfig, whatsappLink } from "@/data/site";
import { useSiteFlags } from "@/hooks/use-site-flags";

const FLAG_MAP: Record<string, string> = {
  Explore: "",
  Sea: "sea",
  Adventure: "adventure",
  Stays: "stays",
  Spots: "spots",
  Eats: "eats",
  Experiences: "experiences",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const { flags } = useSiteFlags();

  const visibleNavItems = navItems.filter((item) => {
    const flagKey = FLAG_MAP[item.label];
    if (!flagKey) return true;
    return flags[flagKey] !== false;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    fetch("/api/admin/auth/check")
      .then((res) => {
        if (res.ok) setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  const glassy = scrolled && !open;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          glassy
            ? "border-b border-section-fg/10 bg-section/55 text-section-fg backdrop-blur-md"
            : "border-b border-transparent text-section-fg",
        )}
      >
        <div className="container-w flex h-16 items-center justify-between lg:h-20">
          <Logo variant="light" href="/" />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex"
          >
            {visibleNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[0.8125rem] font-semibold tracking-wide transition-opacity duration-300",
                    active
                      ? "text-current opacity-100"
                      : "text-current opacity-65 hover:opacity-100",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeSwitcher />
            <a
              href={whatsappLink(
                "Hi WAVORA! I'd love some help planning a day in Hurghada.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with WAVORA on WhatsApp"
              className="inline-flex size-9 items-center justify-center rounded-full border border-current/20 text-current opacity-80 transition-all duration-300 hover:bg-pill hover:text-pill-fg hover:opacity-100"
            >
              <MessageCircle className="size-[0.9375rem]" aria-hidden="true" />
            </a>
            {isAdmin ? (
              <Link
                href="/admin"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-current/20 px-4 text-[0.8125rem] font-bold tracking-tight text-current opacity-80 transition-all duration-300 hover:bg-pill hover:text-pill-fg hover:opacity-100"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-current/20 px-4 text-[0.8125rem] font-bold tracking-tight text-current opacity-60 transition-all duration-300 hover:opacity-100"
              >
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Link>
            )}
            <Link
              href="/plan"
              className="inline-flex h-10 items-center rounded-full bg-pill px-5 text-[0.8125rem] font-bold tracking-tight text-pill-fg transition-all duration-300 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              Plan a Trip
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-current/25 text-current transition-transform duration-300 hover:rotate-90 lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <span
                aria-hidden="true"
                className="relative block h-[14px] w-[20px]"
              >
                <span className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current" />
              </span>
            )}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-section text-section-fg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav
              aria-label="Mobile"
              className="container-w flex flex-1 flex-col justify-center gap-1 pt-24"
            >
              {visibleNavItems.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.055,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-baseline gap-4 py-3",
                        active ? "text-section-fg" : "text-section-fg/55",
                      )}
                    >
                      <span className="text-[0.65rem] font-bold tracking-[0.3em] text-section-fg/30">
                        0{i + 1}
                      </span>
                      <span className="display-sm">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + visibleNavItems.length * 0.055,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 flex flex-col gap-3"
              >
                {isAdmin ? (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-section-fg/25 px-7 text-[0.9375rem] font-bold tracking-tight text-section-fg"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/admin/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-section-fg/25 px-7 text-[0.9375rem] font-bold tracking-tight text-section-fg"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                )}
                <Link
                  href="/plan"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-pill px-7 text-[0.9375rem] font-bold tracking-tight text-pill-fg"
                >
                  Plan a Trip
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-section-fg/25 px-7 text-[0.9375rem] font-bold tracking-tight text-section-fg"
                >
                  Contact Us
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="container-w flex flex-col gap-6 pb-10"
            >
              <div className="h-px w-full bg-section-fg/15" />
              <div className="flex flex-col gap-5">
                <ThemeSwitcher className="self-start" />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold tracking-wide">
                    {siteConfig.location}
                  </span>
                  <span className="text-section-fg/50">
                    {siteConfig.instagramHandle}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
