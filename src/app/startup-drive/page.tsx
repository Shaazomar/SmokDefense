import type { Metadata } from "next";
import { StartupDriveWizard } from "@/components/startup-drive/StartupDriveWizard";

export const metadata: Metadata = {
  title: "Startup Drive",
  description:
    "Apply to the Override-R Startup Drive — a co-founder willingness declaration for technology entrepreneurs seeking product development, mentorship and startup support.",
};

export default function StartupDrivePage() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-canvas)]">
      {/* Subtle engineering grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-subtle) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pt-36">
        <div className="mb-10 sm:mb-12">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Override-R Startup Drive
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Startup Co-Founders Willingness Declaration
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            A structured application for technology entrepreneurs seeking to build, co-found, or
            join a product development initiative with Override-R. Complete the five sections
            below — your progress is retained as you move between steps.
          </p>
        </div>

        <StartupDriveWizard />
      </div>
    </div>
  );
}
