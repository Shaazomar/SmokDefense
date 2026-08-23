import { ResourcesSection } from "@/components/sections/ResourcesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Resource Center | SmokDefense",
  description: "Download product datasheets, engineering whitepapers, commissioning guides, and NFPA/UL compliance matrices.",
};

export default function ResourcesPage() {
  return (
    <main className="pt-20 bg-canvas">
      <ResourcesSection />
    </main>
  );
}
