import { Hero } from "@/components/hero/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FiremanOverridePanelSection } from "@/components/home/FiremanOverridePanelSection";
import { ControlHierarchySection } from "@/components/home/ControlHierarchySection";
import { SystemsGridSection } from "@/components/home/SystemsGridSection";
import { IP500Section } from "@/components/home/IP500Section";
import { SmartBuildingIntegrationSection } from "@/components/home/SmartBuildingIntegrationSection";
import { CriticalEnvironmentsSection } from "@/components/home/CriticalEnvironmentsSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <main className="relative bg-white text-slate-900">
      {/* 01. Hero: Smoke Management Under Firefighter Control */}
      <Hero />

      {/* 02. Section 1: The Problem & Smoke Physics Flow */}
      <ProblemSection />

      {/* 03. Section 2: The Firefighter Control Station (FSCS / Fireman Override) */}
      <FiremanOverridePanelSection />

      {/* 04. Section 3: The 6-Stage Control Hierarchy Architecture */}
      <ControlHierarchySection />

      {/* 05. Section 4: The Systems We Control (Fans, Dampers, Pressurization) */}
      <SystemsGridSection />

      {/* 06. Section 5: IP500 Wireless Technology & CNX100 Module */}
      <IP500Section />

      {/* 07. Section 6: Coordinated Field System Integration */}
      <SmartBuildingIntegrationSection />

      {/* 08. Protected Buildings & Occupancies */}
      <ApplicationsSection />

      {/* 09. Section 7: Complete Engineering Lifecycle */}
      <CriticalEnvironmentsSection />

      {/* 10. Section 8: Final Consultation CTA */}
      <ClosingCTA
        source="Homepage"
        title="Let's design the control architecture for your building."
        lead="Our life-safety and building systems engineers work directly with MEP consultants, fire engineers, and facility teams to design, integrate, and commission reliable smoke control."
        secondary={{ href: "/systems", label: "EXPLORE ALL SYSTEMS" }}
      />
    </main>
  );
}
