#!/usr/bin/env python3
"""
Override-R Product Image Importer — Direct URL Strategy
Uses known official product page URLs to extract and download images.
"""

import json
import os
import re
import time
import hashlib
import urllib.request
import urllib.parse
import urllib.error
import ssl
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
DB_FILE  = BASE_DIR / "data" / "override-r.json"
IMG_DIR  = BASE_DIR / "public" / "product-images"
IMG_DIR.mkdir(parents=True, exist_ok=True)

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)
HEADERS = {
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}
CTX = ssl.create_default_context()

def http_get(url: str, timeout: int = 15) -> bytes | None:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.read()
    except Exception as e:
        print(f"    [FETCH ERR] {url[:60]}: {e}")
        return None

def http_get_text(url: str, timeout: int = 15) -> str | None:
    data = http_get(url, timeout)
    if not data:
        return None
    for enc in ("utf-8", "latin-1"):
        try:
            return data.decode(enc, errors="replace")
        except Exception:
            pass
    return None

def resolve_url(src: str, base: str) -> str | None:
    if not src or src.startswith("data:"):
        return None
    try:
        return urllib.parse.urljoin(base, src)
    except Exception:
        return None

IGNORE_KW = (
    "logo", "icon", "favicon", "avatar", "banner", "tracking", "pixel",
    "badge", "button", "arrow", "spinner", "loader", "footer", "header-bg",
    "social", "facebook", "twitter", "linkedin", "instagram", "youtube",
    "nav-", "menu-", "cart", "checkout", "flag-", "star-", "rating",
    "background", "bg-", "pattern", "-bg.", "brand-", "hero-"
)
IGNORE_RE = re.compile(r"[-_](16x16|32x32|48x48|64x64|100x100|thumb|tiny|mini)\.", re.I)

def is_ignorable(url: str, alt: str) -> bool:
    lu, la = url.lower(), alt.lower()
    for kw in IGNORE_KW:
        if kw in lu or kw in la:
            return True
    if IGNORE_RE.search(lu):
        return True
    return False

def scrape_images(page_url: str, model: str, product_name: str) -> list[dict]:
    print(f"  📄 Scraping: {page_url}")
    html_text = http_get_text(page_url, timeout=15)
    if not html_text:
        return []

    candidates: dict[str, dict] = {}

    # 1. OG / Twitter meta
    for m in re.finditer(
        r'<meta\s[^>]*(?:property=["\']og:image["\']|name=["\']twitter:image["\'])[^>]*content=["\']([^"\']+)["\']',
        html_text, re.I):
        u = resolve_url(m.group(1), page_url)
        if u and not is_ignorable(u, ""):
            candidates[u] = {"url": u, "alt": product_name, "source": "og:image", "score": 88}

    # Also try reversed attribute order
    for m in re.finditer(
        r'<meta\s[^>]*content=["\']([^"\']+)["\'][^>]*(?:property=["\']og:image["\']|name=["\']twitter:image["\'])',
        html_text, re.I):
        u = resolve_url(m.group(1), page_url)
        if u and not is_ignorable(u, "") and u not in candidates:
            candidates[u] = {"url": u, "alt": product_name, "source": "og:image", "score": 88}

    # 2. JSON-LD
    for m in re.finditer(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>',
        html_text, re.I):
        try:
            obj = json.loads(m.group(1))
            imgs = obj.get("image", [])
            if isinstance(imgs, str):
                imgs = [imgs]
            elif isinstance(imgs, dict):
                imgs = [imgs.get("url", "")]
            for img in imgs:
                src = img if isinstance(img, str) else img.get("url", "")
                u = resolve_url(src, page_url)
                if u and not is_ignorable(u, "") and u not in candidates:
                    candidates[u] = {"url": u, "alt": obj.get("name", product_name), "source": "jsonld", "score": 95}
        except Exception:
            pass

    # 3. <picture> / <source> srcset
    for m in re.finditer(r'<source\s[^>]+srcset=["\']([^"\']+)["\']', html_text, re.I):
        parts = m.group(1).split(",")
        for part in parts:
            raw = part.strip().split()[0]
            u = resolve_url(raw, page_url)
            if u and not is_ignorable(u, "") and u not in candidates:
                candidates[u] = {"url": u, "alt": "", "source": "srcset", "score": 60}

    # 4. <img> tags
    for m in re.finditer(r'<img\s([^>]+)>', html_text, re.I):
        attrs = m.group(1)
        src_m = re.search(r'(?:data-src|data-lazy-src|src)=["\']([^"\']+)["\']', attrs, re.I)
        alt_m = re.search(r'alt=["\']([^"\']*)["\']', attrs, re.I)
        if not src_m:
            continue
        raw_src = src_m.group(1)
        alt = alt_m.group(1).strip() if alt_m else ""
        u = resolve_url(raw_src, page_url)
        if u and not is_ignorable(u, alt) and u not in candidates:
            candidates[u] = {"url": u, "alt": alt, "source": "img-tag", "score": 50}

    # ── Score boost ──────────────────────────────────────────────────────────
    model_c = model.lower().strip().replace("-", "").replace(" ", "")
    name_parts = [p for p in product_name.lower().split() if len(p) > 3]

    results = []
    for url, c in candidates.items():
        lu = url.lower()
        la = c["alt"].lower()
        s = c["score"]

        if model_c and len(model_c) > 2:
            lu_n = lu.replace("-", "").replace("_", "")
            la_n = la.replace("-", "").replace("_", "")
            if model_c in lu_n or model_c in la_n:
                s += 45
        hits = sum(1 for p in name_parts if p in lu or p in la)
        s += min(25, hits * 8)
        if any(x in lu for x in ("product", "catalog", "media", "asset", "/img/", "/images/", "photo")):
            s += 12
        if url.endswith(".svg") or url.endswith(".gif"):
            s -= 40
        # Penalise very small paths (likely icons)
        path = urllib.parse.urlparse(url).path
        if len(path) < 8:
            s -= 20

        c["score"] = max(0, min(100, s))
        results.append(c)

    results.sort(key=lambda x: x["score"], reverse=True)
    return results

def download_image(url: str, slug: str, index: int = 0) -> str | None:
    data = http_get(url, timeout=20)
    if not data or len(data) < 3000:
        print(f"    [SKIP] too small or empty ({len(data) if data else 0} bytes): {url[:60]}")
        return None

    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower().split("?")[0]
    if ext not in (".jpg", ".jpeg", ".png", ".webp", ".avif"):
        if data[:2] == b"\xff\xd8":
            ext = ".jpg"
        elif data[:4] == b"\x89PNG":
            ext = ".png"
        elif data[:4] == b"RIFF" and b"WEBP" in data[:12]:
            ext = ".webp"
        else:
            ext = ".jpg"

    h = hashlib.md5(url.encode()).hexdigest()[:8]
    filename = f"{slug}-{index+1}-{h}{ext}"
    dest = IMG_DIR / filename
    dest.write_bytes(data)
    print(f"    [SAVED] {filename} ({len(data)//1024} KB)")
    return f"/product-images/{filename}"

# ─────────────────────────────────────────────────────────────────────────────
# KNOWN DIRECT PRODUCT PAGE URLs per product slug
# These are official manufacturer product/search pages known to have images.
# ─────────────────────────────────────────────────────────────────────────────
PRODUCT_PAGES: dict[str, list[str]] = {
    # Belimo products — use their US product pages
    "belimo-rotary-damper-actuator": [
        "https://www.belimo.com/us/en_US/products/lm24a-sr/",
        "https://www.belimo.com/us/en_US/products/lm24a/",
        "https://www.belimo.com/us/en_US/products/lm230a-sr/",
    ],
    "belimo-control-valve-actuator": [
        "https://www.belimo.com/us/en_US/products/lr24a-sr/",
        "https://www.belimo.com/us/en_US/products/lr24a/",
        "https://www.belimo.com/us/en_US/products/nkq24a-sr/",
    ],

    # Sensors — use Siemens / Hager / Distech or generic HVAC product pages
    "co2-sensor-room": [
        "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-co2-sensor.html",
        "https://new.siemens.com/global/en/products/buildings/hvac/sensing-devices/co2-sensors.html",
        "https://www.distech-controls.com/en/products/room-sensors/",
    ],
    "co2-sensor-duct": [
        "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-co2-sensor.html",
        "https://new.siemens.com/global/en/products/buildings/hvac/sensing-devices/co2-sensors.html",
    ],
    "co-sensor-carpark": [
        "https://www.siemens.com/global/en/products/buildings/fire-safety/gas-detection.html",
        "https://www.tycoelectronics.com/en/products/sensors/co-detectors.html",
    ],
    "differential-pressure-sensor": [
        "https://www.siemens.com/global/en/products/buildings/hvac/sensing-devices/differential-pressure-sensors.html",
        "https://www.belimo.com/us/en_US/products/differential-pressure-sensors/",
    ],
    "duct-temp-humidity-sensor": [
        "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-temperature-humidity-sensors.html",
        "https://www.belimo.com/us/en_US/products/duct-sensors/",
    ],

    # Actuators / dampers
    "window-actuator-chain-drive": [
        "https://www.belimo.com/us/en_US/products/window-actuators/",
        "https://www.colt.net/en/products/actuators/",
        "https://www.windowmaster.com/products/actuators/",
    ],
    "fs-damper-actuator-spring": [
        "https://www.belimo.com/us/en_US/products/fire-smoke-damper-actuators/",
        "https://www.belimo.com/us/en_US/products/bfb24-sr/",
    ],
    "fire-damper": [
        "https://www.trox.de/en/products/dampers-and-valves/fire-protection-dampers",
        "https://www.flaktgroup.com/en/products/air-distribution/fire-dampers/",
        "https://www.actionair.co.uk/products/fire-dampers/",
    ],
    "smoke-damper": [
        "https://www.trox.de/en/products/dampers-and-valves/smoke-control-dampers",
        "https://www.flaktgroup.com/en/products/air-distribution/smoke-dampers/",
        "https://www.smokecontrol.co.uk/products/motorised-smoke-dampers",
    ],
    "fire-smoke-combination-damper": [
        "https://www.trox.de/en/products/dampers-and-valves/combined-fire-and-smoke-dampers",
        "https://www.flaktgroup.com/en/products/air-distribution/fire-smoke-dampers/",
    ],
    "pressure-relief-damper": [
        "https://www.trox.de/en/products/dampers-and-valves/pressure-relief-dampers",
        "https://www.flaktgroup.com/en/products/air-distribution/pressure-relief-dampers/",
    ],

    # Controllers
    "gateway-controller": [
        "https://www.siemens.com/global/en/products/buildings/automation/controllers/scalance.html",
        "https://new.siemens.com/global/en/products/buildings/automation/desigo-cc.html",
        "https://www.schneider-electric.com/en/products/gateways-controllers/",
    ],
    "edge-controller": [
        "https://www.siemens.com/global/en/products/buildings/automation/controllers.html",
        "https://new.siemens.com/global/en/products/buildings/automation/desigo.html",
    ],
    "ip500-node": [
        "https://new.siemens.com/global/en/products/buildings/fire-safety/intelligent-wireless/gamma-wave.html",
        "https://www.siemens.com/global/en/products/buildings/fire-safety/wireless-devices.html",
    ],
    "field-controller": [
        "https://www.siemens.com/global/en/products/buildings/automation/controllers/field-panels.html",
        "https://new.siemens.com/global/en/products/buildings/automation/desigo.html",
    ],
    "jet-fan-controller": [
        "https://www.systemair.com/en/products/fans/jet-fans/",
        "https://www.axair-fans.co.uk/axial-fans/jet-fans.html",
        "https://www.colt.net/en/products/fans-for-car-parks/",
    ],
    "damper-monitoring-module": [
        "https://www.belimo.com/us/en_US/products/actuators/damper-actuators-with-feedback/",
        "https://www.belimo.com/us/en_US/products/damper-position-indicator/",
    ],
    "air-quality-display-panel": [
        "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-displays.html",
        "https://new.siemens.com/global/en/products/buildings/hvac/sensing-devices/air-quality-sensors.html",
    ],
    "supervised-power-supply-unit": [
        "https://www.meanwell.com/productSeries.aspx?i=18",
        "https://www.rs-online.com/web/c/power-supplies/din-rail-power-supplies/",
        "https://www.phoenixcontact.com/en-us/products/power-supplies/",
    ],
}

# ─────────────────────────────────────────────────────────────────────────────
# Alternative: Direct known CDN image URLs for specific products
# We hardcode these high-confidence known images as a fallback / supplement
# ─────────────────────────────────────────────────────────────────────────────
DIRECT_IMAGES: dict[str, list[str]] = {
    "belimo-rotary-damper-actuator": [
        "https://www.belimo.com/cms/hst/belimo_com/products/hvac_actuators/rotary_damper_actuators/lm24a_sr/images/lm24a-sr_01.jpg",
        "https://www.belimo.com/mam/belimo_com/images/products/lm24a-sr-01.jpg",
    ],
    "belimo-control-valve-actuator": [
        "https://www.belimo.com/cms/hst/belimo_com/products/hvac_actuators/valve_actuators/lr24a_sr/images/lr24a-sr_01.jpg",
        "https://www.belimo.com/mam/belimo_com/images/products/lr24a-sr-01.jpg",
    ],
}

def main():
    print("=" * 65)
    print("Override-R Product Image Importer — Direct URL Strategy")
    print("=" * 65)

    db_data = json.loads(DB_FILE.read_text())
    products = db_data["products"]

    stats = dict(imported=[], already_had=[], manual_review=[], no_image=[], no_pages=[])

    for prod in products:
        pid   = prod["id"]
        name  = prod["name"]
        slug  = prod["slug"]
        brand = prod.get("brandName", "Override-R")
        model = prod.get("modelNumber", "")

        # Strip unwanted existing images
        existing = prod.get("images", [])
        valid_existing = [
            img for img in existing
            if img
               and not img.endswith("bathrooms.avif")
               and "placeholder" not in img
               and img.startswith("/product-images/")
        ]

        print(f"\n{'─'*65}")
        print(f"[{pid}] {name}  (brand={brand}, model={model or 'N/A'})")

        if valid_existing:
            print(f"  ✅ Already has {len(valid_existing)} valid image(s) — keeping")
            stats["already_had"].append(name)
            continue

        pages = PRODUCT_PAGES.get(slug, [])
        direct_imgs = DIRECT_IMAGES.get(slug, [])

        if not pages and not direct_imgs:
            print(f"  ⚠️  No known product pages configured")
            prod["importStatus"] = "MANUAL_REQUIRED"
            stats["no_pages"].append(name)
            continue

        downloaded_paths: list[str] = []
        image_details: list[dict] = []
        source_page = ""

        # Strategy A: Try direct known CDN image URLs first
        for i, img_url in enumerate(direct_imgs):
            print(f"  🎯 Direct CDN: {img_url[:70]}")
            local_path = download_image(img_url, slug, i)
            if local_path:
                downloaded_paths.append(local_path)
                image_details.append({
                    "url": local_path,
                    "sourceUrl": img_url,
                    "sourceDomain": urllib.parse.urlparse(img_url).netloc,
                    "alt": name,
                    "confidenceScore": 95,
                    "isPrimary": len(downloaded_paths) == 1,
                })
            time.sleep(0.4)

        # Strategy B: Scrape product pages for images
        if not downloaded_paths:
            for page_url in pages:
                print(f"  🌐 Trying page: {page_url}")
                time.sleep(1.2)
                candidates = scrape_images(page_url, model, name)
                top = [c for c in candidates if c["score"] >= 55]
                print(f"     → {len(candidates)} candidates, {len(top)} above threshold")

                if top:
                    source_page = page_url
                    for i, cand in enumerate(top[:3]):
                        print(f"  ⬇️  [{cand['score']}%] {cand['url'][:70]}")
                        local_path = download_image(cand["url"], slug, len(downloaded_paths))
                        if local_path:
                            downloaded_paths.append(local_path)
                            image_details.append({
                                "url": local_path,
                                "sourceUrl": cand["url"],
                                "sourceDomain": urllib.parse.urlparse(cand["url"]).netloc,
                                "alt": cand.get("alt", name),
                                "confidenceScore": cand["score"],
                                "isPrimary": len(downloaded_paths) == 1,
                            })
                        time.sleep(0.5)
                    if downloaded_paths:
                        break  # Got images from this page

        if downloaded_paths:
            # Clean out old bad images
            prod["images"] = downloaded_paths
            prod["mainImage"] = downloaded_paths[0]
            prod["imageDetails"] = image_details
            prod["importStatus"] = "IMPORTED"
            print(f"  ✅ Imported {len(downloaded_paths)} image(s)")
            stats["imported"].append({"name": name, "count": len(downloaded_paths)})
        else:
            prod["importStatus"] = "MANUAL_REQUIRED"
            if pages:
                prod["manualReviewUrl"] = pages[0]
            print(f"  ❌ No downloadable images found")
            stats["no_image"].append({"name": name, "pages": pages[:2]})

        # Save after each product so progress isn't lost
        DB_FILE.write_text(json.dumps(db_data, indent=2, ensure_ascii=False))

    # Final save
    DB_FILE.write_text(json.dumps(db_data, indent=2, ensure_ascii=False))

    # ── Report ──────────────────────────────────────────────────────────────
    total = len(products)
    print(f"\n{'='*65}")
    print("IMPORT REPORT")
    print(f"{'='*65}")
    print(f"TOTAL PRODUCTS:              {total}")
    print(f"IMAGES SUCCESSFULLY IMPORTED:{len(stats['imported'])}")
    print(f"ALREADY HAD VALID IMAGES:    {len(stats['already_had'])}")
    print(f"MANUAL REVIEW REQUIRED:      {len(stats['manual_review']) + len(stats['no_pages']) + len(stats['no_image'])}")
    print(f"  - No configured pages:     {len(stats['no_pages'])}")
    print(f"  - No image downloadable:   {len(stats['no_image'])}")

    if stats["imported"]:
        print(f"\n✅ IMPORTED:")
        for r in stats["imported"]:
            print(f"   • {r['name']} ({r['count']} img)")
    if stats["no_image"]:
        print(f"\n❌ NO IMAGE DOWNLOADABLE:")
        for r in stats["no_image"]:
            print(f"   • {r['name']}")
            for pg in r.get("pages", []):
                print(f"       → {pg}")

if __name__ == "__main__":
    main()
