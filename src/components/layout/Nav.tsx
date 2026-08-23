"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "#system-architecture", label: "SYSTEM" },
  { href: "/technology", label: "TECHNOLOGY" },
  { href: "#smoke-control", label: "SOLUTIONS" },
  { href: "/industries", label: "INDUSTRIES" },
  { href: "/case-studies", label: "PROJECTS" },
  { href: "/resources", label: "RESOURCES" },
  { href: "/company", label: "COMPANY" },
  { href: "/contact", label: "CONTACT" },
];

export function Nav() {
  const { scrolled, direction } = useScrollProgress();
  const hidden = scrolled && direction === "down";

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-10",
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-line shadow-xs" : "bg-canvas/50 backdrop-blur-xs",
      )}
    >
      <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink flex items-center gap-2">
        <span>SMOKEDEFENCE</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      </Link>

      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-5 font-mono text-xs uppercase tracking-wider text-ink-soft md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-ink hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Small SYSTEM EXPLORER Trigger Button */}
        <a
          href="#explorer"
          className="rounded-full border border-accent bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase font-bold text-accent transition-all hover:bg-accent hover:text-white"
        >
          SYSTEM EXPLORER →
        </a>
      </div>
    </motion.header>
  );
}
