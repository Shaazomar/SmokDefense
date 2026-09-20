"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, ToggleLeft } from "lucide-react";

export function FiremanOverridePanelSection() {
  const features = [
    {
      title: "Real-Time Graphical Monitoring",
      detail: "Floor-by-floor architectural mimic display reveals active smoke zones, fan run/trip state, and damper blade positions instantly.",
    },
    {
      title: "Positive Manual Override",
      detail: "Direct 3-position tactical switches (AUTO / OPEN-RUN / CLOSE-STOP) give emergency responders immediate authority over mechanical equipment.",
    },
    {
      title: "Hardwired Deterministic Priority",
      detail: "Manual commands physically override automated sequences, BMS setpoints, and network dependencies to enforce firefighter intent.",
    },
    {
      title: "Supervised Line Integrity",
      detail: "Continuous electrical monitoring of power supplies, actuator end-switch loops, and relay interfaces ensures readiness 24/7.",
    },
  ];

  const specs = [
    { label: "Operation Mode", value: "3-Position positive-action key/toggle switches per smoke zone" },
    { label: "Status Feedback", value: "Supervised LED matrix (Green: Open/Run, Red: Closed/Stop, Amber: Fault)" },
    { label: "Engineering Standard", value: "Engineered in accordance with NFPA 92 & applicable building codes" },
    { label: "Housing Construction", value: "Heavy-gauge IP54/IP65 lockable industrial steel cabinet" },
    { label: "FACP Interlock", value: "Supervised relay loops and monitored RS485 communication link" },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>02 // THE FIREFIGHTER&apos;S CONTROL POINT</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
            Firefighters&apos; Smoke Control Station (FSCS).
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
            During an emergency, automated building systems may operate according to pre-programmed algorithms. The Firefighters&apos; Smoke Control Station provides the designated control interface through which firefighters monitor equipment status and take manual command of the building.
          </p>
        </div>

        {/* Product Visual & Specifications Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Authoritative Real Product Photograph */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-xs">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded bg-slate-100">
                <Image
                  src="/images/hero-override-panel.png"
                  alt="Override-R Fireman Override Panel - Firefighters' Smoke Control Station"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Authoritative Override-R FSCS Enclosure</span>
                <span className="font-mono text-[11px] text-slate-500">Custom Architectural Layout</span>
              </div>
            </div>
          </div>

          {/* Right: Operational Explanations & Specs */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {features.map((feat) => (
                <div key={feat.title} className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                  <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    {feat.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed pl-3.5">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Specifications Snapshot */}
            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200 text-xs">
              {specs.slice(0, 3).map((item) => (
                <div key={item.label} className="grid grid-cols-3 py-2.5 gap-4">
                  <span className="font-semibold text-slate-900 col-span-1">{item.label}</span>
                  <span className="text-slate-600 col-span-2">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/systems/firefighters-smoke-control"
                className="inline-flex items-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-blue-700"
              >
                <span>Full FSCS Specifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
