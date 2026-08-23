"use client";

import { useSyncExternalStore } from "react";

export type WebGLTier = "low" | "medium" | "high";

export interface WebGLCapability {
  supported: boolean;
  tier: WebGLTier;
  dpr: number;
}

const fallback: WebGLCapability = { supported: false, tier: "low", dpr: 1 };

let cached: WebGLCapability | null = null;

function detectCapability(): WebGLCapability {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!gl) return fallback;

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;

  let tier: WebGLTier = "high";
  if (isCoarsePointer || cores <= 4) tier = "low";
  else if (cores <= 8) tier = "medium";

  const dpr = Math.min(window.devicePixelRatio || 1, tier === "high" ? 2 : 1.5);

  return { supported: true, tier, dpr };
}

// WebGL capability never changes over a session, so this is a one-time
// probe cached at module scope rather than a subscribable store; there's
// nothing to subscribe to.
function getSnapshot(): WebGLCapability {
  if (!cached) cached = detectCapability();
  return cached;
}

function getServerSnapshot(): WebGLCapability {
  return fallback;
}

function subscribe() {
  return () => {};
}

/**
 * Feature/tier detection used to gate particle count, dpr, and the no-WebGL
 * fallback. Server snapshot is the safe fallback; useSyncExternalStore
 * upgrades to the real client capability right after hydration.
 */
export function useWebGL(): WebGLCapability {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
