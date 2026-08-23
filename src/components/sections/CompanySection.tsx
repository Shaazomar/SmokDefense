"use client";

import React from "react";
import { DemoTag } from "@/components/ui/DemoTag";

const CORE_CAPABILITIES = [
  { name: "ENGINEERING", desc: "Specialist smoke management system design, air balance calculations, and regulatory code submittals." },
  { name: "HARDWARE", desc: "UL-listed UUKL control enclosures, high-sensitivity optical sensors, and heavy-duty NEMA 4X node enclosures." },
  { name: "SOFTWARE", desc: "High-performance 3D WebGL digital twin, microsecond telemetry engine, and automated PDF compliance reports." },
  { name: "CONNECTIVITY", desc: "IP500 dual-band sub-GHz wireless mesh standard and BACnet IP / MS/TP bus integration." },
  { name: "INSTALLATION", desc: "On-site engineering oversight and wiring guidance for electrical contractors and system integrators." },
  { name: "COMMISSIONING", desc: "Specialist 7-step commissioning protocol, pressure balancing, and system handover verification." },
  { name: "MAINTENANCE", desc: "Predictive diagnostic surveillance, automated off-peak damper stroke cycling, and battery testing." },
  { name: "INTERNATIONAL DEPLOYMENT", desc: "Global logistics, international engineering support, and multi-region regulatory compliance." },
];

export function CompanySection() {
  return (
    <section id="company" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">20 / ABOUT SMOKEDEFENCE</span>
            <DemoTag label="INTEGRATED LIFE-SAFETY TECHNOLOGY" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            WE DON'T JUST MONITOR BUILDINGS.<br />
            <span className="text-accent font-display">WE UNDERSTAND HOW THEY BREATHE.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            SmokeDefence is an integrated technology and engineering company connecting physical building infrastructure, smoke control hardware, industrial networks, edge processing, and central software platforms into one unified life-safety layer.
          </p>
        </div>

        {/* 8 Core Capabilities Grid */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
          {CORE_CAPABILITIES.map((cap, idx) => (
            <div key={cap.name} className="border border-line bg-white p-6 transition-all hover:border-ink">
              <span className="text-accent font-bold text-[10px]">0{idx + 1}. [{cap.name}]</span>
              <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink">{cap.name}</h3>
              <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
