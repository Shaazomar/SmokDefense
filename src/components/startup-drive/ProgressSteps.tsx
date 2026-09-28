"use client";

import { cn } from "@/lib/utils/cn";
import { STEP_KEYS, type StepKey } from "@/lib/startup-drive/types";

const STEP_LABELS: Record<StepKey, string> = {
  personal: "Personal",
  product: "Product",
  founder: "Founder",
  support: "Support",
  declaration: "Submit",
};

export function ProgressSteps({ current }: { current: StepKey }) {
  const currentIndex = STEP_KEYS.indexOf(current);

  return (
    <nav aria-label="Application progress" className="w-full">
      <ol className="flex items-center gap-1.5 sm:gap-2.5">
        {STEP_KEYS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <li key={step} className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
              <div className="flex flex-1 flex-col items-center gap-1.5 sm:flex-row sm:justify-start">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors sm:h-8 sm:w-8",
                    isCurrent
                      ? "bg-[var(--color-accent)] text-white"
                      : isDone
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "bg-[var(--color-canvas-muted)] text-[var(--color-ink-faint)]"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "hidden font-sans text-xs font-semibold uppercase tracking-wide sm:inline",
                    isCurrent
                      ? "text-[var(--color-ink)]"
                      : isDone
                        ? "text-[var(--color-ink-soft)]"
                        : "text-[var(--color-ink-faint)]"
                  )}
                >
                  {STEP_LABELS[step]}
                </span>
              </div>
              {index < STEP_KEYS.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1",
                    isDone ? "bg-[var(--color-accent)]/40" : "bg-[var(--color-line)]"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
