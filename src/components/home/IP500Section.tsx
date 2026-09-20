"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Radio, Shield, Network, Layers } from "lucide-react";

export function IP500Section() {
  const verifiedSpecs = [
    { label: "Radio Frequency", value: "868 MHz Sub-GHz band (high building penetration)" },
    { label: "Standard", value: "IEEE 802.15.4g-2011 / IP500® Standard" },
    { label: "Protocols", value: "IPv6, 6LoWPAN, native IP500 dual-channel stack" },
    { label: "Building Integration", value: "Native BACnet interface for BMS compatibility" },
    { label: "Security Layer", value: "Hardware-accelerated AES-128 encryption" },
    { label: "Regulatory Compliance", value: "ETSI EN300 220-1, FCC47 CFR Section 15.247" },
  ];

  const valuePillars = [
    {
      title: "Vendor-Neutral Interoperability",
      desc: "Open standard connecting sensors, actuators, escape routes, access control, and fire/smoke detection across disparate manufacturers.",
      icon: Network,
    },
    {
      title: "Self-Healing Dual-Channel Mesh",
      desc: "Packets dynamically route around physical obstacles or interference, ensuring critical life-safety signals always reach supervisory controllers.",
      icon: Radio,
    },
    {
      title: "Commercial & Industrial Range",
      desc: "Sub-GHz propagation penetrates concrete, metal decks, and heavy mechanical risers far more reliably than congested 2.4 GHz wireless.",
      icon: Layers,
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>05 // IP500® WIRELESS CONNECTIVITY</span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
            The Open Connectivity Layer for Connected Buildings.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
            IP500® is an open, vendor-neutral wireless platform utilizing IEEE 802.15.4 and IPv6 to deliver robust, secure mesh connectivity across commercial and industrial building infrastructure.
          </p>
        </div>

        {/* Product & Technology Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Exact Verified Product Hardware Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-blue-600">
                    EXACT HARDWARE MODULE
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    CNX100 Module
                  </h3>
                </div>
                <span className="rounded bg-blue-100 px-2.5 py-1 text-[11px] font-mono font-semibold text-blue-800">
                  IP500® 868 MHz
                </span>
              </div>

              {/* Exact Real Product Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-slate-200 bg-white p-4 flex items-center justify-center">
                <Image
                  src="/product-images/cnx100.jpg"
                  alt="CNX100 IP500 868 MHz Wireless Radio Module"
                  width={300}
                  height={128}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Verified Product Specs Table */}
              <div className="mt-5 space-y-2 text-xs">
                {verifiedSpecs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between border-b border-slate-200/60 pb-1.5 last:border-b-0">
                    <span className="font-semibold text-slate-700">{spec.label}</span>
                    <span className="font-mono text-[11px] text-slate-600 text-right max-w-[55%]">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Official IP500 Ecosystem Member</span>
                <Link
                  href="/shop/cnx100-ip500-radio-module"
                  className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>View Submittal</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Architectural Value & Distinction */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-6">
                <h4 className="font-display text-base font-bold text-slate-900 mb-2">
                  Standard Ecosystem vs. Override-R Architecture
                </h4>
                <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">IP500®</strong> provides the standardized wireless mesh connectivity standard, while <strong className="text-slate-800">Override-R</strong> engineers the dedicated smoke-management sequences, deterministic mechanical priority interlocks, and the physical Firefighters&apos; Smoke Control Station that emergency responders rely upon.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {valuePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                      <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-50 text-blue-600 mb-3">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h5 className="font-display text-xs font-bold text-slate-900">
                        {pillar.title}
                      </h5>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/systems/ip500-connectivity"
                className="inline-flex items-center gap-2 rounded bg-slate-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
              >
                <span>Learn About IP500 Architecture</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
