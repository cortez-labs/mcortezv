<script>
	import NeuralBackground from '$components/NeuralBackground.svelte';

	/** @type {{ projects: { title: string, url: string, description: string, tag: string, icon: string }[] }} */
	let { projects = [] } = $props();

	function getDomain(url) {
		try {
			return new URL(url).hostname.replace('www.', '');
		} catch {
			return url;
		}
	}
</script>

<section id="projects" class="relative pt-[var(--section-y-mob)] md:pt-[var(--section-y)] pb-6 md:pb-20 px-[var(--section-x-mob)] md:px-[var(--section-x)]">
	<NeuralBackground />
	<div class="max-w-6xl mx-auto relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
			<!-- Izquierda: título sticky -->
			<div class="md:sticky md:top-24 md:self-start">
				<div class="flex items-center gap-4 mb-6">
					<span class="font-mono-brand text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--neural-cyan)]">Proyectos</span>
					<span class="flex-1 h-px bg-[var(--neural-grid)] opacity-30 md:max-w-[80px]"></span>
				</div>
				<h2 class="text-h2 text-[var(--neural-secondary)] mb-4 font-display">
					Colaboración
				</h2>
				<p class="text-body text-[var(--neural-cyan)] max-w-sm">
					Proyectos en los que he colaborado.
				</p>
			</div>

			<!-- Derecha: lista de proyectos -->
			<div class="space-y-0">
				{#each projects as project, i}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="project-row group/item block w-full text-left py-6 pl-4 {i > 0 ? 'border-t border-[var(--neural-grid)]' : ''} relative transition-all duration-200 hover:bg-[var(--neural-circuit)]/40"
					>
						<span
							class="absolute left-0 top-6 bottom-6 w-0.5 bg-[var(--neural-primary)] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-full"
						></span>
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--neural-circuit)] flex items-center justify-center text-[var(--neural-primary)] group-hover/item:bg-[var(--neural-primary)]/15 transition-colors">
								{#if project.icon === 'team'}
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
								{:else}
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
								{/if}
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex flex-wrap items-center gap-2 mb-1">
									<h3 class="text-lg font-display font-light text-[var(--neural-secondary)] group-hover/item:text-[var(--neural-primary)] transition-colors">
										{project.title}
									</h3>
									<span class="text-micro px-2 py-0.5 rounded-md bg-[var(--neural-circuit)] text-[var(--neural-cyan)] border border-[var(--neural-grid)]">
										{project.tag}
									</span>
								</div>
								<p class="text-body-sm text-[var(--neural-cyan)] line-clamp-2 opacity-90 mb-2">
									{project.description}
								</p>
								<span class="text-micro font-medium text-[var(--neural-primary)] flex items-center gap-1 group-hover/item:gap-2 transition-all">
									{getDomain(project.url)}
									<svg class="w-3.5 h-3.5 group-hover/item:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
								</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
		<!-- Transición suave hacia contacto -->
		<div class="mt-6 pt-6 md:mt-16 md:pt-10 border-t border-[var(--neural-grid)]/40"></div>
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
