"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ConstructionData } from "@/lib/three/buildingGeometry";
import { pointsVertexShader, pointsFragmentShader } from "@/lib/shaders/points";
import { linesVertexShader, linesFragmentShader } from "@/lib/shaders/lines";
import { uniformProxy } from "@/lib/stages/proxies";
import { sceneStore } from "@/lib/store/sceneStore";

const INK_COLOR = new THREE.Color("#0a0a0c");
const ACCENT_COLOR = new THREE.Color("#0047ff");

interface ConstructionFieldProps {
  data: ConstructionData;
  noiseAmplitude?: number;
}

/**
 * The hero's point -> network -> building sequence: one Points cloud sampled
 * along the building's edges, plus a LineSegments wireframe of the raw
 * structural nodes, both driven by the same uProgress-based blend shader.
 * Line reveal order (columns, then floor perimeters, then diagonals) comes
 * purely from the edge ordering baked into buildingGeometry.ts.
 */
export function ConstructionField({ data, noiseAmplitude = 0.18 }: ConstructionFieldProps) {
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const linesMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(data.targetPositions, 3));
    geometry.setAttribute("aStartPosition", new THREE.BufferAttribute(data.startPositions, 3));
    geometry.setAttribute("aNetworkPosition", new THREE.BufferAttribute(data.networkPositions, 3));
    geometry.setAttribute("aTargetPosition", new THREE.BufferAttribute(data.targetPositions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 3));
    geometry.setAttribute("aDelay", new THREE.BufferAttribute(data.delays, 1));
    return geometry;
  }, [data]);

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(data.lineTargetPositions, 3));
    geometry.setAttribute("aStartPosition", new THREE.BufferAttribute(data.lineStartPositions, 3));
    geometry.setAttribute("aNetworkPosition", new THREE.BufferAttribute(data.lineNetworkPositions, 3));
    geometry.setAttribute("aTargetPosition", new THREE.BufferAttribute(data.lineTargetPositions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(data.lineSeeds, 3));
    geometry.setIndex(new THREE.BufferAttribute(data.lineIndices, 1));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [data]);

  useEffect(() => {
    return () => {
      pointsGeometry.dispose();
      linesGeometry.dispose();
    };
  }, [pointsGeometry, linesGeometry]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const { mouseNDC } = sceneStore.getState();
    const progress = uniformProxy.particleProgress;
    const opacity = uniformProxy.buildingOpacity;

    if (pointsMaterialRef.current) {
      const u = pointsMaterialRef.current.uniforms;
      u.uProgress.value = progress;
      u.uTime.value = time;
      u.uMouseNDC.value.set(mouseNDC.x, mouseNDC.y);
      u.uOpacity.value = opacity;
      u.uNoiseAmplitude.value = noiseAmplitude;
    }

    if (linesMaterialRef.current) {
      const u = linesMaterialRef.current.uniforms;
      u.uProgress.value = progress;
      u.uTime.value = time;
      u.uOpacity.value = opacity;
      u.uNoiseAmplitude.value = noiseAmplitude;
    }

    const revealCount = Math.floor(data.lineIndices.length * progress);
    linesGeometry.setDrawRange(0, revealCount - (revealCount % 2));
  });

  return (
    <group frustumCulled={false}>
      <points geometry={pointsGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={pointsMaterialRef}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          transparent
          depthWrite={false}
          uniforms={{
            uProgress: { value: 0 },
            uTime: { value: 0 },
            uSpread: { value: 0.7 },
            uPointSize: { value: 1.5 },
            uMouseNDC: { value: new THREE.Vector2(0, 0) },
            uNoiseAmplitude: { value: noiseAmplitude },
            uColorInk: { value: INK_COLOR },
            uColorAccent: { value: ACCENT_COLOR },
            uOpacity: { value: 1 },
          }}
        />
      </points>
      <lineSegments geometry={linesGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={linesMaterialRef}
          vertexShader={linesVertexShader}
          fragmentShader={linesFragmentShader}
          transparent
          depthWrite={false}
          uniforms={{
            uProgress: { value: 0 },
            uTime: { value: 0 },
            uNoiseAmplitude: { value: noiseAmplitude },
            uColorInk: { value: INK_COLOR },
            uOpacity: { value: 1 },
          }}
        />
      </lineSegments>
    </group>
  );
}
