import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { CONTACT } from "@/lib/data/site";
import { SERVICES } from "@/lib/data/services";
import { SYSTEMS } from "@/lib/data/systems";

export const metadata: Metadata = {
  title: "Contact — Override-R Building Automation & Life Safety",
  description:
    "Talk to the Override-R engineering team about ventilation, pressurization, fire & smoke control and building automation projects.",
};

export default function ContactPage() {
  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="Contact"
        title="Talk to our team."
        lead="Design reviews, device schedules, integration scope or an existing system that needs attention — reach the engineering team directly."
        crumbs={[{ label: "Contact" }]}
        actions={<CallForDemo source="Contact Page" label="Call for Demo" />}
      />

      <section className="px-4 py-12 sm:px-6 md:px-12 lg:px-20 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Direct Contact Card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
              <div className="border-b border-line bg-canvas/60 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                Direct Engineering Contact
              </div>
              <ul className="divide-y divide-line">
                {/* Phone */}
                <li className="flex items-start gap-4 px-6 py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                      Phone Number (Click to Call)
                    </span>
                    <a
                      href={CONTACT.phoneHref}
                      className="mt-1 block font-mono text-base font-bold text-accent transition-colors hover:underline"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-4 px-6 py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                      General & Technical Enquiries
                    </span>
                    <a
                      href={CONTACT.emailHref}
                      className="mt-1 block font-sans text-sm font-medium text-ink transition-colors hover:text-accent"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </li>

                {/* Office Address */}
                <li className="flex items-start gap-4 px-6 py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                      {CONTACT.headOfficeLabel}
                    </span>
                    <address className="mt-1 font-sans text-sm not-italic leading-relaxed text-ink">
                      {CONTACT.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                {/* Operational Hours */}
                <li className="flex items-start gap-4 px-6 py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                      Engineering Support Hours
                    </span>
                    <p className="mt-1 font-sans text-sm text-ink">{CONTACT.hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Demonstration Booking Panel */}
          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-slate-900 p-6 text-white shadow-md sm:p-8 md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 border border-blue-400/40 bg-blue-950/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Book a System Demonstration
                </div>

                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold uppercase leading-tight tracking-tight text-white">
                  Experience Live Control Architecture.
                </h2>

                <p className="mt-3.5 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                  The fastest way to assess whether these systems suit your project is to see them
                  running. Tell us your facility profile and engineering requirement, and our team will set up a live demonstration.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-slate-800 pt-6">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">
                      Covered Systems
                    </span>
                    <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-slate-300">
                      {SYSTEMS.map((system) => (
                        <li key={system.slug} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-blue-400" />
                          <span>{system.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">
                      Turnkey Services
                    </span>
                    <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-slate-300">
                      {SERVICES.map((service) => (
                        <li key={service.slug} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-blue-400" />
                          <span>{service.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
                <CallForDemo
                  source="Contact Page Panel"
                  label="Book Live Demo"
                  variant="accent"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                />
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-400" />
                  <span>Call {CONTACT.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA source="Contact Page" secondary={{ href: "/services", label: "Our Services" }} />
    </main>
  );
}
