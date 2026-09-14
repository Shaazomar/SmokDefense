import type { ScrapedImageCandidate } from "@/lib/db/types";

// SSRF Security: Block internal/private network IP ranges
function isPrivateIp(hostname: string): boolean {
  const host = hostname.toLowerCase().trim();
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }
  // Check private IPv4 patterns
  if (
    /^10\./.test(host) ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host)
  ) {
    return true;
  }
  return false;
}

export function validateTargetUrl(rawUrl: string, allowedDomains?: string[]): { valid: boolean; url?: URL; reason?: string } {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { valid: false, reason: "Only HTTP and HTTPS protocols are allowed." };
    }
    if (isPrivateIp(parsed.hostname)) {
      return { valid: false, reason: "Access to local or private IP addresses is blocked." };
    }
    if (allowedDomains && allowedDomains.length > 0) {
      const hostname = parsed.hostname.toLowerCase();
      const isAllowed = allowedDomains.some((d) => hostname === d || hostname.endsWith(`.${d}`));
      if (!isAllowed) {
        return {
          valid: false,
          reason: `Domain ${hostname} is not in the configured official brand allowlist (${allowedDomains.join(", ")}).`,
        };
      }
    }
    return { valid: true, url: parsed };
  } catch {
    return { valid: false, reason: "Invalid URL structure." };
  }
}

// Normalize image URLs relative to page base URL
function normalizeImageUrl(src: string, baseUrl: URL): string | null {
  try {
    if (!src || src.startsWith("data:")) return null; // Ignore base64 inline images
    const resolved = new URL(src, baseUrl.href);
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:") return null;
    return resolved.href;
  } catch {
    return null;
  }
}

// Simple quality filter to reject website UI icons, logos, tracking pixels, ads
function isIgnorableImage(urlStr: string, altText: string): boolean {
  const lowerUrl = urlStr.toLowerCase();
  const lowerAlt = altText.toLowerCase();

  const ignoreKeywords = [
    "logo",
    "icon",
    "favicon",
    "avatar",
    "banner",
    "tracking",
    "pixel",
    "badge",
    "button",
    "arrow",
    "spinner",
    "loader",
    "footer",
    "header-bg",
    "ad-",
    "advertisement",
    "social",
    "facebook",
    "twitter",
    "linkedin",
    "instagram",
  ];

  for (const kw of ignoreKeywords) {
    if (lowerUrl.includes(kw) || lowerAlt.includes(kw)) {
      return true;
    }
  }

  // Reject tiny thumbnail indicators in filename
  if (/[-_](16x16|32x32|48x48|64x64|100x100|thumb|tiny|mini)\./.test(lowerUrl)) {
    return true;
  }

  return false;
}

// Scrape candidates directly from an official product HTML page
export async function scrapeProductPage(
  targetUrlStr: string,
  modelNumber?: string,
  productName?: string,
  brandDomain?: string
): Promise<{ candidates: ScrapedImageCandidate[]; pageTitle: string }> {
  const validation = validateTargetUrl(targetUrlStr);
  if (!validation.valid || !validation.url) {
    throw new Error(validation.reason || "Invalid URL");
  }

  const pageUrl = validation.url;

  // Perform HTTP fetch with custom User-Agent
  const response = await fetch(pageUrl.href, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
    signal: AbortSignal.timeout(10000), // 10s timeout
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} when accessing ${pageUrl.hostname}`);
  }

  const html = await response.text();

  // Extract page title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : pageUrl.hostname;

  const candidateMap = new Map<string, { src: string; alt: string; source: string }>();

  // 1. Extract OpenGraph & Twitter Image Meta Tags
  const ogMatches = html.matchAll(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi);
  for (const match of ogMatches) {
    const fullUrl = normalizeImageUrl(match[1], pageUrl);
    if (fullUrl) {
      candidateMap.set(fullUrl, { src: fullUrl, alt: pageTitle, source: "og:image" });
    }
  }

  const twMatches = html.matchAll(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/gi);
  for (const match of twMatches) {
    const fullUrl = normalizeImageUrl(match[1], pageUrl);
    if (fullUrl && !candidateMap.has(fullUrl)) {
      candidateMap.set(fullUrl, { src: fullUrl, alt: pageTitle, source: "twitter:image" });
    }
  }

  // 2. Extract JSON-LD product image schema
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonLdMatch;
  while ((jsonLdMatch = jsonLdRegex.exec(html)) !== null) {
    try {
      const json = JSON.parse(jsonLdMatch[1]);
      const images = Array.isArray(json.image) ? json.image : [json.image];
      for (const imgItem of images) {
        const imgUrlStr = typeof imgItem === "string" ? imgItem : imgItem?.url;
        if (imgUrlStr) {
          const fullUrl = normalizeImageUrl(imgUrlStr, pageUrl);
          if (fullUrl) {
            candidateMap.set(fullUrl, { src: fullUrl, alt: json.name || pageTitle, source: "schema.org/Product" });
          }
        }
      }
    } catch {
      // Ignore JSON-LD parse errors
    }
  }

  // 3. Extract <img> tags with src, data-src, srcset
  const imgRegex = /<img\s+([^>]+)>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const tagAttrStr = imgMatch[1];

    const srcMatch = tagAttrStr.match(/src=["']([^"']+)["']/i);
    const dataSrcMatch = tagAttrStr.match(/data-src=["']([^"']+)["']/i);
    const altMatch = tagAttrStr.match(/alt=["']([^"']*)["']/i);

    const rawSrc = dataSrcMatch ? dataSrcMatch[1] : srcMatch ? srcMatch[1] : null;
    const alt = altMatch ? altMatch[1].trim() : "";

    if (rawSrc) {
      const fullUrl = normalizeImageUrl(rawSrc, pageUrl);
      if (fullUrl && !isIgnorableImage(fullUrl, alt)) {
        if (!candidateMap.has(fullUrl)) {
          candidateMap.set(fullUrl, { src: fullUrl, alt, source: "img-tag" });
        }
      }
    }
  }

  // Convert map to Candidates with Multi-Signal Scoring
  const candidates: ScrapedImageCandidate[] = [];
  const modelClean = (modelNumber || "").toLowerCase().trim();
  const nameClean = (productName || "").toLowerCase().trim();
  const hostClean = pageUrl.hostname.toLowerCase();

  let index = 0;
  for (const [url, data] of candidateMap.entries()) {
    index++;
    const matchReasons: string[] = [];
    let score = 50; // Base score

    const lowerUrl = url.toLowerCase();
    const lowerAlt = data.alt.toLowerCase();

    // Signal A: Domain match
    if (brandDomain && hostClean.includes(brandDomain.toLowerCase())) {
      score += 25;
      matchReasons.push(`Official brand domain match (${hostClean})`);
    } else {
      matchReasons.push(`Source page (${hostClean})`);
    }

    // Signal B: Model Number match (Highest Priority)
    if (modelClean && modelClean.length > 2) {
      if (lowerUrl.includes(modelClean) || lowerAlt.includes(modelClean) || pageTitle.toLowerCase().includes(modelClean)) {
        score += 35;
        matchReasons.push(`Exact model number match ("${modelNumber}")`);
      }
    }

    // Signal C: Product Name match
    if (nameClean && nameClean.length > 3) {
      const parts = nameClean.split(/\s+/).filter((p) => p.length > 3);
      const matchCount = parts.filter((p) => lowerUrl.includes(p) || lowerAlt.includes(p)).length;
      if (matchCount > 0) {
        score += Math.min(20, matchCount * 10);
        matchReasons.push(`Product keyword match (${matchCount} terms)`);
      }
    }

    // Signal D: Primary Metadata (OpenGraph / JSON-LD)
    if (data.source === "og:image" || data.source === "schema.org/Product") {
      score += 15;
      matchReasons.push(`Structured product metadata (${data.source})`);
    }

    // Cap score at 98 max
    const finalScore = Math.min(98, Math.max(10, score));

    candidates.push({
      id: `cand-${index}-${Date.now()}`,
      url,
      sourceUrl: targetUrlStr,
      sourceDomain: pageUrl.hostname,
      alt: data.alt || productName || "Product image",
      confidenceScore: finalScore,
      matchReasons,
      thumbnailUrl: url,
      isPrimaryCandidate: index === 1,
    });
  }

  // Sort candidates by confidence score descending
  candidates.sort((a, b) => b.confidenceScore - a.confidenceScore);

  return { candidates, pageTitle };
}

// Perform automated search query on manufacturer website or web search if direct URL not provided
export async function searchOfficialManufacturerPage(
  brandName: string,
  brandDomain: string | undefined,
  modelNumber: string | undefined,
  productName: string
): Promise<string | null> {
  const queryParts = [brandName];
  if (modelNumber) queryParts.push(modelNumber);
  else queryParts.push(productName);

  const query = queryParts.join(" ");
  const domainFilter = brandDomain ? brandDomain : "";

  // Search using DuckDuckGo HTML endpoint
  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(
      (domainFilter ? `site:${domainFilter} ` : "") + query
    )}`;

    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const html = await response.text();
    // Extract first search result link
    const linkMatches = html.matchAll(/<a\s+class=["']result__url["']\s+href=["']([^"']+)["']/gi);
    for (const match of linkMatches) {
      let rawHref = match[1];
      if (rawHref.includes("uddg=")) {
        const urlParam = new URLSearchParams(rawHref.split("?")[1]).get("uddg");
        if (urlParam) rawHref = urlParam;
      }
      const validation = validateTargetUrl(rawHref);
      if (validation.valid && validation.url) {
        return validation.url.href;
      }
    }
  } catch (err) {
    console.error("Search failed:", err);
  }

  return null;
}
