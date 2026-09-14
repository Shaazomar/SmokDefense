import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardView } from "@/components/admin/DashboardView";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  const stats = db.getDashboardStats();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <DashboardView stats={stats} />
    </AdminLayout>
  );
}
