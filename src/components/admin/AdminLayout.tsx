"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  Boxes,
  Settings,
  LogOut,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight,
  User,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  userName?: string;
}

export function AdminLayout({ children, userEmail = "admin@override-r.com", userName = "Admin" }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Brands", href: "/admin/brands", icon: Tag },
    { label: "Inventory", href: "/admin/inventory", icon: Boxes },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/products/new")) return "Add New Product";
    if (pathname.startsWith("/admin/products/")) return "Edit Product";
    if (pathname.startsWith("/admin/products")) return "Product Catalogue";
    if (pathname.startsWith("/admin/categories")) return "Product Categories";
    if (pathname.startsWith("/admin/brands")) return "Brand Management";
    if (pathname.startsWith("/admin/inventory")) return "Inventory Management";
    if (pathname.startsWith("/admin/settings")) return "Admin Settings";
    return "Admin Panel";
  };

  return (
    <div className="flex min-h-screen bg-[#0d0f12] text-slate-100 font-sans">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 shrink-0 border-r border-slate-800 bg-[#12151a] flex flex-col justify-between">
        <div>
          {/* Logo & Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex flex-col gap-1.5">
              <div className="bg-white rounded px-2.5 py-1 inline-flex items-center w-fit shadow-xs">
                <Image
                  src="/logo.png"
                  alt="Override-R"
                  width={2172}
                  height={724}
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400/90 font-semibold">
                Admin Console
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                  {item.label}
                  {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-amber-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            href="/shop"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-800/40 font-mono transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
              Public Shop
            </span>
            <span className="text-[10px] text-slate-500">Live ↗</span>
          </Link>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 text-xs font-semibold">
                <User className="h-3.5 w-3.5" />
              </div>
              <div className="truncate">
                <div className="text-xs font-medium text-slate-200 truncate">{userName}</div>
                <div className="text-[10px] text-slate-500 truncate">{userEmail}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-16 border-b border-slate-800 bg-[#12151a]/60 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold uppercase tracking-tight text-lg text-white">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 mt-0.5">
              <span>Admin</span>
              <span>/</span>
              <span className="text-slate-300 capitalize">{pathname.split("/")[2] || "Dashboard"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Global search..."
                className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 font-mono"
              />
            </div>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <Link
              href="/admin/products/new"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wide uppercase transition-colors flex items-center gap-1.5 shadow-sm"
            >
              + Add Product
            </Link>
          </div>
        </header>

        {/* BODY CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
