"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Flame, Sliders } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full bg-white pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* LEFT: Plain English Headline, Value Proposition & Direct CTAs */}
          <div className="flex flex-col items-start lg:col-span-6">
            
            {/* Clean Section Label */}
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>Smoke Management &amp; Firefighter Control</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 font-display text-[clamp(2.4rem,4.2vw,3.8rem)] font-bold tracking-tight text-slate-900 leading-[1.08]">
              Smoke Management.
              <br />
              <span className="text-blue-600">Under Firefighter Control.</span>
            </h1>

            {/* Supporting Statement in Plain English */}
            <p className="mt-5 font-sans text-base md:text-lg leading-relaxed text-slate-600">
              Override-R connects the firefighters&apos; control station with the systems that manage smoke, ventilation, stairway pressurization and critical building infrastructure during an emergency.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/systems/smoke-management"
                className="inline-flex items-center gap-2 rounded bg-blue-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-blue-700"
              >
                <span>EXPLORE SMOKE MANAGEMENT</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 transition-colors hover:bg-slate-50 hover:border-slate-400"
              >
                <span>TALK TO AN ENGINEER</span>
              </Link>
            </div>

            {/* Core Competency Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-6 w-full text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-900 block text-sm">Smoke Control</span>
                <span className="mt-0.5 block text-slate-500">Pressurization &amp; exhaust</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block text-sm">Manual Override</span>
                <span className="mt-0.5 block text-slate-500">Designated FSCS station</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block text-sm">IP500 Connected</span>
                <span className="mt-0.5 block text-slate-500">Sub-GHz resilient IoT</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Real Fireman Override Panel Product Photography */}
          <div className="relative lg:col-span-6">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-xs">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded bg-slate-100">
                <Image
                  src="/images/hero-override-panel.png"
                  alt="Override-R Fireman Override Panel installed in mechanical control center"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Real Equipment Caption */}
              <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-900">Firefighters&apos; Smoke Control Station (FSCS)</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">NFPA 92 &amp; IBC Section 909 Aligned</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
