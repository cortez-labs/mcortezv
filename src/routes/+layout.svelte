<script>
	import { page } from '$app/stores';
	import { initOrwel } from "$lib/orwel";
	import { captureUTMs } from "$lib/utm";
	import { initLenis, initTheatreStudio } from "$lib/animations";
	import { features } from "$lib/features";
	import "../app.css";

	let { children } = $props();

	$effect(() => {
		initOrwel();
		captureUTMs();
		initLenis();

		if (features.theatreStudio) {
			initTheatreStudio();
		}
	});
</script>

<div class="min-h-screen" class:font-display-site={!$page.url.pathname.startsWith('/papers/')}>
	{@render children()}
</div>
