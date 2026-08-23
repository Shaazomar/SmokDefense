"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

export function MaintenanceSection() {
  const [faultInjected, setFaultInjected] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);

  const injectFault = () => {
    setFaultInjected(true);
    setTimelineStep(1);
  };

  const resetHealth = () => {
    setFaultInjected(false);
    setTimelineStep(0);
  };

  return (
    <section id="maintenance" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">10 / MAINTENANCE</span>
            <DemoTag label="PREDICTIVE HEALTH SURVEILLANCE" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            READY BEFORE<br />
            <span className="text-accent font-display">YOU NEED IT.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Smoke control system performance depends on the seamless interaction of multiple mechanical and electrical components. Continuous diagnostic surveillance and regular maintenance ensure every component operates flawlessly when called upon.
          </p>
        </div>

        {/* Live System Health Monitor Panel */}
        <div className="my-8 border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center font-mono text-xs">
            <div>
              <span className="font-bold text-accent">[SYSTEM HEALTH SURVEILLANCE]</span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">Real-Time Component Diagnostics</h3>
            </div>
            <div className="flex items-center gap-3">
              {!faultInjected ? (
                <button
                  onClick={injectFault}
                  className="border border-red-500 bg-red-50 px-4 py-2 font-bold text-red-600 hover:bg-red-100 transition-colors"
                >
                  Inject Fault (Device D-018) →
                </button>
              ) : (
                <button
                  onClick={resetHealth}
                  className="border border-emerald-500 bg-emerald-50 px-4 py-2 font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  Clear Fault (Reset Health) →
                </button>
              )}
            </div>
          </div>

          {/* System Health Badges */}
          <div className="my-6 grid grid-cols-2 gap-4 md:grid-cols-6 font-mono text-xs">
            <div className="border border-line bg-canvas p-4 text-center">
              <span className="text-ink-soft text-[10px] block">CONTROL:</span>
              <span className="font-bold text-emerald-600 text-sm">NORMAL</span>
            </div>
            <div className="border border-line bg-canvas p-4 text-center">
              <span className="text-ink-soft text-[10px] block">POWER:</span>
              <span className="font-bold text-emerald-600 text-sm">NORMAL</span>
            </div>
            <div className="border border-line bg-canvas p-4 text-center">
              <span className="text-ink-soft text-[10px] block">NETWORK:</span>
              <span className="font-bold text-emerald-600 text-sm">NORMAL</span>
            </div>
            <div className={`border p-4 text-center ${faultInjected ? "border-amber-500 bg-amber-50" : "border-line bg-canvas"}`}>
              <span className="text-ink-soft text-[10px] block">DEVICES:</span>
              <span className={`font-bold text-sm ${faultInjected ? "text-amber-700" : "text-emerald-600"}`}>
                {faultInjected ? "ATTENTION" : "NORMAL"}
              </span>
            </div>
            <div className="border border-line bg-canvas p-4 text-center">
              <span className="text-ink-soft text-[10px] block">VENTILATION:</span>
              <span className="font-bold text-emerald-600 text-sm">NORMAL</span>
            </div>
            <div className={`border p-4 text-center ${faultInjected ? "border-red-500 bg-red-50" : "border-line bg-canvas"}`}>
              <span className="text-ink-soft text-[10px] block">EVENTS:</span>
              <span className={`font-bold text-sm ${faultInjected ? "text-red-600" : "text-emerald-600"}`}>
                {faultInjected ? "1 FAULT" : "0"}
              </span>
            </div>
          </div>

          {/* Fault Attention Details Card */}
          {faultInjected && (
            <div className="border border-amber-500 bg-amber-50/60 p-4 font-mono text-xs mb-6">
              <div className="flex justify-between font-bold text-amber-800 border-b border-amber-300 pb-2">
                <span>DEVICE D-018 ATTENTION SIGNAL</span>
                <span>STATUS: INSPECTION REQUIRED</span>
              </div>
              <p className="mt-2 text-ink-soft">
                Damper actuator D-018 on Level 18 East plenum reported sluggish stroke response (18.4s vs 12.0s target). Maintenance action queued.
              </p>
            </div>
          )}

          {/* Maintenance Timeline Sequence */}
          <div className="mt-6 border-t border-line pt-6">
            <span className="font-mono text-xs font-bold text-accent uppercase block mb-4">
              MAINTENANCE TIMELINE WORKFLOW
            </span>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-6 font-mono text-xs">
              {[
                { name: "MONITOR", desc: "Continuous Diagnostic Polling" },
                { name: "TEST", desc: "Off-Peak Stroke Cycling" },
                { name: "IDENTIFY", desc: "Automated Sensor Drift Flag" },
                { name: "SERVICE", desc: "Technician Maintenance Visit" },
                { name: "VERIFY", desc: "Closed-Loop Re-Test" },
                { name: "DOCUMENT", desc: "Digital Sign-Off Certificate" },
              ].map((step, idx) => {
                const stepActive = timelineStep >= idx + 1 || !faultInjected;
                return (
                  <div
                    key={step.name}
                    className={`border p-3 text-center transition-all ${
                      stepActive ? "border-accent bg-accent/5 font-bold text-ink" : "border-line text-ink-faint"
                    }`}
                  >
                    <span className="text-[10px] text-accent block">0{idx + 1}.</span>
                    <span className="font-bold text-ink">{step.name}</span>
                    <span className="text-[9px] text-ink-soft block mt-1">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
