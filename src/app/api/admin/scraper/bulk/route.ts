import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { scrapeProductPage, searchOfficialManufacturerPage } from "@/lib/scraper/engine";

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { productIds, autoApproveHighConfidence } = body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: "Product IDs array required" }, { status: 400 });
    }

    const results: {
      productId: string;
      productName: string;
      status: string;
      candidatesFound: number;
      autoImported: boolean;
    }[] = [];

    // Process items sequentially to prevent server rate limit spam
    for (const pid of productIds) {
      const product = db.getProductById(pid);
      if (!product) continue;

      const brand = db.getBrandById(product.brandId);
      const brandDomain = brand?.officialDomain;

      try {
        const targetUrl = await searchOfficialManufacturerPage(
          brand?.name || "Manufacturer",
          brandDomain,
          product.modelNumber,
          product.name
        );

        if (!targetUrl) {
          db.updateProduct(product.id, { importStatus: "NO_MATCH_FOUND" });
          results.push({
            productId: product.id,
            productName: product.name,
            status: "NO_MATCH_FOUND",
            candidatesFound: 0,
            autoImported: false,
          });
          continue;
        }

        const { candidates } = await scrapeProductPage(
          targetUrl,
          product.modelNumber,
          product.name,
          brandDomain
        );

        const highConfidence = candidates.filter((c) => c.confidenceScore >= 90);

        if (autoApproveHighConfidence && highConfidence.length > 0) {
          // Auto approve top high confidence image
          const topCandidate = highConfidence[0];
          db.saveProductImportedImages(
            product.id,
            [
              {
                id: `img-${Date.now()}`,
                productId: product.id,
                url: topCandidate.url,
                sourceUrl: topCandidate.sourceUrl,
                sourceDomain: topCandidate.sourceDomain,
                altText: topCandidate.alt || product.name,
                confidenceScore: topCandidate.confidenceScore,
                isPrimary: true,
                importMethod: "official_import",
                createdAt: new Date().toISOString(),
              },
            ],
            topCandidate.url
          );

          results.push({
            productId: product.id,
            productName: product.name,
            status: "IMPORTED",
            candidatesFound: candidates.length,
            autoImported: true,
          });
        } else {
          const importStatus =
            candidates.length > 0
              ? candidates[0].confidenceScore >= 85
                ? "IMAGES_FOUND"
                : "AWAITING_REVIEW"
              : "NO_MATCH_FOUND";

          db.updateProduct(product.id, { importStatus });

          results.push({
            productId: product.id,
            productName: product.name,
            status: importStatus,
            candidatesFound: candidates.length,
            autoImported: false,
          });
        }
      } catch (err: any) {
        db.updateProduct(product.id, { importStatus: "MANUAL_REQUIRED" });
        results.push({
          productId: product.id,
          productName: product.name,
          status: "MANUAL_REQUIRED",
          candidatesFound: 0,
          autoImported: false,
        });
      }

      // Small delay between requests to be polite
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return NextResponse.json({ success: true, processedCount: results.length, results });
  } catch (error) {
    console.error("Bulk import API error:", error);
    return NextResponse.json({ error: "Bulk import processing failed" }, { status: 500 });
  }
}
