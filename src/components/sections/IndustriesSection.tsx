"use client";

import React, { useState } from "react";
import { INDUSTRY_VERTICALS } from "@/lib/data/homepageData";
import { Building2, Hospital, Hotel, Factory, Train, Briefcase } from "lucide-react";

const ICONS = [Building2, Hospital, Hotel, Briefcase, Factory, Train];

export function IndustriesSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = INDUSTRY_VERTICALS[selectedIdx];
  const Icon = ICONS[selectedIdx];

  return (
    <section id="industries" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">14 / INDUSTRIES</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            TAILORED FOR CRITICAL<br />
            <span className="text-ink-soft">BUILDING ENVIRONMENTS.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            From 50-story commercial towers and sterile surgical suites to airport terminals and chemical processing plants.
          </p>
        </div>

        {/* 6 Industry Vertical Tab Bar */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4">
          {INDUSTRY_VERTICALS.map((ind, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIdx(idx)}
                className={`flex items-center gap-2 border px-4 py-2.5 font-mono text-xs uppercase transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-canvas text-ink-soft hover:border-ink"
                }`}
              >
                <span>{ind.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Detail Card */}
        <div className="mt-8 border border-line bg-white p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col items-start gap-6 lg:col-span-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  VERTICAL [{selectedIdx + 1} OF 6]
                </span>
              </div>

              <h3 className="font-display text-3xl font-semibold uppercase text-ink md:text-4xl">
                {current.title}
              </h3>

              <p className="font-sans text-base text-ink-soft leading-relaxed">
                {current.description}
              </p>

              <div className="w-full space-y-4 border-t border-line pt-6">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">PRIMARY ENGINEERING CHALLENGE</h4>
                  <p className="mt-1 font-sans text-xs text-ink-soft leading-relaxed">{current.challenges}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">SMOKDEFENSE SOLUTION MATRIX</h4>
                  <p className="mt-1 font-sans text-xs text-ink-soft leading-relaxed">{current.solution}</p>
                </div>
              </div>
            </div>

            {/* Right Industry Visual Spec Box */}
            <div className="rounded border border-line bg-canvas p-8 font-mono text-xs lg:col-span-5 flex flex-col justify-between min-h-[300px]">
              <div className="flex justify-between text-ink-faint">
                <span>VERTICAL CODE: {current.id.toUpperCase()}</span>
                <span>DEPLOYMENT READY</span>
              </div>

              <div className="my-6 space-y-3">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <span className="text-ink-soft">RISK PROFILE:</span>
                  <span className="font-bold text-accent">HIGH CAPACITY / CRITICAL</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <span className="text-ink-soft">RECOMMENDED NETWORK:</span>
                  <span className="font-bold text-ink">IP500 DUAL-BAND MESH</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <span className="text-ink-soft">HARDWARE SPEC:</span>
                  <span className="font-bold text-ink">NEMA 4X / UUKL PANELS</span>
                </div>
              </div>

              <a
                href="/industries"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase text-accent hover:underline"
              >
                View Full Industry Case Studies →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
