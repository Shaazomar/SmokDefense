import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

interface ProductSpec {
  id: string;
  name: string;
  brandName: string;
  category: string;
  modelNumber?: string;
  officialPageUrl: string;
  imagesToImport?: {
    sourceUrl: string;
    sourceDomain: string;
    alt: string;
    confidenceScore: number;
    isPrimary: boolean;
  }[];
  candidatesForReview?: {
    id: string;
    url: string;
    sourceUrl: string;
    sourceDomain: string;
    alt: string;
    confidenceScore: number;
    matchReasons: string[];
  }[];
  reasonUncertainty?: string;
}

const CATALOG_SPECS: ProductSpec[] = [
  {
    id: "prod-1",
    name: "CO₂ Sensor — Room Mount",
    brandName: "SmokeDefense",
    category: "sensors",
    modelNumber: "SD-CO2-R",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-co2-sensor.html",
    reasonUncertainty: "Manufacturer product portal requires corporate auth to download raw high-resolution image asset.",
    candidatesForReview: [
      {
        id: "cand-p1-1",
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00158i.jpg",
        sourceUrl: "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-co2-sensor.html",
        sourceDomain: "siemens.com",
        alt: "CO₂ Sensor — Room Mount (Siemens QPA2060/QAA2061)",
        confidenceScore: 78,
        matchReasons: ["Official domain match (siemens.com)", "Product category match"],
      },
    ],
  },
  {
    id: "prod-2",
    name: "CO₂ Sensor — Duct Mount",
    brandName: "SmokeDefense",
    category: "sensors",
    modelNumber: "SD-CO2-D",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-co2-sensor.html",
    reasonUncertainty: "Multiple duct probe lengths available; exact model variant image requires admin selection.",
    candidatesForReview: [
      {
        id: "cand-p2-1",
        url: "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00159i.jpg",
        sourceUrl: "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-co2-sensor.html",
        sourceDomain: "siemens.com",
        alt: "CO₂ Sensor — Duct Mount (Siemens QPM2100)",
        confidenceScore: 78,
        matchReasons: ["Official domain match (siemens.com)", "Product category match"],
      },
    ],
  },
  {
    id: "prod-3",
    name: "CO Sensor — Car Park",
    brandName: "SmokeDefense",
    category: "sensors",
    modelNumber: "SD-CO-CP",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/fire-safety/gas-detection.html",
    reasonUncertainty: "Enclosed parking gas detector configuration varies by enclosure rating (IP65 vs IP54).",
  },
  {
    id: "prod-4",
    name: "Differential Pressure Sensor",
    brandName: "SmokeDefense",
    category: "sensors",
    modelNumber: "SD-DPS-100",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/hvac/sensing-devices/differential-pressure-sensors.html",
    reasonUncertainty: "Pressure port configuration (6mm vs 8mm) needs manual confirmation.",
  },
  {
    id: "prod-5",
    name: "Duct Temperature & Humidity Sensor",
    brandName: "SmokeDefense",
    category: "sensors",
    modelNumber: "SD-DTH-150",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/hvac/duct-sensors/duct-temperature-humidity-sensors.html",
    reasonUncertainty: "Probe length selection required.",
  },
  {
    id: "prod-6",
    name: "Belimo Rotary Damper Actuator",
    brandName: "Belimo",
    category: "actuators",
    modelNumber: "LMV-D3-MP",
    officialPageUrl: "https://www.belimo.com/us/en/shop/damper-actuators/variable-air-volume/lmv-d3-mp/p/product-lmv-d3-mp",
    imagesToImport: [
      {
        sourceUrl: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Product-pictures/PIC_EU_LM24A-SR_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo LMV-D3-MP / LM24A-SR Rotary Damper Actuator High-Res Product Photograph",
        confidenceScore: 98,
        isPrimary: true,
      },
    ],
  },
  {
    id: "prod-7",
    name: "Belimo Control Valve Actuator",
    brandName: "Belimo",
    category: "actuators",
    modelNumber: "LR24A-SR",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/lr24a-sr/",
    imagesToImport: [
      {
        sourceUrl: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/water_solutions/Actuators/Rotary-Standard/PIC_EU_LR24A_SR_01_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo LR24A-SR Control Valve Actuator High-Res Product Photograph",
        confidenceScore: 98,
        isPrimary: true,
      },
    ],
  },
  {
    id: "prod-8",
    name: "Window Actuator — Chain Drive",
    brandName: "SmokeDefense",
    category: "actuators",
    modelNumber: "SD-WA-300",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/window-actuators/",
    reasonUncertainty: "Window push-pull stroke option (150mm vs 300mm vs 500mm) needs manual verification.",
  },
  {
    id: "prod-9",
    name: "F/S Damper Actuator — Spring Return",
    brandName: "SmokeDefense",
    category: "actuators",
    modelNumber: "SD-FS-16N",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/fire-smoke-actuators/",
    imagesToImport: [
      {
        sourceUrl: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/safety_solutions/Product-pictures/BF/PIC_EU_BF24_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo BF24 24V Spring Return Fire & Smoke Damper Actuator",
        confidenceScore: 96,
        isPrimary: true,
      },
      {
        sourceUrl: "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/safety_solutions/Product-pictures/BF/PIC_EU_BF230_4C-product_retina.jpg",
        sourceDomain: "belimo.com",
        alt: "Belimo BF230 230V Spring Return Fire & Smoke Damper Actuator",
        confidenceScore: 94,
        isPrimary: false,
      },
    ],
  },
  {
    id: "prod-10",
    name: "Fire Damper",
    brandName: "SmokeDefense",
    category: "dampers",
    modelNumber: "SD-FD-400",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/fire-dampers/",
    reasonUncertainty: "Wall penetration rating option (60 min vs 120 min) requires sizing selection.",
  },
  {
    id: "prod-11",
    name: "Smoke Damper",
    brandName: "SmokeDefense",
    category: "dampers",
    modelNumber: "SD-SD-600",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/smoke-dampers/",
    reasonUncertainty: "Leakage class rating verification required.",
  },
  {
    id: "prod-12",
    name: "Fire & Smoke Combination Damper",
    brandName: "SmokeDefense",
    category: "dampers",
    modelNumber: "SD-FSD-800",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/fire-smoke-dampers/",
    reasonUncertainty: "Combination assembly sizing requires mechanical schedule approval.",
  },
  {
    id: "prod-13",
    name: "Pressure Relief Damper",
    brandName: "SmokeDefense",
    category: "dampers",
    modelNumber: "SD-PRD-600",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/",
    reasonUncertainty: "Barometric vs motorised relief flap mechanism option.",
  },
  {
    id: "prod-14",
    name: "Gateway Controller",
    brandName: "SmokeDefense",
    category: "controllers",
    modelNumber: "SD-GC-250",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
    reasonUncertainty: "BACnet vs Modbus expansion board module image selection.",
  },
  {
    id: "prod-15",
    name: "Edge Controller",
    brandName: "SmokeDefense",
    category: "controllers",
    modelNumber: "SD-EC-32",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
    reasonUncertainty: "Industrial ARM enclosure mounting variant selection.",
  },
  {
    id: "prod-16",
    name: "IP500 Node",
    brandName: "SmokeDefense",
    category: "controllers",
    modelNumber: "SD-IP500-N",
    officialPageUrl: "https://new.siemens.com/global/en/products/buildings/fire-safety/intelligent-wireless/gamma-wave.html",
    reasonUncertainty: "Dual-band mesh antenna enclosure variant selection.",
  },
  {
    id: "prod-17",
    name: "Field Controller",
    brandName: "SmokeDefense",
    category: "controllers",
    modelNumber: "SD-FC-18",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/automation/desigo.html",
    reasonUncertainty: "Local I/O expansion board layout selection.",
  },
  {
    id: "prod-18",
    name: "Jet Fan Controller",
    brandName: "SmokeDefense",
    category: "controllers",
    modelNumber: "SD-JFC-12",
    officialPageUrl: "https://www.systemair.com/en/products/fans/jet-fans/",
    reasonUncertainty: "Panels configured per fan zone count (4 vs 8 vs 12).",
  },
  {
    id: "prod-19",
    name: "Damper Monitoring Module",
    brandName: "SmokeDefense",
    category: "field-devices",
    modelNumber: "SD-DMM-4",
    officialPageUrl: "https://www.belimo.com/us/en_US/products/actuators/damper-actuators-with-feedback/",
    reasonUncertainty: "Addressable bus module housing selection.",
  },
  {
    id: "prod-20",
    name: "Air Quality Display Panel",
    brandName: "SmokeDefense",
    category: "field-devices",
    modelNumber: "SD-AQD-1",
    officialPageUrl: "https://www.siemens.com/global/en/products/buildings/hvac/room-sensors-thermostats/room-displays.html",
    reasonUncertainty: "Touch panel bezel finish (White vs Black) selection.",
  },
  {
    id: "prod-21",
    name: "Supervised Power Supply Unit",
    brandName: "SmokeDefense",
    category: "field-devices",
    modelNumber: "SD-PSU-24V",
    officialPageUrl: "https://www.siemens.com/global/en/products/automation/power-supplies.html",
    reasonUncertainty: "5A vs 10A DIN rail supply variant selection.",
  },
];

async function runProcess() {
  const dbFile = path.join(process.cwd(), "data/smokedefense.json");
  const uploadDir = path.join(process.cwd(), "public/product-images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const data = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  let importedCount = 0;
  let manualReviewCount = 0;
  let alreadyValidCount = 0;
  let noMatchCount = 0;

  console.log(`Processing ${data.products.length} products...\n`);

  for (const prod of data.products) {
    const spec = CATALOG_SPECS.find((s) => s.id === prod.id);

    if (!spec) {
      prod.importStatus = "MANUAL_REQUIRED";
      manualReviewCount++;
      continue;
    }

    if (spec.modelNumber && !prod.modelNumber) {
      prod.modelNumber = spec.modelNumber;
    }
    if (spec.officialPageUrl) {
      prod.manualReviewUrl = spec.officialPageUrl;
    }

    if (spec.imagesToImport && spec.imagesToImport.length > 0) {
      const localImageUrls: string[] = [];
      const imageDetails: any[] = [];
      let primaryUrl = "";

      for (let idx = 0; idx < spec.imagesToImport.length; idx++) {
        const item = spec.imagesToImport[idx];
        console.log(`[${prod.id}] Downloading official image: ${item.sourceUrl}`);

        try {
          const res = await fetch(item.sourceUrl, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            },
          });

          if (res.ok) {
            const buf = Buffer.from(await res.arrayBuffer());
            const hash = crypto.createHash("md5").update(item.sourceUrl).digest("hex").slice(0, 8);
            const ext = "jpg";
            const filename = `${prod.slug}-${idx + 1}-${hash}.${ext}`;
            const filePath = path.join(uploadDir, filename);

            fs.writeFileSync(filePath, buf);
            const localUrl = `/product-images/${filename}`;

            localImageUrls.push(localUrl);
            if (item.isPrimary || !primaryUrl) {
              primaryUrl = localUrl;
            }

            imageDetails.push({
              id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              productId: prod.id,
              url: localUrl,
              sourceUrl: item.sourceUrl,
              sourceDomain: item.sourceDomain,
              altText: item.alt || prod.name,
              confidenceScore: item.confidenceScore,
              isPrimary: item.isPrimary,
              importMethod: "official_import",
              createdAt: new Date().toISOString(),
            });

            console.log(`   -> Downloaded & Saved: ${localUrl} (${(buf.length / 1024).toFixed(1)} KB)`);
          }
        } catch (err: any) {
          console.error(`   -> Download error: ${err.message}`);
        }
      }

      if (imageDetails.length > 0) {
        prod.images = localImageUrls;
        prod.imageDetails = imageDetails;
        prod.mainImage = primaryUrl;
        prod.importStatus = "IMPORTED";
        importedCount++;
      } else {
        prod.importStatus = "MANUAL_REQUIRED";
        manualReviewCount++;
      }
    } else {
      // Clear out old invalid placeholder stock images if any
      prod.images = [];
      prod.imageDetails = [];
      prod.mainImage = undefined;
      prod.importStatus = "MANUAL_REQUIRED";
      manualReviewCount++;
    }

    prod.updatedAt = new Date().toISOString();
  }

  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");

  console.log(`\n==================================================`);
  console.log(`FINAL REPORT`);
  console.log(`==================================================`);
  console.log(`TOTAL PRODUCTS: ${data.products.length}`);
  console.log(`IMAGES SUCCESSFULLY IMPORTED: ${importedCount}`);
  console.log(`ALREADY HAD VALID IMAGES: ${alreadyValidCount}`);
  console.log(`MANUAL REVIEW REQUIRED: ${manualReviewCount}`);
  console.log(`NO OFFICIAL IMAGE FOUND: ${noMatchCount}`);
  console.log(`==================================================\n`);
}

runProcess();
