"use client";

import { cn } from "@/lib/utils/cn";
import type { StartupDriveFormData } from "@/lib/startup-drive/types";
import type { FieldErrors } from "@/lib/startup-drive/validation";
import { TextField, SectionCard, ERROR_CLASS } from "./ui";

interface Props {
  data: StartupDriveFormData;
  errors: FieldErrors;
  update: <K extends keyof StartupDriveFormData>(key: K, value: StartupDriveFormData[K]) => void;
}

export function Step5Declaration({ data, errors, update }: Props) {
  return (
    <SectionCard>
      <div className="space-y-6">
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-canvas-subtle)] p-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-ink)]">
            Important Declaration &amp; Sign-Off
          </h3>
          <p className="mt-2.5 font-sans text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Please note: candidates are selected based on their commitment, determination, core knowledge,
            enthusiasm, and entrepreneurial spirit.
          </p>
          <p className="mt-2.5 font-sans text-sm leading-relaxed text-[var(--color-ink-soft)]">
            By submitting this form, I declare my willingness to participate in the Override-R Startup
            Drive and confirm that all information provided above is accurate to the best of my knowledge.
          </p>
        </div>

        <div>
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
              errors.agreeDeclaration
                ? "border-[var(--color-alarm)]/60"
                : "border-[var(--color-line)] hover:border-[var(--color-accent)]/50"
            )}
          >
            <input
              type="checkbox"
              checked={data.agreeDeclaration}
              onChange={(e) => update("agreeDeclaration", e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
              aria-invalid={Boolean(errors.agreeDeclaration)}
            />
            <span className="font-sans text-sm font-medium text-[var(--color-ink)]">
              I agree to the declaration above.
            </span>
          </label>
          {errors.agreeDeclaration && <p className={ERROR_CLASS}>{errors.agreeDeclaration}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Applicant Name"
            name="applicantName"
            value={data.applicantName}
            onChange={(v) => update("applicantName", v)}
            required
            error={errors.applicantName}
            hint="Typed name serves as your digital signature."
          />
          <TextField
            label="Date"
            name="signatureDate"
            type="date"
            value={data.signatureDate}
            onChange={(v) => update("signatureDate", v)}
            required
            error={errors.signatureDate}
          />
        </div>
      </div>
    </SectionCard>
  );
}
