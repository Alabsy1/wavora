import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PlanForm } from "@/components/plan-form";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { siteConfig, whatsappLink, mailtoLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Get in touch with WAVORA — WhatsApp, Instagram, phone or email. We reply fast and we're happy to help plan your day in Hurghada.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.whatsapp.display,
    note: "Fastest — usually within the hour",
    href: whatsappLink("Hi WAVORA!"),
    external: true,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: siteConfig.instagramHandle,
    note: "Daily stories from the coast",
    href: siteConfig.instagram,
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.whatsapp.display,
    note: "Call or text, 9am – 11pm",
    href: `tel:${siteConfig.whatsapp.display.replace(/\s/g, "")}`,
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    note: "For longer notes and stays",
    href: mailtoLink(),
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · Contact"
        title="LET'S MAKE YOUR DAY HAPPEN."
        description="Questions, plans, wild ideas — we're one message away."
        image="/images/sea-sunset.jpg"
        alt="Sunset over the Red Sea"
        compact
      />

      <section className="container-w py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-fg/50">Reach us</p>
              <h2 className="display-md mt-4 text-fg">
                PICK YOUR CHANNEL.
              </h2>
              <div className="mt-10 flex flex-col divide-y divide-fg/10 border-y border-fg/10">
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-5 py-6 transition-colors duration-300"
                  >
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-fg text-page transition-colors duration-300 group-hover:bg-fg/85">
                      <channel.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-fg">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] text-fg/60">
                        {channel.note}
                      </span>
                    </span>
                    <span className="text-[0.9375rem] font-bold tracking-tight text-fg/80 transition-colors duration-300 group-hover:text-fg">
                      {channel.value}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-fg/60">
                <MapPin className="size-4" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-fg/10 bg-page-dim p-6 sm:p-10">
              <p className="eyebrow mb-8 text-fg/50">Or send a note</p>
              <PlanForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}