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
  "font-display text-[clamp(3rem,10vw,8rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink",
);

/**
 * All phases stay mounted, stacked in one CSS grid cell, and cross-fade via
 * opacity/y driven directly by `phase` state — no AnimatePresence mount/
 * unmount cycling, which made this fragile to the intro's own timing (an
 * exiting element's animation could collide with the next phase's enter).
 */
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

  // Reduced-motion visitors skip straight to the final content, no timers involved.
  const effectivePhase: Phase = reducedMotion ? "main" : phase;
  const isVisible = (target: Phase) => effectivePhase === target;

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("system") ? 1 : 0, y: isVisible("system") ? 0 : -16 }}
        transition={{ duration: 0.6 }}
        className={cn(layerClass, "font-mono text-xs uppercase tracking-[0.3em] text-ink-faint")}
      >
        System / Initializing
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
        className={cn(layerClass, "flex flex-col items-center gap-6")}
      >
        <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
          Intelligent Smoke Management
        </h1>
        <p className="text-balance max-w-xl font-sans text-base text-ink-soft md:text-lg">
          A centralized digital layer for complex building life-safety systems.
        </p>
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <a
            href="#platform"
            className={cn(
              "rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent",
              isVisible("main") ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Explore the System →
          </a>
          <a
            href="/contact"
            className={cn(
              "font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-ink",
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
