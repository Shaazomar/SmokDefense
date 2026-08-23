"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DemoTag } from "@/components/ui/DemoTag";
import { AlertTriangle, ShieldAlert, Wind, Layers, ArrowUpRight, Flame } from "lucide-react";

const PROPAGATION_PATHS = [
  {
    id: "corridors",
    name: "Corridors & Egress Routes",
    hazard: "Rapid horizontal smoke travel impairing occupant exit visibility.",
    impact: "Visibility reduction under 2 meters in less than 90 seconds.",
    controlStrategy: "Cross-corridor smoke barriers and high-level exhaust dampers.",
  },
  {
    id: "lobbies",
    name: "Elevator Lobbies",
    hazard: "Vertical chimney draw pulling smoke into upper level lobbies.",
    impact: "Contamination of primary refuge floors and elevator shafts.",
    controlStrategy: "Lobby pressure differentiation and motorized shaft isolation.",
  },
  {
    id: "staircases",
    name: "Protected Staircases",
    hazard: "Smoke ingress making primary emergency exit routes impassable.",
    impact: "Trapping occupants above the fire floor during evacuation.",
    controlStrategy: "Positive air pressure (+50 Pa) injection preventing smoke entry.",
  },
  {
    id: "shafts",
    name: "Vertical Utility Shafts",
    hazard: "Stack effect accelerating hot gases up the height of the tower.",
    impact: "Uncontrolled thermal spread to distant non-fire floors.",
    controlStrategy: "Automated UUKL fire damper closure on non-affected levels.",
  },
  {
    id: "hvac",
    name: "HVAC Duct Network",
    hazard: "Recirculation fans distributing toxic fumes building-wide.",
    impact: "Exposure to hazardous carbon monoxide and toxic combustion gases.",
    controlStrategy: "Instant fan shutdown and motorized duct smoke damper isolation.",
  },
  {
    id: "open-spaces",
    name: "Atriums & Open Spaces",
    hazard: "Thermal smoke plume expansion filling large volume spaces.",
    impact: "Smoke layer descent obscuring all floor levels simultaneously.",
    controlStrategy: "High-level natural or mechanical smoke exhaust ventilation.",
  },
  {
    id: "multiple-floors",
    name: "Multi-Floor Vertical Risk",
    hazard: "Simultaneous smoke exposure across complex floorplate geometry.",
    impact: "Systemic risk to occupants, first responders, and property.",
    controlStrategy: "Zoned floorplate smoke management matrix with live telemetry.",
  },
];

export function ProblemSection() {
  const [activePath, setActivePath] = useState(PROPAGATION_PATHS[0]);

  return (
    <section id="problem" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">02 / THE PROBLEM</span>
            <DemoTag label="PHYSICS & HAZARD MODEL" />
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            FIRE IS THE EVENT.<br />
            <span className="text-accent font-display">SMOKE IS THE MOVING SYSTEM.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            In modern complex buildings, smoke is not a static byproduct—it is a fluid system driven by buoyancy, thermal expansion, stack effect, and pressure differences. Without engineered smoke control, smoke rapidly impairs visibility, exposes occupants to hazardous toxic gases, and obstructs vital escape and rescue routes.
          </p>
        </div>

        {/* 3 Core Hazard Indicators */}
        <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-3">
          <div className="border border-line bg-canvas p-6 transition-all hover:border-red-500/50">
            <div className="flex items-center justify-between text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-mono text-xs uppercase font-bold">HAZARD 01</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold uppercase text-ink">Visibility Impairment</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Dense soot and particulate matter degrade optical clarity within seconds, obscuring exit signage and disorienting evacuating occupants.
            </p>
          </div>

          <div className="border border-line bg-canvas p-6 transition-all hover:border-red-500/50">
            <div className="flex items-center justify-between text-red-600">
              <Flame className="h-5 w-5" />
              <span className="font-mono text-xs uppercase font-bold">HAZARD 02</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold uppercase text-ink">Toxic Gas Exposure</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Hot combustion gases containing carbon monoxide and hydrogen cyanide migrate through utility shafts faster than occupants can descend stairs.
            </p>
          </div>

          <div className="border border-line bg-canvas p-6 transition-all hover:border-red-500/50">
            <div className="flex items-center justify-between text-red-600">
              <ShieldAlert className="h-5 w-5" />
              <span className="font-mono text-xs uppercase font-bold">HAZARD 03</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold uppercase text-ink">Egress & Rescue Obstruction</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Uncontrolled smoke accumulation in stairwells blocks emergency exit routes and prevents fire service personnel from reaching the fire floor.
            </p>
          </div>
        </div>

        {/* Visual Smoke Movement Pathway Explorer */}
        <div className="mt-6 border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">[SPATIAL PROPAGATION EXPLORER]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink">Smoke Movement Across Building Geometries</h3>
            </div>
            <span className="font-mono text-xs text-ink-soft">SELECT PATHWAY BELOW:</span>
          </div>

          {/* Interactive Pathway Selector Tabs */}
          <div className="my-6 flex flex-wrap gap-2">
            {PROPAGATION_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => setActivePath(path)}
                className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  activePath.id === path.id
                    ? "border-accent bg-accent text-white font-bold"
                    : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {path.name}
              </button>
            ))}
          </div>

          {/* Detailed Movement Visualizer */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center pt-4">
            <div className="relative flex min-h-[260px] flex-col justify-between rounded border border-line bg-canvas/80 p-6 lg:col-span-7">
              <div className="flex items-center justify-between font-mono text-xs text-ink-faint border-b border-line/60 pb-3">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  SIMULATED SMOKE VECTOR
                </span>
                <span className="font-bold text-ink uppercase">{activePath.name}</span>
              </div>

              <div className="my-4 font-mono text-xs space-y-3">
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span className="text-ink-soft">FLUID DRIVER:</span>
                  <span className="font-bold text-ink">Thermal Buoyancy & Stack Effect</span>
                </div>
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span className="text-ink-soft">RISK PROFILE:</span>
                  <span className="font-bold text-red-600">CRITICAL VISIBILITY IMPAIRMENT</span>
                </div>
                <div className="flex justify-between border-b border-line/40 pb-2">
                  <span className="text-ink-soft">SMOKEDEFENCE ACTION:</span>
                  <span className="font-bold text-accent">ENGINEERED CONFINEMENT & EXHAUST</span>
                </div>
              </div>

              <div className="flex justify-between font-mono text-[10px] text-ink-faint border-t border-line/60 pt-3">
                <span>ANALYSIS: DYNAMIC AIRFLOW MODELING</span>
                <span>BUILDING SPECIFIC ENGINE</span>
              </div>
            </div>

            {/* Path Detail Breakdown */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-600">
                  HAZARD ANALYSIS
                </span>
              </div>
              
              <h4 className="font-display text-2xl font-bold uppercase text-ink">
                {activePath.name}
              </h4>

              <div className="space-y-3 font-sans text-xs">
                <div className="border-l-2 border-red-500 pl-3 py-1 bg-red-50/50">
                  <span className="font-mono font-bold text-red-700 block">HAZARD MECHANISM:</span>
                  <span className="text-ink-soft">{activePath.hazard}</span>
                </div>
                <div className="border-l-2 border-line pl-3 py-1">
                  <span className="font-mono font-bold text-ink block">OCCUPANT IMPACT:</span>
                  <span className="text-ink-soft">{activePath.impact}</span>
                </div>
                <div className="border-l-2 border-accent pl-3 py-1 bg-accent/5">
                  <span className="font-mono font-bold text-accent block">ENGINEERED MITIGATION:</span>
                  <span className="text-ink">{activePath.controlStrategy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
