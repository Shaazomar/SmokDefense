"use client";

import { useSceneStore } from "@/lib/store/sceneStore";

/** Thin DOM-facing wrapper over scene scroll state (nav show/hide, overlays). */
export function useScrollProgress() {
  const scrolled = useSceneStore((state) => state.scrolled);
  const direction = useSceneStore((state) => state.scrollDirection);
  return { scrolled, direction };
}
