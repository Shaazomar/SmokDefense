"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SYSTEMS } from "@/lib/data/systems";
import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { cn } from "@/lib/utils/cn";

/**
 * Side-navigation explorer: every system is one click away and only the
 * selected one is rendered, so the page stays short regardless of how many
 * systems are added to the data file.
 */
export function SystemsExplorer() {
  const [activeSlug, setActiveSlug] = useState(SYSTEMS[0].slug);
  const active = SYSTEMS.find((system) => system.slug === activeSlug) ?? SYSTEMS[0];

  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-12">
      {/* Index */}
      <nav className="bg-white lg:col-span-4 xl:col-span-3">
        <div className="border-b border-line px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
          System Index
        </div>
        <ul className="max-lg:flex max-lg:overflow-x-auto">
          {SYSTEMS.map((system) => {
            const isActive = system.slug === active.slug;
            return (
              <li key={system.slug} className="max-lg:shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveSlug(system.slug)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-line px-6 py-4 text-left transition-colors max-lg:border-r max-lg:border-b-0 max-lg:whitespace-nowrap",
                    isActive ? "bg-accent-soft" : "hover:bg-black/[0.02]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] font-bold",
                      isActive ? "text-accent" : "text-ink-faint",
                    )}
                  >
                    {system.number}
                  </span>
                  <span
                    className={cn(
                      "font-display text-sm font-bold uppercase tracking-tight",
                      isActive ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    {system.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Detail */}
      <div className="bg-white lg:col-span-8 xl:col-span-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 md:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 font-mono text-[11px] uppercase tracking-widest">
              <span className="font-bold text-accent">
                [{active.number}] {active.eyebrow}
              </span>
              <Link
                href={`/systems/${active.slug}`}
                className="flex items-center gap-1.5 text-ink-soft transition-colors hover:text-ink"
              >
                Full specification <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <h3 className="mt-6 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold uppercase leading-[1] tracking-tight text-ink">
              {active.title}
            </h3>
            <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-ink-soft md:text-base">
              {active.summary}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                  Capabilities
                </span>
                <ul className="mt-4 space-y-2.5">
                  {active.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2.5 font-sans text-xs text-ink-soft">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                  Sequence of Operation
                </span>
                <ol className="mt-4 space-y-3">
                  {active.sequence.map((item, index) => (
                    <li key={item.step} className="flex gap-3">
                      <span className="font-mono text-[11px] font-bold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-xs leading-relaxed text-ink-soft">
                        <span className="font-mono font-bold uppercase tracking-wider text-ink">
                          {item.step}
                        </span>{" "}
                        — {item.detail}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {active.subsections ? (
              <div className="mt-8 border-t border-line pt-2">
                {active.subsections.map((subsection) => (
                  <ExpandablePanel
                    key={subsection.key}
                    title={subsection.title}
                    badge={subsection.label.split(".")[0]}
                    subtitle={subsection.label}
                  >
                    <p className="max-w-3xl font-sans text-xs leading-relaxed text-ink-soft">
                      {subsection.body}
                    </p>
                    <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {subsection.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 font-mono text-[11px] leading-relaxed text-ink-soft"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </ExpandablePanel>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {active.applications.map((application) => (
                  <span
                    key={application}
                    className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                  >
                    {application}
                  </span>
                ))}
              </div>
              <CallForDemo source={`Systems — ${active.title}`} size="sm" className="shrink-0" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
