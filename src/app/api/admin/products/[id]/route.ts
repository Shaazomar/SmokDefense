import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { deleteImage, isCloudinaryUrl, isCloudinaryConfigured } from "@/lib/cloudinary";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = db.getProductById(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();

    // Check duplicate action
    if (body.action === "duplicate") {
      const duplicated = db.duplicateProduct(id);
      if (!duplicated) return NextResponse.json({ error: "Product not found" }, { status: 404 });
      return NextResponse.json(duplicated);
    }

    // Track removed Cloudinary images for cleanup
    const existingProduct = db.getProductById(id);
    const updated = db.updateProduct(id, body);
    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // Clean up Cloudinary assets that were removed from the product
    if (existingProduct && isCloudinaryConfigured()) {
      const removedImages = (existingProduct.imageDetails || []).filter(
        (oldImg) =>
          oldImg.cloudinaryPublicId &&
          !(updated.imageDetails || []).some(
            (newImg) => newImg.cloudinaryPublicId === oldImg.cloudinaryPublicId
          )
      );

      // Fire-and-forget cleanup — don't block the response
      for (const img of removedImages) {
        if (img.cloudinaryPublicId) {
          deleteImage(img.cloudinaryPublicId).catch(() => {
            // Orphaned asset — could be cleaned up in a future sweep
          });
        }
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Fetch product before deletion to get Cloudinary public IDs
  const product = db.getProductById(id);
  const success = db.deleteProduct(id);
  if (!success) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Clean up associated Cloudinary assets (fire-and-forget)
  if (product && isCloudinaryConfigured()) {
    const cloudinaryImages = (product.imageDetails || []).filter(
      (img) => img.cloudinaryPublicId
    );

    for (const img of cloudinaryImages) {
      if (img.cloudinaryPublicId) {
        deleteImage(img.cloudinaryPublicId).catch(() => {
          // Orphaned asset — silent cleanup failure
        });
      }
    }

    // Also check mainImage if it's a Cloudinary URL
    if (product.mainImage && isCloudinaryUrl(product.mainImage)) {
      // mainImage URL cleanup is best-effort since the imageDetails cleanup
      // should have already handled it if tracked properly
    }
  }

  return NextResponse.json({ success: true });
}
