"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STAGES } from "./stageConfig";
import { cameraProxy, uniformProxy } from "./proxies";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives cameraProxy/uniformProxy from a single pinned ScrollTrigger timeline
 * built off STAGES. Adding stages 3-10 later means appending entries to
 * STAGES, not touching this orchestrator.
 */
export function useStageOrchestrator(pinRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!pinRef.current) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
        },
      });

      for (const stage of STAGES) {
        const ease = stage.ease ?? "none";
        timeline.to(
          cameraProxy,
          {
            posX: stage.camera.position[0],
            posY: stage.camera.position[1],
            posZ: stage.camera.position[2],
            tgtX: stage.camera.target[0],
            tgtY: stage.camera.target[1],
            tgtZ: stage.camera.target[2],
            ease,
          },
          stage.scrollStart,
        );

        if (stage.uniforms) {
          timeline.to(uniformProxy, { ...stage.uniforms, ease }, stage.scrollStart);
        }
      }
    },
    { scope: pinRef, dependencies: [pinRef] },
  );

  return undefined;
}
