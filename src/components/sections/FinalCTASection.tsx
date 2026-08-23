"use client";

import React from "react";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line flex flex-col justify-center items-center text-center">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          22 / THE FUTURE OF LIFE-SAFETY
        </span>

        <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-semibold uppercase leading-[0.92] tracking-tight text-ink">
          BUILDINGS ARE GETTING SMARTER.<br />
          <span className="text-ink-soft">LIFE-SAFETY SYSTEMS SHOULD TOO.</span>
        </h2>

        <p className="max-w-2xl font-sans text-base text-ink-soft md:text-lg text-balance">
          Connect your smoke control hardware, building networks, and facility teams into one unified digital intelligence platform.
        </p>

        <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-accent hover:shadow-lg"
          >
            Talk to an Engineer →
          </Link>
          <a
            href="#platform"
            className="rounded-full border border-line bg-canvas px-8 py-4 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-ink"
          >
            Explore the Platform →
          </a>
        </div>
      </div>
    </section>
  );
}
