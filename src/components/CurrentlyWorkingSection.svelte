<script>
	import NeuralBackground from '$components/NeuralBackground.svelte';

	const currentWork = {
		title: 'En qué trabajo ahora',
		subtitle: 'Investigación y desarrollo',
		items: [
			{
				label: 'Flow + IA en HyperFlow',
				description: 'Motor operativo inteligente para equipos comerciales B2B. Priorización automática, siguiente mejor acción y cola de trabajo optimizada.',
				icon: 'flow'
			},
			{
				label: 'Agentes de IA y RAG',
				description: 'Sistemas de recuperación aumentada por generación para documentación interna, soporte y automatización de procesos.',
				icon: 'agent'
			},
			{
				label: 'Evaluación de modelos LLM',
				description: 'Métricas de calidad, latencia y coste para producción. A/B testing y monitoreo de drift en aplicaciones con IA.',
				icon: 'eval'
			}
		]
	};
</script>

<section id="working-on" class="relative py-[var(--section-y)] px-[var(--section-x-mob)] md:px-[var(--section-x)]">
	<NeuralBackground />
	<div class="max-w-6xl mx-auto relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
			<!-- Izquierda: título y subtítulo sticky (se mueven con el scroll hasta salir de la sección) -->
			<div class="md:sticky md:top-24 md:self-start">
				<div class="flex items-center gap-4 mb-6">
					<span class="font-mono-brand text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--neural-cyan)]">{currentWork.title}</span>
					<span class="flex-1 h-px bg-[var(--neural-grid)] opacity-30 md:max-w-[80px]"></span>
				</div>
				<h2 class="text-h2 text-[var(--neural-secondary)] mb-4 font-display">
					Lo que estoy construyendo ahora
				</h2>
				<p class="text-label text-[var(--neural-cyan)]">{currentWork.subtitle}</p>
			</div>

			<!-- Derecha: items que scrollean -->
			<div class="space-y-0">
				{#each currentWork.items as item, i}
					<div class="group/item py-8 {i > 0 ? 'border-t border-[var(--neural-grid)]' : ''} relative">
						<span class="absolute left-0 top-8 bottom-8 w-0.5 bg-[var(--neural-primary)] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-full"></span>
						<div class="group flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--neural-circuit)] flex items-center justify-center text-[var(--neural-primary)] group-hover:bg-[var(--neural-primary)]/10 transition-colors">
								{#if item.icon === 'flow'}
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
								{:else if item.icon === 'agent'}
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
								{:else}
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
								{/if}
							</div>
							<div class="flex-1 min-w-0">
								<h3 class="text-h3 text-[var(--neural-secondary)] mb-2">{item.label}</h3>
								<p class="text-body-sm text-[var(--neural-cyan)] leading-relaxed">{item.description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
