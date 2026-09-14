import { notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductForm } from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const admin = await getCurrentAdmin();
  const product = db.getProductById(id);

  if (!product) {
    notFound();
  }

  const categories = db.getCategories();
  const brands = db.getBrands();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <ProductForm initialProduct={product} categories={categories} brands={brands} isEdit={true} />
    </AdminLayout>
  );
}
