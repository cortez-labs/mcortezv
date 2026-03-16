<script>
	import NeuralBackground from '$components/NeuralBackground.svelte';

	/** @type {{ papers: any[], papersFilter: string, onFilterChange: (v: string) => void, onPaperClick: (paper: any) => void }} */
	let { papers = [], papersFilter = 'all', onFilterChange, onPaperClick } = $props();

	const categories = ['all', 'Machine Learning', 'Quantum Computing', 'Financial Analysis', 'Educational Technology'];
	const categoryLabels = {
		all: 'Todas',
		'Machine Learning': 'Machine Learning',
		'Quantum Computing': 'Quantum Computing',
		'Financial Analysis': 'Análisis Financiero',
		'Educational Technology': 'Tecnología Educativa'
	};

	const categoryColors = {
		'Machine Learning': '#0d9488',
		'Quantum Computing': '#6d28d9',
		'Financial Analysis': '#b45309',
		'Educational Technology': '#0f766e'
	};

	const filteredPapers = $derived(
		papersFilter === 'all'
			? papers
			: papers.filter((p) => p.category === papersFilter)
	);

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<section id="publications" class="relative py-[var(--section-y-mob)] md:py-[var(--section-y)] px-[var(--section-x-mob)] md:px-[var(--section-x)]">
	<NeuralBackground />
	<div class="max-w-6xl mx-auto relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-16">
			<!-- Izquierda: lista de papers -->
			<div class="space-y-0 order-2 md:order-1">
				{#if filteredPapers.length > 0}
					{#each filteredPapers as paper, i}
						<button
							type="button"
							onclick={() => onPaperClick?.(paper)}
							class="publication-row group/item w-full text-left py-8 pl-4 {i > 0 ? 'border-t border-[var(--neural-grid)]' : ''} relative transition-colors hover:bg-[var(--neural-circuit)]/30"
						>
							<span
								class="absolute left-0 top-8 bottom-8 w-0.5 bg-[var(--neural-primary)] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-full"
							></span>
							<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-3 mb-2">
										<span
											class="inline-block w-2 h-2 rounded-full flex-shrink-0"
											style="background: {categoryColors[paper.category] ?? '#0f766e'}"
										></span>
										<span class="text-micro text-[var(--neural-cyan)]">
											{paper.category} · {formatDate(paper.date)}
										</span>
									</div>
									<h3 class="text-lg md:text-xl font-display font-light text-[var(--neural-secondary)] mb-2 group-hover/item:text-[var(--neural-primary)] transition-colors">
										{paper.title}
									</h3>
									<p class="text-body-sm text-[var(--neural-cyan)] line-clamp-2 opacity-90">
										{paper.abstract}
									</p>
								</div>
								<span class="text-micro font-medium text-[var(--neural-primary)] flex items-center gap-1 flex-shrink-0 sm:mt-1">
									Leer
									<svg class="w-4 h-4 group-hover/item:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
									</svg>
								</span>
							</div>
						</button>
					{/each}
				{:else}
					<div class="py-16 text-center">
						<p class="text-[var(--neural-cyan)]">
							{papers.length === 0 ? 'Cargando publicaciones...' : 'No hay publicaciones en esta categoría.'}
						</p>
					</div>
				{/if}
			</div>

			<!-- Derecha: título sticky + filtros -->
			<div class="md:sticky md:top-24 md:self-start order-1 md:order-2">
				<div class="flex items-center gap-4 mb-6">
					<span class="font-mono-brand text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--neural-cyan)]">Publicaciones</span>
					<span class="flex-1 h-px bg-[var(--neural-grid)] opacity-30 md:max-w-[80px]"></span>
				</div>
				<h2 class="text-h2 text-[var(--neural-secondary)] mb-4 font-display">
					Investigaciones recientes
				</h2>
				<p class="text-body text-[var(--neural-cyan)] mb-8 max-w-sm">
					Papers y artículos en ML, Quantum Computing, FinTech y EdTech.
				</p>

				<!-- Filtros -->
				<div class="flex flex-wrap gap-2">
					{#each categories as cat}
						<button
							type="button"
							onclick={() => onFilterChange?.(cat)}
							class="px-3 py-1.5 rounded-md text-[0.75rem] transition-all duration-200 {papersFilter === cat
								? 'bg-[var(--neural-primary)] text-white'
								: 'text-[var(--neural-cyan)] hover:text-[var(--neural-primary)] hover:bg-[var(--neural-circuit)]'}"
						>
							{categoryLabels[cat]}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
