<script lang="ts">
	import { onMount } from 'svelte';
	import { animateTextReveal, createParallax, createFloatingAnimation } from '$lib/animations/gsap-config';
	
	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let heroCtas: HTMLElement;
	let heroBg: HTMLElement;
	let floatingElements: NodeListOf<Element>;
	
	onMount(() => {
		// Background parallax
		createParallax(heroBg, { speed: 0.3 });
		
		// Text animations
		animateTextReveal(heroTitle, { 
			type: 'words', 
			stagger: 0.05, 
			scrollTrigger: false 
		});
		
		animateTextReveal(heroSubtitle, { 
			type: 'lines', 
			stagger: 0.1, 
			delay: 0.4,
			scrollTrigger: false 
		});
		
		// CTAs animation
		import('gsap').then(({ gsap }) => {
			gsap.from(heroCtas, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				delay: 0.8,
				ease: 'power3.out'
			});
		});
		
		// Floating elements
		setTimeout(() => {
			floatingElements = document.querySelectorAll('.floating-elements > div');
			floatingElements.forEach((el, i) => {
				createFloatingAnimation(el as HTMLElement, {
					amplitude: 5 + i * 2,
					duration: 3 + i * 0.5,
					delay: i * 0.2
				});
			});
		}, 100);
	});
</script>

<section class="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-16 px-[var(--section-x-mob)] md:px-[var(--section-x)] bg-[var(--bg-hero)]">
	
	<!-- Animated background -->
	<div bind:this={heroBg} class="absolute inset-0 pointer-events-none" aria-hidden="true">
		<svg class="w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
			<defs>
				<radialGradient id="hero-gradient-1" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="var(--academic-600)" stop-opacity="0.08"/>
					<stop offset="100%" stop-color="var(--academic-600)" stop-opacity="0"/>
				</radialGradient>
				<radialGradient id="hero-gradient-2" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="var(--academic-700)" stop-opacity="0.06"/>
					<stop offset="100%" stop-color="var(--academic-700)" stop-opacity="0"/>
				</radialGradient>
			</defs>
			
			<!-- Floating orbs -->
			<circle class="floating-orb" cx="1200" cy="150" r="300" fill="url(#hero-gradient-1)"/>
			<circle class="floating-orb" cx="200" cy="500" r="250" fill="url(#hero-gradient-2)"/>
			<circle class="floating-orb" cx="700" cy="300" r="180" fill="url(#hero-gradient-1)"/>
			
			<!-- Grid pattern -->
			<g class="grid-pattern" opacity="0.03">
				{#each Array(20) as _, i}
					<line x1={i * 72} y1="0" x2={i * 72} y2="700" stroke="var(--academic-600)" stroke-width="0.5"/>
				{/each}
				{#each Array(10) as _, i}
					<line x1="0" y1={i * 70} x2="1440" y2={i * 70} stroke="var(--academic-600)" stroke-width="0.5"/>
				{/each}
			</g>
		</svg>
	</div>
	
	<div class="max-w-6xl mx-auto relative z-10 w-full">
		<div class="max-w-4xl text-left">
			<!-- Hero title -->
			<div class="mb-6">
				<p class="text-label text-[var(--academic-600)] mb-6">Investigación &middot; Innovación &middot; Tecnología</p>
				
				<h1 bind:this={heroTitle} class="text-hero text-[var(--ink)] mb-8">
					Manuel Cortez<br/>Research
				</h1>
				
				<p bind:this={heroSubtitle} class="text-body-lg text-[var(--muted-foreground)] max-w-2xl mb-10">
					Explorando las fronteras del conocimiento a través de investigaciones en Machine Learning, Quantum Computing, 
					Análisis Financiero y Tecnología Educativa.
				</p>
			</div>
			
			<!-- Call to actions -->
			<div bind:this={heroCtas} class="flex flex-wrap gap-4">
				<a
					href="#papers"
					class="inline-flex items-center justify-center px-8 py-3 text-micro bg-[var(--academic-800)] text-white hover:bg-[var(--academic-600)] transition-all duration-200 hover:-translate-y-0.5 rounded-lg"
				>
					Explorar Investigaciones
				</a>
				<a
					href="https://linkedin.com/in/mcortezv"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center px-8 py-3 text-micro border border-[var(--academic-800)] text-[var(--academic-800)] hover:bg-[var(--academic-50)] transition-colors rounded-lg"
				>
					LinkedIn &rarr;
				</a>
			</div>
		</div>
	</div>
	
	<!-- Floating elements for depth -->
	<div class="absolute top-20 right-10 floating-elements">
		<div class="w-2 h-2 bg-[var(--academic-400)] rounded-full opacity-60"></div>
	</div>
	<div class="absolute bottom-20 left-10 floating-elements">
		<div class="w-3 h-3 bg-[var(--academic-600)] rounded-full opacity-40"></div>
	</div>
	<div class="absolute top-1/2 right-20 floating-elements">
		<div class="w-1.5 h-1.5 bg-[var(--academic-400)] rounded-full opacity-50"></div>
	</div>
</section>

<style>
	.floating-orb {
		will-change: transform;
		transform-origin: center;
	}
	
	.grid-pattern {
		will-change: opacity;
	}
	
	.floating-elements > div {
		will-change: transform;
	}
</style>
