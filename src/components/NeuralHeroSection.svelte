<script lang="ts">
	import { onMount } from 'svelte';
	import { animateTextReveal, createParallax, createFloatingAnimation } from '$lib/animations/gsap-config';
	
	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let heroCtas: HTMLElement;
	let heroBg: HTMLElement;
	let heroOrbsContainer: HTMLElement;
	let neuralCanvas: HTMLCanvasElement;
	let particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
	
	onMount(() => {
		// Initialize neural network animation
		if (neuralCanvas) {
			initNeuralNetwork();
		}
		
		// Orbs flotantes (estilo ferdev-site)
		if (heroOrbsContainer) {
			import('gsap').then(({ gsap }) => {
				const orb1 = heroOrbsContainer.querySelector('.hero-orb-1');
				const orb2 = heroOrbsContainer.querySelector('.hero-orb-2');
				if (orb1) gsap.to(orb1, { y: -28, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
				if (orb2) gsap.to(orb2, { y: 22, x: -12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
			});
		}
		
		// Background parallax
		createParallax(heroBg, { speed: 0.3 });
		
		// Text animations with holographic effect
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
	});
	
	function initNeuralNetwork() {
		const canvas = neuralCanvas;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		// Set canvas size
		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		
		// Create initial particles
		for (let i = 0; i < 50; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				size: Math.random() * 3 + 1
			});
		}
		
		// Animation loop - white background, gray particles
		function animate() {
			ctx.fillStyle = 'rgba(248, 250, 252, 0.2)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			// Update and draw particles
			particles.forEach((particle, index) => {
				particle.x += particle.vx;
				particle.y += particle.vy;
				
				// Wrap around edges
				if (particle.x < 0) particle.x = canvas.width;
				if (particle.x > canvas.width) particle.x = 0;
				if (particle.y < 0) particle.y = canvas.height;
				if (particle.y > canvas.height) particle.y = 0;
				
				// Draw particle - gray
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(107, 114, 128, ${0.5 + Math.random() * 0.3})`;
				ctx.fill();
				
				// Draw connections - gray
				particles.forEach((otherParticle, otherIndex) => {
					if (index !== otherIndex) {
						const dx = particle.x - otherParticle.x;
						const dy = particle.y - otherParticle.y;
						const distance = Math.sqrt(dx * dx + dy * dy);
						
						if (distance < 100) {
							ctx.beginPath();
							ctx.moveTo(particle.x, particle.y);
							ctx.lineTo(otherParticle.x, otherParticle.y);
							ctx.strokeStyle = `rgba(156, 163, 175, ${0.2 * (1 - distance / 100)})`;
							ctx.lineWidth = 0.5;
							ctx.stroke();
						}
					}
				});
			});
			
			requestAnimationFrame(animate);
		}
		
		animate();
	}
</script>

<section class="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-16 px-[var(--section-x-mob)] md:px-[var(--section-x)]">
	
	<!-- Neural Network Canvas Background -->
	<canvas 
		bind:this={neuralCanvas}
		class="absolute inset-0 pointer-events-none"
		aria-hidden="true"
	></canvas>
	
	<!-- Orbs de luz (estilo ferdev-site) - encima del canvas para que se vean -->
	<div bind:this={heroOrbsContainer} class="absolute inset-0 pointer-events-none select-none z-[1]" aria-hidden="true">
		<svg class="w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<radialGradient id="hero-orb-1-grad" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="#4338ca" stop-opacity="0.35"/>
					<stop offset="50%" stop-color="#4338ca" stop-opacity="0.15"/>
					<stop offset="100%" stop-color="#4338ca" stop-opacity="0"/>
				</radialGradient>
				<radialGradient id="hero-orb-2-grad" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="#3730a3" stop-opacity="0.3"/>
					<stop offset="70%" stop-color="#3730a3" stop-opacity="0.08"/>
					<stop offset="100%" stop-color="#3730a3" stop-opacity="0"/>
				</radialGradient>
			</defs>
			<circle class="hero-orb-1" cx="1250" cy="130" r="420" fill="url(#hero-orb-1-grad)"/>
			<circle class="hero-orb-2" cx="100" cy="590" r="310" fill="url(#hero-orb-2-grad)"/>

			<!-- Red neural sutil - top-right (orb 1) -->
			<line x1="1100" y1="100" x2="1180" y2="160" stroke="#4338ca" stroke-width="0.5" opacity="0.12"/>
			<line x1="1180" y1="160" x2="1220" y2="220" stroke="#4338ca" stroke-width="0.5" opacity="0.10"/>
			<line x1="1150" y1="180" x2="1200" y2="140" stroke="#4f46e5" stroke-width="0.5" opacity="0.08"/>
			<circle cx="1100" cy="100" r="1" fill="#4338ca" opacity="0.25"/>
			<circle cx="1180" cy="160" r="1" fill="#4f46e5" opacity="0.22"/>
			<circle cx="1220" cy="220" r="1" fill="#4338ca" opacity="0.18"/>
			<circle cx="1150" cy="180" r="0.8" fill="#4f46e5" opacity="0.15"/>

			<!-- Red neural sutil - bottom-left (orb 2) -->
			<line x1="180" y1="520" x2="260" y2="580" stroke="#3730a3" stroke-width="0.5" opacity="0.12"/>
			<line x1="260" y1="580" x2="320" y2="620" stroke="#3730a3" stroke-width="0.5" opacity="0.10"/>
			<line x1="220" y1="560" x2="280" y2="540" stroke="#4338ca" stroke-width="0.5" opacity="0.08"/>
			<circle cx="180" cy="520" r="1" fill="#4338ca" opacity="0.25"/>
			<circle cx="260" cy="580" r="1" fill="#3730a3" opacity="0.22"/>
			<circle cx="320" cy="620" r="1" fill="#4338ca" opacity="0.18"/>
			<circle cx="220" cy="560" r="0.8" fill="#4f46e5" opacity="0.15"/>
		</svg>
	</div>
	
	<!-- Animated background overlay -->
	<div bind:this={heroBg} class="absolute inset-0 pointer-events-none circuit-pattern opacity-20" aria-hidden="true"></div>
	
	<div class="max-w-6xl mx-auto relative z-10 w-full">
		<div class="max-w-4xl text-left">
			<!-- Hero title -->
			<div class="mb-6">
				<p class="text-label text-[var(--primary)] mb-6">Investigación &middot; Innovación &middot; Tecnología</p>
				
				<h1 bind:this={heroTitle} class="text-hero text-[var(--ink)] mb-8">
					Manuel<br/>Cortez
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
					class="inline-flex items-center justify-center px-8 py-3 text-micro bg-[var(--primary)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 rounded-lg"
				>
					Explorar Investigaciones
				</a>
				<a
					href="https://linkedin.com/in/mcortezv"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center px-8 py-3 text-micro border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--accent)] transition-colors rounded-lg"
				>
					LinkedIn &rarr;
				</a>
			</div>
		</div>
	</div>
	
	<!-- Floating neural nodes -->
	<div class="absolute top-20 right-10">
		<div class="neural-node" style="width: 40px; height: 40px;"></div>
	</div>
	<div class="absolute bottom-20 left-10">
		<div class="neural-node" style="width: 30px; height: 30px;"></div>
	</div>
	<div class="absolute top-1/2 right-20">
		<div class="neural-node" style="width: 20px; height: 20px;"></div>
	</div>
	
	<!-- Data stream effects -->
	<div class="absolute top-1/4 left-1/4 w-32 h-1 data-stream opacity-30"></div>
	<div class="absolute bottom-1/4 right-1/4 w-24 h-1 data-stream opacity-20"></div>
</section>

<style>
	.neural-node {
		will-change: transform;
	}
</style>
