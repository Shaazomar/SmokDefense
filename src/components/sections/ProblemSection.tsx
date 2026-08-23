"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DemoTag } from "@/components/ui/DemoTag";
import { Layers, ShieldAlert, Wind, Activity, CheckCircle2, Cpu } from "lucide-react";

const LAYERS = [
  {
    id: "smoke-zones",
    label: "Smoke Zones",
    icon: ShieldAlert,
    status: "Containment Active",
    desc: "Compartmentalized fire barriers and smoke containment zones prevent toxic smoke from spreading horizontally across floorplates.",
    metric: "12 Zones Monitored",
  },
  {
    id: "stairwells",
    label: "Stairwells",
    icon: Wind,
    status: "Pressurized (+50 Pa)",
    desc: "Dedicated injection fans maintain positive air pressure in egress stairwells, creating an invisible air barrier against smoke ingress.",
    metric: "2 Shafts Active",
  },
  {
    id: "fans",
    label: "Exhaust Fans",
    icon: Activity,
    status: "Standby / Ready",
    desc: "High-capacity roof-mounted mechanical fans draw smoke out of atrium spaces and discharge it safely into the external atmosphere.",
    metric: "36 Fans Connected",
  },
  {
    id: "dampers",
    label: "Fire Dampers",
    icon: CheckCircle2,
    status: "End-Switch Verified",
    desc: "Motorized smoke dampers automatically open or close based on hardwired UUKL safety matrices to control mechanical ventilation paths.",
    metric: "128 Dampers Synced",
  },
  {
    id: "pressure",
    label: "Pressure Zones",
    icon: Layers,
    status: "Differential Normal",
    desc: "Precision differential pressure transmitters continuously monitor air pressure gradients across stairwell doors and elevator shafts.",
    metric: "48 Transmitters",
  },
  {
    id: "sensors",
    label: "Optical Sensors",
    icon: Cpu,
    status: "Supervised Loop",
    desc: "Dual-ray optical smoke sensors detect micro-particles in ductwork and return air plenums before thermal escalation occurs.",
    metric: "240 Detectors",
  },
];

export function ProblemSection() {
  const [selectedLayer, setSelectedLayer] = useState(LAYERS[0]);

  return (
    <section id="problem" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">02 / THE PROBLEM</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            A FIRE IS AN EVENT.<br />
            <span className="text-ink-soft">SMOKE IS A SYSTEM PROBLEM.</span>
          </h2>
        </div>

        {/* 6 Concise Problem Blocks Grid */}
        <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="border border-line bg-canvas p-6 transition-all hover:border-ink">
            <span className="font-mono text-xs text-accent">01.</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase text-ink">Complex Propagation</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Smoke can move rapidly through interconnected building spaces, elevator shafts, stairwells, and utility service risers via buoyancy and stack effect.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6 transition-all hover:border-ink">
            <span className="font-mono text-xs text-accent">02.</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase text-ink">HVAC Dynamics</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              HVAC ventilation systems can inadvertently distribute smoke across floors unless controlled by engineered smoke management sequences.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6 transition-all hover:border-ink">
            <span className="font-mono text-xs text-accent">03.</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase text-ink">Distributed Components</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Large modern buildings contain hundreds of independent dampers, fans, sensors, and controllers that must act in precise synchrony.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6 transition-all hover:border-ink">
            <span className="font-mono text-xs text-accent">04.</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase text-ink">Multi-Zone Visibility</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Facility teams need instant, real-time spatial visibility across all floors and zones to evaluate structural smoke status during alarms.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6 transition-all hover:border-ink">
            <span className="font-mono text-xs text-accent">05.</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase text-ink">Equipment Feedback</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Commanding a fan or damper is insufficient; systems must continuously verify physical position switches and airflow velocity feedback.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6 transition-all hover:border-ink">
            <span className="font-mono text-xs text-accent">06.</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase text-ink">Maintenance Readiness</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Continuous diagnostic testing and battery monitoring ensure equipment operates flawlessly when critical life-safety emergencies occur.
            </p>
          </div>
        </div>

        {/* Interactive Building Cross-Section Inspector */}
        <div className="mt-8 border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[INTERACTIVE CROSS-SECTION]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">Building Life-Safety Layer Inspector</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {LAYERS.map((layer) => {
                const Icon = layer.icon;
                const active = selectedLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer)}
                    className={`flex items-center gap-2 border px-3 py-1.5 font-mono text-xs uppercase transition-all ${
                      active ? "border-ink bg-ink text-white" : "border-line bg-canvas text-ink-soft hover:border-ink"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Layer Inspector Display */}
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Visual Cross-Section Diagram Graphic */}
            <div className="relative flex min-h-[300px] flex-col justify-between rounded border border-line bg-canvas/60 p-6 lg:col-span-7">
              <div className="flex justify-between font-mono text-xs text-ink-faint">
                <span>STRUCTURAL ROOF LEVEL (+120m)</span>
                <span>EXHAUST PLENUM</span>
              </div>

              {/* Floor Layers Wireframe Simulation */}
              <div className="my-6 space-y-3 font-mono text-xs">
                <div className={`flex items-center justify-between border p-3 transition-colors ${selectedLayer.id === "stairwells" || selectedLayer.id === "pressure" ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-soft"}`}>
                  <span>STAIRWELL B SHAFT</span>
                  <span className="font-bold text-accent">+50 Pa PRESSURIZED</span>
                </div>
                <div className={`flex items-center justify-between border p-3 transition-colors ${selectedLayer.id === "smoke-zones" ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-soft"}`}>
                  <span>FLOOR 18 SMOKE ZONE 03</span>
                  <span className="font-bold text-ink">CONTAINMENT ACTIVE</span>
                </div>
                <div className={`flex items-center justify-between border p-3 transition-colors ${selectedLayer.id === "dampers" || selectedLayer.id === "fans" ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-soft"}`}>
                  <span>EXHAUST DAMPER DMP-18</span>
                  <span className="font-bold text-accent">POSITION: OPEN (VERIFIED)</span>
                </div>
              </div>

              <div className="flex justify-between font-mono text-xs text-ink-faint">
                <span>FOUNDATION BASEMENT (-10m)</span>
                <span>IP500 GATEWAY ONLINE</span>
              </div>
            </div>

            {/* Selected Layer Info Panel */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  LAYER STATUS: {selectedLayer.status}
                </span>
              </div>
              <h4 className="font-display text-3xl font-semibold uppercase text-ink">
                {selectedLayer.label}
              </h4>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {selectedLayer.desc}
              </p>
              <div className="mt-4 border-t border-line pt-4 flex items-center justify-between font-mono text-xs">
                <span className="text-ink-faint">ESTIMATED SCALE:</span>
                <span className="font-semibold text-ink">{selectedLayer.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
