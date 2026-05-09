import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const DEFAULT_DEV_PORT = 3000;

function getDevPort() {
	const port = process.env.PORT ? Number(process.env.PORT) : DEFAULT_DEV_PORT;
	return Number.isInteger(port) && port > 0 ? port : DEFAULT_DEV_PORT;
}

const devHost = process.env.HOST?.trim();

const config = defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		host: devHost || undefined,
		port: getDevPort(),
		strictPort: Boolean(process.env.PORT),
	},
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
