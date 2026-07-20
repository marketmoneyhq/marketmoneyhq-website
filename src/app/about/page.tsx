import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn the story behind Market Money HQ — an education company built on the belief that true wealth comes from developing skills, not chasing shortcuts.",
  path: "/about",
});

function ValuesSection() {
  const values = [
    {
      title: "Education First",
      description:
        "We prioritize teaching over selling. Every program is designed to build genuine skills that compound over time.",
    },
    {
      title: "Long-Term Thinking",
      description:
        "Financial freedom is a marathon, not a sprint. We help you develop the patience and discipline for sustainable growth.",
    },
    {
      title: "Honest Approach",
      description:
        "No hype, no exaggerated claims. We're transparent about risks, realistic about outcomes, and committed to ethical education.",
    },
    {
      title: "Holistic Growth",
      description:
        "We go beyond trading to encompass business, technology, and the full digital economy — because freedom requires diverse skills.",
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-charcoal-dark">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-emerald font-medium text-sm tracking-wide uppercase mb-4">
            Our Values
          </p>
          <h2 className="heading-lg mb-4">What we stand for</h2>
          <p className="body-lg">
            These principles guide everything we do — from curriculum design to
            mentorship and client relationships.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value) => (
            <div key={value.title} className="space-y-3">
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="body-md">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl mx-auto">
        <div className="space-y-6 body-md">
          <p>
            Market Money HQ was born from a simple observation: most people
            want financial freedom, but the education available to them is either
            too simplistic, too hyped, or too narrowly focused on a single skill.
          </p>
          <p>
            We started with trading education because markets offer a powerful
            teacher — they reward discipline and punish recklessness in real
            time. But we quickly realized that trading alone isn&apos;t enough.
            The people who achieve lasting financial independence combine market
            skills with business acumen, digital literacy, and the ability to
            leverage modern technology.
          </p>
          <p>
            Today, Market Money HQ is a comprehensive education and mentorship
            platform serving thousands of students worldwide. We offer structured
            programs in trading, business development, website design, digital
            marketing, and AI consulting — all unified by a single mission: help
            everyday people build the skills that create freedom.
          </p>
          <p className="text-charcoal dark:text-white font-medium text-lg">
            We don&apos;t promise overnight wealth. We promise something better:
            the knowledge and skills to build a life with more freedom,
            flexibility, and abundance — on your terms.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="Built on skills, not shortcuts"
        description="Market Money HQ exists because we believe true wealth comes from developing valuable skills — not from chasing get-rich-quick schemes or following hype."
      />
      <StorySection />
      <ValuesSection />
      <Timeline />
      <Stats />
      <CTA
        title="Join an education-first approach"
        description="Whether you're starting your journey or looking to expand your skills, we're here to guide you with honesty, expertise, and long-term thinking."
      />
    </>
  );
}
