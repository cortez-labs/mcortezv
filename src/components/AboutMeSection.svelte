<script>
	import NeuralBackground from '$components/NeuralBackground.svelte';

	const aboutMe = {
		headline: 'AI Developer & Consultant. Construyo sistemas de IA listos para producción.',
		description: 'Trabajo en el diseño e implementación de agentes de IA, workflows automatizados y evaluaciones de modelos que impactan directamente en la experiencia de usuario, eficiencia operativa y ventas B2B. Mi background incluye Machine Learning con Python (Regresión, Árboles de Decisión, Random Forest, PCA) y bases sólidas en desarrollo web con TypeScript.',
		stack: [
			{ name: 'LangChain', color: '#10A37F' },
			{ name: 'Python', color: '#3776AB' },
			{ name: 'TypeScript', color: '#3178C6' },
			{ name: 'React', color: '#61DAFB' },
			{ name: 'Mastra', color: '#6366F1' },
			{ name: 'Supabase', color: '#3ECF8E' },
			{ name: 'Vercel', color: '#000000' },
			{ name: 'scikit-learn', color: '#F7931E' },
			{ name: 'PostgreSQL', color: '#4169E1' }
		],
		achievements: [
			{ label: 'NVIDIA Inception', sublabel: 'Programa de startups', logo: '/assets/logos/nvidia.png', url: 'https://www.nvidia.com/en-us/startups/' },
			{ label: 'Acelerando México con IA', sublabel: 'Convocatoria de Intel', logo: '/assets/logos/intel.png', url: 'https://www.intel.la/content/www/xl/es/homepage.html' },
			{ label: 'AI Software Developer', sublabel: 'Hyper Digital Mx', logo: '/assets/logos/hyperdigital.png', url: 'https://www.hyperdigital.mx/' }
		]
	};
</script>

<section id="about" class="relative py-[var(--section-y-mob)] md:py-[var(--section-y)] px-[var(--section-x-mob)] md:px-[var(--section-x)]">
	<NeuralBackground />
	<div class="max-w-6xl mx-auto relative z-10">
		<!-- Section label -->
		<div class="flex items-center gap-4 mb-12">
			<span class="font-mono-brand text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--neural-cyan)]">Sobre mí</span>
			<span class="flex-1 h-px bg-[var(--neural-grid)] opacity-30"></span>
		</div>

		<!-- Main content card -->
		<div class="relative glass-morphism border border-[var(--neural-grid)] rounded-lg overflow-hidden">
			<div class="p-8 md:p-12">
				<!-- Headline -->
				<h2 class="text-2xl md:text-3xl lg:text-4xl font-display font-light text-[var(--neural-secondary)] leading-tight mb-6 max-w-4xl">
					{aboutMe.headline}
				</h2>

				<!-- Stack - debajo del título -->
				<div class="flex flex-wrap gap-2 mb-10">
					{#each aboutMe.stack as tech}
						<span
							class="stack-badge px-3 py-1.5 rounded-lg text-micro bg-white/60 border border-[var(--neural-grid)] text-[var(--neural-secondary)] transition-all duration-300 cursor-default"
							style="--tech-color: {tech.color}"
						>
							{tech.name}
						</span>
					{/each}
				</div>

				<p class="text-body-lg text-[var(--neural-cyan)] leading-relaxed max-w-4xl mb-10">
					{aboutMe.description}
				</p>

				<!-- Cards de empresa - debajo del todo -->
				<div>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each aboutMe.achievements as achievement}
							{#if achievement.url}
								<a
									href={achievement.url}
									target="_blank"
									rel="noopener noreferrer"
									class="glass-morphism border border-[var(--neural-grid)] rounded-lg p-5 transition-all duration-300 hover:border-[var(--neural-primary)] hover:shadow-md flex items-center gap-4 cursor-pointer"
								>
									{#if achievement.logo}
										<div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white/50 rounded-lg p-2">
											<img
												src={achievement.logo}
												alt={achievement.label}
												class="w-full h-full object-contain"
												loading="lazy"
											/>
										</div>
									{/if}
									<div class="min-w-0 flex-1">
										<p class="text-body-sm font-medium text-[var(--neural-secondary)]">
											{achievement.label}
											{#if achievement.company}
												<span class="text-[var(--neural-primary)]"> @ {achievement.company}</span>
											{/if}
										</p>
										{#if achievement.sublabel}
											<p class="text-micro text-[var(--neural-cyan)] mt-0.5">{achievement.sublabel}</p>
										{/if}
									</div>
								</a>
							{:else}
								<div
									class="glass-morphism border border-[var(--neural-grid)] rounded-lg p-5 transition-all duration-300 hover:border-[var(--neural-primary)] hover:shadow-md flex items-center gap-4"
								>
									{#if achievement.logo}
										<div class="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white/50 rounded-lg p-2">
											<img
												src={achievement.logo}
												alt={achievement.label}
												class="w-full h-full object-contain"
												loading="lazy"
											/>
										</div>
									{/if}
									<div class="min-w-0 flex-1">
										<p class="text-body-sm font-medium text-[var(--neural-secondary)]">
											{achievement.label}
											{#if achievement.company}
												<span class="text-[var(--neural-primary)]"> @ {achievement.company}</span>
											{/if}
										</p>
										{#if achievement.sublabel}
											<p class="text-micro text-[var(--neural-cyan)] mt-0.5">{achievement.sublabel}</p>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.stack-badge:hover {
		background-color: var(--tech-color) !important;
		color: white !important;
		border-color: var(--tech-color) !important;
	}
	/* React cyan es muy claro, usar texto oscuro */
	.stack-badge[style*="61DAFB"]:hover {
		color: #000 !important;
	}
</style>
