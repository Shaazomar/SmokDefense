import React from "react";
import { Cpu, ShieldCheck, Activity, Network } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const REASONS = [
  {
    icon: Cpu,
    title: "Intelligent Automation",
    body: "Control logic that responds to measured conditions — occupancy, air quality, pressure — instead of fixed schedules.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Field Hardware",
    body: "Sensors, actuators and dampers selected for the duty, with fail-safe behaviour where life safety depends on it.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    body: "Every device supervised and every event timestamped, so faults surface before they become failures.",
  },
  {
    icon: Network,
    title: "Integrated Building Control",
    body: "Ventilation, pressurization and fire/smoke systems on one platform, integrated with the wider BMS.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="border-t border-line bg-canvas px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="// Why SmokDefense" title="Engineered to stay working." />

        <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div key={reason.title} className="bg-white p-7">
              <reason.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg font-bold uppercase leading-tight tracking-tight text-ink">
                {reason.title}
              </h3>
              <p className="mt-3 font-sans text-xs leading-relaxed text-ink-soft">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
