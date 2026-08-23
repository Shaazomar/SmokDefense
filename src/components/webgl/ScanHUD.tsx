"use client";

import type { ThreeEvent } from "@react-three/fiber";
import type { ConstructionData } from "@/lib/three/buildingGeometry";
import { sceneStore } from "@/lib/store/sceneStore";

interface ScanHUDProps {
  bounds: ConstructionData["bounds"];
}

/**
 * Invisible bounding volume that drives the hover "SCAN" state via
 * raycasting. The actual tooltip is a plain DOM overlay (ScanTooltip,
 * rendered outside the Canvas) that follows the raw cursor position —
 * simpler and more robust than projecting a 3D anchor point through
 * drei's Html, which misbehaves at the hero's large establishing-shot
 * camera distances.
 */
export function ScanHUD({ bounds }: ScanHUDProps) {
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (!sceneStore.getState().hovered) sceneStore.setState({ hovered: true });
  };

  const handlePointerOut = () => sceneStore.setState({ hovered: false });

  return (
    <mesh
      position={[0, bounds.height / 2, 0]}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[bounds.width * 1.6, bounds.height, bounds.depth * 1.6]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}
