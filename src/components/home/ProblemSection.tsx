"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Wind, Flame, Radio, ArrowRight, Gauge, Sliders } from "lucide-react";

export function ProblemSection() {
  const steps = [
    {
      title: "Detection",
      desc: "Smoke optical sensors or sprinkler flow switches identify fire location.",
      icon: Flame,
    },
    {
      title: "Control Sequence",
      desc: "Dedicated controllers initiate mechanical exhaust and isolation loops.",
      icon: Sliders,
    },
    {
      title: "Smoke Movement",
      desc: "High-temp exhaust fans extract toxic gases while louvres supply make-up air.",
      icon: Wind,
    },
    {
      title: "Protected Areas",
      desc: "Positive pressure shields stairwells and egress paths for safe evacuation.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>01 // THE CORE CHALLENGE</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
            Automated systems manage the building.
            <br />
            <span className="text-blue-600">Emergency response requires a clear point of control.</span>
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
            In building fire emergencies, smoke and toxic combustion gases represent the primary hazard to life safety and emergency response. Effective smoke management controls smoke movement to support protected egress routes and maintain tenable conditions.
          </p>
        </div>

        {/* 4-Stage Smoke Management Physics Flow */}
        <div className="mt-12">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
            How Smoke Management Operates in Practice:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      STEP 0{idx + 1}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-50 text-blue-600">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
