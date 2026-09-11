import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "dark";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-5 py-2",
  md: "px-8 py-3.5",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-accent",
  secondary: "border border-line bg-canvas text-ink hover:border-ink",
  accent: "bg-accent text-white hover:bg-ink",
  dark: "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
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
