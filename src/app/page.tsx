import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WhySmokeSection } from "@/components/sections/WhySmokeSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { SystemArchitectureSection } from "@/components/sections/SystemArchitectureSection";
import { HardwareEcosystemSection } from "@/components/sections/HardwareEcosystemSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { BuildingExplorerSection } from "@/components/sections/BuildingExplorerSection";
import { ControlOverrideSection } from "@/components/sections/ControlOverrideSection";
import { CommissioningSection } from "@/components/sections/CommissioningSection";
import { TestingSection } from "@/components/sections/TestingSection";
import { MaintenanceSection } from "@/components/sections/MaintenanceSection";
import { IntelligenceSection } from "@/components/sections/IntelligenceSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { StandardsTrustSection } from "@/components/sections/StandardsTrustSection";
import { DeploymentSection } from "@/components/sections/DeploymentSection";
import { GlobalSection } from "@/components/sections/GlobalSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { CompanySection } from "@/components/sections/CompanySection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main className="relative bg-canvas overflow-x-hidden">
      {/* 01 HERO */}
      <Hero />

      {/* 02 THE PROBLEM */}
      <ProblemSection />

      {/* 03 WHY SMOKE MANAGEMENT */}
      <WhySmokeSection />

      {/* 04 THE SOLUTION */}
      <SolutionSection />

      {/* 05 HOW THE SYSTEM WORKS */}
      <SystemArchitectureSection />

      {/* 06 HARDWARE ECOSYSTEM */}
      <HardwareEcosystemSection />

      {/* 07 PLATFORM */}
      <PlatformSection />

      {/* 08 BUILDING EXPLORER (SIGNATURE FEATURE) */}
      <BuildingExplorerSection />

      {/* 09 CONTROL & OVERRIDE */}
      <ControlOverrideSection />

      {/* 10 COMMISSIONING */}
      <CommissioningSection />

      {/* 11 TESTING */}
      <TestingSection />

      {/* 12 MAINTENANCE */}
      <MaintenanceSection />

      {/* 13 INTELLIGENCE */}
      <IntelligenceSection />

      {/* 14 INDUSTRIES */}
      <IndustriesSection />

      {/* 15 TECHNOLOGY */}
      <TechnologySection />

      {/* 16 STANDARDS & TRUST */}
      <StandardsTrustSection />

      {/* 17 DEPLOYMENT */}
      <DeploymentSection />

      {/* 18 GLOBAL */}
      <GlobalSection />

      {/* 19 CASE STUDIES */}
      <CaseStudiesSection />

      {/* 20 RESOURCES */}
      <ResourcesSection />

      {/* 21 COMPANY */}
      <CompanySection />

      {/* 22 FINAL CTA */}
      <FinalCTASection />
    </main>
  );
}
