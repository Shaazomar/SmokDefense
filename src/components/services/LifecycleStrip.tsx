"use client";

import React from "react";
import {
  Compass,
  ShieldCheck,
  Cpu,
  Wrench,
  Activity,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";

interface LifecycleStage {
  number: string;
  phase: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    number: "01",
    phase: "Engineer",
    detail: "CFD smoke modeling, airflow & zone calculations",
    icon: Compass,
  },
  {
    number: "02",
    phase: "Control Architecture",
    detail: "FSCS mimic, switch matrix & hardwired priority",
    icon: ShieldCheck,
  },
  {
    number: "03",
    phase: "Integrate",
    detail: "FACP loops, BMS gateways, BACnet & IP500",
    icon: Cpu,
  },
  {
    number: "04",
    phase: "Install",
    detail: "Panels, dampers, actuators & fire cabling",
    icon: Wrench,
  },
  {
    number: "05",
    phase: "Commission",
    detail: "Point-by-point functional testing & calibration",
    icon: Activity,
  },
  {
    number: "06",
    phase: "Validate",
    detail: "Live smoke matrix & firefighter override testing",
    icon: CheckCircle2,
  },
  {
    number: "07",
    phase: "Maintain",
    detail: "Planned AMC inspection, exercising & servicing",
    icon: Layers,
  },
];

export function LifecycleStrip() {
  return (
    <section className="relative border-b border-line bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Section Tag */}
        <div className="flex items-center justify-between border-b border-line/70 pb-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
            Engineering Sequence
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            Continuous Single-Source Delivery
          </span>
        </div>

        {/* 7 Connected Step Cards */}
        <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 lg:gap-2.5">
          {LIFECYCLE_STAGES.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <div key={stage.number} className="relative flex flex-col">
                <div className="group flex h-full flex-col justify-between rounded-xl border border-line bg-canvas/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-sm">
                  <div>
                    {/* Header: Number + Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-accent">
                        {stage.number}
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-ink-soft shadow-2xs transition-colors group-hover:bg-blue-50 group-hover:text-accent">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 font-display text-xs font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-accent">
                      {stage.phase}
                    </h3>

                    {/* Detail */}
                    <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">
                      {stage.detail}
                    </p>
                  </div>

                  {/* Step bottom accent line */}
                  <div className="mt-4 h-1 w-full rounded-full bg-line group-hover:bg-accent transition-colors" />
                </div>

                {/* Connecting arrow for wide desktop */}
                {index < LIFECYCLE_STAGES.length - 1 && (
                  <div className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 xl:flex">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-200 bg-white text-accent shadow-xs">
                      <ArrowRight className="h-2.5 w-2.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
