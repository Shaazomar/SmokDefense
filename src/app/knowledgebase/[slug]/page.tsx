import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import {
  KB_ARTICLES,
  formatArticleDate,
  getArticle,
  getKbCategory,
} from "@/lib/data/knowledgebase";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return KB_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.description };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getKbCategory(article.category);
  const related = (article.related ?? [])
    .map(getArticle)
    .filter((entry) => entry !== undefined)
    .slice(0, 3);

  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow={category?.label ?? "Article"}
        title={article.title}
        lead={article.description}
        crumbs={[
          { href: "/knowledgebase", label: "Knowledgebase" },
          { href: `/knowledgebase?category=${article.category}`, label: category?.label ?? "Article" },
        ]}
        meta={
          <div className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint lg:justify-end">
            <span>{formatArticleDate(article.date)}</span>
            <span>{article.readTime} read</span>
          </div>
        }
        actions={<CallForDemo source={`Knowledgebase — ${article.title}`} />}
      />

      <article className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Contents */}
          <nav className="lg:col-span-3">
            <div className="border border-line bg-white lg:sticky lg:top-28">
              <div className="border-b border-line px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
                Contents
              </div>
              <ol className="p-4">
                {article.sections.map((section, index) => (
                  <li key={section.heading} className="flex gap-3 py-1.5">
                    <span className="font-mono text-[10px] font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#section-${index}`}
                      className="font-sans text-[11px] leading-relaxed text-ink-soft transition-colors hover:text-ink"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Body */}
          <div className="lg:col-span-9">
            <div className="max-w-3xl space-y-10">
              {article.sections.map((section, index) => (
                <section key={section.heading} id={`section-${index}`} className="scroll-mt-28">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink md:text-2xl">
                      {section.heading}
                    </h2>
                  </div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft md:text-base">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            {related.length > 0 ? (
              <div className="mt-14 border-t border-line pt-8">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                  Related Reading
                </span>
                <div className="mt-4 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
                  {related.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/knowledgebase/${entry.slug}`}
                      className="group bg-white p-5 transition-colors hover:bg-accent-soft"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        {getKbCategory(entry.category)?.label}
                      </span>
                      <h3 className="mt-3 font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                        {entry.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              <Link
                href="/knowledgebase"
                className="font-mono text-[11px] uppercase tracking-widest text-ink-soft transition-colors hover:text-ink"
              >
                ← All articles
              </Link>
              <Link
                href={`/knowledgebase?category=${article.category}`}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft transition-colors hover:text-ink"
              >
                More in {category?.label} <ArrowRight className="h-3 w-3 text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <ClosingCTA
        source={`Knowledgebase — ${article.title}`}
        title="Let's make your building smarter and safer."
        secondary={{ href: "/knowledgebase", label: "Back to Knowledgebase" }}
      />
    </main>
  );
}
