import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			maxDuration: 300,
			runtime: 'nodejs22.x',
		}),
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$src: './src',
		},
	},
	preprocess: vitePreprocess(),
};

export default config;
