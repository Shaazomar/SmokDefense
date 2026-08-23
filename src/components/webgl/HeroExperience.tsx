"use client";

import dynamic from "next/dynamic";
import { Suspense, type RefObject } from "react";
import { useWebGL } from "@/hooks/useWebGL";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Scene = dynamic(() => import("./scenes/Scene"), { ssr: false, loading: () => null });

interface HeroExperienceProps {
  pinRef: RefObject<HTMLElement | null>;
}

/**
 * Client/SSR boundary for the WebGL hero. next/dynamic(ssr:false) keeps the
 * three.js/R3F bundle out of the initial payload entirely — it's fetched
 * only once WebGL support has actually been confirmed.
 */
export function HeroExperience({ pinRef }: HeroExperienceProps) {
  const { supported, tier } = useWebGL();
  const reducedMotion = useReducedMotion();

  if (!supported) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <Scene tier={tier} pinRef={pinRef} reducedMotion={reducedMotion} />
      </Suspense>
    </div>
  );
}
