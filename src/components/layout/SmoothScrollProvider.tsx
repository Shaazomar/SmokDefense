"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneStore } from "@/lib/store/sceneStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: !reducedMotion,
      syncTouch: !reducedMotion,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Lenis measures scroll height on mount, but the hero's WebGL scene (and
    // the ScrollTrigger pin/spacer it creates) loads asynchronously via
    // next/dynamic, well after that. ResizeObserver on documentElement
    // doesn't catch overflow-driven scrollHeight changes, so without this
    // Lenis is permanently stuck thinking the page has nothing to scroll.
    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    ScrollTrigger.refresh();

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let lastY = window.scrollY;
    const handleLenisScroll = ({ scroll }: { scroll: number }) => {
      const direction = scroll > lastY ? "down" : "up";
      lastY = scroll;
      const scrolled = scroll > 80;
      sceneStore.setState((state) =>
        state.scrollDirection === direction && state.scrolled === scrolled
          ? state
          : { scrollDirection: direction, scrolled },
      );
    };
    lenis.on("scroll", handleLenisScroll);

    const handlePointerMove = (event: PointerEvent) => {
      sceneStore.setState({
        mouseNDC: {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        },
      });
    };
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
