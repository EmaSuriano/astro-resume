import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const forceTheme = process.env.FORCE_THEME;
const pdfView = Boolean(process.env.PDF_VIEW);

/** Inject class-based dark variant when FORCE_THEME is set (for build:light / build:dark). */
function forceThemeDarkMode() {
  return {
    name: "force-theme-dark-mode",
    transform(code: string, id: string) {
      if (!forceTheme || !id.includes("styles.css")) return;
      if (code.includes("@custom-variant dark")) return;
      return code.replace(
        '@import "tailwindcss";',
        `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));`,
      );
    },
  };
}

// https://astro.build/config
export default defineConfig({
  // PDF export runs against `astro dev`; keep the toolbar off so it never lands in the PDF
  devToolbar: { enabled: !pdfView },
  vite: {
    plugins: [forceThemeDarkMode(), tailwindcss()],
    ssr: {
      external: ["svgo"],
    },
  },
});