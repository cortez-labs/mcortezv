<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { create3DCardFlip } from '$lib/animations/gsap-config';

	interface Paper {
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
	}

	let { paper, delay = 0, variant = 'default', accentColor = 'var(--neural-primary)' }: {
		paper: Paper;
		delay?: number;
		variant?: 'featured' | 'compact' | 'horizontal' | 'default';
		accentColor?: string;
	} = $props();

	const dispatch = createEventDispatcher();
	let cardElement: HTMLElement;
	let innerElement: HTMLElement;
	let neuralCanvas: HTMLCanvasElement;
	let connections: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];

	onMount(() => {
		if (neuralCanvas) initNeuralConnections();
		create3DCardFlip(cardElement);
	});

	function initNeuralConnections() {
		const canvas = neuralCanvas;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const c = ctx;
		canvas.width = 300;
		canvas.height = 200;
		for (let i = 0; i < 8; i++) {
			connections.push({
				x1: Math.random() * canvas.width,
				y1: Math.random() * canvas.height,
				x2: Math.random() * canvas.width,
				y2: Math.random() * canvas.height,
				opacity: Math.random() * 0.5 + 0.1
			});
		}
		function animate() {
			c.clearRect(0, 0, canvas.width, canvas.height);
			connections.forEach((conn) => {
				c.beginPath();
				c.moveTo(conn.x1, conn.y1);
				c.lineTo(conn.x2, conn.y2);
				c.strokeStyle = `rgba(156, 163, 175, ${conn.opacity})`;
				c.lineWidth = 1;
				c.stroke();
				conn.x1 += (Math.random() - 0.5) * 0.2;
				conn.y1 += (Math.random() - 0.5) * 0.2;
				conn.x2 += (Math.random() - 0.5) * 0.2;
				conn.y2 += (Math.random() - 0.5) * 0.2;
				if (conn.x1 < 0) conn.x1 = canvas.width;
				if (conn.x1 > canvas.width) conn.x1 = 0;
				if (conn.y1 < 0) conn.y1 = canvas.height;
				if (conn.y1 > canvas.height) conn.y1 = 0;
				if (conn.x2 < 0) conn.x2 = canvas.width;
				if (conn.x2 > canvas.width) conn.x2 = 0;
				if (conn.y2 < 0) conn.y2 = canvas.height;
				if (conn.y2 > canvas.height) conn.y2 = 0;
			});
			requestAnimationFrame(animate);
		}
		animate();
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div
	bind:this={cardElement}
	class="neural-card neural-card-{variant} group relative glass-dark border border-[var(--neural-grid)] rounded-xl cursor-pointer transition-all duration-300 overflow-hidden"
	class:min-h-[200px]={variant === 'compact'}
	class:min-h-[280px]={variant === 'horizontal'}
	class:min-h-[340px]={variant === 'default'}
	class:min-h-[380px]={variant === 'featured'}
	style="--accent: {accentColor}"
	onclick={() => dispatch('click', paper)}
	onmouseenter={() => {}}
	onmouseleave={() => {}}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && dispatch('click', paper)}
>
	<!-- Accent bar (top or left by variant) -->
	<div
		class="absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
		class:top-0={variant === 'featured' || variant === 'default'}
		class:left-0={variant === 'horizontal' || variant === 'compact'}
		class:w-full={variant === 'featured' || variant === 'default'}
		class:h-1={variant === 'featured' || variant === 'default'}
		class:w-1={variant === 'horizontal' || variant === 'compact'}
		class:h-full={variant === 'horizontal' || variant === 'compact'}
		style="background: var(--accent)"
	></div>

	<canvas
		bind:this={neuralCanvas}
		class="absolute inset-0 pointer-events-none opacity-15"
		aria-hidden="true"
	></canvas>

	<div bind:this={innerElement} class="card-inner relative z-10 flex flex-col h-full {variant === 'horizontal' ? 'flex-col sm:flex-row sm:items-center gap-4 sm:gap-6' : ''} {variant === 'featured' ? 'p-8' : 'p-6'}">
		{#if variant === 'featured'}
			<!-- Featured: gradient header, large title -->
			<div class="flex-1 flex flex-col justify-between">
				<div>
					<span
						class="text-micro px-2.5 py-1 rounded-lg font-medium text-white mb-4 inline-block"
						style="background: var(--accent)"
					>
						{paper.category}
					</span>
					<h3 class="text-xl md:text-2xl font-display font-light text-[var(--neural-secondary)] mb-3 line-clamp-2 group-hover:text-[var(--neural-primary)] transition-colors leading-tight">
						{paper.title}
					</h3>
					<p class="text-body text-[var(--neural-cyan)] line-clamp-2 opacity-90 mb-4">
						{paper.abstract}
					</p>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex gap-4 text-micro text-[var(--neural-cyan)]">
						<span>{formatDate(paper.date)}</span>
						<span>{paper.readingTime}</span>
						<span>{paper.citations} cit.</span>
					</div>
					<span class="text-micro font-medium flex items-center gap-1" style="color: var(--accent)">
						Leer
						<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
					</span>
				</div>
			</div>

		{:else if variant === 'horizontal'}
			<!-- Horizontal: icon left, content right -->
			<div class="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style="background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent)">
				<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
			</div>
			<div class="flex-1 min-w-0">
				<span class="text-micro text-[var(--neural-cyan)]">{formatDate(paper.date)}</span>
				<h3 class="text-h3 text-[var(--neural-secondary)] mt-1 mb-2 line-clamp-2 group-hover:text-[var(--neural-primary)] transition-colors">
					{paper.title}
				</h3>
				<p class="text-body-sm text-[var(--neural-cyan)] line-clamp-2 opacity-80 mb-3">{paper.abstract}</p>
				<div class="flex items-center gap-3 text-micro">
					<span class="text-[var(--neural-cyan)]">{paper.readingTime}</span>
					<span class="text-[var(--neural-cyan)]">·</span>
					<span class="font-medium" style="color: var(--accent)">Leer →</span>
				</div>
			</div>

		{:else if variant === 'compact'}
			<!-- Compact: minimal, tag + title + meta -->
			<span
				class="text-micro px-2 py-1 rounded-md font-medium text-white w-fit mb-3"
				style="background: var(--accent)"
			>
				{paper.category}
			</span>
			<h3 class="text-body font-medium text-[var(--neural-secondary)] mb-2 line-clamp-2 group-hover:text-[var(--neural-primary)] transition-colors flex-1">
				{paper.title}
			</h3>
			<div class="flex items-center gap-3 text-micro text-[var(--neural-cyan)]">
				<span>{paper.readingTime}</span>
				<span>{paper.citations} cit.</span>
				<span class="ml-auto" style="color: var(--accent)">→</span>
			</div>

		{:else}
			<!-- Default: full card with tags -->
			<div class="mb-4">
				<div class="flex items-center gap-2 mb-3">
					<span
						class="text-micro px-2 py-1 rounded-md font-medium text-white"
						style="background: var(--accent)"
					>
						{paper.category}
					</span>
					<span class="text-micro text-[var(--neural-cyan)]">{formatDate(paper.date)}</span>
				</div>
				<h3 class="text-h3 text-[var(--neural-secondary)] mb-3 line-clamp-2 group-hover:text-[var(--neural-primary)] transition-colors">
					{paper.title}
				</h3>
			</div>
			<p class="text-body-sm text-[var(--neural-cyan)] mb-4 line-clamp-3 opacity-80">{paper.abstract}</p>
			<div class="flex flex-wrap gap-1.5 mb-4">
				{#each paper.tags.slice(0, 3) as tag}
					<span class="text-micro px-2 py-1 glass-morphism text-[var(--neural-cyan)] rounded-md border border-[var(--neural-grid)]">
						{tag}
					</span>
				{/each}
			</div>
			<div class="flex items-center justify-between text-micro text-[var(--neural-cyan)] mt-auto">
				<div class="flex gap-4">
					<span>{paper.readingTime}</span>
					<span>{paper.citations} cit.</span>
				</div>
				<span class="font-medium flex items-center gap-1" style="color: var(--accent)">
					Leer
					<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
				</span>
			</div>
		{/if}
	</div>

	<div class="absolute bottom-0 left-0 w-full h-1 data-stream opacity-0 group-hover:opacity-30 transition-opacity" style="background: linear-gradient(90deg, var(--accent), transparent)"></div>
</div>

<style>
	.neural-card {
		will-change: transform;
		backdrop-filter: blur(10px);
	}
	.neural-card:hover {
		border-color: var(--accent);
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
	}
	.neural-card-featured {
		background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 50%);
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
</style>
