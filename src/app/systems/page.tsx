import type { Metadata } from "next";
import { SystemsHero } from "@/components/systems/SystemsHero";
import { SystemsExplorer } from "@/components/systems/SystemsExplorer";
import { ArchitectureDiagram } from "@/components/systems/ArchitectureDiagram";
import { SystemsGrid } from "@/components/systems/SystemsGrid";
import { FieldDeviceGrid } from "@/components/systems/FieldDeviceGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export const metadata: Metadata = {
  title: "Systems — Override-R Building Automation & Fire Safety",
  description:
    "Ventilation, car park ventilation, CO₂ monitoring and controls, pressurization, fire & smoke dampers, actuators and field devices — engineered as one unified control architecture.",
};

export default function SystemsPage() {
  return (
    <main className="bg-canvas">
      {/* 1. Systems Hero with Split Layout & Architectural Cutaway Visual */}
      <SystemsHero />

      {/* 2. Interactive Systems Overview (Sidebar Navigation + Selected System Details) */}
      <section className="border-b border-line bg-white px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Systems Explorer"
            title="Engineered for Unified Operation."
            lead="Select any system below to inspect its operational sequence, key components and integration capabilities."
          />
          <div className="mt-10">
            <SystemsExplorer />
          </div>
        </div>
      </section>

      {/* 3. How the Layers Connect (5-Tier Horizontal Architecture Flow) */}
      <section id="architecture" className="scroll-mt-24 border-b border-line bg-gradient-to-b from-canvas via-white to-canvas px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// How It Works"
            title="How the Layers Connect."
            lead="Measurement at the bottom, equipment at the top, and control that keeps working when the layer above it is unavailable."
          />
          <ArchitectureDiagram />
        </div>
      </section>

      {/* 4. Complete Systems Portfolio Grid */}
      <section className="border-b border-line bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Complete Portfolio"
            title="Seven Integrated Systems."
            lead="Explore specifications, device schedules and integration protocols for each system."
          />
          <div className="mt-10">
            <SystemsGrid />
          </div>
        </div>
      </section>

      {/* 5. Field Devices Layer */}
      <section id="field-devices" className="scroll-mt-24 border-b border-line bg-canvas px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Field Devices"
            title="The Hardware Layer."
            lead="Filter by device family. Stocked catalogue items link directly through to their product specification."
          />
          <div className="mt-10">
            <FieldDeviceGrid />
          </div>
        </div>
      </section>

      {/* 6. Closing Call to Action */}
      <ClosingCTA
        source="Systems Page"
        title="Specifying a system? Let's review it together."
        lead="We will walk through the architecture, the device schedule and the control philosophy against your building."
        secondary={{ href: "/services", label: "Our Services" }}
      />
    </main>
  );
}
