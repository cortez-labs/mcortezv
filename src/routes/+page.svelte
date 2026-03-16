<script>
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import NeuralHeroSection from '$components/NeuralHeroSection.svelte';
	import NeuralBackground from '$components/NeuralBackground.svelte';
	import AboutMeSection from '$components/AboutMeSection.svelte';
	import CurrentlyWorkingSection from '$components/CurrentlyWorkingSection.svelte';
	import PublicationsSection from '$components/PublicationsSection.svelte';
	import ProjectsSection from '$components/ProjectsSection.svelte';
	import { getAllPapers } from '$lib/papers/loader';

	let papers = $state([]);
	let papersFilter = $state('all');

	$effect(() => {
		getAllPapers().then(data => {
			papers = data;
		}).catch(error => {
			console.error('Error loading papers:', error);
		});
	});

	const projects = [
		{
			title: 'TeamUp',
			url: 'https://www.teamup.mx/',
			description: 'Plataforma de colaboración y gestión de equipos.',
			tag: 'Colaboración',
			icon: 'team'
		},
		{
			title: 'HyperFlow',
			url: 'https://www.hyperflowos.com/',
			description: 'Plataforma CRM B2B todo en uno para ventas y operación comercial. CRM, cotizaciones, órdenes, facturación y reportes con Flow + IA.',
			tag: 'CRM · B2B',
			icon: 'flow'
		}
	];

	function handlePaperClick(paper) {
		window.location.href = `/papers/${paper.slug}`;
	}
</script>

<svelte:head>
	<title>Manuel Cortez — Research</title>
	<meta name="description" content="Investigaciones académicas en Machine Learning, Quantum Computing, Análisis Financiero y Tecnología Educativa. Publicaciones recientes en IA y tecnologías emergentes." />
	<meta property="og:title" content="Manuel Cortez Research — Investigaciones en ML, Quantum Computing, FinTech y EdTech" />
	<meta property="og:description" content="Explorando las fronteras del conocimiento a través de investigaciones en Machine Learning, Quantum Computing, Análisis Financiero y Tecnología Educativa." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mcortezv.dev" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Manuel Cortez Research — Investigaciones Académicas" />
	<meta name="twitter:description" content="Investigaciones en Machine Learning, Quantum Computing, Análisis Financiero y Tecnología Educativa." />
	<meta name="robots" content="index, follow" />
</svelte:head>

<Navbar />

<main class="min-h-screen bg-[var(--bg-default)]">

	<!-- ═══ HERO SECTION ═══ -->
	<NeuralHeroSection />

	<!-- ═══ SOBRE MÍ ═══ -->
	<AboutMeSection />

	<!-- ═══ EN QUÉ TRABAJO AHORA ═══ -->
	<CurrentlyWorkingSection />

	<!-- ═══ PUBLICACIONES ═══ -->
	<PublicationsSection
		papers={papers}
		papersFilter={papersFilter}
		onFilterChange={(cat) => papersFilter = cat}
		onPaperClick={handlePaperClick}
	/>

	<!-- ═══ PROYECTOS ═══ -->
	<ProjectsSection projects={projects} />

	<!-- ═══ CONTACT ═══ -->
	<section id="contact" class="relative pt-4 pb-20 md:pt-8 md:pb-24 px-[var(--section-x-mob)] md:px-[var(--section-x)]">
		<NeuralBackground />
		<div class="max-w-4xl mx-auto relative z-10">
			<div class="glass-morphism border border-[var(--neural-grid)] rounded-lg p-10 md:p-14 text-center">
				<h2 class="text-h2 text-[var(--neural-secondary)] max-w-3xl mx-auto mb-4 font-display">
					¿Interesado en colaborar?
				</h2>
				<p class="text-body-lg text-[var(--neural-cyan)] max-w-2xl mx-auto mb-2">
					AI Software Developer y CTO en HyperDigitalMX. Siempre abierto a discutir ideas, compartir conocimiento y explorar oportunidades en Machine Learning, Quantum Computing y tecnologías emergentes.
				</p>
				<p class="text-micro text-[var(--neural-cyan)] mb-10">
					Programa NVIDIA Inception · Acelerando México con IA
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<a
						href="https://linkedin.com/in/mcortezv"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center px-10 py-4 text-micro bg-[var(--neural-primary)] text-white hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 rounded-lg"
					>
						Conectemos en LinkedIn &rarr;
					</a>
					<a
						href="https://hyperdigital.mx"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center px-8 py-3 text-micro border border-[var(--neural-grid)] text-[var(--neural-cyan)] hover:border-[var(--neural-primary)] hover:text-[var(--neural-primary)] transition-all duration-200 rounded-lg"
					>
						HyperDigitalMX
					</a>
				</div>
			</div>
		</div>
	</section>

</main>

<Footer />
