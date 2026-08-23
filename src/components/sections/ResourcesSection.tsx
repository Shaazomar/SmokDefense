"use client";

import React, { useState } from "react";
import { FileText, Download, Search, BookOpen, Layers } from "lucide-react";

const RESOURCES_LIST = [
  { id: "res-01", type: "Datasheet", category: "Hardware", title: "NEMA 4X Control Enclosure Specification Sheet", file: "nema-4x-datasheet.pdf", size: "2.4 MB" },
  { id: "res-02", type: "Whitepaper", category: "Engineering", title: "Stairwell Pressurization Mechanics in 40+ Story Towers", file: "stairwell-pressurization-whitepaper.pdf", size: "4.8 MB" },
  { id: "res-03", type: "Guide", category: "Commissioning", title: "Digital 8-Step Commissioning Protocol Manual", file: "commissioning-protocol-guide.pdf", size: "3.1 MB" },
  { id: "res-04", type: "Architecture", category: "Network", title: "IP500 Wireless Mesh Network Integration Blueprint", file: "ip500-blueprint.pdf", size: "5.6 MB" },
  { id: "res-05", type: "Datasheet", category: "Hardware", title: "UL 864 Category UUKL Panel Wiring Schematics", file: "uukl-panel-schematics.pdf", size: "1.9 MB" },
  { id: "res-06", type: "Compliance", category: "Standards", title: "NFPA 72 & UL 864 Compliance Mapping Matrix", file: "nfpa72-compliance-matrix.pdf", size: "2.2 MB" },
];

export function ResourcesSection() {
  const [filterType, setFilterType] = useState<string>("ALL");

  const filtered = filterType === "ALL" ? RESOURCES_LIST : RESOURCES_LIST.filter((r) => r.type === filterType);

  return (
    <section id="resources" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">20 / TECHNICAL RESOURCES</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            THE TECHNICAL LIBRARY.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Access product datasheets, installation guides, commissioning blueprints, wiring schematics, and engineering whitepapers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs uppercase">
          {["ALL", "Datasheet", "Whitepaper", "Guide", "Architecture", "Compliance"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`border px-4 py-2 transition-all ${
                filterType === cat ? "border-ink bg-ink text-white font-bold" : "border-line bg-canvas text-ink-soft hover:border-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technical Resource Index Table */}
        <div className="border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-canvas border-b border-line text-ink-faint text-[10px] uppercase">
                <tr>
                  <th className="p-4">Type</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Resource Document Title</th>
                  <th className="p-4">Size</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="p-4 font-bold text-accent">[{item.type}]</td>
                    <td className="p-4 text-ink-soft">{item.category}</td>
                    <td className="p-4 font-semibold text-ink">{item.title}</td>
                    <td className="p-4 text-ink-faint">{item.size}</td>
                    <td className="p-4 text-right">
                      <a
                        href={`/resources/${item.file}`}
                        className="inline-flex items-center gap-1 text-ink font-bold hover:text-accent hover:underline uppercase"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
