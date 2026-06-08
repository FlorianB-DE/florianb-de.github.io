<template>
	<section
		id="projects"
		class="relative overflow-x-hidden"
		data-heading="Projects"
		data-in_viewport=""
	>
		<HoverBox class="bottom-4 right-10 duration-700" data-in_viewport="fade-right">
			<span class="no-select align-super text-5xl">&lt;/profile&gt;</span>
		</HoverBox>
		<div
			class="projects--cards__container flex max-h-full flex-col items-center justify-center gap-4 p-20 pb-28 text-white"
		>
			<FractionSlider :projects="enrichedProjects" />
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
import type { EnrichedProject, Project } from '../interfaces/Project';

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

<style></style>
