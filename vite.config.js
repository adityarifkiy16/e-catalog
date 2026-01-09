import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/catalog.js"],
            defer: true,
            refresh: true,
        }),
    ],
    build: {
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
            },
            format: {
                comments: false,
                beautify: false,
            },
        },
    },
});
