import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BrandList } from "@/components/admin/BrandList";

export default async function AdminBrandsPage() {
  const admin = await getCurrentAdmin();
  const brands = db.getBrands();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <BrandList initialBrands={brands} />
    </AdminLayout>
  );
}
