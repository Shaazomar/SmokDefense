import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db/store";
import { scrapeProductPage, searchOfficialManufacturerPage, validateTargetUrl } from "@/lib/scraper/engine";

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { productId, manualUrl, customQuery } = body;

    let product = productId ? db.getProductById(productId) : undefined;
    let brand = product ? db.getBrandById(product.brandId) : undefined;

    let targetUrl = manualUrl?.trim();

    if (!targetUrl && product) {
      const brandDomain = brand?.officialDomain;
      const modelNumber = product.modelNumber;
      const productName = customQuery || product.name;

      targetUrl = await searchOfficialManufacturerPage(
        brand?.name || "Manufacturer",
        brandDomain,
        modelNumber,
        productName
      ) || undefined;
    }

    if (!targetUrl) {
      if (product) {
        db.updateProduct(product.id, { importStatus: "NO_MATCH_FOUND" });
      }
      return NextResponse.json(
        {
          error: "No confident official product page found.",
          importStatus: "NO_MATCH_FOUND",
          candidates: [],
        },
        { status: 404 }
      );
    }

    const brandDomain = brand?.officialDomain;
    const { candidates, pageTitle } = await scrapeProductPage(
      targetUrl,
      product?.modelNumber,
      product?.name,
      brandDomain
    );

    if (product) {
      const highestScore = candidates[0]?.confidenceScore || 0;
      let newImportStatus: "IMAGES_FOUND" | "AWAITING_REVIEW" | "MANUAL_REQUIRED" = "AWAITING_REVIEW";
      if (highestScore >= 85) newImportStatus = "IMAGES_FOUND";
      else if (highestScore < 60) newImportStatus = "MANUAL_REQUIRED";

      db.updateProduct(product.id, { importStatus: newImportStatus });
    }

    return NextResponse.json({
      targetUrl,
      pageTitle,
      candidates,
      count: candidates.length,
      importStatus: candidates.length > 0 ? "IMAGES_FOUND" : "NO_MATCH_FOUND",
    });
  } catch (error: any) {
    console.error("Scraper search API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to search product images" },
      { status: 500 }
    );
  }
}
