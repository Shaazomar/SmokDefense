"use client";

import React from "react";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useDemo } from "./DemoProvider";

interface CallForDemoProps {
  /** Attribution label recorded with the enquiry. */
  source: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** The site-wide primary CTA. Opens the demo request dialog from anywhere. */
export function CallForDemo({
  source,
  label = "Call for Demo",
  variant = "accent",
  size = "md",
  className,
}: CallForDemoProps) {
  const { openDemo } = useDemo();

  return (
    <button type="button" onClick={() => openDemo(source)} className={buttonClass(variant, size, className)}>
      {label} →
    </button>
  );
}
