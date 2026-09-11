import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { KnowledgebaseBrowser } from "@/components/knowledgebase/KnowledgebaseBrowser";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { KB_ARTICLES, KB_CATEGORIES } from "@/lib/data/knowledgebase";

export const metadata: Metadata = {
  title: "Knowledgebase",
  description:
    "Technical guides, product and installation guides, system design notes, application notes, FAQs, case studies, standards and troubleshooting for building ventilation and control systems.",
};

interface KnowledgebasePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function KnowledgebasePage({ searchParams }: KnowledgebasePageProps) {
  const { category } = await searchParams;

  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="Knowledgebase"
        title="Technical resource centre."
        lead="How these systems are designed, installed, tested and kept working — written by the engineers who commission them."
        crumbs={[{ label: "Knowledgebase" }]}
        actions={<CallForDemo source="Knowledgebase Page" />}
        meta={
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint lg:text-right">
            {KB_ARTICLES.length} articles / {KB_CATEGORIES.length} categories
          </span>
        }
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <KnowledgebaseBrowser initialCategory={category} />
        </div>
      </section>

      <ClosingCTA
        source="Knowledgebase Page"
        title="Can't find the answer here?"
        lead="Ask our engineering team directly, or book a demonstration and see the system behaviour rather than reading about it."
        secondary={{ href: "/contact", label: "Talk to Our Team" }}
      />
    </main>
  );
}
