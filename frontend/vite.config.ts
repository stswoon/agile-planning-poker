import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import mainPackageJson from "../package.json";

export default defineConfig((configEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd(), "");
    console.log(`env.API_DOMAIN=${env.API_DOMAIN}`);

    return {
        plugins: [react()],
        define: {
            __APP_VERSION__: JSON.stringify(mainPackageJson.version),
            // __API_DOMAIN__: env.API_DOMAIN ?? "qwe",
            __API_DOMAIN__: JSON.stringify(env.API_DOMAIN ?? ""),
        },
    };
});
