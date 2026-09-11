"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DEVICE_CATEGORIES, FIELD_DEVICES, type DeviceCategory } from "@/lib/data/systems";
import { cn } from "@/lib/utils/cn";

type Filter = DeviceCategory | "All";

const FILTERS: Filter[] = ["All", ...DEVICE_CATEGORIES];

export function FieldDeviceGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const devices =
    filter === "All" ? FIELD_DEVICES : FIELD_DEVICES.filter((device) => device.category === filter);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2 border-b border-line pb-5">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={cn(
              "border px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors",
              filter === option
                ? "border-accent bg-accent text-white"
                : "border-line bg-canvas text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {option}
            <span className="ml-2 font-normal opacity-60">
              {option === "All"
                ? FIELD_DEVICES.length
                : FIELD_DEVICES.filter((device) => device.category === option).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {devices.map((device) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  {device.category}
                </span>
                {device.productSlug ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover:text-accent" />
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                {device.name}
              </h3>
              <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
                {device.summary}
              </p>
            </>
          );

          return device.productSlug ? (
            <Link
              key={device.slug}
              href={`/shop/${device.productSlug}`}
              className="group bg-white p-6 transition-colors hover:bg-accent-soft"
            >
              {content}
            </Link>
          ) : (
            <div key={device.slug} className="bg-white p-6">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
