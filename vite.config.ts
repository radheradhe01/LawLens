import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests to FastAPI backend
      "/stats": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/chatbot": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/trending-legal-news": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/verify-news": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      // Add more API routes here if needed
      }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
