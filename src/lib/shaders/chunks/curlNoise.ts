/** Cheap analytic pseudo-curl-noise (divergence-free-ish) for organic drift. */
export const curlNoiseChunk = /* glsl */ `
vec3 curlNoise(vec3 p, float t) {
  float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  vec3 p_x0 = p - dx, p_x1 = p + dx;
  vec3 p_y0 = p - dy, p_y1 = p + dy;
  vec3 p_z0 = p - dz, p_z1 = p + dz;

  float x0 = sin(p_x0.y * 2.1 + t) * cos(p_x0.z * 1.7 - t);
  float x1 = sin(p_x1.y * 2.1 + t) * cos(p_x1.z * 1.7 - t);
  float y0 = sin(p_y0.z * 1.9 - t) * cos(p_y0.x * 2.3 + t);
  float y1 = sin(p_y1.z * 1.9 - t) * cos(p_y1.x * 2.3 + t);
  float z0 = sin(p_z0.x * 2.5 + t) * cos(p_z0.y * 1.5 - t);
  float z1 = sin(p_z1.x * 2.5 + t) * cos(p_z1.y * 1.5 - t);

  float curlX = (y1 - y0 - z1 + z0) / (2.0 * e);
  float curlY = (z1 - z0 - x1 + x0) / (2.0 * e);
  float curlZ = (x1 - x0 - y1 + y0) / (2.0 * e);

  return vec3(curlX, curlY, curlZ);
}
`;
