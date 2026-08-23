"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { Eye, Layers, Wind, Activity, Zap, Radio, Shield, CheckCircle2 } from "lucide-react";

const EXPLORER_NAV = [
  { id: "building", label: "BUILDING OVERVIEW", desc: "Full 30-story high-rise structural envelope and riser shafts." },
  { id: "floors", label: "FLOORS (18F HIGHLIGHT)", desc: "Floor 18 mechanical room & corridor smoke isolation zones." },
  { id: "zones", label: "CONTAINMENT ZONES", desc: "Zone 18F-03 active pressure boundary & smoke partition." },
  { id: "sensors", label: "OPTICAL SENSORS", desc: "Supervised duct smoke detector loop (SMK-18-01 through 08)." },
  { id: "fans", label: "EXHAUST FANS", desc: "High-capacity roof exhaust fan FAN-03-EX (1,450 RPM ready)." },
  { id: "dampers", label: "SMOKE DAMPERS", desc: "Motorized low-leakage smoke damper DMP-18-E (OPEN)." },
  { id: "pressure", label: "DIFFERENTIAL PRESSURE", desc: "Stairwell B differential pressure transmitter (42.5 Pa)." },
  { id: "network", label: "IP500 MESH NETWORK", desc: "Dual-band wireless mesh node RSSI signal (-64 dBm optimal)." },
  { id: "control", label: "UUKL CONTROLLER", desc: "Dedicated floor controller CTL-18-UUKL (Status Normal)." },
  { id: "power", label: "BATTERY POWER", desc: "LiFePO4 backup battery reserve (98% charged / 24h standby)." },
];

export function BuildingExplorerSection() {
  const [selectedNav, setSelectedNav] = useState(EXPLORER_NAV[2]); // Default Zone 18F-03

  return (
    <section id="explorer" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">08 / SIGNATURE FEATURE</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            INTERACTIVE BUILDING EXPLORER.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Navigate through building floors, smoke containment zones, pressure transmitters, dampers, and controllers in real time.
          </p>
        </div>

        {/* Building Explorer Main Tool Canvas & Sidebar Shell */}
        <div className="mt-10 rounded border border-line bg-white shadow-2xl">
          {/* Top Bar Status Indicator */}
          <div className="flex flex-wrap items-center justify-between border-b border-line bg-canvas px-6 py-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
              <span className="font-bold text-ink">BUILDING INSPECTOR // ACTIVE SELECTION: {selectedNav.label}</span>
            </div>
            <div className="flex gap-4 text-ink-soft">
              <span>FOV: 45°</span>
              <span>MODE: 3D WIREFRAME</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Explorer Navigation Menu */}
            <div className="border-b border-line bg-canvas/40 p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
                EXPLORE NAVIGATION
              </span>
              <div className="mt-3 space-y-1">
                {EXPLORER_NAV.map((nav) => {
                  const isActive = selectedNav.id === nav.id;
                  return (
                    <button
                      key={nav.id}
                      onClick={() => setSelectedNav(nav)}
                      className={`flex w-full items-center justify-between border px-4 py-3 text-left font-mono text-xs uppercase transition-all ${
                        isActive
                          ? "border-ink bg-ink text-white font-bold"
                          : "border-transparent text-ink-soft hover:bg-black/[0.03] hover:text-ink"
                      }`}
                    >
                      <span>{nav.label}</span>
                      {isActive && <span>→</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Telemetry & Spatial Inspector Output */}
            <div className="p-6 md:p-8 lg:col-span-8">
              {/* Simulated 3D Viewport Box */}
              <div className="relative flex min-h-[280px] flex-col justify-between rounded border border-line bg-canvas p-6">
                <div className="flex justify-between font-mono text-xs text-ink-faint">
                  <span>CAMERA CAMERA POS: [X: 3.2, Y: 9.1, Z: 8.0]</span>
                  <span>BUILDING TOWER ALPHA</span>
                </div>

                {/* Live Node Telemetry Display Card */}
                <div className="my-6 max-w-md rounded border border-line bg-white/95 p-6 shadow-md backdrop-blur-xs">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="font-mono text-xs font-bold text-accent">ZONE 18F-03</span>
                    <DemoTag label="TELEMETRY DEMO" />
                  </div>
                  <div className="mt-4 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-ink-soft">STATUS:</span>
                      <span className="font-semibold text-emerald-600">NORMAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">SMOKE SENSOR:</span>
                      <span className="font-semibold text-ink">ONLINE (SMK-18-04)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">EXHAUST FAN:</span>
                      <span className="font-semibold text-ink">READY (FAN-03-EX)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">DAMPER POSITION:</span>
                      <span className="font-semibold text-accent">OPEN (DMP-18-E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">DIFFERENTIAL PRESSURE:</span>
                      <span className="font-semibold text-ink">42.5 Pa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">HARDWARE CONTROLLER:</span>
                      <span className="font-semibold text-ink">ONLINE (UUKL-18)</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-mono text-[10px] text-ink-faint">
                  <span>INSPECTION TARGET: {selectedNav.desc}</span>
                  <span>FEEDBACK: VERIFIED</span>
                </div>
              </div>

              {/* Navigation Description */}
              <div className="mt-6 rounded border border-line p-4 font-mono text-xs text-ink-soft">
                <span className="font-semibold text-ink uppercase">SELECTION PURPOSE:</span>
                <p className="mt-1">{selectedNav.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
