"use client";

import React, { useState } from "react";
import { HARDWARE_ECOSYSTEM, type HardwareItem } from "@/lib/data/homepageData";
import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { DemoTag } from "@/components/ui/DemoTag";
import { Cpu, Shield, FileText, CheckCircle2 } from "lucide-react";

export function HardwareEcosystemSection() {
  const [selectedItem, setSelectedItem] = useState<HardwareItem>(HARDWARE_ECOSYSTEM[0]);

  return (
    <section id="hardware" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">06 / HARDWARE ECOSYSTEM</span>
            <DemoTag />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            ENGINEERED HARDWARE.<br />
            <span className="text-ink-soft">INDUSTRIAL SURVIVABILITY.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Deep product specifications for enclosures, UUKL control panels, IP500 wireless modules, LiFePO4 battery reserves, and field actuators.
          </p>
        </div>

        {/* Product Selection Tab Bar */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4">
          {HARDWARE_ECOSYSTEM.map((product) => {
            const isSelected = selectedItem.id === product.id;
            return (
              <button
                key={product.id}
                onClick={() => setSelectedItem(product)}
                className={`border px-4 py-2.5 font-mono text-xs uppercase transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-canvas text-ink-soft hover:border-ink"
                }`}
              >
                {product.name}
              </button>
            );
          })}
        </div>

        {/* Product Details Display Panel */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Visual Hardware Module & Specs */}
          <div className="space-y-6 lg:col-span-7">
            <div className="border border-line bg-white p-8">
              <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs">
                <span className="text-accent font-semibold">[{selectedItem.category}]</span>
                <span className="text-ink-faint">INDUSTRIAL GRADE</span>
              </div>

              <h3 className="mt-4 font-display text-3xl font-semibold uppercase text-ink">
                {selectedItem.name}
              </h3>
              <p className="font-mono text-xs text-accent mt-1">
                // {selectedItem.tagline}
              </p>

              <div className="mt-6 space-y-4 font-sans text-sm text-ink-soft">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">OVERVIEW</h4>
                  <p className="mt-1 leading-relaxed">{selectedItem.overview}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">SYSTEM ROLE</h4>
                  <p className="mt-1 leading-relaxed">{selectedItem.role}</p>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="mt-8 border-t border-line pt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink mb-4">
                  TECHNICAL SPECIFICATIONS
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  {selectedItem.technicalDetails.map((detail, idx) => (
                    <div key={idx} className="flex justify-between border-b border-line/60 pb-2">
                      <span className="text-ink-soft">{detail.label}</span>
                      <span className="font-semibold text-ink">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordions for Integration, Monitoring & Docs */}
          <div className="space-y-4 lg:col-span-5">
            <div className="border border-line bg-white p-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink mb-4">
                INTEGRATION & DIAGNOSTICS
              </h4>

              <ExpandablePanel title="Building Integration" badge="NETWORK" defaultOpen={true}>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">
                  {selectedItem.integration}
                </p>
              </ExpandablePanel>

              <ExpandablePanel title="Telemetry & Monitoring" badge="HEALTH" defaultOpen={true}>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">
                  {selectedItem.monitoring}
                </p>
              </ExpandablePanel>

              <ExpandablePanel title="Compliance & Documentation" badge="DOCS">
                <div className="font-sans text-xs text-ink-soft space-y-2">
                  <p>Full engineering CAD drawings, wiring schematics, and testing procedures available.</p>
                  <a
                    href={selectedItem.documentationUrl}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-accent hover:underline pt-2"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Download Datasheet (PDF) →
                  </a>
                </div>
              </ExpandablePanel>
            </div>

            <div className="border border-line bg-canvas p-6 font-mono text-xs text-ink-soft">
              <span className="font-semibold text-ink">COMPLIANCE SCOPE DISCLAIMER:</span>
              <p className="mt-2 text-[11px] leading-relaxed">
                UUKL listings apply to physical hardware controllers and panels carrying official testing mark certifications. Software integration provides digital telemetry without overriding physical listing bounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
