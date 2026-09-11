"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { KB_ARTICLES, KB_CATEGORIES, formatArticleDate } from "@/lib/data/knowledgebase";
import { cn } from "@/lib/utils/cn";

interface KnowledgebaseBrowserProps {
  initialCategory?: string;
}

export function KnowledgebaseBrowser({ initialCategory }: KnowledgebaseBrowserProps) {
  const [category, setCategory] = useState(
    KB_CATEGORIES.some((entry) => entry.slug === initialCategory) ? initialCategory! : "all",
  );
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return KB_ARTICLES.filter((article) => {
      if (category !== "all" && article.category !== category) return false;
      if (!needle) return true;
      return (
        article.title.toLowerCase().includes(needle) ||
        article.description.toLowerCase().includes(needle) ||
        article.sections.some((section) => section.heading.toLowerCase().includes(needle))
      );
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [category, query]);

  const countFor = (slug: string) =>
    slug === "all"
      ? KB_ARTICLES.length
      : KB_ARTICLES.filter((article) => article.category === slug).length;

  const activeCategory = KB_CATEGORIES.find((entry) => entry.slug === category);

  return (
    <div>
      {/* Search */}
      <label className="relative block max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the knowledgebase"
          aria-label="Search the knowledgebase"
          className="w-full border border-line bg-white py-3.5 pl-11 pr-4 font-sans text-sm text-ink transition-colors placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
      </label>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Category rail */}
        <aside className="lg:col-span-3">
          <div className="border border-line bg-white lg:sticky lg:top-28">
            <div className="border-b border-line px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
              Categories
            </div>
            <ul>
              {[{ slug: "all", label: "All Articles" }, ...KB_CATEGORIES].map((entry) => (
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
        </aside>

        {/* Articles */}
        <div className="lg:col-span-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
              {activeCategory ? activeCategory.label : "All Articles"}
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              {results.length} {results.length === 1 ? "article" : "articles"}
            </span>
          </div>
          {activeCategory ? (
            <p className="mt-3 font-sans text-xs leading-relaxed text-ink-soft">
              {activeCategory.description}
            </p>
          ) : null}

          {results.length === 0 ? (
            <div className="mt-8 border border-line bg-white p-12 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                No articles match this search.
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
            <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
              {results.map((article) => {
                const articleCategory = KB_CATEGORIES.find((entry) => entry.slug === article.category);
                return (
                  <article key={article.slug} className="flex flex-col justify-between gap-6 bg-white p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
                        <span className="text-accent">{articleCategory?.label}</span>
                        <span className="text-ink-faint">{formatArticleDate(article.date)}</span>
                        <span className="text-ink-faint">{article.readTime}</span>
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold uppercase leading-tight tracking-tight text-ink">
                        {article.title}
                      </h3>
                      <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
                        {article.description}
                      </p>
                    </div>

                    <Link
                      href={`/knowledgebase/${article.slug}`}
                      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent transition-colors hover:text-ink"
                    >
                      Read article <ArrowRight className="h-3 w-3" />
                    </Link>
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
