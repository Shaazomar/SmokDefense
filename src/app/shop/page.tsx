import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText, ShieldCheck, Wrench, ChevronRight } from "lucide-react";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { db } from "@/lib/db/store";
import { PRODUCTS, SHOP_CATEGORIES, Product, ShopCategory } from "@/lib/data/shop";

export const metadata: Metadata = {
  title: "Product Catalogue — Override-R",
  description:
    "A curated range of sensors, actuators, dampers, controllers and field devices for modern building safety and ventilation systems.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;

  let productsList: Product[] = [...PRODUCTS];
  let categoriesList: ShopCategory[] = [...SHOP_CATEGORIES];

  try {
    const dbProds = db.getProducts({ onlyActive: true });
    if (dbProds && dbProds.length > 0) {
      const mappedDbProds: Product[] = dbProds.map((p) => ({
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

      // Combine DB products with static products that might not be in DB yet (e.g. CNX100, FSCS)
      const existingSlugs = new Set(mappedDbProds.map((p) => p.slug));
      const newStaticProds = PRODUCTS.filter((p) => !existingSlugs.has(p.slug));
      productsList = [...mappedDbProds, ...newStaticProds];
    }

    const dbCats = db.getCategories().filter((c) => c.status === "active");
    if (dbCats && dbCats.length > 0) {
      const mappedDbCats: ShopCategory[] = dbCats.map((c) => ({
        slug: c.slug,
        label: c.label,
        description: c.description || "",
      }));
      const existingCatSlugs = new Set(mappedDbCats.map((c) => c.slug));
      const newStaticCats = SHOP_CATEGORIES.filter((c) => !existingCatSlugs.has(c.slug));
      categoriesList = [...mappedDbCats, ...newStaticCats];
    }
  } catch (err) {
    console.error("Using static fallback for shop page:", err);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      
      {/* 1. Breadcrumb Bar */}
      <div className="border-b border-slate-200/80 bg-slate-50/70 pt-24 pb-3 md:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold">Product Catalogue</span>
          </nav>
        </div>
      </div>

      {/* 2. Shop Hero Section */}
      <section className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left: Text & Feature Strip */}
            <div className="flex flex-col items-start lg:col-span-7">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
                Building Safety Devices
              </span>

              <h1 className="mt-3 font-display text-[clamp(2.5rem,4.5vw,4.2rem)] font-bold tracking-tight text-slate-900 leading-[1.02]">
                PRODUCT<br />
                <span className="text-blue-600">CATALOGUE.</span>
              </h1>

              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-slate-600 md:text-lg">
                A curated range of sensors, actuators, dampers, controllers and field devices for modern building safety and ventilation systems.
              </p>

              {/* Feature Strip */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full border-t border-slate-200 pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 block leading-tight">
                      Project Based<br />Quotations
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 block leading-tight">
                      Genuine Manufacturer<br />Hardware
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 block leading-tight">
                      Technical Support<br />&amp; Commissioning
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Architectural / Industrial Reference Image */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-xs">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src="/images/hero-override-panel.png"
                    alt="Override-R Firefighters' Smoke Control Station and Life-Safety Enclosure"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Life-Safety Equipment Suite</span>
                  <span className="font-mono text-[11px] text-blue-600">Specifier Ready</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Product Catalogue Area (Sidebar & Grid) */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <ShopCatalog
            initialCategory={category}
            productsList={productsList}
            categoriesList={categoriesList}
          />
        </div>
      </section>

      {/* 4. Schedule Submittal CTA */}
      <ClosingCTA
        source="Shop Page"
        title="Send us your device schedule."
        lead="We will return a project-based quotation with torque, stroke time, range and signal selections verified against your engineering specification."
        secondary={{ href: "/systems", label: "EXPLORE OUR SYSTEMS" }}
      />
    </main>
  );
}
