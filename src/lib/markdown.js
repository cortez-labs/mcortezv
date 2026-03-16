/**
 * Minimal markdown-to-HTML renderer for paper/blog content.
 * Supports: headings, bold, italic, hr, tables, lists, paragraphs, inline code, links, code blocks.
 */
function inlineFormat(text) {
	return text
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/`(.+?)`/g, '<code class="paper-code">$1</code>')
		.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="paper-link" target="_blank" rel="noopener">$1</a>');
}

function renderTable(rows) {
	if (!rows.length) return '';
	const [header, ...body] = rows;
	let t = '<div class="paper-table-wrap"><table class="paper-table">';
	t += '<thead><tr>' + header.map((h) => `<th>${inlineFormat(h)}</th>`).join('') + '</tr></thead>';
	if (body.length) {
		t +=
			'<tbody>' +
			body.map((r) => '<tr>' + r.map((c) => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>').join('') +
			'</tbody>';
	}
	t += '</table></div>';
	return t;
}

export function renderMarkdown(md) {
	if (!md || typeof md !== 'string') return '';
	const lines = md.trim().split('\n');
	let html = '';
	let inTable = false;
	let inList = false;
	let inCodeBlock = false;
	let codeLines = [];
	let tableRows = [];
	let listItems = [];

	function flush() {
		if (inCodeBlock && codeLines.length) {
			html += '<pre class="paper-pre"><code>' + codeLines.map((l) => escapeHtml(l)).join('\n') + '</code></pre>';
			codeLines = [];
			inCodeBlock = false;
		}
		if (inTable && tableRows.length) {
			html += renderTable(tableRows);
			tableRows = [];
			inTable = false;
		}
		if (inList && listItems.length) {
			html += '<ul class="paper-list">' + listItems.map((li) => `<li>${inlineFormat(li)}</li>`).join('') + '</ul>';
			listItems = [];
			inList = false;
		}
	}

	function escapeHtml(s) {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Code block
		if (line.trim().startsWith('```')) {
			if (inCodeBlock) {
				flush();
			} else {
				flush();
				inCodeBlock = true;
			}
			continue;
		}
		if (inCodeBlock) {
			codeLines.push(line);
			continue;
		}

		// Horizontal rule
		if (/^-{3,}$/.test(line.trim())) {
			flush();
			html += '<hr class="paper-hr" />';
			continue;
		}

		// Table row
		if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
			if (!inTable) {
				flush();
				inTable = true;
			}
			if (/^\|[\s\-|:]+\|$/.test(line.trim())) continue;
			const cells = line.trim().slice(1, -1).split('|').map((c) => c.trim());
			tableRows.push(cells);
			continue;
		}

		// Ordered/unordered list
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
		if (line.startsWith('#### ')) {
			html += `<h4 class="paper-h4">${inlineFormat(line.slice(5))}</h4>`;
		} else if (line.startsWith('### ')) {
			html += `<h3 class="paper-h3">${inlineFormat(line.slice(4))}</h3>`;
		} else if (line.startsWith('## ')) {
			html += `<h2 class="paper-h2">${inlineFormat(line.slice(3))}</h2>`;
		} else if (line.startsWith('# ')) {
			html += `<h1 class="paper-h1">${inlineFormat(line.slice(2))}</h1>`;
		} else if (line.trim() === '') {
			// skip blank
		} else {
			html += `<p class="paper-p">${inlineFormat(line)}</p>`;
		}
	}

	flush();
	return html;
}
