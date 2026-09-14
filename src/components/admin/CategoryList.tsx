"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Layers, CheckCircle2, AlertCircle } from "lucide-react";
import type { DbCategory } from "@/lib/db/types";

interface CategoryListProps {
  initialCategories: DbCategory[];
}

export function CategoryList({ initialCategories }: CategoryListProps) {
  const [categories, setCategories] = useState<DbCategory[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<DbCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    slug: "",
    description: "",
    status: "active" as "active" | "disabled",
  });

  const [deleteTarget, setDeleteTarget] = useState<DbCategory | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenModal = (category?: DbCategory) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        label: category.label,
        slug: category.slug,
        description: category.description,
        status: category.status,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        label: "",
        slug: "",
        description: "",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label.trim()) return;

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingCategory);
      const res = await fetch("/api/admin/categories", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEdit ? { id: editingCategory?.id } : {}),
          ...formData,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setCategories((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
          showToast(`Updated category "${saved.label}"`);
        } else {
          setCategories((prev) => [...prev, saved]);
          showToast(`Created category "${saved.label}"`);
        }
        setIsModalOpen(false);
      }
    } catch {
      showToast("Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        showToast(`Category "${deleteTarget.label}" deleted`);
        setDeleteTarget(null);
      }
    } catch {
      showToast("Failed to delete category");
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
            Category Management
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Organize products into hierarchical categories for shop filtering.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#12151a] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  <h3 className="font-sans font-bold text-slate-100 text-sm">{cat.label}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                    cat.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {cat.status}
                </span>
              </div>
              <p className="mt-2 text-xs font-sans text-slate-400 leading-relaxed">
                {cat.description || "No description provided."}
              </p>
              <div className="mt-3 font-mono text-[10px] text-slate-500">
                Slug: <code className="text-slate-300">{cat.slug}</code>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => handleOpenModal(cat)}
                className="px-3 py-1.5 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors flex items-center gap-1"
              >
                <Edit className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => setDeleteTarget(cat)}
                className="px-3 py-1.5 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors flex items-center gap-1"
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
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Category Label *
              </label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    label: e.target.value,
                    slug: editingCategory
                      ? formData.slug
                      : e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  })
                }
                placeholder="e.g. Smoke Control Dampers"
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Category Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. smoke-control-dampers"
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
                placeholder="Short description for public catalogue..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500/50"
              />
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
                {isSaving ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
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
                Delete Category
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Delete category <strong className="text-white">"{deleteTarget.label}"</strong>? Products in this category will remain, but will need to be reassigned.
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
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
