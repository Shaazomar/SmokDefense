import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { CONTACT, FOOTER_COLUMNS, SITE, SOCIALS } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas px-6 pb-10 pt-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Slim CTA row — the page-level CTA above it stays the dominant one. */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-10 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-base font-bold uppercase leading-tight tracking-tight text-ink md:text-lg">
            <span className="text-accent">{"// "}</span>
            See the systems running before you specify them.
          </p>
          <CallForDemo source="Footer" size="sm" className="shrink-0" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-10 border-b border-line pb-12 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-ink">
              {SITE.wordmark.lead}
              <span className="text-accent">{SITE.wordmark.accent}</span>
            </Link>
            <p className="mt-4 max-w-sm font-sans text-xs leading-relaxed text-ink-soft">
              {SITE.description}
            </p>

            <div className="mt-6 space-y-2.5 font-mono text-[11px] text-ink-soft">
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 transition-colors hover:text-ink">
                <Phone className="h-3.5 w-3.5 shrink-0 text-accent" /> {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref} className="flex items-center gap-2 transition-colors hover:text-ink">
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent" /> {CONTACT.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <address className="not-italic leading-relaxed">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                {column.title}
              </span>
              <ul className="mt-4 space-y-2.5 font-mono text-[11px] text-ink-soft">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 font-mono text-[10px] uppercase tracking-wider text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Intelligent building systems, ventilation and life-safety controls.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span>{CONTACT.hours}</span>
            <span className="hidden h-3 w-px bg-line md:block" />
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
