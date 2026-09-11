import { Hero } from "@/components/hero/Hero";
import { QuickSolutions } from "@/components/home/QuickSolutions";
import { TechnologyStrip } from "@/components/home/TechnologyStrip";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-canvas">
      <Hero />
      <QuickSolutions />
      <TechnologyStrip />
      <WhyChooseUs />
      <ClosingCTA source="Homepage" secondary={{ href: "/systems", label: "Explore Systems" }} />
    </main>
  );
}
