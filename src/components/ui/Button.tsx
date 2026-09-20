import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "dark";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none active:scale-[0.99] rounded-md";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 shadow-xs",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-xs",
  accent:
    "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-xs",
  dark:
    "border border-slate-700 bg-slate-900 text-white hover:bg-slate-800",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(BASE, SIZES[size], VARIANTS[variant], className);
}

interface ButtonLinkProps extends React.ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonClass(variant, size, className)} />;
}
