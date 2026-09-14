"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  FileText,
  Layers,
  DollarSign,
  Boxes,
  Image as ImageIcon,
  Search,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { DbProduct, DbCategory, DbBrand, GlyphKind } from "@/lib/db/types";
import { ImageImportModal } from "./ImageImportModal";

interface ProductFormProps {
  initialProduct?: DbProduct;
  categories: DbCategory[];
  brands: DbBrand[];
  isEdit?: boolean;
}

export function ProductForm({ initialProduct, categories, brands, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "general" | "pricing" | "specs" | "media" | "documents" | "seo"
  >("general");

  const [formData, setFormData] = useState<Partial<DbProduct>>(
    initialProduct || {
      name: "",
      slug: "",
      category: categories[0]?.slug || "sensors",
      brandId: brands[0]?.id || "brand-1",
      brandName: brands[0]?.name || "SmokeDefense",
      glyph: "sensor",
      short: "",
      description: "",
      modelNumber: "",
      manufacturer: "",
      status: "active",
      isFeatured: false,
      price: undefined,
      compareAtPrice: undefined,
      stock: 10,
      lowStockThreshold: 5,
      specs: [
        { label: "Measurement", value: "" },
        { label: "Output", value: "" },
        { label: "Supply", value: "24 V AC/DC" },
      ],
      applications: ["Commercial Buildings", "HVAC Systems"],
      systems: ["ventilation-system"],
      dimensions: "",
      weight: "",
      material: "",
      warranty: "",
      mainImage: "",
      images: [],
      documents: [],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    }
  );

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const glyphOptions: { label: string; value: GlyphKind }[] = [
    { label: "Sensor", value: "sensor" },
    { label: "Actuator", value: "actuator" },
    { label: "Damper", value: "damper" },
    { label: "Controller", value: "controller" },
    { label: "Gateway", value: "gateway text-cyan-400" as GlyphKind },
    { label: "Window Actuator", value: "window" },
    { label: "Fan", value: "fan" },
  ];

  // Spec Row Handlers
  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...(prev.specs || []), { label: "", value: "" }],
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", val: string) => {
    setFormData((prev) => {
      const updatedSpecs = [...(prev.specs || [])];
      updatedSpecs[index] = { ...updatedSpecs[index], [field]: val };
      return { ...prev, specs: updatedSpecs };
    });
  };

  const handleRemoveSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: (prev.specs || []).filter((_, i) => i !== index),
    }));
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        const { url } = await res.json();
        setFormData((prev) => ({
          ...prev,
          mainImage: prev.mainImage ? prev.mainImage : url,
          images: [...(prev.images || []), url],
        }));
      }
    } catch {
      setErrorMsg("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  // Document Add Handler
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        const { url, name } = await res.json();
        setFormData((prev) => ({
          ...prev,
          documents: [
            ...(prev.documents || []),
            { id: `doc-${Date.now()}`, name, url, type: "datasheet" },
          ],
        }));
      }
    } catch {
      setErrorMsg("Failed to upload document.");
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      setErrorMsg("Product name is required.");
      setActiveTab("general");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const endpoint = isEdit ? `/api/admin/products/${initialProduct?.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const saved = await res.json();
        setSuccessMsg(`Product "${saved.name}" saved successfully!`);
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1200);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to save product.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {/* HEADER & TOP ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="font-display font-bold uppercase tracking-tight text-base text-white">
              {isEdit ? `Edit: ${initialProduct?.name}` : "Create New Product"}
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Fill in technical specs, inventory details, images, and commercial information.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-4 py-2 text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-sm"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>

      {/* ERROR / SUCCESS ALERTS */}
      {errorMsg && (
        <div className="p-4 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {successMsg}
        </div>
      )}

      {/* FORM NAVIGATION TABS */}
      <div className="flex flex-wrap items-center border-b border-slate-800 gap-1 bg-[#12151a] p-1 rounded-lg">
        {[
          { key: "general", label: "General Info", icon: Layers },
          { key: "pricing", label: "Pricing & Stock", icon: DollarSign },
          { key: "specs", label: "Technical Specs", icon: Boxes },
          { key: "media", label: "Images", icon: ImageIcon },
          { key: "documents", label: "Documents", icon: FileText },
          { key: "seo", label: "SEO", icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded.md text-xs font-mono font-medium transition-colors ${
                isActive
                  ? "bg-slate-800 text-amber-400 font-bold border border-slate-700 shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div className="bg-[#12151a] border border-slate-800 rounded-lg p-6 space-y-6">
        {/* 1. GENERAL TAB */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      name,
                      slug: isEdit
                        ? prev.slug
                        : name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                    }));
                  }}
                  placeholder="e.g. Belimo Rotary Damper Actuator"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. belimo-rotary-damper-actuator"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  value={formData.category || categories[0]?.slug}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Brand *
                </label>
                <select
                  value={formData.brandId || brands[0]?.id}
                  onChange={(e) => {
                    const b = brands.find((brand) => brand.id === e.target.value);
                    setFormData({
                      ...formData,
                      brandId: e.target.value,
                      brandName: b?.name,
                    });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} {b.isOwnBrand ? "(In-House)" : "(3rd Party)"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Display Icon / Glyph
                </label>
                <select
                  value={formData.glyph || "sensor"}
                  onChange={(e) => setFormData({ ...formData, glyph: e.target.value as GlyphKind })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono capitalize"
                >
                  {glyphOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Short Summary / Lead
              </label>
              <input
                type="text"
                value={formData.short || ""}
                onChange={(e) => setFormData({ ...formData, short: e.target.value })}
                placeholder="One sentence summary for catalogue cards..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Full Description
              </label>
              <textarea
                rows={4}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed technical description of application, operation, and specification..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Model Number / SKU
                </label>
                <input
                  type="text"
                  value={formData.modelNumber || ""}
                  onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                  placeholder="e.g. BF24-ST"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Manufacturer Name
                </label>
                <input
                  type="text"
                  value={formData.manufacturer || ""}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="e.g. Belimo Automation AG"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.status === "active"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.checked ? "active" : "draft" })
                  }
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                />
                Active Status (Visible in Shop)
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isFeatured)}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                />
                Featured Product
              </label>
            </div>
          </div>
        )}

        {/* 2. PRICING & STOCK TAB */}
        {activeTab === "pricing" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Standard Price (USD / Local)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price !== undefined ? formData.price : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  placeholder="Optional — Leave empty for Request Quote"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Compare-At Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.compareAtPrice !== undefined ? formData.compareAtPrice : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compareAtPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  placeholder="Original price before discount"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-800">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock !== undefined ? formData.stock : 0}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  placeholder="25"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  value={formData.lowStockThreshold !== undefined ? formData.lowStockThreshold : 5}
                  onChange={(e) =>
                    setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 5 })
                  }
                  placeholder="5"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. TECHNICAL SPECS TAB */}
        {activeTab === "specs" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                  Dynamic Specification Table
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Add technical parameters like Voltage, Airflow, Torque, Protection Rating, etc.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="px-3 py-1.5 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-amber-400 rounded transition-colors flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Parameter Row
              </button>
            </div>

            <div className="space-y-3">
              {(formData.specs || []).map((spec, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(index, "label", e.target.value)}
                    placeholder="Parameter (e.g. Measurement / Torque)"
                    className="w-1/3 bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    placeholder="Value (e.g. NDIR 0-2000 ppm / 24 V AC/DC)"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(index)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. MEDIA & IMAGES TAB */}
        {activeTab === "media" && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-slate-200">
                  Automated Official Image Import
                </h4>
                <p className="text-[11px] font-sans text-slate-400">
                  Extract high-resolution product imagery from official manufacturer site.
                </p>
              </div>

              {initialProduct ? (
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                >
                  <Sparkles className="h-4 w-4" />
                  Import from Manufacturer
                </button>
              ) : (
                <span className="text-[11px] font-mono text-slate-500">
                  Save product first to enable official image import
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Upload New Image File
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 px-4 py-2 rounded-md text-xs font-mono flex items-center gap-2 transition-colors">
                  <Upload className="h-4 w-4 text-amber-400" />
                  {isUploading ? "Uploading..." : "Choose Local File & Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  PNG, JPG, SVG, WebP supported
                </span>
              </div>
            </div>

            {/* Main Image Path */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Main Product Image URL / Path
              </label>
              <input
                type="text"
                value={formData.mainImage || ""}
                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                placeholder="/uploads/my-product.png or https://..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Gallery Preview */}
            {(formData.images || []).length > 0 && (
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Image Gallery
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(formData.images || []).map((img, i) => (
                    <div key={i} className="relative group border border-slate-800 rounded-md overflow-hidden bg-slate-900 p-2">
                      <img src={img} alt={`Product ${i}`} className="h-24 w-full object-contain" />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            images: (prev.images || []).filter((_, idx) => idx !== i),
                          }))
                        }
                        className="absolute top-1 right-1 p-1 bg-rose-500 text-slate-950 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Upload Product PDF Datasheet / Manual
              </label>
              <label className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 px-4 py-2 rounded-md text-xs font-mono inline-flex items-center gap-2 transition-colors">
                <Upload className="h-4 w-4 text-amber-400" />
                {isUploading ? "Uploading PDF..." : "Upload Technical PDF"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleDocumentUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              {(formData.documents || []).map((doc, idx) => (
                <div
                  key={doc.id || idx}
                  className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-200">{doc.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        documents: (prev.documents || []).filter((_, i) => i !== idx),
                      }))
                    }
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SEO TAB */}
        {activeTab === "seo" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.seoTitle || ""}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Title tag for search engines..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.seoDescription || ""}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Meta description snippet for search engines..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
