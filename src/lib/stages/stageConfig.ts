export interface Stage {
  id: string;
  /** Normalized position (0-1) along the pinned hero scroll timeline. */
  scrollStart: number;
  scrollEnd: number;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
  uniforms?: Partial<{
    particleProgress: number;
    buildingOpacity: number;
  }>;
  ease?: string;
}

/**
 * Stage 1-2 are fully implemented this pass. Append further entries here for
 * stages 3-10 (smoke, sensors, control room, platform morph, global
 * zoom-out) — useStageOrchestrator wires each one into the same timeline
 * automatically; no orchestrator changes needed unless a stage introduces a
 * genuinely new uniform key (add it here and to proxies.ts/the shader).
 */
export const STAGES: Stage[] = [
  {
    id: "approach",
    scrollStart: 0,
    scrollEnd: 0.4,
    camera: { position: [9, 8, 17], target: [0, 7.5, 0] },
    uniforms: { particleProgress: 1 },
  },
  {
    id: "transparency",
    scrollStart: 0.4,
    scrollEnd: 1,
    camera: { position: [5, 9, 9], target: [0, 8, 0] },
    uniforms: { buildingOpacity: 0.25 },
  },
];
