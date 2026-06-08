<template>
	<div class="flex h-full min-h-0 w-full flex-col">
		<button
			v-if="current < max"
			type="button"
			class="relative h-1/2 w-full shrink-0 overflow-hidden border border-white/20 transition hover:brightness-110 focus:outline-none"
			:class="tileRingClass(current)"
			@click="emit('select', current)"
			@mouseenter="emit('hover', current)"
			@mouseleave="emit('hover', null)"
		>
			<ProjectCell
				:key="projects[current].mdFile"
				:title="projects[current].title"
				:image-url="projects[current].imageUrl"
			/>
		</button>
		<div class="flex h-1/2 min-h-0 w-full shrink-0">
			<button
				v-if="current + 1 < max"
				type="button"
				class="relative h-full w-1/2 shrink-0 overflow-hidden border border-white/20 transition hover:brightness-110 focus:outline-none"
				:class="tileRingClass(current + 1)"
				@click="emit('select', current + 1)"
				@mouseenter="emit('hover', current + 1)"
				@mouseleave="emit('hover', null)"
			>
				<ProjectCell
					:key="projects[current + 1].mdFile"
					:title="projects[current + 1].title"
					:image-url="projects[current + 1].imageUrl"
				/>
			</button>
			<SliderElement
				v-if="max > current + 2"
				class="h-full min-h-0 w-1/2"
				:max="max"
				:current="current + 2"
				:projects="projects"
				:hovered-index="hoveredIndex"
				@select="emit('select', $event)"
				@hover="emit('hover', $event)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { EnrichedProject } from '../../interfaces/Project';
import ProjectCell from './ProjectCell.vue';
import SliderElement from './SliderElement.vue';

const props = defineProps<{
	max: number;
	current: number;
	projects: EnrichedProject[];
	hoveredIndex: number | null;
}>();

const emit = defineEmits<{
	select: [displayIndex: number];
	hover: [displayIndex: number | null];
}>();

const tileRingClass = (displayIndex: number) => ({
	'ring-2 ring-inset ring-[var(--accent-purple-light)]': displayIndex === 0,
	'ring-2 ring-inset ring-white/70': displayIndex === props.hoveredIndex && displayIndex !== 0
});
</script>
