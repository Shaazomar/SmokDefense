"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

type Mode = "automatic" | "manual" | "fire-service";

export function ControlOverrideSection() {
  const [activeMode, setActiveMode] = useState<Mode>("automatic");
  const [flowStep, setFlowStep] = useState(0);

  const simulateControlFlow = () => {
    setFlowStep(1);
    setTimeout(() => setFlowStep(2), 600);
    setTimeout(() => setFlowStep(3), 1200);
    setTimeout(() => setFlowStep(4), 1800);
    setTimeout(() => setFlowStep(5), 2400);
    setTimeout(() => setFlowStep(6), 3000);
    setTimeout(() => setFlowStep(7), 3600);
  };

  return (
    <section id="control-and-override" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">07 / CONTROL & OVERRIDE</span>
            <DemoTag label="AUTHORIZED HUMAN CONTROL" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            WHEN THE SYSTEM<br />
            <span className="text-accent font-display">NEEDS HUMAN AUTHORITY.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            While local UUKL safety matrices execute automatically, engineered systems provide authenticated manual control and fire service override interfaces when incident commanders require explicit physical control.
          </p>
        </div>

        {/* 3 Control Modes Selection */}
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <button
            onClick={() => setActiveMode("automatic")}
            className={`border p-6 text-left transition-all ${
              activeMode === "automatic"
                ? "border-accent bg-accent/5 font-bold shadow-sm"
                : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="font-mono text-xs text-accent uppercase font-bold">MODE 01</span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase text-ink">AUTOMATIC</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Standard state executing pre-programmed hardwired UUKL safety matrix sequences automatically upon alarm activation.
            </p>
          </button>

          <button
            onClick={() => setActiveMode("manual")}
            className={`border p-6 text-left transition-all ${
              activeMode === "manual"
                ? "border-accent bg-accent/5 font-bold shadow-sm"
                : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="font-mono text-xs text-accent uppercase font-bold">MODE 02</span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase text-ink">AUTHORIZED MANUAL</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Role-based manual override interface for facility engineers following strict multi-factor authentication challenges.
            </p>
          </button>

          <button
            onClick={() => setActiveMode("fire-service")}
            className={`border p-6 text-left transition-all ${
              activeMode === "fire-service"
                ? "border-red-500 bg-red-50 font-bold shadow-sm"
                : "border-line bg-canvas hover:border-ink"
            }`}
          >
            <span className="font-mono text-xs text-red-600 uppercase font-bold">MODE 03</span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase text-ink">FIRE SERVICE OVERRIDE</h3>
            <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
              Dedicated high-priority physical switches enabling incident commanders to manually force smoke exhaust fans and dampers.
            </p>
          </button>
        </div>

        {/* Control Flow Sequence Simulator */}
        <div className="border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold text-accent">[CINEMATIC CONTROL FLOW]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">System Command & Feedback Pipeline</h3>
            </div>
            <button
              onClick={simulateControlFlow}
              className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-accent"
            >
              Simulate Control Sequence →
            </button>
          </div>

          {/* 7-Step Control Flow Pipeline */}
          <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-xs">
            {[
              { label: "EVENT", desc: "Thermal / Smoke Detection" },
              { label: "DETECTION", desc: "Supervised Sensor Loop" },
              { label: "SYSTEM LOGIC", desc: "Hardwired UUKL Matrix" },
              { label: "CONTROL", desc: "Relay Output Signal" },
              { label: "DEVICE RESPONSE", desc: "Damper / Fan Actuation" },
              { label: "FEEDBACK", desc: "Auxiliary End-Switch" },
              { label: "EVENT RECORD", desc: "Immutable Audit Log" },
            ].map((step, idx) => {
              const active = flowStep >= idx + 1;
              return (
                <React.Fragment key={idx}>
                  <div className={`border p-3 text-center w-full transition-all ${
                    active ? "border-accent bg-accent/5 font-bold text-ink" : "border-line text-ink-faint"
                  }`}>
                    <span className="block text-[10px] text-accent">0{idx + 1}.</span>
                    <span className="block text-ink font-bold">{step.label}</span>
                    <span className="block text-[9px] text-ink-soft">{step.desc}</span>
                  </div>
                  {idx < 6 && <span className={`hidden md:inline font-bold ${active ? "text-accent" : "text-ink-faint"}`}>→</span>}
                </React.Fragment>
              );
            })}
          </div>

          {/* Status Badges */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 font-mono text-xs">
            <div className={`border p-4 transition-all ${flowStep >= 4 ? "border-accent bg-accent/5 text-ink font-bold" : "border-line text-ink-faint"}`}>
              <span className="text-[10px] text-accent uppercase font-bold">STATUS 01</span>
              <p className="mt-1 text-sm font-bold text-ink">COMMAND SENT</p>
            </div>
            <div className={`border p-4 transition-all ${flowStep >= 5 ? "border-accent bg-accent/5 text-ink font-bold" : "border-line text-ink-faint"}`}>
              <span className="text-[10px] text-accent uppercase font-bold">STATUS 02</span>
              <p className="mt-1 text-sm font-bold text-ink">FEEDBACK RECEIVED</p>
            </div>
            <div className={`border p-4 transition-all ${flowStep >= 6 ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold" : "border-line text-ink-faint"}`}>
              <span className="text-[10px] text-emerald-600 uppercase font-bold">STATUS 03</span>
              <p className="mt-1 text-sm font-bold text-emerald-700">CONFIRMED OPEN</p>
            </div>
            <div className={`border p-4 transition-all ${flowStep >= 7 ? "border-ink bg-ink text-white font-bold" : "border-line text-ink-faint"}`}>
              <span className="text-[10px] text-accent uppercase font-bold">STATUS 04</span>
              <p className="mt-1 text-sm font-bold">LOGGED IN LEDGER</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
