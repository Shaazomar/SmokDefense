import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { CONTACT } from "@/lib/data/site";
import { SERVICES } from "@/lib/data/services";
import { SYSTEMS } from "@/lib/data/systems";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the SmokDefense engineering team about ventilation, pressurization, fire & smoke control and building automation projects.",
};

export default function ContactPage() {
  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="Contact"
        title="Talk to our team."
        lead="Design reviews, device schedules, integration scope or an existing system that needs attention — reach the engineering team directly."
        crumbs={[{ label: "Contact" }]}
        actions={<CallForDemo source="Contact Page" />}
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="border border-line bg-white">
              <div className="border-b border-line px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                Direct Contact
              </div>
              <ul className="divide-y divide-line">
                <li className="flex items-start gap-4 px-6 py-5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      Phone
                    </span>
                    <a
                      href={CONTACT.phoneHref}
                      className="mt-1 block font-sans text-sm text-ink transition-colors hover:text-accent"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 px-6 py-5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      Email
                    </span>
                    <a
                      href={CONTACT.emailHref}
                      className="mt-1 block font-sans text-sm text-ink transition-colors hover:text-accent"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 px-6 py-5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      Address
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
                <li className="flex items-start gap-4 px-6 py-5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      Hours
                    </span>
                    <p className="mt-1 font-sans text-sm text-ink">{CONTACT.hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between gap-8 border border-line bg-ink p-8 md:p-10">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                  {"// "}Call for Demo
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white md:text-3xl">
                  Book a system demonstration.
                </h2>
                <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/70">
                  The fastest way to assess whether these systems suit your project is to see them
                  running. Tell us the building type and the requirement, and we will set up a
                  demonstration against a comparable configuration.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                      Systems
                    </span>
                    <ul className="mt-3 space-y-1.5">
                      {SYSTEMS.map((system) => (
                        <li
                          key={system.slug}
                          className="font-mono text-[10px] uppercase tracking-wider text-white/50"
                        >
                          {system.short}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                      Services
                    </span>
                    <ul className="mt-3 space-y-1.5">
                      {SERVICES.map((service) => (
                        <li
                          key={service.slug}
                          className="font-mono text-[10px] uppercase tracking-wider text-white/50"
                        >
                          {service.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                <CallForDemo source="Contact Page Panel" variant="accent" />
                <a href={CONTACT.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-ink">
                  <Phone className="h-3.5 w-3.5" /> {CONTACT.phone}
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
