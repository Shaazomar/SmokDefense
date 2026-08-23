"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";
import { Brain, Cpu, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

export function IntelligenceSection() {
  const [activeStep, setActiveStep] = useState(0);

  const INCIDENT_TIMELINE = [
    { time: "00:00.000", label: "OPTICAL SMOKE SIGNAL", detail: "Duct Detector SMK-18-04 exceeds 2.5%/ft obscuration threshold." },
    { time: "00:00.120", label: "UUKL HARDWIRE TRIGGER", detail: "Local controller CTL-18 initiates engineered smoke zone sequence." },
    { time: "00:01.400", label: "DAMPER POSITION STROKE", detail: "Exhaust damper DMP-18-E strokes OPEN; Supply damper DMP-18-S closes." },
    { time: "00:03.200", label: "FAN RAMP UP", detail: "Roof exhaust fan FAN-03-EX reaches target 1,450 RPM velocity." },
    { time: "00:05.100", label: "PRESSURE STABILIZATION", detail: "Stairwell B differential pressure reaches stable +48.5 Pa barrier." },
    { time: "00:12.800", label: "OPERATOR ACKNOWLEDGMENT", detail: "Control room engineer verifies zone map and confirms first responder alert." },
  ];

  return (
    <section className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">13 / INTELLIGENCE</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            FIND THE SIGNAL<br />
            <span className="text-ink-soft">INSIDE THE NOISE.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            Machine learning anomaly detection, predictive maintenance insights, and microsecond incident reconstruction for complex building life-safety networks.
          </p>
        </div>

        {/* Mandatory AI Governance Statement Box */}
        <div className="my-8 rounded border border-accent bg-accent-soft/30 p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 shrink-0 text-accent" />
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                AI GOVERNANCE & CONTROL BOUNDARY STATEMENT
              </span>
              <p className="mt-1 font-sans text-sm font-semibold text-ink leading-relaxed">
                AI supports decisions and diagnostics. Safety-critical control remains engineered and deterministic.
              </p>
              <p className="mt-1 font-sans text-xs text-ink-soft">
                Algorithms analyze time-series data to flag sensor drift or predict mechanical wear. Life-safety actuation relies exclusively on listed UUKL hardware logic.
              </p>
            </div>
          </div>
        </div>

        {/* Incident Reconstruction Timeline Interactive Tool */}
        <div className="mt-10 border border-line bg-white p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">[INCIDENT RECONSTRUCTION ENGINE]</span>
              <h3 className="font-display text-2xl font-semibold uppercase text-ink">Chronological Incident Timeline View</h3>
            </div>
            <DemoTag label="MICROSECOND TIMELINE" />
          </div>

          {/* Timeline Sequence Steps */}
          <div className="mt-8 space-y-3 font-mono text-xs">
            {INCIDENT_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col justify-between gap-3 border p-4 cursor-pointer transition-all md:flex-row md:items-center ${
                  activeStep === idx
                    ? "border-accent bg-accent/5 font-bold text-ink"
                    : "border-line bg-canvas text-ink-soft hover:border-ink"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-accent font-mono text-xs">+{item.time}</span>
                  <span className="font-display text-sm font-semibold uppercase text-ink">{item.label}</span>
                </div>
                <span className="text-xs text-ink-soft">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Analytics Pillars */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 font-mono text-xs">
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">01. ANOMALY DETECTION</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Identifies subtle pressure variations or optical chamber calibration drift before false alarms occur.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">02. PREDICTIVE MAINTENANCE</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Tracks damper actuator motor stroke time to schedule servicing before mechanical failure occurs.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">03. INCIDENT INTELLIGENCE</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Reconstructs exact microsecond timeline from initial smoke detection to final pressure stabilization.
            </p>
          </div>
          <div className="border border-line bg-canvas p-6">
            <span className="text-accent font-bold">04. SYSTEM ANALYTICS</span>
            <p className="mt-2 text-ink-soft leading-relaxed">
              Long-term time-series performance trends for multi-building facilities and engineering audits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
