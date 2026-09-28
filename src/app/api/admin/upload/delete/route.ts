import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { deleteImage, isCloudinaryConfigured, isPublicIdInUse } from "@/lib/cloudinary";

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { publicId } = body;

    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid publicId" },
        { status: 400 }
      );
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 503 }
      );
    }

    // Safety: only allow deletion within the override-r folder tree
    if (!publicId.startsWith("override-r/")) {
      return NextResponse.json(
        { error: "Cannot delete assets outside of the override-r folder." },
        { status: 403 }
      );
    }

    // Check if the asset is still referenced by any product
    const inUse = await isPublicIdInUse(publicId);
    if (inUse) {
      return NextResponse.json(
        { error: "This image is still in use by a product. Remove it from the product first." },
        { status: 409 }
      );
    }

    const success = await deleteImage(publicId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete Cloudinary asset — it may not exist." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete handler error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
