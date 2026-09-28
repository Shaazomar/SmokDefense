import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/session";
import { startupDriveStore } from "@/lib/db/startupDriveStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StartupDriveApplicationsList } from "@/components/admin/StartupDriveApplicationsList";

export default async function AdminStartupDrivePage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const submissions = startupDriveStore.getAllSubmissions();

  return (
    <AdminLayout userEmail={admin.email} userName={admin.name}>
      <StartupDriveApplicationsList submissions={submissions} />
    </AdminLayout>
  );
}
