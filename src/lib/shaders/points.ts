import { curlNoiseChunk } from "./chunks/curlNoise";
import { positionBlendChunk } from "./chunks/positionBlend";

export const pointsVertexShader = /* glsl */ `
  ${curlNoiseChunk}
  ${positionBlendChunk}

  uniform float uProgress;
  uniform float uTime;
  uniform float uSpread;
  uniform float uPointSize;
  uniform vec2 uMouseNDC;
  uniform float uNoiseAmplitude;

  attribute vec3 aStartPosition;
  attribute vec3 aNetworkPosition;
  attribute vec3 aTargetPosition;
  attribute vec3 aSeed;
  attribute float aDelay;

  varying float vLocal;

  void main() {
    float local = remapProgress(uProgress, aDelay, uSpread);
    vec3 pos = blendPosition(aStartPosition, aNetworkPosition, aTargetPosition, local);

    float driftEnvelope = sin(local * 3.14159265);
    vec3 curl = curlNoise(aSeed * 2.0 + pos * 0.15, uTime * 0.15 + aSeed.x * 10.0);
    pos += curl * driftEnvelope * uNoiseAmplitude;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec4 clipPosition = projectionMatrix * mvPosition;
    vec2 screenNDC = clipPosition.xy / max(clipPosition.w, 0.0001);
    vec2 toMouse = screenNDC - uMouseNDC;
    float mouseDist = length(toMouse);
    float mouseInfluence = smoothstep(0.35, 0.0, mouseDist) * local;
    vec2 repel = mouseDist > 0.0001 ? normalize(toMouse) : vec2(0.0);
    mvPosition.xy += repel * mouseInfluence * 0.12;

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uPointSize * (1.0 / max(-mvPosition.z, 0.001)) * 60.0;

    vLocal = local;
  }
`;

export const pointsFragmentShader = /* glsl */ `
  uniform vec3 uColorInk;
  uniform vec3 uColorAccent;
  uniform float uOpacity;

  varying float vLocal;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    float alpha = smoothstep(0.5, 0.1, dist);
    if (alpha < 0.02) discard;

    vec3 color = mix(uColorInk, uColorAccent, smoothstep(0.6, 1.0, vLocal) * 0.4);
    gl_FragColor = vec4(color, alpha * mix(0.3, 0.8, vLocal) * uOpacity);
  }
`;
