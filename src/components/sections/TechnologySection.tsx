"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

type TechKey = "CONTROL" | "NETWORK" | "POWER" | "DEVICES" | "EDGE" | "IoT" | "MONITORING" | "SOFTWARE";

const TECH_INDEX: Record<TechKey, { title: string; desc: string; specs: string[] }> = {
  CONTROL: {
    title: "UUKL CONTROL ENCLOSURES",
    desc: "Autonomous UUKL smoke control panels executing hardwired relay safety matrices in under 250ms independent of cloud connectivity.",
    specs: ["UL 864 Category UUKL Listed", "Hardwired Interlock Relays", "Supervised Input Loop Monitoring", "250ms Safety Trigger Latency"],
  },
  NETWORK: {
    title: "IP500 DUAL-BAND MESH NETWORK",
    desc: "High-availability IP500 wireless mesh standard providing dual-band redundancy and sub-second hop latency for building networks.",
    specs: ["Dual-Band Wireless Mesh (868/915 MHz)", "BACnet IP / MS/TP Interface", "AES-128 Hardware Encryption", "Self-Healing Network Topology"],
  },
  POWER: {
    title: "REDUNDANT DUAL-PATH POWER BACKUP",
    desc: "Supervised LiFePO4 battery bank reserve ensuring uninterrupted system operation during primary AC mains power loss.",
    specs: ["Dual AC/DC Input Power Supplies", "Zero-Switchover Battery Fallback", "LiFePO4 Impedance Monitoring", "24-Hour Standby Reserve Capacity"],
  },
  DEVICES: {
    title: "FIELD SENSORS & MECHANICAL ACTUATORS",
    desc: "High-sensitivity optical smoke detectors, differential pressure transmitters, motorized low-leakage dampers, and injection fans.",
    specs: ["Photoelectric & Beam Smoke Sensing", "Differential Pressure Transmitters (0-500 Pa)", "Motorized Fire/Smoke Dampers", "Supervised Auxiliary End-Switches"],
  },
  EDGE: {
    title: "HARDENED INDUSTRIAL EDGE COMPUTE",
    desc: "Industrial ARM edge processors normalizing protocols, buffering offline logs during network outages, and streaming telemetry.",
    specs: ["Quad-Core ARM Industrial Processor", "TPM 2.0 Hardware Root-of-Trust", "32GB Offline Event Buffer", "Cellular LTE-M Backup Module"],
  },
  IoT: {
    title: "IoT NETWORK TELEMETRY MODULE",
    desc: "Bi-directional IoT communication modules transmitting device health, motor stroke timing, and fault codes to central monitoring.",
    specs: ["Microsecond Event Timestamping", "Continuous Device Diagnostic Polling", "Sensor Drift Tracking", "Encrypted WebSocket Telemetry"],
  },
  MONITORING: {
    title: "CENTRALIZED SPATIAL MONITORING",
    desc: "3D WebGL spatial building visualizers offering real-time visibility across all floors, stairwells, corridors, and containment zones.",
    specs: ["Real-Time 3D Digital Twin Mapping", "Spatial Pressure Gradient Overlays", "Alarm Origin Floor Identification", "Multi-Tower Portfolio Dashboard"],
  },
  SOFTWARE: {
    title: "SMOKEDEFENCE PLATFORM OPERATIONAL SUITE",
    desc: "Enterprise software application providing role-based control, automated commissioning, maintenance scheduling, and PDF compliance exports.",
    specs: ["Role-Based MFA Security Governance", "Automated PDF Compliance Generator", "Immutable Command Audit Ledger", "BACnet IP / BMS Integration API"],
  },
};

export function TechnologySection() {
  const [activeKey, setActiveKey] = useState<TechKey>("CONTROL");
  const current = TECH_INDEX[activeKey];

  return (
    <section id="technology" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">14 / TECHNOLOGY STACK</span>
            <DemoTag label="INTERACTIVE TECHNICAL INDEX" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            THE TECHNICAL INDEX.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Select any architectural technology pillar to inspect full-screen technical specifications, hardware integration standards, and software capabilities.
          </p>
        </div>

        {/* 8 Technical Index Buttons */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4 font-mono text-xs font-bold">
          {(["CONTROL", "NETWORK", "POWER", "DEVICES", "EDGE", "IoT", "MONITORING", "SOFTWARE"] as TechKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeKey === key
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Selected Technology Full Screen Inspector */}
        <div className="border border-line bg-white p-8 md:p-12">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center font-mono text-xs">
            <span className="font-bold text-accent">[TECHNICAL PILLAR: {activeKey}]</span>
            <span className="text-ink-soft">SPECIFICATION INDEX</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="flex flex-col items-start gap-4 lg:col-span-6">
              <span className="font-mono text-xs font-bold text-accent">PILLAR ARCHITECTURE</span>
              <h3 className="font-display text-3xl font-bold uppercase text-ink">
                {current.title}
              </h3>
              <p className="font-sans text-base text-ink-soft leading-relaxed">
                {current.desc}
              </p>
            </div>

            <div className="border border-line bg-canvas p-6 lg:col-span-6 space-y-3 font-mono text-xs">
              <span className="font-bold text-ink block mb-2">TECHNICAL MATRIX:</span>
              {current.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3 border-b border-line/40 pb-2">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-ink">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
