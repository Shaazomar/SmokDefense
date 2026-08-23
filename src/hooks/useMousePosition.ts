"use client";

import { useSceneStore } from "@/lib/store/sceneStore";

/**
 * Reactive mouse position (NDC, -1..1) for DOM/HUD consumers. WebGL
 * consumers should bypass this hook and read `sceneStore.getState().mouseNDC`
 * directly inside useFrame to avoid a React re-render per frame.
 */
export function useMousePosition() {
  return useSceneStore((state) => state.mouseNDC);
}
