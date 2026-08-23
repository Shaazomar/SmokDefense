"use client";

import React from "react";
import { Factory, Cpu, Shield, Globe, Users, Wrench, Code } from "lucide-react";

const PILLARS = [
  { icon: Factory, title: "MANUFACTURING", desc: "Precision assembly of NEMA 4X industrial node enclosures and LiFePO4 battery modules." },
  { icon: Cpu, title: "HARDWARE ENGINEERING", desc: "UUKL smoke control panel development with hardwired watchdog and failure protection." },
  { icon: Code, title: "SOFTWARE DEVELOPMENT", desc: "High-performance WebGL digital twin, real-time telemetry processing, and cybersecurity." },
  { icon: Wrench, title: "INSTALLATION SUPPORT", desc: "Direct engineering guidance for local electrical contractors and system integrators." },
  { icon: Globe, title: "INTERNATIONAL DEPLOYMENT", desc: "Global project delivery across North America, Europe, Asia-Pacific, and Middle East." },
  { icon: Users, title: "PARTNER ECOSYSTEM", desc: "Open integration APIs for BACnet, Modbus, IP500, and fire alarm panel manufacturers." },
];

export function CompanySection() {
  return (
    <section id="company" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-3 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">21 / COMPANY</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            WE BUILD THE DIGITAL LAYER<br />
            <span className="text-ink-soft">BEHIND COMPLEX BUILDINGS.</span>
          </h2>
          <p className="max-w-2xl font-sans text-sm text-ink-soft">
            SmokDefense combines deep mechanical HVAC safety domain expertise with state-of-the-art software engineering to safeguard modern building infrastructure.
          </p>
        </div>

        {/* 6 Company Pillars Grid */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div key={idx} className="border border-line bg-canvas p-6 transition-all hover:border-ink">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-accent font-semibold">[{pil.title}]</span>
                  <Icon className="h-5 w-5 text-ink-soft" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase text-ink">{pil.title}</h3>
                <p className="mt-2 font-sans text-xs text-ink-soft leading-relaxed">{pil.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
