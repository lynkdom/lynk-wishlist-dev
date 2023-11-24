import react from "@vitejs/plugin-react";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import mkcert from'vite-plugin-mkcert';

const PORT = process.env.PORT || 8081;
const VitePort = 8080;

const proxyOptions = {
  target: `https://127.0.0.1:${PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.SHOPIFY_APP_URL
  ? process.env.SHOPIFY_APP_URL.replace(/https?:\/\//, "")
  : "localhost";
let hmrConfig;

if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: VitePort,
    clientPort: 443,
  };
}

export default defineConfig({
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    appOrigin: JSON.stringify(
      process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "")
    ),
  },
  plugins: [react(), mkcert()],
  build: {
    outDir: "../dist/client/",
  },
  root: dirname(fileURLToPath(import.meta.url)),
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: "localhost",
    port: VitePort,
    hmr: hmrConfig,
    https: false,
    proxy: {
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },
});
