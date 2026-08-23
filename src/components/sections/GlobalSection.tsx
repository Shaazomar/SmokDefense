"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

export function GlobalSection() {
  const [activeStep, setActiveStep] = useState(0);

  const FLOW = [
    { name: "FACTORY", desc: "Engineering assembly of NEMA 4X control enclosures and pre-tested relay matrices." },
    { name: "LOGISTICS", desc: "International hardware shipping and secure supply chain logistics." },
    { name: "SITE", desc: "On-site arrival, panel mounting, and local contractor low-voltage wiring." },
    { name: "INSTALLATION", desc: "Physical mounting of optical sensors, pressure tubes, dampers, and IP500 gateways." },
    { name: "COMMISSIONING", desc: "Specialist device discovery, pressure balancing, and compliance certification." },
    { name: "SUPPORT", desc: "24/7 continuous diagnostic monitoring, firmware updates, and technical helpdesk." },
  ];

  return (
    <section id="global-deployment" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">18 / GLOBAL DEPLOYMENT</span>
            <DemoTag label="GLOBAL CAPABILITY" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            ENGINEERED HERE.<br />
            <span className="text-accent font-display">DEPLOYED ANYWHERE.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            SmokeDefence delivers centralized life-safety infrastructure to complex commercial, industrial, healthcare, and high-rise developments worldwide through international engineering and logistics capabilities.
          </p>
        </div>

        {/* Global Deployment Pipeline Bar */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs font-bold border-b border-line pb-4">
          {FLOW.map((f, idx) => (
            <button
              key={f.name}
              onClick={() => setActiveStep(idx)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeStep === idx
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              0{idx + 1}. {f.name}
            </button>
          ))}
        </div>

        {/* Pipeline Step Card */}
        <div className="border border-line bg-white p-8">
          <div className="flex justify-between items-center border-b border-line pb-4 font-mono text-xs">
            <span className="font-bold text-accent">[GLOBAL DEPLOYMENT // STAGE 0{activeStep + 1}]</span>
            <span className="text-ink-soft">GLOBAL CAPABILITY ENGINE</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col items-start gap-4 lg:col-span-6">
              <span className="font-mono text-xs font-bold text-accent">GLOBAL LOGISTICS & SUPPORT</span>
              <h3 className="font-display text-3xl font-bold uppercase text-ink">
                {FLOW[activeStep].name} STAGE
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {FLOW[activeStep].desc}
              </p>
            </div>

            <div className="border border-line bg-canvas p-6 lg:col-span-6 space-y-3 font-mono text-xs">
              <span className="font-bold text-ink block mb-2">INTERNATIONAL CAPABILITY:</span>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>HARDWARE FREIGHT:</span>
                <span className="font-bold text-ink">GLOBAL LOGISTICS SYNC</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>ON-SITE SUPPORT:</span>
                <span className="font-bold text-accent">SPECIALIST COMMISSIONING</span>
              </div>
              <div className="flex justify-between">
                <span>REMOTE DIAGNOSTICS:</span>
                <span className="font-bold text-emerald-600">24/7 MONITORING CAPABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
