"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Phone, Mail } from "lucide-react";
import { CONTACT } from "@/lib/data/site";
import { buttonClass } from "@/components/ui/Button";

const FIELD_CLASS =
  "w-full border border-line bg-canvas p-3 font-sans text-sm text-ink transition-colors placeholder:text-ink-faint focus:border-accent focus:outline-none";
const LABEL_CLASS = "mb-2 block font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft";

const EMPTY_FORM = {
  name: "",
  company: "",
  phone: "",
  email: "",
  requirement: "",
  location: "",
  message: "",
};

const REQUIREMENTS = [
  "Ventilation System",
  "Car Park Ventilation",
  "CO₂ Monitoring & Controls",
  "Pressurization System",
  "Fire & Smoke Dampers",
  "Actuators & Field Devices",
  "Building Automation & Controls",
  "Service / AMC",
];

interface DemoModalProps {
  open: boolean;
  source: string;
  onClose: () => void;
}

export function DemoModal({ open, source, onClose }: DemoModalProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    // Lenis drives window scroll, so locking the root element is enough to
    // freeze the page behind the dialog.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 80);

    return () => {
      document.removeEventListener("keydown", handleKey);
      root.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const update = (key: keyof typeof EMPTY_FORM) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: post to the enquiry endpoint / CRM once the backend is available.
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset only after the exit animation so the panel doesn't flip mid-close.
    window.setTimeout(() => {
      setSubmitted(false);
      setForm(EMPTY_FORM);
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-10 md:p-8" data-lenis-prevent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl border border-line bg-white shadow-xl"
          >
            <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 md:px-10">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                  {"// "}Call for Demo
                </span>
                <h2
                  id="demo-modal-title"
                  className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink md:text-3xl"
                >
                  Request a System Demonstration
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  Enquiry source: {source}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close demo request"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-14 text-center md:px-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-accent/10">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-tight text-ink">
                  Request Received
                </h3>
                <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-ink-soft">
                  Thank you. Our engineering team will contact you to schedule the demonstration and
                  review your project requirement.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href={CONTACT.phoneHref} className={buttonClass("primary")}>
                    <Phone className="h-3.5 w-3.5" /> {CONTACT.phone}
                  </a>
                  <button type="button" onClick={handleClose} className={buttonClass("secondary")}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-8 md:px-10">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASS} htmlFor="demo-name">Name *</label>
                    <input
                      ref={firstFieldRef}
                      id="demo-name"
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Full name"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} htmlFor="demo-company">Company *</label>
                    <input
                      id="demo-company"
                      required
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Company or organisation"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} htmlFor="demo-phone">Phone *</label>
                    <input
                      id="demo-phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="Contact number"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} htmlFor="demo-email">Email *</label>
                    <input
                      id="demo-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="Work email address"
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} htmlFor="demo-requirement">Project / Requirement *</label>
                    <select
                      id="demo-requirement"
                      required
                      value={form.requirement}
                      onChange={update("requirement")}
                      className={FIELD_CLASS}
                    >
                      <option value="">Select a system</option>
                      {REQUIREMENTS.map((requirement) => (
                        <option key={requirement} value={requirement}>
                          {requirement}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL_CLASS} htmlFor="demo-location">Location</label>
                    <input
                      id="demo-location"
                      value={form.location}
                      onChange={update("location")}
                      placeholder="City / project site"
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className={LABEL_CLASS} htmlFor="demo-message">Message</label>
                  <textarea
                    id="demo-message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Building type, number of floors, existing systems, timelines…"
                    className={FIELD_CLASS}
                  />
                </div>

                <div className="mt-7 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
                  <div className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                    <a href={CONTACT.phoneHref} className="flex items-center gap-2 transition-colors hover:text-ink">
                      <Phone className="h-3 w-3 text-accent" /> {CONTACT.phone}
                    </a>
                    <a href={CONTACT.emailHref} className="flex items-center gap-2 transition-colors hover:text-ink">
                      <Mail className="h-3 w-3 text-accent" /> {CONTACT.email}
                    </a>
                  </div>
                  <button type="submit" className={buttonClass("accent")}>
                    Request Demo →
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
