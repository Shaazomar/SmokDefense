"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraProxy } from "@/lib/stages/proxies";
import { sceneStore } from "@/lib/store/sceneStore";

export function CameraRig() {
  const { camera } = useThree();
  const lookTarget = useRef(
    new THREE.Vector3(cameraProxy.tgtX, cameraProxy.tgtY, cameraProxy.tgtZ),
  );

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraProxy.posX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraProxy.posY, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraProxy.posZ, 4, delta);

    lookTarget.current.x = THREE.MathUtils.damp(lookTarget.current.x, cameraProxy.tgtX, 4, delta);
    lookTarget.current.y = THREE.MathUtils.damp(lookTarget.current.y, cameraProxy.tgtY, 4, delta);
    lookTarget.current.z = THREE.MathUtils.damp(lookTarget.current.z, cameraProxy.tgtZ, 4, delta);

    const { mouseNDC } = sceneStore.getState();
    const parallaxX = mouseNDC.x * 0.4;
    const parallaxY = mouseNDC.y * 0.2;

    camera.lookAt(
      lookTarget.current.x + parallaxX,
      lookTarget.current.y + parallaxY,
      lookTarget.current.z,
    );
  });

  return null;
}
