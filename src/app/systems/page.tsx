import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SystemsExplorer } from "@/components/systems/SystemsExplorer";
import { ArchitectureDiagram } from "@/components/systems/ArchitectureDiagram";
import { FieldDeviceGrid } from "@/components/systems/FieldDeviceGrid";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { SYSTEMS } from "@/lib/data/systems";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Ventilation, car park ventilation, CO₂ monitoring and controls, pressurization, fire & smoke dampers, actuators and field devices — engineered as one automation architecture.",
};

export default function SystemsPage() {
  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="Systems"
        title="Seven systems. One control architecture."
        lead="Each system is engineered around the same layered architecture — field devices, controllers, edge compute and the automation platform — so they integrate instead of competing for the same equipment."
        crumbs={[{ label: "Systems" }]}
        actions={<CallForDemo source="Systems Page" />}
        meta={
          <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint lg:justify-end">
            {SYSTEMS.map((system) => (
              <span key={system.slug} className="border border-line px-2 py-1">
                {system.number} {system.short}
              </span>
            ))}
          </div>
        }
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SystemsExplorer />
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 border-t border-line bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Systems Architecture"
            title="How the layers connect."
            lead="Measurement at the bottom, equipment at the top, and control that keeps working when the layer above it is unavailable."
          />
          <ArchitectureDiagram />
        </div>
      </section>

      <section id="field-devices" className="scroll-mt-24 border-t border-line bg-canvas px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Field Devices"
            title="The device layer."
            lead="Filter by device family. Devices we stock as catalogue items link through to their product page."
          />
          <FieldDeviceGrid />
        </div>
      </section>

      <ClosingCTA
        source="Systems Page"
        title="Specifying a system? Let's review it together."
        lead="We will walk through the architecture, the device schedule and the control philosophy against your building."
        secondary={{ href: "/services", label: "Our Services" }}
      />
    </main>
  );
}
