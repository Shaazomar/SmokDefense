import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
  aside?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "md",
  className,
  aside,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-line pb-8",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between", align === "center" && "md:flex-col md:items-center")}>
        <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
            {eyebrow}
          </span>
          <h2
            className={cn(
              "font-display font-bold uppercase tracking-tight text-balance text-ink",
              size === "lg"
                ? "text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.94]"
                : "text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.02]",
            )}
          >
            {title}
          </h2>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {lead ? (
        <p
          className={cn(
            "max-w-3xl font-sans text-sm leading-relaxed text-ink-soft md:text-base",
            align === "center" && "text-balance",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
