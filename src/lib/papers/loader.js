import { browser } from '$app/environment';

// Import all paper metadata
const importAll = (r) => {
	let papers = [];
	r.keys().forEach(key => {
		const paperData = r(key);
		const slug = key.replace(/^.*[\\/]/, '').replace(/\.[^.]*$/, '');
		papers.push({ ...paperData, slug });
	});
	return papers;
};

// Load all metadata files
const allPapersData = [
	{
		slug: 'ml-healthcare',
		year: '2024',
		title: "Machine Learning Applications in Healthcare: A Comprehensive Analysis",
		category: "Machine Learning",
		date: "2024-03-15",
		author: "Manuel Cortez",
		tags: ["machine-learning", "healthcare", "ai", "medical-ai"],
		abstract: "An in-depth analysis of machine learning applications in modern healthcare systems, focusing on diagnostic accuracy, patient outcomes, and ethical considerations.",
		heroImage: "/assets/papers/ml-healthcare-hero.jpg",
		readingTime: "12 min",
		status: "published",
		featured: true,
		citations: 15,
		downloads: 234
	},
	{
		slug: 'quantum-basics',
		year: '2024',
		title: "Quantum Computing Fundamentals: A Practical Introduction",
		category: "Quantum Computing",
		date: "2024-02-28",
		author: "Manuel Cortez",
		tags: ["quantum-computing", "quantum-mechanics", "algorithms", "quantum-advantage"],
		abstract: "A comprehensive introduction to quantum computing principles, covering qubits, quantum gates, and practical applications in modern computing.",
		heroImage: "/assets/papers/quantum-basics-hero.jpg",
		readingTime: "15 min",
		status: "published",
		featured: true,
		citations: 8,
		downloads: 156
	},
	{
		slug: 'financial-analysis',
		year: '2023',
		title: "Advanced Financial Analysis Using Machine Learning Techniques",
		category: "Financial Analysis",
		date: "2023-11-20",
		author: "Manuel Cortez",
		tags: ["financial-analysis", "machine-learning", "trading", "risk-management"],
		abstract: "Exploring the application of advanced machine learning techniques in financial market analysis, portfolio optimization, and risk assessment strategies.",
		heroImage: "/assets/papers/financial-analysis-hero.jpg",
		readingTime: "18 min",
		status: "published",
		featured: false,
		citations: 12,
		downloads: 189
	},
	{
		slug: 'educational-ai',
		year: '2023',
		title: "Artificial Intelligence in Educational Systems: Transforming Learning Experiences",
		category: "Educational Technology",
		date: "2023-09-15",
		author: "Manuel Cortez",
		tags: ["educational-ai", "personalized-learning", "adaptive-systems", "learning-analytics"],
		abstract: "A comprehensive study on the implementation of artificial intelligence in educational systems, focusing on personalized learning paths, adaptive assessment, and learning analytics.",
		heroImage: "/assets/papers/educational-ai-hero.jpg",
		readingTime: "16 min",
		status: "published",
		featured: false,
		citations: 18,
		downloads: 267
	}
];

/**
 * Get all papers sorted by date (newest first)
 */
export async function getAllPapers() {
	// Simulate async loading
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(allPapersData.sort((a, b) => new Date(b.date) - new Date(a.date)));
		}, 100);
	});
}

/**
 * Get featured papers
 */
export async function getFeaturedPapers() {
	const allPapers = await getAllPapers();
	return allPapers.filter(paper => paper.featured);
}

/**
 * Get paper by slug
 */
export async function getPaperBySlug(slug) {
	const allPapers = await getAllPapers();
	return allPapers.find(paper => paper.slug === slug);
}

/**
 * Get papers by category
 */
export async function getPapersByCategory(category) {
	const allPapers = await getAllPapers();
	return allPapers.filter(paper => paper.category === category);
}

/**
 * Get all unique categories
 */
export async function getAllCategories() {
	const allPapers = await getAllPapers();
	const categories = [...new Set(allPapers.map(paper => paper.category))];
	return categories.sort();
}

/**
 * Get papers by year
 */
export async function getPapersByYear(year) {
	const allPapers = await getAllPapers();
	return allPapers.filter(paper => paper.year === year);
}

/**
 * Get all unique years
 */
export async function getAllYears() {
	const allPapers = await getAllPapers();
	const years = [...new Set(allPapers.map(paper => paper.year))];
	return years.sort((a, b) => b - a);
}

/**
 * Search papers by query
 */
export async function searchPapers(query) {
	const allPapers = await getAllPapers();
	const lowercaseQuery = query.toLowerCase();
	
	return allPapers.filter(paper => 
		paper.title.toLowerCase().includes(lowercaseQuery) ||
		paper.abstract.toLowerCase().includes(lowercaseQuery) ||
		paper.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
		paper.category.toLowerCase().includes(lowercaseQuery)
	);
}

/**
 * Mock content per slug for testing structure. Each paper has unique lorem content.
 */
const mockContentBySlug = {
	'ml-healthcare': `## Abstract

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Machine learning applications in healthcare have shown remarkable potential for improving diagnostic accuracy and patient outcomes.

## Introduction

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

- Diagnostic imaging and computer vision
- Natural language processing for clinical notes
- Predictive analytics for patient risk stratification

## Methodology

Our approach combines **supervised learning** with *transfer learning* techniques. We utilized datasets from multiple institutions to ensure generalizability.

\`\`\`
model = Sequential([
  Dense(256, activation='relu'),
  Dropout(0.3),
  Dense(128, activation='relu'),
  Dense(num_classes, activation='softmax')
])
\`\`\`

## Results

| Metric | Baseline | ML Model | Improvement |
|--------|----------|----------|-------------|
| Accuracy | 0.82 | 0.94 | +14.6% |
| Recall | 0.78 | 0.91 | +16.7% |
| F1-Score | 0.80 | 0.92 | +15.0% |

## Conclusion

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Future work will explore federated learning approaches.

## References

1. Smith, J. et al. (2023). Deep Learning in Medical Imaging. Nature Medicine.
2. Doe, A. (2024). NLP for Clinical Documentation. JAMA.`,

	'quantum-basics': `## Abstract

Lorem ipsum quantum computing fundamentals explore superposition and entanglement. Qubits enable parallel computation at scales impossible for classical systems.

## Introduction

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Quantum mechanics provides the theoretical foundation.

### Qubits and Superposition

A qubit can exist in states |0⟩, |1⟩, or any superposition α|0⟩ + β|1⟩.

- Hadamard gate creates superposition
- CNOT gate creates entanglement
- Measurement collapses the state

## Quantum Algorithms

| Algorithm | Speedup | Application |
|-----------|---------|-------------|
| Shor's | Exponential | Factorization |
| Grover's | Quadratic | Search |
| QFT | Polynomial | Period finding |

## Conclusion

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Quantum computing remains an active research frontier.

## References

1. Nielsen & Chuang. Quantum Computation and Quantum Information.
2. Preskill, J. Quantum Computing in the NISQ era.`,

	'financial-analysis': `## Abstract

Lorem ipsum dolor sit amet, financial analysis using machine learning. Portfolio optimization, risk management, and algorithmic trading have been transformed by modern ML techniques.

## Introduction

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Financial markets generate vast amounts of data suitable for predictive modeling.

## Methodology

- Time series analysis with LSTM networks
- Sentiment analysis from news and social media
- Reinforcement learning for trading strategies

## Results

Our backtesting showed **23%** improvement in risk-adjusted returns compared to traditional methods. The *Sharpe ratio* increased from 1.2 to 1.5.

## Conclusion

Ut enim ad minim veniam, quis nostrud exercitation. Regulatory considerations and model interpretability remain important challenges.

## References

1. Brown, S. Machine Learning in Finance. Wiley.
2. Lopez de Prado, M. Advances in Financial Machine Learning.`,

	'educational-ai': `## Abstract

Lorem ipsum educational technology and artificial intelligence. Personalized learning paths, adaptive assessment, and learning analytics represent key innovations.

## Introduction

Sed ut perspiciatis unde omnis iste natus error. AI-powered educational systems can adapt to individual learner needs in real-time.

## Key Applications

- **Intelligent tutoring systems**: Provide personalized feedback
- **Automated grading**: Scale assessment capabilities
- **Learning analytics**: Identify at-risk students early

## Methodology

We deployed a \`transformer-based\` model for content recommendation. The system achieved 0.89 NDCG on our evaluation set.

## Conclusion

Nemo enim ipsam voluptatem quia voluptas. Ethical considerations around data privacy and algorithmic bias require ongoing attention.

## References

1. Baker, R. Educational Data Mining. Springer.
2. Holmes, W. Ethics of AI in Education.`
};

/**
 * Get paper content (markdown). Returns mock content per slug for structure testing.
 */
export async function getPaperContent(slug) {
	const content = mockContentBySlug[slug] || mockContentBySlug['ml-healthcare'];
	return new Promise((resolve) => {
		setTimeout(() => resolve(content), 80);
	});
}
