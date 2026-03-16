<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import { animateTextReveal } from '$lib/animations/gsap-config';
	import { getPaperBySlug, getAllPapers, getPaperContent } from '$lib/papers/loader';
	import { renderMarkdown } from '$lib/markdown';
	import PaperCard from '$components/PaperCard.svelte';
	
	let { params }: { params: { slug: string } } = $props();
	
	let paper: any = $state(null);
	let relatedPapers: any[] = $state([]);
	let contentHtml: string = $state('');
	let loading: boolean = $state(true);
	let error: string | null = $state(null);
	let paperContent = $state<HTMLElement | null>(null);
	let paperTitle = $state<HTMLElement | null>(null);
	let paperMeta = $state<HTMLElement | null>(null);
	
	onMount(async () => {
		try {
			const paperData = await getPaperBySlug(params.slug);
			if (!paperData) {
				error = 'Paper not found';
				loading = false;
				return;
			}
			
			paper = paperData;
			
			// Load paper content (markdown)
			const markdown = await getPaperContent(params.slug);
			contentHtml = renderMarkdown(markdown);
			
			// Load related papers
			const allPapers = await getAllPapers();
			relatedPapers = allPapers
				.filter((p: { category: string; slug: string }) => p.category === paper.category && p.slug !== paper.slug)
				.slice(0, 3);
			
			loading = false;
			
			// Animate content
			setTimeout(() => {
				if (paperTitle) {
					animateTextReveal(paperTitle, {
						type: 'words',
						scrollTrigger: false
					});
				}
				
				if (paperMeta) {
					import('gsap').then(({ default: gsap }) => {
						gsap.from(paperMeta, {
							y: 20,
							opacity: 0,
							duration: 0.6,
							delay: 0.3,
							ease: 'power2.out'
						});
					});
				}
				
				if (paperContent) {
					import('gsap').then(({ default: gsap }) => {
						gsap.from(paperContent, {
							y: 30,
							opacity: 0,
							duration: 0.8,
							delay: 0.5,
							ease: 'power2.out'
						});
					});
				}
			}, 100);
		} catch (err) {
			error = 'Failed to load paper';
			loading = false;
		}
	});
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
	
	function getCategoryColor(category: string): string {
		const colors: Record<string, string> = {
			'Machine Learning': 'var(--accent-emerald)',
			'Quantum Computing': 'var(--accent-purple)',
			'Financial Analysis': 'var(--accent-orange)',
			'Educational Technology': 'var(--academic-600)'
		};
		return colors[category] || 'var(--academic-600)';
	}
	
	function handleRelatedPaperClick(paperData: any) {
		window.location.href = `/papers/${paperData.slug}`;
	}
</script>

<svelte:head>
	{#if paper}
		<title>{paper.title} — Manuel Cortez Research</title>
		<meta name="description" content={paper.abstract} />
		<meta property="og:title" content={paper.title} />
		<meta property="og:description" content={paper.abstract} />
		<meta property="og:type" content="article" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={paper.title} />
		<meta name="twitter:description" content={paper.abstract} />
	{/if}
</svelte:head>

<Navbar />

{#if loading}
	<div class="min-h-screen bg-[var(--bg-default)] flex items-center justify-center pt-16">
		<div class="text-center">
			<div class="w-12 h-12 border-4 border-[var(--academic-600)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
			<p class="text-body text-[var(--muted-foreground)]">Loading paper...</p>
		</div>
	</div>
{:else if error}
	<div class="min-h-screen bg-[var(--bg-default)] flex items-center justify-center pt-16">
		<div class="text-center">
			<h1 class="text-h1 text-[var(--ink)] mb-4">Paper Not Found</h1>
			<p class="text-body text-[var(--muted-foreground)] mb-6">{error}</p>
			<a href="/" class="inline-flex items-center px-6 py-3 bg-[var(--academic-800)] text-white rounded-lg hover:bg-[var(--academic-600)] transition-colors">
				← Back to Home
			</a>
		</div>
	</div>
{:else if paper}
	<div class="min-h-screen bg-[var(--bg-default)]">
		<!-- Paper Header -->
		<header class="relative overflow-hidden pt-24 pb-20 px-[var(--section-x-mob)] md:px-[var(--section-x)] bg-[var(--bg-hero)]">
			<div class="max-w-4xl mx-auto">
				<div bind:this={paperMeta} class="mb-8">
					<div class="flex items-center gap-4 mb-6">
						<span 
							class="text-micro px-3 py-1.5 rounded-md font-medium text-white"
							style="background: {getCategoryColor(paper.category)};"
						>
							{paper.category}
						</span>
						<span class="text-micro text-[var(--muted-foreground)]">
							{formatDate(paper.date)}
						</span>
						<span class="text-micro text-[var(--muted-foreground)]">
							{paper.readingTime} read
						</span>
					</div>
					
					<div class="flex flex-wrap gap-2 mb-6">
						{#each paper.tags as tag}
							<span class="text-micro px-2.5 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-md border border-[var(--border)]">
								{tag}
							</span>
						{/each}
					</div>
				</div>
				
				<h1 bind:this={paperTitle} class="text-hero text-[var(--ink)] mb-6">
					{paper.title}
				</h1>
				
				<p class="text-body-lg text-[var(--muted-foreground)] max-w-3xl">
					{paper.abstract}
				</p>
			</div>
		</header>
		
		<!-- Paper Content -->
		<main class="py-16 px-[var(--section-x-mob)] md:px-[var(--section-x)]">
			<div class="max-w-4xl mx-auto">
				<article bind:this={paperContent} class="paper-article">
					<div class="paper-content">
						{@html contentHtml}
					</div>
				</article>
				
				<!-- Paper Meta Info -->
				<div class="mt-16 pt-8 border-t border-[var(--border)]">
					<div class="flex items-center justify-between text-micro text-[var(--muted-foreground)]">
						<div class="flex items-center gap-6">
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385V4.804z"/>
									<path d="M18 2.5h-2.5a.5.5 0 00-.5.5v15a.5.5 0 00.5.5H18a1 1 0 001-1v-14a1 1 0 00-1-1z"/>
								</svg>
								{paper.readingTime}
							</span>
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
								</svg>
								{paper.citations} citations
							</span>
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
								</svg>
								{paper.downloads} downloads
							</span>
						</div>
						<span>Published: {formatDate(paper.date)}</span>
					</div>
				</div>
			</div>
		</main>
		
		<!-- Related Papers -->
		{#if relatedPapers.length > 0}
			<section class="py-16 px-[var(--section-x-mob)] md:px-[var(--section-x)] bg-[var(--bg-papers)]">
				<div class="max-w-6xl mx-auto">
					<div class="section-label mb-12">Related Papers</div>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-cards)]">
						{#each relatedPapers as relatedPaper}
							<PaperCard 
								paper={relatedPaper} 
								on:click={(e) => handleRelatedPaperClick(e.detail)}
							/>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	</div>
{/if}

<Footer />

<style>
	:global(.paper-content .paper-h2) {
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--ink);
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	:global(.paper-content .paper-h3) {
		font-size: 1.35rem;
		font-weight: 500;
		color: var(--ink);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	:global(.paper-content .paper-h4) {
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--ink);
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.paper-content .paper-p) {
		font-size: 1rem;
		line-height: 1.75;
		color: var(--foreground);
		margin-bottom: 1rem;
	}

	:global(.paper-content .paper-hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 2rem 0;
	}

	:global(.paper-content .paper-list) {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	:global(.paper-content .paper-list li) {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--foreground);
		margin-bottom: 0.5rem;
	}

	:global(.paper-content .paper-code) {
		font-family: ui-monospace, monospace;
		font-size: 0.9em;
		background: var(--muted);
		padding: 0.15em 0.4em;
		border-radius: 4px;
	}

	:global(.paper-content .paper-pre) {
		background: var(--muted);
		padding: 1rem 1.25rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	:global(.paper-content .paper-pre code) {
		font-family: ui-monospace, monospace;
		font-size: 0.9rem;
	}

	:global(.paper-content .paper-link) {
		color: var(--academic-600);
		text-decoration: underline;
	}

	:global(.paper-content .paper-table-wrap) {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	:global(.paper-content .paper-table) {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	:global(.paper-content .paper-table th) {
		text-align: left;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid var(--border);
		color: var(--ink);
		font-weight: 500;
	}

	:global(.paper-content .paper-table td) {
		padding: 0.6rem 1rem;
		border-bottom: 1px solid var(--border);
		color: var(--foreground);
	}
</style>
