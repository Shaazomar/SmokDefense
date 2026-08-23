"use client";

import { useRef } from "react";
import { HeroExperience } from "@/components/webgl/HeroExperience";
import { ScanTooltip } from "@/components/webgl/ScanTooltip";
import { HeroCopy } from "./HeroCopy";
import { useHeroIntro } from "@/lib/stages/useHeroIntro";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DEFAULT_FLOORS } from "@/lib/three/buildingGeometry";
import { DEMO_DEVICE_COUNT } from "@/lib/constants/webgl";

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useHeroIntro(reducedMotion);

  return (
    <section ref={pinRef} className="relative h-screen w-full overflow-hidden bg-canvas">
      <HeroExperience pinRef={pinRef} />
      <HeroCopy />
      {/* Rendered outside HeroExperience's transformed Canvas subtree so its
          `fixed` positioning anchors to the real viewport. */}
      <ScanTooltip floors={DEFAULT_FLOORS} deviceCount={DEMO_DEVICE_COUNT} />
    </section>
  );
}
