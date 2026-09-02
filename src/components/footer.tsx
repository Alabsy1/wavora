import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { InstagramIcon } from "@/components/icons";
import { siteConfig, navItems, whatsappLink, mailtoLink } from "@/data/site";

const exploreLinks = [
  { label: "All Experiences", href: "/explore" },
  { label: "Sea Trips", href: "/sea" },
  { label: "Adventures", href: "/adventures" },
  { label: "Stays", href: "/stays" },
  { label: "Spots", href: "/spots" },
  { label: "Eats", href: "/eats" },
];

export function Footer() {
  return (
    <footer className="bg-section text-section-fg">
      <div className="container-w pt-20 pb-10 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-pretty text-[0.9375rem] leading-relaxed text-section-fg/60">
              Explore more. Live better. The local friend in Hurghada who knows
              where to go, what to do and where to eat.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={whatsappLink("Hi WAVORA!")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex size-10 items-center justify-center rounded-full border border-section-fg/20 text-section-fg/80 transition-all duration-300 hover:border-section-fg hover:bg-pill hover:text-pill-fg"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-section-fg/20 text-section-fg/80 transition-all duration-300 hover:border-section-fg hover:bg-pill hover:text-pill-fg"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={mailtoLink()}
                aria-label="Email"
                className="inline-flex size-10 items-center justify-center rounded-full border border-section-fg/20 text-section-fg/80 transition-all duration-300 hover:border-section-fg hover:bg-pill hover:text-pill-fg"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-section-fg/40">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] font-medium text-section-fg/70 transition-colors duration-300 hover:text-section-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-section-fg/40">
              WAVORA
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/plan"
                  className="text-[0.9375rem] font-medium text-section-fg/70 transition-colors duration-300 hover:text-section-fg"
                >
                  Plan a Trip
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[0.9375rem] font-medium text-section-fg/70 transition-colors duration-300 hover:text-section-fg"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[0.9375rem] font-medium text-section-fg/70 transition-colors duration-300 hover:text-section-fg"
                >
                  Contact
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.href} className="hidden">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-section-fg/40">
              Find us
            </h3>
            <address className="mt-5 flex flex-col gap-4 text-[0.9375rem] font-medium not-italic">
              <span className="flex items-start gap-3 text-section-fg/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-section-fg/40" aria-hidden="true" />
                {siteConfig.location}
              </span>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-section-fg/70 transition-colors duration-300 hover:text-section-fg"
              >
                <Phone className="size-4 shrink-0 text-section-fg/40" aria-hidden="true" />
                {siteConfig.whatsapp.display}
              </a>
              <a
                href={mailtoLink()}
                className="flex items-center gap-3 text-section-fg/70 transition-colors duration-300 hover:text-section-fg"
              >
                <Mail className="size-4 shrink-0 text-section-fg/40" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-section-fg/10 pt-8 text-[0.8125rem] text-section-fg/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] uppercase">
            Explore More · Live Better
          </p>
          <p className="flex items-center gap-1.5">
            Crafted by{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.developer.name} — portfolio`}
              className="group inline-flex items-center gap-1 font-semibold text-section-fg/60 transition-colors duration-300 hover:text-section-fg"
            >
              {siteConfig.developer.name}
              <ArrowUpRight
                className="size-3 shrink-0 text-section-fg/40 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-section-fg"
                aria-hidden="true"
              />
            </a>
          </p>
        </div>
      </div>

      <div className="overflow-hidden border-t border-section-fg/[0.06] py-6" aria-hidden="true">
        <p className="display-xl text-center text-section-fg/[0.07] select-none">
          WAVORA
        </p>
      </div>
    </footer>
  );
}