"use client";

import React from "react";
import Image from "next/image";

const SECTORS = [
  {
    title: "High-Rise Towers",
    image: "/images/image_smoke_panel_1776602463560.png",
    desc: "Stairwell pressurization and vertical zone smoke isolation for tall commercial and residential buildings.",
  },
  {
    title: "Hospitals & Healthcare",
    image: "/images/image_clean_room_1776602497882.png",
    desc: "Horizontal evacuation compartmentation, cleanroom pressure control, and patient wing isolation.",
  },
  {
    title: "Airports & Terminals",
    image: "/images/image_warehouse_1776602527449.png",
    desc: "Large-volume atrium smoke reservoirs, long-span extraction, and concourse egress route protection.",
  },
  {
    title: "Shopping Malls",
    image: "/images/image_public_sector_1776603419378.png",
    desc: "Multi-level atrium smoke clearing, retail barrier closures, and basement parking ventilation.",
  },
  {
    title: "Industrial Facilities",
    image: "/images/image_active_fire_1776602431065.png",
    desc: "F400 high-temperature smoke exhaust fans, process ventilation interlocks, and manufacturing plant safety.",
  },
  {
    title: "Commercial Complexes",
    image: "/images/image_datacenter_1776602542119.png",
    desc: "Demand-controlled CO₂ fresh air ventilation combined with automated fire alarm emergency overrides.",
  },
  {
    title: "Tunnels & Transit",
    image: "/images/image_passive_fire_1776602447129.png",
    desc: "Longitudinal tunnel ventilation, underground station smoke extraction, and utility shaft protection.",
  },
  {
    title: "Enclosed Car Parks",
    image: "/images/image_cfd_model_1776602481280.png",
    desc: "CO sensor grids and jet fan induction systems holding carbon monoxide within safe exposure thresholds.",
  },
];

export function ApplicationsSection() {
  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
            Sectors &amp; Facilities
          </span>
          <h2 className="mt-2 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
            Applications &amp; Buildings We Protect.
          </h2>
          <p className="mt-3 font-sans text-base text-slate-600">
            Override-R systems are engineered for commercial, industrial and public infrastructure projects requiring verified life-safety compliance.
          </p>
        </div>

        {/* 8-Sector Clean Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTORS.map((sector) => (
            <div
              key={sector.title}
              className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {sector.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-slate-600">
                    {sector.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
