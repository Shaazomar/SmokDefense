import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const brandId = searchParams.get("brandId") || undefined;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;

  const products = db.getProducts({ category, brandId, status, search });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name || !body.category || !body.brandId) {
      return NextResponse.json(
        { error: "Product name, category, and brand are required." },
        { status: 400 }
      );
    }

    const created = db.createProduct({
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      name: body.name,
      category: body.category,
      brandId: body.brandId,
      glyph: body.glyph || "sensor",
      short: body.short || "",
      description: body.description || "",
      modelNumber: body.modelNumber || "",
      manufacturer: body.manufacturer || "",
      status: body.status || "active",
      isFeatured: Boolean(body.isFeatured),
      price: body.price !== undefined && body.price !== null ? Number(body.price) : undefined,
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      stock: body.stock !== undefined ? Number(body.stock) : 0,
      lowStockThreshold: body.lowStockThreshold ? Number(body.lowStockThreshold) : 5,
      specs: Array.isArray(body.specs) ? body.specs : [],
      applications: Array.isArray(body.applications) ? body.applications : [],
      systems: Array.isArray(body.systems) ? body.systems : [],
      dimensions: body.dimensions || "",
      weight: body.weight || "",
      material: body.material || "",
      warranty: body.warranty || "",
      mainImage: body.mainImage || "",
      images: Array.isArray(body.images) ? body.images : [],
      documents: Array.isArray(body.documents) ? body.documents : [],
      seoTitle: body.seoTitle || "",
      seoDescription: body.seoDescription || "",
      seoKeywords: body.seoKeywords || "",
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create product API error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
