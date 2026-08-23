"use client";

import React, { useState } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

export function FinalCTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    buildingType: "",
    projectStage: "NEW BUILD",
    projectLocation: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-canvas px-6 py-28 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">21 / ENGINEERING CONSULTATION</span>
            <DemoTag label="DIRECT TECHNICAL INQUIRY" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            LET'S ENGINEER<br />
            <span className="text-accent font-display">THE RIGHT SYSTEM.</span>
          </h2>

          <p className="max-w-3xl font-sans text-sm text-ink-soft leading-relaxed md:text-base">
            Connect directly with SmokeDefence systems engineers to review building geometry, life-safety requirements, smoke control matrices, or integration specs.
          </p>
        </div>

        {/* Engineering Inquiry Form */}
        <div className="mt-10 border border-line bg-white p-8 md:p-12">
          {submitted ? (
            <div className="p-8 text-center font-mono text-xs space-y-3">
              <span className="font-bold text-emerald-600 text-lg block">INQUIRY TRANSMITTED SUCCESSFULLY ✓</span>
              <p className="text-ink-soft font-sans text-sm max-w-md mx-auto">
                Thank you. A SmokeDefence systems engineer will review your project parameters and respond within 1 business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-full border border-line bg-canvas px-6 py-2 uppercase font-bold text-ink hover:border-ink"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">COMPANY *</label>
                  <input
                    type="text"
                    required
                    placeholder="Company / Organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">PHONE</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">COUNTRY *</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">BUILDING TYPE *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. High-Rise Commercial"
                    value={formData.buildingType}
                    onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">PROJECT STAGE *</label>
                  <select
                    value={formData.projectStage}
                    onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  >
                    <option value="NEW BUILD">NEW BUILD</option>
                    <option value="RETROFIT">RETROFIT</option>
                    <option value="UPGRADE">UPGRADE</option>
                    <option value="MONITORING">MONITORING</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink-soft uppercase font-bold mb-2">PROJECT LOCATION</label>
                  <input
                    type="text"
                    placeholder="City / Region"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ink-soft uppercase font-bold mb-2">MESSAGE / SYSTEM REQUIREMENTS</label>
                <textarea
                  rows={4}
                  placeholder="Describe your building geometry, smoke control requirements, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-line bg-canvas p-3 font-sans text-sm text-ink focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="rounded-full bg-ink px-10 py-4 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-accent hover:shadow-lg"
                >
                  Talk to SmokeDefence →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
