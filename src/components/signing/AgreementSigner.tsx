"use client";

import { useMemo, useState } from "react";
import { FileText, Loader2, Lock, PenLine } from "lucide-react";
import { SignatureCapture } from "@/components/signing/SignatureCapture";
import { tradingDisclosure } from "@/lib/agreements";
import { Button } from "@/components/ui/Button";

export function AgreementSigner() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      fullName.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      Boolean(date) &&
      agreed &&
      Boolean(signature) &&
      !submitting
    );
  }, [fullName, email, date, agreed, signature, submitting]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit || !signature) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/agreements/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          date,
          signatureDataUrl: signature,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        redirectUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.redirectUrl) {
        throw new Error(
          data.error ||
            "Unable to complete signing. Signed copies must be emailed before payment."
        );
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#0088ff]/25 bg-[#0088ff]/10 px-4 py-3 text-sm">
        <Lock className="h-4 w-4 shrink-0 text-[#0088ff]" />
        <p className="text-gray-700 dark:text-gray-300">
          Review and sign this disclosure to continue. After signing, a signed
          PDF copy is emailed to you and Market Money HQ, then you&apos;ll be
          redirected to secure Stripe checkout.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0d0d0d]">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-white/10 dark:bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0088ff]/15">
              <FileText className="h-5 w-5 text-[#0088ff]" />
            </div>
            <div>
              <p className="font-display text-lg font-bold">
                {tradingDisclosure.title}
              </p>
              <p className="text-xs text-gray-500">{tradingDisclosure.company}</p>
            </div>
          </div>
          <a
            href={tradingDisclosure.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#0088ff] hover:underline"
          >
            Open PDF
          </a>
        </div>

        <div className="max-h-[48vh] space-y-6 overflow-y-auto px-5 py-6 sm:px-8">
          <p className="body-md">
            I,{" "}
            <span className="font-semibold text-charcoal dark:text-white">
              {fullName.trim() || "[Your Full Name]"}
            </span>
            , hereby acknowledge and agree to the following terms and conditions
            related to my participation in trading activities with{" "}
            {tradingDisclosure.company}.
          </p>

          {tradingDisclosure.sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h3 className="font-display text-lg font-semibold">
                {section.heading}
              </h3>
              <p className="body-md text-sm">{section.body}</p>
            </div>
          ))}

          <p className="body-md font-medium text-charcoal dark:text-white">
            {tradingDisclosure.closing}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 border-t border-gray-200 bg-gray-50 px-5 py-6 sm:px-8 dark:border-white/10 dark:bg-black/30"
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
            <PenLine className="h-4 w-4 text-[#0088ff]" />
            Sign to continue to payment
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                Printed name
              </label>
              <input
                id="fullName"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setSignature(null);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0088ff] dark:border-white/15 dark:bg-charcoal"
                placeholder="Your legal full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0088ff] dark:border-white/15 dark:bg-charcoal"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="max-w-xs">
            <label htmlFor="date" className="mb-2 block text-sm font-medium">
              Date
            </label>
            <input
              id="date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0088ff] dark:border-white/15 dark:bg-charcoal"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Signature</p>
            <SignatureCapture fullName={fullName} onChange={setSignature} />
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0088ff] focus:ring-[#0088ff]"
            />
            <span>
              I have read and agree to this Trading Disclosure Form. I understand
              a signed copy will be emailed to me and to marketmoneyhq@gmail.com
              before payment.
            </span>
          </label>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="w-full sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending signed copies...
              </>
            ) : (
              "Sign & Continue to Payment"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
