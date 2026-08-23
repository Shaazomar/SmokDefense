"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

type NavTab = "BUILDING" | "FLOORS" | "ZONES" | "DEVICES" | "CONTROL" | "NETWORK" | "POWER" | "EVENTS";

const ZONES_LEVEL_18 = [
  { id: "01", name: "ZONE 18-01", status: "NORMAL", color: "text-emerald-600 border-emerald-500/40 bg-emerald-50/50" },
  { id: "02", name: "ZONE 18-02", status: "NORMAL", color: "text-emerald-600 border-emerald-500/40 bg-emerald-50/50" },
  { id: "03", name: "ZONE 18-03", status: "ALERT", color: "text-red-600 border-red-500 bg-red-50" },
  { id: "04", name: "ZONE 18-04", status: "NORMAL", color: "text-emerald-600 border-emerald-500/40 bg-emerald-50/50" },
];

export function BuildingExplorerSection() {
  const [activeTab, setActiveTab] = useState<NavTab>("ZONES");
  const [selectedZone, setSelectedZone] = useState("03");

  const isZone03 = selectedZone === "03";

  return (
    <section id="explorer" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">05 / SIGNATURE FEATURE</span>
            <DemoTag label="[DEMO / ILLUSTRATIVE]" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            BUILDING EXPLORER.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Explore building geometry, floorplates, containment zones, field devices, control loops, network gateways, power states, and live event logs.
          </p>
        </div>

        {/* Top Explorer Navigation Bar */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4 font-mono text-xs font-bold">
          {(["BUILDING", "FLOORS", "ZONES", "DEVICES", "CONTROL", "NETWORK", "POWER", "EVENTS"] as NavTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeTab === tab
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Explorer Interactive Interface */}
        <div className="border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold text-accent">[SPATIAL INSPECTOR]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">LEVEL 18 FLOORPLATE EXPLORER</h3>
            </div>
            <DemoTag label="[DEMO / ILLUSTRATIVE DATA]" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Floor Zones List Column */}
            <div className="space-y-4 lg:col-span-5 font-mono text-xs">
              <span className="font-bold text-ink-faint uppercase block">LEVEL 18 CONTAINMENT ZONES</span>

              <div className="space-y-3">
                {ZONES_LEVEL_18.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z.id)}
                    className={`flex w-full items-center justify-between border p-4 text-left font-bold transition-all ${z.color} ${
                      selectedZone === z.id ? "ring-2 ring-accent" : ""
                    }`}
                  >
                    <span>{z.name}</span>
                    <span className="uppercase font-extrabold">{z.status}</span>
                  </button>
                ))}
              </div>

              <div className="border border-line p-4 bg-canvas text-ink-soft">
                <span className="font-bold text-ink block mb-1">INSPECTION FOCUS:</span>
                <p>Click Zone 03 to inspect active smoke alert status and automated mechanical system response.</p>
              </div>
            </div>

            {/* Camera Floor / Zone Focus Telemetry View */}
            <div className="border border-line bg-canvas p-6 lg:col-span-7 flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="flex items-center justify-between border-b border-line/60 pb-3 font-mono text-xs">
                  <span className="font-bold text-accent">ZONE VIEW // ZONE 18-{selectedZone}</span>
                  <span className="text-ink-soft">STATUS: {isZone03 ? "ALERT" : "NORMAL"}</span>
                </div>

                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border p-3 bg-white">
                    <span className="text-ink-soft">EVENT STATE:</span>
                    <span className={`font-bold ${isZone03 ? "text-red-600" : "text-emerald-600"}`}>
                      {isZone03 ? "SMOKE ALERT" : "NORMAL"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border p-3 bg-white">
                    <span className="text-ink-soft">EXHAUST FAN:</span>
                    <span className="font-bold text-accent">{isZone03 ? "FAN RUNNING" : "STANDBY"}</span>
                  </div>

                  <div className="flex items-center justify-between border p-3 bg-white">
                    <span className="text-ink-soft">SMOKE DAMPER:</span>
                    <span className="font-bold text-emerald-600">{isZone03 ? "DAMPER OPEN" : "CLOSED (ISOLATED)"}</span>
                  </div>

                  <div className="flex items-center justify-between border p-3 bg-white">
                    <span className="text-ink-soft">PRESSURE GRADIENT:</span>
                    <span className="font-bold text-ink">PRESSURE NORMAL (+45 Pa)</span>
                  </div>

                  <div className="flex items-center justify-between border p-3 bg-white">
                    <span className="text-ink-soft">UUKL CONTROLLER:</span>
                    <span className="font-bold text-emerald-600">CONTROLLER ONLINE</span>
                  </div>

                  <div className="flex items-center justify-between border p-3 bg-white">
                    <span className="text-ink-soft">NETWORK LINK:</span>
                    <span className="font-bold text-accent">NETWORK CONNECTED (IP500)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-ink-faint border-t border-line/60 pt-3">
                <span>ALL TELEMETRY DATA IS MARKED AS [DEMO / ILLUSTRATIVE]</span>
                <span>BUILDING 3D TWIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
