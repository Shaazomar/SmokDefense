"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Layers,
  ArrowRight,
  Eye,
} from "lucide-react";
import type { DbProduct, DbCategory, DbBrand } from "@/lib/db/types";
import { ImageImportModal } from "./ImageImportModal";

interface BulkImportViewProps {
  initialProducts: DbProduct[];
  categories: DbCategory[];
  brands: DbBrand[];
}

export function BulkImportView({ initialProducts, categories, brands }: BulkImportViewProps) {
  const [products, setProducts] = useState<DbProduct[]>(initialProducts);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [activeModalProduct, setActiveModalProduct] = useState<DbProduct | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (statusFilter !== "all") {
      const status = p.importStatus || "NOT_SEARCHED";
      if (statusFilter === "awaiting" && status !== "AWAITING_REVIEW" && status !== "IMAGES_FOUND" && status !== "MANUAL_REQUIRED") {
        return false;
      }
      if (statusFilter === "imported" && status !== "IMPORTED") return false;
      if (statusFilter === "none" && status !== "NOT_SEARCHED" && status !== "NO_MATCH_FOUND") return false;
    }
    return true;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Run Batch Auto-Import for selected products
  const handleRunBatchImport = async (autoApproveHighConfidence: boolean) => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);
    setProgressMsg(`Starting batch import for ${selectedIds.length} products...`);

    try {
      const res = await fetch("/api/admin/scraper/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productIds: selectedIds,
          autoApproveHighConfidence,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProgressMsg(`Batch import completed! Processed ${data.processedCount} products.`);

        // Fetch refreshed products list
        const refreshRes = await fetch("/api/admin/products");
        if (refreshRes.ok) {
          const freshProds = await refreshRes.json();
          setProducts(freshProds);
        }
      }
    } catch {
      setProgressMsg("Error during batch import.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h2 className="font-display font-bold uppercase tracking-tight text-lg text-white">
              Automated Image Import Dashboard
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Search official manufacturer websites, score candidates, and manage high-accuracy image import.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Products</option>
            <option value="awaiting">Awaiting Review / Found</option>
            <option value="imported">Already Imported</option>
            <option value="none">Not Searched / No Match</option>
          </select>

          <button
            onClick={() => handleRunBatchImport(true)}
            disabled={isProcessing || selectedIds.length === 0}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold px-4 py-2 rounded-md transition-colors uppercase tracking-wider flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isProcessing ? "animate-spin" : ""}`} />
            Auto-Import High Confidence ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* PROGRESS MSG */}
      {progressMsg && (
        <div className="p-4 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
          {progressMsg}
        </div>
      )}

      {/* PRODUCT LIST FOR IMAGE REVIEW */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === filteredProducts.length
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Brand / Manufacturer</th>
                <th className="py-3 px-4">Model #</th>
                <th className="py-3 px-4">Import Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((prod) => {
                const isSelected = selectedIds.includes(prod.id);
                const status = prod.importStatus || "NOT_SEARCHED";

                return (
                  <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(prod.id)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-sans font-semibold text-slate-200">{prod.name}</div>
                      <div className="text-[10px] text-slate-500">{prod.slug}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{prod.brandName || "Override-R"}</td>
                    <td className="py-3 px-4 text-slate-300 font-bold">
                      {prod.modelNumber || "—"}
                    </td>
                    <td className="py-3 px-4">
                      {status === "IMPORTED" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" /> Imported ({prod.images?.length || 0} imgs)
                        </span>
                      )}
                      {(status === "AWAITING_REVIEW" || status === "IMAGES_FOUND") && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <AlertTriangle className="h-3 w-3" /> Images Found
                        </span>
                      )}
                      {status === "NOT_SEARCHED" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-slate-400 border border-slate-700">
                          Not Searched
                        </span>
                      )}
                      {(status === "NO_MATCH_FOUND" || status === "MANUAL_REQUIRED") && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Manual Required
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveModalProduct(prod)}
                        className="px-3 py-1.5 rounded text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Review Images
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SINGLE PRODUCT REVIEW MODAL */}
      {activeModalProduct && (
        <ImageImportModal
          product={activeModalProduct}
          isOpen={Boolean(activeModalProduct)}
          onClose={() => setActiveModalProduct(null)}
          onSuccess={(updated) => {
            setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          }}
        />
      )}
    </div>
  );
}
