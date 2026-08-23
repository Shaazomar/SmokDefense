"use client";

import React from "react";
import { TECHNICAL_CATEGORIES } from "@/lib/data/homepageData";
import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { DemoTag } from "@/components/ui/DemoTag";
import { Cpu, Network, Server, Zap, Shield, Database, Lock, Code } from "lucide-react";

export function TechnologySection() {
  return (
    <section id="technology" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">15 / TECHNOLOGY</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            THE TECHNICAL INDEX.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Explore the 8 foundational architectural pillars underpinning SmokDefense hardware, networks, edge computing, software platforms, and security governance.
          </p>
        </div>

        {/* 8 Technical Category Expandable Panels */}
        <div className="mt-10 border border-line bg-white p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
            <span className="font-bold text-ink">ARCHITECTURE SPECIFICATION INDEX</span>
            <span className="text-accent font-semibold">8 CATEGORIES</span>
          </div>

          <div className="mt-4 divide-y divide-line">
            {TECHNICAL_CATEGORIES.map((cat, idx) => (
              <ExpandablePanel
                key={cat.id}
                title={cat.title}
                subtitle={cat.subtitle}
                badge={`TECH 0${idx + 1}`}
                defaultOpen={idx === 0}
              >
                <div className="space-y-4 pt-2">
                  <p className="font-sans text-sm text-ink-soft leading-relaxed">
                    {cat.summary}
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2">
                    {cat.specs.map((spec, specIdx) => (
                      <div key={specIdx} className="border border-line bg-canvas p-4 font-mono text-xs">
                        <span className="font-semibold text-ink uppercase">{spec.title}</span>
                        <p className="mt-1 text-ink-soft leading-relaxed text-[11px]">{spec.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ExpandablePanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
