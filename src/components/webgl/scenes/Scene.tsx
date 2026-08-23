"use client";

import { Suspense, useMemo, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { generateConstructionData } from "@/lib/three/buildingGeometry";
import { PARTICLE_DENSITY_BY_TIER, DPR_CAP_BY_TIER } from "@/lib/constants/webgl";
import type { WebGLTier } from "@/hooks/useWebGL";
import { ConstructionField } from "@/components/webgl/ConstructionField";
import { CameraRig } from "@/components/webgl/CameraRig";
import { ScanHUD } from "@/components/webgl/ScanHUD";
import { useStageOrchestrator } from "@/lib/stages/useStageOrchestrator";

interface SceneProps {
  tier: WebGLTier;
  pinRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
}

export default function Scene({ tier, pinRef, reducedMotion }: SceneProps) {
  useStageOrchestrator(pinRef);

  const data = useMemo(
    () => generateConstructionData({ particleDensity: PARTICLE_DENSITY_BY_TIER[tier] }),
    [tier],
  );

  return (
    <Canvas
      dpr={DPR_CAP_BY_TIER[tier]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [16, 10, 30] }}
    >
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 18, 60]} />
      <Suspense fallback={null}>
        <CameraRig />
        <ConstructionField data={data} noiseAmplitude={reducedMotion ? 0 : 0.18} />
        <ScanHUD bounds={data.bounds} />
      </Suspense>
    </Canvas>
  );
}
