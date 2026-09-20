"use client";

import React from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";
import { CallForDemo } from "@/components/demo/CallForDemo";

export function ServicesCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-white via-blue-50/20 to-canvas py-20 lg:py-28">
      {/* Subtle blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0066FF 1px, transparent 1px), linear-gradient(90deg, #0066FF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-12 lg:px-20">
        <div className="inline-flex items-center gap-2 border border-blue-200/80 bg-blue-50/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-accent backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          // START A PROJECT
        </div>

        <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-ink">
          Ready to Design the Right System<span className="text-accent">?</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
          Talk to our engineering team about your building geometry, system
          specifications, and turn-key delivery lifecycle.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CallForDemo
            source="Services Page Closing CTA"
            label="Call for Demo"
            size="md"
            className="shadow-sm"
          />
          <Link
            href={"/systems" as Route}
            className="inline-flex items-center gap-2 rounded border border-line bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-accent hover:bg-blue-50/40 hover:text-accent"
          >
            Explore Systems <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Technical Guarantee Note */}
        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          Direct engineering consultation · Zero third-party handoffs · Verified code compliance
        </p>
      </div>
    </section>
  );
}
