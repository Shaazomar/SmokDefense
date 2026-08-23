import type { ReactNode } from "react";

interface StubPageProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Minimal on-brand placeholder for routes not yet built out (Step 9 of the build plan). */
export function StubPage({ eyebrow, title, description, children }: StubPageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 pb-24 pt-32">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-xl font-sans text-base text-ink-soft md:text-lg">{description}</p>
      )}
      {children}
    </main>
  );
}
