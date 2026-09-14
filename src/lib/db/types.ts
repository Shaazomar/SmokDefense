export type GlyphKind =
  | "sensor"
  | "actuator"
  | "damper"
  | "controller"
  | "gateway"
  | "window"
  | "fan";

export type ProductStatus = "active" | "draft" | "archived";

export type ImportStatus =
  | "NOT_SEARCHED"
  | "SEARCHED"
  | "IMAGES_FOUND"
  | "AWAITING_REVIEW"
  | "IMPORTED"
  | "NO_MATCH_FOUND"
  | "MANUAL_REQUIRED";

export interface SpecificationItem {
  label: string;
  value: string;
  unit?: string;
}

export interface ProductDocument {
  id: string;
  name: string;
  url: string;
  type: string; // "datasheet" | "manual" | "drawing" | "certificate" | "other"
}

export interface DbProductImage {
  id: string;
  productId: string;
  url: string; // Local storage path /uploads/... or external URL
  sourceUrl?: string; // Original URL on manufacturer site
  sourceDomain?: string; // e.g. belimo.com
  altText?: string;
  width?: number;
  height?: number;
  isPrimary: boolean;
  confidenceScore?: number; // 0 to 100
  importMethod?: "manual_upload" | "official_import" | "url_paste";
  createdAt: string;
}

export interface DbCategory {
  id: string;
  slug: string;
  label: string;
  description: string;
  imageUrl?: string;
  parentId?: string;
  status: "active" | "disabled";
  createdAt: string;
  updatedAt: string;
}

export interface DbBrand {
  id: string;
  slug: string;
  name: string;
  officialDomain?: string; // e.g. belimo.com
  allowedDomains?: string[]; // e.g. ["belimo.com", "belimo.us", "belimo.eu"]
  logoUrl?: string;
  description?: string;
  isOwnBrand: boolean; // true for Override-R, false for Belimo/Siemens/etc.
  status: "active" | "disabled";
  createdAt: string;
  updatedAt: string;
}

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  category: string; // Category slug or ID
  brandId: string; // Brand ID
  brandName?: string; // Cache brand name
  glyph: GlyphKind;
  short: string;
  description: string;
  modelNumber?: string;
  manufacturer?: string;
  status: ProductStatus;
  importStatus?: ImportStatus;
  isFeatured: boolean;
  
  // Pricing & Commercial
  price?: number;
  compareAtPrice?: number;
  currency?: string;
  
  // Inventory
  stock: number;
  lowStockThreshold: number;
  
  // Specifications & Details
  specs: SpecificationItem[];
  applications: string[];
  systems: string[];
  dimensions?: string;
  weight?: string;
  material?: string;
  warranty?: string;
  
  // Media & Documents
  mainImage?: string;
  images: string[];
  imageDetails?: DbProductImage[];
  documents: ProductDocument[];
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface ScrapedImageCandidate {
  id: string;
  url: string;
  sourceUrl: string;
  sourceDomain: string;
  alt: string;
  width?: number;
  height?: number;
  confidenceScore: number; // 0 to 100
  matchReasons: string[];
  thumbnailUrl: string;
  isPrimaryCandidate?: boolean;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;
  totalCategories: number;
  totalBrands: number;
  recentProducts: DbProduct[];
  awaitingImageReviewCount?: number;
}

export interface DbUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export interface DbData {
  categories: DbCategory[];
  brands: DbBrand[];
  products: DbProduct[];
  users: DbUser[];
}
