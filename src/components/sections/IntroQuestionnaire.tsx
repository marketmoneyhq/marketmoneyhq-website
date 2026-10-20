"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import {
  QUESTIONNAIRE_STORAGE_KEY,
  useIntroReveal,
} from "@/components/providers/IntroReveal";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0088ff] dark:border-white/15 dark:bg-charcoal";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  helpWith: string;
  why: string;
  readyToday: "" | "Yes" | "No";
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  helpWith: "",
  why: "",
  readyToday: "",
};

function alreadyCompleted() {
  try {
    return sessionStorage.getItem(QUESTIONNAIRE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function IntroQuestionnaire() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { revealed, siteUnlocked, unlockSite } = useIntroReveal();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (siteUnlocked || alreadyCompleted()) return;

    // Home: wait for curtains to finish opening first
    if (isHome && !revealed) return;

    const timer = window.setTimeout(() => setOpen(true), isHome ? 200 : 0);
    return () => window.clearTimeout(timer);
  }, [isHome, revealed, siteUnlocked]);

  useEffect(() => {
    if (!open || submitted) return;

    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    html.classList.add("mmhq-intro-lock");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      html.classList.remove("mmhq-intro-lock");
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open, submitted]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      // Unlock and mount the site only after a successful submit
      window.setTimeout(() => {
        unlockSite();
        setOpen(false);
      }, 1200);
    } catch {
      setError("Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[220] flex items-end justify-center bg-black p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 max-h-[min(92vh,820px)] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#0088ff]/35 bg-[#0a0a0a] p-5 shadow-[0_0_48px_rgba(0,136,255,0.2)] sm:p-7"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-[#0088ff]" />
                <h2 id={titleId} className="font-display text-2xl font-bold">
                  Thank you
                </h2>
                <p className="mt-2 max-w-sm text-sm text-gray-400">
                  Loading the site…
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#0088ff]">
                    Quick intro
                  </p>
                  <h2
                    id={titleId}
                    className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
                  >
                    Tell Us About You
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Please answer these questions to continue to the site.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="qq-first"
                      className="mb-2 block text-sm font-medium"
                    >
                      First name
                    </label>
                    <input
                      id="qq-first"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="qq-last"
                      className="mb-2 block text-sm font-medium"
                    >
                      Last name
                    </label>
                    <input
                      id="qq-last"
                      required
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="qq-phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone number
                  </label>
                  <input
                    id="qq-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="qq-email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="qq-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="qq-help"
                    className="mb-2 block text-sm font-medium"
                  >
                    1. What do you need help with?
                  </label>
                  <textarea
                    id="qq-help"
                    required
                    rows={3}
                    value={form.helpWith}
                    onChange={(e) => update("helpWith", e.target.value)}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="qq-why"
                    className="mb-2 block text-sm font-medium"
                  >
                    2. What is your &quot;WHY&quot;?
                  </label>
                  <textarea
                    id="qq-why"
                    required
                    rows={3}
                    value={form.why}
                    onChange={(e) => update("why", e.target.value)}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <fieldset>
                  <legend className="mb-3 text-sm font-medium">
                    3. Are you ready to get started today?
                  </legend>
                  <div className="flex gap-3">
                    {(["Yes", "No"] as const).map((option) => {
                      const selected = form.readyToday === option;
                      return (
                        <label
                          key={option}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                            selected
                              ? "border-[#0088ff] bg-[#0088ff]/15 text-white"
                              : "border-white/15 text-gray-300 hover:border-[#0088ff]/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="readyToday"
                            value={option}
                            required
                            checked={selected}
                            onChange={() => update("readyToday", option)}
                            className="sr-only"
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {error ? (
                  <p className="whitespace-pre-line rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Submit & Continue"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
