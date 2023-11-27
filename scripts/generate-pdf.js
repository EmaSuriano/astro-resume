import { chromium } from "playwright";

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

  await page.emulateMedia({ media: "screen" });

  await page.pdf({
    path: "public/resume.pdf",
    margin: { top: "50px", bottom: "80px" },
    printBackground: true,
  });

  return browser.close();
};

main();
