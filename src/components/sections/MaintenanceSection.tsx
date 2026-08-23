"use client";

import React from "react";
import { MAINTENANCE_HEALTH_METRICS } from "@/lib/data/homepageData";
import { DemoTag } from "@/components/ui/DemoTag";
import { Activity, Battery, AlertTriangle, ShieldCheck, Wrench, RefreshCw } from "lucide-react";

export function MaintenanceSection() {
  return (
    <section id="maintenance" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">12 / MAINTENANCE</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            SAFETY DOESN'T START<br />
            <span className="text-ink-soft">WHEN THE ALARM SOUNDS.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Continuous diagnostic health surveillance flags sensor optical drift, damper actuator resistance, and battery capacity degradation before critical events occur.
          </p>
        </div>

        {/* System Health Dashboard Matrix */}
        <div className="my-10 border border-line bg-white p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[HEALTH MATRIX DASHBOARD]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">Real-Time System Health Index</h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-ink-soft">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>DIAGNOSTIC POLLING ACTIVE</span>
            </div>
          </div>

          {/* 6 Category Health Progress Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MAINTENANCE_HEALTH_METRICS.map((metric, idx) => (
              <div key={idx} className="border border-line bg-canvas p-6 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-line/60 pb-3">
                  <span className="font-bold text-ink">{metric.category}</span>
                  <span className="text-[10px] text-accent font-semibold">{metric.statusLabel}</span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-3xl font-display font-bold text-ink">{metric.health}%</span>
                  <span className="text-ink-faint">{metric.totalCount} Total Units</span>
                </div>

                {/* Progress Bar Visual */}
                <div className="mt-3 h-2 w-full overflow-hidden bg-line rounded-full">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      metric.health > 97 ? "bg-emerald-500" : metric.health > 95 ? "bg-accent" : "bg-amber-500"
                    }`}
                    style={{ width: `${metric.health}%` }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-[10px] text-ink-soft">
                  <span>ACTIVE FAULTS: {metric.activeFaults}</span>
                  <span>SELF-DIAGNOSTIC PASS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Workflow Pillars */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">01. SCHEDULED TESTS</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Automated off-peak stroke routines cycle damper actuators monthly to prevent mechanical binding.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">02. ACTIVE FAULT LOGS</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Supervised wiring loop checks identify open or short circuits immediately with floor coordinate tags.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">03. BATTERY HEALTH</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              LiFePO4 battery internal impedance measurements calculate remaining standby capacity percentage.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">04. HISTORICAL REPAIR</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Complete digital log of every technician visit, calibration, replacement, and inspection sign-off.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
