import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";

export async function GET() {
  const categories = db.getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.label) {
      return NextResponse.json({ error: "Category label is required" }, { status: 400 });
    }

    const slug = body.slug || body.label.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const created = db.createCategory({
      slug,
      label: body.label,
      description: body.description || "",
      imageUrl: body.imageUrl || "",
      parentId: body.parentId || undefined,
      status: body.status || "active",
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Category ID is required" }, { status: 400 });

    const updated = db.updateCategory(body.id, body);
    if (!updated) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Category ID is required" }, { status: 400 });

  const success = db.deleteCategory(id);
  if (!success) return NextResponse.json({ error: "Category not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
