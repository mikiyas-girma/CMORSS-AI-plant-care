import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const apiURL = process.env.VITE_API_URL || "http://localhost:3000"
 
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: apiURL,
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
