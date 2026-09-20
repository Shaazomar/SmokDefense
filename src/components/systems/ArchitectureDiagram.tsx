"use client";

import React from "react";
import Image from "next/image";
import {
  Activity,
  Cpu,
  Server,
  Monitor,
  Fan,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";

interface LayerItem {
  number: string;
  badge: string;
  title: string;
  lead: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const LAYERS: LayerItem[] = [
  {
    number: "01",
    badge: "SENSORS",
    title: "SENSORS / FIELD DEVICES",
    lead: "Measurement and detection at the point of use.",
    image: "/images/sensor-composition-field.jpg",
    icon: Activity,
    items: ["CO₂ / CO sensors", "Differential pressure", "Temperature & humidity"],
  },
  {
    number: "02",
    badge: "GATEWAY",
    title: "GATEWAY / FIELD CONTROLLER",
    lead: "Local loop execution and protocol translation.",
    image: "/product-images/gateway-controller-1-c10fb660.jpg",
    icon: Cpu,
    items: ["Zone control logic", "IP500 / bus interface", "Device supervision"],
  },
  {
    number: "03",
    badge: "EDGE COMPUTE",
    title: "EDGE CONTROLLER",
    lead: "Building-level sequencing, buffering and analytics.",
    image: "/product-images/edge-controller-1-d189a044.jpg",
    icon: Server,
    items: ["Cross-zone sequences", "Offline event buffer", "Trend storage"],
  },
  {
    number: "04",
    badge: "PLATFORM",
    title: "BUILDING AUTOMATION / CONTROL PLATFORM",
    lead: "Supervision, scheduling, reporting and operator control.",
    image: "/images/bms-workstation.jpg",
    icon: Monitor,
    items: ["Live dashboards", "Alarm management", "Compliance reports"],
  },
  {
    number: "05",
    badge: "EQUIPMENT",
    title: "EQUIPMENT LAYER",
    lead: "Fans, dampers, actuators and ventilation equipment.",
    image: "/images/equipment-composition.jpg",
    icon: Fan,
    items: ["Supply & exhaust fans", "Fire & smoke dampers", "Belimo actuators"],
  },
];

export function ArchitectureDiagram() {
  return (
    <div className="mt-12">
      {/* 5-Layer Horizontal Connected Flow */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-3">
        {LAYERS.map((layer, index) => {
          const Icon = layer.icon;

          return (
            <div key={layer.number} className="relative flex flex-col">
              {/* Card */}
              <div className="group flex h-full flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                {/* Header: Layer Number + Icon */}
                <div>
                  <div className="flex items-center justify-between border-b border-line/70 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-accent">
                        {layer.number}
                      </span>
                      <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
                        {layer.badge}
                      </span>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-canvas text-ink-soft transition-colors group-hover:bg-blue-50 group-hover:text-accent">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Layer Image */}
                  <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-line/80 bg-slate-900/5">
                    <Image
                      src={layer.image}
                      alt={layer.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 20vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="mt-3.5">
                    <h4 className="font-display text-xs font-bold uppercase leading-tight tracking-tight text-ink">
                      {layer.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">
                      {layer.lead}
                    </p>
                  </div>
                </div>

                {/* Sub-item pills */}
                <div className="mt-4 border-t border-line/60 pt-3">
                  <ul className="space-y-1">
                    {layer.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 text-[10px] font-mono text-ink-soft"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connecting Arrows for Desktop */}
              {index < LAYERS.length - 1 && (
                <div className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 transform lg:flex">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-200 bg-white text-accent shadow-xs">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              )}

              {/* Connecting Arrows for Mobile/Tablet */}
              {index < LAYERS.length - 1 && (
                <div className="my-2 flex justify-center lg:hidden">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-200 bg-white text-accent shadow-xs">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Architecture Philosophy Footer Strip */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-ink-soft">
            <strong className="font-bold text-ink">Hierarchical Autonomy:</strong> If the supervisory platform goes offline, each zone controller continues running its local safety loop uninterrupted.
          </span>
        </div>
        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
          ANSI / ASHRAE & EN 12101 COMPLIANT
        </span>
      </div>
    </div>
  );
}
