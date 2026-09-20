"use client";

import React from "react";
import Image from "next/image";
import { Plane, Building, Hospital, ShoppingBag, Factory, Building2 } from "lucide-react";

interface SectorItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTORS: SectorItem[] = [
  {
    id: "airports",
    name: "Airports & Transit",
    category: "Infrastructure",
    description: "High-volume concourse smoke extraction, terminal air exchange and rapid egress protection.",
    image: "/images/system-02-carpark.jpg",
    icon: Plane,
  },
  {
    id: "hospitals",
    name: "Hospitals & Healthcare",
    category: "Critical Care",
    description: "Isolation ward pressure cascades, clean-room ventilation and continuous contaminant barrier control.",
    image: "/images/image_clean_room_1776602497882.png",
    icon: Hospital,
  },
  {
    id: "high-rises",
    name: "High-Rise Towers",
    category: "Commercial & Residential",
    description: "Multi-injection stairway pressurization, zoned smoke extract and Fireman Override Panel integration.",
    image: "/images/systems-hero-architecture.jpg",
    icon: Building,
  },
  {
    id: "shopping-malls",
    name: "Shopping Malls",
    category: "Retail & Atriums",
    description: "Large-volume atrium smoke reservoirs, automated smoke curtains and car park induction systems.",
    image: "/images/image_public_sector_1776603419378.png",
    icon: ShoppingBag,
  },
  {
    id: "industrial",
    name: "Industrial Facilities",
    category: "Manufacturing & Warehouses",
    description: "Process exhaust, heavy-duty fire and smoke isolation dampers, and gas monitoring systems.",
    image: "/images/system-01-ventilation.jpg",
    icon: Factory,
  },
  {
    id: "commercial",
    name: "Commercial Buildings",
    category: "Offices & Mixed-Use",
    description: "Demand-controlled ventilation, smart CO₂ balancing and synchronized BMS automation.",
    image: "/images/services-hero-engineering.jpg",
    icon: Building2,
  },
];

export function ApplicationEnvironments() {
  return (
    <section className="border-b border-line bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-blue-200/80 bg-blue-50/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              // APPLICATION ENVIRONMENTS
            </div>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-extrabold uppercase leading-tight tracking-tight text-ink">
              Where We Deliver<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-ink-soft md:text-sm">
            Proven engineering delivery across mission-critical, public-assembly and high-density commercial facilities.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;

            return (
              <div
                key={sector.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/5">
                    <Image
                      src={sector.image}
                      alt={sector.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="flex items-center gap-1.5 font-mono text-xs font-bold">
                        <Icon className="h-3.5 w-3.5 text-blue-300" />
                        {sector.name}
                      </span>
                      <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        {sector.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs leading-relaxed text-ink-soft">
                      {sector.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-line/70 bg-canvas/30 px-5 py-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    Engineered & Commissioned
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
