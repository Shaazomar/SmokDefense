"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { INTRO_TIMING } from "@/lib/stages/introTiming";
import { cn } from "@/lib/utils/cn";

type Phase = "system" | "headline0" | "headline1" | "main";

const layerClass = "col-start-1 row-start-1";

export function HeroCopy() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("system");
  const [useAltHeadline, setUseAltHeadline] = useState(false);

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
      {/* Small technical HUD telemetry around the building */}
      <div className="pointer-events-auto absolute left-6 top-24 hidden flex-col items-start gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft md:flex md:left-10 md:top-28">
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold tracking-wider text-ink">SMOKEDEFENCE</span>
        </div>
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="font-semibold text-ink">CONTROL</span>
          <span className="text-accent font-mono">CONNECTED</span>
        </div>
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="font-semibold text-ink">MONITORING</span>
          <span className="text-emerald-600 font-mono font-semibold">ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink">SYSTEM</span>
          <span className="text-ink-soft">ARCHITECTURE</span>
        </div>
      </div>

      {/* Top Right HUD HUD metadata */}
      <div className="pointer-events-auto absolute right-6 top-24 hidden flex-col items-end gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft md:flex md:right-10 md:top-28">
        <div className="flex items-center gap-2 border-b border-line/60 pb-1">
          <span className="text-ink-soft">MODE</span>
          <span className="font-bold text-accent font-mono">INTEGRATED CONTROL</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-ink-soft">STATUS</span>
          <span className="text-emerald-600 font-mono">ENFORCED</span>
        </div>
      </div>

      {/* Initializing phase text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("system") ? 1 : 0, y: isVisible("system") ? 0 : -16 }}
        transition={{ duration: 0.6 }}
        className={cn(layerClass, "flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft")}
      >
        <span className="font-bold text-ink">SMOKEDEFENCE</span>
        <span className="text-accent">SYSTEM / INITIALIZING...</span>
      </motion.div>

      {/* Primary Headline Phase 1 */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("headline0") ? 1 : 0, y: isVisible("headline0") ? 0 : -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          layerClass,
          "font-display text-[clamp(3.5rem,11vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-ink",
        )}
      >
        {useAltHeadline ? "SEE THE SMOKE." : "SMOKE DOESN'T WAIT."}
      </motion.h1>

      {/* Primary Headline Phase 2 */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("headline1") ? 1 : 0, y: isVisible("headline1") ? 0 : -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          layerClass,
          "font-display text-[clamp(3.5rem,11vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-ink",
        )}
      >
        {useAltHeadline ? "UNDERSTAND THE SYSTEM." : "NEITHER SHOULD YOU."}
      </motion.h1>

      {/* Final main brand statement & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isVisible("main") ? 1 : 0, y: isVisible("main") ? 0 : 16 }}
        transition={{ duration: 0.7 }}
        className={cn(layerClass, "flex flex-col items-center gap-6 max-w-4xl")}
      >
        <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent border border-accent/20 bg-accent/5 px-3 py-1 rounded-full">
          SMOKEDEFENCE
        </span>
        
        <h1 className="font-display text-[clamp(2.4rem,6.5vw,5.2rem)] font-bold uppercase leading-[0.94] tracking-tight text-ink">
          Centralized Smoke Management & Building Life-Safety Systems
        </h1>

        <p className="text-balance max-w-2xl font-sans text-sm text-ink-soft md:text-base leading-relaxed">
          An integrated technology and engineering solution connecting building geometry, field devices, UUKL control systems, IP500 network gateways, and centralized monitoring for authorized building override.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <a
            href="#problem"
            className={cn(
              "rounded-full bg-ink px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-accent hover:shadow-lg hover:scale-[1.02]",
              isVisible("main") ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Explore the System →
          </a>
          <a
            href="/contact"
            className={cn(
              "rounded-full border border-line bg-canvas/90 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-ink hover:bg-canvas hover:scale-[1.02]",
              isVisible("main") ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Talk to an Engineer →
          </a>
        </div>

        {/* Headline variant switcher badge for interactive feedback */}
        <div className="pointer-events-auto mt-4 flex items-center gap-2">
          <button
            onClick={() => setUseAltHeadline(!useAltHeadline)}
            className="font-mono text-[10px] text-ink-faint hover:text-accent underline transition-colors"
          >
            {useAltHeadline ? "← Switch to default headline" : "Test alternative headline variant →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

