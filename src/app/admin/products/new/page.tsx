import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminNewProductPage() {
  const admin = await getCurrentAdmin();
  const categories = db.getCategories();
  const brands = db.getBrands();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <ProductForm categories={categories} brands={brands} isEdit={false} />
    </AdminLayout>
  );
}
