"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Zap, CheckCircle, ShieldCheck } from "lucide-react";

const MODULES = [
  {
    id: "detect",
    number: "01",
    label: "DETECT",
    icon: Search,
    title: "Identify Smoke and Thermal Escalation Instantly",
    subtitle: "Sensing particle movement at microsecond thresholds",
    description:
      "Smoke detection extends beyond basic ceiling spot detectors. High-sensitivity photoelectric sensors, aspirating duct smoke samplers, and optical beam detectors continually sense optical obscurity and aerosol density across supply and return air plenums.",
    specifications: [
      "Dual-spectrum optical chamber prevents dust false alarms",
      "Continuous optical obscurity sampling at sub-second intervals",
      "Direct integration with hardwired Fire Alarm Control Panels (FACP)",
      "Supervised analog loop wiring detecting short and open circuits",
    ],
  },
  {
    id: "visualize",
    number: "02",
    label: "VISUALIZE",
    icon: Eye,
    title: "Understand Affected Zones and Operational States",
    subtitle: "Spatial clarity for building operators and first responders",
    description:
      "During an emergency, textual alarm codes create dangerous cognitive load. SmokDefense translates raw sensor inputs into a clear 3D digital building floorplate visualizer, highlighting affected smoke zones, pressure gradients, and stairwell pressurization states.",
    specifications: [
      "Real-time 3D spatial floorplate wireframes",
      "Color-coded pressure differential mapping (Pascals)",
      "Instant identification of active alarm origin floor",
      "Dynamic airflow vector indicators across stairwells & shafts",
    ],
  },
  {
    id: "respond",
    number: "03",
    label: "RESPOND",
    icon: Zap,
    title: "Support Engineered Smoke-Control System Sequences",
    subtitle: "Deterministic execution of life-safety airflow matrices",
    description:
      "When smoke is detected, local UUKL controllers execute pre-programmed smoke management sequences immediately. Stairwell fans inject outside air to create positive pressure (+50 Pa), while exhaust fans draw smoke out of the fire floor.",
    specifications: [
      "Hardwired local UUKL relay execution (<250ms response)",
      "Automated stairwell pressurization fan activation",
      "Motorized fire/smoke damper position switching",
      "Automatic HVAC isolation preventing cross-floor contamination",
    ],
  },
  {
    id: "verify",
    number: "04",
    label: "VERIFY",
    icon: CheckCircle,
    title: "Confirm Equipment Feedback and Physical Position",
    subtitle: "Closed-loop verification of mechanical components",
    description:
      "Sending a control signal is only half the task. SmokDefense continuously monitors mechanical auxiliary end-switches and airflow pressure transmitters to confirm that dampers actually stroke open/closed and fans reach target operating RPM.",
    specifications: [
      "Supervised damper auxiliary end-switch confirmation",
      "Fan current transformer (CT) and differential pressure verification",
      "Automatic detection of stuck damper blades or broken fan belts",
      "Microsecond-accurate time-stamped feedback logging",
    ],
  },
  {
    id: "maintain",
    number: "05",
    label: "MAINTAIN",
    icon: ShieldCheck,
    title: "Keep System Ready Through Testing & Diagnostics",
    subtitle: "Continuous health surveillance preventing dormant failures",
    description:
      "Smoke management systems often sit standby for months. Continuous diagnostic polling, automated off-peak damper cycling, and LiFePO4 battery health monitoring ensure every component functions perfectly when called upon.",
    specifications: [
      "Automated periodic off-peak damper stroke testing",
      "LiFePO4 battery internal resistance and charge monitoring",
      "Sensor optical chamber calibration drift tracking",
      "Digital compliance PDF report generation for inspectors",
    ],
  },
];

export function WhySmokeSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = MODULES[activeTab];
  const Icon = current.icon;

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">03 / WHY SMOKE MANAGEMENT</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            DETECTION IS ONLY THE BEGINNING.
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            A complete life-safety workflow requires seamless progression from initial sensing to feedback verification and long-term readiness.
          </p>
        </div>

        {/* 5 Step Sequential Selector Bar */}
        <div className="my-8 flex flex-wrap border-b border-line">
          {MODULES.map((mod, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(idx)}
                className={`flex flex-1 min-w-[140px] items-center justify-center gap-3 border-b-2 py-4 font-mono text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? "border-accent bg-accent/5 font-semibold text-accent"
                    : "border-transparent text-ink-soft hover:bg-black/[0.02] hover:text-ink"
                }`}
              >
                <span>[{mod.number}]</span>
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Module Details Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center py-8"
          >
            {/* Left Big Typography & Overview */}
            <div className="flex flex-col items-start gap-6 lg:col-span-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint">
                  STEP {current.number} OF 05
                </span>
              </div>

              <h3 className="font-display text-3xl font-semibold uppercase text-ink md:text-4xl leading-tight">
                {current.title}
              </h3>

              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                // {current.subtitle}
              </p>

              <p className="font-sans text-base text-ink-soft leading-relaxed">
                {current.description}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab((prev) => (prev + 1) % MODULES.length)}
                  className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent"
                >
                  Next Step →
                </button>
              </div>
            </div>

            {/* Right Specification Checklist */}
            <div className="border border-line bg-white p-8 lg:col-span-6">
              <div className="border-b border-line pb-4 font-mono text-xs font-semibold uppercase tracking-widest text-ink">
                TECHNICAL CAPABILITY MATRIX
              </div>
              <ul className="mt-6 space-y-4 font-sans text-sm text-ink-soft">
                {current.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-[10px] text-accent">
                      ✓
                    </span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
