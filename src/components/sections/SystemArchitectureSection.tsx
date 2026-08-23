"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoTag } from "@/components/ui/DemoTag";
import { Cpu, ShieldCheck, Network, Server, Monitor, Activity, Zap, AlertTriangle, ArrowRight } from "lucide-react";

type SubView = "layers" | "ip500" | "power" | "iot";

export function SystemArchitectureSection() {
  const [subView, setSubView] = useState<SubView>("layers");
  const [activeLayer, setActiveLayer] = useState(0);

  const LAYERS = [
    {
      name: "FIELD DEVICES",
      title: "Field Sensing & Mechanical Actuation",
      desc: "Connected optical smoke detectors, differential pressure sensors (0-500 Pa), stairwell pressurization injection fans, motorized dampers, and position auxiliary switches.",
      items: ["Photoelectric Smoke Detectors", "Pressure Transmitters", "Motorized Smoke Dampers", "End-Switch Auxiliary Contacts"],
    },
    {
      name: "CONTROL LAYER",
      title: "UUKL Controller & Life-Safety Panels",
      desc: "UUKL controller enclosures executing hardwired relay control matrices under 250ms. Safety interlocks operate deterministically independent of software networks.",
      items: ["UUKL Control Panel Integration", "Hardwired Relay Matrix", "Supervised Input Loops", "Watchdog Timers"],
    },
    {
      name: "NETWORK LAYER",
      title: "IP500 Industrial Gateway & Mesh Topology",
      desc: "High-availability IP500 wireless mesh and wired BACnet IP / Modbus network connecting localized panels with sub-second hop latency.",
      items: ["IP500 Gateway Integration", "Dual-Band Mesh Nodes", "BACnet IP / MS/TP Interface", "Encrypted Channel Bus"],
    },
    {
      name: "EDGE LAYER",
      title: "Industrial Edge Processing",
      desc: "Hardened edge controllers processing local telemetry, normalizing protocols, buffering offline logs, and filtering noise.",
      items: ["Industrial ARM Edge Compute", "TPM 2.0 Security Hardware", "Local Event Buffer (32GB)", "Cellular Telemetry Backup"],
    },
    {
      name: "PLATFORM LAYER",
      title: "SmokeDefence Software Intelligence",
      desc: "Centralized software engine offering 3D WebGL building digital twins, real-time spatial maps, predictive diagnostics, and compliance reporting.",
      items: ["3D Spatial Building Twin", "Real-Time Telemetry Pipeline", "Predictive Diagnostics", "Automated PDF Compliance"],
    },
    {
      name: "OPERATIONS",
      title: "Authorized Overrides & Command Center",
      desc: "Role-based monitoring and authorized override interfaces for facility engineers and fire service personnel with multi-factor verification.",
      items: ["Command Center Workstations", "Fire Service Override Panels", "Audit Ledger Log", "Mobile Inspection App"],
    },
  ];

  return (
    <section id="system-architecture" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">04 / THE SMOKEDEFENCE SYSTEM</span>
            <DemoTag label="SYSTEM ARCHITECTURE" />
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            ONE SYSTEM.<br />
            <span className="text-accent font-display">MANY LAYERS.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            SmokeDefence integrates physical field devices, UUKL control panels, IP500 network gateways, dual-path power backup, edge processing, and software monitoring into one resilient building intelligence system.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="my-8 flex flex-wrap gap-3 font-mono text-xs">
          <button
            onClick={() => setSubView("layers")}
            className={`border px-5 py-2.5 uppercase transition-all ${
              subView === "layers" ? "border-ink bg-ink text-white font-bold" : "border-line bg-canvas text-ink-soft hover:border-ink"
            }`}
          >
            01 Architectural Layers
          </button>
          <button
            onClick={() => setSubView("ip500")}
            className={`border px-5 py-2.5 uppercase transition-all ${
              subView === "ip500" ? "border-ink bg-ink text-white font-bold" : "border-line bg-canvas text-ink-soft hover:border-ink"
            }`}
          >
            02 IP500 Network Gateway
          </button>
          <button
            onClick={() => setSubView("power")}
            className={`border px-5 py-2.5 uppercase transition-all ${
              subView === "power" ? "border-ink bg-ink text-white font-bold" : "border-line bg-canvas text-ink-soft hover:border-ink"
            }`}
          >
            03 Power Layer & Backup
          </button>
          <button
            onClick={() => setSubView("iot")}
            className={`border px-5 py-2.5 uppercase transition-all ${
              subView === "iot" ? "border-ink bg-ink text-white font-bold" : "border-line bg-canvas text-ink-soft hover:border-ink"
            }`}
          >
            04 IoT Data Pipeline
          </button>
        </div>

        {/* SubView 01: Architectural Layers */}
        {subView === "layers" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start border border-line bg-white p-6 md:p-8">
            <div className="space-y-3 lg:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink-faint">
                PHYSICAL TO DIGITAL LAYER STACK
              </span>

              {LAYERS.map((layer, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLayer(index)}
                  className={`flex w-full items-center justify-between border p-4 font-mono text-xs transition-all ${
                    activeLayer === index
                      ? "border-accent bg-accent/5 font-bold text-ink"
                      : "border-line bg-canvas text-ink-soft hover:border-ink"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-accent">0{index + 1}.</span>
                    <span className="uppercase">{layer.name}</span>
                  </div>
                  <span>↓</span>
                </button>
              ))}
            </div>

            <div className="border border-line bg-canvas p-6 lg:col-span-6 flex flex-col justify-between min-h-[360px]">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                  LAYER 0{activeLayer + 1} // {LAYERS[activeLayer].name}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-ink">
                  {LAYERS[activeLayer].title}
                </h3>
                <p className="mt-4 font-sans text-sm text-ink-soft leading-relaxed">
                  {LAYERS[activeLayer].desc}
                </p>
              </div>

              <div className="mt-6 border-t border-line/60 pt-4 font-mono text-xs">
                <span className="text-ink font-bold block mb-2">KEY HARDWARE / SOFTWARE SPECIFICATIONS:</span>
                <ul className="space-y-1.5 text-ink-soft">
                  {LAYERS[activeLayer].items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SubView 02: IP500 Network Gateway */}
        {subView === "ip500" && (
          <div className="border border-line bg-white p-6 md:p-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">[NETWORK LAYER]</span>
            <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">IP500 Network Gateway Visualization</h3>

            <div className="my-8 flex flex-col items-center justify-between gap-4 rounded border border-line bg-canvas p-6 md:flex-row font-mono text-xs">
              <div className="border border-line bg-white p-4 text-center w-full md:w-auto">
                <span className="font-bold text-ink block">FIELD DEVICE</span>
                <span className="text-[10px] text-ink-soft">Sensors / Dampers</span>
              </div>
              <span className="text-accent font-bold">↓</span>
              <div className="border border-accent bg-accent/5 p-4 text-center w-full md:w-auto">
                <span className="font-bold text-accent block">IP500 MESH</span>
                <span className="text-[10px] text-ink-soft">Dual-Band Wireless</span>
              </div>
              <span className="text-accent font-bold">↓</span>
              <div className="border border-line bg-white p-4 text-center w-full md:w-auto">
                <span className="font-bold text-ink block">GATEWAY</span>
                <span className="text-[10px] text-ink-soft">Protocol Translator</span>
              </div>
              <span className="text-accent font-bold">↓</span>
              <div className="border border-line bg-white p-4 text-center w-full md:w-auto">
                <span className="font-bold text-ink block">LOCAL NETWORK</span>
                <span className="text-[10px] text-ink-soft">BACnet IP Bus</span>
              </div>
              <span className="text-accent font-bold">↓</span>
              <div className="border border-emerald-500 bg-emerald-50 p-4 text-center w-full md:w-auto">
                <span className="font-bold text-emerald-700 block">SMOKEDEFENCE</span>
                <span className="text-[10px] text-emerald-600">Central Platform</span>
              </div>
            </div>

            <p className="font-sans text-sm text-ink-soft leading-relaxed max-w-3xl">
              The IP500 wireless network standard provides robust, dual-band mesh connectivity for high-density building environments. Device telemetry flows securely through the IP500 gateway to the local BACnet bus and SmokeDefence central platform.
            </p>
          </div>
        )}

        {/* SubView 03: Power Layer & Battery Backup */}
        {subView === "power" && (
          <div className="border border-line bg-white p-6 md:p-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">[POWER LAYER]</span>
            <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">Redundant Dual-Path Power Backup</h3>

            <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 font-mono text-xs">
              <div className="border border-line bg-canvas p-6">
                <div className="flex justify-between font-bold border-b border-line pb-3">
                  <span>PRIMARY AC POWER</span>
                  <span className="text-emerald-600">ONLINE</span>
                </div>
                <div className="mt-4 space-y-2 text-ink-soft">
                  <p>Building Main Distribution → UUKL Control Enclosure</p>
                  <p>Continuous battery trick-charge monitoring</p>
                </div>
              </div>

              <div className="border border-accent bg-accent/5 p-6">
                <div className="flex justify-between font-bold border-b border-line pb-3">
                  <span>SECONDARY BACKUP POWER</span>
                  <span className="text-accent">STANDBY / READY</span>
                </div>
                <div className="mt-4 space-y-2 text-ink-soft">
                  <p>Supervised LiFePO4 battery bank backup</p>
                  <p>Zero-switchover latency upon AC power loss</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border border-line bg-canvas p-4 font-mono text-xs">
              <span className="text-ink-soft">POWER STATE FLOW:</span>
              <span className="font-bold text-ink">NORMAL ──► POWER INTERRUPTION ──► BACKUP ──► SYSTEM STATUS ENFORCED</span>
            </div>
          </div>
        )}

        {/* SubView 04: IoT Data Pipeline */}
        {subView === "iot" && (
          <div className="border border-line bg-white p-6 md:p-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">[IoT DATA PIPELINE]</span>
            <h3 className="font-display text-2xl font-bold uppercase text-ink mt-1">IoT Network Module Data Path</h3>

            <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs border border-line bg-canvas p-6">
              <div className="text-center font-bold text-ink">DEVICE DATA</div>
              <span>──►</span>
              <div className="text-center font-bold text-accent">EDGE COMPUTING</div>
              <span>──►</span>
              <div className="text-center font-bold text-ink">BUILDING NETWORK</div>
              <span>──►</span>
              <div className="text-center font-bold text-emerald-700">SMOKEDEFENCE PLATFORM</div>
            </div>

            <p className="font-sans text-sm text-ink-soft leading-relaxed max-w-3xl">
              IoT network modules continually transmit telemetry regarding device connectivity, motor stroke status, fault diagnostics, and microsecond alarm triggers to the edge processor and SmokeDefence central platform.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
