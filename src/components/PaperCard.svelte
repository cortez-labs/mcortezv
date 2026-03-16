<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { create3DCardFlip, animateStagger } from '$lib/animations/gsap-config';
	
	export let paper: {
		title: string;
		category: string;
		date: string;
		abstract: string;
		heroImage: string;
		readingTime: string;
		tags: string[];
		citations: number;
		downloads: number;
		slug: string;
	};
	
	export let delay: number = 0;
	
	const dispatch = createEventDispatcher();
	let cardElement: HTMLElement;
	let innerElement: HTMLElement;
	let isHovered = false;
	
	onMount(() => {
		// Initialize 3D card flip effect
		create3DCardFlip(cardElement);
		
		// Stagger animation with delay
		setTimeout(() => {
			animateStagger([cardElement], {
				delay: delay * 0.1,
				scrollTrigger: true
			});
		}, 100);
	});
	
	function handleClick() {
		dispatch('click', paper);
	}
	
	function handleMouseEnter() {
		isHovered = true;
	}
	
	function handleMouseLeave() {
		isHovered = false;
	}
	
	// Format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
	
	// Get category color - now using consistent academic colors
	function getCategoryColor(category: string): string {
		const colors: Record<string, string> = {
			'Machine Learning': 'var(--academic-600)',
			'Quantum Computing': 'var(--academic-600)',
			'Financial Analysis': 'var(--academic-600)',
			'Educational Technology': 'var(--academic-600)'
		};
		return colors[category] || 'var(--academic-600)';
	}
</script>

<div 
	bind:this={cardElement}
	role="button"
	tabindex="0"
	class="paper-card group relative bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 flex flex-col justify-between min-h-[320px] cursor-pointer transition-all duration-300 hover:border-[var(--academic-600)] hover:shadow-lg overflow-hidden"
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<!-- Card content -->
	<div bind:this={innerElement} class="card-inner relative z-10">
		<!-- Header -->
		<div class="mb-4">
			<div class="flex items-center gap-2 mb-3">
				<span 
					class="text-micro px-2 py-1 rounded-md font-medium"
					style="color: white; background: {getCategoryColor(paper.category)};"
				>
					{paper.category}
				</span>
				<span class="text-micro text-[var(--muted-foreground)]">
					{formatDate(paper.date)}
				</span>
			</div>
			
			<h3 class="text-h3 text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-[var(--academic-600)] transition-colors">
				{paper.title}
			</h3>
		</div>
		
		<!-- Abstract -->
		<p class="text-body-sm text-[var(--muted-foreground)] mb-4 line-clamp-3">
			{paper.abstract}
		</p>
		
		<!-- Tags -->
		<div class="flex flex-wrap gap-1.5 mb-4">
			{#each paper.tags.slice(0, 3) as tag}
				<span class="text-micro px-2 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-md border border-[var(--border)]">
					{tag}
				</span>
			{/each}
		</div>
		
		<!-- Footer -->
		<div class="flex items-center justify-between text-micro text-[var(--muted-foreground)]">
			<div class="flex items-center gap-4">
				<span class="flex items-center gap-1">
					<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385V4.804z"/>
						<path d="M18 2.5h-2.5a.5.5 0 00-.5.5v15a.5.5 0 00.5.5H18a1 1 0 001-1v-14a1 1 0 00-1-1z"/>
					</svg>
					{paper.readingTime}
				</span>
				<span class="flex items-center gap-1">
					<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
					</svg>
					{paper.citations}
				</span>
			</div>
			
			<!-- Hover indicator -->
			<div class="flex items-center gap-1 text-[var(--academic-600)] opacity-0 group-hover:opacity-100 transition-opacity">
				<span>Leer</span>
				<svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
				</svg>
			</div>
		</div>
	</div>
	
	<!-- Bottom accent line -->
	<div class="absolute bottom-0 left-0 h-0.5 bg-[var(--academic-600)] transition-all duration-300 w-0 group-hover:w-full"></div>
</div>

<style>
	.paper-card {
		transform-style: preserve-3d;
		perspective: 1000px;
		will-change: transform;
	}
	
	.card-inner {
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
	
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	/* Smooth transitions for all interactive elements */
	.paper-card * {
		transition: color 0.2s var(--ease-default);
	}
</style>
