"use client";

import React from "react";
import { Users, Cpu, Building2, Wrench } from "lucide-react";

const PILLARS = [
  {
    number: "01",
    title: "One Responsible Team",
    lead: "No finger-pointing between equipment suppliers, software programmers, and site installers. One team owns the system from initial design to final handover.",
    icon: Users,
  },
  {
    number: "02",
    title: "System-Level Thinking",
    lead: "Field sensors, actuators, gateways, and the Fireman Override Panel operate as one synchronized architecture rather than isolated fragments.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Engineered for Real Buildings",
    lead: "Tailored airflow calculations, pressure differential models, and damper schedules engineered against the actual building geometry and safety codes.",
    icon: Building2,
  },
  {
    number: "04",
    title: "Long-Term Support",
    lead: "Comprehensive annual maintenance contracts, periodic sensor calibration, damper drop testing, and dedicated engineering fault resolution.",
    icon: Wrench,
  },
];

export function WhyOverrideR() {
  return (
    <section className="border-b border-line bg-canvas/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 border border-blue-200/80 bg-blue-50/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            // WHY OVERRIDE-R
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-extrabold uppercase leading-tight tracking-tight text-ink">
            Engineered for Single-Source Delivery<span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            How we protect the engineering integrity of your building throughout its entire operational life.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.number}
                className="group flex flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line/70 pb-4">
                    <span className="font-mono text-xs font-extrabold text-accent">
                      {pillar.number}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-canvas text-ink-soft transition-colors group-hover:bg-blue-50 group-hover:text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-accent">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {pillar.lead}
                  </p>
                </div>

                <div className="mt-6 h-1 w-full rounded-full bg-canvas group-hover:bg-accent transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
