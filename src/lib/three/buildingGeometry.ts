import { mulberry32 } from "@/lib/utils/random";

export const DEFAULT_FLOORS = 18;

export interface ConstructionData {
  particleCount: number;
  startPositions: Float32Array;
  networkPositions: Float32Array;
  targetPositions: Float32Array;
  seeds: Float32Array;
  delays: Float32Array;
  lineNodeCount: number;
  lineStartPositions: Float32Array;
  lineNetworkPositions: Float32Array;
  lineTargetPositions: Float32Array;
  lineSeeds: Float32Array;
  lineIndices: Uint16Array | Uint32Array;
  bounds: { width: number; depth: number; height: number };
}

export interface ConstructionOptions {
  floors?: number;
  footprintWidth?: number;
  footprintDepth?: number;
  floorHeight?: number;
  /** Particle samples per unit of edge length — the main perf/tier knob. */
  particleDensity?: number;
  seed?: number;
}

interface Node {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

/**
 * Pure, deterministic generator for the hero's procedural building: a set of
 * structural nodes (column/floor-perimeter corners), an edge list ordered
 * columns -> floor perimeters -> diagonal "network" links (so a growing
 * drawRange reveals them in that order), and a denser particle cloud sampled
 * along those edges for the point/network/building blend shader.
 */
export function generateConstructionData(
  options: ConstructionOptions = {},
): ConstructionData {
  const {
    floors = DEFAULT_FLOORS,
    footprintWidth = 6,
    footprintDepth = 4.5,
    floorHeight = 1.1,
    particleDensity = 4,
    seed = 1337,
  } = options;

  const random = mulberry32(seed);
  const halfW = footprintWidth / 2;
  const halfD = footprintDepth / 2;
  const height = floors * floorHeight;

  const corners = [
    { x: -halfW, z: -halfD },
    { x: halfW, z: -halfD },
    { x: halfW, z: halfD },
    { x: -halfW, z: halfD },
  ];

  const nodes: Node[] = [];
  const nodeIndex = (level: number, corner: number) => level * 4 + corner;
  for (let level = 0; level <= floors; level++) {
    const y = level * floorHeight;
    for (const c of corners) nodes.push({ x: c.x, y, z: c.z });
  }

  const edges: Edge[] = [];
  for (let corner = 0; corner < 4; corner++) {
    for (let level = 0; level < floors; level++) {
      edges.push({ a: nodeIndex(level, corner), b: nodeIndex(level + 1, corner) });
    }
  }
  for (let level = 0; level <= floors; level++) {
    for (let corner = 0; corner < 4; corner++) {
      edges.push({ a: nodeIndex(level, corner), b: nodeIndex(level, (corner + 1) % 4) });
    }
  }
  const diagonalCount = floors;
  for (let i = 0; i < diagonalCount; i++) {
    const levelA = Math.floor(random() * (floors + 1));
    const levelB = Math.floor(random() * (floors + 1));
    const cornerA = Math.floor(random() * 4);
    const cornerB = Math.floor(random() * 4);
    edges.push({ a: nodeIndex(levelA, cornerA), b: nodeIndex(levelB, cornerB) });
  }

  const targetPoints: Node[] = [];
  for (const edge of edges) {
    const a = nodes[edge.a];
    const b = nodes[edge.b];
    const length = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
    const samples = Math.min(80, Math.max(2, Math.round(particleDensity * length)));
    for (let s = 0; s < samples; s++) {
      const t = s / (samples - 1 || 1);
      const jitter = (random() - 0.5) * 0.05;
      targetPoints.push({
        x: a.x + (b.x - a.x) * t + jitter,
        y: a.y + (b.y - a.y) * t + jitter,
        z: a.z + (b.z - a.z) * t + jitter,
      });
    }
  }

  const particleCount = targetPoints.length;
  const startPositions = new Float32Array(particleCount * 3);
  const networkPositions = new Float32Array(particleCount * 3);
  const targetPositions = new Float32Array(particleCount * 3);
  const seeds = new Float32Array(particleCount * 3);
  const delays = new Float32Array(particleCount);

  const originY = height * 0.12;
  const networkRadius = Math.max(footprintWidth, footprintDepth, height) * 0.85;

  const seedOrigin = (i3: number, out: Float32Array, radiusScale: number) => {
    const r = radiusScale * (0.4 + random() * 0.3);
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    out[i3] = Math.sin(phi) * Math.cos(theta) * r;
    out[i3 + 1] = originY + Math.cos(phi) * r;
    out[i3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
  };

  const seedNetwork = (i3: number, out: Float32Array) => {
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const r = networkRadius * (0.6 + random() * 0.4);
    out[i3] = Math.sin(phi) * Math.cos(theta) * r;
    out[i3 + 1] = height * 0.5 + Math.cos(phi) * r * 0.5;
    out[i3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
  };

  for (let i = 0; i < particleCount; i++) {
    const p = targetPoints[i];
    const i3 = i * 3;

    seedOrigin(i3, startPositions, 1);
    seedNetwork(i3, networkPositions);

    targetPositions[i3] = p.x;
    targetPositions[i3 + 1] = p.y;
    targetPositions[i3 + 2] = p.z;

    seeds[i3] = random();
    seeds[i3 + 1] = random();
    seeds[i3 + 2] = random();

    const heightRatio = p.y / height;
    delays[i] = Math.min(1, Math.max(0, heightRatio * 0.2 + random() * 0.85));
  }

  const lineNodeCount = nodes.length;
  const lineStartPositions = new Float32Array(lineNodeCount * 3);
  const lineNetworkPositions = new Float32Array(lineNodeCount * 3);
  const lineTargetPositions = new Float32Array(lineNodeCount * 3);
  const lineSeeds = new Float32Array(lineNodeCount * 3);

  for (let i = 0; i < lineNodeCount; i++) {
    const n = nodes[i];
    const i3 = i * 3;

    seedOrigin(i3, lineStartPositions, 1);
    seedNetwork(i3, lineNetworkPositions);

    lineTargetPositions[i3] = n.x;
    lineTargetPositions[i3 + 1] = n.y;
    lineTargetPositions[i3 + 2] = n.z;

    lineSeeds[i3] = random();
    lineSeeds[i3 + 1] = random();
    lineSeeds[i3 + 2] = random();
  }

  const indexArray: number[] = [];
  for (const e of edges) indexArray.push(e.a, e.b);
  const lineIndices =
    lineNodeCount > 65535 ? new Uint32Array(indexArray) : new Uint16Array(indexArray);

  return {
    particleCount,
    startPositions,
    networkPositions,
    targetPositions,
    seeds,
    delays,
    lineNodeCount,
    lineStartPositions,
    lineNetworkPositions,
    lineTargetPositions,
    lineSeeds,
    lineIndices,
    bounds: { width: footprintWidth, depth: footprintDepth, height },
  };
}
