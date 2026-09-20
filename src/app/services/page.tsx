import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { LifecycleStrip } from "@/components/services/LifecycleStrip";
import { LifecycleOverview } from "@/components/services/LifecycleOverview";
import { ServiceSectionList } from "@/components/services/ServiceSectionList";
import { WhyOverrideR } from "@/components/services/WhyOverrideR";
import { ApplicationEnvironments } from "@/components/services/ApplicationEnvironments";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Services — Override-R Turnkey Building Engineering & Life Safety",
  description:
    "01 Engineer, 02 Control Architecture, 03 Integrate, 04 Install, 05 Commission, 06 Validate, and 07 Maintain for smoke management, pressurization, and building safety systems.",
};

export default function ServicesPage() {
  return (
    <main className="bg-canvas">
      {/* 1. Services Hero with Architectural Photograph & Technical Annotations */}
      <ServicesHero />

      {/* 2. Connected 7-Stage Engineering Lifecycle Strip */}
      <LifecycleStrip />

      {/* 3. The Complete Service Lifecycle Philosophy */}
      <LifecycleOverview />

      {/* 4. Alternating Editorial Service Lines (01 Engineer through 07 Maintain) */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Service Catalogue"
            title="Seven Connected Engineering Stages."
            lead="Engaged as specialized engineering stages, or as a single turnkey contract across your project lifecycle."
          />
          <div className="mt-12">
            <ServiceSectionList />
          </div>
        </div>
      </section>

      {/* 5. Four Pillars: Why Override-R */}
      <WhyOverrideR />

      {/* 6. Application Environments (Where We Deliver) */}
      <ApplicationEnvironments />

      {/* 7. Closing Full-Width Architectural CTA */}
      <ServicesCTA />
    </main>
  );
}
