import { features } from '$lib/features';

let gsapInstance = null;
let ScrollTriggerPlugin = null;
let SplitTypeClass = null;

async function loadGsap() {
	if (gsapInstance) return gsapInstance;
	const { gsap } = await import('gsap');
	gsapInstance = gsap;

	if (features.gsapScrollTrigger) {
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);
		ScrollTriggerPlugin = ScrollTrigger;
	}

	return gsap;
}

// Si el elemento ya está en/sobre el viewport cuando se registra el trigger,
// ScrollTrigger no disparará (ya pasó el start point). Detectarlo para animar directo.
function isPastTrigger(element, threshold = 0.85) {
	if (typeof window === 'undefined' || !element) return false;
	return element.getBoundingClientRect().top < window.innerHeight * threshold;
}

async function loadSplitType() {
	if (SplitTypeClass) return SplitTypeClass;
	const mod = await import('split-type');
	SplitTypeClass = mod.default || mod.SplitType;
	return SplitTypeClass;
}

export async function fadeIn(element, options = {}) {
	if (!features.gsapAnimations || !element) return;
	const gsap = await loadGsap();
	const { duration = 0.8, delay = 0, y = 30, scrollTrigger = true } = options;

	gsap.set(element, { autoAlpha: 0, y });

	const toConfig = {
		autoAlpha: 1,
		y: 0,
		duration,
		delay,
		ease: 'power3.out',
	};

	if (scrollTrigger && features.gsapScrollTrigger && ScrollTriggerPlugin && !isPastTrigger(element)) {
		toConfig.scrollTrigger = {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none',
		};
	}

	gsap.to(element, toConfig);
}

export async function slideUp(element, options = {}) {
	if (!features.gsapAnimations || !element) return;
	const gsap = await loadGsap();
	const { duration = 0.8, delay = 0, y = 60, scrollTrigger = true } = options;

	gsap.set(element, { autoAlpha: 0, y });

	const toConfig = {
		autoAlpha: 1,
		y: 0,
		duration,
		delay,
		ease: 'power3.out',
	};

	if (scrollTrigger && features.gsapScrollTrigger && ScrollTriggerPlugin && !isPastTrigger(element)) {
		toConfig.scrollTrigger = {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none',
		};
	}

	gsap.to(element, toConfig);
}

export async function staggerChildren(parent, childSelector, options = {}) {
	if (!features.gsapAnimations || !parent) return;
	const gsap = await loadGsap();
	const { duration = 0.6, stagger = 0.1, y = 40, scrollTrigger = true } = options;

	const children = parent.querySelectorAll(childSelector);
	if (!children.length) return;

	// Use set + to pattern instead of from to prevent cards stuck at opacity: 0
	gsap.set(children, { autoAlpha: 0, y });

	const toConfig = {
		autoAlpha: 1,
		y: 0,
		duration,
		stagger,
		ease: 'power3.out',
	};

	if (scrollTrigger && features.gsapScrollTrigger && ScrollTriggerPlugin && !isPastTrigger(parent)) {
		toConfig.scrollTrigger = {
			trigger: parent,
			start: 'top 85%',
			toggleActions: 'play none none none',
		};
	}

	gsap.to(children, toConfig);
}

export async function splitTextReveal(element, options = {}) {
	if (!features.textSplitting || !features.gsapAnimations || !element) return;
	const gsap = await loadGsap();
	const SplitType = await loadSplitType();

	const { type = 'words', duration = 0.7, stagger = 0.04, y = '110%', scrollTrigger = true } = options;

	const split = new SplitType(element, { types: type });
	const targets = type === 'chars' ? split.chars : type === 'lines' ? split.lines : split.words;

	if (!targets || !targets.length) return;

	element.style.overflow = 'hidden';

	const config = {
		y,
		opacity: 0,
		duration,
		stagger,
		ease: 'power4.out',
	};

	if (scrollTrigger && features.gsapScrollTrigger && ScrollTriggerPlugin) {
		config.scrollTrigger = {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none',
		};
	}

	gsap.from(targets, config);
}

export async function counterAnimation(element, options = {}) {
	if (!features.gsapAnimations || !element) return;
	const gsap = await loadGsap();
	const { end = 100, duration = 2, prefix = '', suffix = '', scrollTrigger = true } = options;

	const obj = { val: 0 };
	const config = {
		val: end,
		duration,
		ease: 'power2.out',
		onUpdate: () => {
			element.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
		},
	};

	if (scrollTrigger && features.gsapScrollTrigger && ScrollTriggerPlugin) {
		config.scrollTrigger = {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none none',
		};
	}

	gsap.to(obj, config);
}

export async function initLenis() {
	if (!features.smoothScroll) return null;

	// Cargar GSAP primero para que ScrollTriggerPlugin esté listo antes de iniciar Lenis
	const gsap = features.gsapAnimations ? await loadGsap() : null;

	const Lenis = (await import('lenis')).default;
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		smoothWheel: true,
	});

	if (gsap && features.gsapScrollTrigger) {
		// Integración oficial Lenis + GSAP: ticker de GSAP conduce Lenis (no RAF independiente)
		lenis.on('scroll', () => ScrollTriggerPlugin?.update());
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
	} else {
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}

	return lenis;
}

export async function animateHeroBg(container) {
	if (!features.gsapAnimations || !container) return;
	const gsap = await loadGsap();

	const orb1 = container.querySelector('.hero-orb-1');
	const orb2 = container.querySelector('.hero-orb-2');
	const orb3 = container.querySelector('.hero-orb-3');
	const sparkles = container.querySelectorAll('.hero-sparkle');

	// Orbs flotando — movimiento lento, sine (Mago: energía viva pero pausada)
	if (orb1) gsap.to(orb1, { y: -28, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
	if (orb2) gsap.to(orb2, { y: 22, x: -12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
	if (orb3) gsap.to(orb3, { y: -18, x: 8, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });

	// Sparkles: parpadeo individual escalonado (Sabio: estrellas que observan)
	sparkles.forEach((s, i) => {
		const baseOpacity = parseFloat(s.getAttribute('opacity') || '0.5');
		gsap.to(s, {
			opacity: baseOpacity * 0.15,
			duration: 1.6 + i * 0.45,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
			delay: i * 0.85,
		});
	});
}

export async function venturesReveal(section, options = {}) {
	if (!features.gsapAnimations || !section) return;
	const gsap = await loadGsap();
	const cards = section.querySelectorAll('.venture-card');
	if (!cards.length) return;

	gsap.set(cards, { opacity: 0, y: 70 });

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: 'top 75%',
			end: 'bottom 20%',
			scrub: 0.8,
		},
	});

	cards.forEach((card, i) => {
		tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i * 0.25);
	});
}

export async function contextoCardsReveal(container, options = {}) {
	if (!features.gsapAnimations || !container) return;
	const gsap = await loadGsap();
	const cards = container.querySelectorAll('.contexto-card');
	if (!cards.length) return;

	gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.92 });

	const toConfig = {
		autoAlpha: 1,
		y: 0,
		scale: 1,
		duration: 0.7,
		stagger: 0.12,
		ease: 'power3.out',
	};

	if (features.gsapScrollTrigger && ScrollTriggerPlugin && !isPastTrigger(container)) {
		toConfig.scrollTrigger = {
			trigger: container,
			start: 'top 80%',
			toggleActions: 'play none none none',
		};
	}

	gsap.to(cards, toConfig);
}

export async function initTheatreStudio() {
	if (!features.theatreStudio) return null;
	const studio = (await import('@theatre/studio')).default;
	const { getProject } = await import('@theatre/core');
	studio.initialize();
	return { studio, getProject };
}
