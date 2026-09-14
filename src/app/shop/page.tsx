import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { db } from "@/lib/db/store";
import { PRODUCTS, SHOP_CATEGORIES, Product, ShopCategory } from "@/lib/data/shop";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "B2B catalogue of sensors, actuators, dampers, controllers and field devices for ventilation, pressurization and fire/smoke control systems.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;

  let productsList: Product[] = PRODUCTS;
  let categoriesList: ShopCategory[] = SHOP_CATEGORIES;

  try {
    const dbProds = db.getProducts({ onlyActive: true });
    if (dbProds && dbProds.length > 0) {
      productsList = dbProds.map((p) => ({
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

    const dbCats = db.getCategories().filter((c) => c.status === "active");
    if (dbCats && dbCats.length > 0) {
      categoriesList = dbCats.map((c) => ({
        slug: c.slug,
        label: c.label,
        description: c.description || "",
      }));
    }
  } catch (err) {
    console.error("Using static fallback for shop page:", err);
  }

  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="Shop"
        title="Product catalogue."
        lead="A B2B catalogue of the devices we specify, supply and commission. Every item is quoted against the project requirement rather than sold off the shelf."
        crumbs={[{ label: "Shop" }]}
        actions={
          <>
            <CallForDemo source="Shop Page" label="Request Quote" variant="primary" />
            <CallForDemo source="Shop Page Demo" variant="secondary" />
          </>
        }
        meta={
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint lg:text-right">
            {productsList.length} products / {categoriesList.length} categories
          </span>
        }
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ShopCatalog
            initialCategory={category}
            productsList={productsList}
            categoriesList={categoriesList}
          />
        </div>
      </section>

      <ClosingCTA
        source="Shop Page"
        title="Send us your device schedule."
        lead="We will return a quotation with torque, range and signal selections checked against the application."
        secondary={{ href: "/systems/field-devices", label: "Field Devices" }}
      />
    </main>
  );
}
