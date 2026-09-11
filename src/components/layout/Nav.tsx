"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { NAV_LINKS, SITE, CONTACT } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const { scrolled } = useScrollProgress();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-white/92 backdrop-blur-md"
          : "border-b border-transparent bg-canvas/60 backdrop-blur-xs",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink"
        >
          <span>
            {SITE.wordmark.lead}
            <span className="text-accent">{SITE.wordmark.accent}</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-wider lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 transition-colors",
                isActive(pathname, link.href)
                  ? "font-bold text-ink"
                  : "text-ink-soft hover:text-ink",
              )}
            >
              {link.label}
              {isActive(pathname, link.href) && (
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CallForDemo source="Header" size="sm" className="hidden sm:inline-flex" />
          {/* Narrow viewports keep the CTA, with a label that fits beside the wordmark. */}
          <CallForDemo source="Header" label="Demo" size="sm" className="sm:hidden" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <nav className="flex flex-col px-6 py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-line/70 py-4 font-mono text-sm uppercase tracking-wider transition-colors",
                    isActive(pathname, link.href) ? "font-bold text-accent" : "text-ink hover:text-accent",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 py-5">
                <CallForDemo source="Mobile Menu" className="w-full" />
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft"
                >
                  <Phone className="h-3 w-3 text-accent" /> {CONTACT.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
