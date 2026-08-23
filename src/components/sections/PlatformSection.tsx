"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { Building, ShieldCheck, Globe, Layers, Eye } from "lucide-react";

type ZoomLevel = "building-a" | "building-b" | "building-c" | "campus" | "portfolio" | "global";

export function PlatformSection() {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("portfolio");

  return (
    <section id="centralized-monitoring" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">06 / CENTRALIZED MONITORING</span>
            <DemoTag label="ENTERPRISE MONITORING ENGINE" />
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            ONE BUILDING. ONE VIEW.<br />
            <span className="text-accent font-display">ONE CONTROL LAYER FOR EVERY BUILDING.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            SmokeDefence aggregates isolated building life-safety systems into a unified operational monitoring environment—from single high-rise towers to entire global real estate portfolios.
          </p>
        </div>

        {/* Portfolio Zoom Controls Bar */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs font-bold border-b border-line pb-4">
          <span className="text-ink-faint py-2 mr-2">ZOOM LEVEL:</span>
          {(
            [
              { id: "building-a", label: "BUILDING A (HQ TOWER)" },
              { id: "building-b", label: "BUILDING B (NORTH TOWER)" },
              { id: "building-c", label: "BUILDING C (LOGISTICS)" },
              { id: "campus", label: "METRO CAMPUS" },
              { id: "portfolio", label: "REGIONAL PORTFOLIO" },
              { id: "global", label: "GLOBAL NETWORK" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setZoomLevel(item.id)}
              className={`border px-4 py-2 uppercase transition-all ${
                zoomLevel === item.id
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Central Monitoring Viewport */}
        <div className="border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold text-accent">[ENTERPRISE TELEMETRY]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">
                CENTRAL OPERATIONAL DASHBOARD
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-600 font-bold border border-emerald-500/40 bg-emerald-50 px-3 py-1">
              SYSTEM STATUS: ALL ASSETS SUPERVISED
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-line bg-canvas p-6 font-mono text-xs">
              <span className="text-ink-soft block font-bold mb-2">MONITORED TOWERS:</span>
              <span className="text-2xl font-bold text-ink block">3 TOWER ASSETS</span>
              <p className="mt-2 text-[11px] text-ink-soft">Real-time status feed across all floorplate zones.</p>
            </div>

            <div className="border border-line bg-canvas p-6 font-mono text-xs">
              <span className="text-ink-soft block font-bold mb-2">ACTIVE CONTROL LOOPS:</span>
              <span className="text-2xl font-bold text-accent block">UUKL VERIFIED</span>
              <p className="mt-2 text-[11px] text-ink-soft">Deterministic fail-safe interlocks active.</p>
            </div>

            <div className="border border-line bg-canvas p-6 font-mono text-xs">
              <span className="text-ink-soft block font-bold mb-2">NETWORK HEALTH:</span>
              <span className="text-2xl font-bold text-emerald-600 block">IP500 MESH OK</span>
              <p className="mt-2 text-[11px] text-ink-soft">Sub-second telemetry updates & backup battery ok.</p>
            </div>
          </div>

          <div className="mt-6 border border-line bg-canvas/80 p-6 font-mono text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-bold text-ink block">SELECTED VIEW: {zoomLevel.toUpperCase()}</span>
              <span className="text-ink-soft">Continuous spatial tracking across building assets.</span>
            </div>
            <a
              href="/contact"
              className="rounded-full bg-ink px-6 py-2.5 text-white font-bold uppercase tracking-widest text-[11px] hover:bg-accent transition-colors"
            >
              Configure Enterprise View →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
