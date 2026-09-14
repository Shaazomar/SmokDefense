import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { validateTargetUrl } from "@/lib/scraper/engine";
import type { DbProductImage } from "@/lib/db/types";
import fs from "node:fs";
import path from "node:path";

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { productId, selectedCandidates, primaryCandidateId } = body;

    if (!productId || !Array.isArray(selectedCandidates) || selectedCandidates.length === 0) {
      return NextResponse.json(
        { error: "Product ID and selected candidates are required." },
        { status: 400 }
      );
    }

    const product = db.getProductById(productId);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const importedImageDetails: DbProductImage[] = [];
    let primaryUrl: string | undefined = undefined;

    for (const cand of selectedCandidates) {
      const validation = validateTargetUrl(cand.url);
      if (!validation.valid) continue;

      let savedUrl = cand.url; // Default fallback to URL

      try {
        // Fetch and download image file locally
        const res = await fetch(cand.url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          },
          signal: AbortSignal.timeout(8000),
        });

        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          const contentType = res.headers.get("content-type") || "image/jpeg";
          const ext = contentType.includes("png")
            ? "png"
            : contentType.includes("webp")
            ? "webp"
            : contentType.includes("svg")
            ? "svg"
            : "jpg";

          const filename = `import_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
          const filePath = path.join(uploadDir, filename);

          fs.writeFileSync(filePath, buffer);
          savedUrl = `/uploads/${filename}`;
        }
      } catch (err) {
        console.error(`Could not download image ${cand.url}, using direct URL fallback:`, err);
      }

      const isPrimary = cand.id === primaryCandidateId || cand.isPrimaryCandidate;

      const imgDetail: DbProductImage = {
        id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        productId,
        url: savedUrl,
        sourceUrl: cand.sourceUrl,
        sourceDomain: cand.sourceDomain,
        altText: cand.alt || product.name,
        confidenceScore: cand.confidenceScore,
        isPrimary,
        importMethod: "official_import",
        createdAt: new Date().toISOString(),
      };

      if (isPrimary || !primaryUrl) {
        primaryUrl = savedUrl;
      }

      importedImageDetails.push(imgDetail);
    }

    const updatedProduct = db.saveProductImportedImages(productId, importedImageDetails, primaryUrl);

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      importedCount: importedImageDetails.length,
    });
  } catch (error: any) {
    console.error("Import approval error:", error);
    return NextResponse.json({ error: "Failed to import selected images" }, { status: 500 });
  }
}
