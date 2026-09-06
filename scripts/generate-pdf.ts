import { chromium } from "playwright";

const main = async (): Promise<void> => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

  await page.emulateMedia({ media: "screen" });

  // Remove Astro/Vite dev overlay if present (generate-pdf:ci uses `astro dev`)
  await page.evaluate(() => {
    document
      .querySelectorAll("astro-dev-toolbar, #dev-toolbar")
      .forEach((el) => el.remove());
  });

  await page.pdf({
    path: "public/resume.pdf",
    margin: { top: "20px", bottom: "20px", left: "16px", right: "16px" },
    printBackground: true,
  });

  await browser.close();
};

void main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});