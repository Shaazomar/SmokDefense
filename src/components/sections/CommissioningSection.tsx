"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

export function CommissioningSection() {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    { name: "CONNECT", desc: "Establish industrial bus links across BACnet, IP500 mesh, and control cabinets." },
    { name: "DISCOVER", desc: "Auto-scan and identify every connected sensor, fan motor, damper, and panel on the bus." },
    { name: "CONFIGURE", desc: "Bind spatial locations, floorplate zones, and UUKL relay interlock matrices." },
    { name: "TEST", desc: "Execute automated damper stroke cycles and pressurization fan ramp-up sequences." },
    { name: "VERIFY", desc: "Validate pressure differential transmitters and auxiliary end-switch position feedback." },
    { name: "DOCUMENT", desc: "Generate immutable digital compliance records and commissioning certificates." },
    { name: "HANDOVER", desc: "Transfer operational system keys, engineering documentation, and facility credentials." },
  ];

  return (
    <section id="commissioning" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">09 / COMMISSIONING</span>
            <DemoTag label="SPECIALIST COMMISSIONING" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            INSTALLED ISN'T ENOUGH.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Installation is only the beginning. Smoke management systems require specialist testing and commissioning after installation to verify every sensor, damper, fan, and control loop acts in synchrony under actual building pressure dynamics.
          </p>
        </div>

        {/* 7-Step Workflow Ribbon */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs font-bold border-b border-line pb-4">
          {STEPS.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => setActiveStep(idx)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeStep === idx
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              0{idx + 1}. {s.name}
            </button>
          ))}
        </div>

        {/* Interactive System Discovery Interface */}
        <div className="border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold text-accent">[SYSTEM DISCOVERY ENGINE]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">
                COMMISSIONING WORKFLOW // {STEPS[activeStep].name}
              </h3>
            </div>
            <DemoTag label="[DEMO / ILLUSTRATIVE]" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* System Discovery Checklist Box */}
            <div className="border border-line bg-canvas p-6 font-mono text-xs space-y-4 lg:col-span-6">
              <span className="font-bold text-ink border-b border-line/60 pb-2 block">
                SYSTEM DISCOVERY STATUS
              </span>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span>CONTROL PANELS</span>
                  <span className="font-bold text-emerald-600">✓ VERIFIED ONLINE</span>
                </div>
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span>EXHAUST FANS</span>
                  <span className="font-bold text-emerald-600">✓ VERIFIED RUNNING</span>
                </div>
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span>SMOKE DAMPERS</span>
                  <span className="font-bold text-emerald-600">✓ END-SWITCH SYNC</span>
                </div>
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span>OPTICAL SENSORS</span>
                  <span className="font-bold text-emerald-600">✓ LOOP SUPERVISED</span>
                </div>
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span>PRESSURE TRANSMITTERS</span>
                  <span className="font-bold text-emerald-600">✓ CALIBRATED (+50 Pa)</span>
                </div>
                <div className="flex justify-between">
                  <span>NETWORK GATEWAYS</span>
                  <span className="font-bold text-emerald-600">✓ IP500 CONNECTED</span>
                </div>
              </div>
            </div>

            {/* Workflow Description Panel */}
            <div className="border border-line bg-canvas p-6 flex flex-col justify-between lg:col-span-6 font-mono text-xs">
              <div>
                <span className="text-accent font-bold block mb-2">STAGE PURPOSE:</span>
                <p className="font-sans text-sm text-ink-soft leading-relaxed">
                  {STEPS[activeStep].desc}
                </p>
              </div>

              <div className="border-t border-line/60 pt-4 text-[10px] text-ink-faint">
                SPECIFICATION: ACCORDING TO APPLICABLE LOCAL LEGISLATION AND ENGINEERING GUIDANCE.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
