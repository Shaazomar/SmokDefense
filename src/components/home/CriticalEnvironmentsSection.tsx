"use client";

import React from "react";
import Link from "next/link";
import { DraftingCompass, ShieldAlert, Cpu, CheckCircle2, Wrench, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    phase: "DESIGN",
    title: "Smoke Management Architecture",
    icon: DraftingCompass,
    desc: "CFD smoke modeling, pressurization calculations, zone compartmentation schedules, and cause-and-effect matrix engineering aligned with IBC 909 and NFPA 92.",
  },
  {
    num: "02",
    phase: "ENGINEERING",
    title: "Firefighter Control Station",
    icon: ShieldAlert,
    desc: "Custom architectural mimic layout design, positive-action switch arrays, supervised true-status LED matrices, and fail-safe hardware priority circuits.",
  },
  {
    num: "03",
    phase: "INTEGRATION",
    title: "Building Equipment Integration",
    icon: Cpu,
    desc: "Coordinating high-temp exhaust fans, Belimo motorized dampers, IP500 sub-GHz wireless mesh nodes, differential pressure transmitters, and FACP links.",
  },
  {
    num: "04",
    phase: "COMMISSIONING",
    title: "Testing & Validation",
    icon: CheckCircle2,
    desc: "Door-opening force verification (<133 N), stair differential pressure tests, damper stroke timing, and simulated fire alarm sequence testing.",
  },
  {
    num: "05",
    phase: "LIFECYCLE",
    title: "Supervised Maintenance & AMC",
    icon: Wrench,
    desc: "Scheduled periodic damper cycle tests, sensor calibration, emergency callout response, and compliance audit log management for authorities.",
  },
];

export function CriticalEnvironmentsSection() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
              <span>07 // COMPLETE ENGINEERING LIFECYCLE</span>
            </div>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
              Engineered for Smoke Control. Built for Firefighter Response.
            </h2>
            <p className="mt-3 font-sans text-base text-slate-600">
              From initial smoke-management design and Firefighters&apos; Smoke Control Stations to equipment integration, commissioning and maintenance, Override-R connects the complete emergency control architecture.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 shrink-0"
          >
            <span>Explore Engineering Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 5-Phase Horizontal / Responsive Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      PHASE {service.num} // {service.phase}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-50 text-blue-600">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Lifecycle Milestone</span>
                  <span className="text-slate-600 font-medium">Turnkey Delivery</span>
                </div>
              </div>
            );
          })}

          {/* Standards Card */}
          <div className="flex flex-col justify-between rounded-lg border border-blue-200 bg-blue-50/60 p-7 shadow-xs">
            <div>
              <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-wider">
                Engineering Credibility
              </span>
              <h3 className="mt-2 font-display text-base font-bold text-slate-900">
                Authoritative Submittals
              </h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-slate-600">
                All engineering drawings, cause-and-effect schedules, and commissioning documentation are issued with complete submittal packs for consultant sign-off and AHJ approval.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-mono text-blue-700 font-semibold">
              <span>NFPA 92 &amp; IBC 909 Aligned</span>
              <span>Fully Documented</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
