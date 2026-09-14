import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InventoryView } from "@/components/admin/InventoryView";

export default async function AdminInventoryPage() {
  const admin = await getCurrentAdmin();
  const products = db.getProducts();

  const inventoryItems = products.map((p) => {
    let stockStatus: "in_stock" | "low_stock" | "out_of_stock" = "in_stock";
    if (p.stock <= 0) stockStatus = "out_of_stock";
    else if (p.stock <= (p.lowStockThreshold || 5)) stockStatus = "low_stock";

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      brandName: p.brandName,
      stock: p.stock,
      lowStockThreshold: p.lowStockThreshold || 5,
      stockStatus,
      status: p.status,
    };
  });

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <InventoryView initialItems={inventoryItems} />
    </AdminLayout>
  );
}
