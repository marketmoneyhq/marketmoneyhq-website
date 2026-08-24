import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import {
  IntroRevealProvider,
  SiteShell,
} from "@/components/providers/IntroReveal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroCurtain } from "@/components/sections/IntroCurtain";
import {
  createMetadata,
  createOrganizationSchema,
  createWebSiteSchema,
} from "@/lib/metadata";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  ...createMetadata({}),
  title: {
    default: "Market Money HQ — Build Skills. Create Wealth. Live with Freedom.",
    template: "%s | Market Money HQ",
  },
  icons: {
    icon: [{ url: "/favicon.svg" }, { url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = createOrganizationSchema();
  const websiteSchema = createWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #mmhq-intro-boot{
                position:fixed;inset:0;z-index:200;
                display:flex;align-items:center;justify-content:center;
                background:#000;pointer-events:auto
              }
              #mmhq-intro-boot img{
                width:min(78vmin,560px);height:min(78vmin,560px);
                object-fit:contain;
                filter:drop-shadow(0 0 40px rgba(0,136,255,.5))
              }
              html.mmhq-intro-lock,html.mmhq-intro-lock body{overflow:hidden!important}
              html.mmhq-intro-pending #mmhq-site{opacity:0;transform:translateY(28px)}
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("mmhq-intro-lock","mmhq-intro-pending");`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} font-sans font-medium`}
      >
        <div id="mmhq-intro-boot" aria-hidden="true">
          {/* Raw img so the logo paints with the first HTML — before React */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={560} height={560} />
        </div>
        <ThemeProvider>
          <IntroRevealProvider>
            <IntroCurtain />
            <SiteShell>
              <Header />
              <main id="main-content">{children}</main>
              <Footer />
            </SiteShell>
          </IntroRevealProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
