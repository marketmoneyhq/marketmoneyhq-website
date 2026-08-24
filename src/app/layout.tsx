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
              html.mmhq-intro-lock,html.mmhq-intro-lock body{overflow:hidden!important}
              /* CSS-only first paint — avoids injecting DOM React doesn't own */
              html.mmhq-intro-pending::before{
                content:"";
                position:fixed;inset:0;z-index:200;
                background-color:#000;
                background-image:url(/logo.png);
                background-position:center;
                background-size:min(78vmin,560px);
                background-repeat:no-repeat;
                pointer-events:auto
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;if(p!=="/"&&p!=="")return;document.documentElement.classList.add("mmhq-intro-lock","mmhq-intro-pending");}catch(e){}})();`,
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
