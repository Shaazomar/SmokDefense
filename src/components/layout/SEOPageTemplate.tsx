import React from "react";
import Link from "next/link";
import { type SEOPageConfig } from "@/lib/data/seoData";
import { DemoTag } from "@/components/ui/DemoTag";
import { CheckCircle2, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";

export function SEOPageTemplate({ pageData }: { pageData: SEOPageConfig }) {
  // Generate JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": pageData.h1,
    "description": pageData.metaDescription,
    "publisher": {
      "@type": "Organization",
      "name": "SmokDefense Intelligent Life-Safety Infrastructure",
      "url": "https://smokdefense.com",
    },
  };

  return (
    <main className="min-h-screen bg-canvas px-6 pb-24 pt-32 md:px-12 lg:px-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink">HOME</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-accent uppercase">{pageData.slug}</span>
        </div>

        {/* Header */}
        <div className="mt-6 border-b border-line pb-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            // {pageData.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink">
            {pageData.h1}
          </h1>
          <p className="mt-6 font-sans text-base text-ink-soft md:text-lg leading-relaxed max-w-3xl">
            {pageData.summary}
          </p>
        </div>

        {/* Key Takeaways Grid */}
        <div className="my-10 rounded border border-line bg-white p-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink mb-4 block">
            EXECUTIVE ENGINEERING SUMMARY
          </span>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pageData.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-3 border border-line/60 bg-canvas p-4 font-sans text-xs text-ink-soft">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Content Sections */}
        <div className="space-y-10">
          {pageData.sections.map((section, idx) => (
            <section key={idx} className="border-b border-line pb-8">
              <h2 className="font-display text-2xl font-semibold uppercase text-ink md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-4 font-sans text-base text-ink-soft leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {/* FAQs if present */}
        {pageData.faqs && pageData.faqs.length > 0 && (
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="font-display text-2xl font-semibold uppercase text-ink mb-6">
              FREQUENTLY ASKED TECHNICAL QUESTIONS
            </h3>
            <div className="space-y-4 font-sans text-sm">
              {pageData.faqs.map((faq, idx) => (
                <div key={idx} className="border border-line bg-white p-6">
                  <h4 className="font-mono text-xs font-bold uppercase text-ink">{faq.q}</h4>
                  <p className="mt-2 text-ink-soft text-xs leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Banner */}
        <div className="mt-16 rounded border border-ink bg-ink p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-accent uppercase font-bold">// ENGINEER CONSULTATION</span>
            <h3 className="font-display text-2xl font-semibold uppercase">Need Technical Specifications for your Project?</h3>
            <p className="font-sans text-xs text-white/80 mt-1">Talk with a life-safety systems engineer about CAD integration and UUKL panel sizing.</p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-ink shrink-0"
          >
            Talk to an Engineer →
          </Link>
        </div>
      </div>
    </main>
  );
}
