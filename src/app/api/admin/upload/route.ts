import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import {
  uploadImage,
  validateImageFile,
  isCloudinaryConfigured,
  CLOUDINARY_FOLDERS,
} from "@/lib/cloudinary";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || CLOUDINARY_FOLDERS.products;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Server-side validation
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // If Cloudinary is configured, upload there
    if (isCloudinaryConfigured()) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await uploadImage(buffer, folder, file.name);

      return NextResponse.json({
        url: result.secureUrl,
        publicId: result.publicId,
        name: file.name,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
      });
    }

    // Fallback: save to local filesystem if Cloudinary is not configured
    let uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    } catch {
      // Serverless read-only filesystem (e.g. Vercel)
      uploadDir = path.join(os.tmpdir(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}_${cleanFilename}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl, name: file.name, size: file.size });
  } catch (error) {
    console.error("Upload handler error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({
      error: "Upload failed. If deployed on Vercel, please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_SECRET_KEY in Vercel Environment Variables."
    }, { status: 500 });
  }
}
