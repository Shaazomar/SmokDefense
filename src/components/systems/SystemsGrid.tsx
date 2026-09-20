"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { SYSTEMS } from "@/lib/data/systems";

export function SystemsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {SYSTEMS.map((system) => {
        const image = system.image || "/images/systems-hero-architecture.jpg";

        return (
          <div
            key={system.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            <div>
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/5">
                <Image
                  src={image}
                  alt={`${system.title} Installation`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                  <span className="font-mono text-xs font-bold text-blue-300">
                    {system.number}
                  </span>
                  <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {system.eyebrow}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-accent">
                  {system.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-soft">
                  {system.summary}
                </p>

                {/* Capability Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {system.capabilities.slice(0, 2).map((cap) => (
                    <span
                      key={cap}
                      className="rounded bg-canvas px-2 py-0.5 font-mono text-[9px] font-semibold text-ink-soft"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="border-t border-line/70 bg-canvas/30 px-5 py-3">
              <Link
                href={`/systems/${system.slug}` as Route}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-accent transition-transform group-hover:translate-x-1"
              >
                View System Specifications <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
