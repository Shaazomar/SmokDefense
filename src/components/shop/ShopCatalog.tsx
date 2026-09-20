"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ArrowRight, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Check, 
  PhoneCall, 
  HelpCircle,
  X,
  Filter,
  ShieldCheck,
  FileText
} from "lucide-react";
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
  const [sortBy, setSortBy] = useState<"default" | "name-asc" | "name-desc">("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const countFor = (slug: string) =>
    slug === "all"
      ? productsList.length
      : productsList.filter((product) => product.category === slug).length;

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = productsList.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!needle) return true;
      return (
        product.name.toLowerCase().includes(needle) ||
        product.short.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle) ||
        product.specs.some(
          (s) => s.label.toLowerCase().includes(needle) || s.value.toLowerCase().includes(needle)
        ) ||
        product.applications.some((app) => app.toLowerCase().includes(needle))
      );
    });

    if (sortBy === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [category, query, sortBy, productsList]);

  const activeCategory = categoriesList.find((entry) => entry.slug === category);

  return (
    <div>
      {/* Mobile Category Quick-Scroll Bar */}
      <div className="mb-6 lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
              category === "all"
                ? "bg-blue-600 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}
          >
            <span>All Products</span>
            <span className={cn("rounded-full px-1.5 py-0.2 text-[10px]", category === "all" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-500")}>
              {productsList.length}
            </span>
          </button>

          {categoriesList.map((entry) => {
            const isSelected = category === entry.slug;
            const count = countFor(entry.slug);

            return (
              <button
                key={entry.slug}
                type="button"
                onClick={() => setCategory(entry.slug)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                )}
              >
                <span>{entry.label}</span>
                <span className={cn("rounded-full px-1.5 py-0.2 text-[10px]", isSelected ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-500")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Desktop Sidebar / Mobile Collapsible Drawer */}
        <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-28">
          {/* Search Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-2">
              Search Catalogue
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, models, specs..."
                aria-label="Search products"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-slate-700 bg-slate-200/60 rounded px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Category List */}
          <div className="hidden lg:block rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="border-b border-slate-200/80 bg-slate-50/80 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center justify-between">
              <span>Categories</span>
              <span className="text-[10px] text-slate-400 font-normal">FILTER</span>
            </div>

            <div className="divide-y divide-slate-100">
              {[{ slug: "all", label: "All Products" }, ...categoriesList].map((entry) => {
                const isSelected = category === entry.slug;
                const itemCount = countFor(entry.slug);

                return (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => setCategory(entry.slug)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left text-xs transition-colors cursor-pointer",
                      isSelected
                        ? "bg-blue-50/80 font-bold text-blue-700 border-l-4 border-blue-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span className="uppercase font-mono tracking-wider text-[11px] truncate pr-2">
                      {entry.label}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[11px] px-2 py-0.5 rounded",
                        isSelected
                          ? "bg-blue-100 text-blue-800 font-bold"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {itemCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Need Help Card */}
          <div className="rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50/50 to-white p-5 shadow-xs">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <HelpCircle className="h-4 w-4" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                Need Sizing Help?
              </span>
            </div>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              Send your building schedule or actuator torque requirements for direct engineering assistance.
            </p>
            <div className="mt-4 pt-3 border-t border-blue-100">
              <CallForDemo
                source="Shop Sidebar Help Card"
                label="Request a Quote"
                size="sm"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-xs justify-center"
              />
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Product Grid */}
        <div className="lg:col-span-9">
          {/* Header Strip: Active Category Title, Stats & Sort/View Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-slate-900">
                {activeCategory ? activeCategory.label : "All Products"}
              </h2>
              <p className="font-mono text-xs text-slate-500 mt-0.5">
                {results.length} {results.length === 1 ? "product" : "products"} available for specification
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-[11px] text-slate-500 uppercase">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products"
                  className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:border-blue-600 focus:outline-none"
                >
                  <option value="default">Latest / Default</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>

              {/* Grid / List Toggle */}
              <div className="hidden sm:flex items-center border border-slate-200 rounded p-0.5 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "p-1 rounded transition-colors",
                    viewMode === "grid" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={cn(
                    "p-1 rounded transition-colors",
                    viewMode === "list" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {results.length === 0 ? (
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50/60 p-10 text-center">
              <p className="font-display text-base font-semibold text-slate-900">
                No products found matching your criteria.
              </p>
              <p className="font-sans text-xs text-slate-500 mt-1">
                Try adjusting your search terms or clearing the selected category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <span>Reset All Filters</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            /* Product Grid: 1-col on mobile, 2-col on tablet, 3-col on desktop */
            <div className={cn(
              "mt-8 grid gap-5 sm:gap-6",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            )}>
              {results.map((product) => {
                const categoryObj = categoriesList.find((c) => c.slug === product.category);
                const categoryLabel = categoryObj ? categoryObj.label : product.category;

                return (
                  <article
                    key={product.slug}
                    className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md"
                  >
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex items-center justify-between gap-2 pb-3">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
                          {categoryLabel}
                        </span>
                        {product.verified ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                            <ShieldCheck className="h-3 w-3 text-emerald-600" />
                            Verified Hardware
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded">
                            <FileText className="h-3 w-3 text-blue-600" />
                            Submittal Ready
                          </span>
                        )}
                      </div>

                      {/* Image Area */}
                      <Link
                        href={`/shop/${product.slug}`}
                        className="block relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-slate-50 border border-slate-100 p-4 transition-colors group-hover:border-blue-200"
                      >
                        {product.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center rounded bg-slate-100/70 p-3 text-center border border-dashed border-slate-200">
                            <DeviceGlyph kind={product.glyph} className="h-10 w-10 text-slate-400 mb-1.5" />
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-700">
                              Technical Drawing &amp; Submittal
                            </span>
                            <span className="font-sans text-[8.5px] text-slate-400 mt-0.5">
                              Product photo pending factory release
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* Manufacturer & Model Line */}
                      {product.manufacturer && (
                        <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-500">
                          <span className="truncate">Mfr: <strong className="text-slate-700 font-semibold">{product.manufacturer}</strong></span>
                          {product.model && <span className="shrink-0 text-slate-500 ml-1">Mod: {product.model}</span>}
                        </div>
                      )}

                      {/* Product Name */}
                      <h3 className="mt-2.5 font-display text-base font-bold uppercase leading-snug tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                        <Link href={`/shop/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>

                      {/* Short Description */}
                      <p className="mt-1.5 font-sans text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {product.short || product.description}
                      </p>

                      {/* Specifications */}
                      {product.specs && product.specs.length > 0 && (
                        <dl className="mt-3.5 space-y-1 rounded-lg bg-slate-50 p-2.5 border border-slate-100 font-mono text-[10px]">
                          {product.specs.slice(0, 3).map((spec) => (
                            <div key={spec.label} className="flex items-baseline justify-between gap-2">
                              <dt className="uppercase tracking-wider text-slate-400 font-semibold truncate">
                                {spec.label}
                              </dt>
                              <dd className="font-semibold text-slate-800 text-right truncate">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {/* Application Tags */}
                      {product.applications && product.applications.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {product.applications.slice(0, 2).map((app) => (
                            <span
                              key={app}
                              className="font-mono text-[9px] uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="inline-flex min-h-[38px] items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <CallForDemo
                        source={`Shop Catalogue — ${product.name}`}
                        label="Request Quote"
                        variant="primary"
                        size="sm"
                        className="min-h-[38px] bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-xs"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
