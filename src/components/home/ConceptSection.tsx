"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Eye, 
  Cpu, 
  SlidersHorizontal, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const CONCEPT_STAGES = [
  {
    step: "01",
    id: "building",
    label: "BUILDING",
    icon: Building2,
    sub: "Physical Infrastructure",
    description: "Multi-floor zones, shafts, escape stairwells, lift lobbies, car parks and mechanical plant rooms.",
    metrics: ["HVAC Ductwork", "Escape Stairwells", "Car Park Basements", "Smoke Compartments"],
  },
  {
    step: "02",
    id: "detection",
    label: "DETECTION",
    icon: Eye,
    sub: "Sensing Grid",
    description: "CO, CO₂, differential pressure transducers, optical smoke detectors and thermal triggers.",
    metrics: ["NDIR CO₂ Monitoring", "ΔP Transducers", "Smoke Sensor Loops", "Temperature Probes"],
  },
  {
    step: "03",
    id: "intelligence",
    label: "INTELLIGENCE",
    icon: Cpu,
    sub: "Field Logic & Sequencing",
    description: "Field controllers process sensor thresholds and execute engineered cause-and-effect sequences.",
    metrics: ["Deterministic Control", "Cause & Effect Logic", "Autonomous Interlocks", "Supervised Status"],
  },
  {
    step: "04",
    id: "centralized-control",
    label: "CENTRALIZED CONTROL",
    icon: SlidersHorizontal,
    sub: "Fireman Override Panel",
    description: "Physical override station allowing first responders and engineers to command dampers, fans and pressurization.",
    metrics: ["Keyed Override Switches", "Supervised Relays", "LED State Matrix", "Manual Master Tripping"],
    isCore: true,
  },
  {
    step: "05",
    id: "response",
    label: "RESPONSE",
    icon: Zap,
    sub: "Physical Actuation",
    description: "Motorized fire/smoke dampers close, exhaust fans extract smoke, and pressurization maintains positive pressure.",
    metrics: ["Spring-Return Actuators", "50 Pa Stair Defense", "Reversible Jet Fans", "End-Switch Proof"],
  },
];

export function ConceptSection() {
  const [selectedStage, setSelectedStage] = useState(3);

  return (
    <section id="concept" className="relative bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1500px]">
        
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>03 // CONTROL ARCHITECTURE</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.8vw,3.4rem)] font-bold tracking-tight text-slate-950 leading-[1.08]">
            One Coordinated Control Layer.<br />
            <span className="text-slate-500">Connecting Critical Building Safety Systems.</span>
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 md:text-lg">
            Override-R binds physical building infrastructure to real-time sensing, deterministic field logic, and manual command override through a 5-tier architecture.
          </p>
        </div>

        {/* 5-Stage Horizontal Process Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CONCEPT_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStage(idx)}
                className={cn(
                  "relative flex flex-col items-start p-5 rounded-lg border text-left transition-all duration-150 cursor-pointer",
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 shadow-xs"
                    : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300"
                )}
              >
                {stage.isCore && (
                  <span className="absolute -top-2.5 right-3 rounded border border-blue-200 bg-blue-600 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                    PHYSICAL LAYER
                  </span>
                )}

                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {stage.step}
                  </span>
                  <div className={cn(
                    "rounded p-2 border",
                    isSelected
                      ? "border-blue-300 bg-white text-blue-600"
                      : "border-slate-200 bg-white text-slate-700"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-tight text-slate-900">
                  {stage.label}
                </h3>
                
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mt-1">
                  {stage.sub}
                </span>

                <div className="mt-4 pt-3 border-t border-slate-200/80 w-full flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>{isSelected ? "ACTIVE" : "SELECT"}</span>
                  <ArrowRight className={cn("h-3 w-3 transition-transform", isSelected ? "text-blue-600 translate-x-1" : "opacity-40")} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-600">
                  STAGE {CONCEPT_STAGES[selectedStage].step} SPECIFICATION
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-mono text-xs uppercase text-slate-500">
                  {CONCEPT_STAGES[selectedStage].sub}
                </span>
              </div>

              <h3 className="mt-2 font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900">
                {CONCEPT_STAGES[selectedStage].label}
              </h3>

              <p className="mt-3 font-sans text-sm leading-relaxed text-slate-600">
                {CONCEPT_STAGES[selectedStage].description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {CONCEPT_STAGES[selectedStage].metrics.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 rounded border border-slate-200 bg-white p-5 font-mono text-xs text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-slate-500 text-[10px] uppercase">
                <span>SYSTEM COMPLIANCE</span>
                <span className="text-emerald-700 font-bold">VERIFIED</span>
              </div>

              <div className="my-4 space-y-2.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fail-Safe State:</span>
                  <span className="font-semibold text-slate-900">Spring Return</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Feedback Proof:</span>
                  <span className="font-semibold text-blue-700">Dual End-Switches</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Supervision:</span>
                  <span className="font-semibold text-slate-900">Continuous Loop</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Override Mode:</span>
                  <span className="font-semibold text-slate-900">Key-Locked Manual</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                STANDARD: EN 12101 / NFPA 92
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
