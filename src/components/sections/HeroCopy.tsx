"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { INTRO_TIMING } from "@/lib/stages/introTiming";
import { cn } from "@/lib/utils/cn";

type Phase = "system" | "headline0" | "headline1" | "main";

const layerClass = "col-start-1 row-start-1";
const headlineClass = cn(
  layerClass,
  "font-display text-[clamp(3.2rem,11vw,9rem)] font-semibold uppercase leading-[0.92] tracking-tight text-ink",
);

export function HeroCopy() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("system");

  useEffect(() => {
    if (reducedMotion) return;

    const timers = [
      setTimeout(() => setPhase("headline0"), INTRO_TIMING.headlineOneIn * 1000),
      setTimeout(() => setPhase("headline1"), INTRO_TIMING.headlineTwoIn * 1000),
      setTimeout(() => setPhase("main"), INTRO_TIMING.supportingIn * 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const effectivePhase: Phase = reducedMotion ? "main" : phase;
  const isVisible = (target: Phase) => effectivePhase === target;

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center z-10">
      {/* Technical Status Indicator Badge in Top Left */}
      <div className="pointer-events-auto absolute left-6 top-24 hidden flex-col items-start gap-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft md:flex md:left-10 md:top-28">
        <div className="flex items-center gap-2 border-b border-line pb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold text-ink">SYSTEM</span>
          <span className="text-accent font-mono">READY</span>
        </div>
        <div className="flex items-center gap-2 border-b border-line pb-1">
          <span className="font-semibold text-ink">ARCHITECTURE</span>
          <span className="text-ink-soft">CONNECTED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink">MONITORING</span>
          <span className="text-accent font-mono">ACTIVE</span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("system") ? 1 : 0, y: isVisible("system") ? 0 : -16 }}
        transition={{ duration: 0.6 }}
        className={cn(layerClass, "font-mono text-xs uppercase tracking-[0.3em] text-ink-faint")}
      >
        System / Initializing...
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("headline0") ? 1 : 0, y: isVisible("headline0") ? 0 : -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={headlineClass}
      >
        SMOKE MOVES.
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("headline1") ? 1 : 0, y: isVisible("headline1") ? 0 : -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={headlineClass}
      >
        KNOW WHERE.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("main") ? 1 : 0, y: isVisible("main") ? 0 : 16 }}
        transition={{ duration: 0.7 }}
        className={cn(layerClass, "flex flex-col items-center gap-6 max-w-4xl")}
      >
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Intelligent Smoke Management & Life-Safety Infrastructure
        </span>
        
        <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
          The digital intelligence layer for complex building life-safety systems.
        </h1>

        <p className="text-balance max-w-2xl font-sans text-sm text-ink-soft md:text-base">
          Connecting professional smoke-control hardware, building networks and centralized software into one operational platform.
        </p>

        <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
          <a
            href="#problem"
            className={cn(
              "rounded-full bg-ink px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-accent hover:shadow-lg",
              isVisible("main") ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Explore the System →
          </a>
          <a
            href="/contact"
            className={cn(
              "rounded-full border border-line bg-canvas/80 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-canvas",
              isVisible("main") ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Talk to an Engineer →
          </a>
        </div>
      </motion.div>
    </div>
  );
}
