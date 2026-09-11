import React from "react";
import Link from "next/link";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { buttonClass } from "@/components/ui/Button";

interface ClosingCTAProps {
  source: string;
  title?: string;
  lead?: string;
  secondary?: { href: string; label: string };
}

/** Compact dark CTA band reused at the foot of every primary page. */
export function ClosingCTA({
  source,
  title = "Let's make your building smarter and safer.",
  lead,
  secondary,
}: ClosingCTAProps) {
  return (
    <section className="border-t border-line bg-canvas px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 bg-ink p-10 md:flex-row md:items-center md:p-14">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              {"// "}Next Step
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-bold uppercase leading-[1.02] tracking-tight text-white">
              {title}
            </h2>
            {lead ? (
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">{lead}</p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <CallForDemo source={source} />
            {secondary ? (
              <Link href={secondary.href} className={buttonClass("dark")}>
                {secondary.label} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
