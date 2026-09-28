"use client";

import { cn } from "@/lib/utils/cn";
import type { StartupDriveFormData, SupportDomainAnswer, YesNo } from "@/lib/startup-drive/types";
import type { FieldErrors } from "@/lib/startup-drive/validation";
import { SUPPORT_DOMAINS } from "@/lib/startup-drive/constants";
import { ConditionalReveal, INPUT_CLASS } from "./ui";

interface Props {
  data: StartupDriveFormData;
  errors: FieldErrors;
  update: <K extends keyof StartupDriveFormData>(key: K, value: StartupDriveFormData[K]) => void;
}

export function Step4Support({ data, errors, update }: Props) {
  function setDomain(id: string, patch: Partial<SupportDomainAnswer>) {
    update(
      "supportDomains",
      data.supportDomains.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry))
    );
  }

  return (
    <div>
      <div className="mb-5 rounded-lg border border-[var(--color-line)] bg-[var(--color-canvas-subtle)] px-5 py-4">
        <p className="font-sans text-sm text-[var(--color-ink-soft)]">
          For each support domain below, indicate whether you require it from Override-R. Select{" "}
          <span className="font-semibold text-[var(--color-ink)]">YES</span> to specify your exact
          requirements.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SUPPORT_DOMAINS.map((domain, index) => {
          const answer = data.supportDomains.find((entry) => entry.id === domain.id);
          const error = errors[domain.id];
          return (
            <div
              key={domain.id}
              className={cn(
                "rounded-lg border bg-white p-4",
                error ? "border-[var(--color-alarm)]/50" : "border-[var(--color-line)]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-mono text-[11px] font-bold text-[var(--color-ink-faint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm font-semibold leading-snug text-[var(--color-ink)]">
                    {domain.label}
                  </span>
                </div>
                <div role="radiogroup" aria-label={domain.label} className="flex shrink-0 gap-1.5">
                  {(["yes", "no"] as const).map((option) => {
                    const active = answer?.required === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setDomain(domain.id, { required: option as YesNo })}
                        className={cn(
                          "min-h-[36px] rounded-md border px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                          active
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                            : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        )}
                      >
                        {option === "yes" ? "Yes" : "No"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ConditionalReveal show={answer?.required === "yes"}>
                <textarea
                  value={answer?.details ?? ""}
                  onChange={(e) => setDomain(domain.id, { details: e.target.value })}
                  placeholder="Please specify your requirements"
                  rows={2}
                  className={cn(INPUT_CLASS, "resize-none text-xs")}
                />
              </ConditionalReveal>

              {error && (
                <p className="mt-1.5 font-sans text-xs font-medium text-[var(--color-alarm)]" role="alert">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
