import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AgreementSigner } from "@/components/signing/AgreementSigner";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Purchase Trading PDF",
  description:
    "Sign the Trading Disclosure Form to continue to secure Stripe checkout for the Market Money HQ self-paced trading PDF.",
  path: "/trading/purchase",
  noIndex: true,
});

export default function TradingPurchasePage() {
  return (
    <>
      <PageHero
        badge="PDF Guide — $250"
        title="Sign To Complete Your Purchase"
        description="Review the Trading Disclosure Form, add your email and signature, then continue to Stripe for the self-paced trading PDF. A signed copy will be emailed to you and Market Money HQ."
      />
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AgreementSigner />
        </div>
      </section>
    </>
  );
}
