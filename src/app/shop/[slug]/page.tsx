import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DeviceGlyph } from "@/components/ui/DeviceGlyph";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { PRODUCTS, SHOP_CATEGORIES, Product, ShopCategory } from "@/lib/data/shop";
import { db } from "@/lib/db/store";
import { getSystem } from "@/lib/data/systems";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  try {
    const dbProds = db.getProducts({ onlyActive: true });
    if (dbProds && dbProds.length > 0) {
      return dbProds.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // fallback
  }
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

function fetchProductBySlug(slug: string): Product | undefined {
  try {
    const dbProd = db.getProductBySlug(slug);
    if (dbProd && dbProd.status === "active") {
      return {
        slug: dbProd.slug,
        name: dbProd.name,
        category: dbProd.category,
        glyph: dbProd.glyph || "sensor",
        short: dbProd.short || "",
        description: dbProd.description || "",
        specs: dbProd.specs || [],
        applications: dbProd.applications || [],
        systems: dbProd.systems || [],
        image: dbProd.mainImage || (dbProd.images && dbProd.images.length > 0 ? dbProd.images[0] : undefined),
      };
    }
  } catch {
    // fallback
  }
  return PRODUCTS.find((p) => p.slug === slug);
}

function fetchCategoryBySlug(slug: string): ShopCategory | undefined {
  try {
    const dbCat = db.getCategoryById(slug);
    if (dbCat && dbCat.status === "active") {
      return {
        slug: dbCat.slug,
        label: dbCat.label,
        description: dbCat.description || "",
      };
    }
  } catch {
    // fallback
  }
  return SHOP_CATEGORIES.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = fetchProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.short };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = fetchProductBySlug(slug);
  if (!product) notFound();

  const category = fetchCategoryBySlug(product.category);

  let allProducts: Product[] = PRODUCTS;
  try {
    const dbProds = db.getProducts({ onlyActive: true });
    if (dbProds && dbProds.length > 0) {
      allProducts = dbProds.map((p) => ({
        slug: p.slug,
        name: p.name,
        category: p.category,
        glyph: p.glyph || "sensor",
        short: p.short || "",
        description: p.description || "",
        specs: p.specs || [],
        applications: p.applications || [],
        systems: p.systems || [],
      }));
    }
  } catch {
    // fallback
  }

  const relatedSystems = product.systems.map(getSystem).filter((system) => system !== undefined);
  const relatedProducts = allProducts.filter(
    (entry) => entry.category === product.category && entry.slug !== product.slug,
  ).slice(0, 3);

  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow={category?.label ?? "Product"}
        title={product.name}
        lead={product.short}
        crumbs={[
          { href: "/shop", label: "Shop" },
          { href: `/shop?category=${product.category}`, label: category?.label ?? product.category },
          { label: product.name },
        ]}
        actions={
          <>
            <CallForDemo source={`Product — ${product.name}`} label="Request Quote" variant="primary" />
            <CallForDemo source={`Product Demo — ${product.name}`} variant="secondary" />
          </>
        }
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex aspect-square items-center justify-center border border-line bg-white overflow-hidden">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-6"
                />
              ) : (
                <DeviceGlyph kind={product.glyph} className="h-40 w-40" />
              )}
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {product.image ? "Official product image." : "Schematic representation — product photography available on request."}
            </p>

            <div className="mt-6 flex flex-col gap-3 border border-line bg-white p-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                Enquire
              </span>
              <CallForDemo
                source={`Product Quote — ${product.name}`}
                label="Request Quote"
                variant="accent"
                size="sm"
              />
              <CallForDemo
                source={`Product Demo — ${product.name}`}
                variant="secondary"
                size="sm"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="font-sans text-sm leading-relaxed text-ink-soft md:text-base">
              {product.description}
            </p>

            <div className="mt-8">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                Key Specifications
              </span>
              <dl className="mt-4 border border-line bg-white">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-1 border-b border-line px-5 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      {spec.label}
                    </dt>
                    <dd className="font-mono text-[11px] text-ink sm:text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                  Application
                </span>
                <ul className="mt-3 space-y-2">
                  {product.applications.map((application) => (
                    <li
                      key={application}
                      className="flex items-start gap-2.5 font-sans text-[11px] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                      {application}
                    </li>
                  ))}
                </ul>
              </div>

              {relatedSystems.length > 0 ? (
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                    Used In
                  </span>
                  <ul className="mt-3 space-y-2">
                    {relatedSystems.map((system) => (
                      <li key={system.slug}>
                        <Link
                          href={`/systems/${system.slug}`}
                          className="font-mono text-[11px] uppercase tracking-wider text-accent transition-colors hover:text-ink"
                        >
                          {system.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="border-t border-line bg-white px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={`// More in ${category?.label ?? "this category"}`}
              title="Related products."
              aside={
                <Link
                  href={`/shop?category=${product.category}`}
                  className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-ink"
                >
                  View category →
                </Link>
              }
            />
            <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
              {relatedProducts.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/shop/${entry.slug}`}
                  className="group bg-canvas p-6 transition-colors hover:bg-accent-soft"
                >
                  <DeviceGlyph kind={entry.glyph} className="h-12 w-12" />
                  <h3 className="mt-4 font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                    {entry.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
                    {entry.short}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ClosingCTA
        source={`Product — ${product.name}`}
        title="Need this specified for a project?"
        lead="Send the schedule and we will confirm selection, quantity and integration against the control system."
        secondary={{ href: "/shop", label: "Back to Catalogue" }}
      />
    </main>
  );
}
