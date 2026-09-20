import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { CONTACT, FOOTER_COLUMNS, SITE, SOCIALS } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 pb-12 pt-14 sm:px-6 md:px-10 lg:px-16 text-slate-800">
      <div className="mx-auto max-w-[1500px]">
        {/* Top Banner Row */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
            <div>
              <p className="font-display text-base font-bold uppercase leading-tight tracking-tight text-slate-900 md:text-lg">
                See the systems running before you specify them.
              </p>
              <p className="mt-1 font-sans text-xs text-slate-500">
                Turnkey engineering support from initial airflow calculations to life-safety handover.
              </p>
            </div>
          </div>
          <CallForDemo source="Footer" label="Call for Demo" size="sm" className="shrink-0 w-full sm:w-auto justify-center" />
        </div>

        {/* Main Footer Links & Address Grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 border-b border-slate-200 pb-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand & Contact Info Column */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
              <Image
                src="/logo.png"
                alt={SITE.name}
                width={2172}
                height={724}
                className="h-7 sm:h-8 w-auto max-w-[160px] object-contain"
              />
            </Link>
            <p className="mt-3.5 max-w-sm font-sans text-xs leading-relaxed text-slate-600">
              {SITE.description}
            </p>

            {/* Contact Details Block */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3 font-mono text-[11px] text-slate-700">
              <span className="block font-bold uppercase tracking-wider text-blue-600">
                {CONTACT.headOfficeLabel}
              </span>

              {/* Clickable Phone Number */}
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 font-semibold text-slate-900 transition-colors hover:text-blue-600 active:text-blue-700"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
                  <Phone className="h-3 w-3" />
                </div>
                <span>{CONTACT.phone}</span>
              </a>

              {/* Email */}
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 transition-colors hover:text-blue-600"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
                  <Mail className="h-3 w-3" />
                </div>
                <span>{CONTACT.email}</span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
                  <MapPin className="h-3 w-3" />
                </div>
                <address className="not-italic leading-relaxed text-slate-600">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="col-span-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900">
                {column.title}
              </span>
              <ul className="mt-3.5 space-y-2.5 font-mono text-[11px] text-slate-600">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href as any}
                      className="transition-colors hover:text-blue-600 active:text-blue-700 inline-block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Intelligent ventilation, smoke control and life-safety systems.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>{CONTACT.hours}</span>
            <span className="hidden h-3 w-px bg-slate-300 md:block" />
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-blue-600"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
