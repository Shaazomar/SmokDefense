"use client";

import React, { useState } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";

const DEPLOYMENT_STEPS = [
  { step: "01", name: "ENGINEERING", desc: "System architecture design, airflow calculations, and UUKL panel sequence specifications." },
  { step: "02", name: "FACTORY", desc: "Assembly of NEMA 4X control enclosures, LiFePO4 battery reserves, and edge gateway programming." },
  { step: "03", name: "CONFIGURATION", desc: "Pre-flashing IP500 wireless network keys and local building zone mapping matrices." },
  { step: "04", name: "SHIPMENT", desc: "International freight logistics for hardware enclosures and field sensor modules." },
  { step: "05", name: "SITE INSTALLATION", desc: "Local electrical contractor mounting of panels, sensor wiring loops, and gateway connection." },
  { step: "06", name: "COMMISSIONING", desc: "Automated device discovery scan, zone binding, and stairwell pressure differential balancing." },
  { step: "07", name: "TESTING", desc: "Closed-loop damper stroke verification, fan current testing, and initial inspection PDF export." },
  { step: "08", name: "HANDOVER", desc: "Client digital key transfer, operator login credentials, and facility staff training." },
  { step: "09", name: "REMOTE SUPPORT", desc: "Continuous 24/7 telemetry monitoring, gateway security updates, and engineering helpdesk." },
  { step: "10", name: "MAINTENANCE", desc: "Long-term diagnostic health surveillance, automated off-peak damper cycling, and battery checks." },
];

export function DeploymentSection() {
  const [activeIdx, setActiveIdx] = useState(5);

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">17 / DEPLOYMENT</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            END-TO-END DEPLOYMENT<br />
            <span className="text-ink-soft">LIFECYCLE.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            SmokDefense supports every phase of international project execution—from initial engineering design to factory pre-assembly, site commissioning, and 24/7 remote diagnostic support.
          </p>
        </div>

        {/* Visual Deployment Timeline Chain */}
        <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {DEPLOYMENT_STEPS.map((step, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveIdx(idx)}
                className={`cursor-pointer border p-5 transition-all font-mono text-xs ${
                  isActive ? "border-accent bg-accent/5 font-bold text-ink shadow-sm" : "border-line bg-canvas text-ink-soft hover:border-ink"
                }`}
              >
                <div className="flex items-center justify-between text-accent">
                  <span>[{step.step}]</span>
                  {idx < 9 && <span className="text-[10px] text-ink-faint">↓</span>}
                </div>
                <h3 className="mt-2 font-display text-base font-semibold uppercase text-ink">{step.name}</h3>
                <p className="mt-2 font-sans text-[11px] text-ink-soft leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
