<script lang="ts">
	import { onMount } from 'svelte';
	
	let neuralCanvas: HTMLCanvasElement;
	let particles: Array<{x: number, y: number, vx: number, vy: number, size: number, connections: number[]}> = [];
	let connections: Array<{x1: number, y1: number, x2: number, y2: number, opacity: number}> = [];
	
	onMount(() => {
		if (neuralCanvas) {
			initNeuralBackground();
		}
	});
	
	function initNeuralBackground() {
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
		
		// Create neural nodes
		for (let i = 0; i < 30; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				size: Math.random() * 4 + 2,
				connections: []
			});
		}
		
		// Create initial connections
		particles.forEach((particle, index) => {
			const numConnections = Math.floor(Math.random() * 3) + 1;
			for (let i = 0; i < numConnections; i++) {
				const targetIndex = Math.floor(Math.random() * particles.length);
				if (targetIndex !== index) {
					particle.connections.push(targetIndex);
				}
			}
		});
		
		// Animation loop - white background, gray particles
		function animate() {
			ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
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
				
				// Draw connections - gray
				particle.connections.forEach(targetIndex => {
					const target = particles[targetIndex];
					if (target) {
						const dx = target.x - particle.x;
						const dy = target.y - particle.y;
						const distance = Math.sqrt(dx * dx + dy * dy);
						
						if (distance < 200) {
							const opacity = 0.2 * (1 - distance / 200);
							ctx.beginPath();
							ctx.moveTo(particle.x, particle.y);
							ctx.lineTo(target.x, target.y);
							ctx.strokeStyle = `rgba(156, 163, 175, ${opacity})`;
							ctx.lineWidth = 0.5;
							ctx.stroke();
						}
					}
				});
				
				// Draw particle - gray
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
				gradient.addColorStop(0, 'rgba(107, 114, 128, 0.6)');
				gradient.addColorStop(0.5, 'rgba(156, 163, 175, 0.3)');
				gradient.addColorStop(1, 'rgba(156, 163, 175, 0)');
				ctx.fillStyle = gradient;
				ctx.fill();
			});
			
			requestAnimationFrame(animate);
		}
		
		animate();
	}
</script>

<canvas 
	bind:this={neuralCanvas}
	class="absolute inset-0 pointer-events-none opacity-30"
	aria-hidden="true"
></canvas>

<style>
	canvas {
		will-change: transform;
	}
</style>
