import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ConsentManager } from "@/components/analytics/consent-manager";
import { ExitIntent } from "@/components/analytics/exit-intent";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { env } from "@/lib/env";
import { organizationSchema } from "@/lib/seo/schema";
import "./globals.css";

/**
 * One self-hosted variable font (Inter, latin subset) for body and headings.
 * Numbers use tabular figures; metrics use the system monospace stack. Keeping
 * to a single font file is the biggest single lever on mobile LCP.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="bg-accent text-accent-ink sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <ExitIntent />
        <ConsentManager
          plausibleDomain={env.plausibleDomain}
          posthogKey={env.posthogKey}
          posthogHost={env.posthogHost}
        />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
