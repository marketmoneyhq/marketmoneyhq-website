import type { Metadata } from "next";
import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/metadata";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Market Money HQ. Book a free consultation, ask questions, or learn how our education and mentorship programs can help you build financial freedom.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's start the conversation"
        description="Whether you're ready to begin your journey or just exploring options, we're here to help. Book a free consultation or send us a message."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="heading-md mb-6">Get in touch</h2>
                <p className="body-md mb-8">
                  We typically respond within 24 hours. For urgent inquiries,
                  email us directly.
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-0.5">Email</p>
                    <p className="text-emerald group-hover:underline">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-0.5">Response Time</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-0.5">Location</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Remote — serving clients worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200 dark:border-charcoal-light">
                <p className="font-medium text-sm mb-4">Follow us</p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(siteConfig.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 dark:bg-charcoal-light text-sm capitalize hover:bg-gray-200 dark:hover:bg-charcoal transition-colors"
                    >
                      {platform}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
