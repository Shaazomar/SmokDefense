"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { CONTACT } from "@/lib/data/site";

interface ClosingCTAProps {
  source?: string;
  title?: string;
  lead?: string;
  secondary?: { href: string; label: string };
}

export function ClosingCTA({
  source = "Homepage Final CTA",
  title = "Speak With Our Engineering Team.",
  lead = "Whether you are designing a new facility, upgrading existing smoke control panels, or specifying life-safety damper systems, our engineers are ready to assist with technical drawings and submittals.",
  secondary = { href: "/systems", label: "EXPLORE OUR SYSTEMS" },
}: ClosingCTAProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:px-10 lg:px-16 border-b border-slate-200">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 sm:p-8 md:p-12 lg:p-14 text-white shadow-md">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              Get Started
            </span>

            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold tracking-tight text-white leading-[1.1]">
              {title}
            </h2>

            <p className="mt-4 font-sans text-xs sm:text-sm md:text-base leading-relaxed text-slate-300">
              {lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
              >
                <span>Contact Engineers</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <CallForDemo source={source} label="Call for Demo" size="md" />

              {secondary ? (
                <Link
                  href={secondary.href as any}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  <span>{secondary.label}</span>
                </Link>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 border-t border-slate-800 pt-6 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a href={CONTACT.phoneHref} className="text-white hover:text-blue-400 font-mono font-semibold">
                  {CONTACT.phone}
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a href={CONTACT.emailHref} className="text-white hover:text-blue-400 font-mono">
                  {CONTACT.email}
                </a>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span>{CONTACT.headOfficeLabel}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
