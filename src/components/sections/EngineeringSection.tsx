"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

type BuildingMode = "high-rise" | "warehouse" | "car-park" | "atrium";

export function EngineeringSection() {
  const [mode, setMode] = useState<BuildingMode>("high-rise");
  const [activeDimension, setActiveDimension] = useState<"type" | "geometry" | "config" | "airflow" | "location">("type");

  return (
    <section id="engineering" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">12 / ENGINEERING DIMENSIONS</span>
            <DemoTag label="TAILORED PHYSICS ENGINE" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            EVERY BUILDING<br />
            <span className="text-accent font-display">IS DIFFERENT.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Smoke-control design depends on building type, geometry, configuration, airflow physics, location, occupancy, and applicable local regulations. There is no single universal solution—each project requires tailored engineering.
          </p>
        </div>

        {/* 5 Dimensions Tabs */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs font-bold border-b border-line pb-4">
          <span className="text-ink-faint py-2 mr-2">5 CORE DIMENSIONS:</span>
          {[
            { id: "type", label: "01 TYPE" },
            { id: "geometry", label: "02 GEOMETRY" },
            { id: "config", label: "03 CONFIGURATION" },
            { id: "airflow", label: "04 AIRFLOW" },
            { id: "location", label: "05 LOCATION" },
          ].map((dim) => (
            <button
              key={dim.id}
              onClick={() => setActiveDimension(dim.id as any)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeDimension === dim.id
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {dim.label}
            </button>
          ))}
        </div>

        {/* Morphing Building Selection Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 my-6 font-mono text-xs">
          <button
            onClick={() => setMode("high-rise")}
            className={`border p-5 text-left transition-all ${
              mode === "high-rise" ? "border-accent bg-accent/5 font-bold shadow-sm" : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="text-accent font-bold">01 // HIGH-RISE</span>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink">PRESSURIZATION</h3>
            <p className="mt-1 text-[11px] text-ink-soft">Protected stairwell & shaft overpressure systems.</p>
          </button>

          <button
            onClick={() => setMode("warehouse")}
            className={`border p-5 text-left transition-all ${
              mode === "warehouse" ? "border-accent bg-accent/5 font-bold shadow-sm" : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="text-accent font-bold">02 // WAREHOUSE</span>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink">LARGE-VOLUME</h3>
            <p className="mt-1 text-[11px] text-ink-soft">Buoyancy exhaust and high-volume smoke reservoirs.</p>
          </button>

          <button
            onClick={() => setMode("car-park")}
            className={`border p-5 text-left transition-all ${
              mode === "car-park" ? "border-accent bg-accent/5 font-bold shadow-sm" : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="text-accent font-bold">03 // CAR PARK</span>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink">MECHANICAL EXHAUST</h3>
            <p className="mt-1 text-[11px] text-ink-soft">Induction jet fans and CO extraction shafts.</p>
          </button>

          <button
            onClick={() => setMode("atrium")}
            className={`border p-5 text-left transition-all ${
              mode === "atrium" ? "border-accent bg-accent/5 font-bold shadow-sm" : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="text-accent font-bold">04 // ATRIUM</span>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-ink">NATURAL VENTILATION</h3>
            <p className="mt-1 text-[11px] text-ink-soft">Automatic roof vents & drop smoke curtains.</p>
          </button>
        </div>

        {/* Selected Mode Engineering Display */}
        <div className="border border-line bg-white p-6 md:p-8">
          <div className="flex justify-between items-center border-b border-line pb-4 font-mono text-xs">
            <span className="font-bold text-accent">[TAILORED SOLUTION ARCHITECTURE]</span>
            <span className="text-ink-soft">GEOMETRY DRIVEN</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="border border-line bg-canvas p-6 lg:col-span-7 font-mono text-xs space-y-3">
              <span className="font-bold text-ink block mb-2">ENGINEERING PARAMETERS:</span>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>PRIMARY REGULATORY GOAL:</span>
                <span className="font-bold text-ink uppercase">Tenable Egress Environment</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>OCCUPANCY CATEGORY:</span>
                <span className="font-bold text-ink uppercase">Assembly / High Density</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-2">
                <span>RECOMMENDED SYSTEM:</span>
                <span className="font-bold text-accent uppercase">{mode} Architecture</span>
              </div>
            </div>

            <div className="border border-line bg-canvas p-6 lg:col-span-5 font-mono text-xs space-y-3">
              <span className="font-bold text-ink block mb-2">ADDITIONAL FACTORS:</span>
              <p className="text-ink-soft text-[11px] leading-relaxed">
                Occupancy density, fuel load, building height, thermal buoyancy, local code adoption (e.g. NFPA, EN 12101), and emergency service access dictate final component selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
