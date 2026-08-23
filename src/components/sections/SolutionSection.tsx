"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DemoTag } from "@/components/ui/DemoTag";
import { Monitor, Cpu, Shield, Layers, FileText, Activity } from "lucide-react";

const CAPABILITIES = [
  { title: "Centralized Monitoring", desc: "Unified dashboard bringing all building smoke control panels into one view.", category: "MONITORING" },
  { title: "Floor & Zone Visualization", desc: "Interactive 3D WebGL spatial representation of every floorplate and smoke zone.", category: "SPATIAL" },
  { title: "Device Health Tracking", desc: "Real-time battery voltage, calibration, and signal strength monitoring for all nodes.", category: "HARDWARE" },
  { title: "Event & Alarm Management", desc: "Microsecond-accurate event logging with instant situation maps during alarms.", category: "EVENTS" },
  { title: "Authorized Controls", desc: "Role-based manual override interfaces with strict MFA security challenges.", category: "CONTROL" },
  { title: "Commissioning Suite", desc: "Digital 8-step device discovery, mapping, and automated pressure verification.", category: "WORKFLOW" },
  { title: "Testing Workflows", desc: "Automated off-peak damper stroke testing and digital compliance certificate generation.", category: "TESTING" },
  { title: "Maintenance Matrix", desc: "Predictive diagnostics flagging sensor drift or sluggish damper motors before failure.", category: "MAINTENANCE" },
  { title: "Audit Trail Ledger", desc: "Immutable command history recording every manual intervention and sign-off.", category: "SECURITY" },
  { title: "Multi-Building Management", desc: "Global enterprise management across multiple towers, campuses, or transportation hubs.", category: "ENTERPRISE" },
  { title: "System Analytics", desc: "Time-series telemetry analysis identifying operational patterns and pressure trends.", category: "INTELLIGENCE" },
  { title: "Automated Reporting", desc: "One-click export of inspector-ready PDF compliance and inspection reports.", category: "REPORTING" },
];

export function SolutionSection() {
  const [activeStage, setActiveStage] = useState<"physical" | "digital" | "platform">("platform");

  return (
    <section id="solution" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">04 / THE SOLUTION</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            ONE DIGITAL LAYER.<br />
            <span className="text-ink-soft">THE WHOLE SYSTEM.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            SmokDefense unifies isolated smoke dampers, UUKL control panels, pressurization fans, and building networks into one operational digital intelligence platform.
          </p>
        </div>

        {/* WebGL Stage Transformation Visualizer Bar */}
        <div className="my-10 border border-line bg-white p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[WEBGL ARCHITECTURAL TRANSFORMATION]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">System Transformation Lifecycle</h3>
            </div>
            <div className="flex gap-2 font-mono text-xs uppercase">
              <button
                onClick={() => setActiveStage("physical")}
                className={`border px-4 py-2 transition-all ${
                  activeStage === "physical" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                01 Physical Building
              </button>
              <button
                onClick={() => setActiveStage("digital")}
                className={`border px-4 py-2 transition-all ${
                  activeStage === "digital" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                02 Digital Building
              </button>
              <button
                onClick={() => setActiveStage("platform")}
                className={`border px-4 py-2 transition-all ${
                  activeStage === "platform" ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                03 Software Platform
              </button>
            </div>
          </div>

          {/* Active Stage Display Panel */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="flex min-h-[220px] flex-col justify-between rounded border border-line bg-canvas/80 p-6 lg:col-span-8">
              <div className="flex justify-between font-mono text-xs text-ink-faint">
                <span>STAGE STATUS: ACTIVE</span>
                <DemoTag label="INTERACTIVE DEMO" />
              </div>

              <div className="my-4 font-mono">
                {activeStage === "physical" && (
                  <div>
                    <h4 className="text-lg font-bold text-ink uppercase">PHYSICAL HARDWARE LAYER</h4>
                    <p className="mt-2 text-xs text-ink-soft">
                      Heavy-duty steel dampers, pressurization fan shafts, analog pressure tubes, and hardwired relay cabinets installed throughout the structure.
                    </p>
                  </div>
                )}
                {activeStage === "digital" && (
                  <div>
                    <h4 className="text-lg font-bold text-accent uppercase">DIGITAL TWIN & MESH MAPPING</h4>
                    <p className="mt-2 text-xs text-ink-soft">
                      IP500 mesh nodes and IoT edge gateways translate physical sensor currents and damper position micro-switches into calibrated digital telemetry.
                    </p>
                  </div>
                )}
                {activeStage === "platform" && (
                  <div>
                    <h4 className="text-lg font-bold text-ink uppercase">CENTRAL SOFTWARE OPERATIONAL PLATFORM</h4>
                    <p className="mt-2 text-xs text-ink-soft">
                      High-performance WebGL digital intelligence layer providing real-time spatial visibility, predictive diagnostics, and compliance reporting.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between font-mono text-[10px] text-ink-faint border-t border-line pt-3">
                <span>LATENCY: &lt; 250ms</span>
                <span>SECURITY: TLS 1.3 / TPM 2.0</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4 font-mono text-xs">
              <div className="border border-line p-3">
                <span className="text-ink-faint">CONNECTED NODES:</span>
                <span className="float-right font-semibold text-ink">428 Devices</span>
              </div>
              <div className="border border-line p-3">
                <span className="text-ink-faint">FAIL-SAFE STATE:</span>
                <span className="float-right font-semibold text-accent">HARDWIRED UUKL</span>
              </div>
              <div className="border border-line p-3">
                <span className="text-ink-faint">CLOUD SYNC:</span>
                <span className="float-right font-semibold text-ink">SECURE WEBSOCKET</span>
              </div>
            </div>
          </div>
        </div>

        {/* 12 Capabilities Grid */}
        <div className="mt-12">
          <div className="border-b border-line pb-4 font-mono text-xs font-semibold uppercase tracking-widest text-ink">
            12 CORE PLATFORM CAPABILITIES
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap, index) => (
              <div key={index} className="border border-line bg-canvas p-6 transition-all hover:border-ink">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-accent font-semibold">[{cap.category}]</span>
                  <span className="text-ink-faint">{(index + 1).toString().padStart(2, "0")}</span>
                </div>
                <h4 className="mt-3 font-display text-lg font-semibold uppercase text-ink">
                  {cap.title}
                </h4>
                <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
