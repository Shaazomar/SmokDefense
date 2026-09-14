import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = db.getProducts();
  const inventoryList = products.map((p) => {
    let stockStatus: "in_stock" | "low_stock" | "out_of_stock" = "in_stock";
    if (p.stock <= 0) stockStatus = "out_of_stock";
    else if (p.stock <= (p.lowStockThreshold || 5)) stockStatus = "low_stock";

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      brandName: p.brandName,
      stock: p.stock,
      lowStockThreshold: p.lowStockThreshold || 5,
      stockStatus,
      status: p.status,
    };
  });

  return NextResponse.json(inventoryList);
}

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, stock, lowStockThreshold } = body;

    if (!id || stock === undefined) {
      return NextResponse.json({ error: "Product ID and stock amount required" }, { status: 400 });
    }

    const updated = db.updateProduct(id, {
      stock: Number(stock),
      ...(lowStockThreshold !== undefined ? { lowStockThreshold: Number(lowStockThreshold) } : {}),
    });

    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Inventory update error:", error);
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}
