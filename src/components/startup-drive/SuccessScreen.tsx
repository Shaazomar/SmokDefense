"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function SuccessScreen() {
  return (
    <div className="mx-auto max-w-lg rounded-lg border border-[var(--color-line)] bg-white px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-soft)]">
        <CheckCircle2 className="h-7 w-7 text-[var(--color-accent)]" />
      </div>
      <h2 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-[var(--color-ink)]">
        Application Received
      </h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--color-ink-soft)]">
        Thank you for your interest in the Override-R Startup Drive. Your information has been
        successfully submitted.
      </p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-ink-soft)]">
        Our team will review your application and contact you regarding the next steps.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      >
        Return to Override-R →
      </Link>
    </div>
  );
}
