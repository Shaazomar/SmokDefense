"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { Building2, Train, Hospital, ShieldCheck } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "tower-alpha",
    name: "METROPOLITAN FINANCIAL TOWER ALPHA",
    location: "Metropolitan Financial Center [DEMO]",
    type: "52-Story Commercial Office High-Rise",
    system: "SmokDefense Platform + UUKL Panels + IP500 Mesh",
    challenge: "Severe stack effect in vertical stairwell shafts during winter months, coupled with complex multi-tenant buildout zone changes.",
    solution: "Installed 420 IP500 wireless smoke damper nodes, automated stairwell pressurization balancing, and centralized 3D digital twin monitoring.",
    deployment: "14-Week phased rollout during off-peak night shifts with zero tenant downtime.",
    commissioning: "Automated loop testing discovered 3 binding dampers prior to occupancy handover.",
    outcome: "100% compliance inspection pass rate; 40% reduction in annual maintenance labor costs.",
  },
  {
    id: "transit-hub",
    name: "CENTRAL INTERNATIONAL TRANSIT HUB",
    location: "International Transit Sector [DEMO]",
    type: "Underground Rail Terminal & Atrium Facility",
    system: "SmokDefense Enterprise + BACnet Ring + NEMA 4X Nodes",
    challenge: "High ambient humidity, brake dust, and high airflow velocities in underground passenger tunnels.",
    solution: "Deployed NEMA 4X stainless steel edge enclosures and dual-spectrum optical smoke sensors with real-time tunnel fan jet staging.",
    deployment: "18-Month international infrastructure deployment alongside civil rail construction.",
    commissioning: "Full scale cold smoke generator verification confirming sub-10 second evacuation airflow extraction.",
    outcome: "Sub-second event telemetry stream to central control room; continuous diagnostic health index at 99.8%.",
  },
];

export function CaseStudiesSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = CASE_STUDIES[selectedIdx];

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">19 / CASE STUDIES</span>
            <DemoTag label="PROJECT SCHEMAS" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            ENGINEERING CASE STUDIES.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Explore verified architectural project schemas detailing real-world smoke management challenges, technical deployments, and operational outcomes.
          </p>
        </div>

        {/* Project Selector Bar */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4 font-mono text-xs uppercase">
          {CASE_STUDIES.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setSelectedIdx(idx)}
              className={`border px-5 py-3 transition-all ${
                selectedIdx === idx ? "border-ink bg-ink text-white font-bold" : "border-line bg-canvas text-ink-soft hover:border-ink"
              }`}
            >
              0{idx + 1}. {cs.name}
            </button>
          ))}
        </div>

        {/* Project Card Schema Layout */}
        <div className="mt-8 border border-line bg-white p-8 md:p-12">
          <div className="flex justify-between border-b border-line pb-4 font-mono text-xs">
            <span className="text-accent font-bold">PROJECT SCHEMA // [{current.id.toUpperCase()}]</span>
            <DemoTag label="ILLUSTRATIVE DEMO PROJECT" />
          </div>

          <h3 className="mt-6 font-display text-3xl font-semibold uppercase text-ink">
            {current.name}
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 font-mono text-xs border-b border-line pb-8">
            <div>
              <span className="text-ink-faint">LOCATION:</span>
              <p className="mt-1 font-semibold text-ink">{current.location}</p>
            </div>
            <div>
              <span className="text-ink-faint">BUILDING TYPE:</span>
              <p className="mt-1 font-semibold text-ink">{current.type}</p>
            </div>
            <div>
              <span className="text-ink-faint">SYSTEM ARCHITECTURE:</span>
              <p className="mt-1 font-semibold text-accent">{current.system}</p>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 font-sans text-sm">
            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">CHALLENGE</h4>
                <p className="mt-1 text-ink-soft leading-relaxed">{current.challenge}</p>
              </div>
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">SOLUTION</h4>
                <p className="mt-1 text-ink-soft leading-relaxed">{current.solution}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-line pt-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">DEPLOYMENT & COMMISSIONING</h4>
                <p className="mt-1 text-ink-soft leading-relaxed">{current.deployment} {current.commissioning}</p>
              </div>
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700">VERIFIED OUTCOME</h4>
                <p className="mt-1 text-ink-soft leading-relaxed">{current.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
