import fs from "node:fs";
import path from "node:path";

async function testDownload() {
  const url = "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/air_applications/Product-pictures/PIC_EU_LM24A-SR_4C-product_retina.jpg";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
  });

  console.log("Status:", res.status);
  if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    console.log("Downloaded bytes:", buffer.length);
    const dest = path.join(process.cwd(), "public/product-images/test_lm24a.jpg");
    fs.writeFileSync(dest, buffer);
    console.log("Saved to:", dest);
  }
}

testDownload();
