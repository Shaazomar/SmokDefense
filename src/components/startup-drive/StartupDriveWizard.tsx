"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { EMPTY_STARTUP_DRIVE_FORM } from "@/lib/startup-drive/constants";
import { STEP_KEYS, type StartupDriveFormData, type StepKey } from "@/lib/startup-drive/types";
import { validateStep, type FieldErrors } from "@/lib/startup-drive/validation";
import { ProgressSteps } from "./ProgressSteps";
import { Step1Personal } from "./Step1Personal";
import { Step2Product } from "./Step2Product";
import { Step3Founder } from "./Step3Founder";
import { Step4Support } from "./Step4Support";
import { Step5Declaration } from "./Step5Declaration";
import { SuccessScreen } from "./SuccessScreen";

const STEP_TITLES: Record<StepKey, { title: string; subtitle: string }> = {
  personal: {
    title: "Personal & Academic Details",
    subtitle: "Tell us who you are and where you're studying or working.",
  },
  product: {
    title: "Product Concept & Team Status",
    subtitle: "Share the state of your idea, your team, and what you'll need to build it.",
  },
  founder: {
    title: "Training & Founder Mindset",
    subtitle: "Help us understand your motivation and readiness to lead this startup.",
  },
  support: {
    title: "Support Required",
    subtitle: "Select the domains where you'd like Override-R's support.",
  },
  declaration: {
    title: "Declaration & Sign-Off",
    subtitle: "Review and confirm your application before submitting.",
  },
};

export function StartupDriveWizard() {
  const [data, setData] = useState<StartupDriveFormData>(EMPTY_STARTUP_DRIVE_FORM);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const currentStep = STEP_KEYS[stepIndex];
  const isLastStep = stepIndex === STEP_KEYS.length - 1;

  function update<K extends keyof StartupDriveFormData>(key: K, value: StartupDriveFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function goNext() {
    const stepErrors = validateStep(currentStep, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (!isLastStep) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const stepErrors = validateStep(currentStep, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/startup-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (body?.fieldErrors) setErrors(body.fieldErrors);
        setSubmitError(body?.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
      setIsSubmitting(false);
    }
  }

  if (submitted) return <SuccessScreen />;

  const { title, subtitle } = STEP_TITLES[currentStep];

  return (
    <div>
      <div className="mb-8 sm:mb-10">
        <ProgressSteps current={currentStep} />
      </div>

      <div className="mb-6">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
          Step {String(stepIndex + 1).padStart(2, "0")} of {String(STEP_KEYS.length).padStart(2, "0")}
        </span>
        <h2 className="mt-1.5 font-display text-xl font-bold text-[var(--color-ink)] sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1.5 font-sans text-sm text-[var(--color-ink-soft)]">{subtitle}</p>
      </div>

      {currentStep === "personal" && <Step1Personal data={data} errors={errors} update={update} />}
      {currentStep === "product" && <Step2Product data={data} errors={errors} update={update} />}
      {currentStep === "founder" && <Step3Founder data={data} errors={errors} update={update} />}
      {currentStep === "support" && <Step4Support data={data} errors={errors} update={update} />}
      {currentStep === "declaration" && (
        <Step5Declaration data={data} errors={errors} update={update} />
      )}

      {submitError && (
        <div
          role="alert"
          className="mt-5 rounded-md border border-[var(--color-alarm)]/40 bg-[var(--color-alarm-soft)] px-4 py-3 font-sans text-sm font-medium text-[var(--color-alarm)]"
        >
          {submitError}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0 || isSubmitting}
          className="inline-flex min-h-[46px] items-center gap-2 rounded-md border border-[var(--color-line)] bg-white px-4 py-2.5 font-sans text-sm font-semibold text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting…" : "Submit Application"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
