async function testBF230() {
  const url = "https://www.belimo.com/pim/mam/europe/pictures-and-graphics/product/safety_solutions/Product-pictures/BF/PIC_EU_BF230_4C-product_retina.jpg";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
  });
  console.log("BF230 status:", res.status);
  if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    console.log("BF230 size:", buffer.length);
  }
}
testBF230();
