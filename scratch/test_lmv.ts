import { scrapeProductPage } from "../src/lib/scraper/engine";

async function testLMV() {
  const url = "https://www.belimo.com/us/en/shop/damper-actuators/variable-air-volume/lmv-d3-mp/p/product-lmv-d3-mp";
  try {
    const { candidates, pageTitle } = await scrapeProductPage(url, "LMV-D3-MP", "Belimo Rotary Damper Actuator", "belimo.com");
    console.log("Page Title:", pageTitle);
    console.log("Candidates:", candidates.length);
    candidates.forEach(c => console.log(c.confidenceScore, c.url));
  } catch (err: any) {
    console.error("Scrape error:", err.message);
  }
}

testLMV();
