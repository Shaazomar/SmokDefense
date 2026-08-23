"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

const INDUSTRIES = [
  { id: "high-rise", title: "HIGH-RISE", desc: "Stairwell pressurization and multi-zone vertical shaft isolation for towers exceeding 50 meters." },
  { id: "residential", title: "RESIDENTIAL", desc: "Corridor smoke ventilation and compartmentation protecting multi-family egress paths." },
  { id: "hotels", title: "HOTELS", desc: "Acoustically insulated smoke dampers and automated atrium exhaust for high occupancy hospitality buildings." },
  { id: "hospitals", title: "HOSPITALS", desc: "Cleanroom pressurization and progressive horizontal zone evacuation for non-ambulatory patient care." },
  { id: "commercial", title: "COMMERCIAL", desc: "Integrated BMS life-safety gateways and automated damper stroke testing for corporate campuses." },
  { id: "industrial", title: "INDUSTRIAL", desc: "Heavy-duty NEMA 4X control enclosures and high-volume smoke extraction for manufacturing facilities." },
  { id: "car-parks", title: "CAR PARKS", desc: "CO gas monitoring and impulse jet fan extraction for enclosed underground parking structures." },
  { id: "atriums", title: "ATRIUMS", desc: "Natural buoyancy roof ventilators and automatic drop smoke curtains for large open volume spaces." },
  { id: "infrastructure", title: "INFRASTRUCTURE", desc: "Subway tunnel ventilation, transit hubs, and subterranean passenger terminal life-safety systems." },
];

export function IndustriesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = INDUSTRIES[activeIdx];

  return (
    <section id="industries" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">13 / INDUSTRIES</span>
            <DemoTag label="SECTOR EXPERTISE" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            TAILORED FOR CRITICAL<br />
            <span className="text-accent font-display">BUILDING ENVIRONMENTS.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            SmokeDefence engineers smoke management solutions across diverse building typologies—addressing unique architectural geometries, occupancy risks, and regional life-safety requirements.
          </p>
        </div>

        {/* 9 Industry Buttons Grid */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4 font-mono text-xs font-bold">
          {INDUSTRIES.map((ind, idx) => (
            <button
              key={ind.id}
              onClick={() => setActiveIdx(idx)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeIdx === idx
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {ind.title}
            </button>
          ))}
        </div>

        {/* Selected Industry Card */}
        <div className="border border-line bg-white p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col items-start gap-4 lg:col-span-7">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                SECTOR [{activeIdx + 1} OF 9] // {current.title}
              </span>

              <h3 className="font-display text-3xl font-bold uppercase text-ink md:text-4xl">
                {current.title} LIFE-SAFETY SYSTEMS
              </h3>

              <p className="font-sans text-base text-ink-soft leading-relaxed">
                {current.desc}
              </p>

              <div className="pt-2">
                <a
                  href="/contact"
                  className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-accent"
                >
                  Consult an Industry Engineer →
                </a>
              </div>
            </div>

            <div className="border border-line bg-canvas p-6 font-mono text-xs lg:col-span-5 space-y-3">
              <span className="font-bold text-ink block mb-2">ENGINEERING HIGHLIGHTS:</span>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>OCCUPANCY TYPE:</span>
                <span className="font-bold text-ink uppercase">{current.title}</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>CONTROL ARCHITECTURE:</span>
                <span className="font-bold text-accent">INTEGRATED UUKL & IP500</span>
              </div>
              <div className="flex justify-between">
                <span>COMPLIANCE BOUNDARY:</span>
                <span className="font-bold text-emerald-600">APPLICABLE REGIONAL CODES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
