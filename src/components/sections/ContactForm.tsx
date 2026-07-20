"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { MotionWrapper, fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/metadata";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <MotionWrapper variants={fadeInUp}>
        <div className="glass-card p-12 text-center">
          <CheckCircle className="w-12 h-12 text-emerald mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
          <p className="body-md">
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper variants={fadeInUp}>
      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-light bg-white dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-emerald text-sm"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-light bg-white dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-emerald text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-light bg-white dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-emerald text-sm"
          />
        </div>

        <div>
          <label htmlFor="interest" className="block text-sm font-medium mb-2">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-light bg-white dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-emerald text-sm"
          >
            <option value="trading">Trading Education</option>
            <option value="website">Website Design</option>
            <option value="marketing">Digital Marketing</option>
            <option value="ai">AI Consulting</option>
            <option value="business">Business Development</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your goals..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-light bg-white dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-emerald text-sm resize-none"
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Send Message
          <Send className="w-4 h-4" />
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Or email us directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-emerald hover:underline">
            {siteConfig.email}
          </a>
        </p>
      </form>
    </MotionWrapper>
  );
}
