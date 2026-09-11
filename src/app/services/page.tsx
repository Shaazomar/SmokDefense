import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "System design, engineering & integration, installation & commissioning, testing & validation, and AMC / maintenance for ventilation, pressurization and fire/smoke control systems.",
};

const LIFECYCLE = [
  { phase: "Design", detail: "Calculations, schedules, control philosophy" },
  { phase: "Integrate", detail: "Programming, protocols, BMS interface" },
  { phase: "Install", detail: "Devices, controllers, commissioning" },
  { phase: "Validate", detail: "Measured performance, records" },
  { phase: "Maintain", detail: "Planned maintenance, calibration, upgrades" },
];

export default function ServicesPage() {
  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="Services"
        title="Designed, integrated, commissioned, maintained."
        lead="We take responsibility across the whole lifecycle, so the system that gets handed over is the system that was designed — and it stays that way."
        crumbs={[{ label: "Services" }]}
        actions={<CallForDemo source="Services Page" />}
      />

      <section className="border-b border-line bg-white px-6 py-8 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 font-mono text-[11px] uppercase tracking-widest">
          {LIFECYCLE.map((stage, index) => (
            <span key={stage.phase} className="flex items-center gap-3">
              <span className="border border-line px-3 py-1.5">
                <span className="font-bold text-ink">{stage.phase}</span>
                <span className="ml-2 normal-case tracking-normal text-ink-faint">{stage.detail}</span>
              </span>
              {index < LIFECYCLE.length - 1 && <span className="text-accent">→</span>}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Service Catalogue"
            title="Five service lines."
            lead="Engaged individually, or as a single contract across the project."
          />

          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
            {SERVICES.map((service) => (
              <article key={service.slug} className="flex flex-col bg-white p-7 md:p-9">
                <div className="border-b border-line pb-5">
                  <span className="font-mono text-[11px] font-bold text-accent">{service.number}</span>
                  <h2 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink md:text-2xl">
                    {service.title}
                  </h2>
                </div>

                <p className="mt-5 font-sans text-xs leading-relaxed text-ink-soft md:text-sm">
                  {service.summary}
                </p>

                <div className="mt-6 grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                      Scope
                    </span>
                    <ul className="mt-3 space-y-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 font-sans text-[11px] leading-relaxed text-ink-soft"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-line pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                      Deliverables
                    </span>
                    <ul className="mt-3 space-y-2">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink-faint"
                        >
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 border-t border-line pt-5">
                  <CallForDemo
                    source={`Services — ${service.title}`}
                    variant="secondary"
                    size="sm"
                  />
                </div>
              </article>
            ))}

            <article className="flex flex-col justify-between gap-6 bg-ink p-7 md:p-9">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                  {"// "}Single Point of Responsibility
                </span>
                <h2 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-white md:text-2xl">
                  One team from design to maintenance.
                </h2>
                <p className="mt-5 font-sans text-xs leading-relaxed text-white/70 md:text-sm">
                  When design, integration and commissioning sit with separate parties, the gaps
                  between them become the building&apos;s problem at handover. We keep the chain under
                  one responsibility, so the control philosophy that was designed is the one that gets
                  commissioned — and the one that gets maintained.
                </p>
              </div>
              <CallForDemo source="Services — Full Lifecycle" variant="accent" className="self-start" />
            </article>
          </div>
        </div>
      </section>

      <ClosingCTA
        source="Services Page"
        title="Tell us what stage your project is at."
        lead="A design review, an integration scope, or an existing system that needs bringing back to specification — we will tell you what it takes."
        secondary={{ href: "/systems", label: "Explore Systems" }}
      />
    </main>
  );
}
