"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, Network, Server, Monitor, AlertTriangle } from "lucide-react";

const ARCH_NODES = [
  {
    id: "field-devices",
    number: "01",
    label: "FIELD DEVICES",
    icon: Cpu,
    title: "Field Sensors & Mechanical Actuators",
    components: ["Photoelectric Smoke Detectors", "Differential Pressure Sensors (0-500 Pa)", "Stairwell Injection Fans", "Motorized Smoke Dampers", "End-Position Auxiliary Switches"],
    details: "Physical end-devices installed in ductwork, stairwells, and floor zones. Optical sensors sample smoke density while dampers adjust airflow routes under direct actuator force.",
  },
  {
    id: "local-control",
    number: "02",
    label: "LOCAL CONTROL SYSTEM",
    icon: ShieldCheck,
    title: "UUKL-Listed Hardware Control Enclosures",
    components: ["UL 864 Category UUKL Panels", "Hardwired Relay Matrix", "Watchdog Timers", "Supervised Input Loops", "Direct Output Modules"],
    details: "Autonomous UUKL smoke control panels execute hardwired relay sequences in under 250ms. Safety interlocks operate deterministically independent of software networks.",
  },
  {
    id: "network",
    number: "03",
    label: "BUILDING NETWORK",
    icon: Network,
    title: "High-Availability IP500 & BACnet Bus",
    components: ["IP500 Dual-Band Wireless Mesh", "BACnet IP / MS/TP Bus", "Modbus TCP", "RS-485 Shielded Rings"],
    details: "Robust industrial network layer connecting localized panels and wireless sensor nodes. Features self-healing mesh topology and sub-second hop latency.",
  },
  {
    id: "edge-gateway",
    number: "04",
    label: "EDGE / IoT GATEWAY",
    icon: Server,
    title: "Hardened Industrial Edge Gateway",
    components: ["Quad-Core ARM Edge Controller", "32GB Offline Log Storage", "TPM 2.0 Hardware Security", "LTE-M Cellular Fallback"],
    details: "Processes real-time telemetry, normalizes protocol data, buffers offline event logs during network outages, and streams encrypted telemetry to central software.",
  },
  {
    id: "central-platform",
    number: "05",
    label: "CENTRAL PLATFORM",
    icon: Monitor,
    title: "SmokDefense Software Intelligence Platform",
    components: ["3D WebGL Digital Twin", "Real-Time Telemetry Engine", "Predictive Analytics Suite", "Audit Trail Ledger"],
    details: "Centralized software visualization providing 3D building floorplate mapping, continuous diagnostic polling, maintenance scheduling, and compliance PDF exports.",
  },
  {
    id: "control-room",
    number: "06",
    label: "CONTROL ROOM / FACILITY TEAM",
    icon: Monitor,
    title: "Operational Interfaces & First Responder Access",
    components: ["Control Room Workstations", "Mobile Field Tablets", "Role-Based MFA Security", "BACnet Alarm Routing"],
    details: "Empowers facility engineers and first responders with immediate situation awareness, verified damper position telemetry, and authenticated override capabilities.",
  },
];

export function SystemArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState(ARCH_NODES[1]);

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">05 / HOW THE SYSTEM WORKS</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            HARDWARE SAFETY AT THE EDGE.<br />
            <span className="text-ink-soft">INTELLIGENCE AT THE TOP.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Explore the multi-tiered architecture connecting physical building sensors to localized UUKL control panels, industrial networks, and central digital software.
          </p>
        </div>

        {/* Mandatory Safety Disclaimer Alert Box */}
        <div className="my-8 rounded border border-accent bg-accent-soft/40 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-accent" />
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                MANDATORY SYSTEM RESILIENCE PRINCIPLE
              </span>
              <p className="mt-1 font-sans text-sm font-semibold text-ink leading-relaxed">
                Critical life-safety functions should remain capable of local operation independent of cloud connectivity, according to the engineered system architecture.
              </p>
              <p className="mt-1 font-sans text-xs text-ink-soft">
                The cloud layer provides monitoring, diagnostics, analytics, and reporting. Physical safety execution logic remains hardwired and deterministic at the local UUKL controller.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Network Node Pipeline Inspector */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Node Flow Selector Column */}
          <div className="space-y-3 lg:col-span-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint">
              SYSTEM ARCHITECTURE TIERS (CLICK TO INSPECT)
            </span>

            {ARCH_NODES.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`flex w-full items-center justify-between border p-4 font-mono text-xs text-left transition-all ${
                    isSelected
                      ? "border-accent bg-accent/5 font-semibold text-ink shadow-sm"
                      : "border-line bg-canvas text-ink-soft hover:border-ink"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-accent">[{node.number}]</span>
                    <Icon className="h-4 w-4 shrink-0 text-ink" />
                    <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
                      {node.label}
                    </span>
                  </div>
                  <span className="text-ink-faint">→</span>
                </button>
              );
            })}
          </div>

          {/* Selected Node Technical Details Panel */}
          <div className="border border-line bg-white p-8 lg:col-span-6">
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
              <span className="font-bold text-accent">TIER [{selectedNode.number}] SPECIFICATIONS</span>
              <span className="text-ink-faint">HARDWARE / SOFTWARE INTERFACE</span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-semibold uppercase text-ink">
              {selectedNode.title}
            </h3>

            <p className="mt-4 font-sans text-sm text-ink-soft leading-relaxed">
              {selectedNode.details}
            </p>

            <div className="mt-6 border-t border-line pt-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink">
                KEY INTEGRATED COMPONENTS
              </span>
              <ul className="mt-4 space-y-2 font-mono text-xs text-ink-soft">
                {selectedNode.components.map((comp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
