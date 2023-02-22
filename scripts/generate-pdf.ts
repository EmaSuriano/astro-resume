import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  const downloadButton = page.locator('a[download]');
  await downloadButton.evaluate((node) => (node.innerHTML = ''));

  const body = page.locator('body');
  await body.evaluate((node) => node.classList.remove('bg-indigo-50'));

  await page.pdf({
    path: 'public/resume.pdf',
    margin: {
      top: '50px',
      bottom: '80px',
    },
    printBackground: true,
  });

  await browser.close();
})();
