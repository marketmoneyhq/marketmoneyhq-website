import type { Metadata } from "next";
import Link from "next/link";
import {
  LineChart,
  Globe,
  Megaphone,
  Bot,
  Briefcase,
  ArrowRight,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Card } from "@/components/ui/Card";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Trading mentorship, website design, digital marketing, AI consulting, and business development — practical services for building lasting wealth.",
  path: "/services",
});

const iconMap: Record<string, LucideIcon> = {
  LineChart,
  Globe,
  Megaphone,
  Bot,
  Briefcase,
};

const detailedServices = [
  {
    id: "trading-mentorship",
    icon: "LineChart",
    title: "Trading Mentorship",
    href: "/trading",
    description:
      "Personalized guidance from experienced mentors who prioritize education, risk management, and long-term skill development.",
    features: [
      "One-on-one mentorship sessions",
      "Structured trading curriculum",
      "Live market analysis",
      "Risk management framework",
      "Trading psychology coaching",
    ],
  },
  {
    id: "website-design",
    icon: "Globe",
    title: "Website Design",
    href: "/website-design",
    description:
      "Custom, conversion-focused websites built with modern technology. From brand strategy to launch, we create digital experiences that grow your business.",
    features: [
      "Custom website development",
      "Mobile-responsive design",
      "SEO optimization",
      "Brand strategy integration",
      "Performance optimization",
      "Ongoing support",
    ],
  },
  {
    id: "digital-marketing",
    icon: "Megaphone",
    title: "Digital Marketing",
    href: "/website-design",
    description:
      "Strategic marketing that attracts the right audience and converts visitors into loyal customers.",
    features: [
      "Google Business optimization",
      "Sales funnel design",
      "Lead generation campaigns",
      "Content strategy",
      "Social media management",
      "Analytics and reporting",
    ],
  },
  {
    id: "ai-consulting",
    icon: "Bot",
    title: "AI Consulting",
    href: "/ai",
    description:
      "Practical AI implementation for entrepreneurs and small businesses ready to automate and scale.",
    features: [
      "AI tool assessment",
      "Workflow automation",
      "Custom AI integrations",
      "Productivity optimization",
      "Team training",
      "Ongoing AI strategy",
    ],
  },
  {
    id: "business-development",
    icon: "Briefcase",
    title: "Business Development",
    href: "/contact",
    description:
      "Strategic guidance to help you identify opportunities, build sustainable revenue streams, and create a business aligned with your vision.",
    features: [
      "Business model design",
      "Revenue strategy",
      "Market analysis",
      "Growth planning",
      "Partnership development",
      "Scaling guidance",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="Practical solutions for real growth"
        description="From trading mentorship to AI consulting, we provide the education and services you need to build skills, grow your business, and create lasting wealth."
      />

      <section className="section-padding">
        <div className="container-custom space-y-20">
          {detailedServices.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-emerald" />
                  </div>
                  <h2 className="heading-md mb-4">{service.title}</h2>
                  <p className="body-lg mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-emerald font-medium hover:gap-3 transition-all"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={!isEven ? "lg:order-1" : ""}>
                  <Card hover={false} className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-emerald/10 to-black/5 dark:to-white/5">
                    <Icon className="w-24 h-24 text-emerald/25" />
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}
