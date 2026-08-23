"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

export function RetrofitSection() {
  const [transformed, setTransformed] = useState(false);

  return (
    <section id="retrofit" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">11 / REFURBISHMENT & RETROFIT</span>
            <DemoTag label="RETROFIT ENGINEERING" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            OLD BUILDINGS.<br />
            <span className="text-accent font-display">NEW REQUIREMENTS.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Refurbishments, building alterations, or changes in occupancy require reassessment of fire risk and updating the fire-management plan. Retrofit projects present unique physical geometry constraints and technical challenges that require engineered flexibility.
          </p>
        </div>

        {/* 3D Architectural Transformation Visualizer */}
        <div className="my-10 border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold text-accent">[LEGACY TO CONNECTED TRANSFORMATION]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">Retrofit System Upgrade Visualizer</h3>
            </div>
            <button
              onClick={() => setTransformed(!transformed)}
              className="border border-accent bg-accent/10 px-5 py-2.5 font-mono text-xs uppercase font-bold text-accent hover:bg-accent hover:text-white transition-all"
            >
              {transformed ? "← View Legacy Infrastructure" : "Transform Building System →"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Visualizer Display Box */}
            <div className="border border-line bg-canvas p-8 flex flex-col justify-between min-h-[320px] lg:col-span-7 font-mono text-xs">
              <div className="flex justify-between border-b border-line/60 pb-3">
                <span>BUILDING STATE:</span>
                <span className={`font-bold ${transformed ? "text-accent" : "text-amber-600"}`}>
                  {transformed ? "CONNECTED SMOKEDEFENCE SYSTEM" : "LEGACY UNMONITORED SYSTEM"}
                </span>
              </div>

              <div className="my-6 space-y-3">
                <div className="flex justify-between border p-3 bg-white">
                  <span>CONTROL INFRASTRUCTURE:</span>
                  <span className="font-bold text-ink">
                    {transformed ? "IP500 WIRELESS MESH + UUKL" : "ISOLATED ANALOG PANELS"}
                  </span>
                </div>
                <div className="flex justify-between border p-3 bg-white">
                  <span>SPATIAL MONITORING:</span>
                  <span className="font-bold text-ink">
                    {transformed ? "REAL-TIME 3D DIGITAL TWIN" : "NO CENTRAL VISIBILITY"}
                  </span>
                </div>
                <div className="flex justify-between border p-3 bg-white">
                  <span>DAMPER / FAN FEEDBACK:</span>
                  <span className="font-bold text-ink">
                    {transformed ? "SUPERVISED AUXILIARY SWITCHES" : "UNVERIFIED COMMANDS"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-ink-faint border-t border-line/60 pt-3">
                <span>RETROFIT ADAPTABILITY: MINIMAL DESTRUCTIVE WIRING</span>
                <span>COMPLIANCE VERIFIED</span>
              </div>
            </div>

            {/* Retrofit Key Pillars */}
            <div className="space-y-4 lg:col-span-5 font-mono text-xs">
              <div className="border border-line p-4 bg-canvas">
                <span className="font-bold text-accent block">01. EXISTING SYSTEM ASSESSMENT</span>
                <p className="mt-1 text-ink-soft text-[11px] leading-relaxed">
                  Evaluating physical damper condition, ductwork integrity, fan capacity, and wiring conduits.
                </p>
              </div>

              <div className="border border-line p-4 bg-canvas">
                <span className="font-bold text-accent block">02. OCCUPANCY & RISK REASSESSMENT</span>
                <p className="mt-1 text-ink-soft text-[11px] leading-relaxed">
                  Updating smoke management matrices for new building uses, tenant layouts, or floor partitions.
                </p>
              </div>

              <div className="border border-line p-4 bg-canvas">
                <span className="font-bold text-accent block">03. IP500 WIRELESS MESH INTEGRATION</span>
                <p className="mt-1 text-ink-soft text-[11px] leading-relaxed">
                  Overcoming historical cable pathway constraints using high-reliability dual-band wireless mesh nodes.
                </p>
              </div>

              <div className="border border-line p-4 bg-canvas">
                <span className="font-bold text-accent block">04. COMPLIANCE & RE-COMMISSIONING</span>
                <p className="mt-1 text-ink-soft text-[11px] leading-relaxed">
                  Re-testing pressure boundaries and generating digital compliance documentation for local authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
