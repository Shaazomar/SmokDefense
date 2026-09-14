import fs from "node:fs";
import path from "node:path";
import { scrapeProductPage, searchOfficialManufacturerPage } from "../src/lib/scraper/engine";

interface Product {
  id: string;
  name: string;
  brandName: string;
  manufacturer?: string;
  modelNumber?: string;
  category: string;
  images?: string[];
  mainImage?: string;
  importStatus?: string;
  manualReviewUrl?: string;
  specs?: { label: string; value: string }[];
}

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/override-r.json"), "utf-8"));
const products: Product[] = data.products;

// Official URL mapping for specific products where known or given in manualReviewUrl
const OFFICIAL_URL_MAP: Record<string, string> = {
  "prod-1": "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-co2-sensor.html",
  "prod-2": "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-co2-sensor.html",
  "prod-3": "https://www.siemens.com/global/en/products/buildings/fire-safety/gas-detection.html",
  "prod-4": "https://www.siemens.com/global/en/products/buildings/hvac/sensing-devices/differential-pressure-sensors.html",
  "prod-5": "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-temperature-humidity-sensors.html",
  "prod-6": "https://www.belimo.com/us/en_US/products/actuators/damper-actuators/lmv-d3-mp.html",
  "prod-7": "https://www.belimo.com/us/en_US/products/lr24a-sr/",
  "prod-8": "https://www.belimo.com/us/en_US/products/window-actuators/",
  "prod-14": "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
  "prod-15": "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
  "prod-16": "https://new.siemens.com/global/en/products/buildings/fire-safety/intelligent-wireless/gamma-wave.html",
  "prod-17": "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
  "prod-18": "https://www.systemair.com/en/products/fans/jet-fans/",
  "prod-19": "https://www.belimo.com/us/en_US/products/actuators/damper-actuators-with-feedback/",
  "prod-20": "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-displays.html",
};

async function run() {
  console.log(`Starting discovery for ${products.length} products...\n`);

  for (const prod of products) {
    console.log(`==================================================`);
    console.log(`Product [${prod.id}]: ${prod.name}`);
    console.log(`Brand: ${prod.brandName} | Model: ${prod.modelNumber || "N/A"} | Category: ${prod.category}`);
    console.log(`Current images: ${prod.images?.length || 0} | Main: ${prod.mainImage || "None"}`);
    
    let targetUrl = OFFICIAL_URL_MAP[prod.id] || prod.manualReviewUrl;
    
    if (!targetUrl) {
      console.log(`Searching official page via Search Engine...`);
      targetUrl = await searchOfficialManufacturerPage(
        prod.brandName,
        prod.brandName.toLowerCase().includes("belimo") ? "belimo.com" : undefined,
        prod.modelNumber,
        prod.name
      ) || undefined;
    }

    console.log(`Target Official URL: ${targetUrl || "None found"}`);

    if (targetUrl) {
      try {
        const { candidates, pageTitle } = await scrapeProductPage(
          targetUrl,
          prod.modelNumber,
          prod.name,
          prod.brandName.toLowerCase().includes("belimo") ? "belimo.com" : "siemens.com"
        );
        console.log(`Page Title: "${pageTitle}"`);
        console.log(`Candidates Found: ${candidates.length}`);
        candidates.slice(0, 5).forEach((c, idx) => {
          console.log(`  Candidate #${idx + 1}: Score ${c.confidenceScore} | URL: ${c.url} | Alt: "${c.alt}"`);
        });
      } catch (err: any) {
        console.log(`Scrape failed for ${targetUrl}: ${err.message}`);
      }
    }
    console.log(`\n`);
  }
}

run();
