import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductList } from "@/components/admin/ProductList";

export default async function AdminProductsPage() {
  const admin = await getCurrentAdmin();
  const products = db.getProducts();
  const categories = db.getCategories();
  const brands = db.getBrands();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <ProductList initialProducts={products} categories={categories} brands={brands} />
    </AdminLayout>
  );
}
