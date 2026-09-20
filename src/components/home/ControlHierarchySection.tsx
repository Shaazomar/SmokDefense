"use client";

import React from "react";
import { ArrowDown, Cpu, Flame, ShieldAlert, Sliders, ToggleLeft, Wind } from "lucide-react";

export function ControlHierarchySection() {
  const steps = [
    {
      num: "01",
      tag: "NORMAL OPERATION",
      title: "Building Automation & IAQ",
      desc: "Daily BMS algorithms modulate fresh air dampers, car park ventilation, and HVAC fans according to occupancy and air-quality schedules.",
      icon: Cpu,
      color: "border-slate-200 bg-white text-slate-700",
    },
    {
      num: "02",
      tag: "AUTOMATED SMOKE CONTROL",
      title: "Automated Life-Safety Sequence",
      desc: "Smoke sensors or waterflow switches signal local controllers to execute pre-programmed compartment containment and exhaust sequences.",
      icon: Flame,
      color: "border-amber-200 bg-amber-50/50 text-amber-700",
    },
    {
      num: "03",
      tag: "EMERGENCY CONDITION",
      title: "Firefighter Tactical Arrival",
      desc: "Emergency responders arrive at the Fire Command Center. The designated graphic display reveals active fire zones and smoke migration in real time.",
      icon: ShieldAlert,
      color: "border-red-200 bg-red-50/50 text-red-700",
    },
    {
      num: "04",
      tag: "FIREFIGHTERS' SMOKE CONTROL STATION",
      title: "Centralized Human Control Point",
      desc: "The designated FSCS interface gives firefighters continuous graphical status monitoring and positive manual control over all smoke-control equipment.",
      icon: ToggleLeft,
      color: "border-blue-300 bg-blue-50 text-blue-700 font-bold shadow-xs",
    },
    {
      num: "05",
      tag: "MANUAL CONTROL / OVERRIDE",
      title: "Positive Mechanical Override",
      desc: "Tactical switches physically override automated sequences to exhaust tactical stairwells, pressurize egress corridors, or isolate damaged zones.",
      icon: Sliders,
      color: "border-slate-200 bg-white text-slate-700",
    },
    {
      num: "06",
      tag: "SMOKE CONTROL EQUIPMENT",
      title: "Physical Execution Layer",
      desc: "High-temperature exhaust fans extract toxic fumes, stair pressurization fans protect egress routes, and motorized dampers isolate compartments.",
      icon: Wind,
      color: "border-slate-200 bg-white text-slate-700",
    },
  ];

  return (
    <section className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>03 // THE CONTROL HIERARCHY</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
            Automation + Human Override = Emergency Control.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
            During normal conditions, automation manages comfort. During a fire event, automated sequences initiate response, but the Firefighters&apos; Smoke Control Station provides the ultimate human command authority over the building.
          </p>
        </div>

        {/* 6-Stage Vertical Control Flow */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative flex flex-col justify-between rounded-lg border p-6 transition-all ${step.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                      STAGE {step.num}
                    </span>
                    <div className="p-2 rounded bg-white/80 border border-slate-200/60 shadow-2xs">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    {step.tag}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Hierarchy Step {idx + 1} of 6</span>
                  {idx < 5 ? (
                    <span className="text-blue-600 font-bold">↓ Next</span>
                  ) : (
                    <span className="text-emerald-600 font-bold">✓ Executed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Compliance Note */}
        <div className="mt-10 rounded-lg border border-blue-100 bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
            <p>
              <strong className="text-slate-900 font-semibold">Regulatory Reference:</strong> Smoke-control requirements depend on building type, occupancy, configuration, and applicable local codes (including IBC Section 909 and NFPA 92 standards).
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-blue-600 shrink-0 uppercase tracking-wider">
            Supervised Priority Logic
          </span>
        </div>

      </div>
    </section>
  );
}
