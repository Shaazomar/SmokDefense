"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import type { DbProduct, DbCategory, DbBrand } from "@/lib/db/types";

interface ProductListProps {
  initialProducts: DbProduct[];
  categories: DbCategory[];
  brands: DbBrand[];
}

export function ProductList({ initialProducts, categories, brands }: ProductListProps) {
  const router = useRouter();
  const [products, setProducts] = useState<DbProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const [deleteTarget, setDeleteTarget] = useState<DbProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
    if (brandFilter !== "all" && product.brandId !== brandFilter) return false;
    if (statusFilter !== "all" && product.status !== statusFilter) return false;
    if (stockFilter === "low" && product.stock > (product.lowStockThreshold || 5)) return false;
    if (stockFilter === "out" && product.stock > 0) return false;
    if (stockFilter === "in" && product.stock <= 0) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q) ||
        (product.short && product.short.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Toggle active status
  const handleToggleStatus = async (product: DbProduct) => {
    const newStatus = product.status === "active" ? "draft" : "active";
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
        );
        showToast(`Product "${product.name}" set to ${newStatus}`);
      }
    } catch {
      showToast("Failed to update status");
    }
  };

  // Toggle featured
  const handleToggleFeatured = async (product: DbProduct) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isFeatured: !product.isFeatured } : p))
        );
        showToast(`Updated featured status for "${product.name}"`);
      }
    } catch {
      showToast("Failed to update featured status");
    }
  };

  // Duplicate product
  const handleDuplicate = async (product: DbProduct) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "duplicate" }),
      });
      if (res.ok) {
        const duplicated = await res.json();
        setProducts((prev) => [duplicated, ...prev]);
        showToast(`Duplicated "${product.name}"`);
      }
    } catch {
      showToast("Failed to duplicate product");
    }
  };

  // Delete product
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        showToast(`Product "${deleteTarget.name}" deleted successfully`);
        setDeleteTarget(null);
      }
    } catch {
      showToast("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 font-mono text-xs px-4 py-3 rounded-md shadow-lg font-semibold animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      {/* TOOLBAR */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name, slug, description..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Brand Dropdown */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Stock Dropdown */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>

          {/* Add Product Button */}
          <Link
            href="/admin/products/new"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                    No products found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Product Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-amber-400 uppercase font-bold">
                          {product.glyph ? product.glyph.slice(0, 3) : "PRO"}
                        </div>
                        <div>
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="font-sans font-semibold text-slate-200 hover:text-amber-400 text-xs transition-colors"
                          >
                            {product.name}
                          </Link>
                          <div className="text-[10px] text-slate-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-slate-400 capitalize">{product.category}</td>

                    {/* Brand */}
                    <td className="py-3 px-4 text-slate-400">{product.brandName || "Override-R"}</td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          product.stock <= 0
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : product.stock <= (product.lowStockThreshold || 5)
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(product)}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors ${
                          product.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {product.status === "active" ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                        {product.status}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleFeatured(product)}
                        className={`p-1.5 rounded transition-colors ${
                          product.isFeatured
                            ? "text-amber-400 bg-amber-500/10"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                        title={product.isFeatured ? "Featured" : "Not featured"}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/shop/${product.slug}`}
                          target="_blank"
                          title="View on Public Site"
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}`}
                          title="Edit Product"
                          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(product)}
                          title="Duplicate Product"
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          title="Delete Product"
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151a] border border-slate-800 rounded-lg p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3 className="font-display font-bold uppercase tracking-tight text-base text-white">
                Confirm Product Deletion
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Are you sure you want to delete <strong className="text-white">"{deleteTarget.name}"</strong>? This action cannot be undone and will remove the item permanently from the database and public catalogue.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded text-xs font-mono font-bold bg-rose-500 hover:bg-rose-400 text-slate-950 transition-colors flex items-center gap-1.5"
              >
                {isDeleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
