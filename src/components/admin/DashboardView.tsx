"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Layers,
  Tag,
  ArrowUpRight,
  Plus,
  RefreshCw,
} from "lucide-react";
import type { DashboardStats, DbProduct } from "@/lib/db/types";

interface DashboardViewProps {
  stats: DashboardStats;
}

export function DashboardView({ stats }: DashboardViewProps) {
  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Active Products",
      value: stats.activeProducts,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Low Stock Items",
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStockProducts,
      icon: XCircle,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: Layers,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Brands",
      value: stats.totalBrands,
      icon: Tag,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-5 rounded-lg border bg-[#12151a] flex flex-col justify-between ${stat.bg}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  {stat.label}
                </span>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="mt-4 font-mono font-bold text-2xl text-white tracking-tight">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS & RECENT PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* RECENT PRODUCTS TABLE */}
        <div className="lg:col-span-8 bg-[#12151a] border border-slate-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-display font-bold uppercase tracking-tight text-sm text-white">
                Recent Catalogue Items
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Latest products in the database
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
            >
              View All Catalogue →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Brand</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {stats.recentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-white hover:text-amber-400 font-sans font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        {product.name}
                      </Link>
                      <div className="text-[10px] text-slate-500 font-mono">{product.slug}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 capitalize">{product.category}</td>
                    <td className="py-3 px-3 text-slate-400">{product.brandName || "SmokeDefense"}</td>
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          product.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK SHORTCUTS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#12151a] border border-slate-800 rounded-lg p-6 space-y-4">
            <h2 className="font-display font-bold uppercase tracking-tight text-sm text-white border-b border-slate-800 pb-3">
              Admin Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/products/new"
                className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:border-amber-500/40 hover:bg-slate-800/80 transition-colors font-mono"
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-amber-400" />
                  Add New Product
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:border-amber-500/40 hover:bg-slate-800/80 transition-colors font-mono"
              >
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  Manage Categories
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/brands"
                className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:border-amber-500/40 hover:bg-slate-800/80 transition-colors font-mono"
              >
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-cyan-400" />
                  Manage Brands
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/inventory"
                className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:border-amber-500/40 hover:bg-slate-800/80 transition-colors font-mono"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-400" />
                  Update Inventory Stock
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
              </Link>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
              System Notice
            </h3>
            <p className="mt-2 text-xs font-sans leading-relaxed text-slate-300">
              The public shop (`/shop`) automatically renders active products, categories, and brands managed in this panel. Deactivated items are hidden from public view in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
