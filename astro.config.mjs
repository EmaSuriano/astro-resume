import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const forceTheme = process.env.FORCE_THEME;

/** Inject class-based dark variant when FORCE_THEME is set (for build:light / build:dark). */
function forceThemeDarkMode() {
  return {
    name: "force-theme-dark-mode",
    transform(code, id) {
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
  vite: {
    plugins: [forceThemeDarkMode(), tailwindcss()],
    ssr: {
      external: ["svgo"],
    },
  },
});