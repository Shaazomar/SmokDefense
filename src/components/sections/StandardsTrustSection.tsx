"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

const STANDARDS_LIST = [
  {
    code: "NFPA 72",
    title: "National Fire Alarm and Signaling Code Integration",
    role: "Integration Framework",
    desc: "Designed to integrate within building life-safety projects governed by NFPA 72 requirements for initiating device monitoring and notification signaling.",
  },
  {
    code: "UUKL",
    title: "UL 864 Category UUKL Smoke Control Integration",
    role: "System Hardware Component",
    desc: "Integrates UUKL-listed control enclosures executing deterministic hardwired relay matrices for primary life-safety control loops.",
  },
  {
    code: "NEMA 4X",
    title: "Enclosure Protection Standards",
    role: "Physical Hardware Specification",
    desc: "Employs NEMA 4X corrosion-resistant industrial enclosures for harsh mechanical room, shaft, and outdoor rooftop fan deployments.",
  },
  {
    code: "IP500",
    title: "Wireless Mesh Communication Standard",
    role: "Network Layer Standard",
    desc: "Utilizes IP500 dual-band sub-GHz wireless mesh communication standard for high-density building sensor telemetry.",
  },
];

export function StandardsTrustSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = STANDARDS_LIST[activeIdx];

  return (
    <section id="standards" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">15 / STANDARDS & COMPLIANCE</span>
            <DemoTag label="REGULATORY ACCURACY" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            ENGINEERED FOR THE REAL WORLD.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Applicable life-safety standards vary by region, building type, system design, and component selection. SmokeDefence systems are designed to integrate within projects governed by applicable fire and life-safety requirements, adhering strictly to local legislation, engineering guidance, and component-specific standards.
          </p>
        </div>

        {/* Standards Tabs */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4 font-mono text-xs font-bold">
          {STANDARDS_LIST.map((std, idx) => (
            <button
              key={std.code}
              onClick={() => setActiveIdx(idx)}
              className={`border px-5 py-2.5 uppercase transition-all ${
                activeIdx === idx
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {std.code}
            </button>
          ))}
        </div>

        {/* Standards Information Card */}
        <div className="border border-line bg-white p-8 md:p-10">
          <div className="flex justify-between items-center border-b border-line pb-4 font-mono text-xs">
            <span className="font-bold text-accent">[TECHNICAL REFERENCE // {current.code}]</span>
            <span className="text-ink-soft">APPLICABLE REGULATORY SCOPE</span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-bold uppercase text-ink">
            {current.title}
          </h3>

          <p className="mt-4 font-sans text-base text-ink-soft leading-relaxed">
            {current.desc}
          </p>

          <div className="mt-8 border-t border-line pt-6 font-mono text-xs text-ink-soft bg-canvas p-6 border">
            <span className="font-bold text-ink block mb-2 uppercase">VERIFIED COMPLIANCE POLICY:</span>
            <p className="text-[11px] leading-relaxed">
              SmokeDefence integrates verified components and communicates with certified control systems. Specific certifications belong to their respective manufacturing standards and component listings. Verified certification documentation is supplied during project submittal and commissioning handover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
