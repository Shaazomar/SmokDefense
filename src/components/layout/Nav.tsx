"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { NAV_LINKS, SITE, CONTACT } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Nav() {
  const { scrolled } = useScrollProgress();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu automatically on route change
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

  // Handle ESC key to close mobile menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200 select-none",
        scrolled || menuOpen
          ? "border-b border-slate-200/90 bg-white/98 shadow-xs backdrop-blur-md"
          : "border-b border-slate-200/60 bg-white/90 backdrop-blur-xs",
      )}
    >
      <div className="mx-auto flex h-16 sm:h-[72px] lg:h-20 max-w-[1440px] items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-3.5 sm:px-6 md:px-8 lg:px-10">
        {/* Brand Logo with exact aspect ratio preservation */}
        <Link
          href="/"
          className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md transition-opacity hover:opacity-90"
          aria-label={`${SITE.name} Homepage`}
        >
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={2172}
            height={724}
            priority
            className="h-7 sm:h-8 md:h-8.5 lg:h-9 w-auto max-w-[130px] sm:max-w-[155px] md:max-w-[175px] lg:max-w-[195px] object-contain shrink-0"
          />
        </Link>

        {/* Desktop Navigation Links — Adaptively scales between 1024px and 2560px */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-3.5 lg:flex xl:gap-6 2xl:gap-7 text-[13px] xl:text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => {
            const active = isRouteActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1.5 px-1 transition-colors duration-150 rounded hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                  active
                    ? "font-semibold text-blue-600"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Buttons & Direct CTAs */}
        <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
          {/* Phone quick call button for desktop */}
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/90 px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 xl:inline-flex"
            title={`Call Override-R at ${CONTACT.phone}`}
          >
            <Phone className="h-3 w-3 text-blue-600 shrink-0" />
            <span className="whitespace-nowrap">{CONTACT.phone}</span>
          </a>

          {/* Contact Nav Link */}
          <Link
            href="/contact"
            className={cn(
              "hidden rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:inline-flex",
              pathname === "/contact" ? "text-blue-600 font-bold" : "text-slate-700",
            )}
          >
            Contact
          </Link>

          {/* Primary Request Demo CTA Button */}
          <CallForDemo
            source="Header"
            label="Request Demo"
            size="sm"
            className="hidden sm:inline-flex text-[11px] lg:text-xs py-2 px-3.5 sm:px-4"
          />

          {/* Mobile Phone Quick Action Icon Button (< 1024px, >= 380px) */}
          <a
            href={CONTACT.phoneHref}
            aria-label={`Call ${CONTACT.phone}`}
            className="hidden min-[380px]:flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
          >
            <Phone className="h-4 w-4 text-blue-600" />
          </a>

          {/* Hamburger Toggle Button (min 44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-16 sm:top-[72px] z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-72px)] overflow-y-auto border-t border-slate-200 bg-white shadow-2xl lg:hidden"
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col px-4 sm:px-6 py-5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Navigation Menu
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Life-Safety Systems</span>
                  </div>
                </div>

                {/* Primary Site Links */}
                {NAV_LINKS.map((link) => {
                  const active = isRouteActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-[48px] items-center justify-between border-b border-slate-100 py-3 text-base font-medium transition-colors",
                        active
                          ? "font-bold text-blue-600"
                          : "text-slate-800 active:text-blue-600 hover:text-blue-600",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                        {link.label}
                      </span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          active ? "text-blue-600 translate-x-0.5" : "text-slate-300",
                        )}
                      />
                    </Link>
                  );
                })}

                {/* Contact Page Link */}
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex min-h-[48px] items-center justify-between border-b border-slate-100 py-3 text-base font-medium transition-colors",
                    pathname === "/contact"
                      ? "font-bold text-blue-600"
                      : "text-slate-800 active:text-blue-600 hover:text-blue-600",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    {pathname === "/contact" && (
                      <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                    Contact
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4",
                      pathname === "/contact" ? "text-blue-600 translate-x-0.5" : "text-slate-300",
                    )}
                  />
                </Link>

                {/* Mobile CTAs & Tap-to-Call */}
                <div className="mt-5 flex flex-col gap-3 pt-1">
                  <CallForDemo
                    source="Mobile Menu"
                    className="w-full justify-center text-sm py-3.5 shadow-sm"
                    label="Request Live Demo"
                  />

                  <a
                    href={CONTACT.phoneHref}
                    className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-100"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Tap to Call: {CONTACT.phone}</span>
                  </a>

                  {/* Company Address Card */}
                  <div className="mt-2 rounded-lg border border-slate-200/80 bg-slate-50 p-3.5 text-center font-mono text-[11px] text-slate-500">
                    <p className="font-bold text-slate-700">{CONTACT.headOfficeLabel}</p>
                    <p className="mt-0.5 leading-relaxed text-[10px]">
                      {CONTACT.address.join(" ")}
                    </p>
                    <p className="mt-1.5 text-[10px] text-slate-400">
                      Hours: {CONTACT.hours}
                    </p>
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

