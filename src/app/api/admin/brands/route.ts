import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";

export async function GET() {
  const brands = db.getBrands();
  return NextResponse.json(brands);
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const created = db.createBrand({
      slug,
      name: body.name,
      logoUrl: body.logoUrl || "",
      description: body.description || "",
      isOwnBrand: Boolean(body.isOwnBrand),
      status: body.status || "active",
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Create brand error:", error);
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Brand ID is required" }, { status: 400 });

    const updated = db.updateBrand(body.id, body);
    if (!updated) return NextResponse.json({ error: "Brand not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update brand error:", error);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Brand ID is required" }, { status: 400 });

  const success = db.deleteBrand(id);
  if (!success) return NextResponse.json({ error: "Brand not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
