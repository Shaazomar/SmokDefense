"use client";

import React, { useState } from "react";
import { Eye, Brain, Sliders, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "DETECT",
    icon: Eye,
    tagline: "Sensory Intake",
    summary: "Sensors, CCTV and fire systems identify abnormal conditions.",
    details: "Continuous monitoring of air quality, CO/CO₂ concentration, differential pressure thresholds, and fire alarm loop triggers.",
    metrics: "Continuous Scan",
  },
  {
    step: "02",
    title: "UNDERSTAND",
    icon: Brain,
    tagline: "System Intelligence",
    summary: "System intelligence interprets the building situation.",
    details: "Correlates multi-zone detector signals against the spatial building layout to isolate origin floors, smoke propagation, and tenability zones.",
    metrics: "Deterministic Logic",
  },
  {
    step: "03",
    title: "CONTROL",
    icon: Sliders,
    tagline: "Central Coordination",
    summary: "Critical building systems become centrally coordinated.",
    details: "Override-R takes supervisory command of ventilation fans, dampers, and pressurization units according to engineered fire cause-and-effect matrices.",
    metrics: "Supervised Interlocks",
  },
  {
    step: "04",
    title: "RESPOND",
    icon: Zap,
    tagline: "Dynamic Actuation",
    summary: "Ventilation, smoke extraction, dampers and pressurization respond.",
    details: "Motorized dampers isolate smoke zones, high-temperature exhaust fans extract toxic gases, and stair pressurization maintains positive escape pressure.",
    metrics: "Rapid Stroke Action",
  },
  {
    step: "05",
    title: "PROTECT",
    icon: ShieldCheck,
    tagline: "Operational Picture",
    summary: "Emergency teams receive a clearer operational picture.",
    details: "First responders command physical zones from the Fireman Override Panel while occupants evacuate through smoke-free pressurized stairwells.",
    metrics: "Life-Safety Verified",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1500px]">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>05 // SEQUENCE OF OPERATION</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.8vw,3.4rem)] font-bold tracking-tight text-slate-950 leading-[1.08]">
            How Override-R Works.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600 md:text-lg">
            A deterministic 5-stage life-safety sequence engineered for rapid smoke containment, pressurization control and emergency coordination.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "group relative flex flex-col justify-between rounded-lg border p-5 transition-all duration-150 cursor-pointer",
                  isActive
                    ? "border-blue-600 bg-blue-50/50 shadow-xs"
                    : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300"
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {step.step}
                    </span>
                    <div className={cn(
                      "rounded p-2 border",
                      isActive
                        ? "border-blue-300 bg-white text-blue-600"
                        : "border-slate-200 bg-white text-slate-700"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block mt-0.5">
                    {step.tagline}
                  </span>

                  <p className="mt-3 font-sans text-xs leading-relaxed text-slate-600">
                    {step.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 font-mono text-[10px] flex items-center justify-between text-slate-500">
                  <span className="text-blue-700 font-semibold">{step.metrics}</span>
                  <span>{isActive ? "ACTIVE" : "SELECT"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative Box */}
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                Operational Narrative // Stage {WORKFLOW_STEPS[activeStep].step}: {WORKFLOW_STEPS[activeStep].title}
              </span>
              <p className="mt-1.5 font-sans text-sm text-slate-700 leading-relaxed">
                {WORKFLOW_STEPS[activeStep].details}
              </p>
            </div>
            
            <div className="shrink-0 font-mono text-xs text-slate-600 bg-white border border-slate-200 rounded px-3.5 py-2">
              SUPERVISION: CONTINUOUS LOOP
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
