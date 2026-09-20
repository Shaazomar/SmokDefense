"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled || menuOpen
          ? "border-b border-slate-200/90 bg-white/98 shadow-xs backdrop-blur-md"
          : "border-b border-slate-200/60 bg-white/90 backdrop-blur-xs",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 md:px-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={2172}
            height={724}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 transition-colors duration-150 hover:text-blue-600",
                isActive(pathname, link.href)
                  ? "font-semibold text-blue-600"
                  : "text-slate-600",
              )}
            >
              {link.label}
              {isActive(pathname, link.href) && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-600" />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/80 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 sm:inline-flex"
          >
            <Phone className="h-3 w-3 text-blue-600" />
            <span className="hidden xl:inline">{CONTACT.phone}</span>
            <span className="xl:hidden">Call</span>
          </a>

          <Link
            href="/contact"
            className="hidden rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 transition-colors hover:text-blue-600 sm:inline-flex"
          >
            Contact
          </Link>

          <CallForDemo source="Header" label="Request Demo" size="sm" />

          {/* Hamburger Toggle Button (min 44x44 tap target) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 active:scale-95 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-[61px] z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 max-h-[calc(100vh-65px)] overflow-y-auto border-t border-slate-200 bg-white shadow-2xl lg:hidden"
            >
              <nav className="flex flex-col px-5 py-5">
                <span className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Navigation
                </span>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex min-h-[46px] items-center justify-between border-b border-slate-100 py-3 text-base font-medium transition-colors",
                      isActive(pathname, link.href)
                        ? "font-bold text-blue-600"
                        : "text-slate-800 active:text-blue-600",
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4",
                        isActive(pathname, link.href) ? "text-blue-600" : "text-slate-300",
                      )}
                    />
                  </Link>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex min-h-[46px] items-center justify-between border-b border-slate-100 py-3 text-base font-medium transition-colors",
                    pathname === "/contact"
                      ? "font-bold text-blue-600"
                      : "text-slate-800 active:text-blue-600",
                  )}
                >
                  <span>Contact</span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4",
                      pathname === "/contact" ? "text-blue-600" : "text-slate-300",
                    )}
                  />
                </Link>

                {/* Mobile CTAs & Tap-to-Call */}
                <div className="mt-5 flex flex-col gap-3 pt-2">
                  <CallForDemo
                    source="Mobile Menu"
                    className="w-full justify-center text-sm py-3.5"
                    label="Call for Demo"
                  />

                  <a
                    href={CONTACT.phoneHref}
                    className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-100"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Tap to Call: {CONTACT.phone}</span>
                  </a>

                  <div className="mt-2 rounded-lg bg-slate-50 p-3 text-center font-mono text-[10px] text-slate-500">
                    <p className="font-bold text-slate-700">{CONTACT.headOfficeLabel}</p>
                    <p className="mt-0.5 leading-relaxed">{CONTACT.address.join(" ")}</p>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
