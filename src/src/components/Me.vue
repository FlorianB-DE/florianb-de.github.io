<template>
	<section id="me" class="about relative overflow-hidden" data-heading="About Me" data-in_viewport="">
		<div class="about-bg" aria-hidden="true" />
		<div class="about-vignette" aria-hidden="true" />

		<div class="about-inner">
			<header class="about-header duration-700" data-in_viewport="fade-left">
				<p class="about-eyebrow">About Me</p>
				<h2 class="about-title">Building software across the stack</h2>
			</header>

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

				<figure class="about-figure duration-700" data-in_viewport="scale-in">
					<div class="mannequin-glow" aria-hidden="true" />
					<div class="mannequin-stage">
						<div class="part">
							<div
								class="head relative flex h-24 flex-col items-center justify-center rounded-b-[10%] rounded-t-[40%] bg-amber-100"
							>
								<img class="absolute top-[-10px] w-[20rem]" id="hair" src="" alt="" />
								<div class="eyes mt-4 flex w-full justify-around">
									<div class="eye circle flex h-5 w-5 border-2 border-white bg-green-800">
										<div class="circle m-auto aspect-square w-1.5 bg-black" />
									</div>
									<div class="eye circle flex h-5 w-5 border-2 border-white bg-green-800">
										<div class="circle m-auto aspect-square w-1.5 bg-black" />
									</div>
								</div>
								<div class="flex w-full justify-center pt-4">
									<div class="mouth h-5 w-[50%] rounded-b-[50%] rounded-t bg-red-400" />
								</div>
							</div>
						</div>
						<div class="part">
							<div class="arm relative z-0 h-32 rotate-[50deg] rounded-2xl bg-amber-100" />
							<div class="body z-[1] h-40 rounded-3xl bg-green-600" />
							<div class="arm right relative z-0 h-32 rotate-[-45deg] rounded-2xl bg-amber-100" />
						</div>
					</div>
				</figure>

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

			<ul class="about-skills duration-700" data-in_viewport="fade-left">
				<li v-for="skill in skills" :key="skill">{{ skill }}</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import ContentSection from '../interfaces/ContentSection';
import hair from '../assets/hair.png';
import { InformationCircleIcon as outlineIcon } from '@heroicons/vue/24/outline';
import { InformationCircleIcon as solidIcon } from '@heroicons/vue/24/solid';

const skills = ['TypeScript', 'Rust', 'Kotlin', 'C++', 'Vue', 'Unity', 'Unreal Engine', 'BIM / IFC'];

onMounted(() => {
	const el = document.getElementById('me');
	if (el) {
		(inject('sections') as Array<ContentSection>).push({
			el: el,
			active: false,
			icon: [outlineIcon, solidIcon]
		});
		(el.querySelector('#hair') as HTMLImageElement).src = hair;
	}
});
</script>

<style scoped>
@reference 'tailwindcss';

.about {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100%;
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
	gap: clamp(1.5rem, 3vh, 2.5rem);
	width: min(72rem, 100%);
	padding: clamp(5.5rem, 10vh, 7rem) clamp(1.25rem, 4vw, 2.5rem) clamp(2rem, 4vh, 3rem);
}

.about-header {
	max-width: 36rem;
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
	font-size: clamp(1.75rem, 3.5vw, 2.75rem);
	font-weight: 600;
	line-height: 1.1;
	letter-spacing: -0.02em;
	color: #fff;
}

.about-grid {
	display: grid;
	align-items: center;
	gap: clamp(1.25rem, 3vw, 2rem);
	grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
	.about-grid {
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		gap: clamp(1rem, 2vw, 2rem);
	}
}

.about-card {
	padding: clamp(1.1rem, 2vw, 1.5rem);
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

.about-figure {
	position: relative;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	margin: 0;
	padding: clamp(0.5rem, 2vw, 1rem) 0;
}

.mannequin-glow {
	position: absolute;
	inset: 10% 15%;
	border-radius: 50%;
	background: radial-gradient(
		circle,
		rgba(159, 167, 255, 0.18) 0%,
		rgba(89, 25, 141, 0.1) 45%,
		transparent 72%
	);
	filter: blur(28px);
	pointer-events: none;
}

.mannequin-stage {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20rem;
	max-width: 100%;
	padding: 1rem 0 0.5rem;
}

.part {
	display: flex;
	width: 20rem;
	max-width: 100%;
	justify-content: center;
}

.head {
	width: 6rem;
	flex-shrink: 0;
}

.head #hair {
	transform: scale(1.3, 1.3);
}

.mouth {
	border: 3px inset #3a0000;
}

.arm {
	aspect-ratio: 1/4;
}

.arm::after {
	content: '';
	position: absolute;
	bottom: -45%;
	left: 150%;
	z-index: 10;
	height: 8rem;
	width: 100%;
	rotate: 90deg;
	border-radius: 1rem;
	background-color: var(--color-amber-100, #fef3c7);
}

.right::after {
	animation: shake 1s ease-in-out infinite;
}

.body {
	width: 8rem;
	flex-shrink: 0;
}

.about-skills {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.about-skills li {
	padding: 0.35rem 0.75rem;
	border-radius: 999px;
	border: 1px solid rgba(159, 167, 255, 0.25);
	background: rgba(89, 25, 141, 0.2);
	font-family: var(--font-mono);
	font-size: 0.72rem;
	letter-spacing: 0.04em;
	color: rgba(255, 255, 255, 0.72);
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

	.about-figure {
		grid-area: figure;
	}
}
</style>
