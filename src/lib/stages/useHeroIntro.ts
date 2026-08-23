"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { uniformProxy } from "./proxies";
import { INTRO_TIMING } from "./introTiming";

/** Autoplay point -> network -> building construction on mount, ahead of any scroll. */
export function useHeroIntro(reducedMotion: boolean) {
  useGSAP(() => {
    if (reducedMotion) {
      uniformProxy.particleProgress = 1;
      return;
    }

    uniformProxy.particleProgress = 0;
    const tween = gsap.to(uniformProxy, {
      particleProgress: 1,
      duration: INTRO_TIMING.constructionDuration,
      delay: INTRO_TIMING.startDelay,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);
}
