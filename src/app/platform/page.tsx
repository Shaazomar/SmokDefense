import { PlatformSection } from "@/components/sections/PlatformSection";
import { BuildingExplorerSection } from "@/components/sections/BuildingExplorerSection";
import { ControlOverrideSection } from "@/components/sections/ControlOverrideSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmokDefense Software Platform | Centralized Life-Safety Twin",
  description: "Explore the SmokDefense platform: real-time 3D building twin, device management, alarm timeline, audit trail, and commissioning suite.",
};

export default function PlatformPage() {
  return (
    <main className="pt-20 bg-canvas">
      <PlatformSection />
      <BuildingExplorerSection />
      <ControlOverrideSection />
    </main>
  );
}
