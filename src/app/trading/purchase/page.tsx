import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AgreementSigner } from "@/components/signing/AgreementSigner";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Purchase Trading Education",
  description:
    "Sign the Trading Disclosure Form to continue to secure Stripe checkout for Market Money HQ trading education.",
  path: "/trading/purchase",
});

export default function TradingPurchasePage() {
  return (
    <>
      <PageHero
        badge="Trading Education"
        title="Sign to complete your purchase"
        description="Review the Trading Disclosure Form, add your email and signature, then continue to Stripe. A signed copy will be emailed to you and Market Money HQ."
      />
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AgreementSigner />
        </div>
      </section>
    </>
  );
}
