"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { PRODUCTS, SHOP_CATEGORIES, Product, ShopCategory } from "@/lib/data/shop";
import { DeviceGlyph } from "@/components/ui/DeviceGlyph";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { cn } from "@/lib/utils/cn";

interface ShopCatalogProps {
  initialCategory?: string;
  productsList?: Product[];
  categoriesList?: ShopCategory[];
}

export function ShopCatalog({
  initialCategory,
  productsList = PRODUCTS,
  categoriesList = SHOP_CATEGORIES,
}: ShopCatalogProps) {
  const [category, setCategory] = useState(
    categoriesList.some((entry) => entry.slug === initialCategory) ? initialCategory! : "all",
  );
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return productsList.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!needle) return true;
      return (
        product.name.toLowerCase().includes(needle) ||
        product.short.toLowerCase().includes(needle) ||
        product.applications.some((application) => application.toLowerCase().includes(needle))
      );
    });
  }, [category, query, productsList]);

  const countFor = (slug: string) =>
    slug === "all"
      ? productsList.length
      : productsList.filter((product) => product.category === slug).length;

  const active = categoriesList.find((entry) => entry.slug === category);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      {/* Filter rail */}
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="w-full border border-line bg-white py-2.5 pl-9 pr-3 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
          </label>

          <div className="mt-5 border border-line bg-white">
            <div className="border-b border-line px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
              Categories
            </div>
            <ul>
              {[{ slug: "all", label: "All Products" }, ...categoriesList].map((entry) => (
                <li key={entry.slug}>
                  <button
                    type="button"
                    onClick={() => setCategory(entry.slug)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 border-b border-line px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider transition-colors last:border-b-0",
                      category === entry.slug
                        ? "bg-accent-soft font-bold text-ink"
                        : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {entry.label}
                    <span className="text-ink-faint">{countFor(entry.slug)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border border-line bg-ink p-5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
              {"// "}B2B Catalogue
            </span>
            <p className="mt-2 font-sans text-[11px] leading-relaxed text-white/70">
              Products are supplied against project requirements. Send us the schedule and we will
              return a quotation with selections verified.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <CallForDemo source="Shop — Sidebar" label="Request Quote" variant="accent" size="sm" />
              <CallForDemo source="Shop — Sidebar Demo" variant="dark" size="sm" />
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            {active ? active.label : "All Products"}
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            {results.length} {results.length === 1 ? "product" : "products"}
          </span>
        </div>
        {active ? (
          <p className="mt-3 font-sans text-xs leading-relaxed text-ink-soft">{active.description}</p>
        ) : null}

        {results.length === 0 ? (
          <div className="mt-8 border border-line bg-white p-12 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
              No products match this filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 font-mono text-[11px] uppercase tracking-widest text-accent hover:text-ink"
            >
              Reset filters →
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
            {results.map((product) => (
              <article key={product.slug} className="group flex flex-col bg-white p-6">
                <Link href={`/shop/${product.slug}`} className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    {product.image ? (
                      /* Real product photo */
                      <div className="h-14 w-14 shrink-0 overflow-hidden border border-line bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    ) : (
                      <DeviceGlyph kind={product.glyph} className="h-14 w-14" />
                    )}
                    <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
                  </div>

                  <h3 className="mt-5 font-display text-base font-bold uppercase leading-tight tracking-tight text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
                    {product.short}
                  </p>

                  <dl className="mt-4 space-y-1.5 border-t border-line pt-4">
                    {product.specs.slice(0, 3).map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-3 font-mono text-[10px]">
                        <dt className="uppercase tracking-wider text-ink-faint">{spec.label}</dt>
                        <dd className="text-right text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 flex flex-1 flex-wrap items-end gap-1.5">
                    {product.applications.slice(0, 2).map((application) => (
                      <span
                        key={application}
                        className="border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-soft"
                      >
                        {application}
                      </span>
                    ))}
                  </div>
                </Link>

                <div className="mt-5 border-t border-line pt-4">
                  <CallForDemo
                    source={`Shop — ${product.name}`}
                    label="Request Quote"
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
