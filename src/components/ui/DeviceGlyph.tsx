import React from "react";
import type { GlyphKind } from "@/lib/data/shop";
import { cn } from "@/lib/utils/cn";

/**
 * Line-art device illustrations. Schematic rather than photographic, so the
 * catalogue stays honest about hardware we have not photographed yet while
 * matching the technical drawing language used across the site.
 */
const PATHS: Record<GlyphKind, React.ReactNode> = {
  sensor: (
    <>
      <rect x="18" y="14" width="28" height="36" rx="2" />
      <path d="M24 24h16M24 31h16M24 38h10" />
      <circle cx="52" cy="20" r="3" className="fill-accent stroke-none" />
      <path d="M32 50v6M24 56h16" />
    </>
  ),
  actuator: (
    <>
      <rect x="12" y="22" width="26" height="20" rx="2" />
      <path d="M38 32h10" />
      <circle cx="52" cy="32" r="6" />
      <path d="M52 26v12" />
      <path d="M18 42v8M32 42v8" />
      <circle cx="18" cy="28" r="2" className="fill-accent stroke-none" />
    </>
  ),
  damper: (
    <>
      <rect x="12" y="12" width="40" height="40" rx="2" />
      <path d="M16 20l32 8M16 30l32 8M16 40l32 8" />
      <circle cx="32" cy="32" r="2.5" className="fill-accent stroke-none" />
    </>
  ),
  controller: (
    <>
      <rect x="12" y="16" width="40" height="32" rx="2" />
      <path d="M12 26h40" />
      <path d="M20 34h6M30 34h6M40 34h4" />
      <circle cx="18" cy="21" r="2" className="fill-accent stroke-none" />
      <path d="M20 48v6M44 48v6" />
    </>
  ),
  gateway: (
    <>
      <rect x="12" y="34" width="40" height="16" rx="2" />
      <path d="M20 42h4M28 42h4M36 42h8" />
      <path d="M32 34V22" />
      <path d="M24 18a11 11 0 0116 0" />
      <path d="M28 24a5.5 5.5 0 018 0" />
      <circle cx="32" cy="30" r="2" className="fill-accent stroke-none" />
    </>
  ),
  window: (
    <>
      <rect x="14" y="12" width="36" height="40" rx="2" />
      <path d="M14 32h36" />
      <path d="M50 20l8 6-8 6" />
      <path d="M22 44h20" />
      <circle cx="20" cy="18" r="2" className="fill-accent stroke-none" />
    </>
  ),
  fan: (
    <>
      <circle cx="32" cy="32" r="20" />
      <path d="M32 32c0-8 3-13 9-13s6 8-1 11-8 2-8 2z" />
      <path d="M32 32c-7 4-12 3-15-2s3-9 8-4 7 6 7 6z" />
      <path d="M32 32c7 4 9 9 6 13s-10-1-8-8 2-5 2-5z" />
      <circle cx="32" cy="32" r="3" className="fill-accent stroke-none" />
    </>
  ),
};

interface DeviceGlyphProps {
  kind: GlyphKind;
  className?: string;
}

export function DeviceGlyph({ kind, className }: DeviceGlyphProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-16 w-16 stroke-ink", className)}
      fill="none"
      strokeWidth={1.4}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {PATHS[kind]}
    </svg>
  );
}
