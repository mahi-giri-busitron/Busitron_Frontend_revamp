import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": {
                target: "http://backend:5421",
                changeOrigin: true,
            },
        },
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        watch: {
            usePolling: true,
          },
    },
});
