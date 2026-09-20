"use client";

import React from "react";
import { 
  Flame, 
  Wind, 
  ShieldAlert, 
  Gauge, 
  Cpu, 
  CheckCircle,
  Sliders
} from "lucide-react";

const FIELD_NODES = [
  { name: "FIRE ALARM (FACP)", icon: Flame, spec: "Loop Relays / RS485 Interface", role: "Primary fire and heat detection triggers" },
  { name: "SUPPLY & EXHAUST FANS", icon: Wind, spec: "0-10V / VFD Controller Links", role: "Fresh air supply modulation and zone air changes" },
  { name: "SMOKE EXTRACTION FANS", icon: ShieldAlert, spec: "High-Temp Dual Contactor Starters", role: "F400 high-temperature smoke removal" },
  { name: "STAIR PRESSURIZATION", icon: Gauge, spec: "Closed-Loop ΔP Differential Sensing", role: "50 Pa overpressure protection for escape stairwells" },
  { name: "MOTORIZED F/S DAMPERS", icon: Sliders, spec: "Spring-Return & Dual End-Switches", role: "Compartment isolation and duct smoke routing" },
];

export function SmartBuildingIntegrationSection() {
  return (
    <section className="relative bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1500px]">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>07 // FIELD SYSTEM INTEGRATION</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.8vw,3.4rem)] font-bold tracking-tight text-slate-950 leading-[1.08]">
            Coordinated Field System Integration.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 md:text-lg">
            Override-R connects heterogeneous field actuators, high-temperature fans, differential sensors and fire alarm panels into one supervised life-safety network.
          </p>
        </div>

        {/* Coordinated Field Architecture Box */}
        <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Field Systems */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Field Equipment &amp; Actuators:
              </span>
              {FIELD_NODES.map((node) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.name}
                    className="flex items-center justify-between rounded border border-slate-200 bg-white p-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded border border-slate-200 bg-slate-50 text-slate-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-900 block">{node.name}</span>
                        <span className="text-[11px] text-slate-500">{node.role}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Column: Central Control Layer */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 rounded-lg border border-blue-200 bg-white shadow-xs text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600">
                <Cpu className="h-7 w-7" />
              </div>

              <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 font-bold mt-4">
                CENTRAL SUPERVISION
              </span>
              <h3 className="mt-0.5 font-display text-lg font-bold uppercase tracking-tight text-slate-900">
                Override-R Core
              </h3>
              <p className="mt-2 font-sans text-xs text-slate-600 leading-relaxed">
                Deterministic control logic enforcing hardwired interlocks and priority override across all mechanical life-safety equipment.
              </p>
            </div>

            {/* Right Column: Engineering Outcomes */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Engineering Verification:
              </span>

              <div className="rounded border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-2 text-blue-700 font-mono text-xs font-bold">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Deterministic Life-Safety Priority</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Fire triggers override all standard ventilation duties, holding dampers and exhaust fans in their verified safe emergency positions.
                </p>
              </div>

              <div className="rounded border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-2 text-blue-700 font-mono text-xs font-bold">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Continuous 50 Pa Pressure Holding</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Fast-responding variable speed drives prevent pressure drop during stair door openings while eliminating overpressure risk.
                </p>
              </div>

              <div className="rounded border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-2 text-blue-700 font-mono text-xs font-bold">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Dual End-Switch Confirmation</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Supervised circuits report true physical blade position back to the Fireman Override Panel for immediate operational proof.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
