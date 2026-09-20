"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Activity,
  ShieldCheck,
  Wind,
  Flame,
  Fan,
  Building,
  Video,
  Monitor,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CallForDemo } from "@/components/demo/CallForDemo";

interface CalloutPin {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number; // percentage from left
  y: number; // percentage from top
}

const CALLOUT_PINS: CalloutPin[] = [
  {
    id: "ventilation-ducts",
    label: "VENTILATION & MAKE-UP AIR",
    icon: Wind,
    x: 58,
    y: 14,
  },
  {
    id: "exhaust-fan",
    label: "SMOKE EXHAUST EXTRACTOR",
    icon: Fan,
    x: 57,
    y: 52,
  },
  {
    id: "fireman-panel",
    label: "FIREFIGHTERS' SMOKE CONTROL STATION",
    icon: Flame,
    x: 82,
    y: 38,
  },
  {
    id: "bms-integration",
    label: "IP500 & BMS GATEWAY INTERFACE",
    icon: Monitor,
    x: 84,
    y: 80,
  },
  {
    id: "stairway-pressurization",
    label: "STAIR PRESSURIZATION RISER",
    icon: Building,
    x: 32,
    y: 28,
  },
];

export function SystemsHero() {
  const [activePin, setActivePin] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white via-canvas to-white py-12 md:py-16 lg:py-20">
      {/* Architectural grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0066FF 1px, transparent 1px), linear-gradient(90deg, #0066FF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Typography & Value Indicators */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 border border-blue-200/80 bg-blue-50/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-accent backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              // SYSTEMS ARCHITECTURE
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-display text-[clamp(2.2rem,4.2vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-ink">
              Smoke Control.
              <br />
              Firefighter Command.
              <br />
              <span className="text-accent">Connected Building.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
              Override-R centralizes smoke management, Firefighters&apos; Smoke Control Stations, and IP500 connected building systems under one deterministic emergency control architecture.
            </p>

            {/* 3 Value Indicator Badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="border border-line bg-white/80 p-3 backdrop-blur-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent block">
                  01 // CORE
                </span>
                <span className="mt-1 font-display text-xs font-bold text-ink block">
                  Smoke Control
                </span>
              </div>

              <div className="border border-line bg-white/80 p-3 backdrop-blur-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent block">
                  02 // FSCS
                </span>
                <span className="mt-1 font-display text-xs font-bold text-ink block">
                  Fireman Override
                </span>
              </div>

              <div className="border border-line bg-white/80 p-3 backdrop-blur-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent block">
                  03 // IP500
                </span>
                <span className="mt-1 font-display text-xs font-bold text-ink block">
                  Wireless Mesh
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallForDemo source="Systems Page Hero" />
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 border border-line bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink"
              >
                <span>Control Hierarchy</span>
                <ArrowRight className="h-3.5 w-3.5 text-accent" />
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Cutaway Environment Image */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-line bg-white shadow-lg">
              <Image
                src="/images/systems-hero-architecture.jpg"
                alt="Override-R Smoke Management Architectural Cutaway"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Interactive Callout Pins overlay */}
              {CALLOUT_PINS.map((pin) => {
                const Icon = pin.icon;
                const isActive = activePin === pin.id;
                return (
                  <div
                    key={pin.id}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    onMouseEnter={() => setActivePin(pin.id)}
                    onMouseLeave={() => setActivePin(null)}
                  >
                    <button
                      type="button"
                      aria-label={pin.label}
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full border border-white text-white transition-transform hover:scale-110 ${
                        pin.id === "fireman-panel"
                          ? "bg-accent shadow-[0_0_12px_rgba(0,102,255,0.8)]"
                          : "bg-ink/80 backdrop-blur-xs"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="absolute -inset-1 rounded-full border border-accent/40 animate-ping" />
                    </button>

                    {/* Popover Card */}
                    <div
                      className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap border border-line bg-white/95 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink shadow-md backdrop-blur-sm transition-all duration-200 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1"
                      }`}
                    >
                      {pin.label}
                    </div>
                  </div>
                );
              })}

              {/* Engineering Verification Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-line/60 bg-white/95 px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    NFPA 92 &amp; IBC Section 909 Compliant Architecture
                  </span>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] text-ink-faint">
                  Integrated Life Safety
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
