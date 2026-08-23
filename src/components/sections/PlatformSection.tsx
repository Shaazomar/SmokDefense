"use client";

import React, { useState } from "react";
import { PLATFORM_MODULES, type PlatformModule } from "@/lib/data/homepageData";
import { DemoTag } from "@/components/ui/DemoTag";
import { Monitor, CheckCircle2, AlertCircle, Shield, FileText, Activity } from "lucide-react";

export function PlatformSection() {
  const [activeModule, setActiveModule] = useState<PlatformModule>(PLATFORM_MODULES[0]);

  return (
    <section id="platform" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">07 / PLATFORM</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            THE DIGITAL OPERATIONAL SUITE.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Experience the actual software application: interactive live monitoring, 3D building visualization, device management, event timelines, audit trails, and automated reporting.
          </p>
        </div>

        {/* Platform Software Interface Mockup Shell */}
        <div className="mt-10 rounded border border-line bg-white shadow-xl">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-line bg-canvas px-6 py-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 font-semibold text-ink">SMOKDEFENSE // PLATFORM V4.2</span>
            </div>
            <div className="flex items-center gap-4 text-ink-soft">
              <span className="hidden sm:inline">LATENCY: 12ms</span>
              <DemoTag label="LIVE SIMULATOR" />
            </div>
          </div>

          {/* Main App Layout: Sidebar + Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Sidebar Modules Navigation */}
            <div className="border-b border-line bg-canvas/60 p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
                PLATFORM MODULES
              </span>
              <div className="mt-3 space-y-1">
                {PLATFORM_MODULES.map((mod) => {
                  const isActive = activeModule.id === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveModule(mod)}
                      className={`flex w-full items-center justify-between border px-4 py-3 text-left font-mono text-xs uppercase transition-all ${
                        isActive
                          ? "border-accent bg-accent/10 font-bold text-accent"
                          : "border-transparent text-ink-soft hover:bg-black/[0.02] hover:text-ink"
                      }`}
                    >
                      <span>{mod.title}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Interactive Module Dashboard Screen */}
            <div className="p-6 md:p-8 lg:col-span-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <span className="font-mono text-xs uppercase text-accent font-semibold">MODULE DETAILED VIEW</span>
                  <h3 className="font-display text-2xl font-semibold uppercase text-ink">{activeModule.title}</h3>
                </div>
                <span className="font-mono text-xs text-ink-soft hidden sm:block">// {activeModule.tagline}</span>
              </div>

              <p className="mt-4 font-sans text-sm text-ink-soft leading-relaxed">
                {activeModule.description}
              </p>

              {/* Simulated Metrics Card Bar */}
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {activeModule.metrics.map((metric, idx) => (
                  <div key={idx} className="border border-line bg-canvas p-4 font-mono">
                    <span className="text-[10px] uppercase text-ink-faint">{metric.label}</span>
                    <p className="mt-1 text-sm font-bold text-ink">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="mt-8 border-t border-line pt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink mb-4">
                  MODULE FUNCTIONALITY
                </h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 font-sans text-xs text-ink-soft">
                  {activeModule.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 border border-line/60 p-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
