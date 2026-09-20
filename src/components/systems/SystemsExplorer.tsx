"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Wind,
  Car,
  Activity,
  Building,
  Flame,
  Settings2,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  ChevronDown,
} from "lucide-react";
import { SYSTEMS } from "@/lib/data/systems";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { cn } from "@/lib/utils/cn";

// Map all system slugs to recognizable engineering icons
const SYSTEM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "smoke-management": Flame,
  "firefighters-smoke-control": ShieldCheck,
  "ip500-connectivity": Zap,
  "ventilation-system": Wind,
  "smoke-exhaust": Wind,
  "fs-dampers": Layers,
  "pressurization-system": Building,
  "fire-alarm-integration": Activity,
  "bms-integration": Cpu,
  "sensors-actuators": Settings2,
  "car-park-ventilation": Car,
  "co2-monitors-controls": Activity,
  actuators: Settings2,
  "field-devices": Cpu,
};

export function SystemsExplorer() {
  const [activeSlug, setActiveSlug] = useState(SYSTEMS[0].slug);
  const active = SYSTEMS.find((s) => s.slug === activeSlug) ?? SYSTEMS[0];

  const SystemIcon = SYSTEM_ICONS[active.slug] || Layers;
  const systemImage = active.image || "/images/systems-hero-architecture.jpg";

  return (
    <div id="systems-overview" className="scroll-mt-24">
      {/* Mobile System Quick Dropdown & Scroll Bar */}
      <div className="mb-6 block lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SYSTEMS.map((system) => {
            const isActive = system.slug === active.slug;
            const Icon = SYSTEM_ICONS[system.slug] || Layers;

            return (
              <button
                key={system.slug}
                type="button"
                onClick={() => setActiveSlug(system.slug)}
                className={cn(
                  "flex shrink-0 min-h-[44px] items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-accent text-white shadow-xs"
                    : "border border-line bg-white text-ink-soft hover:bg-canvas"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{system.number} {system.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Desktop Systems Navigation Sidebar + Custom Solution Box */}
        <div className="hidden lg:flex flex-col gap-6 lg:col-span-4 xl:col-span-3">
          {/* Nav List */}
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div className="border-b border-line bg-canvas/60 px-5 py-3.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                Systems Overview
              </span>
            </div>

            <nav className="p-1.5">
              <ul className="flex flex-col gap-1">
                {SYSTEMS.map((system) => {
                  const isActive = system.slug === active.slug;
                  const Icon = SYSTEM_ICONS[system.slug] || Layers;

                  return (
                    <li key={system.slug}>
                      <button
                        type="button"
                        onClick={() => setActiveSlug(system.slug)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group flex min-h-[46px] w-full items-center justify-between rounded-lg px-3.5 py-3 text-left transition-all",
                          isActive
                            ? "border-l-4 border-accent bg-blue-50/80 font-bold text-accent shadow-sm"
                            : "border-l-4 border-transparent text-ink-soft hover:bg-canvas hover:text-ink",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-mono transition-colors",
                              isActive
                                ? "bg-accent text-white"
                                : "bg-canvas text-ink-faint group-hover:bg-blue-50 group-hover:text-accent",
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div>
                            <span className="block font-mono text-[10px] tracking-wider text-ink-faint">
                              {system.number}
                            </span>
                            <span
                              className={cn(
                                "block font-display text-xs font-bold uppercase tracking-tight",
                                isActive ? "text-accent" : "text-ink",
                              )}
                            >
                              {system.title}
                            </span>
                          </div>
                        </div>

                        {isActive && (
                          <ArrowRight className="h-3.5 w-3.5 text-accent" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Need a Custom Solution Card */}
          <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-accent">
                <Building className="h-5 w-5" />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-tight text-ink">
                Need a Custom Solution?
              </h4>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Our engineering team can help you design and integrate the right
              safety architecture for your building.
            </p>
            <div className="mt-4">
              <CallForDemo
                source="Systems Sidebar — Need Custom Solution"
                label="Talk to Our Experts"
                size="sm"
                className="w-full justify-center text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Selected System Detail Panel */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 sm:p-6 md:p-8 lg:p-10"
              >
                {/* Header Row: Eyebrow + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                    <span>{active.number}</span>
                    <span className="text-ink-faint">/</span>
                    <span>{active.eyebrow}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <Link
                      href={`/shop?category=${encodeURIComponent(active.title)}` as Route}
                      className="inline-flex min-h-[38px] items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-accent hover:underline"
                    >
                      View Products <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/systems/${active.slug}` as Route}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded border border-line bg-canvas px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-accent hover:bg-blue-50/50 hover:text-accent"
                    >
                      Full Specification <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* System Title & Summary */}
                <div className="mt-5 sm:mt-6">
                  <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-ink">
                    {active.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-soft sm:text-sm md:text-base">
                    {active.summary}
                  </p>
                </div>

                {/* Physical Feature Image */}
                <div className="relative mt-5 sm:mt-6 aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl border border-line bg-slate-900 shadow-inner">
                  <Image
                    src={systemImage}
                    alt={`${active.title} Physical Installation`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="flex items-center gap-2 rounded bg-black/60 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      <SystemIcon className="h-3 w-3 text-blue-400" />
                      {active.title}
                    </span>
                    <span className="hidden font-mono text-[10px] text-white/70 sm:inline">
                      Physical Installation
                    </span>
                  </div>
                </div>

                {/* 3 Key Capability Cards */}
                <div className="mt-6 sm:mt-8">
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                    Key Capabilities
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-line bg-canvas/40 p-3.5 sm:p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-accent">
                        <Wind className="h-4 w-4" />
                      </div>
                      <h4 className="mt-2.5 font-display text-xs font-bold uppercase tracking-tight text-ink">
                        Better Indoor Air Quality
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                        Maintains continuous healthy airflow and carbon balance.
                      </p>
                    </div>

                    <div className="rounded-lg border border-line bg-canvas/40 p-3.5 sm:p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-accent">
                        <Zap className="h-4 w-4" />
                      </div>
                      <h4 className="mt-2.5 font-display text-xs font-bold uppercase tracking-tight text-ink">
                        Demand Controlled
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                        Optimizes fan speed and damper stroke for energy savings.
                      </p>
                    </div>

                    <div className="rounded-lg border border-line bg-canvas/40 p-3.5 sm:p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-accent">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <h4 className="mt-2.5 font-display text-xs font-bold uppercase tracking-tight text-ink">
                        Seamless Integration
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
                        Direct native interface with BMS, fire and security layers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Components Strip */}
                <div className="mt-6 sm:mt-8 rounded-lg border border-line bg-canvas/50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                        Key Components
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {active.components ? (
                          active.components.map((comp) => (
                            <span
                              key={comp.name}
                              className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink shadow-2xs"
                            >
                              {comp.name}
                            </span>
                          ))
                        ) : (
                          <>
                            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                              AIR HANDLING UNITS
                            </span>
                            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                              FANS
                            </span>
                            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                              DAMPERS
                            </span>
                            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                              ACTUATORS
                            </span>
                            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                              CONTROLLERS
                            </span>
                            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                              SENSORS
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/shop?category=${encodeURIComponent(active.title)}` as Route}
                      className="inline-flex min-h-[38px] shrink-0 items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-accent hover:underline"
                    >
                      Browse Catalogue →
                    </Link>
                  </div>
                </div>

                {/* Sequence of Operation & Applications */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-12">
                  {/* Sequence of Operation */}
                  <div className="md:col-span-7">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                      Sequence of Operation
                    </span>
                    <div className="mt-3 space-y-2">
                      {active.sequence.map((item, index) => (
                        <div
                          key={item.step}
                          className="flex items-start gap-2.5 rounded-lg border border-line/60 bg-white p-2.5 text-xs shadow-2xs"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-50 font-mono text-[10px] font-bold text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span className="font-mono font-bold uppercase tracking-wider text-ink">
                              {item.step}
                            </span>
                            <span className="text-ink-soft"> — {item.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Applications & Demo Action */}
                  <div className="flex flex-col justify-between rounded-lg border border-line bg-canvas/30 p-4 md:col-span-5">
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                        Applications
                      </span>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {active.applications.map((app) => (
                          <span
                            key={app}
                            className="rounded border border-line bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-line pt-4">
                      <CallForDemo
                        source={`Systems Explorer — ${active.title}`}
                        label="Call for Demo"
                        size="sm"
                        className="w-full justify-center"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
