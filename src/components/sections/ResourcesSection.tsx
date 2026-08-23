"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

const RESOURCE_CATEGORIES = [
  "DATASHEETS",
  "SYSTEM ARCHITECTURE",
  "INSTALLATION",
  "COMMISSIONING",
  "OPERATION",
  "MAINTENANCE",
  "CASE STUDIES",
  "TECHNICAL ARTICLES",
  "FAQ",
  "CERTIFICATIONS",
] as const;

export function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState<typeof RESOURCE_CATEGORIES[number]>("DATASHEETS");

  return (
    <section id="resources" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">16 / DOCUMENTATION</span>
            <DemoTag label="ENGINEERING LIBRARY" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            ENGINEERING LIBRARY.
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Access official technical documentation, system architectural blueprints, installation guides, commissioning manuals, case studies, and regulatory whitepapers.
          </p>
        </div>

        {/* 10 Category Tabs */}
        <div className="my-8 flex flex-wrap gap-2 border-b border-line pb-4 font-mono text-xs font-bold">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border px-4 py-2 uppercase transition-all ${
                activeCategory === cat
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Selected Category Documents List */}
        <div className="border border-line bg-white p-8">
          <div className="flex justify-between items-center border-b border-line pb-4 font-mono text-xs">
            <span className="font-bold text-accent">[LIBRARY CATEGORY: {activeCategory}]</span>
            <span className="text-ink-soft">DOCUMENT INDEX</span>
          </div>

          <div className="mt-6 space-y-4 font-mono text-xs">
            <div className="border border-line bg-canvas p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="font-bold text-ink block text-sm">{activeCategory} // DOCUMENT REF 01</span>
                <span className="text-ink-soft text-[11px]">Engineering specification & compliance matrix for project submittals.</span>
              </div>
              <span className="border border-line bg-white px-3 py-1.5 font-bold text-accent">
                [CONTENT TO BE PROVIDED]
              </span>
            </div>

            <div className="border border-line bg-canvas p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="font-bold text-ink block text-sm">{activeCategory} // DOCUMENT REF 02</span>
                <span className="text-ink-soft text-[11px]">System integration guidelines and technical drawings.</span>
              </div>
              <span className="border border-line bg-white px-3 py-1.5 font-bold text-accent">
                [CONTENT TO BE PROVIDED]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
