import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:8788/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    svelte({
      preprocess: [preprocess()],
    }),
  ],
});
