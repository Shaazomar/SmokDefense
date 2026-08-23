"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { ShieldCheck, Lock, CheckCircle2, AlertOctagon, KeyRound } from "lucide-react";

export function ControlOverrideSection() {
  const [activeMode, setActiveMode] = useState<"auto" | "manual" | "emergency">("auto");
  const [commandStep, setCommandStep] = useState(0);

  const simulateOverrideCommand = () => {
    setCommandStep(1);
    setTimeout(() => setCommandStep(2), 800);
    setTimeout(() => setCommandStep(3), 1600);
    setTimeout(() => setCommandStep(4), 2400);
  };

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">09 / CONTROL & OVERRIDE</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            WHEN AUTOMATION<br />
            <span className="text-ink-soft">ISN'T ENOUGH.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Governance, role-based authentication, and immutable audit logging for authorized operator interventions during unexpected building conditions.
          </p>
        </div>

        {/* Operating Modes Selection Grid */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            onClick={() => setActiveMode("auto")}
            className={`cursor-pointer border p-6 transition-all ${
              activeMode === "auto" ? "border-ink bg-ink text-white" : "border-line bg-canvas text-ink hover:border-ink"
            }`}
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">MODE 01</span>
            <h3 className="mt-2 font-display text-2xl font-semibold uppercase">AUTO MODE</h3>
            <p className={`mt-2 font-sans text-xs ${activeMode === "auto" ? "text-white/80" : "text-ink-soft"}`}>
              Standard state executing pre-configured and approved hardwired UUKL safety matrices immediately upon fire alarm signal.
            </p>
          </div>

          <div
            onClick={() => setActiveMode("manual")}
            className={`cursor-pointer border p-6 transition-all ${
              activeMode === "manual" ? "border-ink bg-ink text-white" : "border-line bg-canvas text-ink hover:border-ink"
            }`}
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">MODE 02</span>
            <h3 className="mt-2 font-display text-2xl font-semibold uppercase">AUTHORIZED MANUAL</h3>
            <p className={`mt-2 font-sans text-xs ${activeMode === "manual" ? "text-white/80" : "text-ink-soft"}`}>
              Permits authenticated facility engineers to manually adjust damper positions or fan speeds following verified security challenge.
            </p>
          </div>

          <div
            onClick={() => setActiveMode("emergency")}
            className={`cursor-pointer border p-6 transition-all ${
              activeMode === "emergency" ? "border-ink bg-ink text-white" : "border-line bg-canvas text-ink hover:border-ink"
            }`}
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">MODE 03</span>
            <h3 className="mt-2 font-display text-2xl font-semibold uppercase">SPECIAL / EMERGENCY</h3>
            <p className={`mt-2 font-sans text-xs ${activeMode === "emergency" ? "text-white/80" : "text-ink-soft"}`}>
              Executes listed emergency smoke purge or pressurization override routines according to engineered system specifications.
            </p>
          </div>
        </div>

        {/* Command Authorization Simulation Panel */}
        <div className="mt-8 border border-line bg-white p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[COMMAND AUDIT SIMULATOR]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">Override Authorization Workflow</h3>
            </div>
            <button
              onClick={simulateOverrideCommand}
              className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent"
            >
              Simulate Command Execution →
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={`border p-4 font-mono text-xs transition-all ${commandStep >= 1 ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-faint"}`}>
              <span className="text-accent font-bold">01. AUTHORIZATION</span>
              <p className="mt-2 text-ink font-semibold">VERIFIED</p>
              <span className="text-[10px] text-ink-soft">MFA Token Validated</span>
            </div>

            <div className={`border p-4 font-mono text-xs transition-all ${commandStep >= 2 ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-faint"}`}>
              <span className="text-accent font-bold">02. COMMAND</span>
              <p className="mt-2 text-ink font-semibold">ACCEPTED</p>
              <span className="text-[10px] text-ink-soft">DMP-18-E Stroke Signal Sent</span>
            </div>

            <div className={`border p-4 font-mono text-xs transition-all ${commandStep >= 3 ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-faint"}`}>
              <span className="text-accent font-bold">03. DEVICE FEEDBACK</span>
              <p className="mt-2 text-ink font-semibold">CONFIRMED</p>
              <span className="text-[10px] text-ink-soft">End-Switch OPEN (11.2s)</span>
            </div>

            <div className={`border p-4 font-mono text-xs transition-all ${commandStep >= 4 ? "border-accent bg-accent/5 text-ink" : "border-line text-ink-faint"}`}>
              <span className="text-accent font-bold">04. IMMUTABLE EVENT</span>
              <p className="mt-2 text-ink font-semibold">LOGGED</p>
              <span className="text-[10px] text-ink-soft">Cryptographic Hash Stored</span>
            </div>
          </div>

          {/* Security & AI Governance Disclaimers */}
          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-2 font-mono text-xs text-ink-soft">
            <div className="border border-line p-4">
              <span className="font-semibold text-ink uppercase">NO UNCHECKED REMOTE CONTROLS:</span>
              <p className="mt-1 text-[11px] leading-relaxed">
                Commands cannot be sent arbitrarily from external networks without authenticated multi-factor credentials and direct physical loop validation.
              </p>
            </div>
            <div className="border border-line p-4">
              <span className="font-semibold text-ink uppercase">NO AI EMERGENCY GENERATION:</span>
              <p className="mt-1 text-[11px] leading-relaxed">
                Artificial intelligence is strictly used for diagnostic analytics and anomaly detection. Emergency sequences remain 100% deterministic and pre-engineered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
