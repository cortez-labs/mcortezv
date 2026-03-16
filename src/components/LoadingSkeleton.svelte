<script lang="ts">
	import { onMount } from 'svelte';
	import { createShimmerEffect } from '$lib/animations/gsap-config';
	
	let skeletonElement: HTMLElement;
	
	onMount(() => {
		if (skeletonElement) {
			// Apply shimmer effect directly without GSAP for now
			skeletonElement.classList.add('shimmer-active');
		}
	});
</script>

<div class="paper-card bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 flex flex-col justify-between min-h-[320px] overflow-hidden">
	<!-- Header skeleton -->
	<div class="mb-4">
		<div class="flex items-center gap-2 mb-3">
			<div class="w-16 h-5 rounded-md shimmer"></div>
			<div class="w-20 h-5 rounded-md shimmer"></div>
		</div>
		
		<div class="h-8 bg-[var(--muted)] rounded-md shimmer mb-3"></div>
	</div>
	
	<!-- Content skeleton -->
	<div class="space-y-2 mb-4">
		<div class="h-4 bg-[var(--muted)] rounded-md shimmer"></div>
		<div class="h-4 bg-[var(--muted)] rounded-md shimmer"></div>
		<div class="h-4 bg-[var(--muted)] rounded-md shimmer w-3/4"></div>
	</div>
	
	<!-- Tags skeleton -->
	<div class="flex flex-wrap gap-1.5 mb-4">
		<div class="w-16 h-6 rounded-md shimmer"></div>
		<div class="w-20 h-6 rounded-md shimmer"></div>
		<div class="w-14 h-6 rounded-md shimmer"></div>
	</div>
	
	<!-- Footer skeleton -->
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<div class="w-12 h-4 rounded-md shimmer"></div>
			<div class="w-8 h-4 rounded-md shimmer"></div>
		</div>
	</div>
</div>

<style>
	.shimmer {
		background: linear-gradient(
			90deg,
			var(--muted) 0%,
			var(--accent) 50%,
			var(--muted) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}
	
	.shimmer-active {
		background: linear-gradient(
			90deg,
			var(--muted) 0%,
			var(--accent) 50%,
			var(--muted) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}
	
	@keyframes shimmer {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}
</style>
