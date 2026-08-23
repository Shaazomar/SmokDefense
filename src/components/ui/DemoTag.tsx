import React from "react";

interface DemoTagProps {
  label?: string;
  className?: string;
}

export function DemoTag({ label = "ILLUSTRATIVE / DEMO DATA", className = "" }: DemoTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border border-line bg-canvas/80 px-2 py-0.5 font-mono text-[10px] font-medium tracking-widest text-ink-faint uppercase backdrop-blur-xs ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      {label}
    </span>
  );
}
