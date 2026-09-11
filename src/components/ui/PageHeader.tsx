import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  href?: string;
  label: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  meta?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, lead, crumbs = [], actions, meta }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-canvas px-6 pb-12 pt-28 md:px-12 md:pt-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <nav className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3" />
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-ink">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-accent">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              {"// "}{eyebrow}
            </span>
            <h1 className="mt-3 text-balance font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold uppercase leading-[0.94] tracking-tight text-ink">
              {title}
            </h1>
            {lead ? (
              <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft md:text-base">
                {lead}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
            {meta}
            {actions ? <div className="flex flex-wrap gap-3 lg:justify-end">{actions}</div> : null}
          </div>
        </div>
      </div>
    </header>
  );
}
