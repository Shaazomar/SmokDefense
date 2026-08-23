/**
 * Initial "establishing shot": a distant, angled 3/4 view so the tower
 * reads as a 3D volume (front/side/back edges visually separate) rather
 * than a flat, axis-aligned silhouette. Matches Scene.tsx's Canvas camera
 * prop so there's no jump on first paint, before any stage tween runs.
 */
export const cameraProxy = {
  posX: 16,
  posY: 10,
  posZ: 30,
  tgtX: 0,
  tgtY: 8,
  tgtZ: 0,
};

export const uniformProxy = {
  particleProgress: 0,
  buildingOpacity: 1,
};
