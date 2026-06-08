<template>
	<section
		id="projects"
		class="projects relative overflow-hidden"
		data-heading="Projects"
		data-in_viewport=""
	>
		<div class="projects-bg" aria-hidden="true" />
		<div class="projects-vignette" aria-hidden="true" />

		<HoverBox
			class="profile-close right-6 bottom-4 z-20 duration-700 lg:right-10"
			data-in_viewport="fade-right"
		>
			<span class="no-select font-mono text-2xl tracking-tight lg:text-3xl">&lt;/profile&gt;</span>
		</HoverBox>

		<div class="projects-inner">
			<header class="projects-header duration-700" data-in_viewport="fade-left">
				<p class="projects-eyebrow">Projects</p>
				<h2 class="projects-title">Selected work &amp; experiments</h2>
				<p class="projects-lead">
					Hackathons, open-source tools, game dev, and research — browse the fractal grid or let it
					autoplay.
				</p>
			</header>

			<div class="projects-slider duration-700" data-in_viewport="fade-right">
				<FractionSlider :projects="enrichedProjects" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import { CommandLineIcon as outlineIcon } from '@heroicons/vue/24/outline';
import { CommandLineIcon as solidIcon } from '@heroicons/vue/24/solid';
import FractionSlider from './fraction_slider/FractionSlider.vue';
import ContentSection from '../interfaces/ContentSection';
import HoverBox from './HoverBox.vue';
import showdown from 'showdown';
import projectList from '../content/projects/projects.json';
import type Project from '../interfaces/Project';
import type { EnrichedProject } from '../interfaces/Project';

const projects = projectList as Project[];

const project_data = import.meta.glob('../content/projects/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const project_images = import.meta.glob('../content/projects/*.{png,jpg,jpeg,gif,svg,webp}', {
	eager: true,
	import: 'default'
}) as Record<string, string>;

onMounted(() => {
	const el = document.getElementById('projects');
	if (el)
		(inject('sections') as Array<ContentSection>).push({
			el: el,
			active: false,
			icon: [outlineIcon, solidIcon]
		});
});

const getMDFile = (fileName: string): string => {
	return Object.keys(project_data).find((element) => element.includes(fileName)) || '';
};

const getImageFile = (fileName: string): string => {
	const key = Object.keys(project_images).find((element) => element.includes(fileName));
	return key ? project_images[key] : '';
};

const converter = new showdown.Converter();

const getHTMLfromMD = (fileName: string): string => {
	const mdKey = getMDFile(fileName);
	return mdKey ? converter.makeHtml(project_data[mdKey]) : '';
};

const enrichedProjects = computed<EnrichedProject[]>(() =>
	projects.map((project) => ({
		...project,
		imageUrl: getImageFile(project.image),
		html: getHTMLfromMD(project.mdFile)
	}))
);
</script>

<style scoped>
.projects {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
}

.projects-bg {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(ellipse 50% 40% at 25% 45%, rgba(89, 25, 141, 0.2), transparent 68%),
		radial-gradient(ellipse 40% 35% at 75% 60%, var(--hero-warm-soft), transparent 70%),
		linear-gradient(155deg, #10161d 0%, #1a2332 48%, #121820 100%);
}

.projects-vignette {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse at center, transparent 28%, rgba(0, 0, 0, 0.45) 100%);
	pointer-events: none;
}

.profile-close {
	padding: 0.85rem 1.1rem;
	backdrop-filter: blur(8px);
	background: rgba(15, 20, 25, 0.55);
}

.projects-inner {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: clamp(1.25rem, 2.5vh, 1.75rem);
	width: min(84rem, 100%);
	height: 100%;
	max-height: 100vh;
	padding: clamp(4.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(1.5rem, 3vh, 2rem);
}

.projects-header {
	max-width: 40rem;
}

.projects-eyebrow {
	margin: 0 0 0.5rem;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	font-weight: 300;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.45);
}

.projects-title {
	margin: 0 0 0.6rem;
	font-family: var(--font-display);
	font-size: clamp(1.75rem, 3.5vw, 2.75rem);
	font-weight: 600;
	line-height: 1.1;
	letter-spacing: -0.02em;
	color: #fff;
}

.projects-lead {
	margin: 0;
	font-size: clamp(0.9rem, 1.4vw, 1.05rem);
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.55);
}

.projects-slider {
	display: flex;
	flex: 1;
	min-height: 0;
	justify-content: center;
	width: 100%;
	color: #fff;
}
</style>
