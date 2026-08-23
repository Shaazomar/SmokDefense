"use client";

import React, { useState } from "react";
import { STANDARDS_TRUST, type StandardItem } from "@/lib/data/homepageData";
import { ShieldCheck, Award, FileText, CheckCircle2 } from "lucide-react";

export function StandardsTrustSection() {
  const [selectedStandard, setSelectedStandard] = useState<StandardItem>(STANDARDS_TRUST[1]); // Default UUKL

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">16 / STANDARDS & TRUST</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            BUILT FOR THE REAL WORLD.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Verified technology standards, international life-safety compliance frameworks, and strict architectural boundaries.
          </p>
        </div>

        {/* Standards Selection Tabs */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4">
          {STANDARDS_TRUST.map((std) => {
            const isSelected = selectedStandard.id === std.id;
            return (
              <button
                key={std.id}
                onClick={() => setSelectedStandard(std)}
                className={`border px-5 py-3 font-mono text-xs uppercase transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-white font-bold"
                    : "border-line bg-canvas text-ink-soft hover:border-ink"
                }`}
              >
                {std.code}
              </button>
            );
          })}
        </div>

        {/* Standard Detail Box */}
        <div className="mt-8 border border-line bg-white p-8 md:p-12">
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
            <span className="text-accent font-bold">STANDARD SPECIFICATION // [{selectedStandard.code}]</span>
            <span className="text-ink-faint">VERIFIED FRAMEWORK</span>
          </div>

          <h3 className="mt-6 font-display text-3xl font-semibold uppercase text-ink">
            {selectedStandard.title}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 font-sans text-sm text-ink-soft lg:col-span-7">
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">APPLIES TO</h4>
                <p className="mt-1 leading-relaxed">{selectedStandard.appliesTo}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">WHAT IT IS</h4>
                <p className="mt-1 leading-relaxed">{selectedStandard.whatItIs}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">WHY IT MATTERS</h4>
                <p className="mt-1 leading-relaxed">{selectedStandard.whyItMatters}</p>
              </div>
            </div>

            {/* Scope Disclaimer Box */}
            <div className="rounded border border-line bg-canvas p-6 font-mono text-xs text-ink-soft lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-semibold text-ink uppercase">ARCHITECTURAL BOUNDARY & SCOPE:</span>
                <p className="mt-2 text-[11px] leading-relaxed">
                  {selectedStandard.disclaimer}
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-4 text-[10px] text-ink-faint">
                NEVER IMPLY ONE CERTIFICATION AUTOMATICALLY CERTIFIES THE ENTIRE ECOSYSTEM.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
