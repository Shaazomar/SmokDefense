"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-canvas px-6 pb-24 pt-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          // TALK TO AN ENGINEER
        </span>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
          DISCUSS YOUR BUILDING LIFE-SAFETY INFRASTRUCTURE.
        </h1>
        <p className="mt-6 font-sans text-base text-ink-soft leading-relaxed max-w-2xl">
          Connect directly with a SmokDefense systems engineer to review building CAD blueprints, UUKL panel integration, IP500 wireless network sizing, or platform demonstration.
        </p>

        {submitted ? (
          <div className="mt-12 rounded border border-emerald-500 bg-emerald-50 p-8 font-mono text-xs text-emerald-900">
            <span className="font-bold text-emerald-700 uppercase">[INQUIRY RECEIVED]</span>
            <p className="mt-2 text-sm">Thank you. A life-safety systems engineer will contact you within 1 business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 border border-line bg-white p-8 space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-ink font-semibold uppercase mb-2">FULL NAME *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Marcus Vance"
                  className="w-full border border-line bg-canvas p-3 text-ink focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-ink font-semibold uppercase mb-2">PROFESSIONAL EMAIL *</label>
                <input
                  required
                  type="email"
                  placeholder="e.g. m.vance@engineering.com"
                  className="w-full border border-line bg-canvas p-3 text-ink focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-ink font-semibold uppercase mb-2">COMPANY / ORGANIZATION *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Apex Engineering Consultants"
                  className="w-full border border-line bg-canvas p-3 text-ink focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-ink font-semibold uppercase mb-2">BUILDING TYPE / APPLICATION</label>
                <select className="w-full border border-line bg-canvas p-3 text-ink focus:border-accent focus:outline-none uppercase">
                  <option>High-Rise Commercial Tower</option>
                  <option>Hospital & Healthcare Facility</option>
                  <option>Hotel & Hospitality Campus</option>
                  <option>Industrial & Logistics Center</option>
                  <option>Underground Transit Hub</option>
                  <option>Other Enterprise Infrastructure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-ink font-semibold uppercase mb-2">PROJECT SCOPE & SYSTEM REQUIREMENTS</label>
              <textarea
                rows={5}
                placeholder="Describe your building specifications, number of floors, existing UUKL panels, or IP500 network requirements..."
                className="w-full border border-line bg-canvas p-3 text-ink focus:border-accent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent"
            >
              Submit Engineering Inquiry →
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
