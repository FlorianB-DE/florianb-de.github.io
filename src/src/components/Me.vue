<template>
	<section
		id="me"
		class="about relative overflow-hidden"
		data-heading="About Me"
		data-in_viewport=""
	>
		<div class="about-bg" aria-hidden="true" />

		<div class="about-vignette" aria-hidden="true" />

		<div class="about-inner">
			<header class="about-header duration-700" data-in_viewport="fade-left">
				<p class="about-eyebrow">About Me</p>

				<h2 class="about-title">Building software across the stack</h2>
			</header>

			<div class="about-main">
				<div class="about-grid">
					<article class="about-card duration-700" data-in_viewport="fade-left">
						<h3 class="about-card-title">Background</h3>

						<p class="about-card-text">
							I'm Florian Becker, a software developer based in Bochum, Germany. I recently
							completed my B.Sc. in Applied Computer Science at Ruhr-Universität Bochum, with a
							thesis on automated SBOM generation and evaluation in Rust.
						</p>

						<ul class="about-facts">
							<li>B.Sc. Applied Computer Science · grade 1.3 thesis</li>

							<li>German (native) · English (C1)</li>
						</ul>
					</article>

					<Mannequin />

					<article class="about-card duration-700" data-in_viewport="fade-right">
						<h3 class="about-card-title">Currently</h3>

						<p class="about-card-text">
							Full-stack developer at Q.Two Digital Solutions, and working student on

							<strong>OpenBIMRL</strong> at the Chair of Computing in Engineering — building tools
							for rule-based BIM validation.
						</p>

						<p class="about-card-text">
							Outside work: hackathons, open-source side projects, and game development in Unity and
							Unreal.
						</p>
					</article>
				</div>

				<AboutSkills :skills="skills" />
			</div>

			<CareerTimeline />
		</div>
	</section>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import ContentSection from '../interfaces/ContentSection';
import AboutSkills from './about/AboutSkills.vue';
import CareerTimeline from './about/CareerTimeline.vue';
import Mannequin from './about/Mannequin.vue';
import { InformationCircleIcon as outlineIcon } from '@heroicons/vue/24/outline';
import { InformationCircleIcon as solidIcon } from '@heroicons/vue/24/solid';

const skills = [
	'TypeScript',
	'Rust',
	'Kotlin',
	'C++',
	'Vue',
	'Unity',
	'Unreal Engine',
	'BIM / IFC'
];

onMounted(() => {
	const el = document.getElementById('me');
	if (el) {
		(inject('sections') as Array<ContentSection>).push({
			el: el,
			active: false,
			icon: [outlineIcon, solidIcon]
		});
	}
});
</script>

<style scoped>
@reference 'tailwindcss';

.about {
	height: 100vh;
	width: 100%;
	overflow: hidden;
}

.about-bg {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(ellipse 45% 40% at 50% 55%, rgba(89, 25, 141, 0.22), transparent 68%),
		radial-gradient(ellipse 35% 30% at 80% 30%, var(--hero-warm-soft), transparent 70%),
		linear-gradient(160deg, #10161d 0%, #1a2332 45%, #121820 100%);
}

.about-vignette {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.42) 100%);
	pointer-events: none;
}

.about-inner {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	width: min(72rem, 100%);
	height: 100%;
	margin: 0 auto;
	padding: clamp(4.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(0.75rem, 1.5vh, 1.25rem);
	box-sizing: border-box;
	overflow: hidden;
}

.about-main {
	display: flex;
	flex: 0 0 auto;
	flex-direction: column;
	gap: 0.35rem;
	margin-top: calc(clamp(0.85rem, 2vh, 1.35rem) + 5rem);
}

.about-header {
	flex-shrink: 0;
}

.about-eyebrow {
	margin: 0 0 0.5rem;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	font-weight: 300;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.45);
}

.about-title {
	margin: 0;
	font-family: var(--font-display);
	font-size: clamp(1.5rem, 3vw, 2.35rem);
	font-weight: 600;
	line-height: 1.1;
	letter-spacing: -0.02em;
	color: #fff;
}

.about-grid {
	display: grid;
	flex: 0 0 auto;
	align-items: center;
	align-content: center;
	gap: clamp(0.75rem, 1.5vw, 1.25rem);
	grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
	.about-grid {
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		gap: clamp(1rem, 2vw, 2rem);
	}
}

.about-card {
	padding: clamp(0.85rem, 1.5vw, 1.15rem);
	border-radius: 0.85rem;
	border: 1px solid rgba(255, 255, 255, 0.08);
	background: rgba(15, 20, 25, 0.55);
	backdrop-filter: blur(10px);
	box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
}

.about-card-title {
	margin: 0 0 0.75rem;
	font-family: var(--font-mono);
	font-size: 0.72rem;
	font-weight: 400;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--accent-purple-light);
}

.about-card-text {
	margin: 0 0 0.85rem;
	font-size: clamp(0.95rem, 1.4vw, 1.05rem);
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.68);
}

.about-card-text:last-child {
	margin-bottom: 0;
}

.about-card-text strong {
	font-weight: 600;
	color: rgba(255, 255, 255, 0.9);
}

.about-facts {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 0.45rem;
	font-family: var(--font-mono);
	font-size: 0.78rem;
	color: rgba(255, 255, 255, 0.45);
}

.about-facts li::before {
	content: '— ';
	color: var(--accent-purple-light);
}

@media (orientation: portrait) and (max-width: 1023px) {
	.about-grid {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			'left right'
			'figure figure';
	}

	.about-card:first-of-type {
		grid-area: left;
	}

	.about-card:last-of-type {
		grid-area: right;
	}

	.about-grid :deep(.mannequin) {
		grid-area: figure;
	}
}
</style>
