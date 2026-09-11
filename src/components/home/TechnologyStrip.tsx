import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DeviceGlyph } from "@/components/ui/DeviceGlyph";
import type { GlyphKind } from "@/lib/data/shop";

const HARDWARE: { label: string; glyph: GlyphKind; detail: string; href: string }[] = [
  { label: "Sensors", glyph: "sensor", detail: "CO₂ · CO · ΔP · T/RH", href: "/shop?category=sensors" },
  { label: "Actuators", glyph: "actuator", detail: "Damper · Valve · Window", href: "/shop?category=actuators" },
  { label: "Controllers", glyph: "controller", detail: "Zone & field logic", href: "/shop?category=controllers" },
  { label: "Gateways", glyph: "gateway", detail: "Protocol translation", href: "/shop/gateway-controller" },
  { label: "Edge Controllers", glyph: "controller", detail: "Local compute & buffer", href: "/shop/edge-controller" },
  { label: "Field Devices", glyph: "damper", detail: "Dampers · IP500 · modules", href: "/systems/field-devices" },
];

export function TechnologyStrip() {
  return (
    <section className="border-t border-line bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="// Products & Technology"
          title="The hardware layer."
          lead="Field-proven devices, specified and supplied as part of the system — not sourced around it."
          aside={
            <Link
              href="/shop"
              className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-ink"
            >
              Browse catalogue →
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
          {HARDWARE.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-start gap-4 bg-canvas p-6 transition-colors hover:bg-accent-soft"
            >
              <DeviceGlyph kind={item.glyph} className="h-12 w-12 transition-colors group-hover:stroke-accent" />
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-tight text-ink">
                  {item.label}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {item.detail}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
