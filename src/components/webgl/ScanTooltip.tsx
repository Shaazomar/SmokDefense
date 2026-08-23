"use client";

import { useEffect, useRef } from "react";
import { useSceneStore } from "@/lib/store/sceneStore";

interface ScanTooltipProps {
  floors: number;
  deviceCount: number;
}

/** Restrained hover readout that follows the raw cursor position while ScanHUD reports a raycast hit. */
export function ScanTooltip({ floors, deviceCount }: ScanTooltipProps) {
  const hovered = useSceneStore((state) => state.hovered);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hovered) return;

    const handleMove = (event: PointerEvent) => {
      if (ref.current) {
        ref.current.style.left = `${event.clientX + 18}px`;
        ref.current.style.top = `${event.clientY + 18}px`;
      }
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [hovered]);

  if (!hovered) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-40 whitespace-nowrap rounded-sm border border-ink/10 bg-white/90 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink shadow-sm backdrop-blur-sm"
    >
      <div className="mb-1 text-accent">Scan</div>
      <div>{floors} Floors</div>
      <div>{deviceCount} Devices</div>
      <div>System Online</div>
    </div>
  );
}
