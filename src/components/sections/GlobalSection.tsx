"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { Globe, Building, Layers, Cpu, ShieldCheck } from "lucide-react";

export function GlobalSection() {
  const [selectedHierarchy, setSelectedHierarchy] = useState<"site" | "building" | "floor" | "zone" | "device">("building");

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">18 / GLOBAL PLATFORM</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            MULTI-BUILDING ARCHITECTURE.<br />
            <span className="text-ink-soft">GLOBAL ENTERPRISE MANAGEMENT.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Manage multi-tower real estate portfolios, international transportation hubs, and corporate campuses from one unified digital intelligence layer.
          </p>
        </div>

        {/* Spatial Hierarchy Node Tree Bar */}
        <div className="my-10 border border-line bg-white p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[SPATIAL ASSET HIERARCHY]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">Enterprise Hierarchy Drilldown</h3>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs uppercase">
              <button
                onClick={() => setSelectedHierarchy("site")}
                className={`border px-3 py-1.5 transition-all ${selectedHierarchy === "site" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"}`}
              >
                01 SITE
              </button>
              <button
                onClick={() => setSelectedHierarchy("building")}
                className={`border px-3 py-1.5 transition-all ${selectedHierarchy === "building" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"}`}
              >
                02 BUILDING
              </button>
              <button
                onClick={() => setSelectedHierarchy("floor")}
                className={`border px-3 py-1.5 transition-all ${selectedHierarchy === "floor" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"}`}
              >
                03 FLOOR
              </button>
              <button
                onClick={() => setSelectedHierarchy("zone")}
                className={`border px-3 py-1.5 transition-all ${selectedHierarchy === "zone" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"}`}
              >
                04 ZONE
              </button>
              <button
                onClick={() => setSelectedHierarchy("device")}
                className={`border px-3 py-1.5 transition-all ${selectedHierarchy === "device" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"}`}
              >
                05 DEVICE
              </button>
            </div>
          </div>

          {/* Drilldown Output Display */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 font-mono text-xs">
            <div className={`border p-4 transition-all ${selectedHierarchy === "site" ? "border-accent bg-accent/5 font-bold" : "border-line"}`}>
              <span className="text-accent text-[10px]">TIER 01</span>
              <h4 className="mt-1 font-bold text-ink uppercase">GLOBAL SITE</h4>
              <p className="mt-1 text-[11px] text-ink-soft">International Campus / Metropolitan Area</p>
            </div>

            <div className={`border p-4 transition-all ${selectedHierarchy === "building" ? "border-accent bg-accent/5 font-bold" : "border-line"}`}>
              <span className="text-accent text-[10px]">TIER 02</span>
              <h4 className="mt-1 font-bold text-ink uppercase">BUILDING TOWER</h4>
              <p className="mt-1 text-[11px] text-ink-soft">Tower Alpha (30 Floors / UUKL Integrated)</p>
            </div>

            <div className={`border p-4 transition-all ${selectedHierarchy === "floor" ? "border-accent bg-accent/5 font-bold" : "border-line"}`}>
              <span className="text-accent text-[10px]">TIER 03</span>
              <h4 className="mt-1 font-bold text-ink uppercase">FLOOR LEVEL</h4>
              <p className="mt-1 text-[11px] text-ink-soft">Floor 18 Mechanical & Egress</p>
            </div>

            <div className={`border p-4 transition-all ${selectedHierarchy === "zone" ? "border-accent bg-accent/5 font-bold" : "border-line"}`}>
              <span className="text-accent text-[10px]">TIER 04</span>
              <h4 className="mt-1 font-bold text-ink uppercase">SMOKE ZONE</h4>
              <p className="mt-1 text-[11px] text-ink-soft">Zone 18F-03 Corridor Containment</p>
            </div>

            <div className={`border p-4 transition-all ${selectedHierarchy === "device" ? "border-accent bg-accent/5 font-bold" : "border-line"}`}>
              <span className="text-accent text-[10px]">TIER 05</span>
              <h4 className="mt-1 font-bold text-ink uppercase">FIELD DEVICE</h4>
              <p className="mt-1 text-[11px] text-ink-soft">DMP-18-E Motorized Smoke Damper</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
