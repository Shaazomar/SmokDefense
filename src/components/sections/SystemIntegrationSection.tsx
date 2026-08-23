"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { Network, Wind, Flame, ShieldAlert, Cpu, Layers } from "lucide-react";

export function SystemIntegrationSection() {
  const [hvacFireEvent, setHvacFireEvent] = useState(false);
  const [sprinklerActive, setSprinklerActive] = useState(false);

  return (
    <section id="system-integration" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">08 / SYSTEM INTEGRATION</span>
            <DemoTag label="HOLISTIC BUILDING ENGINEERING" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            SMOKE CONTROL<br />
            <span className="text-accent font-display">DOESN'T WORK ALONE.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Smoke control systems do not operate in isolation. They form part of a wider building life-safety architecture, interacting directly with fire detection, mechanical HVAC, automatic sprinklers, elevator recall, evacuation acoustics, and building management systems (BMS).
          </p>
        </div>

        {/* SmokeDefence Hub Radial Network Map */}
        <div className="my-10 border border-line bg-white p-6 md:p-10 text-center">
          <span className="font-mono text-xs font-bold text-accent uppercase block mb-4">[INTEGRATION RADIAL ARCHITECTURE]</span>
          
          <div className="relative mx-auto max-w-4xl py-8">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-accent bg-accent/10 shadow-lg font-mono font-bold text-ink">
              SMOKEDEFENCE<br />
              <span className="text-[10px] text-accent">CENTRAL HUB</span>
            </div>

            {/* Surrounding Connected Systems Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-xs">
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">FIRE DETECTION</span>
                <span className="text-[10px] text-ink-soft">FACP Alarm Matrix</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">HVAC SYSTEM</span>
                <span className="text-[10px] text-ink-soft">Air Handler Isolation</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">SPRINKLERS</span>
                <span className="text-[10px] text-ink-soft">Waterflow Switches</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">ELEVATORS</span>
                <span className="text-[10px] text-ink-soft">Phase I & II Recall</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">DAMPERS</span>
                <span className="text-[10px] text-ink-soft">Auxiliary Switches</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">FANS</span>
                <span className="text-[10px] text-ink-soft">VFD Speed & CTs</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">EVACUATION</span>
                <span className="text-[10px] text-ink-soft">Voice Alarm Interface</span>
              </div>
              <div className="border border-line bg-canvas p-4 text-center">
                <span className="font-bold text-ink block">BMS / SCADA</span>
                <span className="text-[10px] text-ink-soft">BACnet IP Gateway</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Detailed Interactive Simulators */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Interactive HVAC Interaction Simulator */}
          <div className="border border-line bg-white p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
              <span className="font-bold text-accent">01 // HVAC SYSTEM INTERACTION</span>
              <button
                onClick={() => setHvacFireEvent(!hvacFireEvent)}
                className="border border-line bg-canvas px-3 py-1 text-[11px] font-bold text-ink hover:border-ink"
              >
                {hvacFireEvent ? "Reset HVAC Normal State" : "Simulate Fire Event →"}
              </button>
            </div>

            <h3 className="mt-4 font-display text-xl font-bold uppercase text-ink">
              AIRFLOW & DAMPER DYNAMICS
            </h3>

            <div className="my-6 border border-line bg-canvas p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>RECIRCULATION AHU:</span>
                <span className={`font-bold ${hvacFireEvent ? "text-red-600" : "text-emerald-600"}`}>
                  {hvacFireEvent ? "SHUTDOWN (ISOLATED)" : "NORMAL AIR SUPPLY"}
                </span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>FIRE/SMOKE DAMPERS:</span>
                <span className={`font-bold ${hvacFireEvent ? "text-accent" : "text-ink"}`}>
                  {hvacFireEvent ? "FLOOR 18 OPEN / OTHERS CLOSED" : "ALL DAMPERS OPEN"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SMOKE PLUME PATH:</span>
                <span className="font-bold text-ink">
                  {hvacFireEvent ? "REDIRECTED TO EXHAUST SHAFT" : "UNRESTRICTED"}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-ink-soft leading-relaxed">
              When a fire event occurs, general Comfort HVAC fans shut down immediately while dedicated smoke dampers redirect smoke into engineered exhaust shafts—preventing toxic gas recirculation across non-affected floorplates.
            </p>
          </div>

          {/* Interactive Sprinkler Interaction Simulator */}
          <div className="border border-line bg-white p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
              <span className="font-bold text-accent">02 // SPRINKLER INTERACTION</span>
              <button
                onClick={() => setSprinklerActive(!sprinklerActive)}
                className="border border-line bg-canvas px-3 py-1 text-[11px] font-bold text-ink hover:border-ink"
              >
                {sprinklerActive ? "Reset Sprinkler State" : "Simulate Waterflow →"}
              </button>
            </div>

            <h3 className="mt-4 font-display text-xl font-bold uppercase text-ink">
              HOLISTIC WATER & SMOKE COORDINATION
            </h3>

            <div className="my-6 border border-line bg-canvas p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>WATERFLOW SWITCH:</span>
                <span className={`font-bold ${sprinklerActive ? "text-emerald-600" : "text-ink-soft"}`}>
                  {sprinklerActive ? "WATERFLOW DETECTED" : "STANDBY"}
                </span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>THERMAL PLUME STRATIFICATION:</span>
                <span className="font-bold text-amber-600">
                  {sprinklerActive ? "WATER SPRAY COOLING SMOKE" : "HIGH THERMAL BUOYANCY"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SMOKE CONTROL ACTION:</span>
                <span className={`font-bold ${sprinklerActive ? "text-accent" : "text-ink"}`}>
                  {sprinklerActive ? "MECHANICAL EXHAUST ENFORCED" : "MONITORING LOOP"}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-ink-soft leading-relaxed">
              Sprinklers suppress fire heat, which can reduce smoke buoyancy and cause thermal stratification. Smoke control systems must be engineered holistically alongside sprinkler designs to ensure mechanical extraction fans pull cooled smoke out of lower zones effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
