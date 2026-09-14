"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Tag, AlertCircle } from "lucide-react";
import type { DbBrand } from "@/lib/db/types";

interface BrandListProps {
  initialBrands: DbBrand[];
}

export function BrandList({ initialBrands }: BrandListProps) {
  const [brands, setBrands] = useState<DbBrand[]>(initialBrands);
  const [editingBrand, setEditingBrand] = useState<DbBrand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isOwnBrand: false,
    status: "active" as "active" | "disabled",
  });

  const [deleteTarget, setDeleteTarget] = useState<DbBrand | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenModal = (brand?: DbBrand) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        slug: brand.slug,
        description: brand.description || "",
        isOwnBrand: brand.isOwnBrand,
        status: brand.status,
      });
    } else {
      setEditingBrand(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        isOwnBrand: false,
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingBrand);
      const res = await fetch("/api/admin/brands", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEdit ? { id: editingBrand?.id } : {}),
          ...formData,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setBrands((prev) => prev.map((b) => (b.id === saved.id ? saved : b)));
          showToast(`Updated brand "${saved.name}"`);
        } else {
          setBrands((prev) => [...prev, saved]);
          showToast(`Added brand "${saved.name}"`);
        }
        setIsModalOpen(false);
      }
    } catch {
      showToast("Failed to save brand");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/brands?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBrands((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        showToast(`Brand "${deleteTarget.name}" deleted`);
        setDeleteTarget(null);
      }
    } catch {
      showToast("Failed to delete brand");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-mono text-xs px-4 py-3 rounded-md shadow-lg font-semibold">
          {toastMsg}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display font-bold uppercase tracking-tight text-base text-white">
            Brand Management
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Manage SmokeDefense products and third-party manufacturers (Belimo, Siemens, Schneider, Honeywell, etc.).
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Brand
        </button>
      </div>

      {/* BRAND GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-[#12151a] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-sans font-bold text-slate-100 text-sm">{brand.name}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                    brand.isOwnBrand
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  }`}
                >
                  {brand.isOwnBrand ? "In-House" : "3rd Party"}
                </span>
              </div>
              <p className="mt-2 text-xs font-sans text-slate-400 leading-relaxed">
                {brand.description || "No description provided."}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => handleOpenModal(brand)}
                className="px-3 py-1.5 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Edit className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => setDeleteTarget(brand)}
                className="px-3 py-1.5 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#12151a] border border-slate-800 rounded-lg p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95"
          >
            <h3 className="font-display font-bold uppercase tracking-tight text-base text-white border-b border-slate-800 pb-3">
              {editingBrand ? "Edit Brand" : "Add New Brand"}
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: editingBrand
                      ? formData.slug
                      : e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  })
                }
                placeholder="e.g. Belimo"
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Brand Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. belimo"
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Manufacturer description..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isOwnBrand}
                  onChange={(e) => setFormData({ ...formData, isOwnBrand: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                />
                In-House SmokeDefense Brand
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 rounded text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                {isSaving ? "Saving..." : editingBrand ? "Update Brand" : "Add Brand"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151a] border border-slate-800 rounded-lg p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3 className="font-display font-bold uppercase tracking-tight text-base text-white">
                Delete Brand
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Delete brand <strong className="text-white">"{deleteTarget.name}"</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded text-xs font-mono font-bold bg-rose-500 hover:bg-rose-400 text-slate-950 transition-colors"
              >
                Delete Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
