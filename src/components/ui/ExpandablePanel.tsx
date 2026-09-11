"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface ExpandablePanelProps {
  title: string;
  subtitle?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function ExpandablePanel({
  title,
  subtitle,
  badge,
  defaultOpen = false,
  children,
}: ExpandablePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line py-4 transition-colors hover:bg-black/[0.01]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1 pr-4">
          <div className="flex items-center gap-3">
            {badge && (
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                [{badge}]
              </span>
            )}
            <h4 className="font-display text-lg font-semibold uppercase tracking-tight text-ink md:text-xl">
              {title}
            </h4>
          </div>
          {subtitle && (
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">{subtitle}</p>
          )}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink">
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 text-ink-soft">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
