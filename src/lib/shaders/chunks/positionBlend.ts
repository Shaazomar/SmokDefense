/** Shared point -> network -> building position blend, used by both the particle and line shaders. */
export const positionBlendChunk = /* glsl */ `
float remapProgress(float progress, float delay, float spread) {
  return clamp((progress - delay * spread) / max(1.0 - spread, 0.0001), 0.0, 1.0);
}

vec3 blendPosition(vec3 start, vec3 network, vec3 target, float local) {
  float phaseA = smoothstep(0.0, 0.5, local);
  float phaseB = smoothstep(0.5, 1.0, local);
  vec3 toNetwork = mix(start, network, phaseA);
  return mix(toNetwork, target, phaseB);
}
`;
