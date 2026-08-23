import type { WebGLTier } from "@/hooks/useWebGL";

export const PARTICLE_DENSITY_BY_TIER: Record<WebGLTier, number> = {
  low: 1.5,
  medium: 3,
  high: 5,
};

export const DPR_CAP_BY_TIER: Record<WebGLTier, [number, number]> = {
  low: [1, 1],
  medium: [1, 1.5],
  high: [1, 2],
};

/** Illustrative device count for the ScanHUD readout — cosmetic copy, not tied to the internal particle simulation count. */
export const DEMO_DEVICE_COUNT = 428;
