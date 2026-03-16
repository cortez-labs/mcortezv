<script>
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import { fadeIn } from '$lib/animations';

	let { data } = $props();
	const post = $derived(data?.post);

	let articleEl = $state(null);

	$effect(() => {
		if (articleEl) fadeIn(articleEl, { scrollTrigger: false, delay: 0.2 });
	});

	/**
	 * Minimal markdown-to-HTML renderer for blog content.
	 * Supports: headings, bold, italic, hr, tables, lists, paragraphs, inline code, links.
	 */
	function renderMarkdown(md) {
		const lines = md.trim().split('\n');
		let html = '';
		let inTable = false;
		let inList = false;
		let tableRows = [];
		let listItems = [];

		function flush() {
			if (inTable && tableRows.length) {
				html += renderTable(tableRows);
				tableRows = [];
				inTable = false;
			}
			if (inList && listItems.length) {
				html += '<ul class="post-list">' + listItems.map(li => `<li>${inlineFormat(li)}</li>`).join('') + '</ul>';
				listItems = [];
				inList = false;
			}
		}

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			// Horizontal rule
			if (/^-{3,}$/.test(line.trim())) {
				flush();
				html += '<hr class="post-hr" />';
				continue;
			}

			// Table row
			if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
				if (!inTable) {
					flush();
					inTable = true;
				}
				// Skip separator rows
				if (/^\|[\s\-|:]+\|$/.test(line.trim())) continue;
				const cells = line.trim().slice(1, -1).split('|').map(c => c.trim());
				tableRows.push(cells);
				continue;
			}

			// Unordered list
			if (/^(\d+\.\s|[-*]\s)/.test(line.trim())) {
				if (!inList) {
					flush();
					inList = true;
				}
				listItems.push(line.trim().replace(/^(\d+\.\s|[-*]\s)/, ''));
				continue;
			}

			flush();

			// Headings
			if (line.startsWith('### ')) {
				html += `<h3 class="post-h3">${inlineFormat(line.slice(4))}</h3>`;
			} else if (line.startsWith('## ')) {
				html += `<h2 class="post-h2">${inlineFormat(line.slice(3))}</h2>`;
			} else if (line.startsWith('# ')) {
				html += `<h1 class="post-h1">${inlineFormat(line.slice(2))}</h1>`;
			} else if (line.trim() === '') {
				// skip blank
			} else {
				html += `<p class="post-p">${inlineFormat(line)}</p>`;
			}
		}

		flush();
		return html;
	}

	function inlineFormat(text) {
		return text
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`(.+?)`/g, '<code class="post-code">$1</code>')
			.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="post-link">$1</a>');
	}

	function renderTable(rows) {
		if (!rows.length) return '';
		const [header, ...body] = rows;
		let t = '<div class="post-table-wrap"><table class="post-table">';
		t += '<thead><tr>' + header.map(h => `<th>${inlineFormat(h)}</th>`).join('') + '</tr></thead>';
		if (body.length) {
			t += '<tbody>' + body.map(r => '<tr>' + r.map(c => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>').join('') + '</tbody>';
		}
		t += '</table></div>';
		return t;
	}
</script>

<svelte:head>
	<title>{post?.titulo ?? 'Post'} — Manuel Cortez</title>
	<meta name="description" content={post?.extracto ?? ''} />
	<meta property="og:title" content="{post?.titulo ?? 'Post'} — Manuel Cortez" />
	<meta property="og:description" content={post?.extracto ?? ''} />
	<meta property="og:type" content="article" />
</svelte:head>

<Navbar />

<main class="min-h-screen bg-[var(--paper)]">
	{#if post}
		<article bind:this={articleEl} class="pt-32 pb-[var(--section-y)] px-[var(--section-x-mob)] md:px-[var(--section-x)]">
			<div class="max-w-[720px] mx-auto">

				<!-- Header -->
				<div class="mb-16">
					<a href="/" class="text-micro text-[var(--cobalt-400)] hover:text-[var(--cobalt-800)] transition-colors mb-8 inline-block">&larr; Volver</a>
					<p class="font-mono-brand text-[0.6rem] tracking-[0.15em] uppercase text-[var(--cobalt-600)] mb-4">{post.categoria}</p>
					<h1 class="text-h1 text-[var(--ink)] mb-6">{post.titulo}</h1>
					<p class="text-body-lg text-[var(--muted-brand)] mb-4">{post.extracto}</p>
					<p class="text-micro text-[var(--muted-brand)]">{post.fecha}</p>
				</div>

				<!-- Content -->
				<div class="post-content">
					{@html renderMarkdown(post.contenido)}
				</div>

				<!-- Footer -->
				<div class="mt-20 pt-10 border-t border-[var(--border-brand)]">
					<a href="/" class="text-micro text-[var(--cobalt-400)] hover:text-[var(--cobalt-800)] transition-colors">&larr; Volver al inicio</a>
				</div>
			</div>
		</article>
	{:else}
		<div class="pt-32 pb-[var(--section-y)] px-[var(--section-x-mob)] md:px-[var(--section-x)] text-center">
			<p class="text-[var(--muted-brand)]">Cargando...</p>
		</div>
	{/if}
</main>

<Footer />

<style>
	:global(.post-content .post-h2) {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 3vw, 2.2rem);
		font-weight: 300;
		line-height: 1.2;
		color: var(--ink);
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	:global(.post-content .post-h3) {
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-weight: 400;
		line-height: 1.25;
		color: var(--ink);
		margin-top: 2.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.post-content .post-p) {
		font-family: var(--font-sans);
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.7;
		color: var(--muted-brand);
		margin-bottom: 1.25rem;
	}

	:global(.post-content .post-hr) {
		border: none;
		border-top: 1px solid var(--border-brand);
		margin: 2.5rem 0;
	}

	:global(.post-content .post-list) {
		list-style: none;
		padding: 0;
		margin-bottom: 1.25rem;
	}

	:global(.post-content .post-list li) {
		font-family: var(--font-sans);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--muted-brand);
		padding-left: 1.5rem;
		position: relative;
		margin-bottom: 0.5rem;
	}

	:global(.post-content .post-list li::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 6px;
		height: 6px;
		background: var(--cobalt-600);
	}

	:global(.post-content strong) {
		font-weight: 500;
		color: var(--ink);
	}

	:global(.post-content em) {
		font-style: italic;
	}

	:global(.post-content .post-code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: var(--bg-writing);
		padding: 0.15em 0.4em;
		border: 1px solid var(--border-brand);
	}

	:global(.post-content .post-link) {
		color: var(--cobalt-400);
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: color 200ms;
	}

	:global(.post-content .post-link:hover) {
		color: var(--cobalt-800);
	}

	:global(.post-content .post-table-wrap) {
		overflow-x: auto;
		margin-bottom: 1.5rem;
	}

	:global(.post-content .post-table) {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--font-sans);
		font-size: 0.9rem;
	}

	:global(.post-content .post-table th) {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-align: left;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid var(--cobalt-800);
		color: var(--ink);
	}

	:global(.post-content .post-table td) {
		padding: 0.6rem 1rem;
		border-bottom: 1px solid var(--border-brand);
		color: var(--muted-brand);
		line-height: 1.5;
	}
</style>
