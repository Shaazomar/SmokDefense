"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/technology", label: "Technology" },
  { href: "/industries", label: "Industries" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const { scrolled, direction } = useScrollProgress();
  const hidden = scrolled && direction === "down";

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 md:px-10",
        scrolled ? "bg-white/70 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
        SMOK<span className="text-accent">DEFENSE</span>
      </Link>
      <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-ink-soft md:flex">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
