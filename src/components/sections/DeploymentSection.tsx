"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

const LIFECYCLE_STAGES = [
  "DESIGN",
  "ENGINEERING",
  "MANUFACTURING",
  "INSTALLATION",
  "COMMISSIONING",
  "HANDOVER",
  "MONITORING",
  "MAINTENANCE",
  "UPGRADE",
] as const;

export function DeploymentSection() {
  const [activeStage, setActiveStage] = useState<number>(4);

  return (
    <section id="project-lifecycle" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">17 / PROJECT LIFECYCLE</span>
            <DemoTag label="END-TO-END METHODOLOGY" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            PROJECT LIFECYCLE PIPELINE.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            SmokeDefence manages the complete project lifecycle from initial architectural design through engineering submittals, panel manufacturing, installation, specialist commissioning, handover documentation, monitoring, long-term maintenance, and system upgrades.
          </p>
        </div>

        {/* Animated Lifecycle Pipeline Bar */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs font-bold border-b border-line pb-4">
          {LIFECYCLE_STAGES.map((stage, idx) => (
            <button
              key={stage}
              onClick={() => setActiveStage(idx)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeStage === idx
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              0{idx + 1}. {stage}
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Display */}
        <div className="border border-line bg-white p-8">
          <div className="flex justify-between items-center border-b border-line pb-4 font-mono text-xs">
            <span className="font-bold text-accent">[LIFECYCLE PIPELINE // STAGE 0{activeStage + 1}]</span>
            <span className="text-ink-soft">STAGE: {LIFECYCLE_STAGES[activeStage]}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col items-start gap-4 lg:col-span-6">
              <span className="font-mono text-xs font-bold text-accent">STAGE OVERVIEW</span>
              <h3 className="font-display text-3xl font-bold uppercase text-ink">
                {LIFECYCLE_STAGES[activeStage]} STAGE EXECUTION
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {activeStage === 5 ? (
                  "Handover documentation includes full component location schedules, commissioning certificates, operating instructions, logic matrices, and defined maintenance responsibilities."
                ) : (
                  `Structured ${LIFECYCLE_STAGES[activeStage].toLowerCase()} workflow ensuring compliance with engineering specifications and local building regulations.`
                )}
              </p>
            </div>

            <div className="border border-line bg-canvas p-6 lg:col-span-6 space-y-3 font-mono text-xs">
              <span className="font-bold text-ink block mb-2">HANDOVER & MILESTONE DELIVERABLES:</span>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>COMPONENT SCHEDULES:</span>
                <span className="font-bold text-ink">MAPPED & LOGGED</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>COMMISSIONING CERTIFICATES:</span>
                <span className="font-bold text-emerald-600">DIGITAL PDF VERIFIED</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>OPERATING INSTRUCTIONS:</span>
                <span className="font-bold text-ink">FACILITY MANUALS SUPPLIED</span>
              </div>
              <div className="flex justify-between">
                <span>MAINTENANCE RESPONSIBILITIES:</span>
                <span className="font-bold text-accent">DEFINED IN CONTRACT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
