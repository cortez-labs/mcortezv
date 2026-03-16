<script>
	const year = new Date().getFullYear();

	const pages = [
		{ label: 'Sobre mí', href: '#about' },
		{ label: 'Trabajando en', href: '#working-on' },
		{ label: 'Publicaciones', href: '#publications' },
		{ label: 'Proyectos', href: '#projects' },
		{ label: 'Contacto', href: '#contact' },
	];
</script>

<footer class="footer-section">
	<div class="footer-top-fade"></div>
	<div class="max-w-[1440px] mx-auto px-[var(--section-x-mob)] md:px-[var(--section-x)] py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
			<div class="md:col-span-1">
				<a href="/" class="font-display text-lg font-light text-white">Manuel Cortez Research</a>
				<p class="text-body-sm text-[#999] mt-3 leading-relaxed">Investigaciones en ML, Quantum Computing, FinTech y EdTech.</p>
			</div>

			<div>
				<h4 class="text-label text-[#999] mb-4">Sitio</h4>
				<ul class="space-y-2">
					{#each pages as link}
						<li><a href={link.href} class="text-body-sm text-[#999] hover:text-white transition-colors">{link.label}</a></li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="relative pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<div class="footer-divider"></div>
			<p class="text-micro text-white/90">&copy; {year} Manuel Cortez. Todos los derechos reservados.</p>
			<a href="https://linkedin.com/in/mcortezv" target="_blank" rel="noopener noreferrer" class="text-body-sm text-[#999] hover:text-white transition-colors">
				LinkedIn
			</a>
		</div>
	</div>
</footer>

<style>
	.footer-section {
		position: relative;
		background: var(--ink);
	}

	.footer-top-fade {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(15, 118, 110, 0.4) 20%,
			rgba(255, 255, 255, 0.25) 50%,
			rgba(15, 118, 110, 0.4) 80%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: footerShimmer 6s ease-in-out infinite;
		pointer-events: none;
	}

	.footer-divider {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(15, 118, 110, 0.35) 25%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(15, 118, 110, 0.35) 75%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: footerShimmer 6s ease-in-out infinite;
	}

	@keyframes footerShimmer {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
</style>
