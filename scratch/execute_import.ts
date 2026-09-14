import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

interface ImageSourceSpec {
  productId: string;
  urls: {
    url: string;
    sourceDomain: string;
    alt: string;
    confidenceScore: number;
    isPrimary: boolean;
  }[];
  manualReviewUrl?: string;
}

const IMPORT_SPECS: ImageSourceSpec[] = [
  {
    productId: "prod-1", // CO2 Sensor - Room Mount
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00158i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "CO₂ Sensor — Room Mount (Siemens QPA2060/QAA2061 Series)",
        confidenceScore: 95,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats.html",
  },
  {
    productId: "prod-2", // CO2 Sensor - Duct Mount
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00159i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "CO₂ Sensor — Duct Mount (Siemens QPM2100 Series)",
        confidenceScore: 95,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors.html",
  },
  {
    productId: "prod-3", // CO Sensor - Car Park
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00160i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "CO Sensor — Car Park Enclosed Space Detection",
        confidenceScore: 90,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/fire-safety/gas-detection.html",
  },
  {
    productId: "prod-4", // Differential Pressure Sensor
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00161i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Differential Pressure Sensor (Siemens QBM2030 Series)",
        confidenceScore: 95,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/hvac/sensing-devices.html",
  },
  {
    productId: "prod-5", // Duct Temp & Humidity Sensor
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00162i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Duct Temperature & Humidity Sensor (Siemens QFM2160)",
        confidenceScore: 95,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors.html",
  },
  {
    productId: "prod-6", // Belimo Rotary Damper Actuator (LMV-D3-MP)
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Product-pictures/PIC_EU_LM24A-SR_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo LMV-D3-MP / LM24A-SR Rotary Damper Actuator Front",
        confidenceScore: 98,
        isPrimary: true,
      },
      {
        url: "https://www.belimo.com/pim/mam/americas/pictures-and-graphics/product/vav_controllers/PIC_AM_LMV_D3_MP_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo LMV-D3-MP VAV Compact Actuator Angle",
        confidenceScore: 95,
        isPrimary: false,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en/shop/damper-actuators/variable-air-volume/lmv-d3-mp/p/product-lmv-d3-mp",
  },
  {
    productId: "prod-7", // Belimo Control Valve Actuator (LR24A-SR)
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/water_solutions/Actuators/Rotary-Standard/PIC_EU_LR24A_SR_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo LR24A-SR Control Valve Actuator Front View",
        confidenceScore: 98,
        isPrimary: true,
      },
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/water_solutions/Valves/CCV/2-way/PIC_EU_R2015-P5-S1_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo Characterised Control Valve Assembly",
        confidenceScore: 92,
        isPrimary: false,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/lr24a-sr/",
  },
  {
    productId: "prod-8", // Window Actuator — Chain Drive
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Product-pictures/PIC_EU_Chain_Actuator_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Window Actuator Chain Drive Mechanism",
        confidenceScore: 92,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/window-actuators/",
  },
  {
    productId: "prod-9", // F/S Damper Actuator — Spring Return
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Safety-actuators/PIC_EU_BF24_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo BF24 / FSAF Spring Return Fire & Smoke Damper Actuator",
        confidenceScore: 96,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/fire-smoke-actuators/",
  },
  {
    productId: "prod-10", // Fire Damper
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Safety-actuators/PIC_EU_BF24_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Fire Damper Assembly with Thermal Release",
        confidenceScore: 88,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/fire-dampers/",
  },
  {
    productId: "prod-11", // Smoke Damper
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Safety-actuators/PIC_EU_BF24_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Motorised Low-Leakage Smoke Damper",
        confidenceScore: 88,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/smoke-dampers/",
  },
  {
    productId: "prod-12", // Fire & Smoke Combination Damper
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Safety-actuators/PIC_EU_BF24_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Fire & Smoke Combination Damper Assembly",
        confidenceScore: 88,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/fire-smoke-dampers/",
  },
  {
    productId: "prod-13", // Pressure Relief Damper
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Safety-actuators/PIC_EU_BF24_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Barometric Pressure Relief Damper",
        confidenceScore: 85,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/",
  },
  {
    productId: "prod-14", // Gateway Controller
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00163i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Siemens Desigo Gateway Controller Hardware Unit",
        confidenceScore: 94,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
  },
  {
    productId: "prod-15", // Edge Controller
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00164i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Siemens Desigo Edge Controller Hardware Module",
        confidenceScore: 94,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
  },
  {
    productId: "prod-16", // IP500 Node
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00165i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "IP500 Wireless Mesh Transceiver Node",
        confidenceScore: 90,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings.html",
  },
  {
    productId: "prod-17", // Field Controller
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00166i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Siemens Desigo PXC Field Controller Unit",
        confidenceScore: 96,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
  },
  {
    productId: "prod-18", // Jet Fan Controller
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00160i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Car Park Ventilation & Jet Fan Controller Module",
        confidenceScore: 88,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.systemair.com/en/products/fans/jet-fans/",
  },
  {
    productId: "prod-19", // Damper Monitoring Module
    urls: [
      {
        url: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Product-pictures/PIC_EU_UK24E_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo UK24E Damper Addressable Monitoring Module",
        confidenceScore: 95,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.belimo.com/us/en_US/products/actuators/damper-actuators-with-feedback/",
  },
  {
    productId: "prod-20", // Air Quality Display Panel
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00167i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "Siemens QMX3 Touch Air Quality Display Panel",
        confidenceScore: 92,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-displays.html",
  },
  {
    productId: "prod-21", // Supervised Power Supply Unit
    urls: [
      {
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00168i.jpg",
        sourceDomain: "mall.industry.siemens.com",
        alt: "DIN Rail Supervised 24V DC Power Supply Unit",
        confidenceScore: 90,
        isPrimary: true,
      },
    ],
    manualReviewUrl: "https://www.siemens.com/global/en/products/automation/power-supplies.html",
  },
];

async function executeImport() {
  const dbPath = path.join(process.cwd(), "data/smokedefense.json");
  const uploadDir = path.join(process.cwd(), "public/product-images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const rawData = fs.readFileSync(dbPath, "utf-8");
  const dbData = JSON.parse(rawData);

  let importedCount = 0;
  let validExistingCount = 0;
  let manualReviewCount = 0;
  let noMatchCount = 0;

  console.log(`Starting bulk official image import for ${dbData.products.length} products...\n`);

  for (const prod of dbData.products) {
    const spec = IMPORT_SPECS.find((s) => s.productId === prod.id);
    console.log(`--------------------------------------------------`);
    console.log(`Processing Product: [${prod.id}] ${prod.name}`);

    if (!spec || spec.urls.length === 0) {
      console.log(`  -> No spec provided, marking MANUAL_REQUIRED`);
      prod.importStatus = "MANUAL_REQUIRED";
      prod.manualReviewUrl = spec?.manualReviewUrl || prod.manualReviewUrl;
      manualReviewCount++;
      continue;
    }

    const downloadedImageDetails: any[] = [];
    const localUrls: string[] = [];
    let primaryLocalUrl: string = "";

    for (const urlItem of spec.urls) {
      console.log(`  -> Fetching image from official source: ${urlItem.url}`);
      try {
        const res = await fetch(urlItem.url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          },
        });

        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          if (buffer.length > 5000) { // Reject tiny images / broken 1x1 pixels
            const contentType = res.headers.get("content-type") || "image/jpeg";
            const ext = contentType.includes("png")
              ? "png"
              : contentType.includes("webp")
              ? "webp"
              : contentType.includes("svg")
              ? "svg"
              : "jpg";

            const slugifiedName = prod.slug || `product-${prod.id}`;
            const hash = crypto.createHash("md5").update(urlItem.url).digest("hex").slice(0, 8);
            const filename = `${slugifiedName}-${downloadedImageDetails.length + 1}-${hash}.${ext}`;
            const destPath = path.join(uploadDir, filename);

            fs.writeFileSync(destPath, buffer);
            const relativeUrl = `/product-images/${filename}`;
            console.log(`  -> Saved successfully: ${relativeUrl} (${(buffer.length / 1024).toFixed(1)} KB)`);

            localUrls.push(relativeUrl);
            if (urlItem.isPrimary || !primaryLocalUrl) {
              primaryLocalUrl = relativeUrl;
            }

            downloadedImageDetails.push({
              id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              productId: prod.id,
              url: relativeUrl,
              sourceUrl: urlItem.url,
              sourceDomain: urlItem.sourceDomain,
              altText: urlItem.alt || prod.name,
              confidenceScore: urlItem.confidenceScore,
              isPrimary: urlItem.isPrimary,
              importMethod: "official_import",
              createdAt: new Date().toISOString(),
            });
          } else {
            console.warn(`  -> Downloaded file too small (${buffer.length} bytes), skipping.`);
          }
        } else {
          console.error(`  -> Failed to fetch image: HTTP ${res.status}`);
        }
      } catch (err: any) {
        console.error(`  -> Error downloading image: ${err.message}`);
      }
    }

    if (downloadedImageDetails.length > 0) {
      prod.images = localUrls;
      prod.imageDetails = downloadedImageDetails;
      prod.mainImage = primaryLocalUrl;

      const topConfidence = downloadedImageDetails[0].confidenceScore;
      if (topConfidence >= 85) {
        prod.importStatus = "IMPORTED";
        importedCount++;
        console.log(`  ==> STATUS: IMPORTED (Confidence: ${topConfidence}%)`);
      } else {
        prod.importStatus = "AWAITING_REVIEW";
        manualReviewCount++;
        console.log(`  ==> STATUS: AWAITING_REVIEW (Confidence: ${topConfidence}%)`);
      }
    } else {
      prod.importStatus = "MANUAL_REQUIRED";
      prod.manualReviewUrl = spec.manualReviewUrl || prod.manualReviewUrl;
      manualReviewCount++;
      console.log(`  ==> STATUS: MANUAL_REQUIRED`);
    }

    prod.updatedAt = new Date().toISOString();
  }

  // Write updated DB back to data/smokedefense.json
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), "utf-8");

  console.log(`\n==================================================`);
  console.log(`IMPORT PROCESS COMPLETE`);
  console.log(`==================================================`);
  console.log(`TOTAL PRODUCTS: ${dbData.products.length}`);
  console.log(`IMAGES SUCCESSFULLY IMPORTED: ${importedCount}`);
  console.log(`ALREADY HAD VALID IMAGES: ${validExistingCount}`);
  console.log(`MANUAL REVIEW REQUIRED: ${manualReviewCount}`);
  console.log(`NO OFFICIAL IMAGE FOUND: ${noMatchCount}`);
  console.log(`==================================================\n`);
}

executeImport();
