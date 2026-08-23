"use client";

import React, { useState } from "react";
import { COMMISSIONING_STEPS } from "@/lib/data/homepageData";
import { DemoTag } from "@/components/ui/DemoTag";
import { CheckCircle, Search, Cpu, Layers } from "lucide-react";

const DEVICE_MAPPINGS_DEMO = [
  { deviceId: "SMK-18-01", type: "Optical Detector", location: "Floor 18 / Zone 03 Corridor", status: "MAPPED ✓" },
  { deviceId: "DMP-18-E", type: "Smoke Damper", location: "Floor 18 East Air Plenum", status: "MAPPED ✓" },
  { deviceId: "FAN-03-EX", type: "Exhaust Fan", location: "Roof Mechanical Room 3", status: "MAPPED ✓" },
  { deviceId: "PRS-18-ST", type: "Pressure Trans.", location: "Stairwell B Shaft 18F", status: "MAPPED ✓" },
  { deviceId: "CTL-18-UUKL", type: "UUKL Panel", location: "Floor 18 LV Closet", status: "MAPPED ✓" },
];

export function CommissioningSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isDiscovering, setIsDiscovering] = useState(false);

  const startDiscovery = () => {
    setIsDiscovering(true);
    setTimeout(() => setIsDiscovering(false), 2000);
  };

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">10 / COMMISSIONING</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            ACCELERATED DIGITAL COMMISSIONING.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Eliminate manual paper checklists with an automated 8-step digital commissioning workflow for field sensors, dampers, pressurization fans, and controllers.
          </p>
        </div>

        {/* 8-Step Workflow Ribbon */}
        <div className="my-10 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8 font-mono text-xs">
          {COMMISSIONING_STEPS.map((s, idx) => {
            const stepNum = idx + 1;
            const isActive = activeStep === stepNum;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(stepNum)}
                className={`border p-3 text-left transition-all ${
                  isActive
                    ? "border-accent bg-accent/10 font-bold text-accent"
                    : "border-line bg-canvas text-ink-soft hover:border-ink"
                }`}
              >
                <span className="text-[10px] text-ink-faint">[{s.step}]</span>
                <p className="mt-1 font-display font-semibold uppercase text-ink">{s.name}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Device Discovery & Mapping Workbench */}
        <div className="mt-8 border border-line bg-white p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[COMMISSIONING TOOL SIMULATOR]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">
                Step 02: Automated BACnet / IP500 Device Discovery
              </h3>
            </div>
            <button
              onClick={startDiscovery}
              className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent"
            >
              {isDiscovering ? "Scanning Bus Networks..." : "Run Device Scan →"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Discovery Terminal Status */}
            <div className="rounded border border-line bg-canvas p-6 font-mono text-xs lg:col-span-5">
              <div className="flex justify-between border-b border-line pb-3 text-ink-faint">
                <span>BUS SCAN PROTOCOL: BACNET / IP500</span>
                <span>BAUD: 38.4k</span>
              </div>

              <div className="my-6 space-y-3">
                <p className="text-accent font-semibold">
                  {isDiscovering ? "DISCOVERING DEVICES ON BUS..." : "SCAN COMPLETE — 81 NODES FOUND"}
                </p>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-ink-soft">42 OPTICAL SENSORS</span>
                  <span className="text-emerald-600 font-bold">✓ DISCOVERED</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-ink-soft">18 SMOKE DAMPERS</span>
                  <span className="text-emerald-600 font-bold">✓ DISCOVERED</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-ink-soft">12 EXHAUST FANS</span>
                  <span className="text-emerald-600 font-bold">✓ DISCOVERED</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-ink-soft">08 PRESSURE TRANSMITTERS</span>
                  <span className="text-emerald-600 font-bold">✓ DISCOVERED</span>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-1">
                  <span className="text-ink-soft">01 UUKL CONTROLLER</span>
                  <span className="text-emerald-600 font-bold">✓ DISCOVERED</span>
                </div>
              </div>

              <div className="text-[10px] text-ink-faint border-t border-line pt-2">
                AUTOMATED BUS MAPPING READY FOR SPATIAL BINDING
              </div>
            </div>

            {/* Device Mapping Table */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink mb-3 block">
                SPATIAL DEVICE MAPPING TABLE
              </span>
              <div className="overflow-x-auto border border-line">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-canvas border-b border-line text-ink-faint text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Device ID</th>
                      <th className="p-3">Component Type</th>
                      <th className="p-3">Mapped Location</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {DEVICE_MAPPINGS_DEMO.map((row) => (
                      <tr key={row.deviceId} className="hover:bg-canvas/50">
                        <td className="p-3 font-bold text-ink">{row.deviceId}</td>
                        <td className="p-3 text-ink-soft">{row.type}</td>
                        <td className="p-3 text-ink-soft">{row.location}</td>
                        <td className="p-3 text-right font-bold text-accent">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
