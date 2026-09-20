import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react";
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
  const staticProd = PRODUCTS.find((p) => p.slug === slug);
  try {
    const dbProd = db.getProductBySlug(slug);
    if (dbProd && dbProd.status === "active") {
      return {
        slug: dbProd.slug,
        name: dbProd.name,
        category: dbProd.category,
        glyph: dbProd.glyph || staticProd?.glyph || "sensor",
        short: dbProd.short || staticProd?.short || "",
        description: dbProd.description || staticProd?.description || "",
        specs: dbProd.specs && dbProd.specs.length > 0 ? dbProd.specs : (staticProd?.specs || []),
        applications: dbProd.applications || staticProd?.applications || [],
        systems: dbProd.systems || staticProd?.systems || [],
        image: staticProd?.image || dbProd.mainImage || (dbProd.images && dbProd.images.length > 0 ? dbProd.images[0] : undefined),
        manufacturer: staticProd?.manufacturer,
        model: staticProd?.model,
        sourceUrl: staticProd?.sourceUrl,
        verified: staticProd?.verified,
      };
    }
  } catch {
    // fallback
  }
  return staticProd;
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
  return { title: `${product.name} — Override-R Catalogue`, description: product.short };
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
        image: p.mainImage || (p.images && p.images.length > 0 ? p.images[0] : undefined),
      }));
    }
  } catch {
    // fallback
  }

  const relatedSystems = product.systems.map(getSystem).filter((system) => system !== undefined);
  const relatedProducts = allProducts
    .filter((entry) => entry.category === product.category && entry.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200/80 bg-slate-50/70 pt-24 pb-3 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/shop" className="hover:text-slate-900 transition-colors">
              Product Catalogue
            </Link>
            <span className="text-slate-300">/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-slate-900 transition-colors">
              {category?.label ?? product.category}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Container */}
      <section className="py-12 md:py-16 border-b border-slate-200">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Product Image & Enquire Action Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative flex aspect-square items-center justify-center rounded-xl border border-slate-200 bg-slate-50/60 p-8 overflow-hidden shadow-xs">
                {product.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                    {product.verified && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-md bg-white/95 border border-emerald-300 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 shadow-sm backdrop-blur-xs">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        Verified Hardware
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-slate-100/70 p-6 text-center border border-dashed border-slate-200">
                    <DeviceGlyph kind={product.glyph} className="h-20 w-20 text-slate-400 mb-3" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                      Technical Drawing &amp; Submittal on File
                    </span>
                    <span className="font-sans text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                      Physical product photography pending factory release. Complete engineering submittal data sheets available on enquiry.
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                    Project Enquiry
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available to Specify
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Supplied and commissioned against building schedules. We verify sizing, signal types and fail-safe ratings.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <CallForDemo
                    source={`Product Quote — ${product.name}`}
                    label="Request Project Quote"
                    variant="primary"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                  />
                  <CallForDemo
                    source={`Product Demo — ${product.name}`}
                    label="Request Technical Demo"
                    variant="secondary"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description & Engineering Specs */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {category?.label ?? "Building Safety Device"}
                  </span>
                  {product.verified && (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="h-3 w-3" />
                      Authentic Hardware
                    </span>
                  )}
                </div>
                <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-slate-900">
                  {product.name}
                </h1>
                
                {/* Manufacturer & Model Block */}
                {product.manufacturer && (
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-600 border-y border-slate-100 py-2.5">
                    <span>Manufacturer: <strong className="text-slate-900 font-semibold">{product.manufacturer}</strong></span>
                    {product.model && <span>Model: <strong className="text-slate-900 font-semibold">{product.model}</strong></span>}
                    {product.sourceUrl && (
                      <a
                        href={product.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline font-sans text-xs ml-auto"
                      >
                        Official Manufacturer Page ↗
                      </a>
                    )}
                  </div>
                )}

                <p className="mt-4 font-sans text-base leading-relaxed text-slate-600">
                  {product.short}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Overview
                </h3>
                <p className="font-sans text-sm leading-relaxed text-slate-700">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications */}
              {product.specs && product.specs.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Technical Specifications
                  </h3>
                  <dl className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-3 text-xs gap-1"
                      >
                        <dt className="font-mono uppercase tracking-wider text-slate-500 font-medium">
                          {spec.label}
                        </dt>
                        <dd className="font-semibold text-slate-900 text-left sm:text-right">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Applications & Systems */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {product.applications && product.applications.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                      Target Applications
                    </h4>
                    <ul className="space-y-2">
                      {product.applications.map((app) => (
                        <li key={app} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedSystems.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                      Integrated Systems
                    </h4>
                    <ul className="space-y-2">
                      {relatedSystems.map((sys) => (
                        <li key={sys.slug}>
                          <Link
                            href={`/systems/${sys.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <span>{sys.title}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-slate-900">
                Related {category?.label ?? "Equipment"}
              </h3>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                <span>View All In Category</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/shop/${entry.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] w-full bg-slate-50 rounded-lg p-3 flex items-center justify-center overflow-hidden mb-4">
                    {entry.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.image}
                        alt={entry.name}
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <DeviceGlyph kind={entry.glyph} className="h-12 w-12 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-slate-900 group-hover:text-blue-600 transition-colors">
                      {entry.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {entry.short}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <ClosingCTA
        source={`Product Page — ${product.name}`}
        title="Need this specified for a project?"
        lead="Send us your equipment schedule and our engineering team will verify torque, stroke time and signal integration."
        secondary={{ href: "/shop", label: "BACK TO CATALOGUE" }}
      />
    </main>
  );
}
