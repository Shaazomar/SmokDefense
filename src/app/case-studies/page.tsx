import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Case Studies | SmokDefense",
  description: "Explore real-world smoke management case studies across commercial high-rises and international transit hubs.",
};

export default function CaseStudiesPage() {
  return (
    <main className="pt-20 bg-canvas">
      <CaseStudiesSection />
    </main>
  );
}
