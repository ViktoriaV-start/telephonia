import { defineConfig } from "vite";

import reactRefresh from "@vitejs/plugin-react-refresh";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

import { fileURLToPath, URL } from "url";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/about.jsx",
                "resources/js/home.jsx",
                "resources/js/applications.jsx",
                "resources/js/managers.jsx",
                "resources/js/login.jsx",
                "resources/js/createUser.jsx",
            ],

            refresh: true,
        }),
        reactRefresh(),
        react(),
    ],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/src/", import.meta.url)),
            // Scss aliaces
            "@vars": fileURLToPath(
                new URL(
                    "./resources/src/styles/_variables.scss",
                    import.meta.url
                )
            ),
            "@mixins": fileURLToPath(
                new URL("./resources/src/styles/_mixins.scss", import.meta.url)
            ),
            "@slider": fileURLToPath(
                new URL("~slick-carousel/slick/", import.meta.url)
            ),
        },
    },
});
