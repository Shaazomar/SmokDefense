import fs from "node:fs";
import path from "node:path";
import { PRODUCTS, SHOP_CATEGORIES } from "@/lib/data/shop";
import type { DbData, DbProduct, DbCategory, DbBrand, DbUser, DashboardStats, DbProductImage } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "override-r.json");

export const DEFAULT_ADMIN_EMAIL = "admin@override-r.com";
export const DEFAULT_ADMIN_PASS = "admin123";

import crypto from "node:crypto";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "override_r_salt_2026").digest("hex");
}

function getInitialSeedData(): DbData {
  const defaultUser: DbUser = {
    id: "user-admin-1",
    email: DEFAULT_ADMIN_EMAIL,
    name: "System Administrator",
    passwordHash: hashPassword(DEFAULT_ADMIN_PASS),
    createdAt: new Date().toISOString(),
  };

  const categories: DbCategory[] = SHOP_CATEGORIES.map((cat, index) => ({
    id: `cat-${index + 1}`,
    slug: cat.slug,
    label: cat.label,
    description: cat.description,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const brands: DbBrand[] = [
    {
      id: "brand-1",
      slug: "override-r",
      name: "Override-R",
      officialDomain: "override-r.com",
      allowedDomains: ["override-r.com"],
      description: "In-house specialized smoke control and ventilation components.",
      isOwnBrand: true,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "brand-2",
      slug: "belimo",
      name: "Belimo",
      officialDomain: "belimo.com",
      allowedDomains: ["belimo.com", "belimo.us", "belimo.eu", "belimo.co.uk"],
      description: "Global leader in damper actuators, control valves and sensors.",
      isOwnBrand: false,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "brand-3",
      slug: "siemens",
      name: "Siemens",
      officialDomain: "siemens.com",
      allowedDomains: ["siemens.com", "buildingtechnologies.siemens.com"],
      description: "Building automation and HVAC control solutions.",
      isOwnBrand: false,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const products: DbProduct[] = PRODUCTS.map((prod, index) => {
    const isBelimo = prod.name.toLowerCase().includes("belimo");
    const brand = isBelimo ? brands[1] : brands[0];

    // Infer model numbers for seed items
    let modelNumber = "";
    if (prod.slug === "belimo-rotary-damper-actuator") modelNumber = "LMV-D3-MP";
    else if (prod.slug === "belimo-control-valve-actuator") modelNumber = "LR24A-SR";
    else if (prod.slug === "co2-sensor-room") modelNumber = "SD-CO2-R";
    else if (prod.slug === "co2-sensor-duct") modelNumber = "SD-CO2-D";

    return {
      id: `prod-${index + 1}`,
      slug: prod.slug,
      name: prod.name,
      category: prod.category,
      brandId: brand.id,
      brandName: brand.name,
      glyph: prod.glyph,
      short: prod.short,
      description: prod.description,
      modelNumber,
      manufacturer: brand.name,
      status: "active",
      importStatus: "NOT_SEARCHED",
      isFeatured: index < 4,
      stock: 25,
      lowStockThreshold: 5,
      specs: prod.specs,
      applications: prod.applications,
      systems: prod.systems,
      images: [],
      imageDetails: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  return {
    categories,
    brands,
    products,
    users: [defaultUser],
  };
}

function ensureDataFile(): DbData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialData = getInitialSeedData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }

    const content = fs.readFileSync(DB_FILE, "utf-8");
    const data = JSON.parse(content) as DbData;
    return data;
  } catch (error) {
    console.error("Error reading db file, returning seed data:", error);
    return getInitialSeedData();
  }
}

function saveDataFile(data: DbData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (error) {
    console.error("Failed to save database file:", error);
    throw new Error("Database write error");
  }
}

export const db = {
  getRawData(): DbData {
    return ensureDataFile();
  },

  // --- PRODUCTS ---
  getProducts(options?: {
    category?: string;
    brandId?: string;
    status?: string;
    importStatus?: string;
    search?: string;
    onlyActive?: boolean;
  }): DbProduct[] {
    const data = ensureDataFile();
    let result = data.products;

    if (options?.onlyActive) {
      result = result.filter((p) => p.status === "active");
    }

    if (options?.status && options.status !== "all") {
      result = result.filter((p) => p.status === options.status);
    }

    if (options?.importStatus && options.importStatus !== "all") {
      result = result.filter((p) => (p.importStatus || "NOT_SEARCHED") === options.importStatus);
    }

    if (options?.category && options.category !== "all") {
      result = result.filter((p) => p.category === options.category);
    }

    if (options?.brandId && options.brandId !== "all") {
      result = result.filter((p) => p.brandId === options.brandId);
    }

    if (options?.search) {
      const q = options.search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.modelNumber && p.modelNumber.toLowerCase().includes(q))
      );
    }

    return result;
  },

  getProductBySlug(slug: string): DbProduct | undefined {
    const data = ensureDataFile();
    return data.products.find((p) => p.slug === slug);
  },

  getProductById(id: string): DbProduct | undefined {
    const data = ensureDataFile();
    return data.products.find((p) => p.id === id);
  },

  createProduct(input: Omit<DbProduct, "id" | "createdAt" | "updatedAt">): DbProduct {
    const data = ensureDataFile();
    
    let slug = input.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!slug) slug = `product-${Date.now()}`;
    
    let counter = 1;
    let finalSlug = slug;
    while (data.products.some((p) => p.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const brand = data.brands.find((b) => b.id === input.brandId);

    const newProduct: DbProduct = {
      ...input,
      id: `prod-${Date.now()}`,
      slug: finalSlug,
      brandName: brand?.name || input.brandName || "Override-R",
      importStatus: input.importStatus || "NOT_SEARCHED",
      imageDetails: input.imageDetails || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.products.unshift(newProduct);
    saveDataFile(data);
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<DbProduct>): DbProduct | null {
    const data = ensureDataFile();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = data.products[index];
    
    if (updates.brandId && updates.brandId !== existing.brandId) {
      const brand = data.brands.find((b) => b.id === updates.brandId);
      if (brand) updates.brandName = brand.name;
    }

    const updated: DbProduct = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    data.products[index] = updated;
    saveDataFile(data);
    return updated;
  },

  deleteProduct(id: string): boolean {
    const data = ensureDataFile();
    const initialLen = data.products.length;
    data.products = data.products.filter((p) => p.id !== id);
    if (data.products.length < initialLen) {
      saveDataFile(data);
      return true;
    }
    return false;
  },

  duplicateProduct(id: string): DbProduct | null {
    const original = this.getProductById(id);
    if (!original) return null;

    const copy = { ...original };
    delete (copy as Partial<DbProduct>).id;
    delete (copy as Partial<DbProduct>).createdAt;
    delete (copy as Partial<DbProduct>).updatedAt;
    copy.name = `${original.name} (Copy)`;
    copy.slug = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;

    return this.createProduct(copy);
  },

  // Attach imported images to product
  saveProductImportedImages(
    id: string,
    importedImages: DbProductImage[],
    primaryUrl?: string
  ): DbProduct | null {
    const data = ensureDataFile();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = data.products[index];
    const updatedImageDetails = [...(existing.imageDetails || []), ...importedImages];
    const allUrls = Array.from(
      new Set([...(existing.images || []), ...importedImages.map((i) => i.url)])
    );

    const mainImage = primaryUrl || existing.mainImage || allUrls[0] || "";

    const updated: DbProduct = {
      ...existing,
      mainImage,
      images: allUrls,
      imageDetails: updatedImageDetails,
      importStatus: "IMPORTED",
      updatedAt: new Date().toISOString(),
    };

    data.products[index] = updated;
    saveDataFile(data);
    return updated;
  },

  // --- CATEGORIES ---
  getCategories(): DbCategory[] {
    const data = ensureDataFile();
    return data.categories;
  },

  getCategoryById(id: string): DbCategory | undefined {
    const data = ensureDataFile();
    return data.categories.find((c) => c.id === id || c.slug === id);
  },

  createCategory(input: Omit<DbCategory, "id" | "createdAt" | "updatedAt">): DbCategory {
    const data = ensureDataFile();
    const slug = input.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const newCat: DbCategory = {
      ...input,
      id: `cat-${Date.now()}`,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.categories.push(newCat);
    saveDataFile(data);
    return newCat;
  },

  updateCategory(id: string, updates: Partial<DbCategory>): DbCategory | null {
    const data = ensureDataFile();
    const index = data.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updated = {
      ...data.categories[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    data.categories[index] = updated;
    saveDataFile(data);
    return updated;
  },

  deleteCategory(id: string): boolean {
    const data = ensureDataFile();
    const initialLen = data.categories.length;
    data.categories = data.categories.filter((c) => c.id !== id);
    if (data.categories.length < initialLen) {
      saveDataFile(data);
      return true;
    }
    return false;
  },

  // --- BRANDS ---
  getBrands(): DbBrand[] {
    const data = ensureDataFile();
    return data.brands;
  },

  getBrandById(id: string): DbBrand | undefined {
    const data = ensureDataFile();
    return data.brands.find((b) => b.id === id || b.slug === id);
  },

  createBrand(input: Omit<DbBrand, "id" | "createdAt" | "updatedAt">): DbBrand {
    const data = ensureDataFile();
    const slug = input.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const newBrand: DbBrand = {
      ...input,
      id: `brand-${Date.now()}`,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.brands.push(newBrand);
    saveDataFile(data);
    return newBrand;
  },

  updateBrand(id: string, updates: Partial<DbBrand>): DbBrand | null {
    const data = ensureDataFile();
    const index = data.brands.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updated = {
      ...data.brands[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    data.brands[index] = updated;

    if (updates.name) {
      data.products.forEach((p) => {
        if (p.brandId === id) p.brandName = updates.name;
      });
    }

    saveDataFile(data);
    return updated;
  },

  deleteBrand(id: string): boolean {
    const data = ensureDataFile();
    const initialLen = data.brands.length;
    data.brands = data.brands.filter((b) => b.id !== id);
    if (data.brands.length < initialLen) {
      saveDataFile(data);
      return true;
    }
    return false;
  },

  // --- DASHBOARD STATS ---
  getDashboardStats(): DashboardStats {
    const data = ensureDataFile();
    const totalProducts = data.products.length;
    const activeProducts = data.products.filter((p) => p.status === "active").length;
    const outOfStockProducts = data.products.filter((p) => p.stock <= 0).length;
    const lowStockProducts = data.products.filter(
      (p) => p.stock > 0 && p.stock <= (p.lowStockThreshold || 5)
    ).length;
    const awaitingImageReviewCount = data.products.filter(
      (p) =>
        p.importStatus === "AWAITING_REVIEW" ||
        p.importStatus === "IMAGES_FOUND" ||
        p.importStatus === "MANUAL_REQUIRED"
    ).length;

    return {
      totalProducts,
      activeProducts,
      outOfStockProducts,
      lowStockProducts,
      totalCategories: data.categories.length,
      totalBrands: data.brands.length,
      recentProducts: data.products.slice(0, 5),
      awaitingImageReviewCount,
    };
  },

  // --- USERS / AUTH ---
  getUserByEmail(email: string): DbUser | undefined {
    const data = ensureDataFile();
    return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
};
