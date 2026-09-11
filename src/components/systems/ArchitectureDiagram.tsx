import React from "react";
import { ChevronDown } from "lucide-react";
import { ARCHITECTURE_LAYERS } from "@/lib/data/systems";

/** Vertical control chain, drawn as a stack of connected layers. */
export function ArchitectureDiagram() {
  return (
    <div className="mt-10">
      <div className="flex flex-col items-stretch">
        {ARCHITECTURE_LAYERS.map((layer, index) => (
          <React.Fragment key={layer.tier}>
            <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-12">
              <div className="flex items-center gap-4 bg-ink p-5 md:col-span-4">
                <span className="font-mono text-[11px] font-bold text-accent">{layer.tier}</span>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-tight text-white">
                    {layer.title}
                  </h3>
                  <p className="mt-1 font-sans text-[11px] leading-relaxed text-white/60">
                    {layer.detail}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 bg-white p-5 md:col-span-8">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="border border-line bg-canvas px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {index < ARCHITECTURE_LAYERS.length - 1 && (
              <div className="flex flex-col items-center py-2" aria-hidden="true">
                <span className="h-4 w-px bg-line" />
                <ChevronDown className="h-4 w-4 text-accent" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        Control flows downward; status, trends and faults are reported back up the same chain.
      </p>
    </div>
  );
}
