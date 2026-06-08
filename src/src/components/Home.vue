<template>
	<section
		id="home"
		class="hero relative overflow-hidden"
		data-heading="Home"
		data-in_viewport=""
	>
		<div class="hero-bg" aria-hidden="true" />
		<div class="hero-vignette" aria-hidden="true" />

		<HoverBox class="profile-tag left-6 top-24 z-20 duration-700 lg:left-10 lg:top-28" data-in_viewport="fade-left">
			<span class="no-select font-mono text-2xl tracking-tight lg:text-3xl">&lt;profile&gt;</span>
		</HoverBox>

		<div class="hero-inner">
			<div class="hero-copy duration-700" data-in_viewport="fade-left">
				<p class="hero-eyebrow">Florian Becker · Software Developer</p>
				<h1 class="hero-title">
					<span class="hero-title-line">graphics</span>
					<span class="hero-title-line hero-title-accent">through</span>
					<span class="hero-title-line">code</span>
				</h1>
				<p class="hero-lead">
					Procedural real-time graphics, open-source tooling, and full-stack engineering —
					from Unreal material graphs to production web apps.
				</p>
				<a
					class="hero-cta"
					href="https://blog.florianbecker.eu/a-star-in-unreal-engine-4/2023/04/03/UE4StarMat.html"
					target="_blank"
					rel="noopener noreferrer"
				>
					Read the UE4 star breakdown
					<span aria-hidden="true">→</span>
				</a>
			</div>

			<div class="hero-visual">
				<div class="star-glow" aria-hidden="true" />
				<div class="star-frame">
					<video
						class="star-video"
						:src="starVideoSrc"
						autoplay
						loop
						muted
						playsinline
						preload="auto"
					/>
					<img
						class="material-overlay"
						:src="materialOverlaySrc"
						alt=""
						aria-hidden="true"
					/>
					<div class="star-frame-border" aria-hidden="true" />
				</div>
				<p class="star-caption">
					<span class="star-caption-dot" aria-hidden="true" />
					Unreal Engine 4 · procedural emissive star material
				</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import HoverBox from './HoverBox.vue';
import { inject, onMounted } from 'vue';
import ContentSection from '../interfaces/ContentSection';
import { HomeIcon as outlineIcon } from '@heroicons/vue/24/outline';
import { HomeIcon as solidIcon } from '@heroicons/vue/24/solid';
import starVideoSrc from '../assets/home/star_rotating.webm';
import materialOverlaySrc from '../assets/home/final_material.webp';

onMounted(() => {
	const el = document.getElementById('home');
	if (el)
		(inject('sections') as Array<ContentSection>).push({
			el: el,
			active: false,
			icon: [outlineIcon, solidIcon]
		});
});
</script>

<style scoped>
.hero {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100%;
}

.hero-bg {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(ellipse 55% 45% at 72% 48%, var(--hero-warm-soft), transparent 68%),
		radial-gradient(ellipse 40% 35% at 18% 62%, rgba(89, 25, 141, 0.28), transparent 70%),
		linear-gradient(165deg, #0f1419 0%, #1a2332 42%, #121820 100%);
}

.hero-vignette {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.45) 100%);
	pointer-events: none;
}

.hero-inner {
	position: relative;
	z-index: 1;
	display: grid;
	width: min(112rem, 100%);
	align-items: center;
	gap: clamp(2.5rem, 5vw, 4rem);
	padding: clamp(6rem, 12vh, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 6vh, 3rem);
	grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
	.hero-inner {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
		gap: clamp(2rem, 4vw, 5rem);
		padding-left: clamp(2rem, 6vw, 5rem);
		padding-right: clamp(2rem, 5vw, 4rem);
	}
}

.profile-tag {
	padding: 0.85rem 1.1rem;
	backdrop-filter: blur(8px);
	background: rgba(15, 20, 25, 0.55);
}

.hero-copy {
	max-width: 34rem;
}

.hero-eyebrow {
	margin-bottom: 1rem;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	font-weight: 300;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.45);
}

.hero-title {
	margin: 0 0 1.25rem;
	font-family: var(--font-display);
	font-size: clamp(2.75rem, 6.5vw, 4.75rem);
	font-weight: 700;
	line-height: 0.95;
	letter-spacing: -0.03em;
	color: #fff;
}

.hero-title-line {
	display: block;
}

.hero-title-accent {
	background: linear-gradient(105deg, var(--hero-warm) 0%, var(--accent-purple-light) 55%, #fff 100%);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}

.hero-lead {
	margin: 0 0 1.75rem;
	max-width: 30rem;
	font-size: clamp(1rem, 1.6vw, 1.125rem);
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.62);
}

.hero-cta {
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	font-family: var(--font-mono);
	font-size: 0.82rem;
	letter-spacing: 0.02em;
	color: var(--accent-purple-light);
	text-decoration: none;
	transition: color 180ms ease, gap 180ms ease;
}

.hero-cta:hover {
	color: var(--hero-warm);
	gap: 0.65rem;
}

.hero-visual {
	position: relative;
	justify-self: center;
	width: min(100%, 34rem);
}

@media (min-width: 1024px) {
	.hero-visual {
		justify-self: end;
		width: min(100%, 38rem);
	}
}

.star-glow {
	position: absolute;
	inset: 8% 4%;
	border-radius: 50%;
	background: radial-gradient(
		circle,
		rgba(255, 170, 60, 0.42) 0%,
		rgba(255, 120, 40, 0.18) 38%,
		rgba(89, 25, 141, 0.12) 62%,
		transparent 78%
	);
	filter: blur(36px);
	animation: star-pulse 5s ease-in-out infinite;
	pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
	.star-glow {
		animation: none;
	}
}

.star-frame {
	position: relative;
	isolation: isolate;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow:
		0 0 0 1px rgba(255, 255, 255, 0.06),
		0 24px 64px rgba(0, 0, 0, 0.45),
		0 0 80px rgba(255, 140, 50, 0.12);
}

.star-video {
	display: block;
	width: 100%;
	height: auto;
	vertical-align: middle;
}

.material-overlay {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: contain;
	pointer-events: none;
	mix-blend-mode: screen;
	opacity: 0.92;
}

.star-frame-border {
	position: absolute;
	inset: 0;
	border-radius: inherit;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
	pointer-events: none;
}

.star-caption {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.55rem;
	margin: 1rem 0 0;
	font-family: var(--font-mono);
	font-size: 0.72rem;
	font-weight: 300;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.38);
}

.star-caption-dot {
	width: 0.4rem;
	height: 0.4rem;
	border-radius: 50%;
	background: var(--hero-warm);
	box-shadow: 0 0 10px var(--hero-warm);
}

@keyframes star-pulse {
	0%,
	100% {
		opacity: 0.75;
		transform: scale(0.98);
	}

	50% {
		opacity: 1;
		transform: scale(1.03);
	}
}
</style>
