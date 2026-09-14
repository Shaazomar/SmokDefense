import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CategoryList } from "@/components/admin/CategoryList";

export default async function AdminCategoriesPage() {
  const admin = await getCurrentAdmin();
  const categories = db.getCategories();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <CategoryList initialCategories={categories} />
    </AdminLayout>
  );
}
