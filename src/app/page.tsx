import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SmokeControlSection } from "@/components/sections/SmokeControlSection";
import { SystemArchitectureSection } from "@/components/sections/SystemArchitectureSection";
import { BuildingExplorerSection } from "@/components/sections/BuildingExplorerSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { ControlOverrideSection } from "@/components/sections/ControlOverrideSection";
import { SystemIntegrationSection } from "@/components/sections/SystemIntegrationSection";
import { CommissioningSection } from "@/components/sections/CommissioningSection";
import { MaintenanceSection } from "@/components/sections/MaintenanceSection";
import { RetrofitSection } from "@/components/sections/RetrofitSection";
import { EngineeringSection } from "@/components/sections/EngineeringSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { StandardsTrustSection } from "@/components/sections/StandardsTrustSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { DeploymentSection } from "@/components/sections/DeploymentSection";
import { GlobalSection } from "@/components/sections/GlobalSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CompanySection } from "@/components/sections/CompanySection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main className="relative bg-canvas overflow-x-hidden">
      {/* 01 HERO */}
      <Hero />

      {/* 02 THE PROBLEM */}
      <ProblemSection />

      {/* 03 SMOKE CONTROL MODES */}
      <SmokeControlSection />

      {/* 04 THE SMOKEDEFENCE SYSTEM */}
      <SystemArchitectureSection />

      {/* 05 BUILDING EXPLORER (SIGNATURE FEATURE) */}
      <BuildingExplorerSection />

      {/* 06 CENTRALIZED MONITORING */}
      <PlatformSection />

      {/* 07 CONTROL & OVERRIDE */}
      <ControlOverrideSection />

      {/* 08 SYSTEM INTEGRATION */}
      <SystemIntegrationSection />

      {/* 09 COMMISSIONING */}
      <CommissioningSection />

      {/* 10 MAINTENANCE */}
      <MaintenanceSection />

      {/* 11 REFURBISHMENT & RETROFIT */}
      <RetrofitSection />

      {/* 12 ENGINEERING DIMENSIONS */}
      <EngineeringSection />

      {/* 13 INDUSTRIES */}
      <IndustriesSection />

      {/* 14 TECHNOLOGY STACK */}
      <TechnologySection />

      {/* 15 STANDARDS & COMPLIANCE */}
      <StandardsTrustSection />

      {/* 16 DOCUMENTATION / ENGINEERING LIBRARY */}
      <ResourcesSection />

      {/* 17 PROJECT LIFECYCLE */}
      <DeploymentSection />

      {/* 18 GLOBAL DEPLOYMENT */}
      <GlobalSection />

      {/* 19 CASE STUDIES */}
      <CaseStudiesSection />

      {/* 20 ABOUT SMOKEDEFENCE */}
      <CompanySection />

      {/* 21 CONTACT & ENGINEERING CONSULTATION */}
      <FinalCTASection />
    </main>
  );
}
