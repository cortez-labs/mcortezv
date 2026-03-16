<script>
	import { fadeIn } from '$lib/animations';

	let navbar = $state(null);
	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const links = [
		{ label: 'Sobre mí', href: '#about' },
		{ label: 'Trabajando en', href: '#working-on' },
		{ label: 'Publicaciones', href: '#publications' },
		{ label: 'Proyectos', href: '#projects' },
		{ label: 'Contacto', href: '#contact' },
	];

	$effect(() => {
		function handleScroll() {
			scrolled = window.scrollY > 20;
		}
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		if (navbar) fadeIn(navbar, { scrollTrigger: false, y: -20 });
	});

	function scrollTo(href) {
		mobileOpen = false;
		const el = document.querySelector(href);
		el?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav
	bind:this={navbar}
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30 shadow-sm shadow-black/5' : 'bg-transparent'}"
>
	<div class="max-w-[1440px] mx-auto px-[var(--section-x-mob)] md:px-[var(--section-x)]">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="font-display text-xl font-light tracking-tight text-[var(--ink)]">
				Manuel Cortez
			</a>

			<div class="hidden md:flex items-center gap-8">
				{#each links as link}
					<button
						onclick={() => scrollTo(link.href)}
						class="text-micro text-[var(--muted-brand)] hover:text-[var(--ink)] transition-colors cursor-pointer"
					>
						{link.label}
					</button>
				{/each}
			</div>

			<div class="hidden md:block">
				<a
					href="https://linkedin.com/in/mcortezv"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center px-6 py-2.5 text-micro bg-[var(--primary)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
				>
					LinkedIn &rarr;
				</a>
			</div>

			<button
				onclick={() => mobileOpen = !mobileOpen}
				class="md:hidden p-2 text-[var(--muted-brand)] hover:text-[var(--ink)] cursor-pointer"
				aria-label="Menu"
			>
				{#if mobileOpen}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="md:hidden bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30">
			<div class="px-[var(--section-x-mob)] py-6 space-y-4">
				{#each links as link}
					<button
						onclick={() => scrollTo(link.href)}
						class="block w-full text-left text-micro text-[var(--muted-brand)] hover:text-[var(--ink)] transition-colors py-2 cursor-pointer"
					>
						{link.label}
					</button>
				{/each}
				<a
					href="https://linkedin.com/in/mcortezv"
					target="_blank"
					rel="noopener noreferrer"
					class="block w-full text-center mt-4 px-6 py-3 text-micro bg-[var(--primary)] text-primary-foreground hover:opacity-90 transition-colors cursor-pointer"
				>
					LinkedIn &rarr;
				</a>
			</div>
		</div>
	{/if}
</nav>
