"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Layers, FileText, Check } from "lucide-react";
import { SERVICES, type ServiceRecord } from "@/lib/data/services";
import { CallForDemo } from "@/components/demo/CallForDemo";

const SERVICE_IMAGES: Record<string, { image: string; tag: string }> = {
  engineer: {
    image: "/images/image_cfd_model_1776602481280.png",
    tag: "Airflow Calculations & CFD Smoke Spread Modeling",
  },
  "control-architecture": {
    image: "/images/hero-override-panel.png",
    tag: "Firefighters' Smoke Control Station Mimic & Priority Logic",
  },
  integrate: {
    image: "/images/bms-workstation.jpg",
    tag: "Multi-Protocol Gateways, FACP Loops & BMS Supervision",
  },
  install: {
    image: "/images/system-05-fs-dampers.jpg",
    tag: "Mechanical Damper Mounting, Actuator Fitment & Termination",
  },
  commission: {
    image: "/images/image_maintenance_1776602512508.png",
    tag: "Electrical Verification, Fluke Multimeter Diagnostics & Point Testing",
  },
  validate: {
    image: "/images/system-04-pressurization.jpg",
    tag: "Differential Pressure Barrier Testing & Response Verification",
  },
  maintain: {
    image: "/images/services-hero-engineering.jpg",
    tag: "Scheduled Sensor Calibration, Damper Exercise & AMC Support",
  },
};

export function ServiceSectionList() {
  return (
    <div id="service-catalogue" className="scroll-mt-24 space-y-20 lg:space-y-32">
      {SERVICES.map((service, index) => {
        const isEven = index % 2 === 1; // Service 02 and 04 have image on left
        const meta = SERVICE_IMAGES[service.slug] || {
          image: "/images/system-01-ventilation.jpg",
          tag: "Engineering Facility",
        };

        return (
          <article
            key={service.slug}
            className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-10 lg:p-12"
          >
            <div
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* Number & Eyebrow */}
                <div className="flex items-center gap-3 border-b border-line pb-4 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                  <span>STAGE {service.number}</span>
                  <span className="text-ink-faint">/</span>
                  <span>{service.stageName}</span>
                </div>

                {/* Main Headline */}
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-ink">
                  {service.title}
                </h2>

                {/* Summary */}
                <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                  {service.summary}
                </p>

                {/* Scope & Deliverables Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-line/70 pt-6">
                  {/* Scope */}
                  <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                      <Layers className="h-3.5 w-3.5 text-accent" />
                      Scope of Work
                    </span>
                    <ul className="mt-3.5 space-y-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs text-ink-soft"
                        >
                          <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-accent">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                      <FileText className="h-3.5 w-3.5 text-accent" />
                      Key Deliverables
                    </span>
                    <ul className="mt-3.5 space-y-2">
                      {service.deliverables.map((deliv) => (
                        <li
                          key={deliv}
                          className="flex items-start gap-2 text-[11px] font-mono leading-relaxed text-ink-soft"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8 border-t border-line/70 pt-6">
                  <CallForDemo
                    source={`Services — ${service.title}`}
                    label={`Enquire for ${service.title}`}
                    variant="accent"
                    size="sm"
                  />
                </div>
              </div>

              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-slate-900 shadow-md">
                  <Image
                    src={meta.image}
                    alt={`${service.title} Engineering Execution`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="flex items-center gap-2 rounded bg-black/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {service.number} {service.title}
                    </span>
                    <span className="hidden font-mono text-[10px] text-blue-200 sm:inline">
                      {meta.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
