import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Vertical Industries | High-Rise, Hospitals, Hotels | SmokDefense",
  description: "Discover smoke control and life-safety infrastructure solutions tailored for high-rise towers, hospitals, hotels, logistics, and transit hubs.",
};

export default function IndustriesPage() {
  return (
    <main className="pt-20 bg-canvas">
      <IndustriesSection />
      <CaseStudiesSection />
    </main>
  );
}
