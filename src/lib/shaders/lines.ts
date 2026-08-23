import { curlNoiseChunk } from "./chunks/curlNoise";
import { positionBlendChunk } from "./chunks/positionBlend";

export const linesVertexShader = /* glsl */ `
  ${curlNoiseChunk}
  ${positionBlendChunk}

  uniform float uProgress;
  uniform float uTime;
  uniform float uNoiseAmplitude;

  attribute vec3 aStartPosition;
  attribute vec3 aNetworkPosition;
  attribute vec3 aTargetPosition;
  attribute vec3 aSeed;

  varying float vLocal;

  void main() {
    float local = uProgress;
    vec3 pos = blendPosition(aStartPosition, aNetworkPosition, aTargetPosition, local);

    float driftEnvelope = sin(local * 3.14159265);
    vec3 curl = curlNoise(aSeed * 2.0 + pos * 0.15, uTime * 0.15 + aSeed.x * 10.0);
    pos += curl * driftEnvelope * uNoiseAmplitude * 0.5;

    vLocal = local;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const linesFragmentShader = /* glsl */ `
  uniform vec3 uColorInk;
  uniform float uOpacity;

  varying float vLocal;

  void main() {
    gl_FragColor = vec4(uColorInk, uOpacity * mix(0.12, 0.55, vLocal));
  }
`;
