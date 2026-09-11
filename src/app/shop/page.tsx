import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { PRODUCTS, SHOP_CATEGORIES } from "@/lib/data/shop";

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
            {PRODUCTS.length} products / {SHOP_CATEGORIES.length} categories
          </span>
        }
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ShopCatalog initialCategory={category} />
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
