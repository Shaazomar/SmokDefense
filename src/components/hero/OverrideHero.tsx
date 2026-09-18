"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { SITE } from "@/lib/data/site";

/* ------------------------------------------------------------------------- *
 * SCENE SEQUENCE
 *
 * Four 1672x941 (16:9) plates read as one narrative: detection → networked
 * infrastructure → building-wide response → predictive intelligence. The stage
 * frame matches the source ratio exactly, so nothing is cropped.
 *
 * These are WebP derivatives of the uploaded PNGs — identical pixels and
 * dimensions, 8.3 MB down to 0.7 MB in total. The original PNGs are kept
 * untouched at the `public/` root. They are served as-is (`unoptimized`)
 * rather than through the image optimizer, which is what was failing on the
 * deployment while the already-cached logo kept working.
 * ------------------------------------------------------------------------- */

interface Scene {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** Red emergency accent, reserved for the scenes showing an active fire. */
  alert?: boolean;
}

const SCENES: Scene[] = [
  {
    id: "detection",
    src: "/hero/scene-01-detection.webp",
    alt: "CCTV and ceiling detectors picking up smoke from a switchgear fire in a plant room",
    caption: "AI-powered CCTV smoke detection",
    alert: true,
  },
  {
    id: "infrastructure",
    src: "/hero/scene-02-infrastructure.webp",
    alt: "Networked cameras and detectors covering an office floor and its corridor",
    caption: "Connected sensors & infrastructure",
  },
  {
    id: "command",
    src: "/hero/scene-03-monitoring.webp",
    alt: "Cutaway of a multi-storey building showing a fire floor and occupants evacuating",
    caption: "Centralised building-wide monitoring",
    alert: true,
  },
  {
    id: "intelligence",
    src: "/hero/scene-04-intelligence.webp",
    alt: "Engineer reviewing predictive equipment health across an industrial facility",
    caption: "Predictive safety intelligence",
  },
];


const DWELL_MS = 5600;

/** Matches the 16:9 source plates exactly, so object-cover crops nothing. */
const STAGE_ASPECT = "aspect-[16/9]";
const ACCENT = "#3DD9EB";
const ALERT = "#FF4438";

/** Fine film grain, inlined so the hero needs no extra network request. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/** Thin bezier runs from the copy column into the image stage. */
const DATA_LINES = [
  { d: "M 0 120 C 220 120, 300 70, 520 70", delay: 0 },
  { d: "M 0 190 C 240 190, 320 210, 520 210", delay: 1.1 },
  { d: "M 0 260 C 200 260, 340 330, 520 340", delay: 2.2 },
];

export function OverrideHero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  // Advance only while the hero is on screen and the tab is in the foreground.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let onScreen = true;
    const sync = () => setRunning(onScreen && document.visibilityState === "visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, DWELL_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  const scene = SCENES[index];

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[92vh] w-full overflow-hidden bg-[#05070d] text-white"
    >
      {/* Ambient field: cool wash, horizon glow, hairline grid, grain */}
      <motion.div style={{ opacity: reducedMotion ? 1 : veilOpacity }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,rgba(61,217,235,0.16)_0%,rgba(5,7,13,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_12%_85%,rgba(0,71,255,0.16)_0%,rgba(5,7,13,0)_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(120% 100% at 50% 0%, #000 20%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 20%, transparent 78%)",
          }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
      />

      <div className="mx-auto flex min-h-[92vh] max-w-[1600px] flex-col justify-center px-6 pb-28 pt-28 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------------- COPY */}
          <motion.div
            style={{ y: reducedMotion ? 0 : copyY }}
            className="relative z-10 lg:col-span-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-white/45"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden"
                  style={{ backgroundColor: ACCENT }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
              </span>
              AI-Powered Building Safety &amp; Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 font-display text-[clamp(1.85rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white"
            >
              <span className="block">See the Risk.</span>
              <span className="block">Understand the Building.</span>
              <span className="block text-white/55">Respond Before It Escalates.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl font-sans text-sm leading-relaxed text-white/60 md:text-base"
            >
              {SITE.name} connects CCTV, sensors, fire systems, building infrastructure and AI
              into one intelligent safety platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/systems"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-widest text-[#05070d] transition-colors duration-300 hover:bg-[#3DD9EB]"
              >
                Explore {SITE.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/systems#architecture"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 px-8 py-4 font-mono text-xs uppercase tracking-widest text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                <Play className="h-3 w-3" />
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* ------------------------------------------------- IMAGE SEQUENCE */}
          <motion.div
            style={{ y: reducedMotion ? 0 : stageY }}
            className="relative lg:col-span-6 lg:col-start-7"
          >
            {/* Thin data lines running from the copy into the stage */}
            <svg
              aria-hidden="true"
              viewBox="0 0 520 420"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -left-[42%] top-1/2 hidden h-[86%] w-[52%] -translate-y-1/2 lg:block"
            >
              {DATA_LINES.map((line) => (
                <g key={line.d}>
                  <path d={line.d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
                  <motion.path
                    d={line.d}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={1.1}
                    strokeLinecap="round"
                    opacity={0.5}
                    style={{ strokeDasharray: "5 300" }}
                    initial={{ strokeDashoffset: 305 }}
                    animate={reducedMotion ? { strokeDashoffset: 305 } : { strokeDashoffset: [305, 0] }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 4.4, delay: line.delay, repeat: Infinity, ease: "linear" }
                    }
                  />
                </g>
              ))}
            </svg>

            <div className="relative lg:-mr-10 xl:-mr-16">
              {/* Corner register marks */}
              <span className="absolute -left-px -top-px z-20 h-5 w-5 border-l border-t border-white/20" />
              <span className="absolute -right-px -top-px z-20 h-5 w-5 border-r border-t border-white/20" />
              <span className="absolute -bottom-px -left-px z-20 h-5 w-5 border-b border-l border-white/20" />
              <span className="absolute -bottom-px -right-px z-20 h-5 w-5 border-b border-r border-white/20" />

              <div
                className={`relative ${STAGE_ASPECT} w-full overflow-hidden bg-[#05070d] ring-1 ring-white/10`}
              >
                {SCENES.map((item, position) => {
                  const isActive = position === index;
                  return (
                    <motion.div
                      key={item.id}
                      aria-hidden={!isActive}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.07 }}
                      transition={{
                        opacity: { duration: reducedMotion ? 0.5 : 1.5, ease: [0.4, 0, 0.2, 1] },
                        scale: {
                          duration: reducedMotion ? 0 : isActive ? DWELL_MS / 1000 + 1.5 : 0.8,
                          ease: "linear",
                        },
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        unoptimized
                        priority={position === 0}
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  );
                })}

                {/* Cinematic grade: cool shadow, vignette, edge falloff into the page */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,13,0.72)_0%,rgba(5,7,13,0.12)_38%,rgba(5,7,13,0)_70%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_100%_at_50%_50%,rgba(5,7,13,0)_45%,rgba(5,7,13,0.55)_100%)]" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                  style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
                />
              </div>
            </div>

            {/* Sequence readout — kept outside the frame, never over the image */}
            <div className="mt-5 flex items-end justify-between gap-6">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40"
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: scene.alert ? ALERT : ACCENT }}
                />
                <span className="text-white/55">{String(index + 1).padStart(2, "0")}</span>
                <span>{scene.caption}</span>
              </motion.div>

              <div className="flex shrink-0 items-center gap-1.5">
                {SCENES.map((item, position) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(position)}
                    aria-label={`Show scene ${position + 1}: ${item.caption}`}
                    aria-current={position === index}
                    className="group py-3"
                  >
                    <span className="block h-px w-7 overflow-hidden bg-white/15 transition-colors group-hover:bg-white/35 md:w-9">
                      {position === index && (
                        <motion.span
                          key={`${item.id}-${index}`}
                          className="block h-full w-full origin-left"
                          style={{ backgroundColor: item.alert ? ALERT : ACCENT }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: running && !reducedMotion ? DWELL_MS / 1000 : 0.35,
                            ease: "linear",
                          }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2.5 lg:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">Scroll</span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/12">
          <motion.span
            className="absolute inset-x-0 h-3"
            style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT})` }}
            initial={{ y: -14, opacity: 1 }}
            animate={reducedMotion ? { y: -14, opacity: 0 } : { y: [-14, 38], opacity: 1 }}
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </span>
      </div>

      {/* Hairline seam into the light page below */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(61,217,235,0.35),transparent)]" />
    </section>
  );
}
