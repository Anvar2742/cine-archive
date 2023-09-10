import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        https: {
            key: path.resolve(__dirname, "dev/key.pem"),
            cert: path.resolve(__dirname, "dev/cert.pem"),
        },
    },
});
