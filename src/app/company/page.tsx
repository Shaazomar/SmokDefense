import { CompanySection } from "@/components/sections/CompanySection";
import { DeploymentSection } from "@/components/sections/DeploymentSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SmokDefense | Intelligent Life-Safety Infrastructure Company",
  description: "Learn how SmokDefense builds the digital layer behind complex building life-safety systems, combining hardware engineering and software intelligence.",
};

export default function CompanyPage() {
  return (
    <main className="pt-20 bg-canvas">
      <CompanySection />
      <DeploymentSection />
    </main>
  );
}
