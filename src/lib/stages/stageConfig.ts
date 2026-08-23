export interface Stage {
  id: string;
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
 * Camera & WebGL animation stages for the 22 Homepage Narrative sections.
 * Smoothly interpolates the camera and shader uniforms across the entire scroll length.
 */
export const STAGES: Stage[] = [
  {
    id: "hero",
    scrollStart: 0,
    scrollEnd: 0.05,
    camera: { position: [16, 10, 30], target: [0, 7.5, 0] },
    uniforms: { particleProgress: 1, buildingOpacity: 1 },
  },
  {
    id: "problem",
    scrollStart: 0.05,
    scrollEnd: 0.1,
    camera: { position: [8, 12, 18], target: [0, 8, 0] },
    uniforms: { particleProgress: 1, buildingOpacity: 0.8 },
  },
  {
    id: "why-smoke",
    scrollStart: 0.1,
    scrollEnd: 0.15,
    camera: { position: [4, 14, 14], target: [0, 8, 0] },
    uniforms: { particleProgress: 0.95, buildingOpacity: 0.6 },
  },
  {
    id: "solution",
    scrollStart: 0.15,
    scrollEnd: 0.2,
    camera: { position: [0, 10, 16], target: [0, 8, 0] },
    uniforms: { particleProgress: 0.9, buildingOpacity: 0.4 },
  },
  {
    id: "how-it-works",
    scrollStart: 0.2,
    scrollEnd: 0.25,
    camera: { position: [-10, 8, 18], target: [0, 7, 0] },
    uniforms: { particleProgress: 0.85, buildingOpacity: 0.5 },
  },
  {
    id: "hardware",
    scrollStart: 0.25,
    scrollEnd: 0.35,
    camera: { position: [-6, 6, 12], target: [0, 6, 0] },
    uniforms: { particleProgress: 0.9, buildingOpacity: 0.7 },
  },
  {
    id: "platform",
    scrollStart: 0.35,
    scrollEnd: 0.45,
    camera: { position: [0, 12, 20], target: [0, 8, 0] },
    uniforms: { particleProgress: 0.95, buildingOpacity: 0.3 },
  },
  {
    id: "explorer",
    scrollStart: 0.45,
    scrollEnd: 0.55,
    camera: { position: [3, 9, 8], target: [0, 8, 0] },
    uniforms: { particleProgress: 1, buildingOpacity: 0.9 },
  },
  {
    id: "control",
    scrollStart: 0.55,
    scrollEnd: 0.6,
    camera: { position: [10, 6, 16], target: [0, 6, 0] },
    uniforms: { particleProgress: 0.9, buildingOpacity: 0.6 },
  },
  {
    id: "commissioning",
    scrollStart: 0.6,
    scrollEnd: 0.65,
    camera: { position: [12, 10, 22], target: [0, 7, 0] },
    uniforms: { particleProgress: 0.95, buildingOpacity: 0.7 },
  },
  {
    id: "testing",
    scrollStart: 0.65,
    scrollEnd: 0.7,
    camera: { position: [6, 14, 18], target: [0, 8, 0] },
    uniforms: { particleProgress: 0.9, buildingOpacity: 0.5 },
  },
  {
    id: "maintenance",
    scrollStart: 0.7,
    scrollEnd: 0.75,
    camera: { position: [-8, 12, 20], target: [0, 8, 0] },
    uniforms: { particleProgress: 0.9, buildingOpacity: 0.6 },
  },
  {
    id: "intelligence",
    scrollStart: 0.75,
    scrollEnd: 0.8,
    camera: { position: [0, 16, 24], target: [0, 8, 0] },
    uniforms: { particleProgress: 0.85, buildingOpacity: 0.4 },
  },
  {
    id: "industries",
    scrollStart: 0.8,
    scrollEnd: 0.85,
    camera: { position: [14, 8, 22], target: [0, 7, 0] },
    uniforms: { particleProgress: 0.95, buildingOpacity: 0.7 },
  },
  {
    id: "technology",
    scrollStart: 0.85,
    scrollEnd: 0.9,
    camera: { position: [-12, 10, 20], target: [0, 7, 0] },
    uniforms: { particleProgress: 0.9, buildingOpacity: 0.6 },
  },
  {
    id: "trust-global",
    scrollStart: 0.9,
    scrollEnd: 0.95,
    camera: { position: [0, 22, 32], target: [0, 7, 0] },
    uniforms: { particleProgress: 0.8, buildingOpacity: 0.8 },
  },
  {
    id: "final-cta",
    scrollStart: 0.95,
    scrollEnd: 1.0,
    camera: { position: [16, 10, 30], target: [0, 7.5, 0] },
    uniforms: { particleProgress: 1, buildingOpacity: 1 },
  },
];
