"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { buttonClass } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { INTRO_TIMING } from "@/lib/stages/introTiming";
import { cn } from "@/lib/utils/cn";

const HEADLINE = ["Intelligent Building Systems.", "Smarter Ventilation.", "Safer Spaces."];

export function HeroCopy() {
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setRevealed(true), INTRO_TIMING.headlineOneIn * 1000);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const visible = reducedMotion || revealed;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6 text-center">
      {/* Left telemetry rail */}
      <div className="absolute left-6 top-24 hidden flex-col items-start gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft md:flex md:left-10 md:top-28">
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-bold tracking-wider text-ink">OVERRIDE-R</span>
        </div>
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="font-semibold text-ink">VENTILATION</span>
          <span className="text-accent">DEMAND CONTROLLED</span>
        </div>
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="font-semibold text-ink">PRESSURIZATION</span>
          <span className="text-emerald-600">REGULATED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink">FIELD DEVICES</span>
          <span className="text-ink-soft">SUPERVISED</span>
        </div>
      </div>

      {/* Right telemetry rail */}
      <div className="absolute right-6 top-24 hidden flex-col items-end gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft md:flex md:right-10 md:top-28">
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span>MODE</span>
          <span className="font-bold text-accent">INTEGRATED CONTROL</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PLATFORM</span>
          <span className="text-emerald-600">ONLINE</span>
        </div>
      </div>

      {/* Boot line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="col-start-1 row-start-1 flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft"
      >
        <span className="font-bold text-ink">OVERRIDE-R</span>
        <span className="text-accent">SYSTEM / INITIALIZING…</span>
      </motion.div>

      {/* Hero statement */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative col-start-1 row-start-1 flex max-w-4xl flex-col items-center gap-6"
      >
        {/* Soft canvas scrim so the statement stays legible over the wireframe. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.93)_0%,rgba(255,255,255,0.82)_55%,rgba(255,255,255,0)_80%)]"
        />
        <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
          Building Systems Technology
        </span>

        <h1 className="font-display text-[clamp(2.1rem,5.4vw,4.4rem)] font-bold uppercase leading-[0.98] tracking-tight text-ink">
          {HEADLINE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="text-balance max-w-2xl font-sans text-sm leading-relaxed text-ink-soft md:text-base">
          Override-R engineers intelligent ventilation, pressurization and fire &amp; smoke control
          systems — combining sensors, actuators, controllers, gateways and building automation into
          one supervised platform.
        </p>

        <div
          className={cn(
            "flex flex-col items-center gap-4 pt-2 sm:flex-row",
            visible ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <CallForDemo source="Homepage Hero" variant="primary" />
          <Link href="/systems" className={buttonClass("secondary")}>
            Explore Systems →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
