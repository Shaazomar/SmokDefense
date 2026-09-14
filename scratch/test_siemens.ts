async function testSiemensDownload() {
  const url = "https://mall.industry.siemens.com/mall/collaterals/files/204/jpg/02/50/P_BT01_XX_00158i.jpg";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
  });
  console.log("Status:", res.status);
}
testSiemensDownload();
