import { getCurrentAdmin } from "@/lib/auth/session";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();

  return (
    <AdminLayout userEmail={admin?.email} userName={admin?.name}>
      <div className="max-w-3xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="font-display font-bold uppercase tracking-tight text-base text-white">
            System & Admin Settings
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Configure system defaults and database parameters.
          </p>
        </div>

        <div className="bg-[#12151a] border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
            Database Information
          </h3>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-500">Storage Engine:</span>
              <span>JSON File Persistence Engine (`data/smokedefense.json`)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-500">Public Catalogue Integration:</span>
              <span className="text-emerald-400 font-bold">Active & Synchronized</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Admin Account:</span>
              <span>{admin?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
