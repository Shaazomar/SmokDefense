import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { SYSTEMS, getSystem } from "@/lib/data/systems";
import { PRODUCTS } from "@/lib/data/shop";

interface SystemPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SYSTEMS.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) return {};
  return { title: system.title, description: system.summary };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  const related = PRODUCTS.filter((product) => product.systems.includes(system.slug)).slice(0, 4);
  const index = SYSTEMS.findIndex((entry) => entry.slug === system.slug);
  const next = SYSTEMS[(index + 1) % SYSTEMS.length];

  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow={system.eyebrow}
        title={system.title}
        lead={system.summary}
        crumbs={[{ href: "/systems", label: "Systems" }, { label: system.short }]}
        actions={<CallForDemo source={`System — ${system.title}`} />}
        meta={
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint lg:text-right">
            System {system.number} / {SYSTEMS.length}
          </span>
        }
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
              Capabilities
            </span>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {system.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-2.5 border border-line bg-white p-4 font-sans text-xs leading-relaxed text-ink-soft"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                  {capability}
                </li>
              ))}
            </ul>

            <span className="mt-10 block font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
              Sequence of Operation
            </span>
            <ol className="mt-4 border border-line bg-white">
              {system.sequence.map((item, position) => (
                <li
                  key={item.step}
                  className="flex gap-4 border-b border-line p-5 last:border-b-0"
                >
                  <span className="font-mono text-[11px] font-bold text-accent">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                      {item.step}
                    </span>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-ink-soft">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            {system.image ? (
              <div className="relative aspect-4/3 w-full overflow-hidden border border-line bg-white">
                <Image
                  src={system.image}
                  alt={`${system.title} application`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="mt-6 border border-line bg-white">
              <div className="border-b border-line px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                System Components
              </div>
              <ul>
                {system.components.map((component) => (
                  <li key={component.name} className="border-b border-line px-5 py-4 last:border-b-0">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                      {component.name}
                    </span>
                    <p className="mt-1 font-sans text-[11px] leading-relaxed text-ink-soft">
                      {component.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {system.applications.map((application) => (
                <span
                  key={application}
                  className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                >
                  {application}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {system.subsections ? (
        <section className="border-t border-line bg-white px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="// Detail"
              title="Expand the detail you need."
              lead="Each subsection covers the control approach and the equipment involved."
            />
            <div className="mt-6">
              {system.subsections.map((subsection) => (
                <ExpandablePanel
                  key={subsection.key}
                  title={subsection.title}
                  badge={subsection.label.split(".")[0]}
                  subtitle={subsection.label}
                  defaultOpen={system.subsections?.[0].key === subsection.key}
                >
                  <p className="max-w-3xl font-sans text-sm leading-relaxed text-ink-soft">
                    {subsection.body}
                  </p>
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {subsection.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 font-mono text-[11px] leading-relaxed text-ink-soft"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </ExpandablePanel>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-t border-line bg-canvas px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="// Related Products"
              title="Devices used in this system."
              aside={
                <Link
                  href="/shop"
                  className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-ink"
                >
                  Full catalogue →
                </Link>
              }
            />
            <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {related.map((product) => (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  className="group bg-white p-6 transition-colors hover:bg-accent-soft"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    {product.category.replace("-", " ")}
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
                    {product.short}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line bg-white px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link
            href="/systems"
            className="font-mono text-[11px] uppercase tracking-widest text-ink-soft transition-colors hover:text-ink"
          >
            ← All systems
          </Link>
          <Link
            href={`/systems/${next.slug}`}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft transition-colors hover:text-ink"
          >
            Next: {next.short} <ArrowRight className="h-3 w-3 text-accent" />
          </Link>
        </div>
      </section>

      <ClosingCTA
        source={`System — ${system.title}`}
        title="Let's make your building smarter and safer."
        secondary={{ href: "/services", label: "Our Services" }}
      />
    </main>
  );
}
