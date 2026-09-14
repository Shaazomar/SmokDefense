import { validateTargetUrl } from "../src/lib/scraper/engine";

async function testBelimo() {
  const url = "https://www.belimo.com/us/en_US/products/actuators/damper-actuators/lmv-d3-mp.html";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });
  console.log("Belimo response status:", res.status);
  if (res.ok) {
    const html = await res.text();
    console.log("HTML length:", html.length);
    const ogMatches = html.matchAll(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi);
    for (const m of ogMatches) console.log("OG Image:", m[1]);
  }
}

testBelimo();
