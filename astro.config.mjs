import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.codextreme.es",
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: "static",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
    }),
  ],
  // AQUI ESTÁ LA MAGIA: Nivel raíz de Astro
  server: {
    host: true,
    allowedHosts: true
  },
  preview: {
    host: true,
    allowedHosts: true
  },
  // Lo dejamos en Vite también como doble seguro
  vite: {
    preview: {
      allowedHosts: true
    },
    server: {
      allowedHosts: true
    }
  }
});
