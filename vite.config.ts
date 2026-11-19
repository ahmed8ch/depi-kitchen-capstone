import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    target: "es2023",
    sourcemap: "hidden",
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[/\\](?:react|react-dom|scheduler)[/\\]/,
              priority: 40,
            },
            {
              name: "tanstack-vendor",
              test: /node_modules[/\\]@tanstack[/\\]/,
              priority: 30,
            },
            {
              name: "convex-vendor",
              test: /node_modules[/\\](?:convex|@convex-dev)[/\\]/,
              priority: 25,
            },
            {
              name: "ui-vendor",
              test: /node_modules[/\\](?:@base-ui|@hugeicons|motion|zod)[/\\]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
});
