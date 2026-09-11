import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SYSTEMS } from "@/lib/data/systems";

/** Compact card per major system, each linking through to its Systems page. */
export function QuickSolutions() {
  const cards = SYSTEMS.filter((system) =>
    [
      "ventilation-system",
      "car-park-ventilation",
      "co2-monitors-controls",
      "pressurization-system",
      "fs-dampers",
    ].includes(system.slug),
  );

  return (
    <section className="border-t border-line bg-canvas px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="// Systems"
          title="What we build."
          lead="Six system families, engineered and integrated as one automation layer."
          aside={
            <Link
              href="/systems"
              className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-ink"
            >
              All systems →
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((system) => (
            <Link
              key={system.slug}
              href={`/systems/${system.slug}`}
              className="group flex flex-col justify-between gap-8 bg-white p-7 transition-colors hover:bg-accent-soft"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-accent">{system.number}</span>
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink">
                  {system.title}
                </h3>
                <p className="mt-3 font-sans text-xs leading-relaxed text-ink-soft">
                  {system.summary}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {system.eyebrow}
              </span>
            </Link>
          ))}

          <Link
            href="/systems#architecture"
            className="group flex flex-col justify-between gap-8 bg-white p-7 transition-colors hover:bg-accent-soft"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-bold text-accent">06</span>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink">
                Building Automation &amp; Controls
              </h3>
              <p className="mt-3 font-sans text-xs leading-relaxed text-ink-soft">
                Field controllers, gateways and edge compute tying every system into a single
                supervised platform for monitoring, scheduling and reporting.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              Control Architecture
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
