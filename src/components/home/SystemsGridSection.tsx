"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SYSTEMS_LIST = [
  {
    num: "01",
    title: "Smoke Management",
    slug: "smoke-management",
    image: "/images/systems-hero-architecture.jpg",
    description: "Zoned smoke containment, smoke exhaust coordination, and stairway pressurization under NFPA 92 and applicable codes.",
    href: "/systems/smoke-management",
    badge: "Primary Architecture",
  },
  {
    num: "02",
    title: "Firefighters' Smoke Control Station",
    slug: "firefighters-smoke-control",
    image: "/images/hero-override-panel.png",
    description: "Designated physical control station providing graphical status monitoring and positive manual override over all smoke equipment.",
    href: "/systems/firefighters-smoke-control",
    badge: "Control Point",
  },
  {
    num: "03",
    title: "IP500® Wireless Connectivity",
    slug: "ip500-connectivity",
    image: "/images/system-07-field-devices.jpg",
    description: "Sub-GHz IEEE 802.15.4 and IPv6 open wireless mesh connecting life-safety sensors, dampers, and building controls.",
    href: "/systems/ip500-connectivity",
    badge: "IoT Infrastructure",
  },
  {
    num: "04",
    title: "Ventilation System",
    slug: "ventilation-system",
    image: "/images/system-01-ventilation.jpg",
    description: "Demand-controlled fresh air and exhaust ventilation combining sensors, controllers, and modulating damper actuators.",
    href: "/systems/ventilation-system",
    badge: "Supporting System",
  },
  {
    num: "05",
    title: "Smoke Exhaust & Extraction",
    slug: "smoke-exhaust",
    image: "/images/system-02-carpark.jpg",
    description: "High-temperature rated extraction fans (F300/F400) and automated make-up air intake louvres for fire zone smoke removal.",
    href: "/systems/smoke-exhaust",
    badge: "Execution Layer",
  },
  {
    num: "06",
    title: "Smoke & Fire Dampers",
    slug: "fs-dampers",
    image: "/images/system-05-fs-dampers.jpg",
    description: "Motorized fire, smoke, and combination dampers with spring-return actuation and continuous end-switch supervision.",
    href: "/systems/fs-dampers",
    badge: "Barrier Isolation",
  },
  {
    num: "07",
    title: "Stairway Pressurization",
    slug: "pressurization-system",
    image: "/images/system-04-pressurization.jpg",
    description: "Closed-loop differential pressure control protecting escape stairways and elevator lobbies against smoke ingress during egress.",
    href: "/systems/pressurization-system",
    badge: "Egress Protection",
  },
  {
    num: "08",
    title: "Fire Alarm Integration",
    slug: "fire-alarm-integration",
    image: "/images/hero-override-panel.png",
    description: "Deterministic supervised interfacing to Fire Alarm Control Panels (FACP), executing the building's emergency matrix.",
    href: "/systems/fire-alarm-integration",
    badge: "Supervised Interlocks",
  },
  {
    num: "09",
    title: "BMS & Building Automation",
    slug: "bms-integration",
    image: "/images/bms-workstation.jpg",
    description: "Interoperable BACnet/IP and Modbus gateway integration with life-safety priority override over regular HVAC loops.",
    href: "/systems/bms-integration",
    badge: "Supervisory Integration",
  },
];

export function SystemsGridSection() {
  return (
    <section id="systems" className="bg-white px-6 py-20 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
              <span>04 // THE SYSTEMS WE CONTROL</span>
            </div>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight text-slate-900 leading-[1.12]">
              Coordinated Building Safety Systems.
            </h2>
            <p className="mt-3 font-sans text-base text-slate-600">
              From the primary smoke-management control architecture to the physical fans, dampers, and pressurization loops that execute the response.
            </p>
          </div>

          <Link
            href="/systems"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 shrink-0"
          >
            <span>View All System Specifications</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 × 3 System Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SYSTEMS_LIST.map((system) => (
            <div
              key={system.title}
              className="flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={system.image}
                  alt={system.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 rounded bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                  {system.num} // {system.badge}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 justify-between p-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {system.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {system.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={system.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <span>Read System Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
