"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Layers, GitBranch, ArrowRight } from "lucide-react";
import { CallForDemo } from "@/components/demo/CallForDemo";

export function LifecycleOverview() {
  return (
    <section className="border-b border-line bg-gradient-to-b from-canvas via-white to-canvas py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-white shadow-lg">
              <Image
                src="/images/systems-hero-architecture.jpg"
                alt="Override-R Full Lifecycle Infrastructure Engineering"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="rounded bg-black/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  Turnkey Infrastructure
                </span>
                <span className="font-mono text-[10px] text-blue-200">
                  Zero Responsibility Gap
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 border border-blue-200/80 bg-blue-50/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              // COMPLETE LIFECYCLE
            </div>

            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-ink">
              One Team.
              <br />
              From Design to Maintenance<span className="text-accent">.</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
              When design, integration and commissioning sit with separate
              subcontractors, the gaps between them become the building&apos;s
              problem at handover. We keep the entire chain under one
              accountable engineering responsibility.
            </p>

            {/* 3 Key Commitments */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-tight text-ink">
                    Single Point of Accountability
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    No finger-pointing between equipment vendors, software integrators, and mechanical installers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                  <GitBranch className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-tight text-ink">
                    Design Matches Commissioning
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    The control philosophy and cause-and-effect matrix calculated at design time is validated point-by-point.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-tight text-ink">
                    Life-Safety Code Compliance
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    All calculations, damper actuation times, and pressure differential certificates verified against standard building safety codes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <CallForDemo
                source="Services — Lifecycle Overview"
                label="Discuss Your Project"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
