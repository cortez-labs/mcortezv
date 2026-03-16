import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

/**
 * GSAP Configuration for Web 4.0 animations
 */
export const gsapConfig = {
	// Default animation settings
	defaults: {
		duration: 1,
		ease: 'power3.out'
	},
	
	// ScrollTrigger defaults
	scrollTriggerDefaults: {
		start: 'top 80%',
		end: 'bottom 20%',
		toggleActions: 'play none none none'
	}
};

/**
 * Initialize GSAP with custom configuration
 */
export function initGSAP() {
	// Set default configuration
	gsap.defaults(gsapConfig.defaults);
	ScrollTrigger.defaults(gsapConfig.scrollTriggerDefaults);
	
	// Smooth scroll behavior for internal links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				gsap.to(window, {
					duration: 1.5,
					scrollTo: target,
					ease: 'power3.inOut'
				});
			}
		});
	});
}

/**
 * Advanced text reveal animation
 */
export function animateTextReveal(element, options = {}) {
	const config = {
		type: 'words',
		stagger: 0.05,
		duration: 0.8,
		ease: 'power3.out',
		from: { y: 100, opacity: 0 },
		to: { y: 0, opacity: 1 },
		...options
	};
	
	if (!element) return;
	
	// Create split text
	const splitText = new SplitText(element, { type: config.type });
	
	// Set initial state
	gsap.set(splitText[config.type], config.from);
	
	// Animate
	const tl = gsap.timeline();
	tl.to(splitText[config.type], {
		...config.to,
		duration: config.duration,
		stagger: config.stagger,
		ease: config.ease
	});
	
	return tl;
}

/**
 * Stagger animation for multiple elements
 */
export function animateStagger(elements, options = {}) {
	const config = {
		from: { y: 50, opacity: 0 },
		to: { y: 0, opacity: 1 },
		duration: 0.8,
		stagger: 0.1,
		ease: 'power3.out',
		scrollTrigger: true,
		...options
	};
	
	if (!elements || elements.length === 0) return;
	
	const tl = gsap.timeline();
	
	if (config.scrollTrigger) {
		tl.from(elements, {
			...config.from,
			duration: config.duration,
			stagger: config.stagger,
			ease: config.ease,
			scrollTrigger: {
				trigger: elements[0],
				...gsapConfig.scrollTriggerDefaults
			}
		});
	} else {
		tl.from(elements, {
			...config.from,
			duration: config.duration,
			stagger: config.stagger,
			ease: config.ease
		});
	}
	
	return tl;
}

/**
 * Parallax effect for background elements
 */
export function createParallax(element, options = {}) {
	const config = {
		speed: 0.5,
		direction: 'vertical',
		ease: 'none',
		...options
	};
	
	if (!element) return;
	
	gsap.to(element, {
		yPercent: -50 * config.speed,
		ease: config.ease,
		scrollTrigger: {
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		}
	});
}

/**
 * 3D card flip animation on hover
 */
export function create3DCardFlip(card) {
	if (!card) return;
	
	const inner = card.querySelector('.card-inner') || card;
	
	// Add 3D perspective to parent
	gsap.set(card, { perspective: 1000 });
	gsap.set(inner, { transformStyle: 'preserve-3d' });
	
	// Mouse move handler
	card.addEventListener('mousemove', (e) => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;
		
		gsap.to(inner, {
			rotationX: rotateX,
			rotationY: rotateY,
			duration: 0.3,
			ease: 'power2.out'
		});
	});
	
	// Reset on mouse leave
	card.addEventListener('mouseleave', () => {
		gsap.to(inner, {
			rotationX: 0,
			rotationY: 0,
			duration: 0.5,
			ease: 'power2.out'
		});
	});
}

/**
 * Magnetic cursor effect
 */
export function createMagneticEffect(element) {
	if (!element) return;
	
	element.addEventListener('mousemove', (e) => {
		const rect = element.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		
		gsap.to(element, {
			x: x * 0.3,
			y: y * 0.3,
			duration: 0.3,
			ease: 'power2.out'
		});
	});
	
	element.addEventListener('mouseleave', () => {
		gsap.to(element, {
			x: 0,
			y: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.3)'
		});
	});
}

/**
 * Floating animation for elements
 */
export function createFloatingAnimation(element, options = {}) {
	const config = {
		amplitude: 10,
		frequency: 0.001,
		duration: 3,
		ease: 'none',
		...options
	};
	
	if (!element) return;
	
	gsap.to(element, {
		y: `+=${config.amplitude}`,
		duration: config.duration,
		ease: config.ease,
		repeat: -1,
		yoyo: true
	});
}

/**
 * Shimmer loading effect
 */
export function createShimmerEffect(element) {
	if (!element) return;
	
	const shimmer = gsap.timeline({ repeat: -1 });
	
	shimmer
		.to(element, {
			backgroundPosition: '200% 0%',
			duration: 1.5,
			ease: 'none'
		})
		.set(element, { backgroundPosition: '-200% 0%' });
	
	return shimmer;
}

/**
 * Page transition animation
 */
export function createPageTransition(container) {
	if (!container) return;
	
	const tl = gsap.timeline();
	
	// Fade out current content
	tl.to(container, {
		opacity: 0,
		y: 20,
		duration: 0.3,
		ease: 'power2.in'
	});
	
	// Fade in new content
	tl.from(container, {
		opacity: 0,
		y: -20,
		duration: 0.5,
		ease: 'power2.out'
	});
	
	return tl;
}
