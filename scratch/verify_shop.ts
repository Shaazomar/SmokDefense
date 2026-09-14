async function verifyShop() {
  const shopRes = await fetch("http://localhost:3000/shop");
  console.log("Shop Page Status:", shopRes.status);
  const html = await shopRes.text();
  
  // Check for downloaded image URLs in HTML
  const imageMatches = html.match(/\/product-images\/[a-zA-Z0-9_-]+\.jpg/g);
  console.log("Product images found on /shop page:", imageMatches);

  if (imageMatches && imageMatches.length > 0) {
    for (const imgPath of new Set(imageMatches)) {
      const imgRes = await fetch(`http://localhost:3000${imgPath}`);
      console.log(`Testing image HTTP GET http://localhost:3000${imgPath} -> Status: ${imgRes.status}, Size: ${imgRes.headers.get("content-length")} bytes`);
    }
  }
}

verifyShop();
