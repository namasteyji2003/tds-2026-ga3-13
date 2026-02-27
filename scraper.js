const { chromium } = require('playwright');

async function scrapeSums() {
  const browser = await chromium.launch({ headless: true });
  let grandTotal = 0;
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=85',
    'https://sanand0.github.io/tdsdata/js_table/?seed=86',
    'https://sanand0.github.io/tdsdata/js_table/?seed=87',
    'https://sanand0.github.io/tdsdata/js_table/?seed=88',
    'https://sanand0.github.io/tdsdata/js_table/?seed=89',
    'https://sanand0.github.io/tdsdata/js_table/?seed=90',
    'https://sanand0.github.io/tdsdata/js_table/?seed=91',
    'https://sanand0.github.io/tdsdata/js_table/?seed=92',
    'https://sanand0.github.io/tdsdata/js_table/?seed=93',
    'https://sanand0.github.io/tdsdata/js_table/?seed=94'
  ];

  for (const url of urls) {
    console.log(`Scraping: ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Find all table cells with numbers
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
    console.log(`Page sum: ${pageSum.toFixed(2)}`);
    
    await page.close();
  }
  
  await browser.close();
  console.log(`🎉 GRAND TOTAL: ${grandTotal.toFixed(2)}`);
  return grandTotal;
}

scrapeSums();
