"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/metadata";
import { services } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ],
  programs: [
    { name: "Trading Education", href: "/trading" },
    { name: "Website Design", href: "/website-design" },
    { name: "AI Solutions", href: "/ai" },
  ],
  services: services.map((s) => ({ name: s.title, href: s.href })),
};

export function Footer() {
  return (
    <footer className="bg-black text-white" role="contentinfo">
      <div className="section-padding pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <BrandLogo size="md" className="rounded-full" />
                <span className="font-display font-bold text-lg">Market Money HQ</span>
              </Link>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                {siteConfig.tagline} Premium education and mentorship for the
                modern digital economy.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-[#4db8ff] hover:text-[#0088ff] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </a>
            </div>

            {/* Links */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">
                Programs
              </h3>
              <ul className="space-y-3">
                {footerLinks.programs.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">
                Stay Connected
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Get insights on trading, business, and AI delivered to your inbox.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0088ff] text-white rounded-full text-sm font-medium hover:bg-[#0066d6] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Market Money HQ. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm capitalize flex items-center gap-1"
                >
                  {platform}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-600 text-center max-w-3xl mx-auto">
            Trading involves substantial risk and is not suitable for all investors.
            Past performance is not indicative of future results. No profits are guaranteed.
            Market Money HQ provides education and mentorship — not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
