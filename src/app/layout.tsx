import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { FooterSlot } from "@/components/footer-slot";
import { ThemeProvider, ThemeScript } from "@/components/theme-provider";
import { siteConfig } from "@/data/site";
import { SmoothScroll } from "@/components/smooth-scroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "WAVORA — Explore More. Live Better.",
    template: "%s — WAVORA",
  },
  description:
    "WAVORA is a travel & lifestyle brand in Hurghada, Red Sea, Egypt. Sea trips, desert adventures, curated stays, hidden spots and places worth knowing — told by locals who know the good places.",
  keywords: [
    "Hurghada",
    "Red Sea",
    "Egypt",
    "boat trips Hurghada",
    "Red Sea snorkeling",
    "desert safari Hurghada",
    "Hurghada stays",
    "things to do in Hurghada",
    "Giftun Island",
    "WAVORA experiences",
  ],
  authors: [{ name: "WAVORA" }],
  creator: "WAVORA",
  publisher: "WAVORA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "WAVORA",
    title: "WAVORA — Explore More. Live Better.",
    description:
      "Trips, stays, hidden spots and unforgettable experiences in Hurghada & the Red Sea — curated around you.",
    images: [
      {
        url: `${siteConfig.url}/images/hero-turquoise.jpg`,
        width: 2400,
        height: 1350,
        alt: "Aerial view of turquoise Red Sea water near Hurghada, Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAVORA — Explore More. Live Better.",
    description:
      "Trips, stays, hidden spots and unforgettable experiences in Hurghada & the Red Sea — curated around you.",
    images: [`${siteConfig.url}/images/hero-turquoise.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-page text-fg font-sans overflow-x-hidden">
        <ThemeProvider>
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-pill focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-pill-fg"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <FooterSlot />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "TravelAgency",
                  name: siteConfig.name,
                  url: siteConfig.url,
                  slogan: siteConfig.tagline,
                  description:
                    "WAVORA is a travel & lifestyle brand in Hurghada, Red Sea, Egypt — sea trips, desert adventures, curated stays, hidden spots and places worth eating at.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Hurghada",
                    addressRegion: "Red Sea Governorate",
                    addressCountry: "EG",
                  },
                  areaServed: "Hurghada, Red Sea, Egypt",
                }),
              }}
            />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}