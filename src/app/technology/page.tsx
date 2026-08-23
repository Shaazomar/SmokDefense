import { TechnologySection } from "@/components/sections/TechnologySection";
import { SystemArchitectureSection } from "@/components/sections/SystemArchitectureSection";
import { StandardsTrustSection } from "@/components/sections/StandardsTrustSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smoke Control Technology & Standards | SmokDefense",
  description: "Deep technical index of hardware controllers, IP500 wireless networks, edge gateways, sensors, and UUKL compliance standards.",
};

export default function TechnologyPage() {
  return (
    <main className="pt-20 bg-canvas">
      <TechnologySection />
      <SystemArchitectureSection />
      <StandardsTrustSection />
    </main>
  );
}
