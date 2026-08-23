"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoTag } from "@/components/ui/DemoTag";
import { Wind, Shield, ArrowUp, Activity, CheckCircle2, ArrowRight } from "lucide-react";

type Mode = "natural" | "mechanical" | "pressurization";

export function SmokeControlSection() {
  const [activeMode, setActiveMode] = useState<Mode>("natural");
  const [step, setStep] = useState<number>(0);

  return (
    <section id="smoke-control" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">03 / SMOKE CONTROL MODES</span>
            <DemoTag label="ENGINEERED CONTROL ARCHITECTURE" />
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            CONTROL THE MOVEMENT.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            The fundamental purpose of a smoke-control system is to restrict the spread of smoke, maintain tenable conditions in escape routes, and assist fire service operations. Depending on building geometry, height, airflow physics, and local safety codes, SmokeDefence integrates three core smoke management philosophies.
          </p>
        </div>

        {/* 3 Mode Switcher Bar */}
        <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            onClick={() => { setActiveMode("natural"); setStep(0); }}
            className={`border p-6 text-left transition-all ${
              activeMode === "natural"
                ? "border-accent bg-accent/5 shadow-md"
                : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODE 01</span>
              {activeMode === "natural" && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold uppercase text-ink">NATURAL SMOKE CONTROL</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft">
              Buoyancy-driven exhaust via high-level automatic roof ventilators and low-level fresh air replacement.
            </p>
          </button>

          <button
            onClick={() => { setActiveMode("mechanical"); setStep(0); }}
            className={`border p-6 text-left transition-all ${
              activeMode === "mechanical"
                ? "border-accent bg-accent/5 shadow-md"
                : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODE 02</span>
              {activeMode === "mechanical" && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold uppercase text-ink">MECHANICAL SMOKE CONTROL</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft">
              Powered extraction fans and targeted motorized dampers extracting smoke from affected fire floors.
            </p>
          </button>

          <button
            onClick={() => { setActiveMode("pressurization"); setStep(0); }}
            className={`border p-6 text-left transition-all ${
              activeMode === "pressurization"
                ? "border-accent bg-accent/5 shadow-md"
                : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODE 03</span>
              {activeMode === "pressurization" && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold uppercase text-ink">SMOKE PRESSURIZATION</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft">
              Controlled overpressure in protected egress stairwells and elevator shafts to keep escape routes clear.
            </p>
          </button>
        </div>

        {/* Interactive Mode Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="border border-line bg-white p-6 md:p-10"
          >
            {activeMode === "natural" && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Visualizer Panel */}
                <div className="relative flex min-h-[320px] flex-col justify-between rounded border border-line bg-canvas/80 p-6 lg:col-span-7">
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-line/60 pb-3">
                    <span className="font-bold text-accent">[ATRIUM DYNAMICS]</span>
                    <span>NATURAL VENTILATION</span>
                  </div>

                  <div className="my-6 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>ROOF VENTILATORS</span>
                      <span className="font-bold text-emerald-600">AUTOMATICALLY OPEN</span>
                    </div>
                    <div className="flex items-center justify-between border border-accent p-3 bg-accent/5">
                      <span>SMOKE CURTAINS</span>
                      <span className="font-bold text-accent">DEPLOYED (ZONE BARRIER)</span>
                    </div>
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>FRESH-AIR REPLACEMENT</span>
                      <span className="font-bold text-ink">LOW-LEVEL INTAKE ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>THERMAL BUOYANCY</span>
                      <span className="font-bold text-amber-600">SMOKE RISING TO EXHAUST PLENUM</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-mono text-[10px] text-ink-faint border-t border-line/60 pt-3">
                    <span>APPLICATIONS: ATRIUMS, SHOPPING MALLS, WAREHOUSES</span>
                    <span>PASSIVE ENERGY PRINCIPLE</span>
                  </div>
                </div>

                {/* Explanation Panel */}
                <div className="flex flex-col gap-4 lg:col-span-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    MODE DETAILS // NATURAL CONTROL
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase text-ink">
                    BUOYANCY-DRIVEN SMOKE EXHAUST
                  </h3>
                  <p className="font-sans text-sm text-ink-soft leading-relaxed">
                    Natural smoke ventilation relies on the buoyancy of hot smoke rising inside large volume spaces such as atriums or open halls. High-level roof ventilators open automatically while smoke curtains deploy to contain lateral drift. Low-level fresh-air openings replace exhausted air to maintain a clear lower reservoir for evacuation.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> High-level roof smoke ventilators & actuators
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Automatic drop smoke curtains & draft barriers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Low-level makeup fresh air inlet louvers
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeMode === "mechanical" && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Visualizer Panel */}
                <div className="relative flex min-h-[320px] flex-col justify-between rounded border border-line bg-canvas/80 p-6 lg:col-span-7">
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-line/60 pb-3">
                    <span className="font-bold text-accent">[MULTI-FLOOR EXTRACTION]</span>
                    <span>POWERED MECHANICAL SYSTEM</span>
                  </div>

                  <div className="my-6 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border border-red-500 p-3 bg-red-50">
                      <span>FIRE EVENT FLOOR (LEVEL 18)</span>
                      <span className="font-bold text-red-600">SMOKE DAMPER OPEN</span>
                    </div>
                    <div className="flex items-center justify-between border border-accent p-3 bg-accent/5">
                      <span>MAIN EXTRACTION FAN</span>
                      <span className="font-bold text-accent">RUNNING (100% DUTY)</span>
                    </div>
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>NON-AFFECTED FLOORS</span>
                      <span className="font-bold text-ink-soft">DAMPERS CLOSED (ISOLATED)</span>
                    </div>
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>EXHAUST SHAFT</span>
                      <span className="font-bold text-emerald-600">NEGATIVE PRESSURE DISCHARGE</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-mono text-[10px] text-ink-faint border-t border-line/60 pt-3">
                    <span>APPLICATIONS: COMMERCIAL TOWELS, HOTELS, HOSPITALS</span>
                    <span>HARDWIRED UUKL CONTROL</span>
                  </div>
                </div>

                {/* Explanation Panel */}
                <div className="flex flex-col gap-4 lg:col-span-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    MODE DETAILS // MECHANICAL CONTROL
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase text-ink">
                    POWERED ZONE EXTRACTION
                  </h3>
                  <p className="font-sans text-sm text-ink-soft leading-relaxed">
                    Mechanical smoke control uses powered extraction fans and motorized smoke dampers to extract smoke directly from the fire compartment. When an alarm triggers on a specific floor, only the damper on that floor strokes open while all other floor dampers remain closed—preventing smoke migration across vertical shafts.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Heavy-duty motorized smoke & fire dampers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Variable-speed high-temperature exhaust fans
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Supervised end-switch position verification
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeMode === "pressurization" && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Visualizer Panel */}
                <div className="relative flex min-h-[320px] flex-col justify-between rounded border border-line bg-canvas/80 p-6 lg:col-span-7">
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-line/60 pb-3">
                    <span className="font-bold text-accent">[OVERPRESSURE BARRIER]</span>
                    <span>DIFFERENTIAL PRESSURE MODEL</span>
                  </div>

                  {/* Impressive Pressure Barrier Diagram */}
                  <div className="my-6 space-y-4 font-mono text-xs">
                    <div className="border border-line bg-white p-4">
                      <div className="text-center font-bold text-accent mb-2">
                        PRESSURE DIFF MATRIX
                      </div>
                      <div className="flex items-center justify-center gap-2 text-center text-[11px]">
                        <span className="border border-emerald-500 bg-emerald-50 px-3 py-2 font-bold text-emerald-700">
                          PROTECTED STAIRWELL<br />+50 Pa (POSITIVE)
                        </span>
                        <span className="text-ink font-bold">───►</span>
                        <span className="border border-red-500 bg-red-50 px-3 py-2 font-bold text-red-700">
                          SMOKE CORRIDOR<br />0 Pa (ACCUMULATION)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>DIFFERENTIAL PRESSURE SENSOR</span>
                      <span className="font-bold text-accent">MONITORING (+50 Pa TARGET)</span>
                    </div>
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>SUPPLY FAN SPEED CONTROL</span>
                      <span className="font-bold text-emerald-600">INVERTER AUTO-TUNED</span>
                    </div>
                    <div className="flex items-center justify-between border border-line p-3 bg-canvas">
                      <span>DOOR OPENING RECOVERY</span>
                      <span className="font-bold text-amber-600">FAST PRESSURE RECOVERY &lt; 2s</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-mono text-[10px] text-ink-faint border-t border-line/60 pt-3">
                    <span>APPLICATIONS: HIGH-RISE STAIRWELLS & ELEVATOR SHAFTS</span>
                    <span>EGRESS PROTECTION</span>
                  </div>
                </div>

                {/* Explanation Panel */}
                <div className="flex flex-col gap-4 lg:col-span-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    MODE DETAILS // PRESSURIZATION
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase text-ink">
                    CONTROLLED OVERPRESSURE BARRIERS
                  </h3>
                  <p className="font-sans text-sm text-ink-soft leading-relaxed">
                    Smoke pressure systems are specialized solutions for complex and high-rise buildings. Powered supply fans inject clean outside air into protected escape routes—such as stairwells and elevator shafts—creating controlled overpressure relative to adjacent corridors. This invisible air pressure barrier prevents smoke from entering escape routes even when doors are momentarily opened.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Differential pressure sensor arrays across doors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Auto-tuning supply fan VFD speed control
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span> Fast pressure recovery upon door closure
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
