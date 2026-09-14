"use client";

import React, { useState } from "react";
import { Search, Save, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  brandName?: string;
  stock: number;
  lowStockThreshold: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  status: string;
}

interface InventoryViewProps {
  initialItems: InventoryItem[];
}

export function InventoryView({ initialItems }: InventoryViewProps) {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleStockChange = (id: string, newStock: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        let stockStatus: InventoryItem["stockStatus"] = "in_stock";
        if (newStock <= 0) stockStatus = "out_of_stock";
        else if (newStock <= item.lowStockThreshold) stockStatus = "low_stock";

        return { ...item, stock: newStock, stockStatus };
      })
    );
  };

  const handleSaveStock = async (item: InventoryItem) => {
    setSavingId(item.id);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, stock: item.stock }),
      });
      if (res.ok) {
        showToast(`Stock updated for "${item.name}"`);
      }
    } catch {
      showToast("Failed to update stock");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-mono text-xs px-4 py-3 rounded-md shadow-lg font-semibold">
          {toastMsg}
        </div>
      )}

      {/* HEADER & SEARCH */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold uppercase tracking-tight text-base text-white">
            Inventory & Stock Management
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Monitor physical device inventory levels and update availability.
          </p>
        </div>

        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory items..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4 text-right">Quick Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-sans font-semibold text-slate-200">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.slug}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{item.brandName || "Override-R"}</td>
                  <td className="py-3 px-4">
                    {item.stockStatus === "out_of_stock" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="h-3 w-3" /> Out of Stock
                      </span>
                    )}
                    {item.stockStatus === "low_stock" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertTriangle className="h-3 w-3" /> Low Stock
                      </span>
                    )}
                    {item.stockStatus === "in_stock" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" /> In Stock
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) => handleStockChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-24 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-amber-500/50"
                    />
                  </td>
                  <td className="py-3 px-4 text-slate-500">{item.lowStockThreshold} units</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleSaveStock(item)}
                      disabled={savingId === item.id}
                      className="px-3 py-1 rounded text-xs font-mono font-bold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors inline-flex items-center gap-1"
                    >
                      <Save className="h-3 w-3" />
                      {savingId === item.id ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
