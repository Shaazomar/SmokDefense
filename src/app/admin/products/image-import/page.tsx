import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BulkImportView } from "@/components/admin/BulkImportView";

export default async function AdminImageImportPage() {
  const admin = await getCurrentAdmin();
  const products = db.getProducts();
  const categories = db.getCategories();
  const brands = db.getBrands();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <BulkImportView initialProducts={products} categories={categories} brands={brands} />
    </AdminLayout>
  );
}
